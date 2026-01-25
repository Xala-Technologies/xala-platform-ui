/**
 * OpeningHoursEditor Component
 *
 * Editable weekly schedule with day checkboxes and from/to time inputs.
 * Used in admin wizards for defining availability/opening hours.
 *
 * @example
 * ```tsx
 * import { OpeningHoursEditor } from '@xala-technologies/platform/ui';
 *
 * const [schedule, setSchedule] = useState<WeekdaySchedule>({
 *   monday: { enabled: true, openTime: '08:00', closeTime: '16:00' },
 *   tuesday: { enabled: true, openTime: '08:00', closeTime: '16:00' },
 *   // ...
 * });
 *
 * <OpeningHoursEditor
 *   value={schedule}
 *   onChange={setSchedule}
 * />
 * ```
 */

import * as React from 'react';
import { Checkbox, Textfield, Fieldset, Label, Paragraph } from '@digdir/designsystemet-react';
import { cn } from '../utils';

// =============================================================================
// Types
// =============================================================================

export interface DaySchedule {
    /** Whether this day is enabled */
    enabled: boolean;
    /** Opening time (HH:mm format) */
    openTime?: string;
    /** Closing time (HH:mm format) */
    closeTime?: string;
}

export interface WeekdaySchedule {
    monday?: DaySchedule;
    tuesday?: DaySchedule;
    wednesday?: DaySchedule;
    thursday?: DaySchedule;
    friday?: DaySchedule;
    saturday?: DaySchedule;
    sunday?: DaySchedule;
}

export type WeekdayKey = keyof WeekdaySchedule;

export interface OpeningHoursEditorLabels {
    /** Legend for the fieldset */
    legend?: string;
    /** Day labels */
    monday?: string;
    tuesday?: string;
    wednesday?: string;
    thursday?: string;
    friday?: string;
    saturday?: string;
    sunday?: string;
    /** Time labels */
    from?: string;
    to?: string;
    /** Validation messages */
    invalidTimeRange?: string;
    /** Helper text */
    helperText?: string;
}

export interface OpeningHoursEditorProps {
    /** Current schedule value */
    value: WeekdaySchedule;
    /** Change handler */
    onChange: (value: WeekdaySchedule) => void;
    /** Validation errors by day */
    errors?: Partial<Record<WeekdayKey, string>>;
    /** Disabled state */
    disabled?: boolean;
    /** Localization labels */
    labels?: OpeningHoursEditorLabels;
    /** Additional className */
    className?: string;
}

// =============================================================================
// Default labels (Norwegian)
// =============================================================================

const defaultLabels: Required<OpeningHoursEditorLabels> = {
    legend: 'Åpningstider',
    monday: 'Mandag',
    tuesday: 'Tirsdag',
    wednesday: 'Onsdag',
    thursday: 'Torsdag',
    friday: 'Fredag',
    saturday: 'Lørdag',
    sunday: 'Søndag',
    from: 'Fra',
    to: 'Til',
    invalidTimeRange: 'Sluttid må være etter starttid',
    helperText: 'Velg hvilke dager som er tilgjengelige og angi åpningstider',
};

// =============================================================================
// Day order for iteration
// =============================================================================

const dayOrder: WeekdayKey[] = [
    'monday',
    'tuesday',
    'wednesday',
    'thursday',
    'friday',
    'saturday',
    'sunday',
];

// =============================================================================
// Component
// =============================================================================

/**
 * OpeningHoursEditor provides an editable weekly schedule.
 *
 * Accessibility:
 * - Fieldset with legend for grouping
 * - Time inputs with proper labels
 * - Keyboard navigation between rows
 * - Error messages linked with aria-describedby
 */
export function OpeningHoursEditor({
    value,
    onChange,
    errors,
    disabled = false,
    labels: customLabels,
    className,
}: OpeningHoursEditorProps): React.ReactElement {
    const labels = { ...defaultLabels, ...customLabels };

    const handleDayToggle = (day: WeekdayKey, enabled: boolean) => {
        const currentDay = value[day] || { enabled: false };
        onChange({
            ...value,
            [day]: {
                ...currentDay,
                enabled,
                // Set default times when enabling
                openTime: enabled ? currentDay.openTime || '08:00' : currentDay.openTime,
                closeTime: enabled ? currentDay.closeTime || '16:00' : currentDay.closeTime,
            },
        });
    };

    const handleTimeChange = (day: WeekdayKey, field: 'openTime' | 'closeTime', time: string) => {
        const currentDay = value[day] || { enabled: false };
        onChange({
            ...value,
            [day]: {
                ...currentDay,
                [field]: time,
            },
        });
    };

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-3)',
    };

    const rowStyle: React.CSSProperties = {
        display: 'grid',
        gridTemplateColumns: 'minmax(120px, 150px) 1fr 1fr',
        gap: 'var(--ds-spacing-3)',
        alignItems: 'center',
        padding: 'var(--ds-spacing-2) 0',
        borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
    };

    const headerRowStyle: React.CSSProperties = {
        ...rowStyle,
        borderBottom: '2px solid var(--ds-color-neutral-border-default)',
        paddingBottom: 'var(--ds-spacing-2)',
    };

    const timeInputContainerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-1)',
    };

    const getDayLabel = (day: WeekdayKey): string => {
        return labels[day] || day;
    };

    return (
        <Fieldset className={cn('opening-hours-editor', className)}>
            <Fieldset.Legend>{labels.legend}</Fieldset.Legend>
            {labels.helperText && (
                <Fieldset.Description>{labels.helperText}</Fieldset.Description>
            )}

            <div style={containerStyle}>
                {/* Header row */}
                <div style={headerRowStyle} role="row" aria-hidden="true">
                    <div />
                    <Paragraph data-size="xs" style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}>
                        {labels.from}
                    </Paragraph>
                    <Paragraph data-size="xs" style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}>
                        {labels.to}
                    </Paragraph>
                </div>

                {/* Day rows */}
                {dayOrder.map((day) => {
                    const daySchedule = value[day] || { enabled: false };
                    const dayError = errors?.[day];
                    const dayLabel = getDayLabel(day);
                    const errorId = dayError ? `${day}-error` : undefined;
                    const dayLabelId = `${day}-label`;
                    const fromLabelId = `${day}-from-label`;
                    const toLabelId = `${day}-to-label`;

                    return (
                        <div
                            key={day}
                            style={rowStyle}
                            role="group"
                            aria-label={dayLabel}
                        >
                            {/* Day checkbox */}
                            <Checkbox
                                id={day}
                                checked={daySchedule.enabled}
                                onChange={(e) => handleDayToggle(day, e.target.checked)}
                                disabled={disabled}
                                data-size="sm"
                                value={day}
                                aria-labelledby={dayLabelId}
                            />
                            <Label id={dayLabelId} htmlFor={day} style={{ marginLeft: 'calc(var(--ds-spacing-2) * -1)', cursor: 'pointer' }}>
                                {dayLabel}
                            </Label>

                            {/* From time */}
                            <div style={timeInputContainerStyle}>
                                <Label id={fromLabelId} htmlFor={`${day}-from`} style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)' }}>
                                    {labels.from} {dayLabel}
                                </Label>
                                <Textfield
                                    id={`${day}-from`}
                                    type="time"
                                    value={daySchedule.openTime || ''}
                                    onChange={(e) => handleTimeChange(day, 'openTime', e.target.value)}
                                    disabled={disabled || !daySchedule.enabled}
                                    data-size="sm"
                                    aria-labelledby={fromLabelId}
                                    aria-describedby={errorId}
                                    style={{ opacity: daySchedule.enabled ? 1 : 0.5 }}
                                />
                            </div>

                            {/* To time */}
                            <div style={timeInputContainerStyle}>
                                <Label id={toLabelId} htmlFor={`${day}-to`} style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)' }}>
                                    {labels.to} {dayLabel}
                                </Label>
                                <Textfield
                                    id={`${day}-to`}
                                    type="time"
                                    value={daySchedule.closeTime || ''}
                                    onChange={(e) => handleTimeChange(day, 'closeTime', e.target.value)}
                                    disabled={disabled || !daySchedule.enabled}
                                    data-size="sm"
                                    aria-labelledby={toLabelId}
                                    aria-describedby={errorId}
                                    style={{ opacity: daySchedule.enabled ? 1 : 0.5 }}
                                />
                                {dayError && (
                                    <Paragraph
                                        id={errorId}
                                        data-size="xs"
                                        style={{
                                            margin: 0,
                                            color: 'var(--ds-color-danger-text-default)',
                                        }}
                                        role="alert"
                                    >
                                        {dayError}
                                    </Paragraph>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </Fieldset>
    );
}

OpeningHoursEditor.displayName = 'OpeningHoursEditor';

// =============================================================================
// Preset configurations
// =============================================================================

/**
 * Default weekday schedule (Mon-Fri 08:00-16:00)
 */
export const defaultWeekdaySchedule: WeekdaySchedule = {
    monday: { enabled: true, openTime: '08:00', closeTime: '16:00' },
    tuesday: { enabled: true, openTime: '08:00', closeTime: '16:00' },
    wednesday: { enabled: true, openTime: '08:00', closeTime: '16:00' },
    thursday: { enabled: true, openTime: '08:00', closeTime: '16:00' },
    friday: { enabled: true, openTime: '08:00', closeTime: '16:00' },
    saturday: { enabled: false },
    sunday: { enabled: false },
};

/**
 * Empty schedule (all days disabled)
 */
export const emptySchedule: WeekdaySchedule = {
    monday: { enabled: false },
    tuesday: { enabled: false },
    wednesday: { enabled: false },
    thursday: { enabled: false },
    friday: { enabled: false },
    saturday: { enabled: false },
    sunday: { enabled: false },
};

// =============================================================================
// Validation helper
// =============================================================================

/**
 * Validate a schedule and return errors
 */
export function validateSchedule(
    schedule: WeekdaySchedule,
    labels: Pick<OpeningHoursEditorLabels, 'invalidTimeRange'>
): Partial<Record<WeekdayKey, string>> {
    const errors: Partial<Record<WeekdayKey, string>> = {};

    for (const day of dayOrder) {
        const daySchedule = schedule[day];
        if (daySchedule?.enabled && daySchedule.openTime && daySchedule.closeTime) {
            if (daySchedule.openTime >= daySchedule.closeTime) {
                errors[day] = labels.invalidTimeRange || 'Invalid time range';
            }
        }
    }

    return errors;
}
