/**
 * MainContent Primitive
 *
 * Main content area with proper padding and overflow handling.
 * Uses design tokens only.
 */

import React, { forwardRef } from 'react';
import { cn } from '../utils';

export interface MainContentProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Padding preset
   * @default 'default'
   */
  padding?: 'none' | 'sm' | 'default' | 'lg';

  /**
   * Whether content should scroll
   * @default true
   */
  scrollable?: boolean;

  children: React.ReactNode;
}

const paddingMap = {
  none: '0',
  sm: 'var(--ds-spacing-4)',
  default: 'var(--ds-spacing-6)',
  lg: 'var(--ds-spacing-8)',
};

export const MainContent = forwardRef<HTMLDivElement, MainContentProps>(
  ({ padding = 'default', scrollable = true, children, className, style, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn('ds-main-content', className)}
        style={{
          flex: 1,
          padding: paddingMap[padding],
          overflow: scrollable ? 'auto' : undefined,
          ...style,
        }}
        {...props}
      >
        {children}
      </div>
    );
  }
);

MainContent.displayName = 'MainContent';

export default MainContent;
