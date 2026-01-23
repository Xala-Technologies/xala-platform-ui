/**
 * Stack Primitive
 *
 * Low-level stack component for vertical/horizontal layouts
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

export interface StackProps extends Omit<React.HTMLAttributes<HTMLDivElement>, 'ref'> {
  /**
   * Direction of the stack
   * @default 'vertical'
   */
  direction?: 'vertical' | 'horizontal';

  /**
   * Spacing between items (alias: gap)
   * @default '0'
   */
  spacing?: string | number;

  /**
   * Gap between items (alias for spacing)
   */
  gap?: string | number;

  /**
   * Align items
   */
  align?: AlignValue;

  /**
   * Justify items
   */
  justify?: JustifyValue;

  /**
   * Whether to wrap items
   * @default false
   */
  wrap?: boolean;

  /**
   * Render as a different element (limited to common elements for type safety)
   * @default 'div'
   */
  as?: 'div' | 'span' | 'section' | 'article' | 'aside' | 'nav' | 'header' | 'footer' | 'main';
}

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

export const Stack = forwardRef<HTMLElement, StackProps>(
  (
    {
      children,
      direction = 'vertical',
      spacing = 0,
      gap,
      align,
      justify,
      wrap = false,
      as = 'div',
      className,
      style,
      ...props
    },
    ref
  ) => {
    const gapValue = gap ?? spacing;
    const stackStyle: React.CSSProperties = {
      display: 'flex',
      flexDirection: direction === 'vertical' ? 'column' : 'row',
      gap: typeof gapValue === 'number' ? `${gapValue}px` : gapValue,
      alignItems: align ? alignMap[align] || align : undefined,
      justifyContent: justify ? justifyMap[justify] || justify : undefined,
      flexWrap: wrap ? 'wrap' : 'nowrap',
      ...style,
    };

    // Using createElement to avoid complex union types
    return React.createElement(
      as,
      {
        ref,
        className: cn('ds-stack', `ds-stack--${direction}`, className),
        style: stackStyle,
        ...props,
      },
      children
    );
  }
);

Stack.displayName = 'Stack';
