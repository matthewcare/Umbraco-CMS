using Microsoft.Extensions.Logging;
using NPoco;
using Umbraco.Cms.Core;
using Umbraco.Cms.Core.Models;
using Umbraco.Cms.Core.Models.Editors;
using Umbraco.Cms.Core.Serialization;
using Umbraco.Cms.Core.Services;
using Umbraco.Cms.Core.Web;
using Umbraco.Cms.Infrastructure.Migrations.Upgrade.V_15_0_0.LocalLinks;
using Umbraco.Cms.Infrastructure.Persistence;
using Umbraco.Cms.Infrastructure.Persistence.Dtos;
using Umbraco.Extensions;

namespace Umbraco.Cms.Infrastructure.Migrations.Upgrade.V_15_0_0;

public class ConvertLocalLinks : MigrationBase
{
    private readonly IUmbracoContextFactory _umbracoContextFactory;
    private readonly IContentTypeService _contentTypeService;
    private readonly ILogger<ConvertLocalLinks> _logger;
    private readonly IDataTypeService _dataTypeService;
    private readonly ILanguageService _languageService;
    private readonly IJsonSerializer _jsonSerializer;
    private readonly LocalLinkProcessor _localLinkProcessor;
    private readonly IMediaTypeService _mediaTypeService;

    public ConvertLocalLinks(
        IMigrationContext context,
        IUmbracoContextFactory umbracoContextFactory,
        IContentTypeService contentTypeService,
        ILogger<ConvertLocalLinks> logger,
        IDataTypeService dataTypeService,
        ILanguageService languageService,
        IJsonSerializer jsonSerializer,
        LocalLinkProcessor localLinkProcessor,
        IMediaTypeService mediaTypeService)
        : base(context)
    {
        _umbracoContextFactory = umbracoContextFactory;
        _contentTypeService = contentTypeService;
        _logger = logger;
        _dataTypeService = dataTypeService;
        _languageService = languageService;
        _jsonSerializer = jsonSerializer;
        _localLinkProcessor = localLinkProcessor;
        _mediaTypeService = mediaTypeService;
    }

    protected override void Migrate()
    {
        IEnumerable<string> propertyEditorAliases = _localLinkProcessor.GetSupportedPropertyEditorAliases();

        using UmbracoContextReference umbracoContextReference = _umbracoContextFactory.EnsureUmbracoContext();
        var languagesById = _languageService.GetAllAsync().GetAwaiter().GetResult()
            .ToDictionary(language => language.Id);

        IEnumerable<IContentType> allContentTypes = _contentTypeService.GetAll();
        IEnumerable<IPropertyType> contentPropertyTypes = allContentTypes
            .SelectMany(ct => ct.PropertyTypes);

        IMediaType[] allMediaTypes = _mediaTypeService.GetAll().ToArray();
        IEnumerable<IPropertyType> mediaPropertyTypes = allMediaTypes
            .SelectMany(ct => ct.PropertyTypes);

        var relevantPropertyEditors =
            contentPropertyTypes.Concat(mediaPropertyTypes).DistinctBy(pt => pt.Id)
            .Where(pt => propertyEditorAliases.Contains(pt.PropertyEditorAlias))
            .GroupBy(pt => pt.PropertyEditorAlias)
            .ToDictionary(group => group.Key, group => group.ToArray());


        foreach (var propertyEditorAlias in propertyEditorAliases)
        {
            if (relevantPropertyEditors.TryGetValue(propertyEditorAlias, out IPropertyType[]? propertyTypes) is false)
            {
                continue;
            }

            _logger.LogInformation(
                "Migration starting for all properties of type: {propertyEditorAlias}",
                propertyEditorAlias);
            if (ProcessPropertyTypes(propertyTypes, languagesById))
            {
                _logger.LogInformation(
                    "Migration succeeded for all properties of type: {propertyEditorAlias}",
                    propertyEditorAlias);
            }
            else
            {
                _logger.LogError(
                    "Migration failed for one or more properties of type: {propertyEditorAlias}",
                    propertyEditorAlias);
            }
        }
    }

    private bool ProcessPropertyTypes(IPropertyType[] propertyTypes, IDictionary<int, ILanguage> languagesById)
    {
        foreach (IPropertyType propertyType in propertyTypes)
        {
            IDataType dataType = _dataTypeService.GetAsync(propertyType.DataTypeKey).GetAwaiter().GetResult()
                                 ?? throw new InvalidOperationException("The data type could not be fetched.");

            IDataValueEditor valueEditor = dataType.Editor?.GetValueEditor()
                                           ?? throw new InvalidOperationException(
                                               "The data type value editor could not be fetched.");

            Sql<ISqlContext> sql = Sql()
                .Select<PropertyDataDto>()
                .From<PropertyDataDto>()
                .InnerJoin<ContentVersionDto>()
                .On<PropertyDataDto, ContentVersionDto>((propertyData, contentVersion) =>
                    propertyData.VersionId == contentVersion.Id)
                .LeftJoin<DocumentVersionDto>()
                .On<ContentVersionDto, DocumentVersionDto>((contentVersion, documentVersion) =>
                    contentVersion.Id == documentVersion.Id)
                .Where<PropertyDataDto, ContentVersionDto, DocumentVersionDto>(
                    (propertyData, contentVersion, documentVersion) =>
                        (contentVersion.Current == true || documentVersion.Published == true)
                        && propertyData.PropertyTypeId == propertyType.Id);

            List<PropertyDataDto> propertyDataDtos = Database.Fetch<PropertyDataDto>(sql);
            if (propertyDataDtos.Any() is false)
            {
                continue;
            }

            foreach (PropertyDataDto propertyDataDto in propertyDataDtos)
            {
                if (ProcessPropertyDataDto(propertyDataDto, propertyType, languagesById, valueEditor))
                {
                    Database.Update(propertyDataDto);
                }
            }
        }

        return true;
    }

    private bool ProcessPropertyDataDto(PropertyDataDto propertyDataDto, IPropertyType propertyType,
        IDictionary<int, ILanguage> languagesById, IDataValueEditor valueEditor)
    {
        // NOTE: some old property data DTOs can have variance defined, even if the property type no longer varies
        var culture = propertyType.VariesByCulture()
                      && propertyDataDto.LanguageId.HasValue
                      && languagesById.TryGetValue(propertyDataDto.LanguageId.Value, out ILanguage? language)
            ? language.IsoCode
            : null;

        if (culture is null && propertyType.VariesByCulture())
        {
            // if we end up here, the property DTO is bound to a language that no longer exists. this is an error scenario,
            // and we can't really handle it in any other way than logging; in all likelihood this is an old property version,
            // and it won't cause any runtime issues
            _logger.LogWarning(
                "    - property data with id: {propertyDataId} references a language that does not exist - language id: {languageId} (property type: {propertyTypeName}, id: {propertyTypeId}, alias: {propertyTypeAlias})",
                propertyDataDto.Id,
                propertyDataDto.LanguageId,
                propertyType.Name,
                propertyType.Id,
                propertyType.Alias);
            return false;
        }

        var segment = propertyType.VariesBySegment() ? propertyDataDto.Segment : null;
        var property = new Property(propertyType);
        property.SetValue(propertyDataDto.Value, culture, segment);
        var toEditorValue = valueEditor.ToEditor(property, culture, segment);

        _localLinkProcessor.ProcessToEditorValue(toEditorValue);

        var editorValue = _jsonSerializer.Serialize(toEditorValue);
        var dbValue = valueEditor.FromEditor(new ContentPropertyData(editorValue, null), null);
        if (dbValue is not string stringValue || stringValue.DetectIsJson() is false)
        {
            _logger.LogError(
                "    - value editor did not yield a valid JSON string as FromEditor value property data with id: {propertyDataId} (property type: {propertyTypeName}, id: {propertyTypeId}, alias: {propertyTypeAlias})",
                propertyDataDto.Id,
                propertyType.Name,
                propertyType.Id,
                propertyType.Alias);
            return false;
        }

        propertyDataDto.TextValue = stringValue;
        return true;
    }
}