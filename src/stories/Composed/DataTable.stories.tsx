import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { useT } from '@xala-technologies/i18n';
import { DataTable } from '../../composed/DataTable';
import { Badge } from '../../composed/Badge';
import { TableFilter, type FilterConfig, type FilterValues, Stack, Pagination } from '../../index';

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

// Hook for translated sample data
const useSampleData = () => {
  const t = useT();
  return [
    {
      id: '1',
      name: t('storybook.demo.userName.johnDoe'),
      email: t('storybook.demo.email.john'),
      status: 'active' as const,
      role: t('storybook.demo.admin'),
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: t('storybook.demo.userName.janeSmith'),
      email: t('storybook.demo.email.jane'),
      status: 'active' as const,
      role: t('storybook.demo.userRole'),
      createdAt: '2024-01-14',
    },
    {
      id: '3',
      name: t('storybook.demo.userName.bobJohnson'),
      email: t('storybook.demo.email.bob'),
      status: 'inactive' as const,
      role: t('storybook.demo.userRole'),
      createdAt: '2024-01-13',
    },
  ];
};

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
  const sampleData = useSampleData();
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
  render: function Render() {
    return <DefaultDemo />;
  },
};

// Wrapper for sorting story
const WithSortingDemo = () => {
  const t = useT();
  const columns = useColumns();
  const sampleData = useSampleData();
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
  render: function Render() {
    return <WithSortingDemo />;
  },
};

// Wrapper for row click story
const WithRowClickDemo = () => {
  const t = useT();
  const columns = useColumns();
  const sampleData = useSampleData();
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
  render: function Render() {
    return <WithRowClickDemo />;
  },
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
  render: function Render() {
    return <LoadingDemo />;
  },
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
  render: function Render() {
    return <EmptyDemo />;
  },
};

// Wrapper for sticky header story
const StickyHeaderDemo = () => {
  const t = useT();
  const columns = useColumns();
  const sampleData = useSampleData();
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
  render: function Render() {
    return <StickyHeaderDemo />;
  },
};

// Wrapper for custom height story
const CustomHeightDemo = () => {
  const t = useT();
  const columns = useColumns();
  const sampleData = useSampleData();
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
  render: function Render() {
    return <CustomHeightDemo />;
  },
};

// Wrapper for filtering story
const WithFilteringDemo = () => {
  const t = useT();
  const columns = useColumns();
  const sampleData = useSampleData();
  const [filterValues, setFilterValues] = React.useState<FilterValues>({});

  // Filter configurations
  const filters: FilterConfig[] = React.useMemo(
    () => [
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
        ],
      },
      {
        id: 'role',
        type: 'select',
        label: t('storybook.demo.role'),
        placeholder: t('storybook.tableFilter.selectStatus'),
        options: [
          { value: 'admin', label: t('storybook.demo.admin') },
          { value: 'user', label: t('storybook.demo.userRole') },
        ],
      },
    ],
    [t]
  );

  // Filter data based on filter values
  const filteredData = React.useMemo(() => {
    let result = [...sampleData];

    // Search filter
    if (filterValues.search) {
      const searchLower = (filterValues.search as string).toLowerCase();
      result = result.filter(
        (row) =>
          row.name.toLowerCase().includes(searchLower) ||
          row.email.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (filterValues.status) {
      result = result.filter((row) => row.status === filterValues.status);
    }

    // Role filter
    if (filterValues.role) {
      const roleValue = filterValues.role as string;
      result = result.filter((row) => {
        const rowRoleKey = row.role === t('storybook.demo.admin') ? 'admin' : 'user';
        return rowRoleKey === roleValue;
      });
    }

    return result;
  }, [sampleData, filterValues, t]);

  return (
    <Stack spacing="var(--ds-spacing-4)" style={{ width: '800px' }}>
      <TableFilter
        filters={filters}
        values={filterValues}
        onChange={setFilterValues}
        showClearAll
      />
      <DataTable
        data={filteredData}
        columns={columns}
        getRowKey={(row) => row.id}
        emptyMessage={t('storybook.demo.noUsersFound')}
        ariaLabel={t('storybook.demo.userTable')}
      />
    </Stack>
  );
};

// With filtering
export const WithFiltering: Story = {
  render: function Render() {
    return <WithFilteringDemo />;
  },
};

// Hook for paginated sample data (larger dataset)
const usePaginatedSampleData = () => {
  const t = useT();
  return [
    {
      id: '1',
      name: t('storybook.demo.userName.johnDoe'),
      email: t('storybook.demo.email.john'),
      status: 'active' as const,
      role: t('storybook.demo.admin'),
      createdAt: '2024-01-15',
    },
    {
      id: '2',
      name: t('storybook.demo.userName.janeSmith'),
      email: t('storybook.demo.email.jane'),
      status: 'active' as const,
      role: t('storybook.demo.userRole'),
      createdAt: '2024-01-14',
    },
    {
      id: '3',
      name: t('storybook.demo.userName.bobJohnson'),
      email: t('storybook.demo.email.bob'),
      status: 'inactive' as const,
      role: t('storybook.demo.userRole'),
      createdAt: '2024-01-13',
    },
    {
      id: '4',
      name: 'Alice Anderson',
      email: 'alice@example.com',
      status: 'active' as const,
      role: t('storybook.demo.admin'),
      createdAt: '2024-01-12',
    },
    {
      id: '5',
      name: 'Charlie Chen',
      email: 'charlie@example.com',
      status: 'active' as const,
      role: t('storybook.demo.userRole'),
      createdAt: '2024-01-11',
    },
    {
      id: '6',
      name: 'Diana Davis',
      email: 'diana@example.com',
      status: 'inactive' as const,
      role: t('storybook.demo.userRole'),
      createdAt: '2024-01-10',
    },
    {
      id: '7',
      name: 'Eva Evans',
      email: 'eva@example.com',
      status: 'active' as const,
      role: t('storybook.demo.admin'),
      createdAt: '2024-01-09',
    },
    {
      id: '8',
      name: 'Frank Foster',
      email: 'frank@example.com',
      status: 'active' as const,
      role: t('storybook.demo.userRole'),
      createdAt: '2024-01-08',
    },
    {
      id: '9',
      name: 'Grace Garcia',
      email: 'grace@example.com',
      status: 'inactive' as const,
      role: t('storybook.demo.userRole'),
      createdAt: '2024-01-07',
    },
    {
      id: '10',
      name: 'Henry Harris',
      email: 'henry@example.com',
      status: 'active' as const,
      role: t('storybook.demo.admin'),
      createdAt: '2024-01-06',
    },
    {
      id: '11',
      name: 'Iris Irving',
      email: 'iris@example.com',
      status: 'active' as const,
      role: t('storybook.demo.userRole'),
      createdAt: '2024-01-05',
    },
    {
      id: '12',
      name: 'Jack Jackson',
      email: 'jack@example.com',
      status: 'inactive' as const,
      role: t('storybook.demo.userRole'),
      createdAt: '2024-01-04',
    },
    {
      id: '13',
      name: 'Kate King',
      email: 'kate@example.com',
      status: 'active' as const,
      role: t('storybook.demo.admin'),
      createdAt: '2024-01-03',
    },
    {
      id: '14',
      name: 'Leo Lewis',
      email: 'leo@example.com',
      status: 'active' as const,
      role: t('storybook.demo.userRole'),
      createdAt: '2024-01-02',
    },
    {
      id: '15',
      name: 'Mia Martin',
      email: 'mia@example.com',
      status: 'inactive' as const,
      role: t('storybook.demo.userRole'),
      createdAt: '2024-01-01',
    },
  ];
};

// Wrapper for pagination story
const WithPaginationDemo = () => {
  const t = useT();
  const columns = useColumns();
  const allData = usePaginatedSampleData();
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  // Calculate pagination
  const totalPages = Math.ceil(allData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = allData.slice(startIndex, endIndex);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Stack spacing="var(--ds-spacing-4)" style={{ width: '800px' }}>
      <DataTable
        data={paginatedData}
        columns={columns}
        getRowKey={(row) => row.id}
        ariaLabel={t('storybook.demo.userTable')}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'var(--ds-spacing-2) 0',
        }}
      >
        <span
          style={{
            fontSize: 'var(--ds-font-size-sm)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          Showing {startIndex + 1}-{Math.min(endIndex, allData.length)} of {allData.length}
        </span>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={handlePageChange}
          data-size="sm"
          aria-label="Table pagination"
        />
      </div>
    </Stack>
  );
};

// With pagination
export const WithPagination: Story = {
  render: function Render() {
    return <WithPaginationDemo />;
  },
};

// Wrapper for complete example story
const CompleteExampleDemo = () => {
  const t = useT();
  const columns = useColumns();
  const allData = usePaginatedSampleData();
  const [filterValues, setFilterValues] = React.useState<FilterValues>({});
  const [sortColumn, setSortColumn] = React.useState<string | undefined>('name');
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc' | 'none'>('asc');
  const [currentPage, setCurrentPage] = React.useState(1);
  const itemsPerPage = 5;

  // Filter configurations
  const filters: FilterConfig[] = React.useMemo(
    () => [
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
        ],
      },
      {
        id: 'role',
        type: 'select',
        label: t('storybook.demo.role'),
        placeholder: t('storybook.tableFilter.selectStatus'),
        options: [
          { value: 'admin', label: t('storybook.demo.admin') },
          { value: 'user', label: t('storybook.demo.userRole') },
        ],
      },
    ],
    [t]
  );

  // Filter data based on filter values
  const filteredData = React.useMemo(() => {
    let result = [...allData];

    // Search filter
    if (filterValues.search) {
      const searchLower = (filterValues.search as string).toLowerCase();
      result = result.filter(
        (row) =>
          row.name.toLowerCase().includes(searchLower) ||
          row.email.toLowerCase().includes(searchLower)
      );
    }

    // Status filter
    if (filterValues.status) {
      result = result.filter((row) => row.status === filterValues.status);
    }

    // Role filter
    if (filterValues.role) {
      const roleValue = filterValues.role as string;
      result = result.filter((row) => {
        const rowRoleKey = row.role === t('storybook.demo.admin') ? 'admin' : 'user';
        return rowRoleKey === roleValue;
      });
    }

    return result;
  }, [allData, filterValues, t]);

  // Sort data
  const sortedData = React.useMemo(() => {
    if (!sortColumn || sortDirection === 'none') {
      return filteredData;
    }

    const sorted = [...filteredData].sort((a, b) => {
      const aValue = a[sortColumn as keyof SampleRow];
      const bValue = b[sortColumn as keyof SampleRow];

      if (aValue === bValue) return 0;

      const comparison = aValue > bValue ? 1 : -1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return sorted;
  }, [filteredData, sortColumn, sortDirection]);

  // Calculate pagination
  const totalPages = Math.ceil(sortedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = sortedData.slice(startIndex, endIndex);

  // Reset to page 1 when filters change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [filterValues]);

  const handleSort = (column: string, direction: 'asc' | 'desc' | 'none') => {
    setSortColumn(column);
    setSortDirection(direction);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <Stack spacing="var(--ds-spacing-4)" style={{ width: '800px' }}>
      <TableFilter
        filters={filters}
        values={filterValues}
        onChange={setFilterValues}
        showClearAll
      />
      <DataTable
        data={paginatedData}
        columns={columns}
        getRowKey={(row) => row.id}
        sortColumn={sortColumn}
        sortDirection={sortDirection}
        onSort={handleSort}
        emptyMessage={t('storybook.demo.noUsersFound')}
        ariaLabel={t('storybook.demo.userTable')}
      />
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 'var(--ds-spacing-2) 0',
        }}
      >
        <span
          style={{
            fontSize: 'var(--ds-font-size-sm)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          Showing {sortedData.length > 0 ? startIndex + 1 : 0}-
          {Math.min(endIndex, sortedData.length)} of {sortedData.length}
        </span>
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onChange={handlePageChange}
          data-size="sm"
          aria-label="Table pagination"
        />
      </div>
    </Stack>
  );
};

// Complete example with filtering, sorting, and pagination
export const CompleteExample: Story = {
  render: function Render() {
    return <CompleteExampleDemo />;
  },
};
