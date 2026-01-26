/**
 * useNotificationSettings Hook
 *
 * DEPRECATED: This hook contains SDK dependencies and should NOT be used from platform-ui.
 *
 * This file is kept for documentation purposes only. Implement this logic in your app layer.
 *
 * @example App Layer Implementation
 * ```tsx
 * // In your app layer (e.g., apps/my-app/src/hooks/useNotificationSettings.ts)
 * import { useState, useEffect, useCallback } from 'react';
 * import { useTenantSettings, useUpdateTenantSettings } from '@digilist/client-sdk';
 * import type { NotificationSettingsData } from '@xala-technologies/platform-ui/blocks/settings';
 *
 * export function useNotificationSettings(options = {}) {
 *   const { onSaveSuccess, onSaveError } = options;
 *   const [isSaving, setIsSaving] = useState(false);
 *   const [saveSuccess, setSaveSuccess] = useState(false);
 *
 *   const { data: settingsData, isLoading: isLoadingSettings } = useTenantSettings();
 *   const tenantSettings = settingsData?.data;
 *   const updateSettingsMutation = useUpdateTenantSettings();
 *
 *   const [notificationData, setNotificationData] = useState<NotificationSettingsData>({
 *     emailEnabled: true,
 *     smsEnabled: false,
 *     pushEnabled: true,
 *     bookingConfirmation: true,
 *     bookingReminder: true,
 *     reminderHoursBefore: 24,
 *   });
 *
 *   useEffect(() => {
 *     if (tenantSettings?.notifications) {
 *       setNotificationData({
 *         emailEnabled: tenantSettings.notifications.emailEnabled ?? true,
 *         smsEnabled: tenantSettings.notifications.smsEnabled ?? false,
 *         pushEnabled: tenantSettings.notifications.pushEnabled ?? true,
 *         bookingConfirmation: tenantSettings.notifications.bookingConfirmation ?? true,
 *         bookingReminder: tenantSettings.notifications.bookingReminder ?? true,
 *         reminderHoursBefore: tenantSettings.notifications.reminderHoursBefore ?? 24,
 *       });
 *     }
 *   }, [tenantSettings]);
 *
 *   const updateField = useCallback(
 *     (field, value) => {
 *       setNotificationData((prev) => ({ ...prev, [field]: value }));
 *     },
 *     []
 *   );
 *
 *   const saveNotificationSettings = useCallback(async () => {
 *     if (!tenantSettings) return;
 *     setIsSaving(true);
 *     setSaveSuccess(false);
 *     try {
 *       await updateSettingsMutation.mutateAsync({
 *         ...tenantSettings,
 *         notifications: notificationData,
 *       });
 *       setSaveSuccess(true);
 *       setTimeout(() => setSaveSuccess(false), 3000);
 *       if (onSaveSuccess) onSaveSuccess();
 *     } catch (error) {
 *       if (onSaveError) onSaveError(error);
 *     } finally {
 *       setIsSaving(false);
 *     }
 *   }, [notificationData, tenantSettings, updateSettingsMutation, onSaveSuccess, onSaveError]);
 *
 *   return {
 *     notificationData,
 *     isSaving,
 *     saveSuccess,
 *     isLoadingSettings,
 *     tenantSettings,
 *     updateField,
 *     saveNotificationSettings,
 *     shouldShowReminderHours: notificationData.bookingReminder,
 *   };
 * }
 * ```
 *
 * @deprecated Move this to your app layer. Do not import from platform-ui.
 * @module @xala-technologies/platform-ui/features/settings
 */

export interface NotificationSettingsData {
  emailEnabled: boolean;
  smsEnabled: boolean;
  pushEnabled: boolean;
  bookingConfirmation: boolean;
  bookingReminder: boolean;
  reminderHoursBefore: number;
}

interface UseNotificationSettingsOptions {
  onSaveSuccess?: () => void;
  onSaveError?: (error: unknown) => void;
}

/**
 * @deprecated This hook should be implemented in the app layer with SDK dependencies.
 * See the example in the file header for how to implement this in your app.
 */
export function useNotificationSettings(_options: UseNotificationSettingsOptions = {}) {
  throw new Error(
    'useNotificationSettings is deprecated. Implement this hook in your app layer with SDK dependencies. See the hook file for an example implementation.'
  );
}

export default useNotificationSettings;
