/**
 * Gazetteer Runtime - Registry
 * 
 * Central registry for all specs (routes, pages, flows, actions).
 */

import type { RouteSpec, PageSpec, FlowSpec, ActionSpec } from '../types'

// =============================================================================
// Registry Types
// =============================================================================

export interface GazetteerRegistry {
    routes: Map<string, RouteSpec>
    pages: Map<string, PageSpec>
    flows: Map<string, FlowSpec>
    actions: Map<string, ActionSpec>
}

export interface RegistryStats {
    routes: number
    pages: number
    flows: number
    actions: number
    total: number
}

// =============================================================================
// Registry Implementation
// =============================================================================

class GazetteerRegistryImpl implements GazetteerRegistry {
    routes = new Map<string, RouteSpec>()
    pages = new Map<string, PageSpec>()
    flows = new Map<string, FlowSpec>()
    actions = new Map<string, ActionSpec>()

    // Routes
    registerRoute(spec: RouteSpec): void {
        this.routes.set(spec.routeId, spec)
    }

    getRoute(routeId: string): RouteSpec | undefined {
        return this.routes.get(routeId)
    }

    getRouteByPath(path: string): RouteSpec | undefined {
        for (const route of this.routes.values()) {
            if (route.path === path) return route
        }
        return undefined
    }

    // Pages
    registerPage(spec: PageSpec): void {
        this.pages.set(spec.pageId, spec)
    }

    getPage(pageId: string): PageSpec | undefined {
        return this.pages.get(pageId)
    }

    // Flows
    registerFlow(spec: FlowSpec): void {
        this.flows.set(spec.flowId, spec)
    }

    getFlow(flowId: string): FlowSpec | undefined {
        return this.flows.get(flowId)
    }

    // Actions
    registerAction(spec: ActionSpec): void {
        this.actions.set(spec.actionId, spec)
    }

    getAction(actionId: string): ActionSpec | undefined {
        return this.actions.get(actionId)
    }

    // Bulk registration
    registerSpecs(specs: {
        routes?: RouteSpec[]
        pages?: PageSpec[]
        flows?: FlowSpec[]
        actions?: ActionSpec[]
    }): void {
        specs.routes?.forEach(r => this.registerRoute(r))
        specs.pages?.forEach(p => this.registerPage(p))
        specs.flows?.forEach(f => this.registerFlow(f))
        specs.actions?.forEach(a => this.registerAction(a))
    }

    // Stats
    getStats(): RegistryStats {
        return {
            routes: this.routes.size,
            pages: this.pages.size,
            flows: this.flows.size,
            actions: this.actions.size,
            total: this.routes.size + this.pages.size + this.flows.size + this.actions.size,
        }
    }

    // Clear
    clear(): void {
        this.routes.clear()
        this.pages.clear()
        this.flows.clear()
        this.actions.clear()
    }

    // List all
    getAllRoutes(): RouteSpec[] {
        return Array.from(this.routes.values())
    }

    getAllPages(): PageSpec[] {
        return Array.from(this.pages.values())
    }

    getAllFlows(): FlowSpec[] {
        return Array.from(this.flows.values())
    }

    getAllActions(): ActionSpec[] {
        return Array.from(this.actions.values())
    }
}

// =============================================================================
// Singleton
// =============================================================================

let registryInstance: GazetteerRegistryImpl | null = null

export function getRegistry(): GazetteerRegistryImpl {
    if (!registryInstance) {
        registryInstance = new GazetteerRegistryImpl()
    }
    return registryInstance
}

export function resetRegistry(): void {
    registryInstance?.clear()
    registryInstance = null
}

export function createRegistry(): GazetteerRegistryImpl {
    return new GazetteerRegistryImpl()
}

export { GazetteerRegistryImpl }
