/**
 * EventScheduleCard Component
 *
 * Display event schedule with recurring patterns and exceptions.
 * Shows dates, times, and recurrence information.
 *
 * @example
 * ```tsx
 * import { EventScheduleCard } from '@xala-technologies/platform/ui';
 *
 * <EventScheduleCard
 *   schedule={{
 *     type: 'recurring',
 *     startDate: '2024-09-01',
 *     endDate: '2024-12-15',
 *     recurrence: { pattern: 'weekly', days: ['monday', 'wednesday'] },
 *     timeSlots: [{ start: '18:00', end: '20:00' }],
 *   }}
 * />
 * ```
 */

import * as React from 'react';
import { Card, Heading, Paragraph } from '@digdir/designsystemet-react';
import { cn } from '../utils';
import { CalendarIcon, ClockIcon } from '../primitives/icons';

// =============================================================================
// Types
// =============================================================================

export type RecurrencePattern = 'daily' | 'weekly' | 'biweekly' | 'monthly';
export type Weekday =
  | 'monday'
  | 'tuesday'
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday';

export interface TimeSlot {
  /** Start time (HH:mm) */
  start: string;
  /** End time (HH:mm) */
  end: string;
  /** Optional label for this slot */
  label?: string;
}

export interface Recurrence {
  /** Recurrence pattern */
  pattern: RecurrencePattern;
  /** Days of week (for weekly) */
  days?: Weekday[];
  /** Day of month (for monthly) */
  dayOfMonth?: number;
  /** Interval (every N pattern) */
  interval?: number;
}

export interface EventSchedule {
  /** Schedule type */
  type: 'single' | 'recurring' | 'series';
  /** Start date (ISO format) */
  startDate: string;
  /** End date (ISO format) */
  endDate?: string;
  /** Time slots for each occurrence */
  timeSlots: TimeSlot[];
  /** Recurrence rule */
  recurrence?: Recurrence;
  /** Exception dates (cancelled) */
  exceptions?: string[];
  /** Total occurrence count */
  occurrenceCount?: number;
}

export interface EventScheduleCardLabels {
  /** Card title */
  title?: string;
  /** Schedule type labels */
  single?: string;
  recurring?: string;
  series?: string;
  /** Field labels */
  date?: string;
  time?: string;
  period?: string;
  every?: string;
  on?: string;
  /** Recurrence pattern labels */
  daily?: string;
  weekly?: string;
  biweekly?: string;
  monthly?: string;
  /** Day labels */
  dayLabels?: Record<Weekday, string>;
  /** Occurrence count */
  occurrences?: string;
  /** Exception label */
  exceptionsLabel?: string;
}

export interface EventScheduleCardProps {
  /** Schedule details */
  schedule: EventSchedule;
  /** Localization labels */
  labels?: EventScheduleCardLabels;
  /** Compact layout */
  compact?: boolean;
  /** Additional className */
  className?: string;
}

// =============================================================================
// Default labels (Norwegian)
// =============================================================================

const defaultDayLabels: Record<Weekday, string> = {
  monday: 'Mandag',
  tuesday: 'Tirsdag',
  wednesday: 'Onsdag',
  thursday: 'Torsdag',
  friday: 'Fredag',
  saturday: 'Lørdag',
  sunday: 'Søndag',
};

const defaultLabels: Required<EventScheduleCardLabels> = {
  title: 'Tidspunkt',
  single: 'Enkelt arrangement',
  recurring: 'Gjentagende',
  series: 'Serie',
  date: 'Dato',
  time: 'Klokkeslett',
  period: 'Periode',
  every: 'Hver',
  on: 'på',
  daily: 'dag',
  weekly: 'uke',
  biweekly: 'andre uke',
  monthly: 'måned',
  dayLabels: defaultDayLabels,
  occurrences: 'ganger',
  exceptionsLabel: 'Unntak',
};

// =============================================================================
// Utility
// =============================================================================

const formatDate = (dateStr: string, locale = 'nb-NO'): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, { day: 'numeric', month: 'long', year: 'numeric' });
};

const formatShortDate = (dateStr: string, locale = 'nb-NO'): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, { day: 'numeric', month: 'short' });
};

// =============================================================================
// Component
// =============================================================================

/**
 * EventScheduleCard displays event schedule information.
 *
 * Accessibility:
 * - Semantic heading structure
 * - Time information via icons + text
 * - Descriptive content
 */
export function EventScheduleCard({
  schedule,
  labels: customLabels,
  compact = false,
  className,
}: EventScheduleCardProps): React.ReactElement {
  const labels = { ...defaultLabels, ...customLabels };
  const dayLabels = labels.dayLabels || defaultDayLabels;

  const getScheduleTypeLabel = (): string => {
    switch (schedule.type) {
      case 'single':
        return labels.single;
      case 'recurring':
        return labels.recurring;
      case 'series':
        return labels.series;
    }
  };

  const getRecurrenceDescription = (): string | null => {
    if (!schedule.recurrence) return null;

    const { pattern, days, interval = 1 } = schedule.recurrence;
    const patternLabel = labels[pattern];

    if (pattern === 'weekly' && days && days.length > 0) {
      const dayNames = days.map((d) => dayLabels[d]).join(', ');
      return `${labels.every} ${patternLabel} ${labels.on} ${dayNames}`;
    }

    if (interval > 1) {
      return `${labels.every} ${interval}. ${patternLabel}`;
    }

    return `${labels.every} ${patternLabel}`;
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: compact ? 'var(--ds-spacing-2)' : 'var(--ds-spacing-3)',
  };

  const rowStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--ds-spacing-2)',
  };

  const iconStyle: React.CSSProperties = {
    marginTop: 2,
    color: 'var(--ds-color-neutral-text-subtle)',
    flexShrink: 0,
  };

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
    backgroundColor: 'var(--ds-color-accent-surface-default)',
    color: 'var(--ds-color-accent-text-default)',
    borderRadius: 'var(--ds-border-radius-full)',
    fontSize: 'var(--ds-font-size-xs)',
    fontWeight: 'var(--ds-font-weight-medium)',
  };

  const timeSlotsStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-1)',
  };

  return (
    <Card
      className={cn('event-schedule-card', className)}
      style={{ padding: compact ? 'var(--ds-spacing-3)' : 'var(--ds-spacing-4)' }}
    >
      <div style={containerStyle}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--ds-spacing-2)',
          }}
        >
          <Heading level={3} data-size="xs" style={{ margin: 0 }}>
            {labels.title}
          </Heading>
          {schedule.type !== 'single' && <span style={badgeStyle}>{getScheduleTypeLabel()}</span>}
        </div>

        {/* Date / Period */}
        <div style={rowStyle}>
          <span style={iconStyle}>
            <CalendarIcon size={16} />
          </span>
          <div>
            {schedule.type === 'single' ? (
              <Paragraph data-size="sm" style={{ margin: 0 }}>
                {formatDate(schedule.startDate)}
              </Paragraph>
            ) : (
              <Paragraph data-size="sm" style={{ margin: 0 }}>
                {formatShortDate(schedule.startDate)} –{' '}
                {schedule.endDate ? formatShortDate(schedule.endDate) : '...'}
              </Paragraph>
            )}
          </div>
        </div>

        {/* Recurrence */}
        {schedule.recurrence && (
          <div style={rowStyle}>
            <Paragraph
              data-size="sm"
              style={{
                margin: 0,
                marginLeft: 'calc(16px + var(--ds-spacing-2))',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {getRecurrenceDescription()}
            </Paragraph>
          </div>
        )}

        {/* Time slots */}
        <div style={rowStyle}>
          <span style={iconStyle}>
            <ClockIcon size={16} />
          </span>
          <div style={timeSlotsStyle}>
            {schedule.timeSlots.map((slot, index) => (
              <div
                key={index}
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}
              >
                <Paragraph
                  data-size="sm"
                  style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}
                >
                  {slot.start} – {slot.end}
                </Paragraph>
                {slot.label && (
                  <Paragraph
                    data-size="xs"
                    style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
                  >
                    ({slot.label})
                  </Paragraph>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Occurrence count */}
        {schedule.occurrenceCount !== undefined && schedule.occurrenceCount > 0 && (
          <Paragraph
            data-size="sm"
            style={{
              margin: 0,
              marginLeft: 'calc(16px + var(--ds-spacing-2))',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {schedule.occurrenceCount} {labels.occurrences}
          </Paragraph>
        )}

        {/* Exceptions */}
        {schedule.exceptions && schedule.exceptions.length > 0 && (
          <div
            style={{
              marginLeft: 'calc(16px + var(--ds-spacing-2))',
              padding: 'var(--ds-spacing-2)',
              backgroundColor: 'var(--ds-color-warning-surface-default)',
              borderRadius: 'var(--ds-border-radius-sm)',
            }}
          >
            <Paragraph
              data-size="xs"
              style={{
                margin: 0,
                fontWeight: 'var(--ds-font-weight-medium)',
                color: 'var(--ds-color-warning-text-default)',
              }}
            >
              {labels.exceptionsLabel}: {schedule.exceptions.length}
            </Paragraph>
          </div>
        )}
      </div>
    </Card>
  );
}

EventScheduleCard.displayName = 'EventScheduleCard';
