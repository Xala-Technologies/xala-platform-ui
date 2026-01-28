/**
 * Gazetteer Router
 * 
 * Dynamically creates routes from registered RouteSpecs
 * and renders pages using PageRenderer.
 */

import React, { useMemo, type ReactNode } from 'react'
import { Routes, Route, Navigate, useLocation } from 'react-router-dom'
import type { RouteSpec } from '../types'
import { useGazetteer } from './GazetteerProvider'
import { PageRenderer, PageRendererWithSuspense } from './PageRenderer'

// =============================================================================
// Types
// =============================================================================

export interface GazetteerRouterProps {
    /** Base path prefix for all routes */
    basePath?: string

    /** Default redirect path when no route matches */
    defaultRedirect?: string

    /** Loading component for page transitions */
    loadingComponent?: ReactNode

    /** Error component for failed pages */
    errorComponent?: (error: string) => ReactNode

    /** Whether to use Suspense for page loading */
    useSuspense?: boolean

    /** Custom route wrapper component */
    routeWrapper?: React.ComponentType<RouteWrapperProps>

    /** Filter function to include/exclude routes */
    routeFilter?: (route: RouteSpec) => boolean
}

export interface RouteWrapperProps {
    route: RouteSpec
    children: ReactNode
}

// =============================================================================
// Route Element Component
// =============================================================================

interface RouteElementProps {
    route: RouteSpec
    loadingComponent?: ReactNode
    errorComponent?: (error: string) => ReactNode
    useSuspense?: boolean
    wrapper?: React.ComponentType<RouteWrapperProps>
}

function RouteElement({
    route,
    loadingComponent,
    errorComponent,
    useSuspense = true,
    wrapper: Wrapper,
}: RouteElementProps) {
    const Renderer = useSuspense ? PageRendererWithSuspense : PageRenderer

    const pageElement = (
        <Renderer
            pageId={route.pageRef}
            loadingComponent={loadingComponent}
            errorComponent={errorComponent}
        />
    )

    if (Wrapper) {
        return <Wrapper route={route}>{pageElement}</Wrapper>
    }

    return pageElement
}

// =============================================================================
// Navigation Helper
// =============================================================================

export interface NavigationItem {
    routeId: string
    path: string
    label: string
    icon?: string
    group: string
    order: number
    isActive: boolean
}

export function useGazetteerNavigation(): NavigationItem[] {
    const { registry } = useGazetteer()
    const location = useLocation()

    return useMemo(() => {
        const routes = registry.getAllRoutes()

        return routes
            .filter(route => route.navigation?.group !== 'hidden')
            .map(route => ({
                routeId: route.routeId,
                path: route.path,
                label: route.navigation?.labelKey ?? route.routeId,
                icon: route.navigation?.icon,
                group: route.navigation?.group ?? 'main',
                order: route.navigation?.order ?? 999,
                isActive: location.pathname === route.path ||
                    location.pathname.startsWith(route.path + '/'),
            }))
            .sort((a, b) => a.order - b.order)
    }, [registry, location.pathname])
}

// =============================================================================
// Gazetteer Router Component
// =============================================================================

export function GazetteerRouter({
    basePath = '',
    defaultRedirect,
    loadingComponent,
    errorComponent,
    useSuspense = true,
    routeWrapper,
    routeFilter,
}: GazetteerRouterProps) {
    const { registry } = useGazetteer()

    // Get all routes and apply filter
    const routes = useMemo(() => {
        let allRoutes = registry.getAllRoutes()

        if (routeFilter) {
            allRoutes = allRoutes.filter(routeFilter)
        }

        // Sort by navigation order
        return allRoutes.sort((a, b) =>
            (a.navigation?.order ?? 999) - (b.navigation?.order ?? 999)
        )
    }, [registry, routeFilter])

    // Determine default route
    const firstRoute = routes[0]
    const redirectPath = defaultRedirect ?? firstRoute?.path ?? '/'

    return (
        <Routes>
            {routes.map((route) => (
                <Route
                    key={route.routeId}
                    path={basePath + route.path}
                    element={
                        <RouteElement
                            route={route}
                            loadingComponent={loadingComponent}
                            errorComponent={errorComponent}
                            useSuspense={useSuspense}
                            wrapper={routeWrapper}
                        />
                    }
                />
            ))}

            {/* Catch-all redirect */}
            <Route
                path="*"
                element={<Navigate to={basePath + redirectPath} replace />}
            />
        </Routes>
    )
}

// =============================================================================
// Standalone Router (includes BrowserRouter)
// =============================================================================

import { BrowserRouter } from 'react-router-dom'

export function GazetteerBrowserRouter(props: GazetteerRouterProps) {
    return (
        <BrowserRouter>
            <GazetteerRouter {...props} />
        </BrowserRouter>
    )
}
