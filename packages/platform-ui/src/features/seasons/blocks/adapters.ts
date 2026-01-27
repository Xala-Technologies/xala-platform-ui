/**
 * Platform-UI Adapters for Seasons
 *
 * These adapters provide utilities for mapping between Digilist's SeasonCard
 * and platform-ui's PeriodCard components.
 *
 * This is part of the Phase 4 "Headless Domain" consolidation.
 *
 * NOTE: Full migration requires platform-ui >= 2.5.0. Until then, use the
 * domain-specific SeasonCard component.
 *
 * @module @xala-technologies/platform-ui/blocks/seasons
 */

// Re-export platform-ui PeriodCard for new code
export {
  PeriodCard,
  type PeriodCardProps,
  type PeriodStatusDisplay,
  type PeriodDeadline,
  type PeriodCardImage,
} from '@xala-technologies/platform-ui-digilist';

// =============================================================================
// Status Mapping Utilities
// =============================================================================

import type { SeasonStatus } from './SeasonCard';

/**
 * PeriodStatus type (matches platform-ui)
 */
export type PeriodStatus = 'upcoming' | 'active' | 'ending_soon' | 'ended' | 'draft' | 'cancelled';

/**
 * Maps Digilist SeasonStatus to platform-ui PeriodStatus
 *
 * Mapping:
 * - draft → draft
 * - open → active
 * - closed → ended
 * - cancelled → cancelled
 * - completed → ended
 */
export function toPeriodStatus(status: SeasonStatus): PeriodStatus {
  const statusMap: Record<SeasonStatus, PeriodStatus> = {
    draft: 'draft',
    open: 'active',
    closed: 'ended',
    cancelled: 'cancelled',
    completed: 'ended',
  };
  return statusMap[status] || 'draft';
}

/**
 * Maps platform-ui PeriodStatus back to Digilist SeasonStatus
 */
export function toSeasonStatus(status: PeriodStatus): SeasonStatus {
  const statusMap: Record<PeriodStatus, SeasonStatus> = {
    draft: 'draft',
    upcoming: 'draft', // No direct equivalent, default to draft
    active: 'open',
    ending_soon: 'open', // Still open, just ending soon
    ended: 'closed',
    cancelled: 'cancelled',
  };
  return statusMap[status] || 'draft';
}

// =============================================================================
// Migration Notes
// =============================================================================

/**
 * MIGRATION GUIDE: SeasonCard → PeriodCard
 *
 * When platform-ui >= 2.5.0 is available, you can use:
 *
 * import { PeriodCard, type PeriodStatus } from '@xala-technologies/platform-ui/blocks';
 *
 * Use toPeriodStatus() to convert SeasonStatus to PeriodStatus.
 */
