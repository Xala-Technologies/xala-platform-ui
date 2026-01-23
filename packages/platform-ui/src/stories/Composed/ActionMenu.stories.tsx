import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ActionMenu, ContextMenu } from '../../composed/ActionMenu';
import { Button } from '@digdir/designsystemet-react';
import { MoreVertical, Edit, Trash2, Copy, Download, Share2 } from 'lucide-react';

const meta: Meta<typeof ActionMenu> = {
  title: 'Composed/ActionMenu',
  component: ActionMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ActionMenu & ContextMenu

Dropdown menus for actions and context menus. Supports keyboard navigation and proper accessibility.

### Features
- Dropdown menu with trigger
- Context menu (right-click)
- Menu groups for organization
- Keyboard navigation (Arrow keys, Enter, Escape)
- Icon and shortcut support
- Disabled items
- Danger items styling

### Usage
\`\`\`tsx
<ActionMenu
  trigger={<Button>Actions</Button>}
  items={[
    { id: '1', label: 'Edit', icon: <EditIcon />, onClick: handleEdit },
    { id: '2', label: 'Delete', icon: <DeleteIcon />, onClick: handleDelete, danger: true },
  ]}
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

// Sample menu items
const sampleItems = [
  {
    id: '1',
    label: 'Edit',
    icon: <Edit size={16} />,
    onClick: fn(),
  },
  {
    id: '2',
    label: 'Duplicate',
    icon: <Copy size={16} />,
    onClick: fn(),
  },
  {
    id: '3',
    label: 'Download',
    icon: <Download size={16} />,
    onClick: fn(),
  },
  {
    id: '4',
    label: 'Share',
    icon: <Share2 size={16} />,
    onClick: fn(),
  },
  {
    id: '5',
    label: 'Delete',
    icon: <Trash2 size={16} />,
    onClick: fn(),
    danger: true,
  },
];

// Basic action menu
export const Default: Story = {
  render: () => (
    <ActionMenu
      trigger={
        <Button data-color="neutral" data-size="medium">
          <MoreVertical size={20} />
        </Button>
      }
      items={sampleItems}
    />
  ),
};

// With menu groups
export const WithGroups: Story = {
  render: () => (
    <ActionMenu
      trigger={
        <Button data-color="neutral" data-size="medium">
          Actions
        </Button>
      }
      groups={[
        {
          id: 'actions',
          label: 'Actions',
          items: [
            { id: '1', label: 'Edit', icon: <Edit size={16} />, onClick: fn() },
            { id: '2', label: 'Duplicate', icon: <Copy size={16} />, onClick: fn() },
          ],
        },
        {
          id: 'export',
          label: 'Export',
          items: [
            { id: '3', label: 'Download', icon: <Download size={16} />, onClick: fn() },
            { id: '4', label: 'Share', icon: <Share2 size={16} />, onClick: fn() },
          ],
        },
        {
          id: 'danger',
          label: 'Danger Zone',
          items: [
            { id: '5', label: 'Delete', icon: <Trash2 size={16} />, onClick: fn(), danger: true },
          ],
        },
      ]}
    />
  ),
};

// With disabled items
export const WithDisabled: Story = {
  render: () => (
    <ActionMenu
      trigger={
        <Button data-color="neutral" data-size="medium">
          Actions
        </Button>
      }
      items={[
        { id: '1', label: 'Edit', icon: <Edit size={16} />, onClick: fn() },
        { id: '2', label: 'Duplicate', icon: <Copy size={16} />, onClick: fn(), disabled: true },
        { id: '3', label: 'Delete', icon: <Trash2 size={16} />, onClick: fn(), danger: true },
      ]}
    />
  ),
};

// With shortcuts
export const WithShortcuts: Story = {
  render: () => (
    <ActionMenu
      trigger={
        <Button data-color="neutral" data-size="medium">
          Actions
        </Button>
      }
      items={[
        { id: '1', label: 'Edit', icon: <Edit size={16} />, shortcut: '⌘E', onClick: fn() },
        { id: '2', label: 'Duplicate', icon: <Copy size={16} />, shortcut: '⌘D', onClick: fn() },
        { id: '3', label: 'Delete', icon: <Trash2 size={16} />, shortcut: '⌘⌫', onClick: fn(), danger: true },
      ]}
    />
  ),
};

// Different alignments
export const BottomStart: Story = {
  render: () => (
    <ActionMenu
      trigger={
        <Button data-color="neutral" data-size="medium">
          Bottom Start
        </Button>
      }
      items={sampleItems}
      side="bottom"
      align="start"
    />
  ),
};

export const BottomEnd: Story = {
  render: () => (
    <ActionMenu
      trigger={
        <Button data-color="neutral" data-size="medium">
          Bottom End
        </Button>
      }
      items={sampleItems}
      side="bottom"
      align="end"
    />
  ),
};

export const TopStart: Story = {
  render: () => (
    <div style={{ marginTop: '200px' }}>
      <ActionMenu
        trigger={
          <Button data-color="neutral" data-size="medium">
            Top Start
          </Button>
        }
        items={sampleItems}
        side="top"
        align="start"
      />
    </div>
  ),
};

// Disabled menu
export const Disabled: Story = {
  render: () => (
    <ActionMenu
      trigger={
        <Button data-color="neutral" data-size="medium" disabled>
          Disabled
        </Button>
      }
      items={sampleItems}
      disabled={true}
    />
  ),
};

// Context menu example
export const ContextMenuExample: Story = {
  render: () => (
    <ContextMenu
      items={sampleItems}
    >
      <div
        style={{
          padding: 'var(--ds-spacing-8)',
          border: '1px dashed var(--ds-color-neutral-border-subtle)',
          borderRadius: 'var(--ds-border-radius-md)',
          textAlign: 'center',
          color: 'var(--ds-color-neutral-text-subtle)',
        }}
      >
        Right-click here to open context menu
      </div>
    </ContextMenu>
  ),
};
