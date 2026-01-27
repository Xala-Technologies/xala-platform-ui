/**
 * PageContainer Component
 *
 * Consistent page wrapper with proper spacing from design tokens.
 * Eliminates repeated inline styles across pages.
 *
 * @module @xala-technologies/platform/ui/composed/PageContainer
 */

import * as React from 'react';
import { forwardRef } from 'react';

export interface PageContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Spacing between child elements. Default: 6 */
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  /** Maximum width constraint. Default: none */
  maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full' | 'none';
  /** Padding around content. Default: 0 */
  padding?: 0 | 1 | 2 | 3 | 4 | 5 | 6;
}

const maxWidthMap: Record<NonNullable<PageContainerProps['maxWidth']>, string> = {
  sm: 'var(--ds-sizing-144)',
  md: 'var(--ds-sizing-192)',
  lg: 'var(--ds-sizing-256)',
  xl: 'var(--ds-sizing-320)',
  full: '100%',
  none: 'none',
};

export const PageContainer = forwardRef<HTMLDivElement, PageContainerProps>(
  ({ gap = 6, maxWidth = 'none', padding = 0, style, children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: `var(--ds-spacing-${gap})`,
          maxWidth: maxWidthMap[maxWidth],
          padding: padding > 0 ? `var(--ds-spacing-${padding})` : undefined,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

PageContainer.displayName = 'PageContainer';

export default PageContainer;
