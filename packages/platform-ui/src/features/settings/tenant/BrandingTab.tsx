/**
 * BrandingTab Component
 *
 * Manages branding and visual customization settings including logo, colors, and favicon.
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
  SaveIcon,
} from '@xala-technologies/platform-ui';

import type { BrandingSettingsData } from '../tenant-types';

// =============================================================================
// Types
// =============================================================================

/**
 * Labels for BrandingTab component
 */
export interface BrandingTabLabels {
  title: string;
  description: string;
  logoUrl: string;
  logoUrlDescription: string;
  logoUrlPlaceholder: string;
  primaryColor: string;
  primaryColorDescription: string;
  secondaryColor: string;
  secondaryColorDescription: string;
  faviconUrl: string;
  faviconUrlDescription: string;
  faviconUrlPlaceholder: string;
  saveChanges: string;
  saving: string;
}

export interface BrandingTabProps {
  /** Current branding data */
  data: BrandingSettingsData;
  /** UI labels for all text content */
  labels: BrandingTabLabels;
  /** Whether save is in progress */
  isSaving?: boolean;
  /** Handler for field updates */
  onFieldChange: <K extends keyof BrandingSettingsData>(
    field: K,
    value: BrandingSettingsData[K]
  ) => void;
  /** Handler for saving settings */
  onSave: () => void;
}

// =============================================================================
// Component
// =============================================================================

export function BrandingTab({
  data,
  labels,
  isSaving = false,
  onFieldChange,
  onSave,
}: BrandingTabProps): React.ReactElement {
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
          <FormField label={labels.logoUrl}>
            <Paragraph data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)', color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.logoUrlDescription}
            </Paragraph>
            <Textfield
              aria-label={labels.logoUrl}
              value={data.logo}
              onChange={(e) => onFieldChange('logo', e.target.value)}
              placeholder={labels.logoUrlPlaceholder}
            />
          </FormField>

          <FormField label={labels.primaryColor}>
            <Paragraph data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)', color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.primaryColorDescription}
            </Paragraph>
            <Textfield
              aria-label={labels.primaryColor}
              value={data.primaryColor}
              onChange={(e) => onFieldChange('primaryColor', e.target.value)}
            />
          </FormField>

          <FormField label={labels.secondaryColor}>
            <Paragraph data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)', color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.secondaryColorDescription}
            </Paragraph>
            <Textfield
              aria-label={labels.secondaryColor}
              value={data.secondaryColor}
              onChange={(e) => onFieldChange('secondaryColor', e.target.value)}
            />
          </FormField>

          <FormField label={labels.faviconUrl}>
            <Paragraph data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)', color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.faviconUrlDescription}
            </Paragraph>
            <Textfield
              aria-label={labels.faviconUrl}
              value={data.favicon}
              onChange={(e) => onFieldChange('favicon', e.target.value)}
              placeholder={labels.faviconUrlPlaceholder}
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
