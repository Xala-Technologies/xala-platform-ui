import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { SearchableSelect, type SelectOption } from '../../index';

/**
 * SearchableSelect provides a searchable dropdown with filtering and multi-select.
 *
 * ## Features
 * - Search/filter options
 * - Single and multi-select
 * - Async loading support
 * - Creatable options
 * - Clearable
 *
 * ## When to Use
 * - Large option lists
 * - Searchable dropdowns
 * - Multi-select scenarios
 */
const meta: Meta<typeof SearchableSelect> = {
  title: 'Composed/SearchableSelect',
  component: SearchableSelect,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
SearchableSelect provides a searchable dropdown with filtering and multi-select.

## Features
- Search/filter options
- Single and multi-select
- Async loading support
- Creatable options
- Clearable

## When to Use
- Large option lists
- Searchable dropdowns
- Multi-select scenarios
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SearchableSelect>;

// Sample options
const useSampleOptions = (): SelectOption[] => {
  const t = useT();
  return [
    { value: 'no', label: t('storybook.searchableSelect.norway') },
    { value: 'se', label: t('storybook.searchableSelect.sweden') },
    { value: 'dk', label: t('storybook.searchableSelect.denmark') },
    { value: 'fi', label: t('storybook.searchableSelect.finland') },
    { value: 'is', label: t('storybook.searchableSelect.iceland') },
  ];
};

/**
 * Default searchable select
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<string | undefined>(undefined);
    const options = useSampleOptions();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <SearchableSelect
          options={options}
          value={value}
          onChange={setValue}
          placeholder={t('storybook.searchableSelect.selectCountry')}
        />
      </Stack>
    );
  },
};

/**
 * Searchable select with label
 */
export const WithLabel: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<string | undefined>(undefined);
    const options = useSampleOptions();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <SearchableSelect
          options={options}
          value={value}
          onChange={setValue}
          label={t('storybook.searchableSelect.country')}
          placeholder={t('storybook.searchableSelect.selectCountry')}
        />
      </Stack>
    );
  },
};

/**
 * Multi-select
 */
export const MultiSelect: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<string[]>([]);
    const options = useSampleOptions();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <SearchableSelect
          options={options}
          value={value}
          onChange={setValue}
          multiple
          placeholder={t('storybook.searchableSelect.selectCountries')}
        />
      </Stack>
    );
  },
};

/**
 * With clearable
 */
export const Clearable: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<string>('no');
    const options = useSampleOptions();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <SearchableSelect
          options={options}
          value={value}
          onChange={setValue}
          clearable
          placeholder={t('storybook.searchableSelect.selectCountry')}
        />
      </Stack>
    );
  },
};

/**
 * With loading state
 */
export const Loading: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<string | undefined>(undefined);
    const options = useSampleOptions();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <SearchableSelect
          options={options}
          value={value}
          onChange={setValue}
          loading
          placeholder={t('storybook.searchableSelect.loading')}
        />
      </Stack>
    );
  },
};

/**
 * With error
 */
export const WithError: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<string | undefined>(undefined);
    const options = useSampleOptions();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <SearchableSelect
          options={options}
          value={value}
          onChange={setValue}
          error={t('storybook.searchableSelect.countryRequired')}
          placeholder={t('storybook.searchableSelect.selectCountry')}
        />
      </Stack>
    );
  },
};

/**
 * Disabled
 */
export const Disabled: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState<string>('no');
    const options = useSampleOptions();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <SearchableSelect
          options={options}
          value={value}
          onChange={setValue}
          disabled
          placeholder={t('storybook.searchableSelect.selectCountry')}
        />
      </Stack>
    );
  },
};
