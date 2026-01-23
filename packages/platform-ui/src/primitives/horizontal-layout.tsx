/**
 * HorizontalLayout Primitive
 *
 * Top-level horizontal layout with sidebar and main content areas.
 * Uses design tokens only.
 */

import React, { forwardRef } from 'react';
import { cn } from '../utils';

export interface HorizontalLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the layout should fill the viewport height
   * @default true
   */
  fullHeight?: boolean;

  /**
   * Background color preset
   * @default 'default'
   */
  background?: 'default' | 'subtle' | 'surface';

  children: React.ReactNode;
}

const backgroundMap = {
  default: 'var(--ds-color-neutral-background-default)',
  subtle: 'var(--ds-color-neutral-background-subtle)',
  surface: 'var(--ds-color-neutral-surface-default)',
};

export const HorizontalLayout = forwardRef<HTMLDivElement, HorizontalLayoutProps>(
  ({ fullHeight = true, background = 'default', children, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('ds-horizontal-layout', className)}
        style={{
          display: 'flex',
          height: fullHeight ? '100vh' : undefined,
          backgroundColor: backgroundMap[background],
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

HorizontalLayout.displayName = 'HorizontalLayout';

export default HorizontalLayout;
