/**
 * TreeView - Hierarchical navigation component
 *
 * A collapsible tree structure suitable for sidebar navigation,
 * file explorers, and story catalogs (Storybook-like).
 */

import { useState, useCallback, useMemo, createContext, useContext, type ReactNode } from 'react';
import { Paragraph, Button } from '../primitives';
import {
  ChevronDownIcon,
  ChevronRightIcon,
  FolderIcon,
  FolderOpenIcon,
  FileIcon,
} from 'lucide-react';

/**
 * Tree node data structure
 */
export interface TreeNode {
  /** Unique node identifier */
  id: string;
  /** Display label */
  label: string;
  /** Optional icon (React node or component) */
  icon?: ReactNode;
  /** Child nodes */
  children?: TreeNode[];
  /** Whether node is disabled */
  disabled?: boolean;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * TreeView context for managing expanded/selected state
 */
interface TreeViewContextValue {
  /** Currently expanded node IDs */
  expandedIds: Set<string>;
  /** Currently selected node ID */
  selectedId: string | null;
  /** Toggle node expansion */
  toggleExpanded: (id: string) => void;
  /** Expand a node */
  expand: (id: string) => void;
  /** Collapse a node */
  collapse: (id: string) => void;
  /** Expand all nodes */
  expandAll: () => void;
  /** Collapse all nodes */
  collapseAll: () => void;
  /** Select a node */
  selectNode: (id: string) => void;
  /** Size variant */
  size: 'sm' | 'md' | 'lg';
  /** Whether to show icons */
  showIcons: boolean;
  /** Whether folders are expandable on label click */
  expandOnLabelClick: boolean;
}

const TreeViewContext = createContext<TreeViewContextValue | null>(null);

function useTreeViewContext() {
  const context = useContext(TreeViewContext);
  if (!context) {
    throw new Error('TreeView components must be used within a TreeView');
  }
  return context;
}

/**
 * Collect all node IDs from tree (for expand all)
 */
function collectAllIds(nodes: TreeNode[]): string[] {
  const ids: string[] = [];
  function traverse(node: TreeNode) {
    ids.push(node.id);
    node.children?.forEach(traverse);
  }
  nodes.forEach(traverse);
  return ids;
}

/**
 * TreeView Props
 */
export interface TreeViewProps {
  /** Tree data structure */
  nodes: TreeNode[];
  /** Initially expanded node IDs */
  defaultExpandedIds?: string[];
  /** Controlled expanded node IDs */
  expandedIds?: string[];
  /** Callback when expansion changes */
  onExpandedChange?: (expandedIds: string[]) => void;
  /** Currently selected node ID */
  selectedId?: string | null;
  /** Callback when selection changes */
  onSelect?: (nodeId: string, node: TreeNode) => void;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Whether to show folder/file icons */
  showIcons?: boolean;
  /** Whether clicking label expands folders (vs just chevron) */
  expandOnLabelClick?: boolean;
  /** Aria label for the tree */
  ariaLabel?: string;
  /** Additional class name */
  className?: string;
}

/**
 * TreeView Component
 *
 * @example
 * ```tsx
 * const nodes: TreeNode[] = [
 *   {
 *     id: 'components',
 *     label: 'Components',
 *     children: [
 *       { id: 'button', label: 'Button' },
 *       { id: 'input', label: 'Input' },
 *     ],
 *   },
 * ];
 *
 * <TreeView
 *   nodes={nodes}
 *   selectedId={selectedId}
 *   onSelect={(id, node) => setSelectedId(id)}
 * />
 * ```
 */
export function TreeView({
  nodes,
  defaultExpandedIds = [],
  expandedIds: controlledExpandedIds,
  onExpandedChange,
  selectedId: controlledSelectedId = null,
  onSelect,
  size = 'md',
  showIcons = true,
  expandOnLabelClick = true,
  ariaLabel = 'Navigation tree',
  className,
}: TreeViewProps) {
  // Internal state for uncontrolled mode
  const [internalExpanded, setInternalExpanded] = useState<Set<string>>(
    () => new Set(defaultExpandedIds)
  );
  const [internalSelected, setInternalSelected] = useState<string | null>(controlledSelectedId);

  // Use controlled or uncontrolled state
  const expandedIds = useMemo(
    () => (controlledExpandedIds ? new Set(controlledExpandedIds) : internalExpanded),
    [controlledExpandedIds, internalExpanded]
  );
  const selectedId = controlledSelectedId ?? internalSelected;

  const updateExpanded = useCallback(
    (newSet: Set<string>) => {
      if (!controlledExpandedIds) {
        setInternalExpanded(newSet);
      }
      onExpandedChange?.(Array.from(newSet));
    },
    [controlledExpandedIds, onExpandedChange]
  );

  const toggleExpanded = useCallback(
    (id: string) => {
      const newSet = new Set(expandedIds);
      if (newSet.has(id)) {
        newSet.delete(id);
      } else {
        newSet.add(id);
      }
      updateExpanded(newSet);
    },
    [expandedIds, updateExpanded]
  );

  const expand = useCallback(
    (id: string) => {
      const newSet = new Set(expandedIds);
      newSet.add(id);
      updateExpanded(newSet);
    },
    [expandedIds, updateExpanded]
  );

  const collapse = useCallback(
    (id: string) => {
      const newSet = new Set(expandedIds);
      newSet.delete(id);
      updateExpanded(newSet);
    },
    [expandedIds, updateExpanded]
  );

  const expandAll = useCallback(() => {
    const allIds = collectAllIds(nodes);
    updateExpanded(new Set(allIds));
  }, [nodes, updateExpanded]);

  const collapseAll = useCallback(() => {
    updateExpanded(new Set());
  }, [updateExpanded]);

  const selectNode = useCallback(
    (id: string) => {
      if (!controlledSelectedId) {
        setInternalSelected(id);
      }
      const node = findNodeById(nodes, id);
      if (node) {
        onSelect?.(id, node);
      }
    },
    [controlledSelectedId, nodes, onSelect]
  );

  const contextValue: TreeViewContextValue = useMemo(
    () => ({
      expandedIds,
      selectedId,
      toggleExpanded,
      expand,
      collapse,
      expandAll,
      collapseAll,
      selectNode,
      size,
      showIcons,
      expandOnLabelClick,
    }),
    [
      expandedIds,
      selectedId,
      toggleExpanded,
      expand,
      collapse,
      expandAll,
      collapseAll,
      selectNode,
      size,
      showIcons,
      expandOnLabelClick,
    ]
  );

  return (
    <TreeViewContext.Provider value={contextValue}>
      <nav
        aria-label={ariaLabel}
        className={className}
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '100%',
        }}
      >
        <ul
          role="tree"
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {nodes.map((node) => (
            <TreeNodeItem key={node.id} node={node} level={0} />
          ))}
        </ul>
      </nav>
    </TreeViewContext.Provider>
  );
}

/**
 * Find a node by ID in the tree
 */
function findNodeById(nodes: TreeNode[], id: string): TreeNode | undefined {
  for (const node of nodes) {
    if (node.id === id) return node;
    if (node.children) {
      const found = findNodeById(node.children, id);
      if (found) return found;
    }
  }
  return undefined;
}

/**
 * Size-based styling
 */
const sizeStyles = {
  sm: {
    padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
    fontSize: 'var(--ds-font-size-xs)',
    iconSize: 14,
    indent: 16,
  },
  md: {
    padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
    fontSize: 'var(--ds-font-size-sm)',
    iconSize: 16,
    indent: 20,
  },
  lg: {
    padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
    fontSize: 'var(--ds-font-size-md)',
    iconSize: 18,
    indent: 24,
  },
};

/**
 * TreeNodeItem Props
 */
interface TreeNodeItemProps {
  node: TreeNode;
  level: number;
}

/**
 * Individual tree node component
 */
function TreeNodeItem({ node, level }: TreeNodeItemProps) {
  const {
    expandedIds,
    selectedId,
    toggleExpanded,
    selectNode,
    size,
    showIcons,
    expandOnLabelClick,
  } = useTreeViewContext();

  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedIds.has(node.id);
  const isSelected = selectedId === node.id;
  const styles = sizeStyles[size];

  const handleChevronClick = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      if (hasChildren) {
        toggleExpanded(node.id);
      }
    },
    [hasChildren, node.id, toggleExpanded]
  );

  const handleLabelClick = useCallback(() => {
    if (hasChildren && expandOnLabelClick) {
      toggleExpanded(node.id);
    }
    selectNode(node.id);
  }, [hasChildren, expandOnLabelClick, node.id, selectNode, toggleExpanded]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      switch (e.key) {
        case 'Enter':
        case ' ':
          e.preventDefault();
          handleLabelClick();
          break;
        case 'ArrowRight':
          if (hasChildren && !isExpanded) {
            e.preventDefault();
            toggleExpanded(node.id);
          }
          break;
        case 'ArrowLeft':
          if (hasChildren && isExpanded) {
            e.preventDefault();
            toggleExpanded(node.id);
          }
          break;
      }
    },
    [handleLabelClick, hasChildren, isExpanded, node.id, toggleExpanded]
  );

  // Determine which icon to show
  const getIcon = () => {
    if (node.icon) return node.icon;
    if (!showIcons) return null;
    if (hasChildren) {
      return isExpanded ? (
        <FolderOpenIcon
          size={styles.iconSize}
          style={{ color: 'var(--ds-color-accent-base-default)' }}
        />
      ) : (
        <FolderIcon
          size={styles.iconSize}
          style={{ color: 'var(--ds-color-neutral-text-subtle)' }}
        />
      );
    }
    return (
      <FileIcon size={styles.iconSize} style={{ color: 'var(--ds-color-neutral-text-subtle)' }} />
    );
  };

  return (
    <li
      role="treeitem"
      aria-expanded={hasChildren ? isExpanded : undefined}
      aria-selected={isSelected}
      style={{ margin: 0, padding: 0 }}
    >
      <Button
        variant="tertiary"
        data-size={size}
        onClick={handleLabelClick}
        onKeyDown={handleKeyDown}
        disabled={node.disabled}
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          padding: styles.padding,
          paddingLeft: `calc(${level * styles.indent}px + ${styles.padding.split(' ')[1]})`,
          textAlign: 'left',
          justifyContent: 'flex-start',
          gap: 'var(--ds-spacing-2)',
          backgroundColor: isSelected ? 'var(--ds-color-accent-surface-default)' : 'transparent',
          borderLeft: isSelected
            ? '3px solid var(--ds-color-accent-base-default)'
            : '3px solid transparent',
          borderRadius: 0,
          color: isSelected
            ? 'var(--ds-color-accent-text-default)'
            : node.disabled
              ? 'var(--ds-color-neutral-text-subtle)'
              : 'var(--ds-color-neutral-text-default)',
          fontWeight: isSelected
            ? 'var(--ds-font-weight-semibold)'
            : 'var(--ds-font-weight-regular)',
          cursor: node.disabled ? 'not-allowed' : 'pointer',
          opacity: node.disabled ? 0.5 : 1,
        }}
        tabIndex={0}
      >
        {/* Chevron for expandable nodes */}
        {hasChildren ? (
          <span
            onClick={handleChevronClick}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: styles.iconSize,
              height: styles.iconSize,
              flexShrink: 0,
              cursor: 'pointer',
            }}
            role="button"
            aria-label={isExpanded ? 'Collapse' : 'Expand'}
          >
            {isExpanded ? (
              <ChevronDownIcon size={styles.iconSize} />
            ) : (
              <ChevronRightIcon size={styles.iconSize} />
            )}
          </span>
        ) : (
          <span style={{ width: styles.iconSize, flexShrink: 0 }} />
        )}

        {/* Icon */}
        {showIcons && (
          <span style={{ display: 'flex', alignItems: 'center', flexShrink: 0 }}>{getIcon()}</span>
        )}

        {/* Label */}
        <Paragraph
          data-size={size === 'lg' ? 'md' : size === 'md' ? 'sm' : 'xs'}
          style={{
            margin: 0,
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            whiteSpace: 'nowrap',
            flex: 1,
          }}
        >
          {node.label}
        </Paragraph>
      </Button>

      {/* Children */}
      {hasChildren && isExpanded && (
        <ul
          role="group"
          style={{
            listStyle: 'none',
            margin: 0,
            padding: 0,
          }}
        >
          {node.children!.map((child) => (
            <TreeNodeItem key={child.id} node={child} level={level + 1} />
          ))}
        </ul>
      )}
    </li>
  );
}

/**
 * TreeView toolbar for expand/collapse all
 */
export interface TreeViewToolbarProps {
  /** Label for expand all button */
  expandAllLabel?: string;
  /** Label for collapse all button */
  collapseAllLabel?: string;
}

export function TreeViewToolbar({
  expandAllLabel = 'Expand all',
  collapseAllLabel = 'Collapse all',
}: TreeViewToolbarProps) {
  const { expandAll, collapseAll, size } = useTreeViewContext();

  return (
    <div
      style={{
        display: 'flex',
        gap: 'var(--ds-spacing-2)',
        padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
        borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
      }}
    >
      <Button
        variant="tertiary"
        data-size={size}
        onClick={expandAll}
        style={{ fontSize: 'var(--ds-font-size-xs)' }}
      >
        {expandAllLabel}
      </Button>
      <Button
        variant="tertiary"
        data-size={size}
        onClick={collapseAll}
        style={{ fontSize: 'var(--ds-font-size-xs)' }}
      >
        {collapseAllLabel}
      </Button>
    </div>
  );
}

/**
 * Hook to access TreeView context (for custom extensions)
 */
export function useTreeView() {
  return useTreeViewContext();
}
