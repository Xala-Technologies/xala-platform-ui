/**
 * CatalogSidebar - Searchable, filterable catalog navigation
 *
 * A sidebar component for browsing and filtering items in a catalog,
 * suitable for story explorers, file browsers, and navigation panels.
 */

import { useState, useMemo, useCallback, type ReactNode } from 'react';
import { Textfield, Paragraph, Chip, Spinner, Button } from '@digdir/designsystemet-react';
import {
  SearchIcon,
  XIcon,
  FolderIcon,
  FileTextIcon,
  BookOpenIcon,
} from 'lucide-react';

/**
 * Catalog item for display
 */
export interface CatalogItem {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Secondary label (e.g., story name) */
  subtitle?: string;
  /** Category/group name */
  category: string;
  /** Item type for icon selection */
  type?: 'folder' | 'file' | 'doc' | 'story';
  /** Additional tags for filtering */
  tags?: string[];
  /** Custom icon */
  icon?: ReactNode;
  /** Whether item is disabled */
  disabled?: boolean;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Filter option for chips
 */
export interface CatalogFilterOption {
  /** Filter value */
  value: string;
  /** Display label */
  label: string;
  /** Item count for this filter */
  count?: number;
}

/**
 * CatalogSidebar Props
 */
export interface CatalogSidebarProps {
  /** Items to display */
  items: CatalogItem[];
  /** Currently selected item ID */
  selectedId?: string | null;
  /** Callback when item is selected */
  onSelect?: (item: CatalogItem) => void;

  /** Loading state */
  loading?: boolean;
  /** Error message */
  error?: string | null;

  /** Category filters to show */
  categoryFilters?: CatalogFilterOption[];
  /** Type filters to show */
  typeFilters?: CatalogFilterOption[];

  /** Labels for i18n */
  labels?: CatalogSidebarLabels;

  /** Maximum categories to show before "more" */
  maxCategoryFilters?: number;

  /** Size variant */
  size?: 'sm' | 'md';

  /** Custom item renderer */
  renderItem?: (item: CatalogItem, isSelected: boolean) => ReactNode;

  /** Custom group header renderer */
  renderGroupHeader?: (category: string, count: number) => ReactNode;

  /** aria-label for the navigation */
  ariaLabel?: string;
}

/**
 * Labels for i18n
 */
export interface CatalogSidebarLabels {
  /** Search placeholder */
  searchPlaceholder?: string;
  /** Search aria label */
  searchLabel?: string;
  /** Clear search aria label */
  clearSearch?: string;
  /** All filter label */
  allFilter?: string;
  /** Stories filter label */
  storiesFilter?: string;
  /** Docs filter label */
  docsFilter?: string;
  /** Clear filters button */
  clearFilters?: string;
  /** No results message */
  noResults?: string;
  /** Results count (use {count} placeholder) */
  resultsCount?: string;
  /** Loading message */
  loading?: string;
}

const defaultLabels: CatalogSidebarLabels = {
  searchPlaceholder: 'Search...',
  searchLabel: 'Search',
  clearSearch: 'Clear search',
  allFilter: 'All',
  storiesFilter: 'Stories',
  docsFilter: 'Docs',
  clearFilters: 'Clear filters',
  noResults: 'No results found',
  resultsCount: '{count} results',
  loading: 'Loading...',
};

/**
 * Group items by category
 */
function groupByCategory(items: CatalogItem[]): Map<string, CatalogItem[]> {
  const groups = new Map<string, CatalogItem[]>();
  for (const item of items) {
    const category = item.category || 'Uncategorized';
    if (!groups.has(category)) {
      groups.set(category, []);
    }
    groups.get(category)!.push(item);
  }
  return groups;
}

/**
 * Get icon for item type
 */
function getItemIcon(item: CatalogItem, size: number): ReactNode {
  if (item.icon) return item.icon;
  switch (item.type) {
    case 'folder':
      return <FolderIcon size={size} style={{ color: 'var(--ds-color-neutral-text-subtle)' }} />;
    case 'doc':
      return <BookOpenIcon size={size} style={{ color: 'var(--ds-color-neutral-text-subtle)' }} />;
    case 'story':
    case 'file':
    default:
      return <FileTextIcon size={size} style={{ color: 'var(--ds-color-neutral-text-subtle)' }} />;
  }
}

/**
 * CatalogSidebar Component
 *
 * @example
 * ```tsx
 * <CatalogSidebar
 *   items={stories.map(s => ({
 *     id: s.id,
 *     label: s.title,
 *     subtitle: s.name,
 *     category: s.category,
 *     type: s.type,
 *   }))}
 *   selectedId={selectedStoryId}
 *   onSelect={(item) => navigate(`/stories/${item.id}`)}
 *   categoryFilters={categories.map(c => ({ value: c.name, label: c.name, count: c.count }))}
 * />
 * ```
 */
export function CatalogSidebar({
  items,
  selectedId,
  onSelect,
  loading,
  error,
  categoryFilters = [],
  typeFilters = [],
  labels: customLabels,
  maxCategoryFilters = 8,
  size = 'sm',
  renderItem,
  renderGroupHeader,
  ariaLabel = 'Catalog navigation',
}: CatalogSidebarProps) {
  const labels = { ...defaultLabels, ...customLabels };
  const iconSize = size === 'sm' ? 14 : 16;

  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  // Filter items
  const filteredItems = useMemo(() => {
    let result = items;

    if (query) {
      const queryLower = query.toLowerCase();
      result = result.filter(
        (item) =>
          item.label.toLowerCase().includes(queryLower) ||
          item.subtitle?.toLowerCase().includes(queryLower) ||
          item.id.toLowerCase().includes(queryLower)
      );
    }

    if (selectedCategory) {
      result = result.filter((item) => item.category === selectedCategory);
    }

    if (selectedType) {
      result = result.filter((item) => item.type === selectedType);
    }

    return result;
  }, [items, query, selectedCategory, selectedType]);

  // Group filtered items
  const groupedItems = useMemo(() => groupByCategory(filteredItems), [filteredItems]);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setQuery('');
    setSelectedCategory(null);
    setSelectedType(null);
  }, []);

  const hasActiveFilters = query || selectedCategory || selectedType;

  // Loading state
  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 'var(--ds-spacing-8)',
        }}
      >
        <Spinner aria-label={labels.loading || 'Loading...'} />
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div
        style={{
          padding: 'var(--ds-spacing-6)',
          color: 'var(--ds-color-danger-text-default)',
        }}
      >
        <Paragraph>{error}</Paragraph>
      </div>
    );
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Search */}
      <div
        style={{
          padding: 'var(--ds-spacing-4)',
          borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
        }}
      >
        <div style={{ position: 'relative' }}>
          <SearchIcon
            size={iconSize}
            style={{
              position: 'absolute',
              left: 'var(--ds-spacing-3)',
              top: '50%',
              transform: 'translateY(-50%)',
              color: 'var(--ds-color-neutral-text-subtle)',
              pointerEvents: 'none',
            }}
          />
          <Textfield
            type="search"
            placeholder={labels.searchPlaceholder ?? 'Search...'}
            aria-label={labels.searchLabel ?? 'Search'}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            style={{ paddingLeft: 'var(--ds-spacing-9)' }}
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              style={{
                position: 'absolute',
                right: 'var(--ds-spacing-2)',
                top: '50%',
                transform: 'translateY(-50%)',
                background: 'none',
                border: 'none',
                padding: 'var(--ds-spacing-1)',
                cursor: 'pointer',
                color: 'var(--ds-color-neutral-text-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              aria-label={labels.clearSearch}
            >
              <XIcon size={iconSize} />
            </button>
          )}
        </div>
      </div>

      {/* Category filter */}
      {categoryFilters.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--ds-spacing-2)',
            padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
            borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Chip.Radio
            name="category"
            value="all"
            data-size={size}
            checked={selectedCategory === null}
            onChange={() => setSelectedCategory(null)}
          >
            {labels.allFilter}
          </Chip.Radio>
          {categoryFilters.slice(0, maxCategoryFilters).map((filter) => (
            <Chip.Radio
              key={filter.value}
              name="category"
              value={filter.value}
              data-size={size}
              checked={selectedCategory === filter.value}
              onChange={() => setSelectedCategory(filter.value)}
            >
              {filter.label}
              {filter.count !== undefined && ` (${filter.count})`}
            </Chip.Radio>
          ))}
        </div>
      )}

      {/* Type filter */}
      {typeFilters.length > 0 && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--ds-spacing-2)',
            padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
            borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Chip.Radio
            name="type"
            value="all"
            data-size={size}
            checked={selectedType === null}
            onChange={() => setSelectedType(null)}
          >
            {labels.allFilter}
          </Chip.Radio>
          {typeFilters.map((filter) => (
            <Chip.Radio
              key={filter.value}
              name="type"
              value={filter.value}
              data-size={size}
              checked={selectedType === filter.value}
              onChange={() => setSelectedType(filter.value)}
            >
              {filter.label}
            </Chip.Radio>
          ))}
          {hasActiveFilters && (
            <Button
              data-size={size}
              variant="tertiary"
              onClick={clearFilters}
              style={{ marginLeft: 'auto' }}
            >
              <XIcon size={iconSize} />
              {labels.clearFilters}
            </Button>
          )}
        </div>
      )}

      {/* Results count */}
      <div style={{ padding: 'var(--ds-spacing-2) var(--ds-spacing-4)' }}>
        <Paragraph
          data-size="xs"
          style={{ color: 'var(--ds-color-neutral-text-subtle)', margin: 0 }}
        >
          {filteredItems.length === 0
            ? labels.noResults
            : labels.resultsCount?.replace('{count}', String(filteredItems.length))}
        </Paragraph>
      </div>

      {/* Item list */}
      <nav
        aria-label={ariaLabel}
        style={{
          flex: 1,
          overflowY: 'auto',
          padding: '0 var(--ds-spacing-2)',
        }}
      >
        {Array.from(groupedItems.entries()).map(([category, categoryItems]) => (
          <div key={category} style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            {/* Category header */}
            {renderGroupHeader ? (
              renderGroupHeader(category, categoryItems.length)
            ) : (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-2)',
                  padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                <FolderIcon size={iconSize} />
                <Paragraph
                  data-size="xs"
                  style={{
                    margin: 0,
                    fontWeight: 'var(--ds-font-weight-semibold)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {category}
                </Paragraph>
              </div>
            )}

            {/* Items in category */}
            <ul style={{ listStyle: 'none', margin: 0, padding: 0 }}>
              {categoryItems.map((item) => {
                const isSelected = item.id === selectedId;
                return (
                  <li key={item.id}>
                    {renderItem ? (
                      renderItem(item, isSelected)
                    ) : (
                      <button
                        type="button"
                        onClick={() => onSelect?.(item)}
                        disabled={item.disabled}
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--ds-spacing-3)',
                          width: '100%',
                          padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
                          borderRadius: 'var(--ds-border-radius-md)',
                          border: 'none',
                          background: 'none',
                          textAlign: 'left',
                          cursor: item.disabled ? 'not-allowed' : 'pointer',
                          opacity: item.disabled ? 0.5 : 1,
                          color: isSelected
                            ? 'var(--ds-color-accent-text-default)'
                            : 'var(--ds-color-neutral-text-default)',
                          backgroundColor: isSelected
                            ? 'var(--ds-color-accent-surface-default)'
                            : 'transparent',
                          borderLeft: isSelected
                            ? '3px solid var(--ds-color-accent-base-default)'
                            : '3px solid transparent',
                          transition: 'all 0.15s ease',
                        }}
                        onMouseEnter={(e) => {
                          if (!isSelected && !item.disabled) {
                            e.currentTarget.style.backgroundColor =
                              'var(--ds-color-neutral-surface-hover)';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (!isSelected && !item.disabled) {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }
                        }}
                      >
                        {getItemIcon(item, iconSize)}
                        <div style={{ flex: 1, minWidth: 0 }}>
                          <Paragraph
                            data-size={size}
                            style={{
                              margin: 0,
                              fontWeight: isSelected
                                ? 'var(--ds-font-weight-semibold)'
                                : 'var(--ds-font-weight-regular)',
                              overflow: 'hidden',
                              textOverflow: 'ellipsis',
                              whiteSpace: 'nowrap',
                            }}
                          >
                            {item.label}
                          </Paragraph>
                          {item.subtitle && (
                            <Paragraph
                              data-size="xs"
                              style={{
                                margin: 0,
                                color: 'var(--ds-color-neutral-text-subtle)',
                                overflow: 'hidden',
                                textOverflow: 'ellipsis',
                                whiteSpace: 'nowrap',
                              }}
                            >
                              {item.subtitle}
                            </Paragraph>
                          )}
                        </div>
                      </button>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>
        ))}

        {/* Empty state */}
        {filteredItems.length === 0 && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--ds-spacing-8)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            <FileTextIcon size={48} style={{ opacity: 0.3, marginBottom: 'var(--ds-spacing-4)' }} />
            <Paragraph data-size={size}>{labels.noResults}</Paragraph>
          </div>
        )}
      </nav>
    </div>
  );
}
