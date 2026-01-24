import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { ListToolbar } from '../../composed/ListToolbar';
import { Button } from '@digdir/designsystemet-react';

const meta: Meta<typeof ListToolbar> = {
  title: 'Composed/ListToolbar',
  component: ListToolbar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ListToolbar

A consistent toolbar for list pages combining search, filters, sort, and actions.

### Features
- Search input with debouncing
- Filter dropdowns
- Sort dropdown
- Results count display
- Primary action button
- Filter counts
- Compact variant

### Usage
\`\`\`tsx
<ListToolbar
  search={{ value: query, onChange: setQuery }}
  filters={filters}
  activeFilters={activeFilters}
  onFilterChange={handleFilterChange}
  resultsCount={items.length}
  primaryAction={<Button>Create</Button>}
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

// Wrapper for search story
const WithSearchDemo = () => {
  const t = useT();
  const [query, setQuery] = useState('');
  return (
    <div style={{ width: '800px' }}>
      <ListToolbar
        search={{
          value: query,
          onChange: setQuery,
          placeholder: `${t('platform.common.search')}...`,
        }}
        resultsCount={42}
      />
    </div>
  );
};

// Basic toolbar with search
export const WithSearch: Story = {
  render: () => <WithSearchDemo />,
};

// Wrapper for filters story
const WithFiltersDemo = () => {
  const t = useT();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<string | undefined>('active');
  return (
    <div style={{ width: '800px' }}>
      <ListToolbar
        search={{
          value: query,
          onChange: setQuery,
          placeholder: `${t('platform.common.search')}...`,
        }}
        filters={[
          {
            id: 'status',
            label: t('platform.status.label'),
            value: status,
            options: [
              { id: 'all', label: t('platform.common.all') },
              { id: 'active', label: t('platform.status.active'), count: 25 },
              { id: 'inactive', label: t('platform.status.inactive'), count: 17 },
            ],
          },
        ]}
        activeFilters={{ status }}
        onFilterChange={(id, value) => {
          if (id === 'status') setStatus(value);
        }}
        resultsCount={42}
      />
    </div>
  );
};

// With filters
export const WithFilters: Story = {
  render: () => <WithFiltersDemo />,
};

// Wrapper for sort story
const WithSortDemo = () => {
  const t = useT();
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState('name');
  return (
    <div style={{ width: '800px' }}>
      <ListToolbar
        search={{
          value: query,
          onChange: setQuery,
          placeholder: `${t('platform.common.search')}...`,
        }}
        sortOptions={[
          { id: 'name', label: t('platform.common.name') },
          { id: 'date', label: t('storybook.demo.date') },
          { id: 'status', label: t('platform.status.label') },
        ]}
        sortValue={sort}
        onSortChange={setSort}
        resultsCount={42}
      />
    </div>
  );
};

// With sort
export const WithSort: Story = {
  render: () => <WithSortDemo />,
};

// Wrapper for primary action story
const WithPrimaryActionDemo = () => {
  const t = useT();
  const [query, setQuery] = useState('');
  return (
    <div style={{ width: '800px' }}>
      <ListToolbar
        search={{
          value: query,
          onChange: setQuery,
          placeholder: `${t('platform.common.search')}...`,
        }}
        resultsCount={42}
        primaryAction={
          <Button onClick={fn()} data-color="accent" data-size="medium">
            {t('storybook.demo.createNew')}
          </Button>
        }
      />
    </div>
  );
};

// With primary action
export const WithPrimaryAction: Story = {
  render: () => <WithPrimaryActionDemo />,
};

// Wrapper for complete story
const CompleteDemo = () => {
  const t = useT();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<string | undefined>('active');
  const [type, setType] = useState<string | undefined>();
  const [sort, setSort] = useState('name');
  return (
    <div style={{ width: '800px' }}>
      <ListToolbar
        search={{
          value: query,
          onChange: setQuery,
          placeholder: `${t('storybook.demo.searchItems')}...`,
        }}
        filters={[
          {
            id: 'status',
            label: t('platform.status.label'),
            value: status,
            options: [
              { id: 'all', label: t('platform.common.all') },
              { id: 'active', label: t('platform.status.active'), count: 25 },
              { id: 'inactive', label: t('platform.status.inactive'), count: 17 },
            ],
          },
          {
            id: 'type',
            label: t('storybook.demo.type'),
            value: type,
            options: [
              { id: 'all', label: t('platform.common.all') },
              { id: 'type1', label: `${t('storybook.demo.type')} 1`, count: 10 },
              { id: 'type2', label: `${t('storybook.demo.type')} 2`, count: 15 },
            ],
          },
        ]}
        activeFilters={{ status, type }}
        onFilterChange={(id, value) => {
          if (id === 'status') setStatus(value);
          if (id === 'type') setType(value);
        }}
        sortOptions={[
          { id: 'name', label: t('platform.common.name') },
          { id: 'date', label: t('storybook.demo.date') },
          { id: 'status', label: t('platform.status.label') },
        ]}
        sortValue={sort}
        onSortChange={setSort}
        resultsCount={42}
        resultsLabel={t('storybook.demo.items')}
        primaryAction={
          <Button onClick={fn()} data-color="accent" data-size="medium">
            {t('storybook.demo.createItem')}
          </Button>
        }
      />
    </div>
  );
};

// Complete toolbar
export const Complete: Story = {
  render: () => <CompleteDemo />,
};

// Wrapper for compact story
const CompactDemo = () => {
  const t = useT();
  const [query, setQuery] = useState('');
  return (
    <div style={{ width: '800px' }}>
      <ListToolbar
        variant="compact"
        search={{
          value: query,
          onChange: setQuery,
          placeholder: `${t('platform.common.search')}...`,
        }}
        resultsCount={42}
      />
    </div>
  );
};

// Compact variant
export const Compact: Story = {
  render: () => <CompactDemo />,
};

// Wrapper for without counts story
const WithoutFilterCountsDemo = () => {
  const t = useT();
  const [query, setQuery] = useState('');
  const [status, setStatus] = useState<string | undefined>('active');
  return (
    <div style={{ width: '800px' }}>
      <ListToolbar
        search={{
          value: query,
          onChange: setQuery,
          placeholder: `${t('platform.common.search')}...`,
        }}
        filters={[
          {
            id: 'status',
            label: t('platform.status.label'),
            value: status,
            options: [
              { id: 'all', label: t('platform.common.all') },
              { id: 'active', label: t('platform.status.active') },
              { id: 'inactive', label: t('platform.status.inactive') },
            ],
          },
        ]}
        activeFilters={{ status }}
        onFilterChange={(id, value) => {
          if (id === 'status') setStatus(value);
        }}
        showFilterCounts={false}
        resultsCount={42}
      />
    </div>
  );
};

// Without filter counts
export const WithoutFilterCounts: Story = {
  render: () => <WithoutFilterCountsDemo />,
};

// Wrapper for custom results label story
const CustomResultsLabelDemo = () => {
  const t = useT();
  const [query, setQuery] = useState('');
  return (
    <div style={{ width: '800px' }}>
      <ListToolbar
        search={{
          value: query,
          onChange: setQuery,
          placeholder: `${t('platform.common.search')}...`,
        }}
        resultsCount={15}
        resultsLabel={t('storybook.demo.resources')}
      />
    </div>
  );
};

// Custom results label
export const CustomResultsLabel: Story = {
  render: () => <CustomResultsLabelDemo />,
};

// Wrapper for no results story
const NoResultsDemo = () => {
  const t = useT();
  const [query, setQuery] = useState('');
  return (
    <div style={{ width: '800px' }}>
      <ListToolbar
        search={{
          value: query,
          onChange: setQuery,
          placeholder: `${t('platform.common.search')}...`,
        }}
        resultsCount={0}
      />
    </div>
  );
};

// No results
export const NoResults: Story = {
  render: () => <NoResultsDemo />,
};
