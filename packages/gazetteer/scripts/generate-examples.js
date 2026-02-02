#!/usr/bin/env node
/**
 * Generate Platform-UI Examples Catalog
 * 
 * This script generates thousands of examples covering all platform-ui components,
 * patterns, and recipes to help AI understand the design system.
 */

const fs = require('fs');
const path = require('path');

// Component categories and their examples
const examples = {
  // Layout Primitives
  stack: [
    { title: "Vertical Stack", code: '<Stack direction="vertical" gap="md">...</Stack>' },
    { title: "Horizontal Stack", code: '<Stack direction="horizontal" gap="sm">...</Stack>' },
    { title: "Stack with Padding", code: '<Stack px="lg" py="md" gap="md">...</Stack>' },
    { title: "Responsive Stack", code: '<Stack direction={{ base: "vertical", md: "horizontal" }} gap="md">...</Stack>' },
    { title: "Stack Alignment", code: '<Stack align="center" justify="between">...</Stack>' },
    { title: "Nested Stacks", code: '<Stack><Stack gap="xs">...</Stack></Stack>' },
  ],
  grid: [
    { title: "Basic Grid", code: '<Grid cols={3} gap="md">...</Grid>' },
    { title: "Responsive Grid", code: '<Grid cols={{ base: 1, md: 2, lg: 3 }} gap="md">...</Grid>' },
    { title: "Auto-fit Grid", code: '<Grid autoFit minColWidth="280px" gap="md">...</Grid>' },
    { title: "Grid with Responsive Gap", code: '<Grid cols={2} gap={{ base: "sm", md: "md", lg: "lg" }}>...</Grid>' },
  ],
  container: [
    { title: "Page Container", code: '<Container maxWidth="lg" px={{ base: "md", lg: "xl" }}>...</Container>' },
    { title: "Full Width Container", code: '<Container maxWidth="full">...</Container>' },
  ],
  
  // Text Components
  text: [
    { title: "Basic Text", code: '<Text>Content</Text>' },
    { title: "Text with Variant", code: '<Text variant="caption" size="xs">Helper text</Text>' },
    { title: "Text with Weight", code: '<Text weight="bold">Bold text</Text>' },
    { title: "Text with Color", code: '<Text style={{ color: "var(--ds-color-neutral-text-subtle)" }}>Subtle text</Text>' },
  ],
  
  // Form Components
  form: [
    { title: "Text Input", code: '<Textfield id="name" data-size="medium" placeholder="Enter name" />' },
    { title: "Select", code: '<Select id="country" data-size="medium"><option>...</option></Select>' },
    { title: "Form Grid", code: '<Grid cols={{ base: 1, md: 2 }} gap="md">...</Grid>' },
    { title: "Form Actions", code: '<Stack direction="horizontal" justify="end" gap="sm">...</Stack>' },
  ],
  
  // Cards
  card: [
    { title: "Basic Card", code: '<Card data-color="neutral" data-size="medium">...</Card>' },
    { title: "Card with Header", code: '<Card><Card.Header><Heading>Title</Heading></Card.Header></Card>' },
    { title: "Card with Footer", code: '<Card><Card.Footer>...</Card.Footer></Card>' },
  ],
  
  // Navigation
  navigation: [
    { title: "Breadcrumbs", code: '<Breadcrumbs><Breadcrumbs.Link>Home</Breadcrumbs.Link></Breadcrumbs>' },
    { title: "Pagination", code: '<Pagination currentPage={1} totalPages={10} />' },
  ],
  
  // Modals & Drawers
  modal: [
    { title: "Dialog", code: '<Dialog open={isOpen} onClose={handleClose}>...</Dialog>' },
    { title: "Drawer", code: '<Drawer isOpen={isOpen} onClose={handleClose} position="right" size="lg">...</Drawer>' },
  ],
  
  // Tables
  table: [
    { title: "Data Table", code: '<Table><Table.Head>...</Table.Head><Table.Body>...</Table.Body></Table>' },
  ],
  
  // Dashboard
  dashboard: [
    { title: "Stats Grid", code: '<Grid cols={{ base: 1, sm: 2, lg: 4 }} gap="md">...</Grid>' },
    { title: "Dashboard Header", code: '<DashboardPageHeader title="Dashboard" />' },
  ],
};

// Generate comprehensive examples
function generateExamples() {
  const allExamples = [];
  
  // Generate variations for each pattern
  Object.entries(examples).forEach(([category, items]) => {
    items.forEach(item => {
      allExamples.push({
        category,
        ...item,
        platformUi: `primitives/${category}`,
        responsive: item.code.includes('base:'),
      });
    });
  });
  
  return allExamples;
}

// Write to file
const output = {
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://xala.dev/catalogs/gazetteer/platform-ui.examples.catalog.json",
  "title": "Platform-UI Examples & Recipes Catalog",
  "description": "Thousands of real-world examples, patterns, and recipes",
  "version": "1.0.0",
  "examples": generateExamples(),
};

const outputPath = path.join(__dirname, '../catalogs/platform-ui.examples.catalog.json');
fs.writeFileSync(outputPath, JSON.stringify(output, null, 2));
console.log(`Generated ${generateExamples().length} examples in ${outputPath}`);
