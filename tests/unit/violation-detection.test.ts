/**
 * Violation Detection Tests
 *
 * Ensures apps do not contain raw HTML elements or inline styles.
 * These tests scan source code to detect design system violations.
 */

import { describe, test, expect } from 'vitest';
import * as fs from 'fs';
import * as path from 'path';

// Patterns that indicate violations
const VIOLATION_PATTERNS = {
  rawHtml: /<(div|span|section|article|aside|nav|header|footer|main|p|h[1-6])[\s>]/g,
  inlineStyles: /style=\{\{/g,
  rawButton: /<button[\s>]/g,
  rawInput: /<input[\s>]/g,
  rawForm: /<form[\s>]/g,
  hardcodedColors: /#[0-9a-fA-F]{3,6}|rgb\(|rgba\(/g,
  hardcodedPixels: /:\s*\d+px(?!\s*\/)/g, // px not in a calc or division
};

// Allowed patterns (exceptions)
const ALLOWED_EXCEPTIONS = [
  /import.*from/,       // Import statements
  /export.*from/,       // Export statements
  /\/\//,               // Comments
  /\/\*/,               // Block comments
  /\*\//,               // Block comment end
  /\.stories\./,        // Story files (may have examples)
];

function scanFileForViolations(filePath: string): string[] {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n');
  const violations: string[] = [];

  lines.forEach((line, index) => {
    // Skip allowed exceptions
    if (ALLOWED_EXCEPTIONS.some((pattern) => pattern.test(line))) {
      return;
    }

    // Check for raw HTML elements
    if (VIOLATION_PATTERNS.rawHtml.test(line)) {
      violations.push(`${filePath}:${index + 1} - Raw HTML element detected: ${line.trim()}`);
    }

    // Check for inline styles
    if (VIOLATION_PATTERNS.inlineStyles.test(line)) {
      violations.push(`${filePath}:${index + 1} - Inline style detected: ${line.trim()}`);
    }

    // Reset regex lastIndex
    VIOLATION_PATTERNS.rawHtml.lastIndex = 0;
    VIOLATION_PATTERNS.inlineStyles.lastIndex = 0;
  });

  return violations;
}

function getAppSourceFiles(appPath: string): string[] {
  const files: string[] = [];

  function walkDir(dir: string) {
    if (!fs.existsSync(dir)) return;

    const entries = fs.readdirSync(dir, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);

      if (entry.isDirectory() && !entry.name.includes('node_modules')) {
        walkDir(fullPath);
      } else if (entry.isFile() && entry.name.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
  }

  walkDir(appPath);
  return files;
}

describe('Violation Detection', () => {
  describe('Command Center App', () => {
    const appPath = path.resolve(__dirname, '../../apps/command-center/src');

    test('should not contain raw HTML elements', () => {
      const files = getAppSourceFiles(appPath);
      const allViolations: string[] = [];

      for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        const lines = content.split('\n');

        lines.forEach((line, index) => {
          // Skip imports, exports, and comments
          if (
            line.includes('import') ||
            line.includes('export') ||
            line.trim().startsWith('//') ||
            line.trim().startsWith('*')
          ) {
            return;
          }

          // Check for raw div/span elements
          if (/<div[\s>]|<span[\s>]/.test(line)) {
            allViolations.push(
              `${path.relative(appPath, file)}:${index + 1} - Raw HTML: ${line.trim().substring(0, 80)}`
            );
          }
        });
      }

      expect(allViolations).toEqual([]);
    });

    test('should not contain inline styles', () => {
      const files = getAppSourceFiles(appPath);
      const allViolations: string[] = [];

      for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        const lines = content.split('\n');

        lines.forEach((line, index) => {
          if (/style=\{\{/.test(line)) {
            allViolations.push(
              `${path.relative(appPath, file)}:${index + 1} - Inline style: ${line.trim().substring(0, 80)}`
            );
          }
        });
      }

      expect(allViolations).toEqual([]);
    });

    test('should only use platform-ui imports for UI components', () => {
      const files = getAppSourceFiles(appPath);
      const forbiddenImports: string[] = [];

      for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');

        // Check for direct @digdir imports (should use platform-ui instead)
        if (
          content.includes("from '@digdir/designsystemet-react'") &&
          !file.includes('main.tsx')
        ) {
          forbiddenImports.push(
            `${path.relative(appPath, file)} - Direct @digdir import (use @xala-technologies/platform-ui)`
          );
        }
      }

      expect(forbiddenImports).toEqual([]);
    });
  });

  describe('Playground App', () => {
    const appPath = path.resolve(__dirname, '../../apps/playground/src');

    test('should not contain raw HTML elements', () => {
      const files = getAppSourceFiles(appPath);
      const allViolations: string[] = [];

      for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        const lines = content.split('\n');

        lines.forEach((line, index) => {
          if (
            line.includes('import') ||
            line.includes('export') ||
            line.trim().startsWith('//') ||
            line.trim().startsWith('*')
          ) {
            return;
          }

          if (/<div[\s>]|<span[\s>]/.test(line)) {
            allViolations.push(
              `${path.relative(appPath, file)}:${index + 1} - Raw HTML: ${line.trim().substring(0, 80)}`
            );
          }
        });
      }

      expect(allViolations).toEqual([]);
    });

    test('should not contain inline styles', () => {
      const files = getAppSourceFiles(appPath);
      const allViolations: string[] = [];

      for (const file of files) {
        const content = fs.readFileSync(file, 'utf-8');
        const lines = content.split('\n');

        lines.forEach((line, index) => {
          if (/style=\{\{/.test(line)) {
            allViolations.push(
              `${path.relative(appPath, file)}:${index + 1} - Inline style: ${line.trim().substring(0, 80)}`
            );
          }
        });
      }

      expect(allViolations).toEqual([]);
    });
  });

  describe('File Count Verification', () => {
    test('command-center should have expected page files', () => {
      const pagesPath = path.resolve(__dirname, '../../apps/command-center/src/pages');
      const files = fs.readdirSync(pagesPath).filter((f) => f.endsWith('.tsx'));

      expect(files).toContain('Dashboard.tsx');
      expect(files).toContain('WorkflowCatalog.tsx');
      expect(files).toContain('ApprovalStatus.tsx');
      expect(files).toContain('SpecEditor.tsx');
    });

    test('playground should have App.tsx', () => {
      const appFile = path.resolve(__dirname, '../../apps/playground/src/App.tsx');
      expect(fs.existsSync(appFile)).toBe(true);
    });
  });
});
