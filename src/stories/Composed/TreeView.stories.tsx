import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { TreeView, type TreeNode } from '../../index';
import { FolderIcon, FileIcon, HomeIcon, SettingsIcon } from '../../index';

/**
 * TreeView provides hierarchical navigation with collapsible nodes.
 *
 * ## Features
 * - Collapsible tree structure
 * - Node selection
 * - Custom icons
 * - Size variants
 * - Expand/collapse controls
 *
 * ## When to Use
 * - Sidebar navigation
 * - File explorers
 * - Story catalogs
 * - Hierarchical data display
 */
const meta: Meta<typeof TreeView> = {
  title: 'Composed/TreeView',
  component: TreeView,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
TreeView provides hierarchical navigation with collapsible nodes.

## Features
- Collapsible tree structure
- Node selection
- Custom icons per node
- Size variants (sm, md, lg)
- Expand/collapse controls
- Expand on label click option

## When to Use
- Sidebar navigation
- File explorers
- Story catalogs
- Hierarchical data display
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof TreeView>;

// Sample tree data
const useSampleTree = (): TreeNode[] => {
  const t = useT();
  return [
    {
      id: 'components',
      label: t('storybook.treeView.components'),
      icon: <FolderIcon size={16} />,
      children: [
        { id: 'button', label: t('storybook.treeView.button'), icon: <FileIcon size={16} /> },
        { id: 'input', label: t('storybook.treeView.input'), icon: <FileIcon size={16} /> },
        { id: 'card', label: t('storybook.treeView.card'), icon: <FileIcon size={16} /> },
      ],
    },
    {
      id: 'patterns',
      label: t('storybook.treeView.patterns'),
      icon: <FolderIcon size={16} />,
      children: [
        { id: 'form', label: t('storybook.treeView.form'), icon: <FileIcon size={16} /> },
        { id: 'modal', label: t('storybook.treeView.modal'), icon: <FileIcon size={16} /> },
      ],
    },
    {
      id: 'pages',
      label: t('storybook.treeView.pages'),
      icon: <FolderIcon size={16} />,
      children: [
        { id: 'home', label: t('storybook.treeView.home'), icon: <HomeIcon size={16} /> },
        {
          id: 'settings',
          label: t('storybook.treeView.settings'),
          icon: <SettingsIcon size={16} />,
        },
      ],
    },
  ];
};

/**
 * Default tree view
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const nodes = useSampleTree();
    return (
      <div style={{ width: '300px', padding: 'var(--ds-spacing-4)' }}>
        <TreeView
          nodes={nodes}
          selectedId={selectedId}
          onSelect={(id) => {
            setSelectedId(id);
            console.log('Selected:', id);
          }}
          ariaLabel={t('storybook.treeView.navigationTree')}
        />
      </div>
    );
  },
};

/**
 * Tree view with initially expanded nodes
 */
export const InitiallyExpanded: Story = {
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const nodes = useSampleTree();
    return (
      <div style={{ width: '300px', padding: 'var(--ds-spacing-4)' }}>
        <TreeView
          nodes={nodes}
          defaultExpandedIds={['components', 'patterns']}
          selectedId={selectedId}
          onSelect={(id) => {
            setSelectedId(id);
            console.log('Selected:', id);
          }}
          ariaLabel={t('storybook.treeView.navigationTree')}
        />
      </div>
    );
  },
};

/**
 * Small size variant
 */
export const Small: Story = {
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const nodes = useSampleTree();
    return (
      <div style={{ width: '250px', padding: 'var(--ds-spacing-4)' }}>
        <TreeView
          nodes={nodes}
          size="sm"
          selectedId={selectedId}
          onSelect={(id) => {
            setSelectedId(id);
            console.log('Selected:', id);
          }}
          ariaLabel={t('storybook.treeView.navigationTree')}
        />
      </div>
    );
  },
};

/**
 * Large size variant
 */
export const Large: Story = {
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const nodes = useSampleTree();
    return (
      <div style={{ width: '400px', padding: 'var(--ds-spacing-4)' }}>
        <TreeView
          nodes={nodes}
          size="lg"
          selectedId={selectedId}
          onSelect={(id) => {
            setSelectedId(id);
            console.log('Selected:', id);
          }}
          ariaLabel={t('storybook.treeView.navigationTree')}
        />
      </div>
    );
  },
};

/**
 * Tree view without icons
 */
export const WithoutIcons: Story = {
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const nodes = useSampleTree();
    return (
      <div style={{ width: '300px', padding: 'var(--ds-spacing-4)' }}>
        <TreeView
          nodes={nodes}
          showIcons={false}
          selectedId={selectedId}
          onSelect={(id) => {
            setSelectedId(id);
            console.log('Selected:', id);
          }}
          ariaLabel={t('storybook.treeView.navigationTree')}
        />
      </div>
    );
  },
};

/**
 * Tree view with deep nesting
 */
export const DeepNesting: Story = {
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const deepNodes: TreeNode[] = [
      {
        id: 'level1',
        label: t('storybook.treeView.level1'),
        icon: <FolderIcon size={16} />,
        children: [
          {
            id: 'level2',
            label: t('storybook.treeView.level2'),
            icon: <FolderIcon size={16} />,
            children: [
              {
                id: 'level3',
                label: t('storybook.treeView.level3'),
                icon: <FolderIcon size={16} />,
                children: [
                  {
                    id: 'level4',
                    label: t('storybook.treeView.level4'),
                    icon: <FileIcon size={16} />,
                  },
                ],
              },
            ],
          },
        ],
      },
    ];
    return (
      <div style={{ width: '300px', padding: 'var(--ds-spacing-4)' }}>
        <TreeView
          nodes={deepNodes}
          selectedId={selectedId}
          onSelect={(id) => {
            setSelectedId(id);
            console.log('Selected:', id);
          }}
          ariaLabel={t('storybook.treeView.navigationTree')}
        />
      </div>
    );
  },
};

/**
 * Tree view with disabled nodes
 */
export const WithDisabledNodes: Story = {
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const nodes: TreeNode[] = [
      {
        id: 'components',
        label: t('storybook.treeView.components'),
        icon: <FolderIcon size={16} />,
        children: [
          { id: 'button', label: t('storybook.treeView.button'), icon: <FileIcon size={16} /> },
          {
            id: 'input',
            label: t('storybook.treeView.input'),
            icon: <FileIcon size={16} />,
            disabled: true,
          },
          { id: 'card', label: t('storybook.treeView.card'), icon: <FileIcon size={16} /> },
        ],
      },
      {
        id: 'disabled-folder',
        label: t('storybook.treeView.disabledFolder'),
        icon: <FolderIcon size={16} />,
        disabled: true,
        children: [
          {
            id: 'disabled-item',
            label: t('storybook.treeView.disabledItem'),
            icon: <FileIcon size={16} />,
          },
        ],
      },
    ];
    return (
      <div style={{ width: '300px', padding: 'var(--ds-spacing-4)' }}>
        <TreeView
          nodes={nodes}
          selectedId={selectedId}
          onSelect={(id) => {
            setSelectedId(id);
            console.log('Selected:', id);
          }}
          ariaLabel={t('storybook.treeView.navigationTree')}
        />
      </div>
    );
  },
};
