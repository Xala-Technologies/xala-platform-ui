# UX Lexicon / Semantic Dictionary

A comprehensive **UX Semantic Dictionary** that translates raw HTML intents into Platform UI primitives, blocks, and patterns. This enables AI-driven development and enforces design system compliance.

## Quick Start

### For AI Agents

> **IMPORTANT**: Read [AI_CONTRACT.mdx](./AI_CONTRACT.mdx) before generating any UI code.

1. **Retrieve** the relevant lexicon entry before composing UI:
   ```
   registry/lexicon.registry.json → find entry by htmlElements
   lexicon/{ENTRY}.mdx → read full documentation
   ```

2. **Compose** using the Platform UI component mapping:
   ```json
   {
     "id": "DIV",
     "htmlElements": ["div"],
     "preferred": "Stack",
     "alternates": ["Box", "Grid", "Container", "Card"]
   }
   ```

3. **Validate** state coverage using the [state matrix](./guides/state-matrix.mdx).

4. **Follow** the [hardlines](./hardlines/) for critical rules.

### For Developers

```bash
# Verify lexicon integrity
pnpm verify:ux-lexicon

# Check design token compliance
pnpm verify:design-tokens

# Run all verification
pnpm verify:all
```

## Directory Structure

```
docs/ux-lexicon/
├── README.md                    # This file
├── AI_CONTRACT.mdx              # ⭐ AI agent requirements
├── AUDIT.md                     # Current system inventory
├── DEFINITION_OF_DONE.md        # Completion checklist
│
├── hardlines/                   # ⭐ Critical enforcement rules
│   ├── HARDLINE_THEMING_CONFIG.md   # Mandatory theming setup
│   └── HARDLINE_NO_RAW_HTML.md      # Raw HTML prohibition
│
├── lexicon/                     # ⭐ Individual component entries
│   ├── DIV.mdx                  # Layout containers
│   ├── BUTTON.mdx               # Action triggers
│   ├── INPUT.mdx                # Text inputs
│   ├── SELECT.mdx               # Dropdowns
│   ├── TABLE.mdx                # Data tables
│   ├── HEADING.mdx              # Page/section titles
│   ├── MODAL.mdx                # Dialogs and drawers
│   ├── LINK.mdx                 # Navigation anchors
│   ├── NAV.mdx                  # Navigation regions
│   ├── CHECKBOX.mdx             # Boolean selection
│   ├── BADGE.mdx                # Status indicators
│   └── EMPTY_STATE.mdx          # No data states
│
├── patterns/                    # ⭐ Reusable UI patterns
│   ├── PATTERN_PAGE_SHELL.mdx   # Page layout structure
│   ├── PATTERN_FORM_LAYOUT.mdx  # Form structure
│   ├── PATTERN_STATE_HANDLING.mdx # State matrix
│   └── PATTERN_DATA_TABLE.mdx   # Table configuration
│
├── golden-flows/                # ⭐ Page-level compositions
│   ├── FLOW_ADMIN_LIST.mdx      # List page with bulk actions
│   ├── FLOW_DETAIL_PAGE.mdx     # Resource detail view
│   ├── FLOW_CREATE_EDIT_FORM.mdx # Create/edit forms
│   └── FLOW_ACCESS_DENIED.mdx   # Permission denied state
│
├── schemas/                     # JSON Schema definitions
│   ├── dictionary-entry.schema.json
│   ├── pattern-catalog.schema.json
│   ├── golden-flow.schema.json
│   └── component-atlas.schema.json
│
├── registry/                    # Machine-readable (AI-friendly)
│   ├── lexicon.registry.json    # ⭐ Compact lexicon index
│   ├── index.json               # Master index
│   ├── dictionary/              # Legacy JSON mappings
│   ├── patterns/                # Pattern configurations
│   └── flows/                   # Flow configurations
│
├── guides/                      # Human-readable documentation
│   ├── HTML_TRANSLATION_TABLE.mdx
│   ├── state-matrix.mdx
│   ├── accessibility-patterns.mdx
│   ├── i18n-patterns.mdx
│   ├── TOKEN_EXTENSION_POLICY.mdx
│   └── LAYOUT_CONTRACT.mdx
│
├── agents/                      # AI agent prompts
│   ├── LEXICON_RETRIEVER.prompt.md
│   ├── UX_COMPOSER.prompt.md
│   ├── BLOCK_BUILDER.prompt.md
│   ├── STORYBOOK_A11Y_VALIDATOR.prompt.md
│   └── TOKEN_EXTENSION_AGENT.prompt.md
│
└── scripts/
    ├── verify-ux-lexicon.js
    └── generate-atlas.js
```

## Core Concepts

### 1. Lexicon Entries

Each entry maps HTML elements to Platform UI components with full documentation:

| ID | HTML | Preferred | Alternates |
|----|------|-----------|------------|
| `DIV` | `<div>` | `Stack` | `Box`, `Grid`, `Container`, `Card` |
| `BUTTON` | `<button>` | `Button` | `Link` |
| `INPUT` | `<input>` | `Textfield` | `Textarea`, `Search` |
| `TABLE` | `<table>` | `DataTable` | `Table` |
| `MODAL` | `<dialog>` | `Modal` | `ConfirmDialog`, `Drawer` |

See individual MDX files in `lexicon/` for complete documentation.

### 2. State Matrix

Every component must handle these states:

| State | Condition | Component |
|-------|-----------|-----------|
| `loading` | `isLoading === true` | `LoadingFallback`, `Skeleton` |
| `empty` | `data.length === 0` | `EmptyState`, `ResultsEmptyState` |
| `error` | `error !== null` | `Alert data-color="danger"` |
| `success` | `data.length > 0` | Normal content |
| `permissionDenied` | `!hasPermission` | `AccessGate` |

Use `StateWrapper` and `useComputedState` for consistent handling:

```tsx
import { StateWrapper, useComputedState } from '@xala-technologies/platform-ui';

const state = useComputedState({ isLoading, error, isEmpty: !data?.length, hasPermission });

<StateWrapper
  state={state}
  loadingComponent={<LoadingFallback />}
  emptyComponent={<EmptyState title={t('empty.title')} />}
  errorComponent={<Alert data-color="danger">{error?.message}</Alert>}
  permissionDeniedComponent={<AccessGate denied title={t('access.denied')} />}
>
  <DataTable data={data} />
</StateWrapper>
```

### 3. Golden Flows

Pre-defined page compositions:

| Flow | Purpose | MDX |
|------|---------|-----|
| `FLOW_ADMIN_LIST` | Admin list + filters + bulk actions | [View](./golden-flows/FLOW_ADMIN_LIST.mdx) |
| `FLOW_DETAIL_PAGE` | Resource detail with sections | [View](./golden-flows/FLOW_DETAIL_PAGE.mdx) |
| `FLOW_CREATE_EDIT_FORM` | Create/edit forms | [View](./golden-flows/FLOW_CREATE_EDIT_FORM.mdx) |
| `FLOW_ACCESS_DENIED` | Permission denied state | [View](./golden-flows/FLOW_ACCESS_DENIED.mdx) |

### 4. Hardlines (Critical Rules)

| Hardline | Severity | Description |
|----------|----------|-------------|
| [THEMING_CONFIG](./hardlines/HARDLINE_THEMING_CONFIG.md) | CRITICAL | Mandatory provider hierarchy |
| [NO_RAW_HTML](./hardlines/HARDLINE_NO_RAW_HTML.md) | CRITICAL | Raw HTML prohibition |

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

**Before (raw HTML - FORBIDDEN):**
```html
<div style="display: flex; gap: 16px;">
  <h1>Page Title</h1>
  <p>Description text</p>
</div>
```

**After (Platform UI):**
```tsx
import { Stack, Heading, Paragraph } from '@xala-technologies/platform-ui';

<Stack direction="row" gap="4">
  <Heading level={1} data-size="2xl">{t('pages.title')}</Heading>
  <Paragraph data-size="md">{t('pages.description')}</Paragraph>
</Stack>
```

### Form with Validation

```tsx
import { FormSection, Textfield, Button, Stack } from '@xala-technologies/platform-ui';

<FormSection title={t('form.sections.basicInfo')}>
  <Stack gap="4">
    <Textfield
      label={t('form.name.label')}
      {...register('name')}
      error={errors.name?.message}
      aria-required="true"
    />
    <Stack direction="row" justify="end" gap="3">
      <Button variant="secondary" onClick={cancel}>{t('actions.cancel')}</Button>
      <Button variant="primary" type="submit">{t('actions.save')}</Button>
    </Stack>
  </Stack>
</FormSection>
```

### Permission Gating

```tsx
import { AccessGate } from '@xala-technologies/platform-ui';

<AccessGate
  denied={!hasPermission('users.edit')}
  title={t('access.denied.title')}
  description={t('access.denied.description')}
  requiredPermission="users.edit"
  actions={[
    { label: t('actions.requestAccess'), onClick: request, variant: 'primary' },
    { label: t('actions.goBack'), onClick: () => navigate(-1), variant: 'secondary' },
  ]}
>
  <EditForm user={user} />
</AccessGate>
```

## Verification

Run verification scripts to ensure compliance:

```bash
# Check all dictionary entries are valid
pnpm verify:ux-lexicon

# Check design token compliance
pnpm verify:design-tokens

# Check layer boundaries
pnpm verify:boundaries

# Run all verification
pnpm verify:all
```

## Contributing

When adding new components:

1. Create lexicon entry MDX in `lexicon/{COMPONENT}.mdx`
2. Add to `registry/lexicon.registry.json`
3. Ensure state matrix coverage
4. Add Storybook stories for all states
5. Document accessibility attributes
6. Run `pnpm verify:ux-lexicon` to validate

See [DEFINITION_OF_DONE.md](./DEFINITION_OF_DONE.md) for complete checklist.

## Related Documentation

- [AI Contract](./AI_CONTRACT.mdx) - Mandatory AI agent rules
- [Norwegian Designsystemet](https://designsystemet.no/)
- [WCAG 2.2 Guidelines](https://www.w3.org/TR/WCAG22/)
- [Platform UI CLAUDE.md](../../CLAUDE.md)
