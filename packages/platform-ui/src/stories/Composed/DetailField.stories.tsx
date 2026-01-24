import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import {
  DetailField,
  DetailFieldGroup,
  DetailCard,
  MonoField,
  LinkField,
} from '../../composed/DetailField';
import { Button, Paragraph } from '@digdir/designsystemet-react';
import { Mail, Phone, Globe, User } from 'lucide-react';
import { Badge } from '../../composed/Badge';

const meta: Meta<typeof DetailField> = {
  title: 'Composed/DetailField',
  component: DetailField,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## DetailField Components

Reusable components for displaying labeled data fields. Common pattern in detail pages for showing entity properties.

### Features
- DetailField for single field display
- DetailFieldGroup for multiple fields
- DetailCard for grouped sections
- MonoField for IDs/codes
- LinkField for emails/phones/URLs
- Copyable values

### Usage
\`\`\`tsx
<DetailField label="Name" value="John Doe" />
<DetailFieldGroup title="Contact" columns={2}>
  <DetailField label="Email" value="john@example.com" />
</DetailFieldGroup>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    copyable: {
      control: 'boolean',
      description: 'Enable copy to clipboard',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper for default story
const DefaultDemo = () => {
  const t = useT();
  return <DetailField label={t('platform.common.name')} value="John Doe" copyable={false} />;
};

// Basic detail field
export const Default: Story = {
  render: () => <DefaultDemo />,
};

// Wrapper for with icon story
const WithIconDemo = () => {
  const t = useT();
  return (
    <DetailField
      label={t('platform.auth.email')}
      value="john.doe@example.com"
      icon={<Mail size={16} />}
      copyable={false}
    />
  );
};

// With icon
export const WithIcon: Story = {
  render: () => <WithIconDemo />,
};

// Wrapper for copyable story
const CopyableDemo = () => {
  const t = useT();
  return (
    <DetailField
      label={t('storybook.demo.apiKey')}
      value="sk_live_1234567890abcdef"
      copyable={true}
      onCopy={fn()}
      isCopied={false}
    />
  );
};

// Copyable
export const Copyable: Story = {
  render: () => <CopyableDemo />,
};

// Wrapper for with react node story
const WithReactNodeDemo = () => {
  const t = useT();
  return (
    <DetailField
      label={t('platform.status.label')}
      value={<Badge variant="success">{t('platform.status.active')}</Badge>}
      copyable={false}
    />
  );
};

// With React node value
export const WithReactNode: Story = {
  render: () => <WithReactNodeDemo />,
};

// Wrapper for group single column story
const GroupSingleColumnDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <DetailFieldGroup title={t('storybook.demo.userInformation')} columns={1}>
        <DetailField label={t('platform.common.name')} value="John Doe" />
        <DetailField
          label={t('platform.auth.email')}
          value="john.doe@example.com"
          icon={<Mail size={16} />}
        />
        <DetailField
          label={t('storybook.demo.phone')}
          value="+47 12 34 56 78"
          icon={<Phone size={16} />}
        />
        <DetailField
          label={t('platform.status.label')}
          value={<Badge variant="success">{t('platform.status.active')}</Badge>}
        />
      </DetailFieldGroup>
    </div>
  );
};

// DetailFieldGroup - single column
export const GroupSingleColumn: Story = {
  render: () => <GroupSingleColumnDemo />,
};

// Wrapper for group two columns story
const GroupTwoColumnsDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '600px' }}>
      <DetailFieldGroup title={t('storybook.demo.userInformation')} columns={2}>
        <DetailField label={t('platform.common.name')} value="John Doe" />
        <DetailField label={t('platform.auth.email')} value="john.doe@example.com" />
        <DetailField label={t('storybook.demo.phone')} value="+47 12 34 56 78" />
        <DetailField
          label={t('platform.status.label')}
          value={<Badge variant="success">{t('platform.status.active')}</Badge>}
        />
      </DetailFieldGroup>
    </div>
  );
};

// DetailFieldGroup - two columns
export const GroupTwoColumns: Story = {
  render: () => <GroupTwoColumnsDemo />,
};

// Wrapper for group three columns story
const GroupThreeColumnsDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '800px' }}>
      <DetailFieldGroup title={t('storybook.demo.quickInfo')} columns={3}>
        <DetailField label={t('platform.common.name')} value="John Doe" />
        <DetailField label={t('platform.auth.email')} value="john@example.com" />
        <DetailField label={t('storybook.demo.phone')} value="+47 12 34 56 78" />
      </DetailFieldGroup>
    </div>
  );
};

// DetailFieldGroup - three columns
export const GroupThreeColumns: Story = {
  render: () => <GroupThreeColumnsDemo />,
};

// Wrapper for card story
const CardDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '500px' }}>
      <DetailCard
        title={t('storybook.demo.userDetails')}
        icon={<User size={20} />}
        actions={
          <Button onClick={fn()} data-color="accent" data-size="sm">
            {t('platform.common.edit')}
          </Button>
        }
      >
        <DetailFieldGroup columns={1}>
          <DetailField label={t('platform.common.name')} value="John Doe" />
          <DetailField label={t('platform.auth.email')} value="john.doe@example.com" />
          <DetailField label={t('storybook.demo.role')} value={t('storybook.demo.administrator')} />
        </DetailFieldGroup>
      </DetailCard>
    </div>
  );
};

// DetailCard
export const Card: Story = {
  render: () => <CardDemo />,
};

// Wrapper for mono field story
const MonoFieldExampleDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <MonoField
        label={t('storybook.demo.transactionId')}
        value="txn_1234567890abcdef"
        copyable={true}
        onCopy={fn()}
        isCopied={false}
      />
    </div>
  );
};

// MonoField
export const MonoFieldExample: Story = {
  render: () => <MonoFieldExampleDemo />,
};

// Wrapper for link field story
const LinkFieldExampleDemo = () => {
  const t = useT();
  return (
    <div
      style={{
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-4)',
      }}
    >
      <LinkField
        label={t('platform.auth.email')}
        value="john.doe@example.com"
        href="mailto:john.doe@example.com"
        icon={<Mail size={16} />}
        copyable={true}
        onCopy={fn()}
      />
      <LinkField
        label={t('storybook.demo.phone')}
        value="+47 12 34 56 78"
        href="tel:+4712345678"
        icon={<Phone size={16} />}
        copyable={true}
        onCopy={fn()}
      />
      <LinkField
        label={t('storybook.demo.website')}
        value="https://example.com"
        href="https://example.com"
        icon={<Globe size={16} />}
        copyable={true}
        onCopy={fn()}
      />
    </div>
  );
};

// LinkField
export const LinkFieldExample: Story = {
  render: () => <LinkFieldExampleDemo />,
};

// Wrapper for complete example story
const CompleteExampleDemo = () => {
  const t = useT();
  return (
    <div
      style={{
        width: '600px',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-4)',
      }}
    >
      <DetailCard title={t('storybook.demo.accountInformation')} icon={<User size={20} />}>
        <DetailFieldGroup columns={2}>
          <DetailField label={t('storybook.demo.accountId')} value="acc_1234567890" />
          <MonoField
            label={t('storybook.demo.apiKey')}
            value="sk_live_abcdef123456"
            copyable
            onCopy={fn()}
          />
          <LinkField
            label={t('platform.auth.email')}
            value="john.doe@example.com"
            href="mailto:john.doe@example.com"
            icon={<Mail size={16} />}
            copyable
            onCopy={fn()}
          />
          <DetailField
            label={t('platform.status.label')}
            value={<Badge variant="success">{t('platform.status.active')}</Badge>}
          />
        </DetailFieldGroup>
      </DetailCard>
    </div>
  );
};

// Complete example
export const CompleteExample: Story = {
  render: () => <CompleteExampleDemo />,
};
