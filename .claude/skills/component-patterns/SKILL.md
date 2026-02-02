---
name: component-patterns
description: "Skill for using platform-ui components correctly with catalog examples and design tokens"
---

# Component Patterns Skill

This skill teaches agents how to use platform-ui components following established patterns.

## Knowledge Sources

### Component Registry
`packages/gazetteer/src/registry/component-registry.ts`

Contains all available components:
- Primitives: Stack, Box, Grid, Text
- Composed: AppHeader, Sidebar, DataTable, SchemaForm
- Designsystemet: Button, Card, Heading, Paragraph

### Examples Catalog
`packages/gazetteer/catalogs/examples/platform-ui.examples.catalog.json`

Real code examples for each component.

### Widget Catalogs
- `catalogs/widgets.dashboard.catalog.json`
- `catalogs/widgets.tables.catalog.json`
- `catalogs/widgets.crud.catalog.json`

## Component Rules

### ALWAYS Do This
```tsx
import { Stack, Card, Button, Heading } from '@xala-technologies/platform-ui';

<Stack gap="4" direction="column">
  <Card>
    <Heading level={2}>Title</Heading>
    <Button variant="primary">Action</Button>
  </Card>
</Stack>
```

### NEVER Do This
```tsx
// Raw HTML - FORBIDDEN
<div className="container">
  <h2>Title</h2>
  <button>Action</button>
</div>

// Hardcoded styles - FORBIDDEN
<Stack style={{ padding: '20px', color: '#333' }}>

// Custom CSS - FORBIDDEN
<Card className="my-custom-card">
```

## Layout Patterns

### Dashboard Layout
```tsx
<Stack direction="row" gap="6">
  <Stack gap="4" style={{ flex: 2 }}>
    <StatCard title="Revenue" value="$12,345" />
    <StatCard title="Users" value="1,234" />
  </Stack>
  <Stack gap="4" style={{ flex: 3 }}>
    <DataTable data={...} columns={...} />
  </Stack>
</Stack>
```

### Form Layout
```tsx
<Stack gap="6">
  <Heading level={2}>Create Project</Heading>
  <SchemaForm
    schema={projectSchema}
    onSubmit={handleSubmit}
  />
</Stack>
```

### List Layout
```tsx
<Stack gap="4">
  <Stack direction="row" justify="space-between">
    <Heading level={2}>Projects</Heading>
    <Button>Add Project</Button>
  </Stack>
  <DataTable data={projects} columns={columns} />
</Stack>
```

## Design Tokens

Use CSS variables for any custom styling:

| Token | Usage |
|-------|-------|
| `--ds-spacing-{0-15}` | Gaps, padding, margins |
| `--ds-color-text-{default,subtle}` | Text colors |
| `--ds-color-surface-{default,tinted}` | Backgrounds |
| `--ds-color-border-{subtle,default}` | Borders |

## Validation

Use validate-examples to check:
```bash
node packages/gazetteer/scripts/validate-examples.mjs
```
