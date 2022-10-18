import { rest } from 'msw';

import umbracoPath from '../../utils/umbraco-path';

import type { ManifestsPackagesInstalledResponse, ManifestsResponse } from '@umbraco-cms/models';

export const manifestDevelopmentHandler = rest.get(umbracoPath('/manifests'), (_req, res, ctx) => {
	return res(
		// Respond with a 200 status code
		ctx.status(200),
		ctx.json<ManifestsResponse>({
			manifests: [
				{
					type: 'section',
					alias: 'My.Section.Custom',
					name: 'Custom Section',
					js: '/src/mocks/App_Plugins/section.js',
					elementName: 'my-section-custom',
					weight: 1,
					meta: {
						label: 'Custom',
						pathname: 'my-custom',
					},
				},
				{
					type: 'propertyEditorUI',
					alias: 'My.PropertyEditorUI.Custom',
					name: 'My Custom Property Editor UI',
					js: '/src/mocks/App_Plugins/property-editor.js',
					elementName: 'my-property-editor-ui-custom',
					meta: {
						label: 'My Custom Property',
						icon: 'document',
						group: 'Common',
						propertyEditor: 'Umbraco.Custom',
					},
				},
				{
					type: 'entrypoint',
					name: 'My Custom Entry Point',
					alias: 'My.Entrypoint.Custom',
					js: '/src/mocks/App_Plugins/custom-entrypoint.js',
				},
				{
					type: 'packageView',
					alias: 'My.PackageView.Custom',
					name: 'My Custom Package View',
					js: '/src/mocks/App_Plugins/package-view.js',
					meta: {
						packageAlias: 'my.package',
					},
				},
			],
		})
	);
});

export const manifestEmptyHandler = rest.get(umbracoPath('/manifests'), (_req, res, ctx) => {
	return res(
		// Respond with a 200 status code
		ctx.status(200),
		ctx.json<ManifestsResponse>({
			manifests: [],
		})
	);
});

export default [
	rest.get(umbracoPath('/manifests/packages/installed'), (_req, res, ctx) => {
		return res(
			// Respond with a 200 status code
			ctx.status(200),
			ctx.json<ManifestsPackagesInstalledResponse>({
				packages: [
					{
						id: '2a0181ec-244b-4068-a1d7-2f95ed7e6da6',
						name: 'My very own package',
						alias: 'my.package',
						version: '1.0.0',
						hasMigrations: false,
						hasPendingMigrations: false,
						plans: [],
					},
					{
						id: '240d95be-bfdb-4ca2-a601-ed2bfd5ed069',
						name: 'Some other community package',
						alias: 'our.package',
						version: '2.0.1',
						hasMigrations: false,
						hasPendingMigrations: false,
						plans: [],
					},
				],
			})
		);
	}),
];
