/**
 * Container Primitive
 *
 * Low-level container component for consistent layouts with responsive padding.
 * Uses CSS classes from common-extensions.css for consistent behavior.
 *
 * @example
 * ```tsx
 * // Default container (1440px max-width)
 * <Container>Content</Container>
 *
 * // Size preset
 * <Container size="md">Narrower content</Container>
 *
 * // Fluid container (full width)
 * <Container fluid>Full width content</Container>
 *
 * // Custom max-width
 * <Container maxWidth="800px">Custom width</Container>
 * ```
 *
 * @module @xala-technologies/platform-ui-core/primitives/container
 */

import React, { forwardRef, useMemo } from 'react';
import { cn } from '../utils';

// =============================================================================
// Types
// =============================================================================

/** Container size presets matching --ds-size-container-* CSS variables */
export type ContainerSize = 'sm' | 'md' | 'lg' | 'max' | 'full';

/** Size preset map to CSS variables */
const sizeMap: Record<ContainerSize, string> = {
  sm: 'var(--ds-size-container-sm)',   // 600px
  md: 'var(--ds-size-container-md)',   // 960px
  lg: 'var(--ds-size-container-lg)',   // 1200px
  max: 'var(--ds-size-container-max)', // 1440px
  full: '100%',
};

export interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Container size preset.
   * - 'sm': 600px
   * - 'md': 960px
   * - 'lg': 1200px
   * - 'max': 1440px (default)
   * - 'full': 100%
   */
  size?: ContainerSize;

  /**
   * Maximum width of the container (overrides size preset)
   * @default '1440px' (or size preset value)
   */
  maxWidth?: string;

  /**
   * Whether to use fluid layout (no max-width)
   * @default false
   */
  fluid?: boolean;

  /**
   * Padding - can be a token name or CSS value
   * @default 'var(--ds-spacing-8)'
   */
  padding?: string | number;

  /**
   * Horizontal padding only
   */
  px?: string | number;

  /**
   * Vertical padding only
   */
  py?: string | number;

  /**
   * Center the container
   * @default true
   */
  centered?: boolean;
}

// =============================================================================
// Component
// =============================================================================

export const Container = forwardRef<HTMLDivElement, ContainerProps>(
  (
    {
      children,
      size,
      maxWidth,
      fluid = false,
      padding = 'var(--ds-spacing-8)',
      px,
      py,
      centered = true,
      className,
      style,
      ...props
    },
    ref
  ) => {
    const containerStyle = useMemo<React.CSSProperties>(() => {
      // Determine max-width: fluid > maxWidth prop > size preset > default
      let resolvedMaxWidth: string;
      if (fluid) {
        resolvedMaxWidth = 'none';
      } else if (maxWidth) {
        resolvedMaxWidth = maxWidth;
      } else if (size) {
        resolvedMaxWidth = sizeMap[size];
      } else {
        resolvedMaxWidth = sizeMap.max; // Default to 1440px
      }

      return {
        containerType: 'inline-size',
        containerName: 'ds-container',
        maxWidth: resolvedMaxWidth,
        width: '100%',
        margin: centered ? '0 auto' : undefined,
        padding: typeof padding === 'number' ? `${padding}px` : padding,
        paddingLeft: px ? (typeof px === 'number' ? `${px}px` : px) : undefined,
        paddingRight: px ? (typeof px === 'number' ? `${px}px` : px) : undefined,
        paddingTop: py ? (typeof py === 'number' ? `${py}px` : py) : undefined,
        paddingBottom: py ? (typeof py === 'number' ? `${py}px` : py) : undefined,
        ...style,
      } as React.CSSProperties;
    }, [fluid, maxWidth, size, padding, px, py, centered, style]);

    // Build class name with size variant if using CSS classes
    const containerClassName = cn(
      'ds-container',
      size && `ds-container-${size}`,
      className
    );

    return (
      <div ref={ref} className={containerClassName} style={containerStyle} {...props}>
        {children}
      </div>
    );
  }
);

Container.displayName = 'Container';
