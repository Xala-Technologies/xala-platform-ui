import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
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

// Norwegian Bokmal
export const NorwegianBokmal: Story = {
  render: function Render() {
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
  render: function Render() {
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
  render: function Render() {
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
  render: function Render() {
    const t = useT();
    const [locale, setLocale] = useState<'nb' | 'nn' | 'en'>('nb');
    return (
      <div style={{ width: '700px' }}>
        <PreferencesTab
          locale={locale}
          onLocaleChange={setLocale}
          onLogout={fn()}
          labels={{
            language: t('platform.nav.settings'),
            selectLanguage: t('storybook.demo.cardDescription'),
            preferredLanguage: t('platform.nav.settings'),
            norwegianBokmal: 'Norwegian Bokmal',
            norwegianNynorsk: 'Norwegian Nynorsk',
            english: 'English',
            appearance: t('platform.nav.settings'),
            customizeAppearance: t('storybook.demo.cardDescription'),
            themeComingSoon: t('platform.common.loading'),
            sessionAndSecurity: t('platform.nav.settings'),
            manageSession: t('storybook.demo.cardDescription'),
            logout: t('platform.auth.logout'),
            logoutDescription: t('storybook.demo.cardDescription'),
          }}
        />
      </div>
    );
  },
};
