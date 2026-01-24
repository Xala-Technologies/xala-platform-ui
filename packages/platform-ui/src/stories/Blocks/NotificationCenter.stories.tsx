import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { useT } from '@xala-technologies/i18n';
import { NotificationCenter } from '../../blocks/NotificationCenter';
import type { NotificationItemData } from '../../blocks/NotificationItem';

const meta: Meta<typeof NotificationCenter> = {
  title: 'Blocks/NotificationCenter',
  component: NotificationCenter,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## NotificationCenter

Modal/drawer component for displaying notification history and managing notifications. Shows a list of notifications with filtering, mark-as-read, and delete actions.

### Features
- Filter by all/unread/read
- Mark as read/unread
- Delete notifications
- Mark all as read
- Loading states
- Empty states

### Usage
\`\`\`tsx
<NotificationCenter
  open={true}
  onClose={handleClose}
  notifications={notifications}
  onNotificationClick={handleClick}
  onMarkAsRead={handleMarkAsRead}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onClose: fn(),
    onFilterChange: fn(),
    onNotificationClick: fn(),
    onMarkAsRead: fn(),
    onDelete: fn(),
    onMarkAllAsRead: fn(),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample notifications
const sampleNotifications: NotificationItemData[] = [
  {
    id: '1',
    type: 'resourceRequest_confirmed',
    title: 'Booking confirmed',
    message: 'Your booking for Meeting Room A has been confirmed.',
    priority: 'normal',
    createdAt: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    readAt: null,
  },
  {
    id: '2',
    type: 'resourceRequest_reminder_24h',
    title: 'Reminder: Booking tomorrow',
    message: 'Your booking for Meeting Room B starts in 24 hours.',
    priority: 'normal',
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    readAt: null,
  },
  {
    id: '3',
    type: 'resourceRequest_reminder_1h',
    title: 'Reminder: Booking in 1 hour',
    message: 'Your booking starts in 1 hour.',
    priority: 'high',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    readAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
  },
  {
    id: '4',
    type: 'resourceRequest_cancelled',
    title: 'Booking cancelled',
    message: 'Your booking for Meeting Room C has been cancelled.',
    priority: 'normal',
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
    readAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
  },
];

// Basic notification center
export const Default: Story = {
  args: {
    open: true,
    notifications: sampleNotifications,
    filter: 'all',
  },
  render: (args) => (
    <div style={{ width: '500px', height: '600px', position: 'relative' }}>
      <NotificationCenter {...args} />
    </div>
  ),
};

// With unread filter
export const UnreadFilter: Story = {
  args: {
    open: true,
    notifications: sampleNotifications,
    filter: 'unread',
  },
  render: (args) => (
    <div style={{ width: '500px', height: '600px', position: 'relative' }}>
      <NotificationCenter {...args} />
    </div>
  ),
};

// With read filter
export const ReadFilter: Story = {
  args: {
    open: true,
    notifications: sampleNotifications,
    filter: 'read',
  },
  render: (args) => (
    <div style={{ width: '500px', height: '600px', position: 'relative' }}>
      <NotificationCenter {...args} />
    </div>
  ),
};

// Loading state
export const Loading: Story = {
  args: {
    open: true,
    notifications: [],
    loading: true,
    filter: 'all',
  },
  render: (args) => (
    <div style={{ width: '500px', height: '600px', position: 'relative' }}>
      <NotificationCenter {...args} />
    </div>
  ),
};

// Empty state
export const Empty: Story = {
  args: {
    open: true,
    notifications: [],
    loading: false,
    filter: 'all',
  },
  render: (args) => (
    <div style={{ width: '500px', height: '600px', position: 'relative' }}>
      <NotificationCenter {...args} />
    </div>
  ),
};

// Many notifications
export const ManyNotifications: Story = {
  render: () => {
    const t = useT();
    const notifications = Array.from({ length: 20 }, (_, i) => ({
      id: `notif-${i}`,
      type: [
        'resourceRequest_confirmed',
        'resourceRequest_reminder_24h',
        'resourceRequest_reminder_1h',
        'resourceRequest_cancelled',
      ][i % 4] as NotificationItemData['type'],
      title: `${t('platform.common.notifications')} ${i + 1}`,
      message: `${t('storybook.demo.sampleText')} ${i + 1}`,
      priority: ['low', 'normal', 'high', 'urgent'][i % 4] as NotificationItemData['priority'],
      createdAt: new Date(Date.now() - 1000 * 60 * i).toISOString(),
      readAt: i % 3 === 0 ? new Date(Date.now() - 1000 * 60 * (i - 1)).toISOString() : null,
    }));

    return (
      <div style={{ width: '500px', height: '600px', position: 'relative' }}>
        <NotificationCenter
          open={true}
          notifications={notifications}
          filter="all"
          onClose={fn()}
          onFilterChange={fn()}
          onNotificationClick={fn()}
          onMarkAsRead={fn()}
          onDelete={fn()}
          onMarkAllAsRead={fn()}
        />
      </div>
    );
  },
};
