/**
 * Wizard Components
 *
 * Generalized wizard components for multi-step forms
 * Based on patterns from apps/minside/src/features/resource-objects/components/wizard/
 */

import React from 'react';
import { Button, Heading, Paragraph } from '@digdir/designsystemet-react';
import { CheckIcon, ChevronLeftIcon, ChevronRightIcon } from '../../primitives/icons';
import { Stack, HorizontalLayout } from '../../primitives';
import { cn } from '../../utils';
import { typography, borders } from '../../tokens';

export interface WizardStep {
  /** Unique step identifier */
  id: string;
  /** Step label (must be translated by caller) */
  label: string;
  /** Optional step icon */
  icon?: React.ReactNode;
  /** Whether step is optional */
  optional?: boolean;
}

export interface WizardProps {
  /** Array of wizard steps */
  steps: WizardStep[];
  /** Current step index */
  currentStep: number;
  /** Step change handler */
  onStepChange: (stepIndex: number) => void;
  /** Step content renderer */
  renderStep: (step: WizardStep, stepIndex: number) => React.ReactNode;
  /** Whether wizard is loading */
  isLoading?: boolean;
  /** Loading message (must be translated by caller) */
  loadingMessage?: string;
  /** Whether current step can proceed */
  canGoNext?: boolean;
  /** Whether current step can go back */
  canGoPrev?: boolean;
  /** Whether current step is the last step */
  isLastStep?: boolean;
  /** Step errors by step ID */
  errors?: Record<string, string[]>;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export interface WizardStepperProps {
  /** Array of wizard steps */
  steps: WizardStep[];
  /** Current step index */
  currentStep: number;
  /** Step click handler (for navigating to completed steps) */
  onStepClick?: (stepIndex: number) => void;
  /** Wizard title (must be translated by caller) */
  title?: string;
  /** Whether to show step counter */
  showStepCounter?: boolean;
  /** Step errors by step ID */
  errors?: Record<string, string[]>;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

export interface WizardNavigationProps {
  /** Whether can go to previous step */
  canGoPrev: boolean;
  /** Whether can go to next step */
  canGoNext: boolean;
  /** Whether current step is the last step */
  isLastStep: boolean;
  /** Previous step handler */
  onPrev: () => void;
  /** Next step handler */
  onNext: () => void;
  /** Cancel handler */
  onCancel: () => void;
  /** Save draft handler */
  onSaveDraft?: () => void;
  /** Complete handler (for last step) */
  onComplete?: () => void;
  /** Previous button label (must be translated by caller) */
  prevLabel?: string;
  /** Next button label (must be translated by caller) */
  nextLabel?: string;
  /** Cancel button label (must be translated by caller) */
  cancelLabel?: string;
  /** Save draft button label (must be translated by caller) */
  saveDraftLabel?: string;
  /** Complete button label (must be translated by caller) */
  completeLabel?: string;
  /** Whether navigation is disabled (e.g., during save) */
  disabled?: boolean;
  /** Custom class name */
  className?: string;
  /** Custom styles */
  style?: React.CSSProperties;
}

function getStepState(
  stepIndex: number,
  currentStep: number,
  stepId: string,
  errors?: Record<string, string[]>
): 'completed' | 'active' | 'future' | 'error' {
  if (errors?.[stepId]?.length) return 'error';
  if (stepIndex < currentStep) return 'completed';
  if (stepIndex === currentStep) return 'active';
  return 'future';
}

export function WizardStepper({
  steps,
  currentStep,
  onStepClick,
  title,
  showStepCounter = true,
  errors,
  className,
  style,
}: WizardStepperProps): React.ReactElement {
  return (
    <Stack
      className={cn('wizard-stepper', className)}
      style={{
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderBottom: '1px solid var(--ds-color-neutral-border-default)',
        padding: 'var(--ds-spacing-6) var(--ds-spacing-8)',
        overflowX: 'auto',
        ...style,
      }}
    >
      <Stack style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        {(title || showStepCounter) && (
          <HorizontalLayout
            justify="space-between"
            align="center"
            style={{ marginBottom: 'var(--ds-spacing-4)' }}
          >
            {title && (
              <Heading level={3} data-size="xs" style={{ margin: 0 }}>
                {title}
              </Heading>
            )}
            {showStepCounter && (
              <Stack
                as="span"
                style={{
                  backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
                  padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
                  borderRadius: 'var(--ds-border-radius-sm)',
                  fontSize: 'var(--ds-font-size-xs)',
                }}
              >
                {`Steg ${currentStep + 1} av ${steps.length}`}
              </Stack>
            )}
          </HorizontalLayout>
        )}

        {/* Steps */}
        <HorizontalLayout align="center" gap="var(--ds-spacing-2)" style={{ position: 'relative' }}>
          {steps.map((step, index) => {
            const state = getStepState(index, currentStep, step.id, errors);
            const isLast = index === steps.length - 1;
            const isClickable = onStepClick && index < currentStep;

            const circleStyle: React.CSSProperties = {
              width: 'var(--ds-sizing-10)',
              height: 'var(--ds-sizing-10)',
              borderRadius: 'var(--ds-border-radius-full)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontWeight: typography.fontWeight.semibold,
              fontSize: 'var(--ds-font-size-sm)',
              border: `${borders.width.medium} solid`,
              transition: 'all 0.2s ease',
            };

            if (state === 'completed') {
              circleStyle.backgroundColor = 'var(--ds-color-success-surface-default)';
              circleStyle.borderColor = 'var(--ds-color-success-border-default)';
              circleStyle.color = 'var(--ds-color-success-text-default)';
            } else if (state === 'active') {
              circleStyle.backgroundColor = 'var(--ds-color-brand-surface-default)';
              circleStyle.borderColor = 'var(--ds-color-brand-border-default)';
              circleStyle.color = 'var(--ds-color-brand-text-default)';
            } else if (state === 'error') {
              circleStyle.backgroundColor = 'var(--ds-color-danger-surface-default)';
              circleStyle.borderColor = 'var(--ds-color-danger-border-default)';
              circleStyle.color = 'var(--ds-color-danger-text-default)';
            } else {
              circleStyle.backgroundColor = 'var(--ds-color-neutral-surface-default)';
              circleStyle.borderColor = 'var(--ds-color-neutral-border-default)';
              circleStyle.color = 'var(--ds-color-neutral-text-subtle)';
            }

            return (
              <React.Fragment key={step.id}>
                <Stack
                  align="center"
                  gap="var(--ds-spacing-1)"
                  style={{ minWidth: 'var(--ds-sizing-20)' }}
                >
                  <Stack
                    align="center"
                    justify="center"
                    onClick={isClickable ? () => onStepClick(index) : undefined}
                    role={isClickable ? 'button' : undefined}
                    tabIndex={isClickable ? 0 : undefined}
                    onKeyDown={
                      isClickable
                        ? (e) => {
                            if (e.key === 'Enter' || e.key === ' ') {
                              e.preventDefault();
                              onStepClick(index);
                            }
                          }
                        : undefined
                    }
                    style={{
                      ...circleStyle,
                      cursor: isClickable ? 'pointer' : 'default',
                    }}
                  >
                    {state === 'completed' ? (
                      <CheckIcon size={20} />
                    ) : step.icon ? (
                      step.icon
                    ) : (
                      <Stack as="span">{index + 1}</Stack>
                    )}
                  </Stack>
                  <Paragraph
                    data-size="xs"
                    style={{
                      margin: 0,
                      textAlign: 'center',
                      color:
                        state === 'active'
                          ? 'var(--ds-color-brand-text-default)'
                          : state === 'error'
                            ? 'var(--ds-color-danger-text-default)'
                            : 'var(--ds-color-neutral-text-subtle)',
                      fontWeight:
                        state === 'active'
                          ? typography.fontWeight.semibold
                          : typography.fontWeight.regular,
                    }}
                  >
                    {step.label}
                  </Paragraph>
                </Stack>
                {!isLast && (
                  <Stack
                    style={{
                      flex: 1,
                      height: 'var(--ds-border-width-medium)',
                      backgroundColor:
                        index < currentStep
                          ? 'var(--ds-color-success-border-default)'
                          : 'var(--ds-color-neutral-border-subtle)',
                      margin: '0 var(--ds-spacing-2)',
                      minWidth: 'var(--ds-sizing-10)',
                    }}
                  />
                )}
              </React.Fragment>
            );
          })}
        </HorizontalLayout>
      </Stack>
    </Stack>
  );
}

export function WizardNavigation({
  canGoPrev,
  canGoNext,
  isLastStep,
  onPrev,
  onNext,
  onCancel,
  onSaveDraft,
  onComplete,
  prevLabel = 'Forrige',
  nextLabel = 'Neste',
  cancelLabel = 'Avbryt',
  saveDraftLabel = 'Lagre utkast',
  completeLabel = 'Fullfør',
  disabled = false,
  className,
  style,
}: WizardNavigationProps): React.ReactElement {
  return (
    <HorizontalLayout
      className={cn('wizard-navigation', className)}
      justify="space-between"
      align="center"
      style={{
        padding: 'var(--ds-spacing-6) var(--ds-spacing-8)',
        borderTop: '1px solid var(--ds-color-neutral-border-default)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        ...style,
      }}
    >
      <HorizontalLayout gap="var(--ds-spacing-3)">
        <Button variant="tertiary" onClick={onCancel} disabled={disabled}>
          {cancelLabel}
        </Button>
        {onSaveDraft && (
          <Button variant="secondary" onClick={onSaveDraft} disabled={disabled}>
            {saveDraftLabel}
          </Button>
        )}
      </HorizontalLayout>

      <HorizontalLayout gap="var(--ds-spacing-3)">
        {canGoPrev && (
          <Button variant="secondary" onClick={onPrev} disabled={disabled}>
            <ChevronLeftIcon />
            {prevLabel}
          </Button>
        )}
        {isLastStep ? (
          onComplete && (
            <Button variant="primary" onClick={onComplete} disabled={disabled || !canGoNext}>
              {completeLabel}
            </Button>
          )
        ) : (
          <Button variant="primary" onClick={onNext} disabled={disabled || !canGoNext}>
            {nextLabel}
            <ChevronRightIcon />
          </Button>
        )}
      </HorizontalLayout>
    </HorizontalLayout>
  );
}

export function Wizard({
  steps,
  currentStep,
  onStepChange,
  renderStep,
  isLoading = false,
  loadingMessage,
  canGoNext: _canGoNext = true,
  canGoPrev: _canGoPrev = true,
  isLastStep: _isLastStep = false,
  errors,
  className,
  style,
}: WizardProps): React.ReactElement {
  const currentStepData = steps[currentStep];

  if (isLoading) {
    return (
      <Stack
        align="center"
        justify="center"
        gap="var(--ds-spacing-4)"
        style={{ padding: 'var(--ds-spacing-10)' }}
      >
        <Paragraph>{loadingMessage || 'Laster...'}</Paragraph>
      </Stack>
    );
  }

  return (
    <Stack className={cn('wizard', className)} style={{ height: '100%', ...style }}>
      {/* Stepper */}
      <WizardStepper
        steps={steps}
        currentStep={currentStep}
        onStepClick={onStepChange}
        errors={errors}
      />

      {/* Step Content */}
      <Stack
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: 'var(--ds-spacing-8)',
        }}
      >
        <Stack style={{ maxWidth: '800px', margin: '0 auto' }}>
          {currentStepData && renderStep(currentStepData, currentStep)}
        </Stack>
      </Stack>
    </Stack>
  );
}
