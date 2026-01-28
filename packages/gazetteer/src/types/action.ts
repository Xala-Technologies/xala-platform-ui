/**
 * Gazetteer - Action Type Definitions
 */

// =============================================================================
// Action Types
// =============================================================================

export interface ActionSpec {
    actionId: string
    labelKey?: string
    icon?: string
    intent?: ActionIntent
    behavior: ActionBehavior
    visibility?: ActionVisibility
    confirm?: ConfirmSpec
    feedback?: FeedbackSpec
    analytics?: AnalyticsSpec
    auditTag?: string
}

export type ActionIntent = 'primary' | 'secondary' | 'danger' | 'ghost' | 'success'

export interface ActionVisibility {
    permissionKeys?: string[]
    when?: string
}

export interface ConfirmSpec {
    titleKey: string
    messageKey: string
    confirmLabelKey?: string
    cancelLabelKey?: string
    variant?: 'info' | 'warning' | 'danger'
}

export interface FeedbackSpec {
    toastOnSuccessKey?: string
    toastOnErrorKey?: string
}

export interface AnalyticsSpec {
    eventName: string
    tags?: Record<string, string>
}

// =============================================================================
// Action Behaviors (8 core types)
// =============================================================================

export type ActionBehavior =
    | NavigateBehavior
    | OpenDrawerBehavior
    | CloseDrawerBehavior
    | OpenModalBehavior
    | CloseModalBehavior
    | CallControllerBehavior
    | DownloadBehavior
    | ToastBehavior

export interface NavigateBehavior {
    type: 'NAVIGATE'
    target: string
    params?: Record<string, string>
    replace?: boolean
}

export interface OpenDrawerBehavior {
    type: 'OPEN_DRAWER'
    drawerId: string
    context?: Record<string, string>
}

export interface CloseDrawerBehavior {
    type: 'CLOSE_DRAWER'
    drawerId?: string
}

export interface OpenModalBehavior {
    type: 'OPEN_MODAL'
    modalId: string
    context?: Record<string, string>
}

export interface CloseModalBehavior {
    type: 'CLOSE_MODAL'
    modalId?: string
}

export interface CallControllerBehavior {
    type: 'CALL_CONTROLLER'
    controllerRef: string
    method: string
    params?: Record<string, string>
    onSuccess?: ActionRef
    onError?: ActionRef
}

export interface DownloadBehavior {
    type: 'DOWNLOAD'
    urlBinding: string
    filename?: string
}

export interface ToastBehavior {
    type: 'TOAST'
    messageKey: string
    variant?: 'info' | 'success' | 'warning' | 'error'
    duration?: number
}

export interface ActionRef {
    actionId: string
    params?: Record<string, string>
}

// =============================================================================
// Action Catalog
// =============================================================================

export const CORE_ACTION_TYPES = [
    'NAVIGATE',
    'OPEN_DRAWER',
    'CLOSE_DRAWER',
    'OPEN_MODAL',
    'CLOSE_MODAL',
    'CALL_CONTROLLER',
    'DOWNLOAD',
    'TOAST',
] as const

export type ActionType = typeof CORE_ACTION_TYPES[number] | (string & {})
