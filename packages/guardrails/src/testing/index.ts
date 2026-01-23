/**
 * Testing Utilities for Platform UI Consumers
 *
 * MANDATORY: Apps using @xala-technologies/platform-ui MUST run these tests.
 * This ensures compliance with design system rules.
 *
 * Usage in app's vitest.config.ts:
 * ```
 * import { createViolationTests } from '@xala-technologies/guardrails/testing';
 *
 * // In your test file:
 * createViolationTests({ srcDir: './src' });
 * ```
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, relative } from 'path';

// ============================================================================
// Types
// ============================================================================

export interface ViolationTestOptions {
  /** Source directory to scan */
  srcDir: string;
  /** Root directory for relative paths */
  rootDir?: string;
  /** Patterns to exclude from scanning */
  excludePatterns?: string[];
  /** Patterns to allow raw HTML (e.g., stories) */
  allowRawHtmlPatterns?: string[];
  /** Patterns to allow inline styles */
  allowInlineStylePatterns?: string[];
}

export interface Violation {
  file: string;
  line: number;
  type: 'raw-html' | 'inline-style' | 'forbidden-import';
  message: string;
  content: string;
}

export interface ViolationReport {
  violations: Violation[];
  filesScanned: number;
  passed: boolean;
}

// ============================================================================
// Constants
// ============================================================================

const RAW_HTML_ELEMENTS = [
  'div',
  'span',
  'p',
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',
  'section',
  'article',
  'header',
  'footer',
  'nav',
  'aside',
  'main',
  'button',
  'input',
  'select',
  'textarea',
  'label',
  'form',
  'ul',
  'ol',
  'li',
  'table',
  'tr',
  'td',
  'th',
  'a',
];

const FORBIDDEN_IMPORTS = ['@digdir/designsystemet-react', '@digdir/designsystemet-css'];

const DEFAULT_EXCLUDE_PATTERNS = ['node_modules', 'dist', '.git', 'coverage', '__mocks__'];

const DEFAULT_ALLOW_RAW_HTML = ['.stories.', '.story.', '.test.', '.spec.', '__tests__'];

const DEFAULT_ALLOW_INLINE_STYLE = ['.stories.', '.story.'];

// ============================================================================
// Scanner Functions
// ============================================================================

function scanDirectory(dir: string, excludePatterns: string[]): string[] {
  const files: string[] = [];

  if (!existsSync(dir)) return files;

  const entries = readdirSync(dir);

  for (const entry of entries) {
    if (excludePatterns.some((p) => entry.includes(p))) continue;

    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...scanDirectory(fullPath, excludePatterns));
    } else if (stat.isFile() && /\.(tsx?|jsx?)$/.test(entry)) {
      files.push(fullPath);
    }
  }

  return files;
}

function matchesPattern(filePath: string, patterns: string[]): boolean {
  return patterns.some((pattern) => filePath.includes(pattern));
}

// ============================================================================
// Violation Checkers
// ============================================================================

/**
 * Check for raw HTML elements
 */
export function checkRawHtml(
  filePath: string,
  content: string,
  rootDir: string,
  allowPatterns: string[]
): Violation[] {
  if (matchesPattern(filePath, allowPatterns)) return [];

  const violations: Violation[] = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Skip comments and imports
    const trimmed = line.trim();
    if (
      trimmed.startsWith('//') ||
      trimmed.startsWith('/*') ||
      trimmed.startsWith('*') ||
      trimmed.startsWith('import') ||
      trimmed.startsWith('export')
    ) {
      return;
    }

    for (const element of RAW_HTML_ELEMENTS) {
      const regex = new RegExp(`<${element}[\\s>]`, 'gi');
      if (regex.test(line)) {
        violations.push({
          file: relative(rootDir, filePath),
          line: index + 1,
          type: 'raw-html',
          message: `Raw <${element}> element detected. Use platform-ui components.`,
          content: trimmed.substring(0, 100),
        });
        break; // Only report once per line
      }
    }
  });

  return violations;
}

/**
 * Check for inline styles
 */
export function checkInlineStyles(
  filePath: string,
  content: string,
  rootDir: string,
  allowPatterns: string[]
): Violation[] {
  if (matchesPattern(filePath, allowPatterns)) return [];

  const violations: Violation[] = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Check for style={{ ... }}
    if (/style\s*=\s*\{\{/.test(line)) {
      // Allow if using design tokens
      if (/var\(--ds-/.test(line)) return;

      violations.push({
        file: relative(rootDir, filePath),
        line: index + 1,
        type: 'inline-style',
        message: 'Inline styles must use design tokens (var(--ds-*))',
        content: line.trim().substring(0, 100),
      });
    }
  });

  return violations;
}

/**
 * Check for forbidden imports
 */
export function checkForbiddenImports(
  filePath: string,
  content: string,
  rootDir: string
): Violation[] {
  const violations: Violation[] = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    for (const forbidden of FORBIDDEN_IMPORTS) {
      if (line.includes(`from '${forbidden}'`) || line.includes(`from "${forbidden}"`)) {
        violations.push({
          file: relative(rootDir, filePath),
          line: index + 1,
          type: 'forbidden-import',
          message: `Direct import from ${forbidden} is forbidden. Use @xala-technologies/platform-ui.`,
          content: line.trim(),
        });
      }
    }
  });

  return violations;
}

// ============================================================================
// Main Test Functions
// ============================================================================

/**
 * Run all violation checks and return report
 */
export function runViolationChecks(options: ViolationTestOptions): ViolationReport {
  const {
    srcDir,
    rootDir = srcDir,
    excludePatterns = DEFAULT_EXCLUDE_PATTERNS,
    allowRawHtmlPatterns = DEFAULT_ALLOW_RAW_HTML,
    allowInlineStylePatterns = DEFAULT_ALLOW_INLINE_STYLE,
  } = options;

  const files = scanDirectory(srcDir, excludePatterns);
  const allViolations: Violation[] = [];

  for (const file of files) {
    const content = readFileSync(file, 'utf-8');

    allViolations.push(
      ...checkRawHtml(file, content, rootDir, allowRawHtmlPatterns),
      ...checkInlineStyles(file, content, rootDir, allowInlineStylePatterns),
      ...checkForbiddenImports(file, content, rootDir)
    );
  }

  return {
    violations: allViolations,
    filesScanned: files.length,
    passed: allViolations.length === 0,
  };
}

/**
 * Format violation report for display
 */
export function formatViolationReport(report: ViolationReport): string {
  if (report.passed) {
    return `✅ Platform UI compliance check passed (${report.filesScanned} files scanned)`;
  }

  const lines = [`❌ Found ${report.violations.length} Platform UI violations:\n`];

  // Group by type
  const byType = report.violations.reduce(
    (acc, v) => {
      if (!acc[v.type]) acc[v.type] = [];
      acc[v.type].push(v);
      return acc;
    },
    {} as Record<string, Violation[]>
  );

  if (byType['raw-html']) {
    lines.push(`\n📋 RAW HTML ELEMENTS (${byType['raw-html'].length}):`);
    byType['raw-html'].forEach((v) => {
      lines.push(`   ${v.file}:${v.line} - ${v.message}`);
    });
  }

  if (byType['inline-style']) {
    lines.push(`\n📋 INLINE STYLES (${byType['inline-style'].length}):`);
    byType['inline-style'].forEach((v) => {
      lines.push(`   ${v.file}:${v.line} - ${v.message}`);
    });
  }

  if (byType['forbidden-import']) {
    lines.push(`\n📋 FORBIDDEN IMPORTS (${byType['forbidden-import'].length}):`);
    byType['forbidden-import'].forEach((v) => {
      lines.push(`   ${v.file}:${v.line} - ${v.message}`);
    });
  }

  return lines.join('\n');
}

/**
 * Create Vitest test suite for violation detection
 *
 * Usage in your test file:
 * ```typescript
 * import { createViolationTests } from '@xala-technologies/guardrails/testing';
 *
 * createViolationTests({
 *   srcDir: './src',
 *   describe, // from vitest
 *   test,     // from vitest
 *   expect,   // from vitest
 * });
 * ```
 */
export function createViolationTests(
  options: ViolationTestOptions & {
    describe: (name: string, fn: () => void) => void;
    test: (name: string, fn: () => void) => void;
    expect: (value: unknown) => { toEqual: (expected: unknown) => void };
  }
) {
  const { describe, test, expect, ...checkOptions } = options;

  describe('Platform UI Compliance Tests (MANDATORY)', () => {
    test('should not contain raw HTML elements', () => {
      const report = runViolationChecks(checkOptions);
      const htmlViolations = report.violations.filter((v) => v.type === 'raw-html');

      if (htmlViolations.length > 0) {
        console.error('\n' + formatViolationReport({ ...report, violations: htmlViolations }));
      }

      expect(htmlViolations).toEqual([]);
    });

    test('should not contain inline styles without design tokens', () => {
      const report = runViolationChecks(checkOptions);
      const styleViolations = report.violations.filter((v) => v.type === 'inline-style');

      if (styleViolations.length > 0) {
        console.error('\n' + formatViolationReport({ ...report, violations: styleViolations }));
      }

      expect(styleViolations).toEqual([]);
    });

    test('should not import directly from @digdir packages', () => {
      const report = runViolationChecks(checkOptions);
      const importViolations = report.violations.filter((v) => v.type === 'forbidden-import');

      if (importViolations.length > 0) {
        console.error('\n' + formatViolationReport({ ...report, violations: importViolations }));
      }

      expect(importViolations).toEqual([]);
    });

    test('should pass all Platform UI compliance checks', () => {
      const report = runViolationChecks(checkOptions);

      if (!report.passed) {
        console.error('\n' + formatViolationReport(report));
      }

      expect(report.violations).toEqual([]);
    });
  });
}

export default {
  runViolationChecks,
  formatViolationReport,
  createViolationTests,
  checkRawHtml,
  checkInlineStyles,
  checkForbiddenImports,
};
