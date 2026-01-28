/**
 * SMSConfigurationWidget (GAP-004)
 *
 * Advanced SMS notification configuration widget.
 * Uses @xala-technologies/platform-ui components only.
 */

import { useState, useCallback } from 'react';
import { useT } from '@xala-technologies/platform/i18n';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Stack,
  FormField,
  Textfield,
  Switch,
  Select,
  Textarea,
  Badge,
  Alert,
  Spinner,
  SaveIcon,
  MessageIcon,
  SettingsIcon,
} from '@xala-technologies/platform-ui';

export interface SMSGatewayConfig {
  provider: 'twilio' | 'nexmo' | 'sveve' | 'custom';
  apiKey?: string;
  apiSecret?: string;
  senderId: string;
  enabled: boolean;
}

export interface SMSTemplate {
  id: string;
  name: string;
  event: 'booking_confirmation' | 'booking_reminder' | 'booking_cancellation' | 'payment_reminder' | 'custom';
  template: string;
  enabled: boolean;
}

export interface SMSSettings {
  gateway: SMSGatewayConfig;
  templates: SMSTemplate[];
  defaultCountryCode: string;
  testPhoneNumber?: string;
  dailyLimit?: number;
}

export interface SMSConfigurationWidgetProps {
  /** Initial settings */
  settings?: SMSSettings;
  /** Save handler */
  onSave: (settings: SMSSettings) => Promise<void>;
  /** Test SMS handler */
  onTestSMS?: (phoneNumber: string, message: string) => Promise<boolean>;
  /** Is saving */
  isSaving?: boolean;
}

const DEFAULT_TEMPLATES: SMSTemplate[] = [
  {
    id: 'booking_confirmation',
    name: 'Bookingbekreftelse',
    event: 'booking_confirmation',
    template: 'Din booking {bookingNumber} er bekreftet for {date} kl {time}. Se detaljer: {link}',
    enabled: true,
  },
  {
    id: 'booking_reminder',
    name: 'Bookingpåminnelse',
    event: 'booking_reminder',
    template: 'Påminnelse: Din booking {bookingNumber} er i morgen kl {time}. {objectName}',
    enabled: true,
  },
  {
    id: 'booking_cancellation',
    name: 'Bookingkansellering',
    event: 'booking_cancellation',
    template: 'Din booking {bookingNumber} for {date} er kansellert. Kontakt oss ved spørsmål.',
    enabled: true,
  },
  {
    id: 'payment_reminder',
    name: 'Betalingspåminnelse',
    event: 'payment_reminder',
    template: 'Påminnelse: Faktura {invoiceNumber} forfaller {dueDate}. Betal via: {link}',
    enabled: false,
  },
];

const PROVIDER_OPTIONS = [
  { value: 'sveve', label: 'Sveve (Norge)' },
  { value: 'twilio', label: 'Twilio' },
  { value: 'nexmo', label: 'Vonage (Nexmo)' },
  { value: 'custom', label: 'Egendefinert API' },
];

export function SMSConfigurationWidget({
  settings,
  onSave,
  onTestSMS,
  isSaving = false,
}: SMSConfigurationWidgetProps) {
  const t = useT();
  const [activeTab, setActiveTab] = useState<'gateway' | 'templates'>('gateway');
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [isTesting, setIsTesting] = useState(false);

  const [gatewayConfig, setGatewayConfig] = useState<SMSGatewayConfig>(
    settings?.gateway ?? {
      provider: 'sveve',
      senderId: '',
      enabled: false,
    }
  );

  const [templates, setTemplates] = useState<SMSTemplate[]>(
    settings?.templates ?? DEFAULT_TEMPLATES
  );

  const [generalConfig, setGeneralConfig] = useState({
    defaultCountryCode: settings?.defaultCountryCode ?? '+47',
    testPhoneNumber: settings?.testPhoneNumber ?? '',
    dailyLimit: settings?.dailyLimit ?? 1000,
  });

  const handleSave = useCallback(async () => {
    await onSave({
      gateway: gatewayConfig,
      templates,
      defaultCountryCode: generalConfig.defaultCountryCode,
      testPhoneNumber: generalConfig.testPhoneNumber,
      dailyLimit: generalConfig.dailyLimit,
    });
  }, [gatewayConfig, templates, generalConfig, onSave]);

  const handleTestSMS = useCallback(async () => {
    if (!onTestSMS || !generalConfig.testPhoneNumber) return;
    setIsTesting(true);
    setTestResult(null);
    try {
      const success = await onTestSMS(
        generalConfig.testPhoneNumber,
        'Dette er en test-SMS fra Digilist.'
      );
      setTestResult({
        success,
        message: success
          ? t('sms.testSuccess')
          : t('sms.testFailed'),
      });
    } catch {
      setTestResult({ success: false, message: t('sms.testError') });
    } finally {
      setIsTesting(false);
    }
  }, [onTestSMS, generalConfig.testPhoneNumber, t]);

  const updateTemplate = useCallback((id: string, updates: Partial<SMSTemplate>) => {
    setTemplates((prev) =>
      prev.map((tpl) => (tpl.id === id ? { ...tpl, ...updates } : tpl))
    );
  }, []);

  return (
    <Stack gap="6">
      {/* Header */}
      <div>
        <Heading level={2} data-size="lg" style={{ margin: 0 }}>
          {t('sms.configuration.title')}
        </Heading>
        <Paragraph data-size="sm" style={{ margin: 0, marginTop: 'var(--ds-spacing-1)' }}>
          {t('sms.configuration.description')}
        </Paragraph>
      </div>

      {/* Tab Navigation */}
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', borderBottom: '1px solid var(--ds-color-neutral-border-subtle)', paddingBottom: 'var(--ds-spacing-2)' }}>
        <Button
          type="button"
          variant={activeTab === 'gateway' ? 'secondary' : 'tertiary'}
          data-size="sm"
          onClick={() => setActiveTab('gateway')}
        >
          <SettingsIcon />
          {t('sms.tabs.gateway')}
        </Button>
        <Button
          type="button"
          variant={activeTab === 'templates' ? 'secondary' : 'tertiary'}
          data-size="sm"
          onClick={() => setActiveTab('templates')}
        >
          <MessageIcon />
          {t('sms.tabs.templates')}
        </Button>
      </div>

      {/* Gateway Configuration */}
      {activeTab === 'gateway' && (
        <Card style={{ padding: 'var(--ds-spacing-4)' }}>
          <Stack gap="4">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Heading level={3} data-size="sm" style={{ margin: 0 }}>
                {t('sms.gateway.title')}
              </Heading>
              <Switch
                checked={gatewayConfig.enabled}
                onChange={(checked) => setGatewayConfig((prev) => ({ ...prev, enabled: checked }))}
              >
                {gatewayConfig.enabled ? t('common.enabled') : t('common.disabled')}
              </Switch>
            </div>

            {!gatewayConfig.enabled && (
              <Alert data-color="info">
                {t('sms.gateway.disabledInfo')}
              </Alert>
            )}

            <FormField label={t('sms.gateway.provider')}>
              <Select
                value={gatewayConfig.provider}
                onChange={(e) => setGatewayConfig((prev) => ({ ...prev, provider: e.target.value as SMSGatewayConfig['provider'] }))}
                disabled={!gatewayConfig.enabled}
              >
                {PROVIDER_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </Select>
            </FormField>

            <FormField label={t('sms.gateway.senderId')} description={t('sms.gateway.senderIdDesc')}>
              <Textfield
                value={gatewayConfig.senderId}
                onChange={(e) => setGatewayConfig((prev) => ({ ...prev, senderId: e.target.value }))}
                placeholder="Digilist"
                maxLength={11}
                disabled={!gatewayConfig.enabled}
              />
            </FormField>

            <FormField label={t('sms.gateway.apiKey')}>
              <Textfield
                type="password"
                value={gatewayConfig.apiKey ?? ''}
                onChange={(e) => setGatewayConfig((prev) => ({ ...prev, apiKey: e.target.value }))}
                placeholder="••••••••••••"
                disabled={!gatewayConfig.enabled}
              />
            </FormField>

            {gatewayConfig.provider !== 'sveve' && (
              <FormField label={t('sms.gateway.apiSecret')}>
                <Textfield
                  type="password"
                  value={gatewayConfig.apiSecret ?? ''}
                  onChange={(e) => setGatewayConfig((prev) => ({ ...prev, apiSecret: e.target.value }))}
                  placeholder="••••••••••••"
                  disabled={!gatewayConfig.enabled}
                />
              </FormField>
            )}

            <FormField label={t('sms.gateway.defaultCountryCode')}>
              <Textfield
                value={generalConfig.defaultCountryCode}
                onChange={(e) => setGeneralConfig((prev) => ({ ...prev, defaultCountryCode: e.target.value }))}
                placeholder="+47"
                disabled={!gatewayConfig.enabled}
              />
            </FormField>

            <FormField label={t('sms.gateway.dailyLimit')} description={t('sms.gateway.dailyLimitDesc')}>
              <Textfield
                type="number"
                value={generalConfig.dailyLimit?.toString() ?? ''}
                onChange={(e) => setGeneralConfig((prev) => ({ ...prev, dailyLimit: parseInt(e.target.value) || undefined }))}
                min={0}
                disabled={!gatewayConfig.enabled}
              />
            </FormField>

            {/* Test SMS */}
            {gatewayConfig.enabled && onTestSMS && (
              <Card variant="subtle" style={{ padding: 'var(--ds-spacing-3)' }}>
                <Stack gap="3">
                  <Heading level={4} data-size="xs" style={{ margin: 0 }}>
                    {t('sms.test.title')}
                  </Heading>
                  <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
                    <Textfield
                      value={generalConfig.testPhoneNumber}
                      onChange={(e) => setGeneralConfig((prev) => ({ ...prev, testPhoneNumber: e.target.value }))}
                      placeholder="+47 900 00 000"
                      style={{ flex: 1 }}
                    />
                    <Button
                      type="button"
                      variant="secondary"
                      onClick={handleTestSMS}
                      disabled={isTesting || !generalConfig.testPhoneNumber}
                    >
                      {isTesting ? <Spinner data-size="sm" /> : t('sms.test.send')}
                    </Button>
                  </div>
                  {testResult && (
                    <Alert data-color={testResult.success ? 'success' : 'danger'}>
                      {testResult.message}
                    </Alert>
                  )}
                </Stack>
              </Card>
            )}
          </Stack>
        </Card>
      )}

      {/* Templates Configuration */}
      {activeTab === 'templates' && (
        <Stack gap="4">
          {templates.map((template) => (
            <Card key={template.id} style={{ padding: 'var(--ds-spacing-4)' }}>
              <Stack gap="3">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
                    <Heading level={4} data-size="sm" style={{ margin: 0 }}>
                      {template.name}
                    </Heading>
                    <Badge data-size="sm" data-color={template.enabled ? 'success' : 'neutral'}>
                      {template.enabled ? t('common.active') : t('common.inactive')}
                    </Badge>
                  </div>
                  <Switch
                    checked={template.enabled}
                    onChange={(checked) => updateTemplate(template.id, { enabled: checked })}
                  />
                </div>

                <FormField label={t('sms.template.content')} description={t('sms.template.variablesHint')}>
                  <Textarea
                    value={template.template}
                    onChange={(e) => updateTemplate(template.id, { template: e.target.value })}
                    rows={3}
                    disabled={!template.enabled}
                  />
                </FormField>

                <Paragraph data-size="xs" style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}>
                  {t('sms.template.variables')}: {'{bookingNumber}'}, {'{date}'}, {'{time}'}, {'{objectName}'}, {'{link}'}
                </Paragraph>
              </Stack>
            </Card>
          ))}
        </Stack>
      )}

      {/* Save Button */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', borderTop: '1px solid var(--ds-color-neutral-border-subtle)', paddingTop: 'var(--ds-spacing-4)' }}>
        <Button type="button" variant="primary" onClick={handleSave} disabled={isSaving}>
          {isSaving ? <Spinner data-size="sm" /> : <SaveIcon />}
          {t('action.saveSettings')}
        </Button>
      </div>
    </Stack>
  );
}

export default SMSConfigurationWidget;
