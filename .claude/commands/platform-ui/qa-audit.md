---
description: Deep audit of code and design compliance
---

# /qa-audit

Performs a deep audit of code quality, design compliance, and architecture.

## Usage

```
/qa-audit [<target>] [--verbose]
```

## What It Audits

### Design Token Compliance
- No hardcoded colors (#fff, rgb())
- No hardcoded spacing (margin: 10px)
- All values from design tokens

### Platform UI Compliance
- No raw HTML elements
- All components from platform-ui
- Correct component usage

### Architecture Compliance
- Thin App pattern
- No domain logic in app layer
- All behavior in Gazetteer specs
- SDK usage patterns

### i18n Compliance
- All strings externalized
- No hardcoded text
- Translation keys valid

### Accessibility
- ARIA attributes
- Keyboard navigation
- Screen reader support

## Audit Scripts

```bash
# Design tokens
pnpm verify:design-tokens

# HTML violations
node packages/gazetteer/scripts/audit-html.mjs

# Component usage
node packages/gazetteer/scripts/audit-components.mjs
```

## Audit Report

```
=== DESIGN TOKEN AUDIT ===
Files scanned: 234
Violations: 0

=== PLATFORM UI AUDIT ===
Raw HTML elements: 0
Invalid components: 0

=== ARCHITECTURE AUDIT ===
Thin App violations: 0
SDK pattern: ✅

=== i18n AUDIT ===
Missing keys: 0
Hardcoded text: 0

AUDIT: PASSED
```

## Severity Levels

| Level | Action |
|-------|--------|
| ERROR | Must fix before deploy |
| WARNING | Fix before release |
| INFO | Best practice suggestions |

## Next Steps
After audit passes, run:
- `/deploy-build` to build for production
