/**
 * Story Index API
 *
 * Fetches and normalizes Storybook index.json
 */

import type { StoryIndex, StoryIndexItem, StoryCategory, GroupedStories, StoryFilterOptions } from './types';
import { getCategoryFromTitle } from './types';
import { StoryIndexSchema, isV5Index, type StoryIndexRaw } from './schemas';

/**
 * API Configuration
 */
export interface StoryApiConfig {
  baseUrl: string;
  indexPath?: string;
  cacheTtlMs?: number;
}

/**
 * Default configuration
 */
const DEFAULT_CONFIG: StoryApiConfig = {
  baseUrl: 'http://localhost:6006',
  indexPath: 'index.json',
  cacheTtlMs: 30 * 1000,
};

let currentConfig = { ...DEFAULT_CONFIG };

/**
 * Configure the Story API
 */
export function configureStoryApi(config: Partial<StoryApiConfig>) {
  currentConfig = { ...currentConfig, ...config };
}

/**
 * Get current configuration
 */
export function getStoryApiConfig(): StoryApiConfig {
  return { ...currentConfig };
}

/**
 * Simple in-memory cache
 */
let indexCache: { data: StoryIndex; timestamp: number } | null = null;

/**
 * Clear the index cache
 */
export function clearIndexCache() {
  indexCache = null;
}

/**
 * Fetch and normalize the story index
 */
export async function fetchStoryIndex(config?: Partial<StoryApiConfig>): Promise<StoryIndex> {
  const { baseUrl, indexPath, cacheTtlMs } = { ...currentConfig, ...config };

  // Check cache
  if (indexCache && Date.now() - indexCache.timestamp < (cacheTtlMs || 30000)) {
    return indexCache.data;
  }

  const url = `${baseUrl}/${indexPath}`;

  try {
    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`Failed to fetch index: ${response.status} ${response.statusText}`);
    }

    const rawData = await response.json();
    const parsed = StoryIndexSchema.parse(rawData);
    const normalized = normalizeIndex(parsed);

    // Update cache
    indexCache = { data: normalized, timestamp: Date.now() };

    return normalized;
  } catch (error) {
    console.error('[Story Explorer] Failed to fetch story index:', error);
    throw error;
  }
}

/**
 * Normalize index to consistent v5 format
 */
function normalizeIndex(raw: StoryIndexRaw): StoryIndex {
  if (isV5Index(raw)) {
    return {
      v: raw.v,
      entries: Object.fromEntries(
        Object.entries(raw.entries).map(([id, entry]) => [
          id,
          {
            id: entry.id,
            title: entry.title,
            name: entry.name,
            type: entry.type,
            importPath: entry.importPath,
            tags: entry.tags || [],
          } as StoryIndexItem,
        ])
      ),
    };
  }

  // Convert v4 format to v5
  return {
    v: raw.v || 4,
    entries: Object.fromEntries(
      Object.entries(raw.stories).map(([id, entry]) => [
        id,
        {
          id: entry.id,
          title: entry.title,
          name: entry.name,
          type: 'story' as const,
          importPath: entry.importPath,
          tags: [],
        } as StoryIndexItem,
      ])
    ),
  };
}

/**
 * Get all stories as array
 */
export function getStoriesArray(index: StoryIndex): StoryIndexItem[] {
  return Object.values(index.entries);
}

/**
 * Filter stories by options
 */
export function filterStories(
  stories: StoryIndexItem[],
  options: StoryFilterOptions
): StoryIndexItem[] {
  let result = stories;

  if (options.type) {
    result = result.filter((s) => s.type === options.type);
  }

  if (options.category) {
    const categoryLower = options.category.toLowerCase();
    result = result.filter((s) => {
      const storyCategory = getCategoryFromTitle(s.title).toLowerCase();
      return storyCategory === categoryLower;
    });
  }

  if (options.tags && options.tags.length > 0) {
    const tagsLower = options.tags.map((t) => t.toLowerCase());
    result = result.filter((s) =>
      s.tags.some((tag) => tagsLower.includes(tag.toLowerCase()))
    );
  }

  if (options.query) {
    const queryLower = options.query.toLowerCase();
    result = result.filter(
      (s) =>
        s.title.toLowerCase().includes(queryLower) ||
        s.name.toLowerCase().includes(queryLower) ||
        s.id.toLowerCase().includes(queryLower)
    );
  }

  return result;
}

/**
 * Get unique categories from stories
 */
export function getCategories(stories: StoryIndexItem[]): StoryCategory[] {
  const categoryMap = new Map<string, number>();

  for (const story of stories) {
    const category = getCategoryFromTitle(story.title);
    categoryMap.set(category, (categoryMap.get(category) || 0) + 1);
  }

  return Array.from(categoryMap.entries())
    .map(([name, count]) => ({
      name,
      path: name.toLowerCase().replace(/\s+/g, '-'),
      count,
    }))
    .sort((a, b) => a.name.localeCompare(b.name));
}

/**
 * Get unique tags from stories
 */
export function getTags(stories: StoryIndexItem[]): string[] {
  const tagSet = new Set<string>();

  for (const story of stories) {
    for (const tag of story.tags) {
      tagSet.add(tag);
    }
  }

  return Array.from(tagSet).sort();
}

/**
 * Group stories by category
 */
export function groupStoriesByCategory(stories: StoryIndexItem[]): GroupedStories[] {
  const groups = new Map<string, StoryIndexItem[]>();

  for (const story of stories) {
    const category = getCategoryFromTitle(story.title);
    if (!groups.has(category)) {
      groups.set(category, []);
    }
    groups.get(category)!.push(story);
  }

  return Array.from(groups.entries())
    .map(([name, categoryStories]) => ({
      category: {
        name,
        path: name.toLowerCase().replace(/\s+/g, '-'),
        count: categoryStories.length,
      },
      stories: categoryStories.sort((a, b) => a.title.localeCompare(b.title)),
    }))
    .sort((a, b) => a.category.name.localeCompare(b.category.name));
}

/**
 * Get a single story by ID
 */
export function getStoryById(index: StoryIndex, storyId: string): StoryIndexItem | undefined {
  return index.entries[storyId];
}

/**
 * Get Storybook base URL
 */
export function getStorybookBaseUrl(): string {
  return currentConfig.baseUrl;
}
