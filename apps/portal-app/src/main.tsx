/**
 * Portal-app App (Public) - Entry Point
 *
 * THIN APP PATTERN:
 * - Public-facing site
 * - Gazetteer specs define behavior
 * - No auth required by default
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { GazetteerProvider } from '@xala-technologies/gazetteer/provider';
import { useGazetteerRoutes } from '@xala-technologies/gazetteer/router';
import { BrowserRouter, useRoutes } from 'react-router-dom';
import { I18nProvider } from '@xala-technologies/platform/i18n';
import { ErrorBoundary, ThemeProvider, LoadingFallback } from '@xala-technologies/platform-ui';

import '@xala-technologies/platform-ui/styles';

const APP_ID = 'portal-app';
const SPEC_BASE_PATH = '/gazetteer';

function GazetteerRouter(): React.ReactElement {
  const routes = useGazetteerRoutes();
  return useRoutes(routes) ?? <LoadingFallback />;
}

function App(): React.ReactElement {
  return (
    <React.StrictMode>
      <ErrorBoundary>
        <ThemeProvider>
          <I18nProvider defaultLocale="nb" supportedLocales={['nb', 'en']}>
            <GazetteerProvider appId={APP_ID} specBasePath={SPEC_BASE_PATH}>
              <BrowserRouter>
                <GazetteerRouter />
              </BrowserRouter>
            </GazetteerProvider>
          </I18nProvider>
        </ThemeProvider>
      </ErrorBoundary>
    </React.StrictMode>
  );
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<App />);
}
