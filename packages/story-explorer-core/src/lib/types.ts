/**
 * Story Explorer Type Definitions
 *
 * Normalized data model for Storybook index entries
 */

/**
 * Supported story entry types
 */
export type StoryEntryType = 'story' | 'docs';

/**
 * Normalized story index item
 */
export interface StoryIndexItem {
  /** Unique story ID (e.g., "components-button--primary") */
  id: string;
  /** Display title with path (e.g., "Components/Button") */
  title: string;
  /** Story name (e.g., "Primary") */
  name: string;
  /** Entry type */
  type: StoryEntryType;
  /** Import path relative to project root */
  importPath: string;
  /** Story tags (e.g., ["dev", "test", "autodocs"]) */
  tags: string[];
}

/**
 * Normalized story index (v5 format)
 */
export interface StoryIndex {
  /** Index version */
  v: number;
  /** Story entries keyed by ID */
  entries: Record<string, StoryIndexItem>;
}

/**
 * Category derived from story title path
 */
export interface StoryCategory {
  /** Category name (e.g., "Components") */
  name: string;
  /** Category path (e.g., "components") */
  path: string;
  /** Number of stories in this category */
  count: number;
  /** Subcategories */
  subcategories?: StoryCategory[];
}

/**
 * Grouped stories by category
 */
export interface GroupedStories {
  /** Category info */
  category: StoryCategory;
  /** Stories in this category */
  stories: StoryIndexItem[];
}

/**
 * Search/filter options for story list
 */
export interface StoryFilterOptions {
  /** Search query (matches title, name, id) */
  query?: string;
  /** Filter by category path */
  category?: string;
  /** Filter by tags (OR match) */
  tags?: string[];
  /** Filter by entry type */
  type?: StoryEntryType;
}

/**
 * Storybook globals state
 */
export interface StorybookGlobals {
  /** Color scheme */
  colorScheme: 'light' | 'dark';
  /** Brand theme */
  brandTheme: 'custom' | 'xaheen' | 'digdir';
  /** Locale */
  locale: 'nb' | 'en';
}

/**
 * Default globals
 */
export const DEFAULT_GLOBALS: StorybookGlobals = {
  colorScheme: 'light',
  brandTheme: 'custom',
  locale: 'nb',
};

/**
 * Parse story title into category path
 * @example "Components/Button" -> ["Components"]
 * @example "Composed/DataTable" -> ["Composed"]
 */
export function parseTitlePath(title: string): string[] {
  const parts = title.split('/');
  return parts.slice(0, -1); // Remove the component name
}

/**
 * Get category from story title
 * @example "Components/Button" -> "Components"
 */
export function getCategoryFromTitle(title: string): string {
  const parts = title.split('/');
  return parts[0] || 'Uncategorized';
}

/**
 * Get component name from story title
 * @example "Components/Button" -> "Button"
 */
export function getComponentFromTitle(title: string): string {
  const parts = title.split('/');
  return parts[parts.length - 1] || title;
}

/**
 * Build iframe URL for a story
 */
export function buildIframeUrl(
  baseUrl: string,
  storyId: string,
  globals?: Partial<StorybookGlobals>
): string {
  const url = new URL(`${baseUrl}/iframe.html`);
  url.searchParams.set('id', storyId);
  url.searchParams.set('viewMode', 'story');

  if (globals) {
    const globalsString = Object.entries(globals)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `${key}:${value}`)
      .join(';');
    if (globalsString) {
      url.searchParams.set('globals', globalsString);
    }
  }

  return url.toString();
}

/**
 * Build docs iframe URL
 */
export function buildDocsUrl(
  baseUrl: string,
  storyId: string,
  globals?: Partial<StorybookGlobals>
): string {
  const url = new URL(`${baseUrl}/iframe.html`);
  url.searchParams.set('id', storyId);
  url.searchParams.set('viewMode', 'docs');

  if (globals) {
    const globalsString = Object.entries(globals)
      .filter(([, value]) => value !== undefined)
      .map(([key, value]) => `${key}:${value}`)
      .join(';');
    if (globalsString) {
      url.searchParams.set('globals', globalsString);
    }
  }

  return url.toString();
}
