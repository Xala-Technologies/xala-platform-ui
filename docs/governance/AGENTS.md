# UI Package AI Agents Guide

> **Last Updated:** 2026-01-22  
> **Repository:** xala-platform-ui

## Overview

This repository contains **@xala-technologies/platform-ui** - a standalone UI component library built on Norwegian Designsystemet.

**This package is UI-ONLY. No business logic, no API calls, no domain knowledge.**

---

## Critical Rules

### RULE 1: UI Components Only
This package contains ONLY:
- ✅ React components
- ✅ Themes and design tokens
- ✅ CSS styles
- ✅ TypeScript types for UI props
- ✅ Storybook documentation

### RULE 2: No Business Logic
This package must NEVER contain:
- ❌ API calls or SDK usage
- ❌ Authentication logic
- ❌ Business rules or domain logic
- ❌ Database queries
- ❌ i18n translations (use platform package)

### RULE 3: Designsystemet Design Tokens Only
Components must follow Designsystemet standards:
- **No raw HTML** - Use Designsystemet components (Card, Heading, Paragraph, Button, etc.)
- **No inline styles** - Use data attributes (data-size, data-color, data-spacing)
- **No custom CSS** - Only design token variables (`var(--ds-*)`)
- **No custom classes** - Only `ds-` prefixed classes from Designsystemet

### RULE 4: Pure Presentation
Components should:
- Accept data via props
- Render UI based on props
- Emit events via callbacks
- Have no side effects

---

## What Goes Here vs Platform

| Feature | UI Package | Platform Package |
|---------|------------|------------------|
| Button component | ✅ | ❌ |
| Form validation | ❌ | ✅ |
| API client | ❌ | ✅ |
| Theme tokens | ✅ | ❌ |
| Authentication | ❌ | ✅ |
| i18n translations | ❌ | ✅ |
| Icons | ✅ | ❌ |
| SDK hooks | ❌ | ✅ |

---

## Component Guidelines

### ✅ Good Component Example
```typescript
// src/primitives/Button.tsx
import { Button as DSButton } from '@digdir/designsystemet-react';

export interface ButtonProps {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
  disabled?: boolean;
}

export function Button({ children, onClick, variant, disabled }: ButtonProps) {
  return (
    <DSButton 
      data-color={variant === 'primary' ? 'accent' : 'neutral'}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </DSButton>
  );
}
```

### ❌ Bad Component Examples

**Example 1: Business Logic Violation**
```typescript
import { useAuth } from '@xala-technologies/platform/auth';
import { fetchUserData } from '@xala-technologies/platform/sdk';

export function UserProfile() {
  const { user } = useAuth(); // ❌ No auth logic in UI
  const data = fetchUserData(user.id); // ❌ No API calls in UI
  
  if (!user.hasPermission('view_profile')) { // ❌ No business rules in UI
    return null;
  }
  
  return <div>{data.name}</div>;
}
```

**Example 2: Design System Violations**
```typescript
// ❌ WRONG - Raw HTML and inline styles
export function ProfileCard({ name, email }: ProfileProps) {
  return (
    <div style={{ padding: '20px', border: '1px solid #ccc' }}> {/* ❌ Raw div + inline styles */}
      <h2 style={{ color: '#0062BA' }}>{name}</h2> {/* ❌ Raw h2 + inline styles */}
      <p className="custom-email">{email}</p> {/* ❌ Raw p + custom class */}
    </div>
  );
}
```

**Example 3: Correct Designsystemet Usage**
```typescript
// ✅ CORRECT - Designsystemet components and tokens
import { Card, Heading, Paragraph } from '@digdir/designsystemet-react';

export function ProfileCard({ name, email }: ProfileProps) {
  return (
    <Card data-color="neutral" data-size="medium">
      <Heading level={2} data-size="medium">{name}</Heading>
      <Paragraph data-size="medium">{email}</Paragraph>
    </Card>
  );
}
```

---

## Directory Structure

```
src/
├── primitives/      # Atomic Designsystemet wrappers
│   ├── Button.tsx
│   ├── Card.tsx
│   └── components.ts
├── composed/        # Multi-component compositions
│   ├── DataTable.tsx
│   ├── Modal.tsx
│   └── index.ts
├── blocks/          # Feature blocks
│   ├── NotificationBell.tsx
│   └── index.ts
├── patterns/        # Reusable UI patterns
│   ├── ResourceCard.tsx
│   └── index.ts
├── shells/          # Layout components
│   ├── AppLayout.tsx
│   └── index.ts
├── themes/          # Theme configurations
│   └── index.ts
├── tokens/          # Design tokens
│   └── index.ts
└── types/           # TypeScript types
    └── index.ts
```

---

## ESLint Rules (Simple & Focused)

This package has **minimal ESLint rules** focused on:
- React best practices
- TypeScript strict mode
- Accessibility (a11y)

**No complex governance rules** - those live in the platform package.

---

## Storybook

All components must have Storybook stories:

```typescript
// src/stories/Components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../primitives/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
  },
};
```

---

## Testing

Components should be:
- **Testable**: Accept props, return JSX
- **Accessible**: WCAG 2.1 AA compliant
- **Documented**: Have Storybook stories

---

## Publishing

This package is published to GitHub Packages:

```bash
# Build
pnpm build

# Publish (requires GITHUB_TOKEN)
pnpm publish
```

---

## Consuming This Package

**In other projects:**

```typescript
// Install
pnpm add @xala-technologies/platform-ui

// Use
import { Button, Card } from '@xala-technologies/platform-ui';
import { DataTable } from '@xala-technologies/platform-ui/composed';
import { AppLayout } from '@xala-technologies/platform-ui/shells';
```

---

## Validation Checklist

Before accepting ANY code:
- [ ] Is it a UI component? → ✅ ACCEPT
- [ ] Does it make API calls? → ❌ REJECT
- [ ] Does it have business logic? → ❌ REJECT
- [ ] Does it import from platform SDK? → ❌ REJECT
- [ ] Does it import from platform auth? → ❌ REJECT
- [ ] Is it pure presentation? → ✅ ACCEPT

---

## Links

- **Repository**: https://github.com/Xala-Technologies/xala-platform-ui
- **Platform Package**: https://github.com/Xala-Technologies/xala-platform
- **Designsystemet**: https://designsystemet.no/
- **Storybook**: Run `pnpm storybook` locally

---

## Questions?

- **UI component issues**: Create issue in this repository
- **Platform integration**: Check [xala-platform](https://github.com/Xala-Technologies/xala-platform)
- **Migration help**: See [UI_PACKAGE_MIGRATION.md](https://github.com/Xala-Technologies/xala-platform/blob/main/docs/UI_PACKAGE_MIGRATION.md)
