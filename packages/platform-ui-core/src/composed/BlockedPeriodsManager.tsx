/**
 * BlockedPeriodsManager Component
 *
 * Add/remove blocked periods (date ranges) for unavailability.
 * Used in admin wizard for schedule configuration.
 *
 * @example
 * ```tsx
 * import { BlockedPeriodsManager } from '@xala-technologies/platform/ui';
 *
 * const [periods, setPeriods] = useState([
 *   { id: '1', startDate: '2024-12-24', endDate: '2024-12-26', reason: 'Jul' },
 * ]);
 *
 * <BlockedPeriodsManager
 *   periods={periods}
 *   onChange={setPeriods}
 * />
 * ```
 */

import * as React from 'react';
import { Button, Textfield, Fieldset, Paragraph, Label } from '../primitives';
import { cn } from '../utils';
import { CalendarIcon } from '../primitives/icons';

// =============================================================================
// Types
// =============================================================================

export interface BlockedPeriod {
  /** Unique identifier */
  id: string;
  /** Start date (ISO format YYYY-MM-DD) */
  startDate: string;
  /** End date (ISO format YYYY-MM-DD) */
  endDate: string;
  /** Optional reason for blocking */
  reason?: string;
}

export interface BlockedPeriodsManagerLabels {
  /** Fieldset legend */
  legend?: string;
  /** Helper text */
  helperText?: string;
  /** Column headers */
  startDate?: string;
  endDate?: string;
  reason?: string;
  /** Actions */
  addPeriod?: string;
  remove?: string;
  /** Placeholders */
  reasonPlaceholder?: string;
  /** Empty state */
  emptyMessage?: string;
  /** Validation */
  invalidDateRange?: string;
}

export interface BlockedPeriodsManagerProps {
  /** Current blocked periods */
  periods: BlockedPeriod[];
  /** Change handler */
  onChange: (periods: BlockedPeriod[]) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Localization labels */
  labels?: BlockedPeriodsManagerLabels;
  /** Validation errors by period ID */
  errors?: Record<string, string>;
  /** Additional className */
  className?: string;
}

// =============================================================================
// Default labels (Norwegian)
// =============================================================================

const defaultLabels: Required<BlockedPeriodsManagerLabels> = {
  legend: 'Sperrede perioder',
  helperText: 'Legg til perioder der ressursen ikke er tilgjengelig',
  startDate: 'Fra dato',
  endDate: 'Til dato',
  reason: 'Begrunnelse',
  addPeriod: '+ Legg til sperring',
  remove: 'Fjern',
  reasonPlaceholder: 'F.eks. Ferie, Vedlikehold',
  emptyMessage: 'Ingen sperringer lagt til',
  invalidDateRange: 'Sluttdato må være etter startdato',
};

// =============================================================================
// Utility
// =============================================================================

const generateId = (): string => `period-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

// =============================================================================
// Component
// =============================================================================

/**
 * BlockedPeriodsManager provides add/remove functionality for blocked date ranges.
 *
 * Accessibility:
 * - Fieldset with legend for grouping
 * - Labeled date inputs
 * - Error messages linked via aria-describedby
 */
export function BlockedPeriodsManager({
  periods,
  onChange,
  disabled = false,
  labels: customLabels,
  errors = {},
  className,
}: BlockedPeriodsManagerProps): React.ReactElement {
  const labels = { ...defaultLabels, ...customLabels };

  const handleAddPeriod = () => {
    const today = new Date().toISOString().split('T')[0];
    const newPeriod: BlockedPeriod = {
      id: generateId(),
      startDate: today,
      endDate: today,
      reason: '',
    };
    onChange([...periods, newPeriod]);
  };

  const handleRemovePeriod = (id: string) => {
    onChange(periods.filter((p) => p.id !== id));
  };

  const handleUpdatePeriod = (id: string, field: keyof BlockedPeriod, value: string) => {
    onChange(periods.map((period) => (period.id === id ? { ...period, [field]: value } : period)));
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-3)',
  };

  const periodCardStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-3)',
    padding: 'var(--ds-spacing-4)',
    backgroundColor: 'var(--ds-color-neutral-surface-default)',
    borderRadius: 'var(--ds-border-radius-md)',
    border: '1px solid var(--ds-color-neutral-border-subtle)',
  };

  const dateRowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--ds-spacing-3)',
  };

  const reasonRowStyle: React.CSSProperties = {
    display: 'flex',
    gap: 'var(--ds-spacing-3)',
    alignItems: 'flex-end',
  };

  return (
    <Fieldset className={cn('blocked-periods-manager', className)}>
      <Fieldset.Legend>
        <span style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
          <CalendarIcon />
          {labels.legend}
        </span>
      </Fieldset.Legend>
      <Fieldset.Description>{labels.helperText}</Fieldset.Description>

      <div style={containerStyle}>
        {periods.length === 0 && (
          <Paragraph
            data-size="sm"
            style={{
              margin: 0,
              padding: 'var(--ds-spacing-4)',
              textAlign: 'center',
              color: 'var(--ds-color-neutral-text-subtle)',
              backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
              borderRadius: 'var(--ds-border-radius-md)',
            }}
          >
            {labels.emptyMessage}
          </Paragraph>
        )}

        {periods.map((period, index) => {
          const periodError = errors[period.id];
          const startId = `period-${period.id}-start`;
          const endId = `period-${period.id}-end`;
          const reasonId = `period-${period.id}-reason`;
          const errorId = periodError ? `period-${period.id}-error` : undefined;
          const startLabelId = `period-${period.id}-start-label`;
          const endLabelId = `period-${period.id}-end-label`;
          const reasonLabelId = `period-${period.id}-reason-label`;

          return (
            <div
              key={period.id}
              style={periodCardStyle}
              role="group"
              aria-label={`Sperring ${index + 1}`}
            >
              <div style={dateRowStyle}>
                <div>
                  <Label id={startLabelId} htmlFor={startId}>
                    {labels.startDate}
                  </Label>
                  <Textfield
                    id={startId}
                    type="date"
                    value={period.startDate}
                    onChange={(e) => handleUpdatePeriod(period.id, 'startDate', e.target.value)}
                    disabled={disabled}
                    data-size="sm"
                    aria-labelledby={startLabelId}
                    aria-describedby={errorId}
                  />
                </div>

                <div>
                  <Label id={endLabelId} htmlFor={endId}>
                    {labels.endDate}
                  </Label>
                  <Textfield
                    id={endId}
                    type="date"
                    value={period.endDate}
                    onChange={(e) => handleUpdatePeriod(period.id, 'endDate', e.target.value)}
                    disabled={disabled}
                    data-size="sm"
                    aria-labelledby={endLabelId}
                    aria-describedby={errorId}
                  />
                </div>
              </div>

              <div style={reasonRowStyle}>
                <div style={{ flex: 1 }}>
                  <Label id={reasonLabelId} htmlFor={reasonId}>
                    {labels.reason}
                  </Label>
                  <Textfield
                    id={reasonId}
                    value={period.reason || ''}
                    onChange={(e) => handleUpdatePeriod(period.id, 'reason', e.target.value)}
                    placeholder={labels.reasonPlaceholder}
                    disabled={disabled}
                    data-size="sm"
                    aria-labelledby={reasonLabelId}
                  />
                </div>

                <Button
                  variant="tertiary"
                  data-size="sm"
                  data-color="danger"
                  onClick={() => handleRemovePeriod(period.id)}
                  disabled={disabled}
                  aria-label={`${labels.remove} sperring ${index + 1}`}
                >
                  {labels.remove}
                </Button>
              </div>

              {periodError && (
                <Paragraph
                  id={errorId}
                  data-size="xs"
                  style={{ margin: 0, color: 'var(--ds-color-danger-text-default)' }}
                  role="alert"
                >
                  {periodError}
                </Paragraph>
              )}
            </div>
          );
        })}

        <Button
          variant="secondary"
          data-size="sm"
          onClick={handleAddPeriod}
          disabled={disabled}
          style={{ alignSelf: 'flex-start' }}
        >
          {labels.addPeriod}
        </Button>
      </div>
    </Fieldset>
  );
}

BlockedPeriodsManager.displayName = 'BlockedPeriodsManager';

// =============================================================================
// Validation helper
// =============================================================================

/**
 * Validates blocked periods and returns errors.
 */
export function validateBlockedPeriods(
  periods: BlockedPeriod[],
  errorLabels: { invalidDateRange?: string } = {}
): Record<string, string> {
  const errors: Record<string, string> = {};

  periods.forEach((period) => {
    if (period.startDate && period.endDate) {
      const start = new Date(period.startDate);
      const end = new Date(period.endDate);

      if (end < start) {
        errors[period.id] = errorLabels.invalidDateRange || defaultLabels.invalidDateRange;
      }
    }
  });

  return errors;
}
