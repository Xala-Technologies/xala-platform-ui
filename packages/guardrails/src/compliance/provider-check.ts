/**
 * Provider Configuration Check
 *
 * Validates that apps using Platform UI have the required providers configured.
 *
 * REQUIRED PROVIDERS:
 * 1. GlobalErrorHandler - Window error catching
 * 2. ErrorBoundary - React error boundary
 * 3. ThemeProvider or DesignsystemetProvider - Theme management
 * 4. (Optional but recommended) I18nProvider - Localization
 *
 * The app MUST wrap its root component with these providers.
 * If missing, the app is NON-COMPLIANT with Platform UI requirements.
 */

import { existsSync, readFileSync, readdirSync, statSync } from 'fs';
import { join, extname } from 'path';

// ============================================================================
// Types
// ============================================================================

export interface ProviderCheckResult {
  passed: boolean;
  entryFile: string | null;
  providers: {
    GlobalErrorHandler: ProviderStatus;
    ErrorBoundary: ProviderStatus;
    ThemeProvider: ProviderStatus;
    DesignsystemetProvider: ProviderStatus;
    DigilistProvider: ProviderStatus;
    I18nProvider: ProviderStatus;
  };
  missingProviders: string[];
  warnings: string[];
}

export interface ProviderStatus {
  found: boolean;
  imported: boolean;
  used: boolean;
  line?: number;
}

// ============================================================================
// Constants
// ============================================================================

/**
 * Required providers that MUST be present for compliance
 */
export const REQUIRED_PROVIDERS = [
  'GlobalErrorHandler',
  'ErrorBoundary',
] as const;

/**
 * Providers that should be present (at least one theme provider)
 * DigilistProvider is included as it wraps ThemeProvider + DesignsystemetProvider
 */
export const THEME_PROVIDERS = [
  'ThemeProvider',
  'DesignsystemetProvider',
  'DigilistProvider', // @digilist/runtime wrapper for theme providers
] as const;

/**
 * Recommended providers (not required but warned if missing)
 */
export const RECOMMENDED_PROVIDERS = [
  'I18nProvider',
] as const;

/**
 * Pattern to find entry files
 */
const ENTRY_FILE_PATTERNS = [
  'main.tsx',
  'main.ts',
  'index.tsx',
  'index.ts',
  '_app.tsx',
  'layout.tsx',
];

// ============================================================================
// Helpers
// ============================================================================

/**
 * Find the entry file in a directory
 */
function findEntryFile(srcDir: string): string | null {
  if (!existsSync(srcDir)) {
    return null;
  }

  // Check src directory
  for (const pattern of ENTRY_FILE_PATTERNS) {
    const fullPath = join(srcDir, pattern);
    if (existsSync(fullPath)) {
      return fullPath;
    }
  }

  // Check app subdirectory (Next.js App Router)
  const appDir = join(srcDir, 'app');
  if (existsSync(appDir)) {
    for (const pattern of ENTRY_FILE_PATTERNS) {
      const fullPath = join(appDir, pattern);
      if (existsSync(fullPath)) {
        return fullPath;
      }
    }
  }

  // Check pages subdirectory (Next.js Pages Router)
  const pagesDir = join(srcDir, 'pages');
  if (existsSync(pagesDir)) {
    const appPath = join(pagesDir, '_app.tsx');
    if (existsSync(appPath)) {
      return appPath;
    }
  }

  return null;
}

/**
 * Check if a provider is imported in the file
 */
function checkProviderImport(content: string, providerName: string): { imported: boolean; line?: number } {
  const lines = content.split('\n');

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Check for named import
    if (line.includes('import') && line.includes(providerName)) {
      return { imported: true, line: i + 1 };
    }
  }

  return { imported: false };
}

/**
 * Check if a provider is used in JSX
 */
function checkProviderUsage(content: string, providerName: string): { used: boolean; line?: number } {
  const lines = content.split('\n');

  // Pattern for JSX usage: <ProviderName or </ProviderName
  const pattern = new RegExp(`<\\/?${providerName}[\\s>]`);

  for (let i = 0; i < lines.length; i++) {
    if (pattern.test(lines[i])) {
      return { used: true, line: i + 1 };
    }
  }

  return { used: false };
}

/**
 * Check a specific provider in the content
 */
function checkProvider(content: string, providerName: string): ProviderStatus {
  const importCheck = checkProviderImport(content, providerName);
  const usageCheck = checkProviderUsage(content, providerName);

  return {
    found: importCheck.imported && usageCheck.used,
    imported: importCheck.imported,
    used: usageCheck.used,
    line: importCheck.line || usageCheck.line,
  };
}

// ============================================================================
// Main Check Function
// ============================================================================

/**
 * Check if the app has all required providers configured
 */
export function checkProviderConfiguration(srcDir: string): ProviderCheckResult {
  const result: ProviderCheckResult = {
    passed: false,
    entryFile: null,
    providers: {
      GlobalErrorHandler: { found: false, imported: false, used: false },
      ErrorBoundary: { found: false, imported: false, used: false },
      ThemeProvider: { found: false, imported: false, used: false },
      DesignsystemetProvider: { found: false, imported: false, used: false },
      DigilistProvider: { found: false, imported: false, used: false },
      I18nProvider: { found: false, imported: false, used: false },
    },
    missingProviders: [],
    warnings: [],
  };

  // Find entry file
  const entryFile = findEntryFile(srcDir);
  if (!entryFile) {
    result.warnings.push('Could not find entry file (main.tsx, index.tsx, _app.tsx, layout.tsx)');
    result.missingProviders = [...REQUIRED_PROVIDERS, ...THEME_PROVIDERS];
    return result;
  }

  result.entryFile = entryFile;

  // Read file content
  const content = readFileSync(entryFile, 'utf-8');

  // Check each provider
  result.providers.GlobalErrorHandler = checkProvider(content, 'GlobalErrorHandler');
  result.providers.ErrorBoundary = checkProvider(content, 'ErrorBoundary');
  result.providers.ThemeProvider = checkProvider(content, 'ThemeProvider');
  result.providers.DesignsystemetProvider = checkProvider(content, 'DesignsystemetProvider');
  result.providers.I18nProvider = checkProvider(content, 'I18nProvider');

  // Check required providers
  for (const provider of REQUIRED_PROVIDERS) {
    if (!result.providers[provider].found) {
      result.missingProviders.push(provider);
    }
  }

  // Check for DigilistProvider (includes theme providers)
  result.providers.DigilistProvider = checkProvider(content, 'DigilistProvider');

  // Check theme providers (at least one required)
  const hasThemeProvider =
    result.providers.ThemeProvider.found ||
    result.providers.DesignsystemetProvider.found ||
    result.providers.DigilistProvider.found;

  if (!hasThemeProvider) {
    result.missingProviders.push('ThemeProvider or DesignsystemetProvider');
  }

  // Check recommended providers (warnings only)
  if (!result.providers.I18nProvider.found) {
    result.warnings.push('I18nProvider is not configured. Recommended for localization.');
  }

  // Check for platform-ui styles import
  if (!content.includes("@xala-technologies/platform-ui/styles")) {
    result.warnings.push("Missing '@xala-technologies/platform-ui/styles' import. Required for styling.");
  }

  // Determine if passed
  result.passed = result.missingProviders.length === 0;

  return result;
}

/**
 * Format the provider check result for display
 */
export function formatProviderCheckResult(result: ProviderCheckResult): string {
  const lines: string[] = [
    '',
    '═══════════════════════════════════════════════════════════════════',
    '  PLATFORM UI PROVIDER CHECK',
    '═══════════════════════════════════════════════════════════════════',
    '',
  ];

  if (result.entryFile) {
    lines.push(`Entry file: ${result.entryFile}`);
    lines.push('');
  }

  lines.push('REQUIRED PROVIDERS:');

  // GlobalErrorHandler
  const gh = result.providers.GlobalErrorHandler;
  lines.push(`  ${gh.found ? '✅' : '❌'} GlobalErrorHandler ${gh.found ? '(configured)' : '(MISSING)'}`);
  if (gh.imported && !gh.used) {
    lines.push('      ⚠️  Imported but not used in JSX');
  }

  // ErrorBoundary
  const eb = result.providers.ErrorBoundary;
  lines.push(`  ${eb.found ? '✅' : '❌'} ErrorBoundary ${eb.found ? '(configured)' : '(MISSING)'}`);
  if (eb.imported && !eb.used) {
    lines.push('      ⚠️  Imported but not used in JSX');
  }

  lines.push('');
  lines.push('THEME PROVIDERS (at least one required):');

  // ThemeProvider
  const tp = result.providers.ThemeProvider;
  lines.push(`  ${tp.found ? '✅' : '○'} ThemeProvider ${tp.found ? '(configured)' : ''}`);

  // DesignsystemetProvider
  const dp = result.providers.DesignsystemetProvider;
  lines.push(`  ${dp.found ? '✅' : '○'} DesignsystemetProvider ${dp.found ? '(configured)' : ''}`);

  // DigilistProvider (wraps ThemeProvider + DesignsystemetProvider)
  const dlp = result.providers.DigilistProvider;
  lines.push(`  ${dlp.found ? '✅' : '○'} DigilistProvider ${dlp.found ? '(configured - includes theme providers)' : ''}`);

  const hasThemeProvider = tp.found || dp.found || dlp.found;
  if (!hasThemeProvider) {
    lines.push('  ❌ At least one theme provider is required');
  }

  lines.push('');
  lines.push('RECOMMENDED PROVIDERS:');

  // I18nProvider
  const i18n = result.providers.I18nProvider;
  lines.push(`  ${i18n.found ? '✅' : '○'} I18nProvider ${i18n.found ? '(configured)' : '(not found)'}`);

  // Warnings
  if (result.warnings.length > 0) {
    lines.push('');
    lines.push('WARNINGS:');
    for (const warning of result.warnings) {
      lines.push(`  ⚠️  ${warning}`);
    }
  }

  lines.push('');
  lines.push('───────────────────────────────────────────────────────────────────');

  if (result.passed) {
    lines.push('');
    lines.push('✅ PROVIDER CHECK PASSED');
    lines.push('   All required providers are configured.');
  } else {
    lines.push('');
    lines.push('❌ PROVIDER CHECK FAILED');
    lines.push('');
    lines.push('Missing providers:');
    for (const provider of result.missingProviders) {
      lines.push(`  - ${provider}`);
    }
    lines.push('');
    lines.push('To fix, wrap your app with the required providers:');
    lines.push('');
    lines.push('  <GlobalErrorHandler>');
    lines.push('    <ErrorBoundary>');
    lines.push('      <ThemeProvider>');
    lines.push('        <App />');
    lines.push('      </ThemeProvider>');
    lines.push('    </ErrorBoundary>');
    lines.push('  </GlobalErrorHandler>');
    lines.push('');
    lines.push('Or run: guardrails install');
  }

  lines.push('');
  lines.push('═══════════════════════════════════════════════════════════════════');
  lines.push('');

  return lines.join('\n');
}

// ============================================================================
// Exports
// ============================================================================

export default {
  checkProviderConfiguration,
  formatProviderCheckResult,
  REQUIRED_PROVIDERS,
  THEME_PROVIDERS,
  RECOMMENDED_PROVIDERS,
};
