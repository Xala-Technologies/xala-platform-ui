import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { WizardStepper, UserIcon, CalendarIcon, CheckCircleIcon, Stack } from '../../index';

/**
 * WizardStepper provides a horizontal pill-style stepper for wizards.
 *
 * ## Features
 * - Horizontal pill layout
 * - Step progress indicator
 * - Error state per step
 * - Clickable completed steps
 * - Optional icons
 *
 * ## When to Use
 * - Multi-step forms
 * - Wizards
 * - Step-by-step processes
 */
const meta: Meta<typeof WizardStepper> = {
  title: 'Composed/WizardStepper',
  component: WizardStepper,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
WizardStepper provides a horizontal pill-style stepper for wizards.

## Features
- Horizontal pill layout (compact, mobile-friendly)
- Step progress indicator
- Error state per step
- Clickable completed steps for navigation
- Optional icons per step

## When to Use
- Multi-step forms
- Wizards
- Step-by-step processes
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof WizardStepper>;

// Sample steps
const useSampleSteps = () => {
  const t = useT();
  return [
    { id: 'select', label: t('storybook.wizardStepper.select'), icon: <UserIcon size={16} /> },
    { id: 'details', label: t('storybook.wizardStepper.details'), icon: <CalendarIcon size={16} /> },
    { id: 'confirm', label: t('storybook.wizardStepper.confirm'), icon: <CheckCircleIcon size={16} /> },
  ];
};

/**
 * Default wizard stepper
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const steps = useSampleSteps();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <WizardStepper
          steps={steps}
          currentStep={1}
          labels={{
            stepProgress: t('storybook.wizardStepper.stepProgress'),
            navigation: t('storybook.wizardStepper.navigation'),
            optional: t('storybook.wizardStepper.optional'),
          }}
        />
      </Stack>
    );
  },
};

/**
 * Wizard stepper with progress
 */
export const WithProgress: Story = {
  render: function Render() {
    const t = useT();
    const steps = useSampleSteps();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <WizardStepper
          steps={steps}
          currentStep={1}
          showProgress
          labels={{
            stepProgress: t('storybook.wizardStepper.stepProgress'),
            navigation: t('storybook.wizardStepper.navigation'),
            optional: t('storybook.wizardStepper.optional'),
          }}
        />
      </Stack>
    );
  },
};

/**
 * Wizard stepper with errors
 */
export const WithErrors: Story = {
  render: function Render() {
    const t = useT();
    const steps = useSampleSteps();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <WizardStepper
          steps={steps}
          currentStep={1}
          errors={{
            select: [t('storybook.wizardStepper.selectError')],
          }}
          labels={{
            stepProgress: t('storybook.wizardStepper.stepProgress'),
            navigation: t('storybook.wizardStepper.navigation'),
            optional: t('storybook.wizardStepper.optional'),
          }}
        />
      </Stack>
    );
  },
};

/**
 * Wizard stepper - first step
 */
export const FirstStep: Story = {
  render: function Render() {
    const t = useT();
    const steps = useSampleSteps();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <WizardStepper
          steps={steps}
          currentStep={0}
          labels={{
            stepProgress: t('storybook.wizardStepper.stepProgress'),
            navigation: t('storybook.wizardStepper.navigation'),
            optional: t('storybook.wizardStepper.optional'),
          }}
        />
      </Stack>
    );
  },
};

/**
 * Wizard stepper - last step
 */
export const LastStep: Story = {
  render: function Render() {
    const t = useT();
    const steps = useSampleSteps();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <WizardStepper
          steps={steps}
          currentStep={2}
          labels={{
            stepProgress: t('storybook.wizardStepper.stepProgress'),
            navigation: t('storybook.wizardStepper.navigation'),
            optional: t('storybook.wizardStepper.optional'),
          }}
        />
      </Stack>
    );
  },
};

/**
 * Wizard stepper with optional step
 */
export const WithOptionalStep: Story = {
  render: function Render() {
    const t = useT();
    const steps = [
      { id: 'required', label: t('storybook.wizardStepper.required') },
      { id: 'optional', label: t('storybook.wizardStepper.optionalStep'), optional: true },
      { id: 'confirm', label: t('storybook.wizardStepper.confirm') },
    ];
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <WizardStepper
          steps={steps}
          currentStep={1}
          labels={{
            stepProgress: t('storybook.wizardStepper.stepProgress'),
            navigation: t('storybook.wizardStepper.navigation'),
            optional: t('storybook.wizardStepper.optional'),
          }}
        />
      </Stack>
    );
  },
};

/**
 * Small wizard stepper
 */
export const Small: Story = {
  render: function Render() {
    const t = useT();
    const steps = useSampleSteps();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <WizardStepper
          steps={steps}
          currentStep={1}
          size="sm"
          labels={{
            stepProgress: t('storybook.wizardStepper.stepProgress'),
            navigation: t('storybook.wizardStepper.navigation'),
            optional: t('storybook.wizardStepper.optional'),
          }}
        />
      </Stack>
    );
  },
};

/**
 * Large wizard stepper
 */
export const Large: Story = {
  render: function Render() {
    const t = useT();
    const steps = useSampleSteps();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <WizardStepper
          steps={steps}
          currentStep={1}
          size="lg"
          labels={{
            stepProgress: t('storybook.wizardStepper.stepProgress'),
            navigation: t('storybook.wizardStepper.navigation'),
            optional: t('storybook.wizardStepper.optional'),
          }}
        />
      </Stack>
    );
  },
};
