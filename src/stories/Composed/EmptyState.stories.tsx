import type { Meta, StoryObj } from '@storybook/react';
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
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <EmptyState
              icon={<InboxIcon />}
              title="Eksempel Tekst"
              description="Eksempel Tekst"
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
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <EmptyState
              icon={<InboxIcon />}
              title="Eksempel Tekst"
              description="Eksempel Tekst"
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
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <EmptyState
              icon={<CheckCircleIcon />}
              title="Eksempel Tekst"
              description="Eksempel Tekst"
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
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <EmptyState
              icon={<AlertTriangleIcon />}
              title="Eksempel Tekst"
              description="Eksempel Tekst"
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
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <EmptyState
              icon={<InfoIcon />}
              title="Eksempel Tekst"
              description="Eksempel Tekst"
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
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <EmptyState icon={<InboxIcon />} title="Eksempel Tekst" size="sm" />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
