/**
 * App Shell Component
 *
 * Main application shell with header and content areas.
 * Supports responsive padding and maxWidth.
 * Following Designsystemet patterns.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <AppShell header={<Header />}>
 *   <Content />
 * </AppShell>
 *
 * // With responsive padding
 * <AppShell
 *   header={<Header />}
 *   padding={{ base: 'sm', md: 'md', lg: 'lg' }}
 * >
 *   <Content />
 * </AppShell>
 *
 * // With responsive maxWidth
 * <AppShell
 *   header={<Header />}
 *   maxWidth={{ base: 'full', md: 'lg', xl: 'max' }}
 * >
 *   <Content />
 * </AppShell>
 * ```
 */

import React, { forwardRef, useMemo } from 'react';
import { cn } from '../utils';
import {
  type ContainerSize,
  type ResponsiveContainerSize,
  type PaddingSize,
  type ResponsivePadding,
  type Breakpoint,
  isResponsive,
  containerSizeMap,
  spacingTokenMap,
} from '../primitives/responsive-types';

// =============================================================================
// Types
// =============================================================================

export interface AppShellProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Header component
   */
  header?: React.ReactNode;

  /**
   * Footer component
   */
  footer?: React.ReactNode;

  /**
   * Maximum width of content. Can be a simple value or responsive object.
   *
   * @example maxWidth="lg"
   * @example maxWidth={{ base: 'full', md: 'lg', xl: 'max' }}
   * @default '1440px'
   */
  maxWidth?: ContainerSize | ResponsiveContainerSize | string;

  /**
   * Whether to use fluid layout (no max width)
   * @default false
   */
  fluid?: boolean;

  /**
   * Content padding. Can be a token name or responsive object.
   * Uses responsive defaults for sensible spacing at all breakpoints.
   *
   * @example padding="md"
   * @example padding={{ base: 'sm', md: 'md', lg: 'lg' }}
   * @example padding="none" // to disable default padding
   * @default { base: 'md', md: 'lg' } (16px mobile, 20px desktop)
   */
  padding?: PaddingSize | ResponsivePadding;

  /**
   * Background color
   * @default 'var(--ds-color-neutral-background-default)'
   */
  background?: string;

  /**
   * Minimum height for the shell
   * @default '100vh'
   */
  minHeight?: string;
}

// =============================================================================
// Helpers
// =============================================================================

/**
 * Check if maxWidth is a container size token
 */
function isContainerSize(value: unknown): value is ContainerSize {
  return typeof value === 'string' && value in containerSizeMap;
}

/**
 * Check if padding is a spacing token
 */
function isPaddingToken(value: unknown): value is PaddingSize {
  return typeof value === 'string' && value in spacingTokenMap;
}

/**
 * Get CSS class for container size at breakpoint
 */
function getContainerSizeClass(breakpoint: Breakpoint, size: ContainerSize): string {
  if (breakpoint === 'base') {
    return `ds-container-${size}`;
  }
  return `ds-container-${breakpoint}-${size}`;
}

/**
 * Get CSS class for padding at breakpoint
 */
function getPaddingClass(breakpoint: Breakpoint, size: PaddingSize): string {
  if (breakpoint === 'base') {
    return `ds-p-${size}`;
  }
  return `ds-p-${breakpoint}-${size}`;
}

// =============================================================================
// Constants
// =============================================================================

/** Default responsive padding: 16px mobile, 20px desktop */
const defaultPadding: ResponsivePadding = { base: 'md', md: 'lg' };

// =============================================================================
// Component
// =============================================================================

export const AppShell = forwardRef<HTMLDivElement, AppShellProps>(
  (
    {
      children,
      fluid = false,
      maxWidth = '1440px',
      background = 'var(--ds-color-neutral-background-default)',
      minHeight = '100vh',
      padding = defaultPadding,
      header,
      footer,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Build responsive maxWidth classes
    const maxWidthClasses = useMemo(() => {
      if (fluid || !maxWidth) return [];

      // Responsive maxWidth object - use CSS classes
      if (typeof maxWidth === 'object' && isResponsive(maxWidth)) {
        const classes: string[] = [];
        const breakpoints: Breakpoint[] = ['base', 'sm', 'md', 'lg', 'xl'];

        for (const bp of breakpoints) {
          const bpSize = maxWidth[bp];
          if (bpSize) {
            classes.push(getContainerSizeClass(bp, bpSize));
          }
        }

        return classes;
      }

      // Token size - use CSS class
      if (isContainerSize(maxWidth)) {
        return [`ds-container-${maxWidth}`];
      }

      return [];
    }, [maxWidth, fluid]);

    // Build responsive padding classes for main content
    const paddingClasses = useMemo(() => {
      if (!padding) return [];

      // Responsive padding object - use CSS classes
      if (isResponsive(padding)) {
        const classes: string[] = [];
        const breakpoints: Breakpoint[] = ['base', 'sm', 'md', 'lg', 'xl'];

        for (const bp of breakpoints) {
          const bpPadding = padding[bp];
          if (bpPadding) {
            classes.push(getPaddingClass(bp, bpPadding));
          }
        }

        return classes;
      }

      // Token padding - use CSS class
      if (isPaddingToken(padding)) {
        return [`ds-p-${padding}`];
      }

      return [];
    }, [padding]);

    // Determine if we should use inline styles
    const useInlineMaxWidth =
      !fluid && maxWidth !== undefined && !isResponsive(maxWidth) && !isContainerSize(maxWidth);

    // Build shell style
    const shellStyle: React.CSSProperties = {
      maxWidth: fluid ? 'none' : useInlineMaxWidth ? (maxWidth as string) : undefined,
      margin: '0 auto',
      background,
      minHeight,
      display: 'flex',
      flexDirection: 'column',
      ...style,
    };

    // Build class name
    const shellClassName = cn('ds-app-shell', maxWidthClasses.join(' '), className);

    // Build main content class name
    const mainClassName = cn('ds-app-shell-main', paddingClasses.join(' '));

    return (
      <div ref={ref} className={shellClassName} style={shellStyle} {...props}>
        {/* Header Section */}
        {header && <header style={{ flexShrink: 0 }}>{header}</header>}

        {/* Main Content */}
        <main
          className={mainClassName}
          style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          {children}
        </main>

        {/* Footer Section */}
        {footer && (
          <footer
            style={{
              flexShrink: 0,
              marginTop: 'auto',
            }}
          >
            {footer}
          </footer>
        )}
      </div>
    );
  }
);

AppShell.displayName = 'AppShell';
