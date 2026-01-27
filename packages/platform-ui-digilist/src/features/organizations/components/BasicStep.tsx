/**
 * BasicStep Component
 *
 * Pure presentational component for collecting basic organization information.
 * Used as the first step in the organization wizard.
 *
 * @module @xala-technologies/platform-ui/features/organizations
 */

import * as React from 'react';
import { Textfield, Select, Paragraph, Heading, Alert } from '@digdir/designsystemet-react';
import { Stack, FormField } from '@xala-technologies/platform-ui';
import type { BasicData, ActorType } from '../types';

// =============================================================================
// Labels Interface
// =============================================================================

export interface BasicStepLabels {
  // Section headers
  title: string;
  description: string;
  contactInfoHeader: string;
  addressHeader: string;

  // Field labels
  nameLabel: string;
  namePlaceholder: string;
  typeLabel: string;
  organizationNumberLabel: string;
  organizationNumberPlaceholder: string;
  emailLabel: string;
  emailPlaceholder: string;
  phoneLabel: string;
  phonePlaceholder: string;
  streetAddressLabel: string;
  streetAddressPlaceholder: string;
  postalCodeLabel: string;
  postalCodePlaceholder: string;
  cityLabel: string;
  cityPlaceholder: string;

  // Actor type options
  actorTypeMunicipality: string;
  actorTypeOrganization: string;
  actorTypeBusiness: string;
  actorTypeSportsClub: string;
  actorTypeYouthOrganization: string;
  actorTypeSchool: string;
  actorTypePrivate: string;
}

// =============================================================================
// Types
// =============================================================================

export interface BasicStepProps {
  /** Current form data */
  data: BasicData;
  /** Callback when data changes */
  onChange: (data: BasicData) => void;
  /** UI labels for all text content */
  labels: BasicStepLabels;
  /** Validation errors to display */
  errors?: string[];
}

// =============================================================================
// Component
// =============================================================================

/**
 * Basic information step for organization wizard.
 *
 * @example
 * ```tsx
 * import { BasicStep } from '@xala-technologies/platform-ui/features/organizations';
 *
 * function WizardBasicStep({ data, onChange, errors }) {
 *   const labels = {
 *     title: 'Basic Information',
 *     description: 'Enter the basic details of your organization',
 *     // ... all other labels
 *   };
 *
 *   return (
 *     <BasicStep
 *       data={data}
 *       onChange={onChange}
 *       labels={labels}
 *       errors={errors}
 *     />
 *   );
 * }
 * ```
 */
export function BasicStep({
  data,
  onChange,
  labels,
  errors = [],
}: BasicStepProps): React.ReactElement {
  const handleChange = (field: keyof BasicData, value: string) => {
    onChange({ ...data, [field]: value });
  };

  return (
    <Stack spacing="5">
      <Stack spacing="2">
        <Heading level={3} data-size="md">
          {labels.title}
        </Heading>
        <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
          {labels.description}
        </Paragraph>
      </Stack>

      {errors.length > 0 && (
        <Alert data-color="danger">
          {errors.map((error, idx) => (
            <Paragraph
              key={idx}
              data-size="sm"
              style={{ color: 'var(--ds-color-danger-text-default)', margin: 0 }}
            >
              {error}
            </Paragraph>
          ))}
        </Alert>
      )}

      <Stack spacing="4">
        {/* Name field (required) */}
        <FormField label={labels.nameLabel} required>
          <Textfield
            id="org-name"
            value={data.name || ''}
            onChange={(e) => handleChange('name', e.target.value)}
            placeholder={labels.namePlaceholder}
            aria-label={labels.nameLabel}
          />
        </FormField>

        {/* Actor Type (required) */}
        <FormField label={labels.typeLabel} required>
          <Select
            id="actor-type"
            value={data.actorType || 'municipality'}
            onChange={(e) => handleChange('actorType', e.target.value as ActorType)}
            aria-label={labels.typeLabel}
          >
            <option value="municipality">{labels.actorTypeMunicipality}</option>
            <option value="organization">{labels.actorTypeOrganization}</option>
            <option value="business">{labels.actorTypeBusiness}</option>
            <option value="sports_club">{labels.actorTypeSportsClub}</option>
            <option value="youth_organization">{labels.actorTypeYouthOrganization}</option>
            <option value="school">{labels.actorTypeSchool}</option>
            <option value="private">{labels.actorTypePrivate}</option>
          </Select>
        </FormField>

        {/* Organization Number (optional) */}
        <FormField label={labels.organizationNumberLabel}>
          <Textfield
            id="org-number"
            value={data.organizationNumber || ''}
            onChange={(e) => handleChange('organizationNumber', e.target.value)}
            placeholder={labels.organizationNumberPlaceholder}
            aria-label={labels.organizationNumberLabel}
          />
        </FormField>

        {/* Contact section */}
        <Stack spacing="1" style={{ marginTop: 'var(--ds-spacing-3)' }}>
          <Heading level={4} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {labels.contactInfoHeader}
          </Heading>

          <Stack spacing="3">
            <FormField label={labels.emailLabel}>
              <Textfield
                id="email"
                type="email"
                value={data.email || ''}
                onChange={(e) => handleChange('email', e.target.value)}
                placeholder={labels.emailPlaceholder}
                aria-label={labels.emailLabel}
              />
            </FormField>

            <FormField label={labels.phoneLabel}>
              <Textfield
                id="phone"
                type="tel"
                value={data.phone || ''}
                onChange={(e) => handleChange('phone', e.target.value)}
                placeholder={labels.phonePlaceholder}
                aria-label={labels.phoneLabel}
              />
            </FormField>
          </Stack>
        </Stack>

        {/* Address section */}
        <Stack spacing="1" style={{ marginTop: 'var(--ds-spacing-3)' }}>
          <Heading level={4} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {labels.addressHeader}
          </Heading>

          <Stack spacing="3">
            <FormField label={labels.streetAddressLabel}>
              <Textfield
                id="address"
                value={data.address || ''}
                onChange={(e) => handleChange('address', e.target.value)}
                placeholder={labels.streetAddressPlaceholder}
                aria-label={labels.streetAddressLabel}
              />
            </FormField>

            <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)' }}>
              <FormField label={labels.postalCodeLabel} style={{ flex: '0 0 120px' }}>
                <Textfield
                  id="postal-code"
                  value={data.postalCode || ''}
                  onChange={(e) => handleChange('postalCode', e.target.value)}
                  placeholder={labels.postalCodePlaceholder}
                  aria-label={labels.postalCodeLabel}
                />
              </FormField>

              <FormField label={labels.cityLabel} style={{ flex: '1' }}>
                <Textfield
                  id="city"
                  value={data.city || ''}
                  onChange={(e) => handleChange('city', e.target.value)}
                  placeholder={labels.cityPlaceholder}
                  aria-label={labels.cityLabel}
                />
              </FormField>
            </div>
          </Stack>
        </Stack>
      </Stack>
    </Stack>
  );
}

export type { BasicData };
