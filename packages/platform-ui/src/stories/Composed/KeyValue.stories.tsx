import type { Meta, StoryObj } from '@storybook/react';
import { KeyValue, KeyValueList, DefinitionList } from '../../composed/KeyValue';
import { Badge } from '../../composed/Badge';

const meta: Meta<typeof KeyValue> = {
  title: 'Composed/KeyValue',
  component: KeyValue,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## KeyValue Display Components

Structured key-value data display. Supports horizontal and vertical layouts, copyable values, and multiple display variants.

### Features
- Single KeyValue pair
- KeyValueList for multiple pairs
- DefinitionList for semantic HTML
- Copyable values
- Monospace font option
- Multiple columns
- Variants (default, striped, bordered)

### Usage
\`\`\`tsx
<KeyValue label="Name" value="John Doe" />
<KeyValueList items={[{ key: 'Email', value: 'john@example.com' }]} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    direction: {
      control: 'select',
      options: ['horizontal', 'vertical'],
      description: 'Layout direction',
    },
    copyable: {
      control: 'boolean',
      description: 'Enable copy to clipboard',
    },
    mono: {
      control: 'boolean',
      description: 'Use monospace font',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic key-value
export const Default: Story = {
  args: {
    label: 'Name',
    value: 'John Doe',
    direction: 'vertical',
    copyable: false,
    mono: false,
  },
};

// Horizontal layout
export const Horizontal: Story = {
  args: {
    label: 'Email',
    value: 'john.doe@example.com',
    direction: 'horizontal',
    copyable: false,
    mono: false,
  },
};

// With copyable value
export const Copyable: Story = {
  args: {
    label: 'API Key',
    value: 'sk_live_1234567890abcdef',
    direction: 'vertical',
    copyable: true,
    mono: true,
  },
};

// Monospace font
export const Monospace: Story = {
  args: {
    label: 'Transaction ID',
    value: 'txn_1234567890abcdef',
    direction: 'vertical',
    copyable: false,
    mono: true,
  },
};

// With React node value
export const WithReactNode: Story = {
  args: {
    label: 'Status',
    value: <Badge variant="success">Active</Badge>,
    direction: 'vertical',
    copyable: false,
    mono: false,
  },
};

// KeyValueList - single column
export const ListSingleColumn: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <KeyValueList
        items={[
          { key: 'Name', value: 'John Doe' },
          { key: 'Email', value: 'john.doe@example.com' },
          { key: 'Phone', value: '+47 12 34 56 78' },
          { key: 'Status', value: <Badge variant="success">Active</Badge> },
        ]}
        columns={1}
        direction="vertical"
        variant="default"
      />
    </div>
  ),
};

// KeyValueList - two columns
export const ListTwoColumns: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <KeyValueList
        items={[
          { key: 'Name', value: 'John Doe' },
          { key: 'Email', value: 'john.doe@example.com' },
          { key: 'Phone', value: '+47 12 34 56 78' },
          { key: 'Status', value: <Badge variant="success">Active</Badge> },
        ]}
        columns={2}
        direction="vertical"
        variant="default"
      />
    </div>
  ),
};

// KeyValueList - striped variant
export const ListStriped: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <KeyValueList
        items={[
          { key: 'Name', value: 'John Doe' },
          { key: 'Email', value: 'john.doe@example.com' },
          { key: 'Phone', value: '+47 12 34 56 78' },
          { key: 'Status', value: <Badge variant="success">Active</Badge> },
        ]}
        columns={1}
        direction="vertical"
        variant="striped"
      />
    </div>
  ),
};

// KeyValueList - bordered variant
export const ListBordered: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <KeyValueList
        items={[
          { key: 'Name', value: 'John Doe' },
          { key: 'Email', value: 'john.doe@example.com' },
          { key: 'Phone', value: '+47 12 34 56 78' },
          { key: 'Status', value: <Badge variant="success">Active</Badge> },
        ]}
        columns={1}
        direction="vertical"
        variant="bordered"
      />
    </div>
  ),
};

// KeyValueList with copyable items
export const ListWithCopyable: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <KeyValueList
        items={[
          { key: 'API Key', value: 'sk_live_1234567890abcdef', copyable: true, mono: true },
          { key: 'Secret', value: 'secret_abcdef1234567890', copyable: true, mono: true },
          { key: 'Webhook URL', value: 'https://api.example.com/webhook', copyable: true },
        ]}
        columns={1}
        direction="vertical"
        variant="default"
      />
    </div>
  ),
};

// KeyValueList with links
export const ListWithLinks: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <KeyValueList
        items={[
          { key: 'Website', value: 'https://example.com', href: 'https://example.com' },
          { key: 'Documentation', value: 'View docs', href: 'https://docs.example.com' },
          { key: 'Support', value: 'Contact support', href: 'mailto:support@example.com' },
        ]}
        columns={1}
        direction="vertical"
        variant="default"
      />
    </div>
  ),
};

// DefinitionList
export const DefinitionListExample: Story = {
  render: () => (
    <div style={{ width: '500px' }}>
      <DefinitionList
        items={[
          { term: 'Name', definition: 'John Doe' },
          { term: 'Email', definition: 'john.doe@example.com' },
          { term: 'Role', definition: 'Administrator' },
          { term: 'Status', definition: <Badge variant="success">Active</Badge> },
        ]}
      />
    </div>
  ),
};
