import React from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
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
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <SimpleTabs defaultValue="tab1">
        <TabItem label={t('storybook.demo.overview')} value="tab1">
          <Paragraph data-size="sm">{t('storybook.demo.overviewTabContent')}</Paragraph>
        </TabItem>
        <TabItem label={t('storybook.demo.details')} value="tab2">
          <Paragraph data-size="sm">{t('storybook.demo.detailsTabContent')}</Paragraph>
        </TabItem>
        <TabItem label={t('platform.nav.settings')} value="tab3">
          <Paragraph data-size="sm">{t('storybook.demo.settingsTabContent')}</Paragraph>
        </TabItem>
      </SimpleTabs>
    </div>
  );
};

const AutoValuesDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <SimpleTabs>
        <TabItem label={t('storybook.demo.firstTab')}>
          <Paragraph data-size="sm">{t('storybook.demo.firstTabContentAuto')}</Paragraph>
        </TabItem>
        <TabItem label={t('storybook.demo.secondTab')}>
          <Paragraph data-size="sm">{t('storybook.demo.secondTabContent')}</Paragraph>
        </TabItem>
        <TabItem label={t('storybook.demo.thirdTab')}>
          <Paragraph data-size="sm">{t('storybook.demo.thirdTabContent')}</Paragraph>
        </TabItem>
      </SimpleTabs>
    </div>
  );
};

const SmallDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <SimpleTabs size="sm">
        <TabItem label={t('storybook.demo.tab1')}>{t('storybook.demo.content1')}</TabItem>
        <TabItem label={t('storybook.demo.tab2')}>{t('storybook.demo.content2')}</TabItem>
      </SimpleTabs>
    </div>
  );
};

const MediumDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <SimpleTabs size="md">
        <TabItem label={t('storybook.demo.tab1')}>{t('storybook.demo.content1')}</TabItem>
        <TabItem label={t('storybook.demo.tab2')}>{t('storybook.demo.content2')}</TabItem>
      </SimpleTabs>
    </div>
  );
};

const LargeDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <SimpleTabs size="lg">
        <TabItem label={t('storybook.demo.tab1')}>{t('storybook.demo.content1')}</TabItem>
        <TabItem label={t('storybook.demo.tab2')}>{t('storybook.demo.content2')}</TabItem>
      </SimpleTabs>
    </div>
  );
};

const ControlledDemo = () => {
  const t = useT();
  const [value, setValue] = React.useState('tab1');
  return (
    <div style={{ width: '600px' }}>
      <SimpleTabs value={value} onChange={setValue}>
        <TabItem label={t('storybook.demo.tab1')} value="tab1">
          <Paragraph data-size="sm">
            {t('storybook.demo.controlledTab1')} {value}
          </Paragraph>
        </TabItem>
        <TabItem label={t('storybook.demo.tab2')} value="tab2">
          <Paragraph data-size="sm">
            {t('storybook.demo.controlledTab2')} {value}
          </Paragraph>
        </TabItem>
      </SimpleTabs>
    </div>
  );
};

const RichContentDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <SimpleTabs>
        <TabItem label={t('storybook.demo.overview')}>
          <div>
            <Heading level={3} data-size="sm">
              {t('storybook.demo.overviewSection')}
            </Heading>
            <Paragraph data-size="sm">{t('storybook.demo.richContentDescription')}</Paragraph>
          </div>
        </TabItem>
        <TabItem label={t('storybook.demo.details')}>
          <div>
            <Heading level={3} data-size="sm">
              {t('storybook.demo.detailsSection')}
            </Heading>
            <Paragraph data-size="sm">{t('storybook.demo.detailedInfoHere')}</Paragraph>
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
