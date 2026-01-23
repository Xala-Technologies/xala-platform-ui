# /export

Generate implementation handoff package.

## Prerequisites

Complete all previous steps:
- `/product-vision`
- `/product-roadmap`
- `/data-model`
- `/section-spec` for each section

## Export Modes

### One-Shot Export
Single comprehensive prompt for implementing the entire product:

```
/export --mode oneshot
```

Creates `export/oneshot-prompt.md` with:
- Complete setup instructions
- All imports needed
- Data model types
- Section-by-section implementation guide
- Accessibility checklist

### Incremental Export
Individual prompts for each section:

```
/export --mode incremental
```

Creates:
- `export/index.md` - Overview and implementation order
- `export/sections/[name].md` - Per-section implementation guide
- `export/storybook/[name].stories.tsx` - Storybook templates

## Output Structure

```
export/
├── index.md                    # Implementation overview
├── oneshot-prompt.md           # Complete implementation prompt
├── setup.md                    # Project setup instructions
├── sections/
│   ├── [section-name].md       # Section implementation guide
│   └── ...
├── storybook/
│   ├── preview.ts              # Storybook configuration
│   ├── [section-name].stories.tsx
│   └── [section-name].mdx
└── types/
    └── index.ts                # TypeScript definitions
```

## Setup Instructions

The export includes setup for @xala-technologies/platform-ui:

```bash
# Install from GitHub Packages
pnpm add @xala-technologies/platform-ui

# Configure .npmrc
echo "@xala-technologies:registry=https://npm.pkg.github.com" >> .npmrc
```

```typescript
// Import styles once in app root
import '@xala-technologies/platform-ui/styles.css';

// Import components as needed
import { Button, Card } from '@xala-technologies/platform-ui/primitives';
import { DataTable } from '@xala-technologies/platform-ui/composed';
import { AppLayout } from '@xala-technologies/platform-ui/shells';
```

## Usage

After export, use the generated prompts with any AI coding agent:

1. **Claude Code**: Copy prompt content to conversation
2. **Cursor**: Use prompt as context for implementation
3. **GitHub Copilot**: Reference as specification

## Validation

Before export, the workflow validates:
- [ ] Vision is defined
- [ ] Roadmap has at least one section
- [ ] Data model has at least one entity
- [ ] All roadmap sections have specs
- [ ] All component types are valid
