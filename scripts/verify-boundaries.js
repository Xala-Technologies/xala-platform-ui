#!/usr/bin/env node

/**
 * Package Boundary Verification Script
 * 
 * Ensures UI package maintains proper boundaries and doesn't import
 * from platform packages or other forbidden dependencies.
 * 
 * Usage: node scripts/verify-boundaries.js
 */

import { readFileSync, readdirSync, statSync } from 'fs';
import { join, relative } from 'path';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
const ROOT_DIR = join(__dirname, '..');

// Component layer hierarchy (lower layers cannot import from higher layers)
const LAYER_HIERARCHY = {
  'primitives': 0,
  'composed': 1,
  'blocks': 2,
  'patterns': 3,
  'shells': 4,
  'pages': 5,
};

// Forbidden import patterns
const FORBIDDEN_IMPORTS = [
  {
    pattern: /@xala-technologies\/platform[^-]/,
    message: 'UI package cannot import from platform package. UI must be independent.',
  },
  {
    pattern: /@xala-technologies\/platform-schema/,
    message: 'UI package cannot import from platform-schema. UI components should not depend on database schemas.',
  },
  {
    pattern: /@xala-technologies\/governance/,
    message: 'UI package cannot import from governance package. Keep UI dependencies minimal.',
  },
  {
    pattern: /from ['"].*\/src\//,
    message: 'Cannot import from src/ directly. Use package exports.',
  },
];

/**
 * Get layer level from file path
 */
function getLayerLevel(filePath) {
  for (const [layer, level] of Object.entries(LAYER_HIERARCHY)) {
    if (filePath.includes(`/${layer}/`)) {
      return { layer, level };
    }
  }
  return null;
}

/**
 * Extract imports from file content
 */
function extractImports(content) {
  const importRegex = /import\s+(?:{[^}]*}|\*\s+as\s+\w+|\w+)\s+from\s+['"]([^'"]+)['"]/g;
  const imports = [];
  let match;
  
  while ((match = importRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }
  
  return imports;
}

/**
 * Check for layer violations
 */
function checkLayerViolations(filePath, content) {
  const violations = [];
  const currentLayer = getLayerLevel(filePath);
  
  if (!currentLayer) return violations;
  
  const imports = extractImports(content);
  
  for (const importPath of imports) {
    // Check if importing from another UI layer
    for (const [layer, level] of Object.entries(LAYER_HIERARCHY)) {
      if (importPath.includes(`/${layer}/`) && level > currentLayer.level) {
        violations.push({
          file: relative(ROOT_DIR, filePath),
          type: 'layer-violation',
          message: `Layer "${currentLayer.layer}" (level ${currentLayer.level}) cannot import from higher layer "${layer}" (level ${level})`,
          import: importPath,
        });
      }
    }
  }
  
  return violations;
}

/**
 * Check for forbidden import patterns
 */
function checkForbiddenImports(filePath, content) {
  const violations = [];
  const relativePath = relative(ROOT_DIR, filePath);
  
  for (const forbidden of FORBIDDEN_IMPORTS) {
    if (forbidden.pattern.test(content)) {
      violations.push({
        file: relativePath,
        type: 'forbidden-import',
        message: forbidden.message,
      });
    }
  }
  
  return violations;
}

/**
 * Recursively scan directory
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
      if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
  }
  
  return files;
}

/**
 * Main execution
 */
function main() {
  console.log('🔍 Verifying package boundaries and layer separation...\n');
  
  const srcDir = join(ROOT_DIR, 'src');
  const files = scanDirectory(srcDir);
  
  console.log(`📁 Scanning ${files.length} files...\n`);
  
  let allViolations = [];
  
  for (const file of files) {
    const content = readFileSync(file, 'utf-8');
    
    const layerViolations = checkLayerViolations(file, content);
    const importViolations = checkForbiddenImports(file, content);
    
    allViolations = allViolations.concat(layerViolations, importViolations);
  }
  
  if (allViolations.length === 0) {
    console.log('✅ All boundary checks passed. Architecture is sound!\n');
    process.exit(0);
  }
  
  console.log(`❌ Found ${allViolations.length} boundary violations:\n`);
  
  // Group by type
  const byType = {};
  allViolations.forEach(v => {
    if (!byType[v.type]) byType[v.type] = [];
    byType[v.type].push(v);
  });
  
  Object.entries(byType).forEach(([type, violations]) => {
    console.log(`\n📋 ${type.toUpperCase().replace('-', ' ')} (${violations.length}):`);
    violations.forEach(v => {
      console.log(`   ${v.file}`);
      console.log(`   → ${v.message}`);
      if (v.import) console.log(`   → Import: ${v.import}`);
      console.log('');
    });
  });
  
  console.log('💡 Fix these violations to maintain clean architecture.\n');
  
  process.exit(1);
}

main();
