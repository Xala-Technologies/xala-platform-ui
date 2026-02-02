/**
 * Page Renderer
 * 
 * Renders a complete page from its PageSpec, including shell,
 * header, content, sidebar, and overlays.
 * 
 * DESIGN SYSTEM COMPLIANT: No raw HTML or inline styles.
 * Default components return null - consuming apps must provide overrides.
 */

import React, { type ReactNode, useMemo, Suspense } from 'react'
import type { PageSpec, ShellType } from '../types'
import { useGazetteerPage } from '../hooks'
import { useGazetteer } from './GazetteerProvider'
import { WidgetListRenderer } from './WidgetRenderer'

// =============================================================================
// Types
// =============================================================================

export interface PageRendererProps {
    /** Page ID to render */
    pageId: string

    /** Loading component - REQUIRED for proper UX */
    loadingComponent?: ReactNode

    /** Error component - receives error message */
    errorComponent?: (error: string) => ReactNode

    /** Custom shell component override - REQUIRED for proper rendering */
    shellOverride?: React.ComponentType<ShellProps>

    /** Additional binding context for this page */
    pageContext?: Record<string, unknown>
}

export interface ShellProps {
    shellType: ShellType
    children: ReactNode
    header?: ReactNode
    sidebar?: ReactNode
    overlays?: ReactNode
}

// =============================================================================
// Default Components (Minimal - No Styling)
// =============================================================================

/**
 * Default loading state - returns null.
 * Consuming apps should provide loadingComponent for proper UX.
 */
function DefaultLoading() {
    if (process.env.NODE_ENV === 'development') {
        console.warn('[Gazetteer] No loadingComponent provided to PageRenderer')
    }
    return null
}

/**
 * Default error handler - logs to console in development.
 * Consuming apps should provide errorComponent for proper UX.
 */
function DefaultError({ error }: { error: string }) {
    if (process.env.NODE_ENV === 'development') {
        console.error('[Gazetteer] Page error:', error)
    }
    return null
}

/**
 * Default shell - renders children directly without layout.
 * Consuming apps should provide shellOverride for proper shell rendering.
 */
function DefaultShell({ children }: ShellProps) {
    if (process.env.NODE_ENV === 'development') {
        console.warn('[Gazetteer] No shellOverride provided to PageRenderer - rendering without shell')
    }
    return <>{children}</>
}

// =============================================================================
// Page Renderer Component
// =============================================================================

export function PageRenderer({
    pageId,
    loadingComponent,
    errorComponent,
    shellOverride,
    pageContext,
}: PageRendererProps) {
    const { page, isLoading, error } = useGazetteerPage(pageId)
    const { updateContext } = useGazetteer()

    // Update context with page-specific data
    useMemo(() => {
        if (pageContext) {
            updateContext({ vm: pageContext })
        }
    }, [pageContext, updateContext])

    // Loading state
    if (isLoading) {
        return <>{loadingComponent ?? <DefaultLoading />}</>
    }

    // Error state
    if (error || !page) {
        const errorMessage = error ?? `Page not found: ${pageId}`
        return <>{errorComponent ? errorComponent(errorMessage) : <DefaultError error={errorMessage} />}</>
    }

    // Get shell component
    const ShellComponent = shellOverride ?? DefaultShell

    // Render header widgets
    const headerContent = page.widgets.header?.length ? (
        <WidgetListRenderer widgets={page.widgets.header} />
    ) : null

    // Render sidebar widgets
    const sidebarContent = page.widgets.sidebar?.length ? (
        <WidgetListRenderer widgets={page.widgets.sidebar} />
    ) : null

    // Render overlay widgets (modals, drawers)
    const overlaysContent = page.widgets.overlays?.length ? (
        <Suspense fallback={null}>
            <WidgetListRenderer widgets={page.widgets.overlays} />
        </Suspense>
    ) : null

    return (
        <ShellComponent
            shellType={page.shellType}
            header={headerContent}
            sidebar={sidebarContent}
            overlays={overlaysContent}
        >
            {/* Main content */}
            <WidgetListRenderer widgets={page.widgets.content} />

            {/* Overlays rendered at end */}
            {overlaysContent}
        </ShellComponent>
    )
}

// =============================================================================
// Page Renderer with Suspense
// =============================================================================

export function PageRendererWithSuspense(props: PageRendererProps) {
    return (
        <Suspense fallback={props.loadingComponent ?? <DefaultLoading />}>
            <PageRenderer {...props} />
        </Suspense>
    )
}
