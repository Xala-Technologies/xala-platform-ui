/**
 * Gazetteer - Builder Module
 *
 * Fluent builder utilities for constructing gazetteers programmatically.
 * Provides type-safe builder pattern for creating page, widget, and route specs.
 */

import type {
    PageSpec,
    WidgetSpec,
    RouteSpec,
    ShellType,
    PageLayoutType,
    VisibilityCondition,
    RouteNavigation,
    RouteAccess,
    PageWidgets,
} from '../types'

// =============================================================================
// Widget Builder
// =============================================================================

export class WidgetBuilder {
    private _widgetId: string
    private _type: string
    private _props: Record<string, unknown> = {}
    private _bindings: Record<string, string> = {}
    private _events: Record<string, string> = {}
    private _visibility: VisibilityCondition = {}

    constructor(widgetId: string, type: string) {
        this._widgetId = widgetId
        this._type = type
    }

    /**
     * Set widget props
     */
    props(props: Record<string, unknown>): this {
        this._props = { ...this._props, ...props }
        return this
    }

    /**
     * Set a single prop
     */
    prop(key: string, value: unknown): this {
        this._props = { ...this._props, [key]: value }
        return this
    }

    /**
     * Add bindings
     */
    bindings(bindings: Record<string, string>): this {
        this._bindings = { ...this._bindings, ...bindings }
        return this
    }

    /**
     * Add a single binding
     */
    binding(key: string, path: string): this {
        this._bindings = { ...this._bindings, [key]: path }
        return this
    }

    /**
     * Set visibility condition
     */
    visibility(condition: VisibilityCondition): this {
        this._visibility = condition
        return this
    }

    /**
     * Show only when binding expression is true
     */
    showWhen(expression: string): this {
        this._visibility = { when: expression }
        return this
    }

    /**
     * Require permissions
     */
    requirePermissions(...keys: string[]): this {
        this._visibility.permissionKeys = keys
        return this
    }

    /**
     * Set event handlers
     */
    events(events: Record<string, string>): this {
        this._events = { ...this._events, ...events }
        return this
    }

    /**
     * Build the widget spec
     */
    build(): WidgetSpec {
        if (!this._widgetId || !this._type) {
            throw new Error('Widget requires widgetId and type')
        }
        return {
            widgetId: this._widgetId,
            type: this._type,
            props: this._props,
            bindings: this._bindings,
            events: Object.keys(this._events).length > 0 ? this._events : undefined,
            visibility: Object.keys(this._visibility).length > 0 ? this._visibility : undefined,
        }
    }
}

// =============================================================================
// Page Builder
// =============================================================================

export class PageBuilder {
    private _pageId: string
    private _shellType: ShellType = 'DataPageShell'
    private _layoutType: PageLayoutType = 'list'
    private _controllerRefs: string[] = []
    private _widgets: PageWidgets = { content: [] }
    private _i18nRequiredKeys: string[] = []
    private _projectionsUsed?: string[]

    constructor(pageId: string) {
        this._pageId = pageId
    }

    /**
     * Set shell type
     */
    shell(shellType: ShellType): this {
        this._shellType = shellType
        return this
    }

    /**
     * Set layout type
     */
    layout(layoutType: PageLayoutType): this {
        this._layoutType = layoutType
        return this
    }

    /**
     * Set controller refs
     */
    controllers(...refs: string[]): this {
        this._controllerRefs.push(...refs)
        return this
    }

    /**
     * Add header widgets
     */
    header(...widgets: WidgetSpec[]): this {
        if (!this._widgets.header) this._widgets.header = []
        this._widgets.header.push(...widgets)
        return this
    }

    /**
     * Add content widgets
     */
    content(...widgets: WidgetSpec[]): this {
        this._widgets.content.push(...widgets)
        return this
    }

    /**
     * Add sidebar widgets
     */
    sidebar(...widgets: WidgetSpec[]): this {
        if (!this._widgets.sidebar) this._widgets.sidebar = []
        this._widgets.sidebar.push(...widgets)
        return this
    }

    /**
     * Add overlay widgets
     */
    overlays(...widgets: WidgetSpec[]): this {
        if (!this._widgets.overlays) this._widgets.overlays = []
        this._widgets.overlays.push(...widgets)
        return this
    }

    /**
     * Add i18n required keys
     */
    i18n(...keys: string[]): this {
        this._i18nRequiredKeys.push(...keys)
        return this
    }

    /**
     * Set projections used
     */
    projections(...projections: string[]): this {
        if (!this._projectionsUsed) this._projectionsUsed = []
        this._projectionsUsed.push(...projections)
        return this
    }

    /**
     * Build the page spec
     */
    build(): PageSpec {
        if (!this._pageId) {
            throw new Error('Page requires pageId')
        }
        return {
            pageId: this._pageId,
            shellType: this._shellType,
            layoutType: this._layoutType,
            controllerRefs: this._controllerRefs,
            widgets: this._widgets,
            i18nRequiredKeys: this._i18nRequiredKeys.length > 0 ? this._i18nRequiredKeys : undefined,
            projectionsUsed: this._projectionsUsed,
        }
    }
}

// =============================================================================
// Route Builder
// =============================================================================

export class RouteBuilder {
    private _routeId: string
    private _path: string
    private _pageRef: string
    private _navigation: Partial<RouteNavigation> = {}
    private _access?: RouteAccess

    constructor(routeId: string, path: string) {
        this._routeId = routeId
        this._path = path
        this._pageRef = routeId
    }

    /**
     * Set page reference
     */
    page(pageRef: string): this {
        this._pageRef = pageRef
        return this
    }

    /**
     * Set navigation label key
     */
    label(labelKey: string): this {
        this._navigation.labelKey = labelKey
        return this
    }

    /**
     * Set navigation group
     */
    group(group: RouteNavigation['group'], order?: number): this {
        this._navigation.group = group
        if (order !== undefined) {
            this._navigation.order = order
        }
        return this
    }

    /**
     * Set icon
     */
    icon(icon: string): this {
        this._navigation.icon = icon
        return this
    }

    /**
     * Set order
     */
    order(order: number): this {
        this._navigation.order = order
        return this
    }

    /**
     * Set access control
     */
    access(access: RouteAccess): this {
        this._access = access
        return this
    }

    /**
     * Set roles for access control
     */
    roles(...roles: string[]): this {
        this._access = { ...this._access, roles }
        return this
    }

    /**
     * Build the route spec
     */
    build(): RouteSpec {
        if (!this._routeId || !this._path) {
            throw new Error('Route requires routeId and path')
        }
        return {
            routeId: this._routeId,
            path: this._path,
            pageRef: this._pageRef,
            navigation: {
                labelKey: this._navigation.labelKey ?? `routes.${this._routeId}.label`,
                group: this._navigation.group ?? 'main',
                icon: this._navigation.icon,
                order: this._navigation.order,
            },
            access: this._access,
        }
    }
}

// =============================================================================
// Factory Functions
// =============================================================================

/**
 * Create a new widget builder
 */
export function widget(widgetId: string, type: string): WidgetBuilder {
    return new WidgetBuilder(widgetId, type)
}

/**
 * Create a new page builder
 */
export function page(pageId: string): PageBuilder {
    return new PageBuilder(pageId)
}

/**
 * Create a new route builder
 */
export function route(routeId: string, path: string): RouteBuilder {
    return new RouteBuilder(routeId, path)
}

// =============================================================================
// Version
// =============================================================================

export const BUILDER_VERSION = '1.0.0'
