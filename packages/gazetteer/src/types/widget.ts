/**
 * Gazetteer - Widget Type Definitions
 */

// =============================================================================
// Widget Types
// =============================================================================

export interface WidgetSpec {
    widgetId: string
    type: WidgetType
    props?: Record<string, unknown>
    bindings?: Record<string, string>
    events?: Record<string, string>
    visibility?: VisibilityCondition
    animationPreset?: string
}

/**
 * Core Widget Types (12)
 * Domain extensions can register additional types
 */
export type WidgetType =
    // Layout
    | 'DashboardHeader'
    | 'StatsGrid'
    | 'Tabs'
    // Data Display
    | 'EntityTable'
    | 'DetailPanel'
    | 'Timeline'
    | 'AuditLog'
    // Forms & Input
    | 'FilterBar'
    | 'DrawerForm'
    // Feedback
    | 'ModalConfirm'
    | 'EmptyState'
    | 'LoadingSkeleton'
    // Domain extensions (registered dynamically)
    | (string & {})

export interface VisibilityCondition {
    permissionKeys?: string[]
    featureFlags?: string[]
    when?: string  // Safe binding expression
}

// =============================================================================
// Widget Catalog
// =============================================================================

export interface WidgetCatalogEntry {
    type: WidgetType
    description: string
    category: 'layout' | 'data' | 'form' | 'feedback' | 'domain'
    props: WidgetPropDefinition[]
    platformUiComponent?: string
}

export interface WidgetPropDefinition {
    name: string
    type: 'string' | 'number' | 'boolean' | 'array' | 'object' | 'binding'
    required?: boolean
    default?: unknown
    description?: string
}

export const CORE_WIDGET_TYPES = [
    'DashboardHeader',
    'StatsGrid',
    'Tabs',
    'EntityTable',
    'DetailPanel',
    'Timeline',
    'AuditLog',
    'FilterBar',
    'DrawerForm',
    'ModalConfirm',
    'EmptyState',
    'LoadingSkeleton',
] as const
