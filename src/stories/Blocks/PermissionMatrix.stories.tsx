import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { PermissionMatrix } from '../../blocks/admin/PermissionMatrix';
import type { Role, Permission } from '../../blocks/admin/PermissionMatrix';

const meta: Meta<typeof PermissionMatrix> = {
  title: 'Blocks/PermissionMatrix',
  component: PermissionMatrix,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## PermissionMatrix

Interactive grid showing which permissions are assigned to which roles. Supports grouping by category, risk indicators, and permission toggling.

### Features
- Role-permission grid
- Permission toggling
- Risk indicators
- Category grouping
- Search functionality

### Usage
\`\`\`tsx
<PermissionMatrix
  roles={roles}
  permissions={permissions}
  onPermissionToggle={handleToggle}
  showRiskIndicators={true}
  groupByCategory={true}
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
const sampleRoles: Role[] = [
  {
    id: 'admin',
    name: 'Administrator',
    description: 'Full system access',
    color: 'var(--ds-color-danger-base-default)',
    permissions: ['view-resources', 'edit-resources', 'delete-resources', 'manage-users'],
  },
  {
    id: 'editor',
    name: 'Editor',
    description: 'Can edit resources',
    color: 'var(--ds-color-warning-base-default)',
    permissions: ['view-resources', 'edit-resources'],
  },
  {
    id: 'viewer',
    name: 'Viewer',
    description: 'Read-only access',
    color: 'var(--ds-color-info-base-default)',
    permissions: ['view-resources'],
  },
];

// Sample permissions
const samplePermissions: Permission[] = [
  {
    id: 'view-resources',
    name: 'View Resources',
    description: 'Can view all resources',
    category: 'Resources',
    risk: 'low',
  },
  {
    id: 'edit-resources',
    name: 'Edit Resources',
    description: 'Can edit resources',
    category: 'Resources',
    risk: 'medium',
  },
  {
    id: 'delete-resources',
    name: 'Delete Resources',
    description: 'Can delete resources',
    category: 'Resources',
    risk: 'high',
  },
  {
    id: 'manage-users',
    name: 'Manage Users',
    description: 'Can create and manage users',
    category: 'Users',
    risk: 'high',
  },
  {
    id: 'view-reports',
    name: 'View Reports',
    description: 'Can view system reports',
    category: 'Reports',
    risk: 'low',
  },
];

// Basic matrix
export const Default: Story = {
  args: {
    roles: sampleRoles,
    permissions: samplePermissions,
    onPermissionToggle: fn(),
    readOnly: false,
    showRiskIndicators: true,
    groupByCategory: true,
  },
  render: (args) => (
    <div style={{ width: '900px' }}>
      <PermissionMatrix {...args} />
    </div>
  ),
};

// Read-only mode
export const ReadOnly: Story = {
  args: {
    roles: sampleRoles,
    permissions: samplePermissions,
    onPermissionToggle: fn(),
    readOnly: true,
    showRiskIndicators: true,
    groupByCategory: true,
  },
  render: (args) => (
    <div style={{ width: '900px' }}>
      <PermissionMatrix {...args} />
    </div>
  ),
};

// Without risk indicators
export const WithoutRiskIndicators: Story = {
  args: {
    roles: sampleRoles,
    permissions: samplePermissions,
    onPermissionToggle: fn(),
    readOnly: false,
    showRiskIndicators: false,
    groupByCategory: true,
  },
  render: (args) => (
    <div style={{ width: '900px' }}>
      <PermissionMatrix {...args} />
    </div>
  ),
};

// Without category grouping
export const WithoutCategoryGrouping: Story = {
  args: {
    roles: sampleRoles,
    permissions: samplePermissions,
    onPermissionToggle: fn(),
    readOnly: false,
    showRiskIndicators: true,
    groupByCategory: false,
  },
  render: (args) => (
    <div style={{ width: '900px' }}>
      <PermissionMatrix {...args} />
    </div>
  ),
};

// Many roles and permissions
export const ManyRolesAndPermissions: Story = {
  render: function Render() {
    const t = useT();
    const roles = [
      ...sampleRoles,
      {
        id: 'moderator',
        name: 'Moderator',
        description: t('storybook.demo.cardDescription'),
        permissions: ['view-resources', 'edit-resources'],
      },
      {
        id: 'guest',
        name: 'Guest',
        description: t('storybook.demo.cardDescription'),
        permissions: ['view-resources'],
      },
    ];
    const permissions = [
      ...samplePermissions,
      {
        id: 'export-data',
        name: 'Export Data',
        description: t('storybook.demo.cardDescription'),
        category: 'Data',
        risk: 'medium' as const,
      },
      {
        id: 'import-data',
        name: 'Import Data',
        description: t('storybook.demo.cardDescription'),
        category: 'Data',
        risk: 'high' as const,
      },
    ];
    return (
      <div style={{ width: '1000px' }}>
        <PermissionMatrix
          roles={roles}
          permissions={permissions}
          onPermissionToggle={fn()}
          readOnly={false}
          showRiskIndicators={true}
          groupByCategory={true}
        />
      </div>
    );
  },
};

// Empty roles
export const EmptyRoles: Story = {
  args: {
    roles: [],
    permissions: samplePermissions,
    onPermissionToggle: fn(),
    readOnly: false,
    showRiskIndicators: true,
    groupByCategory: true,
  },
  render: (args) => (
    <div style={{ width: '900px' }}>
      <PermissionMatrix {...args} />
    </div>
  ),
};

// Empty permissions
export const EmptyPermissions: Story = {
  args: {
    roles: sampleRoles,
    permissions: [],
    onPermissionToggle: fn(),
    readOnly: false,
    showRiskIndicators: true,
    groupByCategory: true,
  },
  render: (args) => (
    <div style={{ width: '900px' }}>
      <PermissionMatrix {...args} />
    </div>
  ),
};
