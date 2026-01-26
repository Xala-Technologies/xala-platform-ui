/**
 * Settings Components
 *
 * Pure presentational settings tab components.
 * All SDK and i18n dependencies have been removed.
 *
 * These re-export the pure presentational components from blocks/settings.
 *
 * @module @xala-technologies/platform-ui/features/settings
 */

export { ProfileTab } from './ProfileTab';
export type { ProfileTabProps, ProfileData, ProfileAddress, ProfileTabLabels } from './ProfileTab';

export { NotificationsTab } from './NotificationsTab';
export type { NotificationsTabProps, NotificationsTabLabels, NotificationSettingsData } from './NotificationsTab';

export { AddressesTab } from './AddressesTab';
export type { AddressesTabProps, AddressesTabLabels, AddressData, Address } from './AddressesTab';

export { PreferencesTab } from './PreferencesTab';
export type { PreferencesTabProps, PreferencesTabLabels } from './PreferencesTab';

export { PrivacyTab } from './PrivacyTab';
export type { PrivacyTabProps, PrivacyTabLabels, PrivacyConsentSettings } from './PrivacyTab';
