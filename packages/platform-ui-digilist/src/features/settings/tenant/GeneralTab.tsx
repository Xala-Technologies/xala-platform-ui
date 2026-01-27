/**
 * GeneralTab Component
 *
 * Manages general system settings including locale, timezone, currency, and formats.
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
  Select,
  SaveIcon,
} from '@xala-technologies/platform-ui-core';

import type {
  GeneralSettingsData,
  Locale,
  Timezone,
  Currency,
  DateFormat,
  TimeFormat,
} from '../tenant-types';

// =============================================================================
// Types
// =============================================================================

/**
 * Labels for GeneralTab component
 */
export interface GeneralTabLabels {
  title: string;
  description: string;
  systemName: string;
  systemNameDescription: string;
  systemNamePlaceholder: string;
  language: string;
  languageNb: string;
  languageNn: string;
  languageEn: string;
  timezone: string;
  timezoneOslo: string;
  timezoneLondon: string;
  timezoneNewYork: string;
  currency: string;
  currencyNok: string;
  currencyEur: string;
  currencyUsd: string;
  dateFormat: string;
  timeFormat: string;
  timeFormat24h: string;
  timeFormat12h: string;
  saveChanges: string;
  saving: string;
}

export interface GeneralTabProps {
  /** Current settings data */
  data: GeneralSettingsData;
  /** UI labels for all text content */
  labels: GeneralTabLabels;
  /** Whether save is in progress */
  isSaving?: boolean;
  /** Handler for field updates */
  onFieldChange: <K extends keyof GeneralSettingsData>(
    field: K,
    value: GeneralSettingsData[K]
  ) => void;
  /** Handler for saving settings */
  onSave: () => void;
}

// =============================================================================
// Component
// =============================================================================

export function GeneralTab({
  data,
  labels,
  isSaving = false,
  onFieldChange,
  onSave,
}: GeneralTabProps): React.ReactElement {
  return (
    <Card>
      <Stack spacing="5">
        <Stack spacing="3">
          <Heading level={3} data-size="sm">
            {labels.title}
          </Heading>
          <Paragraph data-size="sm" data-color="subtle">
            {labels.description}
          </Paragraph>
        </Stack>

        <Stack spacing={4}>
          <FormField label={labels.systemName}>
            <Paragraph
              data-size="xs"
              style={{
                marginBottom: 'var(--ds-spacing-2)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {labels.systemNameDescription}
            </Paragraph>
            <Textfield
              aria-label={labels.systemName}
              value={data.name}
              onChange={(e) => onFieldChange('name', e.target.value)}
              placeholder={labels.systemNamePlaceholder}
            />
          </FormField>

          <FormField label={labels.language}>
            <Select
              value={data.locale}
              onChange={(e) => onFieldChange('locale', e.target.value as Locale)}
            >
              <option value="nb">{labels.languageNb}</option>
              <option value="nn">{labels.languageNn}</option>
              <option value="en">{labels.languageEn}</option>
            </Select>
          </FormField>

          <FormField label={labels.timezone}>
            <Select
              value={data.timezone}
              onChange={(e) => onFieldChange('timezone', e.target.value as Timezone)}
            >
              <option value="Europe/Oslo">{labels.timezoneOslo}</option>
              <option value="Europe/London">{labels.timezoneLondon}</option>
              <option value="America/New_York">{labels.timezoneNewYork}</option>
            </Select>
          </FormField>

          <FormField label={labels.currency}>
            <Select
              value={data.currency}
              onChange={(e) => onFieldChange('currency', e.target.value as Currency)}
            >
              <option value="NOK">{labels.currencyNok}</option>
              <option value="EUR">{labels.currencyEur}</option>
              <option value="USD">{labels.currencyUsd}</option>
            </Select>
          </FormField>

          <div
            style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--ds-spacing-3)' }}
          >
            <FormField label={labels.dateFormat}>
              <Select
                value={data.dateFormat}
                onChange={(e) => onFieldChange('dateFormat', e.target.value as DateFormat)}
              >
                <option value="dd.MM.yyyy">31.12.2024</option>
                <option value="yyyy-MM-dd">2024-12-31</option>
                <option value="MM/dd/yyyy">12/31/2024</option>
              </Select>
            </FormField>

            <FormField label={labels.timeFormat}>
              <Select
                value={data.timeFormat}
                onChange={(e) => onFieldChange('timeFormat', e.target.value as TimeFormat)}
              >
                <option value="24h">{labels.timeFormat24h}</option>
                <option value="12h">{labels.timeFormat12h}</option>
              </Select>
            </FormField>
          </div>
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
