using Umbraco.Cms.Infrastructure.Persistence.Dtos;

namespace Umbraco.Cms.Infrastructure.Migrations.Upgrade.V_10_2_0;

public class AddAliasPrefixColumn : MigrationBase
{
    public AddAliasPrefixColumn(IMigrationContext context)
        : base(context)
    {
    }

    protected override void Migrate()
    {
        var columns = SqlSyntax.GetColumnsInSchema(Context.Database).ToList();

        AddColumnIfNotExists<NodeDto>(columns, "aliasPrefix");
    }
}
