import type { Meta, StoryObj } from '@storybook/react';
import { 
  StatusTag,
  PaymentStatusBadge,
  ResourceStatusBadge,
  RequestStatusBadge,
  UserStatusBadge,
} from '../../blocks';

const meta = {
  title: 'Blocks/Status Badges',
  component: StatusTag,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof StatusTag>;

export default meta;
type Story = StoryObj<typeof meta>;
type AnyStory = StoryObj<any>;

export const StatusTagDefault: Story = {
  args: {
    children: 'Active',
    color: 'success',
  },
};

export const PaymentStatuses: AnyStory = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <PaymentStatusBadge status="paid" />
      <PaymentStatusBadge status="unpaid" />
      <PaymentStatusBadge status="partial" />
      <PaymentStatusBadge status="refunded" />
    </div>
  ),
};

export const ResourceStatuses: AnyStory = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <ResourceStatusBadge status="published" />
      <ResourceStatusBadge status="draft" />
      <ResourceStatusBadge status="archived" />
      <ResourceStatusBadge status="maintenance" />
    </div>
  ),
};

export const RequestStatuses: AnyStory = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <RequestStatusBadge status="pending" />
      <RequestStatusBadge status="needs_info" />
      <RequestStatusBadge status="approved" />
      <RequestStatusBadge status="rejected" />
    </div>
  ),
};

export const UserStatuses: AnyStory = {
  render: () => (
    <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
      <UserStatusBadge status="active" />
      <UserStatusBadge status="inactive" />
      <UserStatusBadge status="suspended" />
    </div>
  ),
};
