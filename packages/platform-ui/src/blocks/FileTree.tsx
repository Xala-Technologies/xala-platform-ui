/**
 * FileTree Block
 *
 * File explorer tree view for navigating project files.
 * Supports expand/collapse, file icons, and selection.
 */
import React, { useState, useCallback } from 'react';
import { Paragraph } from '@digdir/designsystemet-react';

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
// File Icons
// ============================================================================

const FILE_ICONS: Record<string, string> = {
  // Languages
  ts: '📘',
  tsx: '⚛️',
  js: '📒',
  jsx: '⚛️',
  py: '🐍',
  rs: '🦀',
  go: '🐹',
  java: '☕',
  rb: '💎',
  php: '🐘',
  // Config
  json: '📋',
  yaml: '📋',
  yml: '📋',
  toml: '📋',
  // Docs
  md: '📄',
  mdx: '📄',
  txt: '📝',
  // Styles
  css: '🎨',
  scss: '🎨',
  less: '🎨',
  // Other
  html: '🌐',
  svg: '🖼️',
  png: '🖼️',
  jpg: '🖼️',
  gif: '🖼️',
  // Default
  default: '📄',
};

const FOLDER_ICON_OPEN = '📂';
const FOLDER_ICON_CLOSED = '📁';

function getFileIcon(extension?: string): string {
  if (!extension) return FILE_ICONS.default;
  return FILE_ICONS[extension.toLowerCase()] || FILE_ICONS.default;
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
    gap: '0.375rem',
    padding: '0.25rem 0.5rem',
    paddingLeft: `${depth * indentSize + 8}px`,
    cursor: 'pointer',
    backgroundColor: isSelected ? 'var(--ds-color-accent-surface-hover)' : 'transparent',
    borderRadius: '0.25rem',
    userSelect: 'none',
  };

  const icon = showIcons
    ? isDirectory
      ? isExpanded
        ? FOLDER_ICON_OPEN
        : FOLDER_ICON_CLOSED
      : getFileIcon(node.extension)
    : null;

  return (
    <>
      <div
        style={nodeStyle}
        onClick={handleClick}
        onContextMenu={handleContextMenu}
        role="treeitem"
        aria-selected={isSelected}
        aria-expanded={isDirectory ? isExpanded : undefined}
      >
        {hasChildren && (
          <span style={{ fontSize: '0.625rem', opacity: 0.6 }}>{isExpanded ? '▼' : '▶'}</span>
        )}
        {!hasChildren && isDirectory && <span style={{ width: '0.625rem' }} />}
        {icon && <span style={{ fontSize: '1rem' }}>{icon}</span>}
        <Paragraph data-size="sm" style={{ flex: 1, overflow: 'hidden', textOverflow: 'ellipsis' }}>
          {node.name}
        </Paragraph>
      </div>

      {isExpanded && hasChildren && (
        <div role="group">
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
        </div>
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
    <div
      role="tree"
      className={className}
      style={{
        fontFamily: 'var(--ds-font-family-mono)',
        fontSize: '0.875rem',
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
    </div>
  );
}

export default FileTree;
