/**
 * Page Header Scaffold
 *
 * Creates standardized page headers with title, subtitle, breadcrumbs, and actions.
 * Pattern from Digilist DashboardPageHeader.
 */

import React from 'react';

export interface BreadcrumbItem {
  label: string;
  href?: string;
}

export interface PageHeaderConfig {
  /** Page title */
  title: string;
  /** Optional subtitle */
  subtitle?: string;
  /** Breadcrumb navigation */
  breadcrumbs?: BreadcrumbItem[];
  /** Primary action button */
  primaryAction?: React.ReactNode;
  /** Secondary action buttons */
  secondaryActions?: React.ReactNode[];
  /** Back button config */
  backHref?: string;
}

/**
 * PageHeader component
 */
export function PageHeader({
  title,
  subtitle,
  breadcrumbs,
  primaryAction,
  secondaryActions,
  backHref,
}: PageHeaderConfig): React.ReactElement {
  return React.createElement(
    'header',
    {
      'data-testid': 'page-header',
      style: {
        marginBottom: 'var(--ds-spacing-6)',
      },
    },
    // Breadcrumbs
    breadcrumbs && breadcrumbs.length > 0 && React.createElement(
      'nav',
      {
        'aria-label': 'Breadcrumb',
        style: {
          marginBottom: 'var(--ds-spacing-2)',
          fontSize: 'var(--ds-font-size-sm)',
        },
      },
      React.createElement(
        'ol',
        {
          style: {
            display: 'flex',
            listStyle: 'none',
            margin: 0,
            padding: 0,
            gap: 'var(--ds-spacing-1)',
          },
        },
        breadcrumbs.map((crumb, i) =>
          React.createElement(
            'li',
            { key: i, style: { display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-1)' } },
            i > 0 && React.createElement('span', { style: { color: 'var(--ds-color-neutral-text-subtle)' } }, '/'),
            crumb.href
              ? React.createElement('a', { href: crumb.href, style: { color: 'var(--ds-color-accent-text-default)', textDecoration: 'none' } }, crumb.label)
              : React.createElement('span', { style: { color: 'var(--ds-color-neutral-text-subtle)' } }, crumb.label)
          )
        )
      )
    ),
    // Main header content
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          flexWrap: 'wrap',
          gap: 'var(--ds-spacing-4)',
        },
      },
      // Title section
      React.createElement(
        'div',
        { style: { flex: 1, minWidth: '200px' } },
        // Back link
        backHref && React.createElement(
          'a',
          {
            href: backHref,
            style: {
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-1)',
              fontSize: 'var(--ds-font-size-sm)',
              color: 'var(--ds-color-accent-text-default)',
              textDecoration: 'none',
              marginBottom: 'var(--ds-spacing-2)',
            },
          },
          '← Back'
        ),
        React.createElement(
          'h1',
          {
            style: {
              fontSize: 'var(--ds-font-size-2xl)',
              fontWeight: 'var(--ds-font-weight-semibold)',
              margin: 0,
              lineHeight: 1.2,
            },
          },
          title
        ),
        subtitle && React.createElement(
          'p',
          {
            style: {
              marginTop: 'var(--ds-spacing-1)',
              color: 'var(--ds-color-neutral-text-subtle)',
              fontSize: 'var(--ds-font-size-md)',
            },
          },
          subtitle
        )
      ),
      // Actions section
      (primaryAction || secondaryActions) && React.createElement(
        'div',
        {
          style: {
            display: 'flex',
            gap: 'var(--ds-spacing-2)',
            flexWrap: 'wrap',
          },
        },
        secondaryActions,
        primaryAction
      )
    )
  );
}

/**
 * Create a page header element
 */
export function createPageHeader(config: PageHeaderConfig): React.ReactElement {
  return React.createElement(PageHeader, config);
}
