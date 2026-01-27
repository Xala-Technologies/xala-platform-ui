/**
 * ConflictResolver Component
 *
 * Displays conflicts from a recurring booking preview and allows users
 * to select alternative time slots or skip conflicting occurrences.
 *
 * Features:
 * - Shows list of conflicting occurrences with details
 * - Provides alternative slot suggestions for each conflict
 * - Allows users to select alternatives or skip conflicts
 * - Summary of resolution actions
 *
 * @module @xala-technologies/platform-ui/features/booking/components/sidebar
 */

import * as React from 'react';
import { Heading, Paragraph, Tag, Button, Card, Spinner } from '@xala-technologies/platform-ui-core';

// =============================================================================
// Types
// =============================================================================

export type OccurrenceStatus =
  | 'AVAILABLE'
  | 'CONFLICT'
  | 'RESERVED'
  | 'BLOCKED'
  | 'BLACKOUT'
  | 'CLOSED';

export interface RecurringOccurrence {
  index: number;
  startTime: string;
  endTime: string;
  status: OccurrenceStatus;
}

/**
 * Suggested alternative slot for a conflicting occurrence
 */
export interface AlternativeSlot {
  /** Alternative slot identifier */
  id: string;
  /** Original occurrence index this alternative is for */
  forOccurrenceIndex: number;
  /** Alternative start time in ISO 8601 format */
  startTime: string;
  /** Alternative end time in ISO 8601 format */
  endTime: string;
  /** Availability status of this alternative */
  status: OccurrenceStatus;
  /** Price difference from original slot (can be negative) */
  priceDifference?: number;
  /** Currency for price difference */
  currency?: string;
  /** Short description of why this is suggested */
  reason?: string;
}

/**
 * User's resolution choice for a conflict
 */
export interface ConflictResolution {
  /** Original occurrence index */
  occurrenceIndex: number;
  /** Resolution type */
  action: 'USE_ALTERNATIVE' | 'SKIP' | 'PENDING';
  /** Selected alternative slot ID (if action is USE_ALTERNATIVE) */
  alternativeSlotId?: string;
  /** The selected alternative slot details */
  alternativeSlot?: AlternativeSlot;
}

export interface ConflictResolverProps {
  /** Conflicting occurrences from the recurring preview */
  conflicts: RecurringOccurrence[];
  /** Alternative slots for each conflict (keyed by occurrence index) */
  alternatives: Map<number, AlternativeSlot[]>;
  /** Whether alternatives are being loaded */
  isLoadingAlternatives?: boolean;
  /** Current resolution state */
  resolutions: ConflictResolution[];
  /** Callback when resolutions change */
  onResolutionsChange: (resolutions: ConflictResolution[]) => void;
  /** Callback to request more alternatives for a specific conflict */
  onRequestAlternatives?: (occurrenceIndex: number) => void;
  /** Custom class name */
  className?: string;
}

// =============================================================================
// Helper Functions
// =============================================================================

function formatDate(dateStr: string, t: (key: string) => string): string {
  const date = new Date(dateStr);
  const weekdayKeys: Record<number, string> = {
    0: 'sun',
    1: 'mon',
    2: 'tue',
    3: 'wed',
    4: 'thu',
    5: 'fri',
    6: 'sat',
  };
  const monthKeys = [
    'jan',
    'feb',
    'mar',
    'apr',
    'may',
    'jun',
    'jul',
    'aug',
    'sep',
    'oct',
    'nov',
    'dec',
  ];
  const weekday = t(`weekdays.short.${weekdayKeys[date.getDay()]}`);
  const day = date.getDate();
  const month = t(`months.short.${monthKeys[date.getMonth()]}`);
  return `${weekday} ${day}. ${month}`;
}

function formatTime(startTime: string, endTime: string): string {
  const start = new Date(startTime);
  const end = new Date(endTime);
  const startStr = `${start.getHours().toString().padStart(2, '0')}:${start.getMinutes().toString().padStart(2, '0')}`;
  const endStr = `${end.getHours().toString().padStart(2, '0')}:${end.getMinutes().toString().padStart(2, '0')}`;
  return `${startStr} - ${endStr}`;
}

function formatPriceDifference(difference: number, currency: string): string {
  const formatter = new Intl.NumberFormat('nb-NO', {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    signDisplay: 'always',
  });
  return formatter.format(difference);
}

// =============================================================================
// Sub-Components
// =============================================================================

interface ConflictCardProps {
  conflict: RecurringOccurrence;
  alternatives: AlternativeSlot[];
  resolution: ConflictResolution;
  isLoadingAlternatives: boolean;
  onSelectAlternative: (alternative: AlternativeSlot) => void;
  onSkip: () => void;
  onRequestMore?: () => void;
  t: (key: string, params?: Record<string, unknown>) => string;
}

function ConflictCard({
  conflict,
  alternatives,
  resolution,
  isLoadingAlternatives,
  onSelectAlternative,
  onSkip,
  onRequestMore,
  t,
}: ConflictCardProps): React.ReactElement {
  const isResolved = resolution.action !== 'PENDING';

  return (
    <Card
      style={{
        padding: 'var(--ds-spacing-4)',
        marginBottom: 'var(--ds-spacing-3)',
        border: isResolved
          ? '2px solid var(--ds-color-success-border-default)'
          : '1px solid var(--ds-color-danger-border-default)',
        backgroundColor: isResolved
          ? 'var(--ds-color-success-surface-default)'
          : 'var(--ds-color-danger-surface-default)',
      }}
    >
      {/* Conflict Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 'var(--ds-spacing-3)',
        }}
      >
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
            <span
              style={{
                width: '24px',
                height: '24px',
                borderRadius: 'var(--ds-border-radius-full)',
                backgroundColor: 'var(--ds-color-danger-base-default)',
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--ds-font-size-xs)',
                fontWeight: 'var(--ds-font-weight-semibold)',
              }}
            >
              {conflict.index + 1}
            </span>
            <Paragraph
              data-size="md"
              style={{
                margin: 0,
                fontWeight: 'var(--ds-font-weight-semibold)',
              }}
            >
              {formatDate(conflict.startTime, t)}
            </Paragraph>
          </div>
          <Paragraph
            data-size="sm"
            style={{
              margin: 0,
              marginTop: 'var(--ds-spacing-1)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {formatTime(conflict.startTime, conflict.endTime)}
          </Paragraph>
        </div>

        <Tag data-color="danger" data-size="sm">
          {t(`slotStatus.${conflict.status.toLowerCase()}`)}
        </Tag>
      </div>

      {/* Resolution Status */}
      {isResolved && (
        <div
          style={{
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-success-surface-hover)',
            borderRadius: 'var(--ds-border-radius-md)',
            marginBottom: 'var(--ds-spacing-3)',
          }}
        >
          <Paragraph
            data-size="sm"
            style={{
              margin: 0,
              color: 'var(--ds-color-success-text-default)',
              fontWeight: 'var(--ds-font-weight-medium)',
            }}
          >
            {resolution.action === 'SKIP'
              ? `✓ ${t('conflictResolver.skipped')}`
              : `✓ ${t('conflictResolver.switchedTo')} ${formatDate(resolution.alternativeSlot?.startTime ?? '', t)} ${formatTime(resolution.alternativeSlot?.startTime ?? '', resolution.alternativeSlot?.endTime ?? '')}`}
          </Paragraph>
        </div>
      )}

      {/* Alternatives Section */}
      {!isResolved && (
        <div>
          <Paragraph
            data-size="xs"
            style={{
              margin: 0,
              marginBottom: 'var(--ds-spacing-2)',
              color: 'var(--ds-color-neutral-text-subtle)',
              fontWeight: 'var(--ds-font-weight-medium)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            {t('conflictResolver.selectAlternative')}
          </Paragraph>

          {isLoadingAlternatives ? (
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--ds-spacing-4)',
              }}
            >
              <Spinner data-size="sm" aria-hidden="true" />
              <Paragraph data-size="sm" style={{ margin: 0, marginLeft: 'var(--ds-spacing-2)' }}>
                {t('conflictResolver.loadingAlternatives')}
              </Paragraph>
            </div>
          ) : alternatives.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
              {alternatives.slice(0, 3).map((alt) => (
                <button
                  key={alt.id}
                  type="button"
                  onClick={() => onSelectAlternative(alt)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    padding: 'var(--ds-spacing-3)',
                    backgroundColor: 'var(--ds-color-neutral-surface-default)',
                    border: '1px solid var(--ds-color-neutral-border-default)',
                    borderRadius: 'var(--ds-border-radius-md)',
                    cursor: 'pointer',
                    textAlign: 'left',
                    width: '100%',
                    transition: 'all 0.15s ease',
                  }}
                >
                  <div>
                    <Paragraph
                      data-size="sm"
                      style={{
                        margin: 0,
                        fontWeight: 'var(--ds-font-weight-medium)',
                      }}
                    >
                      {formatDate(alt.startTime, t)}
                    </Paragraph>
                    <Paragraph
                      data-size="xs"
                      style={{
                        margin: 0,
                        color: 'var(--ds-color-neutral-text-subtle)',
                      }}
                    >
                      {formatTime(alt.startTime, alt.endTime)}
                    </Paragraph>
                  </div>
                  <div
                    style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}
                  >
                    {alt.priceDifference !== undefined && alt.priceDifference !== 0 && (
                      <Tag
                        data-color={alt.priceDifference > 0 ? 'warning' : 'success'}
                        data-size="sm"
                      >
                        {formatPriceDifference(alt.priceDifference, alt.currency ?? 'NOK')}
                      </Tag>
                    )}
                    <Tag data-color="success" data-size="sm">
                      {t('slotStatus.available')}
                    </Tag>
                  </div>
                </button>
              ))}

              {alternatives.length > 3 && onRequestMore && (
                <button
                  type="button"
                  onClick={onRequestMore}
                  style={{
                    padding: 'var(--ds-spacing-2)',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: 'var(--ds-color-accent-text-default)',
                    fontSize: 'var(--ds-font-size-sm)',
                    cursor: 'pointer',
                    textDecoration: 'underline',
                  }}
                >
                  {t('conflictResolver.showMoreAlternatives', { count: alternatives.length - 3 })}
                </button>
              )}
            </div>
          ) : (
            <Paragraph
              data-size="sm"
              style={{
                margin: 0,
                padding: 'var(--ds-spacing-3)',
                backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                borderRadius: 'var(--ds-border-radius-md)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {t('conflictResolver.noAlternatives')}
            </Paragraph>
          )}

          {/* Skip button */}
          <div style={{ marginTop: 'var(--ds-spacing-3)' }}>
            <Button
              type="button"
              variant="tertiary"
              data-size="sm"
              onClick={onSkip}
              style={{ width: '100%' }}
            >
              {t('conflictResolver.skipDate')}
            </Button>
          </div>
        </div>
      )}

      {/* Undo button for resolved conflicts */}
      {isResolved && (
        <Button
          type="button"
          variant="tertiary"
          data-size="sm"
          onClick={onSkip}
          style={{ width: '100%' }}
        >
          {t('action.undo')}
        </Button>
      )}
    </Card>
  );
}

// =============================================================================
// Main Component
// =============================================================================

export function ConflictResolver({
  conflicts,
  alternatives,
  isLoadingAlternatives = false,
  resolutions,
  onResolutionsChange,
  onRequestAlternatives,
  className,
}: ConflictResolverProps): React.ReactElement {
  // TODO: Inject t() via runtime/props instead of placeholder
  const t = (key: string, params?: any): string => key;

  // Initialize resolutions if empty
  React.useEffect(() => {
    if (resolutions.length === 0 && conflicts.length > 0) {
      const initialResolutions: ConflictResolution[] = conflicts.map((c) => ({
        occurrenceIndex: c.index,
        action: 'PENDING',
      }));
      onResolutionsChange(initialResolutions);
    }
  }, [conflicts, resolutions.length, onResolutionsChange]);

  const handleSelectAlternative = (occurrenceIndex: number, alternative: AlternativeSlot) => {
    const updated = resolutions.map((r) =>
      r.occurrenceIndex === occurrenceIndex
        ? {
            ...r,
            action: 'USE_ALTERNATIVE' as const,
            alternativeSlotId: alternative.id,
            alternativeSlot: alternative,
          }
        : r
    );
    onResolutionsChange(updated);
  };

  const handleSkip = (occurrenceIndex: number) => {
    const resolution = resolutions.find((r) => r.occurrenceIndex === occurrenceIndex);

    // If already resolved, reset to pending (undo)
    if (resolution?.action !== 'PENDING') {
      const updated = resolutions.map((r) =>
        r.occurrenceIndex === occurrenceIndex
          ? {
              ...r,
              action: 'PENDING' as const,
              alternativeSlotId: undefined,
              alternativeSlot: undefined,
            }
          : r
      );
      onResolutionsChange(updated);
    } else {
      // Skip this occurrence
      const updated = resolutions.map((r) =>
        r.occurrenceIndex === occurrenceIndex
          ? {
              ...r,
              action: 'SKIP' as const,
              alternativeSlotId: undefined,
              alternativeSlot: undefined,
            }
          : r
      );
      onResolutionsChange(updated);
    }
  };

  const handleSkipAll = () => {
    const updated = resolutions.map((r) => ({
      ...r,
      action: 'SKIP' as const,
      alternativeSlotId: undefined,
      alternativeSlot: undefined,
    }));
    onResolutionsChange(updated);
  };

  const handleResetAll = () => {
    const updated = resolutions.map((r) => ({
      ...r,
      action: 'PENDING' as const,
      alternativeSlotId: undefined,
      alternativeSlot: undefined,
    }));
    onResolutionsChange(updated);
  };

  // Calculate summary
  const resolvedCount = resolutions.filter((r) => r.action !== 'PENDING').length;
  const skippedCount = resolutions.filter((r) => r.action === 'SKIP').length;
  const alternativeCount = resolutions.filter((r) => r.action === 'USE_ALTERNATIVE').length;
  const pendingCount = resolutions.filter((r) => r.action === 'PENDING').length;
  const allResolved = pendingCount === 0;

  if (conflicts.length === 0) {
    return (
      <div className={className}>
        <Paragraph
          data-size="sm"
          style={{
            margin: 0,
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-success-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
            color: 'var(--ds-color-success-text-default)',
          }}
        >
          ✓ {t('conflictResolver.noConflicts')}
        </Paragraph>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--ds-spacing-4)',
        }}
      >
        <Heading level={3} data-size="sm" style={{ margin: 0 }}>
          {t('conflictResolver.title')} ({conflicts.length})
        </Heading>
        <Tag data-color={allResolved ? 'success' : 'warning'} data-size="sm">
          {t('conflictResolver.resolvedCount', {
            resolved: resolvedCount,
            total: conflicts.length,
          })}
        </Tag>
      </div>

      {/* Quick actions */}
      <div
        style={{
          display: 'flex',
          gap: 'var(--ds-spacing-2)',
          marginBottom: 'var(--ds-spacing-4)',
        }}
      >
        <button
          type="button"
          onClick={handleSkipAll}
          style={{
            padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
            fontSize: 'var(--ds-font-size-xs)',
            color: 'var(--ds-color-neutral-text-subtle)',
            backgroundColor: 'transparent',
            border: 'none',
            cursor: 'pointer',
            textDecoration: 'underline',
          }}
        >
          {t('conflictResolver.skipAll')}
        </button>
        {resolvedCount > 0 && (
          <button
            type="button"
            onClick={handleResetAll}
            style={{
              padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
              fontSize: 'var(--ds-font-size-xs)',
              color: 'var(--ds-color-neutral-text-subtle)',
              backgroundColor: 'transparent',
              border: 'none',
              cursor: 'pointer',
              textDecoration: 'underline',
            }}
          >
            {t('conflictResolver.resetAll')}
          </button>
        )}
      </div>

      {/* Conflict Cards */}
      <div
        style={{
          maxHeight: '500px',
          overflowY: 'auto',
          paddingRight: 'var(--ds-spacing-2)',
        }}
      >
        {conflicts.map((conflict) => {
          const conflictAlternatives = alternatives.get(conflict.index) ?? [];
          const resolution = resolutions.find((r) => r.occurrenceIndex === conflict.index) ?? {
            occurrenceIndex: conflict.index,
            action: 'PENDING' as const,
          };

          return (
            <ConflictCard
              key={conflict.index}
              conflict={conflict}
              alternatives={conflictAlternatives}
              resolution={resolution}
              isLoadingAlternatives={isLoadingAlternatives}
              onSelectAlternative={(alt) => handleSelectAlternative(conflict.index, alt)}
              onSkip={() => handleSkip(conflict.index)}
              onRequestMore={
                onRequestAlternatives ? () => onRequestAlternatives(conflict.index) : undefined
              }
              t={t}
            />
          );
        })}
      </div>

      {/* Summary Footer */}
      <div
        style={{
          marginTop: 'var(--ds-spacing-4)',
          padding: 'var(--ds-spacing-4)',
          backgroundColor: allResolved
            ? 'var(--ds-color-success-surface-default)'
            : 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-md)',
        }}
      >
        <Paragraph
          data-size="sm"
          style={{
            margin: 0,
            fontWeight: 'var(--ds-font-weight-medium)',
            color: allResolved
              ? 'var(--ds-color-success-text-default)'
              : 'var(--ds-color-neutral-text-default)',
          }}
        >
          {allResolved ? `✓ ${t('conflictResolver.allResolved')}` : t('conflictResolver.summary')}
        </Paragraph>
        <div
          style={{
            display: 'flex',
            gap: 'var(--ds-spacing-4)',
            marginTop: 'var(--ds-spacing-2)',
          }}
        >
          {alternativeCount > 0 && (
            <Paragraph
              data-size="xs"
              style={{
                margin: 0,
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {t('conflictResolver.alternativeCount', { count: alternativeCount })}
            </Paragraph>
          )}
          {skippedCount > 0 && (
            <Paragraph
              data-size="xs"
              style={{
                margin: 0,
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {t('conflictResolver.skippedCount', { count: skippedCount })}
            </Paragraph>
          )}
          {pendingCount > 0 && (
            <Paragraph
              data-size="xs"
              style={{
                margin: 0,
                color: 'var(--ds-color-warning-text-default)',
              }}
            >
              {t('conflictResolver.pendingCount', { count: pendingCount })}
            </Paragraph>
          )}
        </div>
      </div>
    </div>
  );
}

export default ConflictResolver;
