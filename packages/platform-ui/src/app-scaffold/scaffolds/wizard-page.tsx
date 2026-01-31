/**
 * Wizard Page Scaffold
 *
 * Creates multi-step wizard flows with validation and navigation.
 * Pure presentational - no external dependencies.
 */

import React, { useState, useCallback } from 'react';
import type { RouteObject } from 'react-router-dom';
import type { CreateWizardOptions, WizardStep } from '../types';

/**
 * Props for the wizard component
 */
interface WizardProps {
  name: string;
  steps: WizardStep[];
  onComplete: (data: unknown) => void | Promise<void>;
  onCancel?: () => void;
}

/**
 * Wizard component with step navigation and validation
 */
function WizardComponent({ name, steps, onComplete, onCancel }: WizardProps): React.ReactElement {
  const [currentStep, setCurrentStep] = useState(0);
  const [data, setData] = useState<Record<string, unknown>>({});
  const [isValidating, setIsValidating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const step = steps[currentStep];
  const isFirstStep = currentStep === 0;
  const isLastStep = currentStep === steps.length - 1;

  const handleNext = useCallback(async () => {
    if (step.validation) {
      setIsValidating(true);
      setError(null);
      try {
        const isValid = await step.validation(data);
        if (!isValid) {
          setError('Please complete all required fields');
          setIsValidating(false);
          return;
        }
      } catch (e) {
        setError(e instanceof Error ? e.message : 'Validation failed');
        setIsValidating(false);
        return;
      }
      setIsValidating(false);
    }

    if (isLastStep) {
      await onComplete(data);
    } else {
      setCurrentStep(prev => prev + 1);
    }
  }, [step, data, isLastStep, onComplete]);

  const handleBack = useCallback(() => {
    if (!isFirstStep) {
      setCurrentStep(prev => prev - 1);
    }
  }, [isFirstStep]);

  return React.createElement(
    'div',
    {
      'data-testid': `wizard-${name}`,
      style: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: 'var(--ds-spacing-6)',
      },
    },
    // Progress bar
    React.createElement(
      'div',
      {
        className: 'wizard-progress',
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          marginBottom: 'var(--ds-spacing-6)',
        },
      },
      steps.map((s, i) =>
        React.createElement(
          'div',
          {
            key: s.id,
            className: `wizard-step ${i === currentStep ? 'active' : ''} ${i < currentStep ? 'completed' : ''}`,
            style: {
              flex: 1,
              textAlign: 'center',
              padding: 'var(--ds-spacing-2)',
              borderBottom: `3px solid ${
                i <= currentStep
                  ? 'var(--ds-color-accent-base-default)'
                  : 'var(--ds-color-neutral-border-subtle)'
              }`,
              color: i === currentStep
                ? 'var(--ds-color-accent-text-default)'
                : 'var(--ds-color-neutral-text-subtle)',
            },
          },
          React.createElement('span', { className: 'step-number' }, `${i + 1}. `),
          React.createElement('span', { className: 'step-title' }, s.title)
        )
      )
    ),
    // Step content
    React.createElement(
      'div',
      {
        className: 'wizard-content',
        style: {
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          borderRadius: 'var(--ds-border-radius-lg)',
          padding: 'var(--ds-spacing-6)',
          marginBottom: 'var(--ds-spacing-4)',
        },
      },
      React.createElement(
        'h2',
        {
          style: {
            fontSize: 'var(--ds-font-size-xl)',
            fontWeight: 'var(--ds-font-weight-semibold)',
            marginBottom: 'var(--ds-spacing-2)',
          },
        },
        step.title
      ),
      step.description && React.createElement(
        'p',
        {
          style: {
            color: 'var(--ds-color-neutral-text-subtle)',
            marginBottom: 'var(--ds-spacing-4)',
          },
        },
        step.description
      ),
      typeof step.component === 'function'
        ? step.component()
        : step.component,
      error && React.createElement(
        'p',
        {
          style: {
            color: 'var(--ds-color-danger-text-default)',
            marginTop: 'var(--ds-spacing-2)',
          },
        },
        error
      )
    ),
    // Navigation
    React.createElement(
      'div',
      {
        className: 'wizard-navigation',
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          gap: 'var(--ds-spacing-2)',
        },
      },
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: isFirstStep ? onCancel : handleBack,
          style: {
            padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
            borderRadius: 'var(--ds-border-radius-md)',
            border: '1px solid var(--ds-color-neutral-border-default)',
            backgroundColor: 'transparent',
            cursor: 'pointer',
          },
        },
        isFirstStep ? 'Cancel' : 'Back'
      ),
      React.createElement(
        'button',
        {
          type: 'button',
          onClick: handleNext,
          disabled: isValidating,
          style: {
            padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
            borderRadius: 'var(--ds-border-radius-md)',
            border: 'none',
            backgroundColor: 'var(--ds-color-accent-base-default)',
            color: 'var(--ds-color-accent-contrast-default)',
            cursor: isValidating ? 'wait' : 'pointer',
            opacity: isValidating ? 0.7 : 1,
          },
        },
        isValidating ? 'Validating...' : isLastStep ? 'Complete' : 'Next'
      )
    )
  );
}

/**
 * Create a wizard page with steps and navigation
 * 
 * @example
 * ```tsx
 * const onboardingWizard = createWizardPage({
 *   name: 'onboarding',
 *   steps: [
 *     { id: 'profile', title: 'Profile', component: <ProfileStep /> },
 *     { id: 'settings', title: 'Settings', component: <SettingsStep /> },
 *     { id: 'complete', title: 'Complete', component: <CompleteStep /> },
 *   ],
 *   onComplete: async (data) => {
 *     await saveOnboarding(data);
 *     navigate('/dashboard');
 *   },
 * });
 * ```
 */
export function createWizardPage(options: CreateWizardOptions): RouteObject {
  const { name, steps, onComplete, onCancel } = options;
  
  return {
    path: `/wizard/${name}`,
    element: React.createElement(WizardComponent, {
      name,
      steps,
      onComplete,
      onCancel,
    }),
  };
}

export { WizardComponent };
