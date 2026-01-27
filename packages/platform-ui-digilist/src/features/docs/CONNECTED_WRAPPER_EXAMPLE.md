# Docs Feature - Connected Wrapper Example

This document shows how to create connected wrapper components that use the pure presentational docs components with SDK hooks and i18n.

## Pattern Overview

The docs feature provides pure presentational components. To use them in your app, create connected wrapper components in your runtime/app layer that:

1. Fetch data using SDK hooks
2. Translate labels using i18n
3. Handle routing
4. Pass everything as props to the pure UI components

## Example: DocsLayoutConnected

```typescript
/**
 * DocsLayoutConnected.tsx
 *
 * Connected wrapper for DocsLayout that integrates with:
 * - React Router for navigation
 * - i18next for translations
 * - SDK for feature flags and navigation data
 */

import { useMemo } from 'react';
import { useLocation, useNavigate, Outlet } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useFeatureFlags } from '@digilist/client-sdk';
import {
  DocsLayout,
  type DocsLayoutLabels,
  type DocsNavSection,
  type DocsNavItem,
  DOCS_FEATURE_FLAGS,
  isSectionEnabled,
} from '@xala-technologies/platform-ui/features/docs';
import { HomeIcon, SearchIcon, BookOpenIcon } from '@xala-technologies/platform-ui/primitives';
import type { BottomNavigationItem } from '@xala-technologies/platform-ui/composed';

/**
 * Connected DocsLayout with SDK integration
 */
export function DocsLayoutConnected() {
  const { t, i18n } = useTranslation();
  const location = useLocation();
  const navigate = useNavigate();
  const flags = useFeatureFlags();

  // Use default flags if SDK hasn't loaded yet
  const activeFlags = Object.keys(flags).length > 0
    ? flags
    : { ...DOCS_FEATURE_FLAGS, 'docs.enabled': true };

  // Create labels from translations
  const labels: DocsLayoutLabels = useMemo(() => ({
    header: {
      searchPlaceholder: t('form.docs.search.placeholder', 'Search documentation...'),
      searchLabel: t('docs.search.label', 'Search'),
      searchButton: t('docs.search.button', 'Search'),
      languageToggleNorwegian: t('docs.language.norwegian', 'Switch to Norwegian'),
      languageToggleEnglish: t('docs.language.english', 'Switch to English'),
    },
    sidebar: {
      brandName: t('common.text.digilist', 'Digilist'),
      brandTagline: t('docs.page.title', 'Documentation'),
    },
    mobileNavHome: t('docs.nav.home', 'Home'),
    mobileNavSearch: t('docs.nav.search', 'Search'),
    mobileNavGuides: t('docs.nav.guides', 'Guides'),
  }), [t]);

  // Build navigation sections with feature flag filtering
  const navSections: DocsNavSection[] = useMemo(() => {
    const sections: DocsNavSection[] = [
      {
        items: [
          {
            id: 'home',
            label: t('docs.nav.home', 'Overview'),
            description: t('docs.nav.homeDesc', 'Get started with Digilist'),
            href: '/',
            icon: 'home',
          },
          {
            id: 'search',
            label: t('docs.nav.search', 'Search'),
            description: t('docs.nav.searchDesc', 'Search documentation'),
            href: '/search',
            icon: 'search',
            featureFlag: 'docs.search.enabled',
          },
        ],
      },
      {
        title: t('docs.nav.sections', 'Sections'),
        items: [
          {
            id: 'booking',
            label: t('docs.nav.booking', 'Booking System'),
            description: t('docs.nav.bookingDesc', 'Create and manage bookings'),
            href: '/booking',
            icon: 'calendar',
            featureFlag: 'docs.section.booking.enabled',
          },
          {
            id: 'rbac',
            label: t('docs.nav.rbac', 'Roles & Access'),
            description: t('docs.nav.rbacDesc', 'Understand user roles and permissions'),
            href: '/rbac',
            icon: 'shield',
            featureFlag: 'docs.section.rbac.enabled',
          },
          {
            id: 'payments',
            label: t('docs.nav.payments', 'Payments'),
            description: t('docs.nav.paymentsDesc', 'Payments and invoicing'),
            href: '/payments',
            icon: 'credit-card',
            featureFlag: 'docs.section.payments.enabled',
          },
          {
            id: 'admin',
            label: t('docs.nav.admin', 'Administration'),
            description: t('docs.nav.adminDesc', 'Settings and configuration'),
            href: '/admin',
            icon: 'settings',
            featureFlag: 'docs.section.admin.enabled',
          },
          {
            id: 'api',
            label: t('docs.nav.api', 'API Documentation'),
            description: t('docs.nav.apiDesc', 'Technical reference for developers'),
            href: '/api',
            icon: 'api',
            featureFlag: 'docs.section.api.enabled',
          },
          {
            id: 'integrations',
            label: t('docs.nav.integrations', 'Integrations'),
            description: t('docs.nav.integrationsDesc', 'Connect to other systems'),
            href: '/integrations',
            icon: 'link',
            featureFlag: 'docs.section.integrations.enabled',
          },
          {
            id: 'faq',
            label: t('docs.nav.faq', 'FAQ'),
            description: t('docs.nav.faqDesc', 'Common questions and answers'),
            href: '/faq',
            icon: 'help',
            featureFlag: 'docs.section.faq.enabled',
          },
        ],
      },
      {
        title: t('docs.nav.roleGuides', 'Role Guides'),
        items: [
          {
            id: 'role-end-user',
            label: t('docs.nav.roleEndUser', 'For End Users'),
            href: '/roles/web/end-user',
            icon: 'users',
            featureFlag: 'docs.roleGuides.enabled',
          },
          {
            id: 'role-org-member',
            label: t('docs.nav.roleOrgMember', 'For Org Members'),
            href: '/roles/backoffice/org-member',
            icon: 'users',
            featureFlag: 'docs.roleGuides.enabled',
          },
          {
            id: 'role-org-admin',
            label: t('docs.nav.roleOrgAdmin', 'For Org Admins'),
            href: '/roles/backoffice/org-admin',
            icon: 'users',
            featureFlag: 'docs.roleGuides.enabled',
          },
        ],
      },
    ];

    // Filter sections based on feature flags
    return sections
      .map((section) => ({
        ...section,
        items: section.items.filter((item) => {
          if (!item.featureFlag) return true;
          return isSectionEnabled(item.id, activeFlags);
        }),
      }))
      .filter((section) => section.items.length > 0);
  }, [t, activeFlags]);

  // Mobile navigation items
  const mobileNavItems: BottomNavigationItem[] = useMemo(() => [
    {
      id: 'home',
      label: labels.mobileNavHome,
      icon: <HomeIcon />,
      href: '/',
      active: location.pathname === '/',
    },
    {
      id: 'search',
      label: labels.mobileNavSearch,
      icon: <SearchIcon />,
      href: '/search',
      active: location.pathname === '/search',
    },
    {
      id: 'guides',
      label: labels.mobileNavGuides,
      icon: <BookOpenIcon />,
      href: '/roles/web/end-user',
      active: location.pathname.startsWith('/roles'),
    },
  ], [labels, location.pathname]);

  // Event handlers
  const handleSearch = (query: string) => {
    navigate(`/search?q=${encodeURIComponent(query)}`);
  };

  const handleLocaleToggle = () => {
    const newLocale = i18n.language === 'nb' ? 'en' : 'nb';
    i18n.changeLanguage(newLocale);
  };

  const handleNavItemClick = (item: DocsNavItem) => {
    navigate(item.href);
  };

  return (
    <DocsLayout
      labels={labels}
      navSections={navSections}
      currentPath={location.pathname}
      locale={i18n.language}
      mobileNavItems={mobileNavItems}
      onSearch={handleSearch}
      onLocaleToggle={handleLocaleToggle}
      onNavItemClick={handleNavItemClick}
    >
      <Outlet />
    </DocsLayout>
  );
}
```

## Example: DocsArticlePageConnected

```typescript
/**
 * DocsArticlePageConnected.tsx
 *
 * Connected wrapper that shows how to use DocsRightTOC with content fetching
 */

import { useMemo } from 'react';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { useTranslation } from 'react-i18next';
import { docsService } from '@digilist/client-sdk';
import {
  DocsRightTOC,
  type DocsRightTOCLabels,
  type DocsTocItem,
} from '@xala-technologies/platform-ui/features/docs';
import { Heading, Paragraph } from '@xala-technologies/platform-ui/primitives';

/**
 * Generate TOC items from markdown content
 */
function extractTocItems(markdownContent: string): DocsTocItem[] {
  const headingRegex = /^(#{2,3})\s+(.+)$/gm;
  const items: DocsTocItem[] = [];
  let match;

  while ((match = headingRegex.exec(markdownContent)) !== null) {
    const level = match[1].length; // ## = 2, ### = 3
    const text = match[2].trim();
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');

    items.push({ id, text, level });
  }

  return items;
}

export function DocsArticlePageConnected() {
  const { slug } = useParams<{ slug: string }>();
  const { t } = useTranslation();

  // Fetch article content
  const { data: article, isLoading } = useQuery({
    queryKey: ['docs', 'article', slug],
    queryFn: () => docsService.getArticle(slug!),
    enabled: !!slug,
  });

  // Generate TOC from article content
  const tocItems = useMemo(() => {
    if (!article?.content) return [];
    return extractTocItems(article.content);
  }, [article?.content]);

  // TOC labels
  const tocLabels: DocsRightTOCLabels = {
    tocLabel: t('docs.toc.label', 'Table of Contents'),
    tocTitle: t('docs.toc.page.title', 'On this page'),
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!article) {
    return <div>Article not found</div>;
  }

  return (
    <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)' }}>
      {/* Main content */}
      <article style={{ flex: 1, maxWidth: '800px' }}>
        <Heading level={1} data-size="xl">
          {article.title}
        </Heading>
        <Paragraph data-size="md">
          Last updated: {article.lastUpdated}
        </Paragraph>

        {/* Render markdown content */}
        <div dangerouslySetInnerHTML={{ __html: article.content }} />
      </article>

      {/* Right TOC */}
      {tocItems.length > 0 && (
        <aside style={{ width: '280px' }}>
          <DocsRightTOC
            items={tocItems}
            labels={tocLabels}
            onItemClick={(id) => {
              console.log('TOC item clicked:', id);
            }}
          />
        </aside>
      )}
    </div>
  );
}
```

## Usage in Router

```typescript
import { DocsLayoutConnected } from './connected/DocsLayoutConnected';
import { DocsArticlePageConnected } from './connected/DocsArticlePageConnected';

function DocsRoutes() {
  return (
    <Route element={<DocsLayoutConnected />}>
      <Route index element={<DocsHomePage />} />
      <Route path="search" element={<DocsSearchPage />} />
      <Route path=":slug" element={<DocsArticlePageConnected />} />
    </Route>
  );
}
```

## Key Patterns

### 1. Label Translation

Always use `useMemo` for labels to avoid recreating objects on every render:

```typescript
const labels: DocsLayoutLabels = useMemo(
  () => ({
    header: {
      searchPlaceholder: t('form.docs.search.placeholder'),
      // ... other labels
    },
  }),
  [t]
);
```

### 2. Feature Flag Filtering

Filter navigation sections based on feature flags:

```typescript
const navSections = useMemo(() => {
  return sections
    .map((section) => ({
      ...section,
      items: section.items.filter((item) => {
        if (!item.featureFlag) return true;
        return isSectionEnabled(item.id, activeFlags);
      }),
    }))
    .filter((section) => section.items.length > 0);
}, [activeFlags]);
```

### 3. Event Handlers

Create handlers that integrate with your routing/state management:

```typescript
const handleSearch = (query: string) => {
  navigate(`/search?q=${encodeURIComponent(query)}`);
};

const handleNavItemClick = (item: DocsNavItem) => {
  navigate(item.href);
};
```

## Testing

The pure components are easy to test without mocking SDK or i18n:

```typescript
import { render, screen } from '@testing-library/react';
import { DocsHeader } from '@xala-technologies/platform-ui/features/docs';

describe('DocsHeader', () => {
  const labels = {
    searchPlaceholder: 'Search docs...',
    searchLabel: 'Search',
    searchButton: 'Search',
    languageToggleNorwegian: 'NO',
    languageToggleEnglish: 'EN',
  };

  it('renders search input with placeholder', () => {
    render(
      <DocsHeader
        labels={labels}
        locale="nb"
        onSearch={jest.fn()}
        onLocaleToggle={jest.fn()}
      />
    );

    expect(screen.getByPlaceholderText('Search docs...')).toBeInTheDocument();
  });

  it('calls onSearch when form is submitted', () => {
    const handleSearch = jest.fn();
    render(
      <DocsHeader
        labels={labels}
        locale="nb"
        onSearch={handleSearch}
        onLocaleToggle={jest.fn()}
      />
    );

    const input = screen.getByPlaceholderText('Search docs...');
    fireEvent.change(input, { target: { value: 'booking' } });
    fireEvent.submit(input.closest('form')!);

    expect(handleSearch).toHaveBeenCalledWith('booking');
  });
});
```

## Benefits

1. **Separation of Concerns** - UI logic separate from data fetching
2. **Reusability** - Pure components can be reused in different contexts
3. **Testability** - Easy to test without complex mocks
4. **Type Safety** - Full TypeScript support
5. **Flexibility** - Can integrate with any i18n/routing solution
