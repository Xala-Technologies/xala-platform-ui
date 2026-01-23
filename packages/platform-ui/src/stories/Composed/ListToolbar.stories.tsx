import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
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

// Basic toolbar with search
export const WithSearch: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    return (
      <div style={{ width: '800px' }}>
        <ListToolbar
          search={{
            value: query,
            onChange: setQuery,
            placeholder: 'Search...',
          }}
          resultsCount={42}
        />
      </div>
    );
  },
};

// With filters
export const WithFilters: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState<string | undefined>('active');
    return (
      <div style={{ width: '800px' }}>
        <ListToolbar
          search={{
            value: query,
            onChange: setQuery,
            placeholder: 'Search...',
          }}
          filters={[
            {
              id: 'status',
              label: 'Status',
              value: status,
              options: [
                { id: 'all', label: 'All' },
                { id: 'active', label: 'Active', count: 25 },
                { id: 'inactive', label: 'Inactive', count: 17 },
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
  },
};

// With sort
export const WithSort: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    const [sort, setSort] = useState('name');
    return (
      <div style={{ width: '800px' }}>
        <ListToolbar
          search={{
            value: query,
            onChange: setQuery,
            placeholder: 'Search...',
          }}
          sortOptions={[
            { id: 'name', label: 'Name' },
            { id: 'date', label: 'Date' },
            { id: 'status', label: 'Status' },
          ]}
          sortValue={sort}
          onSortChange={setSort}
          resultsCount={42}
        />
      </div>
    );
  },
};

// With primary action
export const WithPrimaryAction: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    return (
      <div style={{ width: '800px' }}>
        <ListToolbar
          search={{
            value: query,
            onChange: setQuery,
            placeholder: 'Search...',
          }}
          resultsCount={42}
          primaryAction={
            <Button onClick={fn()} data-color="accent" data-size="medium">
              Create New
            </Button>
          }
        />
      </div>
    );
  },
};

// Complete toolbar
export const Complete: Story = {
  render: () => {
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
            placeholder: 'Search items...',
          }}
          filters={[
            {
              id: 'status',
              label: 'Status',
              value: status,
              options: [
                { id: 'all', label: 'All' },
                { id: 'active', label: 'Active', count: 25 },
                { id: 'inactive', label: 'Inactive', count: 17 },
              ],
            },
            {
              id: 'type',
              label: 'Type',
              value: type,
              options: [
                { id: 'all', label: 'All' },
                { id: 'type1', label: 'Type 1', count: 10 },
                { id: 'type2', label: 'Type 2', count: 15 },
              ],
            },
          ]}
          activeFilters={{ status, type }}
          onFilterChange={(id, value) => {
            if (id === 'status') setStatus(value);
            if (id === 'type') setType(value);
          }}
          sortOptions={[
            { id: 'name', label: 'Name' },
            { id: 'date', label: 'Date' },
            { id: 'status', label: 'Status' },
          ]}
          sortValue={sort}
          onSortChange={setSort}
          resultsCount={42}
          resultsLabel="items"
          primaryAction={
            <Button onClick={fn()} data-color="accent" data-size="medium">
              Create Item
            </Button>
          }
        />
      </div>
    );
  },
};

// Compact variant
export const Compact: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    return (
      <div style={{ width: '800px' }}>
        <ListToolbar
          variant="compact"
          search={{
            value: query,
            onChange: setQuery,
            placeholder: 'Search...',
          }}
          resultsCount={42}
        />
      </div>
    );
  },
};

// Without filter counts
export const WithoutFilterCounts: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    const [status, setStatus] = useState<string | undefined>('active');
    return (
      <div style={{ width: '800px' }}>
        <ListToolbar
          search={{
            value: query,
            onChange: setQuery,
            placeholder: 'Search...',
          }}
          filters={[
            {
              id: 'status',
              label: 'Status',
              value: status,
              options: [
                { id: 'all', label: 'All' },
                { id: 'active', label: 'Active' },
                { id: 'inactive', label: 'Inactive' },
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
  },
};

// Custom results label
export const CustomResultsLabel: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    return (
      <div style={{ width: '800px' }}>
        <ListToolbar
          search={{
            value: query,
            onChange: setQuery,
            placeholder: 'Search...',
          }}
          resultsCount={15}
          resultsLabel="resources"
        />
      </div>
    );
  },
};

// No results
export const NoResults: Story = {
  render: () => {
    const [query, setQuery] = useState('');
    return (
      <div style={{ width: '800px' }}>
        <ListToolbar
          search={{
            value: query,
            onChange: setQuery,
            placeholder: 'Search...',
          }}
          resultsCount={0}
        />
      </div>
    );
  },
};
