'use client';

import { ReactNode, useState, useEffect, createContext, useContext } from 'react';
import { I18nProvider, mergeTranslations, type SupportedLocale } from '@xala-technologies/i18n';
import { translations as platformTranslations } from '@xala-technologies/i18n-platform';
import { DesignsystemetProvider, type ColorScheme } from '@xala-technologies/platform-ui';
import { configureStoryApi, type StorybookGlobals, DEFAULT_GLOBALS } from '@xala-technologies/story-explorer-core';

// Configure Story API on load
if (typeof window !== 'undefined') {
  configureStoryApi({
    baseUrl: process.env.NEXT_PUBLIC_STORYBOOK_BASE_URL || 'http://localhost:6006',
  });
}

/**
 * Story Explorer translations (app-specific)
 */
const explorerTranslations = {
  nb: {
    'explorer.title': 'Story Explorer',
    'explorer.subtitle': 'Komponentkatalog',
    'explorer.search.placeholder': 'Sok etter komponenter...',
    'explorer.search.noResults': 'Ingen resultater funnet',
    'explorer.search.results': '{count} resultater',
    'explorer.filter.all': 'Alle',
    'explorer.filter.stories': 'Historier',
    'explorer.filter.docs': 'Dokumentasjon',
    'explorer.filter.clear': 'Fjern filtre',
    'explorer.viewer.loading': 'Laster...',
    'explorer.viewer.error': 'Kunne ikke laste historie',
    'explorer.viewer.openInStorybook': 'Apne i Storybook',
    'explorer.viewer.copyLink': 'Kopier lenke',
    'explorer.favorites': 'Favoritter',
    'explorer.compositions': 'Samlinger',
    'explorer.approval.pending': 'Venter',
    'explorer.approval.approved': 'Godkjent',
    'explorer.approval.changes': 'Endringer',
  },
  en: {
    'explorer.title': 'Story Explorer',
    'explorer.subtitle': 'Component Catalog',
    'explorer.search.placeholder': 'Search components...',
    'explorer.search.noResults': 'No results found',
    'explorer.search.results': '{count} results',
    'explorer.filter.all': 'All',
    'explorer.filter.stories': 'Stories',
    'explorer.filter.docs': 'Docs',
    'explorer.filter.clear': 'Clear filters',
    'explorer.viewer.loading': 'Loading...',
    'explorer.viewer.error': 'Failed to load story',
    'explorer.viewer.openInStorybook': 'Open in Storybook',
    'explorer.viewer.copyLink': 'Copy link',
    'explorer.favorites': 'Favorites',
    'explorer.compositions': 'Collections',
    'explorer.approval.pending': 'Pending',
    'explorer.approval.approved': 'Approved',
    'explorer.approval.changes': 'Changes',
  },
};

const allTranslations = mergeTranslations(platformTranslations, explorerTranslations);

/**
 * Globals context for Storybook iframe sync
 */
interface GlobalsContextValue {
  globals: StorybookGlobals;
  setGlobals: (globals: Partial<StorybookGlobals>) => void;
}

const GlobalsContext = createContext<GlobalsContextValue | null>(null);

export function useGlobals() {
  const context = useContext(GlobalsContext);
  if (!context) {
    throw new Error('useGlobals must be used within GlobalsProvider');
  }
  return context;
}

export default function RootLayout({ children }: { children: ReactNode }) {
  const [globals, setGlobalsState] = useState<StorybookGlobals>(DEFAULT_GLOBALS);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('story-explorer-globals');
    if (stored) {
      try {
        setGlobalsState({ ...DEFAULT_GLOBALS, ...JSON.parse(stored) });
      } catch {
        // Ignore
      }
    }
  }, []);

  const setGlobals = (update: Partial<StorybookGlobals>) => {
    setGlobalsState((prev) => {
      const next = { ...prev, ...update };
      localStorage.setItem('story-explorer-globals', JSON.stringify(next));
      return next;
    });
  };

  // Map Storybook colorScheme to provider ColorScheme
  const colorScheme: ColorScheme = globals.colorScheme === 'dark' ? 'dark' : 'light';

  if (!mounted) {
    return (
      <html lang="nb">
        <body />
      </html>
    );
  }

  return (
    <html lang={globals.locale}>
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <title>Story Explorer</title>
      </head>
      <body>
        <GlobalsContext.Provider value={{ globals, setGlobals }}>
          <DesignsystemetProvider
            colorScheme={colorScheme}
            locale={globals.locale}
            theme="custom"
            rootAs="main"
          >
            <I18nProvider
              translations={allTranslations}
              initialLocale={globals.locale as SupportedLocale}
            >
              {children}
            </I18nProvider>
          </DesignsystemetProvider>
        </GlobalsContext.Provider>
      </body>
    </html>
  );
}
