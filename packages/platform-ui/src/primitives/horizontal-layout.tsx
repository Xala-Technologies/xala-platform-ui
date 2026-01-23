/**
 * HorizontalLayout Primitive
 *
 * Flexible horizontal layout component for row-based layouts.
 * Uses design tokens only.
 */

import React, { forwardRef } from 'react';
import { cn } from '../utils';

type AlignValue = 'start' | 'center' | 'end' | 'stretch' | 'baseline' | 'flex-start' | 'flex-end';
type JustifyValue =
  | 'start'
  | 'center'
  | 'end'
  | 'between'
  | 'around'
  | 'evenly'
  | 'flex-start'
  | 'flex-end'
  | 'space-between'
  | 'space-around'
  | 'space-evenly';

export interface HorizontalLayoutProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Whether the layout should fill the viewport height
   * @default false
   */
  fullHeight?: boolean;

  /**
   * Background color preset
   */
  background?: 'default' | 'subtle' | 'surface';

  /**
   * Gap between items
   */
  gap?: string | number;

  /**
   * Align items vertically
   */
  align?: AlignValue;

  /**
   * Justify items horizontally
   */
  justify?: JustifyValue;

  /**
   * Whether to wrap items
   * @default false
   */
  wrap?: boolean;

  children: React.ReactNode;
}

const backgroundMap: Record<string, string> = {
  default: 'var(--ds-color-neutral-background-default)',
  subtle: 'var(--ds-color-neutral-background-subtle)',
  surface: 'var(--ds-color-neutral-surface-default)',
};

// Map short values to CSS values
const alignMap: Record<string, string> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  stretch: 'stretch',
  baseline: 'baseline',
  'flex-start': 'flex-start',
  'flex-end': 'flex-end',
};

const justifyMap: Record<string, string> = {
  start: 'flex-start',
  end: 'flex-end',
  center: 'center',
  between: 'space-between',
  around: 'space-around',
  evenly: 'space-evenly',
  'flex-start': 'flex-start',
  'flex-end': 'flex-end',
  'space-between': 'space-between',
  'space-around': 'space-around',
  'space-evenly': 'space-evenly',
};

export const HorizontalLayout = forwardRef<HTMLDivElement, HorizontalLayoutProps>(
  (
    {
      fullHeight = false,
      background,
      gap,
      align,
      justify,
      wrap = false,
      children,
      className,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn('ds-horizontal-layout', className)}
        style={{
          display: 'flex',
          flexDirection: 'row',
          height: fullHeight ? '100vh' : undefined,
          backgroundColor: background ? backgroundMap[background] : undefined,
          gap: gap ? (typeof gap === 'number' ? `${gap}px` : gap) : undefined,
          alignItems: align ? alignMap[align] || align : undefined,
          justifyContent: justify ? justifyMap[justify] || justify : undefined,
          flexWrap: wrap ? 'wrap' : undefined,
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
