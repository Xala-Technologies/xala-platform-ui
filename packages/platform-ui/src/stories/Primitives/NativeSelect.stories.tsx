import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { NativeSelect } from '../../index';

/**
 * NativeSelect provides a simple wrapper around native HTML select with Designsystemet styling.
 *
 * ## Features
 * - Label support
 * - Error message display
 * - Helper text / description
 * - Native select behavior
 *
 * ## When to Use
 * - Simple dropdowns
 * - Native select behavior needed
 * - Lightweight selects
 */
const meta: Meta<typeof NativeSelect> = {
  title: 'Primitives/NativeSelect',
  component: NativeSelect,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
NativeSelect provides a simple wrapper around native HTML select with Designsystemet styling.

## Features
- Label support
- Error message display
- Helper text / description
- Native select behavior

## When to Use
- Simple dropdowns
- Native select behavior needed
- Lightweight selects
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NativeSelect>;

/**
 * Default native select
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <NativeSelect label={t('storybook.nativeSelect.country')}>
          <option value="">{t('storybook.nativeSelect.selectCountry')}</option>
          <option value="no">{t('storybook.nativeSelect.norway')}</option>
          <option value="se">{t('storybook.nativeSelect.sweden')}</option>
          <option value="dk">{t('storybook.nativeSelect.denmark')}</option>
        </NativeSelect>
      </div>
    );
  },
};

/**
 * Native select with description
 */
export const WithDescription: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <NativeSelect
          label={t('storybook.nativeSelect.language')}
          description={t('storybook.nativeSelect.languageDescription')}
        >
          <option value="">{t('storybook.nativeSelect.selectLanguage')}</option>
          <option value="nb">{t('storybook.nativeSelect.norwegian')}</option>
          <option value="en">{t('storybook.nativeSelect.english')}</option>
          <option value="ar">{t('storybook.nativeSelect.arabic')}</option>
        </NativeSelect>
      </div>
    );
  },
};

/**
 * Required native select
 */
export const Required: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <NativeSelect label={t('storybook.nativeSelect.country')} required>
          <option value="">{t('storybook.nativeSelect.selectCountry')}</option>
          <option value="no">{t('storybook.nativeSelect.norway')}</option>
          <option value="se">{t('storybook.nativeSelect.sweden')}</option>
          <option value="dk">{t('storybook.nativeSelect.denmark')}</option>
        </NativeSelect>
      </div>
    );
  },
};

/**
 * Native select with error
 */
export const WithError: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <NativeSelect label={t('storybook.nativeSelect.country')} error={t('storybook.nativeSelect.countryError')}>
          <option value="">{t('storybook.nativeSelect.selectCountry')}</option>
          <option value="no">{t('storybook.nativeSelect.norway')}</option>
          <option value="se">{t('storybook.nativeSelect.sweden')}</option>
          <option value="dk">{t('storybook.nativeSelect.denmark')}</option>
        </NativeSelect>
      </div>
    );
  },
};

/**
 * Disabled native select
 */
export const Disabled: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <NativeSelect label={t('storybook.nativeSelect.country')} disabled>
          <option value="">{t('storybook.nativeSelect.selectCountry')}</option>
          <option value="no">{t('storybook.nativeSelect.norway')}</option>
          <option value="se">{t('storybook.nativeSelect.sweden')}</option>
          <option value="dk">{t('storybook.nativeSelect.denmark')}</option>
        </NativeSelect>
      </div>
    );
  },
};

/**
 * Native select with many options
 */
export const ManyOptions: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <NativeSelect label={t('storybook.nativeSelect.city')}>
          <option value="">{t('storybook.nativeSelect.selectCity')}</option>
          <option value="oslo">{t('storybook.nativeSelect.oslo')}</option>
          <option value="bergen">{t('storybook.nativeSelect.bergen')}</option>
          <option value="trondheim">{t('storybook.nativeSelect.trondheim')}</option>
          <option value="stavanger">{t('storybook.nativeSelect.stavanger')}</option>
          <option value="bodo">{t('storybook.nativeSelect.bodo')}</option>
          <option value="tromso">{t('storybook.nativeSelect.tromso')}</option>
        </NativeSelect>
      </div>
    );
  },
};
