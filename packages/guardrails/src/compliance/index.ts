/**
 * App Compliance Checker
 *
 * Verifies that an app consuming @xala-technologies/platform-ui
 * meets all mandatory requirements.
 *
 * MANDATORY REQUIREMENTS:
 * 1. ESLint config extends platform-ui rules
 * 2. Violation tests are configured and passing
 * 3. No raw HTML elements in source files
 * 4. No inline styles without design tokens
 * 5. No direct @digdir imports
 */

import { existsSync, readFileSync } from 'fs';
import { join } from 'path';
import { runViolationChecks, formatViolationReport } from '../testing/index.js';

// ============================================================================
// Types
// ============================================================================

export interface ComplianceCheck {
  name: string;
  passed: boolean;
  message: string;
  details?: string[];
}

export interface ComplianceReport {
  appName: string;
  checks: ComplianceCheck[];
  overallPassed: boolean;
  timestamp: string;
}

// ============================================================================
// Check Functions
// ============================================================================

/**
 * Check if package.json has platform-ui as a dependency
 */
export function checkDependency(appDir: string): ComplianceCheck {
  const packageJsonPath = join(appDir, 'package.json');

  if (!existsSync(packageJsonPath)) {
    return {
      name: 'Platform UI Dependency',
      passed: false,
      message: 'package.json not found',
    };
  }

  const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
  const deps = {
    ...packageJson.dependencies,
    ...packageJson.devDependencies,
    ...packageJson.peerDependencies,
  };

  const hasPlatformUI = '@xala-technologies/platform-ui' in deps;
  const hasGuardrails = '@xala-technologies/guardrails' in deps;

  if (!hasPlatformUI) {
    return {
      name: 'Platform UI Dependency',
      passed: false,
      message: '@xala-technologies/platform-ui is not installed',
    };
  }

  if (!hasGuardrails) {
    return {
      name: 'Platform UI Dependency',
      passed: false,
      message: '@xala-technologies/guardrails must also be installed',
      details: [
        'Run: pnpm add -D @xala-technologies/guardrails',
      ],
    };
  }

  return {
    name: 'Platform UI Dependency',
    passed: true,
    message: 'Platform UI and Guardrails are installed',
  };
}

/**
 * Check if ESLint config exists and extends platform-ui rules
 */
export function checkESLintConfig(appDir: string): ComplianceCheck {
  const eslintConfigs = [
    'eslint.config.js',
    'eslint.config.mjs',
    'eslint.config.cjs',
    '.eslintrc.js',
    '.eslintrc.json',
    '.eslintrc.yaml',
    '.eslintrc.yml',
  ];

  let configPath: string | null = null;
  for (const config of eslintConfigs) {
    const fullPath = join(appDir, config);
    if (existsSync(fullPath)) {
      configPath = fullPath;
      break;
    }
  }

  if (!configPath) {
    return {
      name: 'ESLint Configuration',
      passed: false,
      message: 'No ESLint configuration found',
      details: [
        'Create eslint.config.js with:',
        "import { createFlatConfig } from '@xala-technologies/guardrails/eslint';",
        'export default [...createFlatConfig(), /* your rules */];',
      ],
    };
  }

  const content = readFileSync(configPath, 'utf-8');
  const hasGuardrailsImport = content.includes('@xala-technologies/guardrails');

  if (!hasGuardrailsImport) {
    return {
      name: 'ESLint Configuration',
      passed: false,
      message: 'ESLint config does not extend Platform UI rules',
      details: [
        'Your ESLint config MUST extend guardrails rules:',
        "import { createFlatConfig } from '@xala-technologies/guardrails/eslint';",
      ],
    };
  }

  return {
    name: 'ESLint Configuration',
    passed: true,
    message: 'ESLint extends Platform UI rules',
  };
}

/**
 * Check if violation tests exist
 */
export function checkViolationTests(appDir: string): ComplianceCheck {
  const testPatterns = [
    'tests/**/violation*.test.ts',
    'tests/**/violation*.test.tsx',
    'tests/**/compliance*.test.ts',
    'tests/**/compliance*.test.tsx',
    'src/**/*.compliance.test.ts',
    '__tests__/**/violation*.ts',
  ];

  // Simple check: look for common test file locations
  const testDirs = ['tests', '__tests__', 'test', 'src'];
  let hasTests = false;

  for (const dir of testDirs) {
    const testDir = join(appDir, dir);
    if (existsSync(testDir)) {
      // Check if any file contains violation test setup
      try {
        const files = findFilesWithPattern(testDir, /\.(test|spec)\.(ts|tsx)$/);
        for (const file of files) {
          const content = readFileSync(file, 'utf-8');
          if (
            content.includes('createViolationTests') ||
            content.includes('runViolationChecks') ||
            content.includes('Platform UI Compliance')
          ) {
            hasTests = true;
            break;
          }
        }
      } catch {
        // Ignore errors
      }
    }
    if (hasTests) break;
  }

  if (!hasTests) {
    return {
      name: 'Violation Tests',
      passed: false,
      message: 'No Platform UI compliance tests found',
      details: [
        'Create tests/compliance.test.ts with:',
        "import { describe, test, expect } from 'vitest';",
        "import { createViolationTests } from '@xala-technologies/guardrails/testing';",
        '',
        'createViolationTests({',
        "  srcDir: './src',",
        '  describe,',
        '  test,',
        '  expect,',
        '});',
      ],
    };
  }

  return {
    name: 'Violation Tests',
    passed: true,
    message: 'Compliance tests are configured',
  };
}

/**
 * Run actual violation checks on source code
 */
export function checkSourceCompliance(appDir: string): ComplianceCheck {
  const srcDir = join(appDir, 'src');

  if (!existsSync(srcDir)) {
    return {
      name: 'Source Code Compliance',
      passed: false,
      message: 'No src directory found',
    };
  }

  const report = runViolationChecks({
    srcDir,
    rootDir: appDir,
  });

  if (!report.passed) {
    return {
      name: 'Source Code Compliance',
      passed: false,
      message: `Found ${report.violations.length} violations`,
      details: formatViolationReport(report).split('\n'),
    };
  }

  return {
    name: 'Source Code Compliance',
    passed: true,
    message: `All ${report.filesScanned} files pass compliance checks`,
  };
}

/**
 * Check if CI workflow includes compliance checks
 */
export function checkCIWorkflow(appDir: string): ComplianceCheck {
  const workflowDirs = [
    join(appDir, '.github', 'workflows'),
    join(appDir, '.gitlab-ci.yml'),
    join(appDir, '.circleci'),
  ];

  let hasCI = false;
  let hasComplianceCheck = false;

  // Check GitHub Actions
  const githubDir = join(appDir, '.github', 'workflows');
  if (existsSync(githubDir)) {
    hasCI = true;
    try {
      const files = findFilesWithPattern(githubDir, /\.ya?ml$/);
      for (const file of files) {
        const content = readFileSync(file, 'utf-8');
        if (
          content.includes('guardrails') ||
          content.includes('verify:compliance') ||
          content.includes('test:compliance')
        ) {
          hasComplianceCheck = true;
          break;
        }
      }
    } catch {
      // Ignore
    }
  }

  if (!hasCI) {
    return {
      name: 'CI Workflow',
      passed: false,
      message: 'No CI workflow found',
      details: [
        'Create .github/workflows/ci.yml with compliance checks',
        'See: @xala-technologies/guardrails for CI template',
      ],
    };
  }

  if (!hasComplianceCheck) {
    return {
      name: 'CI Workflow',
      passed: false,
      message: 'CI workflow does not include compliance checks',
      details: [
        'Add to your CI workflow:',
        '- run: pnpm guardrails check-compliance',
        'OR',
        '- run: pnpm test:compliance',
      ],
    };
  }

  return {
    name: 'CI Workflow',
    passed: true,
    message: 'CI includes compliance checks',
  };
}

// ============================================================================
// Helpers
// ============================================================================

function findFilesWithPattern(dir: string, pattern: RegExp): string[] {
  const { readdirSync, statSync } = require('fs');
  const { join } = require('path');

  const files: string[] = [];

  const entries = readdirSync(dir);
  for (const entry of entries) {
    if (entry === 'node_modules') continue;

    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      files.push(...findFilesWithPattern(fullPath, pattern));
    } else if (pattern.test(entry)) {
      files.push(fullPath);
    }
  }

  return files;
}

// ============================================================================
// Main Compliance Check
// ============================================================================

/**
 * Run all compliance checks for an app
 */
export function checkCompliance(appDir: string): ComplianceReport {
  const packageJsonPath = join(appDir, 'package.json');
  let appName = 'Unknown App';

  if (existsSync(packageJsonPath)) {
    const packageJson = JSON.parse(readFileSync(packageJsonPath, 'utf-8'));
    appName = packageJson.name || appName;
  }

  const checks: ComplianceCheck[] = [
    checkDependency(appDir),
    checkESLintConfig(appDir),
    checkViolationTests(appDir),
    checkSourceCompliance(appDir),
    checkCIWorkflow(appDir),
  ];

  const overallPassed = checks.every((c) => c.passed);

  return {
    appName,
    checks,
    overallPassed,
    timestamp: new Date().toISOString(),
  };
}

/**
 * Format compliance report for display
 */
export function formatComplianceReport(report: ComplianceReport): string {
  const lines: string[] = [
    '',
    '═══════════════════════════════════════════════════════════════════',
    `  PLATFORM UI COMPLIANCE REPORT: ${report.appName}`,
    '═══════════════════════════════════════════════════════════════════',
    '',
  ];

  for (const check of report.checks) {
    const icon = check.passed ? '✅' : '❌';
    lines.push(`${icon} ${check.name}`);
    lines.push(`   ${check.message}`);

    if (check.details && check.details.length > 0) {
      lines.push('');
      check.details.forEach((detail) => {
        lines.push(`   ${detail}`);
      });
    }
    lines.push('');
  }

  lines.push('───────────────────────────────────────────────────────────────────');

  if (report.overallPassed) {
    lines.push('');
    lines.push('✅ ALL COMPLIANCE CHECKS PASSED');
    lines.push('   This app is approved to use @xala-technologies/platform-ui');
  } else {
    lines.push('');
    lines.push('❌ COMPLIANCE CHECKS FAILED');
    lines.push('   This app does NOT meet Platform UI requirements.');
    lines.push('   Fix the issues above before using @xala-technologies/platform-ui.');
  }

  lines.push('');
  lines.push('═══════════════════════════════════════════════════════════════════');
  lines.push(`  Report generated: ${report.timestamp}`);
  lines.push('═══════════════════════════════════════════════════════════════════');
  lines.push('');

  return lines.join('\n');
}

export default {
  checkCompliance,
  formatComplianceReport,
  checkDependency,
  checkESLintConfig,
  checkViolationTests,
  checkSourceCompliance,
  checkCIWorkflow,
};
