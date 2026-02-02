# Platform UI - AI Agent Knowledge Base

> **For AI Agents**: Read this first before doing any work. This connects all tools, catalogs, and patterns.

## Quick Start

1. **Read Foundation**: `packages/gazetteer/catalogs/FOUNDATION.md`
2. **Check Components**: `packages/gazetteer/src/registry/component-registry.ts`
3. **Use Commands**: `.claude/commands/platform-ui/README.md`

---

## Architecture Overview

```
┌─────────────────────────────────────────────────────────────┐
│                    KNOWLEDGE SOURCES                         │
├─────────────────┬─────────────────┬─────────────────────────┤
│ FOUNDATION.md   │ component-      │ Widget Catalogs          │
│ (rules)         │ registry.ts     │ (patterns)               │
└────────┬────────┴────────┬────────┴────────┬────────────────┘
         │                 │                 │
         ▼                 ▼                 ▼
┌─────────────────────────────────────────────────────────────┐
│                      AI AGENTS                               │
├─────────────────────────────────────────────────────────────┤
│ platform-ui-specialist │ gazetteer-audit │ designsystemet   │
└────────┬────────────────┴────────┬────────┴────────┬────────┘
         │                         │                 │
         ▼                         ▼                 ▼
┌─────────────────────────────────────────────────────────────┐
│                      SKILLS                                  │
├─────────────────────────────────────────────────────────────┤
│ app-scaffolding    │ component-patterns │ compliance-audit  │
└────────┬───────────┴────────┬───────────┴────────┬──────────┘
         │                    │                    │
         ▼                    ▼                    ▼
┌─────────────────────────────────────────────────────────────┐
│                      COMMANDS                                │
├─────────────────────────────────────────────────────────────┤
│ SPEC: /spec-product, /spec-data, /spec-design               │
│ CREATE: /create-app, /create-page, /create-feature          │
│ QA: /qa-verify, /qa-audit                                   │
│ DEPLOY: /deploy-build, /deploy-release                      │
└────────┬────────────────────────────────────────────────────┘
         │
         ▼
┌─────────────────────────────────────────────────────────────┐
│                      CLI TOOLS                               │
├─────────────────────────────────────────────────────────────┤
│ scaffold-app.ts    │ validate-foundation.mjs                │
└─────────────────────────────────────────────────────────────┘
```

---

## Knowledge Sources

### 1. Foundation Rules
**File**: `packages/gazetteer/catalogs/FOUNDATION.md`

Contains:
- Provider nesting order (MUST follow exactly)
- Style import requirements
- Thin App pattern rules
- Validation commands

### 2. Component Registry
**File**: `packages/gazetteer/src/registry/component-registry.ts`

Contains:
- 100+ available components
- Import paths
- Component categories (primitives, composed, design system)

### 3. Widget Catalogs
**Directory**: `packages/gazetteer/catalogs/`

| Catalog | Purpose |
|---------|---------|
| `widgets.dashboard.catalog.json` | Dashboard widgets |
| `widgets.tables.catalog.json` | Table/list widgets |
| `widgets.crud.catalog.json` | CRUD widgets |
| `shells.public.catalog.json` | Public page shells |
| `shells.authenticated.catalog.json` | Auth page shells |
| `html-to-platform.dictionary.json` | HTML → Platform UI mapping |

### 4. Examples
**File**: `packages/gazetteer/catalogs/examples/platform-ui.examples.catalog.json`

Real code examples for each component.

---

## Agents

| Agent | Purpose | Knowledge |
|-------|---------|-----------|
| `platform-ui-specialist` | Build apps | FOUNDATION, registry, catalogs |
| `gazetteer-audit-agent` | Audit compliance | validation scripts, rules |
| `designsystemet-frontend-design` | Design system | designsystemet.no |
| `digdir-designsystem-specialist` | Digdir components | digdir patterns |

---

## Skills

| Skill | Purpose | Uses |
|-------|---------|------|
| `app-scaffolding` | Scaffold apps | scaffold-app.ts CLI |
| `component-patterns` | Use components | registry, examples |
| `compliance-audit` | Audit apps | validate-foundation.mjs |

---

## Commands (Design OS Pattern)

### Workflow
```
SPEC → CREATE → QA → DEPLOY
```

### SPEC Phase
| Command | Purpose | Output |
|---------|---------|--------|
| `/spec-product` | Vision, roadmap | specs/product.spec.json |
| `/spec-data` | Data model | specs/data.spec.json |
| `/spec-design` | Design system | specs/design.spec.json |

### CREATE Phase
| Command | Purpose | CLI |
|---------|---------|-----|
| `/create-app` | Scaffold app | `scaffold-app.ts` |
| `/create-page` | Generate page | Gazetteer page spec |
| `/create-feature` | Full feature | Pages + routes + tests |
| `/create-component` | UI component | Platform UI only |
| `/create-api` | API endpoints | SDK controller |
| `/create-data` | Sample data | Seeds + fixtures |

### QA Phase
| Command | Purpose | Script |
|---------|---------|--------|
| `/qa-verify` | All checks | `validate-foundation.mjs` |
| `/qa-audit` | Deep audit | All validation scripts |

### DEPLOY Phase
| Command | Purpose |
|---------|---------|
| `/deploy-build` | Build for production |
| `/deploy-release` | Deploy/export |

---

## CLI Tools

### scaffold-app.ts
```bash
node packages/gazetteer/src/cli/scaffold-app.ts <name> [options]

Options:
  --auth              Authenticated app
  --public            Public app
  --routes home,dash  Routes to generate
  -o ./apps           Output directory
```

### validate-foundation.mjs
```bash
node packages/gazetteer/scripts/validate-foundation.mjs apps/<name>

Checks:
  ✅ Provider order
  ✅ Style imports
  ✅ Thin App pattern
  ✅ Gazetteer structure
```

---

## Rules (NEVER violate)

### 1. No Raw HTML
```tsx
// WRONG
<div><span>Text</span></div>

// CORRECT
<Stack><Text>Text</Text></Stack>
```

### 2. No Hardcoded Styles
```tsx
// WRONG
<Stack style={{ padding: '20px', color: '#333' }}>

// CORRECT
<Stack padding="4" style={{ color: 'var(--ds-color-text-default)' }}>
```

### 3. Thin App Pattern
- Only `main.tsx` in `src/`
- All behavior in Gazetteer specs
- All UI from platform-ui

### 4. Provider Order (Auth)
```tsx
ErrorBoundary → ThemeProvider → I18nProvider → RuntimeProvider → AuthProvider → GazetteerProvider → BrowserRouter
```

### 5. Provider Order (Public)
```tsx
ErrorBoundary → ThemeProvider → I18nProvider → GazetteerProvider → BrowserRouter
```

---

## Validation Checklist

Before any work, verify:
- [ ] Read FOUNDATION.md
- [ ] Know available components (registry)
- [ ] Know widget patterns (catalogs)
- [ ] Use correct commands (spec → create → qa)
- [ ] Run validation after changes

After any work, verify:
```bash
node packages/gazetteer/scripts/validate-foundation.mjs apps/<name>
```

Expected output:
```
✅ main.tsx: Valid
✅ Thin App pattern: Valid
✅ Gazetteer structure: Valid
✅ FOUNDATION VALID
```
