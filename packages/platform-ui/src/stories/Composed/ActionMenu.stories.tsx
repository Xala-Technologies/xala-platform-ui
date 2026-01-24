import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
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

// Hook to get sample items with translations
const useSampleItems = () => {
  const t = useT();
  return [
    {
      id: '1',
      label: t('platform.common.edit'),
      icon: <Edit size={16} />,
      onClick: fn(),
    },
    {
      id: '2',
      label: t('storybook.demo.duplicate'),
      icon: <Copy size={16} />,
      onClick: fn(),
    },
    {
      id: '3',
      label: t('storybook.demo.download'),
      icon: <Download size={16} />,
      onClick: fn(),
    },
    {
      id: '4',
      label: t('storybook.demo.share'),
      icon: <Share2 size={16} />,
      onClick: fn(),
    },
    {
      id: '5',
      label: t('platform.common.delete'),
      icon: <Trash2 size={16} />,
      onClick: fn(),
      danger: true,
    },
  ];
};

// Wrapper for default story
const DefaultDemo = () => {
  const sampleItems = useSampleItems();
  return (
    <ActionMenu
      trigger={
        <Button data-color="neutral" data-size="medium">
          <MoreVertical size={20} />
        </Button>
      }
      items={sampleItems}
    />
  );
};

// Basic action menu
export const Default: Story = {
  render: function Render() {
    return <DefaultDemo />;
  },
};

// Wrapper for groups story
const WithGroupsDemo = () => {
  const t = useT();
  return (
    <ActionMenu
      trigger={
        <Button data-color="neutral" data-size="medium">
          {t('storybook.demo.actions')}
        </Button>
      }
      groups={[
        {
          id: 'actions',
          label: t('storybook.demo.actions'),
          items: [
            { id: '1', label: t('platform.common.edit'), icon: <Edit size={16} />, onClick: fn() },
            {
              id: '2',
              label: t('storybook.demo.duplicate'),
              icon: <Copy size={16} />,
              onClick: fn(),
            },
          ],
        },
        {
          id: 'export',
          label: t('storybook.demo.export'),
          items: [
            {
              id: '3',
              label: t('storybook.demo.download'),
              icon: <Download size={16} />,
              onClick: fn(),
            },
            {
              id: '4',
              label: t('storybook.demo.share'),
              icon: <Share2 size={16} />,
              onClick: fn(),
            },
          ],
        },
        {
          id: 'danger',
          label: t('storybook.demo.dangerZone'),
          items: [
            {
              id: '5',
              label: t('platform.common.delete'),
              icon: <Trash2 size={16} />,
              onClick: fn(),
              danger: true,
            },
          ],
        },
      ]}
    />
  );
};

// With menu groups
export const WithGroups: Story = {
  render: function Render() {
    return <WithGroupsDemo />;
  },
};

// Wrapper for disabled items story
const WithDisabledDemo = () => {
  const t = useT();
  return (
    <ActionMenu
      trigger={
        <Button data-color="neutral" data-size="medium">
          {t('storybook.demo.actions')}
        </Button>
      }
      items={[
        { id: '1', label: t('platform.common.edit'), icon: <Edit size={16} />, onClick: fn() },
        {
          id: '2',
          label: t('storybook.demo.duplicate'),
          icon: <Copy size={16} />,
          onClick: fn(),
          disabled: true,
        },
        {
          id: '3',
          label: t('platform.common.delete'),
          icon: <Trash2 size={16} />,
          onClick: fn(),
          danger: true,
        },
      ]}
    />
  );
};

// With disabled items
export const WithDisabled: Story = {
  render: function Render() {
    return <WithDisabledDemo />;
  },
};

// Wrapper for shortcuts story
const WithShortcutsDemo = () => {
  const t = useT();
  return (
    <ActionMenu
      trigger={
        <Button data-color="neutral" data-size="medium">
          {t('storybook.demo.actions')}
        </Button>
      }
      items={[
        {
          id: '1',
          label: t('platform.common.edit'),
          icon: <Edit size={16} />,
          shortcut: '⌘E',
          onClick: fn(),
        },
        {
          id: '2',
          label: t('storybook.demo.duplicate'),
          icon: <Copy size={16} />,
          shortcut: '⌘D',
          onClick: fn(),
        },
        {
          id: '3',
          label: t('platform.common.delete'),
          icon: <Trash2 size={16} />,
          shortcut: '⌘⌫',
          onClick: fn(),
          danger: true,
        },
      ]}
    />
  );
};

// With shortcuts
export const WithShortcuts: Story = {
  render: function Render() {
    return <WithShortcutsDemo />;
  },
};

// Wrapper for bottom start story
const BottomStartDemo = () => {
  const t = useT();
  const sampleItems = useSampleItems();
  return (
    <ActionMenu
      trigger={
        <Button data-color="neutral" data-size="medium">
          {t('storybook.demo.bottomStart')}
        </Button>
      }
      items={sampleItems}
      side="bottom"
      align="start"
    />
  );
};

// Different alignments
export const BottomStart: Story = {
  render: function Render() {
    return <BottomStartDemo />;
  },
};

// Wrapper for bottom end story
const BottomEndDemo = () => {
  const t = useT();
  const sampleItems = useSampleItems();
  return (
    <ActionMenu
      trigger={
        <Button data-color="neutral" data-size="medium">
          {t('storybook.demo.bottomEnd')}
        </Button>
      }
      items={sampleItems}
      side="bottom"
      align="end"
    />
  );
};

export const BottomEnd: Story = {
  render: function Render() {
    return <BottomEndDemo />;
  },
};

// Wrapper for top start story
const TopStartDemo = () => {
  const t = useT();
  const sampleItems = useSampleItems();
  return (
    <div style={{ marginTop: '200px' }}>
      <ActionMenu
        trigger={
          <Button data-color="neutral" data-size="medium">
            {t('storybook.demo.topStart')}
          </Button>
        }
        items={sampleItems}
        side="top"
        align="start"
      />
    </div>
  );
};

export const TopStart: Story = {
  render: function Render() {
    return <TopStartDemo />;
  },
};

// Wrapper for disabled story
const DisabledDemo = () => {
  const t = useT();
  const sampleItems = useSampleItems();
  return (
    <ActionMenu
      trigger={
        <Button data-color="neutral" data-size="medium" disabled>
          {t('storybook.story.disabled')}
        </Button>
      }
      items={sampleItems}
      disabled={true}
    />
  );
};

// Disabled menu
export const Disabled: Story = {
  render: function Render() {
    return <DisabledDemo />;
  },
};

// Wrapper for context menu story
const ContextMenuExampleDemo = () => {
  const t = useT();
  const sampleItems = useSampleItems();
  return (
    <ContextMenu items={sampleItems}>
      <div
        style={{
          padding: 'var(--ds-spacing-8)',
          border: '1px dashed var(--ds-color-neutral-border-subtle)',
          borderRadius: 'var(--ds-border-radius-md)',
          textAlign: 'center',
          color: 'var(--ds-color-neutral-text-subtle)',
        }}
      >
        {t('storybook.demo.rightClickHere')}
      </div>
    </ContextMenu>
  );
};

// Context menu example
export const ContextMenuExample: Story = {
  render: function Render() {
    return <ContextMenuExampleDemo />;
  },
};
