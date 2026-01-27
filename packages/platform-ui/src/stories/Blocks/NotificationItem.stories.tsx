import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { NotificationItem, Stack, Paragraph, Card } from '../../index';

/**
 * NotificationItem provides a reusable component for displaying individual notifications.
 *
 * ## Features
 * - Multiple notification types
 * - Read/unread states
 * - Priority levels
 * - Action buttons
 *
 * ## When to Use
 * - Notification centers
 * - Notification lists
 * - Notification displays
 */
const meta: Meta<typeof NotificationItem> = {
  title: 'Blocks/NotificationItem',
  component: NotificationItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NotificationItem>;

/**
 * Default notification item
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
            <Paragraph data-size="md">{t('storybook.notificationItem.description')}</Paragraph>
            <NotificationItem
              notification={{
                id: '1',
                type: 'resourceRequest_confirmed',
                title: t('storybook.notificationItem.title'),
                message: t('storybook.notificationItem.message'),
                priority: 'normal',
                createdAt: new Date().toISOString(),
              }}
              onClick={(id) => console.log('Notification clicked:', id)}
              onMarkAsRead={(id) => console.log('Mark as read:', id)}
              onDelete={(id) => console.log('Delete:', id)}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Unread notification
 */
export const Unread: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.notificationItem.unread')}</Paragraph>
            <NotificationItem
              notification={{
                id: '2',
                type: 'resourceRequest_reminder_24h',
                title: t('storybook.notificationItem.unreadTitle'),
                message: t('storybook.notificationItem.unreadMessage'),
                priority: 'high',
                createdAt: new Date().toISOString(),
              }}
              onClick={(id) => console.log('Notification clicked:', id)}
              onMarkAsRead={(id) => console.log('Mark as read:', id)}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * High priority notification
 */
export const HighPriority: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.notificationItem.highPriority')}</Paragraph>
            <NotificationItem
              notification={{
                id: '3',
                type: 'resourceRequest_upcoming',
                title: t('storybook.notificationItem.highPriorityTitle'),
                message: t('storybook.notificationItem.highPriorityMessage'),
                priority: 'urgent',
                createdAt: new Date().toISOString(),
              }}
              onClick={(id) => console.log('Notification clicked:', id)}
              onMarkAsRead={(id) => console.log('Mark as read:', id)}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
