import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
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

const columns = [
  {
    id: 'name',
    header: 'Name',
    accessorKey: 'name' as keyof SampleRow,
    sortable: true,
  },
  {
    id: 'email',
    header: 'Email',
    accessorKey: 'email' as keyof SampleRow,
    sortable: true,
  },
  {
    id: 'status',
    header: 'Status',
    accessorKey: 'status' as keyof SampleRow,
    cell: (value: SampleRow['status']) => (
      <Badge variant={value === 'active' ? 'success' : 'default'}>{value}</Badge>
    ),
    sortable: true,
  },
  {
    id: 'role',
    header: 'Role',
    accessorKey: 'role' as keyof SampleRow,
    sortable: true,
  },
  {
    id: 'createdAt',
    header: 'Created',
    accessorKey: 'createdAt' as keyof SampleRow,
    sortable: true,
  },
];

// Basic table
export const Default: Story = {
  render: () => (
    <div style={{ width: '800px' }}>
      <DataTable
        data={sampleData}
        columns={columns}
        getRowKey={(row) => row.id}
        ariaLabel="User table"
      />
    </div>
  ),
};

// With sorting
export const WithSorting: Story = {
  render: () => {
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
          ariaLabel="Sortable user table"
        />
      </div>
    );
  },
};

// With row click
export const WithRowClick: Story = {
  render: () => (
    <div style={{ width: '800px' }}>
      <DataTable
        data={sampleData}
        columns={columns}
        getRowKey={(row) => row.id}
        onRowClick={fn()}
        ariaLabel="Clickable user table"
      />
    </div>
  ),
};

// Loading state
export const Loading: Story = {
  render: () => (
    <div style={{ width: '800px' }}>
      <DataTable
        data={[]}
        columns={columns}
        getRowKey={(row) => row.id}
        isLoading={true}
        ariaLabel="Loading table"
      />
    </div>
  ),
};

// Empty state
export const Empty: Story = {
  render: () => (
    <div style={{ width: '800px' }}>
      <DataTable
        data={[]}
        columns={columns}
        getRowKey={(row) => row.id}
        emptyMessage="No users found"
        ariaLabel="Empty table"
      />
    </div>
  ),
};

// Sticky header
export const StickyHeader: Story = {
  render: () => (
    <div style={{ width: '800px', height: '400px', overflow: 'auto' }}>
      <DataTable
        data={[...sampleData, ...sampleData, ...sampleData]}
        columns={columns}
        getRowKey={(row) => row.id}
        stickyHeader={true}
        ariaLabel="Table with sticky header"
      />
    </div>
  ),
};

// Custom height
export const CustomHeight: Story = {
  render: () => (
    <div style={{ width: '800px' }}>
      <DataTable
        data={sampleData}
        columns={columns}
        getRowKey={(row) => row.id}
        height="300px"
        ariaLabel="Table with custom height"
      />
    </div>
  ),
};
