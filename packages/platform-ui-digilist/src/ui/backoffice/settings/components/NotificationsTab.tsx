/**
 * NotificationsTab Component
 * Manages notification settings
 */

import { useState } from 'react';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Stack,
  FormField,
  Textfield,
  Switch,
  SaveIcon,
} from '@xala-technologies/platform-ui';
import {
  useTenantSettings,
  useUpdateTenantSettings,
} from '@digilist/client-sdk';
import { useT } from '@xala-technologies/platform/runtime';

interface NotificationSettings {
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  bookingConfirmation: boolean;
  bookingReminder: boolean;
  reminderHoursBefore: number;
}

export function NotificationsTab() {
  const t = useT();

  // Queries
  const { data: settingsData } = useTenantSettings();
  const settings = settingsData?.data;

  // Mutations
  const updateSettingsMutation = useUpdateTenantSettings();

  // Local state
  const [notificationData, setNotificationData] = useState<NotificationSettings>({
    emailEnabled: settings?.notifications?.emailEnabled ?? true,
    smsEnabled: settings?.notifications?.smsEnabled ?? false,
    pushEnabled: settings?.notifications?.pushEnabled ?? false,
    bookingConfirmation: settings?.notifications?.bookingConfirmation ?? true,
    bookingReminder: settings?.notifications?.bookingReminder ?? true,
    reminderHoursBefore: settings?.notifications?.reminderHoursBefore ?? 24,
  });
  const [isSaving, setIsSaving] = useState(false);

  const updateField = <K extends keyof NotificationSettings>(
    field: K,
    value: NotificationSettings[K]
  ) => {
    setNotificationData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      await updateSettingsMutation.mutateAsync({
        notifications: notificationData,
      });
    } catch (error) {
      console.error(t('validation.failed_to_save_settings'), error);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <Card>
      <Stack spacing={5}>
        <Stack spacing={2}>
          <Heading level={3} data-size="sm">
            {t('settings.notifications.page.title', 'Varsler')}
          </Heading>
          <Paragraph data-size="sm" color="subtle">
            {t(
              'settings.notifications.desc',
              'Konfigurer hvordan du mottar varsler'
            )}
          </Paragraph>
        </Stack>

        <Stack spacing={4}>
          <FormField label={t('settings.notifications.email', 'E-postvarsler')}>
            <Switch
              checked={notificationData.emailEnabled}
              aria-label={t(
                'settings.notifications.emailDesc',
                'Motta varsler på e-post'
              )}
              onChange={(checked) => updateField('emailEnabled', checked)}
            >
              {t(
                'settings.notifications.emailDesc',
                'Motta varsler på e-post'
              )}
            </Switch>
          </FormField>

          <FormField label={t('settings.notifications.sms', 'SMS-varsler')}>
            <Switch
              checked={notificationData.smsEnabled}
              aria-label={t(
                'settings.notifications.smsDesc',
                'Motta varsler på SMS'
              )}
              onChange={(checked) => updateField('smsEnabled', checked)}
            >
              {t('settings.notifications.smsDesc', 'Motta varsler på SMS')}
            </Switch>
          </FormField>

          <FormField label={t('settings.notifications.push', 'Push-varsler')}>
            <Switch
              checked={notificationData.pushEnabled}
              aria-label={t(
                'settings.notifications.pushDesc',
                'Motta push-varsler i nettleseren'
              )}
              onChange={(checked) => updateField('pushEnabled', checked)}
            >
              {t(
                'settings.notifications.pushDesc',
                'Motta push-varsler i nettleseren'
              )}
            </Switch>
          </FormField>

          <Card variant="subtle">
            <Stack spacing={3}>
              <Paragraph
                data-size="sm"
                style={{ fontWeight: 'var(--ds-font-weight-semibold)' }}
              >
                {t(
                  'settings.notifications.automatic',
                  'Automatiske varsler'
                )}
              </Paragraph>

              <Stack spacing={3}>
                <FormField
                  label={t(
                    'settings.notifications.bookingConfirmation',
                    'Bookingbekreftelse'
                  )}
                >
                  <Switch
                    checked={notificationData.bookingConfirmation}
                    aria-label={t(
                      'settings.notifications.bookingConfirmationDesc',
                      'Send bekreftelse når booking er godkjent'
                    )}
                    onChange={(checked) =>
                      updateField('bookingConfirmation', checked)
                    }
                  >
                    {t(
                      'settings.notifications.bookingConfirmationDesc',
                      'Send bekreftelse når booking er godkjent'
                    )}
                  </Switch>
                </FormField>

                <FormField
                  label={t(
                    'settings.notifications.bookingReminder',
                    'Bookingpåminnelse'
                  )}
                >
                  <Switch
                    checked={notificationData.bookingReminder}
                    aria-label={t(
                      'settings.notifications.bookingReminderDesc',
                      'Send påminnelse før booking'
                    )}
                    onChange={(checked) =>
                      updateField('bookingReminder', checked)
                    }
                  >
                    {t(
                      'settings.notifications.bookingReminderDesc',
                      'Send påminnelse før booking'
                    )}
                  </Switch>
                </FormField>

                {notificationData.bookingReminder && (
                  <FormField
                    label={t(
                      'settings.notifications.reminderTiming',
                      'Tidspunkt for påminnelse'
                    )}
                    description={t(
                      'settings.notifications.reminderTimingDesc',
                      'Antall timer før booking påminnelsen sendes'
                    )}
                  >
                    <Textfield
                      aria-label={t(
                        'settings.notifications.reminderTiming',
                        'Tidspunkt for påminnelse'
                      )}
                      type="number"
                      value={notificationData.reminderHoursBefore.toString()}
                      onChange={(e) =>
                        updateField(
                          'reminderHoursBefore',
                          parseInt(e.target.value) || 24
                        )
                      }
                      min="1"
                      suffix={t(
                        'settings.booking.unit.hoursBefore',
                        'timer før'
                      )}
                    />
                  </FormField>
                )}
              </Stack>
            </Stack>
          </Card>
        </Stack>

        <div
          style={{
            paddingTop: 'var(--ds-spacing-3)',
            borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Button onClick={handleSave} disabled={isSaving} type="button">
            <SaveIcon />
            {isSaving
              ? t('state.saving', 'Lagrer...')
              : t('settings.profile.save', 'Lagre innstillinger')}
          </Button>
        </div>
      </Stack>
    </Card>
  );
}
