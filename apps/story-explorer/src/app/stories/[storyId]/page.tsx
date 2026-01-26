'use client';

import { useState, useEffect, useMemo, useCallback } from 'react';
import { Heading, Paragraph, Textfield, Button, Spinner, Card, Alert } from '@digdir/designsystemet-react';
import Link from 'next/link';
import { useRouter, useParams } from 'next/navigation';
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
  ExternalLinkIcon,
  CopyIcon,
  RefreshCwIcon,
  ArrowLeftIcon,
  ArrowRightIcon,
} from '@xala-technologies/platform-ui';
import { useGlobals } from '@/app/layout';
import {
  fetchStoryIndex,
  getStoriesArray,
  getStoryById,
  filterStories,
  buildIframeUrl,
  getStorybookBaseUrl,
} from '@xala-technologies/story-explorer-core';
import type { StoryIndex, StoryIndexItem } from '@xala-technologies/story-explorer-core';
import type { TreeNode } from '@xala-technologies/platform-ui';

/**
 * Build tree structure from stories
 */
function buildStoryTree(stories: StoryIndexItem[]): TreeNode[] {
  const tree = new Map<string, { node: TreeNode; children: Map<string, TreeNode> }>();
  const sortedStories = [...stories].sort((a, b) => a.title.localeCompare(b.title));

  for (const story of sortedStories) {
    const parts = story.title.split('/');
    const category = parts[0] || 'Uncategorized';
    const component = parts.length > 1 ? parts.slice(1).join('/') : story.name;

    if (!tree.has(category)) {
      tree.set(category, {
        node: { id: `category-${category}`, label: category, children: [] },
        children: new Map(),
      });
    }

    const categoryData = tree.get(category)!;

    if (!categoryData.children.has(component)) {
      categoryData.children.set(component, {
        id: `component-${category}-${component}`,
        label: component,
        children: [],
      });
    }

    const componentNode = categoryData.children.get(component)!;
    componentNode.children!.push({
      id: story.id,
      label: story.name,
      icon: story.type === 'docs' ? <FileTextIcon size={14} /> : <GridIcon size={14} />,
      metadata: { type: story.type },
    });
  }

  const result: TreeNode[] = [];
  for (const [, categoryData] of tree) {
    const categoryNode = { ...categoryData.node };
    categoryNode.children = Array.from(categoryData.children.values());
    result.push(categoryNode);
  }

  return result;
}

/**
 * Story viewer page - Storybook-like UI
 */
export default function StoryPage() {
  const params = useParams<{ storyId: string }>();
  const storyId = decodeURIComponent(params.storyId || '');
  const t = useT();
  const router = useRouter();
  const { globals, setGlobals } = useGlobals();

  const [index, setIndex] = useState<StoryIndex | null>(null);
  const [stories, setStories] = useState<StoryIndexItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [iframeLoading, setIframeLoading] = useState(true);
  const [linkCopied, setLinkCopied] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);

  useEffect(() => {
    async function loadIndex() {
      try {
        setLoading(true);
        setError(null);
        const fetchedIndex = await fetchStoryIndex();
        setIndex(fetchedIndex);
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

  // Get current story
  const story = index ? getStoryById(index, storyId) : undefined;
  const storyNotFound = !loading && !story;

  // Build iframe URL
  const baseUrl = getStorybookBaseUrl();
  const iframeUrl = story ? buildIframeUrl(baseUrl, story.id, globals) : '';
  const storybookUrl = story ? `${baseUrl}/?path=/story/${story.id}` : '';

  // Reset iframe loading when story changes
  useEffect(() => {
    setIframeLoading(true);
  }, [storyId, globals.colorScheme, globals.locale]);

  // Filter stories
  const filteredStories = useMemo(() => {
    if (!searchQuery) return stories;
    return filterStories(stories, { query: searchQuery });
  }, [stories, searchQuery]);

  // Build tree structure
  const treeNodes = useMemo(() => buildStoryTree(filteredStories), [filteredStories]);

  // Find expanded parents for current story
  const defaultExpandedIds = useMemo(() => {
    if (!story) return [];
    const parts = story.title.split('/');
    const category = parts[0] || 'Uncategorized';
    const component = parts.length > 1 ? parts.slice(1).join('/') : story.name;
    return [`category-${category}`, `component-${category}-${component}`];
  }, [story]);

  // Handlers
  const handleStorySelect = useCallback(
    (nodeId: string, node: TreeNode) => {
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

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(storybookUrl);
      setLinkCopied(true);
      setTimeout(() => setLinkCopied(false), 2000);
    } catch {
      // Ignore clipboard errors
    }
  };

  const handleRefresh = () => {
    setIframeLoading(true);
    const iframe = document.querySelector('iframe');
    if (iframe) {
      iframe.src = iframe.src;
    }
  };

  return (
    <HorizontalLayout style={{ height: '100vh' }}>
      {/* Sidebar - hidden in fullscreen */}
      {!isFullscreen && (
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
            gap="var(--ds-spacing-2)"
            align="center"
            style={{
              padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
              borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
            }}
          >
            <Button variant="tertiary" data-size="sm" asChild>
              <Link href="/stories">
                <ArrowLeftIcon size={16} />
              </Link>
            </Button>
            <Stack
              align="center"
              justify="center"
              style={{
                width: '28px',
                height: '28px',
                borderRadius: 'var(--ds-border-radius-md)',
                backgroundColor: 'var(--ds-color-accent-surface-default)',
                color: 'var(--ds-color-accent-base-default)',
              }}
            >
              <BookOpenIcon size={16} />
            </Stack>
            <Heading level={1} data-size="xs" style={{ margin: 0, flex: 1 }}>
              {t('explorer.title') || 'Story Explorer'}
            </Heading>
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
                style={{ backgroundColor: 'var(--ds-color-neutral-background-default)' }}
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
            <Button variant="tertiary" data-size="sm" onClick={handleLocaleToggle}>
              {globals.locale === 'nb' ? 'NO' : 'EN'}
            </Button>
          </Stack>

          {/* Story Tree */}
          <Stack direction="vertical" style={{ flex: 1, overflow: 'auto' }}>
            {loading ? (
              <Center style={{ padding: 'var(--ds-spacing-10)' }}>
                <Spinner aria-label="Loading..." />
              </Center>
            ) : (
              <TreeView
                nodes={treeNodes}
                selectedId={storyId}
                onSelect={handleStorySelect}
                size="sm"
                showIcons={true}
                expandOnLabelClick={true}
                defaultExpandedIds={defaultExpandedIds}
              />
            )}
          </Stack>
        </Stack>
      )}

      {/* Main Content */}
      <Stack direction="vertical" style={{ flex: 1, overflow: 'hidden' }}>
        {story ? (
          <>
            {/* Toolbar */}
            <Card
              data-color="neutral"
              style={{
                borderRadius: 0,
                borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
                flexShrink: 0,
              }}
            >
              <Card.Block>
                <Stack direction="horizontal" gap="var(--ds-spacing-4)" align="center" justify="space-between">
                  <Stack direction="vertical" gap="0">
                    <Stack direction="horizontal" gap="var(--ds-spacing-2)" align="center">
                      <Heading level={2} data-size="xs" style={{ margin: 0 }}>
                        {story.title.split('/').pop()}
                      </Heading>
                      {story.type === 'docs' && (
                        <Card data-size="sm" data-color="info" style={{ padding: '0 var(--ds-spacing-2)' }}>
                          <Paragraph data-size="xs" style={{ margin: 0 }}>
                            Docs
                          </Paragraph>
                        </Card>
                      )}
                    </Stack>
                    <Paragraph data-size="xs" style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}>
                      {story.name}
                    </Paragraph>
                  </Stack>
                  <Stack direction="horizontal" gap="var(--ds-spacing-2)">
                    <Button variant="tertiary" data-size="sm" onClick={handleCopyLink}>
                      <CopyIcon size={14} />
                      {linkCopied ? 'Copied!' : 'Copy'}
                    </Button>
                    <Button variant="tertiary" data-size="sm" asChild>
                      <a href={storybookUrl} target="_blank" rel="noopener noreferrer">
                        <ExternalLinkIcon size={14} />
                        Storybook
                      </a>
                    </Button>
                    <Button variant="tertiary" data-size="sm" onClick={handleRefresh}>
                      <RefreshCwIcon size={14} />
                    </Button>
                    <Button variant="tertiary" data-size="sm" onClick={() => setIsFullscreen(!isFullscreen)}>
                      {isFullscreen ? <ArrowLeftIcon size={14} /> : <ArrowRightIcon size={14} />}
                    </Button>
                  </Stack>
                </Stack>
              </Card.Block>
            </Card>

            {/* Story Canvas */}
            <Stack direction="vertical" style={{ flex: 1, position: 'relative' }}>
              {iframeLoading && (
                <Center
                  style={{
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'var(--ds-color-neutral-background-default)',
                    zIndex: 10,
                  }}
                >
                  <Stack direction="vertical" gap="var(--ds-spacing-3)" align="center">
                    <Spinner aria-label="Loading story..." />
                    <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                      Loading story...
                    </Paragraph>
                  </Stack>
                </Center>
              )}
              <iframe
                key={`${storyId}-${JSON.stringify(globals)}`}
                src={iframeUrl}
                title={`${story.title} - ${story.name}`}
                onLoad={() => setIframeLoading(false)}
                style={{
                  flex: 1,
                  width: '100%',
                  border: 'none',
                  backgroundColor: 'var(--ds-color-neutral-background-default)',
                }}
                sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              />
            </Stack>
          </>
        ) : storyNotFound ? (
          <Center style={{ flex: 1 }}>
            <Alert data-color="warning" style={{ maxWidth: '400px' }}>
              <Heading level={2} data-size="sm">
                Story not found
              </Heading>
              <Paragraph data-size="sm">{storyId}</Paragraph>
              <Button data-size="sm" variant="secondary" asChild style={{ marginTop: 'var(--ds-spacing-4)' }}>
                <Link href="/stories">Back to catalog</Link>
              </Button>
            </Alert>
          </Center>
        ) : (
          <Center style={{ flex: 1 }}>
            <Spinner aria-label="Loading..." />
          </Center>
        )}
      </Stack>
    </HorizontalLayout>
  );
}
