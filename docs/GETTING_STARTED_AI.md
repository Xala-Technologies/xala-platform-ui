# Getting Started for AI Agents

Quick start guide for AI coding agents working with Xala Platform UI.

## Core Rules

1. **NO raw HTML elements** - Use Designsystemet components only
2. **NO custom CSS** - Use data attributes for styling
3. **Import from subpaths** - `/primitives`, `/components`, `/layouts`

## Architecture

```
@xala-technologies/platform-ui/
├── primitives/    ← Button, Card, Textfield, Heading, etc.
├── components/    ← DataTable, Modal, Forms, etc.
├── layouts/       ← AppLayout, DashboardLayout
└── features/      ← Booking, Calendar, Reviews, etc.
```

## Quick Examples

### Text
```tsx
// ❌ <h1>Title</h1>
// ✅
<Heading level={1}>Title</Heading>
```

### Container
```tsx
// ❌ <div className="card">
// ✅
<Card>...</Card>
```

### Button
```tsx
// ❌ <button onClick={fn}>Click</button>
// ✅
<Button onClick={fn}>Click</Button>
```

### Form
```tsx
// ❌ <input type="text" />
// ✅
<Textfield label="Name" />
```

## Import Pattern

```typescript
import { Button, Card } from '@xala-technologies/platform-ui/primitives';
import { DataTable, Modal } from '@xala-technologies/platform-ui/components';
import { AppLayout } from '@xala-technologies/platform-ui/layouts';
```

## Validation Checklist

Before commit:
- [ ] No `<div>`, `<span>`, `<p>`, `<h1-h6>`, `<button>`, etc.
- [ ] No `style={{...}}` or `className="custom"`
- [ ] All imports use subpaths (`/primitives`, `/components`, `/layouts`)
- [ ] Styling uses data attributes (`data-size`, `data-color`)

## Full Documentation

👉 **[AI Agent Playbook](./AI_AGENT_PLAYBOOK.md)** - Complete translation table, decision trees, and recipes
