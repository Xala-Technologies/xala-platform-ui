# @xala/design-workflow

AI-guided design workflow for building products with [@xala-technologies/platform-ui](https://github.com/Xala-Technologies/xala-platform-ui).

## Overview

This package extracts the valuable AI workflow patterns from [Design OS](https://github.com/buildermethods/design-os) and adapts them for Xala's component library built on Norwegian Designsystemet.

**What it provides:**
- 🎯 Structured product planning workflow
- 📋 Zod schemas for specs and exports
- 🔌 Component adapter for @xala-technologies/platform-ui
- 📤 Export generators for implementation handoff
- 🤖 Claude Code slash commands

**What it doesn't include:**
- ❌ Design tokens (use @xala-technologies/platform-ui/tokens)
- ❌ UI components (use @xala-technologies/platform-ui)
- ❌ Storybook setup (included in platform-ui)

## Installation

```bash
pnpm add @xala/design-workflow
```

## Workflow Commands

Use with Claude Code or any AI assistant:

```
/product-vision    → Define product vision and goals
/product-roadmap   → Break into phases and sections
/data-model        → Define entities and relationships
/section-spec      → Specify section requirements
/export            → Generate implementation handoff
```

## Programmatic Usage

```typescript
import {
  productPlanSchema,
  generateOneShotPrompt,
  generateIncrementalPrompts,
  componentMap,
} from '@xala/design-workflow';

// Validate a product plan
const plan = productPlanSchema.parse(myPlanData);

// Generate one-shot implementation prompt
const prompt = generateOneShotPrompt(plan);

// Generate per-section prompts
const sectionPrompts = generateIncrementalPrompts(plan);

// Check component mapping
const buttonMapping = componentMap['button'];
// → { component: 'Button', import: '@xala-technologies/platform-ui/primitives' }
```

## Component Adapter

Maps abstract component types to @xala-technologies/platform-ui:

```typescript
import { getComponentMapping, generateImports } from '@xala/design-workflow/adapters';

// Get mapping for a component type
getComponentMapping('data-table');
// → { component: 'DataTable', import: '@xala-technologies/platform-ui/composed' }

// Generate import statements
generateImports(['button', 'card', 'data-table']);
// → import { Button, Card } from '@xala-technologies/platform-ui/primitives';
//   import { DataTable } from '@xala-technologies/platform-ui/composed';
```

## Schemas

Zod schemas for validating specs:

```typescript
import {
  productVisionSchema,
  sectionSpecSchema,
  componentSpecSchema,
} from '@xala/design-workflow/schemas';

// Validate section spec
const section = sectionSpecSchema.parse({
  name: 'Dashboard',
  description: 'Main user dashboard',
  userStories: [...],
  components: [...],
  states: ['loading', 'empty', 'populated', 'error'],
});
```

## Generators

Create implementation-ready prompts:

```typescript
import {
  generateOneShotPrompt,
  generateSectionPrompt,
  generateStorybookStories,
} from '@xala/design-workflow/generators';

// Full product prompt
const oneshot = generateOneShotPrompt(productPlan);

// Single section prompt
const sectionPrompt = generateSectionPrompt(section, {
  productName: 'My App',
  dataModel: typeDefinitions,
});

// Storybook stories
const stories = generateStorybookStories(section);
```

## Output Structure

```
product/
├── vision.yaml
├── roadmap.yaml
├── data-model.yaml
├── types.ts
└── sections/
    └── [section-name]/
        └── spec.yaml

export/
├── index.md
├── oneshot-prompt.md
├── sections/
│   └── [section-name].md
└── storybook/
    └── [section-name].stories.tsx
```

## Integration with Claude Code

Copy the `claude/` directory to your project:

```bash
cp -r node_modules/@xala/design-workflow/claude .claude
```

Then use slash commands in Claude Code:
```
/product-vision
```

## License

MIT - Xala Technologies

## Related

- [@xala-technologies/platform-ui](https://github.com/Xala-Technologies/xala-platform-ui) - Component library
- [Designsystemet](https://designsystemet.no/) - Norwegian design system
- [Design OS](https://github.com/buildermethods/design-os) - Original inspiration
