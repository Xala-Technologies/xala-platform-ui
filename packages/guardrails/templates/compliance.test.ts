/**
 * Platform UI Compliance Tests
 * ============================
 *
 * MANDATORY: Apps using @xala-technologies/platform-ui MUST include these tests.
 *
 * Copy this file to: tests/compliance.test.ts (or tests/platform-ui-compliance.test.ts)
 *
 * These tests ensure your app complies with Platform UI governance rules:
 * 1. No raw HTML elements in source code
 * 2. No inline styles without design tokens
 * 3. No direct @digdir imports
 */

import { describe, test, expect } from 'vitest';
import { createViolationTests, runViolationChecks } from '@xala-technologies/guardrails/testing';
import * as path from 'path';

// =============================================================================
// CONFIGURATION - Adjust these paths for your app
// =============================================================================

const APP_SRC_DIR = path.resolve(__dirname, '../src');
const APP_ROOT_DIR = path.resolve(__dirname, '..');

// Patterns to exclude from scanning (in addition to defaults)
const EXCLUDE_PATTERNS = [
  'node_modules',
  'dist',
  'build',
  'coverage',
  '__mocks__',
];

// Files where raw HTML is allowed (e.g., stories, tests)
const ALLOW_RAW_HTML_IN = [
  '.stories.',
  '.story.',
  '.test.',
  '.spec.',
  '__tests__',
];

// =============================================================================
// MANDATORY COMPLIANCE TESTS
// =============================================================================

describe('Platform UI Compliance (MANDATORY)', () => {
  // Option 1: Use the createViolationTests helper
  createViolationTests({
    srcDir: APP_SRC_DIR,
    rootDir: APP_ROOT_DIR,
    excludePatterns: EXCLUDE_PATTERNS,
    allowRawHtmlPatterns: ALLOW_RAW_HTML_IN,
    describe,
    test,
    expect,
  });
});

// =============================================================================
// ADDITIONAL CUSTOM COMPLIANCE TESTS
// =============================================================================

describe('Additional Compliance Checks', () => {
  test('should have no critical violations', () => {
    const report = runViolationChecks({
      srcDir: APP_SRC_DIR,
      rootDir: APP_ROOT_DIR,
      excludePatterns: EXCLUDE_PATTERNS,
    });

    // Log summary
    console.log(`\n📊 Compliance Summary:`);
    console.log(`   Files scanned: ${report.filesScanned}`);
    console.log(`   Violations: ${report.violations.length}`);
    console.log(`   Status: ${report.passed ? '✅ PASSED' : '❌ FAILED'}\n`);

    expect(report.passed).toBe(true);
  });

  test('should not import directly from @digdir packages', () => {
    const report = runViolationChecks({
      srcDir: APP_SRC_DIR,
      rootDir: APP_ROOT_DIR,
    });

    const importViolations = report.violations.filter((v) => v.type === 'forbidden-import');

    if (importViolations.length > 0) {
      console.error('\n❌ Forbidden imports detected:');
      importViolations.forEach((v) => {
        console.error(`   ${v.file}:${v.line}`);
        console.error(`   ${v.message}\n`);
      });
    }

    expect(importViolations).toHaveLength(0);
  });

  test('should only use design tokens for styling', () => {
    const report = runViolationChecks({
      srcDir: APP_SRC_DIR,
      rootDir: APP_ROOT_DIR,
      allowInlineStylePatterns: ALLOW_RAW_HTML_IN,
    });

    const styleViolations = report.violations.filter((v) => v.type === 'inline-style');

    if (styleViolations.length > 0) {
      console.error('\n❌ Inline styles without design tokens:');
      styleViolations.forEach((v) => {
        console.error(`   ${v.file}:${v.line}`);
        console.error(`   Use: var(--ds-*) tokens instead\n`);
      });
    }

    expect(styleViolations).toHaveLength(0);
  });
});

// =============================================================================
// FILE COUNT VERIFICATION
// =============================================================================

describe('Source Structure Verification', () => {
  test('should have required page/component files', () => {
    // Customize this for your app's structure
    const report = runViolationChecks({
      srcDir: APP_SRC_DIR,
      rootDir: APP_ROOT_DIR,
    });

    // At minimum, we should have some source files
    expect(report.filesScanned).toBeGreaterThan(0);
  });
});
