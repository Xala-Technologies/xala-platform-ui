/**
 * Card Component
 *
 * Container component for content with sensible default padding.
 *
 * @example
 * ```tsx
 * // Default card with 16px padding
 * <Card>Content</Card>
 *
 * // Card with no padding (for custom layouts)
 * <Card padding="none">Custom content</Card>
 *
 * // Card with different padding sizes
 * <Card padding="sm">Compact content</Card>
 * <Card padding="lg">Spacious content</Card>
 * ```
 */

import React, { forwardRef } from 'react';
import { cn } from '../utils';

/** Card padding size options */
export type CardPadding = 'none' | 'sm' | 'md' | 'lg';

/** Padding size to CSS value mapping */
const paddingMap: Record<CardPadding, string> = {
  none: '0',
  sm: 'var(--ds-spacing-3)', // 12px
  md: 'var(--ds-spacing-4)', // 16px (default - minimum standard)
  lg: 'var(--ds-spacing-5)', // 20px
};

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Card variant
   * @default 'default'
   */
  variant?: 'default' | 'outlined' | 'elevated';

  /**
   * Card padding. Use 'none' for custom layouts.
   * @default 'md' (16px - minimum spacing standard)
   */
  padding?: CardPadding;
}

export const Card = forwardRef<HTMLDivElement, CardProps>(
  ({ variant = 'default', padding = 'md', className, style, ...props }, ref) => {
    const getStyles = (): React.CSSProperties => {
      const base: React.CSSProperties = {
        borderRadius: 'var(--ds-border-radius-md)',
        transition: 'all 0.2s',
        padding: paddingMap[padding],
      };

      switch (variant) {
        case 'outlined':
          return {
            ...base,
            border: '1px solid var(--ds-color-neutral-border-default)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
          };
        case 'elevated':
          return {
            ...base,
            boxShadow: 'var(--ds-shadow-md)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
          };
        default:
          return {
            ...base,
            border: '1px solid var(--ds-color-neutral-border-subtle)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
          };
      }
    };

    return (
      <div
        ref={ref}
        className={cn('ds-card', className)}
        style={{ ...getStyles(), ...style }}
        {...props}
      />
    );
  }
);

Card.displayName = 'Card';
