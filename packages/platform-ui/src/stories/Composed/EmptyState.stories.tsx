import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { EmptyState, Stack, Paragraph, Card } from '../../index';
import { InboxIcon, CheckCircleIcon, AlertTriangleIcon, InfoIcon } from '../../index';

/**
 * EmptyState provides a generic empty state component for when there's no data.
 *
 * ## Features
 * - Icon support
 * - Title and description
 * - Primary and secondary actions
 * - Multiple variants (default, success, warning, info)
 * - Size variants (sm, md, lg)
 *
 * ## When to Use
 * - Empty lists
 * - No search results
 * - Empty states after filtering
 */
const meta: Meta<typeof EmptyState> = {
  title: 'Composed/EmptyState',
  component: EmptyState,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof EmptyState>;

/**
 * Default empty state
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.emptyState.description')}</Paragraph>
            <EmptyState
              icon={<InboxIcon />}
              title={t('storybook.emptyState.title')}
              description={t('storybook.emptyState.descriptionText')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Empty state with action
 */
export const WithAction: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.emptyState.withAction')}</Paragraph>
            <EmptyState
              icon={<InboxIcon />}
              title={t('storybook.emptyState.title')}
              description={t('storybook.emptyState.descriptionText')}
              action={{
                label: t('storybook.emptyState.create'),
                onClick: () => console.log('Create clicked'),
              }}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Success variant
 */
export const Success: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.emptyState.success')}</Paragraph>
            <EmptyState
              icon={<CheckCircleIcon />}
              title={t('storybook.emptyState.successTitle')}
              description={t('storybook.emptyState.successDescription')}
              variant="success"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Warning variant
 */
export const Warning: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.emptyState.warning')}</Paragraph>
            <EmptyState
              icon={<AlertTriangleIcon />}
              title={t('storybook.emptyState.warningTitle')}
              description={t('storybook.emptyState.warningDescription')}
              variant="warning"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Info variant
 */
export const Info: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.emptyState.info')}</Paragraph>
            <EmptyState
              icon={<InfoIcon />}
              title={t('storybook.emptyState.infoTitle')}
              description={t('storybook.emptyState.infoDescription')}
              variant="info"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Small size
 */
export const Small: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.emptyState.small')}</Paragraph>
            <EmptyState
              icon={<InboxIcon />}
              title={t('storybook.emptyState.title')}
              size="sm"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
