/**
 * SavedSearchesDropdown
 *
 * Dropdown component for saving and loading search filters.
 * Displays a list of saved searches and allows saving current filters.
 */

import { useState, useCallback } from 'react';
import {
  Button,
  Popover,
  BookmarkIcon,
  TrashIcon,
  Paragraph,
  Textfield,
} from '@xala-technologies/platform-ui';
import {
  useSavedSearches,
  type SearchFilters,
  type SavedSearch,
} from '../hooks/useSavedSearches';

export interface SavedSearchesDropdownProps {
  /** Translation function */
  t: (key: string) => string;
  /** Current filter values */
  currentFilters: SearchFilters;
  /** Callback when a saved search is loaded */
  onLoadSearch: (filters: SearchFilters) => void;
  /** Optional class name */
  className?: string;
}

export function SavedSearchesDropdown({
  t,
  currentFilters,
  onLoadSearch,
}: SavedSearchesDropdownProps) {
  const {
    savedSearches,
    saveSearch,
    deleteSearch,
    markSearchAsUsed,
    generateSearchName,
    maxSavedSearches,
  } = useSavedSearches();

  const [isOpen, setIsOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [newSearchName, setNewSearchName] = useState('');

  // Check if there are any active filters
  const hasActiveFilters =
    (currentFilters.query && currentFilters.query.length > 0) ||
    (currentFilters.category && currentFilters.category !== 'ALL') ||
    (currentFilters.area && currentFilters.area !== 'all') ||
    (currentFilters.capacity && currentFilters.capacity !== 'all') ||
    (currentFilters.amenities && currentFilters.amenities.length > 0);

  const handleSave = useCallback(() => {
    if (!hasActiveFilters) return;

    const name =
      newSearchName.trim() || generateSearchName(currentFilters, t);
    saveSearch(name, currentFilters);
    setNewSearchName('');
    setIsSaving(false);
  }, [
    hasActiveFilters,
    newSearchName,
    generateSearchName,
    currentFilters,
    t,
    saveSearch,
  ]);

  const handleLoad = useCallback(
    (search: SavedSearch) => {
      markSearchAsUsed(search.id);
      onLoadSearch(search.filters);
      setIsOpen(false);
    },
    [markSearchAsUsed, onLoadSearch]
  );

  const handleDelete = useCallback(
    (e: React.MouseEvent, id: string) => {
      e.stopPropagation();
      deleteSearch(id);
    },
    [deleteSearch]
  );

  const canSaveMore = savedSearches.length < maxSavedSearches;

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <Popover.Trigger asChild>
        <Button
          type="button"
          variant="secondary"
          data-size="md"
          aria-label={t('savedSearches.title')}
        >
          <BookmarkIcon />
          {savedSearches.length > 0 && (
            <span
              style={{
                marginInlineStart: 'var(--ds-spacing-1)',
                backgroundColor: 'var(--ds-color-accent-background-default)',
                color: 'var(--ds-color-accent-text-default)',
                borderRadius: 'var(--ds-border-radius-full)',
                padding: '0 var(--ds-spacing-2)',
                fontSize: 'var(--ds-font-size-xs)',
                fontWeight: 'var(--ds-font-weight-semibold)',
              }}
            >
              {savedSearches.length}
            </span>
          )}
        </Button>
      </Popover.Trigger>

      <Popover.Content
        align="end"
        style={{
          width: '320px',
          maxHeight: '400px',
          overflow: 'auto',
          padding: 'var(--ds-spacing-4)',
        }}
      >
        <Paragraph
          data-size="sm"
          style={{
            fontWeight: 'var(--ds-font-weight-semibold)',
            marginBottom: 'var(--ds-spacing-3)',
          }}
        >
          {t('savedSearches.title')}
        </Paragraph>

        {/* Save current search form */}
        {hasActiveFilters && canSaveMore && (
          <div
            style={{
              marginBottom: 'var(--ds-spacing-4)',
              paddingBottom: 'var(--ds-spacing-4)',
              borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
            }}
          >
            {isSaving ? (
              <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
                <Textfield
                  value={newSearchName}
                  onChange={(e) => setNewSearchName(e.target.value)}
                  placeholder={generateSearchName(currentFilters, t)}
                  data-size="sm"
                  style={{ flex: 1 }}
                />
                <Button
                  type="button"
                  variant="primary"
                  data-size="sm"
                  onClick={handleSave}
                >
                  {t('action.save')}
                </Button>
                <Button
                  type="button"
                  variant="tertiary"
                  data-size="sm"
                  onClick={() => {
                    setIsSaving(false);
                    setNewSearchName('');
                  }}
                >
                  {t('action.cancel')}
                </Button>
              </div>
            ) : (
              <Button
                type="button"
                variant="secondary"
                data-size="sm"
                onClick={() => setIsSaving(true)}
                style={{ width: '100%' }}
              >
                <BookmarkIcon />
                {t('savedSearches.saveCurrent')}
              </Button>
            )}
          </div>
        )}

        {/* List of saved searches */}
        {savedSearches.length === 0 ? (
          <Paragraph
            data-size="sm"
            style={{ color: 'var(--ds-color-neutral-text-subtle)' }}
          >
            {t('savedSearches.empty')}
          </Paragraph>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
            {savedSearches.map((search) => (
              <div
                key={search.id}
                onClick={() => handleLoad(search)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleLoad(search);
                  }
                }}
                role="button"
                tabIndex={0}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease',
                  backgroundColor: 'transparent',
                }}
                onMouseOver={(e) => {
                  e.currentTarget.style.backgroundColor =
                    'var(--ds-color-neutral-background-subtle)';
                }}
                onMouseOut={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
                onFocus={(e) => {
                  e.currentTarget.style.backgroundColor =
                    'var(--ds-color-neutral-background-subtle)';
                }}
                onBlur={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <div style={{ flex: 1, minWidth: 0 }}>
                  <Paragraph
                    data-size="sm"
                    style={{
                      margin: 0,
                      fontWeight: 'var(--ds-font-weight-medium)',
                      whiteSpace: 'nowrap',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                    }}
                  >
                    {search.name}
                  </Paragraph>
                  <Paragraph
                    data-size="xs"
                    style={{
                      margin: 0,
                      color: 'var(--ds-color-neutral-text-subtle)',
                    }}
                  >
                    {new Date(search.createdAt).toLocaleDateString()}
                  </Paragraph>
                </div>
                <Button
                  type="button"
                  variant="tertiary"
                  data-size="sm"
                  onClick={(e) => handleDelete(e, search.id)}
                  aria-label={t('action.delete')}
                  style={{ flexShrink: 0 }}
                >
                  <TrashIcon />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Limit warning */}
        {!canSaveMore && (
          <Paragraph
            data-size="xs"
            style={{
              marginTop: 'var(--ds-spacing-3)',
              color: 'var(--ds-color-warning-text-default)',
            }}
          >
            {t('savedSearches.limitReached')}
          </Paragraph>
        )}
      </Popover.Content>
    </Popover>
  );
}
