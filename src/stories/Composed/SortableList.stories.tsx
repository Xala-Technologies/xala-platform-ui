import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
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

// Wrapper components for stories that need translations
const DefaultDemo = () => {
  const t = useT();
  const [items, setItems] = useState([
    { id: '1', content: `${t('storybook.demo.item')} 1` },
    { id: '2', content: `${t('storybook.demo.item')} 2` },
    { id: '3', content: `${t('storybook.demo.item')} 3` },
    { id: '4', content: `${t('storybook.demo.item')} 4` },
  ]);

  return (
    <div style={{ width: '400px' }}>
      <SortableList items={items} onReorder={setItems} handle={true} direction="vertical" />
    </div>
  );
};

const WithoutHandleDemo = () => {
  const t = useT();
  const [items, setItems] = useState([
    { id: '1', content: `${t('storybook.demo.item')} 1` },
    { id: '2', content: `${t('storybook.demo.item')} 2` },
    { id: '3', content: `${t('storybook.demo.item')} 3` },
  ]);

  return (
    <div style={{ width: '400px' }}>
      <SortableList items={items} onReorder={setItems} handle={false} direction="vertical" />
    </div>
  );
};

const CustomRenderingDemo = () => {
  const t = useT();
  const [items, setItems] = useState([
    { id: '1', content: t('storybook.demo.firstItem') },
    { id: '2', content: t('storybook.demo.secondItem') },
    { id: '3', content: t('storybook.demo.thirdItem') },
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
              {item.content} ({t('storybook.demo.position')}: {index + 1})
            </Paragraph>
          </Card>
        )}
      />
    </div>
  );
};

const HorizontalDemo = () => {
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
};

const WithDisabledItemsDemo = () => {
  const t = useT();
  const [items, setItems] = useState([
    { id: '1', content: `${t('storybook.demo.item')} 1` },
    {
      id: '2',
      content: `${t('storybook.demo.item')} 2 (${t('storybook.demo.disabled')})`,
      disabled: true,
    },
    { id: '3', content: `${t('storybook.demo.item')} 3` },
    {
      id: '4',
      content: `${t('storybook.demo.item')} 4 (${t('storybook.demo.disabled')})`,
      disabled: true,
    },
  ]);

  return (
    <div style={{ width: '400px' }}>
      <SortableList items={items} onReorder={setItems} handle={true} direction="vertical" />
    </div>
  );
};

const DisabledDemo = () => {
  const t = useT();
  const [items] = useState([
    { id: '1', content: `${t('storybook.demo.item')} 1` },
    { id: '2', content: `${t('storybook.demo.item')} 2` },
    { id: '3', content: `${t('storybook.demo.item')} 3` },
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
};

const ManyItemsDemo = () => {
  const t = useT();
  const [items, setItems] = useState(
    Array.from({ length: 10 }, (_, i) => ({
      id: `${i + 1}`,
      content: `${t('storybook.demo.item')} ${i + 1}`,
    }))
  );

  return (
    <div style={{ width: '400px', maxHeight: '400px', overflow: 'auto' }}>
      <SortableList items={items} onReorder={setItems} handle={true} direction="vertical" />
    </div>
  );
};

// Basic sortable list
export const Default: Story = {
  render: function Render() {
    return <DefaultDemo />;
  },
};

// Without handle
export const WithoutHandle: Story = {
  render: function Render() {
    return <WithoutHandleDemo />;
  },
};

// With custom rendering
export const CustomRendering: Story = {
  render: function Render() {
    return <CustomRenderingDemo />;
  },
};

// Horizontal direction
export const Horizontal: Story = {
  render: function Render() {
    return <HorizontalDemo />;
  },
};

// With disabled items
export const WithDisabledItems: Story = {
  render: function Render() {
    return <WithDisabledItemsDemo />;
  },
};

// Disabled list
export const Disabled: Story = {
  render: function Render() {
    return <DisabledDemo />;
  },
};

// Many items
export const ManyItems: Story = {
  render: function Render() {
    return <ManyItemsDemo />;
  },
};
