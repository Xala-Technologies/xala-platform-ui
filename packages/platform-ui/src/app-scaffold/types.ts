/**
 * App Scaffold Types
 *
 * Core type definitions for the app scaffold system.
 */

import type { ReactNode, ReactElement } from 'react';
import type { RouteObject } from 'react-router-dom';

// =============================================================================
// App Roles
// =============================================================================

/**
 * App roles define the type of application and its default behaviors
 */
export type AppRole = 'dashboard' | 'backoffice' | 'web';

// =============================================================================
// Sidebar Configuration
// =============================================================================

export interface SidebarItem {
  name: string;
  label: string;
  description?: string;
  href?: string;
  icon?: ReactNode;
}

export interface SidebarSection {
  title?: string;
  items: SidebarItem[];
}

export interface SidebarConfig {
  sections: SidebarSection[];
}

// =============================================================================
// Brand Configuration
// =============================================================================

export interface BrandConfig {
  name: string;
  tagline?: string;
  logo?: string;
  logoSrc?: string;
  logoHref?: string;
}

// =============================================================================
// Feature Flags
// =============================================================================

export interface AppFeatures {
  /** Enable demo login button */
  demoLogin?: boolean;
  /** Enable theme toggle */
  themeToggle?: boolean;
  /** Enable global search */
  search?: boolean;
  /** Enable notifications panel */
  notifications?: boolean;
  /** Authentication required */
  authRequired?: boolean;
  /** Inject styles automatically */
  injectStyles?: boolean;
}

// =============================================================================
// Create App Options
// =============================================================================

export interface CreateAppOptions {
  /** App role determines layout and default behaviors */
  role: AppRole;
  
  /** Application identifier (e.g., 'dashboard', 'backoffice') */
  appId: string;
  
  /** Display name for the application */
  name: string;
  
  /** Route configuration */
  routes?: RouteObject[];
  
  /** Sidebar configuration (for dashboard/backoffice roles) */
  sidebar?: SidebarConfig;
  
  /** Brand configuration */
  brand?: BrandConfig;
  
  /** Feature flags */
  features?: AppFeatures;
  
  /** Custom login page component (optional, uses universal login if not provided) */
  loginPage?: ReactElement;
  
  /** Login path (default: /login) */
  loginPath?: string;
  
  /** Root element ID (default: root) */
  rootElement?: string;
  
  /** @deprecated Use rootElement instead */
  rootId?: string;
}


// =============================================================================
// Page Scaffold Types
// =============================================================================

export interface CrudColumn {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: unknown, row: unknown) => ReactNode;
}

export interface CrudFilter {
  key: string;
  label: string;
  type: 'select' | 'search' | 'date' | 'dateRange';
  options?: Array<{ value: string; label: string }>;
}

export interface CreateCrudPagesOptions<T = unknown> {
  /** Entity name (e.g., 'task', 'user') */
  entity: string;
  
  /** Base path (e.g., '/tasks') */
  basePath: string;
  
  /** Zod schema for validation */
  schema?: unknown;
  
  /** Table columns configuration */
  columns: CrudColumn[];
  
  /** Filter configuration */
  filters?: CrudFilter[];
  
  /** Available actions */
  actions?: Array<'create' | 'edit' | 'delete' | 'view'>;
  
  /** API hooks for data fetching */
  hooks?: {
    useList?: () => { data: T[]; isLoading: boolean };
    useDetail?: (id: string) => { data: T; isLoading: boolean };
    useCreate?: () => { mutate: (data: Partial<T>) => Promise<T> };
    useUpdate?: () => { mutate: (id: string, data: Partial<T>) => Promise<T> };
    useDelete?: () => { mutate: (id: string) => Promise<void> };
  };
}

// =============================================================================
// Dashboard Page Types
// =============================================================================

export interface StatConfig {
  label: string;
  value?: string | number;
  query?: string;
  icon?: ReactNode;
  trend?: 'up' | 'down' | 'neutral';
  trendValue?: string;
}

export interface CreateDashboardPageOptions {
  /** Page title */
  title: string;
  
  /** Subtitle */
  subtitle?: string;
  
  /** Stats to display */
  stats?: StatConfig[];
  
  /** Widget component names to render */
  widgets?: string[];
}

// =============================================================================
// Wizard Types
// =============================================================================

export interface WizardStep {
  id: string;
  title: string;
  description?: string;
  component: ReactElement | (() => ReactElement);
  validation?: (data: unknown) => boolean | Promise<boolean>;
}

export interface CreateWizardOptions {
  /** Wizard name */
  name: string;
  
  /** Steps configuration */
  steps: WizardStep[];
  
  /** Called when wizard completes */
  onComplete: (data: unknown) => void | Promise<void>;
  
  /** Called when wizard is cancelled */
  onCancel?: () => void;
}

// =============================================================================
// Feature Scaffold Types
// =============================================================================

export interface CreateFeatureOptions {
  /** Feature name */
  name: string;
  
  /** Feature base path */
  basePath: string;
  
  /** Pages included in this feature */
  pages?: Array<{
    type: 'list' | 'detail' | 'create' | 'edit' | 'dashboard' | 'settings';
    path: string;
    config: CreateCrudPagesOptions | CreateDashboardPageOptions;
  }>;
  
  /** Widgets included in this feature */
  widgets?: string[];
  
  /** Sidebar items for this feature */
  sidebarItems?: SidebarItem[];
}
