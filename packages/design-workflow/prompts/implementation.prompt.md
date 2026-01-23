# Implementation Prompt

You are implementing **{{sectionName}}** for **{{productName}}**.

## Tech Stack

- **UI Components**: @xala-technologies/platform-ui
- **Design System**: Designsystemet (Norwegian)
- **Framework**: React 18+
- **Language**: TypeScript

## Setup

```bash
# Install from GitHub Packages
pnpm add @xala-technologies/platform-ui

# Configure .npmrc
echo "@xala-technologies:registry=https://npm.pkg.github.com" >> .npmrc
```

```typescript
// app/layout.tsx or _app.tsx - import once
import '@xala-technologies/platform-ui/styles.css';
```

## Required Imports

```typescript
{{imports}}
```

## Type Definitions

```typescript
{{types}}
```

## Component Structure

{{#each components}}
### {{name}}

**Component**: `<{{component}}>`
**Import**: `{{import}}`
**Purpose**: {{purpose}}

```tsx
<{{component}}
  {{#each props}}
  {{@key}}="{{this}}"
  {{/each}}
>
  {/* Content */}
</{{component}}>
```

{{/each}}

## States to Implement

### Loading State
```tsx
function {{sectionName}}Loading() {
  return (
    <Card data-color="neutral">
      {/* Skeleton or spinner */}
    </Card>
  );
}
```

### Empty State
```tsx
function {{sectionName}}Empty() {
  return (
    <Card data-color="neutral">
      <p>No data yet</p>
      <Button data-color="accent">Create First</Button>
    </Card>
  );
}
```

### Error State
```tsx
function {{sectionName}}Error({ error }: { error: string }) {
  return (
    <Card data-color="neutral">
      <Badge data-color="brand3">Error</Badge>
      <p>{error}</p>
      <Button>Retry</Button>
    </Card>
  );
}
```

### Populated State
```tsx
function {{sectionName}}({ data }: { data: {{dataType}}[] }) {
  return (
    <Card>
      {/* Main content */}
    </Card>
  );
}
```

## File Structure

```
src/
└── sections/
    └── {{sectionSlug}}/
        ├── {{sectionName}}.tsx        # Main component
        ├── {{sectionName}}.test.tsx   # Tests
        ├── {{sectionName}}.stories.tsx # Storybook
        └── components/
            └── [SubComponents].tsx
```

## Accessibility Checklist

- [ ] All interactive elements are keyboard accessible
- [ ] Focus order follows visual order
- [ ] Focus indicators are visible
- [ ] Images have alt text
- [ ] Form fields have labels
- [ ] Error messages are announced to screen readers
- [ ] Color is not the only indicator of state
- [ ] Supports prefers-reduced-motion

## Testing Requirements

```typescript
import { render, screen } from '@testing-library/react';
import { {{sectionName}} } from './{{sectionName}}';

describe('{{sectionName}}', () => {
  it('renders loading state', () => {
    render(<{{sectionName}} isLoading />);
    // Assert loading indicator
  });

  it('renders empty state', () => {
    render(<{{sectionName}} data={[]} />);
    // Assert empty message
  });

  it('renders populated state', () => {
    render(<{{sectionName}} data={mockData} />);
    // Assert content displayed
  });

  it('renders error state', () => {
    render(<{{sectionName}} error="Failed to load" />);
    // Assert error message
  });

  it('is keyboard navigable', () => {
    render(<{{sectionName}} data={mockData} />);
    // Assert tab navigation works
  });
});
```
