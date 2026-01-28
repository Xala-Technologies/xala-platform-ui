/**
 * Widget Renderer
 * 
 * Renders a widget from its WidgetSpec using platform-ui components.
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

function UnknownWidget({ type, widgetId }: { type: string; widgetId: string }) {
    if (process.env.NODE_ENV === 'development') {
        return (
            <div
                style={{
                    padding: '1rem',
                    background: '#fef3c7',
                    border: '1px dashed #f59e0b',
                    borderRadius: '0.5rem',
                    margin: '0.5rem 0',
                }}
            >
                <strong>Unknown Widget:</strong> {type}
                <br />
                <small>ID: {widgetId}</small>
            </div>
        )
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
    const Component = composer.config?.widgetRegistry?.get(spec.type)

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
    gap?: string
}

export function WidgetListRenderer({
    widgets,
    wrapper: Wrapper,
    gap = '1rem',
}: WidgetListRendererProps) {
    if (!widgets?.length) {
        return null
    }

    return (
        <div style={{ display: 'flex', flexDirection: 'column', gap }}>
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
        </div>
    )
}
