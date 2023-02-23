import { UUITextStyles } from '@umbraco-ui/uui-css/lib';
import { css, html, nothing } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { map } from 'rxjs';
import { IRoutingInfo } from 'router-slot';
import type { UmbWorkspaceEntityElement } from '../workspace/workspace-entity-element.interface';
import { UmbSectionContext, UMB_SECTION_CONTEXT_TOKEN } from './section.context';
import type { ManifestSectionView, ManifestWorkspace, ManifestSidebarMenu } from '@umbraco-cms/models';
import { umbExtensionsRegistry, createExtensionElement } from '@umbraco-cms/extensions-api';
import { UmbLitElement } from '@umbraco-cms/element';
import { UmbRouterSlotChangeEvent } from '@umbraco-cms/router';

import './section-sidebar-menu/section-sidebar-menu.element.ts';
import './section-views/section-views.element.ts';
import '../../../settings/languages/app-language-select.element.ts';

@customElement('umb-section')
export class UmbSectionElement extends UmbLitElement {
	static styles = [
		UUITextStyles,
		css`
			:host {
				flex: 1 1 auto;
				height: 100%;
				display: flex;
			}

			#router-slot {
				overflow: auto;
				height: 100%;
			}

			h3 {
				padding: var(--uui-size-4) var(--uui-size-8);
			}
		`,
	];

	@state()
	private _routes: Array<any> = [];

	@state()
	private _menus?: Array<ManifestSidebarMenu>;

	@state()
	private _views?: Array<ManifestSectionView>;

	@state()
	private _sectionLabel = '';

	@state()
	private _sectionPathname = '';

	private _workspaces?: Array<ManifestWorkspace>;
	private _sectionContext?: UmbSectionContext;
	private _sectionAlias?: string;

	constructor() {
		super();

		this.consumeContext(UMB_SECTION_CONTEXT_TOKEN, (instance) => {
			this._sectionContext = instance;

			// TODO: currently they don't corporate, as they overwrite each other...
			this._observeMenuItems();
			this._observeSection();
		});
	}

	private _observeMenuItems() {
		if (!this._sectionContext) return;

		this.observe(this._sectionContext?.alias, (alias) => {
			this._observeSidebarMenus(alias);
		});

		this.observe(umbExtensionsRegistry.extensionsOfType('workspace'), (workspaceExtensions) => {
			this._workspaces = workspaceExtensions;
			this._createMenuRoutes();
		});
	}

	private _observeSidebarMenus(sectionAlias?: string) {
		if (sectionAlias) {
			this.observe(
				umbExtensionsRegistry
					?.extensionsOfType('sidebarMenu')
					.pipe(map((manifests) => manifests.filter((manifest) => manifest.meta.sections.includes(sectionAlias)))),
				(manifests) => {
					this._menus = manifests;
					this._createMenuRoutes();
				}
			);
		} else {
			this._menus = undefined;
			this._createMenuRoutes();
		}
	}

	private _createMenuRoutes() {
		// TODO: find a way to make this reuseable across:
		const workspaceRoutes = this._workspaces?.map((workspace: ManifestWorkspace) => {
			return [
				{
					path: `${workspace.meta.entityType}/edit/:key`,
					component: () => createExtensionElement(workspace),
					setup: (component: Promise<UmbWorkspaceEntityElement>, info: IRoutingInfo) => {
						component.then((el) => {
							el.load(info.match.params.key);
						});
					},
				},
				{
					path: `${workspace.meta.entityType}/create/root`,
					component: () => createExtensionElement(workspace),
					setup: (component: Promise<UmbWorkspaceEntityElement>) => {
						component.then((el) => {
							el.create(null);
						});
					},
				},
				{
					path: `${workspace.meta.entityType}/create/:parentKey`,
					component: () => createExtensionElement(workspace),
					setup: (component: Promise<UmbWorkspaceEntityElement>, info: IRoutingInfo) => {
						component.then((el) => {
							el.create(info.match.params.parentKey);
						});
					},
				},
				{
					path: workspace.meta.entityType,
					component: () => createExtensionElement(workspace),
				},
			];
		});

		this._routes = [
			{
				path: 'dashboard',
				component: () => import('./section-dashboards/section-dashboards.element'),
			},
			...(workspaceRoutes?.flat() || []),
			{
				path: '**',
				redirectTo: 'dashboard',
			},
		];
	}

	private _observeSection() {
		if (!this._sectionContext) return;

		this.observe(this._sectionContext.alias, (alias) => {
			this._sectionAlias = alias;
			this._observeViews();
		});
	}

	private _observeViews() {
		this.observe(umbExtensionsRegistry?.extensionsOfType('sectionView'), (views) => {
			const sectionViews = views
				.filter((view) => {
					return this._sectionAlias ? view.meta.sections.includes(this._sectionAlias) : false;
				})
				.sort((a, b) => b.meta.weight - a.meta.weight);
			if (sectionViews.length > 0) {
				this._views = sectionViews;
				this._createViewRoutes();
			}
		});
	}

	private _createViewRoutes() {
		this._routes =
			this._views?.map((view) => {
				return {
					path: 'view/' + view.meta.pathname,
					component: () => createExtensionElement(view),
				};
			}) ?? [];

		if (this._views && this._views.length > 0) {
			this._routes.push({
				path: '**',
				redirectTo: 'view/' + this._views?.[0]?.meta.pathname,
			});
		}
	}

	private _onRouteChange = (event: UmbRouterSlotChangeEvent) => {
		const currentPath = event.target.localActiveViewPath;
		const view = this._views?.find((view) => 'view/' + view.meta.pathname === currentPath);
		if (!view) return;
		this._sectionContext?.setActiveView(view);
	};

	render() {
		return html`
			${this._menus && this._menus.length > 0
				? html`
						<umb-section-sidebar>
							<!-- TODO: this should be an extension point and only shown in the content section sidebar -->
							<umb-app-language-select></umb-app-language-select>
							<umb-extension-slot
								type="sidebarMenu"
								.filter=${(items: ManifestSidebarMenu) => items.meta.sections.includes(this._sectionAlias || '')}
								default-element="umb-section-sidebar-menu"></umb-extension-slot>
						</umb-section-sidebar>
				  `
				: nothing}
			<umb-section-main>
				${this._views && this._views.length > 0 ? html`<umb-section-views></umb-section-views>` : nothing}
				${this._routes && this._routes.length > 0
					? html`<umb-router-slot
							id="router-slot"
							.routes="${this._routes}"
							@change=${this._onRouteChange}></umb-router-slot>`
					: nothing}
				<slot></slot>
			</umb-section-main>
		`;
	}
}

declare global {
	interface HTMLElementTagNameMap {
		'umb-section': UmbSectionElement;
	}
}
