/**
 * Page Renderer
 * 
 * Renders a complete page from its PageSpec, including shell,
 * header, content, sidebar, and overlays.
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

    /** Loading component */
    loadingComponent?: ReactNode

    /** Error component */
    errorComponent?: (error: string) => ReactNode

    /** Custom shell component override */
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
// Default Components
// =============================================================================

function DefaultLoading() {
    return (
        <div style={{ padding: '2rem', textAlign: 'center' }}>
            <div style={{
                width: '2rem',
                height: '2rem',
                border: '3px solid #e5e7eb',
                borderTopColor: '#3b82f6',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                margin: '0 auto',
            }} />
            <p style={{ marginTop: '1rem', color: '#6b7280' }}>Loading page...</p>
        </div>
    )
}

function DefaultError({ error }: { error: string }) {
    return (
        <div style={{
            padding: '2rem',
            background: '#fef2f2',
            border: '1px solid #fecaca',
            borderRadius: '0.5rem',
            margin: '1rem',
        }}>
            <h3 style={{ color: '#dc2626', margin: 0 }}>Page Error</h3>
            <p style={{ color: '#7f1d1d', marginTop: '0.5rem' }}>{error}</p>
        </div>
    )
}

function DefaultShell({ children, header, sidebar }: ShellProps) {
    return (
        <div style={{ display: 'flex', minHeight: '100vh' }}>
            {sidebar && (
                <aside style={{ width: '256px', borderRight: '1px solid #e5e7eb' }}>
                    {sidebar}
                </aside>
            )}
            <main style={{ flex: 1 }}>
                {header && (
                    <header style={{ borderBottom: '1px solid #e5e7eb', padding: '1rem' }}>
                        {header}
                    </header>
                )}
                <div style={{ padding: '1.5rem' }}>
                    {children}
                </div>
            </main>
        </div>
    )
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
    const { composer, updateContext } = useGazetteer()

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
        <WidgetListRenderer widgets={page.widgets.header} gap="0.5rem" />
    ) : null

    // Render sidebar widgets
    const sidebarContent = page.widgets.sidebar?.length ? (
        <WidgetListRenderer widgets={page.widgets.sidebar} gap="1rem" />
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
            <WidgetListRenderer widgets={page.widgets.content} gap="1.5rem" />

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
