/**
 * Gazetteer - Governance Module
 *
 * Spec validation and governance utilities for ensuring
 * gazetteer specs comply with schema and organizational rules.
 */

import type { PageSpec, WidgetSpec, RouteSpec, ActionSpec } from '../types'

// =============================================================================
// Types
// =============================================================================

export interface ValidationError {
    /** Path to the invalid field */
    path: string
    /** Error message */
    message: string
    /** Severity level */
    severity: 'error' | 'warning' | 'info'
    /** Rule that was violated */
    rule: string
}

export interface ValidationResult {
    /** Whether validation passed */
    valid: boolean
    /** List of errors/warnings */
    errors: ValidationError[]
    /** Summary statistics */
    stats: {
        errorCount: number
        warningCount: number
        infoCount: number
    }
}

export interface GovernanceRule {
    /** Rule ID */
    id: string
    /** Rule name */
    name: string
    /** Rule description */
    description: string
    /** Severity */
    severity: 'error' | 'warning' | 'info'
    /** Validation function */
    validate: (spec: unknown, context: ValidationContext) => ValidationError[]
}

export interface ValidationContext {
    /** Spec type being validated */
    specType: 'page' | 'widget' | 'route' | 'action'
    /** All registered specs for cross-referencing */
    registry?: {
        pages: Map<string, PageSpec>
        widgets: Map<string, WidgetSpec>
        routes: Map<string, RouteSpec>
        actions: Map<string, ActionSpec>
    }
}

// =============================================================================
// Built-in Rules
// =============================================================================

const BUILT_IN_RULES: GovernanceRule[] = [
    {
        id: 'page-id-required',
        name: 'Page ID Required',
        description: 'All pages must have a pageId',
        severity: 'error',
        validate: (spec: unknown, ctx) => {
            if (ctx.specType !== 'page') return []
            const page = spec as PageSpec
            if (!page.pageId) {
                return [{
                    path: 'pageId',
                    message: 'Page must have a pageId',
                    severity: 'error',
                    rule: 'page-id-required',
                }]
            }
            return []
        },
    },
    {
        id: 'widget-id-required',
        name: 'Widget ID Required',
        description: 'All widgets must have a widgetId',
        severity: 'error',
        validate: (spec: unknown, ctx) => {
            if (ctx.specType !== 'widget') return []
            const widget = spec as WidgetSpec
            if (!widget.widgetId) {
                return [{
                    path: 'widgetId',
                    message: 'Widget must have a widgetId',
                    severity: 'error',
                    rule: 'widget-id-required',
                }]
            }
            return []
        },
    },
    {
        id: 'route-path-format',
        name: 'Route Path Format',
        description: 'Route paths must start with /',
        severity: 'error',
        validate: (spec: unknown, ctx) => {
            if (ctx.specType !== 'route') return []
            const route = spec as RouteSpec
            if (route.path && !route.path.startsWith('/')) {
                return [{
                    path: 'path',
                    message: 'Route path must start with /',
                    severity: 'error',
                    rule: 'route-path-format',
                }]
            }
            return []
        },
    },
    {
        id: 'i18n-keys-present',
        name: 'i18n Keys Present',
        description: 'Pages should have i18n keys defined',
        severity: 'warning',
        validate: (spec: unknown, ctx) => {
            if (ctx.specType !== 'page') return []
            const page = spec as PageSpec
            if (!page.i18nRequiredKeys || page.i18nRequiredKeys.length === 0) {
                return [{
                    path: 'i18nRequiredKeys',
                    message: 'Page should have i18n keys defined',
                    severity: 'warning',
                    rule: 'i18n-keys-present',
                }]
            }
            return []
        },
    },
    {
        id: 'access-control-defined',
        name: 'Access Control Defined',
        description: 'Routes should have access control defined',
        severity: 'info',
        validate: (spec: unknown, ctx) => {
            if (ctx.specType !== 'route') return []
            const route = spec as RouteSpec
            if (!route.access) {
                return [{
                    path: 'access',
                    message: 'Consider adding access control to this route',
                    severity: 'info',
                    rule: 'access-control-defined',
                }]
            }
            return []
        },
    },
]

// =============================================================================
// Governance Validator
// =============================================================================

export class GovernanceValidator {
    private rules: GovernanceRule[] = []

    constructor(includeBuiltIn = true) {
        if (includeBuiltIn) {
            this.rules.push(...BUILT_IN_RULES)
        }
    }

    /**
     * Add a custom rule
     */
    addRule(rule: GovernanceRule): this {
        this.rules.push(rule)
        return this
    }

    /**
     * Remove a rule by ID
     */
    removeRule(ruleId: string): this {
        this.rules = this.rules.filter(r => r.id !== ruleId)
        return this
    }

    /**
     * Validate a page spec
     */
    validatePage(spec: PageSpec, registry?: ValidationContext['registry']): ValidationResult {
        return this.validate(spec, { specType: 'page', registry })
    }

    /**
     * Validate a widget spec
     */
    validateWidget(spec: WidgetSpec, registry?: ValidationContext['registry']): ValidationResult {
        return this.validate(spec, { specType: 'widget', registry })
    }

    /**
     * Validate a route spec
     */
    validateRoute(spec: RouteSpec, registry?: ValidationContext['registry']): ValidationResult {
        return this.validate(spec, { specType: 'route', registry })
    }

    /**
     * Validate a spec
     */
    private validate(spec: unknown, context: ValidationContext): ValidationResult {
        const errors: ValidationError[] = []

        for (const rule of this.rules) {
            const ruleErrors = rule.validate(spec, context)
            errors.push(...ruleErrors)
        }

        const stats = {
            errorCount: errors.filter(e => e.severity === 'error').length,
            warningCount: errors.filter(e => e.severity === 'warning').length,
            infoCount: errors.filter(e => e.severity === 'info').length,
        }

        return {
            valid: stats.errorCount === 0,
            errors,
            stats,
        }
    }

    /**
     * Get all registered rules
     */
    getRules(): GovernanceRule[] {
        return [...this.rules]
    }
}

// =============================================================================
// Factory Functions
// =============================================================================

/**
 * Create a governance validator
 */
export function createValidator(includeBuiltIn = true): GovernanceValidator {
    return new GovernanceValidator(includeBuiltIn)
}

/**
 * Create a custom rule
 */
export function createRule(
    id: string,
    name: string,
    severity: 'error' | 'warning' | 'info',
    validate: GovernanceRule['validate']
): GovernanceRule {
    return { id, name, description: name, severity, validate }
}

// =============================================================================
// Version
// =============================================================================

export const GOVERNANCE_VERSION = '1.0.0'
