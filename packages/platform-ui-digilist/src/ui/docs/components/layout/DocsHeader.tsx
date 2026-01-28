/**
 * DocsHeader Component
 *
 * Top header with search bar, breadcrumbs, and language switcher.
 */

import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Textfield, Button, SearchIcon } from '@xala-technologies/platform-ui';
import { useT, useLocale } from '@xala-technologies/platform/runtime';

export function DocsHeader() {
  const t = useT();
  const navigate = useNavigate();
  const { locale, setLocale } = useLocale();
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      if (searchQuery.trim()) {
        navigate(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      }
    },
    [searchQuery, navigate]
  );

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'nb' ? 'en' : 'nb');
  }, [locale, setLocale]);

  return (
    <header
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 'var(--ds-spacing-4) var(--ds-spacing-6)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
        position: 'sticky',
        top: 0,
        zIndex: 10,
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--ds-spacing-4)',
          flex: 1,
          maxWidth: '600px',
        }}
      >
        {/* Search bar */}
        <form
          onSubmit={handleSearch}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--ds-spacing-2)',
            flex: 1,
          }}
        >
          <div
            style={{
              position: 'relative',
              flex: 1,
            }}
          >
            <SearchIcon
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
              placeholder={t('form.docs.search.placeholder') || 'Søk i dokumentasjon...'}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                paddingLeft: 'var(--ds-spacing-8)',
                width: '100%',
              }}
              aria-label={t('docs.search.label') || 'Søk'}
            />
          </div>
          <Button type="submit" data-size="sm" data-color="neutral" variant="tertiary">
            {t('docs.search.button') || 'Søk'}
          </Button>
        </form>
      </div>

      {/* Actions */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--ds-spacing-2)',
        }}
      >
        <Button
          type="button"
          data-size="sm"
          data-color="neutral"
          variant="tertiary"
          onClick={toggleLocale}
        >
          {locale === 'nb' ? 'EN' : 'NO'}
        </Button>
      </div>
    </header>
  );
}

export default DocsHeader;
