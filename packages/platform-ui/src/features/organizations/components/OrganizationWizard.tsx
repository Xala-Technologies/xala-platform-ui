/**
 * OrganizationWizard Component
 *
 * Pure presentational multi-step form for creating and configuring organizations.
 * Orchestrates BasicStep, BrandingStep, and RolesStep.
 *
 * @module @xala-technologies/platform-ui/features/organizations
 */

import * as React from 'react';
import { useState } from 'react';
import { Button, Heading, Paragraph, Spinner, Card } from '@digdir/designsystemet-react';
import { Stack } from '@xala-technologies/platform-ui';
import type { BasicStepLabels } from './BasicStep';
import type { BrandingStepLabels } from './BrandingStep';
import type { RolesStepLabels } from './RolesStep';
import { BasicStep } from './BasicStep';
import { BrandingStep } from './BrandingStep';
import { RolesStep } from './RolesStep';
import type { OrganizationWizardData, OrganizationWizardStepId, RoleDefinition } from '../types';

// =============================================================================
// Labels Interface
// =============================================================================

export interface OrganizationWizardLabels {
  // Page headers
  createTitle: string;
  editTitle: string;
  createDescription: string;
  editDescription: string;

  // Step labels
  stepBasics: string;
  stepBranding: string;
  stepRoles: string;

  // Progress
  stepProgress: string; // "Step {current} of {total}"
  required: string; // "*Required"

  // Navigation
  next: string;
  previous: string;
  complete: string;
  cancel: string;
  saveDraft: string;
  saving: string;

  // Status messages
  changesSaved: string;
  saveFailed: string;
  unknownStep: string;

  // Validation messages
  nameRequired: string;
  invalidEmail: string;
  invalidOrgNumber: string;
  invalidPostalCode: string;

  // Step-specific labels
  basic: BasicStepLabels;
  branding: BrandingStepLabels;
  roles: RolesStepLabels;
}

// =============================================================================
// Types
// =============================================================================

export interface OrganizationWizardProps {
  /** Whether editing existing organization */
  isEditMode?: boolean;
  /** Initial data for the wizard */
  initialData?: Partial<OrganizationWizardData>;
  /** Available roles for selection */
  availableRoles: RoleDefinition[];
  /** Callback when wizard completes */
  onComplete?: (data: OrganizationWizardData) => Promise<void>;
  /** Callback when draft is saved */
  onSaveDraft?: (data: OrganizationWizardData) => Promise<void>;
  /** Callback when wizard is cancelled */
  onCancel?: () => void;
  /** UI labels for all text content */
  labels: OrganizationWizardLabels;
}

// =============================================================================
// Component
// =============================================================================

/**
 * Multi-step organization creation/editing wizard.
 *
 * @example
 * ```tsx
 * import { OrganizationWizard } from '@xala-technologies/platform-ui/features/organizations';
 *
 * function CreateOrganizationPage() {
 *   const availableRoles = [
 *     {
 *       id: 'admin',
 *       name: 'Administrator',
 *       description: 'Full access',
 *       permissions: ['organization:manage'],
 *     },
 *     // ... more roles
 *   ];
 *
 *   const labels = {
 *     createTitle: 'Create Organization',
 *     // ... all other labels
 *   };
 *
 *   const handleComplete = async (data) => {
 *     await organizationService.create(data);
 *     navigate('/organizations');
 *   };
 *
 *   return (
 *     <OrganizationWizard
 *       availableRoles={availableRoles}
 *       labels={labels}
 *       onComplete={handleComplete}
 *       onCancel={() => navigate(-1)}
 *     />
 *   );
 * }
 * ```
 */
export function OrganizationWizard({
  isEditMode = false,
  initialData = {},
  availableRoles,
  onComplete,
  onSaveDraft,
  onCancel,
  labels,
}: OrganizationWizardProps): React.ReactElement {
  // State management
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<OrganizationWizardData>({
    name: initialData.name || '',
    actorType: initialData.actorType || 'municipality',
    organizationNumber: initialData.organizationNumber,
    email: initialData.email,
    phone: initialData.phone,
    address: initialData.address,
    city: initialData.city,
    postalCode: initialData.postalCode,
    branding: initialData.branding || {
      primaryColor: '#0062BA',
      secondaryColor: '#004C93',
    },
    roles: initialData.roles || ['admin'],
  });
  const [errors, setErrors] = useState<Record<OrganizationWizardStepId, string[]>>({
    basics: [],
    branding: [],
    roles: [],
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const steps: Array<{ id: OrganizationWizardStepId; label: string; required: boolean }> = [
    { id: 'basics', label: labels.stepBasics, required: true },
    { id: 'branding', label: labels.stepBranding, required: false },
    { id: 'roles', label: labels.stepRoles, required: false },
  ];

  const canGoNext = currentStep < steps.length - 1;
  const canGoPrev = currentStep > 0;
  const isLastStep = currentStep === steps.length - 1;
  const currentStepId = steps[currentStep]?.id || 'basics';
  const stepErrors = errors[currentStepId] || [];

  // Navigation
  const goToStep = (step: number) => {
    if (step >= 0 && step < steps.length) {
      setCurrentStep(step);
    }
  };

  const validateCurrentStep = (): boolean => {
    const validationErrors: string[] = [];

    if (currentStepId === 'basics') {
      if (!formData.name?.trim()) {
        validationErrors.push(labels.nameRequired);
      }
      if (formData.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        validationErrors.push(labels.invalidEmail);
      }
      if (
        formData.organizationNumber &&
        !/^\d{9}$/.test(formData.organizationNumber.replace(/\s/g, ''))
      ) {
        validationErrors.push(labels.invalidOrgNumber);
      }
      if (formData.postalCode && !/^\d{4}$/.test(formData.postalCode)) {
        validationErrors.push(labels.invalidPostalCode);
      }
    }

    setErrors({ ...errors, [currentStepId]: validationErrors });
    return validationErrors.length === 0;
  };

  const nextStep = () => {
    if (!validateCurrentStep()) {
      return;
    }

    if (canGoNext) {
      setCurrentStep((prev) => prev + 1);
      setErrors({ ...errors, [currentStepId]: [] });
    }
  };

  const prevStep = () => {
    if (canGoPrev) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  // Data management
  const updateFormData = (data: Partial<OrganizationWizardData>) => {
    setFormData((prev) => ({ ...prev, ...data }));
  };

  // Actions
  const handleSaveDraft = async () => {
    setSaveStatus('idle');
    setIsSaving(true);
    try {
      await onSaveDraft?.(formData);
      setSaveStatus('success');
      setTimeout(() => setSaveStatus('idle'), 3000);
    } catch {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleComplete = async () => {
    if (!validateCurrentStep()) {
      return;
    }

    setIsSaving(true);
    try {
      await onComplete?.(formData);
    } catch {
      setSaveStatus('error');
    } finally {
      setIsSaving(false);
    }
  };

  const handleCancel = () => {
    onCancel?.();
  };

  // Render step content
  const renderStep = () => {
    switch (currentStepId) {
      case 'basics':
        return (
          <div style={{ padding: 'var(--ds-spacing-6)' }}>
            <BasicStep
              data={{
                name: formData.name,
                organizationNumber: formData.organizationNumber,
                actorType: formData.actorType,
                email: formData.email,
                phone: formData.phone,
                address: formData.address,
                city: formData.city,
                postalCode: formData.postalCode,
              }}
              onChange={(basicData) => updateFormData(basicData)}
              labels={labels.basic}
              errors={stepErrors}
            />
          </div>
        );
      case 'branding':
        return (
          <div style={{ padding: 'var(--ds-spacing-6)' }}>
            <BrandingStep
              data={formData.branding || {}}
              onChange={(branding) => updateFormData({ branding })}
              labels={labels.branding}
              errors={stepErrors}
            />
          </div>
        );
      case 'roles':
        return (
          <div style={{ padding: 'var(--ds-spacing-6)' }}>
            <RolesStep
              availableRoles={availableRoles}
              selectedRoles={formData.roles || ['admin']}
              onChange={(roles) => updateFormData({ roles })}
              labels={labels.roles}
              errors={stepErrors}
            />
          </div>
        );
      default:
        return (
          <div style={{ padding: 'var(--ds-spacing-6)', textAlign: 'center' }}>
            <Paragraph>{labels.unknownStep}</Paragraph>
          </div>
        );
    }
  };

  return (
    <Stack spacing="6">
      {/* Page header */}
      <Stack spacing="2">
        <Heading level={1} data-size="lg">
          {isEditMode ? labels.editTitle : labels.createTitle}
        </Heading>
        <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
          {isEditMode ? labels.editDescription : labels.createDescription}
        </Paragraph>
      </Stack>

      {/* Stepper */}
      <Card
        style={{
          padding: 'var(--ds-spacing-5)',
          backgroundColor: 'var(--ds-color-neutral-background-default)',
          border: '1px solid var(--ds-color-neutral-border-subtle)',
        }}
      >
        <Stack
          direction="horizontal"
          spacing="2"
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--ds-spacing-5)',
            paddingBottom: 'var(--ds-spacing-4)',
            borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Heading level={2} data-size="sm">
            {isEditMode ? labels.editTitle : labels.createTitle}
          </Heading>
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            {labels.stepProgress
              .replace('{current}', String(currentStep + 1))
              .replace('{total}', String(steps.length))}
          </Paragraph>
        </Stack>

        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          {steps.map((step, index) => {
            const isActive = index === currentStep;
            const isCompleted = index < currentStep;
            const isLast = index === steps.length - 1;
            const stepHasErrors = errors[step.id] && errors[step.id].length > 0;

            return (
              <div
                key={step.id}
                style={{
                  flex: isLast ? '0 0 auto' : 1,
                  display: 'flex',
                  alignItems: 'flex-start',
                }}
              >
                <Button
                  type="button"
                  variant="tertiary"
                  data-color="neutral"
                  onClick={() => goToStep(index)}
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    gap: 'var(--ds-spacing-2)',
                    cursor: 'pointer',
                    minWidth: '80px',
                    padding: 'var(--ds-spacing-1)',
                    borderRadius: 'var(--ds-border-radius-md)',
                    transition: 'background-color 0.2s ease',
                    backgroundColor: 'transparent',
                    border: 'none',
                  }}
                >
                  <div
                    style={{
                      width: '48px',
                      height: '48px',
                      borderRadius: 'var(--ds-border-radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: stepHasErrors
                        ? 'var(--ds-color-danger-surface-default)'
                        : isActive
                          ? 'var(--ds-color-accent-base-default)'
                          : isCompleted
                            ? 'var(--ds-color-success-surface-default)'
                            : 'var(--ds-color-neutral-surface-default)',
                      color: stepHasErrors
                        ? 'var(--ds-color-danger-text-default)'
                        : isActive
                          ? 'var(--ds-color-neutral-background-default)'
                          : isCompleted
                            ? 'var(--ds-color-success-text-default)'
                            : 'var(--ds-color-neutral-text-subtle)',
                      border: stepHasErrors
                        ? '2px solid var(--ds-color-danger-border-default)'
                        : isActive
                          ? '2px solid var(--ds-color-accent-base-default)'
                          : isCompleted
                            ? '2px solid var(--ds-color-success-border-default)'
                            : '2px solid var(--ds-color-neutral-border-subtle)',
                      transition: 'all 0.3s ease',
                      fontWeight: 'var(--ds-font-weight-semibold)',
                      fontSize: 'var(--ds-font-size-sm)',
                    }}
                  >
                    {isCompleted ? '✓' : index + 1}
                  </div>
                  <Paragraph
                    data-size="xs"
                    style={{
                      fontWeight: isActive
                        ? 'var(--ds-font-weight-semibold)'
                        : 'var(--ds-font-weight-regular)',
                      color: stepHasErrors
                        ? 'var(--ds-color-danger-text-default)'
                        : isActive
                          ? 'var(--ds-color-accent-text-default)'
                          : 'var(--ds-color-neutral-text-default)',
                      textAlign: 'center',
                      margin: 0,
                    }}
                  >
                    {step.label}
                  </Paragraph>
                  {step.required && (
                    <Paragraph
                      data-size="xs"
                      style={{
                        color: 'var(--ds-color-danger-text-default)',
                        margin: 0,
                        fontSize: 'var(--ds-font-size-2xs)',
                      }}
                    >
                      *{labels.required}
                    </Paragraph>
                  )}
                </Button>

                {!isLast && (
                  <div
                    style={{
                      flex: 1,
                      height: '2px',
                      backgroundColor: isCompleted
                        ? 'var(--ds-color-success-border-default)'
                        : 'var(--ds-color-neutral-border-subtle)',
                      marginTop: '24px',
                      transition: 'background-color 0.3s ease',
                    }}
                  />
                )}
              </div>
            );
          })}
        </div>
      </Card>

      {/* Step content */}
      <Card
        style={{
          backgroundColor: 'var(--ds-color-neutral-background-default)',
          border: '1px solid var(--ds-color-neutral-border-subtle)',
          minHeight: '400px',
        }}
      >
        {renderStep()}
      </Card>

      {/* Save status notification */}
      {saveStatus !== 'idle' && (
        <Card
          style={{
            padding: 'var(--ds-spacing-3)',
            backgroundColor:
              saveStatus === 'success'
                ? 'var(--ds-color-success-surface-default)'
                : 'var(--ds-color-danger-surface-default)',
            border: `1px solid ${
              saveStatus === 'success'
                ? 'var(--ds-color-success-border-default)'
                : 'var(--ds-color-danger-border-default)'
            }`,
          }}
        >
          <Stack direction="horizontal" spacing="2" style={{ alignItems: 'center' }}>
            <span style={{ fontSize: 'var(--ds-font-size-heading-sm)' }}>
              {saveStatus === 'success' ? '✓' : '✕'}
            </span>
            <Paragraph
              data-size="sm"
              style={{
                margin: 0,
                color:
                  saveStatus === 'success'
                    ? 'var(--ds-color-success-text-default)'
                    : 'var(--ds-color-danger-text-default)',
              }}
            >
              {saveStatus === 'success' ? labels.changesSaved : labels.saveFailed}
            </Paragraph>
          </Stack>
        </Card>
      )}

      {/* Navigation */}
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
          style={{ justifyContent: 'space-between', alignItems: 'center' }}
        >
          <Stack direction="horizontal" spacing="2">
            <Button
              type="button"
              variant="secondary"
              onClick={handleCancel}
              disabled={isSaving}
              aria-label={labels.cancel}
            >
              {labels.cancel}
            </Button>
            {onSaveDraft && (
              <Button
                type="button"
                variant="secondary"
                onClick={handleSaveDraft}
                disabled={isSaving}
                aria-label={labels.saveDraft}
              >
                {isSaving && <Spinner aria-label={labels.saving} data-size="sm" />}
                {!isSaving && labels.saveDraft}
              </Button>
            )}
          </Stack>

          <Stack direction="horizontal" spacing="2">
            {canGoPrev && (
              <Button
                type="button"
                variant="secondary"
                onClick={prevStep}
                disabled={isSaving}
                aria-label={labels.previous}
              >
                ← {labels.previous}
              </Button>
            )}
            {!isLastStep ? (
              <Button
                type="button"
                variant="primary"
                onClick={nextStep}
                disabled={isSaving}
                aria-label={labels.next}
              >
                {labels.next} →
              </Button>
            ) : (
              <Button
                type="button"
                variant="primary"
                onClick={handleComplete}
                disabled={isSaving}
                aria-label={labels.complete}
              >
                {isSaving && <Spinner aria-label={labels.saving} data-size="sm" />}
                {!isSaving && labels.complete}
              </Button>
            )}
          </Stack>
        </Stack>
      </Card>
    </Stack>
  );
}
