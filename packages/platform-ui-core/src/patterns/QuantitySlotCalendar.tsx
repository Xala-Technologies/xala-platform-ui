/* eslint-disable no-restricted-syntax */
/**
 * QuantitySlotCalendar Component
 *
 * Calendar with quantity-based availability per slot.
 * Shows how many items are available in each time slot.
 *
 * NOTE: Uses raw <button> elements for slot cells with custom styling.
 *
 * @example
 * ```tsx
 * import { QuantitySlotCalendar } from '@xala-technologies/platform/ui';
 *
 * <QuantitySlotCalendar
 *   slots={[
 *     { id: '1', date: '2024-09-01', time: '10:00', totalQuantity: 5, availableQuantity: 3 },
 *     { id: '2', date: '2024-09-01', time: '11:00', totalQuantity: 5, availableQuantity: 0 },
 *   ]}
 *   onSlotSelect={(slot) => console.log(slot)}
 * />
 * ```
 */

import * as React from 'react';
import { Button, Heading, Paragraph } from '../primitives';
import { cn } from '../utils';

// =============================================================================
// Types
// =============================================================================

export interface QuantitySlot {
  /** Unique slot identifier */
  id: string;
  /** Date (ISO format) */
  date: string;
  /** Time (HH:mm) */
  time: string;
  /** Total quantity available */
  totalQuantity: number;
  /** Currently available quantity */
  availableQuantity: number;
  /** Price per unit (optional) */
  price?: number;
  /** Disabled flag */
  disabled?: boolean;
}

export interface QuantitySlotCalendarLabels {
  /** Title */
  title?: string;
  /** Navigation */
  prev?: string;
  next?: string;
  today?: string;
  /** Availability */
  available?: string;
  soldOut?: string;
  limited?: string;
  /** Units */
  of?: string;
  currency?: string;
}

export interface QuantitySlotCalendarProps {
  /** Slots to display */
  slots: QuantitySlot[];
  /** Selected slot ID */
  selectedSlotId?: string | null;
  /** Visible start date */
  visibleDate?: Date;
  /** Selection handler */
  onSlotSelect?: (slot: QuantitySlot) => void;
  /** Navigation handler */
  onNavigate?: (direction: 'prev' | 'next' | 'today') => void;
  /** Days to show */
  daysToShow?: number;
  /** Localization labels */
  labels?: QuantitySlotCalendarLabels;
  /** Additional className */
  className?: string;
}

// =============================================================================
// Default labels (Norwegian)
// =============================================================================

const defaultLabels: Required<QuantitySlotCalendarLabels> = {
  title: 'Velg tidspunkt',
  prev: '←',
  next: '→',
  today: 'I dag',
  available: 'ledig',
  soldOut: 'Utsolgt',
  limited: 'Få igjen',
  of: 'av',
  currency: 'kr',
};

// =============================================================================
// Utility
// =============================================================================

const getDayName = (date: Date, locale = 'nb-NO'): string => {
  return date.toLocaleDateString(locale, { weekday: 'short' });
};

const getDateNum = (date: Date): string => {
  return date.getDate().toString();
};

const getMonthName = (date: Date, locale = 'nb-NO'): string => {
  return date.toLocaleDateString(locale, { month: 'long' });
};

const isSameDay = (d1: Date, d2: Date): boolean => {
  return (
    d1.getFullYear() === d2.getFullYear() &&
    d1.getMonth() === d2.getMonth() &&
    d1.getDate() === d2.getDate()
  );
};

const getDates = (startDate: Date, count: number): Date[] => {
  const dates: Date[] = [];
  for (let i = 0; i < count; i++) {
    const date = new Date(startDate);
    date.setDate(startDate.getDate() + i);
    dates.push(date);
  }
  return dates;
};

const formatDateKey = (date: Date): string => {
  return date.toISOString().split('T')[0];
};

// =============================================================================
// Component
// =============================================================================

/**
 * QuantitySlotCalendar displays time slots with quantity availability.
 *
 * Accessibility:
 * - Semantic heading structure
 * - Button role for selectable slots
 * - aria-pressed for selected state
 * - Keyboard navigation
 */
export function QuantitySlotCalendar({
  slots,
  selectedSlotId,
  visibleDate = new Date(),
  onSlotSelect,
  onNavigate,
  daysToShow = 7,
  labels: customLabels,
  className,
}: QuantitySlotCalendarProps): React.ReactElement {
  const labels = { ...defaultLabels, ...customLabels };

  const dates = getDates(visibleDate, daysToShow);
  const today = new Date();

  // Group slots by date
  const slotsByDate = React.useMemo(() => {
    const map = new Map<string, QuantitySlot[]>();
    slots.forEach((slot) => {
      const existing = map.get(slot.date) || [];
      existing.push(slot);
      map.set(slot.date, existing);
    });
    // Sort by time
    map.forEach((daySlots) => {
      daySlots.sort((a, b) => a.time.localeCompare(b.time));
    });
    return map;
  }, [slots]);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-3)',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'var(--ds-spacing-2)',
  };

  const navButtonStyle: React.CSSProperties = {
    minWidth: 32,
  };

  const daysGridStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: `repeat(${daysToShow}, 1fr)`,
    gap: 'var(--ds-spacing-2)',
  };

  const dayColumnStyle = (isToday: boolean): React.CSSProperties => ({
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-2)',
    padding: 'var(--ds-spacing-2)',
    backgroundColor: isToday
      ? 'var(--ds-color-accent-surface-default)'
      : 'var(--ds-color-neutral-surface-subtle)',
    borderRadius: 'var(--ds-border-radius-md)',
    minWidth: 80,
  });

  const dayHeaderStyle: React.CSSProperties = {
    textAlign: 'center',
    paddingBottom: 'var(--ds-spacing-2)',
    borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
  };

  const slotButtonStyle = (
    available: number,
    total: number,
    isSelected: boolean
  ): React.CSSProperties => {
    const isSoldOut = available === 0;

    return {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: 'var(--ds-spacing-1)',
      padding: 'var(--ds-spacing-2)',
      border: isSelected
        ? '2px solid var(--ds-color-accent-border-default)'
        : '1px solid var(--ds-color-neutral-border-subtle)',
      borderRadius: 'var(--ds-border-radius-sm)',
      backgroundColor: isSoldOut
        ? 'var(--ds-color-neutral-surface-default)'
        : isSelected
          ? 'var(--ds-color-accent-surface-default)'
          : 'var(--ds-color-neutral-background-default)',
      cursor: isSoldOut ? 'not-allowed' : 'pointer',
      opacity: isSoldOut ? 0.5 : 1,
      width: '100%',
    };
  };

  const quantityBadgeStyle = (available: number, total: number): React.CSSProperties => {
    const percent = total > 0 ? available / total : 0;
    const isSoldOut = available === 0;
    const isLimited = percent <= 0.2 && !isSoldOut;

    return {
      display: 'inline-block',
      padding: '2px 6px',
      borderRadius: 'var(--ds-border-radius-full)',
      fontSize: 'var(--ds-font-size-xs)',
      fontWeight: 'var(--ds-font-weight-medium)',
      backgroundColor: isSoldOut
        ? 'var(--ds-color-danger-surface-default)'
        : isLimited
          ? 'var(--ds-color-warning-surface-default)'
          : 'var(--ds-color-success-surface-default)',
      color: isSoldOut
        ? 'var(--ds-color-danger-text-default)'
        : isLimited
          ? 'var(--ds-color-warning-text-default)'
          : 'var(--ds-color-success-text-default)',
    };
  };

  return (
    <div className={cn('quantity-slot-calendar', className)} style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <Heading level={3} data-size="xs" style={{ margin: 0 }}>
          {labels.title}
        </Heading>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-1)' }}>
          <Button
            variant="tertiary"
            data-size="sm"
            onClick={() => onNavigate?.('prev')}
            aria-label={labels.prev}
            style={navButtonStyle}
          >
            {labels.prev}
          </Button>
          <Button variant="tertiary" data-size="sm" onClick={() => onNavigate?.('today')}>
            {labels.today}
          </Button>
          <Button
            variant="tertiary"
            data-size="sm"
            onClick={() => onNavigate?.('next')}
            aria-label={labels.next}
            style={navButtonStyle}
          >
            {labels.next}
          </Button>
        </div>
      </div>

      {/* Month */}
      <Paragraph
        data-size="sm"
        style={{
          margin: 0,
          fontWeight: 'var(--ds-font-weight-medium)',
          textTransform: 'capitalize',
        }}
      >
        {getMonthName(visibleDate)}
      </Paragraph>

      {/* Days grid */}
      <div style={daysGridStyle}>
        {dates.map((date) => {
          const dateKey = formatDateKey(date);
          const daySlots = slotsByDate.get(dateKey) || [];
          const isToday = isSameDay(date, today);

          return (
            <div key={dateKey} style={dayColumnStyle(isToday)}>
              <div style={dayHeaderStyle}>
                <Paragraph
                  data-size="xs"
                  style={{
                    margin: 0,
                    textTransform: 'uppercase',
                    color: 'var(--ds-color-neutral-text-subtle)',
                  }}
                >
                  {getDayName(date)}
                </Paragraph>
                <Paragraph
                  data-size="md"
                  style={{
                    margin: 0,
                    fontWeight: 'var(--ds-font-weight-bold)',
                  }}
                >
                  {getDateNum(date)}
                </Paragraph>
              </div>

              {/* Time slots */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-1)' }}>
                {daySlots.length === 0 ? (
                  <Paragraph
                    data-size="xs"
                    style={{
                      margin: 0,
                      textAlign: 'center',
                      color: 'var(--ds-color-neutral-text-subtle)',
                      padding: 'var(--ds-spacing-2)',
                    }}
                  >
                    —
                  </Paragraph>
                ) : (
                  daySlots.map((slot) => {
                    const isSelected = selectedSlotId === slot.id;
                    const isSoldOut = slot.availableQuantity === 0;

                    return (
                      <button
                        key={slot.id}
                        type="button"
                        onClick={() => !isSoldOut && !slot.disabled && onSlotSelect?.(slot)}
                        disabled={isSoldOut || slot.disabled}
                        aria-pressed={isSelected}
                        style={slotButtonStyle(
                          slot.availableQuantity,
                          slot.totalQuantity,
                          isSelected
                        )}
                      >
                        <span
                          style={{
                            fontSize: 'var(--ds-font-size-sm)',
                            fontWeight: 'var(--ds-font-weight-medium)',
                          }}
                        >
                          {slot.time}
                        </span>
                        <span
                          style={quantityBadgeStyle(slot.availableQuantity, slot.totalQuantity)}
                        >
                          {isSoldOut
                            ? labels.soldOut
                            : `${slot.availableQuantity}/${slot.totalQuantity}`}
                        </span>
                        {slot.price !== undefined && !isSoldOut && (
                          <span
                            style={{
                              fontSize: 'var(--ds-font-size-xs)',
                              color: 'var(--ds-color-neutral-text-subtle)',
                            }}
                          >
                            {slot.price} {labels.currency}
                          </span>
                        )}
                      </button>
                    );
                  })
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

QuantitySlotCalendar.displayName = 'QuantitySlotCalendar';
