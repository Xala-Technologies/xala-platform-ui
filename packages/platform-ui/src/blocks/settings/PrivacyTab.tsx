/**
 * PrivacyTab Block - Reusable DS Component
 *
 * Manages privacy settings, GDPR consents, data export, and account deletion.
 * Domain-agnostic - receives all data and handlers via props.
 *
 * @example
 * ```tsx
 * import { useT } from '@xala/i18n';
 * import { usePrivacySettings } from '@app/hooks';
 *
 * function MyPrivacyTab() {
 *   const t = useT();
 *   const { settings, updateSettings, exportData, deleteAccount } = usePrivacySettings();
 *
 *   return (
 *     <PrivacyTab
 *       consentSettings={settings.consents}
 *       isExporting={settings.isExporting}
 *       onUpdateConsent={(field, value) => updateSettings({ [field]: value })}
 *       onExportData={exportData}
 *       onDeleteAccount={deleteAccount}
 *       onConfirmDelete={(callback) => {
 *         if (confirm(t('common.er_du_sikker_paa'))) callback();
 *       }}
 *       labels={{
 *         title: t('settings.privacy.title'),
 *         description: t('settings.privacy.description'),
 *         // ... other labels
 *       }}
 *     />
 *   );
 * }
 * ```
 */
import { Card, Heading, Paragraph, Button, Switch, Alert } from '@digdir/designsystemet-react';
import { Stack, DownloadIcon, TrashIcon, ShieldIcon } from '../../primitives';

// =============================================================================
// Types
// =============================================================================

export interface PrivacyConsentSettings {
  marketing: boolean;
  analytics: boolean;
  thirdPartySharing: boolean;
}

export interface PrivacyTabLabels {
  dataExportTitle: string;
  dataExportDescription: string;
  dataExportInfo: string;
  downloadMyData: string;
  exporting: string;
  consentsTitle: string;
  consentsDescription: string;
  marketingConsent: string;
  marketingConsentDescription: string;
  analyticsConsent: string;
  analyticsConsentDescription: string;
  thirdPartyConsent: string;
  thirdPartyConsentDescription: string;
  deleteAccountTitle: string;
  deleteAccountDescription: string;
  deleteAccountWarningTitle: string;
  deleteAccountWarningDescription: string;
  deleteMyAccount: string;
  exportDataAction: string;
}

export interface PrivacyTabProps {
  consentSettings: PrivacyConsentSettings;
  isExporting?: boolean;
  onUpdateConsent: (field: keyof PrivacyConsentSettings, value: boolean) => void;
  onExportData: () => void;
  onDeleteAccount: () => void;
  /** Callback to show confirmation dialog before deletion */
  onConfirmDelete?: (callback: () => void) => void;
  /** Labels for i18n */
  labels?: Partial<PrivacyTabLabels>;
  'data-testid'?: string;
}

// =============================================================================
// Default Labels
// =============================================================================

const DEFAULT_LABELS: PrivacyTabLabels = {
  dataExportTitle: 'Dataeksport',
  dataExportDescription: 'Last ned kopi av personopplysninger',
  dataExportInfo: 'Du har rett til a fa en kopi av dine personopplysninger i henhold til GDPR.',
  downloadMyData: 'Last ned mine data',
  exporting: 'Eksporterer...',
  consentsTitle: 'Samtykker',
  consentsDescription: 'Administrer hvordan vi bruker data',
  marketingConsent: 'Markedsforing',
  marketingConsentDescription: 'Motta tips tilbud nyheter',
  analyticsConsent: 'Analyse',
  analyticsConsentDescription: 'Hjelp oss forbedre tjenesten',
  thirdPartyConsent: 'Deling med tredjeparter',
  thirdPartyConsentDescription: 'Tillat deling med partnere',
  deleteAccountTitle: 'Slett konto',
  deleteAccountDescription: 'Permanent sletting av konto',
  deleteAccountWarningTitle: 'Dette kan ikke angres',
  deleteAccountWarningDescription:
    'Alle dine data vil bli permanent slettet. Dette inkluderer profil, bookinger og innstillinger.',
  deleteMyAccount: 'Slett min konto',
  exportDataAction: 'Eksporter mine data',
};

// =============================================================================
// Component
// =============================================================================

export function PrivacyTab({
  consentSettings,
  isExporting = false,
  onUpdateConsent,
  onExportData,
  onDeleteAccount,
  onConfirmDelete,
  labels: customLabels,
  'data-testid': testId = 'privacy-tab',
}: PrivacyTabProps) {
  const labels = { ...DEFAULT_LABELS, ...customLabels };

  const handleDeleteAccount = () => {
    if (onConfirmDelete) {
      onConfirmDelete(onDeleteAccount);
    } else {
      onDeleteAccount();
    }
  };

  return (
    <Stack spacing="var(--ds-spacing-6)" data-testid={testId}>
      {/* Data Export */}
      <Card>
        <Stack spacing="var(--ds-spacing-4)">
          <div>
            <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              <ShieldIcon
                style={{ verticalAlign: 'middle', marginRight: 'var(--ds-spacing-2)' }}
              />
              {labels.dataExportTitle}
            </Heading>
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.dataExportDescription}
            </Paragraph>
          </div>

          <Alert>
            <Paragraph data-size="sm" style={{ margin: 0 }}>
              {labels.dataExportInfo}
            </Paragraph>
          </Alert>

          <Button
            variant="secondary"
            onClick={onExportData}
            disabled={isExporting}
            type="button"
            aria-label={labels.exportDataAction}
          >
            <DownloadIcon />
            {isExporting ? labels.exporting : labels.downloadMyData}
          </Button>
        </Stack>
      </Card>

      {/* Consent Settings */}
      <Card>
        <Stack spacing="var(--ds-spacing-4)">
          <div>
            <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              {labels.consentsTitle}
            </Heading>
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.consentsDescription}
            </Paragraph>
          </div>

          <Stack spacing="var(--ds-spacing-3)">
            <div
              style={{
                padding: 'var(--ds-spacing-4)',
                backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
                borderRadius: 'var(--ds-border-radius-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <Paragraph
                  data-size="sm"
                  style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}
                >
                  {labels.marketingConsent}
                </Paragraph>
                <Paragraph
                  data-size="xs"
                  style={{
                    margin: 0,
                    marginTop: 'var(--ds-spacing-1)',
                    color: 'var(--ds-color-neutral-text-subtle)',
                  }}
                >
                  {labels.marketingConsentDescription}
                </Paragraph>
              </div>
              <Switch
                checked={consentSettings.marketing}
                onChange={(e) => onUpdateConsent('marketing', e.target.checked)}
                aria-label={labels.marketingConsent}
              />
            </div>

            <div
              style={{
                padding: 'var(--ds-spacing-4)',
                backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
                borderRadius: 'var(--ds-border-radius-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <Paragraph
                  data-size="sm"
                  style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}
                >
                  {labels.analyticsConsent}
                </Paragraph>
                <Paragraph
                  data-size="xs"
                  style={{
                    margin: 0,
                    marginTop: 'var(--ds-spacing-1)',
                    color: 'var(--ds-color-neutral-text-subtle)',
                  }}
                >
                  {labels.analyticsConsentDescription}
                </Paragraph>
              </div>
              <Switch
                checked={consentSettings.analytics}
                onChange={(e) => onUpdateConsent('analytics', e.target.checked)}
                aria-label={labels.analyticsConsent}
              />
            </div>

            <div
              style={{
                padding: 'var(--ds-spacing-4)',
                backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
                borderRadius: 'var(--ds-border-radius-md)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <div>
                <Paragraph
                  data-size="sm"
                  style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}
                >
                  {labels.thirdPartyConsent}
                </Paragraph>
                <Paragraph
                  data-size="xs"
                  style={{
                    margin: 0,
                    marginTop: 'var(--ds-spacing-1)',
                    color: 'var(--ds-color-neutral-text-subtle)',
                  }}
                >
                  {labels.thirdPartyConsentDescription}
                </Paragraph>
              </div>
              <Switch
                checked={consentSettings.thirdPartySharing}
                onChange={(e) => onUpdateConsent('thirdPartySharing', e.target.checked)}
                aria-label={labels.thirdPartyConsent}
              />
            </div>
          </Stack>
        </Stack>
      </Card>

      {/* Delete Account */}
      <Card>
        <Stack spacing="var(--ds-spacing-4)">
          <div>
            <Heading
              level={3}
              data-size="sm"
              style={{
                marginBottom: 'var(--ds-spacing-2)',
                color: 'var(--ds-color-danger-text-default)',
              }}
            >
              {labels.deleteAccountTitle}
            </Heading>
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.deleteAccountDescription}
            </Paragraph>
          </div>

          <Alert>
            <Stack spacing="var(--ds-spacing-2)">
              <Paragraph
                data-size="sm"
                style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}
              >
                {labels.deleteAccountWarningTitle}
              </Paragraph>
              <Paragraph data-size="sm" style={{ margin: 0 }}>
                {labels.deleteAccountWarningDescription}
              </Paragraph>
            </Stack>
          </Alert>

          <Button
            variant="secondary"
            onClick={handleDeleteAccount}
            style={{
              backgroundColor: 'var(--ds-color-danger-surface-default)',
              color: 'var(--ds-color-danger-text-default)',
              borderColor: 'var(--ds-color-danger-border-default)',
            }}
            type="button"
          >
            <TrashIcon />
            {labels.deleteMyAccount}
          </Button>
        </Stack>
      </Card>
    </Stack>
  );
}
