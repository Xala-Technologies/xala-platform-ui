/**
 * Spec Loader
 *
 * Loads Gazetteer specifications by ID with caching support.
 * Handles route, page, flow, and action specs.
 */

import type { RouteSpec, PageSpec, FlowSpec, ActionSpec } from '../../types';
import {
  SpecCache,
  getRouteCache,
  getPageCache,
  getFlowCache,
  getActionCache,
} from './spec-cache';

// ============================================================================
// Types
// ============================================================================

/**
 * Spec types supported by the loader
 */
export type SpecType = 'route' | 'page' | 'flow' | 'action';

/**
 * Map spec type to its TypeScript type
 */
export type SpecTypeMap = {
  route: RouteSpec;
  page: PageSpec;
  flow: FlowSpec;
  action: ActionSpec;
};

/**
 * Spec loader configuration
 */
export interface SpecLoaderConfig {
  /** Base path for spec files (used in Node.js) */
  specsDir: string;
  /** Enable HMR (Hot Module Replacement) watching */
  enableHMR: boolean;
  /** Validate specs on load */
  validateOnLoad: boolean;
  /** Custom spec resolver (for bundled specs) */
  resolver?: SpecResolver;
}

/**
 * Custom spec resolver function type
 */
export type SpecResolver = <T extends SpecType>(
  type: T,
  id: string
) => Promise<SpecTypeMap[T] | null>;

/**
 * Spec load result with metadata
 */
export interface SpecLoadResult<T> {
  spec: T | null;
  fromCache: boolean;
  loadTime: number;
  error: Error | null;
}

/**
 * Batch load result
 */
export interface BatchLoadResult<T> {
  specs: Map<string, T>;
  errors: Map<string, Error>;
  fromCache: number;
  loadTime: number;
}

// ============================================================================
// Default Configuration
// ============================================================================

const DEFAULT_CONFIG: SpecLoaderConfig = {
  specsDir: './specs',
  enableHMR: false,
  validateOnLoad: true,
};

// ============================================================================
// Spec Registry (for bundled specs)
// ============================================================================

/**
 * In-memory registry for pre-bundled specs
 */
const specRegistry: {
  routes: Map<string, RouteSpec>;
  pages: Map<string, PageSpec>;
  flows: Map<string, FlowSpec>;
  actions: Map<string, ActionSpec>;
} = {
  routes: new Map(),
  pages: new Map(),
  flows: new Map(),
  actions: new Map(),
};

/**
 * Register a route spec
 */
export function registerRoute(spec: RouteSpec): void {
  specRegistry.routes.set(spec.routeId, spec);
}

/**
 * Register a page spec
 */
export function registerPage(spec: PageSpec): void {
  specRegistry.pages.set(spec.pageId, spec);
}

/**
 * Register a flow spec
 */
export function registerFlow(spec: FlowSpec): void {
  specRegistry.flows.set(spec.flowId, spec);
}

/**
 * Register an action spec
 */
export function registerAction(spec: ActionSpec): void {
  specRegistry.actions.set(spec.actionId, spec);
}

/**
 * Register multiple specs at once
 */
export function registerSpecs(specs: {
  routes?: RouteSpec[];
  pages?: PageSpec[];
  flows?: FlowSpec[];
  actions?: ActionSpec[];
}): void {
  specs.routes?.forEach((s) => registerRoute(s));
  specs.pages?.forEach((s) => registerPage(s));
  specs.flows?.forEach((s) => registerFlow(s));
  specs.actions?.forEach((s) => registerAction(s));
}

/**
 * Clear all registered specs (for testing)
 */
export function clearRegistry(): void {
  specRegistry.routes.clear();
  specRegistry.pages.clear();
  specRegistry.flows.clear();
  specRegistry.actions.clear();
}

// ============================================================================
// Spec Loader Class
// ============================================================================

/**
 * Spec Loader
 *
 * Loads and caches Gazetteer specifications.
 */
export class SpecLoader {
  private config: SpecLoaderConfig;
  private routeCache: SpecCache;
  private pageCache: SpecCache;
  private flowCache: SpecCache;
  private actionCache: SpecCache;
  private hmrSubscribers: Set<(type: SpecType, id: string) => void> = new Set();

  constructor(config: Partial<SpecLoaderConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.routeCache = getRouteCache();
    this.pageCache = getPageCache();
    this.flowCache = getFlowCache();
    this.actionCache = getActionCache();
  }

  /**
   * Get the cache for a spec type
   */
  private getCacheForType(type: SpecType): SpecCache {
    switch (type) {
      case 'route':
        return this.routeCache;
      case 'page':
        return this.pageCache;
      case 'flow':
        return this.flowCache;
      case 'action':
        return this.actionCache;
    }
  }

  /**
   * Get the registry for a spec type
   */
  private getRegistryForType<T extends SpecType>(
    type: T
  ): Map<string, SpecTypeMap[T]> {
    switch (type) {
      case 'route':
        return specRegistry.routes as Map<string, SpecTypeMap[T]>;
      case 'page':
        return specRegistry.pages as Map<string, SpecTypeMap[T]>;
      case 'flow':
        return specRegistry.flows as Map<string, SpecTypeMap[T]>;
      case 'action':
        return specRegistry.actions as Map<string, SpecTypeMap[T]>;
      default:
        throw new Error(`Unknown spec type: ${type}`);
    }
  }

  /**
   * Load a spec from the registry or resolver
   */
  private async loadFromSource<T extends SpecType>(
    type: T,
    id: string
  ): Promise<SpecTypeMap[T] | null> {
    // First, check the registry
    const registry = this.getRegistryForType(type);
    const fromRegistry = registry.get(id);
    if (fromRegistry) {
      return fromRegistry;
    }

    // Then, try custom resolver
    if (this.config.resolver) {
      return this.config.resolver(type, id);
    }

    // No spec found
    return null;
  }

  /**
   * Load a spec by type and ID
   */
  async load<T extends SpecType>(
    type: T,
    id: string
  ): Promise<SpecLoadResult<SpecTypeMap[T]>> {
    const startTime = performance.now();
    const cache = this.getCacheForType(type);
    const cacheKey = `${type}:${id}`;

    // Check cache first
    const cached = cache.get(cacheKey) as SpecTypeMap[T] | undefined;
    if (cached) {
      return {
        spec: cached,
        fromCache: true,
        loadTime: performance.now() - startTime,
        error: null,
      };
    }

    // Load from source
    try {
      const spec = await this.loadFromSource(type, id);

      if (spec) {
        cache.set(cacheKey, spec);
      }

      return {
        spec,
        fromCache: false,
        loadTime: performance.now() - startTime,
        error: null,
      };
    } catch (error) {
      return {
        spec: null,
        fromCache: false,
        loadTime: performance.now() - startTime,
        error: error instanceof Error ? error : new Error(String(error)),
      };
    }
  }

  /**
   * Load multiple specs of the same type
   */
  async loadBatch<T extends SpecType>(
    type: T,
    ids: string[]
  ): Promise<BatchLoadResult<SpecTypeMap[T]>> {
    const startTime = performance.now();
    const specs = new Map<string, SpecTypeMap[T]>();
    const errors = new Map<string, Error>();
    let fromCache = 0;

    const results = await Promise.all(
      ids.map((id) => this.load(type, id).then((r) => ({ id, ...r })))
    );

    for (const result of results) {
      if (result.spec) {
        specs.set(result.id, result.spec);
        if (result.fromCache) {
          fromCache++;
        }
      } else if (result.error) {
        errors.set(result.id, result.error);
      }
    }

    return {
      specs,
      errors,
      fromCache,
      loadTime: performance.now() - startTime,
    };
  }

  /**
   * Load a route spec
   */
  async loadRoute(id: string): Promise<RouteSpec | null> {
    const result = await this.load('route', id);
    return result.spec;
  }

  /**
   * Load a page spec
   */
  async loadPage(id: string): Promise<PageSpec | null> {
    const result = await this.load('page', id);
    return result.spec;
  }

  /**
   * Load a flow spec
   */
  async loadFlow(id: string): Promise<FlowSpec | null> {
    const result = await this.load('flow', id);
    return result.spec;
  }

  /**
   * Load an action spec
   */
  async loadAction(id: string): Promise<ActionSpec | null> {
    const result = await this.load('action', id);
    return result.spec;
  }

  /**
   * Load all actions referenced by a page
   */
  async loadPageActions(page: PageSpec): Promise<Map<string, ActionSpec>> {
    const actionIds = new Set<string>();

    // Collect action IDs from widgets across all regions
    const regions = ['header', 'aboveContent', 'content', 'belowContent', 'sidebar', 'overlays'] as const;
    for (const region of regions) {
      const widgets = page.widgets[region];
      if (widgets) {
        for (const widget of widgets) {
          // Actions are referenced via events: Record<string, actionId>
          if (widget.events) {
            for (const actionId of Object.values(widget.events)) {
              actionIds.add(actionId);
            }
          }
        }
      }
    }

    const result = await this.loadBatch('action', Array.from(actionIds));
    return result.specs;
  }

  /**
   * Load a route with its associated page
   */
  async loadRouteWithPage(
    routeId: string
  ): Promise<{ route: RouteSpec | null; page: PageSpec | null }> {
    const route = await this.loadRoute(routeId);
    if (!route) {
      return { route: null, page: null };
    }

    const page = await this.loadPage(route.pageRef);
    return { route, page };
  }

  /**
   * Invalidate a cached spec
   */
  invalidate(type: SpecType, id: string): void {
    const cache = this.getCacheForType(type);
    cache.invalidate(`${type}:${id}`);
  }

  /**
   * Invalidate all cached specs of a type
   */
  invalidateAll(type: SpecType): void {
    const cache = this.getCacheForType(type);
    cache.invalidatePattern(new RegExp(`^${type}:`));
  }

  /**
   * Subscribe to HMR updates
   */
  onHMRUpdate(callback: (type: SpecType, id: string) => void): () => void {
    this.hmrSubscribers.add(callback);
    return () => {
      this.hmrSubscribers.delete(callback);
    };
  }

  /**
   * Notify HMR subscribers of an update
   */
  notifyHMRUpdate(type: SpecType, id: string): void {
    this.invalidate(type, id);
    for (const callback of this.hmrSubscribers) {
      callback(type, id);
    }
  }

  /**
   * Get all registered route IDs
   */
  getRouteIds(): string[] {
    return Array.from(specRegistry.routes.keys());
  }

  /**
   * Get all registered page IDs
   */
  getPageIds(): string[] {
    return Array.from(specRegistry.pages.keys());
  }

  /**
   * Get all registered flow IDs
   */
  getFlowIds(): string[] {
    return Array.from(specRegistry.flows.keys());
  }

  /**
   * Get all registered action IDs
   */
  getActionIds(): string[] {
    return Array.from(specRegistry.actions.keys());
  }

  /**
   * Get cache statistics for all spec types
   */
  getCacheStats(): Record<SpecType, ReturnType<SpecCache['getStats']>> {
    return {
      route: this.routeCache.getStats(),
      page: this.pageCache.getStats(),
      flow: this.flowCache.getStats(),
      action: this.actionCache.getStats(),
    };
  }

  /**
   * Clear all caches
   */
  clearCaches(): void {
    this.routeCache.clear();
    this.pageCache.clear();
    this.flowCache.clear();
    this.actionCache.clear();
  }
}

// ============================================================================
// Singleton Instance
// ============================================================================

let loaderInstance: SpecLoader | null = null;

/**
 * Get or create the spec loader singleton
 */
export function getSpecLoader(config?: Partial<SpecLoaderConfig>): SpecLoader {
  if (!loaderInstance) {
    loaderInstance = new SpecLoader(config);
  }
  return loaderInstance;
}

/**
 * Reset the spec loader singleton (for testing)
 */
export function resetSpecLoader(): void {
  loaderInstance?.clearCaches();
  loaderInstance = null;
}
