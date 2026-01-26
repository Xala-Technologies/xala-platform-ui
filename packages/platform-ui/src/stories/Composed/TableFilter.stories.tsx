import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { TableFilter, type FilterConfig, type FilterValues, Stack } from '../../index';

/**
 * TableFilter provides a reusable filter bar for data tables.
 *
 * ## Features
 * - Search input with debounce
 * - Dropdown filters (single and multi-select)
 * - Quick filter chips
 * - Filter state management
 * - Responsive design
 *
 * ## When to Use
 * - Data table filtering
 * - List filtering
 * - Search and filter UIs
 */
const meta: Meta<typeof TableFilter> = {
  title: 'Composed/TableFilter',
  component: TableFilter,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
TableFilter provides a reusable filter bar for data tables.

## Features
- Search input with debounce
- Dropdown filters (single and multi-select)
- Quick filter chips
- Filter state management
- Responsive design

## When to Use
- Data table filtering
- List filtering
- Search and filter UIs
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TableFilter>;

// Sample filter configs
const useSampleFilters = (): FilterConfig[] => {
  const t = useT();
  return [
    {
      id: 'search',
      type: 'search',
      label: t('storybook.tableFilter.search'),
      placeholder: t('storybook.tableFilter.searchPlaceholder'),
    },
    {
      id: 'status',
      type: 'select',
      label: t('storybook.tableFilter.status'),
      placeholder: t('storybook.tableFilter.selectStatus'),
      options: [
        { value: 'active', label: t('storybook.tableFilter.active') },
        { value: 'inactive', label: t('storybook.tableFilter.inactive') },
        { value: 'pending', label: t('storybook.tableFilter.pending') },
      ],
    },
    {
      id: 'category',
      type: 'multiselect',
      label: t('storybook.tableFilter.category'),
      placeholder: t('storybook.tableFilter.selectCategories'),
      options: [
        { value: 'feature', label: t('storybook.tableFilter.feature') },
        { value: 'bug', label: t('storybook.tableFilter.bug') },
        { value: 'enhancement', label: t('storybook.tableFilter.enhancement') },
      ],
    },
    {
      id: 'quick',
      type: 'chips',
      label: t('storybook.tableFilter.quickFilters'),
      options: [
        { value: 'recent', label: t('storybook.tableFilter.recent') },
        { value: 'favorites', label: t('storybook.tableFilter.favorites') },
        { value: 'archived', label: t('storybook.tableFilter.archived') },
      ],
    },
  ];
};

/**
 * Default table filter
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [values, setValues] = useState<FilterValues>({});
    const filters = useSampleFilters();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <TableFilter filters={filters} values={values} onChange={setValues} />
      </Stack>
    );
  },
};

/**
 * Table filter with initial values
 */
export const WithValues: Story = {
  render: function Render() {
    const t = useT();
    const [values, setValues] = useState<FilterValues>({
      search: 'test',
      status: 'active',
      category: ['feature', 'bug'],
    });
    const filters = useSampleFilters();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <TableFilter filters={filters} values={values} onChange={setValues} />
      </Stack>
    );
  },
};

/**
 * Table filter with clear all
 */
export const WithClearAll: Story = {
  render: function Render() {
    const t = useT();
    const [values, setValues] = useState<FilterValues>({
      search: 'test',
      status: 'active',
    });
    const filters = useSampleFilters();
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <TableFilter filters={filters} values={values} onChange={setValues} showClearAll />
      </div>
    );
  },
};

/**
 * Table filter with custom debounce
 */
export const CustomDebounce: Story = {
  render: function Render() {
    const t = useT();
    const [values, setValues] = useState<FilterValues>({});
    const filters = useSampleFilters();
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <TableFilter filters={filters} values={values} onChange={setValues} debounceMs={500} />
      </div>
    );
  },
};

/**
 * Table filter - search only
 */
export const SearchOnly: Story = {
  render: function Render() {
    const t = useT();
    const [values, setValues] = useState<FilterValues>({});
    const filters: FilterConfig[] = [
      {
        id: 'search',
        type: 'search',
        label: t('storybook.tableFilter.search'),
        placeholder: t('storybook.tableFilter.searchPlaceholder'),
      },
    ];
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <TableFilter filters={filters} values={values} onChange={setValues} />
      </Stack>
    );
  },
};
