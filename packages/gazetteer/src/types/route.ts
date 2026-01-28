/**
 * Gazetteer - Unified Type Definitions
 * 
 * Core types for the schema-driven page execution engine.
 */

// =============================================================================
// Route Types
// =============================================================================

export interface RouteSpec {
    routeId: string
    path: string
    pageRef: string
    navigation: RouteNavigation
    access?: RouteAccess
    breadcrumbs?: BreadcrumbSpec
    meta?: RouteMeta
}

export interface RouteNavigation {
    labelKey: string
    group: 'main' | 'settings' | 'admin' | 'hidden'
    icon?: string
    order?: number
    badge?: {
        bindingRef?: string
        color?: 'info' | 'success' | 'warning' | 'danger' | 'neutral'
    }
}

export interface RouteAccess {
    roles?: string[]
    permissions?: string[]
    featureFlags?: string[]
}

export interface BreadcrumbSpec {
    strategy: 'auto' | 'explicit' | 'none'
    explicitCrumbs?: {
        labelKey: string
        toRouteId?: string
        paramsBinding?: string
    }[]
}

export interface RouteMeta {
    titleKey?: string
    descriptionKey?: string
    keywords?: string[]
}
