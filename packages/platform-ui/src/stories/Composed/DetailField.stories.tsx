import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
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

// Basic detail field
export const Default: Story = {
  args: {
    label: 'Name',
    value: 'John Doe',
    copyable: false,
  },
};

// With icon
export const WithIcon: Story = {
  args: {
    label: 'Email',
    value: 'john.doe@example.com',
    icon: <Mail size={16} />,
    copyable: false,
  },
};

// Copyable
export const Copyable: Story = {
  args: {
    label: 'API Key',
    value: 'sk_live_1234567890abcdef',
    copyable: true,
    onCopy: fn(),
    isCopied: false,
  },
};

// With React node value
export const WithReactNode: Story = {
  args: {
    label: 'Status',
    value: <Badge variant="success">Active</Badge>,
    copyable: false,
  },
};

// DetailFieldGroup - single column
export const GroupSingleColumn: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <DetailFieldGroup title="User Information" columns={1}>
        <DetailField label="Name" value="John Doe" />
        <DetailField label="Email" value="john.doe@example.com" icon={<Mail size={16} />} />
        <DetailField label="Phone" value="+47 12 34 56 78" icon={<Phone size={16} />} />
        <DetailField label="Status" value={<Badge variant="success">Active</Badge>} />
      </DetailFieldGroup>
    </div>
  ),
};

// DetailFieldGroup - two columns
export const GroupTwoColumns: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <DetailFieldGroup title="User Information" columns={2}>
        <DetailField label="Name" value="John Doe" />
        <DetailField label="Email" value="john.doe@example.com" />
        <DetailField label="Phone" value="+47 12 34 56 78" />
        <DetailField label="Status" value={<Badge variant="success">Active</Badge>} />
      </DetailFieldGroup>
    </div>
  ),
};

// DetailFieldGroup - three columns
export const GroupThreeColumns: Story = {
  render: () => (
    <div style={{ width: '800px' }}>
      <DetailFieldGroup title="Quick Info" columns={3}>
        <DetailField label="Name" value="John Doe" />
        <DetailField label="Email" value="john@example.com" />
        <DetailField label="Phone" value="+47 12 34 56 78" />
      </DetailFieldGroup>
    </div>
  ),
};

// DetailCard
export const Card: Story = {
  render: () => (
    <div style={{ width: '500px' }}>
      <DetailCard
        title="User Details"
        icon={<User size={20} />}
        actions={
          <Button onClick={fn()} data-color="accent" data-size="sm">
            Edit
          </Button>
        }
      >
        <DetailFieldGroup columns={1}>
          <DetailField label="Name" value="John Doe" />
          <DetailField label="Email" value="john.doe@example.com" />
          <DetailField label="Role" value="Administrator" />
        </DetailFieldGroup>
      </DetailCard>
    </div>
  ),
};

// MonoField
export const MonoFieldExample: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <MonoField
        label="Transaction ID"
        value="txn_1234567890abcdef"
        copyable={true}
        onCopy={fn()}
        isCopied={false}
      />
    </div>
  ),
};

// LinkField
export const LinkFieldExample: Story = {
  render: () => (
    <div
      style={{
        width: '400px',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-4)',
      }}
    >
      <LinkField
        label="Email"
        value="john.doe@example.com"
        href="mailto:john.doe@example.com"
        icon={<Mail size={16} />}
        copyable={true}
        onCopy={fn()}
      />
      <LinkField
        label="Phone"
        value="+47 12 34 56 78"
        href="tel:+4712345678"
        icon={<Phone size={16} />}
        copyable={true}
        onCopy={fn()}
      />
      <LinkField
        label="Website"
        value="https://example.com"
        href="https://example.com"
        icon={<Globe size={16} />}
        copyable={true}
        onCopy={fn()}
      />
    </div>
  ),
};

// Complete example
export const CompleteExample: Story = {
  render: () => (
    <div
      style={{
        width: '600px',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-4)',
      }}
    >
      <DetailCard title="Account Information" icon={<User size={20} />}>
        <DetailFieldGroup columns={2}>
          <DetailField label="Account ID" value="acc_1234567890" />
          <MonoField label="API Key" value="sk_live_abcdef123456" copyable onCopy={fn()} />
          <LinkField
            label="Email"
            value="john.doe@example.com"
            href="mailto:john.doe@example.com"
            icon={<Mail size={16} />}
            copyable
            onCopy={fn()}
          />
          <DetailField label="Status" value={<Badge variant="success">Active</Badge>} />
        </DetailFieldGroup>
      </DetailCard>
    </div>
  ),
};
