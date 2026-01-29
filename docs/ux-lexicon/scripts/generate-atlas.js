#!/usr/bin/env node

/**
 * Component Atlas Generator
 *
 * Scans the codebase and generates a complete inventory of all components,
 * their layer, lexicon status, and relationships.
 */

import { readFileSync, writeFileSync, existsSync, readdirSync, statSync } from 'fs';
import { join, dirname, basename, extname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LEXICON_ROOT = join(__dirname, '..');
const PROJECT_ROOT = join(LEXICON_ROOT, '..', '..');
const SRC_ROOT = join(PROJECT_ROOT, 'src');
const REGISTRY_ROOT = join(LEXICON_ROOT, 'registry');

const LAYERS = {
  '@digdir': {
    description: 'Designsystemet components',
    level: 0,
    canImportFrom: ['external'],
  },
  primitives: {
    description: 'Thin Designsystemet wrappers',
    level: 0,
    canImportFrom: ['@digdir', 'external'],
  },
  composed: {
    description: 'Multi-component compositions',
    level: 1,
    canImportFrom: ['primitives', '@digdir', 'external'],
  },
  blocks: {
    description: 'Feature-specific UI blocks',
    level: 2,
    canImportFrom: ['primitives', 'composed', '@digdir', 'external'],
  },
  patterns: {
    description: 'Reusable UI patterns',
    level: 3,
    canImportFrom: ['primitives', 'composed', 'blocks', '@digdir', 'external'],
  },
  shells: {
    description: 'Layout components',
    level: 4,
    canImportFrom: ['primitives', 'composed', 'blocks', 'patterns', '@digdir', 'external'],
  },
  pages: {
    description: 'Page-level components',
    level: 5,
    canImportFrom: ['all'],
  },
};

/**
 * Load all dictionary entries to check lexicon status
 */
function loadDictionaryEntries() {
  const entries = new Map();
  const dictionaryPath = join(REGISTRY_ROOT, 'dictionary');

  if (existsSync(dictionaryPath)) {
    readdirSync(dictionaryPath)
      .filter((f) => f.endsWith('.json'))
      .forEach((file) => {
        try {
          const data = JSON.parse(readFileSync(join(dictionaryPath, file), 'utf8'));
          data.entries?.forEach((entry) => {
            if (entry.platformConstruct?.component) {
              entries.set(entry.platformConstruct.component, entry);
            }
          });
        } catch (e) {
          console.warn(`Warning: Could not parse ${file}`);
        }
      });
  }

  return entries;
}

/**
 * Find all component files in a directory
 */
function findComponents(dir, layer) {
  const components = [];

  if (!existsSync(dir)) {
    return components;
  }

  const items = readdirSync(dir);

  for (const item of items) {
    const fullPath = join(dir, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      // Check for index.tsx in subdirectory (component folder pattern)
      const indexPath = join(fullPath, 'index.tsx');
      if (existsSync(indexPath)) {
        components.push({
          name: item,
          path: `${layer}/${item}/index.tsx`,
          layer,
        });
      }
      // Also recurse into subdirectory
      components.push(...findComponents(fullPath, layer));
    } else if (item.endsWith('.tsx') && !item.startsWith('index') && !item.endsWith('.stories.tsx')) {
      // Direct component file
      const name = basename(item, '.tsx');
      if (name[0] === name[0].toUpperCase()) {
        // Likely a component (PascalCase)
        components.push({
          name,
          path: `${layer}/${item}`,
          layer,
        });
      }
    }
  }

  return components;
}

/**
 * Determine lexicon status for a component
 */
function getLexiconStatus(componentName, dictionaryEntries) {
  const entry = dictionaryEntries.get(componentName);

  if (!entry) {
    return 'missing';
  }

  // Check if entry has all required fields
  const hasStates = entry.states && entry.states.idle;
  const hasExample = entry.example && entry.example.jsx;
  const hasAccessibility = entry.accessibility;

  if (hasStates && hasExample && hasAccessibility) {
    return 'complete';
  }

  return 'partial';
}

/**
 * Generate the component atlas
 */
function generateAtlas() {
  console.log('🗺️  Generating Component Atlas...\n');

  const dictionaryEntries = loadDictionaryEntries();
  const components = [];
  const statistics = {
    totalComponents: 0,
    byLayer: {},
    lexiconCoverage: {
      complete: 0,
      partial: 0,
      missing: 0,
    },
  };

  // Scan each layer directory
  for (const layer of Object.keys(LAYERS)) {
    if (layer === '@digdir') continue; // Skip external

    const layerPath = join(SRC_ROOT, layer);
    const layerComponents = findComponents(layerPath, layer);

    statistics.byLayer[layer] = layerComponents.length;

    for (const comp of layerComponents) {
      const lexiconStatus = getLexiconStatus(comp.name, dictionaryEntries);
      const entry = dictionaryEntries.get(comp.name);

      components.push({
        name: comp.name,
        layer: comp.layer,
        path: comp.path,
        exportPath: `@xala-technologies/platform-ui/${comp.layer}`,
        lexiconStatus,
        dictionaryEntryId: entry?.id || null,
        storybook: {
          path: `?path=/story/${comp.layer}-${comp.name.toLowerCase()}`,
          stories: [], // Would need to scan stories to populate
        },
        stateSupport: entry?.states
          ? {
              idle: !!entry.states.idle,
              loading: !!entry.states.loading,
              empty: !!entry.states.empty,
              error: !!entry.states.error,
              success: !!entry.states.success,
              permissionDenied: !!entry.states.permissionDenied,
            }
          : null,
        accessibility: {
          wcagCompliant: !!entry?.accessibility,
          testedWith: [],
        },
        dependencies: [], // Would need to parse imports
        usedBy: [], // Would need reverse dependency analysis
      });

      statistics.totalComponents++;
      statistics.lexiconCoverage[lexiconStatus]++;
    }
  }

  const atlas = {
    version: '1.0.0',
    generated: new Date().toISOString(),
    layers: LAYERS,
    components,
    statistics,
  };

  // Write atlas
  const atlasPath = join(REGISTRY_ROOT, 'component-atlas.json');
  writeFileSync(atlasPath, JSON.stringify(atlas, null, 2));

  // Print summary
  console.log('📊 Atlas Summary:');
  console.log(`   Total components: ${statistics.totalComponents}`);
  console.log('\n   By layer:');
  for (const [layer, count] of Object.entries(statistics.byLayer)) {
    console.log(`   - ${layer}: ${count}`);
  }
  console.log('\n   Lexicon coverage:');
  console.log(`   - Complete: ${statistics.lexiconCoverage.complete}`);
  console.log(`   - Partial: ${statistics.lexiconCoverage.partial}`);
  console.log(`   - Missing: ${statistics.lexiconCoverage.missing}`);

  console.log(`\n✅ Atlas written to ${atlasPath}\n`);
}

generateAtlas();
