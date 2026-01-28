#!/usr/bin/env node

/**
 * List ALL design token violations (not truncated)
 */

import { readFileSync, readdirSync, statSync, writeFileSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');
const EXTENSIONS = ['.ts', '.tsx', '.jsx'];

const ALLOWED_FILES = [
  '.storybook/',
  'scripts/',
  'src/blocks/XTerminal.tsx',
  'src/stories/',
];

const EXCLUDED_PATTERNS = [
  /Connected\.tsx$/,
  /\/features\/booking\/engine\//,
  /\/features\/booking\/components\/sidebar\//,
  /\/features\/calendar\/components\//,
  // Primitive wrapper components that intentionally wrap raw elements
  /\/primitives\/NativeSelect\.tsx$/,
  /\/primitives\/DirectionalIcon\.tsx$/,
  /\/composed\/NumberInput\.tsx$/,
  /\/composed\/SearchableSelect\.tsx$/,
  /\/composed\/header-parts\.tsx$/,
  /\/composed\/FileUploader\.tsx$/,
  /\/composed\/TableConditionsFilter\.tsx$/,
  /\/composed\/TableFilter\.tsx$/,
  // Files with legitimate raw inputs (file uploads, color pickers)
  /\/blocks\/settings\/ProfileTab\.tsx$/,
  /\/features\/organizations\/components\/BrandingStep\.tsx$/,
];

function isAllowedFile(filePath) {
  const relativePath = relative(ROOT_DIR, filePath);
  return ALLOWED_FILES.some((allowed) => relativePath.includes(allowed));
}

function shouldExclude(filePath) {
  return EXCLUDED_PATTERNS.some(pattern => pattern.test(filePath));
}

function scanDirectory(dir, files = []) {
  const entries = readdirSync(dir);
  for (const entry of entries) {
    const fullPath = join(dir, entry);
    const stat = statSync(fullPath);
    if (stat.isDirectory()) {
      if (!['node_modules', 'dist', '.git', '.storybook'].includes(entry)) {
        scanDirectory(fullPath, files);
      }
    } else if (stat.isFile()) {
      if (EXTENSIONS.some((ext) => fullPath.endsWith(ext)) && !shouldExclude(fullPath)) {
        files.push(fullPath);
      }
    }
  }
  return files;
}

// Critical elements that should ALWAYS be replaced
const alwaysReplace = [
  { tag: 'button', replacement: 'Button' },
  { tag: 'input', replacement: 'Textfield' },
  { tag: 'select', replacement: 'NativeSelect' },
  { tag: 'table', replacement: 'Table' },
  { tag: 'thead', replacement: 'Table.Head' },
  { tag: 'tbody', replacement: 'Table.Body' },
  { tag: 'tr', replacement: 'Table.Row' },
  { tag: 'td', replacement: 'Table.Cell' },
  { tag: 'th', replacement: 'Table.HeaderCell' },
];

const files = scanDirectory(join(ROOT_DIR, 'src'));
const violations = { button: [], input: [], select: [], table: [] };

for (const file of files) {
  if (isAllowedFile(file)) continue;
  const content = readFileSync(file, 'utf-8');
  const lines = content.split('\n');
  const relativePath = relative(ROOT_DIR, file);

  lines.forEach((line, index) => {
    // Skip comments and JSDoc examples
    if (line.trim().startsWith('//') || line.trim().startsWith('/*') || line.trim().startsWith('*')) return;
    if (line.trim().startsWith('</')) return;

    for (const { tag, replacement } of alwaysReplace) {
      // Match lowercase tag only (not React components which are capitalized)
      const tagRegex = new RegExp(`<${tag}(?:\\s|>|/|$)`, 'i');

      if (tagRegex.test(line)) {
        // Skip string literals
        if (line.includes(`'<${tag}`) || line.includes(`"<${tag}`)) continue;

        // Check if it's actually lowercase (HTML) not uppercase (React component)
        const match = line.match(new RegExp(`<(${tag})`, 'i'));
        if (match && match[1] !== tag) continue; // It's capitalized, skip

        // Skip if already uses Button/Textfield/etc
        if (tag === 'button' && line.includes('<Button')) continue;
        // Skip file inputs, hidden inputs, and color pickers - these are special browser inputs
        if (tag === 'input' && (
          line.includes('<Textfield') ||
          line.includes('type="file"') ||
          line.includes('type="hidden"') ||
          line.includes('type="color"')
        )) continue;
        if (tag === 'select' && line.includes('<NativeSelect')) continue;
        if (tag === 'table' && line.includes('<Table')) continue;

        const category = ['thead', 'tbody', 'tr', 'td', 'th'].includes(tag) ? 'table' : tag;

        violations[category].push({
          file: relativePath,
          line: index + 1,
          tag,
          replacement,
          content: line.trim().substring(0, 120)
        });
      }
    }
  });
}

console.log('=== CRITICAL VIOLATIONS (must be fixed) ===\n');

for (const [category, items] of Object.entries(violations)) {
  if (items.length > 0) {
    console.log(`\n${category.toUpperCase()} violations (${items.length}):`);
    console.log('─'.repeat(60));
    items.forEach(v => {
      console.log(`  ${v.file}:${v.line}`);
      console.log(`    <${v.tag}> → <${v.replacement}>`);
    });
  }
}

const total = Object.values(violations).reduce((sum, arr) => sum + arr.length, 0);
console.log(`\n\nTOTAL CRITICAL VIOLATIONS: ${total}`);
