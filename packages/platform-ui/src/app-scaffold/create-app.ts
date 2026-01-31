/**
 * createApp - Application Bootstrap Function
 *
 * Creates and mounts an application with all boilerplate handled.
 * This is a pure UI scaffold - runtime dependencies are provided via factories.
 *
 * @example
 * ```tsx
 * import { createApp } from '@xala-technologies/platform-ui/app-scaffold';
 * import { validateEnv, createAppConfig } from '@xala-technologies/platform/config';
 * import { RuntimeProvider } from '@xala-technologies/platform/runtime';
 * import { initializeClient } from '@xala-technologies/platform/sdk';
 *
 * createApp({
 *   role: 'dashboard',
 *   appId: 'dashboard',
 *   name: 'TaskMaster',
 *   routes: [...],
 *   runtime: {
 *     validateEnv,
 *     createAppConfig,
 *     initializeClient,
 *     RuntimeProvider,
 *   },
 * });
 * ```
 */

import React from 'react';
import ReactDOM from 'react-dom/client';
import { AppShell } from './AppShell';
import { injectAppStyles } from './styles';
import type { CreateAppOptions } from './types';

/**
 * Runtime dependencies that must be provided by the consuming app
 */
export interface RuntimeDependencies {
  /** Validates environment variables */
  validateEnv?: (env: Record<string, unknown>) => Record<string, unknown>;
  /** Creates app configuration */
  createAppConfig?: (appId: string, env: Record<string, unknown>) => {
    sdkConfig: Record<string, unknown>;
    runtimeConfig: Record<string, unknown>;
  };
  /** Initializes the SDK client */
  initializeClient?: (config: Record<string, unknown>) => void;
  /** The RuntimeProvider component */
  RuntimeProvider?: React.ComponentType<{ config: Record<string, unknown>; children: React.ReactNode }>;
  /** Error boundary component */
  ErrorBoundary?: React.ComponentType<{
    children: React.ReactNode;
    onError?: (error: Error, errorInfo: { componentStack?: string }) => void;
    labels?: { title?: string; defaultDescription?: string; retryButton?: string };
  }>;
}

/**
 * Extended options including runtime dependencies
 */
export interface CreateAppOptionsWithRuntime extends CreateAppOptions {
  runtime?: RuntimeDependencies;
  /** Environment variables (defaults to import.meta.env) */
  env?: Record<string, unknown>;
}

/**
 * Simple error boundary fallback
 */
function DefaultErrorFallback({ error }: { error?: Error }): React.ReactElement {
  return React.createElement(
    'div',
    {
      style: {
        padding: '2rem',
        textAlign: 'center',
        color: 'var(--ds-color-danger-text-default, #dc3545)',
      },
    },
    React.createElement('h1', null, 'Something went wrong'),
    React.createElement('p', null, error?.message || 'An unexpected error occurred.'),
    React.createElement(
      'button',
      { onClick: () => window.location.reload() },
      'Reload page'
    )
  );
}

/**
 * Create and mount an application
 */
export function createApp(options: CreateAppOptionsWithRuntime): void {
  const {
    appId,
    name,
    rootElement = 'root',
    features = {},
    runtime = {},
    env = {},
  } = options;

  // Inject shared styles
  if (features.injectStyles !== false) {
    injectAppStyles();
  }

  // Get root element
  const root = document.getElementById(rootElement);
  if (!root) {
    throw new Error(`Root element #${rootElement} not found in document`);
  }

  // Initialize runtime if provided
  let runtimeConfig: Record<string, unknown> = {};
  
  if (runtime.validateEnv && runtime.createAppConfig && runtime.initializeClient) {
    const validatedEnv = runtime.validateEnv(env);
    const config = runtime.createAppConfig(appId, validatedEnv);
    runtimeConfig = config.runtimeConfig;
    runtime.initializeClient(config.sdkConfig);
  }

  // Build the app tree
  let appElement: React.ReactElement = React.createElement(AppShell, {
    options,
    features,
    appName: name,
  });

  // Wrap with RuntimeProvider if provided
  if (runtime.RuntimeProvider) {
    const ProviderComponent = runtime.RuntimeProvider;
    appElement = React.createElement(
      ProviderComponent,
      { config: runtimeConfig, children: appElement }
    );
  }

  // Wrap with error handling if provided
  if (runtime.ErrorBoundary) {
    const ErrorComponent = runtime.ErrorBoundary;
    appElement = React.createElement(
      ErrorComponent,
      {
        children: appElement,
        onError: (error: Error, errorInfo: { componentStack?: string }) => {
          console.error(`[${name}] ErrorBoundary:`, error.message, errorInfo.componentStack);
        },
        labels: {
          title: 'Something went wrong',
          defaultDescription: 'An unexpected error occurred. Please reload the page.',
          retryButton: 'Reload page',
        },
      }
    );
  }

  // Mount the app
  ReactDOM.createRoot(root).render(
    React.createElement(React.StrictMode, { children: appElement })
  );

}

export type { CreateAppOptions, CreateAppOptionsWithRuntime as CreateAppFullOptions };
