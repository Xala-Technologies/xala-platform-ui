import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { Wizard, Stack, Paragraph, Card, Button, Textfield } from '../../index';

/**
 * Wizard provides a multi-step form wizard component.
 *
 * ## Features
 * - Step navigation
 * - Step validation
 * - Loading states
 * - Error handling
 * - Optional steps
 *
 * ## When to Use
 * - Multi-step forms
 * - Complex workflows
 * - Guided processes
 */
const meta: Meta<typeof Wizard> = {
  title: 'Composed/Wizard',
  component: Wizard,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Wizard>;

/**
 * Default wizard with 3 steps
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [currentStep, setCurrentStep] = useState(0);
    const [formData, setFormData] = useState({ name: '', email: '', confirm: false });
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.wizard.description')}</Paragraph>
            <Wizard
              steps={[
                { id: 'step1', label: t('storybook.wizard.step1') },
                { id: 'step2', label: t('storybook.wizard.step2') },
                { id: 'step3', label: t('storybook.wizard.step3') },
              ]}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
              canGoNext={currentStep < 2}
              canGoPrev={currentStep > 0}
              isLastStep={currentStep === 2}
              renderStep={(step, stepIndex) => {
                if (stepIndex === 0) {
                  return (
                    <Stack spacing="var(--ds-spacing-4)">
                      <Paragraph data-size="md">{t('storybook.wizard.step1Content')}</Paragraph>
                      <Textfield
                        label={t('storybook.wizard.name')}
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      />
                    </Stack>
                  );
                }
                if (stepIndex === 1) {
                  return (
                    <Stack spacing="var(--ds-spacing-4)">
                      <Paragraph data-size="md">{t('storybook.wizard.step2Content')}</Paragraph>
                      <Textfield
                        label={t('storybook.wizard.email')}
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      />
                    </Stack>
                  );
                }
                return (
                  <Stack spacing="var(--ds-spacing-4)">
                    <Paragraph data-size="md">{t('storybook.wizard.step3Content')}</Paragraph>
                    <Button onClick={() => console.log('Submit')}>
                      {t('storybook.wizard.submit')}
                    </Button>
                  </Stack>
                );
              }}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Wizard with optional step
 */
export const WithOptionalStep: Story = {
  render: function Render() {
    const t = useT();
    const [currentStep, setCurrentStep] = useState(0);
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.wizard.withOptional')}</Paragraph>
            <Wizard
              steps={[
                { id: 'step1', label: t('storybook.wizard.step1') },
                { id: 'step2', label: t('storybook.wizard.step2'), optional: true },
                { id: 'step3', label: t('storybook.wizard.step3') },
              ]}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
              canGoNext={currentStep < 2}
              canGoPrev={currentStep > 0}
              isLastStep={currentStep === 2}
              renderStep={(step) => (
                <Stack spacing="var(--ds-spacing-4)">
                  <Paragraph data-size="md">{step.label}</Paragraph>
                </Stack>
              )}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Wizard with errors
 */
export const WithErrors: Story = {
  render: function Render() {
    const t = useT();
    const [currentStep, setCurrentStep] = useState(0);
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.wizard.withErrors')}</Paragraph>
            <Wizard
              steps={[
                { id: 'step1', label: t('storybook.wizard.step1') },
                { id: 'step2', label: t('storybook.wizard.step2') },
                { id: 'step3', label: t('storybook.wizard.step3') },
              ]}
              currentStep={currentStep}
              onStepChange={setCurrentStep}
              canGoNext={currentStep < 2}
              canGoPrev={currentStep > 0}
              isLastStep={currentStep === 2}
              errors={{
                step1: [t('storybook.wizard.error1')],
                step2: [t('storybook.wizard.error2')],
              }}
              renderStep={(step) => (
                <Stack spacing="var(--ds-spacing-4)">
                  <Paragraph data-size="md">{step.label}</Paragraph>
                </Stack>
              )}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
