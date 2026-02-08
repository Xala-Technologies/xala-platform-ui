import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { UserInviteForm } from '../../blocks/admin/UserInviteForm';
import type { InviteUserFormData } from '../../blocks/admin/UserInviteForm';

const meta: Meta<typeof UserInviteForm> = {
  title: 'Blocks/UserInviteForm',
  component: UserInviteForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## UserInviteForm

A comprehensive form component for inviting users with email validation, role selection, organization assignment, and optional scope delegation.

### Features
- Email validation
- Role selection
- Organization assignment
- Optional scope delegation
- Custom message field
- Loading states

### Usage
\`\`\`tsx
<UserInviteForm
  availableRoles={roles}
  availableOrganizations={organizations}
  onSubmit={handleInvite}
  loading={false}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample roles
const sampleRoles = [
  { id: 'admin', name: 'Administrator', description: 'Full system access' },
  { id: 'editor', name: 'Editor', description: 'Can edit resources' },
  { id: 'viewer', name: 'Viewer', description: 'Read-only access' },
];

// Sample organizations
const sampleOrganizations = [
  { id: 'org-1', name: 'Oslo Kommune' },
  { id: 'org-2', name: 'Bergen Kommune' },
  { id: 'org-3', name: 'Trondheim Kommune' },
];

// Basic form
export const Default: Story = {
  args: {
    availableRoles: sampleRoles,
    availableOrganizations: sampleOrganizations,
    onSubmit: fn(),
    onCancel: fn(),
    loading: false,
    showOrganization: true,
    showScopeOption: false,
    showMessageField: true,
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <UserInviteForm {...args} />
    </div>
  ),
};

// Without organization field
export const WithoutOrganization: Story = {
  args: {
    availableRoles: sampleRoles,
    availableOrganizations: [],
    onSubmit: fn(),
    onCancel: fn(),
    loading: false,
    showOrganization: false,
    showScopeOption: false,
    showMessageField: true,
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <UserInviteForm {...args} />
    </div>
  ),
};

// With scope option
export const WithScopeOption: Story = {
  args: {
    availableRoles: sampleRoles,
    availableOrganizations: sampleOrganizations,
    onSubmit: fn(),
    onCancel: fn(),
    loading: false,
    showOrganization: true,
    showScopeOption: true,
    showMessageField: true,
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <UserInviteForm {...args} />
    </div>
  ),
};

// Without message field
export const WithoutMessageField: Story = {
  args: {
    availableRoles: sampleRoles,
    availableOrganizations: sampleOrganizations,
    onSubmit: fn(),
    onCancel: fn(),
    loading: false,
    showOrganization: true,
    showScopeOption: false,
    showMessageField: false,
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <UserInviteForm {...args} />
    </div>
  ),
};

// Loading state
export const Loading: Story = {
  args: {
    availableRoles: sampleRoles,
    availableOrganizations: sampleOrganizations,
    onSubmit: fn(),
    onCancel: fn(),
    loading: true,
    showOrganization: true,
    showScopeOption: false,
    showMessageField: true,
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <UserInviteForm {...args} />
    </div>
  ),
};

// With default values
export const WithDefaultValues: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ width: '600px' }}>
        <UserInviteForm
          availableRoles={sampleRoles}
          availableOrganizations={sampleOrganizations}
          onSubmit={fn()}
          onCancel={fn()}
          loading={false}
          defaultValues={{
            email: 'user@example.com',
            role: 'editor',
            organizationId: 'org-1',
            sendEmail: true,
            message: t('storybook.demo.sampleText'),
          }}
          showOrganization={true}
          showScopeOption={false}
          showMessageField={true}
        />
      </div>
    );
  },
};

// Many roles and organizations
export const ManyOptions: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ width: '600px' }}>
        <UserInviteForm
          availableRoles={[
            ...sampleRoles,
            {
              id: 'moderator',
              name: 'Moderator',
              description: t('storybook.demo.cardDescription'),
            },
            { id: 'guest', name: 'Guest', description: t('storybook.demo.cardDescription') },
          ]}
          availableOrganizations={[
            ...sampleOrganizations,
            { id: 'org-4', name: 'Stavanger Kommune' },
            { id: 'org-5', name: 'Tromso Kommune' },
          ]}
          onSubmit={fn()}
          onCancel={fn()}
          loading={false}
          showOrganization={true}
          showScopeOption={false}
          showMessageField={true}
        />
      </div>
    );
  },
};
