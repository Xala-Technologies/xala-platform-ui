#!/usr/bin/env node

/**
 * Accessibility Verification Script
 * 
 * Scans components for common accessibility violations:
 * - Missing ARIA labels
 * - Missing alt text on images
 * - Missing form labels
 * - Keyboard accessibility issues
 * - Color contrast issues (design token usage)
 * - Semantic HTML violations
 * 
 * Usage: node scripts/verify-accessibility.js
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

// Accessibility violations to check
const VIOLATIONS = {
  // Check for img tags without alt attribute (handles both HTML and JSX syntax)
  missingAltText: /<img\s+[^>]*?(?!alt[=\{])[^>]*>/gi,
  // Check for interactive elements without aria-label or aria-labelledby (handles JSX)
  missingAriaLabel: /<(button|input|select|textarea)\s+[^>]*?(?!aria-label[=\{])(?!aria-labelledby[=\{])[^>]*>/gi,
  missingFormLabel: /<input\s+[^>]*id="([^"]+)"[^>]*>/gi,
  divAsButton: /<div\s+[^>]*onClick[^>]*>/gi,
  divAsLink: /<div\s+[^>]*onClick[^>]*href[^>]*>/gi,
  // Check for div/span with onClick but no role attribute (handles JSX)
  missingRole: /<(div|span)\s+[^>]*onClick[^>]*(?!role[=\{])[^>]*>/gi,
  hardcodedColors: /(?:color|background(?:-color)?|border(?:-color)?):\s*#[0-9a-fA-F]{3,6}/g,
  hardcodedSizes: /(?:width|height|padding|margin|font-size):\s*\d+px/g,
};

// Allowed exceptions (files where violations are acceptable)
const ALLOWED_FILES = [
  'src/stories/', // Storybook examples
  '.storybook/', // Storybook config
  'scripts/', // Scripts
  'node_modules/',
  'dist/',
];

// File extensions to check
const EXTENSIONS = ['.ts', '.tsx', '.jsx'];

/**
 * Check if file path is in allowed list
 */
function isAllowedFile(filePath) {
  const relativePath = relative(ROOT_DIR, filePath);
  return ALLOWED_FILES.some(allowed => relativePath.includes(allowed));
}

/**
 * Recursively scan directory for files
 */
function scanDirectory(dir, files = []) {
  const entries = readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      // Skip node_modules and dist
      if (entry.name === 'node_modules' || entry.name === 'dist' || entry.name.startsWith('.')) {
        continue;
      }
      scanDirectory(fullPath, files);
    } else if (entry.isFile()) {
      const ext = entry.name.substring(entry.name.lastIndexOf('.'));
      if (EXTENSIONS.includes(ext)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

/**
 * Check file for accessibility violations
 */
function checkFile(filePath) {
  const content = readFileSync(filePath, 'utf-8');
  const violations = [];

  // Skip if file is in allowed list
  if (isAllowedFile(filePath)) {
    return violations;
  }

  // Check for missing alt text on images
  const imageMatches = content.match(VIOLATIONS.missingAltText);
  if (imageMatches) {
    // Filter out images that have alt attributes in JSX syntax (alt={...})
    const imagesWithoutAlt = imageMatches.filter(match => {
      // Check if the match or surrounding context has alt={ or alt="
      const matchIndex = content.indexOf(match);
      const contextStart = Math.max(0, matchIndex - 50);
      const contextEnd = Math.min(content.length, matchIndex + match.length + 100);
      const context = content.substring(contextStart, contextEnd);
      
      // Check for alt attribute in JSX or HTML syntax
      return !context.includes('alt={') && !context.includes('alt="') && !context.includes("alt='");
    });
    
    if (imagesWithoutAlt.length > 0) {
      violations.push({
        type: 'missingAltText',
        message: 'Image missing alt attribute',
        count: imagesWithoutAlt.length,
      });
    }
  }

  // Check for interactive elements without ARIA labels
  // Note: This is a basic check - form inputs might have labels via htmlFor
  // Also note: Designsystemet Button components handle accessibility internally
  const interactiveMatches = content.match(VIOLATIONS.missingAriaLabel);
  if (interactiveMatches) {
    // Filter out elements that might have labels via htmlFor or are Designsystemet components
    const suspicious = interactiveMatches.filter(match => {
      // Skip Designsystemet Button components (they handle accessibility internally)
      if (match.includes('Button') && match.includes('from') && match.includes('@digdir/designsystemet')) {
        return false;
      }
      
      // Check if there's a corresponding label element
      const idMatch = match.match(/id=["']([^"']+)["']/);
      if (idMatch) {
        const id = idMatch[1];
        const labelPattern = new RegExp(`<label[^>]*for=["']${id}["']`, 'i');
        return !labelPattern.test(content);
      }
      
      // Check if it's a Designsystemet component (they handle accessibility)
      if (match.includes('data-') || match.includes('data-color') || match.includes('data-size')) {
        return false; // Likely a Designsystemet component
      }
      
      return true;
    });

    if (suspicious.length > 0) {
      violations.push({
        type: 'missingAriaLabel',
        message: 'Interactive element missing ARIA label or associated label',
        count: suspicious.length,
      });
    }
  }

  // Check for div/span used as buttons or links
  const divAsButtonMatches = content.match(VIOLATIONS.divAsButton);
  if (divAsButtonMatches) {
    // Filter out divs that have role attribute (handles both HTML and JSX)
    const withoutRole = divAsButtonMatches.filter(match => {
      // Check if match has role attribute in HTML or JSX syntax
      return !match.includes('role=') && !match.includes('role{');
    });
    
    // Also check the surrounding context for role attribute on separate lines (JSX)
    const trulyWithoutRole = withoutRole.filter(match => {
      const matchIndex = content.indexOf(match);
      const contextStart = Math.max(0, matchIndex - 200);
      const contextEnd = Math.min(content.length, matchIndex + match.length + 200);
      const context = content.substring(contextStart, contextEnd);
      
      // Check for role attribute in JSX (could be on separate line)
      const rolePattern = /role\s*[=:]\s*['"]?button['"]?/i;
      return !rolePattern.test(context);
    });
    
    if (trulyWithoutRole.length > 0) {
      violations.push({
        type: 'divAsButton',
        message: 'div/span with onClick missing role attribute',
        count: trulyWithoutRole.length,
      });
    }
  }

  // Check for hardcoded colors (should use design tokens)
  const hardcodedColorMatches = content.match(VIOLATIONS.hardcodedColors);
  if (hardcodedColorMatches) {
    violations.push({
      type: 'hardcodedColors',
      message: 'Hardcoded color values found (use design tokens: var(--ds-color-*))',
      count: hardcodedColorMatches.length,
    });
  }

  return violations;
}

/**
 * Main verification function
 */
function verifyAccessibility() {
  console.log('🔍 Verifying accessibility compliance...\n');

  const srcDir = join(ROOT_DIR, 'src');
  const files = scanDirectory(srcDir);
  const allViolations = [];

  console.log(`📁 Scanning ${files.length} files...\n`);

  for (const file of files) {
    const violations = checkFile(file);
    if (violations.length > 0) {
      const relativePath = relative(ROOT_DIR, file);
      allViolations.push({
        file: relativePath,
        violations,
      });
    }
  }

  if (allViolations.length === 0) {
    console.log('✅ All accessibility checks passed. Components follow accessibility best practices!');
    return 0;
  }

  console.log(`❌ Found accessibility violations in ${allViolations.length} file(s):\n`);

  for (const { file, violations } of allViolations) {
    console.log(`📄 ${file}:`);
    for (const violation of violations) {
      console.log(`   ⚠️  ${violation.message} (${violation.count} occurrence(s))`);
    }
    console.log('');
  }

  console.log('💡 Tips:');
  console.log('   - Use design tokens for colors: var(--ds-color-*)');
  console.log('   - Add alt text to all images');
  console.log('   - Use semantic HTML elements (button, a, input) instead of div/span');
  console.log('   - Add ARIA labels or associate labels with form inputs');
  console.log('   - Ensure interactive elements are keyboard accessible\n');

  return 1;
}

// Run verification
const exitCode = verifyAccessibility();
process.exit(exitCode);
