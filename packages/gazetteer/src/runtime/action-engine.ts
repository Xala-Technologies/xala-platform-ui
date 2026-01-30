/**
 * Gazetteer Runtime - Action Engine
 *
 * Executes action behaviors (navigate, open drawer, call controller, etc.)
 *
 * Security:
 * - URL encoding for interpolated values to prevent injection
 * - Scheme validation to block javascript:/data: URLs
 * - Controller validation against allowed registry
 * - Audit logging for all action executions
 */

import type { ActionSpec, ActionBehavior, ActionRef } from '../types'
import { getRegistry } from './registry'

// =============================================================================
// Security Constants
// =============================================================================

/**
 * Blocked URL schemes that could enable XSS or code injection
 */
const BLOCKED_URL_SCHEMES = ['javascript:', 'data:', 'vbscript:', 'file:']

/**
 * Maximum URL length to prevent DoS via extremely long URLs
 */
const MAX_URL_LENGTH = 8192

// =============================================================================
// Types
// =============================================================================

export interface ActionContext {
    params?: Record<string, string>
    rowData?: Record<string, unknown>
}

export interface ActionResult {
    success: boolean
    error?: string
    data?: unknown
}

/**
 * Controller registry for validating allowed controller+method combinations
 */
export interface ControllerRegistry {
    /**
     * Check if a controller+method combination is allowed
     * @param controllerRef The controller reference (e.g., 'digilist.requests.list')
     * @param method The method name (e.g., 'approve')
     * @returns true if the combination is registered and allowed
     */
    isAllowed(controllerRef: string, method: string): boolean

    /**
     * Get all allowed methods for a controller
     */
    getAllowedMethods(controllerRef: string): string[]
}

/**
 * Audit logger for action execution events
 */
export interface ActionAuditLogger {
    /**
     * Log action execution
     */
    logActionExecution(
        actionId: string,
        actionType: string,
        context: ActionContext | undefined,
        result: ActionResult,
        userId?: string
    ): void

    /**
     * Log blocked URL attempt
     */
    logBlockedUrl(url: string, reason: string, userId?: string): void

    /**
     * Log blocked controller call
     */
    logBlockedController(controllerRef: string, method: string, userId?: string): void
}

/**
 * Default controller registry - DENY all by default
 */
export const defaultControllerRegistry: ControllerRegistry = {
    isAllowed: () => false, // DENY by default - must be overridden
    getAllowedMethods: () => [],
}

/**
 * Default audit logger - no-op
 */
export const defaultActionAuditLogger: ActionAuditLogger = {
    logActionExecution: () => {},
    logBlockedUrl: () => {},
    logBlockedController: () => {},
}

export interface ActionHandlers {
    navigate: (target: string, params?: Record<string, string>, replace?: boolean) => void
    openDrawer: (drawerId: string, context?: Record<string, string>) => void
    closeDrawer: (drawerId?: string) => void
    openModal: (modalId: string, context?: Record<string, string>) => void
    closeModal: (modalId?: string) => void
    callController: (ref: string, method: string, params?: Record<string, unknown>) => Promise<unknown>
    download: (url: string, filename?: string) => void
    toast: (messageKey: string, variant?: string, duration?: number) => void
    translate: (key: string) => string
}

export interface ActionEngineConfig {
    handlers: ActionHandlers
    /**
     * Controller registry for validating allowed controller+method calls.
     * If not provided, ALL controller calls are DENIED.
     */
    controllerRegistry?: ControllerRegistry
    /**
     * Audit logger for security events.
     */
    auditLogger?: ActionAuditLogger
    /**
     * User ID for audit logging context
     */
    userId?: string
}

// =============================================================================
// Action Engine
// =============================================================================

export class ActionEngine {
    private handlers: ActionHandlers
    private controllerRegistry: ControllerRegistry
    private auditLogger: ActionAuditLogger
    private userId?: string

    constructor(config: ActionEngineConfig | ActionHandlers) {
        // Support both old API (handlers only) and new API (config object)
        if ('handlers' in config) {
            this.handlers = config.handlers
            this.controllerRegistry = config.controllerRegistry ?? defaultControllerRegistry
            this.auditLogger = config.auditLogger ?? defaultActionAuditLogger
            this.userId = config.userId
        } else {
            // Legacy support: direct handlers object
            this.handlers = config
            this.controllerRegistry = defaultControllerRegistry
            this.auditLogger = defaultActionAuditLogger
        }
    }

    /**
     * Execute an action by ID
     */
    async execute(actionId: string, context?: ActionContext): Promise<ActionResult> {
        const spec = getRegistry().getAction(actionId)
        if (!spec) {
            return { success: false, error: `Action not found: ${actionId}` }
        }

        return this.executeBehavior(spec.behavior, context)
    }

    /**
     * Execute an action behavior directly.
     *
     * Security:
     * - NAVIGATE: Validates URL scheme, encodes interpolated values
     * - CALL_CONTROLLER: Validates against controller registry
     * - DOWNLOAD: Validates URL scheme and length
     */
    async executeBehavior(behavior: ActionBehavior, context?: ActionContext): Promise<ActionResult> {
        try {
            switch (behavior.type) {
                case 'NAVIGATE': {
                    const target = this.interpolateSafe(behavior.target, context)

                    // Security: Validate URL scheme
                    const validationError = this.validateUrl(target)
                    if (validationError) {
                        this.auditLogger.logBlockedUrl(target, validationError, this.userId)
                        return { success: false, error: validationError }
                    }

                    this.handlers.navigate(
                        target,
                        this.interpolateRecordSafe(behavior.params, context),
                        behavior.replace
                    )
                    return { success: true }
                }

                case 'OPEN_DRAWER':
                    this.handlers.openDrawer(
                        behavior.drawerId,
                        this.interpolateRecordSafe(behavior.context, context)
                    )
                    return { success: true }

                case 'CLOSE_DRAWER':
                    this.handlers.closeDrawer(behavior.drawerId)
                    return { success: true }

                case 'OPEN_MODAL':
                    this.handlers.openModal(
                        behavior.modalId,
                        this.interpolateRecordSafe(behavior.context, context)
                    )
                    return { success: true }

                case 'CLOSE_MODAL':
                    this.handlers.closeModal(behavior.modalId)
                    return { success: true }

                case 'CALL_CONTROLLER': {
                    // Security: Validate controller+method against registry
                    if (!this.controllerRegistry.isAllowed(behavior.controllerRef, behavior.method)) {
                        this.auditLogger.logBlockedController(
                            behavior.controllerRef,
                            behavior.method,
                            this.userId
                        )
                        return {
                            success: false,
                            error: `Unauthorized controller call: ${behavior.controllerRef}.${behavior.method}`,
                        }
                    }

                    const result = await this.handlers.callController(
                        behavior.controllerRef,
                        behavior.method,
                        this.interpolateRecordSafe(behavior.params, context) as Record<string, unknown>
                    )
                    return { success: true, data: result }
                }

                case 'DOWNLOAD': {
                    const url = this.interpolateSafe(behavior.urlBinding, context)

                    // Security: Validate download URL
                    const validationError = this.validateUrl(url)
                    if (validationError) {
                        this.auditLogger.logBlockedUrl(url, validationError, this.userId)
                        return { success: false, error: validationError }
                    }

                    this.handlers.download(url, behavior.filename)
                    return { success: true }
                }

                case 'TOAST':
                    this.handlers.toast(
                        this.handlers.translate(behavior.messageKey),
                        behavior.variant,
                        behavior.duration
                    )
                    return { success: true }

                default:
                    return { success: false, error: `Unknown behavior type: ${(behavior as ActionBehavior).type}` }
            }
        } catch (error) {
            return {
                success: false,
                error: error instanceof Error ? error.message : 'Action execution failed',
            }
        }
    }

    /**
     * Execute an action with confirmation
     */
    async executeWithConfirm(spec: ActionSpec, context?: ActionContext): Promise<ActionResult> {
        if (spec.confirm) {
            // Confirmation is handled by the UI layer
            // This method assumes confirmation was already obtained
        }

        const result = await this.executeBehavior(spec.behavior, context)

        // Handle feedback
        if (spec.feedback) {
            if (result.success && spec.feedback.toastOnSuccessKey) {
                this.handlers.toast(
                    this.handlers.translate(spec.feedback.toastOnSuccessKey),
                    'success'
                )
            } else if (!result.success && spec.feedback.toastOnErrorKey) {
                this.handlers.toast(
                    this.handlers.translate(spec.feedback.toastOnErrorKey),
                    'error'
                )
            }
        }

        return result
    }

    /**
     * Validate a URL for security concerns
     * @returns Error message if invalid, undefined if valid
     */
    private validateUrl(url: string): string | undefined {
        // Check URL length
        if (url.length > MAX_URL_LENGTH) {
            return `URL exceeds maximum length of ${MAX_URL_LENGTH} characters`
        }

        // Check for blocked schemes
        const lowerUrl = url.toLowerCase().trim()
        for (const scheme of BLOCKED_URL_SCHEMES) {
            if (lowerUrl.startsWith(scheme)) {
                return `Blocked URL scheme: ${scheme}`
            }
        }

        return undefined
    }

    /**
     * Interpolate a string with context values (URL-encoded for security)
     */
    private interpolateSafe(template: string, context?: ActionContext): string {
        if (!context) return template

        let result = template

        // Replace :param with URL-encoded context.params values
        if (context.params) {
            for (const [key, value] of Object.entries(context.params)) {
                const encoded = encodeURIComponent(value)
                result = result.replace(`:${key}`, encoded)
                result = result.replace(`{${key}}`, encoded)
            }
        }

        // Replace {row.field} with URL-encoded context.rowData values
        if (context.rowData) {
            for (const [key, value] of Object.entries(context.rowData)) {
                const encoded = encodeURIComponent(String(value))
                result = result.replace(`{row.${key}}`, encoded)
            }
        }

        return result
    }

    /**
     * Interpolate all values in a record (URL-encoded for security)
     */
    private interpolateRecordSafe(
        record?: Record<string, string>,
        context?: ActionContext
    ): Record<string, string> | undefined {
        if (!record) return undefined

        const result: Record<string, string> = {}
        for (const [key, value] of Object.entries(record)) {
            result[key] = this.interpolateSafe(value, context)
        }
        return result
    }

    /**
     * Legacy interpolation method (kept for backward compatibility)
     * @deprecated Use interpolateSafe for security
     */
    private interpolate(template: string, context?: ActionContext): string {
        return this.interpolateSafe(template, context)
    }

    /**
     * Legacy record interpolation method (kept for backward compatibility)
     * @deprecated Use interpolateRecordSafe for security
     */
    private interpolateRecord(
        record?: Record<string, string>,
        context?: ActionContext
    ): Record<string, string> | undefined {
        return this.interpolateRecordSafe(record, context)
    }
}

// =============================================================================
// Factory
// =============================================================================

/**
 * Create an action engine with full security configuration
 */
export function createActionEngine(config: ActionEngineConfig): ActionEngine
/**
 * @deprecated Use config object for security features
 */
export function createActionEngine(handlers: ActionHandlers): ActionEngine
export function createActionEngine(configOrHandlers: ActionEngineConfig | ActionHandlers): ActionEngine {
    return new ActionEngine(configOrHandlers)
}

// =============================================================================
// Noop Handlers (for testing or SSR)
// =============================================================================

export const noopHandlers: ActionHandlers = {
    navigate: () => { },
    openDrawer: () => { },
    closeDrawer: () => { },
    openModal: () => { },
    closeModal: () => { },
    callController: async () => undefined,
    download: () => { },
    toast: () => { },
    translate: (key) => key,
}
