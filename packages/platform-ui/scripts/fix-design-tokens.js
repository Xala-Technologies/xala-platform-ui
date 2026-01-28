#!/usr/bin/env node

/**
 * Smart Design Token Fixer
 *
 * Automatically fixes common design token violations using regex patterns.
 * More sophisticated than shell script, handles multi-line patterns.
 *
 * Usage: node scripts/fix-design-tokens.js [--dry-run]
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');
const SRC_DIR = join(ROOT_DIR, 'src');

const DRY_RUN = process.argv.includes('--dry-run');
const VERBOSE = process.argv.includes('--verbose');

// Track stats
const stats = {
  filesScanned: 0,
  filesModified: 0,
  buttonsFixed: 0,
  inputsFixed: 0,
  selectsFixed: 0,
  tablesFixed: 0,
  importsAdded: 0,
  errors: [],
};

// Files to skip
const SKIP_PATTERNS = [
  /\.stories\.tsx$/,
  /\.test\.tsx$/,
  /\.spec\.tsx$/,
  /\/stories\//,
  /__tests__/,
  /node_modules/,
  /dist/,
  // Primitives that intentionally wrap raw elements
  /\/primitives\/NativeSelect\.tsx$/,
  /\/primitives\/SelectOption\.tsx$/,
  /\/primitives\/DirectionalIcon\.tsx$/, // Uses button for icon wrapper, intentional
];

/**
 * Check if file should be skipped
 */
function shouldSkip(filePath) {
  return SKIP_PATTERNS.some((pattern) => pattern.test(filePath));
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
      if (!['node_modules', 'dist', '.git'].includes(entry)) {
        scanDirectory(fullPath, files);
      }
    } else if (stat.isFile() && fullPath.endsWith('.tsx')) {
      if (!shouldSkip(fullPath)) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

/**
 * Check if import exists in file content
 */
function hasImport(content, component, source) {
  // Check named import: import { Component } from 'source'
  const namedPattern = new RegExp(
    `import\\s*\\{[^}]*\\b${component}\\b[^}]*\\}\\s*from\\s*['"]${escapeRegex(source)}['"]`,
    'i'
  );
  // Check default import: import Component from 'source'
  const defaultPattern = new RegExp(`import\\s+${component}\\s+from\\s*['"]${escapeRegex(source)}['"]`, 'i');

  return namedPattern.test(content) || defaultPattern.test(content);
}

/**
 * Add named import to file content
 */
function addImport(content, component, source) {
  // Check if already imported
  if (hasImport(content, component, source)) {
    return content;
  }

  // Check if there's already an import from this source - add to it
  const existingImportRegex = new RegExp(
    `(import\\s*\\{)([^}]*)(\\}\\s*from\\s*['"]${escapeRegex(source)}['"])`,
    'i'
  );
  const match = content.match(existingImportRegex);

  if (match) {
    // Add to existing import
    const newImport = match[1] + match[2].trimEnd() + `, ${component} ` + match[3];
    stats.importsAdded++;
    return content.replace(existingImportRegex, newImport);
  }

  // Add new import after the first import
  const firstImportIndex = content.indexOf('import ');
  if (firstImportIndex !== -1) {
    const insertPos = content.indexOf('\n', firstImportIndex) + 1;
    const newImportLine = `import { ${component} } from '${source}';\n`;
    stats.importsAdded++;
    return content.slice(0, insertPos) + newImportLine + content.slice(insertPos);
  }

  // No imports found, add at the beginning (after 'use client' if present)
  const useClientMatch = content.match(/^['"]use client['"]\s*;?\s*\n/);
  if (useClientMatch) {
    const insertPos = useClientMatch[0].length;
    stats.importsAdded++;
    return content.slice(0, insertPos) + `import { ${component} } from '${source}';\n` + content.slice(insertPos);
  }

  stats.importsAdded++;
  return `import { ${component} } from '${source}';\n` + content;
}

/**
 * Escape special regex characters
 */
function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

/**
 * Fix raw <button> elements
 */
function fixButtons(content, filePath) {
  // Match <button with various attributes (not <Button or other capitalized)
  const buttonPattern = /<button(\s[^>]*)?>/gi;
  const closingPattern = /<\/button>/gi;

  const buttonMatches = content.match(buttonPattern);
  if (!buttonMatches) return content;

  // Check if it's actually lowercase button (not Button component)
  const lowercaseMatches = buttonMatches.filter((m) => m.startsWith('<button'));
  if (lowercaseMatches.length === 0) return content;

  console.log(`  📝 Fixing ${lowercaseMatches.length} <button> element(s)`);

  // Add import
  content = addImport(content, 'Button', '@digdir/designsystemet-react');

  // Replace lowercase <button with <Button
  content = content.replace(/<button(\s)/gi, '<Button$1');
  content = content.replace(/<button>/gi, '<Button>');
  content = content.replace(/<\/button>/gi, '</Button>');

  stats.buttonsFixed += lowercaseMatches.length;
  return content;
}

/**
 * Fix raw <select> elements
 */
function fixSelects(content, filePath) {
  const selectPattern = /<select(\s[^>]*)?>/gi;
  const closingPattern = /<\/select>/gi;

  const selectMatches = content.match(selectPattern);
  if (!selectMatches) return content;

  // Check if it's actually lowercase select
  const lowercaseMatches = selectMatches.filter((m) => m.startsWith('<select'));
  if (lowercaseMatches.length === 0) return content;

  console.log(`  📝 Fixing ${lowercaseMatches.length} <select> element(s)`);

  // Determine relative path to primitives
  const relativePath = relative(dirname(filePath), join(SRC_DIR, 'primitives'));
  const importPath = relativePath.startsWith('.') ? relativePath + '/NativeSelect' : './' + relativePath + '/NativeSelect';

  // Add import
  content = addImport(content, 'NativeSelect', importPath);

  // Replace lowercase <select with <NativeSelect
  content = content.replace(/<select(\s)/gi, '<NativeSelect$1');
  content = content.replace(/<select>/gi, '<NativeSelect>');
  content = content.replace(/<\/select>/gi, '</NativeSelect>');

  stats.selectsFixed += lowercaseMatches.length;
  return content;
}

/**
 * Fix raw <table> elements and related
 */
function fixTables(content, filePath) {
  const tablePattern = /<table(\s[^>]*)?>/gi;
  const tableMatches = content.match(tablePattern);

  if (!tableMatches) return content;

  // Check if it's actually lowercase table
  const lowercaseMatches = tableMatches.filter((m) => m.startsWith('<table'));
  if (lowercaseMatches.length === 0) return content;

  console.log(`  📝 Fixing table elements`);

  // Add import
  content = addImport(content, 'Table', '@digdir/designsystemet-react');

  // Replace table elements
  content = content.replace(/<table(\s)/gi, '<Table$1');
  content = content.replace(/<table>/gi, '<Table>');
  content = content.replace(/<\/table>/gi, '</Table>');

  content = content.replace(/<thead(\s)/gi, '<Table.Head$1');
  content = content.replace(/<thead>/gi, '<Table.Head>');
  content = content.replace(/<\/thead>/gi, '</Table.Head>');

  content = content.replace(/<tbody(\s)/gi, '<Table.Body$1');
  content = content.replace(/<tbody>/gi, '<Table.Body>');
  content = content.replace(/<\/tbody>/gi, '</Table.Body>');

  content = content.replace(/<tr(\s)/gi, '<Table.Row$1');
  content = content.replace(/<tr>/gi, '<Table.Row>');
  content = content.replace(/<\/tr>/gi, '</Table.Row>');

  content = content.replace(/<th(\s)/gi, '<Table.HeaderCell$1');
  content = content.replace(/<th>/gi, '<Table.HeaderCell>');
  content = content.replace(/<\/th>/gi, '</Table.HeaderCell>');

  content = content.replace(/<td(\s)/gi, '<Table.Cell$1');
  content = content.replace(/<td>/gi, '<Table.Cell>');
  content = content.replace(/<\/td>/gi, '</Table.Cell>');

  stats.tablesFixed++;
  return content;
}

/**
 * Process a single file
 */
function processFile(filePath) {
  stats.filesScanned++;

  let content;
  try {
    content = readFileSync(filePath, 'utf-8');
  } catch (err) {
    stats.errors.push(`Failed to read ${filePath}: ${err.message}`);
    return;
  }

  const originalContent = content;
  const relativePath = relative(ROOT_DIR, filePath);

  // Check for raw elements
  const hasRawButton = /<button[>\s]/i.test(content) && !/^import.*Button.*from/m.test(content);
  const hasRawSelect = /<select[>\s]/i.test(content);
  const hasRawTable = /<table[>\s]/i.test(content);

  if (!hasRawButton && !hasRawSelect && !hasRawTable) {
    return; // Nothing to fix
  }

  console.log(`\n🔧 Processing: ${relativePath}`);

  // Apply fixes
  if (hasRawButton) {
    content = fixButtons(content, filePath);
  }
  if (hasRawSelect) {
    content = fixSelects(content, filePath);
  }
  if (hasRawTable) {
    content = fixTables(content, filePath);
  }

  // Check if content changed
  if (content !== originalContent) {
    stats.filesModified++;

    if (!DRY_RUN) {
      try {
        writeFileSync(filePath, content, 'utf-8');
        console.log(`  ✅ Saved changes`);
      } catch (err) {
        stats.errors.push(`Failed to write ${filePath}: ${err.message}`);
      }
    } else {
      console.log(`  🔍 Would save changes (dry-run)`);
    }
  }
}

/**
 * Main execution
 */
function main() {
  console.log('🔧 Smart Design Token Fixer');
  console.log('===========================');
  console.log('');

  if (DRY_RUN) {
    console.log('🔍 DRY RUN MODE - No files will be modified\n');
  }

  console.log('🔍 Scanning source files...');
  const files = scanDirectory(SRC_DIR);
  console.log(`📁 Found ${files.length} .tsx files\n`);

  for (const file of files) {
    processFile(file);
  }

  console.log('\n===========================');
  console.log('✅ Design Token Fix Complete\n');
  console.log('Summary:');
  console.log(`  - Files scanned: ${stats.filesScanned}`);
  console.log(`  - Files modified: ${stats.filesModified}`);
  console.log(`  - Buttons fixed: ${stats.buttonsFixed}`);
  console.log(`  - Selects fixed: ${stats.selectsFixed}`);
  console.log(`  - Tables fixed: ${stats.tablesFixed}`);
  console.log(`  - Imports added: ${stats.importsAdded}`);

  if (stats.errors.length > 0) {
    console.log(`\n❌ Errors (${stats.errors.length}):`);
    stats.errors.forEach((err) => console.log(`  - ${err}`));
  }

  if (DRY_RUN) {
    console.log('\nℹ️  This was a dry run. Run without --dry-run to apply changes.');
  } else {
    console.log('\n💡 Run "pnpm typecheck" to verify changes compile correctly.');
  }
}

main();
