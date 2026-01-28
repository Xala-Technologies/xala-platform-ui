/**
 * Docs Module Types
 *
 * Type definitions for the documentation module.
 */

/**
 * Table of Contents item
 */
export interface TocItem {
  id: string;
  text: string;
  level: 2 | 3;
}

/**
 * Navigation item for docs sidebar
 */
export interface DocsNavItem {
  id: string;
  label: string;
  description?: string;
  href: string;
  icon?: string;
  featureFlag?: string;
}

/**
 * Navigation section for docs sidebar
 */
export interface DocsNavSection {
  title?: string;
  items: DocsNavItem[];
}

/**
 * API navigation item format
 */
export interface NavItemFromApi {
  key: string;
  labelKey: string;
  routeKey?: string;
  iconKey?: string;
  section?: string;
  order?: number;
}
