/**
 * Gazetteer - Types Index
 * 
 * Unified type exports for the schema-driven page execution engine.
 */

// Route Types
export type {
    RouteSpec,
    RouteNavigation,
    RouteAccess,
    BreadcrumbSpec,
    RouteMeta,
} from './route'

// Page Types
export type {
    PageSpec,
    PageLayoutType,
    ShellType,
    FeatureDependency,
    PageWidgets,
    PageBehaviors,
    NavigationBehavior,
    AfterActionSpec,
    LifecycleBehavior,
    PageAnimations,
    AnimationType,
    ExitAnimationType,
} from './page'

// Widget Types
export type {
    WidgetSpec,
    WidgetType,
    VisibilityCondition,
    WidgetCatalogEntry,
    WidgetPropDefinition,
} from './widget'
export { CORE_WIDGET_TYPES } from './widget'

// Action Types
export type {
    ActionSpec,
    ActionIntent,
    ActionVisibility,
    ConfirmSpec,
    FeedbackSpec,
    AnalyticsSpec,
    ActionBehavior,
    NavigateBehavior,
    OpenDrawerBehavior,
    CloseDrawerBehavior,
    OpenModalBehavior,
    CloseModalBehavior,
    CallControllerBehavior,
    DownloadBehavior,
    ToastBehavior,
    ActionRef,
    ActionType,
} from './action'
export { CORE_ACTION_TYPES } from './action'

// Flow Types
export type {
    FlowSpec,
    FlowStep,
    StepNavigation,
    StepValidation,
    ProgressWidgetSpec,
    PersistenceSpec,
} from './flow'

// Binding Types
export type {
    Binding,
    QueryBinding,
    RouteParamBinding,
    ContextBinding,
    ConstantBinding,
    ComputedBinding,
    BindingTransform,
    BindingType,
} from './binding'
export { BINDING_TYPES, SAFE_BINDING_PREFIXES, isValidBindingPath } from './binding'
