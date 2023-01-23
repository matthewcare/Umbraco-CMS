import { UmbEntityData } from './entity.data';
import { createFolderTreeItem } from './utils';
import { FolderTreeItem } from '@umbraco-cms/backend-api';
import type { DataTypeDetails } from '@umbraco-cms/models';

export const data: Array<DataTypeDetails> = [
	{
		name: 'Text',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-textBox',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.TextBox',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.TextBox',
		data: [
			{
				alias: 'maxChars',
				value: 10,
			},
		],
	},
	{
		name: 'Text Area',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-textArea',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.TextArea',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.TextArea',
		data: [],
	},
	{
		name: 'My JS Property Editor',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-custom',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.JSON',
		propertyEditorUIAlias: 'My.PropertyEditorUI.Custom',
		data: [],
	},
	{
		name: 'Color Picker',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-colorPicker',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.ColorPicker',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.ColorPicker',
		data: [],
	},
	{
		name: 'Content Picker',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-contentPicker',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.ContentPicker',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.DocumentPicker',
		data: [
			{
				alias: 'validationLimit',
				value: { min: 2, max: 4 },
			},
		],
	},
	{
		name: 'Eye Dropper',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-eyeDropper',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.ColorPicker.EyeDropper',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.EyeDropper',
		data: [],
	},
	{
		name: 'Multi URL Picker',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-multiUrlPicker',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.MultiUrlPicker',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.MultiUrlPicker',
		data: [],
	},
	{
		name: 'Multi Node Tree Picker',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-multiNodeTreePicker',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.MultiNodeTreePicker',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.TreePicker',
		data: [],
	},
	{
		name: 'Date Picker',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-datePicker',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.DateTime',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.DatePicker',
		data: [],
	},
	{
		name: 'Email',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-email',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.EmailAddress',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.Email',
		data: [],
	},
	{
		name: 'Multiple Text String',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-multipleTextString',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.MultipleTextString',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.MultipleTextString',
		data: [],
	},
	{
		name: 'Dropdown',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-dropdown',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.DropDown.Flexible',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.Dropdown',
		data: [],
	},
	{
		name: 'Slider',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-slider',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.Slider',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.Slider',
		data: [],
	},
	{
		name: 'Toggle',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-toggle',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.TrueFalse',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.Toggle',
		data: [],
	},
	{
		name: 'Tags',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-tags',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.Tags',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.Tags',
		data: [],
	},
	{
		name: 'Markdown Editor',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-markdownEditor',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.MarkdownEditor',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.MarkdownEditor',
		data: [],
	},
	{
		name: 'Radio Button List',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-radioButtonList',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.RadioButtonList',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.RadioButtonList',
		data: [],
	},
	{
		name: 'Checkbox List',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-checkboxList',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.CheckboxList',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.CheckboxList',
		data: [],
	},
	{
		name: 'Block List',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-blockList',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.BlockList',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.BlockList',
		data: [],
	},
	{
		name: 'Media Picker',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-mediaPicker',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.MediaPicker3',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.MediaPicker',
		data: [],
	},
	{
		name: 'Image Cropper',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-imageCropper',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.ImageCropper',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.ImageCropper',
		data: [],
	},
	{
		name: 'Upload Field',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-uploadField',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.UploadField',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.UploadField',
		data: [],
	},
	{
		name: 'Block Grid',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-blockGrid',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.BlockGrid',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.BlockGrid',
		data: [],
	},
	{
		name: 'Collection View',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-collectionView',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.ListView',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.CollectionView',
		data: [],
	},
	{
		name: 'Icon Picker',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-iconPicker',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.IconPicker',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.IconPicker',
		data: [],
	},
	{
		name: 'Number Range',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-numberRange',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.JSON',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.NumberRange',
		data: [],
	},
	{
		name: 'Order Direction',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-orderDirection',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.JSON',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.OrderDirection',
		data: [],
	},
	{
		name: 'Overlay Size',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-overlaySize',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.JSON',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.OverlaySize',
		data: [],
	},
	{
		name: 'Rich Text Editor',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-richTextEditor',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.TinyMCE',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.TinyMCE',
		data: [],
	},
	{
		name: 'Label',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-label',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.Label',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.Label',
		data: [],
	},
	{
		name: 'Integer',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-integer',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.Integer',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.Integer',
		data: [],
	},
	{
		name: 'Decimal',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-decimal',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.Decimal',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.Decimal',
		data: [],
	},
	{
		name: 'User Picker',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-userPicker',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.UserPicker',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.UserPicker',
		data: [],
	},
	{
		name: 'Member Picker',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-memberPicker',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.MemberPicker',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.MemberPicker',
		data: [],
	},
	{
		name: 'Member Group Picker',
		type: 'data-type',
		icon: 'umb:autofill',
		hasChildren: false,
		key: 'dt-memberGroupPicker',
		isContainer: false,
		parentKey: null,
		isFolder: false,
		propertyEditorModelAlias: 'Umbraco.MemberGroupPicker',
		propertyEditorUIAlias: 'Umb.PropertyEditorUI.MemberGroupPicker',
		data: [],
	},
];

// Temp mocked database
// TODO: all properties are optional in the server schema. I don't think this is correct.
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
class UmbDataTypeData extends UmbEntityData<DataTypeDetails> {
	constructor() {
		super(data);
	}

	getTreeRoot(): Array<FolderTreeItem> {
		const rootItems = this.data.filter((item) => item.parentKey === null);
		return rootItems.map((item) => createFolderTreeItem(item));
	}

	getTreeItemChildren(key: string): Array<FolderTreeItem> {
		const childItems = this.data.filter((item) => item.parentKey === key);
		return childItems.map((item) => createFolderTreeItem(item));
	}

	getTreeItem(keys: Array<string>): Array<FolderTreeItem> {
		const items = this.data.filter((item) => keys.includes(item.key ?? ''));
		return items.map((item) => createFolderTreeItem(item));
	}
}

export const umbDataTypeData = new UmbDataTypeData();
