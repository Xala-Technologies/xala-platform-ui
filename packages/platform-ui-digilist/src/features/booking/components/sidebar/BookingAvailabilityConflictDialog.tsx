/**
 * BookingAvailabilityConflictDialog Component
 *
 * Modal dialog for handling availability conflicts when booking.
 * Shows which time slots are available vs. unavailable and allows
 * the user to book only available slots or change times.
 *
 * Note: This is a presentational component. Real-time availability updates
 * should be handled by the parent component and passed via the `slots` prop.
 *
 * @module @xala-technologies/platform-ui/features/booking/components/sidebar
 */

import * as React from 'react';
import { Heading, Paragraph, Button } from '@xala-technologies/platform-ui-core';

// =============================================================================
// Icons
// =============================================================================

function WarningIcon({ size = 20 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

function CheckIcon({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function XIcon({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CloseIcon({ size = 20 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

// =============================================================================
// Types
// =============================================================================

export interface SlotAvailability {
  /** Unique slot key */
  slotKey: string;
  /** Slot date */
  date: Date;
  /** Start time in HH:MM format */
  startTime: string;
  /** End time in HH:MM format */
  endTime: string;
  /** Whether the slot is available */
  isAvailable: boolean;
  /** Reason for conflict if unavailable */
  conflictReason?: string;
}

export interface BookingAvailabilityConflictDialogProps {
  /** Whether the dialog is open */
  isOpen: boolean;
  /** Handler for closing the dialog */
  onClose: () => void;
  /** Slots with availability status */
  slots: SlotAvailability[];
  /** Handler for changing time selection */
  onChangeTime: () => void;
  /** Handler for booking only available slots */
  onBookAvailable: (availableSlotKeys: string[]) => void;
  /** Optional listing/rental object title */
  listingTitle?: string;
  /** Custom className */
  className?: string;
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Format date for display
 */
function formatDate(date: Date, dayNames: string[]): string {
  const dayName = dayNames[date.getDay()];
  const day = date.getDate();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const year = date.getFullYear();
  return `${dayName} ${day}.${month}.${year}`;
}

// =============================================================================
// Component
// =============================================================================

export function BookingAvailabilityConflictDialog({
  isOpen,
  onClose,
  slots,
  onChangeTime,
  onBookAvailable,
  listingTitle: _listingTitle,
  className,
}: BookingAvailabilityConflictDialogProps): React.ReactElement | null {
  // TODO: Inject t() via runtime/props instead of placeholder
  const t = (key: string, params?: any): string => key;

  // Translated day names
  const dayNames = React.useMemo(
    () => [
      t('weekday.sunday').toLowerCase(),
      t('weekday.monday').toLowerCase(),
      t('weekday.tuesday').toLowerCase(),
      t('weekday.wednesday').toLowerCase(),
      t('weekday.thursday').toLowerCase(),
      t('weekday.friday').toLowerCase(),
      t('weekday.saturday').toLowerCase(),
    ],
    [t]
  );

  if (!isOpen) return null;

  const availableSlots = slots.filter((s) => s.isAvailable);
  const unavailableSlots = slots.filter((s) => !s.isAvailable);

  const handleBookAvailable = (): void => {
    const availableKeys = availableSlots.map((s) => s.slotKey);
    onBookAvailable(availableKeys);
  };

  return (
    <div
      className={className}
      style={{
        position: 'fixed',
        inset: 0,
        backgroundColor: 'var(--ds-color-neutral-background-backdrop)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 1000,
        padding: 'var(--ds-spacing-4)',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        style={{
          backgroundColor: 'var(--ds-color-neutral-background-default)',
          borderRadius: 'var(--ds-border-radius-lg)',
          maxWidth: '500px',
          width: '100%',
          maxHeight: '80vh',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: 'var(--ds-shadow-lg)',
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="conflict-dialog-title"
      >
        {/* Header */}
        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Heading id="conflict-dialog-title" level={3} data-size="sm" style={{ margin: 0 }}>
            {t('booking.bookTimeSlots')}
          </Heading>
          <button
            type="button"
            onClick={onClose}
            aria-label={t('common.close')}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: '32px',
              height: '32px',
              border: 'none',
              backgroundColor: 'transparent',
              cursor: 'pointer',
              borderRadius: 'var(--ds-border-radius-sm)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            <CloseIcon size={20} />
          </button>
        </div>

        {/* Warning Banner */}
        {unavailableSlots.length > 0 && (
          <div
            style={{
              margin: 'var(--ds-spacing-4)',
              padding: 'var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-warning-surface-default)',
              borderRadius: 'var(--ds-border-radius-md)',
              display: 'flex',
              alignItems: 'flex-start',
              gap: 'var(--ds-spacing-2)',
            }}
          >
            <div style={{ color: 'var(--ds-color-warning-text-default)', flexShrink: 0 }}>
              <WarningIcon size={20} />
            </div>
            <Paragraph
              data-size="sm"
              style={{ margin: 0, color: 'var(--ds-color-warning-text-default)' }}
            >
              {t('booking.conflictDialog.warning')}
            </Paragraph>
          </div>
        )}

        {/* Slots List */}
        <div
          style={{
            flex: 1,
            overflow: 'auto',
            padding: '0 var(--ds-spacing-4)',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 'var(--ds-spacing-2)',
            }}
          >
            {slots.map((slot) => (
              <div
                key={slot.slotKey}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-2)',
                  padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  backgroundColor: slot.isAvailable
                    ? 'var(--ds-color-success-surface-default)'
                    : 'var(--ds-color-danger-surface-default)',
                }}
              >
                <div
                  style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: 'var(--ds-border-radius-full)',
                    backgroundColor: slot.isAvailable
                      ? 'var(--ds-color-success-base-default)'
                      : 'var(--ds-color-danger-base-default)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: 'var(--ds-color-neutral-contrast-default)',
                    flexShrink: 0,
                  }}
                >
                  {slot.isAvailable ? <CheckIcon size={12} /> : <XIcon size={12} />}
                </div>
                <div style={{ flex: 1 }}>
                  <Paragraph
                    data-size="sm"
                    style={{
                      margin: 0,
                      color: slot.isAvailable
                        ? 'var(--ds-color-success-text-default)'
                        : 'var(--ds-color-danger-text-default)',
                    }}
                  >
                    {formatDate(slot.date, dayNames)}
                  </Paragraph>
                  <Paragraph
                    data-size="xs"
                    style={{
                      margin: 0,
                      color: slot.isAvailable
                        ? 'var(--ds-color-success-text-subtle)'
                        : 'var(--ds-color-danger-text-subtle)',
                      fontVariantNumeric: 'tabular-nums',
                    }}
                  >
                    {slot.startTime} – {slot.endTime}
                  </Paragraph>
                </div>
                {slot.conflictReason && (
                  <Paragraph
                    data-size="xs"
                    style={{
                      margin: 0,
                      color: 'var(--ds-color-danger-text-subtle)',
                      textAlign: 'right',
                    }}
                  >
                    {slot.conflictReason}
                  </Paragraph>
                )}
              </div>
            ))}
          </div>

          {/* Summary */}
          <div
            style={{
              marginTop: 'var(--ds-spacing-4)',
              padding: 'var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-neutral-surface-default)',
              borderRadius: 'var(--ds-border-radius-md)',
              border: '1px dashed var(--ds-color-neutral-border-default)',
            }}
          >
            <Paragraph
              data-size="xs"
              style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
            >
              {availableSlots.length > 0
                ? t('booking.conflictDialog.availableCount', { count: availableSlots.length })
                : t('booking.conflictDialog.noAvailable')}
            </Paragraph>
          </div>

          {/* Selected date indicator */}
          {availableSlots.length > 0 && (
            <div
              style={{
                marginTop: 'var(--ds-spacing-3)',
                padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                backgroundColor: 'var(--ds-color-accent-surface-default)',
                borderRadius: 'var(--ds-border-radius-md)',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ds-spacing-2)',
              }}
            >
              <Paragraph
                data-size="sm"
                style={{ margin: 0, color: 'var(--ds-color-accent-text-default)' }}
              >
                {t('booking.conflictDialog.willBook', { count: availableSlots.length })}
              </Paragraph>
            </div>
          )}
        </div>

        {/* Actions */}
        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
            display: 'flex',
            gap: 'var(--ds-spacing-3)',
          }}
        >
          <Button
            type="button"
            variant="secondary"
            data-size="md"
            onClick={onChangeTime}
            style={{ flex: 1 }}
          >
            {t('booking.conflictDialog.changeTime')}
          </Button>
          <Button
            type="button"
            variant="primary"
            data-size="md"
            data-color="accent"
            onClick={handleBookAvailable}
            disabled={availableSlots.length === 0}
            style={{ flex: 1 }}
          >
            {t('booking.conflictDialog.bookAvailable')}
          </Button>
        </div>
      </div>
    </div>
  );
}
