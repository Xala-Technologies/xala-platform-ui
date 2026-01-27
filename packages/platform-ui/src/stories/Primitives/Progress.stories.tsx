import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { Progress, Stack, Paragraph, Card } from '../../index';

/**
 * Progress provides a progress bar component for displaying completion status.
 *
 * ## Features
 * - Value from 0 to 100
 * - Multiple color variants
 * - Size variants
 * - Accessible labels
 *
 * ## When to Use
 * - Progress indicators
 * - Loading states
 * - Completion tracking
 */
const meta: Meta<typeof Progress> = {
  title: 'Primitives/Progress',
  component: Progress,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Progress>;

/**
 * Default progress bar
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.progress.description')}</Paragraph>
            <Progress value={50} aria-label={t('storybook.progress.progressLabel')} />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Color variants
 */
export const Colors: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.progress.colors')}</Paragraph>
            <Stack spacing="var(--ds-spacing-3)">
              <Progress
                value={75}
                data-color="success"
                aria-label={t('storybook.progress.success')}
              />
              <Progress value={50} data-color="info" aria-label={t('storybook.progress.info')} />
              <Progress
                value={30}
                data-color="warning"
                aria-label={t('storybook.progress.warning')}
              />
              <Progress
                value={10}
                data-color="danger"
                aria-label={t('storybook.progress.danger')}
              />
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Size variants
 */
export const Sizes: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.progress.sizes')}</Paragraph>
            <Stack spacing="var(--ds-spacing-3)">
              <Progress value={50} data-size="sm" aria-label={t('storybook.progress.small')} />
              <Progress value={50} data-size="md" aria-label={t('storybook.progress.medium')} />
              <Progress value={50} data-size="lg" aria-label={t('storybook.progress.large')} />
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Different values
 */
export const Values: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.progress.values')}</Paragraph>
            <Stack spacing="var(--ds-spacing-3)">
              <Progress value={0} aria-label={t('storybook.progress.zero')} />
              <Progress value={25} aria-label={t('storybook.progress.twentyFive')} />
              <Progress value={50} aria-label={t('storybook.progress.fifty')} />
              <Progress value={75} aria-label={t('storybook.progress.seventyFive')} />
              <Progress value={100} aria-label={t('storybook.progress.oneHundred')} />
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  },
};
