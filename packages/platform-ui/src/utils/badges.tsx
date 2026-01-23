/**
 * Badge Utilities
 *
 * Shared badge rendering utilities and components
 */

import * as React from 'react';
import type { ResourceBadge } from '../patterns/types';

/**
 * Get badge color CSS variables based on variant
 */
export function getBadgeColor(
  variant: ResourceBadge['variant'] = 'neutral'
): { bg: string; text: string } {
  const colors: Record<
    NonNullable<ResourceBadge['variant']>,
    { bg: string; text: string }
  > = {
    neutral: {
      bg: 'var(--ds-color-neutral-surface-hover)',
      text: 'var(--ds-color-neutral-text-default)',
    },
    accent: {
      bg: 'var(--ds-color-accent-surface-default)',
      text: 'var(--ds-color-accent-text-default)',
    },
    success: {
      bg: 'var(--ds-color-success-surface-default)',
      text: 'var(--ds-color-success-text-default)',
    },
    warning: {
      bg: 'var(--ds-color-warning-surface-default)',
      text: 'var(--ds-color-warning-text-default)',
    },
    danger: {
      bg: 'var(--ds-color-danger-surface-default)',
      text: 'var(--ds-color-danger-text-default)',
    },
    info: {
      bg: 'var(--ds-color-info-surface-default)',
      text: 'var(--ds-color-info-text-default)',
    },
  };
  return colors[variant];
}

/**
 * Badge component
 */
export interface BadgeProps {
  badge: ResourceBadge;
}

export function Badge({ badge }: BadgeProps) {
  const colors = getBadgeColor(badge.variant);

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        gap: 'var(--ds-spacing-1)',
        padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
        fontSize: 'var(--ds-font-size-xs)',
        fontWeight: 500,
        backgroundColor: colors.bg,
        color: colors.text,
        borderRadius: 'var(--ds-border-radius-md)',
        whiteSpace: 'nowrap', // CSS property without design token equivalent
      }}
    >
      {badge.icon && (
        <span
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            // Layout properties without design tokens are acceptable
          }}
        >
          {badge.icon}
        </span>
      )}
      {badge.text}
    </span>
  );
}

/**
 * Render multiple badges with overflow handling
 */
export interface BadgeListProps {
  badges: ResourceBadge[];
  maxVisible?: number;
  moreLabel?: string;
}

export function BadgeList({ badges, maxVisible = 3, moreLabel }: BadgeListProps) {
  const visibleBadges = badges.slice(0, maxVisible);
  const remaining = badges.length - maxVisible;

  return (
    <>
      {visibleBadges.map((badge) => (
        <Badge key={badge.id} badge={badge} />
      ))}
      {remaining > 0 && moreLabel && (
        <span
          style={{
            fontSize: 'var(--ds-font-size-xs)',
            color: 'var(--ds-color-neutral-text-subtle)',
            alignSelf: 'center', // CSS property without design token equivalent
          }}
        >
          {moreLabel}
        </span>
      )}
    </>
  );
}
