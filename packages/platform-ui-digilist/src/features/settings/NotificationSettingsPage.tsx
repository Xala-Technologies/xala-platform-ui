/**
 * NotificationSettingsPage - Pure Presentational Component
 *
 * REFACTORED: All SDK and i18n dependencies removed.
 * This component is now a pure presentational component that receives all data via props.
 *
 * For SDK-connected versions, implement these in your app layer using:
 * - useFeature(settingsFeature) from @digilist/client-sdk
 * - useTenantSettings() from @digilist/client-sdk/hooks
 * - useT() from @xala-technologies/platform/i18n
 *
 * @example
 * ```tsx
 * // In your app layer
 * import { NotificationsTab } from '@xala-technologies/platform-ui/blocks/settings';
 * import { useT } from '@xala-technologies/platform/i18n';
 * import { useTenantSettings, useUpdateTenantSettings } from '@digilist/client-sdk/hooks';
 *
 * function NotificationSettingsPageConnected() {
 *   const t = useT();
 *   const { data: settingsData, isLoading } = useTenantSettings();
 *   const updateMutation = useUpdateTenantSettings();
 *
 *   // Implement your state management and handlers here
 *
 *   return (
 *     <NotificationsTab
 *       notificationData={notificationData}
 *       isSaving={isSaving}
 *       onFieldChange={handleFieldChange}
 *       onSave={handleSave}
 *       onReset={handleReset}
 *       labels={{
 *         title: t('settings.notifications.title'),
 *         // ... other labels
 *       }}
 *     />
 *   );
 * }
 * ```
 *
 * @deprecated This page component should be implemented in the app layer. Use blocks/settings/NotificationsTab directly.
 * @module @xala-technologies/platform-ui/features/settings
 */

import { NotificationsTab } from '@xala-technologies/platform-ui-core';
import type { NotificationSettingsData } from '@xala-technologies/platform-ui-core';

export interface NotificationSettingsPageProps {
  /** Current notification settings data */
  notificationData: NotificationSettingsData;
  /** Whether save operation is in progress */
  isSaving?: boolean;
  /** Whether initial data is loading */
  isLoading?: boolean;
  /** Whether save was successful */
  saveSuccess?: boolean;
  /** Error message if save failed */
  saveError?: string;
  /** Validation errors for form fields */
  validationErrors?: Record<string, string>;
  /** Whether to show reminder hours field */
  shouldShowReminderHours?: boolean;
  /** Whether form has unsaved changes */
  hasChanges?: boolean;
  /** Whether form can be saved (valid and has changes) */
  canSave?: boolean;
  /** Handler for field value changes */
  onFieldChange: <K extends keyof NotificationSettingsData>(
    field: K,
    value: NotificationSettingsData[K]
  ) => void;
  /** Handler for save action */
  onSave: () => void;
  /** Handler for reset action */
  onReset: () => void;
  /** UI labels for all text content */
  labels?: {
    title?: string;
    description?: string;
    emailNotifications?: string;
    emailDescription?: string;
    smsNotifications?: string;
    smsDescription?: string;
    pushNotifications?: string;
    pushDescription?: string;
    bookingConfirmation?: string;
    bookingConfirmationDescription?: string;
    bookingReminder?: string;
    bookingReminderDescription?: string;
    reminderHoursBefore?: string;
    reminderHoursBeforePlaceholder?: string;
    saveSettings?: string;
    resetSettings?: string;
    saving?: string;
    saveSuccess?: string;
    saveError?: string;
  };
  /** Callback when settings are saved successfully */
  onSaveSuccess?: () => void;
  /** Callback when save fails */
  onSaveError?: (error: string) => void;
}

/**
 * NotificationSettingsPage - Pure presentational component.
 *
 * All state management and SDK integration should be handled by the parent component.
 */
export function NotificationSettingsPage({
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
  labels,
}: NotificationSettingsPageProps) {
  return (
    <NotificationsTab
      notificationData={notificationData}
      isSaving={isSaving}
      isLoading={isLoading}
      saveSuccess={saveSuccess}
      saveError={saveError}
      validationErrors={validationErrors}
      shouldShowReminderHours={shouldShowReminderHours}
      hasChanges={hasChanges}
      canSave={canSave}
      onFieldChange={onFieldChange}
      onSave={onSave}
      onReset={onReset}
      labels={labels}
    />
  );
}

export default NotificationSettingsPage;
