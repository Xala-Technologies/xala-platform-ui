'use client';

import { useState, useEffect, useMemo, useCallback, useRef } from 'react';
import {
  Paragraph,
  Textfield,
  Button,
  Chip,
  Select,
} from '@digdir/designsystemet-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import {
  Stack,
  Drawer,
  DrawerSection,
  IframeViewer,
  BookOpenIcon,
  SearchIcon,
  FilterIcon,
  ChevronRightIcon,
  SettingsIcon,
  XIcon,
  RefreshCwIcon,
  ExternalLinkIcon,
} from '@xala-technologies/platform-ui';
import type { CatalogFilterOption } from '@xala-technologies/platform-ui';
import { useGlobals } from '@/app/layout';
import {
  fetchStoryIndex,
  getStoriesArray,
  getStoryById,
  buildIframeUrl,
  getStorybookBaseUrl,
} from '@xala-technologies/story-explorer-core';
import type { StoryIndex, StoryIndexItem } from '@xala-technologies/story-explorer-core';

// Icons
const ComponentIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="currentColor" style={{ flexShrink: 0 }}>
    <rect x="1" y="1" width="5" height="5" rx="0.5" fillOpacity="0.7"/>
    <rect x="8" y="1" width="5" height="5" rx="0.5" fillOpacity="0.7"/>
    <rect x="1" y="8" width="5" height="5" rx="0.5" fillOpacity="0.7"/>
    <rect x="8" y="8" width="5" height="5" rx="0.5" fillOpacity="0.7"/>
  </svg>
);

const DocIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.2" style={{ flexShrink: 0 }}>
    <path d="M8 1H3.5A1.5 1.5 0 002 2.5v9A1.5 1.5 0 003.5 13h7a1.5 1.5 0 001.5-1.5V5L8 1z"/>
    <polyline points="8 1 8 5 12 5"/>
  </svg>
);

const StoryIcon = ({ size = 14 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 14 14" fill="currentColor" style={{ flexShrink: 0 }}>
    <rect x="2" y="2" width="10" height="10" rx="1" fillOpacity="0.15"/>
    <rect x="4" y="5" width="6" height="1.5" rx="0.5"/>
    <rect x="4" y="8" width="4" height="1.5" rx="0.5"/>
  </svg>
);

interface TreeNode {
  id: string;
  label: string;
  type: 'root' | 'component' | 'doc' | 'story';
  href?: string;
  children?: TreeNode[];
  depth: number;
}

// Build proper hierarchical tree from flat story list
function buildTree(stories: StoryIndexItem[]): TreeNode[] {
  const rootMap = new Map<string, TreeNode>();

  for (const story of stories) {
    const parts = story.title.split('/');

    // Root level (e.g., "Components", "Blocks", "Overview")
    const rootName = parts[0];
    if (!rootMap.has(rootName)) {
      rootMap.set(rootName, {
        id: `root-${rootName}`,
        label: rootName,
        type: 'root',
        children: [],
        depth: 0,
      });
    }
    const root = rootMap.get(rootName)!;

    // Component level (e.g., "Button", "Card")
    if (parts.length >= 2) {
      const componentName = parts[1];
      let component = root.children?.find(c => c.label === componentName);

      if (!component) {
        component = {
          id: `component-${rootName}-${componentName}`,
          label: componentName,
          type: 'component',
          children: [],
          depth: 1,
        };
        root.children?.push(component);
      }

      // Story/Doc level
      const storyNode: TreeNode = {
        id: story.id,
        label: story.name,
        type: story.type === 'docs' ? 'doc' : 'story',
        href: `/stories/${encodeURIComponent(story.id)}`,
        depth: 2,
      };

      // Avoid duplicates
      if (!component.children?.find(c => c.id === story.id)) {
        component.children?.push(storyNode);
      }
    }
  }

  // Sort roots alphabetically, with special order for common sections
  const order = ['Overview', 'Getting Started', 'Fundamentals', 'Components', 'Composed', 'Blocks', 'Patterns', 'Shells', 'Pages'];
  return Array.from(rootMap.values()).sort((a, b) => {
    const aIndex = order.indexOf(a.label);
    const bIndex = order.indexOf(b.label);
    if (aIndex !== -1 && bIndex !== -1) return aIndex - bIndex;
    if (aIndex !== -1) return -1;
    if (bIndex !== -1) return 1;
    return a.label.localeCompare(b.label);
  });
}

function getCategoryFilters(stories: StoryIndexItem[]): CatalogFilterOption[] {
  const categories = new Map<string, number>();
  for (const story of stories) {
    const category = story.title.split('/')[0] || 'Other';
    categories.set(category, (categories.get(category) || 0) + 1);
  }
  return Array.from(categories.entries())
    .sort((a, b) => a[0].localeCompare(b[0]))
    .map(([value, count]) => ({ value, label: value, count }));
}

// Tree Item Component
function TreeItem({
  node,
  isExpanded,
  isActive,
  onToggle,
  expandedNodes,
  activeId,
  onNavigate,
}: {
  node: TreeNode;
  isExpanded: boolean;
  isActive: boolean;
  onToggle: (id: string) => void;
  expandedNodes: Set<string>;
  activeId?: string;
  onNavigate: (href: string) => void;
}) {
  const indent = node.depth * 16;
  const hasChildren = node.children && node.children.length > 0;
  const isLeaf = node.type === 'story' || node.type === 'doc';

  // Root sections
  if (node.type === 'root') {
    return (
      <Stack direction="vertical" style={{ marginBottom: '4px' }}>
        <Stack
          direction="horizontal"
          align="center"
          gap="6px"
          onClick={() => onToggle(node.id)}
          style={{
            padding: '6px 12px',
            cursor: 'pointer',
            userSelect: 'none',
          }}
        >
          <ChevronRightIcon
            size={10}
            style={{
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.15s ease',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          />
          <Paragraph
            data-size="xs"
            style={{
              fontWeight: '600',
              color: 'var(--ds-color-neutral-text-subtle)',
              letterSpacing: '0.04em',
              textTransform: 'uppercase',
              fontSize: '11px',
            }}
          >
            {node.label}
          </Paragraph>
        </Stack>

        {isExpanded && hasChildren && (
          <Stack direction="vertical">
            {node.children!.map(child => (
              <TreeItem
                key={child.id}
                node={child}
                isExpanded={expandedNodes.has(child.id)}
                isActive={child.id === activeId}
                onToggle={onToggle}
                expandedNodes={expandedNodes}
                activeId={activeId}
                onNavigate={onNavigate}
              />
            ))}
          </Stack>
        )}
      </Stack>
    );
  }

  // Component groups
  if (node.type === 'component') {
    return (
      <Stack direction="vertical">
        <Stack
          direction="horizontal"
          align="center"
          gap="6px"
          onClick={() => onToggle(node.id)}
          style={{
            padding: '5px 12px',
            paddingLeft: `${indent + 12}px`,
            cursor: 'pointer',
            borderRadius: '4px',
            margin: '0 4px',
            transition: 'background-color 0.1s ease',
          }}
          onMouseEnter={(e) => e.currentTarget.style.backgroundColor = 'var(--ds-color-neutral-surface-hover)'}
          onMouseLeave={(e) => e.currentTarget.style.backgroundColor = 'transparent'}
        >
          <ChevronRightIcon
            size={10}
            style={{
              transform: isExpanded ? 'rotate(90deg)' : 'rotate(0deg)',
              transition: 'transform 0.15s ease',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          />
          <ComponentIcon size={12} />
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-default)' }}>
            {node.label}
          </Paragraph>
        </Stack>

        {isExpanded && hasChildren && (
          <Stack direction="vertical">
            {node.children!.map(child => (
              <TreeItem
                key={child.id}
                node={child}
                isExpanded={expandedNodes.has(child.id)}
                isActive={child.id === activeId}
                onToggle={onToggle}
                expandedNodes={expandedNodes}
                activeId={activeId}
                onNavigate={onNavigate}
              />
            ))}
          </Stack>
        )}
      </Stack>
    );
  }

  // Leaf items (stories and docs)
  const Icon = node.type === 'doc' ? DocIcon : StoryIcon;

  return (
    <Link
      href={node.href || '#'}
      onClick={(e) => {
        e.preventDefault();
        if (node.href) onNavigate(node.href);
      }}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        padding: '5px 12px',
        paddingLeft: `${indent + 24}px`,
        margin: '0 4px',
        textDecoration: 'none',
        borderRadius: '4px',
        backgroundColor: isActive ? 'var(--ds-color-accent-surface-default)' : 'transparent',
        color: isActive ? 'var(--ds-color-accent-text-default)' : 'var(--ds-color-neutral-text-default)',
        transition: 'all 0.1s ease',
      }}
      onMouseEnter={(e) => {
        if (!isActive) e.currentTarget.style.backgroundColor = 'var(--ds-color-neutral-surface-hover)';
      }}
      onMouseLeave={(e) => {
        if (!isActive) e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      <Icon size={12} />
      <Paragraph
        data-size="sm"
        style={{
          color: 'inherit',
          fontWeight: isActive ? '500' : '400',
        }}
      >
        {node.label}
      </Paragraph>
    </Link>
  );
}

export default function StoryPage() {
  const params = useParams<{ storyId: string }>();
  const router = useRouter();
  const storyId = decodeURIComponent(params.storyId || '');
  const { globals, setGlobals } = useGlobals();
  const searchRef = useRef<HTMLInputElement>(null);

  const [index, setIndex] = useState<StoryIndex | null>(null);
  const [stories, setStories] = useState<StoryIndexItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [reloadKey, setReloadKey] = useState(0);

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());
  const [showPropsPanel, setShowPropsPanel] = useState(true);

  // Keyboard shortcut for search
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        searchRef.current?.focus();
      }
      if (e.key === 'Escape') {
        searchRef.current?.blur();
        setQuery('');
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    async function loadIndex() {
      try {
        setLoading(true);
        const fetchedIndex = await fetchStoryIndex();
        setIndex(fetchedIndex);
        setStories(getStoriesArray(fetchedIndex));
      } catch (err) {
        console.error('Failed to fetch story index:', err);
      } finally {
        setLoading(false);
      }
    }
    loadIndex();
  }, []);

  const story = index ? getStoryById(index, storyId) : undefined;
  const baseUrl = getStorybookBaseUrl();
  const iframeUrl = story ? buildIframeUrl(baseUrl, story.id, globals) : '';

  const tree = useMemo(() => buildTree(stories), [stories]);
  const categoryFilters = useMemo(() => getCategoryFilters(stories), [stories]);

  // Filter tree based on query
  const filteredTree = useMemo(() => {
    if (!query) return tree;

    const filterNodes = (nodes: TreeNode[]): TreeNode[] => {
      return nodes.reduce<TreeNode[]>((acc, node) => {
        if (node.label.toLowerCase().includes(query.toLowerCase())) {
          acc.push(node);
          return acc;
        }
        if (node.children) {
          const filteredChildren = filterNodes(node.children);
          if (filteredChildren.length > 0) {
            acc.push({ ...node, children: filteredChildren });
          }
        }
        return acc;
      }, []);
    };

    return filterNodes(tree);
  }, [tree, query]);

  // Auto-expand to show active item
  useEffect(() => {
    if (tree.length > 0 && storyId) {
      const newExpanded = new Set<string>();

      for (const root of tree) {
        newExpanded.add(root.id);
        for (const component of root.children || []) {
          const hasActiveStory = component.children?.some(s => s.id === storyId);
          if (hasActiveStory) {
            newExpanded.add(component.id);
          }
        }
      }

      setExpandedNodes(newExpanded);
    }
  }, [tree, storyId]);

  // Expand all when searching
  useEffect(() => {
    if (query) {
      const allIds = new Set<string>();
      const collectIds = (nodes: TreeNode[]) => {
        for (const node of nodes) {
          allIds.add(node.id);
          if (node.children) collectIds(node.children);
        }
      };
      collectIds(filteredTree);
      setExpandedNodes(allIds);
    }
  }, [query, filteredTree]);

  const handleToggle = useCallback((id: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }, []);

  const handleNavigate = useCallback((href: string) => {
    router.push(href);
  }, [router]);

  const handleColorSchemeChange = (value: string) => {
    if (value === 'light' || value === 'dark') {
      setGlobals({ colorScheme: value });
      document.documentElement.setAttribute('data-color-scheme', value);
      setReloadKey(k => k + 1);
    }
  };

  const handleLocaleChange = (value: string) => {
    setGlobals({ locale: value });
    setReloadKey(k => k + 1);
  };

  const handleReload = () => setReloadKey(k => k + 1);

  const storyTitleParts = story ? story.title.split('/') : [];
  const storyCategory = storyTitleParts[0] || '';
  const storyComponent = storyTitleParts[1] || story?.name || '';

  return (
    <Stack
      direction="horizontal"
      gap="0"
      style={{
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
      }}
    >
      {/* Sidebar */}
      <aside
        style={{
          width: '280px',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          borderInlineEnd: '1px solid var(--ds-color-neutral-border-subtle)',
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {/* Header */}
        <Stack
          direction="horizontal"
          align="center"
          justify="space-between"
          style={{
            padding: '12px 16px',
            borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Link href="/stories" style={{ textDecoration: 'none' }}>
            <Paragraph data-size="md" style={{ fontWeight: '600', color: 'var(--ds-color-neutral-text-default)' }}>
              Xala Design System
            </Paragraph>
          </Link>
          <Button variant="tertiary" data-size="sm" style={{ padding: '4px' }} aria-label="Settings">
            <SettingsIcon size={16} />
          </Button>
        </Stack>

        {/* Search */}
        <Stack
          direction="horizontal"
          gap="8px"
          align="center"
          style={{
            padding: '8px 12px',
            borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Stack direction="horizontal" align="center" style={{ flex: 1, position: 'relative' }}>
            <SearchIcon
              size={14}
              style={{
                position: 'absolute',
                left: '10px',
                color: 'var(--ds-color-neutral-text-subtle)',
                pointerEvents: 'none',
              }}
            />
            <Textfield
              ref={searchRef}
              type="search"
              placeholder="Find components"
              aria-label="Search components (Cmd+K)"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              data-size="sm"
              style={{ paddingLeft: '32px', flex: 1 }}
            />
          </Stack>
          <Paragraph
            data-size="xs"
            style={{
              color: 'var(--ds-color-neutral-text-subtle)',
              opacity: 0.6,
              padding: '2px 6px',
              backgroundColor: 'var(--ds-color-neutral-background-subtle)',
              borderRadius: '4px',
              fontSize: '11px',
            }}
          >
            ⌘K
          </Paragraph>
          <Button
            variant="tertiary"
            data-size="sm"
            onClick={() => setIsFilterOpen(true)}
            style={{ padding: '4px' }}
            aria-label="Open filters"
          >
            <FilterIcon size={14} />
          </Button>
        </Stack>

        {/* Tree */}
        <nav style={{ flex: 1, overflowY: 'auto', padding: '8px 0' }}>
          {loading ? (
            <Stack align="center" justify="center" style={{ padding: '32px' }}>
              <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                Loading components...
              </Paragraph>
            </Stack>
          ) : filteredTree.length === 0 ? (
            <Stack align="center" justify="center" style={{ padding: '32px' }}>
              <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                No results for "{query}"
              </Paragraph>
            </Stack>
          ) : (
            filteredTree.map(node => (
              <TreeItem
                key={node.id}
                node={node}
                isExpanded={expandedNodes.has(node.id)}
                isActive={node.id === storyId}
                onToggle={handleToggle}
                expandedNodes={expandedNodes}
                activeId={storyId}
                onNavigate={handleNavigate}
              />
            ))
          )}
        </nav>
      </aside>

      {/* Main Content */}
      <Stack direction="vertical" style={{ flex: 1, overflow: 'hidden' }}>
        {/* Toolbar */}
        <Stack
          direction="horizontal"
          align="center"
          justify="space-between"
          style={{
            padding: '0 16px',
            borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            height: '48px',
          }}
        >
          <Stack direction="horizontal" align="center">
            <Button variant="tertiary" data-size="sm" style={{ padding: '6px' }} aria-label="Toggle grid">
              <ComponentIcon size={16} />
            </Button>
          </Stack>

          <Stack direction="horizontal" align="center" gap="8px">
            <Select
              data-size="sm"
              value={globals.colorScheme === 'dark' ? 'dark' : 'light'}
              onChange={(e) => handleColorSchemeChange(e.target.value)}
              style={{ minWidth: '115px' }}
            >
              <Select.Option value="light">Light Mode</Select.Option>
              <Select.Option value="dark">Dark Mode</Select.Option>
            </Select>

            <Select data-size="sm" defaultValue="xala" style={{ minWidth: '105px' }}>
              <Select.Option value="xala">Xala (Blue)</Select.Option>
              <Select.Option value="digdir">Digdir</Select.Option>
              <Select.Option value="altinn">Altinn</Select.Option>
            </Select>

            <Select
              data-size="sm"
              value={globals.locale}
              onChange={(e) => handleLocaleChange(e.target.value)}
              style={{ minWidth: '115px' }}
            >
              <Select.Option value="nb">Norsk (LTR)</Select.Option>
              <Select.Option value="en">English (LTR)</Select.Option>
            </Select>
          </Stack>

          <Stack direction="horizontal" align="center" gap="4px">
            <Button variant="tertiary" data-size="sm" onClick={handleReload} style={{ padding: '6px' }} aria-label="Reload">
              <RefreshCwIcon size={14} />
            </Button>
            <Button
              variant="tertiary"
              data-size="sm"
              onClick={() => setShowPropsPanel(!showPropsPanel)}
              style={{ padding: '6px' }}
              aria-label="Toggle panel"
              aria-pressed={showPropsPanel}
            >
              <SettingsIcon size={14} />
            </Button>
            <Button
              variant="tertiary"
              data-size="sm"
              onClick={() => window.open(iframeUrl, '_blank')}
              style={{ padding: '6px' }}
              aria-label="Open in new tab"
            >
              <ExternalLinkIcon size={14} />
            </Button>
          </Stack>
        </Stack>

        {/* Canvas */}
        <Stack direction="horizontal" style={{ flex: 1, overflow: 'hidden' }}>
          <main style={{ flex: 1, overflow: 'hidden', position: 'relative' }}>
            {story ? (
              <IframeViewer
                src={iframeUrl}
                title={`${story.title} - ${story.name}`}
                reloadKey={`${storyId}-${reloadKey}`}
                externalUrl={`${baseUrl}/?path=/story/${story.id}`}
                labels={{
                  loading: 'Loading story...',
                  error: 'Failed to load story',
                  retry: 'Retry',
                  copyLink: 'Copy link',
                  openExternal: 'Open in Storybook',
                }}
              />
            ) : (
              <Stack align="center" justify="center" style={{ height: '100%', padding: '32px' }}>
                {loading ? (
                  <Paragraph>Loading...</Paragraph>
                ) : (
                  <Stack direction="vertical" align="center" gap="16px">
                    <BookOpenIcon size={48} style={{ color: 'var(--ds-color-neutral-text-subtle)' }} />
                    <Paragraph style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                      {storyId ? 'Story not found' : 'Select a story from the sidebar'}
                    </Paragraph>
                    {storyId && (
                      <Button variant="secondary" asChild>
                        <Link href="/stories">Back to catalog</Link>
                      </Button>
                    )}
                  </Stack>
                )}
              </Stack>
            )}
          </main>

          {/* Right Panel */}
          {showPropsPanel && story && (
            <aside
              style={{
                width: '280px',
                backgroundColor: 'var(--ds-color-neutral-surface-default)',
                borderInlineStart: '1px solid var(--ds-color-neutral-border-subtle)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Stack
                direction="horizontal"
                align="center"
                justify="space-between"
                style={{
                  padding: '12px 16px',
                  borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
                }}
              >
                <Stack direction="vertical" gap="2px">
                  <Paragraph data-size="md" style={{ fontWeight: '600' }}>
                    {storyComponent}
                  </Paragraph>
                  <Paragraph data-size="xs" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                    {story.type === 'docs' ? 'Documentation' : 'Story'}
                  </Paragraph>
                </Stack>
                <Button
                  variant="tertiary"
                  data-size="sm"
                  onClick={() => setShowPropsPanel(false)}
                  style={{ padding: '4px' }}
                  aria-label="Close panel"
                >
                  <XIcon size={14} />
                </Button>
              </Stack>

              <Stack
                direction="vertical"
                gap="16px"
                style={{ flex: 1, overflow: 'auto', padding: '16px' }}
              >
                <Stack direction="vertical" gap="6px">
                  <Paragraph data-size="xs" style={{ color: 'var(--ds-color-neutral-text-subtle)', fontWeight: '600' }}>
                    Category
                  </Paragraph>
                  <Paragraph data-size="sm">{storyCategory}</Paragraph>
                </Stack>

                <Stack direction="vertical" gap="6px">
                  <Paragraph data-size="xs" style={{ color: 'var(--ds-color-neutral-text-subtle)', fontWeight: '600' }}>
                    Story ID
                  </Paragraph>
                  <Paragraph
                    data-size="xs"
                    style={{
                      fontFamily: 'monospace',
                      wordBreak: 'break-all',
                      padding: '8px',
                      backgroundColor: 'var(--ds-color-neutral-background-subtle)',
                      borderRadius: '4px',
                    }}
                  >
                    {story.id}
                  </Paragraph>
                </Stack>

                <Stack direction="vertical" gap="8px">
                  <Paragraph data-size="xs" style={{ color: 'var(--ds-color-neutral-text-subtle)', fontWeight: '600' }}>
                    Actions
                  </Paragraph>
                  <Button variant="secondary" data-size="sm" onClick={handleReload} style={{ justifyContent: 'flex-start' }}>
                    <RefreshCwIcon size={14} />
                    Reload Story
                  </Button>
                  <Button
                    variant="secondary"
                    data-size="sm"
                    onClick={() => window.open(`${baseUrl}/?path=/story/${story.id}`, '_blank')}
                    style={{ justifyContent: 'flex-start' }}
                  >
                    <ExternalLinkIcon size={14} />
                    Open in Storybook
                  </Button>
                </Stack>
              </Stack>
            </aside>
          )}
        </Stack>
      </Stack>

      {/* Filter Drawer */}
      <Drawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title="Filters"
        icon={<FilterIcon size={20} />}
        position="right"
        size="sm"
        footer={
          <Stack direction="horizontal" gap="8px" justify="space-between">
            <Button variant="tertiary" onClick={() => { setSelectedCategory(null); setIsFilterOpen(false); }}>
              Clear all
            </Button>
            <Button variant="primary" onClick={() => setIsFilterOpen(false)}>
              Apply
            </Button>
          </Stack>
        }
      >
        <DrawerSection title="Categories" collapsible>
          <Stack direction="vertical" gap="8px">
            <Chip.Radio
              name="category"
              value="all"
              data-size="sm"
              checked={selectedCategory === null}
              onChange={() => setSelectedCategory(null)}
            >
              All categories
            </Chip.Radio>
            {categoryFilters.map((filter) => (
              <Chip.Radio
                key={filter.value}
                name="category"
                value={filter.value}
                data-size="sm"
                checked={selectedCategory === filter.value}
                onChange={() => setSelectedCategory(filter.value)}
              >
                {filter.label} ({filter.count})
              </Chip.Radio>
            ))}
          </Stack>
        </DrawerSection>
      </Drawer>
    </Stack>
  );
}
