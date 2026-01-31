/**
 * AppShell Component
 *
 * Core application shell that provides routing, OAuth handling, and layout selection.
 * This is a pure presentational component - all runtime dependencies come via props.
 */

import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DashboardLayoutWrapper } from './layouts/DashboardLayout';
import { WebLayoutWrapper } from './layouts/WebLayout';
import { UniversalLoginPage } from './pages/UniversalLoginPage';
import type { CreateAppOptions, AppFeatures } from './types';

export interface AppShellProps {
  options: CreateAppOptions;
  features: AppFeatures;
  appName: string;
}

/**
 * Simple loading spinner using CSS
 */
function LoadingSpinner(): React.ReactElement {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
      }}
    >
      <div
        style={{
          width: '40px',
          height: '40px',
          border: '3px solid var(--ds-color-neutral-border-subtle, #e0e0e0)',
          borderTopColor: 'var(--ds-color-accent-base-default, #0062BA)',
          borderRadius: '50%',
          animation: 'app-scaffold-spin 1s linear infinite',
        }}
      />
      <style>
        {`@keyframes app-scaffold-spin { to { transform: rotate(360deg); } }`}
      </style>
    </div>
  );
}

/**
 * AppShell wraps the application with routing and layout
 */
export function AppShell({ options, features, appName }: AppShellProps): React.ReactElement {
  const { role, routes = [], sidebar, brand } = options;
  const loginPath = options.loginPath ?? '/login';
  const isProtected = role !== 'web';

  // Select layout based on role
  const LayoutWrapper = role === 'web' ? WebLayoutWrapper : DashboardLayoutWrapper;

  return (
    <BrowserRouter>
      <Suspense fallback={<LoadingSpinner />}>
        <Routes>
          {/* Login route - always public */}
          <Route
            path={loginPath}
            element={
              <UniversalLoginPage
                appName={appName}
                role={role}
                features={features}
              />
            }
          />

          {/* Main app routes */}
          <Route
            path="/*"
            element={
              <LayoutWrapper
                sidebar={sidebar}
                brand={brand}
                isProtected={isProtected}
                loginPath={loginPath}
              >
                <Routes>
                  {routes.map((route, index) => (
                    <Route
                      key={route.path || index}
                      path={route.path}
                      element={route.element}
                    />
                  ))}
                </Routes>
              </LayoutWrapper>
            }
          />
        </Routes>
      </Suspense>
    </BrowserRouter>
  );
}
