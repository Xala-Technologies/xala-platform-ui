/**
 * Gazetteer - React Components
 * 
 * Platform-UI integrated page and widget renderers.
 */

import * as React from 'react'
import type { PageSpec, WidgetSpec, ShellType } from '../types'
import { PageComposer } from '../runtime/composer'
import type { BindingContext } from '../runtime/binding-resolver'

// =============================================================================
// Types
// =============================================================================

export interface GazetteerProviderProps {
    children: React.ReactNode
    widgetComponents: Record<string, React.ComponentType<WidgetRendererProps>>
    shellComponents: Record<ShellType, React.ComponentType<ShellRendererProps>>
    actionHandlers: {
        navigate: (target: string, params?: Record<string, string>) => void
        openDrawer: (id: string, context?: Record<string, string>) => void
        closeDrawer: (id?: string) => void
        openModal: (id: string, context?: Record<string, string>) => void
        closeModal: (id?: string) => void
        callController: (ref: string, method: string, params?: Record<string, unknown>) => Promise<unknown>
        download: (url: string, filename?: string) => void
        toast: (message: string, variant?: string) => void
        translate: (key: string) => string
    }
    bindingContext?: BindingContext
}

export interface WidgetRendererProps {
    spec: WidgetSpec
    bindings: Record<string, unknown>
    onAction: (actionId: string, context?: Record<string, unknown>) => void
}

export interface ShellRendererProps {
    children: React.ReactNode
    header?: React.ReactNode
    sidebar?: React.ReactNode
}

export interface GazetteerPageProps {
    spec: PageSpec
    className?: string
}

// =============================================================================
// Context
// =============================================================================

interface GazetteerComponentsContextValue {
    widgets: Record<string, React.ComponentType<WidgetRendererProps>>
    shells: Record<ShellType, React.ComponentType<ShellRendererProps>>
    actionHandlers: GazetteerProviderProps['actionHandlers']
    bindingContext: BindingContext
}

const GazetteerComponentsContext = React.createContext<GazetteerComponentsContextValue | null>(null)

export function GazetteerProvider({
    children,
    widgetComponents,
    shellComponents,
    actionHandlers,
    bindingContext = {},
}: GazetteerProviderProps): React.ReactElement {
    const value = React.useMemo(() => ({
        widgets: widgetComponents,
        shells: shellComponents,
        actionHandlers,
        bindingContext,
    }), [widgetComponents, shellComponents, actionHandlers, bindingContext])

    return (
        <GazetteerComponentsContext.Provider value={value}>
            {children}
        </GazetteerComponentsContext.Provider>
    )
}

function useGazetteerComponents(): GazetteerComponentsContextValue {
    const ctx = React.useContext(GazetteerComponentsContext)
    if (!ctx) {
        throw new Error('GazetteerPage must be used within GazetteerProvider')
    }
    return ctx
}

// =============================================================================
// Widget Renderer
// =============================================================================

export interface WidgetProps {
    widget: WidgetSpec
    composer: PageComposer
    onAction: (actionId: string, context?: Record<string, unknown>) => void
}

export function Widget({ widget, composer, onAction }: WidgetProps): React.ReactElement | null {
    const { widgets } = useGazetteerComponents()

    // Check visibility
    if (!composer.isWidgetVisible(widget)) {
        return null
    }

    // Get component
    const Component = widgets[widget.type]
    if (!Component) {
        console.warn(`Unknown widget type: ${widget.type}. Available: ${Object.keys(widgets).join(', ')}`)
        return null
    }

    // Prepare props
    const bindings = composer.resolveWidgetBindings(widget)

    return (
        <Component
            spec={widget}
            bindings={{ ...widget.props, ...bindings }}
            onAction={onAction}
        />
    )
}

// =============================================================================
// Region Renderer
// =============================================================================

interface RegionProps {
    widgets: WidgetSpec[]
    composer: PageComposer
    onAction: (actionId: string, context?: Record<string, unknown>) => void
}

function Region({ widgets, composer, onAction }: RegionProps): React.ReactElement {
    return (
        <>
            {widgets.map((widget) => (
                <Widget
                    key={widget.widgetId}
                    widget={widget}
                    composer={composer}
                    onAction={onAction}
                />
            ))}
        </>
    )
}

// =============================================================================
// Gazetteer Page
// =============================================================================

export function GazetteerPage({ spec, className }: GazetteerPageProps): React.ReactElement {
    const { shells, bindingContext } = useGazetteerComponents()

    // Create composer
    const composer = React.useMemo(() => new PageComposer({
        widgetRegistry: { get: () => undefined },
        shellRegistry: { get: () => undefined },
        bindingContext,
    }), [bindingContext])

    // Action handler
    const handleAction = React.useCallback((actionId: string, context?: Record<string, unknown>) => {
        console.log('Action:', actionId, context)
    }, [])

    // Get shell component
    const ShellComponent = shells[spec.shellType]
    if (!ShellComponent) {
        console.warn(`Unknown shell type: ${spec.shellType}`)
        return <div className={className}>Unknown shell: {spec.shellType}</div>
    }

    // Render regions
    const headerWidgets = composer.getRegionWidgets(spec, 'header')
    const contentWidgets = composer.getRegionWidgets(spec, 'content')
    const sidebarWidgets = composer.getRegionWidgets(spec, 'sidebar')

    return (
        <ShellComponent
            header={headerWidgets.length > 0 ? <Region widgets={headerWidgets} composer={composer} onAction={handleAction} /> : undefined}
            sidebar={sidebarWidgets.length > 0 ? <Region widgets={sidebarWidgets} composer={composer} onAction={handleAction} /> : undefined}
        >
            <div className={className}>
                <Region widgets={contentWidgets} composer={composer} onAction={handleAction} />
            </div>
        </ShellComponent>
    )
}

// =============================================================================
// Loading/Error States
// =============================================================================

export function GazetteerLoading(): React.ReactElement {
    return <div>Loading...</div>
}

export function GazetteerError({ message }: { message: string }): React.ReactElement {
    return <div>Error: {message}</div>
}

export function GazetteerNotFound({ pageId }: { pageId: string }): React.ReactElement {
    return <div>Page not found: {pageId}</div>
}
