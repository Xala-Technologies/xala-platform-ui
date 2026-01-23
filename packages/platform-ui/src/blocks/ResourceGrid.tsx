/**
 * ResourceGrid
 *
 * A responsive grid component for displaying resource cards.
 * Strict responsive rules: 3 columns (large), 2 columns (tablet), 1 column (mobile)
 */
import * as React from 'react';
import { cn } from '../utils';

export interface ResourceGridProps {
  /** Gap between cards - number (px) or CSS value (default: uses size mode token) */
  gap?: number | string;
  /** Minimum card width for auto-fill grid (default: 280) */
  minCardWidth?: number;
  /** Maximum columns (default: 3) - enforces 3/2/1 responsive pattern */
  maxColumns?: 1 | 2 | 3;
  /** Grid children (ResourceCard components) */
  children: React.ReactNode;
  /** Custom class name */
  className?: string;
}

export function ResourceGrid({
  gap,
  minCardWidth = 280,
  maxColumns = 3,
  children,
  className,
}: ResourceGridProps): React.ReactElement {
  const gapValue =
    gap !== undefined ? (typeof gap === 'number' ? `${gap}px` : gap) : 'var(--ds-spacing-6, 24px)';

  // Use repeat(maxColumns, 1fr) on large screens to enforce strict column limit
  // Fall back to auto-fill for responsive behavior on smaller screens
  // The minmax ensures cards don't get too small
  const gridTemplateColumns =
    maxColumns === 3
      ? `repeat(auto-fill, minmax(min(max(${minCardWidth}px, calc((100% - ${maxColumns - 1} * ${gapValue}) / ${maxColumns})), 100%), 1fr))`
      : `repeat(${maxColumns}, 1fr)`;

  return (
    <div
      className={cn('resource-object-grid', className)}
      data-max-columns={maxColumns}
      style={
        {
          '--resource-object-grid-gap': gapValue,
          '--resource-object-grid-min-card-width': `${minCardWidth}px`,
          '--resource-object-grid-max-columns': maxColumns,
          display: 'grid',
          gap: gapValue,
          gridTemplateColumns,
          width: '100%', // Full width to align with header content
        } as React.CSSProperties
      }
    >
      {children}
    </div>
  );
}

export default ResourceGrid;
