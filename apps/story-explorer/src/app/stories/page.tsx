'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Heading, Paragraph, Textfield, Button, Spinner, Card } from '@digdir/designsystemet-react';
import { useRouter } from 'next/navigation';
import { useT } from '@xala-technologies/i18n';
import {
  Stack,
  HorizontalLayout,
  Center,
  TreeView,
  BookOpenIcon,
  SunIcon,
  MoonIcon,
  FilterIcon,
  GridIcon,
  FileTextIcon,
} from '@xala-technologies/platform-ui';
import { useGlobals } from '@/app/layout';
import {
  fetchStoryIndex,
  getStoriesArray,
  filterStories,
} from '@xala-technologies/story-explorer-core';
import type { StoryIndexItem } from '@xala-technologies/story-explorer-core';
import type { TreeNode } from '@xala-technologies/platform-ui';

/**
 * Build tree structure from stories
 * Groups by title path: "Components/Button" -> Components -> Button -> stories
 */
function buildStoryTree(stories: StoryIndexItem[]): TreeNode[] {
  const tree = new Map<string, { node: TreeNode; children: Map<string, TreeNode> }>();

  // Sort stories by title for consistent ordering
  const sortedStories = [...stories].sort((a, b) => a.title.localeCompare(b.title));

  for (const story of sortedStories) {
    const parts = story.title.split('/');
    const category = parts[0] || 'Uncategorized';
    const component = parts.length > 1 ? parts.slice(1).join('/') : story.name;

    // Ensure category exists
    if (!tree.has(category)) {
      tree.set(category, {
        node: {
          id: `category-${category}`,
          label: category,
          children: [],
        },
        children: new Map(),
      });
    }

    const categoryData = tree.get(category)!;

    // Ensure component group exists
    if (!categoryData.children.has(component)) {
      categoryData.children.set(component, {
        id: `component-${category}-${component}`,
        label: component,
        children: [],
      });
    }

    const componentNode = categoryData.children.get(component)!;

    // Add story as leaf node
    componentNode.children!.push({
      id: story.id,
      label: story.name,
      icon: story.type === 'docs' ? <FileTextIcon size={14} /> : <GridIcon size={14} />,
      metadata: { type: story.type },
    });
  }

  // Build final tree structure
  const result: TreeNode[] = [];
  for (const [, categoryData] of tree) {
    const categoryNode = { ...categoryData.node };
    categoryNode.children = Array.from(categoryData.children.values());
    result.push(categoryNode);
  }

  return result;
}

/**
 * Stories catalog page - Storybook-like UI
 */
export default function StoriesPage() {
  const t = useT();
  const router = useRouter();
  const { globals, setGlobals } = useGlobals();

  const [stories, setStories] = useState<StoryIndexItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    async function loadIndex() {
      try {
        setLoading(true);
        setError(null);
        const fetchedIndex = await fetchStoryIndex();
        setStories(getStoriesArray(fetchedIndex));
      } catch (err) {
        setError('Failed to load stories. Is Storybook running on port 6006?');
        console.error('Failed to fetch story index:', err);
      } finally {
        setLoading(false);
      }
    }
    loadIndex();
  }, []);

  // Filter stories based on search
  const filteredStories = useMemo(() => {
    if (!searchQuery) return stories;
    return filterStories(stories, { query: searchQuery });
  }, [stories, searchQuery]);

  // Build tree structure
  const treeNodes = useMemo(() => buildStoryTree(filteredStories), [filteredStories]);

  // Handlers
  const handleStorySelect = useCallback(
    (nodeId: string, node: TreeNode) => {
      // Only navigate for leaf nodes (actual stories)
      if (!node.children || node.children.length === 0) {
        router.push(`/stories/${encodeURIComponent(nodeId)}`);
      }
    },
    [router]
  );

  const handleColorSchemeToggle = () => {
    const newScheme = globals.colorScheme === 'light' ? 'dark' : 'light';
    setGlobals({ colorScheme: newScheme });
    document.documentElement.setAttribute('data-color-scheme', newScheme);
  };

  const handleLocaleToggle = () => {
    const newLocale = globals.locale === 'nb' ? 'en' : 'nb';
    setGlobals({ locale: newLocale });
  };

  return (
    <HorizontalLayout style={{ height: '100vh' }}>
      {/* Sidebar */}
      <Stack
        direction="vertical"
        gap="0"
        style={{
          width: '280px',
          minWidth: '280px',
          height: '100%',
          borderRight: '1px solid var(--ds-color-neutral-border-subtle)',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
        }}
      >
        {/* Header */}
        <Stack
          direction="horizontal"
          gap="var(--ds-spacing-3)"
          align="center"
          justify="space-between"
          style={{
            padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
            borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Stack direction="horizontal" gap="var(--ds-spacing-3)" align="center">
            <Stack
              align="center"
              justify="center"
              style={{
                width: '32px',
                height: '32px',
                borderRadius: 'var(--ds-border-radius-md)',
                backgroundColor: 'var(--ds-color-accent-surface-default)',
                color: 'var(--ds-color-accent-base-default)',
              }}
            >
              <BookOpenIcon size={18} />
            </Stack>
            <Heading level={1} data-size="xs" style={{ margin: 0 }}>
              {t('explorer.title') || 'Story Explorer'}
            </Heading>
          </Stack>
        </Stack>

        {/* Search */}
        <Stack
          direction="horizontal"
          gap="var(--ds-spacing-2)"
          align="center"
          style={{
            padding: 'var(--ds-spacing-3)',
            borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Stack style={{ flex: 1 }}>
            <Textfield
              data-size="sm"
              placeholder={t('explorer.search.placeholder') || 'Find components...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                backgroundColor: 'var(--ds-color-neutral-background-default)',
              }}
            />
          </Stack>
          <Button variant="tertiary" data-size="sm">
            <FilterIcon size={16} />
          </Button>
        </Stack>

        {/* Theme Controls */}
        <Stack
          direction="horizontal"
          gap="var(--ds-spacing-2)"
          align="center"
          style={{
            padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
            borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Button
            variant={globals.colorScheme === 'light' ? 'secondary' : 'tertiary'}
            data-size="sm"
            onClick={handleColorSchemeToggle}
          >
            {globals.colorScheme === 'light' ? <SunIcon size={14} /> : <MoonIcon size={14} />}
            {globals.colorScheme === 'light' ? 'Light' : 'Dark'}
          </Button>
          <Button
            variant="tertiary"
            data-size="sm"
            onClick={handleLocaleToggle}
          >
            {globals.locale === 'nb' ? 'Norsk' : 'English'}
          </Button>
        </Stack>

        {/* Story count */}
        <Stack
          style={{
            padding: 'var(--ds-spacing-2) var(--ds-spacing-4)',
            borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Paragraph data-size="xs" style={{ color: 'var(--ds-color-neutral-text-subtle)', margin: 0 }}>
            {filteredStories.length} stories
          </Paragraph>
        </Stack>

        {/* Story Tree */}
        <Stack
          direction="vertical"
          style={{
            flex: 1,
            overflow: 'auto',
          }}
        >
          {loading ? (
            <Center style={{ padding: 'var(--ds-spacing-10)' }}>
              <Stack direction="vertical" gap="var(--ds-spacing-3)" align="center">
                <Spinner aria-label="Loading stories..." />
                <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                  Loading stories...
                </Paragraph>
              </Stack>
            </Center>
          ) : error ? (
            <Stack style={{ padding: 'var(--ds-spacing-4)' }}>
              <Card data-color="danger">
                <Card.Block>
                  <Paragraph data-size="sm">{error}</Paragraph>
                </Card.Block>
              </Card>
            </Stack>
          ) : (
            <TreeView
              nodes={treeNodes}
              onSelect={handleStorySelect}
              size="sm"
              showIcons={true}
              expandOnLabelClick={true}
              defaultExpandedIds={treeNodes.slice(0, 3).map((n) => n.id)}
            />
          )}
        </Stack>
      </Stack>

      {/* Main Content - Welcome Screen */}
      <Stack
        direction="vertical"
        style={{
          flex: 1,
          backgroundColor: 'var(--ds-color-neutral-background-default)',
        }}
      >
        {/* Toolbar */}
        <Card
          data-color="neutral"
          style={{
            borderRadius: 0,
            borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Card.Block>
            <Stack direction="horizontal" gap="var(--ds-spacing-4)" align="center">
              <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)', margin: 0 }}>
                Select a story from the sidebar to preview
              </Paragraph>
            </Stack>
          </Card.Block>
        </Card>

        {/* Welcome Content */}
        <Center style={{ flex: 1 }}>
          <Stack direction="vertical" gap="var(--ds-spacing-6)" align="center" style={{ maxWidth: '500px' }}>
            <Stack
              align="center"
              justify="center"
              style={{
                width: '100px',
                height: '100px',
                borderRadius: 'var(--ds-border-radius-full)',
                backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              <BookOpenIcon size={48} />
            </Stack>
            <Stack direction="vertical" gap="var(--ds-spacing-2)" align="center">
              <Heading level={2} data-size="lg" style={{ margin: 0, textAlign: 'center' }}>
                {t('explorer.welcome.title') || 'Welcome to Story Explorer'}
              </Heading>
              <Paragraph
                data-size="md"
                style={{
                  margin: 0,
                  color: 'var(--ds-color-neutral-text-subtle)',
                  textAlign: 'center',
                }}
              >
                {t('explorer.welcome.description') || 'Browse and preview UI components from your Storybook. Select a story from the sidebar to get started.'}
              </Paragraph>
            </Stack>
            <Stack direction="horizontal" gap="var(--ds-spacing-3)">
              <Card data-color="neutral">
                <Card.Block>
                  <Stack direction="vertical" gap="var(--ds-spacing-1)" align="center">
                    <Heading level={3} data-size="xl" style={{ margin: 0 }}>
                      {stories.length}
                    </Heading>
                    <Paragraph data-size="sm" style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}>
                      Stories
                    </Paragraph>
                  </Stack>
                </Card.Block>
              </Card>
              <Card data-color="neutral">
                <Card.Block>
                  <Stack direction="vertical" gap="var(--ds-spacing-1)" align="center">
                    <Heading level={3} data-size="xl" style={{ margin: 0 }}>
                      {treeNodes.length}
                    </Heading>
                    <Paragraph data-size="sm" style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}>
                      Categories
                    </Paragraph>
                  </Stack>
                </Card.Block>
              </Card>
            </Stack>
          </Stack>
        </Center>
      </Stack>
    </HorizontalLayout>
  );
}
