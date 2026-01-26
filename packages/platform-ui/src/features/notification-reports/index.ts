/**
 * @xala-technologies/platform-ui - Notification Reports Feature Kit
 *
 * Presentational components for monitoring notification delivery status.
 * All components are pure presentational - no SDK, no i18n, no business logic.
 *
 * @module @xala-technologies/platform-ui/features/notification-reports
 *
 * ## Usage
 *
 * ```tsx
 * import {
 *   NotificationDeliveryDashboard,
 *   type NotificationDeliveryDashboardLabels,
 *   type DeliveryReport,
 * } from '@xala-technologies/platform-ui/features/notification-reports';
 *
 * function NotificationReportsPage() {
 *   const { data, isLoading } = useDeliveryReports();
 *   const retryMutation = useRetryFailed();
 *   const [searchValue, setSearchValue] = useState('');
 *
 *   const labels: NotificationDeliveryDashboardLabels = {
 *     title: 'Notification Delivery Reports',
 *     description: 'Monitor notification delivery status',
 *     totalLabel: 'Total',
 *     sentLabel: 'Sent',
 *     // ... all other labels
 *   };
 *
 *   return (
 *     <NotificationDeliveryDashboard
 *       reports={data?.data || []}
 *       labels={labels}
 *       isLoading={isLoading}
 *       totalCount={data?.meta?.total}
 *       searchValue={searchValue}
 *       isRetrying={retryMutation.isPending}
 *       onSearchChange={setSearchValue}
 *       onSearch={(value) => refetch({ search: value })}
 *       onRetryFailed={() => retryMutation.mutate()}
 *     />
 *   );
 * }
 * ```
 *
 * ## Components
 *
 * - `NotificationDeliveryDashboard` - Full dashboard with stats, search, and table
 *
 * ## Types
 *
 * - `DeliveryReport` - Report data structure
 * - `DeliveryStats` - Stats summary
 * - `DeliveryReportFilters` - Filter state
 * - `NotificationDeliveryDashboardLabels` - UI labels interface
 */

// =============================================================================
// Components
// =============================================================================

export {
  NotificationDeliveryDashboard,
  type NotificationDeliveryDashboardProps,
  type NotificationDeliveryDashboardLabels,
} from './components';

// =============================================================================
// Types
// =============================================================================

export type { DeliveryReport, DeliveryStats, DeliveryReportFilters, PaginationMeta } from './types';
