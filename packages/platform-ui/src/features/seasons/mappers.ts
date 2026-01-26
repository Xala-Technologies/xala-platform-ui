/**
 * Seasons Mappers
 *
 * Pure functions for mapping domain season/venue DTOs to UI component ViewModels.
 * No i18n dependencies - parent components handle translations.
 *
 * @module @xala-technologies/platform-ui/features/seasons
 */

import type { SeasonVM, VenueVM, SeasonStatus } from './blocks';
import type { BadgeColor } from './SeasonStatusBadge';

// =============================================================================
// Season Status Types
// =============================================================================

/**
 * @deprecated Use BadgeColor from SeasonStatusBadge instead
 */
export type SeasonStatusColor = BadgeColor;

export interface SeasonStatusBadge {
  label: string;
  color: BadgeColor;
}

// =============================================================================
// Season DTO (from API)
// =============================================================================

/**
 * Season DTO as received from the API.
 * This represents the raw data structure from the backend.
 */
export interface SeasonDTO {
  id: string;
  name: string;
  description?: string | null;
  status: string;
  startDate: string;
  endDate: string;
  applicationDeadline: string;
  totalApplications?: number;
  approvedApplications?: number;
  organizationId?: string;
  createdAt?: string;
  updatedAt?: string;
}

/**
 * Maps a Season DTO from the API to SeasonVM.
 *
 * Pure function - no i18n, no side effects.
 *
 * @param dto - The season DTO from the API
 * @returns SeasonVM for SeasonCard component
 *
 * @example
 * ```tsx
 * import { mapSeasonDTOToVM, getSeasonStatusColor } from './mappers';
 * import { SeasonCard } from './blocks';
 * import { useT } from '@xala-technologies/platform/i18n';
 *
 * const seasonVM = mapSeasonDTOToVM(seasonDTO);
 * return (
 *   <SeasonCard
 *     season={seasonVM}
 *     labels={{
 *       periodLabel: t('seasons.period'),
 *       deadlineLabel: t('seasons.deadline'),
 *       viewDetailsLabel: t('seasons.viewDetails'),
 *       applyLabel: t('seasons.apply'),
 *     }}
 *     statusDisplay={{
 *       label: t(`seasons.status.${seasonVM.status}`),
 *       color: getSeasonStatusColor(seasonVM.status),
 *     }}
 *     formatDate={(date) => new Date(date).toLocaleDateString('nb-NO')}
 *   />
 * );
 * ```
 */
export function mapSeasonDTOToVM(dto: SeasonDTO): SeasonVM {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description ?? undefined,
    status: mapApiStatusToSeasonStatus(dto.status),
    startDate: dto.startDate,
    endDate: dto.endDate,
    applicationDeadline: dto.applicationDeadline,
    totalApplications: dto.totalApplications,
    approvedApplications: dto.approvedApplications,
  };
}

/**
 * Maps API status string to SeasonStatus enum.
 */
function mapApiStatusToSeasonStatus(apiStatus: string): SeasonStatus {
  const statusMap: Record<string, SeasonStatus> = {
    DRAFT: 'draft',
    OPEN: 'open',
    CLOSED: 'closed',
    CANCELLED: 'cancelled',
    COMPLETED: 'completed',
    // Handle lowercase variants
    draft: 'draft',
    open: 'open',
    closed: 'closed',
    cancelled: 'cancelled',
    completed: 'completed',
  };
  return statusMap[apiStatus] ?? 'draft';
}

/**
 * Gets the badge color for a season status.
 *
 * Pure function - no i18n dependency. Parent component should handle translation.
 *
 * @param status - The season status
 * @returns Badge color
 *
 * @example
 * ```tsx
 * import { getSeasonStatusColor } from './mappers';
 * import { SeasonStatusBadge } from './SeasonStatusBadge';
 *
 * <SeasonStatusBadge
 *   label={t(`seasons.status.${status}`)}
 *   color={getSeasonStatusColor(status)}
 * />
 * ```
 */
export function getSeasonStatusColor(status: SeasonStatus): BadgeColor {
  const colorMap: Record<SeasonStatus, BadgeColor> = {
    draft: 'neutral',
    open: 'success',
    closed: 'warning',
    cancelled: 'danger',
    completed: 'info',
  };
  return colorMap[status] ?? 'neutral';
}

/**
 * @deprecated Use getSeasonStatusColor() instead.
 * This function required i18n dependency which violates pure component pattern.
 */
export function getSeasonStatusBadge(
  status: SeasonStatus,
  t: (key: string) => string
): SeasonStatusBadge {
  const config: Record<SeasonStatus, { labelKey: string; color: BadgeColor }> = {
    draft: { labelKey: 'seasons.status.draft', color: 'neutral' },
    open: { labelKey: 'seasons.status.open', color: 'success' },
    closed: { labelKey: 'seasons.status.closed', color: 'warning' },
    cancelled: { labelKey: 'seasons.status.cancelled', color: 'danger' },
    completed: { labelKey: 'seasons.status.completed', color: 'info' },
  };

  const cfg = config[status] ?? config.draft;
  return {
    label: t(cfg.labelKey),
    color: cfg.color,
  };
}

// =============================================================================
// Venue DTO (from API)
// =============================================================================

/**
 * Venue DTO as received from the API.
 */
export interface VenueDTO {
  id: string;
  name: string;
  description?: string | null;
  capacity?: number | null;
  size?: number | null;
  address?: {
    street?: string;
    city?: string;
    postalCode?: string;
  } | null;
  imageUrl?: string | null;
  categories?: string[] | null;
  amenities?: string[] | null;
}

/**
 * Maps a Venue DTO from the API to VenueVM.
 *
 * Pure function - no i18n, no side effects.
 *
 * @param dto - The venue DTO from the API
 * @returns VenueVM for VenueCard component
 *
 * @example
 * ```tsx
 * import { mapVenueDTOToVM } from './mappers';
 * import { VenueCard } from './blocks';
 *
 * const venueVM = mapVenueDTOToVM(venueDTO);
 * return (
 *   <VenueCard
 *     venue={venueVM}
 *     labels={{
 *       capacityLabel: t('common.capacity'),
 *       applyLabel: t('common.apply'),
 *     }}
 *     onApply={(id) => handleApply(id)}
 *   />
 * );
 * ```
 */
export function mapVenueDTOToVM(dto: VenueDTO): VenueVM {
  return {
    id: dto.id,
    name: dto.name,
    description: dto.description ?? undefined,
    capacity: dto.capacity ?? undefined,
    size: dto.size ?? undefined,
    address: dto.address
      ? {
          street: dto.address.street,
          city: dto.address.city,
        }
      : undefined,
    imageUrl: dto.imageUrl ?? undefined,
    categories: dto.categories ?? undefined,
  };
}

// =============================================================================
// Date Formatting Helpers
// =============================================================================

/**
 * Formats a date string for display.
 *
 * Note: This is a convenience helper. Applications should use their own
 * date formatting based on user locale and preferences.
 */
export function formatSeasonDate(
  dateString: string,
  locale: string = 'nb-NO'
): string {
  return new Date(dateString).toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  });
}

/**
 * Formats a date range for display.
 */
export function formatSeasonDateRange(
  startDate: string,
  endDate: string,
  locale: string = 'nb-NO'
): string {
  return `${formatSeasonDate(startDate, locale)} - ${formatSeasonDate(endDate, locale)}`;
}

/**
 * Checks if a season is currently accepting applications.
 */
export function isSeasonAcceptingApplications(season: SeasonVM): boolean {
  if (season.status !== 'open') return false;

  const now = new Date();
  const deadline = new Date(season.applicationDeadline);
  return now <= deadline;
}

/**
 * Gets the number of days until the application deadline.
 * Returns negative if deadline has passed.
 */
export function getDaysUntilDeadline(deadlineString: string): number {
  const now = new Date();
  const deadline = new Date(deadlineString);
  const diffTime = deadline.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
}

// =============================================================================
// List/Array Helpers
// =============================================================================

/**
 * Maps an array of season DTOs to ViewModels.
 */
export function mapSeasonDTOsToVMs(items: SeasonDTO[]): SeasonVM[] {
  return items.map((item) => mapSeasonDTOToVM(item));
}

/**
 * Maps an array of venue DTOs to ViewModels.
 */
export function mapVenueDTOsToVMs(items: VenueDTO[]): VenueVM[] {
  return items.map((item) => mapVenueDTOToVM(item));
}

/**
 * Filters seasons by status.
 */
export function filterSeasonsByStatus(
  seasons: SeasonVM[],
  statuses: SeasonStatus[]
): SeasonVM[] {
  return seasons.filter((s) => statuses.includes(s.status));
}

/**
 * Gets open seasons that are still accepting applications.
 */
export function getActiveSeasons(seasons: SeasonVM[]): SeasonVM[] {
  return seasons.filter(isSeasonAcceptingApplications);
}

// =============================================================================
// Backwards Compatibility Exports
// =============================================================================

/**
 * @deprecated Use mapSeasonDTOToVM instead
 */
export const mapSeasonDTOToCardData = mapSeasonDTOToVM;

/**
 * @deprecated Use mapVenueDTOToVM instead
 */
export const mapVenueDTOToCardData = mapVenueDTOToVM;

/**
 * @deprecated Use mapSeasonDTOsToVMs instead
 */
export const mapSeasonDTOsToCardData = mapSeasonDTOsToVMs;

/**
 * @deprecated Use mapVenueDTOsToVMs instead
 */
export const mapVenueDTOsToCardData = mapVenueDTOsToVMs;
