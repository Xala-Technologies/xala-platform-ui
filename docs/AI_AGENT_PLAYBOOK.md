# AI Agent Playbook: Xala Platform UI

**Complete translation dictionary and decision guide for AI coding agents building with Xala Platform UI**

---

## Quick Reference

**Package:** `@xala-technologies/platform-ui`  
**Based on:** Norwegian Designsystemet  
**Architecture:** 3-tier (primitives → components → layouts)

---

## 🎯 Golden Rules

### 1. NO Raw HTML Elements
```tsx
// ❌ FORBIDDEN
<div className="card">
  <h1>Title</h1>
  <button onClick={handleClick}>Click</button>
</div>

// ✅ REQUIRED
import { Card, Heading, Button } from '@xala-technologies/platform-ui/primitives';

<Card>
  <Heading level={1} data-size="large">Title</Heading>
  <Button onClick={handleClick}>Click</Button>
</Card>
```

### 2. NO Custom CSS
```tsx
// ❌ FORBIDDEN
<div style={{ color: 'red', padding: '16px' }} className="my-custom-class" />

// ✅ REQUIRED - Use data attributes
<Box data-color="danger" data-size="medium" />
```

### 3. Use Design Tokens
```tsx
// ❌ FORBIDDEN
style={{ fontSize: '14px', color: '#333' }}

// ✅ REQUIRED
data-size="small" data-color="subtle"
```

---

## 📖 HTML → Designsystemet Translation Table

### Text Elements

| HTML | Designsystemet | Import | Example |
|------|----------------|--------|---------|
| `<h1>` - `<h6>` | `<Heading level={1-6}>` | `primitives` | `<Heading level={2} data-size="medium">Title</Heading>` |
| `<p>` | `<Paragraph>` | `primitives` | `<Paragraph data-size="medium">Text</Paragraph>` |
| `<span>` | `<Label>` or `<Paragraph>` | `primitives` | `<Label data-size="small">Label</Label>` |
| `<strong>` | `<Paragraph data-weight="strong">` | `primitives` | `<Paragraph data-weight="strong">Bold</Paragraph>` |
| `<em>` | `<Paragraph data-style="italic">` | `primitives` | `<Paragraph data-style="italic">Italic</Paragraph>` |
| `<code>` | `<CodeBlock>` | `components` | `<CodeBlock language="typescript">{code}</CodeBlock>` |

### Layout Elements

| HTML | Designsystemet | Import | Example |
|------|----------------|--------|---------|
| `<div>` (container) | `<Box>` or `<Container>` | `primitives` | `<Box data-padding="medium">...</Box>` |
| `<div>` (card-like) | `<Card>` | `primitives` | `<Card data-color="neutral">...</Card>` |
| `<main>` | `<PageContainer>` | `components` | `<PageContainer>...</PageContainer>` |
| `<section>` | `<Card>` or `<Box>` | `primitives` | `<Card as="section">...</Card>` |
| `<article>` | `<Card>` | `primitives` | `<Card as="article">...</Card>` |
| `<aside>` | `<Box>` | `primitives` | `<Box as="aside">...</Box>` |
| `<header>` | `<Box>` | `primitives` | `<Box as="header">...</Box>` |
| `<footer>` | `<Box>` | `primitives` | `<Box as="footer">...</Box>` |

### Interactive Elements

| HTML | Designsystemet | Import | Example |
|------|----------------|--------|---------|
| `<button>` | `<Button>` | `primitives` | `<Button variant="primary">Click</Button>` |
| `<a>` | `<Link>` | `primitives` | `<Link href="/path">Link</Link>` |
| `<input type="text">` | `<Textfield>` | `primitives` | `<Textfield label="Name" />` |
| `<input type="email">` | `<Textfield type="email">` | `primitives` | `<Textfield type="email" label="Email" />` |
| `<input type="password">` | `<Textfield type="password">` | `primitives` | `<Textfield type="password" label="Password" />` |
| `<input type="number">` | `<Textfield type="number">` | `primitives` | `<Textfield type="number" label="Age" />` |
| `<input type="checkbox">` | `<Checkbox>` | `primitives` | `<Checkbox>Accept terms</Checkbox>` |
| `<input type="radio">` | `<Radio>` | `primitives` | `<Radio name="option">Option 1</Radio>` |
| `<select>` | `<Select>` | `primitives` | `<Select label="Choose"><option>...</option></Select>` |
| `<textarea>` | `<Textarea>` | `primitives` | `<Textarea label="Description" rows={4} />` |

### List Elements

| HTML | Designsystemet | Import | Example |
|------|----------------|--------|---------|
| `<ul>`, `<ol>`, `<li>` | `<List>` | `primitives` | `<List><ListItem>Item</ListItem></List>` |
| Complex list | `<DataTable>` | `components` | `<DataTable columns={cols} data={rows} />` |

### Table Elements

| HTML | Designsystemet | Import | Example |
|------|----------------|--------|---------|
| `<table>` | `<DataTable>` | `components` | `<DataTable columns={[...]} data={[...]} />` |

### Media Elements

| HTML | Designsystemet | Import | Example |
|------|----------------|--------|---------|
| `<img>` | `<Image>` | `primitives` | `<Image src="/path.jpg" alt="Description" />` |
| Image gallery | `<ImageGallery>` | `components` | `<ImageGallery images={[...]} />` |
| Image slider | `<ImageSlider>` | `components` | `<ImageSlider images={[...]} />` |

---

## 🧭 Component Decision Tree

### "I need to display text..."

**Single line heading?**
- → `<Heading level={1-6}>`

**Paragraph text?**
- → `<Paragraph>`

**Label/small text?**
- → `<Label>`

**Code snippet?**
- → `<CodeBlock>` (components)

---

### "I need a layout..."

**Simple container?**
- Padding/spacing → `<Box>`
- Centered content → `<Container>`

**Card/panel?**
- → `<Card>`

**Application shell?**
- Full app layout → `<AppLayout>` (layouts)
- Dashboard → `<DashboardLayout>` (layouts)

**Page layout?**
- → `<PageContainer>` (components)

---

### "I need a form..."

**Single field?**
- Text input → `<Textfield>`
- Dropdown → `<Select>`
- Checkbox → `<Checkbox>`
- Radio button → `<Radio>`
- Toggle → `<Switch>`
- Date picker → `<DatePicker>`

**Multiple fields (simple)?**
- → Combine primitives in `<FormSection>` (components)

**Complex form with validation?**
- Schema-driven → `<SchemaForm>` (components)
- Multi-step → `<FormWizardModal>` (components)
- Dynamic fields → `<DynamicForm>` (components)

---

### "I need to display data..."

**Simple list?**
- → `<List>` with `<ListItem>` (primitives)

**Cards in grid?**
- → `<Grid>` + `<Card>` (primitives)
- Resource cards → `<ResourceGrid>` (components)

**Table/data grid?**
- → `<DataTable>` (components)

**Calendar/schedule?**
- → `<ResourceCalendar>` (components)
- Slot selection → `<SlotCalendar>` (components)

**Statistics?**
- Simple stats → `<StatCard>` (components)
- Multiple stats → `<StatsGrid>` (components)

---

### "I need user interaction..."

**Button/action?**
- Single action → `<Button>`
- Multiple actions → `<ActionButtonGroup>` (components)
- Dropdown actions → `<ActionMenu>` (components)

**Modal/dialog?**
- Simple modal → `<Modal>` (components)
- Confirmation → `<ConfirmDialog>` (components)
- Side panel → `<Drawer>` (components)

**Feedback/notification?**
- Alert message → `<Alert>` (components)
- Toast notification → `<Toast>` (components)
- Status banner → `<StatusBanner>` (components)

**Navigation?**
- Tabs → `<Tabs>` (primitives)
- Breadcrumbs → `<Breadcrumbs>` (components)
- Sidebar → `<DashboardSidebar>` (layouts)

---

## 📦 Import Patterns

### Recommended (Tree-shakeable)

```typescript
// Primitives - basic building blocks
import { Button, Card, Heading, Paragraph } from '@xala-technologies/platform-ui/primitives';

// Components - composed components
import { DataTable, Modal, FormSection } from '@xala-technologies/platform-ui/components';

// Layouts - application shells
import { AppLayout, DashboardLayout } from '@xala-technologies/platform-ui/layouts';

// Features - domain-specific
import { BookingForm } from '@xala-technologies/platform-ui/features/booking';
import { CalendarView } from '@xala-technologies/platform-ui/features/calendar';
```

### Avoid (Imports entire library)

```typescript
// ❌ Don't do this
import { Button } from '@xala-technologies/platform-ui';
```

---

## 🎨 Styling with Data Attributes

### Size

```tsx
data-size="small"   // Compact
data-size="medium"  // Default
data-size="large"   // Prominent
```

### Color

```tsx
data-color="neutral"   // Default
data-color="accent"    // Primary brand
data-color="success"   // Positive actions
data-color="danger"    // Destructive actions
data-color="warning"   // Caution
data-color="info"      // Informational
```

### Spacing

```tsx
data-padding="none"
data-padding="small"
data-padding="medium"
data-padding="large"

data-gap="small"       // For Grid, Stack
data-gap="medium"
data-gap="large"
```

### Text

```tsx
data-weight="regular"
data-weight="medium"
data-weight="strong"

data-align="left"
data-align="center"
data-align="right"
```

---

## 🔧 Common Recipes

### Recipe 1: Simple Form

```tsx
import { Card, Heading, Textfield, Button, FormSection } from '@xala-technologies/platform-ui/primitives';

function ContactForm() {
  return (
    <Card>
      <Heading level={2}>Contact Us</Heading>
      <FormSection>
        <Textfield label="Name" required />
        <Textfield type="email" label="Email" required />
        <Textarea label="Message" rows={4} />
        <Button variant="primary">Submit</Button>
      </FormSection>
    </Card>
  );
}
```

### Recipe 2: Data Table

```tsx
import { DataTable } from '@xala-technologies/platform-ui/components';

function UsersList({ users }) {
  const columns = [
    { key: 'name', header: 'Name' },
    { key: 'email', header: 'Email' },
    { key: 'role', header: 'Role' },
  ];

  return <DataTable columns={columns} data={users} />;
}
```

### Recipe 3: Card Grid

```tsx
import { Grid, Card, Heading, Paragraph } from '@xala-technologies/platform-ui/primitives';

function ProductGrid({ products }) {
  return (
    <Grid cols={3} data-gap="medium">
      {products.map(product => (
        <Card key={product.id}>
          <Heading level={3}>{product.name}</Heading>
          <Paragraph>{product.description}</Paragraph>
        </Card>
      ))}
    </Grid>
  );
}
```

### Recipe 4: Modal Dialog

```tsx
import { Modal, Button, Heading, Paragraph } from '@xala-technologies/platform-ui';

function DeleteConfirmation({ isOpen, onClose, onConfirm, itemName }) {
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <Heading level={2}>Confirm Deletion</Heading>
      <Paragraph>Are you sure you want to delete "{itemName}"?</Paragraph>
      <Button variant="danger" onClick={onConfirm}>Delete</Button>
      <Button variant="secondary" onClick={onClose}>Cancel</Button>
    </Modal>
  );
}
```

### Recipe 5: Dashboard Layout

```tsx
import { AppLayout } from '@xala-technologies/platform-ui/layouts';
import { Card, Heading } from '@xala-technologies/platform-ui/primitives';

function Dashboard() {
  return (
    <AppLayout
      sidebar={<DashboardSidebar />}
      header={<DashboardHeader />}
    >
      <Card>
        <Heading level={1}>Dashboard</Heading>
        {/* Dashboard content */}
      </Card>
    </AppLayout>
  );
}
```

---

## ✅ Validation Checklist

Before committing code, verify:

- [ ] **No raw HTML elements** (div, span, p, h1-h6, button, etc.)
- [ ] **No inline styles** (except `var(--ds-*)` tokens if absolutely necessary)
- [ ] **No custom CSS classes** (only `ds-` prefixed allowed)
- [ ] **All text uses Heading/Paragraph/Label**
- [ ] **All containers use Box/Card/Container**
- [ ] **All forms use Textfield/Select/Checkbox/etc.**
- [ ] **Imports use subpaths** (`/primitives`, `/components`, `/layouts`)
- [ ] **Data attributes for styling** (data-size, data-color, etc.)
- [ ] **TypeScript types imported** when needed

---

## 🚫 Common Mistakes to Avoid

### Mistake 1: Using HTML Directly

```tsx
// ❌ WRONG
<div className="card">
  <h2>Title</h2>
  <p>Description</p>
</div>

// ✅ CORRECT
<Card>
  <Heading level={2}>Title</Heading>
  <Paragraph>Description</Paragraph>
</Card>
```

### Mistake 2: Custom Styling

```tsx
// ❌ WRONG
<div style={{ padding: '20px', backgroundColor: '#f5f5f5' }}>...</div>

// ✅ CORRECT
<Box data-padding="large" data-color="neutral">...</Box>
```

### Mistake 3: Wrong Import Path

```tsx
// ❌ WRONG (imports entire lib)
import { Button } from '@xala-technologies/platform-ui';

// ✅ CORRECT (tree-shakeable)
import { Button } from '@xala-technologies/platform-ui/primitives';
```

### Mistake 4: Not Using Components

```tsx
// ❌ WRONG
<table>
  <thead>...</thead>
  <tbody>...</tbody>
</table>

// ✅ CORRECT
import { DataTable } from '@xala-technologies/platform-ui/components';
<DataTable columns={[...]} data={[...]} />
```

---

## 🎓 When to Use Each Layer

### Primitives Layer
Use when you need:
- Basic building blocks
- Single-purpose components
- Designsystemet wrappers
- Maximum flexibility

**Examples:** Button, Card, Textfield, Heading, Paragraph

### Components Layer
Use when you need:
- Composed functionality
- Business logic patterns
- Multiple primitives combined
- Form handling, tables, modals

**Examples:** DataTable, SchemaForm, Modal, ImageGallery

### Layouts Layer
Use when you need:
- Application shells
- Page-level layouts
- Navigation structures
- Dashboard templates

**Examples:** AppLayout, DashboardLayout, PageContainer

### Features Layer
Use when you need:
- Domain-specific UI
- Business feature components
- Complete workflows

**Examples:** BookingForm, CalendarView, ReviewList

---

## 📚 Quick Reference Cards

### Button Variants

```tsx
<Button variant="primary">Primary Action</Button>
<Button variant="secondary">Secondary Action</Button>
<Button variant="tertiary">Tertiary Action</Button>
<Button variant="danger">Delete</Button>
```

### Card Colors

```tsx
<Card data-color="neutral">Default</Card>
<Card data-color="accent">Highlighted</Card>
<Card data-color="success">Success state</Card>
<Card data-color="warning">Warning state</Card>
<Card data-color="danger">Error state</Card>
```

### Heading Levels

```tsx
<Heading level={1} data-size="xlarge">Page Title</Heading>
<Heading level={2} data-size="large">Section</Heading>
<Heading level={3} data-size="medium">Subsection</Heading>
<Heading level={4} data-size="small">Detail</Heading>
```

---

## 🔍 Finding the Right Component

**Search by use case:**

1. **"I need a form"** → Look in `components` (SchemaForm, FormSection)
2. **"I need navigation"** → Look in `layouts` (AppLayout, DashboardSidebar)
3. **"I need basic elements"** → Look in `primitives` (Button, Card, Textfield)
4. **"I need complex data display"** → Look in `components` (DataTable, ImageGallery)
5. **"I need domain features"** → Look in `features` (BookingForm, CalendarView)

**Pro tip:** If unsure, start with primitives and compose upward!

---

## 🎯 Summary

1. **Never use raw HTML** - Always use Designsystemet components
2. **Import from subpaths** - `/primitives`, `/components`, `/layouts`, `/features`
3. **Style with data attributes** - `data-size`, `data-color`, etc.
4. **Follow the decision tree** - Start simple, compose as needed
5. **Use recipes** - Copy from common patterns above
6. **Validate before commit** - Check the checklist above

---

**This playbook is your single source of truth for building UIs with Xala Platform UI.**
