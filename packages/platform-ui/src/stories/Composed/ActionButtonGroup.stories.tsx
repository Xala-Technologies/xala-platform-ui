import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { ActionButtonGroup, TableActions } from '../../composed/ActionButtonGroup';
import { Button } from '@digdir/designsystemet-react';

const meta: Meta<typeof ActionButtonGroup> = {
  title: 'Composed/ActionButtonGroup',
  component: ActionButtonGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ActionButtonGroup

Consistent action buttons for tables and lists. Provides standardized view, edit, delete actions with proper styling.

### Features
- Multiple action types (view, edit, delete, duplicate, archive, restore, download, share)
- Size variants (sm, md, lg)
- Display variants (icon, text, icon-text)
- Loading states
- Disabled states
- Tooltip support

### Usage
\`\`\`tsx
<ActionButtonGroup
  actions={[
    { type: 'view', onClick: handleView },
    { type: 'edit', onClick: handleEdit },
    { type: 'delete', onClick: handleDelete },
  ]}
  size="sm"
  variant="icon"
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onView: fn(),
    onEdit: fn(),
    onDelete: fn(),
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Button size',
    },
    variant: {
      control: 'select',
      options: ['icon', 'text', 'icon-text'],
      description: 'Display variant',
    },
    alignment: {
      control: 'select',
      options: ['left', 'center', 'right'],
      description: 'Button alignment',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic icon variant
export const IconVariant: Story = {
  args: {
    actions: [
      { type: 'view', onClick: fn() },
      { type: 'edit', onClick: fn() },
      { type: 'delete', onClick: fn() },
    ],
    size: 'sm',
    variant: 'icon',
    alignment: 'right',
  },
};

// Text variant
export const TextVariant: Story = {
  args: {
    actions: [
      { type: 'view', onClick: fn() },
      { type: 'edit', onClick: fn() },
      { type: 'delete', onClick: fn() },
    ],
    size: 'sm',
    variant: 'text',
    alignment: 'right',
  },
};

// Icon and text variant
export const IconTextVariant: Story = {
  args: {
    actions: [
      { type: 'view', onClick: fn() },
      { type: 'edit', onClick: fn() },
      { type: 'delete', onClick: fn() },
    ],
    size: 'sm',
    variant: 'icon-text',
    alignment: 'right',
  },
};

// All action types
export const AllActions: Story = {
  args: {
    actions: [
      { type: 'view', onClick: fn() },
      { type: 'edit', onClick: fn() },
      { type: 'delete', onClick: fn() },
      { type: 'duplicate', onClick: fn() },
      { type: 'archive', onClick: fn() },
      { type: 'restore', onClick: fn() },
      { type: 'download', onClick: fn() },
      { type: 'share', onClick: fn() },
    ],
    size: 'sm',
    variant: 'icon',
    alignment: 'right',
  },
};

// With disabled actions
export const WithDisabled: Story = {
  args: {
    actions: [
      { type: 'view', onClick: fn(), disabled: false },
      { type: 'edit', onClick: fn(), disabled: true },
      { type: 'delete', onClick: fn(), disabled: false },
    ],
    size: 'sm',
    variant: 'icon',
    alignment: 'right',
  },
};

// With loading state
export const WithLoading: Story = {
  args: {
    actions: [
      { type: 'view', onClick: fn(), loading: false },
      { type: 'edit', onClick: fn(), loading: true },
      { type: 'delete', onClick: fn(), loading: false },
    ],
    size: 'sm',
    variant: 'icon',
    alignment: 'right',
  },
};

// Medium size
export const MediumSize: Story = {
  args: {
    actions: [
      { type: 'view', onClick: fn() },
      { type: 'edit', onClick: fn() },
      { type: 'delete', onClick: fn() },
    ],
    size: 'md',
    variant: 'icon',
    alignment: 'right',
  },
};

// Large size
export const LargeSize: Story = {
  args: {
    actions: [
      { type: 'view', onClick: fn() },
      { type: 'edit', onClick: fn() },
      { type: 'delete', onClick: fn() },
    ],
    size: 'lg',
    variant: 'icon',
    alignment: 'right',
  },
};

// Left alignment
export const LeftAlignment: Story = {
  args: {
    actions: [
      { type: 'view', onClick: fn() },
      { type: 'edit', onClick: fn() },
      { type: 'delete', onClick: fn() },
    ],
    size: 'sm',
    variant: 'icon',
    alignment: 'left',
  },
};

// Center alignment
export const CenterAlignment: Story = {
  args: {
    actions: [
      { type: 'view', onClick: fn() },
      { type: 'edit', onClick: fn() },
      { type: 'delete', onClick: fn() },
    ],
    size: 'sm',
    variant: 'icon',
    alignment: 'center',
  },
};

// With hidden actions
export const WithHidden: Story = {
  args: {
    actions: [
      { type: 'view', onClick: fn(), hidden: false },
      { type: 'edit', onClick: fn(), hidden: true },
      { type: 'delete', onClick: fn(), hidden: false },
    ],
    size: 'sm',
    variant: 'icon',
    alignment: 'right',
  },
};

// TableActions convenience component
export const TableActionsExample: Story = {
  render: function Render() {
    return (
      <TableActions
        onView={fn()}
        onEdit={fn()}
        onDelete={fn()}
        showView={true}
        showEdit={true}
        showDelete={true}
        size="sm"
      />
    );
  },
};
