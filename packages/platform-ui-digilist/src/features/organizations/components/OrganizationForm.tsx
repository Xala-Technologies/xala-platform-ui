/**
 * OrganizationForm Component
 *
 * Pure presentational form for creating and editing organizations with validation.
 * Used for quick organization creation without the wizard workflow.
 *
 * @module @xala-technologies/platform-ui/features/organizations
 */

import * as React from 'react';
import { useState, useEffect } from 'react';
import {
  Textfield,
  Select,
  Heading,
  Paragraph,
  Button,
  Spinner,
  Card,
} from '@xala-technologies/platform-ui-core';
import { Stack, FormField } from '@xala-technologies/platform-ui-core';
import type { OrganizationFormData, ActorType, OrganizationVM } from '../types';

// =============================================================================
// Labels Interface
// =============================================================================

export interface OrganizationFormLabels {
  // Section titles
  basicInfoTitle: string;
  contactInfo: string;
  address: string;

  // Field labels
  name: string;
  namePlaceholder: string;
  nameDescription: string;
  type: string;
  typeDescription: string;
  organizationNumber: string;
  organizationNumberDescription: string;
  email: string;
  emailPlaceholder: string;
  emailDescription: string;
  phone: string;
  phonePlaceholder: string;
  phoneDescription: string;
  streetAddress: string;
  streetAddressPlaceholder: string;
  streetAddressDescription: string;
  postalCode: string;
  city: string;
  cityPlaceholder: string;

  // Actor types
  actorTypePrivate: string;
  actorTypeBusiness: string;
  actorTypeSportsClub: string;
  actorTypeYouthOrganization: string;
  actorTypeSchool: string;
  actorTypeMunicipality: string;

  // Actions
  saveChanges: string;
  createOrganization: string;
  cancel: string;

  // Validation
  nameRequired: string;
  invalidEmail: string;
  invalidOrgNumber: string;
  invalidPostalCode: string;
}

// =============================================================================
// Types
// =============================================================================

export interface OrganizationFormProps {
  /** Existing organization for edit mode */
  organization?: OrganizationVM | null;
  /** Callback when form is submitted */
  onSubmit: (data: OrganizationFormData) => Promise<void>;
  /** Callback when form is cancelled */
  onCancel: () => void;
  /** UI labels for all text content */
  labels: OrganizationFormLabels;
}

// =============================================================================
// Component
// =============================================================================

/**
 * Organization form for creating and editing organizations.
 *
 * @example
 * ```tsx
 * import { OrganizationForm } from '@xala-technologies/platform-ui/features/organizations';
 *
 * function CreateOrganizationPage() {
 *   const labels = {
 *     basicInfoTitle: 'Basic Information',
 *     name: 'Organization Name',
 *     // ... all other labels
 *   };
 *
 *   const handleSubmit = async (data) => {
 *     await organizationService.create(data);
 *   };
 *
 *   return (
 *     <OrganizationForm
 *       labels={labels}
 *       onSubmit={handleSubmit}
 *       onCancel={() => navigate(-1)}
 *     />
 *   );
 * }
 * ```
 */
export function OrganizationForm({
  organization,
  onSubmit,
  onCancel,
  labels,
}: OrganizationFormProps): React.ReactElement {
  const [formData, setFormData] = useState<OrganizationFormData>({
    name: '',
    actorType: 'business',
    organizationNumber: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Pre-fill form if editing
  useEffect(() => {
    if (organization) {
      setFormData({
        name: organization.name,
        actorType: organization.actorType,
        organizationNumber: organization.organizationNumber || '',
        email: organization.email || '',
        phone: organization.phone || '',
        address: organization.address || '',
        city: organization.city || '',
        postalCode: organization.postalCode || '',
      });
    }
  }, [organization]);

  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = labels.nameRequired;
    }

    if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = labels.invalidEmail;
    }

    if (
      formData.organizationNumber &&
      !/^\d{9}$/.test(formData.organizationNumber.replace(/\s/g, ''))
    ) {
      newErrors.organizationNumber = labels.invalidOrgNumber;
    }

    if (formData.postalCode && !/^\d{4}$/.test(formData.postalCode)) {
      newErrors.postalCode = labels.invalidPostalCode;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    try {
      // Clean up empty strings
      const cleanData: OrganizationFormData = {
        ...formData,
        organizationNumber: formData.organizationNumber?.trim() || undefined,
        email: formData.email?.trim() || undefined,
        phone: formData.phone?.trim() || undefined,
        address: formData.address?.trim() || undefined,
        city: formData.city?.trim() || undefined,
        postalCode: formData.postalCode?.trim() || undefined,
      };

      await onSubmit(cleanData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (field: keyof OrganizationFormData) => (value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="5">
        {/* Basic Information */}
        <Card
          style={{
            padding: 'var(--ds-spacing-5)',
            backgroundColor: 'var(--ds-color-neutral-background-default)',
            border: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Stack spacing="4">
            <Heading level={3} data-size="sm">
              {labels.basicInfoTitle}
            </Heading>

            <FormField label={labels.name} required error={errors.name}>
              <Textfield
                value={formData.name}
                onChange={(e) => handleChange('name')(e.target.value)}
                placeholder={labels.namePlaceholder}
                aria-label={labels.name}
              />
            </FormField>

            <FormField label={labels.type} required>
              <Select
                value={formData.actorType}
                onChange={(e) => handleChange('actorType')(e.target.value as ActorType)}
              >
                <option value="private">{labels.actorTypePrivate}</option>
                <option value="business">{labels.actorTypeBusiness}</option>
                <option value="sports_club">{labels.actorTypeSportsClub}</option>
                <option value="youth_organization">{labels.actorTypeYouthOrganization}</option>
                <option value="school">{labels.actorTypeSchool}</option>
                <option value="municipality">{labels.actorTypeMunicipality}</option>
              </Select>
            </FormField>

            <FormField label={labels.organizationNumber} error={errors.organizationNumber}>
              <Textfield
                value={formData.organizationNumber || ''}
                onChange={(e) => handleChange('organizationNumber')(e.target.value)}
                placeholder="123456789"
                aria-label={labels.organizationNumber}
                maxLength={9}
              />
            </FormField>
          </Stack>
        </Card>

        {/* Contact Information */}
        <Card
          style={{
            padding: 'var(--ds-spacing-5)',
            backgroundColor: 'var(--ds-color-neutral-background-default)',
            border: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Stack spacing="4">
            <Heading level={3} data-size="sm">
              {labels.contactInfo}
            </Heading>

            <FormField label={labels.email} error={errors.email}>
              <Textfield
                type="email"
                value={formData.email || ''}
                onChange={(e) => handleChange('email')(e.target.value)}
                placeholder={labels.emailPlaceholder}
                aria-label={labels.email}
              />
            </FormField>

            <FormField label={labels.phone}>
              <Textfield
                type="tel"
                value={formData.phone || ''}
                onChange={(e) => handleChange('phone')(e.target.value)}
                placeholder={labels.phonePlaceholder}
                aria-label={labels.phone}
              />
            </FormField>
          </Stack>
        </Card>

        {/* Address */}
        <Card
          style={{
            padding: 'var(--ds-spacing-5)',
            backgroundColor: 'var(--ds-color-neutral-background-default)',
            border: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Stack spacing="4">
            <Heading level={3} data-size="sm">
              {labels.address}
            </Heading>

            <FormField label={labels.streetAddress}>
              <Textfield
                value={formData.address || ''}
                onChange={(e) => handleChange('address')(e.target.value)}
                placeholder={labels.streetAddressPlaceholder}
                aria-label={labels.streetAddress}
              />
            </FormField>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: 'var(--ds-spacing-3)',
              }}
            >
              <FormField label={labels.postalCode} error={errors.postalCode}>
                <Textfield
                  value={formData.postalCode || ''}
                  onChange={(e) => handleChange('postalCode')(e.target.value)}
                  placeholder="0001"
                  aria-label={labels.postalCode}
                  maxLength={4}
                />
              </FormField>

              <FormField label={labels.city}>
                <Textfield
                  value={formData.city || ''}
                  onChange={(e) => handleChange('city')(e.target.value)}
                  placeholder={labels.cityPlaceholder}
                  aria-label={labels.city}
                />
              </FormField>
            </div>
          </Stack>
        </Card>

        {/* Actions */}
        <Card
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            border: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Stack
            direction="horizontal"
            spacing="2"
            style={{ justifyContent: 'flex-end', alignItems: 'center' }}
          >
            <Button type="button" variant="secondary" onClick={onCancel} disabled={isSubmitting}>
              {labels.cancel}
            </Button>
            <Button type="submit" variant="primary" disabled={isSubmitting}>
              {isSubmitting && <Spinner aria-label={labels.saveChanges} data-size="sm" />}
              {!isSubmitting && (organization ? labels.saveChanges : labels.createOrganization)}
            </Button>
          </Stack>
        </Card>
      </Stack>
    </form>
  );
}
