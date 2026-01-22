# Designsystemet Design Tokens Guide

> **Critical Rule:** This UI package follows Designsystemet design system strictly. No raw HTML, no custom CSS, no inline styles.

## Core Principles

### 1. Use Designsystemet Components
Always use semantic components from `@digdir/designsystemet-react`:

```typescript
// ✅ CORRECT
import { Card, Heading, Paragraph, Button } from '@digdir/designsystemet-react';

export function MyComponent() {
  return (
    <Card data-color="neutral">
      <Heading level={2} data-size="large">Title</Heading>
      <Paragraph data-size="medium">Content</Paragraph>
      <Button data-color="accent">Action</Button>
    </Card>
  );
}
```

```typescript
// ❌ WRONG - Raw HTML
export function MyComponent() {
  return (
    <div className="card">
      <h2>Title</h2>
      <p>Content</p>
      <button>Action</button>
    </div>
  );
}
```

### 2. Use Data Attributes for Styling
Designsystemet uses data attributes for theming:

```typescript
// ✅ CORRECT - Data attributes
<Button 
  data-color="accent"     // Color variant
  data-size="medium"      // Size variant
  data-variant="primary"  // Style variant
>
  Click me
</Button>
```

```typescript
// ❌ WRONG - Inline styles
<button style={{ 
  padding: '12px 24px',
  backgroundColor: '#0062BA',
  color: 'white'
}}>
  Click me
</button>
```

### 3. Design Token Variables
When you need custom styling, use design token CSS variables:

```typescript
// ✅ CORRECT - Design token variables
<Card 
  data-color="neutral"
  style={{
    padding: 'var(--ds-spacing-4)',
    gap: 'var(--ds-spacing-2)',
    borderRadius: 'var(--ds-border-radius-medium)',
  }}
>
  Content
</Card>
```

```typescript
// ❌ WRONG - Hard-coded values
<div style={{
  padding: '16px',
  gap: '8px',
  borderRadius: '8px',
}}>
  Content
</div>
```

## Available Design Tokens

### Spacing
```css
var(--ds-spacing-1)  /* 4px */
var(--ds-spacing-2)  /* 8px */
var(--ds-spacing-3)  /* 12px */
var(--ds-spacing-4)  /* 16px */
var(--ds-spacing-5)  /* 20px */
var(--ds-spacing-6)  /* 24px */
var(--ds-spacing-8)  /* 32px */
var(--ds-spacing-10) /* 40px */
```

### Colors
```css
/* Use data-color attribute instead */
data-color="accent"
data-color="neutral"
data-color="success"
data-color="danger"
data-color="warning"
data-color="info"
```

### Sizes
```css
/* Use data-size attribute instead */
data-size="xsmall"
data-size="small"
data-size="medium"
data-size="large"
data-size="xlarge"
```

### Typography
```css
var(--ds-font-size-heading-xlarge)
var(--ds-font-size-heading-large)
var(--ds-font-size-heading-medium)
var(--ds-font-size-heading-small)
var(--ds-font-size-body-large)
var(--ds-font-size-body-medium)
var(--ds-font-size-body-small)
```

### Border Radius
```css
var(--ds-border-radius-small)
var(--ds-border-radius-medium)
var(--ds-border-radius-large)
var(--ds-border-radius-xlarge)
var(--ds-border-radius-full)
```

## Component Mapping

### Replace Raw HTML with Designsystemet Components

| Raw HTML | Designsystemet Component |
|----------|--------------------------|
| `<div>` | `<Card>`, `<Box>`, or semantic component |
| `<h1>` - `<h6>` | `<Heading level={1-6}>` |
| `<p>` | `<Paragraph>` |
| `<button>` | `<Button>` |
| `<a>` | `<Link>` |
| `<input>` | `<Textfield>` |
| `<select>` | `<Select>` |
| `<label>` | `<Label>` |
| `<ul>`, `<ol>` | `<List>` |

## ESLint Enforcement

The package has ESLint rules that catch violations:

### Caught Violations
```typescript
// ❌ Raw HTML elements
<div>Content</div>
<h1>Title</h1>
<p>Text</p>
<button>Click</button>

// ❌ Inline styles
<Card style={{ padding: '20px' }}>

// ❌ Custom classes (warning)
<div className="my-custom-class">
```

### Allowed Patterns
```typescript
// ✅ Designsystemet components
<Card data-color="neutral">
<Heading level={1} data-size="large">
<Paragraph data-size="medium">
<Button data-color="accent">

// ✅ Design token variables
<Card style={{ padding: 'var(--ds-spacing-4)' }}>

// ✅ Designsystemet classes
<div className="ds-stack">
```

## Common Patterns

### Layout
```typescript
// ✅ CORRECT - Using Stack for vertical layout
import { Stack } from '@digdir/designsystemet-react';

<Stack gap="4" direction="column">
  <Heading level={2}>Title</Heading>
  <Paragraph>Content</Paragraph>
</Stack>
```

### Cards
```typescript
// ✅ CORRECT - Using Card component
import { Card } from '@digdir/designsystemet-react';

<Card data-color="neutral" data-size="medium">
  <Card.Header>
    <Heading level={3}>Card Title</Heading>
  </Card.Header>
  <Card.Content>
    <Paragraph>Card content</Paragraph>
  </Card.Content>
</Card>
```

### Forms
```typescript
// ✅ CORRECT - Using Designsystemet form components
import { Textfield, Label, Button } from '@digdir/designsystemet-react';

<form>
  <Label htmlFor="name">Name</Label>
  <Textfield 
    id="name"
    data-size="medium"
    placeholder="Enter your name"
  />
  <Button type="submit" data-color="accent">
    Submit
  </Button>
</form>
```

## When You Need Custom Styling

### Option 1: Extend Designsystemet Component
```typescript
import { Card } from '@digdir/designsystemet-react';

export function CustomCard({ children }: Props) {
  return (
    <Card 
      data-color="neutral"
      style={{
        padding: 'var(--ds-spacing-6)',
        gap: 'var(--ds-spacing-3)',
      }}
    >
      {children}
    </Card>
  );
}
```

### Option 2: Create Wrapper Component
```typescript
import { Card, Stack } from '@digdir/designsystemet-react';

export function FeatureCard({ title, description, icon }: Props) {
  return (
    <Card data-color="accent" data-size="medium">
      <Stack gap="2" direction="column">
        {icon}
        <Heading level={3} data-size="medium">{title}</Heading>
        <Paragraph data-size="small">{description}</Paragraph>
      </Stack>
    </Card>
  );
}
```

## Resources

- [Designsystemet Documentation](https://designsystemet.no/)
- [Designsystemet Components](https://designsystemet.no/komponenter)
- [Design Tokens](https://designsystemet.no/grunnleggende/designelementer/design-tokens)
- [Storybook Examples](http://localhost:6006) (run `pnpm storybook`)

## Questions?

If you're unsure whether something follows Designsystemet:
1. Check if there's a Designsystemet component for it
2. Use design token variables if you need custom values
3. Ask in code review if still unsure
