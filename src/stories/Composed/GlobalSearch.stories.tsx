import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { GlobalSearch, type SearchResultGroup } from '../../index';

/**
 * GlobalSearch provides a global search with typeahead suggestions.
 *
 * ## Features
 * - Typeahead search results
 * - Recent searches
 * - Keyboard shortcut support (Cmd+K / Ctrl+K)
 * - Result grouping
 * - Empty states
 *
 * ## When to Use
 * - Global navigation search
 * - Command palette integration
 * - Quick access to content
 */
const meta: Meta<typeof GlobalSearch> = {
  title: 'Composed/GlobalSearch',
  component: GlobalSearch,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
GlobalSearch provides a global search component with typeahead suggestions.

## Features
- Typeahead search results
- Recent searches display
- Keyboard shortcut support (Cmd+K / Ctrl+K)
- Result grouping
- Empty states

## When to Use
- Global navigation search
- Command palette integration
- Quick access to content
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GlobalSearch>;

// Sample search results
const useSampleResults = (query: string): SearchResultGroup[] => {
  const t = useT();
  if (!query) {
    return [
      {
        title: t('storybook.globalSearch.recentSearches'),
        items: [
          { id: '1', title: t('storybook.globalSearch.order12345'), type: 'recent' },
          { id: '2', title: t('storybook.globalSearch.customerJohn'), type: 'recent' },
        ],
      },
    ];
  }
  return [
    {
      title: t('storybook.globalSearch.suggestions'),
      items: [
        {
          id: '3',
          title: t('storybook.globalSearch.productCatalog'),
          subtitle: t('storybook.globalSearch.productsCategory'),
          type: 'page',
        },
        {
          id: '4',
          title: t('storybook.globalSearch.orderHistory'),
          subtitle: t('storybook.globalSearch.ordersCategory'),
          type: 'page',
        },
        {
          id: '5',
          title: t('storybook.globalSearch.customerDatabase'),
          subtitle: t('storybook.globalSearch.customersCategory'),
          type: 'page',
        },
      ],
    },
  ];
};

/**
 * Default global search
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [query, setQuery] = useState('');
    const results = useSampleResults(query);
    return (
      <div style={{ width: '600px', padding: 'var(--ds-spacing-4)' }}>
        <GlobalSearch
          value={query}
          onSearchChange={setQuery}
          results={results}
          onResultSelect={(result) => console.log('Selected:', result)}
          onSubmit={() => console.log('Submit:', query)}
          placeholder={t('storybook.globalSearch.placeholder')}
        />
      </div>
    );
  },
};

/**
 * Global search with keyboard shortcut
 */
export const WithShortcut: Story = {
  render: function Render() {
    const t = useT();
    const [query, setQuery] = useState('');
    const results = useSampleResults(query);
    return (
      <div style={{ width: '600px', padding: 'var(--ds-spacing-4)' }}>
        <GlobalSearch
          value={query}
          onSearchChange={setQuery}
          results={results}
          onResultSelect={(result) => console.log('Selected:', result)}
          onSubmit={() => console.log('Submit:', query)}
          placeholder={t('storybook.globalSearch.placeholder')}
          showShortcut
          enableGlobalShortcut
        />
      </div>
    );
  },
};

/**
 * Global search with no results
 */
export const NoResults: Story = {
  render: function Render() {
    const t = useT();
    const [query, setQuery] = useState('nonexistent');
    return (
      <div style={{ width: '600px', padding: 'var(--ds-spacing-4)' }}>
        <GlobalSearch
          value={query}
          onSearchChange={setQuery}
          results={[]}
          onResultSelect={(result) => console.log('Selected:', result)}
          onSubmit={() => console.log('Submit:', query)}
          placeholder={t('storybook.globalSearch.placeholder')}
          noResultsText={t('storybook.globalSearch.noResults')}
        />
      </div>
    );
  },
};

/**
 * Global search with empty state
 */
export const EmptyState: Story = {
  render: function Render() {
    const t = useT();
    const [query, setQuery] = useState('');
    return (
      <div style={{ width: '600px', padding: 'var(--ds-spacing-4)' }}>
        <GlobalSearch
          value={query}
          onSearchChange={setQuery}
          results={[]}
          onResultSelect={(result) => console.log('Selected:', result)}
          onSubmit={() => console.log('Submit:', query)}
          placeholder={t('storybook.globalSearch.placeholder')}
          noResultsText={t('storybook.globalSearch.noRecentSearches')}
        />
      </div>
    );
  },
};

/**
 * Global search with multiple result groups
 */
export const MultipleGroups: Story = {
  render: function Render() {
    const t = useT();
    const [query, setQuery] = useState('test');
    const results: SearchResultGroup[] = [
      {
        title: t('storybook.globalSearch.recentSearches'),
        items: [
          { id: '1', title: t('storybook.globalSearch.order12345'), type: 'recent' },
          { id: '2', title: t('storybook.globalSearch.customerJohn'), type: 'recent' },
        ],
      },
      {
        title: t('storybook.globalSearch.suggestions'),
        items: [
          {
            id: '3',
            title: t('storybook.globalSearch.productCatalog'),
            subtitle: t('storybook.globalSearch.productsCategory'),
            type: 'page',
          },
          {
            id: '4',
            title: t('storybook.globalSearch.orderHistory'),
            subtitle: t('storybook.globalSearch.ordersCategory'),
            type: 'page',
          },
        ],
      },
      {
        title: t('storybook.globalSearch.commands'),
        items: [
          { id: '5', title: t('storybook.globalSearch.createOrder'), type: 'action' },
          { id: '6', title: t('storybook.globalSearch.exportData'), type: 'action' },
        ],
      },
    ];
    return (
      <div style={{ width: '600px', padding: 'var(--ds-spacing-4)' }}>
        <GlobalSearch
          value={query}
          onSearchChange={setQuery}
          results={results}
          onResultSelect={(result) => console.log('Selected:', result)}
          onSubmit={() => console.log('Submit:', query)}
          placeholder={t('storybook.globalSearch.placeholder')}
        />
      </div>
    );
  },
};
