/**
 * Layout Scaffolds Index
 *
 * Re-exports all layout scaffold components.
 */

export { PageHeader, createPageHeader } from './page-header';
export type { PageHeaderConfig, BreadcrumbItem } from './page-header';

export { StatsGrid, StatCard, createStatsGrid } from './stats-grid';
export type { StatsGridConfig, StatConfig } from './stats-grid';

export { QuickActions, QuickActionCard, createQuickActions } from './quick-actions';
export type { QuickActionsConfig, QuickAction } from './quick-actions';

export { DataTable, createDataTable } from './data-table';
export type { DataTableConfig, TableColumn, EmptyStateConfig } from './data-table';
