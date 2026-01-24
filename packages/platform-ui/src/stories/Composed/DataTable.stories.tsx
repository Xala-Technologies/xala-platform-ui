import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { useT } from '@xala-technologies/i18n';
import { DataTable } from '../../composed/DataTable';
import { Badge } from '../../composed/Badge';

const meta: Meta<typeof DataTable> = {
  title: 'Composed/DataTable',
  component: DataTable,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## DataTable

Reusable table components with proper design tokens, sorting, filtering, and accessibility.

### Features
- Sortable columns with visual indicators
- Responsive design with horizontal scroll
- Keyboard navigation support
- Loading state
- Empty state
- Row click handlers
- Sticky header option

### Usage
\`\`\`tsx
<DataTable
  data={rows}
  columns={columns}
  getRowKey={(row) => row.id}
  onSort={handleSort}
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

// Sample data
interface SampleRow {
  id: string;
  name: string;
  email: string;
  status: 'active' | 'inactive';
  role: string;
  createdAt: string;
}

const sampleData: SampleRow[] = [
  {
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    status: 'active',
    role: 'Admin',
    createdAt: '2024-01-15',
  },
  {
    id: '2',
    name: 'Jane Smith',
    email: 'jane@example.com',
    status: 'active',
    role: 'User',
    createdAt: '2024-01-14',
  },
  {
    id: '3',
    name: 'Bob Johnson',
    email: 'bob@example.com',
    status: 'inactive',
    role: 'User',
    createdAt: '2024-01-13',
  },
];

// Hook for translated columns
const useColumns = () => {
  const t = useT();
  return [
    {
      id: 'name',
      header: t('platform.common.name'),
      accessorKey: 'name' as keyof SampleRow,
      sortable: true,
    },
    {
      id: 'email',
      header: t('platform.auth.email'),
      accessorKey: 'email' as keyof SampleRow,
      sortable: true,
    },
    {
      id: 'status',
      header: t('platform.status.label'),
      accessorKey: 'status' as keyof SampleRow,
      cell: (value: SampleRow['status']) => (
        <Badge variant={value === 'active' ? 'success' : 'default'}>
          {value === 'active' ? t('platform.status.active') : t('platform.status.inactive')}
        </Badge>
      ),
      sortable: true,
    },
    {
      id: 'role',
      header: t('storybook.demo.role'),
      accessorKey: 'role' as keyof SampleRow,
      sortable: true,
    },
    {
      id: 'createdAt',
      header: t('storybook.demo.created'),
      accessorKey: 'createdAt' as keyof SampleRow,
      sortable: true,
    },
  ];
};

// Wrapper for default story
const DefaultDemo = () => {
  const t = useT();
  const columns = useColumns();
  return (
    <div style={{ width: '800px' }}>
      <DataTable
        data={sampleData}
        columns={columns}
        getRowKey={(row) => row.id}
        ariaLabel={t('storybook.demo.userTable')}
      />
    </div>
  );
};

// Basic table
export const Default: Story = {
  render: () => <DefaultDemo />,
};

// Wrapper for sorting story
const WithSortingDemo = () => {
  const t = useT();
  const columns = useColumns();
  const [sortColumn, setSortColumn] = React.useState<string | undefined>('name');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc' | 'none'>('asc');

  const handleSort = (column: string, direction: 'asc' | 'desc' | 'none') => {
    setSortColumn(column);
    setSortDirection(direction);
  };

  return (
    <div style={{ width: '800px' }}>
      <DataTable
        data={sampleData}
        columns={columns}
        getRowKey={(row) => row.id}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        ariaLabel={t('storybook.demo.sortableUserTable')}
      />
    </div>
  );
};

// With sorting
export const WithSorting: Story = {
  render: () => <WithSortingDemo />,
};

// Wrapper for row click story
const WithRowClickDemo = () => {
  const t = useT();
  const columns = useColumns();
  return (
    <div style={{ width: '800px' }}>
      <DataTable
        data={sampleData}
        columns={columns}
        getRowKey={(row) => row.id}
        onRowClick={fn()}
        ariaLabel={t('storybook.demo.clickableUserTable')}
      />
    </div>
  );
};

// With row click
export const WithRowClick: Story = {
  render: () => <WithRowClickDemo />,
};

// Wrapper for loading story
const LoadingDemo = () => {
  const t = useT();
  const columns = useColumns();
  return (
    <div style={{ width: '800px' }}>
      <DataTable
        data={[]}
        columns={columns}
        getRowKey={(row) => row.id}
        isLoading={true}
        ariaLabel={t('storybook.demo.loadingTable')}
      />
    </div>
  );
};

// Loading state
export const Loading: Story = {
  render: () => <LoadingDemo />,
};

// Wrapper for empty story
const EmptyDemo = () => {
  const t = useT();
  const columns = useColumns();
  return (
    <div style={{ width: '800px' }}>
      <DataTable
        data={[]}
        columns={columns}
        getRowKey={(row) => row.id}
        emptyMessage={t('storybook.demo.noUsersFound')}
        ariaLabel={t('storybook.demo.emptyTable')}
      />
    </div>
  );
};

// Empty state
export const Empty: Story = {
  render: () => <EmptyDemo />,
};

// Wrapper for sticky header story
const StickyHeaderDemo = () => {
  const t = useT();
  const columns = useColumns();
  return (
    <div style={{ width: '800px', height: '400px', overflow: 'auto' }}>
      <DataTable
        data={[...sampleData, ...sampleData, ...sampleData]}
        columns={columns}
        getRowKey={(row) => row.id}
        stickyHeader={true}
        ariaLabel={t('storybook.demo.stickyHeaderTable')}
      />
    </div>
  );
};

// Sticky header
export const StickyHeader: Story = {
  render: () => <StickyHeaderDemo />,
};

// Wrapper for custom height story
const CustomHeightDemo = () => {
  const t = useT();
  const columns = useColumns();
  return (
    <div style={{ width: '800px' }}>
      <DataTable
        data={sampleData}
        columns={columns}
        getRowKey={(row) => row.id}
        height="300px"
        ariaLabel={t('storybook.demo.customHeightTable')}
      />
    </div>
  );
};

// Custom height
export const CustomHeight: Story = {
  render: () => <CustomHeightDemo />,
};
