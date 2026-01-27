/**
 * GDPR Feature
 *
 * Pure presentational components for GDPR request management.
 *
 * ## Components
 *
 * - **GdprRequestQueue** - Table view of GDPR requests with search and sort
 * - **RequestDetailModal** - Modal for viewing and processing individual requests
 *
 * ## Usage
 *
 * All components are pure presentational - they receive data via props and
 * emit events via callbacks. No SDK hooks, no i18n, no business logic.
 *
 * @example
 * ```tsx
 * import { GdprRequestQueue, type GdprRequestQueueLabels } from '@xala-technologies/platform-ui/features/gdpr';
 *
 * const labels: GdprRequestQueueLabels = {
 *   searchPlaceholder: 'Search requests...',
 *   sortButtonLabel: 'Sort by',
 *   // ... all other labels
 * };
 *
 * <GdprRequestQueue
 *   requests={processedRequests}
 *   labels={labels}
 *   sortOptions={sortOptions}
 *   selectedSort="daysRemaining-asc"
 *   searchValue={searchQuery}
 *   onSearchChange={setSearchQuery}
 *   onSortChange={handleSort}
 *   onRequestClick={handleRequestClick}
 *   onCopyId={handleCopyId}
 * />
 * ```
 *
 * @module @xala-technologies/platform-ui/features/gdpr
 */

// =============================================================================
// Components
// =============================================================================

export { GdprRequestQueue, RequestDetailModal } from './components';

// =============================================================================
// Component Props and Labels
// =============================================================================

export type {
  GdprRequestQueueProps,
  GdprRequestDisplayVM,
  GdprRequestQueueLabels,
  RequestDetailModalProps,
  RequestDetailModalLabels,
} from './components';

// =============================================================================
// ViewModel Types
// =============================================================================

export type {
  GdprRequestVM,
  GdprRequestWithDaysRemainingVM,
  GdprUserInfoVM,
  GdprSortOption,
  GdprRequestStatus,
  GdprRequestType,
} from './types';
