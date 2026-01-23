import type { Meta, StoryObj } from '@storybook/react';
import { EffectivePermissionsView } from '../../blocks/admin/EffectivePermissionsView';
import type { EffectivePermission } from '../../blocks/admin/EffectivePermissionsView';

const meta: Meta<typeof EffectivePermissionsView> = {
  title: 'Blocks/EffectivePermissionsView',
  component: EffectivePermissionsView,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## EffectivePermissionsView

Shows all effective permissions for a user, including where they come from (direct assignment, role inheritance, organization membership, or scope).

### Features
- Permission source tracking
- Category grouping
- Risk indicators
- Collapsible categories
- Loading states

### Usage
\`\`\`tsx
<EffectivePermissionsView
  userId="user-123"
  permissions={permissions}
  showSource={true}
  groupByCategory={true}
  showRiskIndicators={true}
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

// Sample permissions
const samplePermissions: EffectivePermission[] = [
  {
    id: 'view-resources',
    name: 'View Resources',
    description: 'Can view all resources',
    category: 'Resources',
    source: 'role',
    sourceDetail: 'Administrator',
    inherited: false,
    risk: 'low',
  },
  {
    id: 'edit-resources',
    name: 'Edit Resources',
    description: 'Can edit resources',
    category: 'Resources',
    source: 'role',
    sourceDetail: 'Editor',
    inherited: true,
    risk: 'medium',
  },
  {
    id: 'delete-resources',
    name: 'Delete Resources',
    description: 'Can delete resources',
    category: 'Resources',
    source: 'direct',
    sourceDetail: 'Direct assignment',
    inherited: false,
    risk: 'high',
  },
  {
    id: 'manage-users',
    name: 'Manage Users',
    description: 'Can create and manage users',
    category: 'Users',
    source: 'organization',
    sourceDetail: 'Oslo Kommune',
    inherited: true,
    risk: 'high',
  },
  {
    id: 'view-reports',
    name: 'View Reports',
    description: 'Can view system reports',
    category: 'Reports',
    source: 'scope',
    sourceDetail: 'Department scope',
    inherited: false,
    risk: 'low',
  },
];

// Basic view
export const Default: Story = {
  args: {
    userId: 'user-123',
    permissions: samplePermissions,
    showSource: true,
    groupByCategory: true,
    showRiskIndicators: true,
    expandAll: false,
    loading: false,
  },
  render: (args) => (
    <div style={{ width: '700px' }}>
      <EffectivePermissionsView {...args} />
    </div>
  ),
};

// Without source
export const WithoutSource: Story = {
  args: {
    userId: 'user-123',
    permissions: samplePermissions,
    showSource: false,
    groupByCategory: true,
    showRiskIndicators: true,
    expandAll: false,
    loading: false,
  },
  render: (args) => (
    <div style={{ width: '700px' }}>
      <EffectivePermissionsView {...args} />
    </div>
  ),
};

// Without category grouping
export const WithoutCategoryGrouping: Story = {
  args: {
    userId: 'user-123',
    permissions: samplePermissions,
    showSource: true,
    groupByCategory: false,
    showRiskIndicators: true,
    expandAll: false,
    loading: false,
  },
  render: (args) => (
    <div style={{ width: '700px' }}>
      <EffectivePermissionsView {...args} />
    </div>
  ),
};

// Without risk indicators
export const WithoutRiskIndicators: Story = {
  args: {
    userId: 'user-123',
    permissions: samplePermissions,
    showSource: true,
    groupByCategory: true,
    showRiskIndicators: false,
    expandAll: false,
    loading: false,
  },
  render: (args) => (
    <div style={{ width: '700px' }}>
      <EffectivePermissionsView {...args} />
    </div>
  ),
};

// Expand all
export const ExpandAll: Story = {
  args: {
    userId: 'user-123',
    permissions: samplePermissions,
    showSource: true,
    groupByCategory: true,
    showRiskIndicators: true,
    expandAll: true,
    loading: false,
  },
  render: (args) => (
    <div style={{ width: '700px' }}>
      <EffectivePermissionsView {...args} />
    </div>
  ),
};

// Loading state
export const Loading: Story = {
  args: {
    userId: 'user-123',
    permissions: [],
    showSource: true,
    groupByCategory: true,
    showRiskIndicators: true,
    expandAll: false,
    loading: true,
  },
  render: (args) => (
    <div style={{ width: '700px' }}>
      <EffectivePermissionsView {...args} />
    </div>
  ),
};

// Empty permissions
export const Empty: Story = {
  args: {
    userId: 'user-123',
    permissions: [],
    showSource: true,
    groupByCategory: true,
    showRiskIndicators: true,
    expandAll: false,
    loading: false,
  },
  render: (args) => (
    <div style={{ width: '700px' }}>
      <EffectivePermissionsView {...args} />
    </div>
  ),
};

// Many permissions
export const ManyPermissions: Story = {
  args: {
    userId: 'user-123',
    permissions: [
      ...samplePermissions,
      {
        id: 'export-data',
        name: 'Export Data',
        description: 'Can export data',
        category: 'Data',
        source: 'role',
        sourceDetail: 'Data Manager',
        risk: 'medium',
      },
      {
        id: 'import-data',
        name: 'Import Data',
        description: 'Can import data',
        category: 'Data',
        source: 'direct',
        sourceDetail: 'Direct assignment',
        risk: 'high',
      },
      {
        id: 'manage-settings',
        name: 'Manage Settings',
        description: 'Can manage system settings',
        category: 'Settings',
        source: 'organization',
        sourceDetail: 'IT Department',
        risk: 'high',
      },
    ],
    showSource: true,
    groupByCategory: true,
    showRiskIndicators: true,
    expandAll: false,
    loading: false,
  },
  render: (args) => (
    <div style={{ width: '700px' }}>
      <EffectivePermissionsView {...args} />
    </div>
  ),
};
