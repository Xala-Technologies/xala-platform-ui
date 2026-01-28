/**
 * Gazetteer Components
 * 
 * React components for rendering Gazetteer specs at runtime.
 */

// Provider
export {
    GazetteerProvider,
    useGazetteer,
    useGazetteerRegistry,
    useGazetteerComposer,
    useGazetteerActionEngine,
    type GazetteerProviderProps,
    type GazetteerContextValue,
} from './GazetteerProvider'

// Router
export {
    GazetteerRouter,
    GazetteerBrowserRouter,
    useGazetteerNavigation,
    type GazetteerRouterProps,
    type RouteWrapperProps,
    type NavigationItem,
} from './GazetteerRouter'

// Page Renderer
export {
    PageRenderer,
    PageRendererWithSuspense,
    type PageRendererProps,
    type ShellProps,
} from './PageRenderer'

// Widget Renderer
export {
    WidgetRenderer,
    WidgetListRenderer,
    type WidgetRendererProps,
    type WidgetListRendererProps,
    type WidgetWrapperProps,
} from './WidgetRenderer'
