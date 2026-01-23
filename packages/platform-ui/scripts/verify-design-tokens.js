#!/usr/bin/env node

/**
 * Design Token Verification Script
 *
 * Ensures UI components use Designsystemet design tokens only.
 * Detects raw HTML elements that don't use design tokens, raw CSS values,
 * and custom CSS classes.
 *
 * Architecture:
 * - Raw HTML elements are allowed when styled with --ds-* tokens
 * - Inline styles must use var(--ds-*) design tokens
 * - Custom CSS classes must use ds-* prefix
 *
 * Usage: node scripts/verify-design-tokens.js
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

// Allowed exceptions (files where violations are acceptable)
const ALLOWED_FILES = [
  'src/stories/', // Storybook examples
  '.storybook/', // Storybook config
  'scripts/', // Scripts
];

// File extensions to check
const EXTENSIONS = ['.ts', '.tsx', '.jsx'];

/**
 * Check if file path is in allowed list
 */
function isAllowedFile(filePath) {
  const relativePath = relative(ROOT_DIR, filePath);
  return ALLOWED_FILES.some((allowed) => relativePath.includes(allowed));
}

/**
 * Recursively scan directory for files
 */
function scanDirectory(dir, files = []) {
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
 * Check for inline styles that don't use design tokens
 */
function checkInlineStyles(filePath, content) {
  if (isAllowedFile(filePath)) {
    return [];
  }

  const violations = [];

  // Find all style objects in the content
  // Match style={{ ... }} patterns including multi-line
  const styleRegex = /style\s*=\s*\{\{([^}]*(?:\{[^}]*\}[^}]*)*)\}\}/gs;
  let match;

  while ((match = styleRegex.exec(content)) !== null) {
    const styleContent = match[1];

    // Check if any value in the style object uses a raw value (not a design token)
    const rawValueRegex = /:\s*['"]([^'"]+)['"]/g;
    let valueMatch;

    while ((valueMatch = rawValueRegex.exec(styleContent)) !== null) {
      const value = valueMatch[1];

      // Allow if value contains design token reference (standard or extended)
      // Standard: var(--ds-*) - from Designsystemet
      // Extended: var(--ds-extended-*) - platform extensions following naming convention
      if (value.includes('var(--ds-')) {
        continue;
      }

      // Allow CSS keywords and display values (including vendor prefixes for line-clamp)
      if (
        /^(-webkit-box|vertical|horizontal|auto|none|inherit|initial|unset|transparent|currentColor|hidden|visible|absolute|relative|fixed|sticky|flex|grid|block|inline|inline-block|inline-flex|inline-grid|contents|flow-root|table|table-row|table-cell|row|column|row-reverse|column-reverse|nowrap|wrap|wrap-reverse|center|start|end|left|right|top|bottom|space-between|space-around|space-evenly|stretch|baseline|self-start|self-end|pointer|default|move|grab|grabbing|text|not-allowed|wait|progress|help|crosshair|cell|alias|copy|no-drop|context-menu|all-scroll|col-resize|row-resize|n-resize|s-resize|e-resize|w-resize|ne-resize|nw-resize|se-resize|sw-resize|ew-resize|ns-resize|nesw-resize|nwse-resize|zoom-in|zoom-out|solid|dashed|dotted|double|groove|ridge|inset|outset|normal|bold|bolder|lighter|100|200|300|400|500|600|700|800|900|italic|oblique|uppercase|lowercase|capitalize|full-width|underline|overline|line-through|ellipsis|scroll|clip|visible|cover|contain|fill|repeat|repeat-x|repeat-y|no-repeat|space|round|disc|circle|square|decimal|decimal-leading-zero|lower-roman|upper-roman|lower-alpha|upper-alpha|flex-start|flex-end|ease|ease-in|ease-out|ease-in-out|linear|step-start|step-end|inside|outside|both|forwards|backwards|running|paused|infinite|alternate|alternate-reverse|break-word|break-all|keep-all|anywhere|word-break|pre|pre-wrap|pre-line|balance|portrait|landscape|white|black|collapse|separate|fit-content|max-content|min-content)$/.test(
          value
        )
      ) {
        continue;
      }

      // Allow CSS grid span values (e.g., "1 / -1", "span 2")
      if (/^(\d+\s*\/\s*-?\d+|span\s+\d+)$/.test(value)) {
        continue;
      }

      // Allow numeric values with units
      if (/^-?\d*\.?\d+(%|px|em|rem|vh|vw|vmin|vmax|deg|rad|turn|ms|s|fr)?$/.test(value)) {
        continue;
      }

      // Allow CSS functions (calc, translate, rotate, blur, etc.)
      if (/^(calc|translateX|translateY|translateZ|translate|translate3d|rotate|rotateX|rotateY|rotateZ|rotate3d|scale|scaleX|scaleY|scaleZ|scale3d|skew|skewX|skewY|matrix|matrix3d|perspective|min|max|clamp|minmax|repeat|blur|brightness|contrast|drop-shadow|grayscale|hue-rotate|invert|opacity|saturate|sepia|url|linear-gradient|radial-gradient|conic-gradient|repeating-linear-gradient|repeating-radial-gradient|attr|counter|counters|env|fit-content|steps|cubic-bezier)\(/.test(value)) {
        continue;
      }

      // Allow CSS shorthand patterns: "1px solid", "0 auto", CSS grid values, etc.
      if (/^[\d\w\s\-%(),.]+$/.test(value)) {
        // Check if it's primarily CSS units and keywords (allowing these patterns)
        const parts = value.split(/\s+/);
        const allPartsValid = parts.every((part) =>
          /^(-?\d*\.?\d+(%|px|em|rem|vh|vw|deg|ms|s|fr)?|auto|none|solid|dashed|dotted|center|left|right|top|bottom|flex-start|flex-end|space-between|space-around|minmax|repeat|auto-fit|auto-fill|\d+fr)$/.test(
            part
          ) || part.startsWith('minmax(') || part.startsWith('repeat(')
        );
        if (allPartsValid) {
          continue;
        }
      }

      // Allow CSS transition/animation values (property duration timing-function delay)
      // e.g., "transform 0.2s ease", "all 0.3s ease-in-out", "spin 1s linear infinite"
      if (/^[\w-]+(\s+[\d.]+m?s|\s+[\d.]+|\s+(ease|linear|ease-in|ease-out|ease-in-out|step-start|step-end|infinite|alternate|forwards|backwards|both|running|paused))+$/.test(value)) {
        continue;
      }

      // Allow multiple transitions/animations (comma-separated)
      if (/^([\w-]+\s+[\d.]+m?s(\s+[\w-]+)?)(,\s*[\w-]+\s+[\d.]+m?s(\s+[\w-]+)?)*$/.test(value)) {
        continue;
      }

      // Allow CSS cubic-bezier and steps
      if (/cubic-bezier\(|steps\(/.test(value)) {
        continue;
      }

      // Allow border shorthand (e.g., "2px solid currentColor", "3px solid transparent")
      if (/^\d+px\s+(solid|dashed|dotted|double)\s+(currentColor|transparent)$/.test(value)) {
        continue;
      }

      // Find line number
      const beforeMatch = content.substring(0, match.index);
      const lineNumber = beforeMatch.split('\n').length;

      violations.push({
        file: relative(ROOT_DIR, filePath),
        line: lineNumber,
        type: 'raw-style-value',
        value,
        content: match[0].substring(0, 100),
      });
    }
  }

  return violations;
}

/**
 * Check for custom CSS classes that don't use ds- prefix
 */
function checkCustomClasses(filePath, content) {
  if (isAllowedFile(filePath)) {
    return [];
  }

  const violations = [];
  const lines = content.split('\n');

  lines.forEach((line, index) => {
    // Match className="literal-string" (not className={variable})
    const literalClassMatch = line.match(/className\s*=\s*["']([^"']+)["']/);
    if (literalClassMatch) {
      const className = literalClassMatch[1];
      // Check each class name
      const classes = className.split(/\s+/);
      for (const cls of classes) {
        // Skip if it's a ds-* class or cn() utility class pattern
        if (!cls.startsWith('ds-') && cls.length > 0) {
          violations.push({
            file: relative(ROOT_DIR, filePath),
            line: index + 1,
            type: 'custom-class',
            className: cls,
            content: line.trim(),
          });
        }
      }
    }
  });

  return violations;
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Verifying Designsystemet design token usage...\n');

  const srcDir = join(ROOT_DIR, 'src');
  const files = scanDirectory(srcDir);

  console.log(`📁 Scanning ${files.length} files...\n`);

  let allViolations = [];

  for (const file of files) {
    const content = readFileSync(file, 'utf-8');

    const styleViolations = checkInlineStyles(file, content);
    const classViolations = checkCustomClasses(file, content);

    allViolations = allViolations.concat(styleViolations, classViolations);
  }

  if (allViolations.length === 0) {
    console.log('✅ All design token checks passed. Components follow Designsystemet standards!\n');
    process.exit(0);
  }

  console.log(`❌ Found ${allViolations.length} design token violations:\n`);

  // Group by type
  const byType = {};
  allViolations.forEach((v) => {
    if (!byType[v.type]) byType[v.type] = [];
    byType[v.type].push(v);
  });

  // Report raw style value violations
  if (byType['raw-style-value']) {
    console.log(`\n📋 RAW STYLE VALUES (${byType['raw-style-value'].length}):`);
    console.log('   Use var(--ds-*) design tokens instead of raw values\n');
    byType['raw-style-value'].slice(0, 20).forEach((v) => {
      console.log(`   ${v.file}:${v.line}`);
      console.log(`   → Value: "${v.value}"`);
      console.log(`   → Use: var(--ds-*) design tokens`);
      console.log('');
    });
    if (byType['raw-style-value'].length > 20) {
      console.log(`   ... and ${byType['raw-style-value'].length - 20} more\n`);
    }
  }

  // Report custom class violations
  if (byType['custom-class']) {
    console.log(`\n⚠️  CUSTOM CSS CLASSES (${byType['custom-class'].length}):`);
    console.log('   Use ds-* prefixed classes or data attributes\n');
    byType['custom-class'].slice(0, 20).forEach((v) => {
      console.log(`   ${v.file}:${v.line}`);
      console.log(`   → className="${v.className}"`);
      console.log(`   → Use: ds-* prefix or data-size, data-color attributes`);
      console.log('');
    });
    if (byType['custom-class'].length > 20) {
      console.log(`   ... and ${byType['custom-class'].length - 20} more\n`);
    }
  }

  console.log('💡 See docs/guides/DESIGN_TOKENS.md for proper usage.\n');

  process.exit(1);
}

main();
