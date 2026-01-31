/**
 * DocsHeader Component
 *
 * Top header with search bar and language switcher.
 * Pure presentational component - receives data via props and emits events via callbacks.
 */

import { useState, useCallback } from 'react';
import { Textfield, Button, SearchIcon } from '../../../../primitives';

export interface DocsHeaderLabels {
  searchPlaceholder: string;
  searchLabel: string;
  searchButton: string;
  languageToggleNorwegian: string;
  languageToggleEnglish: string;
}

export interface DocsHeaderProps {
  /** Labels for all text content */
  labels: DocsHeaderLabels;
  /** Current locale code (e.g., 'nb', 'en') */
  locale: string;
  /** Callback when search is submitted */
  onSearch: (query: string) => void;
  /** Callback when locale toggle is clicked */
  onLocaleToggle: () => void;
  /** Optional initial search query */
  initialSearchQuery?: string;
}

export function DocsHeader({
  labels,
  locale,
  onSearch,
  onLocaleToggle,
  initialSearchQuery = '',
}: DocsHeaderProps) {
  const [searchQuery, setSearchQuery] = useState(initialSearchQuery);

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        onSearch(searchQuery.trim());
      }
    },
    [searchQuery, onSearch]
  );

  return (
    <header
      style={{
        borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
        padding: 'var(--ds-spacing-4) var(--ds-spacing-6)',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--ds-spacing-4)',
          maxWidth: '1200px',
          margin: '0 auto',
        }}
      >
        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          style={{
            flex: 1,
            display: 'flex',
            gap: 'var(--ds-spacing-2)',
            alignItems: 'center',
          }}
        >
          <div
            style={{
              position: 'relative',
              flex: 1,
              maxWidth: '500px',
            }}
          >
            <div
              style={{
                position: 'absolute',
                left: 'var(--ds-spacing-3)',
                top: '50%',
                transform: 'translateY(-50%)',
                pointerEvents: 'none',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              <SearchIcon />
            </div>
            <Textfield
              type="search"
              placeholder={labels.searchPlaceholder}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                paddingLeft: 'var(--ds-spacing-10)',
                width: '100%',
              }}
              aria-label={labels.searchLabel}
            />
          </div>
          <Button type="submit" data-size="sm" data-color="neutral" variant="tertiary">
            {labels.searchButton}
          </Button>
        </form>

        {/* Actions */}
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
          <Button
            type="button"
            data-size="sm"
            data-color="neutral"
            variant="tertiary"
            onClick={onLocaleToggle}
            aria-label={
              locale === 'nb' ? labels.languageToggleEnglish : labels.languageToggleNorwegian
            }
          >
            {locale === 'nb' ? 'EN' : 'NO'}
          </Button>
        </div>
      </div>
    </header>
  );
}

export default DocsHeader;
