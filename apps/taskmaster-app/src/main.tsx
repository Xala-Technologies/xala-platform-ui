/**
 * Taskmaster-app App - Entry Point
 *
 * THIN APP PATTERN:
 * - No domain logic in app layer
 * - Gazetteer specs define behavior
 * - UI from @xala-technologies/platform-ui
 * - Data from SDK controllers
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { GazetteerProvider, GazetteerRouter } from '@xala-technologies/gazetteer';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, GlobalErrorBoundary } from '@xala-technologies/platform-ui';

import '@xala-technologies/platform-ui/styles';

const APP_ID = 'taskmaster-app';
const SPEC_BASE_PATH = '/gazetteer';

/**
 * Provider Hierarchy (order matters!):
 * 1. GlobalErrorBoundary - TOP: catches ALL errors including from lower providers
 * 2. ThemeProvider - styling
 * 3. GazetteerProvider - spec-driven engine
 * 4. BrowserRouter - routing
 */
function App(): React.ReactElement {
  return (
    <React.StrictMode>
      <GlobalErrorBoundary>
        <ThemeProvider>
          <GazetteerProvider 
            appId={APP_ID} 
            specBasePath={SPEC_BASE_PATH}
          >
            <BrowserRouter>
              <GazetteerRouter />
            </BrowserRouter>
          </GazetteerProvider>
        </ThemeProvider>
      </GlobalErrorBoundary>
    </React.StrictMode>
  );
}

const container = document.getElementById('root');
if (container) {
  createRoot(container).render(<App />);
}
