import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { SortableList } from '../../composed/SortableList';
import { Card, Paragraph } from '@digdir/designsystemet-react';

const meta: Meta<typeof SortableList> = {
  title: 'Composed/SortableList',
  component: SortableList,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## SortableList

Drag-and-drop reorderable list. Supports vertical and horizontal directions with custom item rendering.

### Features
- Drag and drop reordering
- Handle icon option
- Vertical and horizontal directions
- Custom item rendering
- Disabled items support

### Usage
\`\`\`tsx
<SortableList
  items={items}
  onReorder={handleReorder}
  handle={true}
  direction="vertical"
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onReorder: fn(),
  },
  argTypes: {
    handle: {
      control: 'boolean',
      description: 'Show drag handle',
    },
    direction: {
      control: 'select',
      options: ['vertical', 'horizontal'],
      description: 'List direction',
    },
    disabled: {
      control: 'boolean',
      description: 'Disable sorting',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic sortable list
export const Default: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: '1', content: 'Item 1' },
      { id: '2', content: 'Item 2' },
      { id: '3', content: 'Item 3' },
      { id: '4', content: 'Item 4' },
    ]);

    return (
      <div style={{ width: '400px' }}>
        <SortableList items={items} onReorder={setItems} handle={true} direction="vertical" />
      </div>
    );
  },
};

// Without handle
export const WithoutHandle: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: '1', content: 'Item 1' },
      { id: '2', content: 'Item 2' },
      { id: '3', content: 'Item 3' },
    ]);

    return (
      <div style={{ width: '400px' }}>
        <SortableList items={items} onReorder={setItems} handle={false} direction="vertical" />
      </div>
    );
  },
};

// With custom rendering
export const CustomRendering: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: '1', content: 'First Item' },
      { id: '2', content: 'Second Item' },
      { id: '3', content: 'Third Item' },
    ]);

    return (
      <div style={{ width: '400px' }}>
        <SortableList
          items={items}
          onReorder={setItems}
          handle={true}
          renderItem={(item, index, isDragging) => (
            <Card
              data-color="neutral"
              data-size="medium"
              style={{
                opacity: isDragging ? 0.5 : 1,
                transform: isDragging ? 'scale(1.02)' : 'scale(1)',
                transition: 'all 0.2s ease',
              }}
            >
              <Paragraph data-size="sm">
                {item.content} (Position: {index + 1})
              </Paragraph>
            </Card>
          )}
        />
      </div>
    );
  },
};

// Horizontal direction
export const Horizontal: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: '1', content: 'A' },
      { id: '2', content: 'B' },
      { id: '3', content: 'C' },
      { id: '4', content: 'D' },
    ]);

    return (
      <div style={{ width: '500px' }}>
        <SortableList items={items} onReorder={setItems} handle={true} direction="horizontal" />
      </div>
    );
  },
};

// With disabled items
export const WithDisabledItems: Story = {
  render: () => {
    const [items, setItems] = useState([
      { id: '1', content: 'Item 1' },
      { id: '2', content: 'Item 2 (Disabled)', disabled: true },
      { id: '3', content: 'Item 3' },
      { id: '4', content: 'Item 4 (Disabled)', disabled: true },
    ]);

    return (
      <div style={{ width: '400px' }}>
        <SortableList items={items} onReorder={setItems} handle={true} direction="vertical" />
      </div>
    );
  },
};

// Disabled list
export const Disabled: Story = {
  render: () => {
    const [items] = useState([
      { id: '1', content: 'Item 1' },
      { id: '2', content: 'Item 2' },
      { id: '3', content: 'Item 3' },
    ]);

    return (
      <div style={{ width: '400px' }}>
        <SortableList
          items={items}
          onReorder={fn()}
          handle={true}
          disabled={true}
          direction="vertical"
        />
      </div>
    );
  },
};

// Many items
export const ManyItems: Story = {
  render: () => {
    const [items, setItems] = useState(
      Array.from({ length: 10 }, (_, i) => ({
        id: `${i + 1}`,
        content: `Item ${i + 1}`,
      }))
    );

    return (
      <div style={{ width: '400px', maxHeight: '400px', overflow: 'auto' }}>
        <SortableList items={items} onReorder={setItems} handle={true} direction="vertical" />
      </div>
    );
  },
};
