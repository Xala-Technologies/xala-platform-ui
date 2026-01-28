/**
 * Grid Primitive
 *
 * Responsive grid layout component with token-based spacing.
 * Uses CSS classes from common-extensions.css for responsive behavior.
 *
 * @example
 * ```tsx
 * // Simple grid with 3 columns
 * <Grid cols={3} gap="md">
 *   <Card>Item 1</Card>
 *   <Card>Item 2</Card>
 *   <Card>Item 3</Card>
 * </Grid>
 *
 * // Responsive grid: 1 col on mobile, 2 on md, 3 on lg
 * <Grid cols={{ base: 1, md: 2, lg: 3 }} gap="lg">
 *   ...
 * </Grid>
 *
 * // Auto-fit grid (responsive without breakpoints)
 * <Grid autoFit minColWidth="280px" gap="md">
 *   ...
 * </Grid>
 * ```
 *
 * @module @xala-technologies/platform-ui-core/primitives/grid
 */

import React, { forwardRef, useMemo } from 'react';
import { cn } from '../utils';

// =============================================================================
// Types
// =============================================================================

/** Token-based gap sizes matching --ds-grid-gap-* CSS variables */
export type GridGapSize = 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';

/** Column count options */
export type GridColCount = 1 | 2 | 3 | 4 | 6 | 12;

/** Responsive column configuration */
export interface ResponsiveCols {
  /** Base (mobile-first) columns */
  base?: GridColCount;
  /** Small screens (640px+) */
  sm?: GridColCount;
  /** Medium screens (768px+) */
  md?: GridColCount;
  /** Large screens (1024px+) */
  lg?: GridColCount;
  /** Extra large screens (1280px+) */
  xl?: GridColCount;
}

export interface GridProps extends React.HTMLAttributes<HTMLDivElement> {
  /**
   * Number of columns or responsive column configuration.
   * Use a number for fixed columns, or object for responsive.
   *
   * @example cols={3}
   * @example cols={{ base: 1, md: 2, lg: 3 }}
   */
  cols?: GridColCount | ResponsiveCols;

  /**
   * CSS Grid template columns (legacy prop, use `cols` for responsive behavior)
   * @deprecated Use `cols` for responsive grids
   */
  columns?: string;

  /**
   * CSS Grid template rows
   */
  rows?: string;

  /**
   * Gap between grid items.
   * Can be a token name ('sm', 'md', 'lg'), a CSS value, or a number (px).
   *
   * Token values:
   * - 'none': 0
   * - 'xs': var(--ds-spacing-1)
   * - 'sm': var(--ds-spacing-2)
   * - 'md': var(--ds-spacing-4) (default)
   * - 'lg': var(--ds-spacing-6)
   * - 'xl': var(--ds-spacing-8)
   *
   * @default 'md'
   */
  gap?: GridGapSize | string | number;

  /**
   * Column gap (overrides gap for horizontal spacing)
   */
  gapX?: GridGapSize | string | number;

  /**
   * Row gap (overrides gap for vertical spacing)
   */
  gapY?: GridGapSize | string | number;

  /**
   * Enable auto-fit behavior (grid adapts to available space).
   * Works well with `minColWidth`.
   */
  autoFit?: boolean;

  /**
   * Enable auto-fill behavior (similar to autoFit but fills empty slots).
   */
  autoFill?: boolean;

  /**
   * Minimum column width for auto-fit/auto-fill grids.
   * @default '280px'
   */
  minColWidth?: string;

  /**
   * Align items on the block axis (vertical in LTR)
   */
  alignItems?: 'start' | 'center' | 'end' | 'stretch' | 'baseline';

  /**
   * Justify items on the inline axis (horizontal in LTR)
   */
  justifyItems?: 'start' | 'center' | 'end' | 'stretch';

  /**
   * Align content when there's extra space on block axis
   */
  alignContent?: 'start' | 'center' | 'end' | 'stretch' | 'space-between' | 'space-around';

  /**
   * Justify content when there's extra space on inline axis
   */
  justifyContent?: 'start' | 'center' | 'end' | 'stretch' | 'space-between' | 'space-around';

  /**
   * @deprecated Use `cols` with responsive object instead
   */
  responsive?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
}

// =============================================================================
// Helpers
// =============================================================================

/** Map gap token to CSS variable */
const gapTokenMap: Record<GridGapSize, string> = {
  none: '0',
  xs: 'var(--ds-grid-gap-xs)',
  sm: 'var(--ds-grid-gap-sm)',
  md: 'var(--ds-grid-gap-md)',
  lg: 'var(--ds-grid-gap-lg)',
  xl: 'var(--ds-grid-gap-xl)',
};

/** Resolve gap value to CSS */
function resolveGap(gap: GridGapSize | string | number | undefined): string | undefined {
  if (gap === undefined) return undefined;
  if (typeof gap === 'number') return `${gap}px`;
  if (gap in gapTokenMap) return gapTokenMap[gap as GridGapSize];
  return gap; // Already a CSS value
}

/** Get CSS class for column count at breakpoint */
function getColClass(breakpoint: string, cols: GridColCount): string {
  if (breakpoint === 'base') {
    return `ds-grid-cols-${cols}`;
  }
  return `ds-grid-cols-${breakpoint}-${cols}`;
}

// =============================================================================
// Component
// =============================================================================

export const Grid = forwardRef<HTMLDivElement, GridProps>(
  (
    {
      children,
      cols,
      columns,
      rows,
      gap = 'md',
      gapX,
      gapY,
      autoFit,
      autoFill,
      minColWidth = '280px',
      alignItems,
      justifyItems,
      alignContent,
      justifyContent,
      responsive: _responsive,
      className,
      style,
      ...props
    },
    ref
  ) => {
    // Build responsive column classes
    const colClasses = useMemo(() => {
      if (!cols) return [];

      // Simple number - fixed columns
      if (typeof cols === 'number') {
        return [`ds-grid-cols-${cols}`];
      }

      // Responsive object
      const classes: string[] = [];
      const { base, sm, md, lg, xl } = cols;

      if (base) classes.push(getColClass('base', base));
      if (sm) classes.push(getColClass('sm', sm));
      if (md) classes.push(getColClass('md', md));
      if (lg) classes.push(getColClass('lg', lg));
      if (xl) classes.push(getColClass('xl', xl));

      return classes;
    }, [cols]);

    // Build style object
    const gridStyle = useMemo<React.CSSProperties>(() => {
      const baseStyle: React.CSSProperties = {
        display: 'grid',
        gap: resolveGap(gap),
        columnGap: resolveGap(gapX),
        rowGap: resolveGap(gapY),
        alignItems,
        justifyItems,
        alignContent,
        justifyContent,
      };

      // Legacy columns prop (direct CSS value)
      if (columns && !cols && !autoFit && !autoFill) {
        baseStyle.gridTemplateColumns = columns;
      }

      // Rows
      if (rows) {
        baseStyle.gridTemplateRows = rows;
      }

      // Auto-fit/fill grids
      if (autoFit) {
        baseStyle.gridTemplateColumns = `repeat(auto-fit, minmax(${minColWidth}, 1fr))`;
      } else if (autoFill) {
        baseStyle.gridTemplateColumns = `repeat(auto-fill, minmax(${minColWidth}, 1fr))`;
      }

      return { ...baseStyle, ...style };
    }, [
      gap,
      gapX,
      gapY,
      columns,
      cols,
      rows,
      autoFit,
      autoFill,
      minColWidth,
      alignItems,
      justifyItems,
      alignContent,
      justifyContent,
      style,
    ]);

    // Build class list
    const gridClassName = cn(
      'ds-grid',
      // Only add col classes if not using columns prop or auto-fit/fill
      !columns && !autoFit && !autoFill ? colClasses.join(' ') : undefined,
      className
    );

    return (
      <div ref={ref} className={gridClassName} style={gridStyle} {...props}>
        {children}
      </div>
    );
  }
);

Grid.displayName = 'Grid';

// =============================================================================
// Convenience exports
// =============================================================================

export default Grid;
