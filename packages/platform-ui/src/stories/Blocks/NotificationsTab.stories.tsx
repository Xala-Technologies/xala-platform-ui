import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { NotificationsTab, Stack, Paragraph, Card } from '../../index';

/**
 * NotificationsTab manages notification preferences.
 *
 * ## Features
 * - Email notifications
 * - SMS notifications
 * - Push notifications
 * - Booking confirmations
 * - Booking reminders
 *
 * ## When to Use
 * - Settings pages
 * - User preferences
 * - Notification management
 */
const meta: Meta<typeof NotificationsTab> = {
  title: 'Blocks/NotificationsTab',
  component: NotificationsTab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NotificationsTab>;

/**
 * Default notifications tab
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [notificationData, setNotificationData] = useState({
      emailEnabled: true,
      smsEnabled: false,
      pushEnabled: true,
      bookingConfirmation: true,
      bookingReminder: true,
      reminderHoursBefore: 24,
    });
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.notificationsTab.description')}</Paragraph>
            <NotificationsTab
              notificationData={notificationData}
              onFieldChange={(field, value) => {
                setNotificationData({ ...notificationData, [field]: value });
              }}
              onSave={async () => {
                console.log('Save notifications');
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
              onReset={() => {
                setNotificationData({
                  emailEnabled: false,
                  smsEnabled: false,
                  pushEnabled: false,
                  bookingConfirmation: false,
                  bookingReminder: false,
                  reminderHoursBefore: 24,
                });
              }}
              labels={{
                title: t('storybook.notificationsTab.title'),
                description: t('storybook.notificationsTab.descriptionText'),
                emailNotifications: t('storybook.notificationsTab.emailNotifications'),
                emailDescription: t('storybook.notificationsTab.emailDescription'),
                smsNotifications: t('storybook.notificationsTab.smsNotifications'),
                smsDescription: t('storybook.notificationsTab.smsDescription'),
                pushNotifications: t('storybook.notificationsTab.pushNotifications'),
                pushDescription: t('storybook.notificationsTab.pushDescription'),
                bookingConfirmation: t('storybook.notificationsTab.bookingConfirmation'),
                bookingConfirmationDescription: t(
                  'storybook.notificationsTab.bookingConfirmationDescription'
                ),
                bookingReminder: t('storybook.notificationsTab.bookingReminder'),
                bookingReminderDescription: t(
                  'storybook.notificationsTab.bookingReminderDescription'
                ),
                reminderHoursBefore: t('storybook.notificationsTab.reminderHoursBefore'),
                reminderHoursBeforePlaceholder: t(
                  'storybook.notificationsTab.reminderHoursBeforePlaceholder'
                ),
                saveSettings: t('storybook.notificationsTab.saveSettings'),
                resetSettings: t('storybook.notificationsTab.resetSettings'),
                saving: t('storybook.notificationsTab.saving'),
                saveSuccess: t('storybook.notificationsTab.saveSuccess'),
                saveError: t('storybook.notificationsTab.saveError'),
              }}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
