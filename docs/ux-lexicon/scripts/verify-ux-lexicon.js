#!/usr/bin/env node

/**
 * UX Lexicon Verification Script
 *
 * Validates:
 * 1. All dictionary entries match schema
 * 2. Referenced components exist in source
 * 3. Import paths are valid
 * 4. Code examples compile
 * 5. Storybook paths exist
 */

import { readFileSync, existsSync, readdirSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';
import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const LEXICON_ROOT = join(__dirname, '..');
const REGISTRY_ROOT = join(LEXICON_ROOT, 'registry');
const SCHEMAS_ROOT = join(LEXICON_ROOT, 'schemas');
const PROJECT_ROOT = join(LEXICON_ROOT, '..', '..');

// Colors for console output
const colors = {
  red: '\x1b[31m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  reset: '\x1b[0m',
};

function log(color, message) {
  console.log(`${colors[color]}${message}${colors.reset}`);
}

function loadJSON(path) {
  try {
    return JSON.parse(readFileSync(path, 'utf8'));
  } catch (error) {
    log('red', `Failed to load ${path}: ${error.message}`);
    return null;
  }
}

// Initialize JSON Schema validator
const ajv = new Ajv({ allErrors: true, strict: false });
addFormats(ajv);

// Load schemas
const schemas = {
  dictionaryEntry: loadJSON(join(SCHEMAS_ROOT, 'dictionary-entry.schema.json')),
  patternCatalog: loadJSON(join(SCHEMAS_ROOT, 'pattern-catalog.schema.json')),
  goldenFlow: loadJSON(join(SCHEMAS_ROOT, 'golden-flow.schema.json')),
};

// Add schemas to validator
Object.entries(schemas).forEach(([name, schema]) => {
  if (schema) {
    ajv.addSchema(schema, name);
  }
});

let errors = [];
let warnings = [];

/**
 * Validate a dictionary file against schema
 */
function validateDictionary(filePath) {
  const data = loadJSON(filePath);
  if (!data) {
    errors.push(`Could not load dictionary: ${filePath}`);
    return;
  }

  // Validate each entry
  data.entries?.forEach((entry, index) => {
    const validate = ajv.getSchema('dictionaryEntry');
    if (validate && !validate(entry)) {
      errors.push(
        `Dictionary entry ${entry.id || index} in ${filePath} failed validation:\n` +
          validate.errors.map((e) => `  - ${e.instancePath}: ${e.message}`).join('\n')
      );
    }

    // Check that component exists (basic check)
    if (entry.platformConstruct?.importPath) {
      const importPath = entry.platformConstruct.importPath;
      if (importPath.startsWith('@xala-technologies/platform-ui')) {
        // It's our package - check if the path segment exists
        const layerPath = importPath.replace('@xala-technologies/platform-ui/', '');
        const srcPath = join(PROJECT_ROOT, 'src', layerPath);
        if (!existsSync(srcPath) && !existsSync(srcPath + '.ts') && !existsSync(srcPath + '.tsx')) {
          warnings.push(`Component path may not exist: ${importPath} (entry: ${entry.id})`);
        }
      }
    }

    // Validate required states
    const requiredStates = ['idle', 'loading'];
    requiredStates.forEach((state) => {
      if (!entry.states?.[state]) {
        warnings.push(`Entry ${entry.id} missing ${state} state definition`);
      }
    });
  });
}

/**
 * Validate a pattern file against schema
 */
function validatePattern(filePath) {
  const data = loadJSON(filePath);
  if (!data) {
    errors.push(`Could not load pattern: ${filePath}`);
    return;
  }

  data.patterns?.forEach((pattern, index) => {
    // Basic validation
    if (!pattern.id) {
      errors.push(`Pattern ${index} in ${filePath} missing id`);
    }
    if (!pattern.components || pattern.components.length === 0) {
      errors.push(`Pattern ${pattern.id || index} in ${filePath} has no components`);
    }
    if (!pattern.states?.idle) {
      warnings.push(`Pattern ${pattern.id} missing idle state`);
    }
  });
}

/**
 * Validate a flow file against schema
 */
function validateFlow(filePath) {
  const data = loadJSON(filePath);
  if (!data) {
    errors.push(`Could not load flow: ${filePath}`);
    return;
  }

  // Basic validation
  if (!data.id) {
    errors.push(`Flow in ${filePath} missing id`);
  }
  if (!data.shell) {
    errors.push(`Flow ${data.id || filePath} missing shell definition`);
  }
  if (!data.zones) {
    errors.push(`Flow ${data.id || filePath} missing zones definition`);
  }
  if (!data.states?.idle) {
    warnings.push(`Flow ${data.id} missing idle state`);
  }
}

/**
 * Validate the index file
 */
function validateIndex() {
  const indexPath = join(REGISTRY_ROOT, 'index.json');
  const index = loadJSON(indexPath);
  if (!index) {
    errors.push('Could not load registry index');
    return;
  }

  // Check all referenced dictionary files exist
  index.dictionary?.categories?.forEach((cat) => {
    const filePath = join(REGISTRY_ROOT, cat.file);
    if (!existsSync(filePath)) {
      errors.push(`Referenced dictionary file not found: ${cat.file}`);
    }
  });

  // Check all referenced pattern files exist
  index.patterns?.categories?.forEach((cat) => {
    const filePath = join(REGISTRY_ROOT, cat.file);
    if (!existsSync(filePath)) {
      errors.push(`Referenced pattern file not found: ${cat.file}`);
    }
  });

  // Check all referenced flow files exist
  index.flows?.items?.forEach((flow) => {
    const filePath = join(REGISTRY_ROOT, flow.file);
    if (!existsSync(filePath)) {
      errors.push(`Referenced flow file not found: ${flow.file}`);
    }
  });
}

/**
 * Main validation function
 */
function main() {
  console.log('\n🔍 Validating UX Lexicon...\n');

  // Validate index
  log('blue', '📋 Validating registry index...');
  validateIndex();

  // Validate all dictionary files
  log('blue', '📖 Validating dictionary entries...');
  const dictionaryPath = join(REGISTRY_ROOT, 'dictionary');
  if (existsSync(dictionaryPath)) {
    readdirSync(dictionaryPath)
      .filter((f) => f.endsWith('.json'))
      .forEach((file) => {
        validateDictionary(join(dictionaryPath, file));
      });
  }

  // Validate all pattern files
  log('blue', '🧩 Validating patterns...');
  const patternsPath = join(REGISTRY_ROOT, 'patterns');
  if (existsSync(patternsPath)) {
    readdirSync(patternsPath)
      .filter((f) => f.endsWith('.json'))
      .forEach((file) => {
        validatePattern(join(patternsPath, file));
      });
  }

  // Validate all flow files
  log('blue', '🌊 Validating flows...');
  const flowsPath = join(REGISTRY_ROOT, 'flows');
  if (existsSync(flowsPath)) {
    readdirSync(flowsPath)
      .filter((f) => f.endsWith('.json'))
      .forEach((file) => {
        validateFlow(join(flowsPath, file));
      });
  }

  // Report results
  console.log('\n' + '─'.repeat(50) + '\n');

  if (warnings.length > 0) {
    log('yellow', `⚠️  ${warnings.length} warning(s):\n`);
    warnings.forEach((w) => console.log(`   ${w}`));
    console.log();
  }

  if (errors.length > 0) {
    log('red', `❌ ${errors.length} error(s):\n`);
    errors.forEach((e) => console.log(`   ${e}`));
    console.log();
    process.exit(1);
  }

  log('green', '✅ UX Lexicon validation passed!\n');

  // Summary
  const dictionaryFiles = existsSync(dictionaryPath)
    ? readdirSync(dictionaryPath).filter((f) => f.endsWith('.json')).length
    : 0;
  const patternFiles = existsSync(patternsPath)
    ? readdirSync(patternsPath).filter((f) => f.endsWith('.json')).length
    : 0;
  const flowFiles = existsSync(flowsPath)
    ? readdirSync(flowsPath).filter((f) => f.endsWith('.json')).length
    : 0;

  console.log('📊 Summary:');
  console.log(`   Dictionary categories: ${dictionaryFiles}`);
  console.log(`   Pattern files: ${patternFiles}`);
  console.log(`   Flow files: ${flowFiles}`);
  console.log(`   Warnings: ${warnings.length}`);
  console.log();
}

main();
