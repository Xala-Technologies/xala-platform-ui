/**
 * @xala-technologies/gazetteer
 * 
 * Monster Motor - Schema-Driven Page Execution Engine
 * 
 * @example
 * ```tsx
 * import { useGazetteerPage, GazetteerPage, getRegistry } from '@xala-technologies/gazetteer'
 * 
 * // Register specs
 * getRegistry().registerPage(myPageSpec)
 * 
 * // Use in component
 * function MyPage() {
 *   const { page, isLoading, error } = useGazetteerPage('my-page')
 *   if (isLoading) return <Loading />
 *   if (error) return <Error message={error} />
 *   return <GazetteerPage spec={page} />
 * }
 * ```
 */

// Types
export * from './types'

// Runtime
export {
    // Registry
    GazetteerRegistryImpl,
    getRegistry,
    resetRegistry,
    createRegistry,
    type GazetteerRegistry,
    type RegistryStats,
    // Binding Resolver
    BindingResolver,
    createBindingResolver,
    type BindingContext,
    type ResolvedBinding,
    // Action Engine
    ActionEngine,
    createActionEngine,
    noopHandlers,
    type ActionContext,
    type ActionResult,
    type ActionHandlers,
    // Page Composer
    PageComposer,
    createPageComposer,
    SHELL_COMPONENT_MAP,
    WIDGET_COMPONENT_MAP,
    type ComposerConfig,
    type WidgetComponentProps,
    type ShellComponentProps,
    // Spec Loader & Cache
    SpecLoader,
    getSpecLoader,
    resetSpecLoader,
    registerRoute,
    registerPage,
    registerFlow,
    registerAction,
    registerSpecs,
    clearRegistry,
    SpecCache,
    getRouteCache,
    getPageCache,
    getFlowCache,
    getActionCache,
    clearAllCaches,
    resetAllCaches,
    type SpecType,
    type SpecTypeMap,
    type SpecLoaderConfig,
    type SpecResolver,
    type SpecLoadResult,
    type BatchLoadResult,
    type SpecCacheConfig,
    type CacheStats,
} from './runtime'

// Hooks
export {
    useGazetteerPage,
    useGazetteerRoute,
    useGazetteerAction,
    useGazetteerBindings,
    useGazetteerContext,
    GazetteerContext,
    type GazetteerContextValue,
    type UseGazetteerPageResult,
    type UseGazetteerRouteResult,
    type UseGazetteerActionResult,
} from './hooks'

// Components
export {
    GazetteerProvider,
    GazetteerPage,
    Widget,
    GazetteerLoading,
    GazetteerError,
    GazetteerNotFound,
    type GazetteerProviderProps,
    type GazetteerPageProps,
    type WidgetRendererProps,
    type ShellRendererProps,
} from './components'

// Version
export const VERSION = '0.1.0'
