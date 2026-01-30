/**
 * Gazetteer Runtime - Page Composer
 *
 * Composes pages from specs using platform-ui components.
 *
 * Security: Enforces permission-based visibility and feature flags.
 */

import type { PageSpec, WidgetSpec, ShellType } from '../types'
import { BindingResolver, type BindingContext } from './binding-resolver'

// =============================================================================
// Types
// =============================================================================

/**
 * Permission checker interface for RBAC enforcement.
 * Implementations must verify user has ALL specified permissions.
 */
export interface PermissionChecker {
    /**
     * Check if user has all specified permissions
     * @param permissionKeys Array of required permission keys (e.g., ['booking.read', 'booking.approve'])
     * @returns true only if user has ALL permissions
     */
    hasPermissions(permissionKeys: string[]): boolean

    /**
     * Check if specified feature flags are enabled
     * @param featureFlags Array of feature flag keys
     * @returns true only if ALL feature flags are enabled
     */
    hasFeatureFlags(featureFlags: string[]): boolean
}

/**
 * Audit logger for security-relevant events
 */
export interface AuditLogger {
    /**
     * Log permission denial
     */
    logPermissionDenied(widgetId: string, requiredPermissions: string[], userId?: string): void

    /**
     * Log feature flag denial
     */
    logFeatureFlagDenied(widgetId: string, requiredFlags: string[], userId?: string): void
}

/**
 * Default no-op permission checker - DENY by default for security
 */
export const defaultPermissionChecker: PermissionChecker = {
    hasPermissions: () => false, // DENY by default - must be overridden
    hasFeatureFlags: () => false, // DENY by default - must be overridden
}

/**
 * Default no-op audit logger
 */
export const defaultAuditLogger: AuditLogger = {
    logPermissionDenied: () => {},
    logFeatureFlagDenied: () => {},
}

export interface ComposerConfig {
    widgetRegistry: WidgetComponentRegistry
    shellRegistry: ShellComponentRegistry
    bindingContext: BindingContext
    /**
     * Permission checker for RBAC enforcement.
     * If not provided, defaults to DENY all permissions.
     */
    permissionChecker?: PermissionChecker
    /**
     * Audit logger for security events.
     */
    auditLogger?: AuditLogger
    /**
     * User ID for audit logging context
     */
    userId?: string
}

export interface WidgetComponentRegistry {
    get(type: string): React.ComponentType<WidgetComponentProps> | undefined
}

export interface ShellComponentRegistry {
    get(type: ShellType): React.ComponentType<ShellComponentProps> | undefined
}

export interface WidgetComponentProps {
    spec: WidgetSpec
    bindings: Record<string, unknown>
    onAction: (actionId: string, context?: Record<string, unknown>) => void
}

export interface ShellComponentProps {
    children: React.ReactNode
    regions?: Record<string, React.ReactNode>
}

// =============================================================================
// Shell → Platform-UI Mapping
// =============================================================================

export const SHELL_COMPONENT_MAP: Record<ShellType, string> = {
    DataPageShell: 'shells/DashboardShell',
    DetailPageShell: 'shells/DetailShell',
    FormPageShell: 'shells/FormShell',
    DashboardShell: 'shells/DashboardShell',
    WizardShell: 'shells/WizardShell',
    BlankShell: 'shells/BlankShell',
}

// =============================================================================
// Widget → Platform-UI Mapping
// =============================================================================

export const WIDGET_COMPONENT_MAP: Record<string, string> = {
    DashboardHeader: 'composed/DashboardHeader',
    StatsGrid: 'composed/StatsGrid',
    Tabs: 'primitives/Tabs',
    EntityTable: 'composed/DataTable',
    DetailPanel: 'composed/DetailCard',
    Timeline: 'composed/Timeline',
    AuditLog: 'composed/AuditLog',
    FilterBar: 'composed/FilterBar',
    DrawerForm: 'patterns/DrawerForm',
    ModalConfirm: 'composed/ConfirmDialog',
    EmptyState: 'composed/EmptyState',
    LoadingSkeleton: 'primitives/Skeleton',
}

// =============================================================================
// Composer
// =============================================================================

export class PageComposer {
    private bindingResolver: BindingResolver
    private config: ComposerConfig
    private permissionChecker: PermissionChecker
    private auditLogger: AuditLogger

    constructor(config: ComposerConfig) {
        this.config = config
        this.bindingResolver = new BindingResolver(config.bindingContext)
        this.permissionChecker = config.permissionChecker ?? defaultPermissionChecker
        this.auditLogger = config.auditLogger ?? defaultAuditLogger
    }

    /**
     * Resolve all bindings for a widget
     */
    resolveWidgetBindings(widget: WidgetSpec): Record<string, unknown> {
        const resolved: Record<string, unknown> = {}

        if (widget.bindings) {
            for (const [propName, bindingPath] of Object.entries(widget.bindings)) {
                resolved[propName] = this.bindingResolver.resolvePath(bindingPath)
            }
        }

        return resolved
    }

    /**
     * Check if a widget is visible based on conditions.
     *
     * Security: Enforces permission checks and feature flags.
     * Order of checks (fail fast):
     * 1. Permission keys - user must have ALL specified permissions
     * 2. Feature flags - ALL specified flags must be enabled
     * 3. Condition expression - binding expression must evaluate to truthy
     *
     * @param widget The widget spec to check visibility for
     * @returns true only if ALL visibility conditions are satisfied
     */
    isWidgetVisible(widget: WidgetSpec): boolean {
        if (!widget.visibility) return true

        // Check permission-based visibility (SECURITY CRITICAL)
        if (widget.visibility.permissionKeys?.length) {
            const hasPerms = this.permissionChecker.hasPermissions(widget.visibility.permissionKeys)
            if (!hasPerms) {
                // Log permission denial for security audit
                this.auditLogger.logPermissionDenied(
                    widget.widgetId,
                    widget.visibility.permissionKeys,
                    this.config.userId
                )
                return false
            }
        }

        // Check feature flag visibility (SECURITY CRITICAL)
        if (widget.visibility.featureFlags?.length) {
            const hasFlags = this.permissionChecker.hasFeatureFlags(widget.visibility.featureFlags)
            if (!hasFlags) {
                // Log feature flag denial for security audit
                this.auditLogger.logFeatureFlagDenied(
                    widget.widgetId,
                    widget.visibility.featureFlags,
                    this.config.userId
                )
                return false
            }
        }

        // Check condition-based visibility
        if (widget.visibility.when) {
            const result = this.bindingResolver.resolvePath(widget.visibility.when)
            return Boolean(result)
        }

        return true
    }

    /**
     * Get the platform-ui component path for a widget type
     */
    getWidgetComponentPath(type: string): string | undefined {
        return WIDGET_COMPONENT_MAP[type]
    }

    /**
     * Get the platform-ui component path for a shell type
     */
    getShellComponentPath(type: ShellType): string | undefined {
        return SHELL_COMPONENT_MAP[type]
    }

    /**
     * Prepare widget props by merging static props with resolved bindings
     */
    prepareWidgetProps(widget: WidgetSpec): Record<string, unknown> {
        const bindings = this.resolveWidgetBindings(widget)
        return {
            ...widget.props,
            ...bindings,
        }
    }

    /**
     * Get widgets for a specific region
     */
    getRegionWidgets(page: PageSpec, region: keyof PageSpec['widgets']): WidgetSpec[] {
        const widgets = page.widgets[region]
        if (!widgets) return []
        return widgets.filter(w => this.isWidgetVisible(w))
    }

    /**
     * Update binding context
     */
    updateContext(context: Partial<BindingContext>): void {
        this.bindingResolver.setContext(context)
    }
}

// =============================================================================
// Factory
// =============================================================================

export function createPageComposer(config: ComposerConfig): PageComposer {
    return new PageComposer(config)
}
