/**
 * Settings Feature Kit
 *
 * Unified settings feature for user profile AND tenant/organization settings.
 * Includes user-facing tabs and admin tenant configuration.
 *
 * @module @xala-technologies/platform-ui/features/settings
 *
 * ## Usage
 *
 * ```tsx
 * import {
 *   ProfileTab,
 *   NotificationsTab,
 *   AddressesTab,
 *   PreferencesTab,
 *   PrivacyTab,
 * } from '@xala-technologies/platform-ui/features/settings';
 *
 * function SettingsPage() {
 *   const t = useT();
 *
 *   return (
 *     <Tabs>
 *       <TabList>
 *         <Tab>{t('settings.profile')}</Tab>
 *         <Tab>{t('settings.notifications')}</Tab>
 *         <Tab>{t('settings.addresses')}</Tab>
 *         <Tab>{t('settings.preferences')}</Tab>
 *         <Tab>{t('settings.privacy')}</Tab>
 *       </TabList>
 *       <TabPanels>
 *         <TabPanel><ProfileTab /></TabPanel>
 *         <TabPanel><NotificationsTab /></TabPanel>
 *         <TabPanel><AddressesTab /></TabPanel>
 *         <TabPanel><PreferencesTab /></TabPanel>
 *         <TabPanel><PrivacyTab /></TabPanel>
 *       </TabPanels>
 *     </Tabs>
 *   );
 * }
 * ```
 *
 * ## Hooks
 *
 * For custom implementations, hooks are available:
 *
 * ```tsx
 * import { useNotificationSettings } from '@xala-technologies/platform-ui/features/settings';
 *
 * function CustomNotificationForm() {
 *   const { notificationData, updateField, saveNotificationSettings } = useNotificationSettings();
 *   // Build custom UI
 * }
 * ```
 */

// =============================================================================
// Page Component (Pure Presentational)
// =============================================================================

export { NotificationSettingsPage } from './NotificationSettingsPage';
export type { NotificationSettingsPageProps } from './NotificationSettingsPage';

// =============================================================================
// User Settings Tab Components (Pure Presentational)
// =============================================================================

export {
  ProfileTab,
  NotificationsTab,
  AddressesTab,
  PreferencesTab,
  PrivacyTab,
} from './components';

export type {
  ProfileTabProps,
  ProfileData,
  ProfileAddress,
  ProfileTabLabels,
  NotificationsTabProps,
  NotificationsTabLabels,
  NotificationSettingsData,
  AddressesTabProps,
  AddressesTabLabels,
  AddressData,
  Address,
  PreferencesTabProps,
  PreferencesTabLabels,
  PrivacyTabProps,
  PrivacyTabLabels,
  PrivacyConsentSettings,
} from './components';

// =============================================================================
// Hooks (Deprecated - Documentation Only)
// =============================================================================

// DEPRECATED: These hooks are kept for documentation purposes.
// Implement these in your app layer with SDK dependencies.
export { useNotificationSettings } from './hooks';
export type { NotificationSettingsData as NotificationSettingsDataLegacy } from './hooks';

// =============================================================================
// Tenant/Organization Settings (merged from backoffice-settings)
// =============================================================================

export { GeneralTab, type GeneralTabProps } from './tenant';
export { BrandingTab, type BrandingTabProps } from './tenant';
export { BookingTab, type BookingTabProps } from './tenant';
export { IntegrationsTab, type IntegrationsTabProps } from './tenant';

// =============================================================================
// Tenant Types (merged from backoffice-settings)
// =============================================================================

export type {
  SettingsSection,
  SettingsState,
  Locale,
  Timezone,
  Currency,
  DateFormat,
  TimeFormat,
  GeneralSettingsData,
  BrandingSettingsData,
  BookingSettingsData,
  Integration,
  IntegrationsData,
  IntegrationProvider,
} from './tenant-types';

export {
  DEFAULT_GENERAL_SETTINGS,
  DEFAULT_BRANDING_SETTINGS,
  DEFAULT_BOOKING_SETTINGS,
} from './tenant-types';
