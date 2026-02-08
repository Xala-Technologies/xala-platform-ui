import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { FileTree, type FileNode } from '../../index';

/**
 * FileTree provides a file explorer tree view for navigating project files.
 *
 * ## Features
 * - Expand/collapse directories
 * - File icons
 * - Node selection
 * - Context menu support
 * - Customizable indentation
 *
 * ## When to Use
 * - File explorers
 * - Project navigation
 * - Code editors
 */
const meta: Meta<typeof FileTree> = {
  title: 'Blocks/FileTree',
  component: FileTree,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
FileTree provides a file explorer tree view for navigating project files.

## Features
- Expand/collapse directories
- File icons
- Node selection
- Context menu support
- Customizable indentation

## When to Use
- File explorers
- Project navigation
- Code editors
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FileTree>;

// Sample file tree data
const useSampleTree = (): FileNode[] => {
  const t = useT();
  return [
    {
      id: 'src',
      name: 'src',
      type: 'directory',
      children: [
        {
          id: 'components',
          name: 'components',
          type: 'directory',
          children: [
            { id: 'Button.tsx', name: 'Button.tsx', type: 'file', extension: 'tsx' },
            { id: 'Input.tsx', name: 'Input.tsx', type: 'file', extension: 'tsx' },
            { id: 'Card.tsx', name: 'Card.tsx', type: 'file', extension: 'tsx' },
          ],
        },
        {
          id: 'utils',
          name: 'utils',
          type: 'directory',
          children: [
            { id: 'helpers.ts', name: 'helpers.ts', type: 'file', extension: 'ts' },
            { id: 'constants.ts', name: 'constants.ts', type: 'file', extension: 'ts' },
          ],
        },
        { id: 'index.ts', name: 'index.ts', type: 'file', extension: 'ts' },
      ],
    },
    {
      id: 'public',
      name: 'public',
      type: 'directory',
      children: [
        { id: 'favicon.ico', name: 'favicon.ico', type: 'file', extension: 'ico' },
        { id: 'logo.svg', name: 'logo.svg', type: 'file', extension: 'svg' },
      ],
    },
    { id: 'package.json', name: 'package.json', type: 'file', extension: 'json' },
    { id: 'README.md', name: 'README.md', type: 'file', extension: 'md' },
  ];
};

/**
 * Default file tree
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
    const nodes = useSampleTree();
    return (
      <div style={{ width: '300px', padding: 'var(--ds-spacing-4)' }}>
        <FileTree
          nodes={nodes}
          selectedId={selectedId}
          onSelect={(node) => {
            setSelectedId(node.id);
            console.log('Selected:', node);
          }}
        />
      </div>
    );
  },
};

/**
 * File tree with initially expanded directories
 */
export const InitiallyExpanded: Story = {
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
    const nodes: FileNode[] = [
      {
        id: 'src',
        name: 'src',
        type: 'directory',
        expanded: true,
        children: [
          {
            id: 'components',
            name: 'components',
            type: 'directory',
            expanded: true,
            children: [
              { id: 'Button.tsx', name: 'Button.tsx', type: 'file', extension: 'tsx' },
              { id: 'Input.tsx', name: 'Input.tsx', type: 'file', extension: 'tsx' },
            ],
          },
        ],
      },
    ];
    return (
      <div style={{ width: '300px', padding: 'var(--ds-spacing-4)' }}>
        <FileTree
          nodes={nodes}
          selectedId={selectedId}
          onSelect={(node) => {
            setSelectedId(node.id);
            console.log('Selected:', node);
          }}
        />
      </div>
    );
  },
};

/**
 * File tree without icons
 */
export const WithoutIcons: Story = {
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
    const nodes = useSampleTree();
    return (
      <div style={{ width: '300px', padding: 'var(--ds-spacing-4)' }}>
        <FileTree
          nodes={nodes}
          selectedId={selectedId}
          showIcons={false}
          onSelect={(node) => {
            setSelectedId(node.id);
            console.log('Selected:', node);
          }}
        />
      </div>
    );
  },
};

/**
 * File tree with custom indent
 */
export const CustomIndent: Story = {
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
    const nodes = useSampleTree();
    return (
      <div style={{ width: '300px', padding: 'var(--ds-spacing-4)' }}>
        <FileTree
          nodes={nodes}
          selectedId={selectedId}
          indentSize={20}
          onSelect={(node) => {
            setSelectedId(node.id);
            console.log('Selected:', node);
          }}
        />
      </div>
    );
  },
};

/**
 * File tree with context menu
 */
export const WithContextMenu: Story = {
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string | undefined>(undefined);
    const nodes = useSampleTree();
    return (
      <div style={{ width: '300px', padding: 'var(--ds-spacing-4)' }}>
        <FileTree
          nodes={nodes}
          selectedId={selectedId}
          onSelect={(node) => {
            setSelectedId(node.id);
            console.log('Selected:', node);
          }}
          onContextMenu={(node, event) => {
            event.preventDefault();
            console.log('Context menu:', node);
          }}
        />
      </div>
    );
  },
};
