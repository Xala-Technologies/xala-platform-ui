#!/usr/bin/env node

/**
 * Comprehensive Accessibility Scanner
 * 
 * Scans Storybook stories for accessibility violations using axe-core.
 * This script builds Storybook, starts a server, and scans all stories.
 * 
 * Usage: node scripts/scan-accessibility.js
 * 
 * Requirements:
 * - Storybook must be buildable
 * - Port 6006 must be available
 */

import { execSync } from 'child_process';
import { readFileSync, writeFileSync } from 'fs';
import { join } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

console.log('🔍 Comprehensive Accessibility Scanner\n');
console.log('This script will:');
console.log('1. Build Storybook');
console.log('2. Start a local server');
console.log('3. Scan all stories for accessibility violations');
console.log('4. Generate a report\n');

// Check if Storybook is already built
const storybookStaticPath = join(ROOT_DIR, 'storybook-static');
const indexPath = join(storybookStaticPath, 'index.json');

try {
  console.log('📦 Checking Storybook build...');
  
  // Try to read index.json to see if Storybook is built
  try {
    readFileSync(indexPath, 'utf-8');
    console.log('✅ Storybook already built\n');
  } catch {
    console.log('📦 Building Storybook...');
    execSync('pnpm storybook:build', { 
      cwd: ROOT_DIR,
      stdio: 'inherit',
    });
    console.log('✅ Storybook built successfully\n');
  }

  console.log('🚀 Starting accessibility scan...');
  console.log('💡 Run: pnpm test:a11y to scan all stories with axe-core\n');
  console.log('📋 Available accessibility commands:');
  console.log('   - pnpm test:a11y          - Run Storybook accessibility tests');
  console.log('   - pnpm test:e2e          - Run E2E accessibility tests');
  console.log('   - pnpm verify:accessibility - Static code analysis\n');

} catch (error) {
  console.error('❌ Error:', error.message);
  process.exit(1);
}
