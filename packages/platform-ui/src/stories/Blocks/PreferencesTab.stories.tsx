import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { PreferencesTab } from '../../blocks/settings/PreferencesTab';

const meta: Meta<typeof PreferencesTab> = {
  title: 'Blocks/PreferencesTab',
  component: PreferencesTab,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## PreferencesTab

Manages user preferences: language, display settings, and session management. Domain-agnostic - receives all data and handlers via props.

### Features
- Language selection
- Display settings (coming soon)
- Session management
- Logout functionality

### Usage
\`\`\`tsx
<PreferencesTab
  locale="nb"
  onLocaleChange={handleLocaleChange}
  onLogout={handleLogout}
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

// Norwegian Bokmål
export const NorwegianBokmal: Story = {
  render: () => {
    const [locale, setLocale] = useState<'nb' | 'nn' | 'en'>('nb');
    return (
      <div style={{ width: '700px' }}>
        <PreferencesTab locale={locale} onLocaleChange={setLocale} onLogout={fn()} />
      </div>
    );
  },
};

// Norwegian Nynorsk
export const NorwegianNynorsk: Story = {
  render: () => {
    const [locale, setLocale] = useState<'nb' | 'nn' | 'en'>('nn');
    return (
      <div style={{ width: '700px' }}>
        <PreferencesTab locale={locale} onLocaleChange={setLocale} onLogout={fn()} />
      </div>
    );
  },
};

// English
export const English: Story = {
  render: () => {
    const [locale, setLocale] = useState<'nb' | 'nn' | 'en'>('en');
    return (
      <div style={{ width: '700px' }}>
        <PreferencesTab locale={locale} onLocaleChange={setLocale} onLogout={fn()} />
      </div>
    );
  },
};

// Custom labels
export const CustomLabels: Story = {
  render: () => {
    const [locale, setLocale] = useState<'nb' | 'nn' | 'en'>('nb');
    return (
      <div style={{ width: '700px' }}>
        <PreferencesTab
          locale={locale}
          onLocaleChange={setLocale}
          onLogout={fn()}
          labels={{
            language: 'Language',
            selectLanguage: 'Select your preferred language',
            preferredLanguage: 'Preferred Language',
            norwegianBokmal: 'Norwegian Bokmål',
            norwegianNynorsk: 'Norwegian Nynorsk',
            english: 'English',
            appearance: 'Appearance',
            customizeAppearance: 'Customize how the system looks',
            themeComingSoon: 'Theme and appearance settings coming soon',
            sessionAndSecurity: 'Session and Security',
            manageSession: 'Manage your login and security',
            logout: 'Log Out',
            logoutDescription: 'Log out of your account on this device',
          }}
        />
      </div>
    );
  },
};
