import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { ScopeSelector } from '../../blocks/admin/ScopeSelector';
import type { ScopeAssignment, Resource, Organization } from '../../blocks/admin/ScopeSelector';

const meta: Meta<typeof ScopeSelector> = {
  title: 'Blocks/ScopeSelector',
  component: ScopeSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ScopeSelector

Allows administrators to define the scope of access for a user. Scopes can be none, specific resources, organization-based, category-based, or all.

### Features
- Multiple scope types
- Resource selection
- Organization selection
- Category selection
- Search functionality
- Preview of affected resources

### Usage
\`\`\`tsx
<ScopeSelector
  userId="user-123"
  currentScope={{ scopeType: 'specific', resourceIds: ['obj-1'] }}
  availableObjects={objects}
  availableOrganizations={organizations}
  availableCategories={categories}
  onScopeChange={handleChange}
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

// Sample resources
const sampleResources: Resource[] = [
  { id: 'obj-1', name: 'Meeting Room A', type: 'room', category: 'meeting-rooms' },
  { id: 'obj-2', name: 'Meeting Room B', type: 'room', category: 'meeting-rooms' },
  { id: 'obj-3', name: 'Conference Hall', type: 'hall', category: 'conference' },
  { id: 'obj-4', name: 'Workshop Space', type: 'workshop', category: 'workshops' },
];

// Sample organizations
const sampleOrganizations: Organization[] = [
  { id: 'org-1', name: 'Oslo Kommune', resourceCount: 15 },
  { id: 'org-2', name: 'Bergen Kommune', resourceCount: 8 },
  { id: 'org-3', name: 'Trondheim Kommune', resourceCount: 12 },
];

// Sample categories
const sampleCategories = [
  { key: 'meeting-rooms', label: 'Meeting Rooms' },
  { key: 'conference', label: 'Conference Halls' },
  { key: 'workshops', label: 'Workshops' },
];

// No access
export const NoAccess: Story = {
  args: {
    userId: 'user-123',
    currentScope: { scopeType: 'none' },
    availableObjects: sampleResources,
    availableOrganizations: sampleOrganizations,
    availableCategories: sampleCategories,
    onScopeChange: fn(),
    loading: false,
    readOnly: false,
    showPreview: true,
  },
  render: (args) => {
    const [scope, setScope] = useState<ScopeAssignment>(args.currentScope || { scopeType: 'none' });
    return (
      <div style={{ width: '700px' }}>
        <ScopeSelector
          {...args}
          currentScope={scope}
          onScopeChange={(newScope) => {
            setScope(newScope);
            args.onScopeChange?.(newScope);
          }}
        />
      </div>
    );
  },
};

// Specific resources
export const SpecificResources: Story = {
  args: {
    userId: 'user-123',
    currentScope: { scopeType: 'specific', resourceIds: ['obj-1', 'obj-2'] },
    availableObjects: sampleResources,
    availableOrganizations: sampleOrganizations,
    availableCategories: sampleCategories,
    onScopeChange: fn(),
    loading: false,
    readOnly: false,
    showPreview: true,
  },
  render: (args) => {
    const [scope, setScope] = useState<ScopeAssignment>(args.currentScope || { scopeType: 'none' });
    return (
      <div style={{ width: '700px' }}>
        <ScopeSelector
          {...args}
          currentScope={scope}
          onScopeChange={(newScope) => {
            setScope(newScope);
            args.onScopeChange?.(newScope);
          }}
        />
      </div>
    );
  },
};

// Organization-based
export const OrganizationBased: Story = {
  args: {
    userId: 'user-123',
    currentScope: { scopeType: 'organization', organizationIds: ['org-1'] },
    availableObjects: sampleResources,
    availableOrganizations: sampleOrganizations,
    availableCategories: sampleCategories,
    onScopeChange: fn(),
    loading: false,
    readOnly: false,
    showPreview: true,
  },
  render: (args) => {
    const [scope, setScope] = useState<ScopeAssignment>(args.currentScope || { scopeType: 'none' });
    return (
      <div style={{ width: '700px' }}>
        <ScopeSelector
          {...args}
          currentScope={scope}
          onScopeChange={(newScope) => {
            setScope(newScope);
            args.onScopeChange?.(newScope);
          }}
        />
      </div>
    );
  },
};

// Category-based
export const CategoryBased: Story = {
  args: {
    userId: 'user-123',
    currentScope: { scopeType: 'category', categoryKeys: ['meeting-rooms'] },
    availableObjects: sampleResources,
    availableOrganizations: sampleOrganizations,
    availableCategories: sampleCategories,
    onScopeChange: fn(),
    loading: false,
    readOnly: false,
    showPreview: true,
  },
  render: (args) => {
    const [scope, setScope] = useState<ScopeAssignment>(args.currentScope || { scopeType: 'none' });
    return (
      <div style={{ width: '700px' }}>
        <ScopeSelector
          {...args}
          currentScope={scope}
          onScopeChange={(newScope) => {
            setScope(newScope);
            args.onScopeChange?.(newScope);
          }}
        />
      </div>
    );
  },
};

// Full access
export const FullAccess: Story = {
  args: {
    userId: 'user-123',
    currentScope: { scopeType: 'all' },
    availableObjects: sampleResources,
    availableOrganizations: sampleOrganizations,
    availableCategories: sampleCategories,
    onScopeChange: fn(),
    loading: false,
    readOnly: false,
    showPreview: true,
  },
  render: (args) => {
    const [scope, setScope] = useState<ScopeAssignment>(args.currentScope || { scopeType: 'none' });
    return (
      <div style={{ width: '700px' }}>
        <ScopeSelector
          {...args}
          currentScope={scope}
          onScopeChange={(newScope) => {
            setScope(newScope);
            args.onScopeChange?.(newScope);
          }}
        />
      </div>
    );
  },
};

// Read-only mode
export const ReadOnly: Story = {
  args: {
    userId: 'user-123',
    currentScope: { scopeType: 'specific', resourceIds: ['obj-1'] },
    availableObjects: sampleResources,
    availableOrganizations: sampleOrganizations,
    availableCategories: sampleCategories,
    onScopeChange: fn(),
    loading: false,
    readOnly: true,
    showPreview: true,
  },
  render: (args) => (
    <div style={{ width: '700px' }}>
      <ScopeSelector {...args} />
    </div>
  ),
};

// Loading state
export const Loading: Story = {
  args: {
    userId: 'user-123',
    currentScope: { scopeType: 'none' },
    availableObjects: [],
    availableOrganizations: [],
    availableCategories: [],
    onScopeChange: fn(),
    loading: true,
    readOnly: false,
    showPreview: true,
  },
  render: (args) => (
    <div style={{ width: '700px' }}>
      <ScopeSelector {...args} />
    </div>
  ),
};

// Without preview
export const WithoutPreview: Story = {
  args: {
    userId: 'user-123',
    currentScope: { scopeType: 'specific', resourceIds: ['obj-1'] },
    availableObjects: sampleResources,
    availableOrganizations: sampleOrganizations,
    availableCategories: sampleCategories,
    onScopeChange: fn(),
    loading: false,
    readOnly: false,
    showPreview: false,
  },
  render: (args) => {
    const [scope, setScope] = useState<ScopeAssignment>(args.currentScope || { scopeType: 'none' });
    return (
      <div style={{ width: '700px' }}>
        <ScopeSelector
          {...args}
          currentScope={scope}
          onScopeChange={(newScope) => {
            setScope(newScope);
            args.onScopeChange?.(newScope);
          }}
        />
      </div>
    );
  },
};
