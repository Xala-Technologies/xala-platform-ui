/**
 * Seasons Feature Kit
 *
 * Pure presentational components and utilities for seasonal booking management.
 * This feature kit provides decoupled UI components following the pure component pattern.
 *
 * ## Architecture
 *
 * **Pure Components (Recommended):**
 * - `SeasonCard` - Displays season information
 * - `VenueCard` - Displays venue information
 * - `SeasonStatusBadge` - Displays status badge
 *
 * All pure components:
 * - Accept props for text, formatting, and callbacks
 * - No SDK, i18n, or business logic dependencies
 * - Can be used in Storybook, testing, and any application
 *
 * **Mappers (DTO → ViewModel):**
 * - `mapSeasonDTOToVM()` - Maps backend Season to SeasonVM
 * - `mapVenueDTOToVM()` - Maps backend Venue to VenueVM
 * - `getSeasonStatusColor()` - Gets badge color for status
 *
 * **Deprecated Connected Components:**
 * - `SeasonCardConnected` - Use pure `SeasonCard` with app wrapper instead
 * - `VenueCardConnected` - Use pure `VenueCard` with app wrapper instead
 *
 * ## Usage Example
 *
 * ```tsx
 * import {
 *   SeasonCard,
 *   mapSeasonDTOToVM,
 *   getSeasonStatusColor,
 *   type SeasonDTO,
 * } from '@xala-technologies/platform-ui/features/seasons';
 * import { useT } from '@xala-technologies/platform/i18n';
 * import { useNavigate } from 'react-router-dom';
 *
 * function SeasonsList({ seasons }: { seasons: SeasonDTO[] }) {
 *   const t = useT();
 *   const navigate = useNavigate();
 *
 *   const formatDate = (date: string) =>
 *     new Date(date).toLocaleDateString('nb-NO', {
 *       day: 'numeric',
 *       month: 'short',
 *       year: 'numeric',
 *     });
 *
 *   return (
 *     <div>
 *       {seasons.map((seasonDTO) => {
 *         const season = mapSeasonDTOToVM(seasonDTO);
 *         return (
 *           <SeasonCard
 *             key={season.id}
 *             season={season}
 *             labels={{
 *               periodLabel: t('seasons.period'),
 *               deadlineLabel: t('seasons.deadline'),
 *               viewDetailsLabel: t('seasons.viewDetails'),
 *               applyLabel: t('seasons.apply'),
 *             }}
 *             statusDisplay={{
 *               label: t(`seasons.status.${season.status}`),
 *               color: getSeasonStatusColor(season.status),
 *             }}
 *             formatDate={formatDate}
 *             onViewDetails={(id) => navigate(`/seasons/${id}`)}
 *             onApply={(id) => handleApply(id)}
 *           />
 *         );
 *       })}
 *     </div>
 *   );
 * }
 * ```
 *
 * @module @xala-technologies/platform-ui/features/seasons
 */

// =============================================================================
// Pure Components
// =============================================================================

export {
  // Season card
  SeasonCard,
  type SeasonCardProps,
  type SeasonCardLabels,
  type SeasonStatusDisplay,
  type SeasonVM,
  type SeasonStatus,
  // Backwards compatibility
  type SeasonCardData,

  // Venue card
  VenueCard,
  type VenueCardProps,
  type VenueCardLabels,
  type VenueVM,
  // Backwards compatibility
  type VenueCardData,
} from './blocks';

// =============================================================================
// Status Badge
// =============================================================================

export {
  SeasonStatusBadge,
  type SeasonStatusBadgeProps,
  type BadgeColor,
} from './SeasonStatusBadge';

// =============================================================================
// Mappers (DTO → ViewModel)
// =============================================================================

export {
  // Season mappers
  mapSeasonDTOToVM,
  mapSeasonDTOsToVMs,
  type SeasonDTO,

  // Venue mappers
  mapVenueDTOToVM,
  mapVenueDTOsToVMs,
  type VenueDTO,

  // Status helpers
  getSeasonStatusColor,
  type SeasonStatusBadge as SeasonStatusBadgeType,
  // Backwards compatibility
  type SeasonStatusColor,

  // Date helpers
  formatSeasonDate,
  formatSeasonDateRange,

  // Filter/query helpers
  isSeasonAcceptingApplications,
  getDaysUntilDeadline,
  filterSeasonsByStatus,
  getActiveSeasons,

  // Deprecated mappers (backwards compatibility)
  mapSeasonDTOToCardData,
  mapVenueDTOToCardData,
  mapSeasonDTOsToCardData,
  mapVenueDTOsToCardData,
  getSeasonStatusBadge,
} from './mappers';

// =============================================================================
// Constants
// =============================================================================

export {
  SEASON_STATUS_CONFIG,
  APPLICATION_STATUS_CONFIG,
  WEEKDAY_LABELS,
  WEEKDAY_SHORT_LABELS,
  TIME_SLOT_CONFIG,
  DEFAULT_SEASON_FILTER_OPTIONS,
  MOBILE_BREAKPOINT,
  TABLET_BREAKPOINT,
  GRID_COLUMNS,
  // Deprecated
  getSeasonFilterOptions,
} from './constants';

// =============================================================================
// Deprecated SDK-Connected Components
// =============================================================================

/**
 * @deprecated Use pure SeasonCard with application-level wrapper instead.
 * See deprecation warning in SeasonCardConnected.tsx for migration path.
 */
export { SeasonCardConnected, type SeasonCardConnectedProps } from './SeasonCardConnected';

/**
 * @deprecated Use pure VenueCard with application-level wrapper instead.
 * See deprecation warning in VenueCardConnected.tsx for migration path.
 */
export { VenueCardConnected, type VenueCardConnectedProps } from './VenueCardConnected';
