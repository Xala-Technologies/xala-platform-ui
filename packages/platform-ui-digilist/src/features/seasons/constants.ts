/**
 * Season Feature Constants
 *
 * Centralized constants for the season booking feature.
 * No SDK imports - uses local types only.
 *
 * @module @xala-technologies/platform-ui/features/seasons
 */

import type { SeasonStatus } from './blocks/SeasonCard';
import type { BadgeColor } from './SeasonStatusBadge';

// =============================================================================
// Season Status Configuration
// =============================================================================

/**
 * Default season status configuration with Norwegian labels.
 *
 * Note: These are default labels. Applications should use their own i18n system
 * and provide translated labels via component props.
 */
export const SEASON_STATUS_CONFIG: Record<SeasonStatus, { label: string; color: BadgeColor }> = {
  draft: {
    label: 'Utkast',
    color: 'neutral',
  },
  open: {
    label: 'Åpen for søknader',
    color: 'success',
  },
  closed: {
    label: 'Stengt',
    color: 'neutral',
  },
  cancelled: {
    label: 'Kansellert',
    color: 'danger',
  },
  completed: {
    label: 'Avsluttet',
    color: 'neutral',
  },
};

// =============================================================================
// Application Status Configuration
// =============================================================================

export const APPLICATION_STATUS_CONFIG = {
  pending: {
    label: 'Venter',
    color: 'var(--ds-color-warning-text-default)',
    bgColor: 'var(--ds-color-warning-surface-default)',
  },
  approved: {
    label: 'Godkjent',
    color: 'var(--ds-color-success-text-default)',
    bgColor: 'var(--ds-color-success-surface-default)',
  },
  rejected: {
    label: 'Avslått',
    color: 'var(--ds-color-danger-text-default)',
    bgColor: 'var(--ds-color-danger-surface-default)',
  },
  allocated: {
    label: 'Tildelt',
    color: 'var(--ds-color-accent-text-default)',
    bgColor: 'var(--ds-color-accent-surface-default)',
  },
} as const;

// =============================================================================
// Weekday Configuration
// =============================================================================

export const WEEKDAY_LABELS = [
  'Søndag',
  'Mandag',
  'Tirsdag',
  'Onsdag',
  'Torsdag',
  'Fredag',
  'Lørdag',
] as const;

export const WEEKDAY_SHORT_LABELS = ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'] as const;

// =============================================================================
// Time Configuration
// =============================================================================

export const TIME_SLOT_CONFIG = {
  minHour: 6, // 06:00
  maxHour: 23, // 23:00
  interval: 30, // 30 minutes
} as const;

// =============================================================================
// Filter Options
// =============================================================================

/**
 * Default season filter options with Norwegian labels.
 *
 * Note: These are default labels. Applications should provide their own
 * translated filter options based on their i18n system.
 */
export const DEFAULT_SEASON_FILTER_OPTIONS: { label: string; value: SeasonStatus | 'all' }[] = [
  { label: 'Alle', value: 'all' },
  { label: 'Åpne', value: 'open' },
  { label: 'Kommende', value: 'draft' },
  { label: 'Stengt', value: 'closed' },
];

/**
 * @deprecated Use DEFAULT_SEASON_FILTER_OPTIONS constant instead.
 * This function required i18n dependency which violates pure component pattern.
 */
export const getSeasonFilterOptions = (
  t: (key: string) => string
): { label: string; value: SeasonStatus | 'all' }[] => [
  { label: t('common.all') || 'Alle', value: 'all' },
  { label: t('common.open') || 'Åpne', value: 'open' },
  { label: t('common.draft') || 'Kommende', value: 'draft' },
];

// =============================================================================
// UI Constants
// =============================================================================

export const MOBILE_BREAKPOINT = 768;
export const TABLET_BREAKPOINT = 1024;

export const GRID_COLUMNS = {
  mobile: 1,
  tablet: 2,
  desktop: 3,
} as const;
