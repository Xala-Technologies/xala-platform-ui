# UX Lexicon / Semantic Dictionary

A comprehensive **UX Semantic Dictionary** that translates raw HTML intents into Platform UI primitives, blocks, and patterns. This enables AI-driven development and enforces design system compliance.

## Quick Start

### For AI Agents

1. **Retrieve** the relevant dictionary entry before composing UI:
   ```
   registry/dictionary/{category}.json → find entry by htmlIntent
   ```

2. **Compose** using the `platformConstruct` mapping:
   ```json
   {
     "htmlIntent": { "element": "<div style='display:flex'>" },
     "platformConstruct": { "component": "Stack", "props": { "direction": "horizontal" } }
   }
   ```

3. **Validate** state coverage using the state matrix.

### For Developers

```bash
# Verify lexicon integrity
pnpm verify:ux-lexicon

# Generate component atlas
pnpm generate:atlas
```

## Directory Structure

```
docs/ux-lexicon/
├── README.md                    # This file
├── AUDIT.md                     # Current system inventory
├── DEFINITION_OF_DONE.md        # Completion checklist
│
├── schemas/                     # JSON Schema definitions
│   ├── dictionary-entry.schema.json
│   ├── pattern-catalog.schema.json
│   ├── golden-flow.schema.json
│   └── component-atlas.schema.json
│
├── registry/                    # Machine-readable (AI-friendly)
│   ├── index.json               # Master index
│   ├── dictionary/              # HTML → Component mappings
│   │   ├── layout.json
│   │   ├── typography.json
│   │   ├── forms.json
│   │   ├── lists.json
│   │   ├── navigation.json
│   │   └── semantic.json
│   ├── patterns/                # Reusable UI patterns
│   │   ├── form-patterns.json
│   │   ├── list-patterns.json
│   │   ├── state-patterns.json
│   │   └── modal-patterns.json
│   └── flows/                   # Page-level golden flows
│       ├── list-page.json
│       ├── detail-page.json
│       └── ...
│
├── guides/                      # Human-readable MDX
│   ├── HTML_TRANSLATION_TABLE.mdx
│   ├── state-matrix.mdx
│   ├── accessibility-patterns.mdx
│   └── ...
│
├── agents/                      # AI agent prompts
│   ├── LEXICON_RETRIEVER.prompt.md
│   ├── UX_COMPOSER.prompt.md
│   └── ...
│
└── scripts/
    ├── verify-ux-lexicon.js
    └── generate-atlas.js
```

## Core Concepts

### 1. Dictionary Entries

Each entry maps an HTML intent to a Platform UI construct:

| HTML Intent | Platform Construct | Layer |
|-------------|-------------------|-------|
| `<div class="container">` | `Container` | primitives |
| `<div style="display:flex">` | `Stack direction="horizontal"` | primitives |
| `<h1>` | `Heading level={1}` | @digdir |
| `<input type="text">` | `Textfield` | @digdir |
| `<table>` | `DataTable` | composed |

### 2. State Matrix

Every component must handle these states:

| State | Component | Use Case |
|-------|-----------|----------|
| `idle` | Normal component | Interactive state |
| `loading` | `Skeleton`, `LoadingFallback` | Data fetching |
| `empty` | `EmptyState` | No data |
| `error` | `Alert variant="error"` | Error display |
| `success` | `Alert variant="success"` | Success feedback |
| `permissionDenied` | `AccessGate` | RBAC pattern |

### 3. Golden Flows

Pre-defined page compositions:

1. **list-page** - Admin list + filters + bulk actions
2. **detail-page** - Resource detail with sections
3. **form-page** - Create/edit form with validation
4. **wizard-flow** - Multi-step wizard
5. **search-results** - Search + refiners
6. **empty-onboarding** - Empty state onboarding
7. **access-denied** - Permission denied + request access
8. **audit-timeline** - Activity/audit log
9. **settings-page** - Theme/preferences
10. **notification-center** - Notifications panel

## Layer Hierarchy

Components are organized by complexity. **Lower layers cannot import from higher layers.**

| Level | Layer | Can Import From |
|-------|-------|-----------------|
| 0 | `@digdir` | External only |
| 0 | `primitives` | @digdir, external |
| 1 | `composed` | primitives, @digdir |
| 2 | `blocks` | primitives, composed |
| 3 | `patterns` | primitives, composed, blocks |
| 4 | `shells` | primitives, composed, blocks, patterns |
| 5 | `pages` | All layers |

## Usage Examples

### Translating HTML to Platform UI

**Before (raw HTML - forbidden):**
```html
<div style="display: flex; gap: 16px;">
  <h1>Page Title</h1>
  <p>Description text</p>
</div>
```

**After (Platform UI):**
```tsx
import { Heading, Paragraph } from '@digdir/designsystemet-react';
import { Stack } from '@xala-technologies/platform-ui/primitives';

<Stack direction="horizontal" gap="4">
  <Heading level={1} data-size="large">Page Title</Heading>
  <Paragraph data-size="medium">Description text</Paragraph>
</Stack>
```

### Handling States

```tsx
import { StateWrapper } from '@xala-technologies/platform-ui/composed';

<StateWrapper
  state={isLoading ? 'loading' : error ? 'error' : data ? 'idle' : 'empty'}
  loadingComponent={<Skeleton />}
  emptyComponent={<EmptyState title="No items" />}
  errorComponent={<Alert variant="error">{error.message}</Alert>}
>
  <DataTable data={data} />
</StateWrapper>
```

## Verification

Run verification scripts to ensure compliance:

```bash
# Check all dictionary entries are valid
pnpm verify:ux-lexicon

# Check design token compliance
pnpm verify:design-tokens

# Run all verification
pnpm verify:all
```

## Contributing

When adding new components:

1. Create dictionary entry in appropriate `registry/dictionary/*.json`
2. Ensure state matrix coverage
3. Add Storybook stories for all states
4. Document accessibility attributes
5. Run `pnpm verify:ux-lexicon` to validate

See [DEFINITION_OF_DONE.md](./DEFINITION_OF_DONE.md) for complete checklist.

## Related Documentation

- [Norwegian Designsystemet](https://designsystemet.no/)
- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)
- [Platform UI CLAUDE.md](../../CLAUDE.md)
