/**
 * Gazetteer Runtime - Index
 */

// Registry
export {
    GazetteerRegistryImpl,
    getRegistry,
    resetRegistry,
    createRegistry,
    type GazetteerRegistry,
    type RegistryStats,
} from './registry'

// Binding Resolver
export {
    BindingResolver,
    createBindingResolver,
    defaultBindingAuditLogger,
    type BindingContext,
    type ResolvedBinding,
    type BindingAuditLogger,
    type BindingResolverConfig,
} from './binding-resolver'

// Action Engine
export {
    ActionEngine,
    createActionEngine,
    noopHandlers,
    defaultControllerRegistry,
    defaultActionAuditLogger,
    type ActionContext,
    type ActionResult,
    type ActionHandlers,
    type ActionEngineConfig,
    type ControllerRegistry,
    type ActionAuditLogger,
} from './action-engine'

// Page Composer
export {
    PageComposer,
    createPageComposer,
    SHELL_COMPONENT_MAP,
    WIDGET_COMPONENT_MAP,
    defaultPermissionChecker,
    defaultAuditLogger,
    type ComposerConfig,
    type WidgetComponentRegistry,
    type ShellComponentRegistry,
    type WidgetComponentProps,
    type ShellComponentProps,
    type PermissionChecker,
    type AuditLogger,
} from './composer'

// Spec Loader & Cache
export {
    // Cache
    SpecCache,
    getRouteCache,
    getPageCache,
    getFlowCache,
    getActionCache,
    clearAllCaches,
    resetAllCaches,
    type SpecCacheConfig,
    type CacheStats,
    // Loader
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
} from './loader'

