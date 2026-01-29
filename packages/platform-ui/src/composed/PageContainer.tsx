/**
 * PageContainer Component
 *
 * Semantic page wrapper with proper spacing from design tokens.
 * Renders as <main> element for accessibility with skip-link support.
 * Supports responsive maxWidth, padding, and gap.
 *
 * @example
 * ```tsx
 * // Basic usage
 * <PageContainer>
 *   <Heading>Page Title</Heading>
 *   <Content />
 * </PageContainer>
 *
 * // With max-width and custom gap
 * <PageContainer maxWidth="lg" gap="md" padding="md">
 *   <Content />
 * </PageContainer>
 *
 * // With responsive maxWidth
 * <PageContainer maxWidth={{ base: 'full', md: 'lg', xl: 'xl' }}>
 *   <Content />
 * </PageContainer>
 *
 * // With responsive padding and gap
 * <PageContainer
 *   padding={{ base: 'sm', md: 'md', lg: 'lg' }}
 *   gap={{ base: 'sm', md: 'md' }}
 * >
 *   <Content />
 * </PageContainer>
 *
 * // As div instead of main (for nested containers)
 * <PageContainer asMain={false}>
 *   <Content />
 * </PageContainer>
 * ```
 *
 * @module @xala-technologies/platform/ui/composed/PageContainer
 */

/* eslint-disable no-restricted-syntax -- Raw HTML elements (main, div) required for semantic page container structure with design tokens */

import * as React from 'react';
import { forwardRef, useMemo } from 'react';
import { cn } from '../utils';
import {
  type ContainerSize,
  type ResponsiveContainerSize,
  type GapSize,
  type ResponsiveGap,
  type PaddingSize,
  type ResponsivePadding,
  type Breakpoint,
  isResponsive,
  containerSizeMap,
  gapTokenMap,
  spacingTokenMap,
} from '../primitives/responsive-types';

// =============================================================================
// Types
// =============================================================================

/** Legacy numeric gap values for backward compatibility */
type LegacyGapValue = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

/** Legacy numeric padding values for backward compatibility */
type LegacyPaddingValue = 0 | 1 | 2 | 3 | 4 | 5 | 6;

/** Legacy maxWidth values */
type LegacyMaxWidthValue = 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none';

export interface PageContainerProps extends React.HTMLAttributes<HTMLElement> {
  /**
   * Spacing between child elements. Can be a token, responsive object, or legacy number.
   *
   * @example gap="md"
   * @example gap={{ base: 'sm', md: 'md', lg: 'lg' }}
   * @example gap={6} // Legacy support
   * @default 'lg'
   */
  gap?: GapSize | ResponsiveGap | LegacyGapValue;

  /**
   * Maximum width constraint. Can be a token, responsive object, or legacy value.
   *
   * @example maxWidth="lg"
   * @example maxWidth={{ base: 'full', md: 'lg', xl: 'max' }}
   * @default 'none'
   */
  maxWidth?: ContainerSize | ResponsiveContainerSize | LegacyMaxWidthValue | string;

  /**
   * Padding around content. Can be a token, responsive object, or legacy number.
   * Uses responsive defaults for sensible spacing at all breakpoints.
   *
   * @example padding="md"
   * @example padding={{ base: 'sm', md: 'md', lg: 'lg' }}
   * @example padding={4} // Legacy support
   * @example padding="none" // to disable default padding
   * @default { base: 'md', md: 'lg' } (16px mobile, 20px desktop)
   */
  padding?: PaddingSize | ResponsivePadding | LegacyPaddingValue;

  /**
   * Render as <main> element for semantic HTML.
   * Set to false for nested containers.
   * @default true
   */
  asMain?: boolean;

  /**
   * ID for skip-link navigation (accessibility).
   * Only applies when asMain is true.
   * @default 'main-content'
   */
  skipLinkId?: string;

  /**
   * Center the container horizontally.
   * @default true
   */
  centered?: boolean;
}

// =============================================================================
// Constants & Helpers
// =============================================================================

/** Legacy maxWidth map for backward compatibility */
const legacyMaxWidthMap: Record<LegacyMaxWidthValue, string> = {
  sm: 'var(--ds-size-container-sm, 600px)',
  md: 'var(--ds-size-container-md, 960px)',
  lg: 'var(--ds-size-container-lg, 1200px)',
  xl: 'var(--ds-size-container-max, 1440px)',
  full: '100%',
  none: 'none',
};

/** Legacy gap number to token map */
const legacyGapMap: Record<LegacyGapValue, GapSize> = {
  1: 'xs',
  2: 'sm',
  3: 'sm',
  4: 'md',
  5: 'md',
  6: 'lg',
  7: 'lg',
  8: 'xl',
};

/** Legacy padding number to token map */
const legacyPaddingMap: Record<LegacyPaddingValue, PaddingSize | 'none'> = {
  0: 'none',
  1: 'xs',
  2: 'sm',
  3: 'sm',
  4: 'md',
  5: 'md',
  6: 'lg',
};

/** Default responsive padding: 16px mobile, 20px desktop */
const defaultPadding: ResponsivePadding = { base: 'md', md: 'lg' };

/**
 * Check if maxWidth is a container size token
 */
function isContainerSize(value: unknown): value is ContainerSize {
  return typeof value === 'string' && value in containerSizeMap;
}

/**
 * Check if gap is a gap token
 */
function isGapToken(value: unknown): value is GapSize {
  return typeof value === 'string' && value in gapTokenMap;
}

/**
 * Check if padding is a spacing token
 */
function isPaddingToken(value: unknown): value is PaddingSize {
  return typeof value === 'string' && value in spacingTokenMap;
}

/**
 * Check if value is a legacy maxWidth value
 */
function isLegacyMaxWidth(value: unknown): value is LegacyMaxWidthValue {
  return typeof value === 'string' && value in legacyMaxWidthMap;
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
 * Get CSS class for gap at breakpoint
 */
function getGapClass(breakpoint: Breakpoint, size: GapSize): string {
  if (breakpoint === 'base') {
    return `ds-stack-gap-${size}`;
  }
  return `ds-gap-${breakpoint}-${size}`;
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
// Component
// =============================================================================

export const PageContainer = forwardRef<HTMLElement, PageContainerProps>(
  (
    {
      gap = 'lg',
      maxWidth = 'none',
      padding = defaultPadding,
      asMain = true,
      skipLinkId = 'main-content',
      centered = true,
      className,
      style,
      children,
      ...props
    },
    ref
  ) => {
    // Normalize gap value (handle legacy numbers)
    const normalizedGap = useMemo(() => {
      if (typeof gap === 'number') {
        return legacyGapMap[gap as LegacyGapValue] ?? 'lg';
      }
      return gap;
    }, [gap]);

    // Build responsive gap classes
    const gapClasses = useMemo(() => {
      if (normalizedGap === 'none' || normalizedGap === undefined) return [];

      // Responsive gap object - use CSS classes
      if (isResponsive(normalizedGap)) {
        const classes: string[] = [];
        const breakpoints: Breakpoint[] = ['base', 'sm', 'md', 'lg', 'xl'];

        for (const bp of breakpoints) {
          const bpGap = normalizedGap[bp];
          if (bpGap && bpGap !== 'none') {
            classes.push(getGapClass(bp, bpGap));
          }
        }

        return classes;
      }

      // Token gap - use CSS class
      if (isGapToken(normalizedGap)) {
        return [`ds-stack-gap-${normalizedGap}`];
      }

      return [];
    }, [normalizedGap]);

    // Normalize padding value (handle legacy numbers)
    const normalizedPadding = useMemo(() => {
      if (typeof padding === 'number') {
        return legacyPaddingMap[padding as LegacyPaddingValue] ?? 'none';
      }
      return padding;
    }, [padding]);

    // Build responsive padding classes
    const paddingClasses = useMemo(() => {
      if (normalizedPadding === 'none' || normalizedPadding === undefined) return [];

      // Responsive padding object - use CSS classes
      if (isResponsive(normalizedPadding)) {
        const classes: string[] = [];
        const breakpoints: Breakpoint[] = ['base', 'sm', 'md', 'lg', 'xl'];

        for (const bp of breakpoints) {
          const bpPadding = normalizedPadding[bp];
          if (bpPadding && bpPadding !== 'none') {
            classes.push(getPaddingClass(bp, bpPadding));
          }
        }

        return classes;
      }

      // Token padding - use CSS class
      if (isPaddingToken(normalizedPadding)) {
        return [`ds-p-${normalizedPadding}`];
      }

      return [];
    }, [normalizedPadding]);

    // Build responsive maxWidth classes
    const maxWidthClasses = useMemo(() => {
      if (!maxWidth || maxWidth === 'none') return [];

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
    }, [maxWidth]);

    // Determine if we should use inline styles
    const useInlineGap =
      normalizedGap !== 'none' &&
      normalizedGap !== undefined &&
      !isResponsive(normalizedGap) &&
      !isGapToken(normalizedGap);

    const useInlinePadding =
      normalizedPadding !== 'none' &&
      normalizedPadding !== undefined &&
      !isResponsive(normalizedPadding) &&
      !isPaddingToken(normalizedPadding);

    const useInlineMaxWidth =
      maxWidth !== undefined &&
      maxWidth !== 'none' &&
      !isResponsive(maxWidth) &&
      !isContainerSize(maxWidth) &&
      !isLegacyMaxWidth(maxWidth);

    // Resolve legacy maxWidth to CSS value
    const resolvedMaxWidth = useMemo(() => {
      if (isLegacyMaxWidth(maxWidth)) {
        return legacyMaxWidthMap[maxWidth];
      }
      return maxWidth as string;
    }, [maxWidth]);

    const containerStyle = useMemo<React.CSSProperties>(
      () => ({
        display: 'flex',
        flexDirection: 'column',
        gap: useInlineGap ? (gapTokenMap[normalizedGap as GapSize] ?? normalizedGap) : undefined,
        maxWidth: useInlineMaxWidth
          ? resolvedMaxWidth
          : isLegacyMaxWidth(maxWidth)
            ? legacyMaxWidthMap[maxWidth]
            : undefined,
        width: '100%',
        margin: centered ? '0 auto' : undefined,
        padding: useInlinePadding
          ? (spacingTokenMap[normalizedPadding as PaddingSize] ?? normalizedPadding)
          : undefined,
        ...style,
      }),
      [
        normalizedGap,
        useInlineGap,
        useInlineMaxWidth,
        resolvedMaxWidth,
        maxWidth,
        centered,
        normalizedPadding,
        useInlinePadding,
        style,
      ]
    );

    const containerClassName = cn(
      'ds-page-container',
      gapClasses.join(' '),
      paddingClasses.join(' '),
      maxWidthClasses.join(' '),
      className
    );

    if (asMain) {
      return (
        <main
          ref={ref as React.Ref<HTMLElement>}
          id={skipLinkId}
          className={containerClassName}
          style={containerStyle}
          tabIndex={-1} // Allow focus for skip links
          {...props}
        >
          {children}
        </main>
      );
    }

    return (
      <div
        ref={ref as React.Ref<HTMLDivElement>}
        className={containerClassName}
        style={containerStyle}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PageContainer.displayName = 'PageContainer';

export default PageContainer;
