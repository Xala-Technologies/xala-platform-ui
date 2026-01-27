/**
 * Seasons Feature - Block Components
 *
 * Pure presentational components for seasonal booking management.
 * All components follow the pure UI pattern - no SDK, no i18n, no business logic.
 *
 * @module @xala-technologies/platform-ui/features/seasons/blocks
 */

// =============================================================================
// Season Card Component
// =============================================================================

export { SeasonCard } from './SeasonCard';
export type {
  SeasonCardProps,
  SeasonCardLabels,
  SeasonStatusDisplay,
  SeasonVM,
  SeasonStatus,
  // Backwards compatibility
  SeasonCardData,
} from './SeasonCard';

// =============================================================================
// Venue Card Component
// =============================================================================

export { VenueCard } from './VenueCard';
export type {
  VenueCardProps,
  VenueCardLabels,
  VenueVM,
  // Backwards compatibility
  VenueCardData,
} from './VenueCard';
