/**
 * SeasonStatusBadge Component - Pure Presentational
 *
 * Displays a colored badge for season status with no SDK dependencies.
 * Label and color are provided as props for i18n and flexibility.
 *
 * @module @xala-technologies/platform-ui/features/seasons
 *
 * @example
 * ```tsx
 * import { SeasonStatusBadge, getSeasonStatusColor } from '@xala-technologies/platform-ui/features/seasons';
 * import { useT } from '@xala-technologies/platform/i18n';
 *
 * const status = 'open';
 * <SeasonStatusBadge
 *   label={t(`seasons.status.${status}`)}
 *   color={getSeasonStatusColor(status)}
 *   size="sm"
 * />
 * ```
 */

import { Tag } from '@xala-technologies/platform-ui/primitives';

// =============================================================================
// Types
// =============================================================================

/**
 * Badge color options matching Designsystemet Tag colors
 */
export type BadgeColor = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

/**
 * SeasonStatusBadge Props
 */
export interface SeasonStatusBadgeProps {
  /** Status label text (translated) */
  label: string;
  /** Badge color */
  color: BadgeColor;
  /** Badge size */
  size?: 'sm' | 'md' | 'lg';
  /** Test ID for testing */
  'data-testid'?: string;
}

// =============================================================================
// Component
// =============================================================================

/**
 * Pure presentational badge component for displaying season status.
 *
 * **Pure Component Pattern:**
 * - No SDK imports
 * - No i18n dependencies
 * - Label and color provided as props
 * - Parent component handles translation and color mapping
 *
 * **Integration:**
 * Use with `getSeasonStatusColor()` helper from mappers:
 * ```tsx
 * import { SeasonStatusBadge, getSeasonStatusColor } from './mappers';
 *
 * <SeasonStatusBadge
 *   label={t(`seasons.status.${season.status}`)}
 *   color={getSeasonStatusColor(season.status)}
 * />
 * ```
 */
export function SeasonStatusBadge({
  label,
  color,
  size = 'sm',
  'data-testid': testId,
}: SeasonStatusBadgeProps) {
  return (
    <Tag data-color={color} data-size={size} data-testid={testId}>
      {label}
    </Tag>
  );
}

export default SeasonStatusBadge;
