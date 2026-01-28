/**
 * Gazetteer Runtime - Page Composer
 * 
 * Composes pages from specs using platform-ui components.
 */

import type { PageSpec, WidgetSpec, ShellType } from '../types'
import { BindingResolver, type BindingContext } from './binding-resolver'

// =============================================================================
// Types
// =============================================================================

export interface ComposerConfig {
    widgetRegistry: WidgetComponentRegistry
    shellRegistry: ShellComponentRegistry
    bindingContext: BindingContext
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

    constructor(config: ComposerConfig) {
        this.config = config
        this.bindingResolver = new BindingResolver(config.bindingContext)
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
     * Check if a widget is visible based on conditions
     */
    isWidgetVisible(widget: WidgetSpec): boolean {
        if (!widget.visibility) return true

        // Check permission-based visibility
        if (widget.visibility.permissionKeys?.length) {
            // Permission check delegated to context
            // For now, assume visible
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
