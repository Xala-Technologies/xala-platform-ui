/**
 * Gazetteer Runtime - Binding Resolver
 * 
 * Resolves binding expressions to values safely.
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

// =============================================================================
// Binding Resolver
// =============================================================================

export class BindingResolver {
    private context: BindingContext

    constructor(context: BindingContext = {}) {
        this.context = context
    }

    /**
     * Update the context
     */
    setContext(context: Partial<BindingContext>): void {
        this.context = { ...this.context, ...context }
    }

    /**
     * Resolve a binding definition to a value
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
            return {
                value: undefined as T,
                error: error instanceof Error ? error.message : 'Unknown error',
            }
        }
    }

    /**
     * Resolve a path expression (e.g., "vm.bookings.length")
     */
    resolvePath(path: string, defaultValue?: unknown): unknown {
        if (!isValidBindingPath(path)) {
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
     * Resolve a simple computed expression
     */
    private resolveComputed<T>(expression: string): ResolvedBinding<T> {
        // Only allow safe expressions (no function calls, etc.)
        if (this.containsUnsafePatterns(expression)) {
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

export function createBindingResolver(context?: BindingContext): BindingResolver {
    return new BindingResolver(context)
}
