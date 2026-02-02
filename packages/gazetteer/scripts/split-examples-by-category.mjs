#!/usr/bin/env node
/**
 * Split Examples by Category
 * 
 * Takes the comprehensive examples catalog and splits it into
 * category-based files for easier AI processing.
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const inputPath = path.join(__dirname, '../catalogs/examples/platform-ui.examples.catalog.json');
const outputDir = path.join(__dirname, '../catalogs/examples');

// Read the comprehensive catalog
const catalog = JSON.parse(fs.readFileSync(inputPath, 'utf-8'));
const examples = catalog.examples;

// Group examples by category
const categories = {};
examples.forEach(example => {
  const cat = example.category || 'other';
  if (!categories[cat]) {
    categories[cat] = [];
  }
  categories[cat].push(example);
});

// Write each category to its own file
Object.entries(categories).forEach(([category, categoryExamples]) => {
  const output = {
    $schema: 'https://json-schema.org/draft/2020-12/schema',
    $id: `https://xala.dev/catalogs/gazetteer/examples/${category}.examples.json`,
    title: `${category.charAt(0).toUpperCase() + category.slice(1)} Examples`,
    description: `${categoryExamples.length} ${category} examples for @xala-technologies/platform-ui`,
    version: '1.0.0',
    generatedAt: new Date().toISOString(),
    category,
    totalExamples: categoryExamples.length,
    examples: categoryExamples,
  };
  
  const outputPath = path.join(outputDir, `${category}.examples.json`);
  fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
  console.log(`   ✅ ${category}: ${categoryExamples.length} examples`);
});

// Create index file for examples
const examplesIndex = {
  $schema: 'https://json-schema.org/draft/2020-12/schema',
  $id: 'https://xala.dev/catalogs/gazetteer/examples/index.json',
  title: 'Examples Catalog Index',
  description: 'Index of all category-based example files',
  version: '1.0.0',
  generatedAt: new Date().toISOString(),
  totalExamples: examples.length,
  categories: Object.fromEntries(
    Object.entries(categories).map(([cat, exs]) => [cat, {
      file: `${cat}.examples.json`,
      count: exs.length,
    }])
  ),
  files: Object.keys(categories).map(cat => `${cat}.examples.json`),
};

fs.writeFileSync(path.join(outputDir, 'index.json'), JSON.stringify(examplesIndex, null, 2));

console.log(`\n✅ Split ${examples.length} examples into ${Object.keys(categories).length} category files`);
console.log(`   Index: ${outputDir}/index.json`);
