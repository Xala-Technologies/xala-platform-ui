/**
 * PageContainer Component
 *
 * Semantic page wrapper with proper spacing from design tokens.
 * Renders as <main> element for accessibility with skip-link support.
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
 * <PageContainer maxWidth="lg" gap={4} padding={4}>
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

import * as React from 'react';
import { forwardRef, useMemo } from 'react';
import { cn } from '../utils';

// =============================================================================
// Types
// =============================================================================

export interface PageContainerProps extends React.HTMLAttributes<HTMLElement> {
  /** Spacing between child elements. Default: 6 */
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

  /** Maximum width constraint. Default: none */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none';

  /** Padding around content. Default: 0 */
  padding?: 0 | 1 | 2 | 3 | 4 | 5 | 6;

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
// Constants
// =============================================================================

const maxWidthMap: Record<NonNullable<PageContainerProps['maxWidth']>, string> = {
  sm: 'var(--ds-size-container-sm, 600px)',
  md: 'var(--ds-size-container-md, 960px)',
  lg: 'var(--ds-size-container-lg, 1200px)',
  xl: 'var(--ds-size-container-max, 1440px)',
  full: '100%',
  none: 'none',
};

// =============================================================================
// Component
// =============================================================================

export const PageContainer = forwardRef<HTMLElement, PageContainerProps>(
  (
    {
      gap = 6,
      maxWidth = 'none',
      padding = 0,
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
    const containerStyle = useMemo<React.CSSProperties>(() => ({
      display: 'flex',
      flexDirection: 'column',
      gap: `var(--ds-spacing-${gap})`,
      maxWidth: maxWidthMap[maxWidth],
      width: '100%',
      margin: centered ? '0 auto' : undefined,
      padding: padding > 0 ? `var(--ds-spacing-${padding})` : undefined,
      ...style,
    }), [gap, maxWidth, centered, padding, style]);

    const containerClassName = cn('ds-page-container', className);

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
