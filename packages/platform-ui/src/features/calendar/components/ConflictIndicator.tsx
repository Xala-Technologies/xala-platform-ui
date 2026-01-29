/**
 * Conflict Indicator Component
 *
 * Visual indicator for booking conflicts with tooltip showing details.
 * Supports buffer time visualization to show time zones that should remain clear.
 *
 * @module @xala-technologies/platform-ui/features/backoffice-calendar/components
 */
/* eslint-disable no-restricted-syntax */
import * as React from 'react';
import { Tooltip, XCircleIcon, Stack } from '@xala-technologies/platform-ui';

// =============================================================================
// Types
// =============================================================================

export interface ConflictIndicatorLabels {
  /** Label for "Booking" fallback */
  booking?: string;
  /** Label for "more" count */
  more?: string;
  /** Label for "Buffer conflict:" prefix */
  bufferConflict?: string;
  /** Label for "Requires X min buffer" message */
  requiresBuffer?: string;
  /** Label for "Overlaps with:" prefix */
  overlapsWith?: string;
  /** Label for "Conflict:" prefix */
  conflict?: string;
  /** Aria label for buffer conflict */
  bufferConflictLabel?: string;
  /** Aria label for conflict */
  conflictLabel?: string;
}

export interface ConflictIndicatorProps {
  /** Conflicting events information */
  conflicts: Array<{
    id: string;
    title?: string;
    listingName?: string;
  }>;
  /** Display variant */
  variant?: 'icon' | 'border' | 'both';
  /** Position of the indicator */
  position?: 'top-right' | 'top-left' | 'inline';
  /** Buffer time in minutes (for displaying buffer zone info) */
  bufferTimeMinutes?: number;
  /** Whether this is a buffer time conflict (vs hard overlap) */
  isBufferConflict?: boolean;
  /** UI labels for translations */
  labels?: ConflictIndicatorLabels;
}

export interface BufferZoneProps {
  /** Start time of the event */
  eventStart: Date;
  /** End time of the event */
  eventEnd: Date;
  /** Buffer time in minutes */
  bufferMinutes: number;
  /** Hour height in pixels for timeline calculations */
  hourHeight?: number;
  /** Start hour for timeline (default 7) */
  startHour?: number;
}

// =============================================================================
// Component
// =============================================================================

const DEFAULT_LABELS: ConflictIndicatorLabels = {
  booking: 'Booking',
  more: 'flere',
  bufferConflict: 'Buffertidskonflikt',
  requiresBuffer: 'Krever {minutes} min buffertid',
  overlapsWith: 'Overlapper med',
  conflict: 'Konflikt',
  bufferConflictLabel: 'Buffertidskonflikt',
  conflictLabel: 'Konflikt',
};

/**
 * ConflictIndicator displays a visual warning for overlapping bookings.
 * Shows a red warning icon with tooltip containing conflict details.
 * Supports buffer time conflicts with distinct styling.
 */
export function ConflictIndicator({
  conflicts,
  variant = 'both',
  position = 'top-right',
  bufferTimeMinutes,
  isBufferConflict = false,
  labels = DEFAULT_LABELS,
}: ConflictIndicatorProps): React.ReactElement | null {
  const effectiveLabels = { ...DEFAULT_LABELS, ...labels };

  if (!conflicts || conflicts.length === 0) {
    return null;
  }

  // Generate tooltip text
  const conflictNames = conflicts
    .slice(0, 3)
    .map((c) => {
      const name = c.title || effectiveLabels.booking;
      const location = c.listingName ? ` (${c.listingName})` : '';
      return `${name}${location}`;
    })
    .join(', ');

  const extraCount =
    conflicts.length > 3 ? ` +${conflicts.length - 3} ${effectiveLabels.more}` : '';

  // Different tooltip based on conflict type
  let tooltipContent: string;
  if (isBufferConflict && bufferTimeMinutes) {
    const bufferMessage = (
      effectiveLabels.requiresBuffer ?? 'Krever {minutes} min buffertid'
    ).replace('{minutes}', bufferTimeMinutes.toString());
    tooltipContent = `${effectiveLabels.bufferConflict}: ${bufferMessage}. ${effectiveLabels.overlapsWith} ${conflictNames}${extraCount}`;
  } else {
    tooltipContent = `${effectiveLabels.conflict}: ${effectiveLabels.overlapsWith} ${conflictNames}${extraCount}`;
  }

  // Position styles
  const positionStyles: Record<string, React.CSSProperties> = {
    'top-right': {
      position: 'absolute',
      top: 'var(--ds-spacing-1)',
      right: 'var(--ds-spacing-1)',
      zIndex: 2,
    },
    'top-left': {
      position: 'absolute',
      top: 'var(--ds-spacing-1)',
      left: 'var(--ds-spacing-1)',
      zIndex: 2,
    },
    inline: {
      display: 'inline-flex',
      verticalAlign: 'middle',
    },
  };

  if (variant === 'border') {
    // Border variant doesn't show icon, only used for styling parent element
    return null;
  }

  // Different colors for buffer conflicts vs hard conflicts
  const bgColor = isBufferConflict
    ? 'var(--ds-color-warning-base-default)'
    : 'var(--ds-color-danger-base-default)';

  return (
    <Tooltip content={tooltipContent}>
      <span style={positionStyles[position]}>
        <Stack
          style={{
            alignItems: 'center',
            justifyContent: 'center',
            width: '20px',
            height: '20px',
            borderRadius: 'var(--ds-border-radius-full)',
            backgroundColor: bgColor,
            color: 'var(--ds-color-neutral-contrast-default)',
            cursor: 'help',
          }}
          aria-label={
            isBufferConflict ? effectiveLabels.bufferConflictLabel : effectiveLabels.conflictLabel
          }
        >
          <XCircleIcon
            style={{
              width: '14px',
              height: '14px',
            }}
            aria-hidden="true"
          />
        </Stack>
      </span>
    </Tooltip>
  );
}

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Get conflict styles for event cards.
 * Returns CSS properties to apply red border and background.
 * Supports buffer time conflicts with distinct styling.
 */
export function getConflictStyles(
  hasConflict: boolean,
  isBufferConflict = false
): React.CSSProperties {
  if (!hasConflict) {
    return {};
  }

  if (isBufferConflict) {
    return {
      border: '2px solid var(--ds-color-warning-border-default)',
      backgroundColor: 'var(--ds-color-warning-surface-default)',
      boxShadow: '0 0 0 1px var(--ds-color-warning-border-default)',
    };
  }

  return {
    border: '2px solid var(--ds-color-danger-border-default)',
    backgroundColor: 'var(--ds-color-danger-surface-default)',
    boxShadow: '0 0 0 1px var(--ds-color-danger-border-default)',
  };
}

/**
 * Get conflict color overrides for event cards.
 * Returns color scheme for conflicted events.
 * Supports buffer time conflicts with distinct styling.
 */
export function getConflictColors(hasConflict: boolean, isBufferConflict = false) {
  if (!hasConflict) {
    return null;
  }

  if (isBufferConflict) {
    return {
      bg: 'var(--ds-color-warning-surface-default)',
      border: 'var(--ds-color-warning-border-default)',
      text: 'var(--ds-color-warning-text-default)',
    };
  }

  return {
    bg: 'var(--ds-color-danger-surface-default)',
    border: 'var(--ds-color-danger-border-default)',
    text: 'var(--ds-color-danger-text-default)',
  };
}

/**
 * Calculate buffer zone positions for timeline view.
 * Returns style properties for before and after buffer zones.
 */
export function getBufferZoneStyles({
  eventStart,
  eventEnd,
  bufferMinutes,
  hourHeight = 80,
  startHour = 7,
}: BufferZoneProps) {
  const bufferHours = bufferMinutes / 60;

  // Calculate positions
  const eventStartHour = eventStart.getHours() + eventStart.getMinutes() / 60;
  const eventEndHour = eventEnd.getHours() + eventEnd.getMinutes() / 60;

  const bufferBeforeStart = eventStartHour - bufferHours;
  const bufferAfterEnd = eventEndHour;

  // Base offset for timeline
  const baseOffset = 120;

  // Calculate widths and positions
  const bufferWidth = bufferHours * hourHeight;

  const beforeBuffer = {
    left: `${baseOffset + (bufferBeforeStart - startHour) * hourHeight}px`,
    width: `${bufferWidth}px`,
    top: 'var(--ds-spacing-1)',
    bottom: 'var(--ds-spacing-1)',
  };

  const afterBuffer = {
    left: `${baseOffset + (bufferAfterEnd - startHour) * hourHeight}px`,
    width: `${bufferWidth}px`,
    top: 'var(--ds-spacing-1)',
    bottom: 'var(--ds-spacing-1)',
  };

  return {
    before: beforeBuffer,
    after: afterBuffer,
  };
}

/**
 * Get buffer zone styling for visual display.
 * Returns CSS properties for buffer zone elements.
 */
export function getBufferZoneStyle(): React.CSSProperties {
  return {
    position: 'absolute',
    backgroundColor: 'var(--ds-color-warning-surface-default)',
    border: '1px dashed var(--ds-color-warning-border-default)',
    borderRadius: 'var(--ds-border-radius-sm)',
    opacity: 0.6,
    pointerEvents: 'none',
    zIndex: 1,
  };
}
