import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { ResourceRequestStepper, Stack, Paragraph, Card } from '../../index';

/**
 * ResourceRequestStepper provides a horizontal step indicator for resource request flow.
 *
 * ## Features
 * - Shows progress through resource request steps
 * - Icons and connecting lines
 * - Completed, active, and future step states
 * - Clickable steps (for navigation)
 *
 * ## When to Use
 * - Multi-step resource request flows
 * - Booking processes
 * - Wizard navigation
 */
const meta: Meta<typeof ResourceRequestStepper> = {
  title: 'Composed/ResourceRequestStepper',
  component: ResourceRequestStepper,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ResourceRequestStepper>;

/**
 * Default stepper with 3 steps
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [currentStep, setCurrentStep] = useState(0);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.resourceRequestStepper.description')}</Paragraph>
            <ResourceRequestStepper
              steps={[
                { id: 'select', label: t('storybook.resourceRequestStepper.select') },
                { id: 'details', label: t('storybook.resourceRequestStepper.details') },
                { id: 'confirm', label: t('storybook.resourceRequestStepper.confirm') },
              ]}
              currentStep={currentStep}
              onStepClick={(index) => setCurrentStep(index)}
              title={t('storybook.resourceRequestStepper.title')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Stepper with 5 steps
 */
export const FiveSteps: Story = {
  render: function Render() {
    const t = useT();
    const [currentStep, setCurrentStep] = useState(2);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.resourceRequestStepper.fiveSteps')}</Paragraph>
            <ResourceRequestStepper
              steps={[
                { id: 'step1', label: t('storybook.resourceRequestStepper.step1') },
                { id: 'step2', label: t('storybook.resourceRequestStepper.step2') },
                { id: 'step3', label: t('storybook.resourceRequestStepper.step3') },
                { id: 'step4', label: t('storybook.resourceRequestStepper.step4') },
                { id: 'step5', label: t('storybook.resourceRequestStepper.step5') },
              ]}
              currentStep={currentStep}
              onStepClick={(index) => setCurrentStep(index)}
              title={t('storybook.resourceRequestStepper.title')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Stepper without step counter
 */
export const WithoutStepCounter: Story = {
  render: function Render() {
    const t = useT();
    const [currentStep, setCurrentStep] = useState(1);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.resourceRequestStepper.withoutCounter')}</Paragraph>
            <ResourceRequestStepper
              steps={[
                { id: 'select', label: t('storybook.resourceRequestStepper.select') },
                { id: 'details', label: t('storybook.resourceRequestStepper.details') },
                { id: 'confirm', label: t('storybook.resourceRequestStepper.confirm') },
              ]}
              currentStep={currentStep}
              onStepClick={(index) => setCurrentStep(index)}
              title={t('storybook.resourceRequestStepper.title')}
              showStepCounter={false}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Completed stepper
 */
export const Completed: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.resourceRequestStepper.completed')}</Paragraph>
            <ResourceRequestStepper
              steps={[
                { id: 'select', label: t('storybook.resourceRequestStepper.select') },
                { id: 'details', label: t('storybook.resourceRequestStepper.details') },
                { id: 'confirm', label: t('storybook.resourceRequestStepper.confirm') },
              ]}
              currentStep={3}
              title={t('storybook.resourceRequestStepper.title')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
