import type { Meta, StoryObj } from '@storybook/react';
import { SimpleTabs, TabItem } from '../../composed/SimpleTabs';
import { Paragraph, Heading } from '@digdir/designsystemet-react';

const meta: Meta<typeof SimpleTabs> = {
  title: 'Composed/SimpleTabs',
  component: SimpleTabs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## SimpleTabs

A simplified tabs abstraction that wraps Designsystemet's Tabs component with a more convenient API using TabItem children.

### Features
- Simple API with TabItem components
- Advanced API with Designsystemet compound components
- Size variants
- Controlled and uncontrolled modes

### Usage
\`\`\`tsx
// Simple API
<Tabs>
  <TabItem label="First Tab">Content 1</TabItem>
  <TabItem label="Second Tab">Content 2</TabItem>
</Tabs>

// Advanced API
<Tabs defaultValue="tab1">
  <Tabs.List>
    <Tabs.Tab value="tab1">Tab 1</Tabs.Tab>
  </Tabs.List>
  <Tabs.Panel value="tab1">Content 1</Tabs.Panel>
</Tabs>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Tab size',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Simple API with TabItem
export const SimpleAPI: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <SimpleTabs defaultValue="tab1">
        <TabItem label="Overview" value="tab1">
          <Paragraph data-size="sm">
            This is the overview tab content. It demonstrates the simple API using TabItem
            components.
          </Paragraph>
        </TabItem>
        <TabItem label="Details" value="tab2">
          <Paragraph data-size="sm">
            This is the details tab content. You can add any content here, including forms, tables,
            or other components.
          </Paragraph>
        </TabItem>
        <TabItem label="Settings" value="tab3">
          <Paragraph data-size="sm">This is the settings tab content.</Paragraph>
        </TabItem>
      </SimpleTabs>
    </div>
  ),
};

// Without explicit values
export const AutoValues: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <SimpleTabs>
        <TabItem label="First Tab">
          <Paragraph data-size="sm">First tab content. Values are auto-generated.</Paragraph>
        </TabItem>
        <TabItem label="Second Tab">
          <Paragraph data-size="sm">Second tab content.</Paragraph>
        </TabItem>
        <TabItem label="Third Tab">
          <Paragraph data-size="sm">Third tab content.</Paragraph>
        </TabItem>
      </SimpleTabs>
    </div>
  ),
};

// Size variants
export const Small: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <SimpleTabs size="sm">
        <TabItem label="Tab 1">Content 1</TabItem>
        <TabItem label="Tab 2">Content 2</TabItem>
      </SimpleTabs>
    </div>
  ),
};

export const Medium: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <SimpleTabs size="md">
        <TabItem label="Tab 1">Content 1</TabItem>
        <TabItem label="Tab 2">Content 2</TabItem>
      </SimpleTabs>
    </div>
  ),
};

export const Large: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <SimpleTabs size="lg">
        <TabItem label="Tab 1">Content 1</TabItem>
        <TabItem label="Tab 2">Content 2</TabItem>
      </SimpleTabs>
    </div>
  ),
};

// Controlled mode
export const Controlled: Story = {
  render: () => {
    const [value, setValue] = React.useState('tab1');
    return (
      <div style={{ width: '600px' }}>
        <SimpleTabs value={value} onChange={setValue}>
          <TabItem label="Tab 1" value="tab1">
            <Paragraph data-size="sm">Controlled tab 1. Current value: {value}</Paragraph>
          </TabItem>
          <TabItem label="Tab 2" value="tab2">
            <Paragraph data-size="sm">Controlled tab 2. Current value: {value}</Paragraph>
          </TabItem>
        </SimpleTabs>
      </div>
    );
  },
};

// With rich content
export const RichContent: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <SimpleTabs>
        <TabItem label="Overview">
          <div>
            <Heading level={3} data-size="sm">
              Overview Section
            </Heading>
            <Paragraph data-size="sm">
              This tab contains rich content including headings, paragraphs, and other components.
            </Paragraph>
          </div>
        </TabItem>
        <TabItem label="Details">
          <div>
            <Heading level={3} data-size="sm">
              Details Section
            </Heading>
            <Paragraph data-size="sm">Detailed information goes here.</Paragraph>
          </div>
        </TabItem>
      </SimpleTabs>
    </div>
  ),
};
