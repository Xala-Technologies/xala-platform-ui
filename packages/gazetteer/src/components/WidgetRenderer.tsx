/**
 * Widget Renderer
 * 
 * Renders a widget from its WidgetSpec using platform-ui components.
 * 
 * DESIGN SYSTEM COMPLIANT: Uses only Designsystemet components.
 */

import React, { type ReactNode, useCallback, useMemo } from 'react'
import type { WidgetSpec } from '../types'
import { useGazetteer } from './GazetteerProvider'

// =============================================================================
// Types
// =============================================================================

export interface WidgetRendererProps {
    /** The widget specification */
    spec: WidgetSpec

    /** Optional override props */
    overrideProps?: Record<string, unknown>

    /** Fallback for unknown widget types */
    fallback?: ReactNode
}

export interface WidgetWrapperProps {
    widgetId: string
    type: string
    children: ReactNode
}

// =============================================================================
// Unknown Widget Fallback
// =============================================================================

/**
 * Development-only warning for unknown widget types.
 * Returns null in production - no visual output.
 */
function UnknownWidget({ type, widgetId }: { type: string; widgetId: string }) {
    if (process.env.NODE_ENV === 'development') {
        // In development, log to console instead of rendering raw HTML
        console.warn(`[Gazetteer] Unknown widget type: "${type}" (id: ${widgetId})`)
    }
    return null
}

// =============================================================================
// Widget Renderer Component
// =============================================================================

export function WidgetRenderer({
    spec,
    overrideProps = {},
    fallback,
}: WidgetRendererProps) {
    const { composer, actionEngine } = useGazetteer()

    // Check visibility
    const isVisible = useMemo(
        () => composer.isWidgetVisible(spec),
        [composer, spec]
    )

    // Prepare props with resolved bindings
    const resolvedProps = useMemo(() => {
        const baseProps = composer.prepareWidgetProps(spec)
        return { ...baseProps, ...overrideProps }
    }, [composer, spec, overrideProps])

    // Action handler
    const handleAction = useCallback(async (
        actionId: string,
        context?: Record<string, unknown>
    ) => {
        return actionEngine.execute(actionId, {
            params: context as Record<string, string>,
        })
    }, [actionEngine])

    // Don't render if not visible
    if (!isVisible) {
        return null
    }

    // Get the component for this widget type
    const Component = composer.getWidgetComponent(spec.type)

    // Fallback for unknown types
    if (!Component) {
        return fallback ?? <UnknownWidget type={spec.type} widgetId={spec.widgetId} />
    }

    // Render the widget
    return (
        <Component
            spec={spec}
            bindings={resolvedProps}
            onAction={handleAction}
            {...resolvedProps}
        />
    )
}

// =============================================================================
// Widget List Renderer
// =============================================================================

export interface WidgetListRendererProps {
    widgets: WidgetSpec[]
    wrapper?: React.ComponentType<WidgetWrapperProps>
    /** Gap token - uses design system spacing */
    gap?: 'sm' | 'md' | 'lg'
}

/**
 * Renders a list of widgets.
 * Uses React.Fragment for layout - parent component should handle spacing.
 */
export function WidgetListRenderer({
    widgets,
    wrapper: Wrapper,
}: WidgetListRendererProps) {
    if (!widgets?.length) {
        return null
    }

    return (
        <>
            {widgets.map((widget) => {
                const rendered = <WidgetRenderer key={widget.widgetId} spec={widget} />

                if (Wrapper) {
                    return (
                        <Wrapper
                            key={widget.widgetId}
                            widgetId={widget.widgetId}
                            type={widget.type}
                        >
                            {rendered}
                        </Wrapper>
                    )
                }

                return rendered
            })}
        </>
    )
}

