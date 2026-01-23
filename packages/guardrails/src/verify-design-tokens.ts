/**
 * Design Token Verification
 *
 * Ensures UI components use Designsystemet design tokens only.
 * Detects raw HTML elements, inline styles, and custom CSS.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, relative } from 'path';

// Raw HTML elements that should use Designsystemet components instead
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
  'a',
  'input',
  'select',
  'textarea',
  'label',
  'ul',
  'ol',
  'li',
  'table',
  'tr',
  'td',
  'th',
];

// Allowed exceptions (files where raw HTML is acceptable)
const DEFAULT_ALLOWED_PATTERNS = [
  'stories/', // Storybook examples
  '.storybook/', // Storybook config
  'scripts/', // Scripts
];

// Layout primitives that are foundational building blocks
// These use raw HTML because Designsystemet doesn't provide generic Box/Flex components
const PRIMITIVE_LAYOUT_UTILITIES = [
  'primitives/center.tsx',
  'primitives/container.tsx',
  'primitives/grid.tsx',
  'primitives/layout-grid.tsx',
  'primitives/stack.tsx',
  'primitives/sidebar.tsx',
  'primitives/main-content.tsx',
  'primitives/horizontal-layout.tsx',
  'primitives/text.tsx', // Creates text variants
  'primitives/badge.tsx', // Badge styles
  'primitives/card.tsx', // Card styles
  'primitives/progress.tsx', // Progress bar
  'primitives/icons.tsx', // Icon wrappers
];

// File extensions to check
const EXTENSIONS = ['.ts', '.tsx', '.jsx'];

export type DesignTokenViolationType = 'raw-html' | 'inline-style' | 'custom-class';

export interface DesignTokenViolation {
  file: string;
  line: number;
  type: DesignTokenViolationType;
  element?: string;
  className?: string;
  content: string;
}

/**
 * Check if file path is in allowed list or is a primitive layout utility
 */
function isAllowedFile(filePath: string, rootDir: string, allowedPatterns: string[]): boolean {
  const relativePath = relative(rootDir, filePath);
  // Check user-provided patterns
  if (allowedPatterns.some((allowed) => relativePath.includes(allowed))) {
    return true;
  }
  // Check primitive layout utilities (foundational building blocks)
  return PRIMITIVE_LAYOUT_UTILITIES.some((util) => relativePath.includes(util));
}

/**
 * Recursively scan directory for files
 */
function scanDirectory(dir: string, files: string[] = []): string[] {
  if (!existsSync(dir)) return files;

  const entries = readdirSync(dir);

  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      if (['node_modules', 'dist', '.git', '.storybook', 'stories'].includes(entry)) {
        continue;
      }
      scanDirectory(fullPath, files);
    } else if (stat.isFile()) {
      if (EXTENSIONS.some((ext) => fullPath.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

/**
 * Check for raw HTML elements
 */
function checkRawHTML(
  filePath: string,
  content: string,
  rootDir: string,
  allowedPatterns: string[]
): DesignTokenViolation[] {
  if (isAllowedFile(filePath, rootDir, allowedPatterns)) {
    return [];
  }

  const violations: DesignTokenViolation[] = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Skip comments
    if (line.trim().startsWith('//') || line.trim().startsWith('/*')) {
      return;
    }

    RAW_HTML_ELEMENTS.forEach((element) => {
      // Match JSX opening tags: <div>, <div className="...">, etc.
      const regex = new RegExp(`<${element}[\\s>]`, 'gi');
      if (regex.test(line)) {
        violations.push({
          file: relative(rootDir, filePath),
          line: index + 1,
          type: 'raw-html',
          element,
          content: line.trim(),
        });
      }
    });
  });

  return violations;
}

// CSS properties that don't need design tokens (layout, positioning, etc.)
const ALLOWED_CSS_PROPERTIES = [
  'display',
  'position',
  'flex',
  'flexDirection',
  'flexWrap',
  'justifyContent',
  'alignItems',
  'alignContent',
  'alignSelf',
  'gridTemplateColumns',
  'gridTemplateRows',
  'gridColumn',
  'gridRow',
  'overflow',
  'overflowX',
  'overflowY',
  'visibility',
  'opacity',
  'transform',
  'transition',
  'cursor',
  'pointerEvents',
  'userSelect',
  'textAlign',
  'verticalAlign',
  'whiteSpace',
  'wordBreak',
  'textOverflow',
  'listStyle',
  'listStyleType',
  'boxSizing',
  'objectFit',
  'objectPosition',
  'resize',
  'appearance',
  'outline',
  'textDecoration',
  'fontStyle',
];

// Patterns that indicate raw values that SHOULD use design tokens
const RAW_VALUE_PATTERNS = [
  /:\s*['"]?\d+px['"]?[,;\s}]/, // Raw pixel values: 10px, '10px'
  /:\s*['"]?#[0-9a-fA-F]{3,8}['"]?[,;\s}]/, // Hex colors: #fff, #ffffff
  /:\s*['"]?rgb[a]?\([^)]+\)['"]?[,;\s}]/, // RGB/RGBA colors
  /:\s*['"]?hsl[a]?\([^)]+\)['"]?[,;\s}]/, // HSL/HSLA colors
];

/**
 * Check for inline styles with raw values that should use design tokens
 */
function checkInlineStyles(
  filePath: string,
  content: string,
  rootDir: string,
  allowedPatterns: string[]
): DesignTokenViolation[] {
  if (isAllowedFile(filePath, rootDir, allowedPatterns)) {
    return [];
  }

  const violations: DesignTokenViolation[] = [];
  const lines = content.split('\n');

  // Track if we're inside a style object
  let inStyleBlock = false;
  let braceDepth = 0;
  let styleStartLine = 0;

  lines.forEach((line, index) => {
    // Detect start of style block
    if (/style\s*=\s*\{\{/.test(line)) {
      inStyleBlock = true;
      braceDepth = (line.match(/\{/g) || []).length - (line.match(/\}/g) || []).length;
      styleStartLine = index + 1;
    }

    // Check lines inside style blocks for raw values
    if (inStyleBlock) {
      // Allow if using design token variables
      if (/var\(--ds-/.test(line)) {
        // This line uses design tokens - OK
      } else if (/\b(sizes|animation|zIndex|shadows)\.\w+/.test(line)) {
        // Using extended token constants - OK
      } else {
        // Check for raw values that should use tokens
        for (const pattern of RAW_VALUE_PATTERNS) {
          if (pattern.test(line)) {
            // Skip if it's a fallback value in var()
            if (/var\([^)]+,/.test(line)) {
              continue; // Fallback values in var() are OK
            }

            violations.push({
              file: relative(rootDir, filePath),
              line: index + 1,
              type: 'inline-style',
              content: line.trim(),
            });
            break;
          }
        }
      }

      // Track brace depth
      braceDepth += (line.match(/\{/g) || []).length;
      braceDepth -= (line.match(/\}/g) || []).length;

      if (braceDepth <= 0) {
        inStyleBlock = false;
      }
    }
  });

  return violations;
}

/**
 * Check for custom CSS classes
 */
function checkCustomClasses(
  filePath: string,
  content: string,
  rootDir: string,
  allowedPatterns: string[]
): DesignTokenViolation[] {
  if (isAllowedFile(filePath, rootDir, allowedPatterns)) {
    return [];
  }

  const violations: DesignTokenViolation[] = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Match className="..." or className={...}
    const classNameMatch = line.match(/className\s*=\s*["'{]([^"'}]+)["'}]/);
    if (classNameMatch) {
      const className = classNameMatch[1];
      // Warn if not using ds- prefix
      if (!className.includes('ds-') && !className.includes('{')) {
        violations.push({
          file: relative(rootDir, filePath),
          line: index + 1,
          type: 'custom-class',
          className,
          content: line.trim(),
        });
      }
    }
  });

  return violations;
}

export interface VerifyDesignTokensOptions {
  srcDir: string;
  rootDir?: string;
  allowedPatterns?: string[];
  silent?: boolean;
}

export interface VerifyDesignTokensResult {
  violations: DesignTokenViolation[];
  filesScanned: number;
  passed: boolean;
}

/**
 * Verify design token usage
 */
export function verifyDesignTokens(options: VerifyDesignTokensOptions): VerifyDesignTokensResult {
  const {
    srcDir,
    rootDir = srcDir,
    allowedPatterns = DEFAULT_ALLOWED_PATTERNS,
    silent = false,
  } = options;

  if (!silent) {
    console.log('🔍 Verifying Designsystemet design token usage...\n');
  }

  const files = scanDirectory(srcDir);

  if (!silent) {
    console.log(`📁 Scanning ${files.length} files...\n`);
  }

  let allViolations: DesignTokenViolation[] = [];

  for (const file of files) {
    const content = readFileSync(file, 'utf-8');

    const htmlViolations = checkRawHTML(file, content, rootDir, allowedPatterns);
    const styleViolations = checkInlineStyles(file, content, rootDir, allowedPatterns);
    const classViolations = checkCustomClasses(file, content, rootDir, allowedPatterns);

    allViolations = allViolations.concat(htmlViolations, styleViolations, classViolations);
  }

  if (!silent) {
    if (allViolations.length === 0) {
      console.log(
        '✅ All design token checks passed. Components follow Designsystemet standards!\n'
      );
    } else {
      console.log(`❌ Found ${allViolations.length} design token violations:\n`);

      // Group by type
      const byType: Record<string, DesignTokenViolation[]> = {};
      allViolations.forEach((v) => {
        if (!byType[v.type]) byType[v.type] = [];
        byType[v.type].push(v);
      });

      // Report raw HTML violations
      if (byType['raw-html']) {
        console.log(`\n📋 RAW HTML ELEMENTS (${byType['raw-html'].length}):`);
        console.log('   Use Designsystemet components instead of raw HTML\n');
        byType['raw-html'].forEach((v) => {
          console.log(`   ${v.file}:${v.line}`);
          console.log(`   → Found: <${v.element}>`);
          console.log(`   → Use: Import from @digdir/designsystemet-react`);
          console.log('');
        });
      }

      // Report inline style violations
      if (byType['inline-style']) {
        console.log(`\n📋 INLINE STYLES (${byType['inline-style'].length}):`);
        console.log('   Use data attributes or design token variables\n');
        byType['inline-style'].forEach((v) => {
          console.log(`   ${v.file}:${v.line}`);
          console.log(`   → ${v.content.substring(0, 100)}${v.content.length > 100 ? '...' : ''}`);
          console.log('');
        });
      }

      // Report custom class violations
      if (byType['custom-class']) {
        console.log(`\n⚠️  CUSTOM CSS CLASSES (${byType['custom-class'].length}):`);
        console.log('   Prefer data attributes over custom classes\n');
        byType['custom-class'].forEach((v) => {
          console.log(`   ${v.file}:${v.line}`);
          console.log(`   → className="${v.className}"`);
          console.log(`   → Use: data-size, data-color, data-spacing`);
          console.log('');
        });
      }

      console.log('💡 See docs/guides/DESIGN_TOKENS.md for proper usage.\n');
    }
  }

  return {
    violations: allViolations,
    filesScanned: files.length,
    passed: allViolations.length === 0,
  };
}
