/**
 * Gazetteer - Binding Type Definitions
 */

// =============================================================================
// Binding Types
// =============================================================================

export type Binding =
    | QueryBinding
    | RouteParamBinding
    | ContextBinding
    | ConstantBinding
    | ComputedBinding

export interface QueryBinding {
    type: 'query'
    hook: string
    params?: Record<string, string>
    select?: string
    transform?: BindingTransform
}

export interface RouteParamBinding {
    type: 'routeParam'
    param: string
    default?: string
}

export interface ContextBinding {
    type: 'context'
    path: string
    default?: unknown
}

export interface ConstantBinding {
    type: 'constant'
    value: unknown
}

export interface ComputedBinding {
    type: 'computed'
    expression: string
    dependencies?: string[]
}

export type BindingTransform =
    | 'none'
    | 'first'
    | 'last'
    | 'count'
    | 'sum'
    | 'avg'
    | 'min'
    | 'max'

// =============================================================================
// Binding Constants
// =============================================================================

export const BINDING_TYPES = [
    'query',
    'routeParam',
    'context',
    'constant',
    'computed',
] as const

export type BindingType = typeof BINDING_TYPES[number]

// =============================================================================
// Safe Path Expression Validation
// =============================================================================

/**
 * Allowed prefixes for safe binding expressions
 */
export const SAFE_BINDING_PREFIXES = [
    'vm.',       // ViewModel
    'form.',     // Form state
    'route.',    // Route params
    'user.',     // User context
    'config.',   // App config
    'i18n.',     // Translations
] as const

export function isValidBindingPath(path: string): boolean {
    return SAFE_BINDING_PREFIXES.some(prefix => path.startsWith(prefix))
}
