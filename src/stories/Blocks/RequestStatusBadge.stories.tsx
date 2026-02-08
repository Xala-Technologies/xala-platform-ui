import type { Meta, StoryObj } from '@storybook/react';
import { RequestStatusBadge, StatusTag } from '../../components/gdpr/RequestStatusBadge';
import type { StatusBadgeConfig } from '../../components/gdpr/RequestStatusBadge';

const meta: Meta<typeof RequestStatusBadge> = {
  title: 'Blocks/RequestStatusBadge',
  component: RequestStatusBadge,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## RequestStatusBadge

Generic status badge component for request statuses. Domain-agnostic - receives status configuration via props.

### Features
- Configurable status colors
- Custom labels
- Multiple sizes
- Reusable StatusTag component

### Usage
\`\`\`tsx
<RequestStatusBadge
  status="pending"
  statusConfig={{
    pending: { color: 'warning', label: 'Venter' },
    completed: { color: 'success', label: 'Fullfort' },
  }}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// GDPR request status config
const gdprStatusConfig: Record<string, StatusBadgeConfig> = {
  pending: { color: 'warning', label: 'Venter' },
  processing: { color: 'info', label: 'Behandles' },
  completed: { color: 'success', label: 'Fullfort' },
  rejected: { color: 'danger', label: 'Avslaatt' },
};

// Pending status
export const Pending: Story = {
  args: {
    status: 'pending',
    statusConfig: gdprStatusConfig,
  },
  render: (args) => (
    <div style={{ padding: 'var(--ds-spacing-4)' }}>
      <RequestStatusBadge {...args} />
    </div>
  ),
};

// Processing status
export const Processing: Story = {
  args: {
    status: 'processing',
    statusConfig: gdprStatusConfig,
  },
  render: (args) => (
    <div style={{ padding: 'var(--ds-spacing-4)' }}>
      <RequestStatusBadge {...args} />
    </div>
  ),
};

// Completed status
export const Completed: Story = {
  args: {
    status: 'completed',
    statusConfig: gdprStatusConfig,
  },
  render: (args) => (
    <div style={{ padding: 'var(--ds-spacing-4)' }}>
      <RequestStatusBadge {...args} />
    </div>
  ),
};

// Rejected status
export const Rejected: Story = {
  args: {
    status: 'rejected',
    statusConfig: gdprStatusConfig,
  },
  render: (args) => (
    <div style={{ padding: 'var(--ds-spacing-4)' }}>
      <RequestStatusBadge {...args} />
    </div>
  ),
};

// All statuses
export const AllStatuses: Story = {
  render: function Render() {
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)', padding: 'var(--ds-spacing-4)' }}>
        <RequestStatusBadge status="pending" statusConfig={gdprStatusConfig} />
        <RequestStatusBadge status="processing" statusConfig={gdprStatusConfig} />
        <RequestStatusBadge status="completed" statusConfig={gdprStatusConfig} />
        <RequestStatusBadge status="rejected" statusConfig={gdprStatusConfig} />
      </div>
    );
  },
};

// StatusTag component - all colors
export const StatusTagColors: Story = {
  render: function Render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-2)',
          padding: 'var(--ds-spacing-4)',
        }}
      >
        <StatusTag color="success">"Eksempel Tekst"</StatusTag>
        <StatusTag color="warning">"Eksempel Tekst"</StatusTag>
        <StatusTag color="danger">"Eksempel Tekst"</StatusTag>
        <StatusTag color="info">"Eksempel Tekst"</StatusTag>
        <StatusTag color="neutral">"Eksempel Tekst"</StatusTag>
      </div>
    );
  },
};

// StatusTag component - all sizes
export const StatusTagSizes: Story = {
  render: function Render() {
    return (
      <div
        style={{
          display: 'flex',
          gap: 'var(--ds-spacing-4)',
          alignItems: 'center',
          padding: 'var(--ds-spacing-4)',
        }}
      >
        <StatusTag color="success" size="sm">
          "Eksempel Tekst"
        </StatusTag>
        <StatusTag color="success" size="md">
          "Eksempel Tekst"
        </StatusTag>
        <StatusTag color="success" size="lg">
          "Eksempel Tekst"
        </StatusTag>
      </div>
    );
  },
};

// Custom status config
export const CustomConfig: Story = {
  render: function Render() {
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <RequestStatusBadge
          status="active"
          statusConfig={{
            active: { color: 'success', label: t('platform.status.active') },
            inactive: { color: 'neutral', label: t('platform.status.cancelled') },
            suspended: { color: 'danger', label: t('platform.status.rejected') },
          }}
        />
      </div>
    );
  },
};
