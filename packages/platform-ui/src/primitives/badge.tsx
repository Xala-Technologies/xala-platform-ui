/**
 * Badge Component
 *
 * Small status or label component following Designsystemet patterns.
 * Unified implementation consolidating primitives, composed, and blocks variants.
 *
 * @see https://designsystemet.no/en/components/docs/badge/overview
 * @module @xala-technologies/platform-ui/primitives/Badge
 */

import React, { forwardRef, type ReactNode } from 'react';
import { cn } from '../utils';

// =============================================================================
// Types
// =============================================================================

export type BadgeVariant =
  | 'neutral'
  | 'info'
  | 'success'
  | 'warning'
  | 'danger'
  | 'accent'
  | 'default'; // Alias for 'neutral' (backwards compatibility)
export type BadgeSize = 'sm' | 'md' | 'lg';

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  /**
   * Badge variant (semantic color)
   * @default 'neutral'
   */
  variant?: BadgeVariant;

  /**
   * Badge size
   * @default 'md'
   */
  size?: BadgeSize;

  /**
   * Render as a small dot indicator instead of text
   * @default false
   */
  dot?: boolean;

  /**
   * Use pill shape (fully rounded)
   * @default false
   */
  pill?: boolean;

  /**
   * Use outline style instead of filled
   * @default false
   */
  outline?: boolean;

  /**
   * Optional icon to display before children
   */
  icon?: ReactNode;

  /**
   * Children content
   */
  children?: ReactNode;
}

// =============================================================================
// Style Maps
// =============================================================================

// Shared neutral style for 'neutral' and 'default' variants
const neutralStyle = {
  bg: 'var(--ds-color-neutral-surface-hover)',
  bgSubtle: 'var(--ds-color-neutral-surface-default)',
  text: 'var(--ds-color-neutral-text-default)',
  border: 'var(--ds-color-neutral-border-default)',
};

const variantStyles: Record<
  BadgeVariant,
  { bg: string; bgSubtle: string; text: string; border: string }
> = {
  neutral: neutralStyle,
  default: neutralStyle, // Alias for backwards compatibility
  info: {
    bg: 'var(--ds-color-info-surface-default)',
    bgSubtle: 'var(--ds-color-info-surface-subtle)',
    text: 'var(--ds-color-info-text-default)',
    border: 'var(--ds-color-info-border-default)',
  },
  success: {
    bg: 'var(--ds-color-success-surface-default)',
    bgSubtle: 'var(--ds-color-success-surface-subtle)',
    text: 'var(--ds-color-success-text-default)',
    border: 'var(--ds-color-success-border-default)',
  },
  warning: {
    bg: 'var(--ds-color-warning-surface-default)',
    bgSubtle: 'var(--ds-color-warning-surface-subtle)',
    text: 'var(--ds-color-warning-text-default)',
    border: 'var(--ds-color-warning-border-default)',
  },
  danger: {
    bg: 'var(--ds-color-danger-surface-default)',
    bgSubtle: 'var(--ds-color-danger-surface-subtle)',
    text: 'var(--ds-color-danger-text-default)',
    border: 'var(--ds-color-danger-border-default)',
  },
  accent: {
    bg: 'var(--ds-color-accent-surface-default)',
    bgSubtle: 'var(--ds-color-accent-surface-subtle)',
    text: 'var(--ds-color-accent-text-default)',
    border: 'var(--ds-color-accent-border-default)',
  },
};

const sizeStyles: Record<BadgeSize, { padding: string; fontSize: string; height: string }> = {
  sm: {
    padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
    fontSize: 'var(--ds-font-size-xs)',
    height: 'var(--ds-sizing-5)',
  },
  md: {
    padding: 'var(--ds-spacing-1) var(--ds-spacing-3)',
    fontSize: 'var(--ds-font-size-sm)',
    height: 'var(--ds-sizing-6)',
  },
  lg: {
    padding: 'var(--ds-spacing-2) var(--ds-spacing-4)',
    fontSize: 'var(--ds-font-size-md)',
    height: 'var(--ds-sizing-8)',
  },
};

// =============================================================================
// Component
// =============================================================================

/**
 * Badge Component
 *
 * A small status or label indicator.
 *
 * @example Basic badge
 * ```tsx
 * <Badge>Default</Badge>
 * <Badge variant="success">Active</Badge>
 * <Badge variant="danger">Error</Badge>
 * ```
 *
 * @example Dot indicator
 * ```tsx
 * <Badge dot variant="success" />
 * ```
 *
 * @example Pill shape with icon
 * ```tsx
 * <Badge pill icon={<CheckIcon />}>Verified</Badge>
 * ```
 *
 * @example Outline style
 * ```tsx
 * <Badge outline variant="info">Draft</Badge>
 * ```
 */
export const Badge = forwardRef<HTMLSpanElement, BadgeProps>(function Badge(
  {
    variant = 'neutral',
    size = 'md',
    dot = false,
    pill = false,
    outline = false,
    icon,
    children,
    className,
    style,
    ...props
  },
  ref
): React.ReactElement {
  const colors = variantStyles[variant];
  const sizes = sizeStyles[size];

  // Dot variant - small circular indicator
  if (dot) {
    const dotSizeMap: Record<BadgeSize, string> = {
      sm: 'var(--ds-sizing-2)',
      md: 'var(--ds-sizing-2)',
      lg: 'var(--ds-sizing-3)',
    };

    return (
      <span
        ref={ref}
        className={cn('ds-badge ds-badge--dot', className)}
        style={{
          display: 'inline-block',
          width: dotSizeMap[size],
          height: dotSizeMap[size],
          borderRadius: 'var(--ds-border-radius-full)',
          backgroundColor: colors.text,
          ...style,
        }}
        aria-hidden="true"
        {...props}
      />
    );
  }

  // Full badge with text
  const badgeStyles: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 'var(--ds-spacing-1)',
    padding: sizes.padding,
    fontSize: sizes.fontSize,
    fontWeight: 'var(--ds-font-weight-medium)',
    lineHeight: 1,
    whiteSpace: 'nowrap',
    borderRadius: pill ? 'var(--ds-border-radius-full)' : 'var(--ds-border-radius-sm)',
    transition: 'all 0.2s',
    // Colors based on outline prop
    backgroundColor: outline ? 'transparent' : colors.bg,
    color: colors.text,
    borderWidth: outline ? 'var(--ds-border-width-default)' : '0',
    borderStyle: 'solid',
    borderColor: outline ? colors.border : 'transparent',
  };

  return (
    <span
      ref={ref}
      className={cn('ds-badge', className)}
      style={{ ...badgeStyles, ...style }}
      {...props}
    >
      {icon && <span className="ds-badge__icon">{icon}</span>}
      {children}
    </span>
  );
});

Badge.displayName = 'Badge';

export default Badge;
