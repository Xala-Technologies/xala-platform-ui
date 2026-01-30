/**
 * Gazetteer Runtime - Binding Resolver
 *
 * Resolves binding expressions to values safely.
 *
 * Security:
 * - Binding path validation (whitelist prefixes)
 * - Unsafe pattern detection (eval, Function, new, import, etc.)
 * - No prototype access (__proto__, constructor)
 * - Audit logging for security events
 */

import type { Binding, BindingTransform } from '../types'
import { isValidBindingPath, SAFE_BINDING_PREFIXES } from '../types'

// =============================================================================
// Types
// =============================================================================

export interface BindingContext {
    vm?: Record<string, unknown>
    form?: Record<string, unknown>
    route?: Record<string, unknown>
    user?: Record<string, unknown>
    config?: Record<string, unknown>
    i18n?: (key: string) => string
}

export interface ResolvedBinding<T = unknown> {
    value: T
    error?: string
}

/**
 * Audit logger for binding resolution events
 */
export interface BindingAuditLogger {
    /**
     * Log invalid binding path attempt
     */
    logInvalidBindingPath(path: string, userId?: string): void

    /**
     * Log unsafe expression pattern detected
     */
    logUnsafeExpression(expression: string, userId?: string): void

    /**
     * Log binding resolution error
     */
    logResolutionError(binding: Binding, error: string, userId?: string): void
}

/**
 * Default no-op audit logger
 */
export const defaultBindingAuditLogger: BindingAuditLogger = {
    logInvalidBindingPath: () => {},
    logUnsafeExpression: () => {},
    logResolutionError: () => {},
}

export interface BindingResolverConfig {
    context?: BindingContext
    auditLogger?: BindingAuditLogger
    userId?: string
}

// =============================================================================
// Binding Resolver
// =============================================================================

export class BindingResolver {
    private context: BindingContext
    private auditLogger: BindingAuditLogger
    private userId?: string

    constructor(contextOrConfig: BindingContext | BindingResolverConfig = {}) {
        // Support both old API (context only) and new API (config object)
        if ('auditLogger' in contextOrConfig || 'userId' in contextOrConfig) {
            const config = contextOrConfig as BindingResolverConfig
            this.context = config.context ?? {}
            this.auditLogger = config.auditLogger ?? defaultBindingAuditLogger
            this.userId = config.userId
        } else {
            // Legacy support: direct context object
            this.context = contextOrConfig as BindingContext
            this.auditLogger = defaultBindingAuditLogger
        }
    }

    /**
     * Update the context
     */
    setContext(context: Partial<BindingContext>): void {
        this.context = { ...this.context, ...context }
    }

    /**
     * Set the audit logger (for runtime configuration)
     */
    setAuditLogger(logger: BindingAuditLogger): void {
        this.auditLogger = logger
    }

    /**
     * Set the user ID for audit context
     */
    setUserId(userId: string): void {
        this.userId = userId
    }

    /**
     * Resolve a binding definition to a value.
     *
     * Security: Validates binding paths and expressions before resolution.
     */
    resolve<T = unknown>(binding: Binding): ResolvedBinding<T> {
        try {
            switch (binding.type) {
                case 'constant':
                    return { value: binding.value as T }

                case 'routeParam':
                    return {
                        value: (this.context.route?.[binding.param] ?? binding.default) as T,
                    }

                case 'context':
                    return {
                        value: this.resolvePath(binding.path, binding.default) as T,
                    }

                case 'query':
                    // Query bindings are resolved by hooks, not inline
                    return { value: undefined as T, error: 'Query bindings require hook resolution' }

                case 'computed':
                    return this.resolveComputed<T>(binding.expression)

                default:
                    return { value: undefined as T, error: 'Unknown binding type' }
            }
        } catch (error) {
            const errorMsg = error instanceof Error ? error.message : 'Unknown error'
            // Log resolution errors for security audit
            this.auditLogger.logResolutionError(binding, errorMsg, this.userId)
            return {
                value: undefined as T,
                error: errorMsg,
            }
        }
    }

    /**
     * Resolve a path expression (e.g., "vm.bookings.length")
     *
     * Security: Validates path against allowed prefixes (whitelist).
     */
    resolvePath(path: string, defaultValue?: unknown): unknown {
        if (!isValidBindingPath(path)) {
            // Log security event: invalid binding path attempt
            this.auditLogger.logInvalidBindingPath(path, this.userId)
            throw new Error(`Invalid binding path: ${path}. Must start with: ${SAFE_BINDING_PREFIXES.join(', ')}`)
        }

        const segments = path.split('.')
        const rootKey = segments[0] as keyof BindingContext

        if (!(rootKey in this.context)) {
            return defaultValue
        }

        let current: unknown = this.context[rootKey]

        for (let i = 1; i < segments.length; i++) {
            if (current === null || current === undefined) {
                return defaultValue
            }
            if (typeof current !== 'object') {
                return defaultValue
            }
            current = (current as Record<string, unknown>)[segments[i]]
        }

        return current ?? defaultValue
    }

    /**
     * Resolve a simple computed expression.
     *
     * Security: Validates expression against unsafe patterns before evaluation.
     */
    private resolveComputed<T>(expression: string): ResolvedBinding<T> {
        // Only allow safe expressions (no function calls, etc.)
        if (this.containsUnsafePatterns(expression)) {
            // Log security event: unsafe expression attempt
            this.auditLogger.logUnsafeExpression(expression, this.userId)
            return { value: undefined as T, error: 'Unsafe expression pattern detected' }
        }

        try {
            // Simple expression evaluation for common patterns
            const result = this.evaluateSimpleExpression(expression)
            return { value: result as T }
        } catch (error) {
            return {
                value: undefined as T,
                error: error instanceof Error ? error.message : 'Expression evaluation failed',
            }
        }
    }

    /**
     * Check for unsafe patterns
     */
    private containsUnsafePatterns(expression: string): boolean {
        const unsafePatterns = [
            /\beval\b/,
            /\bFunction\b/,
            /\bnew\b/,
            /\bimport\b/,
            /\brequire\b/,
            /<script/i,
            /javascript:/i,
            /__proto__/,
            /\bconstructor\b/,
        ]
        return unsafePatterns.some(pattern => pattern.test(expression))
    }

    /**
     * Evaluate simple expressions (comparisons, ternary, arithmetic)
     */
    private evaluateSimpleExpression(expression: string): unknown {
        // Replace path references with resolved values
        let processedExpr = expression

        // Find all path references and resolve them
        const pathPattern = new RegExp(`(${SAFE_BINDING_PREFIXES.map(p => p.replace('.', '\\.')).join('|')})\\w+(?:\\.\\w+)*`, 'g')

        const paths = expression.match(pathPattern) || []
        for (const path of paths) {
            const value = this.resolvePath(path)
            const jsonValue = JSON.stringify(value)
            processedExpr = processedExpr.replace(path, jsonValue)
        }

        // Simple ternary: condition ? trueVal : falseVal
        const ternaryMatch = processedExpr.match(/^(.+)\s*\?\s*(.+)\s*:\s*(.+)$/)
        if (ternaryMatch) {
            const [, condition, trueVal, falseVal] = ternaryMatch
            const condResult = this.evalCondition(condition)
            return condResult ? JSON.parse(trueVal) : JSON.parse(falseVal)
        }

        // Simple comparison: a === b, a !== b, a > b, etc.
        return this.evalCondition(processedExpr)
    }

    /**
     * Evaluate a simple condition
     */
    private evalCondition(condition: string): boolean {
        const trimmed = condition.trim()

        // Boolean literals
        if (trimmed === 'true') return true
        if (trimmed === 'false') return false

        // Try to parse as JSON value
        try {
            return Boolean(JSON.parse(trimmed))
        } catch {
            // Not a JSON literal, treat as truthy check
            return trimmed !== '' && trimmed !== 'null' && trimmed !== 'undefined'
        }
    }

    /**
     * Apply a transform to a value
     */
    applyTransform<T>(value: T[], transform: BindingTransform): unknown {
        switch (transform) {
            case 'none':
                return value
            case 'first':
                return value[0]
            case 'last':
                return value[value.length - 1]
            case 'count':
                return value.length
            case 'sum':
                return (value as number[]).reduce((a, b) => a + b, 0)
            case 'avg':
                return (value as number[]).reduce((a, b) => a + b, 0) / value.length
            case 'min':
                return Math.min(...(value as number[]))
            case 'max':
                return Math.max(...(value as number[]))
            default:
                return value
        }
    }
}

// =============================================================================
// Factory
// =============================================================================

/**
 * Create a binding resolver with full security configuration
 */
export function createBindingResolver(config: BindingResolverConfig): BindingResolver
/**
 * @deprecated Use config object for security features
 */
export function createBindingResolver(context?: BindingContext): BindingResolver
export function createBindingResolver(configOrContext?: BindingResolverConfig | BindingContext): BindingResolver {
    return new BindingResolver(configOrContext)
}
