/**
 * Gazetteer - React Hooks
 */

import { useState, useEffect, useCallback, useMemo, useContext, createContext } from 'react'
import type { PageSpec, RouteSpec, ActionSpec } from '../types'
import { getRegistry } from '../runtime/registry'
import { BindingResolver, type BindingContext } from '../runtime/binding-resolver'
import { ActionEngine, type ActionHandlers, type ActionResult } from '../runtime/action-engine'

// =============================================================================
// Context
// =============================================================================

export interface GazetteerContextValue {
    registry: ReturnType<typeof getRegistry>
    actionEngine: ActionEngine | null
    bindingContext: BindingContext
}

export const GazetteerContext = createContext<GazetteerContextValue | null>(null)

export function useGazetteerContext(): GazetteerContextValue {
    const context = useContext(GazetteerContext)
    if (!context) {
        throw new Error('useGazetteerContext must be used within GazetteerProvider')
    }
    return context
}

// =============================================================================
// useGazetteerPage
// =============================================================================

export interface UseGazetteerPageResult {
    page: PageSpec | null
    route: RouteSpec | null
    isLoading: boolean
    error: string | null
    refetch: () => void
}

export function useGazetteerPage(pageId: string): UseGazetteerPageResult {
    const [page, setPage] = useState<PageSpec | null>(null)
    const [route, setRoute] = useState<RouteSpec | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const loadPage = useCallback(() => {
        setIsLoading(true)
        setError(null)

        try {
            const registry = getRegistry()
            const pageSpec = registry.getPage(pageId)

            if (!pageSpec) {
                setError(`Page not found: ${pageId}`)
                setPage(null)
            } else {
                setPage(pageSpec)

                // Find matching route
                const routes = registry.getAllRoutes()
                const matchingRoute = routes.find(r => r.pageRef === pageId)
                setRoute(matchingRoute ?? null)
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load page')
        } finally {
            setIsLoading(false)
        }
    }, [pageId])

    useEffect(() => {
        loadPage()
    }, [loadPage])

    return { page, route, isLoading, error, refetch: loadPage }
}

// =============================================================================
// useGazetteerRoute
// =============================================================================

export interface UseGazetteerRouteResult {
    route: RouteSpec | null
    page: PageSpec | null
    isLoading: boolean
    error: string | null
}

export function useGazetteerRoute(routeId: string): UseGazetteerRouteResult {
    const [route, setRoute] = useState<RouteSpec | null>(null)
    const [page, setPage] = useState<PageSpec | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    useEffect(() => {
        setIsLoading(true)
        setError(null)

        try {
            const registry = getRegistry()
            const routeSpec = registry.getRoute(routeId)

            if (!routeSpec) {
                setError(`Route not found: ${routeId}`)
                setRoute(null)
                setPage(null)
            } else {
                setRoute(routeSpec)
                const pageSpec = registry.getPage(routeSpec.pageRef)
                setPage(pageSpec ?? null)
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Failed to load route')
        } finally {
            setIsLoading(false)
        }
    }, [routeId])

    return { route, page, isLoading, error }
}

// =============================================================================
// useGazetteerAction
// =============================================================================

export interface UseGazetteerActionResult {
    execute: (actionId: string, context?: Record<string, unknown>) => Promise<ActionResult>
    isExecuting: boolean
    lastError: string | null
}

export function useGazetteerAction(handlers: ActionHandlers): UseGazetteerActionResult {
    const [isExecuting, setIsExecuting] = useState(false)
    const [lastError, setLastError] = useState<string | null>(null)

    const actionEngine = useMemo(() => new ActionEngine(handlers), [handlers])

    const execute = useCallback(async (
        actionId: string,
        context?: Record<string, unknown>
    ): Promise<ActionResult> => {
        setIsExecuting(true)
        setLastError(null)

        try {
            const result = await actionEngine.execute(actionId, {
                params: context as Record<string, string>,
            })

            if (!result.success) {
                setLastError(result.error ?? 'Action failed')
            }

            return result
        } catch (err) {
            const errorMsg = err instanceof Error ? err.message : 'Action execution failed'
            setLastError(errorMsg)
            return { success: false, error: errorMsg }
        } finally {
            setIsExecuting(false)
        }
    }, [actionEngine])

    return { execute, isExecuting, lastError }
}

// =============================================================================
// useGazetteerBindings
// =============================================================================

export function useGazetteerBindings(context: BindingContext): BindingResolver {
    return useMemo(() => new BindingResolver(context), [context])
}
