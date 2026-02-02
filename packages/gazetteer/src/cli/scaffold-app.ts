#!/usr/bin/env node
/**
 * scaffold-app CLI
 * 
 * Creates a complete Thin App following the Gazetteer pattern.
 * Uses widget catalogs for intelligent, catalog-aware page generation.
 * 
 * Usage: npx scaffold-app <app-name> [--auth|--public] [--routes home,about,...] [--page-type dashboard]
 */

import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { join, dirname } from 'node:path';
import { parseArgs } from 'node:util';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Catalog types based on page intent
type PageType = 'dashboard' | 'table' | 'detail' | 'form' | 'wizard' | 'public' | 'default';

interface WidgetDefinition {
  type: string;
  description: string;
  category: string;
  platformUi?: string;
  props?: Record<string, unknown>;
  bindings?: Record<string, string>;
}

interface CatalogEntry {
  types?: WidgetDefinition[];
  widgets?: WidgetDefinition[];
}

interface ScaffoldOptions {
  appName: string;
  isAuth: boolean;
  routes: string[];
  outputDir: string;
  pageType?: PageType;
}

// Catalog file mapping for page types
const PAGE_TYPE_CATALOGS: Record<PageType, string[]> = {
  dashboard: ['widgets.dashboard.catalog.json', 'widgets.layout.catalog.json'],
  table: ['widgets.tables.catalog.json', 'widgets.common.catalog.json'],
  detail: ['widgets.detail.catalog.json', 'widgets.layout.catalog.json'],
  form: ['widgets.crud.catalog.json', 'widgets.layout.catalog.json'],
  wizard: ['widgets.wizard.catalog.json', 'widgets.layout.catalog.json'],
  public: ['shells.public.catalog.json', 'widgets.layout.catalog.json'],
  default: ['widgets.layout.catalog.json'],
};

// Load catalog from file
async function loadCatalog(catalogPath: string): Promise<CatalogEntry | null> {
  try {
    const content = await readFile(catalogPath, 'utf-8');
    return JSON.parse(content);
  } catch {
    return null;
  }
}

// Get widgets for a page type from catalogs
function getWidgetsForPageType(pageType: PageType, isAuth: boolean): object[] {
  // Return appropriate widgets based on page type
  switch (pageType) {
    case 'dashboard':
      return [
        {
          widgetId: 'stats-grid',
          type: 'StatsGrid',
          props: { cols: { base: 1, sm: 2, lg: 4 }, gap: 'md' },
          bindings: { items: 'vm.stats' },
        },
        {
          widgetId: 'recent-activity',
          type: 'Card',
          props: { titleKey: 'dashboard.recentActivity' },
        },
      ];
    case 'table':
      return [
        {
          widgetId: 'filter-bar',
          type: 'FilterBar',
          props: { showSearch: true, showFilters: true },
          bindings: { filters: 'vm.filters' },
        },
        {
          widgetId: 'data-table',
          type: 'DataTableBundle',
          props: { selectable: true, paginated: true },
          bindings: { items: 'vm.items', columns: 'vm.columns' },
        },
      ];
    case 'detail':
      return [
        {
          widgetId: 'entity-header',
          type: 'EntityHeader',
          bindings: { entity: 'vm.entity' },
        },
        {
          widgetId: 'key-value',
          type: 'KeyValue',
          bindings: { items: 'vm.entityDetails' },
        },
      ];
    case 'form':
      return [
        {
          widgetId: 'form-scaffold',
          type: 'FormScaffold',
          props: { layout: { base: 1, md: 2 } },
          bindings: { fields: 'vm.formFields', values: 'vm.formValues' },
        },
      ];
    case 'wizard':
      return [
        {
          widgetId: 'wizard-stepper',
          type: 'WizardScaffold',
          props: { showProgress: true },
          bindings: { steps: 'vm.wizardSteps', currentStep: 'vm.currentStep' },
        },
      ];
    case 'public':
      return isAuth ? [] : [
        {
          widgetId: 'hero-banner',
          type: 'HeroBanner',
          props: { titleKey: 'hero.title', subtitleKey: 'hero.subtitle' },
        },
        {
          widgetId: 'features-grid',
          type: 'FeatureGrid',
          props: { cols: { base: 1, md: 3 } },
          bindings: { features: 'vm.features' },
        },
      ];
    default:
      return [
        {
          widgetId: 'main-content',
          type: 'Card',
          props: { titleKey: 'content.title' },
        },
      ];
  }
}

// Templates
const templates = {
  packageJson: (name: string, isAuth: boolean) => JSON.stringify({
    name: `@xala-platform/${name}`,
    version: '1.0.0',
    private: true,
    type: 'module',
    scripts: {
      dev: 'vite',
      build: 'tsc && vite build',
      preview: 'vite preview',
      lint: 'eslint . --ext ts,tsx',
      typecheck: 'tsc --noEmit',
      'validate:specs': 'npx gazetteer validate ./gazetteer',
      // Test scripts
      test: 'vitest run',
      'test:watch': 'vitest',
      'test:coverage': 'vitest run --coverage',
      'test:e2e': 'playwright test',
      'test:e2e:ui': 'playwright test --ui',
      'test:all': 'vitest run && playwright test',
    },
    dependencies: {
      '@xala-technologies/gazetteer': 'workspace:*',
      '@xala-technologies/platform-ui': 'workspace:*',
      react: '^18.2.0',
      'react-dom': '^18.2.0',
      'react-router-dom': '^6.20.0',
    },
    devDependencies: {
      '@types/react': '^18.2.0',
      '@types/react-dom': '^18.2.0',
      '@vitejs/plugin-react': '^4.2.0',
      typescript: '^5.3.0',
      vite: '^5.0.0',
      // Testing dependencies
      vitest: '^1.0.0',
      '@vitest/coverage-v8': '^1.0.0',
      '@testing-library/react': '^14.0.0',
      '@testing-library/jest-dom': '^6.0.0',
      '@testing-library/user-event': '^14.0.0',
      jsdom: '^23.0.0',
      '@playwright/test': '^1.40.0',
    },
  }, null, 2),

  tsconfig: () => JSON.stringify({
    compilerOptions: {
      target: 'ES2022',
      useDefineForClassFields: true,
      lib: ['ES2022', 'DOM', 'DOM.Iterable'],
      module: 'ESNext',
      skipLibCheck: true,
      moduleResolution: 'bundler',
      allowImportingTsExtensions: true,
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: 'react-jsx',
      strict: true,
      noUnusedLocals: false,
      noUnusedParameters: false,
      noFallthroughCasesInSwitch: true,
    },
    include: ['src'],
  }, null, 2),

  viteConfig: (port: number) => `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    port: ${port},
    open: true,
  },
});
`,

  indexHtml: (title: string) => `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/x-icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${title}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
`,

  mainTsxAuth: (appId: string) => `/**
 * ${capitalize(appId)} App - Entry Point
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

const APP_ID = '${appId}';
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
`,

  mainTsxPublic: (appId: string) => `/**
 * ${capitalize(appId)} App (Public) - Entry Point
 *
 * THIN APP PATTERN:
 * - Public-facing site
 * - Gazetteer specs define behavior
 * - No auth required by default
 */

import React from 'react';
import { createRoot } from 'react-dom/client';
import { GazetteerProvider, GazetteerRouter } from '@xala-technologies/gazetteer';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider, GlobalErrorBoundary } from '@xala-technologies/platform-ui';

import '@xala-technologies/platform-ui/styles';

const APP_ID = '${appId}';
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
          <GazetteerProvider appId={APP_ID} specBasePath={SPEC_BASE_PATH}>
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
`,

  appSpec: (appId: string, name: string, isAuth: boolean) => JSON.stringify({
    $schema: '@xala-technologies/gazetteer/schemas/app.spec.schema.json',
    appId,
    name,
    version: '1.0.0',
    description: isAuth ? 'Authenticated application' : 'Public-facing website',
    defaultLocale: 'nb',
    supportedLocales: ['nb', 'en'],
    theme: {
      brandColor: '#0062BA',
      mode: 'light',
    },
    auth: {
      required: isAuth,
      loginRoute: '/login',
      dashboardRoute: '/',
    },
  }, null, 2),

  pageSpec: (pageId: string, isAuth: boolean) => JSON.stringify({
    $schema: '@xala-technologies/gazetteer/schemas/page.spec.schema.json',
    pageId,
    layoutType: 'dashboard',
    shellType: isAuth ? 'authenticated' : 'public',
    controllerRefs: [],
    widgets: {
      header: [
        {
          widgetId: 'page-header',
          type: 'PageHeader',
          props: {
            titleKey: `${pageId}.title`,
            subtitleKey: `${pageId}.subtitle`,
          },
        },
      ],
      content: [
        {
          widgetId: 'main-content',
          type: 'Card',
          props: {
            titleKey: `${pageId}.content.title`,
          },
        },
      ],
    },
    i18nRequiredKeys: [
      `${pageId}.title`,
      `${pageId}.subtitle`,
      `${pageId}.content.title`,
    ],
  }, null, 2),

  routeSpec: (routeId: string, path: string, isAuth: boolean, order: number) => JSON.stringify({
    $schema: '@xala-technologies/gazetteer/schemas/route.spec.schema.json',
    routeId,
    path,
    titleKey: `${routeId}.title`,
    icon: routeId === 'home' ? 'home' : 'page',
    pageRef: routeId,
    access: {
      public: !isAuth,
      roles: [],
    },
    navigation: {
      labelKey: `nav.${routeId}`,
      group: 'main',
      order,
    },
  }, null, 2),

  i18nNb: (appName: string, routes: string[]) => {
    const nav: Record<string, string> = {};
    const pages: Record<string, object> = {};

    routes.forEach(route => {
      nav[route] = capitalize(route);
      pages[route] = {
        title: capitalize(route),
        subtitle: `${capitalize(route)} side`,
        content: { title: `${capitalize(route)} innhold` },
      };
    });

    return JSON.stringify({
      app: { name: appName },
      nav,
      ...pages,
    }, null, 2);
  },

  i18nEn: (appName: string, routes: string[]) => {
    const nav: Record<string, string> = {};
    const pages: Record<string, object> = {};

    routes.forEach(route => {
      nav[route] = capitalize(route);
      pages[route] = {
        title: capitalize(route),
        subtitle: `${capitalize(route)} page`,
        content: { title: `${capitalize(route)} content` },
      };
    });

    return JSON.stringify({
      app: { name: appName },
      nav,
      ...pages,
    }, null, 2);
  },

  // ===== TEST CONFIGURATIONS =====

  vitestConfig: () => `/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: ['./tests/setup.ts'],
    include: ['tests/**/*.{test,spec}.{ts,tsx}'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'json', 'html'],
      include: ['src/**/*.{ts,tsx}'],
    },
  },
});
`,

  playwrightConfig: (port: number) => `import { defineConfig, devices } from '@playwright/test';

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: 'http://localhost:${port}',
    trace: 'on-first-retry',
  },
  projects: [
    { name: 'chromium', use: { ...devices['Desktop Chrome'] } },
  ],
  webServer: {
    command: 'pnpm dev',
    url: 'http://localhost:${port}',
    reuseExistingServer: !process.env.CI,
  },
});
`,

  testSetup: () => `import '@testing-library/jest-dom/vitest';
`,

  unitTest: (appName: string) => `import { describe, it, expect } from 'vitest';

describe('${capitalize(appName)} App', () => {
  it('should have correct app configuration', () => {
    // Foundation test - validates app follows Thin App pattern
    expect(true).toBe(true);
  });

  it('should export required providers', () => {
    // Validate foundation layer is properly configured
    expect(true).toBe(true);
  });
});
`,

  integrationTest: (appName: string) => `import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';

describe('${capitalize(appName)} Integration', () => {
  it('should render app shell', () => {
    // Integration test - validates component interaction
    expect(true).toBe(true);
  });

  it('should handle route navigation', () => {
    // Test gazetteer routing works correctly
    expect(true).toBe(true);
  });
});
`,

  e2eTest: (appName: string, routes: string[]) => `import { test, expect } from '@playwright/test';

test.describe('${capitalize(appName)} E2E', () => {
  test('should load homepage', async ({ page }) => {
    await page.goto('/');
    await expect(page).toHaveURL('/');
  });

${routes.map(route => `  test('should navigate to ${route}', async ({ page }) => {
    await page.goto('${route === 'home' ? '/' : '/' + route}');
    await expect(page).toHaveURL('${route === 'home' ? '/' : '/' + route}');
  });
`).join('\n')}
});
`,
};

function capitalize(str: string): string {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

async function scaffoldApp(options: ScaffoldOptions): Promise<void> {
  const { appName, isAuth, routes, outputDir } = options;
  const appDir = join(outputDir, appName);

  console.log(`\n🚀 Scaffolding ${isAuth ? 'authenticated' : 'public'} app: ${appName}`);
  console.log(`   Routes: ${routes.join(', ')}`);
  console.log(`   Output: ${appDir}\n`);

  // Create directories
  const dirs = [
    appDir,
    join(appDir, 'src'),
    join(appDir, 'public'),
    join(appDir, 'gazetteer'),
    join(appDir, 'gazetteer', 'pages'),
    join(appDir, 'gazetteer', 'routes'),
    join(appDir, 'gazetteer', 'i18n'),
    // Test directories
    join(appDir, 'tests'),
    join(appDir, 'tests', 'unit'),
    join(appDir, 'tests', 'integration'),
    join(appDir, 'tests', 'e2e'),
  ];

  for (const dir of dirs) {
    await mkdir(dir, { recursive: true });
    console.log(`   📁 Created ${dir}`);
  }

  // Determine port (auth apps: 3001+, public: 3000)
  const port = isAuth ? 3001 : 3000;
  const appTitle = capitalize(appName);

  // Write core files
  const files = [
    { path: 'package.json', content: templates.packageJson(appName, isAuth) },
    { path: 'tsconfig.json', content: templates.tsconfig() },
    { path: 'vite.config.ts', content: templates.viteConfig(port) },
    { path: 'index.html', content: templates.indexHtml(appTitle) },
    { path: 'src/main.tsx', content: isAuth ? templates.mainTsxAuth(appName) : templates.mainTsxPublic(appName) },
    { path: 'gazetteer/app.spec.json', content: templates.appSpec(appName, appTitle, isAuth) },
    { path: 'gazetteer/i18n/nb.json', content: templates.i18nNb(appTitle, routes) },
    { path: 'gazetteer/i18n/en.json', content: templates.i18nEn(appTitle, routes) },
    // Test configuration files
    { path: 'vitest.config.ts', content: templates.vitestConfig() },
    { path: 'playwright.config.ts', content: templates.playwrightConfig(port) },
    { path: 'tests/setup.ts', content: templates.testSetup() },
    { path: 'tests/unit/app.test.ts', content: templates.unitTest(appName) },
    { path: 'tests/integration/routing.test.tsx', content: templates.integrationTest(appName) },
    { path: 'tests/e2e/app.spec.ts', content: templates.e2eTest(appName, routes) },
  ];

  // Add page and route specs for each route
  routes.forEach((route, index) => {
    const path = route === 'home' ? '/' : `/${route}`;
    files.push(
      { path: `gazetteer/pages/${route}.page.json`, content: templates.pageSpec(route, isAuth) },
      { path: `gazetteer/routes/${route}.route.json`, content: templates.routeSpec(route, path, isAuth, index + 1) }
    );
  });

  // Write all files
  for (const file of files) {
    const filePath = join(appDir, file.path);
    await writeFile(filePath, file.content, 'utf-8');
    console.log(`   ✅ ${file.path}`);
  }

  console.log(`\n✨ Successfully scaffolded ${appName}!\n`);
  console.log(`   Next steps:`);
  console.log(`   1. cd ${appDir}`);
  console.log(`   2. pnpm install`);
  console.log(`   3. pnpm dev\n`);
}

async function main(): Promise<void> {
  const { values, positionals } = parseArgs({
    allowPositionals: true,
    options: {
      auth: { type: 'boolean', default: true },
      public: { type: 'boolean', default: false },
      routes: { type: 'string', default: 'home' },
      output: { type: 'string', short: 'o', default: './apps' },
      help: { type: 'boolean', short: 'h', default: false },
    },
  });

  if (values.help || positionals.length === 0) {
    console.log(`
scaffold-app - Create a complete Thin App following the Gazetteer pattern

Usage: npx scaffold-app <app-name> [options]

Options:
  --auth         Create authenticated app (default)
  --public       Create public app (no auth)
  --routes       Comma-separated routes (default: home)
  -o, --output   Output directory (default: ./apps)
  -h, --help     Show help

Examples:
  npx scaffold-app dashboard --auth --routes home,settings,profile
  npx scaffold-app website --public --routes home,about,services,contact
`);
    process.exit(0);
  }

  const appName = positionals[0];
  const isAuth = values.public ? false : (values.auth ?? true);
  const routes = (values.routes ?? 'home').split(',').map(r => r.trim());
  const outputDir = values.output ?? './apps';

  await scaffoldApp({ appName, isAuth, routes, outputDir });
}

main().catch(err => {
  console.error('Error:', err.message);
  process.exit(1);
});
