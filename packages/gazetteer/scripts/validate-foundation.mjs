#!/usr/bin/env node
/**
 * Validate Foundation
 * 
 * Validates that a scaffolded app follows the exact foundation rules:
 * - Correct style import
 * - Correct provider nesting order
 * - Thin App pattern (only main.tsx in src/)
 * - No raw HTML
 * 
 * Usage: node scripts/validate-foundation.mjs [app-path]
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Foundation rules
const REQUIRED_STYLE_IMPORT = "@xala-technologies/platform-ui/styles";

const AUTH_PROVIDER_ORDER = [
  'React.StrictMode',
  'ErrorBoundary',
  'ThemeProvider',
  'I18nProvider',
  'RuntimeProvider',
  'AuthProvider',
  'GazetteerProvider',
  'BrowserRouter',
];

const PUBLIC_PROVIDER_ORDER = [
  'React.StrictMode',
  'ErrorBoundary',
  'ThemeProvider',
  'I18nProvider',
  'GazetteerProvider',
  'BrowserRouter',
];

// Forbidden raw HTML elements
const FORBIDDEN_RAW_HTML = [
  '<div', '<span', '<button', '<input', '<form', '<table', '<ul', '<ol', '<li',
  '<h1', '<h2', '<h3', '<h4', '<h5', '<h6', '<p>', '<a href',
];

function validateMainTsx(appPath) {
  const mainTsxPath = path.join(appPath, 'src/main.tsx');
  const issues = [];
  
  if (!fs.existsSync(mainTsxPath)) {
    return { valid: false, issues: ['Missing src/main.tsx'] };
  }
  
  const content = fs.readFileSync(mainTsxPath, 'utf-8');
  
  // Check style import
  if (!content.includes(REQUIRED_STYLE_IMPORT)) {
    issues.push(`Missing required style import: ${REQUIRED_STYLE_IMPORT}`);
  }
  
  // Check for forbidden direct imports
  const forbiddenImports = [
    '@digdir/designsystemet-css',
    '@fontsource/inter',
  ];
  
  forbiddenImports.forEach(imp => {
    if (content.includes(imp)) {
      issues.push(`Forbidden direct import: ${imp} (use platform-ui/styles instead)`);
    }
  });
  
  // Check provider order by extracting JSX structure
  const isAuthApp = content.includes('AuthProvider');
  const expectedOrder = isAuthApp ? AUTH_PROVIDER_ORDER : PUBLIC_PROVIDER_ORDER;
  
  // Simple order check - extract opening tags and verify sequence
  const providerPattern = /<(React\.StrictMode|ErrorBoundary|ThemeProvider|I18nProvider|RuntimeProvider|AuthProvider|TenantProvider|GazetteerProvider|BrowserRouter)[>\s]/g;
  const foundProviders = [];
  let match;
  while ((match = providerPattern.exec(content)) !== null) {
    foundProviders.push(match[1]);
  }
  
  // Check order
  let orderValid = true;
  let lastIdx = -1;
  for (const provider of foundProviders) {
    const expectedIdx = expectedOrder.indexOf(provider);
    if (expectedIdx === -1) continue; // Optional provider
    if (expectedIdx < lastIdx) {
      orderValid = false;
      break;
    }
    lastIdx = expectedIdx;
  }
  
  if (!orderValid) {
    issues.push(`Incorrect provider nesting order. Found: ${foundProviders.join(' > ')}`);
    issues.push(`Expected order: ${expectedOrder.join(' > ')}`);
  }
  
  // Check for forbidden raw HTML
  FORBIDDEN_RAW_HTML.forEach(tag => {
    const regex = new RegExp(tag.replace(/[<>]/g, '\\$&'), 'i');
    if (regex.test(content)) {
      issues.push(`Contains raw HTML: ${tag} (use platform-ui components)`);
    }
  });
  
  return { valid: issues.length === 0, issues, isAuthApp };
}

function validateThinApp(appPath) {
  const srcPath = path.join(appPath, 'src');
  const issues = [];
  
  if (!fs.existsSync(srcPath)) {
    return { valid: false, issues: ['Missing src/ directory'] };
  }
  
  const files = fs.readdirSync(srcPath);
  const tsxFiles = files.filter(f => f.endsWith('.tsx'));
  
  if (tsxFiles.length === 0) {
    issues.push('No .tsx files in src/');
  } else if (tsxFiles.length > 1) {
    issues.push(`Thin App violation: Found ${tsxFiles.length} .tsx files in src/ (should only be main.tsx)`);
    issues.push(`Files: ${tsxFiles.join(', ')}`);
  } else if (tsxFiles[0] !== 'main.tsx') {
    issues.push(`Thin App violation: Main file should be main.tsx, found ${tsxFiles[0]}`);
  }
  
  return { valid: issues.length === 0, issues };
}

function validateGazetteerStructure(appPath) {
  const gazetteerPath = path.join(appPath, 'gazetteer');
  const issues = [];
  
  if (!fs.existsSync(gazetteerPath)) {
    issues.push('Missing gazetteer/ directory');
    return { valid: false, issues };
  }
  
  // Check required structure
  const required = [
    'app.spec.json',
    'pages',
    'routes',
    'i18n/nb.json',
  ];
  
  required.forEach(item => {
    const itemPath = path.join(gazetteerPath, item);
    if (!fs.existsSync(itemPath)) {
      issues.push(`Missing gazetteer/${item}`);
    }
  });
  
  return { valid: issues.length === 0, issues };
}

function main() {
  const appPath = process.argv[2];
  
  if (!appPath) {
    console.log('Usage: node validate-foundation.mjs [app-path]');
    console.log('Example: node validate-foundation.mjs apps/my-app');
    process.exit(1);
  }
  
  const fullPath = path.resolve(appPath);
  
  if (!fs.existsSync(fullPath)) {
    console.error(`❌ App path does not exist: ${fullPath}`);
    process.exit(1);
  }
  
  console.log(`🔍 Validating foundation: ${fullPath}\n`);
  
  // Run all validations
  const mainTsxResult = validateMainTsx(fullPath);
  const thinAppResult = validateThinApp(fullPath);
  const gazetteerResult = validateGazetteerStructure(fullPath);
  
  let allValid = true;
  
  // Main.tsx validation
  if (mainTsxResult.valid) {
    console.log(`✅ main.tsx: Valid ${mainTsxResult.isAuthApp ? '(auth app)' : '(public app)'}`);
  } else {
    console.log('❌ main.tsx: INVALID');
    mainTsxResult.issues.forEach(i => console.log(`   - ${i}`));
    allValid = false;
  }
  
  // Thin App validation
  if (thinAppResult.valid) {
    console.log('✅ Thin App pattern: Valid');
  } else {
    console.log('❌ Thin App pattern: INVALID');
    thinAppResult.issues.forEach(i => console.log(`   - ${i}`));
    allValid = false;
  }
  
  // Gazetteer structure
  if (gazetteerResult.valid) {
    console.log('✅ Gazetteer structure: Valid');
  } else {
    console.log('❌ Gazetteer structure: INVALID');
    gazetteerResult.issues.forEach(i => console.log(`   - ${i}`));
    allValid = false;
  }
  
  console.log('\n' + '='.repeat(50));
  
  if (allValid) {
    console.log('✅ FOUNDATION VALID - App follows all foundation rules');
    process.exit(0);
  } else {
    console.log('❌ FOUNDATION INVALID - Fix issues above');
    process.exit(1);
  }
}

main();
