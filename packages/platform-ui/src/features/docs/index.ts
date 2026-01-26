/**
 * Docs Feature
 *
 * Pure presentational components for the documentation app.
 *
 * ## Components
 *
 * - **DocsLayout** - Main layout shell with sidebar and header
 * - **DocsHeader** - Top header with search bar and language switcher
 * - **DocsSidebar** - Navigation sidebar with feature-flag controlled sections
 * - **DocsRightTOC** - Right sidebar Table of Contents with scroll tracking
 *
 * ## Usage
 *
 * All components are pure presentational - they receive data via props and
 * emit events via callbacks. No SDK hooks, no i18n, no business logic.
 *
 * @example
 * ```tsx
 * import { DocsLayout, type DocsLayoutLabels } from '@xala-technologies/platform-ui/features/docs';
 *
 * const labels: DocsLayoutLabels = {
 *   header: {
 *     searchPlaceholder: 'Search documentation...',
 *     searchLabel: 'Search',
 *     searchButton: 'Search',
 *     languageToggleNorwegian: 'Switch to Norwegian',
 *     languageToggleEnglish: 'Switch to English',
 *   },
 *   sidebar: {
 *     brandName: 'Digilist',
 *     brandTagline: 'Documentation',
 *   },
 *   mobileNavHome: 'Home',
 *   mobileNavSearch: 'Search',
 *   mobileNavGuides: 'Guides',
 * };
 *
 * <DocsLayout
 *   labels={labels}
 *   navSections={navSections}
 *   currentPath={location.pathname}
 *   locale={currentLocale}
 *   onSearch={handleSearch}
 *   onLocaleToggle={handleLocaleToggle}
 * >
 *   <YourContent />
 * </DocsLayout>
 * ```
 *
 * @module @xala-technologies/platform-ui/features/docs
 */

// =============================================================================
// Components
// =============================================================================

export {
  DocsLayout,
  DocsHeader,
  DocsSidebar,
  DocsRightTOC,
} from './components';

// =============================================================================
// Component Props and Labels
// =============================================================================

export type {
  DocsLayoutProps,
  DocsLayoutLabels,
  DocsHeaderProps,
  DocsHeaderLabels,
  DocsSidebarProps,
  DocsSidebarLabels,
  DocsRightTOCProps,
  DocsRightTOCLabels,
} from './components';

// =============================================================================
// Types
// =============================================================================

export type {
  DocsNavItem,
  DocsNavSection,
  DocsArticle,
  DocsTocItem,
} from './types';

// =============================================================================
// Library (Feature Flags, Utilities)
// =============================================================================

export {
  DOCS_FEATURE_FLAGS,
  SECTION_FLAG_MAP,
  isSectionEnabled,
  type DocsFeatureFlagKey,
} from './lib';
