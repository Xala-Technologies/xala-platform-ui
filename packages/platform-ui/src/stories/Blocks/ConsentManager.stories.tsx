import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { ConsentManager, DEFAULT_CONSENT_MANAGER_LABELS, DEFAULT_CONSENT_SETTINGS } from '../../blocks/gdpr/ConsentManager';
import type { ConsentSetting } from '../../blocks/gdpr/ConsentManager';

const meta: Meta<typeof ConsentManager> = {
  title: 'Blocks/ConsentManager',
  component: ConsentManager,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ConsentManager

Component for managing GDPR consent preferences. Domain-agnostic - receives all data and callbacks via props.

### Features
- Toggle consent preferences
- Save changes
- Loading and error states
- Success feedback
- Required consents (cannot be disabled)

### Usage
\`\`\`tsx
<ConsentManager
  consents={consents}
  onConsentChange={handleChange}
  isLoading={false}
  isSaving={false}
  onSave={handleSave}
  consentSettings={settings}
  labels={labels}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic consent manager
export const Default: Story = {
  render: () => {
    const [consents, setConsents] = useState({
      marketing: false,
      analytics: true,
      thirdPartySharing: false,
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    return (
      <div style={{ width: '600px' }}>
        <ConsentManager
          consents={consents}
          onConsentChange={(key, value) => setConsents({ ...consents, [key]: value })}
          isLoading={false}
          isSaving={isSaving}
          isError={isError}
          isSuccess={isSuccess}
          hasChanges={true}
          onSave={async () => {
            setIsSaving(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsSaving(false);
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 3000);
          }}
          consentSettings={DEFAULT_CONSENT_SETTINGS}
          labels={DEFAULT_CONSENT_MANAGER_LABELS}
        />
      </div>
    );
  },
};

// Loading state
export const Loading: Story = {
  render: () => {
    const [consents] = useState({
      marketing: false,
      analytics: true,
      thirdPartySharing: false,
    });

    return (
      <div style={{ width: '600px' }}>
        <ConsentManager
          consents={consents}
          onConsentChange={fn()}
          isLoading={true}
          isSaving={false}
          isError={false}
          isSuccess={false}
          hasChanges={false}
          onSave={fn()}
          consentSettings={DEFAULT_CONSENT_SETTINGS}
          labels={DEFAULT_CONSENT_MANAGER_LABELS}
        />
      </div>
    );
  },
};

// Saving state
export const Saving: Story = {
  render: () => {
    const [consents] = useState({
      marketing: true,
      analytics: true,
      thirdPartySharing: false,
    });

    return (
      <div style={{ width: '600px' }}>
        <ConsentManager
          consents={consents}
          onConsentChange={fn()}
          isLoading={false}
          isSaving={true}
          isError={false}
          isSuccess={false}
          hasChanges={true}
          onSave={fn()}
          consentSettings={DEFAULT_CONSENT_SETTINGS}
          labels={DEFAULT_CONSENT_MANAGER_LABELS}
        />
      </div>
    );
  },
};

// Success state
export const Success: Story = {
  render: () => {
    const [consents] = useState({
      marketing: true,
      analytics: true,
      thirdPartySharing: false,
    });

    return (
      <div style={{ width: '600px' }}>
        <ConsentManager
          consents={consents}
          onConsentChange={fn()}
          isLoading={false}
          isSaving={false}
          isError={false}
          isSuccess={true}
          hasChanges={false}
          onSave={fn()}
          consentSettings={DEFAULT_CONSENT_SETTINGS}
          labels={DEFAULT_CONSENT_MANAGER_LABELS}
        />
      </div>
    );
  },
};

// Error state
export const Error: Story = {
  render: () => {
    const [consents] = useState({
      marketing: true,
      analytics: true,
      thirdPartySharing: false,
    });

    return (
      <div style={{ width: '600px' }}>
        <ConsentManager
          consents={consents}
          onConsentChange={fn()}
          isLoading={false}
          isSaving={false}
          isError={true}
          isSuccess={false}
          hasChanges={true}
          onSave={fn()}
          consentSettings={DEFAULT_CONSENT_SETTINGS}
          labels={DEFAULT_CONSENT_MANAGER_LABELS}
        />
      </div>
    );
  },
};

// Custom consent settings
export const CustomSettings: Story = {
  render: () => {
    const [consents, setConsents] = useState({
      newsletter: false,
      sms: false,
      push: true,
    });
    const customSettings: ConsentSetting[] = [
      {
        key: 'newsletter',
        label: 'Email Newsletter',
        description: 'Receive weekly newsletters with updates and tips.',
      },
      {
        key: 'sms',
        label: 'SMS Notifications',
        description: 'Get important updates via SMS.',
      },
      {
        key: 'push',
        label: 'Push Notifications',
        description: 'Receive browser push notifications.',
      },
    ];

    return (
      <div style={{ width: '600px' }}>
        <ConsentManager
          consents={consents}
          onConsentChange={(key, value) => setConsents({ ...consents, [key]: value })}
          isLoading={false}
          isSaving={false}
          isError={false}
          isSuccess={false}
          hasChanges={true}
          onSave={fn()}
          consentSettings={customSettings}
          labels={DEFAULT_CONSENT_MANAGER_LABELS}
        />
      </div>
    );
  },
};

// With last updated
export const WithLastUpdated: Story = {
  render: () => {
    const [consents] = useState({
      marketing: true,
      analytics: true,
      thirdPartySharing: false,
    });

    return (
      <div style={{ width: '600px' }}>
        <ConsentManager
          consents={consents}
          onConsentChange={fn()}
          isLoading={false}
          isSaving={false}
          isError={false}
          isSuccess={false}
          hasChanges={false}
          onSave={fn()}
          lastUpdated={new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString()}
          consentSettings={DEFAULT_CONSENT_SETTINGS}
          labels={DEFAULT_CONSENT_MANAGER_LABELS}
        />
      </div>
    );
  },
};
