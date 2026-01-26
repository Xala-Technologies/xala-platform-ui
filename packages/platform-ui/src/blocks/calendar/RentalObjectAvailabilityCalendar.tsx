/**
 * RentalObjectAvailabilityCalendar
 *
 * Pure presentational calendar component for displaying rental object availability.
 * Supports TIME_SLOTS (week view), ALL_DAY (month view), and MULTI_DAY (range selection) modes.
 *
 * This is a PRESENTATIONAL component - it receives all data via props and emits
 * events via callbacks. No SDK hooks, no i18n, no business logic.
 *
 * @example
 * ```tsx
 * <RentalObjectAvailabilityCalendar
 *   mode="TIME_SLOTS"
 *   cells={calendarCells}
 *   selection={selection}
 *   legend={legendItems}
 *   currentDate={new Date()}
 *   onDateChange={handleDateChange}
 *   onCellClick={handleCellClick}
 *   title="Select time"
 *   subtitle="Choose your preferred time slot"
 * />
 * ```
 */

import * as React from 'react';
import { Button, Heading, Paragraph, Spinner } from '@digdir/designsystemet-react';
import { Stack } from '../../primitives';
import type {
  CalendarMode,
  CalendarCell,
  CalendarSelection,
  CalendarLegendItem,
} from '../../types/rental-object-detail';

// =============================================================================
// Types
// =============================================================================

export interface RentalObjectAvailabilityCalendarProps {
  /**
   * Calendar display mode
   * - TIME_SLOTS: Week view with hourly time slots
   * - ALL_DAY: Month view with daily selection
   * - MULTI_DAY: Month view with date range selection
   */
  mode: CalendarMode;

  /**
   * Availability cells to display
   */
  cells: CalendarCell[];

  /**
   * Current selection state (controlled)
   */
  selection?: CalendarSelection;

  /**
   * Legend items for status indicators
   */
  legend?: CalendarLegendItem[];

  /**
   * Current date for navigation (controlled)
   */
  currentDate: Date;

  /**
   * Callback when navigation date changes
   */
  onDateChange: (date: Date) => void;

  /**
   * Callback when a cell is clicked
   */
  onCellClick?: (cell: CalendarCell) => void;

  /**
   * Callback when selection changes
   */
  onSelectionChange?: (selection: CalendarSelection | undefined) => void;

  /**
   * Start hour for TIME_SLOTS mode (default: 8)
   */
  startHour?: number;

  /**
   * End hour for TIME_SLOTS mode (default: 17)
   */
  endHour?: number;

  /**
   * Slot size in minutes (default: 60)
   */
  slotSizeMinutes?: number;

  /**
   * Whether to show tips/hints
   */
  showTips?: boolean;

  /**
   * Calendar title
   */
  title?: string;

  /**
   * Calendar subtitle
   */
  subtitle?: string;

  /**
   * Loading state
   */
  isLoading?: boolean;

  /**
   * Error message to display
   */
  errorMessage?: string;

  /**
   * Warning message to display
   */
  warningMessage?: string;

  /**
   * Whether the calendar is read-only
   */
  readOnly?: boolean;

  /**
   * Additional class name
   */
  className?: string;
}

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Get week dates starting from Monday
 */
function getWeekDates(date: Date): Date[] {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);

  const dates: Date[] = [];
  for (let i = 0; i < 7; i++) {
    const weekDate = new Date(d);
    weekDate.setDate(d.getDate() + i);
    dates.push(weekDate);
  }
  return dates;
}

/**
 * Get month dates (full calendar grid)
 */
function getMonthDates(date: Date): Date[] {
  const year = date.getFullYear();
  const month = date.getMonth();
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);

  const startDate = new Date(firstDay);
  startDate.setDate(startDate.getDate() - ((startDate.getDay() + 6) % 7));

  const endDate = new Date(lastDay);
  const daysAfter = (7 - ((endDate.getDay() + 6) % 7) - 1) % 7;
  endDate.setDate(endDate.getDate() + daysAfter);

  const dates: Date[] = [];
  const current = new Date(startDate);
  while (current <= endDate) {
    dates.push(new Date(current));
    current.setDate(current.getDate() + 1);
  }
  return dates;
}

/**
 * Format date to ISO date string (YYYY-MM-DD)
 */
function formatDateToISO(date: Date): string {
  return date.toISOString().split('T')[0]!;
}

/**
 * Check if two dates are the same day
 */
function isSameDay(a: Date, b: Date): boolean {
  return formatDateToISO(a) === formatDateToISO(b);
}

/**
 * Get cells for a specific date and hour
 */
function getCellsForSlot(cells: CalendarCell[], date: Date, hour: number): CalendarCell[] {
  const dateStr = formatDateToISO(date);
  const hourStr = hour.toString().padStart(2, '0');

  return cells.filter((cell) => {
    const cellDate = cell.start.split('T')[0];
    const cellHour = cell.start.split('T')[1]?.substring(0, 2);
    return cellDate === dateStr && cellHour === hourStr;
  });
}

/**
 * Get cells for a specific date (all day)
 */
function getCellsForDate(cells: CalendarCell[], date: Date): CalendarCell[] {
  const dateStr = formatDateToISO(date);
  return cells.filter((cell) => cell.start.startsWith(dateStr));
}

/**
 * Get status color for visual display
 */
function getStatusColor(status: string): string {
  switch (status) {
    case 'AVAILABLE':
      return 'var(--ds-color-success-surface-default)';
    case 'RESERVED':
      return 'var(--ds-color-warning-surface-default)';
    case 'BOOKED':
      return 'var(--ds-color-danger-surface-default)';
    case 'BLOCKED':
      return 'var(--ds-color-neutral-surface-hover)';
    case 'BLACKOUT':
      return 'var(--ds-color-neutral-surface-hover)';
    case 'CLOSED':
      return 'var(--ds-color-neutral-surface-hover)';
    default:
      return 'var(--ds-color-neutral-surface-hover)';
  }
}

/**
 * Check if cell is selectable
 */
function isSelectable(cell: CalendarCell): boolean {
  return cell.status === 'AVAILABLE';
}

// =============================================================================
// Component
// =============================================================================

export function RentalObjectAvailabilityCalendar({
  mode,
  cells,
  selection,
  legend = [],
  currentDate,
  onDateChange,
  onCellClick,
  onSelectionChange,
  startHour = 8,
  endHour = 17,
  slotSizeMinutes = 60,
  showTips = false,
  title,
  subtitle,
  isLoading = false,
  errorMessage,
  warningMessage,
  readOnly = false,
  className,
}: RentalObjectAvailabilityCalendarProps): React.ReactElement {
  // Navigation handlers
  const handlePrevious = React.useCallback(() => {
    const newDate = new Date(currentDate);
    if (mode === 'TIME_SLOTS') {
      newDate.setDate(newDate.getDate() - 7);
    } else {
      newDate.setMonth(newDate.getMonth() - 1);
    }
    onDateChange(newDate);
  }, [currentDate, mode, onDateChange]);

  const handleNext = React.useCallback(() => {
    const newDate = new Date(currentDate);
    if (mode === 'TIME_SLOTS') {
      newDate.setDate(newDate.getDate() + 7);
    } else {
      newDate.setMonth(newDate.getMonth() + 1);
    }
    onDateChange(newDate);
  }, [currentDate, mode, onDateChange]);

  const handleToday = React.useCallback(() => {
    onDateChange(new Date());
  }, [onDateChange]);

  // Render loading state
  if (isLoading) {
    return (
      <Stack
        className={className}
        style={{
          padding: 'var(--ds-spacing-8)',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Spinner data-size="lg" aria-hidden="true" />
      </Stack>
    );
  }

  // Render error state
  if (errorMessage) {
    return (
      <Stack className={className} style={{ padding: 'var(--ds-spacing-4)' }}>
        <Paragraph data-color="danger">{errorMessage}</Paragraph>
      </Stack>
    );
  }

  // Get dates to display based on mode
  const dates = mode === 'TIME_SLOTS' ? getWeekDates(currentDate) : getMonthDates(currentDate);

  // Generate hours for TIME_SLOTS mode
  const hours: number[] = [];
  for (let h = startHour; h <= endHour; h++) {
    hours.push(h);
  }

  return (
    <Stack className={className} style={{ gap: 'var(--ds-spacing-4)' }}>
      {/* Header */}
      {(title || subtitle) && (
        <Stack style={{ gap: 'var(--ds-spacing-2)' }}>
          {title && (
            <Heading level={3} data-size="md">
              {title}
            </Heading>
          )}
          {subtitle && (
            <Paragraph data-size="sm" data-color="subtle">
              {subtitle}
            </Paragraph>
          )}
        </Stack>
      )}

      {/* Warning message */}
      {warningMessage && (
        <div
          style={{
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-warning-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
            borderLeft: '4px solid var(--ds-color-warning-border-default)',
          }}
        >
          <Paragraph data-size="sm" data-color="warning">
            {warningMessage}
          </Paragraph>
        </div>
      )}

      {/* Navigation */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <Button
          type="button"
          variant="tertiary"
          data-size="sm"
          onClick={handlePrevious}
          aria-label="Previous"
        >
          ←
        </Button>

        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
          <Button type="button" variant="tertiary" data-size="sm" onClick={handleToday}>
            Today
          </Button>
          <Paragraph
            data-size="sm"
            style={{
              fontWeight: 'var(--ds-font-weight-medium)',
              margin: 0,
            }}
          >
            {currentDate.toLocaleDateString('default', {
              month: 'long',
              year: 'numeric',
            })}
          </Paragraph>
        </div>

        <Button
          type="button"
          variant="tertiary"
          data-size="sm"
          onClick={handleNext}
          aria-label="Next"
        >
          →
        </Button>
      </div>

      {/* Calendar Grid */}
      {mode === 'TIME_SLOTS' ? (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: `60px repeat(7, 1fr)`,
            border: '1px solid var(--ds-color-neutral-border-subtle)',
            borderRadius: 'var(--ds-border-radius-md)',
            overflow: 'hidden',
          }}
        >
          {/* Header row */}
          <div
            style={{
              padding: 'var(--ds-spacing-2)',
              backgroundColor: 'var(--ds-color-neutral-background-default)',
              borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
            }}
          />
          {dates.map((date, i) => (
            <div
              key={i}
              style={{
                padding: 'var(--ds-spacing-2)',
                backgroundColor: 'var(--ds-color-neutral-background-default)',
                borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
                textAlign: 'center',
              }}
            >
              <Paragraph data-size="xs" style={{ margin: 0 }}>
                {date.toLocaleDateString('default', { weekday: 'short' }).toUpperCase()}
              </Paragraph>
              <Paragraph
                data-size="sm"
                style={{
                  margin: 0,
                  fontWeight: 'var(--ds-font-weight-semibold)',
                  color: isSameDay(date, new Date())
                    ? 'var(--ds-color-accent-base-default)'
                    : 'var(--ds-color-neutral-text-default)',
                }}
              >
                {date.getDate()}
              </Paragraph>
            </div>
          ))}

          {/* Time rows */}
          {hours.map((hour) => (
            <React.Fragment key={hour}>
              <div
                style={{
                  padding: 'var(--ds-spacing-2)',
                  backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                  borderRight: '1px solid var(--ds-color-neutral-border-subtle)',
                  fontSize: 'var(--ds-font-size-xs)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                {hour.toString().padStart(2, '0')}:00
              </div>

              {dates.map((date, dayIndex) => {
                const dateCells = getCellsForSlot(cells, date, hour);
                const cell = dateCells[0];
                const isSelected = cell ? selection?.cells.some((c) => c.id === cell.id) : false;
                const canSelect = cell ? isSelectable(cell) && !readOnly : false;

                return (
                  <div
                    key={dayIndex}
                    style={{
                      padding: 'var(--ds-spacing-1)',
                      minHeight: '60px',
                      backgroundColor: 'var(--ds-color-neutral-background-default)',
                    }}
                  >
                    {cell ? (
                      <div
                        onClick={canSelect && onCellClick ? () => onCellClick(cell) : undefined}
                        role={canSelect ? 'button' : undefined}
                        tabIndex={canSelect ? 0 : undefined}
                        aria-pressed={isSelected}
                        style={{
                          width: '100%',
                          height: '100%',
                          padding: 'var(--ds-spacing-2)',
                          backgroundColor: isSelected
                            ? 'var(--ds-color-accent-surface-default)'
                            : getStatusColor(cell.status),
                          borderRadius: 'var(--ds-border-radius-sm)',
                          cursor: canSelect ? 'pointer' : 'default',
                          transition: 'all 0.15s ease',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      />
                    ) : (
                      <div
                        style={{
                          width: '100%',
                          height: '100%',
                          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                          borderRadius: 'var(--ds-border-radius-sm)',
                          opacity: 0.3,
                        }}
                      />
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(7, 1fr)',
            border: '1px solid var(--ds-color-neutral-border-subtle)',
            borderRadius: 'var(--ds-border-radius-md)',
            overflow: 'hidden',
          }}
        >
          {/* Day headers */}
          {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((day) => (
            <div
              key={day}
              style={{
                padding: 'var(--ds-spacing-2)',
                backgroundColor: 'var(--ds-color-neutral-background-default)',
                borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
                textAlign: 'center',
                fontSize: 'var(--ds-font-size-xs)',
                fontWeight: 'var(--ds-font-weight-medium)',
              }}
            >
              {day.toUpperCase()}
            </div>
          ))}

          {/* Date cells */}
          {dates.map((date, index) => {
            const dateCells = getCellsForDate(cells, date);
            const cell = dateCells[0];
            const isCurrentMonth = date.getMonth() === currentDate.getMonth();
            const isSelected = cell ? selection?.cells.some((c) => c.id === cell.id) : false;
            const canSelect = cell ? isSelectable(cell) && !readOnly : false;

            return (
              <div
                key={index}
                onClick={canSelect && onCellClick && cell ? () => onCellClick(cell) : undefined}
                role={canSelect ? 'button' : undefined}
                tabIndex={canSelect ? 0 : undefined}
                aria-pressed={isSelected}
                style={{
                  padding: 'var(--ds-spacing-2)',
                  minHeight: '60px',
                  backgroundColor: cell
                    ? isSelected
                      ? 'var(--ds-color-accent-surface-default)'
                      : getStatusColor(cell.status)
                    : 'var(--ds-color-neutral-background-default)',
                  borderBottom:
                    index < dates.length - 7
                      ? '1px solid var(--ds-color-neutral-border-subtle)'
                      : 'none',
                  cursor: canSelect ? 'pointer' : 'default',
                  opacity: isCurrentMonth ? 1 : 0.5,
                  transition: 'all 0.15s ease',
                }}
              >
                <Paragraph
                  data-size="sm"
                  style={{
                    margin: 0,
                    fontWeight: isSameDay(date, new Date())
                      ? 'var(--ds-font-weight-semibold)'
                      : 'normal',
                    color: isSameDay(date, new Date())
                      ? 'var(--ds-color-accent-base-default)'
                      : 'var(--ds-color-neutral-text-default)',
                  }}
                >
                  {date.getDate()}
                </Paragraph>
              </div>
            );
          })}
        </div>
      )}

      {/* Legend */}
      {legend.length > 0 && (
        <div
          style={{
            display: 'flex',
            gap: 'var(--ds-spacing-4)',
            flexWrap: 'wrap',
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-background-default)',
            borderRadius: 'var(--ds-border-radius-md)',
            border: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          {legend.map((item) => (
            <div
              key={item.status}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ds-spacing-2)',
              }}
            >
              <div
                style={{
                  width: 12,
                  height: 12,
                  borderRadius: 'var(--ds-border-radius-full)',
                  backgroundColor: getStatusColor(item.status),
                }}
              />
              <Paragraph data-size="sm" style={{ margin: 0 }}>
                {item.label}
              </Paragraph>
            </div>
          ))}
        </div>
      )}

      {/* Tips */}
      {showTips && !readOnly && (
        <Paragraph data-size="sm" data-color="subtle" style={{ fontStyle: 'italic' }}>
          Click on available slots to select them for booking.
        </Paragraph>
      )}
    </Stack>
  );
}

export default RentalObjectAvailabilityCalendar;
