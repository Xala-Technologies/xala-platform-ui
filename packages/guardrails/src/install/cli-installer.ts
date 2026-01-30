/**
 * Platform UI Comprehensive CLI Installer
 *
 * A complete installation wizard that:
 * 1. Analyzes the project structure
 * 2. Detects framework and entry points
 * 3. Asks for configuration preferences
 * 4. Modifies entry files to add providers
 * 5. Sets up ESLint configuration
 * 6. Creates compliance tests
 * 7. Generates AI context file (CLAUDE.md)
 * 8. Validates the installation
 *
 * Usage:
 *   guardrails install
 *   guardrails install --theme=digilist --locale=nb
 *   guardrails install --dry-run
 */

import { existsSync, readFileSync, writeFileSync, mkdirSync, readdirSync, statSync } from 'fs';
import { join, dirname, basename, relative } from 'path';
import * as readline from 'readline';

// ============================================================================
// Types
// ============================================================================

export type ThemeId = 'digdir' | 'altinn' | 'brreg' | 'digilist' | 'xaheen' | 'platform';
export type LocaleId = 'nb' | 'nn' | 'en';

export interface InstallConfig {
  projectDir: string;
  theme: ThemeId;
  locale: LocaleId;
  appName: string;
  includeI18n: boolean;
  includeRealtime: boolean;
  generateClaudeMd: boolean;
  dryRun: boolean;
  verbose: boolean;
}

export interface ProjectAnalysis {
  framework: 'vite' | 'nextjs' | 'cra' | 'remix' | 'unknown';
  entryFile: string | null;
  appFile: string | null;
  packageJson: any;
  srcDir: string;
  hasTypeScript: boolean;
  hasI18n: boolean;
  hasPlatformUI: boolean;
  hasGuardrails: boolean;
  existingProviders: string[];
}

export interface InstallStep {
  name: string;
  description: string;
  status: 'pending' | 'running' | 'success' | 'skipped' | 'failed';
  message?: string;
}

export interface InstallResult {
  success: boolean;
  steps: InstallStep[];
  filesCreated: string[];
  filesModified: string[];
  warnings: string[];
  errors: string[];
  nextSteps: string[];
}

// ============================================================================
// Theme Configuration
// ============================================================================

export const THEMES: Record<ThemeId, { name: string; description: string; colors: string }> = {
  digdir: {
    name: 'Digdir',
    description: 'Digitaliseringsdirektoratet - Official government theme',
    colors: 'Blue/White',
  },
  altinn: {
    name: 'Altinn',
    description: 'Altinn portal theme',
    colors: 'Dark Blue/Yellow',
  },
  brreg: {
    name: 'Brønnøysundregistrene',
    description: 'Brønnøysund Register Centre theme',
    colors: 'Teal/White',
  },
  digilist: {
    name: 'Digilist',
    description: 'Default Digilist theme for municipal services',
    colors: 'Navy/Aqua',
  },
  xaheen: {
    name: 'Xaheen',
    description: 'Xaheen brand theme',
    colors: 'Purple/White',
  },
  platform: {
    name: 'Platform',
    description: 'Neutral platform theme',
    colors: 'Gray/Blue',
  },
};

export const LOCALES: Record<LocaleId, { name: string; description: string }> = {
  nb: { name: 'Norsk Bokmål', description: 'Norwegian Bokmål (default)' },
  nn: { name: 'Norsk Nynorsk', description: 'Norwegian Nynorsk' },
  en: { name: 'English', description: 'English' },
};

// ============================================================================
// Project Analysis
// ============================================================================

export function analyzeProject(projectDir: string): ProjectAnalysis {
  const analysis: ProjectAnalysis = {
    framework: 'unknown',
    entryFile: null,
    appFile: null,
    packageJson: null,
    srcDir: join(projectDir, 'src'),
    hasTypeScript: false,
    hasI18n: false,
    hasPlatformUI: false,
    hasGuardrails: false,
    existingProviders: [],
  };

  // Read package.json
  const packageJsonPath = join(projectDir, 'package.json');
  if (existsSync(packageJsonPath)) {
    analysis.packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    const deps = {
      ...analysis.packageJson.dependencies,
      ...analysis.packageJson.devDependencies,
    };

    analysis.hasPlatformUI = '@xala-technologies/platform-ui' in deps;
    analysis.hasGuardrails = '@xala-technologies/guardrails' in deps;
    analysis.hasI18n = '@xala-technologies/i18n' in deps || 'i18next' in deps;
  }

  // Check for TypeScript
  analysis.hasTypeScript = existsSync(join(projectDir, 'tsconfig.json'));

  // Detect framework
  if (
    existsSync(join(projectDir, 'vite.config.ts')) ||
    existsSync(join(projectDir, 'vite.config.js'))
  ) {
    analysis.framework = 'vite';
  } else if (
    existsSync(join(projectDir, 'next.config.ts')) ||
    existsSync(join(projectDir, 'next.config.js'))
  ) {
    analysis.framework = 'nextjs';
  } else if (existsSync(join(projectDir, 'remix.config.js'))) {
    analysis.framework = 'remix';
  } else if (analysis.packageJson?.dependencies?.['react-scripts']) {
    analysis.framework = 'cra';
  }

  // Find entry files
  const entryPatterns = {
    vite: ['src/main.tsx', 'src/main.ts', 'src/index.tsx', 'src/index.ts'],
    nextjs: ['src/app/layout.tsx', 'app/layout.tsx', 'src/pages/_app.tsx', 'pages/_app.tsx'],
    cra: ['src/index.tsx', 'src/index.js'],
    remix: ['app/root.tsx'],
    unknown: ['src/main.tsx', 'src/index.tsx', 'src/main.ts', 'src/index.ts'],
  };

  const patterns = entryPatterns[analysis.framework];
  for (const pattern of patterns) {
    const fullPath = join(projectDir, pattern);
    if (existsSync(fullPath)) {
      analysis.entryFile = fullPath;
      break;
    }
  }

  // Find App file
  const appPatterns = ['src/App.tsx', 'src/App.ts', 'src/app.tsx', 'src/app.ts'];
  for (const pattern of appPatterns) {
    const fullPath = join(projectDir, pattern);
    if (existsSync(fullPath)) {
      analysis.appFile = fullPath;
      break;
    }
  }

  // Check for existing providers in entry file
  if (analysis.entryFile && existsSync(analysis.entryFile)) {
    const content = readFileSync(analysis.entryFile, 'utf-8');
    const providerPatterns = [
      'GlobalErrorHandler',
      'ErrorBoundary',
      'ThemeProvider',
      'DesignsystemetProvider',
      'DigilistProvider',
      'I18nProvider',
      'QueryClientProvider',
      'BrowserRouter',
      'RealtimeProvider',
    ];

    for (const provider of providerPatterns) {
      if (content.includes(provider)) {
        analysis.existingProviders.push(provider);
      }
    }
  }

  return analysis;
}

// ============================================================================
// Code Generation
// ============================================================================

export function generateMainTsx(config: InstallConfig, analysis: ProjectAnalysis): string {
  const { theme, locale, appName, includeI18n } = config;

  const imports = [
    "import React from 'react';",
    "import ReactDOM from 'react-dom/client';",
    'import {',
    '  GlobalErrorHandler,',
    '  ErrorBoundary,',
    '  ThemeProvider,',
    '  DesignsystemetProvider,',
    "} from '@xala-technologies/platform-ui';",
    "import '@xala-technologies/platform-ui/styles';",
  ];

  if (includeI18n) {
    imports.push("import { I18nProvider } from '@xala-technologies/i18n';");
  }

  imports.push("import { App } from './App';");

  const providerStack = includeI18n
    ? `        <I18nProvider locale="${locale}">
          <ThemeProvider>
            <DesignsystemetProvider theme="${theme}" colorScheme="auto" locale="${locale}">
              <App />
            </DesignsystemetProvider>
          </ThemeProvider>
        </I18nProvider>`
    : `        <ThemeProvider>
          <DesignsystemetProvider theme="${theme}" colorScheme="auto" locale="${locale}">
            <App />
          </DesignsystemetProvider>
        </ThemeProvider>`;

  return `/**
 * ${appName} Entry Point
 *
 * Platform UI Configuration:
 * - Theme: ${theme}
 * - Locale: ${locale}
 * - Generated by: guardrails install
 *
 * REQUIRED PROVIDERS (DO NOT REMOVE):
 * 1. GlobalErrorHandler - Catches window errors, promise rejections, chunk load failures
 * 2. ErrorBoundary - Catches React component errors
 * 3. ThemeProvider - Manages light/dark theme preference
 * 4. DesignsystemetProvider - Provides design system context
 * ${includeI18n ? '5. I18nProvider - Internationalization support' : ''}
 *
 * Ref: docs/ux-lexicon/AI_CONTRACT.mdx
 */

${imports.join('\n')}

// Full height layout
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = 'html, body, #root { height: 100%; margin: 0; }';
  document.head.appendChild(style);
}

const root = document.getElementById('root');

if (!root) {
  throw new Error('Root element #root not found in document');
}

ReactDOM.createRoot(root).render(
  <React.StrictMode>
    <GlobalErrorHandler
      onError={(error) => {
        console.error('[GlobalErrorHandler]', error.type, error.message);
        // TODO: Send to error tracking service (Sentry, etc.)
      }}
    >
      <ErrorBoundary
        onError={(error, errorInfo) => {
          console.error('[ErrorBoundary]', error.message, errorInfo.componentStack);
          // TODO: Send to error tracking service (Sentry, etc.)
        }}
      >
${providerStack}
      </ErrorBoundary>
    </GlobalErrorHandler>
  </React.StrictMode>,
);
`;
}

export function generateClaudeMd(config: InstallConfig, analysis: ProjectAnalysis): string {
  const { theme, locale, appName } = config;

  return `# CLAUDE.md - ${appName}

This file provides guidance to Claude Code (claude.ai/code) when working with this codebase.

## Platform UI Configuration

- **Theme**: ${theme}
- **Locale**: ${locale}
- **Framework**: ${analysis.framework}

---

## Non-Negotiable Rules

### 1. NO RAW HTML ELEMENTS

\`\`\`
❌ NEVER use raw HTML elements: <div>, <span>, <p>, <button>, <input>, etc.
✅ ALWAYS use Platform UI components
\`\`\`

| HTML | Platform UI |
|------|-------------|
| \`<div>\` | \`Stack\`, \`Box\`, \`Grid\`, \`Container\`, \`Card\` |
| \`<span>\` | \`Text\`, \`Badge\` |
| \`<p>\` | \`Paragraph\` |
| \`<h1-h6>\` | \`Heading level={1-6}\` |
| \`<button>\` | \`Button\`, \`IconButton\` |
| \`<input>\` | \`Textfield\`, \`Checkbox\`, \`Radio\` |
| \`<select>\` | \`NativeSelect\`, \`Combobox\` |
| \`<table>\` | \`DataTable\`, \`Table\` |

**Reference**: \`docs/ux-lexicon/lexicon/*.mdx\`

### 2. STATE MATRIX REQUIRED

Every component MUST handle all states:

| State | Component |
|-------|-----------|
| Loading | \`LoadingFallback\`, \`Spinner\`, \`Skeleton\` |
| Empty | \`EmptyState\`, \`ResultsEmptyState\` |
| Error | \`Alert data-color="danger"\`, \`ErrorScreen\` |
| Success | Normal render + optional success alert |

### 3. i18n LOCALIZATION-FIRST

\`\`\`tsx
// ❌ WRONG
<Heading>Welcome</Heading>

// ✅ CORRECT
import { useT } from '@xala-technologies/i18n';
const t = useT();
<Heading>{t('page.welcome.title')}</Heading>
\`\`\`

### 4. STYLING RULES

\`\`\`tsx
// ✅ Allowed
<Card data-color="neutral" data-size="medium">
<Stack gap="4">
<Button data-color="accent">

// ❌ Forbidden
style={{ padding: '16px' }}
style={{ color: '#1a1a1a' }}
className="custom-class"
\`\`\`

---

## Import Patterns

\`\`\`tsx
// 1. Platform UI components
import {
  Stack, Card, Grid, Container,
  DataTable, EmptyState, LoadingFallback,
} from '@xala-technologies/platform-ui';

// 2. Designsystemet primitives
import {
  Heading, Paragraph, Button, Alert,
  Textfield, Checkbox,
} from '@digdir/designsystemet-react';

// 3. Platform UI shells
import { DashboardPageHeader } from '@xala-technologies/platform-ui/shells';
\`\`\`

---

## Component Layer Rules

| Layer | Can Import From |
|-------|-----------------|
| primitives | external packages only |
| composed | primitives |
| blocks | primitives, composed |
| patterns | primitives, composed, blocks |
| shells | all above |
| pages | all layers |

---

## Quick Reference

### Page Template
\`\`\`tsx
import { DashboardPageHeader } from '@xala-technologies/platform-ui/shells';
import { DataTable, EmptyState, LoadingFallback } from '@xala-technologies/platform-ui';
import { Alert } from '@digdir/designsystemet-react';
import { useT } from '@xala-technologies/i18n';

export function MyPage() {
  const t = useT();
  const { data, isLoading, error } = useMyData();

  if (isLoading) return <LoadingFallback />;
  if (error) return <Alert data-color="danger">{error.message}</Alert>;
  if (!data?.length) return <EmptyState title={t('empty.title')} />;

  return (
    <>
      <DashboardPageHeader title={t('page.title')} />
      <DataTable data={data} columns={columns} />
    </>
  );
  // Page is rendered inside AppLayout via Router <Outlet />; AppLayout provides header, sidebar, and main wrapper.
}
\`\`\`

---

## Verification

Before committing, run:
\`\`\`bash
pnpm guardrails check-compliance
pnpm test:compliance
pnpm lint:platform-ui
\`\`\`

---

## References

- UX Lexicon: \`docs/ux-lexicon/\`
- AI Contract: \`docs/ux-lexicon/AI_CONTRACT.mdx\`
- Component Dictionary: \`docs/ux-lexicon/registry/dictionary/\`
- Golden Flows: \`docs/ux-lexicon/golden-flows/\`

---

**Generated by**: guardrails install
**Date**: ${new Date().toISOString().split('T')[0]}
`;
}

export function generateESLintConfig(config: InstallConfig): string {
  return `/**
 * ESLint Configuration for Platform UI
 *
 * Generated by: guardrails install
 * Theme: ${config.theme}
 *
 * This configuration enforces:
 * - No raw HTML elements (use Platform UI components)
 * - No direct @digdir imports (use platform-ui wrappers)
 * - Design token usage for styling
 * - i18n for all user-facing strings
 *
 * DO NOT REMOVE these rules - they are required for Platform UI compliance.
 */

import { createFlatConfig } from '@xala-technologies/guardrails/eslint';
import tseslint from 'typescript-eslint';

export default [
  // Platform UI mandatory rules (includes raw HTML checks with helpful guidance)
  ...createFlatConfig(),

  // TypeScript
  ...tseslint.configs.recommended,

  // React hooks
  {
    plugins: {},
    rules: {
      // Add jsx-a11y rules for accessibility compliance
    },
  },

  // Custom rules for this project
  {
    rules: {
      // Add project-specific rules here
    },
  },

  // Ignore patterns
  {
    ignores: [
      'dist/**',
      'node_modules/**',
      '*.config.js',
      '*.config.ts',
    ],
  },
];
`;
}

export function generateComplianceTest(config: InstallConfig): string {
  return `/**
 * Platform UI Compliance Tests
 *
 * Generated by: guardrails install
 *
 * These tests ensure your app complies with Platform UI requirements:
 * - No raw HTML elements in source files
 * - No inline styles without design tokens
 * - No direct @digdir imports
 * - Required providers are configured
 *
 * Run with: pnpm test:compliance
 *
 * DO NOT DELETE this file - it is required for Platform UI compliance.
 */

import { describe, test, expect } from 'vitest';
import { createViolationTests } from '@xala-technologies/guardrails/testing';
import { checkProviderConfiguration } from '@xala-technologies/guardrails/compliance';

// Standard violation tests (no raw HTML, design tokens, etc.)
createViolationTests({
  srcDir: './src',
  describe,
  test,
  expect,
});

// Provider configuration test
describe('Platform UI Provider Configuration', () => {
  test('main entry file has required providers', () => {
    const result = checkProviderConfiguration('./src');

    if (!result.passed) {
      console.error('Missing providers:', result.missingProviders);
      console.error('Entry file:', result.entryFile);
    }

    expect(result.passed).toBe(true);
  });

  test('GlobalErrorHandler is configured', () => {
    const result = checkProviderConfiguration('./src');
    expect(result.providers.GlobalErrorHandler.found).toBe(true);
  });

  test('ErrorBoundary is configured', () => {
    const result = checkProviderConfiguration('./src');
    expect(result.providers.ErrorBoundary.found).toBe(true);
  });
});

// i18n compliance test
describe('i18n Compliance', () => {
  test.todo('all user-facing strings use t() function');
});

// Accessibility compliance test
describe('Accessibility Compliance', () => {
  test.todo('all interactive elements have accessible names');
  test.todo('color contrast meets WCAG AA standards');
});
`;
}

// ============================================================================
// Interactive Prompts
// ============================================================================

async function prompt(question: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) => {
    rl.question(question, (answer) => {
      rl.close();
      resolve(answer.trim());
    });
  });
}

async function selectOption<T extends string>(
  question: string,
  options: { value: T; label: string; description?: string }[],
  defaultValue: T
): Promise<T> {
  console.log(`\n${question}`);
  options.forEach((opt, i) => {
    const isDefault = opt.value === defaultValue ? ' (default)' : '';
    const desc = opt.description ? ` - ${opt.description}` : '';
    console.log(`  ${i + 1}. ${opt.label}${isDefault}${desc}`);
  });

  const answer = await prompt(`Enter choice [1-${options.length}]: `);
  const index = parseInt(answer, 10) - 1;

  if (isNaN(index) || index < 0 || index >= options.length) {
    return defaultValue;
  }

  return options[index].value;
}

async function confirm(question: string, defaultValue: boolean = true): Promise<boolean> {
  const defaultStr = defaultValue ? 'Y/n' : 'y/N';
  const answer = await prompt(`${question} [${defaultStr}]: `);

  if (!answer) return defaultValue;
  return answer.toLowerCase().startsWith('y');
}

// ============================================================================
// Main Installer
// ============================================================================

export async function runInteractiveInstall(
  projectDir: string,
  options: Partial<InstallConfig> = {}
): Promise<InstallResult> {
  const result: InstallResult = {
    success: false,
    steps: [],
    filesCreated: [],
    filesModified: [],
    warnings: [],
    errors: [],
    nextSteps: [],
  };

  console.log(`
╔═══════════════════════════════════════════════════════════════════╗
║     🚀 Platform UI Installation Wizard                            ║
╚═══════════════════════════════════════════════════════════════════╝
`);

  // Step 1: Analyze project
  console.log('📂 Analyzing project structure...\n');
  const analysis = analyzeProject(projectDir);

  console.log(`   Framework:     ${analysis.framework}`);
  console.log(
    `   Entry file:    ${analysis.entryFile ? relative(projectDir, analysis.entryFile) : 'Not found'}`
  );
  console.log(`   TypeScript:    ${analysis.hasTypeScript ? 'Yes' : 'No'}`);
  console.log(`   Platform UI:   ${analysis.hasPlatformUI ? 'Installed' : 'Not installed'}`);
  console.log(`   Guardrails:    ${analysis.hasGuardrails ? 'Installed' : 'Not installed'}`);

  if (analysis.existingProviders.length > 0) {
    console.log(`   Providers:     ${analysis.existingProviders.join(', ')}`);
  }

  // Step 2: Get configuration
  let config: InstallConfig;

  if (options.dryRun || process.env.CI) {
    // Non-interactive mode
    config = {
      projectDir,
      theme: options.theme || 'digilist',
      locale: options.locale || 'nb',
      appName: analysis.packageJson?.name || 'My App',
      includeI18n: options.includeI18n ?? true,
      includeRealtime: options.includeRealtime ?? false,
      generateClaudeMd: options.generateClaudeMd ?? true,
      dryRun: options.dryRun ?? false,
      verbose: options.verbose ?? false,
    };
  } else {
    // Interactive mode
    console.log('\n📝 Configuration\n');

    const appName =
      (await prompt(`App name [${analysis.packageJson?.name || 'my-app'}]: `)) ||
      analysis.packageJson?.name ||
      'my-app';

    const theme = await selectOption<ThemeId>(
      'Select theme:',
      Object.entries(THEMES).map(([value, { name, description }]) => ({
        value: value as ThemeId,
        label: name,
        description,
      })),
      'digilist'
    );

    const locale = await selectOption<LocaleId>(
      'Select default locale:',
      Object.entries(LOCALES).map(([value, { name, description }]) => ({
        value: value as LocaleId,
        label: name,
        description,
      })),
      'nb'
    );

    const includeI18n = await confirm('Include i18n support?', true);
    const generateClaudeMd = await confirm('Generate CLAUDE.md for AI assistance?', true);

    config = {
      projectDir,
      theme,
      locale,
      appName,
      includeI18n,
      includeRealtime: false,
      generateClaudeMd,
      dryRun: options.dryRun ?? false,
      verbose: options.verbose ?? false,
    };
  }

  console.log('\n📋 Installation Plan\n');
  console.log(`   Theme:         ${config.theme}`);
  console.log(`   Locale:        ${config.locale}`);
  console.log(`   i18n:          ${config.includeI18n ? 'Yes' : 'No'}`);
  console.log(`   CLAUDE.md:     ${config.generateClaudeMd ? 'Yes' : 'No'}`);

  if (!config.dryRun && !process.env.CI) {
    const proceed = await confirm('\nProceed with installation?', true);
    if (!proceed) {
      console.log('\n❌ Installation cancelled.\n');
      return result;
    }
  }

  console.log('\n🔧 Installing...\n');

  // Step 3: Check dependencies
  if (!analysis.hasPlatformUI) {
    result.warnings.push('@xala-technologies/platform-ui is not installed');
    result.nextSteps.push('Run: pnpm add @xala-technologies/platform-ui');
  }

  if (!analysis.hasGuardrails) {
    result.warnings.push('@xala-technologies/guardrails is not installed');
    result.nextSteps.push('Run: pnpm add -D @xala-technologies/guardrails');
  }

  // Step 4: Update/create entry file
  // Check if required providers are already configured
  // DigilistProvider is a comprehensive wrapper that includes GlobalErrorHandler,
  // ErrorBoundary, ThemeProvider, and DesignsystemetProvider internally
  const hasDigilistProvider = analysis.existingProviders.includes('DigilistProvider');
  const hasRequiredProviders =
    hasDigilistProvider ||
    (analysis.existingProviders.includes('GlobalErrorHandler') &&
      analysis.existingProviders.includes('ErrorBoundary') &&
      (analysis.existingProviders.includes('ThemeProvider') ||
        analysis.existingProviders.includes('DesignsystemetProvider')));

  if (analysis.entryFile && hasRequiredProviders) {
    // Providers already configured - skip modification
    console.log(
      `   ⏭️  Skipped: ${relative(projectDir, analysis.entryFile)} (providers already configured)`
    );
    result.warnings.push(
      'Entry file already has required providers. Skipped to preserve existing configuration.'
    );
  } else if (analysis.entryFile) {
    const mainContent = generateMainTsx(config, analysis);

    if (!config.dryRun) {
      writeFileSync(analysis.entryFile, mainContent);
      result.filesModified.push(analysis.entryFile);
    }
    console.log(`   ✅ Updated: ${relative(projectDir, analysis.entryFile)}`);
  } else {
    // Create new main.tsx
    const mainPath = join(projectDir, 'src', 'main.tsx');
    const mainContent = generateMainTsx(config, analysis);

    if (!config.dryRun) {
      const srcDir = dirname(mainPath);
      if (!existsSync(srcDir)) {
        mkdirSync(srcDir, { recursive: true });
      }
      writeFileSync(mainPath, mainContent);
      result.filesCreated.push(mainPath);
    }
    console.log(`   ✅ Created: src/main.tsx`);
  }

  // Step 5: Create ESLint config
  const eslintPath = join(projectDir, 'eslint.config.platform-ui.js');
  if (!existsSync(eslintPath)) {
    const eslintContent = generateESLintConfig(config);

    if (!config.dryRun) {
      writeFileSync(eslintPath, eslintContent);
      result.filesCreated.push(eslintPath);
    }
    console.log(`   ✅ Created: eslint.config.platform-ui.js`);
  } else {
    console.log(`   ⏭️  Skipped: eslint.config.platform-ui.js (already exists)`);
  }

  // Step 6: Create compliance tests
  const testsDir = join(projectDir, 'tests');
  const complianceTestPath = join(testsDir, 'platform-ui-compliance.test.ts');

  if (!existsSync(complianceTestPath)) {
    const testContent = generateComplianceTest(config);

    if (!config.dryRun) {
      if (!existsSync(testsDir)) {
        mkdirSync(testsDir, { recursive: true });
      }
      writeFileSync(complianceTestPath, testContent);
      result.filesCreated.push(complianceTestPath);
    }
    console.log(`   ✅ Created: tests/platform-ui-compliance.test.ts`);
  } else {
    console.log(`   ⏭️  Skipped: tests/platform-ui-compliance.test.ts (already exists)`);
  }

  // Step 7: Generate CLAUDE.md
  if (config.generateClaudeMd) {
    const claudeMdPath = join(projectDir, 'CLAUDE.md');
    const existingClaudeMd = existsSync(claudeMdPath);

    const claudeMdContent = generateClaudeMd(config, analysis);

    if (!config.dryRun) {
      if (existingClaudeMd) {
        // Append to existing CLAUDE.md
        const existing = readFileSync(claudeMdPath, 'utf-8');
        if (!existing.includes('## Platform UI Configuration')) {
          writeFileSync(claudeMdPath, existing + '\n\n---\n\n' + claudeMdContent);
          result.filesModified.push(claudeMdPath);
          console.log(`   ✅ Updated: CLAUDE.md (appended Platform UI section)`);
        } else {
          console.log(`   ⏭️  Skipped: CLAUDE.md (Platform UI section exists)`);
        }
      } else {
        writeFileSync(claudeMdPath, claudeMdContent);
        result.filesCreated.push(claudeMdPath);
        console.log(`   ✅ Created: CLAUDE.md`);
      }
    } else {
      console.log(`   📝 Would ${existingClaudeMd ? 'update' : 'create'}: CLAUDE.md`);
    }
  }

  // Step 8: Update package.json scripts
  if (analysis.packageJson && !config.dryRun) {
    const packageJsonPath = join(projectDir, 'package.json');
    const scriptsToAdd: Record<string, string> = {
      'test:compliance': 'vitest run tests/platform-ui-compliance.test.ts',
      'verify:compliance': 'guardrails check-compliance',
      'verify:providers': 'guardrails verify:providers',
      'lint:platform-ui': 'eslint --config eslint.config.platform-ui.js src',
    };

    let scriptsUpdated = false;
    analysis.packageJson.scripts = analysis.packageJson.scripts || {};

    for (const [key, value] of Object.entries(scriptsToAdd)) {
      if (!analysis.packageJson.scripts[key]) {
        analysis.packageJson.scripts[key] = value;
        scriptsUpdated = true;
      }
    }

    if (scriptsUpdated) {
      writeFileSync(packageJsonPath, JSON.stringify(analysis.packageJson, null, 2) + '\n');
      result.filesModified.push(packageJsonPath);
      console.log(`   ✅ Updated: package.json (added scripts)`);
    }
  }

  // Step 9: Summary
  result.success = result.errors.length === 0;

  console.log(`
═══════════════════════════════════════════════════════════════════
${result.success ? '✅ INSTALLATION COMPLETE' : '⚠️  INSTALLATION COMPLETED WITH WARNINGS'}
═══════════════════════════════════════════════════════════════════

Files created: ${result.filesCreated.length}
Files modified: ${result.filesModified.length}
`);

  if (result.warnings.length > 0) {
    console.log('⚠️  Warnings:');
    result.warnings.forEach((w) => console.log(`   - ${w}`));
    console.log('');
  }

  // Add next steps
  result.nextSteps.push(
    'Review the generated files',
    'Merge eslint.config.platform-ui.js into your main ESLint config',
    'Run: pnpm guardrails check-compliance',
    'Run: pnpm test:compliance'
  );

  console.log('📋 Next Steps:');
  result.nextSteps.forEach((step, i) => console.log(`   ${i + 1}. ${step}`));
  console.log('');

  console.log('📚 Documentation:');
  console.log('   - UX Lexicon: docs/ux-lexicon/');
  console.log('   - AI Contract: docs/ux-lexicon/AI_CONTRACT.mdx');
  console.log('   - Component Dictionary: docs/ux-lexicon/registry/dictionary/');
  console.log('');

  return result;
}

export default {
  analyzeProject,
  runInteractiveInstall,
  generateMainTsx,
  generateClaudeMd,
  generateESLintConfig,
  generateComplianceTest,
  THEMES,
  LOCALES,
};
