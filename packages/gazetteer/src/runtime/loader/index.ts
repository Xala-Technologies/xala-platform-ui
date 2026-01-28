/**
 * Spec Loader - Index
 */

// Spec Cache
export {
    SpecCache,
    getRouteCache,
    getPageCache,
    getFlowCache,
    getActionCache,
    clearAllCaches,
    resetAllCaches,
    type SpecCacheConfig,
    type CacheStats,
} from './spec-cache'

// Spec Loader
export {
    SpecLoader,
    getSpecLoader,
    resetSpecLoader,
    registerRoute,
    registerPage,
    registerFlow,
    registerAction,
    registerSpecs,
    clearRegistry,
    type SpecType,
    type SpecTypeMap,
    type SpecLoaderConfig,
    type SpecResolver,
    type SpecLoadResult,
    type BatchLoadResult,
} from './spec-loader'
