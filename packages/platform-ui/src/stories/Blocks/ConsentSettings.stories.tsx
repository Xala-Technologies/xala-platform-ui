import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import {
  ConsentPreferences,
  DEFAULT_CONSENT_PREFERENCES_LABELS,
  DEFAULT_CONSENT_OPTIONS,
} from '../../blocks/gdpr/ConsentSettings';
import type { ConsentOption } from '../../blocks/gdpr/ConsentSettings';

const meta: Meta<typeof ConsentPreferences> = {
  title: 'Blocks/ConsentSettings',
  component: ConsentPreferences,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ConsentPreferences (ConsentSettings)

Component for managing granular GDPR consent preferences. Domain-agnostic - receives all data and callbacks via props.

### Features
- Toggle individual consent preferences
- Support for required consents (cannot be disabled)
- Save and cancel actions
- Saving, success, and error states
- Responsive mobile/desktop layouts
- WCAG 2.1 AA compliant

### Usage
\`\`\`tsx
<ConsentPreferences
  consents={consents}
  onConsentChange={handleChange}
  onSave={handleSave}
  onCancel={handleCancel}
  isSaving={false}
  isError={false}
  isSuccess={false}
  consentOptions={options}
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

// Basic consent preferences with interactive state
export const Default: Story = {
  render: function Render() {
    const [consents, setConsents] = useState({
      necessary: true,
      analytics: false,
      marketing: false,
      thirdPartySharing: false,
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [isError, setIsError] = useState(false);

    return (
      <div style={{ width: '600px' }}>
        <ConsentPreferences
          consents={consents}
          onConsentChange={(key, value) => {
            setConsents({ ...consents, [key]: value });
            setIsSuccess(false);
            setIsError(false);
          }}
          onSave={async () => {
            setIsSaving(true);
            setIsError(false);
            setIsSuccess(false);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsSaving(false);
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 3000);
          }}
          onCancel={() => {
            console.log('Cancelled');
          }}
          isSaving={isSaving}
          isError={isError}
          isSuccess={isSuccess}
          consentOptions={DEFAULT_CONSENT_OPTIONS}
          labels={DEFAULT_CONSENT_PREFERENCES_LABELS}
        />
      </div>
    );
  },
};

// Saving state
export const Saving: Story = {
  render: function Render() {
    const [consents] = useState({
      necessary: true,
      analytics: true,
      marketing: false,
      thirdPartySharing: false,
    });

    return (
      <div style={{ width: '600px' }}>
        <ConsentPreferences
          consents={consents}
          onConsentChange={fn()}
          onSave={fn()}
          onCancel={fn()}
          isSaving={true}
          isError={false}
          isSuccess={false}
          consentOptions={DEFAULT_CONSENT_OPTIONS}
          labels={DEFAULT_CONSENT_PREFERENCES_LABELS}
        />
      </div>
    );
  },
};

// Success state
export const Success: Story = {
  render: function Render() {
    const [consents] = useState({
      necessary: true,
      analytics: true,
      marketing: true,
      thirdPartySharing: false,
    });

    return (
      <div style={{ width: '600px' }}>
        <ConsentPreferences
          consents={consents}
          onConsentChange={fn()}
          onSave={fn()}
          onCancel={fn()}
          isSaving={false}
          isError={false}
          isSuccess={true}
          consentOptions={DEFAULT_CONSENT_OPTIONS}
          labels={DEFAULT_CONSENT_PREFERENCES_LABELS}
        />
      </div>
    );
  },
};

// Error state
export const Error: Story = {
  render: function Render() {
    const [consents] = useState({
      necessary: true,
      analytics: true,
      marketing: false,
      thirdPartySharing: false,
    });

    return (
      <div style={{ width: '600px' }}>
        <ConsentPreferences
          consents={consents}
          onConsentChange={fn()}
          onSave={fn()}
          onCancel={fn()}
          isSaving={false}
          isError={true}
          isSuccess={false}
          consentOptions={DEFAULT_CONSENT_OPTIONS}
          labels={DEFAULT_CONSENT_PREFERENCES_LABELS}
        />
      </div>
    );
  },
};

// With custom consent options
export const CustomOptions: Story = {
  render: function Render() {
    const [consents, setConsents] = useState({
      essential: true,
      performance: false,
      functionality: false,
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const customOptions: ConsentOption[] = [
      {
        key: 'essential',
        label: 'Essential Cookies',
        description: 'Required for the website to function. Cannot be disabled.',
        required: true,
      },
      {
        key: 'performance',
        label: 'Performance Cookies',
        description: 'Help us understand how visitors interact with our website.',
        required: false,
      },
      {
        key: 'functionality',
        label: 'Functionality Cookies',
        description: 'Enable enhanced functionality and personalization.',
        required: false,
      },
    ];

    return (
      <div style={{ width: '600px' }}>
        <ConsentPreferences
          consents={consents}
          onConsentChange={(key, value) => {
            setConsents({ ...consents, [key]: value });
            setIsSuccess(false);
          }}
          onSave={async () => {
            setIsSaving(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsSaving(false);
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 3000);
          }}
          onCancel={() => {
            console.log('Cancelled');
          }}
          isSaving={isSaving}
          isError={false}
          isSuccess={isSuccess}
          consentOptions={customOptions}
          labels={DEFAULT_CONSENT_PREFERENCES_LABELS}
        />
      </div>
    );
  },
};

// Without cancel button
export const WithoutCancel: Story = {
  render: function Render() {
    const [consents, setConsents] = useState({
      necessary: true,
      analytics: false,
      marketing: false,
      thirdPartySharing: false,
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    return (
      <div style={{ width: '600px' }}>
        <ConsentPreferences
          consents={consents}
          onConsentChange={(key, value) => {
            setConsents({ ...consents, [key]: value });
            setIsSuccess(false);
          }}
          onSave={async () => {
            setIsSaving(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsSaving(false);
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 3000);
          }}
          isSaving={isSaving}
          isError={false}
          isSuccess={isSuccess}
          consentOptions={DEFAULT_CONSENT_OPTIONS}
          labels={DEFAULT_CONSENT_PREFERENCES_LABELS}
        />
      </div>
    );
  },
};

// Mobile viewport simulation
export const Mobile: Story = {
  render: function Render() {
    const [consents, setConsents] = useState({
      necessary: true,
      analytics: false,
      marketing: false,
      thirdPartySharing: false,
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    return (
      <div style={{ width: '360px' }}>
        <ConsentPreferences
          consents={consents}
          onConsentChange={(key, value) => {
            setConsents({ ...consents, [key]: value });
            setIsSuccess(false);
          }}
          onSave={async () => {
            setIsSaving(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsSaving(false);
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 3000);
          }}
          onCancel={() => {
            console.log('Cancelled');
          }}
          isSaving={isSaving}
          isError={false}
          isSuccess={isSuccess}
          consentOptions={DEFAULT_CONSENT_OPTIONS}
          labels={DEFAULT_CONSENT_PREFERENCES_LABELS}
        />
      </div>
    );
  },
};

// All consents accepted
export const AllAccepted: Story = {
  render: function Render() {
    const [consents, setConsents] = useState({
      necessary: true,
      analytics: true,
      marketing: true,
      thirdPartySharing: true,
    });
    const [isSaving, setIsSaving] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    return (
      <div style={{ width: '600px' }}>
        <ConsentPreferences
          consents={consents}
          onConsentChange={(key, value) => {
            setConsents({ ...consents, [key]: value });
            setIsSuccess(false);
          }}
          onSave={async () => {
            setIsSaving(true);
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setIsSaving(false);
            setIsSuccess(true);
            setTimeout(() => setIsSuccess(false), 3000);
          }}
          onCancel={() => {
            console.log('Cancelled');
          }}
          isSaving={isSaving}
          isError={false}
          isSuccess={isSuccess}
          consentOptions={DEFAULT_CONSENT_OPTIONS}
          labels={DEFAULT_CONSENT_PREFERENCES_LABELS}
        />
      </div>
    );
  },
};
