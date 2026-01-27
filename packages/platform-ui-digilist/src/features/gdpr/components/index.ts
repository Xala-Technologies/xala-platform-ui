/**
 * GDPR Components
 *
 * Pure presentational components for GDPR request management.
 * All components follow the pure UI pattern with props-in, events-out.
 *
 * @module @xala-technologies/platform-ui/features/gdpr/components
 */

// =============================================================================
// Components
// =============================================================================

export { GdprRequestQueue } from './GdprRequestQueue';
export { RequestDetailModal } from './RequestDetailModal';

// =============================================================================
// Component Props
// =============================================================================

export type {
  GdprRequestQueueProps,
  GdprRequestDisplayVM,
  GdprRequestQueueLabels,
} from './GdprRequestQueue';

export type { RequestDetailModalProps, RequestDetailModalLabels } from './RequestDetailModal';
