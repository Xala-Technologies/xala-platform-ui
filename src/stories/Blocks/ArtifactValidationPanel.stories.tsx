import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { ArtifactValidationPanel, Stack, Paragraph, Card } from '../../index';

/**
 * ArtifactValidationPanel displays validation results for artifacts.
 *
 * ## Features
 * - Single or multiple validation results
 * - Status indicators (passed, failed, warning, pending)
 * - Detailed messages
 * - Customizable title
 *
 * ## When to Use
 * - Code validation displays
 * - Form validation results
 * - Quality checks
 */
const meta: Meta<typeof ArtifactValidationPanel> = {
  title: 'Blocks/ArtifactValidationPanel',
  component: ArtifactValidationPanel,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ArtifactValidationPanel>;

/**
 * Single validation result - passed
 */
export const SinglePassed: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.artifactValidation.description')}</Paragraph>
            <ArtifactValidationPanel
              validationResult={{
                id: '1',
                name: t('storybook.artifactValidation.syntaxCheck'),
                status: 'passed',
                message: t('storybook.artifactValidation.syntaxValid'),
              }}
              title={t('storybook.artifactValidation.validationResults')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Single validation result - failed
 */
export const SingleFailed: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.artifactValidation.failed')}</Paragraph>
            <ArtifactValidationPanel
              validationResult={{
                id: '1',
                name: t('storybook.artifactValidation.typeCheck'),
                status: 'failed',
                message: t('storybook.artifactValidation.typeError'),
                details: [
                  t('storybook.artifactValidation.errorLine1'),
                  t('storybook.artifactValidation.errorLine2'),
                ],
              }}
              title={t('storybook.artifactValidation.validationResults')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Multiple validation results
 */
export const MultipleResults: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.artifactValidation.multiple')}</Paragraph>
            <ArtifactValidationPanel
              validationResults={[
                {
                  id: '1',
                  name: t('storybook.artifactValidation.syntaxCheck'),
                  status: 'passed',
                  message: t('storybook.artifactValidation.syntaxValid'),
                },
                {
                  id: '2',
                  name: t('storybook.artifactValidation.typeCheck'),
                  status: 'warning',
                  message: t('storybook.artifactValidation.typeWarning'),
                },
                {
                  id: '3',
                  name: t('storybook.artifactValidation.lintCheck'),
                  status: 'failed',
                  message: t('storybook.artifactValidation.lintErrors'),
                  details: [
                    t('storybook.artifactValidation.lintError1'),
                    t('storybook.artifactValidation.lintError2'),
                  ],
                },
                {
                  id: '4',
                  name: t('storybook.artifactValidation.testCheck'),
                  status: 'pending',
                  message: t('storybook.artifactValidation.testsRunning'),
                },
              ]}
              title={t('storybook.artifactValidation.validationResults')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Validation with warning
 */
export const WithWarning: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.artifactValidation.warning')}</Paragraph>
            <ArtifactValidationPanel
              validationResult={{
                id: '1',
                name: t('storybook.artifactValidation.performanceCheck'),
                status: 'warning',
                message: t('storybook.artifactValidation.performanceWarning'),
                details: [
                  t('storybook.artifactValidation.performanceDetail1'),
                  t('storybook.artifactValidation.performanceDetail2'),
                ],
              }}
              title={t('storybook.artifactValidation.validationResults')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
