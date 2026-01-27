/**
 * BookingTab Component
 *
 * Manages booking configuration: auto-confirm, approval, cancellation, and time settings.
 * Pure presentational component - all data and actions passed via props.
 *
 * @module @xala-technologies/platform-ui/features/settings/tenant
 */

import * as React from 'react';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Stack,
  FormField,
  Textfield,
  Switch,
  SaveIcon,
} from '@xala-technologies/platform-ui-core';

import type { BookingSettingsData } from '../tenant-types';

// =============================================================================
// Types
// =============================================================================

/**
 * Labels for BookingTab component
 */
export interface BookingTabLabels {
  title: string;
  description: string;
  autoConfirm: string;
  autoConfirmDescription: string;
  requireApproval: string;
  requireApprovalDescription: string;
  allowCancellation: string;
  allowCancellationDescription: string;
  cancellationDeadline: string;
  cancellationDeadlineDescription: string;
  maxAdvanceBooking: string;
  maxAdvanceBookingDescription: string;
  minAdvanceBooking: string;
  minAdvanceBookingDescription: string;
  bufferTime: string;
  bufferTimeDescription: string;
  hours: string;
  days: string;
  minutes: string;
  saveChanges: string;
  saving: string;
}

export interface BookingTabProps {
  /** Current booking settings data */
  data: BookingSettingsData;
  /** UI labels for all text content */
  labels: BookingTabLabels;
  /** Whether save is in progress */
  isSaving?: boolean;
  /** Whether to show the approval field (hidden when autoConfirm is true) */
  showApprovalField?: boolean;
  /** Whether to show the cancellation deadline field (hidden when allowCancellation is false) */
  showCancellationDeadline?: boolean;
  /** Handler for field updates */
  onFieldChange: <K extends keyof BookingSettingsData>(
    field: K,
    value: BookingSettingsData[K]
  ) => void;
  /** Handler for saving settings */
  onSave: () => void;
}

// =============================================================================
// Component
// =============================================================================

export function BookingTab({
  data,
  labels,
  isSaving = false,
  showApprovalField = true,
  showCancellationDeadline = true,
  onFieldChange,
  onSave,
}: BookingTabProps): React.ReactElement {
  // Derive field visibility from data if not explicitly provided
  const shouldShowApprovalField = showApprovalField && !data.autoConfirm;
  const shouldShowCancellationDeadline = showCancellationDeadline && data.allowCancellation;

  return (
    <Card>
      <Stack spacing={5}>
        <div>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {labels.title}
          </Heading>
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            {labels.description}
          </Paragraph>
        </div>

        <Stack spacing={4}>
          <div>
            <label
              htmlFor="auto-confirm-switch"
              style={{
                display: 'block',
                fontSize: 'var(--ds-font-size-1)',
                fontWeight: 'var(--ds-font-weight-medium)',
                marginBottom: 'var(--ds-spacing-2)',
              }}
            >
              {labels.autoConfirm}
            </label>
            <Switch
              id="auto-confirm-switch"
              aria-label={labels.autoConfirm}
              checked={data.autoConfirm}
              onChange={(e) => onFieldChange('autoConfirm', e.target.checked)}
            />
            <Paragraph
              data-size="xs"
              style={{
                marginTop: 'var(--ds-spacing-1)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {labels.autoConfirmDescription}
            </Paragraph>
          </div>

          {shouldShowApprovalField && (
            <div>
              <label
                htmlFor="require-approval-switch"
                style={{
                  display: 'block',
                  fontSize: 'var(--ds-font-size-1)',
                  fontWeight: 'var(--ds-font-weight-medium)',
                  marginBottom: 'var(--ds-spacing-2)',
                }}
              >
                {labels.requireApproval}
              </label>
              <Switch
                id="require-approval-switch"
                aria-label={labels.requireApproval}
                checked={data.requireApproval}
                onChange={(e) => onFieldChange('requireApproval', e.target.checked)}
              />
              <Paragraph
                data-size="xs"
                style={{
                  marginTop: 'var(--ds-spacing-1)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {labels.requireApprovalDescription}
              </Paragraph>
            </div>
          )}

          <div>
            <label
              htmlFor="allow-cancellation-switch"
              style={{
                display: 'block',
                fontSize: 'var(--ds-font-size-1)',
                fontWeight: 'var(--ds-font-weight-medium)',
                marginBottom: 'var(--ds-spacing-2)',
              }}
            >
              {labels.allowCancellation}
            </label>
            <Switch
              id="allow-cancellation-switch"
              aria-label={labels.allowCancellation}
              checked={data.allowCancellation}
              onChange={(e) => onFieldChange('allowCancellation', e.target.checked)}
            />
            <Paragraph
              data-size="xs"
              style={{
                marginTop: 'var(--ds-spacing-1)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {labels.allowCancellationDescription}
            </Paragraph>
          </div>

          {shouldShowCancellationDeadline && (
            <FormField label={labels.cancellationDeadline}>
              <Paragraph
                data-size="xs"
                style={{
                  marginBottom: 'var(--ds-spacing-2)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {labels.cancellationDeadlineDescription}
              </Paragraph>
              <Textfield
                aria-label={labels.cancellationDeadline}
                value={data.cancellationDeadlineHours.toString()}
                onChange={(e) =>
                  onFieldChange('cancellationDeadlineHours', parseInt(e.target.value) || 0)
                }
                type="number"
                min="0"
                suffix={labels.hours}
              />
            </FormField>
          )}

          <FormField label={labels.maxAdvanceBooking}>
            <Paragraph
              data-size="xs"
              style={{
                marginBottom: 'var(--ds-spacing-2)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {labels.maxAdvanceBookingDescription}
            </Paragraph>
            <Textfield
              aria-label={labels.maxAdvanceBooking}
              value={data.maxAdvanceBookingDays.toString()}
              onChange={(e) =>
                onFieldChange('maxAdvanceBookingDays', parseInt(e.target.value) || 0)
              }
              type="number"
              min="1"
              suffix={labels.days}
            />
          </FormField>

          <FormField label={labels.minAdvanceBooking}>
            <Paragraph
              data-size="xs"
              style={{
                marginBottom: 'var(--ds-spacing-2)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {labels.minAdvanceBookingDescription}
            </Paragraph>
            <Textfield
              aria-label={labels.minAdvanceBooking}
              value={data.minAdvanceBookingHours.toString()}
              onChange={(e) =>
                onFieldChange('minAdvanceBookingHours', parseInt(e.target.value) || 0)
              }
              type="number"
              min="0"
              suffix={labels.hours}
            />
          </FormField>

          <FormField label={labels.bufferTime}>
            <Paragraph
              data-size="xs"
              style={{
                marginBottom: 'var(--ds-spacing-2)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {labels.bufferTimeDescription}
            </Paragraph>
            <Textfield
              aria-label={labels.bufferTime}
              value={data.bufferTimeMinutes.toString()}
              onChange={(e) => onFieldChange('bufferTimeMinutes', parseInt(e.target.value) || 0)}
              type="number"
              min="0"
              suffix={labels.minutes}
            />
          </FormField>
        </Stack>

        <div
          style={{
            paddingTop: 'var(--ds-spacing-3)',
            borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Button
            onClick={onSave}
            disabled={isSaving}
            type="button"
            aria-label={labels.saveChanges}
          >
            <SaveIcon />
            {isSaving ? labels.saving : labels.saveChanges}
          </Button>
        </div>
      </Stack>
    </Card>
  );
}
