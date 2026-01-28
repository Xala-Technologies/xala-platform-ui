/**
 * SettingsWidget - Complete Settings Dashboard Widget
 *
 * Comprehensive settings dashboard with tabbed navigation for:
 * - Profile management
 * - Address management
 * - General settings
 * - Booking configuration
 * - Notifications
 * - Integrations
 * - Branding
 *
 * @module @digilist/runtime/features/backoffice/settings
 */

import { useState } from 'react';
import {
  Heading,
  Paragraph,
  Tabs,
  Stack,
  Skeleton,
  Alert,
  CheckCircleIcon,
  ContentLayout,
} from '@xala-technologies/platform-ui';
import {
  useTenantSettings,
  useCurrentUser,
} from '@digilist/client-sdk';
import { useT } from '@xala-technologies/platform/runtime';

// Tab components
import { ProfileTab } from './components/ProfileTab';
import { AddressesTab } from './components/AddressesTab';
import { GeneralTab } from './components/GeneralTab';
import { BookingTab } from './components/BookingTab';
import { NotificationsTab } from './components/NotificationsTab';
import { IntegrationsTab } from './components/IntegrationsTab';
import { BrandingTab } from './components/BrandingTab';

export interface SettingsWidgetProps {
  /** Initial active tab */
  initialTab?: SettingsTabId;
  /** Custom class name */
  className?: string;
}

export type SettingsTabId =
  | 'profile'
  | 'addresses'
  | 'general'
  | 'booking'
  | 'notifications'
  | 'integrations'
  | 'branding';

export function SettingsWidget({
  initialTab = 'profile',
  className,
}: SettingsWidgetProps) {
  const t = useT();
  const [activeTab, setActiveTab] = useState<SettingsTabId>(initialTab);
  const [saveSuccess, setSaveSuccess] = useState(false);

  // Queries
  const { isLoading: isLoadingSettings } = useTenantSettings();
  const { isLoading: isLoadingUser } = useCurrentUser();

  const isLoading = isLoadingSettings || isLoadingUser;

  // Loading state - Skeleton screen
  if (isLoading) {
    return (
      <ContentLayout className={className}>
        <Stack spacing={5}>
          {/* Header Skeleton */}
          <Stack spacing={2}>
            <Skeleton width="30%" height={32} />
            <Skeleton width="50%" height={20} />
          </Stack>

          {/* Tabs Skeleton */}
          <Stack spacing={5}>
            <Stack direction="row" spacing={2} style={{ borderBottom: '1px solid var(--ds-color-neutral-border-subtle)' }}>
              {[1, 2, 3, 4, 5, 6, 7].map((i) => (
                <Skeleton key={i} width={100} height={40} />
              ))}
            </Stack>

            {/* Tab Content Skeleton */}
            <Stack spacing={4}>
              <Skeleton height={200} />
              <Skeleton height={300} />
            </Stack>
          </Stack>
        </Stack>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout className={className}>
      <Stack spacing={5}>
        {/* Header */}
        <Stack direction="row" justify="space-between" align="start">
          <Stack spacing={1}>
            <Heading level={2} data-size="md">
              {t('ui.settings', 'Innstillinger')}
            </Heading>
            <Paragraph data-size="sm" color="subtle">
              {t(
                'settings.configureDesc',
                'Konfigurer systeminnstillinger og preferanser'
              )}
            </Paragraph>
          </Stack>
          {saveSuccess && (
            <Alert style={{ maxWidth: '400px' }}>
              <Stack direction="row" align="center" spacing={2}>
                <CheckCircleIcon />
                {t('settings.saveSuccess', 'Innstillinger lagret')}
              </Stack>
            </Alert>
          )}
        </Stack>

        {/* Tabs */}
        <Tabs value={activeTab} onChange={(value) => setActiveTab(value as SettingsTabId)}>
          <Tabs.List>
            <Tabs.Tab value="profile">
              {t('settings.tabs.profile', 'Profil')}
            </Tabs.Tab>
            <Tabs.Tab value="addresses">
              {t('settings.tabs.addresses', 'Adresser')}
            </Tabs.Tab>
            <Tabs.Tab value="general">
              {t('settings.tabs.general', 'Generelt')}
            </Tabs.Tab>
            <Tabs.Tab value="booking">
              {t('settings.tabs.booking', 'Booking')}
            </Tabs.Tab>
            <Tabs.Tab value="notifications">
              {t('settings.tabs.notifications', 'Varsler')}
            </Tabs.Tab>
            <Tabs.Tab value="integrations">
              {t('settings.tabs.integrations', 'Integrasjoner')}
            </Tabs.Tab>
            <Tabs.Tab value="branding">
              {t('settings.tabs.branding', 'Merkevare')}
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="profile">
            <ProfileTab />
          </Tabs.Panel>

          <Tabs.Panel value="addresses">
            <AddressesTab />
          </Tabs.Panel>

          <Tabs.Panel value="general">
            <GeneralTab />
          </Tabs.Panel>

          <Tabs.Panel value="booking">
            <BookingTab />
          </Tabs.Panel>

          <Tabs.Panel value="notifications">
            <NotificationsTab />
          </Tabs.Panel>

          <Tabs.Panel value="integrations">
            <IntegrationsTab />
          </Tabs.Panel>

          <Tabs.Panel value="branding">
            <BrandingTab />
          </Tabs.Panel>
        </Tabs>
      </Stack>
    </ContentLayout>
  );
}

export default SettingsWidget;
