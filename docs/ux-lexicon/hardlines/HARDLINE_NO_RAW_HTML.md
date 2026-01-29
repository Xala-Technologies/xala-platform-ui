# HARDLINE: No Raw HTML in Application Pages

> **Severity**: CRITICAL
> **Enforcement**: AUTOMATED (ESLint + verify-design-tokens)
> **Effective Date**: 2026-01-29

---

## Overview

Application pages MUST use Platform UI components exclusively. Raw HTML elements are forbidden in page-level code.

---

## Forbidden Elements

The following HTML elements are **banned** in application page code:

| Element | Replacement |
|---------|-------------|
| `<div>` | `Stack`, `Box`, `Card`, `Container` |
| `<span>` | `Paragraph`, `Badge`, inline text |
| `<p>` | `Paragraph` |
| `<h1>` - `<h6>` | `Heading level={n}` |
| `<button>` | `Button` |
| `<a>` | `Link` |
| `<input>` | `Textfield`, `Checkbox`, `Radio` |
| `<select>` | `Select`, `NativeSelect`, `SearchableSelect` |
| `<textarea>` | `Textarea` |
| `<table>` | `DataTable`, `Table` |
| `<ul>`, `<ol>` | `List`, `Stack` |
| `<nav>` | `Navigation` |
| `<section>` | `ContentSection`, `Card` |
| `<header>` | `DashboardHeader`, `AppHeader` |
| `<footer>` | Shell footer slot |

---

## Exceptions

Raw HTML is allowed ONLY in:

1. **Primitive component implementations** (`src/primitives/`)
2. **Third-party library integrations** (where unavoidable)
3. **SVG icons** (within Icon components)

---

## Enforcement

### ESLint Rule

```json
{
  "rules": {
    "no-restricted-syntax": [
      "error",
      {
        "selector": "JSXElement[openingElement.name.name=/^(div|span|p|h[1-6]|section|article|header|footer|nav|button|input|select|textarea|table|tr|td|th|thead|tbody|ul|ol|li)$/]",
        "message": "Raw HTML elements are forbidden. Use Platform UI components instead. See UX Lexicon HTML_TRANSLATION_TABLE.mdx"
      }
    ]
  }
}
```

### verify-design-tokens Script

```bash
pnpm verify:design-tokens

# Output for violations:
# ERROR: Raw HTML element at src/pages/UserList.tsx:42
#   Found: <div className="container">
#   Use: Stack, Box, or Card from @xala-technologies/platform-ui
```

---

## Migration Guide

### Before (❌ Forbidden)

```tsx
export function UserCard({ user }) {
  return (
    <div className="user-card">
      <div className="header">
        <h3>{user.name}</h3>
        <span className="badge">{user.role}</span>
      </div>
      <p>{user.email}</p>
      <button onClick={handleEdit}>Edit</button>
    </div>
  );
}
```

### After (✅ Correct)

```tsx
import { Card, Stack, Heading, Paragraph, Badge, Button } from '@xala-technologies/platform-ui';

export function UserCard({ user }) {
  return (
    <Card data-color="neutral">
      <Stack direction="horizontal" justify="space-between">
        <Heading level={3} data-size="sm">{user.name}</Heading>
        <Badge data-color="accent">{user.role}</Badge>
      </Stack>
      <Paragraph>{user.email}</Paragraph>
      <Button variant="secondary" onClick={handleEdit}>Edit</Button>
    </Card>
  );
}
```

---

## Rationale

1. **Consistency** - All UI follows design system patterns
2. **Accessibility** - Platform UI components are WCAG 2.2 AA compliant
3. **Maintainability** - Centralized styling via design tokens
4. **Theming** - Dark mode, color schemes work automatically
5. **i18n** - Components support RTL and text expansion

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-01-29 | UX Lexicon | Initial creation |
