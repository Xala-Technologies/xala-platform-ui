/**
 * Package Boundary Verification
 *
 * Ensures UI package maintains proper boundaries and doesn't import
 * from platform packages or other forbidden dependencies.
 */

import { readFileSync, readdirSync, statSync, existsSync } from 'fs';
import { join, relative } from 'path';

// Component layer hierarchy (lower layers cannot import from higher layers)
const LAYER_HIERARCHY: Record<string, number> = {
  primitives: 0,
  composed: 1,
  blocks: 2,
  patterns: 3,
  shells: 4,
  pages: 5,
};

// Forbidden import patterns
const FORBIDDEN_IMPORTS = [
  {
    pattern: /@xala-technologies\/platform[^-]/,
    message: 'UI package cannot import from platform package. UI must be independent.',
  },
  {
    pattern: /@xala-technologies\/platform-schema/,
    message:
      'UI package cannot import from platform-schema. UI components should not depend on database schemas.',
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

export interface BoundaryViolation {
  file: string;
  type: 'layer-violation' | 'forbidden-import';
  message: string;
  import?: string;
}

interface LayerInfo {
  layer: string;
  level: number;
}

/**
 * Get layer level from file path
 */
function getLayerLevel(filePath: string): LayerInfo | null {
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
function extractImports(content: string): string[] {
  const importRegex = /import\s+(?:{[^}]*}|\*\s+as\s+\w+|\w+)\s+from\s+['"]([^'"]+)['"]/g;
  const imports: string[] = [];
  let match;

  while ((match = importRegex.exec(content)) !== null) {
    imports.push(match[1]);
  }

  return imports;
}

/**
 * Check for layer violations
 */
function checkLayerViolations(
  filePath: string,
  content: string,
  rootDir: string
): BoundaryViolation[] {
  const violations: BoundaryViolation[] = [];
  const currentLayer = getLayerLevel(filePath);

  if (!currentLayer) return violations;

  const imports = extractImports(content);

  for (const importPath of imports) {
    // Check if importing from another UI layer
    for (const [layer, level] of Object.entries(LAYER_HIERARCHY)) {
      if (importPath.includes(`/${layer}/`) && level > currentLayer.level) {
        violations.push({
          file: relative(rootDir, filePath),
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
 * Strip comments from content to avoid false positives
 */
function stripComments(content: string): string {
  // Remove single-line comments
  let result = content.replace(/\/\/.*$/gm, '');
  // Remove multi-line comments (including JSDoc)
  result = result.replace(/\/\*[\s\S]*?\*\//g, '');
  return result;
}

/**
 * Check for forbidden import patterns (only in actual import statements)
 */
function checkForbiddenImports(
  filePath: string,
  content: string,
  rootDir: string
): BoundaryViolation[] {
  const violations: BoundaryViolation[] = [];
  const relativePath = relative(rootDir, filePath);

  // Strip comments first to avoid false positives from example code in JSDoc
  const cleanContent = stripComments(content);

  // Extract actual import statements
  const imports = extractImports(cleanContent);

  for (const importPath of imports) {
    for (const forbidden of FORBIDDEN_IMPORTS) {
      if (forbidden.pattern.test(importPath)) {
        violations.push({
          file: relativePath,
          type: 'forbidden-import',
          message: forbidden.message,
          import: importPath,
        });
      }
    }
  }

  return violations;
}

/**
 * Recursively scan directory
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
      if (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx')) {
        files.push(fullPath);
      }
    }
  }

  return files;
}

export interface VerifyBoundariesOptions {
  srcDir: string;
  rootDir?: string;
  silent?: boolean;
}

export interface VerifyBoundariesResult {
  violations: BoundaryViolation[];
  filesScanned: number;
  passed: boolean;
}

/**
 * Verify package boundaries and layer separation
 */
export function verifyBoundaries(options: VerifyBoundariesOptions): VerifyBoundariesResult {
  const { srcDir, rootDir = srcDir, silent = false } = options;

  if (!silent) {
    console.log('🔍 Verifying package boundaries and layer separation...\n');
  }

  const files = scanDirectory(srcDir);

  if (!silent) {
    console.log(`📁 Scanning ${files.length} files...\n`);
  }

  let allViolations: BoundaryViolation[] = [];

  for (const file of files) {
    const content = readFileSync(file, 'utf-8');

    const layerViolations = checkLayerViolations(file, content, rootDir);
    const importViolations = checkForbiddenImports(file, content, rootDir);

    allViolations = allViolations.concat(layerViolations, importViolations);
  }

  if (!silent) {
    if (allViolations.length === 0) {
      console.log('✅ All boundary checks passed. Architecture is sound!\n');
    } else {
      console.log(`❌ Found ${allViolations.length} boundary violations:\n`);

      // Group by type
      const byType: Record<string, BoundaryViolation[]> = {};
      allViolations.forEach((v) => {
        if (!byType[v.type]) byType[v.type] = [];
        byType[v.type].push(v);
      });

      Object.entries(byType).forEach(([type, violations]) => {
        console.log(`\n📋 ${type.toUpperCase().replace('-', ' ')} (${violations.length}):`);
        violations.forEach((v) => {
          console.log(`   ${v.file}`);
          console.log(`   → ${v.message}`);
          if (v.import) console.log(`   → Import: ${v.import}`);
          console.log('');
        });
      });

      console.log('💡 Fix these violations to maintain clean architecture.\n');
    }
  }

  return {
    violations: allViolations,
    filesScanned: files.length,
    passed: allViolations.length === 0,
  };
}
