import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
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

// Wrapper for default story
const DefaultDemo = () => {
  const t = useT();
  return (
    <KeyValue
      label={t('platform.common.name')}
      value="John Doe"
      direction="vertical"
      copyable={false}
      mono={false}
    />
  );
};

// Basic key-value
export const Default: Story = {
  render: () => <DefaultDemo />,
};

// Wrapper for horizontal story
const HorizontalDemo = () => {
  const t = useT();
  return (
    <KeyValue
      label={t('platform.auth.email')}
      value="john.doe@example.com"
      direction="horizontal"
      copyable={false}
      mono={false}
    />
  );
};

// Horizontal layout
export const Horizontal: Story = {
  render: () => <HorizontalDemo />,
};

// Wrapper for copyable story
const CopyableDemo = () => {
  const t = useT();
  return (
    <KeyValue
      label={t('storybook.demo.apiKey')}
      value="sk_live_1234567890abcdef"
      direction="vertical"
      copyable={true}
      mono={true}
    />
  );
};

// With copyable value
export const Copyable: Story = {
  render: () => <CopyableDemo />,
};

// Wrapper for monospace story
const MonospaceDemo = () => {
  const t = useT();
  return (
    <KeyValue
      label={t('storybook.demo.transactionId')}
      value="txn_1234567890abcdef"
      direction="vertical"
      copyable={false}
      mono={true}
    />
  );
};

// Monospace font
export const Monospace: Story = {
  render: () => <MonospaceDemo />,
};

// Wrapper for react node story
const WithReactNodeDemo = () => {
  const t = useT();
  return (
    <KeyValue
      label={t('platform.status.label')}
      value={<Badge variant="success">{t('platform.status.active')}</Badge>}
      direction="vertical"
      copyable={false}
      mono={false}
    />
  );
};

// With React node value
export const WithReactNode: Story = {
  render: () => <WithReactNodeDemo />,
};

// Wrapper for single column list
const ListSingleColumnDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <KeyValueList
        items={[
          { key: t('platform.common.name'), value: 'John Doe' },
          { key: t('platform.auth.email'), value: 'john.doe@example.com' },
          { key: t('storybook.demo.phone'), value: '+47 12 34 56 78' },
          {
            key: t('platform.status.label'),
            value: <Badge variant="success">{t('platform.status.active')}</Badge>,
          },
        ]}
        columns={1}
        direction="vertical"
        variant="default"
      />
    </div>
  );
};

// KeyValueList - single column
export const ListSingleColumn: Story = {
  render: () => <ListSingleColumnDemo />,
};

// Wrapper for two columns list
const ListTwoColumnsDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <KeyValueList
        items={[
          { key: t('platform.common.name'), value: 'John Doe' },
          { key: t('platform.auth.email'), value: 'john.doe@example.com' },
          { key: t('storybook.demo.phone'), value: '+47 12 34 56 78' },
          {
            key: t('platform.status.label'),
            value: <Badge variant="success">{t('platform.status.active')}</Badge>,
          },
        ]}
        columns={2}
        direction="vertical"
        variant="default"
      />
    </div>
  );
};

// KeyValueList - two columns
export const ListTwoColumns: Story = {
  render: () => <ListTwoColumnsDemo />,
};

// Wrapper for striped list
const ListStripedDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <KeyValueList
        items={[
          { key: t('platform.common.name'), value: 'John Doe' },
          { key: t('platform.auth.email'), value: 'john.doe@example.com' },
          { key: t('storybook.demo.phone'), value: '+47 12 34 56 78' },
          {
            key: t('platform.status.label'),
            value: <Badge variant="success">{t('platform.status.active')}</Badge>,
          },
        ]}
        columns={1}
        direction="vertical"
        variant="striped"
      />
    </div>
  );
};

// KeyValueList - striped variant
export const ListStriped: Story = {
  render: () => <ListStripedDemo />,
};

// Wrapper for bordered list
const ListBorderedDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <KeyValueList
        items={[
          { key: t('platform.common.name'), value: 'John Doe' },
          { key: t('platform.auth.email'), value: 'john.doe@example.com' },
          { key: t('storybook.demo.phone'), value: '+47 12 34 56 78' },
          {
            key: t('platform.status.label'),
            value: <Badge variant="success">{t('platform.status.active')}</Badge>,
          },
        ]}
        columns={1}
        direction="vertical"
        variant="bordered"
      />
    </div>
  );
};

// KeyValueList - bordered variant
export const ListBordered: Story = {
  render: () => <ListBorderedDemo />,
};

// Wrapper for copyable list
const ListWithCopyableDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <KeyValueList
        items={[
          {
            key: t('storybook.demo.apiKey'),
            value: 'sk_live_1234567890abcdef',
            copyable: true,
            mono: true,
          },
          {
            key: t('storybook.demo.secret'),
            value: 'secret_abcdef1234567890',
            copyable: true,
            mono: true,
          },
          {
            key: t('storybook.demo.webhookUrl'),
            value: 'https://api.example.com/webhook',
            copyable: true,
          },
        ]}
        columns={1}
        direction="vertical"
        variant="default"
      />
    </div>
  );
};

// KeyValueList with copyable items
export const ListWithCopyable: Story = {
  render: () => <ListWithCopyableDemo />,
};

// Wrapper for links list
const ListWithLinksDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <KeyValueList
        items={[
          {
            key: t('storybook.demo.website'),
            value: 'https://example.com',
            href: 'https://example.com',
          },
          {
            key: t('storybook.demo.documentation'),
            value: t('storybook.demo.viewDocs'),
            href: 'https://docs.example.com',
          },
          {
            key: t('storybook.demo.support'),
            value: t('storybook.demo.contactSupport'),
            href: 'mailto:support@example.com',
          },
        ]}
        columns={1}
        direction="vertical"
        variant="default"
      />
    </div>
  );
};

// KeyValueList with links
export const ListWithLinks: Story = {
  render: () => <ListWithLinksDemo />,
};

// Wrapper for definition list
const DefinitionListExampleDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '500px' }}>
      <DefinitionList
        items={[
          { term: t('platform.common.name'), definition: 'John Doe' },
          { term: t('platform.auth.email'), definition: 'john.doe@example.com' },
          { term: t('storybook.demo.role'), definition: t('storybook.demo.administrator') },
          {
            term: t('platform.status.label'),
            definition: <Badge variant="success">{t('platform.status.active')}</Badge>,
          },
        ]}
      />
    </div>
  );
};

// DefinitionList
export const DefinitionListExample: Story = {
  render: () => <DefinitionListExampleDemo />,
};
