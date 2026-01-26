#!/usr/bin/env node

/**
 * Design Token Verification Script
 * 
 * Ensures UI components use Designsystemet design tokens only.
 * Detects raw HTML elements, inline styles, and custom CSS.
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

// Raw HTML elements that should use Designsystemet components instead
const RAW_HTML_ELEMENTS = [
  'div', 'span', 'p', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
  'section', 'article', 'header', 'footer', 'nav', 'aside', 'main',
  'button', 'a', 'input', 'select', 'textarea', 'label',
  'ul', 'ol', 'li', 'table', 'tr', 'td', 'th'
];

// Allowed exceptions (files where raw HTML is acceptable)
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
  return ALLOWED_FILES.some(allowed => relativePath.includes(allowed));
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
      if (EXTENSIONS.some(ext => fullPath.endsWith(ext))) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

/**
 * Check for raw HTML elements
 */
function checkRawHTML(filePath, content) {
  if (isAllowedFile(filePath)) {
    return [];
  }
  
  const violations = [];
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    // Skip comments
    if (line.trim().startsWith('//') || line.trim().startsWith('/*')) {
      return;
    }
    
    RAW_HTML_ELEMENTS.forEach(element => {
      // Match JSX opening tags: <div>, <div className="...">, etc.
      const regex = new RegExp(`<${element}[\\s>]`, 'gi');
      if (regex.test(line)) {
        // Allow hidden file inputs (common pattern for file uploads)
        let shouldSkip = false;
        if (element === 'input') {
          // Check if this is a hidden file input by looking ahead up to 10 lines
          const contextStart = index;
          const contextEnd = Math.min(index + 10, lines.length);
          const contextLines = lines.slice(contextStart, contextEnd).join('\n');
          // Check for file input with display: none pattern (common file upload pattern)
          // Match: type="file" or type='file' AND (display: 'none' or display: "none" or display: none)
          const hasFileType = /type\s*=\s*["']file["']/.test(contextLines);
          const hasDisplayNone = /display\s*:\s*["']?none["']?/.test(contextLines) || 
                                 contextLines.includes("'none'") || 
                                 contextLines.includes('"none"');
          if (hasFileType && hasDisplayNone) {
            shouldSkip = true; // Skip this violation - it's a hidden file input (acceptable pattern)
          }
        }
        
        // Only add violation if we didn't skip it
        if (!shouldSkip) {
          violations.push({
            file: relative(ROOT_DIR, filePath),
            line: index + 1,
            type: 'raw-html',
            element,
            content: line.trim(),
          });
        }
      }
    });
  });
  
  return violations;
}

/**
 * Check for inline styles
 */
function checkInlineStyles(filePath, content) {
  if (isAllowedFile(filePath)) {
    return [];
  }
  
  const violations = [];
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    // Match style={{ ... }} or style="..."
    if (/style\s*=\s*{/.test(line) || /style\s*=\s*"/.test(line)) {
      // Allow if using design token variables
      if (/var\(--ds-/.test(line)) {
        return; // This is allowed
      }
      
      violations.push({
        file: relative(ROOT_DIR, filePath),
        line: index + 1,
        type: 'inline-style',
        content: line.trim(),
      });
    }
  });
  
  return violations;
}

/**
 * Check for custom CSS classes
 */
function checkCustomClasses(filePath, content) {
  if (isAllowedFile(filePath)) {
    return [];
  }
  
  const violations = [];
  const lines = content.split('\n');
  
  lines.forEach((line, index) => {
    // Match className="..." or className={...}
    const classNameMatch = line.match(/className\s*=\s*["'{]([^"'}]+)["'}]/);
    if (classNameMatch) {
      const className = classNameMatch[1];
      // Warn if not using ds- prefix
      if (!className.includes('ds-') && !className.includes('{')) {
        violations.push({
          file: relative(ROOT_DIR, filePath),
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
    
    const htmlViolations = checkRawHTML(file, content);
    const styleViolations = checkInlineStyles(file, content);
    const classViolations = checkCustomClasses(file, content);
    
    allViolations = allViolations.concat(htmlViolations, styleViolations, classViolations);
  }
  
  if (allViolations.length === 0) {
    console.log('✅ All design token checks passed. Components follow Designsystemet standards!\n');
    process.exit(0);
  }
  
  console.log(`❌ Found ${allViolations.length} design token violations:\n`);
  
  // Group by type
  const byType = {};
  allViolations.forEach(v => {
    if (!byType[v.type]) byType[v.type] = [];
    byType[v.type].push(v);
  });
  
  // Report raw HTML violations
  if (byType['raw-html']) {
    console.log(`\n📋 RAW HTML ELEMENTS (${byType['raw-html'].length}):`);
    console.log('   Use Designsystemet components instead of raw HTML\n');
    byType['raw-html'].forEach(v => {
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
    byType['inline-style'].forEach(v => {
      console.log(`   ${v.file}:${v.line}`);
      console.log(`   → ${v.content.substring(0, 100)}${v.content.length > 100 ? '...' : ''}`);
      console.log('');
    });
  }
  
  // Report custom class violations
  if (byType['custom-class']) {
    console.log(`\n⚠️  CUSTOM CSS CLASSES (${byType['custom-class'].length}):`);
    console.log('   Prefer data attributes over custom classes\n');
    byType['custom-class'].forEach(v => {
      console.log(`   ${v.file}:${v.line}`);
      console.log(`   → className="${v.className}"`);
      console.log(`   → Use: data-size, data-color, data-spacing`);
      console.log('');
    });
  }
  
  console.log('💡 See docs/guides/DESIGN_TOKENS.md for proper usage.\n');
  
  process.exit(1);
}

main();
