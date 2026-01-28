/**
 * Connected Account Selector
 *
 * Wrapper around platform AccountSelector that connects to useAccountContext.
 * Provides a simpler API for app routes.
 */

import { useState } from 'react';
import { Button, Checkbox, Spinner } from '@xala-technologies/platform-ui';
import { UserIcon, BuildingIcon, CheckIcon, ArrowLeftIcon } from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/platform/runtime';
import { useAccountContext } from '@digilist/client-sdk';

// =============================================================================
// Types
// =============================================================================

export type AccountSelectionType = 'personal' | 'organization';

export interface AccountSelectorProps {
  /** Callback when an account is selected */
  onAccountSelect: (type: AccountSelectionType) => void;
  /** Custom class name */
  className?: string;
}

// =============================================================================
// Internal Components
// =============================================================================

interface AccountOptionProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  onClick: () => void;
  disabled?: boolean;
}

function AccountOption({
  icon,
  title,
  description,
  onClick,
  disabled = false,
}: AccountOptionProps): React.ReactElement {
  return (
    <Button
      type="button"
      variant="secondary"
      onClick={onClick}
      disabled={disabled}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--ds-spacing-4)',
        width: '100%',
        padding: 'var(--ds-spacing-5)',
        height: 'auto',
        textAlign: 'left',
        justifyContent: 'flex-start',
        minHeight: '88px',
      }}
    >
      <div
        style={{
          flexShrink: 0,
          width: '48px',
          height: '48px',
          borderRadius: 'var(--ds-border-radius-md)',
          backgroundColor: 'var(--ds-color-accent-surface-default)',
          color: 'var(--ds-color-accent-base-default)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </div>
      <div>
        <div
          style={{
            fontSize: 'var(--ds-font-size-md)',
            fontWeight: 'var(--ds-font-weight-medium)',
            color: 'var(--ds-color-neutral-text-default)',
          }}
        >
          {title}
        </div>
        <div
          style={{
            fontSize: 'var(--ds-font-size-sm)',
            color: 'var(--ds-color-neutral-text-subtle)',
            marginTop: 'var(--ds-spacing-1)',
          }}
        >
          {description}
        </div>
      </div>
    </Button>
  );
}

interface OrganizationOptionProps {
  organization: { id: string; name: string; organizationNumber?: string };
  isSelected: boolean;
  onClick: () => void;
  orgNumberLabel: string;
}

function OrganizationOption({
  organization,
  isSelected,
  onClick,
  orgNumberLabel,
}: OrganizationOptionProps): React.ReactElement {
  return (
    <Button
      type="button"
      variant="tertiary"
      onClick={onClick}
      style={{
        all: 'unset',
        width: '100%',
        padding: 'var(--ds-spacing-4)',
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--ds-spacing-3)',
        cursor: 'pointer',
        backgroundColor: isSelected
          ? 'var(--ds-color-success-surface-default)'
          : 'transparent',
        borderRadius: 'var(--ds-border-radius-md)',
        transition: 'background-color 0.2s',
        border: isSelected
          ? '2px solid var(--ds-color-success-border-default)'
          : '2px solid var(--ds-color-neutral-border-default)',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          borderRadius: 'var(--ds-border-radius-full)',
          backgroundColor: 'var(--ds-color-success-surface-default)',
          color: 'var(--ds-color-success-base-default)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexShrink: 0,
        }}
      >
        <BuildingIcon size={24} />
      </div>
      <div style={{ flex: 1, textAlign: 'left' }}>
        <div
          style={{
            fontSize: 'var(--ds-font-size-md)',
            fontWeight: 'var(--ds-font-weight-medium)',
          }}
        >
          {organization.name}
        </div>
        {organization.organizationNumber && (
          <div
            style={{
              fontSize: 'var(--ds-font-size-sm)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {orgNumberLabel}: {organization.organizationNumber}
          </div>
        )}
      </div>
      {isSelected && (
        <div style={{ color: 'var(--ds-color-success-base-default)' }}>
          <CheckIcon size={16} />
        </div>
      )}
    </Button>
  );
}

// =============================================================================
// Account Selector Component
// =============================================================================

type SelectionStep = 'account-type' | 'organization';

export function AccountSelector({
  onAccountSelect,
  className,
}: AccountSelectorProps): React.ReactElement {
  const t = useT();
  const {
    organizations,
    isLoadingOrganizations,
    switchToPersonal,
    switchToOrganization,
    rememberChoice,
    setRememberChoice,
    markAccountAsSelected,
  } = useAccountContext();

  const [step, setStep] = useState<SelectionStep>('account-type');
  const [selectedOrgId, setSelectedOrgId] = useState<string | null>(null);

  // Labels - all strings via i18n
  const labels = {
    personalTitle: t('dashboard.accountSelector.personal.title'),
    personalDescription: t('dashboard.accountSelector.personal.description'),
    organizationTitle: t('dashboard.accountSelector.organization.title'),
    organizationDescription: t('dashboard.accountSelector.organization.description'),
    noOrgs: t('dashboard.accountSelector.noOrganizations'),
    loading: t('common.loading'),
    rememberChoice: t('dashboard.accountSelector.rememberChoice'),
    back: t('common.back'),
    continue: t('common.continue'),
    orgNumber: t('dashboard.accountSelector.orgNumber'),
  };

  const handlePersonalSelect = (): void => {
    switchToPersonal();
    markAccountAsSelected();
    onAccountSelect('personal');
  };

  const handleOrganizationClick = (): void => {
    if (organizations.length === 0) return;
    setStep('organization');
  };

  const handleOrganizationConfirm = (): void => {
    if (!selectedOrgId) return;
    switchToOrganization(selectedOrgId);
    markAccountAsSelected();
    onAccountSelect('organization');
  };

  const handleBack = (): void => {
    setStep('account-type');
    setSelectedOrgId(null);
  };

  // Account type selection step
  if (step === 'account-type') {
    return (
      <div
        className={className}
        style={{
          width: '100%',
          maxWidth: '400px',
        }}
      >
        {/* Account Options */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ds-spacing-3)',
            marginBottom: 'var(--ds-spacing-6)',
          }}
        >
          <AccountOption
            icon={<UserIcon size={24} />}
            title={labels.personalTitle}
            description={labels.personalDescription}
            onClick={handlePersonalSelect}
          />
          <AccountOption
            icon={<BuildingIcon size={24} />}
            title={labels.organizationTitle}
            description={
              isLoadingOrganizations
                ? labels.loading
                : organizations.length === 0
                  ? labels.noOrgs
                  : labels.organizationDescription
            }
            onClick={handleOrganizationClick}
            disabled={isLoadingOrganizations || organizations.length === 0}
          />
        </div>

        {/* Remember Choice Checkbox */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--ds-spacing-2)',
          }}
        >
          <Checkbox
            checked={rememberChoice}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberChoice(e.target.checked)}
            value="remember"
            label={labels.rememberChoice}
          />
        </div>
      </div>
    );
  }

  // Organization selection step
  return (
    <div
      className={className}
      style={{
        width: '100%',
        maxWidth: '400px',
      }}
    >
      {/* Back button */}
      <Button
        type="button"
        variant="tertiary"
        onClick={handleBack}
        aria-label={labels.back}
        style={{
          marginBottom: 'var(--ds-spacing-4)',
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--ds-spacing-2)',
        }}
      >
        <ArrowLeftIcon size={20} />
        {labels.back}
      </Button>

      {/* Organization List */}
      {isLoadingOrganizations ? (
        <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--ds-spacing-8)' }}>
          <Spinner aria-label={labels.loading} />
        </div>
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ds-spacing-3)',
            marginBottom: 'var(--ds-spacing-6)',
          }}
        >
          {organizations.map((org) => (
            <OrganizationOption
              key={org.id}
              organization={org}
              isSelected={selectedOrgId === org.id}
              onClick={() => setSelectedOrgId(org.id)}
              orgNumberLabel={labels.orgNumber}
            />
          ))}
        </div>
      )}

      {/* Confirm Button */}
      <Button
        type="button"
        variant="primary"
        onClick={handleOrganizationConfirm}
        disabled={!selectedOrgId}
        style={{ width: '100%' }}
      >
        {labels.continue}
      </Button>

      {/* Remember Choice Checkbox */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--ds-spacing-2)',
          marginTop: 'var(--ds-spacing-4)',
        }}
      >
        <Checkbox
          checked={rememberChoice}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setRememberChoice(e.target.checked)}
          value="remember"
          label={labels.rememberChoice}
        />
      </div>
    </div>
  );
}

export default AccountSelector;
