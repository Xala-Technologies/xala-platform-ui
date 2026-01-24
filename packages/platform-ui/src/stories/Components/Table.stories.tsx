import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useT } from '@xala-technologies/i18n';
import { Table } from '../../index';

const meta: Meta = {
  title: 'Components/Table',
  parameters: {
    docs: {
      description: {
        component: `
Table component displays structured data in rows and columns using semantic HTML table elements for optimal accessibility and data comprehension.

## Variants

- **Default** - Standard data table
- **With caption** - Table with descriptive caption
- **Sortable** - Columns with sort functionality
- **Striped** - Alternating row colors
- **Bordered** - Borders on all cells
- **Responsive** - Responsive table wrapper

## When to Use

- Display structured data sets
- Data comparison across categories
- Financial or statistical data
- User lists and directories
- Schedule or timetable data
- Search results display

## Best Practices

### Do
- Use semantic table elements
- Provide descriptive captions
- Use proper header associations
- Include sorting when appropriate
- Make tables responsive
- Keep data organized logically

### Don't
- Don't use tables for layout
- Don't create overly complex tables
- Don't ignore mobile responsiveness
- Don't skip headers or captions
- Don't use empty cells without meaning
- Don't mix data types in columns

## Usage Patterns

### Basic Table
\`\`\`tsx
<Table>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Location</Table.HeaderCell>
      <Table.HeaderCell>Capacity</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Tennis Court A</Table.Cell>
      <Table.Cell>Building 1</Table.Cell>
      <Table.Cell>4</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Football Field</Table.Cell>
      <Table.Cell>Outdoor</Table.Cell>
      <Table.Cell>22</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
\`\`\`

### With Caption
\`\`\`tsx
<Table>
  <caption>Available Resources</caption>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Resource</Table.HeaderCell>
      <Table.HeaderCell>Price/hour</Table.HeaderCell>
      <Table.HeaderCell>Available</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Tennis Court</Table.Cell>
      <Table.Cell>200 kr</Table.Cell>
      <Table.Cell>Yes</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
\`\`\`

### Sortable Table
\`\`\`tsx
<Table>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>
        <button onClick={() => sortByName()}>
          Name {sortDirection === 'asc' ? '↑' : '↓'}
        </button>
      </Table.HeaderCell>
      <Table.HeaderCell>
        <button onClick={() => sortByDate()}>
          Date {sortDirection === 'asc' ? '↑' : '↓'}
        </button>
      </Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    {/* Sorted rows */}
  </Table.Body>
</Table>
\`\`\`

### Striped Table
\`\`\`tsx
<Table data-variant="striped">
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Product</Table.HeaderCell>
      <Table.HeaderCell>Price</Table.HeaderCell>
      <Table.HeaderCell>Stock</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>Widget A</Table.Cell>
      <Table.Cell>$10.99</Table.Cell>
      <Table.Cell>25</Table.Cell>
    </Table.Row>
    <Table.Row>
      <Table.Cell>Widget B</Table.Cell>
      <Table.Cell>$15.99</Table.Cell>
      <Table.Cell>12</Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
\`\`\`

### Responsive Table
\`\`\`tsx
<div style={{ overflowX: 'auto' }}>
  <Table>
    <Table.Head>
      <Table.Row>
        <Table.HeaderCell>ID</Table.HeaderCell>
        <Table.HeaderCell>Name</Table.HeaderCell>
        <Table.HeaderCell>Email</Table.HeaderCell>
        <Table.HeaderCell>Phone</Table.HeaderCell>
        <Table.HeaderCell>Address</Table.HeaderCell>
        <Table.HeaderCell>City</Table.HeaderCell>
      </Table.Row>
    </Table.Head>
    <Table.Body>
      {/* Data rows */}
    </Table.Body>
  </Table>
</div>
\`\`\`

### With Row Actions
\`\`\`tsx
<Table>
  <Table.Head>
    <Table.Row>
      <Table.HeaderCell>Name</Table.HeaderCell>
      <Table.HeaderCell>Status</Table.HeaderCell>
      <Table.HeaderCell>Actions</Table.HeaderCell>
    </Table.Row>
  </Table.Head>
  <Table.Body>
    <Table.Row>
      <Table.Cell>John Doe</Table.Cell>
      <Table.Cell>Active</Table.Cell>
      <Table.Cell>
        <Button data-size="sm">Edit</Button>
        <Button data-size="sm" variant="danger">Delete</Button>
      </Table.Cell>
    </Table.Row>
  </Table.Body>
</Table>
\`\`\`

## Anti-Patterns

### Anti-pattern: Layout Tables
Using tables for page layout instead of data.

### Anti-pattern: Missing Headers
Tables without proper headers harm accessibility.

### Anti-pattern: Complex Structures
Overly complex nested tables confuse users.

### Anti-pattern: No Mobile Support
Tables that break on small screens.

## Accessibility

### Screen Readers
- Table structure announced
- Headers associated with cells
- Caption provides context
- Row and column headers identified
- Navigation instructions provided

### Keyboard Navigation
- Tab navigates through table cells
- Arrow keys navigate within table
- Sort buttons accessible via keyboard
- Interactive elements reachable
- Logical navigation order

### WCAG 2.1 AA Compliance
- **Data tables**: Proper semantic structure
- **Headers**: Row and column headers provided
- **Captions**: Descriptive captions included
- **Associations**: Headers properly associated
- **Responsive**: Tables work on all devices

### ARIA Implementation
\`\`\`tsx
<table role="table" aria-label="Resource availability">
  <caption>Available Resources and Pricing</caption>
  <thead>
    <tr role="row">
      <th role="columnheader" aria-sort="none">Resource</th>
      <th role="columnheader" aria-sort="ascending">Price</th>
      <th role="columnheader" aria-sort="none">Available</th>
    </tr>
  </thead>
  <tbody>
    <tr role="row">
      <td role="gridcell">Tennis Court</td>
      <td role="gridcell">$200/hour</td>
      <td role="gridcell">Yes</td>
    </tr>
  </tbody>
</table>
\`\`\`

### Best Practice for Captions
Use descriptive captions:
\`\`\`tsx
// Good
<caption>Monthly sales report for Q4 2023</caption>
<caption>Employee directory with contact information</caption>
<caption>Product inventory levels by warehouse</caption>

// Bad
<caption>Data</caption>
<caption>Table</caption>
<caption>Information</caption>
\`\`\`

### Sortable Table Example
\`\`\`tsx
const SortableTable = () => {
  const [data, setData] = useState(initialData);
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  }>({
    key: 'name',
    direction: 'ascending'
  });

  const handleSort = (key: string) => {
    let direction = 'ascending';
    if (sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    setSortConfig({ key, direction });

    const sortedData = [...data].sort((a, b) => {
      if (a[key] < b[key]) return direction === 'ascending' ? -1 : 1;
      if (a[key] > b[key]) return direction === 'ascending' ? 1 : -1;
      return 0;
    });

    setData(sortedData);
  };

  return (
    <Table>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>
            <button
              onClick={() => handleSort('name')}
              aria-label={\`Sort by name, currently \${sortConfig.direction}\`}
            >
              Name {sortConfig.key === 'name' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </button>
          </Table.HeaderCell>
          <Table.HeaderCell>
            <button
              onClick={() => handleSort('price')}
              aria-label={\`Sort by price, currently \${sortConfig.direction}\`}
            >
              Price {sortConfig.key === 'price' && (sortConfig.direction === 'ascending' ? '↑' : '↓')}
            </button>
          </Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        {data.map(item => (
          <Table.Row key={item.id}>
            <Table.Cell>{item.name}</Table.Cell>
            <Table.Cell>{item.price}</Table.Cell>
          </Table.Row>
        ))}
      </Table.Body>
    </Table>
  );
};
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>{t('storybook.demo.name')}</Table.HeaderCell>
            <Table.HeaderCell>{t('storybook.demo.location')}</Table.HeaderCell>
            <Table.HeaderCell>{t('storybook.demo.capacity')}</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{t('storybook.demo.tennisCourt')} A</Table.Cell>
            <Table.Cell>{t('storybook.demo.building')} 1</Table.Cell>
            <Table.Cell>4</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{t('storybook.demo.footballField')}</Table.Cell>
            <Table.Cell>{t('storybook.demo.outdoor')}</Table.Cell>
            <Table.Cell>22</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{t('storybook.demo.swimmingPool')}</Table.Cell>
            <Table.Cell>{t('storybook.demo.building')} 2</Table.Cell>
            <Table.Cell>30</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  },
};

export const WithCaption: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Table>
        <caption>{t('storybook.demo.availableResources')}</caption>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>{t('storybook.demo.resource')}</Table.HeaderCell>
            <Table.HeaderCell>{t('storybook.demo.pricePerHour')}</Table.HeaderCell>
            <Table.HeaderCell>{t('storybook.demo.available')}</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>{t('storybook.demo.tennisCourt')}</Table.Cell>
            <Table.Cell>200 kr</Table.Cell>
            <Table.Cell>{t('storybook.demo.yes')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>{t('storybook.demo.basketballCourt')}</Table.Cell>
            <Table.Cell>300 kr</Table.Cell>
            <Table.Cell>{t('storybook.demo.no')}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  },
};

export const Zebra: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Table zebra>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>{t('storybook.demo.date')}</Table.HeaderCell>
            <Table.HeaderCell>{t('storybook.demo.booking')}</Table.HeaderCell>
            <Table.HeaderCell>{t('storybook.demo.status')}</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>2024-01-15</Table.Cell>
            <Table.Cell>{t('storybook.demo.tennisCourt')} A</Table.Cell>
            <Table.Cell>{t('storybook.demo.confirmed')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>2024-01-16</Table.Cell>
            <Table.Cell>{t('storybook.demo.swimmingPool')}</Table.Cell>
            <Table.Cell>{t('platform.status.pending')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>2024-01-17</Table.Cell>
            <Table.Cell>{t('storybook.demo.footballField')}</Table.Cell>
            <Table.Cell>{t('storybook.demo.confirmed')}</Table.Cell>
          </Table.Row>
          <Table.Row>
            <Table.Cell>2024-01-18</Table.Cell>
            <Table.Cell>{t('storybook.demo.gym')}</Table.Cell>
            <Table.Cell>{t('platform.status.cancelled')}</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    );
  },
};

export const Sizes: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-8)' }}>
        <Table data-size="sm">
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>{t('storybook.demo.small')}</Table.HeaderCell>
              <Table.HeaderCell>{t('storybook.demo.table')}</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{t('storybook.demo.data')} 1</Table.Cell>
              <Table.Cell>{t('storybook.demo.data')} 2</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Table data-size="md">
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>{t('storybook.demo.medium')}</Table.HeaderCell>
              <Table.HeaderCell>{t('storybook.demo.table')}</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{t('storybook.demo.data')} 1</Table.Cell>
              <Table.Cell>{t('storybook.demo.data')} 2</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
        <Table data-size="lg">
          <Table.Head>
            <Table.Row>
              <Table.HeaderCell>{t('storybook.demo.large')}</Table.HeaderCell>
              <Table.HeaderCell>{t('storybook.demo.table')}</Table.HeaderCell>
            </Table.Row>
          </Table.Head>
          <Table.Body>
            <Table.Row>
              <Table.Cell>{t('storybook.demo.data')} 1</Table.Cell>
              <Table.Cell>{t('storybook.demo.data')} 2</Table.Cell>
            </Table.Row>
          </Table.Body>
        </Table>
      </div>
    );
  },
};
