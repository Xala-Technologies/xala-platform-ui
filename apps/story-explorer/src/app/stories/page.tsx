'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import {
  Heading,
  Paragraph,
  Textfield,
  Button,
  Chip,
  Select,
} from '@digdir/designsystemet-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  Stack,
  Drawer,
  DrawerSection,
  BookOpenIcon,
  SearchIcon,
  SunIcon,
  MoonIcon,
  FilterIcon,
  FileTextIcon,
  ChevronRightIcon,
  GridIcon,
  PhoneIcon,
  GlobeIcon,
  SettingsIcon,
  ExternalLinkIcon,
} from '@xala-technologies/platform-ui';

// Inline SVG icons for missing exports
const ChevronDownIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="6 9 12 15 18 9" />
  </svg>
);

const FolderIcon = ({ size = 16, style }: { size?: number; style?: React.CSSProperties }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={style}>
    <path d="M22 19a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5l2 3h9a2 2 0 0 1 2 2z" />
  </svg>
);

const MaximizeIcon = ({ size = 16 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 3 21 3 21 9" />
    <polyline points="9 21 3 21 3 15" />
    <line x1="21" y1="3" x2="14" y2="10" />
    <line x1="3" y1="21" x2="10" y2="14" />
  </svg>
);
import type { CatalogFilterOption } from '@xala-technologies/platform-ui';
import { useGlobals } from '@/app/layout';
import { fetchStoryIndex, getStoriesArray } from '@xala-technologies/story-explorer-core';
import type { StoryIndexItem } from '@xala-technologies/story-explorer-core';

/**
 * Tree node for sidebar
 */
interface TreeNode {
  id: string;
  label: string;
  type: 'section' | 'folder' | 'doc' | 'story';
  href?: string;
  children?: TreeNode[];
}

/**
 * Build tree structure from stories
 */
function buildTree(stories: StoryIndexItem[]): TreeNode[] {
  const sections = new Map<string, TreeNode>();

  for (const story of stories) {
    const parts = story.title.split('/');
    const sectionName = parts[0] || 'Other';

    // Get or create section
    if (!sections.has(sectionName)) {
      sections.set(sectionName, {
        id: `section-${sectionName}`,
        label: sectionName.toUpperCase(),
        type: 'section',
        children: [],
      });
    }
    const section = sections.get(sectionName)!;

    // Handle nested structure
    if (parts.length > 2) {
      // Has a folder level
      const folderName = parts[1];
      let folder = section.children?.find(c => c.label === folderName && c.type === 'folder');
      if (!folder) {
        folder = {
          id: `folder-${sectionName}-${folderName}`,
          label: folderName,
          type: 'folder',
          children: [],
        };
        section.children?.push(folder);
      }
      folder.children?.push({
        id: story.id,
        label: story.name,
        type: story.type === 'docs' ? 'doc' : 'story',
        href: `/stories/${encodeURIComponent(story.id)}`,
      });
    } else if (parts.length === 2) {
      // Direct child of section
      section.children?.push({
        id: story.id,
        label: parts[1],
        type: story.type === 'docs' ? 'doc' : 'story',
        href: `/stories/${encodeURIComponent(story.id)}`,
      });
    } else {
      // Root level item
      section.children?.push({
        id: story.id,
        label: story.name,
        type: story.type === 'docs' ? 'doc' : 'story',
        href: `/stories/${encodeURIComponent(story.id)}`,
      });
    }
  }

  return Array.from(sections.values()).sort((a, b) => a.label.localeCompare(b.label));
}

/**
 * Get category filters from stories
 */
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

/**
 * TreeItem component
 */
function TreeItem({
  node,
  level = 0,
  expandedNodes,
  onToggle,
  query,
}: {
  node: TreeNode;
  level?: number;
  expandedNodes: Set<string>;
  onToggle: (id: string) => void;
  query: string;
}) {
  const hasChildren = node.children && node.children.length > 0;
  const isExpanded = expandedNodes.has(node.id);
  const paddingLeft = level === 0 ? 'var(--ds-spacing-4)' : `calc(var(--ds-spacing-4) + ${level * 16}px)`;

  // Filter children if query exists
  const filteredChildren = useMemo(() => {
    if (!hasChildren || !query) return node.children;
    return node.children?.filter(child => {
      if (child.children) {
        return child.children.some(c =>
          c.label.toLowerCase().includes(query.toLowerCase())
        );
      }
      return child.label.toLowerCase().includes(query.toLowerCase());
    });
  }, [node.children, hasChildren, query]);

  if (node.type === 'section') {
    return (
      <Stack direction="vertical" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
        <Button
          variant="tertiary"
          data-size="sm"
          onClick={() => onToggle(node.id)}
          style={{
            justifyContent: 'flex-start',
            padding: 'var(--ds-spacing-2) var(--ds-spacing-4)',
            width: '100%',
          }}
        >
          {isExpanded ? <ChevronDownIcon size={12} /> : <ChevronRightIcon size={12} />}
          <Paragraph
            data-size="xs"
            style={{
              fontWeight: 'var(--ds-font-weight-semibold)',
              color: 'var(--ds-color-neutral-text-subtle)',
              letterSpacing: '0.05em',
            }}
          >
            {node.label}
          </Paragraph>
        </Button>
        {isExpanded && filteredChildren && (
          <Stack direction="vertical">
            {filteredChildren.map(child => (
              <TreeItem
                key={child.id}
                node={child}
                level={level + 1}
                expandedNodes={expandedNodes}
                onToggle={onToggle}
                query={query}
              />
            ))}
          </Stack>
        )}
      </Stack>
    );
  }

  if (node.type === 'folder') {
    return (
      <Stack direction="vertical">
        <Button
          variant="tertiary"
          data-size="sm"
          onClick={() => onToggle(node.id)}
          style={{
            justifyContent: 'flex-start',
            paddingLeft,
            width: '100%',
          }}
        >
          {isExpanded ? <ChevronDownIcon size={12} /> : <ChevronRightIcon size={12} />}
          <FolderIcon size={14} style={{ color: 'var(--ds-color-neutral-text-subtle)' }} />
          <Paragraph data-size="sm">{node.label}</Paragraph>
        </Button>
        {isExpanded && node.children && (
          <Stack direction="vertical">
            {node.children.map(child => (
              <TreeItem
                key={child.id}
                node={child}
                level={level + 1}
                expandedNodes={expandedNodes}
                onToggle={onToggle}
                query={query}
              />
            ))}
          </Stack>
        )}
      </Stack>
    );
  }

  // Leaf node (doc or story)
  return (
    <Link
      href={node.href || '#'}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--ds-spacing-2)',
        padding: 'var(--ds-spacing-2) var(--ds-spacing-4)',
        paddingLeft,
        textDecoration: 'none',
        color: 'var(--ds-color-neutral-text-default)',
        fontSize: 'var(--ds-font-size-sm)',
        borderRadius: 'var(--ds-border-radius-sm)',
        transition: 'background-color 0.1s ease',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.backgroundColor = 'var(--ds-color-neutral-surface-hover)';
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.backgroundColor = 'transparent';
      }}
    >
      {node.type === 'doc' ? (
        <BookOpenIcon size={14} style={{ color: 'var(--ds-color-accent-text-default)' }} />
      ) : (
        <FileTextIcon size={14} style={{ color: 'var(--ds-color-neutral-text-subtle)' }} />
      )}
      <Paragraph data-size="sm" style={{ color: 'inherit' }}>
        {node.label}
      </Paragraph>
    </Link>
  );
}

export default function StoriesPage() {
  const router = useRouter();
  const { globals, setGlobals } = useGlobals();

  const [stories, setStories] = useState<StoryIndexItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Filter state
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Tree state
  const [expandedNodes, setExpandedNodes] = useState<Set<string>>(new Set());

  useEffect(() => {
    async function loadIndex() {
      try {
        setLoading(true);
        setError(null);
        const fetchedIndex = await fetchStoryIndex();
        setStories(getStoriesArray(fetchedIndex));
      } catch (err) {
        setError('Failed to load stories');
        console.error('Failed to fetch story index:', err);
      } finally {
        setLoading(false);
      }
    }
    loadIndex();
  }, []);

  // Build tree and expand all sections by default
  const tree = useMemo(() => buildTree(stories), [stories]);
  const categoryFilters = useMemo(() => getCategoryFilters(stories), [stories]);

  // Expand all sections on initial load
  useEffect(() => {
    if (tree.length > 0 && expandedNodes.size === 0) {
      setExpandedNodes(new Set(tree.map(n => n.id)));
    }
  }, [tree, expandedNodes.size]);

  const handleToggle = useCallback((id: string) => {
    setExpandedNodes(prev => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  }, []);

  const handleColorSchemeChange = (value: string) => {
    if (value === 'light' || value === 'dark') {
      setGlobals({ colorScheme: value });
      document.documentElement.setAttribute('data-color-scheme', value);
    }
  };

  const handleLocaleChange = (value: string) => {
    setGlobals({ locale: value });
  };

  const activeFilterCount = selectedCategory ? 1 : 0;

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
          width: '300px',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          borderInlineEnd: '1px solid var(--ds-color-neutral-border-subtle)',
          display: 'flex',
          flexDirection: 'column',
          height: '100%',
        }}
      >
        {/* Logo Section */}
        <Stack
          direction="horizontal"
          align="center"
          justify="space-between"
          style={{
            padding: 'var(--ds-spacing-4)',
            borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Paragraph
            data-size="md"
            style={{
              fontWeight: 'var(--ds-font-weight-semibold)',
              color: 'var(--ds-color-neutral-text-default)',
            }}
          >
            Xala Design System
          </Paragraph>
          <Button variant="tertiary" data-size="sm" aria-label="Settings">
            <GridIcon size={16} />
          </Button>
        </Stack>

        {/* Search */}
        <Stack
          direction="horizontal"
          gap="var(--ds-spacing-2)"
          align="center"
          style={{
            padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
            borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Stack
            direction="horizontal"
            align="center"
            style={{ flex: 1, position: 'relative' }}
          >
            <SearchIcon
              size={14}
              style={{
                position: 'absolute',
                left: 'var(--ds-spacing-3)',
                color: 'var(--ds-color-neutral-text-subtle)',
                pointerEvents: 'none',
              }}
            />
            <Textfield
              type="search"
              placeholder="Find components"
              aria-label="Search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              data-size="sm"
              style={{ paddingLeft: 'var(--ds-spacing-8)', flex: 1 }}
            />
          </Stack>
          <Paragraph data-size="xs" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            ⌘K
          </Paragraph>
          <Button
            variant="tertiary"
            data-size="sm"
            onClick={() => setIsFilterOpen(true)}
            aria-label="Filter"
          >
            <FilterIcon size={14} />
          </Button>
        </Stack>

        {/* Tree Navigation */}
        <nav
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: 'var(--ds-spacing-2) 0',
          }}
        >
          {loading ? (
            <Stack align="center" justify="center" style={{ padding: 'var(--ds-spacing-8)' }}>
              <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                Loading...
              </Paragraph>
            </Stack>
          ) : error ? (
            <Stack align="center" justify="center" style={{ padding: 'var(--ds-spacing-8)' }}>
              <Paragraph data-size="sm" style={{ color: 'var(--ds-color-danger-text-default)' }}>
                {error}
              </Paragraph>
            </Stack>
          ) : (
            tree.map(node => (
              <TreeItem
                key={node.id}
                node={node}
                expandedNodes={expandedNodes}
                onToggle={handleToggle}
                query={query}
              />
            ))
          )}
        </nav>
      </aside>

      {/* Main content area */}
      <Stack direction="vertical" style={{ flex: 1, overflow: 'hidden' }}>
        {/* Toolbar - Storybook style */}
        <Stack
          direction="horizontal"
          align="center"
          justify="space-between"
          style={{
            padding: 'var(--ds-spacing-2) var(--ds-spacing-4)',
            borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            gap: 'var(--ds-spacing-4)',
          }}
        >
          {/* Left controls */}
          <Stack direction="horizontal" align="center" gap="var(--ds-spacing-2)">
            <Button variant="tertiary" data-size="sm" aria-label="Toggle grid">
              <GridIcon size={16} />
            </Button>
          </Stack>

          {/* Center controls - Dropdowns */}
          <Stack direction="horizontal" align="center" gap="var(--ds-spacing-3)">
            {/* Color Scheme Dropdown */}
            <Stack direction="horizontal" align="center" gap="var(--ds-spacing-2)">
              {globals.colorScheme === 'dark' ? <MoonIcon size={14} /> : <SunIcon size={14} />}
              <Select
                data-size="sm"
                value={globals.colorScheme === 'dark' ? 'dark' : 'light'}
                onChange={(e) => handleColorSchemeChange(e.target.value)}
                style={{ minWidth: '120px' }}
              >
                <Select.Option value="light">Light Mode</Select.Option>
                <Select.Option value="dark">Dark Mode</Select.Option>
              </Select>
            </Stack>

            {/* Brand Theme Dropdown */}
            <Stack direction="horizontal" align="center" gap="var(--ds-spacing-2)">
              <SettingsIcon size={14} />
              <Select data-size="sm" defaultValue="xala" style={{ minWidth: '120px' }}>
                <Select.Option value="xala">Xala (Blue)</Select.Option>
                <Select.Option value="digdir">Digdir</Select.Option>
                <Select.Option value="altinn">Altinn</Select.Option>
              </Select>
            </Stack>

            {/* Locale Dropdown */}
            <Stack direction="horizontal" align="center" gap="var(--ds-spacing-2)">
              <GlobeIcon size={14} />
              <Select
                data-size="sm"
                value={globals.locale}
                onChange={(e) => handleLocaleChange(e.target.value)}
                style={{ minWidth: '120px' }}
              >
                <Select.Option value="nb">Norsk (LTR)</Select.Option>
                <Select.Option value="en">English (LTR)</Select.Option>
                <Select.Option value="ar">Arabic (RTL)</Select.Option>
              </Select>
            </Stack>

            {/* Viewport Dropdown */}
            <Stack direction="horizontal" align="center" gap="var(--ds-spacing-2)">
              <PhoneIcon size={14} />
              <Select data-size="sm" defaultValue="responsive" style={{ minWidth: '100px' }}>
                <Select.Option value="responsive">Responsive</Select.Option>
                <Select.Option value="mobile">Mobile</Select.Option>
                <Select.Option value="tablet">Tablet</Select.Option>
                <Select.Option value="desktop">Desktop</Select.Option>
              </Select>
            </Stack>
          </Stack>

          {/* Right controls */}
          <Stack direction="horizontal" align="center" gap="var(--ds-spacing-2)">
            <Button variant="tertiary" data-size="sm" aria-label="Fullscreen">
              <MaximizeIcon size={16} />
            </Button>
          </Stack>
        </Stack>

        {/* Main content - Welcome state */}
        <main
          style={{
            flex: 1,
            overflow: 'auto',
            padding: 'var(--ds-spacing-8)',
          }}
        >
          <Stack
            direction="vertical"
            align="center"
            justify="center"
            gap="var(--ds-spacing-6)"
            style={{
              height: '100%',
              minHeight: '400px',
            }}
          >
            <Stack
              align="center"
              justify="center"
              style={{
                width: '80px',
                height: '80px',
                borderRadius: 'var(--ds-border-radius-full)',
                backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              <BookOpenIcon size={40} />
            </Stack>

            <Stack direction="vertical" gap="var(--ds-spacing-2)" align="center">
              <Heading level={1} data-size="xl">
                Velkommen til Xala Platform
              </Heading>
              <Paragraph
                style={{
                  color: 'var(--ds-color-neutral-text-subtle)',
                  textAlign: 'center',
                  maxWidth: '500px',
                }}
              >
                Et omfattende designsystem for a bygge tilgjengelige, konsistente applikasjoner
              </Paragraph>
            </Stack>

            {/* Stats */}
            <Stack direction="horizontal" gap="var(--ds-spacing-8)">
              <Stack direction="vertical" align="center" gap="var(--ds-spacing-1)">
                <Heading level={2} data-size="2xl">
                  {stories.length}
                </Heading>
                <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                  Stories
                </Paragraph>
              </Stack>
              <Stack direction="vertical" align="center" gap="var(--ds-spacing-1)">
                <Heading level={2} data-size="2xl">
                  {categoryFilters.length}
                </Heading>
                <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                  Categories
                </Paragraph>
              </Stack>
            </Stack>

            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              Select a component from the sidebar to get started
            </Paragraph>
          </Stack>
        </main>
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
          <Stack direction="horizontal" gap="var(--ds-spacing-2)" justify="space-between">
            <Button
              variant="tertiary"
              onClick={() => {
                setSelectedCategory(null);
                setIsFilterOpen(false);
              }}
            >
              Clear all
            </Button>
            <Button variant="primary" onClick={() => setIsFilterOpen(false)}>
              Apply
            </Button>
          </Stack>
        }
      >
        <DrawerSection title="Categories" collapsible>
          <Stack direction="vertical" gap="var(--ds-spacing-2)">
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
