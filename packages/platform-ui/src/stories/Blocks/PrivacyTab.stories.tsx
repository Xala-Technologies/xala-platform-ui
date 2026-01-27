import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { PrivacyTab, Stack, Paragraph, Card } from '../../index';

/**
 * PrivacyTab manages privacy settings, GDPR consents, data export, and account deletion.
 *
 * ## Features
 * - GDPR consent management
 * - Data export
 * - Account deletion
 * - Privacy preferences
 *
 * ## When to Use
 * - Settings pages
 * - Privacy management
 * - GDPR compliance
 */
const meta: Meta<typeof PrivacyTab> = {
  title: 'Blocks/PrivacyTab',
  component: PrivacyTab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof PrivacyTab>;

/**
 * Default privacy tab
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [consentSettings, setConsentSettings] = useState({
      marketing: false,
      analytics: true,
      thirdPartySharing: false,
    });
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.privacyTab.description')}</Paragraph>
            <PrivacyTab
              consentSettings={consentSettings}
              onUpdateConsent={(field, value) => {
                setConsentSettings({ ...consentSettings, [field]: value });
              }}
              onExportData={async () => {
                console.log('Export data');
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
              onDeleteAccount={async () => {
                console.log('Delete account');
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
              onConfirmDelete={(callback) => {
                if (window.confirm(t('storybook.privacyTab.confirmDelete'))) {
                  callback();
                }
              }}
              labels={{
                dataExportTitle: t('storybook.privacyTab.dataExportTitle'),
                dataExportDescription: t('storybook.privacyTab.dataExportDescription'),
                dataExportInfo: t('storybook.privacyTab.dataExportInfo'),
                downloadMyData: t('storybook.privacyTab.downloadMyData'),
                exporting: t('storybook.privacyTab.exporting'),
                consentsTitle: t('storybook.privacyTab.consentsTitle'),
                consentsDescription: t('storybook.privacyTab.consentsDescription'),
                marketingConsent: t('storybook.privacyTab.marketingConsent'),
                marketingConsentDescription: t('storybook.privacyTab.marketingConsentDescription'),
                analyticsConsent: t('storybook.privacyTab.analyticsConsent'),
                analyticsConsentDescription: t('storybook.privacyTab.analyticsConsentDescription'),
                thirdPartyConsent: t('storybook.privacyTab.thirdPartyConsent'),
                thirdPartyConsentDescription: t(
                  'storybook.privacyTab.thirdPartyConsentDescription'
                ),
                deleteAccountTitle: t('storybook.privacyTab.deleteAccountTitle'),
                deleteAccountDescription: t('storybook.privacyTab.deleteAccountDescription'),
                deleteAccountWarningTitle: t('storybook.privacyTab.deleteAccountWarningTitle'),
                deleteAccountWarningDescription: t(
                  'storybook.privacyTab.deleteAccountWarningDescription'
                ),
                deleteMyAccount: t('storybook.privacyTab.deleteMyAccount'),
                exportDataAction: t('storybook.privacyTab.exportDataAction'),
              }}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
