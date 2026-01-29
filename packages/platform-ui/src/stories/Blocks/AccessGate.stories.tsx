import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { AccessGate } from '../../blocks/AccessGate';
import { Card, Heading, Paragraph } from '@digdir/designsystemet-react';
import { LockClosedIcon, ShieldIcon, UserIcon } from '@navikt/aksel-icons';

const meta: Meta<typeof AccessGate> = {
  title: 'Blocks/AccessGate',
  component: AccessGate,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## AccessGate

RBAC-aware access control component with rich UI feedback for permission-denied states.

### Features
- Customizable denied state with icon, title, description
- Action buttons for request access or navigation
- Size variants (sm, md, lg)
- Optional bordered variant
- Proper accessibility with role="alert" and aria-live
- i18n support via labels prop
- Shows required permission badge

### State Matrix Support
AccessGate is designed for the \`permissionDenied\` state in the UX Lexicon state matrix.

### Usage
\`\`\`tsx
<AccessGate
  denied={!user.hasPermission('admin')}
  title="Admin Access Required"
  description="You need admin permissions to view this section."
  actions={[
    { label: 'Request Access', onClick: handleRequest },
    { label: 'Go Back', onClick: goBack, variant: 'secondary' },
  ]}
>
  <AdminPanel />
</AccessGate>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    denied: {
      control: 'boolean',
      description: 'Whether access is denied',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    bordered: {
      control: 'boolean',
      description: 'Whether to show a border',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default - Access Denied
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ width: '500px' }}>
        <AccessGate
          denied
          title={t('platform.errors.accessDenied')}
          description={t('platform.errors.noPermission')}
        >
          <Card data-color="neutral" style={{ padding: 'var(--ds-spacing-4)' }}>
            <Paragraph>This content is protected</Paragraph>
          </Card>
        </AccessGate>
      </div>
    );
  },
};

// Access Granted
export const AccessGranted: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ width: '500px' }}>
        <AccessGate
          denied={false}
          title={t('platform.errors.accessDenied')}
          description={t('platform.errors.noPermission')}
        >
          <Card data-color="neutral" style={{ padding: 'var(--ds-spacing-4)' }}>
            <Heading level={3} data-size="sm">
              Protected Content
            </Heading>
            <Paragraph data-size="sm">
              This content is visible because user has permission.
            </Paragraph>
          </Card>
        </AccessGate>
      </div>
    );
  },
};

// With Actions
export const WithActions: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ width: '500px' }}>
        <AccessGate
          denied
          title="Admin Access Required"
          description="You need administrator permissions to view this section."
          actions={[
            {
              label: t('platform.common.submit'),
              onClick: () => alert('Request access clicked'),
              variant: 'primary',
            },
            {
              label: t('platform.common.cancel'),
              onClick: () => alert('Go back clicked'),
              variant: 'secondary',
            },
          ]}
        >
          <Card data-color="neutral" style={{ padding: 'var(--ds-spacing-4)' }}>
            <Paragraph>Admin panel content</Paragraph>
          </Card>
        </AccessGate>
      </div>
    );
  },
};

// With Required Permission Badge
export const WithPermissionBadge: Story = {
  render: function Render() {
    return (
      <div style={{ width: '500px' }}>
        <AccessGate
          denied
          title="Insufficient Permissions"
          description="The following permission is required to access this resource."
          requiredPermission="resource:admin:write"
          actions={[{ label: 'Request Access', onClick: () => {}, variant: 'primary' }]}
        >
          <Card data-color="neutral" style={{ padding: 'var(--ds-spacing-4)' }}>
            <Paragraph>Protected content</Paragraph>
          </Card>
        </AccessGate>
      </div>
    );
  },
};

// Custom Icon
export const CustomIcon: Story = {
  render: function Render() {
    return (
      <div style={{ width: '500px' }}>
        <AccessGate
          denied
          title="Security Restricted"
          description="This area requires elevated security clearance."
          icon={<ShieldIcon fontSize="32px" aria-hidden />}
        >
          <Card data-color="neutral" style={{ padding: 'var(--ds-spacing-4)' }}>
            <Paragraph>Secure content</Paragraph>
          </Card>
        </AccessGate>
      </div>
    );
  },
};

// Small Size
export const SmallSize: Story = {
  render: function Render() {
    return (
      <div style={{ width: '400px' }}>
        <AccessGate
          denied
          size="sm"
          title="Access Restricted"
          description="Contact your administrator for access."
        >
          <Card data-color="neutral" style={{ padding: 'var(--ds-spacing-4)' }}>
            <Paragraph>Protected content</Paragraph>
          </Card>
        </AccessGate>
      </div>
    );
  },
};

// Large Size
export const LargeSize: Story = {
  render: function Render() {
    return (
      <div style={{ width: '600px' }}>
        <AccessGate
          denied
          size="lg"
          title="Access Restricted"
          description="You do not have the necessary permissions to view this content. Please contact your organization administrator to request access."
          actions={[{ label: 'Request Access', onClick: () => {}, variant: 'primary' }]}
        >
          <Card data-color="neutral" style={{ padding: 'var(--ds-spacing-4)' }}>
            <Paragraph>Protected content</Paragraph>
          </Card>
        </AccessGate>
      </div>
    );
  },
};

// Bordered
export const Bordered: Story = {
  render: function Render() {
    return (
      <div style={{ width: '500px' }}>
        <AccessGate
          denied
          bordered
          title="Section Restricted"
          description="This section requires additional permissions."
          actions={[{ label: 'Learn More', onClick: () => {}, variant: 'secondary' }]}
        >
          <Card data-color="neutral" style={{ padding: 'var(--ds-spacing-4)' }}>
            <Paragraph>Protected content</Paragraph>
          </Card>
        </AccessGate>
      </div>
    );
  },
};

// Custom Fallback
export const CustomFallback: Story = {
  render: function Render() {
    return (
      <div style={{ width: '500px' }}>
        <AccessGate
          denied
          fallback={
            <Card data-color="warning" style={{ padding: 'var(--ds-spacing-4)' }}>
              <Heading level={3} data-size="sm">
                Custom Access Denied View
              </Heading>
              <Paragraph data-size="sm">
                This is a completely custom fallback component for when access is denied.
              </Paragraph>
            </Card>
          }
        >
          <Card data-color="neutral" style={{ padding: 'var(--ds-spacing-4)' }}>
            <Paragraph>Protected content</Paragraph>
          </Card>
        </AccessGate>
      </div>
    );
  },
};

// All Sizes Comparison
export const AllSizes: Story = {
  render: function Render() {
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-8)',
          width: '600px',
        }}
      >
        <div>
          <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            <strong>Small (sm)</strong>
          </Paragraph>
          <AccessGate
            denied
            size="sm"
            bordered
            title="Access Restricted"
            description="Contact administrator."
          >
            <div>Content</div>
          </AccessGate>
        </div>

        <div>
          <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            <strong>Medium (md) - Default</strong>
          </Paragraph>
          <AccessGate
            denied
            size="md"
            bordered
            title="Access Restricted"
            description="You need permissions to view this content."
          >
            <div>Content</div>
          </AccessGate>
        </div>

        <div>
          <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            <strong>Large (lg)</strong>
          </Paragraph>
          <AccessGate
            denied
            size="lg"
            bordered
            title="Access Restricted"
            description="You do not have the necessary permissions to view this content."
            actions={[{ label: 'Request Access', onClick: () => {}, variant: 'primary' }]}
          >
            <div>Content</div>
          </AccessGate>
        </div>
      </div>
    );
  },
};
