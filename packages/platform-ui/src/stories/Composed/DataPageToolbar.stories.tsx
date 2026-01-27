import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { DataPageToolbar, Stack, Paragraph, Card } from '../../index';

/**
 * DataPageToolbar combines search, filters, and view mode toggle.
 *
 * ## Features
 * - Search input
 * - Filter dropdowns
 * - View mode toggle (grid/list/map/table)
 * - Flexible layout
 *
 * ## When to Use
 * - Data listing pages
 * - Pages with search and filters
 * - Pages with multiple view modes
 */
const meta: Meta<typeof DataPageToolbar> = {
  title: 'Composed/DataPageToolbar',
  component: DataPageToolbar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataPageToolbar>;

/**
 * Default toolbar with search
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [searchValue, setSearchValue] = useState('');
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '1000px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.dataPageToolbar.description')}</Paragraph>
            <DataPageToolbar
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              searchPlaceholder={t('storybook.dataPageToolbar.searchPlaceholder')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Toolbar with view mode toggle
 */
export const WithViewMode: Story = {
  render: function Render() {
    const t = useT();
    const [searchValue, setSearchValue] = useState('');
    const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map' | 'table'>('grid');
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '1000px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.dataPageToolbar.withViewMode')}</Paragraph>
            <DataPageToolbar
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              searchPlaceholder={t('storybook.dataPageToolbar.searchPlaceholder')}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
              availableViews={['grid', 'list', 'map', 'table']}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Toolbar with filters
 */
export const WithFilters: Story = {
  render: function Render() {
    const t = useT();
    const [searchValue, setSearchValue] = useState('');
    const [statusFilter, setStatusFilter] = useState('all');
    const [categoryFilter, setCategoryFilter] = useState('all');
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '1000px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.dataPageToolbar.withFilters')}</Paragraph>
            <DataPageToolbar
              searchValue={searchValue}
              onSearchChange={setSearchValue}
              searchPlaceholder={t('storybook.dataPageToolbar.searchPlaceholder')}
              filters={[
                {
                  label: t('storybook.dataPageToolbar.status'),
                  value: statusFilter,
                  onChange: setStatusFilter,
                  options: [
                    { value: 'all', label: t('storybook.dataPageToolbar.all') },
                    { value: 'active', label: t('storybook.dataPageToolbar.active') },
                    { value: 'inactive', label: t('storybook.dataPageToolbar.inactive') },
                  ],
                },
                {
                  label: t('storybook.dataPageToolbar.category'),
                  value: categoryFilter,
                  onChange: setCategoryFilter,
                  options: [
                    { value: 'all', label: t('storybook.dataPageToolbar.all') },
                    { value: 'category1', label: t('storybook.dataPageToolbar.category1') },
                    { value: 'category2', label: t('storybook.dataPageToolbar.category2') },
                  ],
                },
              ]}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
