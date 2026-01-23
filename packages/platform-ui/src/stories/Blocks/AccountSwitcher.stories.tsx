import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { AccountSwitcher } from '../../blocks/account/AccountSwitcher';
import type { BaseOrganization } from '../../blocks/account/AccountSwitcher';

const meta: Meta<typeof AccountSwitcher> = {
  title: 'Blocks/AccountSwitcher',
  component: AccountSwitcher,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## AccountSwitcher

Dropdown button for switching between personal and organization accounts. Domain-agnostic - receives organization data via generic props.

### Features
- Switch between personal and organization accounts
- Dropdown menu with organization list
- Manage organizations link
- Customizable labels

### Usage
\`\`\`tsx
<AccountSwitcher
  accountType="personal"
  selectedOrganization={null}
  organizations={organizations}
  activeAccount={activeAccount}
  onSwitchToPersonal={handlePersonal}
  onSwitchToOrganization={handleOrg}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onSwitchToPersonal: fn(),
    onSwitchToOrganization: fn(),
    onManageOrganizations: fn(),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample organizations
const sampleOrganizations: BaseOrganization[] = [
  { id: '1', name: 'Acme Corp', organizationNumber: '123456789' },
  { id: '2', name: 'Tech Solutions AS', organizationNumber: '987654321' },
  { id: '3', name: 'Design Studio', organizationNumber: '456789123' },
];

// Personal account
export const PersonalAccount: Story = {
  args: {
    accountType: 'personal',
    selectedOrganization: null,
    organizations: sampleOrganizations,
    activeAccount: {
      type: 'personal',
      id: 'user-1',
      name: 'John Doe',
      displayName: 'John Doe',
    },
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <AccountSwitcher {...args} />
    </div>
  ),
};

// Organization account
export const OrganizationAccount: Story = {
  args: {
    accountType: 'organization',
    selectedOrganization: sampleOrganizations[0],
    organizations: sampleOrganizations,
    activeAccount: {
      type: 'organization',
      id: '1',
      name: 'Acme Corp',
      displayName: 'Acme Corp',
    },
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <AccountSwitcher {...args} />
    </div>
  ),
};

// No organizations
export const NoOrganizations: Story = {
  args: {
    accountType: 'personal',
    selectedOrganization: null,
    organizations: [],
    activeAccount: {
      type: 'personal',
      id: 'user-1',
      name: 'John Doe',
      displayName: 'John Doe',
    },
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <AccountSwitcher {...args} />
    </div>
  ),
};

// Many organizations
export const ManyOrganizations: Story = {
  args: {
    accountType: 'personal',
    selectedOrganization: null,
    organizations: Array.from({ length: 10 }, (_, i) => ({
      id: `org-${i}`,
      name: `Organization ${i + 1}`,
      organizationNumber: `${100000000 + i}`,
    })),
    activeAccount: {
      type: 'personal',
      id: 'user-1',
      name: 'John Doe',
      displayName: 'John Doe',
    },
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <AccountSwitcher {...args} />
    </div>
  ),
};

// Custom labels
export const CustomLabels: Story = {
  args: {
    accountType: 'personal',
    selectedOrganization: null,
    organizations: sampleOrganizations,
    activeAccount: {
      type: 'personal',
      id: 'user-1',
      name: 'John Doe',
      displayName: 'John Doe',
    },
    labels: {
      personal: 'Personal Account',
      organizations: 'Organizations',
      manageOrganizations: 'Manage Organizations',
    },
  },
  render: (args) => (
    <div style={{ width: '300px' }}>
      <AccountSwitcher {...args} />
    </div>
  ),
};

// Custom width
export const CustomWidth: Story = {
  args: {
    accountType: 'organization',
    selectedOrganization: sampleOrganizations[0],
    organizations: sampleOrganizations,
    activeAccount: {
      type: 'organization',
      id: '1',
      name: 'Acme Corp',
      displayName: 'Acme Corp',
    },
    minWidth: '300px',
    dropdownWidth: '400px',
  },
  render: (args) => (
    <div style={{ width: '350px' }}>
      <AccountSwitcher {...args} />
    </div>
  ),
};
