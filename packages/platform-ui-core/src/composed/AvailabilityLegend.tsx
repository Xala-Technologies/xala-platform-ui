/**
 * AvailabilityLegend Component
 *
 * Displays a color/pattern legend for calendar slot statuses.
 * Used alongside SlotCalendar to explain availability indicators.
 *
 * @example
 * ```tsx
 * import { AvailabilityLegend } from '@xala-technologies/platform/ui';
 *
 * const defaultItems = [
 *   { status: 'available', label: 'Ledig', color: 'var(--ds-color-success-base-default)' },
 *   { status: 'reserved', label: 'Reservert', color: 'var(--ds-color-warning-base-default)' },
 *   { status: 'booked', label: 'Booket', color: 'var(--ds-color-danger-base-default)' },
 *   { status: 'closed', label: 'Stengt', color: 'var(--ds-color-neutral-base-default)' },
 * ];
 *
 * <AvailabilityLegend items={defaultItems} layout="horizontal" />
 * ```
 */

import * as React from 'react';
import { Paragraph, Button } from '../primitives';
import { cn } from '../utils';

// =============================================================================
// Types
// =============================================================================

export type AvailabilityStatus =
  | 'available'
  | 'reserved'
  | 'booked'
  | 'closed'
  | 'unavailable'
  | 'selected'
  | 'pending';

export interface LegendItem {
  /** Status identifier */
  status: AvailabilityStatus | string;
  /** Display label */
  label: string;
  /** Color for the status indicator */
  color: string;
  /** Optional pattern for accessibility (not color-only) */
  pattern?: 'solid' | 'striped' | 'dotted';
}

export interface AvailabilityLegendLabels {
  /** Screen reader label for the legend */
  legendLabel?: string;
}

export interface AvailabilityLegendProps {
  /** Legend items to display */
  items: LegendItem[];
  /** Layout direction */
  layout?: 'horizontal' | 'vertical';
  /** Size variant */
  size?: 'sm' | 'md';
  /** Additional className */
  className?: string;
  /** Localization labels */
  labels?: AvailabilityLegendLabels;
  /** Optional click handler for interactive legends */
  onItemClick?: (status: string) => void;
}

// =============================================================================
// Default labels
// =============================================================================

const defaultLabels: Required<AvailabilityLegendLabels> = {
  legendLabel: 'Forklaring',
};

// =============================================================================
// Size configurations
// =============================================================================

const sizeConfig = {
  sm: {
    indicator: { width: 12, height: 12 },
    gap: 'var(--ds-spacing-2)',
    fontSize: 'var(--ds-font-size-xs)',
  },
  md: {
    indicator: { width: 16, height: 16 },
    gap: 'var(--ds-spacing-3)',
    fontSize: 'var(--ds-font-size-sm)',
  },
};

// =============================================================================
// Pattern styles
// =============================================================================

const getPatternStyle = (pattern?: 'solid' | 'striped' | 'dotted'): React.CSSProperties => {
  switch (pattern) {
    case 'striped':
      return {
        backgroundImage:
          'repeating-linear-gradient(45deg, transparent, transparent 2px, rgba(255,255,255,0.4) 2px, rgba(255,255,255,0.4) 4px)',
      };
    case 'dotted':
      return {
        backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.5) 1px, transparent 1px)',
        backgroundSize: '4px 4px',
      };
    default:
      return {};
  }
};

// =============================================================================
// Component
// =============================================================================

/**
 * AvailabilityLegend displays a legend for calendar availability statuses.
 *
 * Accessibility:
 * - Uses semantic list structure
 * - Color + pattern indicators (not color-only)
 * - Keyboard accessible when interactive
 * - Screen reader friendly labels
 */
export function AvailabilityLegend({
  items,
  layout = 'horizontal',
  size = 'md',
  className,
  labels: customLabels,
  onItemClick,
}: AvailabilityLegendProps): React.ReactElement {
  const labels = { ...defaultLabels, ...customLabels };
  const config = sizeConfig[size];
  const isInteractive = Boolean(onItemClick);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: layout === 'horizontal' ? 'row' : 'column',
    flexWrap: 'wrap',
    gap: config.gap,
    padding: 0,
    margin: 0,
    listStyle: 'none',
  };

  const itemStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--ds-spacing-2)',
    padding: 0,
    margin: 0,
    border: 'none',
    background: 'transparent',
    cursor: isInteractive ? 'pointer' : 'default',
  };

  const indicatorBaseStyle: React.CSSProperties = {
    width: config.indicator.width,
    height: config.indicator.height,
    borderRadius: 'var(--ds-border-radius-sm)',
    flexShrink: 0,
  };

  return (
    <ul
      className={cn('availability-legend', className)}
      style={containerStyle}
      aria-label={labels.legendLabel}
      role="list"
    >
      {items.map((item) => {
        const indicatorStyle: React.CSSProperties = {
          ...indicatorBaseStyle,
          backgroundColor: item.color,
          ...getPatternStyle(item.pattern),
        };

        const content = (
          <>
            <span style={indicatorStyle} aria-hidden="true" />
            <Paragraph data-size={size === 'sm' ? 'xs' : 'sm'} style={{ margin: 0 }}>
              {item.label}
            </Paragraph>
          </>
        );

        if (isInteractive) {
          return (
            <li key={item.status} style={{ listStyle: 'none' }}>
              <Button
                variant="tertiary"
                data-size="sm"
                onClick={() => onItemClick?.(item.status)}
                style={{
                  ...itemStyle,
                  borderRadius: 'var(--ds-border-radius-sm)',
                  padding: 'var(--ds-spacing-1)',
                  minHeight: 'auto',
                }}
              >
                {content}
              </Button>
            </li>
          );
        }

        return (
          <li key={item.status} style={{ ...itemStyle, listStyle: 'none' }}>
            {content}
          </li>
        );
      })}
    </ul>
  );
}

AvailabilityLegend.displayName = 'AvailabilityLegend';

// =============================================================================
// Preset configurations
// =============================================================================

/**
 * Default Norwegian booking legend items
 */
export const defaultBookingLegendItems: LegendItem[] = [
  {
    status: 'available',
    label: 'Ledig',
    color: 'var(--ds-color-success-base-default)',
    pattern: 'solid',
  },
  {
    status: 'reserved',
    label: 'Reservert',
    color: 'var(--ds-color-warning-base-default)',
    pattern: 'striped',
  },
  {
    status: 'booked',
    label: 'Booket',
    color: 'var(--ds-color-danger-base-default)',
    pattern: 'solid',
  },
  {
    status: 'closed',
    label: 'Stengt',
    color: 'var(--ds-color-neutral-base-default)',
    pattern: 'dotted',
  },
  {
    status: 'unavailable',
    label: 'Utilgjengelig',
    color: 'var(--ds-color-neutral-surface-hover)',
    pattern: 'striped',
  },
];

/**
 * English booking legend items
 */
export const defaultBookingLegendItemsEn: LegendItem[] = [
  {
    status: 'available',
    label: 'Available',
    color: 'var(--ds-color-success-base-default)',
    pattern: 'solid',
  },
  {
    status: 'reserved',
    label: 'Reserved',
    color: 'var(--ds-color-warning-base-default)',
    pattern: 'striped',
  },
  {
    status: 'booked',
    label: 'Booked',
    color: 'var(--ds-color-danger-base-default)',
    pattern: 'solid',
  },
  {
    status: 'closed',
    label: 'Closed',
    color: 'var(--ds-color-neutral-base-default)',
    pattern: 'dotted',
  },
  {
    status: 'unavailable',
    label: 'Unavailable',
    color: 'var(--ds-color-neutral-surface-hover)',
    pattern: 'striped',
  },
];
