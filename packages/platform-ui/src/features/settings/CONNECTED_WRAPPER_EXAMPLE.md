# Settings Feature - Connected Wrapper Examples

This document provides practical examples for integrating the pure presentational Settings components into your application with SDK/i18n dependencies.

---

## Table of Contents

1. [User Settings Wrappers](#user-settings-wrappers)
2. [Tenant Settings Wrappers](#tenant-settings-wrappers)
3. [Complete Settings Page Example](#complete-settings-page-example)
4. [i18n Translation Keys](#i18n-translation-keys)

---

## User Settings Wrappers

User settings components are **already wrapped** in `/features/settings/components/`. You can use them directly:

### ProfileTab (Already Wrapped)

```typescript
// app/routes/settings/UserSettingsPage.tsx
import { ProfileTab } from '@xala-technologies/platform-ui/features/settings';

export function UserSettingsPage() {
  return (
    <div>
      <h1>User Settings</h1>
      <ProfileTab />
    </div>
  );
}
```

The `ProfileTab` wrapper automatically:
- Fetches current user data
- Manages profile form state
- Handles avatar uploads
- Saves profile updates
- Wraps the pure presentational component from `/blocks/settings/ProfileTab`

### NotificationsTab (Already Wrapped)

```typescript
// app/routes/settings/NotificationsPage.tsx
import { NotificationsTab } from '@xala-technologies/platform-ui/features/settings';

export function NotificationsPage() {
  return (
    <div>
      <h1>Notification Settings</h1>
      <NotificationsTab />
    </div>
  );
}
```

The `NotificationsTab` wrapper automatically:
- Uses `useNotificationSettings` hook
- Fetches tenant notification settings
- Manages notification preferences
- Saves notification updates

### AddressesTab (Already Wrapped)

```typescript
// app/routes/settings/AddressesPage.tsx
import { AddressesTab } from '@xala-technologies/platform-ui/features/settings';

export function AddressesPage() {
  return (
    <div>
      <h1>Address Settings</h1>
      <AddressesTab />
    </div>
  );
}
```

### PreferencesTab (Already Wrapped)

```typescript
// app/routes/settings/PreferencesPage.tsx
import { PreferencesTab } from '@xala-technologies/platform-ui/features/settings';

export function PreferencesPage() {
  return (
    <div>
      <h1>Preferences</h1>
      <PreferencesTab />
    </div>
  );
}
```

### PrivacyTab (Requires Wrapper)

```typescript
// app/features/settings/ConnectedPrivacyTab.tsx
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useT } from '@xala-technologies/platform/i18n';
import { PrivacyTab, type PrivacyTabLabels, type ConsentSettings } from '@xala-technologies/platform-ui/features/settings';
import {
  useConsents,
  useUpdateConsents,
  useExportData,
  useDeleteAccount,
} from '@digilist/client-sdk';
import { useAuth } from '@xala-technologies/platform/auth';

export function ConnectedPrivacyTab() {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const t = useT();
  const [isExporting, setIsExporting] = useState(false);

  // SDK queries
  const { data: consentsData } = useConsents();
  const consents = consentsData?.data;

  // SDK mutations
  const updateConsentsMutation = useUpdateConsents();
  const exportDataMutation = useExportData();
  const deleteAccountMutation = useDeleteAccount();

  // State
  const [consentSettings, setConsentSettings] = useState<ConsentSettings>({
    marketing: false,
    analytics: false,
    thirdPartySharing: false,
  });

  // Load consents
  useEffect(() => {
    if (consents) {
      const data = consents as Record<string, unknown>;
      if (Array.isArray(data)) {
        const findConsent = (type: string) =>
          (data as Array<{ type: string; granted: boolean }>).find((c) => c.type === type)
            ?.granted ?? false;
        setConsentSettings({
          marketing: findConsent('marketing'),
          analytics: findConsent('analytics'),
          thirdPartySharing: findConsent('thirdPartySharing'),
        });
      } else {
        setConsentSettings({
          marketing: (data.marketing as boolean) || false,
          analytics: (data.analytics as boolean) || false,
          thirdPartySharing: (data.thirdPartySharing as boolean) || false,
        });
      }
    }
  }, [consents]);

  // Handlers
  const handleExportData = async () => {
    setIsExporting(true);
    try {
      const result = await exportDataMutation.mutateAsync();
      const dataStr = JSON.stringify(result.data, null, 2);
      const dataBlob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(dataBlob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `mine-data-${new Date().toISOString()}.json`;
      link.click();
      URL.revokeObjectURL(url);
    } finally {
      setIsExporting(false);
    }
  };

  const handleDeleteAccount = async () => {
    if (confirm(t('common.er_du_sikker_paa'))) {
      try {
        await deleteAccountMutation.mutateAsync();
        logout();
        navigate('/');
      } catch {
        // Error handled by SDK
      }
    }
  };

  const handleUpdateConsent = async (field: keyof ConsentSettings, value: boolean) => {
    const newConsents = { ...consentSettings, [field]: value };
    setConsentSettings(newConsents);
    try {
      const payload = [
        { type: 'marketing', granted: newConsents.marketing },
        { type: 'analytics', granted: newConsents.analytics },
        { type: 'thirdPartySharing', granted: newConsents.thirdPartySharing },
      ];
      await updateConsentsMutation.mutateAsync(payload);
    } catch {
      // Error handled by SDK
    }
  };

  // Labels
  const labels: PrivacyTabLabels = {
    dataExportTitle: t('common.dataeksport'),
    dataExportDescription: t('common.last.ned.kopi.av.personopplysninger'),
    dataExportInfo: t('common.gdpr.eksport.beskrivelse'),
    downloadDataButton: t('common.last.ned.mine.data'),
    exportingButton: t('common.eksporterer'),

    consentsTitle: t('common.samtykker'),
    consentsDescription: t('common.administrer.hvordan.vi.bruker.data'),

    marketingLabel: t('common.markedsforing'),
    marketingDescription: t('common.motta.tips.tilbud.nyheter'),

    analyticsLabel: t('common.analyse'),
    analyticsDescription: t('common.hjelp.oss.forbedre.tjenesten'),

    thirdPartySharingLabel: t('common.deling.med.tredjeparter'),
    thirdPartySharingDescription: t('common.tillat.deling.med.partnere'),

    deleteAccountTitle: t('common.slett.konto'),
    deleteAccountDescription: t('common.permanent.sletting.av.konto'),
    deleteAccountWarningTitle: t('common.dette.kan.ikke.angres'),
    deleteAccountWarningText: t('common.sletting.advarsel'),
    deleteAccountButton: t('common.slett.min.konto'),
  };

  return (
    <PrivacyTab
      consentSettings={consentSettings}
      labels={labels}
      isExporting={isExporting}
      onExportData={handleExportData}
      onUpdateConsent={handleUpdateConsent}
      onDeleteAccount={handleDeleteAccount}
    />
  );
}
```

---

## Tenant Settings Wrappers

Tenant settings components are **pure presentational** and require you to create wrappers in your app.

### GeneralTab Wrapper

```typescript
// app/features/settings/tenant/ConnectedGeneralTab.tsx
import { useState, useEffect } from 'react';
import { useT } from '@xala-technologies/platform/i18n';
import {
  GeneralTab,
  type GeneralTabLabels,
  type GeneralSettingsData,
  DEFAULT_GENERAL_SETTINGS,
} from '@xala-technologies/platform-ui/features/settings';
import { useTenantSettings, useUpdateTenantSettings } from '@digilist/client-sdk';

export function ConnectedGeneralTab() {
  const t = useT();
  const [isSaving, setIsSaving] = useState(false);

  // Fetch tenant settings
  const { data: settingsData } = useTenantSettings();
  const updateSettingsMutation = useUpdateTenantSettings();

  // Form state
  const [generalData, setGeneralData] = useState<GeneralSettingsData>(DEFAULT_GENERAL_SETTINGS);

  // Load settings into form
  useEffect(() => {
    if (settingsData?.data?.general) {
      setGeneralData(settingsData.data.general);
    }
  }, [settingsData]);

  // Save handler
  const handleSave = async () => {
    if (!settingsData?.data) return;

    setIsSaving(true);
    try {
      await updateSettingsMutation.mutateAsync({
        ...settingsData.data,
        general: generalData,
      });
    } finally {
      setIsSaving(false);
    }
  };

  // Field change handler
  const handleFieldChange = <K extends keyof GeneralSettingsData>(
    field: K,
    value: GeneralSettingsData[K]
  ) => {
    setGeneralData((prev) => ({ ...prev, [field]: value }));
  };

  // Labels (i18n)
  const labels: GeneralTabLabels = {
    title: t('settings.general.title'),
    description: t('settings.general.description'),
    systemName: t('settings.general.systemName'),
    systemNameDescription: t('settings.general.systemNameDescription'),
    systemNamePlaceholder: t('settings.general.systemNamePlaceholder'),
    language: t('settings.general.language'),
    languageNb: t('settings.general.language.nb'),
    languageNn: t('settings.general.language.nn'),
    languageEn: t('settings.general.language.en'),
    timezone: t('settings.general.timezone'),
    timezoneOslo: t('settings.general.timezone.oslo'),
    timezoneLondon: t('settings.general.timezone.london'),
    timezoneNewYork: t('settings.general.timezone.newYork'),
    currency: t('settings.general.currency'),
    currencyNok: t('settings.general.currency.nok'),
    currencyEur: t('settings.general.currency.eur'),
    currencyUsd: t('settings.general.currency.usd'),
    dateFormat: t('settings.general.dateFormat'),
    timeFormat: t('settings.general.timeFormat'),
    timeFormat24h: t('settings.general.timeFormat.24h'),
    timeFormat12h: t('settings.general.timeFormat.12h'),
    saveChanges: t('action.saveChanges'),
    saving: t('state.saving'),
  };

  return (
    <GeneralTab
      data={generalData}
      labels={labels}
      isSaving={isSaving}
      onFieldChange={handleFieldChange}
      onSave={handleSave}
    />
  );
}
```

### BrandingTab Wrapper

```typescript
// app/features/settings/tenant/ConnectedBrandingTab.tsx
import { useState, useEffect } from 'react';
import { useT } from '@xala-technologies/platform/i18n';
import {
  BrandingTab,
  type BrandingTabLabels,
  type BrandingSettingsData,
  DEFAULT_BRANDING_SETTINGS,
} from '@xala-technologies/platform-ui/features/settings';
import { useTenantSettings, useUpdateTenantSettings } from '@digilist/client-sdk';

export function ConnectedBrandingTab() {
  const t = useT();
  const [isSaving, setIsSaving] = useState(false);

  const { data: settingsData } = useTenantSettings();
  const updateSettingsMutation = useUpdateTenantSettings();

  const [brandingData, setBrandingData] = useState<BrandingSettingsData>(
    DEFAULT_BRANDING_SETTINGS
  );

  useEffect(() => {
    if (settingsData?.data?.branding) {
      setBrandingData(settingsData.data.branding);
    }
  }, [settingsData]);

  const handleSave = async () => {
    if (!settingsData?.data) return;

    setIsSaving(true);
    try {
      await updateSettingsMutation.mutateAsync({
        ...settingsData.data,
        branding: brandingData,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFieldChange = <K extends keyof BrandingSettingsData>(
    field: K,
    value: BrandingSettingsData[K]
  ) => {
    setBrandingData((prev) => ({ ...prev, [field]: value }));
  };

  const labels: BrandingTabLabels = {
    title: t('settings.branding.title'),
    description: t('settings.branding.description'),
    logoUrl: t('settings.branding.logoUrl'),
    logoUrlDescription: t('settings.branding.logoUrlDescription'),
    logoUrlPlaceholder: t('settings.branding.logoUrlPlaceholder'),
    primaryColor: t('settings.branding.primaryColor'),
    primaryColorDescription: t('settings.branding.primaryColorDescription'),
    secondaryColor: t('settings.branding.secondaryColor'),
    secondaryColorDescription: t('settings.branding.secondaryColorDescription'),
    faviconUrl: t('settings.branding.faviconUrl'),
    faviconUrlDescription: t('settings.branding.faviconUrlDescription'),
    faviconUrlPlaceholder: t('settings.branding.faviconUrlPlaceholder'),
    saveChanges: t('action.saveChanges'),
    saving: t('state.saving'),
  };

  return (
    <BrandingTab
      data={brandingData}
      labels={labels}
      isSaving={isSaving}
      onFieldChange={handleFieldChange}
      onSave={handleSave}
    />
  );
}
```

### BookingTab Wrapper

```typescript
// app/features/settings/tenant/ConnectedBookingTab.tsx
import { useState, useEffect } from 'react';
import { useT } from '@xala-technologies/platform/i18n';
import {
  BookingTab,
  type BookingTabLabels,
  type BookingSettingsData,
  DEFAULT_BOOKING_SETTINGS,
} from '@xala-technologies/platform-ui/features/settings';
import { useTenantSettings, useUpdateTenantSettings } from '@digilist/client-sdk';

export function ConnectedBookingTab() {
  const t = useT();
  const [isSaving, setIsSaving] = useState(false);

  const { data: settingsData } = useTenantSettings();
  const updateSettingsMutation = useUpdateTenantSettings();

  const [bookingData, setBookingData] = useState<BookingSettingsData>(DEFAULT_BOOKING_SETTINGS);

  useEffect(() => {
    if (settingsData?.data?.booking) {
      setBookingData(settingsData.data.booking);
    }
  }, [settingsData]);

  const handleSave = async () => {
    if (!settingsData?.data) return;

    setIsSaving(true);
    try {
      await updateSettingsMutation.mutateAsync({
        ...settingsData.data,
        booking: bookingData,
      });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFieldChange = <K extends keyof BookingSettingsData>(
    field: K,
    value: BookingSettingsData[K]
  ) => {
    setBookingData((prev) => ({ ...prev, [field]: value }));
  };

  const labels: BookingTabLabels = {
    title: t('settings.booking.title'),
    description: t('settings.booking.description'),
    autoConfirm: t('settings.booking.autoConfirm'),
    autoConfirmDescription: t('settings.booking.autoConfirmDescription'),
    requireApproval: t('settings.booking.requireApproval'),
    requireApprovalDescription: t('settings.booking.requireApprovalDescription'),
    allowCancellation: t('settings.booking.allowCancellation'),
    allowCancellationDescription: t('settings.booking.allowCancellationDescription'),
    cancellationDeadline: t('settings.booking.cancellationDeadline'),
    cancellationDeadlineDescription: t('settings.booking.cancellationDeadlineDescription'),
    maxAdvanceBooking: t('settings.booking.maxAdvanceBooking'),
    maxAdvanceBookingDescription: t('settings.booking.maxAdvanceBookingDescription'),
    minAdvanceBooking: t('settings.booking.minAdvanceBooking'),
    minAdvanceBookingDescription: t('settings.booking.minAdvanceBookingDescription'),
    bufferTime: t('settings.booking.bufferTime'),
    bufferTimeDescription: t('settings.booking.bufferTimeDescription'),
    hours: t('common.hours'),
    days: t('common.days'),
    minutes: t('common.minutes'),
    saveChanges: t('action.saveChanges'),
    saving: t('state.saving'),
  };

  return (
    <BookingTab
      data={bookingData}
      labels={labels}
      isSaving={isSaving}
      onFieldChange={handleFieldChange}
      onSave={handleSave}
    />
  );
}
```

### IntegrationsTab Wrapper

```typescript
// app/features/settings/tenant/ConnectedIntegrationsTab.tsx
import { useState, useEffect } from 'react';
import { useT } from '@xala-technologies/platform/i18n';
import {
  IntegrationsTab,
  type IntegrationsTabLabels,
  type IntegrationsData,
  type IntegrationProvider,
} from '@xala-technologies/platform-ui/features/settings';
import { useTenantSettings, useUpdateTenantSettings } from '@digilist/client-sdk';

export function ConnectedIntegrationsTab() {
  const t = useT();

  const { data: settingsData } = useTenantSettings();
  const updateSettingsMutation = useUpdateTenantSettings();

  const [integrations, setIntegrations] = useState<IntegrationsData>({});

  useEffect(() => {
    if (settingsData?.data?.integrations) {
      setIntegrations(settingsData.data.integrations);
    }
  }, [settingsData]);

  const handleToggle = async (provider: IntegrationProvider, enabled: boolean) => {
    if (!settingsData?.data) return;

    const updatedIntegrations = {
      ...integrations,
      [provider]: {
        ...integrations[provider],
        enabled,
        configuredAt: enabled ? new Date().toISOString() : undefined,
      },
    };

    setIntegrations(updatedIntegrations);

    try {
      await updateSettingsMutation.mutateAsync({
        ...settingsData.data,
        integrations: updatedIntegrations,
      });
    } catch {
      // Revert on error
      setIntegrations(integrations);
    }
  };

  const labels: IntegrationsTabLabels = {
    // Sections
    sectionAuthentication: t('settings.integration.section.authentication'),
    sectionAuthenticationDescription: t('settings.integration.section.authenticationDescription'),
    sectionPayment: t('settings.integration.section.payment'),
    sectionPaymentDescription: t('settings.integration.section.paymentDescription'),
    sectionAccessControl: t('settings.integration.section.accessControl'),
    sectionAccessControlDescription: t('settings.integration.section.accessControlDescription'),
    sectionCalendar: t('settings.integration.section.calendar'),
    sectionCalendarDescription: t('settings.integration.section.calendarDescription'),
    sectionFinance: t('settings.integration.section.finance'),
    sectionFinanceDescription: t('settings.integration.section.financeDescription'),
    sectionPublicRegisters: t('settings.integration.section.publicRegisters'),
    sectionPublicRegistersDescription: t('settings.integration.section.publicRegistersDescription'),

    // Integrations
    bankid: t('settings.integration.bankid'),
    bankidDescription: t('settings.integration.bankidDescription'),
    idporten: t('settings.integration.idporten'),
    idportenDescription: t('settings.integration.idportenDescription'),
    vipps: t('settings.integration.vipps'),
    vippsDescription: t('settings.integration.vippsDescription'),
    rco: t('settings.integration.rco'),
    rcoDescription: t('settings.integration.rcoDescription'),
    googleCalendar: t('settings.integration.googleCalendar'),
    googleCalendarDescription: t('settings.integration.googleCalendarDescription'),
    outlook: t('settings.integration.outlook'),
    outlookDescription: t('settings.integration.outlookDescription'),
    visma: t('settings.integration.visma'),
    vismaDescription: t('settings.integration.vismaDescription'),
    brreg: t('settings.integration.brreg'),
    brregDescription: t('settings.integration.brregDescription'),

    // Status
    active: t('settings.integration.active'),
    inactive: t('settings.integration.inactive'),
  };

  return <IntegrationsTab integrations={integrations} labels={labels} onToggle={handleToggle} />;
}
```

---

## Complete Settings Page Example

```typescript
// app/routes/settings/SettingsPage.tsx
import { Tabs } from '@digdir/designsystemet-react';
import { useT } from '@xala-technologies/platform/i18n';

// User settings (already wrapped)
import {
  ProfileTab,
  NotificationsTab,
  AddressesTab,
  PreferencesTab,
} from '@xala-technologies/platform-ui/features/settings';

// Tenant settings (your connected wrappers)
import { ConnectedPrivacyTab } from '../features/settings/ConnectedPrivacyTab';
import { ConnectedGeneralTab } from '../features/settings/tenant/ConnectedGeneralTab';
import { ConnectedBrandingTab } from '../features/settings/tenant/ConnectedBrandingTab';
import { ConnectedBookingTab } from '../features/settings/tenant/ConnectedBookingTab';
import { ConnectedIntegrationsTab } from '../features/settings/tenant/ConnectedIntegrationsTab';

export function SettingsPage() {
  const t = useT();

  return (
    <div>
      <h1>{t('settings.title')}</h1>

      <Tabs defaultValue="profile">
        <Tabs.List>
          <Tabs.Tab value="profile">{t('settings.tabs.profile')}</Tabs.Tab>
          <Tabs.Tab value="notifications">{t('settings.tabs.notifications')}</Tabs.Tab>
          <Tabs.Tab value="addresses">{t('settings.tabs.addresses')}</Tabs.Tab>
          <Tabs.Tab value="preferences">{t('settings.tabs.preferences')}</Tabs.Tab>
          <Tabs.Tab value="privacy">{t('settings.tabs.privacy')}</Tabs.Tab>
          <Tabs.Tab value="general">{t('settings.tabs.general')}</Tabs.Tab>
          <Tabs.Tab value="branding">{t('settings.tabs.branding')}</Tabs.Tab>
          <Tabs.Tab value="booking">{t('settings.tabs.booking')}</Tabs.Tab>
          <Tabs.Tab value="integrations">{t('settings.tabs.integrations')}</Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="profile">
          <ProfileTab />
        </Tabs.Panel>

        <Tabs.Panel value="notifications">
          <NotificationsTab />
        </Tabs.Panel>

        <Tabs.Panel value="addresses">
          <AddressesTab />
        </Tabs.Panel>

        <Tabs.Panel value="preferences">
          <PreferencesTab />
        </Tabs.Panel>

        <Tabs.Panel value="privacy">
          <ConnectedPrivacyTab />
        </Tabs.Panel>

        <Tabs.Panel value="general">
          <ConnectedGeneralTab />
        </Tabs.Panel>

        <Tabs.Panel value="branding">
          <ConnectedBrandingTab />
        </Tabs.Panel>

        <Tabs.Panel value="booking">
          <ConnectedBookingTab />
        </Tabs.Panel>

        <Tabs.Panel value="integrations">
          <ConnectedIntegrationsTab />
        </Tabs.Panel>
      </Tabs>
    </div>
  );
}
```

---

## i18n Translation Keys

You'll need to add the following translation keys to your i18n files:

### General Tab Keys

```json
{
  "settings.general.title": "General Settings",
  "settings.general.description": "Configure system-wide settings",
  "settings.general.systemName": "System Name",
  "settings.general.systemNameDescription": "The name of your organization or system",
  "settings.general.systemNamePlaceholder": "Enter system name",
  "settings.general.language": "Language",
  "settings.general.language.nb": "Norwegian Bokmål",
  "settings.general.language.nn": "Norwegian Nynorsk",
  "settings.general.language.en": "English",
  "settings.general.timezone": "Timezone",
  "settings.general.timezone.oslo": "Europe/Oslo (CET/CEST)",
  "settings.general.timezone.london": "Europe/London (GMT/BST)",
  "settings.general.timezone.newYork": "America/New York (EST/EDT)",
  "settings.general.currency": "Currency",
  "settings.general.currency.nok": "Norwegian Krone (NOK)",
  "settings.general.currency.eur": "Euro (EUR)",
  "settings.general.currency.usd": "US Dollar (USD)",
  "settings.general.dateFormat": "Date Format",
  "settings.general.timeFormat": "Time Format",
  "settings.general.timeFormat.24h": "24-hour",
  "settings.general.timeFormat.12h": "12-hour (AM/PM)"
}
```

### Branding Tab Keys

```json
{
  "settings.branding.title": "Branding",
  "settings.branding.description": "Customize your organization's visual identity",
  "settings.branding.logoUrl": "Logo URL",
  "settings.branding.logoUrlDescription": "URL to your organization's logo",
  "settings.branding.logoUrlPlaceholder": "https://example.com/logo.png",
  "settings.branding.primaryColor": "Primary Color",
  "settings.branding.primaryColorDescription": "Main brand color (hex code)",
  "settings.branding.secondaryColor": "Secondary Color",
  "settings.branding.secondaryColorDescription": "Secondary brand color (hex code)",
  "settings.branding.faviconUrl": "Favicon URL",
  "settings.branding.faviconUrlDescription": "URL to your favicon",
  "settings.branding.faviconUrlPlaceholder": "https://example.com/favicon.ico"
}
```

### Booking Tab Keys

```json
{
  "settings.booking.title": "Booking Settings",
  "settings.booking.description": "Configure booking behavior and rules",
  "settings.booking.autoConfirm": "Auto-confirm Bookings",
  "settings.booking.autoConfirmDescription": "Automatically confirm new bookings without manual approval",
  "settings.booking.requireApproval": "Require Approval",
  "settings.booking.requireApprovalDescription": "All bookings must be manually approved",
  "settings.booking.allowCancellation": "Allow Cancellations",
  "settings.booking.allowCancellationDescription": "Users can cancel their bookings",
  "settings.booking.cancellationDeadline": "Cancellation Deadline",
  "settings.booking.cancellationDeadlineDescription": "How many hours before the booking users can cancel",
  "settings.booking.maxAdvanceBooking": "Max Advance Booking",
  "settings.booking.maxAdvanceBookingDescription": "How many days in advance users can book",
  "settings.booking.minAdvanceBooking": "Min Advance Booking",
  "settings.booking.minAdvanceBookingDescription": "Minimum hours before booking time",
  "settings.booking.bufferTime": "Buffer Time",
  "settings.booking.bufferTimeDescription": "Minutes between bookings for preparation"
}
```

### Integrations Tab Keys

```json
{
  "settings.integration.section.authentication": "Authentication",
  "settings.integration.section.authenticationDescription": "Configure authentication providers",
  "settings.integration.section.payment": "Payment",
  "settings.integration.section.paymentDescription": "Configure payment providers",
  "settings.integration.section.accessControl": "Access Control",
  "settings.integration.section.accessControlDescription": "Configure access control systems",
  "settings.integration.section.calendar": "Calendar",
  "settings.integration.section.calendarDescription": "Integrate with calendar systems",
  "settings.integration.section.finance": "Finance & ERP",
  "settings.integration.section.financeDescription": "Integrate with financial systems",
  "settings.integration.section.publicRegisters": "Public Registers",
  "settings.integration.section.publicRegistersDescription": "Integrate with public data sources",

  "settings.integration.bankid": "BankID",
  "settings.integration.bankidDescription": "Norwegian electronic ID solution",
  "settings.integration.idporten": "ID-porten",
  "settings.integration.idportenDescription": "Norwegian government login service",
  "settings.integration.vipps": "Vipps",
  "settings.integration.vippsDescription": "Norwegian mobile payment solution",
  "settings.integration.rco": "RCO",
  "settings.integration.rcoDescription": "RCO access control system",
  "settings.integration.googleCalendar": "Google Calendar",
  "settings.integration.googleCalendarDescription": "Sync with Google Calendar",
  "settings.integration.outlook": "Outlook Calendar",
  "settings.integration.outlookDescription": "Sync with Microsoft Outlook",
  "settings.integration.visma": "Visma",
  "settings.integration.vismaDescription": "Integrate with Visma accounting",
  "settings.integration.brreg": "Brønnøysundregistrene",
  "settings.integration.brregDescription": "Norwegian company registry data",

  "settings.integration.active": "Active",
  "settings.integration.inactive": "Inactive"
}
```

### Common Keys

```json
{
  "common.hours": "hours",
  "common.days": "days",
  "common.minutes": "minutes",
  "action.saveChanges": "Save Changes",
  "state.saving": "Saving..."
}
```

---

## Summary

**User Settings:**
- Use the pre-built wrappers from `/features/settings/components/`
- ProfileTab, NotificationsTab, AddressesTab, PreferencesTab work out of the box
- PrivacyTab requires a custom wrapper (example provided)

**Tenant Settings:**
- Create connected wrappers in your app
- Use `useTenantSettings` and `useUpdateTenantSettings` hooks
- Map i18n translations to label props
- Handle form state and mutations in the wrapper

**Best Practices:**
- Keep all SDK/i18n logic in connected wrappers
- Pass complete label objects to pure components
- Use TypeScript for type safety
- Test wrappers with real data before deploying

---

## Related Documentation

- **Refactoring Summary:** `./REFACTORING_SUMMARY.md`
- **Pure UI Guide:** `/docs/PURE_UI_REFACTORING_GUIDE.md`
- **GDPR Example:** `/src/features/gdpr/CONNECTED_WRAPPER_EXAMPLE.md`
