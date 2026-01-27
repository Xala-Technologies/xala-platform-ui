/**
 * NotificationsTab Block - Reusable DS Component
 *
 * Manages notification preferences including email, SMS, push notifications.
 * Domain-agnostic - receives all data and handlers via props.
 *
 * @example
 * ```tsx
 * import { useT } from '@xala/i18n';
 * import { useNotificationSettings } from '@app/hooks';
 *
 * function MyNotificationsTab() {
 *   const t = useT();
 *   const { settings, updateSettings, isSaving } = useNotificationSettings();
 *
 *   return (
 *     <NotificationsTab
 *       notificationData={settings}
 *       isSaving={isSaving}
 *       onFieldChange={(field, value) => updateSettings({ [field]: value })}
 *       onSave={handleSave}
 *       onReset={handleReset}
 *       labels={{
 *         title: t('settings.notifications.title'),
 *         description: t('settings.notifications.description'),
 *         // ... other labels
 *       }}
 *     />
 *   );
 * }
 * ```
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
import { Stack, SaveIcon, RefreshIcon } from '../../primitives';

// =============================================================================
// Types
// =============================================================================

export interface NotificationSettingsData {
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  bookingConfirmation: boolean;
  bookingReminder: boolean;
  reminderHoursBefore: number;
}

export interface NotificationsTabLabels {
  title: string;
  description: string;
  emailNotifications: string;
  emailDescription: string;
  smsNotifications: string;
  smsDescription: string;
  pushNotifications: string;
  pushDescription: string;
  bookingConfirmation: string;
  bookingConfirmationDescription: string;
  bookingReminder: string;
  bookingReminderDescription: string;
  reminderHoursBefore: string;
  reminderHoursBeforePlaceholder: string;
  saveSettings: string;
  resetSettings: string;
  saving: string;
  saveSuccess: string;
  saveError: string;
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
  labels?: Partial<NotificationsTabLabels>;
  'data-testid'?: string;
}

// =============================================================================
// Default Labels
// =============================================================================

const defaultLabels: NotificationsTabLabels = {
  title: 'Notification Settings',
  description: 'Manage how you receive notifications',
  emailNotifications: 'Email Notifications',
  emailDescription: 'Receive notifications via email',
  smsNotifications: 'SMS Notifications',
  smsDescription: 'Receive notifications via SMS',
  pushNotifications: 'Push Notifications',
  pushDescription: 'Receive push notifications in browser',
  bookingConfirmation: 'Booking Confirmations',
  bookingConfirmationDescription: 'Get notified when bookings are confirmed',
  bookingReminder: 'Booking Reminders',
  bookingReminderDescription: 'Get reminded before your bookings',
  reminderHoursBefore: 'Reminder Hours Before',
  reminderHoursBeforePlaceholder: 'Hours before booking',
  saveSettings: 'Save Settings',
  resetSettings: 'Reset',
  saving: 'Saving...',
  saveSuccess: 'Settings saved successfully',
  saveError: 'Failed to save settings',
};

// =============================================================================
// Component
// =============================================================================

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
  labels: customLabels,
  'data-testid': testId,
}: NotificationsTabProps) {
  const labels = { ...defaultLabels, ...customLabels };

  if (isLoading) {
    return (
      <Card data-testid={testId}>
        <Stack
          direction="horizontal"
          align="center"
          justify="center"
          style={{ padding: 'var(--ds-spacing-8)' }}
        >
          <Spinner aria-label="Loading" data-size="md" />
        </Stack>
      </Card>
    );
  }

  return (
    <Card data-testid={testId}>
      <Stack spacing="var(--ds-spacing-6)">
        <div>
          <Heading level={2} data-size="sm">
            {labels.title}
          </Heading>
          <Paragraph>{labels.description}</Paragraph>
        </div>

        {/* Notification Channels */}
        <Stack spacing="var(--ds-spacing-4)">
          <Heading level={3} data-size="xs">
            Notification Channels
          </Heading>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
            <Switch
              label={labels.emailNotifications}
              description={labels.emailDescription}
              checked={notificationData.emailEnabled}
              onChange={(e) => onFieldChange('emailEnabled', e.target.checked)}
              data-size="sm"
            />

            <Switch
              label={labels.smsNotifications}
              description={labels.smsDescription}
              checked={notificationData.smsEnabled}
              onChange={(e) => onFieldChange('smsEnabled', e.target.checked)}
              data-size="sm"
            />

            <Switch
              label={labels.pushNotifications}
              description={labels.pushDescription}
              checked={notificationData.pushEnabled}
              onChange={(e) => onFieldChange('pushEnabled', e.target.checked)}
              data-size="sm"
            />
          </div>
        </Stack>

        {/* Notification Types */}
        <Stack spacing="var(--ds-spacing-4)">
          <Heading level={3} data-size="xs">
            Notification Types
          </Heading>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
            <Switch
              label={labels.bookingConfirmation}
              description={labels.bookingConfirmationDescription}
              checked={notificationData.bookingConfirmation}
              onChange={(e) => onFieldChange('bookingConfirmation', e.target.checked)}
              data-size="sm"
            />

            <Switch
              label={labels.bookingReminder}
              description={labels.bookingReminderDescription}
              checked={notificationData.bookingReminder}
              onChange={(e) => onFieldChange('bookingReminder', e.target.checked)}
              data-size="sm"
            />

            {shouldShowReminderHours && (
              <div style={{ marginLeft: 'var(--ds-spacing-8)', maxWidth: '200px' }}>
                <Textfield
                  label={labels.reminderHoursBefore}
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
        </Stack>

        {/* Status Messages */}
        {saveSuccess && (
          <Alert data-color="success" data-size="sm">
            {labels.saveSuccess}
          </Alert>
        )}

        {saveError && (
          <Alert data-color="danger" data-size="sm">
            {saveError}
          </Alert>
        )}

        {/* Actions */}
        <Stack direction="horizontal" spacing="var(--ds-spacing-3)" justify="end">
          <Button
            variant="secondary"
            onClick={onReset}
            disabled={isSaving || !hasChanges}
            data-size="sm"
          >
            <RefreshIcon aria-hidden />
            {labels.resetSettings}
          </Button>

          <Button variant="primary" onClick={onSave} disabled={!canSave} data-size="sm">
            {isSaving ? (
              <>
                <Spinner aria-hidden data-size="xs" />
                {labels.saving}
              </>
            ) : (
              <>
                <SaveIcon aria-hidden />
                {labels.saveSettings}
              </>
            )}
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}
