import React from 'react';
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

// Wrapper components for stories that need translations
const SimpleAPIDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <SimpleTabs defaultValue="tab1">
        <TabItem label="Eksempel Tekst" value="tab1">
          <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
        </TabItem>
        <TabItem label="Eksempel Tekst" value="tab2">
          <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
        </TabItem>
        <TabItem label="Eksempel Tekst" value="tab3">
          <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
        </TabItem>
      </SimpleTabs>
    </div>
  );
};

const AutoValuesDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <SimpleTabs>
        <TabItem label="Eksempel Tekst">
          <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
        </TabItem>
        <TabItem label="Eksempel Tekst">
          <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
        </TabItem>
        <TabItem label="Eksempel Tekst">
          <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
        </TabItem>
      </SimpleTabs>
    </div>
  );
};

const SmallDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <SimpleTabs size="sm">
        <TabItem label="Eksempel Tekst">"Eksempel Tekst"</TabItem>
        <TabItem label="Eksempel Tekst">"Eksempel Tekst"</TabItem>
      </SimpleTabs>
    </div>
  );
};

const MediumDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <SimpleTabs size="md">
        <TabItem label="Eksempel Tekst">"Eksempel Tekst"</TabItem>
        <TabItem label="Eksempel Tekst">"Eksempel Tekst"</TabItem>
      </SimpleTabs>
    </div>
  );
};

const LargeDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <SimpleTabs size="lg">
        <TabItem label="Eksempel Tekst">"Eksempel Tekst"</TabItem>
        <TabItem label="Eksempel Tekst">"Eksempel Tekst"</TabItem>
      </SimpleTabs>
    </div>
  );
};

const ControlledDemo = () => {
  const [value, setValue] = React.useState('tab1');
  return (
    <div style={{ width: '600px' }}>
      <SimpleTabs value={value} onChange={setValue}>
        <TabItem label="Eksempel Tekst" value="tab1">
          <Paragraph data-size="sm">
            "Eksempel Tekst" {value}
          </Paragraph>
        </TabItem>
        <TabItem label="Eksempel Tekst" value="tab2">
          <Paragraph data-size="sm">
            "Eksempel Tekst" {value}
          </Paragraph>
        </TabItem>
      </SimpleTabs>
    </div>
  );
};

const RichContentDemo = () => {
  return (
    <div style={{ width: '600px' }}>
      <SimpleTabs>
        <TabItem label="Eksempel Tekst">
          <div>
            <Heading level={3} data-size="sm">
              "Eksempel Tekst"
            </Heading>
            <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
          </div>
        </TabItem>
        <TabItem label="Eksempel Tekst">
          <div>
            <Heading level={3} data-size="sm">
              "Eksempel Tekst"
            </Heading>
            <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
          </div>
        </TabItem>
      </SimpleTabs>
    </div>
  );
};

// Simple API with TabItem
export const SimpleAPI: Story = {
  render: function Render() {
    return <SimpleAPIDemo />;
  },
};

// Without explicit values
export const AutoValues: Story = {
  render: function Render() {
    return <AutoValuesDemo />;
  },
};

// Size variants
export const Small: Story = {
  render: function Render() {
    return <SmallDemo />;
  },
};

export const Medium: Story = {
  render: function Render() {
    return <MediumDemo />;
  },
};

export const Large: Story = {
  render: function Render() {
    return <LargeDemo />;
  },
};

// Controlled mode
export const Controlled: Story = {
  render: function Render() {
    return <ControlledDemo />;
  },
};

// With rich content
export const RichContent: Story = {
  render: function Render() {
    return <RichContentDemo />;
  },
};
