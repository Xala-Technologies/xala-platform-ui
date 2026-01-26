/**
 * RecurringBuilder Component
 *
 * Pattern builder for recurring bookings.
 * Allows users to configure:
 * - Frequency (WEEKLY, MONTHLY)
 * - Selected weekdays (for weekly)
 * - End condition (after N occurrences or until date)
 *
 * Respects RecurringConstraintsDTO from the rental object configuration.
 *
 * @module @xala-technologies/platform-ui/features/booking/components/sidebar
 */

import * as React from 'react';
import { Heading, Paragraph, Button } from '@digdir/designsystemet-react';

// =============================================================================
// Types
// =============================================================================

export type RecurringFrequency = 'WEEKLY' | 'MONTHLY';

export interface RecurringEndCondition {
  type: 'AFTER_OCCURRENCES' | 'UNTIL_DATE';
  occurrences?: number;
  untilDate?: string;
}

export interface RecurringPattern {
  /** Recurrence frequency */
  frequency: RecurringFrequency;
  /** Interval between occurrences (e.g., every 2 weeks) */
  interval: number;
  /** Selected weekdays (ISO 1-7, where 1=Monday) */
  weekdays: number[];
  /** End condition */
  endCondition: RecurringEndCondition;
}

export interface RecurringConstraints {
  allowedFrequencies?: RecurringFrequency[];
  maxOccurrences?: number;
  maxRangeDays?: number;
  allowedWeekdays?: number[];
}

export interface RecurringBuilderProps {
  /** Initial time slot selected (startTime, endTime) */
  baseSlot: {
    startTime: string;
    endTime: string;
    date: string;
  };
  /** Recurring constraints from rental object */
  constraints?: RecurringConstraints;
  /** Current pattern configuration */
  value: RecurringPattern;
  /** Callback when pattern changes */
  onChange: (pattern: RecurringPattern) => void;
  /** Whether the builder is disabled */
  disabled?: boolean;
  /** Custom class name */
  className?: string;
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Get the ISO weekday (1-7) from a date string
 */
function getISOWeekday(dateStr: string): number {
  const date = new Date(dateStr);
  const day = date.getDay();
  return day === 0 ? 7 : day; // Convert Sunday (0) to 7
}

/**
 * Calculate max date based on constraints
 */
function getMaxDate(constraints?: RecurringConstraints): string {
  const maxDays = constraints?.maxRangeDays ?? 365;
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + maxDays);
  return maxDate.toISOString().split('T')[0] ?? '';
}

// =============================================================================
// Component
// =============================================================================

export function RecurringBuilder({
  baseSlot,
  constraints,
  value,
  onChange,
  disabled = false,
  className,
}: RecurringBuilderProps): React.ReactElement {
  // TODO: Inject t() via runtime/props instead of placeholder
  const t = (key: string, params?: any): string => key;


  // Get allowed frequencies from constraints, default to WEEKLY only
  const allowedFrequencies = constraints?.allowedFrequencies ?? (['WEEKLY'] as RecurringFrequency[]);
  const maxOccurrences = constraints?.maxOccurrences ?? 52;
  const allowedWeekdays = constraints?.allowedWeekdays ?? [1, 2, 3, 4, 5, 6, 7];

  // Get the weekday of the base slot
  const baseWeekday = getISOWeekday(baseSlot.date);

  // Ensure base weekday is always selected
  React.useEffect(() => {
    if (!value.weekdays.includes(baseWeekday)) {
      onChange({
        ...value,
        weekdays: [...value.weekdays, baseWeekday].sort((a, b) => a - b),
      });
    }
  }, [baseWeekday, value, onChange]);

  const handleFrequencyChange = (frequency: RecurringFrequency) => {
    onChange({
      ...value,
      frequency,
      // Reset weekdays when switching to monthly
      weekdays: frequency === 'MONTHLY' ? [baseWeekday] : value.weekdays,
    });
  };

  const handleWeekdayToggle = (weekday: number) => {
    // Cannot deselect the base weekday
    if (weekday === baseWeekday) return;

    const newWeekdays = value.weekdays.includes(weekday)
      ? value.weekdays.filter((w) => w !== weekday)
      : [...value.weekdays, weekday].sort((a, b) => a - b);

    onChange({
      ...value,
      weekdays: newWeekdays,
    });
  };

  const handleEndConditionTypeChange = (type: 'AFTER_OCCURRENCES' | 'UNTIL_DATE') => {
    onChange({
      ...value,
      endCondition: {
        type,
        occurrences: type === 'AFTER_OCCURRENCES' ? 10 : undefined,
        untilDate: type === 'UNTIL_DATE' ? getMaxDate(constraints) : undefined,
      },
    });
  };

  const handleOccurrencesChange = (occurrences: number) => {
    onChange({
      ...value,
      endCondition: {
        type: 'AFTER_OCCURRENCES',
        occurrences: Math.min(occurrences, maxOccurrences),
      },
    });
  };

  const handleUntilDateChange = (untilDate: string) => {
    onChange({
      ...value,
      endCondition: {
        type: 'UNTIL_DATE',
        untilDate,
      },
    });
  };

  // Translation helpers for weekdays
  const getWeekdayShort = (weekday: number): string => {
    const keys: Record<number, string> = {
      1: 'mon',
      2: 'tue',
      3: 'wed',
      4: 'thu',
      5: 'fri',
      6: 'sat',
      7: 'sun',
    };
    return t(`weekdays.short.${keys[weekday]}`);
  };

  const getWeekdayFull = (weekday: number): string => {
    const keys: Record<number, string> = {
      1: 'mon',
      2: 'tue',
      3: 'wed',
      4: 'thu',
      5: 'fri',
      6: 'sat',
      7: 'sun',
    };
    return t(`weekdays.full.${keys[weekday]}`);
  };

  const getFrequencyLabel = (freq: RecurringFrequency): string => {
    return t(`booking.recurring.frequency.${freq.toLowerCase()}`);
  };

  return (
    <div className={className}>
      <Heading
        level={3}
        data-size="sm"
        style={{
          margin: 0,
          marginBottom: 'var(--ds-spacing-4)',
          color: 'var(--ds-color-neutral-text-default)',
        }}
      >
        {t('booking.recurring.title')}
      </Heading>

      {/* Base slot info */}
      <div
        style={{
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-info-surface-default)',
          borderRadius: 'var(--ds-border-radius-md)',
          marginBottom: 'var(--ds-spacing-4)',
        }}
      >
        <Paragraph data-size="sm" style={{ margin: 0, color: 'var(--ds-color-info-text-default)' }}>
          {t('booking.recurring.basedOn')}: {getWeekdayFull(baseWeekday)} {baseSlot.date},{' '}
          {t('common.time.at')} {baseSlot.startTime} - {baseSlot.endTime}
        </Paragraph>
      </div>

      {/* Frequency selection */}
      <div style={{ marginBottom: 'var(--ds-spacing-5)' }}>
        <Paragraph
          data-size="sm"
          style={{
            margin: 0,
            marginBottom: 'var(--ds-spacing-2)',
            fontWeight: 'var(--ds-font-weight-medium)',
          }}
        >
          {t('booking.recurring.frequencyLabel')}
        </Paragraph>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
          {allowedFrequencies.map((freq) => (
            <Button
              key={freq}
              type="button"
              variant={value.frequency === freq ? 'primary' : 'secondary'}
              data-size="sm"
              onClick={() => handleFrequencyChange(freq)}
              disabled={disabled}
            >
              {getFrequencyLabel(freq)}
            </Button>
          ))}
        </div>
      </div>

      {/* Weekday selection (for weekly only) */}
      {value.frequency === 'WEEKLY' && (
        <div style={{ marginBottom: 'var(--ds-spacing-5)' }}>
          <Paragraph
            data-size="sm"
            style={{
              margin: 0,
              marginBottom: 'var(--ds-spacing-2)',
              fontWeight: 'var(--ds-font-weight-medium)',
            }}
          >
            {t('booking.recurring.weekdaysLabel')}
          </Paragraph>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
            {[1, 2, 3, 4, 5, 6, 7].map((weekday) => {
              const isSelected = value.weekdays.includes(weekday);
              const isBaseDay = weekday === baseWeekday;
              const isAllowed = allowedWeekdays.includes(weekday);

              return (
                <button
                  key={weekday}
                  type="button"
                  onClick={() => handleWeekdayToggle(weekday)}
                  disabled={disabled || isBaseDay || !isAllowed}
                  style={{
                    width: '44px',
                    height: '44px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderRadius: 'var(--ds-border-radius-md)',
                    border: isSelected
                      ? '2px solid var(--ds-color-accent-base-default)'
                      : '1px solid var(--ds-color-neutral-border-default)',
                    backgroundColor: isSelected
                      ? 'var(--ds-color-accent-surface-default)'
                      : 'var(--ds-color-neutral-surface-default)',
                    color: isSelected
                      ? 'var(--ds-color-accent-text-default)'
                      : 'var(--ds-color-neutral-text-default)',
                    fontWeight: isSelected
                      ? 'var(--ds-font-weight-semibold)'
                      : 'var(--ds-font-weight-regular)',
                    fontSize: 'var(--ds-font-size-sm)',
                    cursor: isBaseDay || !isAllowed ? 'not-allowed' : 'pointer',
                    opacity: !isAllowed ? 0.4 : 1,
                    position: 'relative',
                  }}
                  title={
                    isBaseDay
                      ? t('booking.recurring.baseDayCannotBeRemoved')
                      : !isAllowed
                        ? t('booking.recurring.weekdayNotAllowed')
                        : getWeekdayFull(weekday)
                  }
                >
                  {getWeekdayShort(weekday)}
                  {isBaseDay && (
                    <span
                      style={{
                        position: 'absolute',
                        bottom: '-2px',
                        right: '-2px',
                        width: '8px',
                        height: '8px',
                        borderRadius: 'var(--ds-border-radius-full)',
                        backgroundColor: 'var(--ds-color-success-base-default)',
                      }}
                    />
                  )}
                </button>
              );
            })}
          </div>
          <Paragraph
            data-size="xs"
            style={{
              margin: 0,
              marginTop: 'var(--ds-spacing-2)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {t('booking.recurring.weekdaysSelected', { count: value.weekdays.length })}
          </Paragraph>
        </div>
      )}

      {/* End condition */}
      <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
        <Paragraph
          data-size="sm"
          style={{
            margin: 0,
            marginBottom: 'var(--ds-spacing-3)',
            fontWeight: 'var(--ds-font-weight-medium)',
          }}
        >
          {t('booking.recurring.endRecurrence')}
        </Paragraph>

        <fieldset style={{ border: 'none', padding: 0, margin: 0 }}>
          <legend className="sr-only">{t('booking.recurring.selectEndType')}</legend>

          {/* After N occurrences */}
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-3)',
              padding: 'var(--ds-spacing-3)',
              borderRadius: 'var(--ds-border-radius-md)',
              backgroundColor:
                value.endCondition.type === 'AFTER_OCCURRENCES'
                  ? 'var(--ds-color-accent-surface-default)'
                  : 'var(--ds-color-neutral-surface-default)',
              border:
                value.endCondition.type === 'AFTER_OCCURRENCES'
                  ? '2px solid var(--ds-color-accent-border-default)'
                  : '1px solid var(--ds-color-neutral-border-subtle)',
              marginBottom: 'var(--ds-spacing-2)',
              cursor: 'pointer',
            }}
          >
            <input
              type="radio"
              name="end-condition"
              checked={value.endCondition.type === 'AFTER_OCCURRENCES'}
              onChange={() => handleEndConditionTypeChange('AFTER_OCCURRENCES')}
              disabled={disabled}
              style={{
                width: '18px',
                height: '18px',
                accentColor: 'var(--ds-color-accent-base-default)',
              }}
            />
            <span style={{ flex: 1 }}>
              <Paragraph
                data-size="sm"
                style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}
              >
                {t('booking.recurring.afterOccurrences')}
              </Paragraph>
            </span>
            {value.endCondition.type === 'AFTER_OCCURRENCES' && (
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
                <input
                  type="number"
                  min={1}
                  max={maxOccurrences}
                  value={value.endCondition.occurrences ?? 10}
                  onChange={(e) => handleOccurrencesChange(parseInt(e.target.value, 10) || 1)}
                  disabled={disabled}
                  style={{
                    width: '70px',
                    padding: 'var(--ds-spacing-2)',
                    borderRadius: 'var(--ds-border-radius-sm)',
                    border: '1px solid var(--ds-color-neutral-border-default)',
                    fontSize: 'var(--ds-font-size-sm)',
                    textAlign: 'center',
                  }}
                />
                <Paragraph data-size="sm" style={{ margin: 0 }}>
                  {t('booking.recurring.times')}
                </Paragraph>
              </div>
            )}
          </label>

          {/* Until date */}
          <label
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-3)',
              padding: 'var(--ds-spacing-3)',
              borderRadius: 'var(--ds-border-radius-md)',
              backgroundColor:
                value.endCondition.type === 'UNTIL_DATE'
                  ? 'var(--ds-color-accent-surface-default)'
                  : 'var(--ds-color-neutral-surface-default)',
              border:
                value.endCondition.type === 'UNTIL_DATE'
                  ? '2px solid var(--ds-color-accent-border-default)'
                  : '1px solid var(--ds-color-neutral-border-subtle)',
              cursor: 'pointer',
            }}
          >
            <input
              type="radio"
              name="end-condition"
              checked={value.endCondition.type === 'UNTIL_DATE'}
              onChange={() => handleEndConditionTypeChange('UNTIL_DATE')}
              disabled={disabled}
              style={{
                width: '18px',
                height: '18px',
                accentColor: 'var(--ds-color-accent-base-default)',
              }}
            />
            <span style={{ flex: 1 }}>
              <Paragraph
                data-size="sm"
                style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}
              >
                {t('booking.recurring.untilDate')}
              </Paragraph>
            </span>
            {value.endCondition.type === 'UNTIL_DATE' && (
              <input
                type="date"
                value={value.endCondition.untilDate ?? ''}
                min={baseSlot.date}
                max={getMaxDate(constraints)}
                onChange={(e) => handleUntilDateChange(e.target.value)}
                disabled={disabled}
                style={{
                  padding: 'var(--ds-spacing-2)',
                  borderRadius: 'var(--ds-border-radius-sm)',
                  border: '1px solid var(--ds-color-neutral-border-default)',
                  fontSize: 'var(--ds-font-size-sm)',
                }}
              />
            )}
          </label>
        </fieldset>
      </div>

      {/* Summary */}
      <div
        style={{
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-md)',
        }}
      >
        <Paragraph
          data-size="sm"
          style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}
        >
          {t('booking.recurring.summary')}
        </Paragraph>
        <Paragraph
          data-size="sm"
          style={{
            margin: 0,
            marginTop: 'var(--ds-spacing-1)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {value.frequency === 'WEEKLY'
            ? t('booking.recurring.summaryWeekly', {
                weekdays: value.weekdays.map((w) => getWeekdayShort(w)).join(', '),
              })
            : t('booking.recurring.summaryMonthly')}
          {value.endCondition.type === 'AFTER_OCCURRENCES'
            ? t('booking.recurring.summaryOccurrences', {
                count: value.endCondition.occurrences ?? 10,
              })
            : t('booking.recurring.summaryUntilDate', { date: value.endCondition.untilDate ?? '' })}
        </Paragraph>
      </div>
    </div>
  );
}

export default RecurringBuilder;
