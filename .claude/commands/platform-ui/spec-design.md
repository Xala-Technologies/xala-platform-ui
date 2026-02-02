---
description: Define design system, tokens, shell, and UX lexicon
---

# /spec-design

Defines the design system and visual language. Third step in the Design OS process.

## What It Produces

1. **Design Tokens** - Colors, typography, spacing, shadows
2. **Application Shell** - Header, sidebar, layout structure
3. **UX Lexicon** - Standard UI patterns and vocabulary
4. **Theme Configuration** - Brandable theme setup

## Usage

```
/spec-design <product-name> [--theme xala|digilist|neutral]
```

## Process

### Step 1: Design Tokens
Define or use defaults:
- Brand colors (primary, accent)
- Semantic colors (success, warning, error)
- Typography scale
- Spacing scale (0-15)
- Border radius
- Shadows

### Step 2: Application Shell
Choose shell type:
- **Authenticated**: AppHeader + Sidebar + Content
- **Public**: Header + Hero + Content + Footer

Define:
- Logo placement
- Navigation structure
- User menu contents
- Footer links

### Step 3: UX Lexicon
Standard patterns from platform-ui:
- Form layouts (SchemaForm)
- Data display (DataTable, StatCard)
- Feedback (Toast, Modal, Alert)
- Navigation (Breadcrumb, Tabs)

### Step 4: Theme Configuration
```tsx
<ThemeProvider theme="xala" mode="light">
```

## Output

Create `specs/design.spec.json`:
```json
{
  "$schema": "@xala-technologies/gazetteer/schemas/design.spec.json",
  "theme": "xala",
  "tokens": { ... },
  "shell": {
    "type": "authenticated",
    "header": { "sticky": true },
    "sidebar": { "collapsible": true }
  },
  "lexicon": {
    "formLayout": "2-column",
    "tableFeatures": ["sort", "filter", "paginate"]
  }
}
```

## Foundation Reference

See `catalogs/FOUNDATION.md` for:
- Provider stack order
- Style import requirements
- Thin App pattern rules

## Next Steps
After `/spec-design`, run:
- `/create-app` to scaffold the application
