import{j as e}from"./jsx-runtime-BYYWji4R.js";import{T as l}from"./tooltip-oTYV5y50.js";import"./alert-BzTWXKSs.js";import"./button-B6PgazAq.js";import"./index-D1XdeRjR.js";import"./checkbox-CeN5g5X_.js";import"./index-Df4a1FH3.js";import"./radio-ER07BMpk.js";import"./heading-mzc2R_Ff.js";import"./input-CMu9MsIQ.js";import"./label-9E-twYNb.js";import"./link-DlTbUgI1.js";import"./paragraph-DDCpJsVw.js";import"./index-iTq-tUBJ.js";import"./tag-DS5F5fAT.js";import"./textarea-DMvw4dlU.js";import"./textfield-BCKd4uLT.js";import"./index-ClcD9ViR.js";import"./roving-focus-item-DcdCcS0a.js";import"./index-CHmPfjQK.js";import"./use-merge-refs-cKtnuP4l.js";import"./index-BUAr5TKG.js";import"./_commonjsHelpers-Cpj98o6Y.js";const I={title:"Components/Table",parameters:{docs:{description:{component:`
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
        `}}},tags:["autodocs"]},a={render:()=>e.jsxs(l,{children:[e.jsx(l.Head,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Name"}),e.jsx(l.HeaderCell,{children:"Location"}),e.jsx(l.HeaderCell,{children:"Capacity"})]})}),e.jsxs(l.Body,{children:[e.jsxs(l.Row,{children:[e.jsx(l.Cell,{children:"Tennis Court A"}),e.jsx(l.Cell,{children:"Building 1"}),e.jsx(l.Cell,{children:"4"})]}),e.jsxs(l.Row,{children:[e.jsx(l.Cell,{children:"Football Field"}),e.jsx(l.Cell,{children:"Outdoor"}),e.jsx(l.Cell,{children:"22"})]}),e.jsxs(l.Row,{children:[e.jsx(l.Cell,{children:"Swimming Pool"}),e.jsx(l.Cell,{children:"Building 2"}),e.jsx(l.Cell,{children:"30"})]})]})]})},r={render:()=>e.jsxs(l,{children:[e.jsx("caption",{children:"Available Resources"}),e.jsx(l.Head,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Resource"}),e.jsx(l.HeaderCell,{children:"Price/hour"}),e.jsx(l.HeaderCell,{children:"Available"})]})}),e.jsxs(l.Body,{children:[e.jsxs(l.Row,{children:[e.jsx(l.Cell,{children:"Tennis Court"}),e.jsx(l.Cell,{children:"200 kr"}),e.jsx(l.Cell,{children:"Yes"})]}),e.jsxs(l.Row,{children:[e.jsx(l.Cell,{children:"Basketball Court"}),e.jsx(l.Cell,{children:"300 kr"}),e.jsx(l.Cell,{children:"No"})]})]})]})},o={render:()=>e.jsxs(l,{zebra:!0,children:[e.jsx(l.Head,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Date"}),e.jsx(l.HeaderCell,{children:"ResourceRequest"}),e.jsx(l.HeaderCell,{children:"Status"})]})}),e.jsxs(l.Body,{children:[e.jsxs(l.Row,{children:[e.jsx(l.Cell,{children:"2024-01-15"}),e.jsx(l.Cell,{children:"Tennis Court A"}),e.jsx(l.Cell,{children:"Confirmed"})]}),e.jsxs(l.Row,{children:[e.jsx(l.Cell,{children:"2024-01-16"}),e.jsx(l.Cell,{children:"Swimming Pool"}),e.jsx(l.Cell,{children:"Pending"})]}),e.jsxs(l.Row,{children:[e.jsx(l.Cell,{children:"2024-01-17"}),e.jsx(l.Cell,{children:"Football Field"}),e.jsx(l.Cell,{children:"Confirmed"})]}),e.jsxs(l.Row,{children:[e.jsx(l.Cell,{children:"2024-01-18"}),e.jsx(l.Cell,{children:"Gym"}),e.jsx(l.Cell,{children:"Cancelled"})]})]})]})},n={render:()=>e.jsxs("div",{style:{display:"flex",flexDirection:"column",gap:"var(--ds-spacing-8)"},children:[e.jsxs(l,{"data-size":"sm",children:[e.jsx(l.Head,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Small"}),e.jsx(l.HeaderCell,{children:"Table"})]})}),e.jsx(l.Body,{children:e.jsxs(l.Row,{children:[e.jsx(l.Cell,{children:"Data 1"}),e.jsx(l.Cell,{children:"Data 2"})]})})]}),e.jsxs(l,{"data-size":"md",children:[e.jsx(l.Head,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Medium"}),e.jsx(l.HeaderCell,{children:"Table"})]})}),e.jsx(l.Body,{children:e.jsxs(l.Row,{children:[e.jsx(l.Cell,{children:"Data 1"}),e.jsx(l.Cell,{children:"Data 2"})]})})]}),e.jsxs(l,{"data-size":"lg",children:[e.jsx(l.Head,{children:e.jsxs(l.Row,{children:[e.jsx(l.HeaderCell,{children:"Large"}),e.jsx(l.HeaderCell,{children:"Table"})]})}),e.jsx(l.Body,{children:e.jsxs(l.Row,{children:[e.jsx(l.Cell,{children:"Data 1"}),e.jsx(l.Cell,{children:"Data 2"})]})})]})]})};var t,i,d;a.parameters={...a.parameters,docs:{...(t=a.parameters)==null?void 0:t.docs,source:{originalSource:`{
  render: () => <Table>
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
        <Table.Row>
          <Table.Cell>Swimming Pool</Table.Cell>
          <Table.Cell>Building 2</Table.Cell>
          <Table.Cell>30</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
}`,...(d=(i=a.parameters)==null?void 0:i.docs)==null?void 0:d.source}}};var s,b,T;r.parameters={...r.parameters,docs:{...(s=r.parameters)==null?void 0:s.docs,source:{originalSource:`{
  render: () => <Table>
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
        <Table.Row>
          <Table.Cell>Basketball Court</Table.Cell>
          <Table.Cell>300 kr</Table.Cell>
          <Table.Cell>No</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
}`,...(T=(b=r.parameters)==null?void 0:b.docs)==null?void 0:T.source}}};var c,C,p;o.parameters={...o.parameters,docs:{...(c=o.parameters)==null?void 0:c.docs,source:{originalSource:`{
  render: () => <Table zebra>
      <Table.Head>
        <Table.Row>
          <Table.HeaderCell>Date</Table.HeaderCell>
          <Table.HeaderCell>ResourceRequest</Table.HeaderCell>
          <Table.HeaderCell>Status</Table.HeaderCell>
        </Table.Row>
      </Table.Head>
      <Table.Body>
        <Table.Row>
          <Table.Cell>2024-01-15</Table.Cell>
          <Table.Cell>Tennis Court A</Table.Cell>
          <Table.Cell>Confirmed</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>2024-01-16</Table.Cell>
          <Table.Cell>Swimming Pool</Table.Cell>
          <Table.Cell>Pending</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>2024-01-17</Table.Cell>
          <Table.Cell>Football Field</Table.Cell>
          <Table.Cell>Confirmed</Table.Cell>
        </Table.Row>
        <Table.Row>
          <Table.Cell>2024-01-18</Table.Cell>
          <Table.Cell>Gym</Table.Cell>
          <Table.Cell>Cancelled</Table.Cell>
        </Table.Row>
      </Table.Body>
    </Table>
}`,...(p=(C=o.parameters)==null?void 0:C.docs)==null?void 0:p.source}}};var h,m,H;n.parameters={...n.parameters,docs:{...(h=n.parameters)==null?void 0:h.docs,source:{originalSource:`{
  render: () => <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-8)'
  }}>
      <Table data-size="sm">
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Small</Table.HeaderCell>
            <Table.HeaderCell>Table</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Data 1</Table.Cell>
            <Table.Cell>Data 2</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Table data-size="md">
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Medium</Table.HeaderCell>
            <Table.HeaderCell>Table</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Data 1</Table.Cell>
            <Table.Cell>Data 2</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
      <Table data-size="lg">
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>Large</Table.HeaderCell>
            <Table.HeaderCell>Table</Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          <Table.Row>
            <Table.Cell>Data 1</Table.Cell>
            <Table.Cell>Data 2</Table.Cell>
          </Table.Row>
        </Table.Body>
      </Table>
    </div>
}`,...(H=(m=n.parameters)==null?void 0:m.docs)==null?void 0:H.source}}};const O=["Default","WithCaption","Zebra","Sizes"];export{a as Default,n as Sizes,r as WithCaption,o as Zebra,O as __namedExportsOrder,I as default};
//# sourceMappingURL=Table.stories-BYOVyEm0.js.map
