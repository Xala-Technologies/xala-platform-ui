/**
 * FileTree Block
 *
 * File explorer tree view for navigating project files.
 * Supports expand/collapse, file icons, and selection.
 */
import React, { useState, useCallback } from 'react';
import { Paragraph } from '../primitives';
import { Stack } from '../primitives';
import { BookOpenIcon, ChevronRightIcon } from '../primitives/icons';

// ============================================================================
// Types
// ============================================================================

export type FileNodeType = 'file' | 'directory';

export interface FileNode {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Node type */
  type: FileNodeType;
  /** File extension (for files) */
  extension?: string;
  /** Children nodes (for directories) */
  children?: FileNode[];
  /** Whether directory is expanded */
  expanded?: boolean;
  /** Additional metadata */
  meta?: Record<string, unknown>;
}

export interface FileTreeProps {
  /** Root nodes */
  nodes: FileNode[];
  /** Currently selected node ID */
  selectedId?: string;
  /** Node selection handler */
  onSelect?: (node: FileNode) => void;
  /** Node expand/collapse handler */
  onToggle?: (node: FileNode, expanded: boolean) => void;
  /** Context menu handler */
  onContextMenu?: (node: FileNode, event: React.MouseEvent) => void;
  /** Show file icons */
  showIcons?: boolean;
  /** Indent size in pixels */
  indentSize?: number;
  /** Custom className */
  className?: string;
}

// ============================================================================
// File Icon Component
// ============================================================================

interface FileIconProps {
  extension?: string;
  size?: number;
}

function FileIcon({ extension: _extension, size = 14 }: FileIconProps) {
  // Use a simple document icon for all files
  // Extension parameter reserved for future file-type-specific icons
  return <BookOpenIcon size={size} />;
}

interface FolderIconProps {
  isOpen: boolean;
  size?: number;
}

function FolderIcon({ isOpen, size = 14 }: FolderIconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {isOpen ? (
        <path d="m6 14 1.5-2.9A2 2 0 0 1 9.24 10H20a2 2 0 0 1 1.94 2.5l-1.54 6a2 2 0 0 1-1.95 1.5H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h3.9a2 2 0 0 1 1.69.9l.81 1.2a2 2 0 0 0 1.67.9H18a2 2 0 0 1 2 2v2" />
      ) : (
        <>
          <path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z" />
        </>
      )}
    </svg>
  );
}

// ============================================================================
// TreeNode Component
// ============================================================================

interface TreeNodeProps {
  node: FileNode;
  depth: number;
  selectedId?: string;
  onSelect?: (node: FileNode) => void;
  onToggle?: (node: FileNode, expanded: boolean) => void;
  onContextMenu?: (node: FileNode, event: React.MouseEvent) => void;
  showIcons: boolean;
  indentSize: number;
}

function TreeNode({
  node,
  depth,
  selectedId,
  onSelect,
  onToggle,
  onContextMenu,
  showIcons,
  indentSize,
}: TreeNodeProps) {
  const [isExpanded, setIsExpanded] = useState(node.expanded ?? false);
  const isSelected = node.id === selectedId;
  const isDirectory = node.type === 'directory';
  const hasChildren = isDirectory && node.children && node.children.length > 0;

  const handleClick = useCallback(() => {
    if (isDirectory && hasChildren) {
      const newExpanded = !isExpanded;
      setIsExpanded(newExpanded);
      onToggle?.(node, newExpanded);
    }
    onSelect?.(node);
  }, [isDirectory, hasChildren, isExpanded, node, onSelect, onToggle]);

  const handleContextMenu = useCallback(
    (e: React.MouseEvent) => {
      e.preventDefault();
      onContextMenu?.(node, e);
    },
    [node, onContextMenu]
  );

  const nodeStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--ds-spacing-1)',
    padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
    paddingLeft: `${depth * indentSize + 8}px`,
    cursor: 'pointer',
    backgroundColor: isSelected ? 'var(--ds-color-accent-surface-hover)' : 'transparent',
    borderRadius: 'var(--ds-border-radius-sm)',
    userSelect: 'none',
  };

  return (
    <>
      <Stack
        direction="horizontal"
        align="center"
        style={nodeStyle}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        role="treeitem"
        aria-selected={isSelected}
        aria-expanded={isDirectory ? isExpanded : undefined}
      >
        {hasChildren && (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.15s ease',
            }}
          >
            <ChevronRightIcon size={12} />
          </span>
        )}
        {!hasChildren && isDirectory && <span style={{ width: '0.75rem' }} />}
        {showIcons && (
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {isDirectory ? (
              <FolderIcon isOpen={isExpanded} size={14} />
            ) : (
              <FileIcon extension={node.extension} size={14} />
            )}
          </span>
        )}
        <Paragraph data-size="sm" style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {node.name}
        </Paragraph>
      </Stack>

      {isExpanded && hasChildren && (
        <Stack role="group" direction="vertical">
          {node.children!.map((child) => (
            <TreeNode
              key={child.id}
              node={child}
              depth={depth + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              onToggle={onToggle}
              onContextMenu={onContextMenu}
              showIcons={showIcons}
              indentSize={indentSize}
            />
          ))}
        </Stack>
      )}
    </>
  );
}

// ============================================================================
// FileTree Component
// ============================================================================

export function FileTree({
  nodes,
  selectedId,
  onSelect,
  onToggle,
  onContextMenu,
  showIcons = true,
  indentSize = 16,
  className = '',
}: FileTreeProps) {
  return (
    <Stack
      role="tree"
      direction="vertical"
      className={className}
      style={{
        fontFamily: 'var(--ds-font-family-mono)',
        fontSize: 'var(--ds-font-size-sm)',
      }}
    >
      {nodes.map((node) => (
        <TreeNode
          key={node.id}
          node={node}
          depth={0}
          selectedId={selectedId}
          onSelect={onSelect}
          onToggle={onToggle}
          onContextMenu={onContextMenu}
          showIcons={showIcons}
          indentSize={indentSize}
        />
      ))}
    </Stack>
  );
}

export default FileTree;
