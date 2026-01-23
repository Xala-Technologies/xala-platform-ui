/**
 * Status Utilities
 *
 * Shared status indicator utilities and color mappings
 */

import type { StatusIndicator } from '../patterns/types';
import type { PeriodStatus } from '../patterns/types';

/**
 * Get status color based on type
 */
export function getStatusColor(type: StatusIndicator['type']): string {
  const colors: Record<StatusIndicator['type'], string> = {
    available: 'var(--ds-color-success-base-default)',
    limited: 'var(--ds-color-warning-base-default)',
    unavailable: 'var(--ds-color-danger-base-default)',
    pending: 'var(--ds-color-info-base-default)',
    confirmed: 'var(--ds-color-success-base-default)',
  };
  return colors[type] || 'var(--ds-color-neutral-base-default)';
}

/**
 * Get period status colors
 */
export function getPeriodStatusColors(
  type: PeriodStatus
): { bg: string; text: string; border: string } {
  const colors: Record<PeriodStatus, { bg: string; text: string; border: string }> = {
    upcoming: {
      bg: 'var(--ds-color-info-surface-default)',
      text: 'var(--ds-color-info-text-default)',
      border: 'var(--ds-color-info-border-default)',
    },
    active: {
      bg: 'var(--ds-color-success-surface-default)',
      text: 'var(--ds-color-success-text-default)',
      border: 'var(--ds-color-success-border-default)',
    },
    ending_soon: {
      bg: 'var(--ds-color-warning-surface-default)',
      text: 'var(--ds-color-warning-text-default)',
      border: 'var(--ds-color-warning-border-default)',
    },
    ended: {
      bg: 'var(--ds-color-neutral-surface-default)',
      text: 'var(--ds-color-neutral-text-subtle)',
      border: 'var(--ds-color-neutral-border-default)',
    },
    draft: {
      bg: 'var(--ds-color-neutral-surface-hover)',
      text: 'var(--ds-color-neutral-text-subtle)',
      border: 'var(--ds-color-neutral-border-subtle)',
    },
    cancelled: {
      bg: 'var(--ds-color-danger-surface-default)',
      text: 'var(--ds-color-danger-text-default)',
      border: 'var(--ds-color-danger-border-default)',
    },
  };
  return colors[type];
}

/**
 * Status indicator dot component
 */
export interface StatusDotProps {
  type: StatusIndicator['type'];
  size?: number;
}

export function StatusDot({ type, size = 8 }: StatusDotProps) {
  // Use design token spacing if size matches, otherwise use dynamic size
  // Size 8px matches --ds-spacing-2, but we allow dynamic sizing for flexibility
  return (
    <span
      style={{
        width: `${size}px`, // Dynamic size - design tokens don't support all sizes
        height: `${size}px`, // Dynamic size - design tokens don't support all sizes
        borderRadius: 'var(--ds-border-radius-full)',
        backgroundColor: getStatusColor(type),
        display: 'inline-block', // CSS property without design token equivalent
      }}
    />
  );
}
