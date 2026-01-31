/**
 * NotificationsTab - Local implementation
 *
 * Temporary local component until moved to platform-ui-extended.
 * Manages notification preferences including email, SMS, push notifications.
 */

import {
  Card,
  Heading,
  Paragraph,
  Button,
  Textfield,
  Switch,
  Spinner,
  Alert,
} from '@digdir/designsystemet-react';

export interface NotificationSettingsData {
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  bookingConfirmation: boolean;
  bookingReminder: boolean;
  reminderHoursBefore: number;
}

export interface NotificationsTabProps {
  notificationData: NotificationSettingsData;
  isSaving?: boolean;
  isLoading?: boolean;
  saveSuccess?: boolean;
  saveError?: string;
  validationErrors?: Record<string, string>;
  shouldShowReminderHours?: boolean;
  hasChanges?: boolean;
  canSave?: boolean;
  onFieldChange: <K extends keyof NotificationSettingsData>(
    field: K,
    value: NotificationSettingsData[K]
  ) => void;
  onSave: () => void;
  onReset: () => void;
}

export function NotificationsTab({
  notificationData,
  isSaving = false,
  isLoading = false,
  saveSuccess = false,
  saveError,
  validationErrors = {},
  shouldShowReminderHours = false,
  hasChanges = false,
  canSave = true,
  onFieldChange,
  onSave,
  onReset,
}: NotificationsTabProps) {
  if (isLoading) {
    return (
      <Card>
        <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--ds-spacing-8)' }}>
          <Spinner aria-label="Loading" data-size="md" />
        </div>
      </Card>
    );
  }

  return (
    <Card>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <div>
          <Heading level={2} data-size="sm">
            Notification Settings
          </Heading>
          <Paragraph>Manage how you receive notifications</Paragraph>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
          <Heading level={3} data-size="xs">
            Notification Channels
          </Heading>

          <Switch
            label="Email Notifications"
            description="Receive notifications via email"
            checked={notificationData.emailEnabled}
            onChange={(e) => onFieldChange('emailEnabled', e.target.checked)}
            data-size="sm"
          />

          <Switch
            label="SMS Notifications"
            description="Receive notifications via SMS"
            checked={notificationData.smsEnabled}
            onChange={(e) => onFieldChange('smsEnabled', e.target.checked)}
            data-size="sm"
          />

          <Switch
            label="Push Notifications"
            description="Receive push notifications in browser"
            checked={notificationData.pushEnabled}
            onChange={(e) => onFieldChange('pushEnabled', e.target.checked)}
            data-size="sm"
          />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
          <Heading level={3} data-size="xs">
            Notification Types
          </Heading>

          <Switch
            label="Booking Confirmations"
            description="Get notified when bookings are confirmed"
            checked={notificationData.bookingConfirmation}
            onChange={(e) => onFieldChange('bookingConfirmation', e.target.checked)}
            data-size="sm"
          />

          <Switch
            label="Booking Reminders"
            description="Get reminded before your bookings"
            checked={notificationData.bookingReminder}
            onChange={(e) => onFieldChange('bookingReminder', e.target.checked)}
            data-size="sm"
          />

          {shouldShowReminderHours && (
            <div style={{ marginLeft: 'var(--ds-spacing-8)', maxWidth: '200px' }}>
              <Textfield
                label="Reminder Hours Before"
                type="number"
                min={1}
                max={168}
                value={String(notificationData.reminderHoursBefore)}
                onChange={(e) => onFieldChange('reminderHoursBefore', Number(e.target.value))}
                error={validationErrors.reminderHoursBefore}
                data-size="sm"
              />
            </div>
          )}
        </div>

        {saveSuccess && (
          <Alert data-color="success" data-size="sm">
            Settings saved successfully
          </Alert>
        )}

        {saveError && (
          <Alert data-color="danger" data-size="sm">
            {saveError}
          </Alert>
        )}

        <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)', justifyContent: 'flex-end' }}>
          <Button
            variant="secondary"
            onClick={onReset}
            disabled={isSaving || !hasChanges}
            data-size="sm"
          >
            Reset
          </Button>

          <Button variant="primary" onClick={onSave} disabled={!canSave} data-size="sm">
            {isSaving ? 'Saving...' : 'Save Settings'}
          </Button>
        </div>
      </div>
    </Card>
  );
}
