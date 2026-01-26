import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { ThemeToolbar, Stack } from '../../index';

/**
 * ThemeToolbar provides a toolbar for switching theme, locale, and brand themes.
 *
 * ## Features
 * - Color scheme toggle (light/dark)
 * - Locale switcher
 * - Brand theme selector
 * - Customizable labels
 *
 * ## When to Use
 * - Global settings
 * - Theme switching
 * - Locale selection
 */
const meta: Meta<typeof ThemeToolbar> = {
  title: 'Composed/ThemeToolbar',
  component: ThemeToolbar,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
ThemeToolbar provides a toolbar for switching theme, locale, and brand themes.

## Features
- Color scheme toggle (light/dark)
- Locale switcher
- Brand theme selector
- Customizable labels

## When to Use
- Global settings
- Theme switching
- Locale selection
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof ThemeToolbar>;

/**
 * Default theme toolbar
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <ThemeToolbar
          colorScheme={colorScheme}
          onColorSchemeChange={setColorScheme}
          showColorScheme
        />
      </div>
    );
  },
};

/**
 * Theme toolbar with locale
 */
export const WithLocale: Story = {
  render: function Render() {
    const t = useT();
    const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');
    const [locale, setLocale] = useState('nb');
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <ThemeToolbar
          colorScheme={colorScheme}
          onColorSchemeChange={setColorScheme}
          showColorScheme
          locale={locale}
          locales={[
            { value: 'nb', label: 'NB' },
            { value: 'en', label: 'EN' },
            { value: 'ar', label: 'AR' },
          ]}
          onLocaleChange={setLocale}
          showLocale
        />
      </div>
    );
  },
};

/**
 * Theme toolbar with brand themes
 */
export const WithBrandThemes: Story = {
  render: function Render() {
    const t = useT();
    const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');
    const [brandTheme, setBrandTheme] = useState('digilist');
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <ThemeToolbar
          colorScheme={colorScheme}
          onColorSchemeChange={setColorScheme}
          showColorScheme
          brandTheme={brandTheme}
          brandThemes={[
            { value: 'digilist', label: t('storybook.themeToolbar.digilist') },
            { value: 'xaheen', label: t('storybook.themeToolbar.xaheen') },
            { value: 'platform', label: t('storybook.themeToolbar.platform') },
          ]}
          onBrandThemeChange={setBrandTheme}
          showBrandTheme
        />
      </Stack>
    );
  },
};

/**
 * Theme toolbar - all options
 */
export const AllOptions: Story = {
  render: function Render() {
    const t = useT();
    const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');
    const [locale, setLocale] = useState('nb');
    const [brandTheme, setBrandTheme] = useState('digilist');
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <ThemeToolbar
          colorScheme={colorScheme}
          onColorSchemeChange={setColorScheme}
          showColorScheme
          locale={locale}
          locales={[
            { value: 'nb', label: 'NB' },
            { value: 'en', label: 'EN' },
            { value: 'ar', label: 'AR' },
          ]}
          onLocaleChange={setLocale}
          showLocale
          brandTheme={brandTheme}
          brandThemes={[
            { value: 'digilist', label: t('storybook.themeToolbar.digilist') },
            { value: 'xaheen', label: t('storybook.themeToolbar.xaheen') },
            { value: 'platform', label: t('storybook.themeToolbar.platform') },
          ]}
          onBrandThemeChange={setBrandTheme}
          showBrandTheme
        />
      </Stack>
    );
  },
};

/**
 * Small theme toolbar
 */
export const Small: Story = {
  render: function Render() {
    const t = useT();
    const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('light');
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <ThemeToolbar
          colorScheme={colorScheme}
          onColorSchemeChange={setColorScheme}
          showColorScheme
          size="sm"
        />
      </div>
    );
  },
};
