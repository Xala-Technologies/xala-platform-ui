/**
 * IntegrationsTab Component
 *
 * Manages third-party integrations and system connections.
 * Pure presentational component - all data and actions passed via props.
 *
 * @module @xala-technologies/platform-ui/features/settings/tenant
 */

import * as React from 'react';
import { Card, Heading, Paragraph, Switch, Tag, Stack } from '@xala-technologies/platform-ui-core';

import type { IntegrationsData, IntegrationProvider } from '../tenant-types';

// =============================================================================
// Types
// =============================================================================

/**
 * Labels for IntegrationsTab component
 */
export interface IntegrationsTabLabels {
  // Section labels
  sectionAuthentication: string;
  sectionAuthenticationDescription: string;
  sectionPayment: string;
  sectionPaymentDescription: string;
  sectionAccessControl: string;
  sectionAccessControlDescription: string;
  sectionCalendar: string;
  sectionCalendarDescription: string;
  sectionFinance: string;
  sectionFinanceDescription: string;
  sectionPublicRegisters: string;
  sectionPublicRegistersDescription: string;

  // Integration labels
  bankid: string;
  bankidDescription: string;
  idporten: string;
  idportenDescription: string;
  vipps: string;
  vippsDescription: string;
  rco: string;
  rcoDescription: string;
  googleCalendar: string;
  googleCalendarDescription: string;
  outlook: string;
  outlookDescription: string;
  visma: string;
  vismaDescription: string;
  brreg: string;
  brregDescription: string;

  // Status labels
  active: string;
  inactive: string;
}

export interface IntegrationsTabProps {
  /** Current integrations data */
  integrations: IntegrationsData;
  /** UI labels for all text content */
  labels: IntegrationsTabLabels;
  /** Handler for toggling integration */
  onToggle: (provider: IntegrationProvider, enabled: boolean) => void;
}

// =============================================================================
// Integration Row Component
// =============================================================================

interface IntegrationRowProps {
  title: string;
  description: string;
  enabled: boolean;
  activeLabel: string;
  inactiveLabel: string;
  onToggle: (enabled: boolean) => void;
}

function IntegrationRow({
  title,
  description,
  enabled,
  activeLabel,
  inactiveLabel,
  onToggle,
}: IntegrationRowProps): React.ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 'var(--ds-spacing-3)',
        backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
        borderRadius: 'var(--ds-border-radius-md)',
      }}
    >
      <div>
        <div
          style={{
            fontWeight: 'var(--ds-font-weight-medium)',
            marginBottom: 'var(--ds-spacing-1)',
          }}
        >
          {title}
        </div>
        <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
          {description}
        </Paragraph>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
        {enabled ? (
          <Tag data-color="success">{activeLabel}</Tag>
        ) : (
          <Tag data-color="neutral">{inactiveLabel}</Tag>
        )}
        <Switch aria-label={title} checked={enabled} onChange={(e) => onToggle(e.target.checked)} />
      </div>
    </div>
  );
}

// =============================================================================
// Component
// =============================================================================

export function IntegrationsTab({
  integrations,
  labels,
  onToggle,
}: IntegrationsTabProps): React.ReactElement {
  return (
    <Stack spacing={4}>
      {/* Authentication */}
      <Card>
        <Stack spacing={4}>
          <div>
            <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              {labels.sectionAuthentication}
            </Heading>
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.sectionAuthenticationDescription}
            </Paragraph>
          </div>

          <IntegrationRow
            title={labels.bankid}
            description={labels.bankidDescription}
            enabled={integrations?.bankid?.enabled ?? false}
            activeLabel={labels.active}
            inactiveLabel={labels.inactive}
            onToggle={(checked) => onToggle('bankid', checked)}
          />

          <IntegrationRow
            title={labels.idporten}
            description={labels.idportenDescription}
            enabled={integrations?.idporten?.enabled ?? false}
            activeLabel={labels.active}
            inactiveLabel={labels.inactive}
            onToggle={(checked) => onToggle('idporten', checked)}
          />
        </Stack>
      </Card>

      {/* Payment */}
      <Card>
        <Stack spacing={4}>
          <div>
            <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              {labels.sectionPayment}
            </Heading>
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.sectionPaymentDescription}
            </Paragraph>
          </div>

          <IntegrationRow
            title={labels.vipps}
            description={labels.vippsDescription}
            enabled={integrations?.vipps?.enabled ?? false}
            activeLabel={labels.active}
            inactiveLabel={labels.inactive}
            onToggle={(checked) => onToggle('vipps', checked)}
          />
        </Stack>
      </Card>

      {/* Access Control */}
      <Card>
        <Stack spacing={4}>
          <div>
            <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              {labels.sectionAccessControl}
            </Heading>
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.sectionAccessControlDescription}
            </Paragraph>
          </div>

          <IntegrationRow
            title={labels.rco}
            description={labels.rcoDescription}
            enabled={integrations?.rco?.enabled ?? false}
            activeLabel={labels.active}
            inactiveLabel={labels.inactive}
            onToggle={(checked) => onToggle('rco', checked)}
          />
        </Stack>
      </Card>

      {/* Calendar */}
      <Card>
        <Stack spacing={4}>
          <div>
            <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              {labels.sectionCalendar}
            </Heading>
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.sectionCalendarDescription}
            </Paragraph>
          </div>

          <IntegrationRow
            title={labels.googleCalendar}
            description={labels.googleCalendarDescription}
            enabled={integrations?.googleCalendar?.enabled ?? false}
            activeLabel={labels.active}
            inactiveLabel={labels.inactive}
            onToggle={(checked) => onToggle('googleCalendar', checked)}
          />

          <IntegrationRow
            title={labels.outlook}
            description={labels.outlookDescription}
            enabled={integrations?.outlook?.enabled ?? false}
            activeLabel={labels.active}
            inactiveLabel={labels.inactive}
            onToggle={(checked) => onToggle('outlook', checked)}
          />
        </Stack>
      </Card>

      {/* Finance & ERP */}
      <Card>
        <Stack spacing={4}>
          <div>
            <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              {labels.sectionFinance}
            </Heading>
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.sectionFinanceDescription}
            </Paragraph>
          </div>

          <IntegrationRow
            title={labels.visma}
            description={labels.vismaDescription}
            enabled={integrations?.visma?.enabled ?? false}
            activeLabel={labels.active}
            inactiveLabel={labels.inactive}
            onToggle={(checked) => onToggle('visma', checked)}
          />
        </Stack>
      </Card>

      {/* Public Registers */}
      <Card>
        <Stack spacing={4}>
          <div>
            <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              {labels.sectionPublicRegisters}
            </Heading>
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.sectionPublicRegistersDescription}
            </Paragraph>
          </div>

          <IntegrationRow
            title={labels.brreg}
            description={labels.brregDescription}
            enabled={integrations?.brreg?.enabled ?? false}
            activeLabel={labels.active}
            inactiveLabel={labels.inactive}
            onToggle={(checked) => onToggle('brreg', checked)}
          />
        </Stack>
      </Card>
    </Stack>
  );
}
