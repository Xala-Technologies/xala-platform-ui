---
name: compliance-audit
description: "Skill for auditing applications for foundation, design token, and architecture compliance"
---

# Compliance Audit Skill

This skill teaches agents how to audit applications for compliance with platform standards.

## Audit Categories

### 1. Foundation Compliance
Check against `FOUNDATION.md`:
- Provider order correct
- Single style import
- LoadingFallback (no raw div)
- Thin App pattern

**Script:**
```bash
node packages/gazetteer/scripts/validate-foundation.mjs apps/<name>
```

### 2. Component Compliance
Check against component registry:
- All components from platform-ui
- No raw HTML elements
- Correct component usage

**Script:**
```bash
node packages/gazetteer/scripts/validate-examples.mjs
```

### 3. Design Token Compliance
Check for hardcoded values:
- No hex colors (#fff)
- No rgb/rgba colors
- No pixel values in styles
- All from --ds-* tokens

**Script:**
```bash
pnpm verify:design-tokens
```

### 4. Gazetteer Structure
Check spec files:
- Valid JSON schemas
- Required fields present
- i18n keys defined

## HTML Violations

Reference `catalogs/html-to-platform.dictionary.json`:

| Violation | Fix |
|-----------|-----|
| `<div>` | `<Stack>`, `<Box>`, `<Card>` |
| `<span>` | `<Text>` |
| `<button>` | `<Button>` |
| `<input>` | `<Textfield>` |
| `<table>` | `<Table>`, `<DataTable>` |
| `<form>` | `<SchemaForm>` |
| `<h1-h6>` | `<Heading level={n}>` |
| `<p>` | `<Paragraph>` |
| `<ul/li>` | `<List>` |

## Audit Report Template

```markdown
# Audit Report: <app-name>
Date: <date>

## Summary
| Category | Status | Issues |
|----------|--------|--------|
| Foundation | ✅/❌ | <count> |
| Components | ✅/❌ | <count> |
| Design Tokens | ✅/❌ | <count> |
| Gazetteer | ✅/❌ | <count> |

## Critical Issues
<list of critical issues with file:line>

## Remediation Steps
1. <step>
2. <step>
```

## Severity Levels

| Level | Action |
|-------|--------|
| CRITICAL | Must fix immediately |
| ERROR | Fix before merge |
| WARNING | Fix before release |
| INFO | Consider fixing |

## Complete Audit Command

Run all audits:
```bash
# Foundation
node packages/gazetteer/scripts/validate-foundation.mjs apps/<name>

# Examples
node packages/gazetteer/scripts/validate-examples.mjs

# TypeScript
pnpm typecheck

# Lint
pnpm lint

# Tests
pnpm test:all
```
