import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import {
  DeleteAccountCard,
  DEFAULT_DELETE_ACCOUNT_LABELS,
} from '../../blocks/gdpr/DeleteAccountCard';
import type { GdprDeletionRequest } from '../../blocks/gdpr/DeleteAccountCard';

const meta: Meta<typeof DeleteAccountCard> = {
  title: 'Blocks/DeleteAccountCard',
  component: DeleteAccountCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## DeleteAccountCard

Component for requesting account deletion in compliance with GDPR. Domain-agnostic - receives all data and callbacks via props.

### Features
- Request account deletion
- Cancel pending requests
- Status tracking (pending, processing, completed, rejected)
- Confirmation dialog
- Loading and error states

### Usage
\`\`\`tsx
<DeleteAccountCard
  deletionRequest={deletionRequest}
  isLoading={false}
  isDeleting={false}
  isCancelling={false}
  isError={false}
  onConfirmDeletion={handleDelete}
  onCancelRequest={handleCancel}
  labels={labels}
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

// No request yet
export const NoRequest: Story = {
  args: {
    deletionRequest: null,
    isLoading: false,
    isDeleting: false,
    isCancelling: false,
    isError: false,
    onConfirmDeletion: fn(),
    onCancelRequest: fn(),
    labels: DEFAULT_DELETE_ACCOUNT_LABELS,
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <DeleteAccountCard {...args} />
    </div>
  ),
};

// Pending request
export const Pending: Story = {
  args: {
    deletionRequest: {
      id: '1',
      status: 'pending',
      requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    } as GdprDeletionRequest,
    isLoading: false,
    isDeleting: false,
    isCancelling: false,
    isError: false,
    onConfirmDeletion: fn(),
    onCancelRequest: fn(),
    labels: DEFAULT_DELETE_ACCOUNT_LABELS,
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <DeleteAccountCard {...args} />
    </div>
  ),
};

// Processing request
export const Processing: Story = {
  args: {
    deletionRequest: {
      id: '1',
      status: 'processing',
      requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5).toISOString(),
    } as GdprDeletionRequest,
    isLoading: false,
    isDeleting: false,
    isCancelling: false,
    isError: false,
    onConfirmDeletion: fn(),
    onCancelRequest: fn(),
    labels: DEFAULT_DELETE_ACCOUNT_LABELS,
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <DeleteAccountCard {...args} />
    </div>
  ),
};

// Completed request
export const Completed: Story = {
  args: {
    deletionRequest: {
      id: '1',
      status: 'completed',
      requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24 * 30).toISOString(),
    } as GdprDeletionRequest,
    isLoading: false,
    isDeleting: false,
    isCancelling: false,
    isError: false,
    onConfirmDeletion: fn(),
    onCancelRequest: fn(),
    labels: DEFAULT_DELETE_ACCOUNT_LABELS,
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <DeleteAccountCard {...args} />
    </div>
  ),
};

// Rejected request
export const Rejected: Story = {
  args: {
    deletionRequest: {
      id: '1',
      status: 'rejected',
      requestedAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
      metadata: {
        rejectionReason: 'Account has active bookings.',
      },
    } as GdprDeletionRequest,
    isLoading: false,
    isDeleting: false,
    isCancelling: false,
    isError: false,
    onConfirmDeletion: fn(),
    onCancelRequest: fn(),
    labels: DEFAULT_DELETE_ACCOUNT_LABELS,
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <DeleteAccountCard {...args} />
    </div>
  ),
};

// Loading state
export const Loading: Story = {
  args: {
    deletionRequest: null,
    isLoading: true,
    isDeleting: false,
    isCancelling: false,
    isError: false,
    onConfirmDeletion: fn(),
    onCancelRequest: fn(),
    labels: DEFAULT_DELETE_ACCOUNT_LABELS,
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <DeleteAccountCard {...args} />
    </div>
  ),
};

// Deleting state
export const Deleting: Story = {
  args: {
    deletionRequest: null,
    isLoading: false,
    isDeleting: true,
    isCancelling: false,
    isError: false,
    onConfirmDeletion: fn(),
    onCancelRequest: fn(),
    labels: DEFAULT_DELETE_ACCOUNT_LABELS,
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <DeleteAccountCard {...args} />
    </div>
  ),
};

// Cancelling state
export const Cancelling: Story = {
  args: {
    deletionRequest: {
      id: '1',
      status: 'pending',
      requestedAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    } as GdprDeletionRequest,
    isLoading: false,
    isDeleting: false,
    isCancelling: true,
    isError: false,
    onConfirmDeletion: fn(),
    onCancelRequest: fn(),
    labels: DEFAULT_DELETE_ACCOUNT_LABELS,
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <DeleteAccountCard {...args} />
    </div>
  ),
};

// Error state
export const Error: Story = {
  args: {
    deletionRequest: null,
    isLoading: false,
    isDeleting: false,
    isCancelling: false,
    isError: true,
    onConfirmDeletion: fn(),
    onCancelRequest: fn(),
    labels: DEFAULT_DELETE_ACCOUNT_LABELS,
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <DeleteAccountCard {...args} />
    </div>
  ),
};
