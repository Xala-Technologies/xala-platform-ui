/**
 * Gazetteer - Page Type Definitions
 */

import type { WidgetSpec } from './widget'
import type { ActionSpec } from './action'

// =============================================================================
// Page Types
// =============================================================================

export interface PageSpec {
    pageId: string
    layoutType: PageLayoutType
    shellType: ShellType
    controllerRefs: string[]
    projectionsUsed?: string[]
    featureDependencies?: FeatureDependency[]
    widgets: PageWidgets
    behaviors?: PageBehaviors
    i18nRequiredKeys?: string[]
    animations?: PageAnimations
}

export type PageLayoutType = 'list' | 'detail' | 'form' | 'dashboard' | 'wizard' | 'custom'

export type ShellType =
    | 'DataPageShell'
    | 'DetailPageShell'
    | 'FormPageShell'
    | 'DashboardShell'
    | 'WizardShell'
    | 'BlankShell'

export interface FeatureDependency {
    featureId: string
    requiredCapabilities?: string[]
}

export interface PageWidgets {
    header?: WidgetSpec[]
    aboveContent?: WidgetSpec[]
    content: WidgetSpec[]
    belowContent?: WidgetSpec[]
    sidebar?: WidgetSpec[]
    overlays?: WidgetSpec[]
}

export interface PageBehaviors {
    actions?: Record<string, ActionSpec>
    navigation?: NavigationBehavior
    lifecycle?: LifecycleBehavior
}

export interface NavigationBehavior {
    defaultBack?: { strategy: 'route' | 'history'; routeId?: string }
    afterAction?: AfterActionSpec[]
}

export interface AfterActionSpec {
    on: string
    goTo: { strategy: 'route' | 'history'; routeId?: string }
    preserveQuery?: boolean
}

export interface LifecycleBehavior {
    onEnter?: string[]
    onExit?: string[]
    pollingInterval?: number
}

export interface PageAnimations {
    pageEnter?: AnimationType
    pageExit?: ExitAnimationType
}

export type AnimationType =
    | 'none'
    | 'fadeIn'
    | 'slideInRight'
    | 'slideInUp'
    | 'scaleIn'
    | 'pulse'
    | 'shimmer'

export type ExitAnimationType =
    | 'none'
    | 'fadeOut'
    | 'slideOutLeft'
    | 'slideOutDown'
    | 'scaleOut'
