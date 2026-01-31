/**
 * App Scaffold
 *
 * Complete scaffold system for creating applications with minimal boilerplate.
 * All components are pure presentational - runtime dependencies are provided via config.
 *
 * @example
 * ```tsx
 * import { 
 *   createApp, 
 *   createCrudPages, 
 *   createDashboardPage,
 *   createWizardPage,
 *   createSettingsPage,
 *   createPageHeader,
 *   createStatsGrid,
 *   createQuickActions,
 *   createDataTable,
 * } from '@xala-technologies/platform-ui/app-scaffold';
 *
 * createApp({
 *   role: 'dashboard',
 *   appId: 'dashboard',
 *   name: 'TaskMaster',
 *   routes: [
 *     ...createCrudPages({ entity: 'task', basePath: '/tasks', columns: [...] }),
 *     { path: '/', element: createDashboardPage({ title: 'Overview', stats: [...] }) },
 *     createSettingsPage({ title: 'Settings', sections: [...] }),
 *     createWizardPage({ name: 'onboarding', steps: [...] }),
 *   ],
 *   sidebar: { sections: [...] },
 *   features: { demoLogin: true },
 * });
 * ```
 */

// =============================================================================
// CORE
// =============================================================================
export { createApp } from './create-app';
export type { RuntimeDependencies, CreateAppOptionsWithRuntime } from './create-app';

// =============================================================================
// PAGE SCAFFOLDS
// =============================================================================
export { createCrudPages } from './scaffolds/crud-pages';
export { createDashboardPage } from './scaffolds/dashboard-page';
export { createSettingsPage, SettingsPageComponent } from './scaffolds/settings-page';
export type {
  SettingsField,
  SettingsSection,
  CreateSettingsPageOptions,
} from './scaffolds/settings-page';
export { createWizardPage, WizardComponent } from './scaffolds/wizard-page';

// =============================================================================
// LAYOUT SCAFFOLDS
// =============================================================================
export {
  // Page Header
  PageHeader,
  createPageHeader,
  // Stats Grid
  StatsGrid,
  StatCard,
  createStatsGrid,
  // Quick Actions
  QuickActions,
  QuickActionCard, 
  createQuickActions,
  // Data Table
  DataTable,
  createDataTable,
} from './scaffolds/layout';

export type {
  PageHeaderConfig,
  BreadcrumbItem,
  StatsGridConfig,
  StatConfig,
  QuickActionsConfig,
  QuickAction,
  DataTableConfig,
  TableColumn,
  EmptyStateConfig,
} from './scaffolds/layout';

// =============================================================================
// ROUTE SCAFFOLDS
// =============================================================================
export {
  createProtectedRoutes,
  createProtectedRouteWrapper,
  createRoleRoutes,
  createContextRoutes,
  mergeRoutes,
} from './scaffolds/routes';

export type {
  RouteConfig,
  ProtectedRoutesConfig,
  RoleRoutesConfig,
  ContextRoutesConfig,
} from './scaffolds/routes';

// =============================================================================
// TYPES
// =============================================================================
export type {
  AppRole,
  BrandConfig,
  SidebarConfig,
  SidebarItem,
  SidebarSection,
  AppFeatures,
  CreateAppOptions,
  CrudColumn,
  CrudFilter,
  CreateCrudPagesOptions,
  CreateDashboardPageOptions,
  WizardStep,
  CreateWizardOptions,
  CreateFeatureOptions,
} from './types';

// =============================================================================
// COMPONENTS
// =============================================================================
export { AppShell } from './AppShell';
export { DashboardLayoutWrapper } from './layouts/DashboardLayout';
export { WebLayoutWrapper } from './layouts/WebLayout';
export { UniversalLoginPage } from './pages/UniversalLoginPage';

// =============================================================================
// STYLES
// =============================================================================
export { appScaffoldStyles, injectAppStyles } from './styles';
