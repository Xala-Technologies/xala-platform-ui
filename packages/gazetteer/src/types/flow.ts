/**
 * Gazetteer - Flow (Wizard) Type Definitions
 */

import type { PageSpec } from './page'
import type { ActionRef } from './action'

// =============================================================================
// Flow Types
// =============================================================================

export interface FlowSpec {
    flowId: string
    titleKey: string
    descriptionKey?: string
    controllerRef: string
    steps: FlowStep[]
    entryRouteId: string
    exitRouteId: string
    cancelRouteId?: string
    progressWidget?: ProgressWidgetSpec
    persistence?: PersistenceSpec
    onComplete?: ActionRef
    onCancel?: ActionRef
}

export interface FlowStep {
    stepId: string
    titleKey: string
    descriptionKey?: string
    icon?: string
    routeId?: string
    pageInline?: PageSpec
    requiredPermissions?: string[]
    completionCriteria?: string
    validation?: StepValidation
    next: StepNavigation
    previous?: StepNavigation
    onEnter?: ActionRef
    onLeave?: ActionRef
}

export interface StepNavigation {
    strategy: 'step' | 'route' | 'submitAction'
    stepId?: string
    routeId?: string
    actionId?: string
    labelKey: string
}

export interface StepValidation {
    schemaRef?: string
    async?: {
        controllerRef: string
        method: string
    }
}

export interface ProgressWidgetSpec {
    type: 'stepper' | 'progress-bar' | 'breadcrumb' | 'none'
    position: 'top' | 'left' | 'none'
    showStepNumbers?: boolean
}

export interface PersistenceSpec {
    storage: 'session' | 'local' | 'none'
    key: string
    ttl?: number
}
