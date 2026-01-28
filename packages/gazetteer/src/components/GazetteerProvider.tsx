/**
 * Gazetteer Provider
 * 
 * React context provider that initializes the Gazetteer runtime
 * with registry, composer, and action engine.
 */

import React, { createContext, useContext, useMemo, useEffect, type ReactNode } from 'react'
import { getRegistry, resetRegistry, type GazetteerRegistry } from '../runtime/registry'
import { PageComposer, createPageComposer, type ComposerConfig } from '../runtime/composer'
import { ActionEngine, createActionEngine, type ActionHandlers } from '../runtime/action-engine'
import { BindingResolver, type BindingContext } from '../runtime/binding-resolver'
import type { RouteSpec, PageSpec, FlowSpec, ActionSpec } from '../types'

// =============================================================================
// Types
// =============================================================================

export interface GazetteerProviderProps {
    children: ReactNode

    /** Initial specs to register */
    specs?: {
        routes?: RouteSpec[]
        pages?: PageSpec[]
        flows?: FlowSpec[]
        actions?: ActionSpec[]
    }

    /** Action handlers for executing actions */
    actionHandlers?: ActionHandlers

    /** Initial binding context (vm, form, user data) */
    bindingContext?: BindingContext

    /** Widget component registry */
    widgetRegistry?: ComposerConfig['widgetRegistry']

    /** Shell component registry */
    shellRegistry?: ComposerConfig['shellRegistry']

    /** Reset registry on mount (useful for testing) */
    resetOnMount?: boolean
}

export interface GazetteerContextValue {
    /** The spec registry */
    registry: ReturnType<typeof getRegistry>

    /** Page composer for resolving bindings and components */
    composer: PageComposer

    /** Action engine for executing actions */
    actionEngine: ActionEngine

    /** Binding resolver */
    bindingResolver: BindingResolver

    /** Update the binding context (e.g., when data changes) */
    updateContext: (context: Partial<BindingContext>) => void

    /** Re-register specs */
    registerSpecs: (specs: GazetteerProviderProps['specs']) => void
}

// =============================================================================
// Context
// =============================================================================

const GazetteerContext = createContext<GazetteerContextValue | null>(null)

// =============================================================================
// Default Registries
// =============================================================================

const defaultWidgetRegistry: ComposerConfig['widgetRegistry'] = {
    get: () => undefined  // Will be populated with platform-ui components
}

const defaultShellRegistry: ComposerConfig['shellRegistry'] = {
    get: () => undefined  // Will be populated with platform-ui shells
}

const defaultBindingContext: BindingContext = {
    vm: {},
    form: {},
    route: {},
    user: {},
    config: {},
}

// =============================================================================
// Provider Component
// =============================================================================

export function GazetteerProvider({
    children,
    specs,
    actionHandlers = {},
    bindingContext = defaultBindingContext,
    widgetRegistry = defaultWidgetRegistry,
    shellRegistry = defaultShellRegistry,
    resetOnMount = false,
}: GazetteerProviderProps) {
    // Get or create registry
    const registry = useMemo(() => {
        if (resetOnMount) {
            resetRegistry()
        }
        return getRegistry()
    }, [resetOnMount])

    // Create binding resolver
    const bindingResolver = useMemo(
        () => new BindingResolver(bindingContext),
        [bindingContext]
    )

    // Create page composer
    const composer = useMemo(
        () => createPageComposer({
            widgetRegistry,
            shellRegistry,
            bindingContext,
        }),
        [widgetRegistry, shellRegistry, bindingContext]
    )

    // Create action engine
    const actionEngine = useMemo(
        () => createActionEngine(actionHandlers),
        [actionHandlers]
    )

    // Register initial specs
    useEffect(() => {
        if (specs) {
            registry.registerSpecs({
                routes: specs.routes,
                pages: specs.pages,
                flows: specs.flows,
                actions: specs.actions,
            })
        }
    }, [registry, specs])

    // Context value
    const value = useMemo<GazetteerContextValue>(() => ({
        registry,
        composer,
        actionEngine,
        bindingResolver,
        updateContext: (context: Partial<BindingContext>) => {
            bindingResolver.setContext(context)
            composer.updateContext(context)
        },
        registerSpecs: (newSpecs) => {
            if (newSpecs) {
                registry.registerSpecs({
                    routes: newSpecs.routes,
                    pages: newSpecs.pages,
                    flows: newSpecs.flows,
                    actions: newSpecs.actions,
                })
            }
        },
    }), [registry, composer, actionEngine, bindingResolver])

    return (
        <GazetteerContext.Provider value={value}>
            {children}
        </GazetteerContext.Provider>
    )
}

// =============================================================================
// Hook
// =============================================================================

export function useGazetteer(): GazetteerContextValue {
    const context = useContext(GazetteerContext)
    if (!context) {
        throw new Error('useGazetteer must be used within a GazetteerProvider')
    }
    return context
}

// =============================================================================
// Utility Hooks
// =============================================================================

export function useGazetteerRegistry() {
    const { registry } = useGazetteer()
    return registry
}

export function useGazetteerComposer() {
    const { composer } = useGazetteer()
    return composer
}

export function useGazetteerActionEngine() {
    const { actionEngine } = useGazetteer()
    return actionEngine
}
