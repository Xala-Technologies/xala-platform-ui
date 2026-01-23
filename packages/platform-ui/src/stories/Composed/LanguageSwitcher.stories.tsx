import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { LanguageSwitcher } from '../../composed/LanguageSwitcher';

const meta: Meta<typeof LanguageSwitcher> = {
  title: 'Composed/LanguageSwitcher',
  component: LanguageSwitcher,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## LanguageSwitcher

A reusable language switcher component for locale management. Supports multiple display variants.

### Features
- Toggle variant (default)
- Dropdown variant
- Segmented variant
- Size variants
- Custom labels
- Full locale names option

### Usage
\`\`\`tsx
<LanguageSwitcher
  locale="nb"
  onLocaleChange={handleChange}
  variant="toggle"
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onLocaleChange: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['toggle', 'dropdown', 'segmented'],
      description: 'Display variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Component size',
    },
    showFullNames: {
      control: 'boolean',
      description: 'Show full locale names',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable switcher',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Toggle variant (default)
export const Toggle: Story = {
  render: () => {
    const [locale, setLocale] = useState<'nb' | 'en'>('nb');
    return <LanguageSwitcher locale={locale} onLocaleChange={setLocale} variant="toggle" />;
  },
};

// Dropdown variant
export const Dropdown: Story = {
  render: () => {
    const [locale, setLocale] = useState<'nb' | 'en'>('nb');
    return <LanguageSwitcher locale={locale} onLocaleChange={setLocale} variant="dropdown" />;
  },
};

// Segmented variant
export const Segmented: Story = {
  render: () => {
    const [locale, setLocale] = useState<'nb' | 'en'>('nb');
    return <LanguageSwitcher locale={locale} onLocaleChange={setLocale} variant="segmented" />;
  },
};

// With custom labels
export const CustomLabels: Story = {
  render: () => {
    const [locale, setLocale] = useState<'nb' | 'en'>('nb');
    return (
      <LanguageSwitcher
        locale={locale}
        onLocaleChange={setLocale}
        variant="toggle"
        labels={{ nb: 'Norsk', en: 'English' }}
      />
    );
  },
};

// With full names
export const FullNames: Story = {
  render: () => {
    const [locale, setLocale] = useState<'nb' | 'en'>('nb');
    return (
      <LanguageSwitcher
        locale={locale}
        onLocaleChange={setLocale}
        variant="toggle"
        showFullNames={true}
        labels={{ nb: 'Norsk', en: 'English' }}
      />
    );
  },
};

// Size variants
export const Small: Story = {
  render: () => {
    const [locale, setLocale] = useState<'nb' | 'en'>('nb');
    return <LanguageSwitcher locale={locale} onLocaleChange={setLocale} variant="toggle" size="sm" />;
  },
};

export const Medium: Story = {
  render: () => {
    const [locale, setLocale] = useState<'nb' | 'en'>('nb');
    return <LanguageSwitcher locale={locale} onLocaleChange={setLocale} variant="toggle" size="md" />;
  },
};

export const Large: Story = {
  render: () => {
    const [locale, setLocale] = useState<'nb' | 'en'>('nb');
    return <LanguageSwitcher locale={locale} onLocaleChange={setLocale} variant="toggle" size="lg" />;
  },
};

// Disabled
export const Disabled: Story = {
  render: () => {
    const [locale] = useState<'nb' | 'en'>('nb');
    return <LanguageSwitcher locale={locale} onLocaleChange={fn()} variant="toggle" disabled />;
  },
};

// English selected
export const EnglishSelected: Story = {
  render: () => {
    const [locale, setLocale] = useState<'nb' | 'en'>('en');
    return <LanguageSwitcher locale={locale} onLocaleChange={setLocale} variant="toggle" />;
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => {
    const [locale1, setLocale1] = useState<'nb' | 'en'>('nb');
    const [locale2, setLocale2] = useState<'nb' | 'en'>('nb');
    const [locale3, setLocale3] = useState<'nb' | 'en'>('nb');
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <LanguageSwitcher locale={locale1} onLocaleChange={setLocale1} variant="toggle" />
        <LanguageSwitcher locale={locale2} onLocaleChange={setLocale2} variant="dropdown" />
        <LanguageSwitcher locale={locale3} onLocaleChange={setLocale3} variant="segmented" />
      </div>
    );
  },
};
