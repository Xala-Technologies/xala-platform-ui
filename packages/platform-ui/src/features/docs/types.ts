/**
 * Docs Types
 *
 * Type definitions for the documentation app navigation and content.
 *
 * @module @xala-technologies/platform-ui/features/docs
 */

export interface DocsNavItem {
  id: string;
  label: string;
  description?: string;
  href: string;
  icon?: string;
  featureFlag?: string;
}

export interface DocsNavSection {
  title?: string;
  items: DocsNavItem[];
}

export interface DocsArticle {
  slug: string;
  title: string;
  content: string;
  section: string;
  lastUpdated?: string;
}

export interface DocsTocItem {
  id: string;
  text: string;
  level: number;
}
