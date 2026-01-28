/**
 * Gazetteer Runtime - Action Engine
 * 
 * Executes action behaviors (navigate, open drawer, call controller, etc.)
 */

import type { ActionSpec, ActionBehavior, ActionRef } from '../types'
import { getRegistry } from './registry'

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

// =============================================================================
// Action Engine
// =============================================================================

export class ActionEngine {
    private handlers: ActionHandlers

    constructor(handlers: ActionHandlers) {
        this.handlers = handlers
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
     * Execute an action behavior directly
     */
    async executeBehavior(behavior: ActionBehavior, context?: ActionContext): Promise<ActionResult> {
        try {
            switch (behavior.type) {
                case 'NAVIGATE':
                    this.handlers.navigate(
                        this.interpolate(behavior.target, context),
                        this.interpolateRecord(behavior.params, context),
                        behavior.replace
                    )
                    return { success: true }

                case 'OPEN_DRAWER':
                    this.handlers.openDrawer(
                        behavior.drawerId,
                        this.interpolateRecord(behavior.context, context)
                    )
                    return { success: true }

                case 'CLOSE_DRAWER':
                    this.handlers.closeDrawer(behavior.drawerId)
                    return { success: true }

                case 'OPEN_MODAL':
                    this.handlers.openModal(
                        behavior.modalId,
                        this.interpolateRecord(behavior.context, context)
                    )
                    return { success: true }

                case 'CLOSE_MODAL':
                    this.handlers.closeModal(behavior.modalId)
                    return { success: true }

                case 'CALL_CONTROLLER':
                    const result = await this.handlers.callController(
                        behavior.controllerRef,
                        behavior.method,
                        this.interpolateRecord(behavior.params, context) as Record<string, unknown>
                    )
                    return { success: true, data: result }

                case 'DOWNLOAD':
                    const url = this.interpolate(behavior.urlBinding, context)
                    this.handlers.download(url, behavior.filename)
                    return { success: true }

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
     * Interpolate a string with context values
     */
    private interpolate(template: string, context?: ActionContext): string {
        if (!context) return template

        let result = template

        // Replace :param with context.params values
        if (context.params) {
            for (const [key, value] of Object.entries(context.params)) {
                result = result.replace(`:${key}`, value)
                result = result.replace(`{${key}}`, value)
            }
        }

        // Replace {row.field} with context.rowData values
        if (context.rowData) {
            for (const [key, value] of Object.entries(context.rowData)) {
                result = result.replace(`{row.${key}}`, String(value))
            }
        }

        return result
    }

    /**
     * Interpolate all values in a record
     */
    private interpolateRecord(
        record?: Record<string, string>,
        context?: ActionContext
    ): Record<string, string> | undefined {
        if (!record) return undefined

        const result: Record<string, string> = {}
        for (const [key, value] of Object.entries(record)) {
            result[key] = this.interpolate(value, context)
        }
        return result
    }
}

// =============================================================================
// Factory
// =============================================================================

export function createActionEngine(handlers: ActionHandlers): ActionEngine {
    return new ActionEngine(handlers)
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
