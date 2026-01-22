# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@xala-technologies/platform-ui` is a standalone React component library built on [Norwegian Designsystemet](https://designsystemet.no/). This package is **UI-only** - no business logic, API calls, authentication, or i18n.

## Commands

```bash
pnpm install          # Install dependencies
pnpm storybook        # Start Storybook dev server (port 6006)
pnpm build            # Build package (tsup)
pnpm dev              # Watch mode build
pnpm quality          # Run all checks (typecheck + lint + format:check)
pnpm typecheck        # TypeScript type checking
pnpm lint             # ESLint validation
pnpm lint:fix         # Auto-fix ESLint issues
pnpm format           # Format with Prettier
pnpm format:check     # Check formatting
pnpm test:storybook   # Run Storybook tests
```

## Architecture

Components are organized by complexity:

- **primitives/** - Thin Designsystemet wrappers (Button, Card, Input)
- **composed/** - Multi-component compositions (DataTable, Modal, Tabs)
- **blocks/** - Feature-specific UI blocks (NotificationBell, UserMenu, SearchBar)
- **patterns/** - Reusable UI patterns (ResourceCard, SlotCalendar, FormWizard)
- **shells/** - Layout components (AppLayout, DashboardLayout, DashboardSidebar)
- **pages/** - Page-level components
- **themes/** - Theme configurations
- **tokens/** - Design token extensions
- **types/** - TypeScript type definitions

## Critical Rules

### 1. No Business Logic
- Components receive data via props, emit events via callbacks
- No API calls, authentication, database queries, or i18n translations
- No imports from `@xala-technologies/platform`, `@xala-technologies/platform-schema`, or `@xala-technologies/governance`

### 2. Designsystemet Components Only
ESLint enforces these rules:
- **No raw HTML elements** - Use `Card`, `Heading`, `Paragraph`, `Button` from `@digdir/designsystemet-react`
- **No inline styles** - Use `data-size`, `data-color`, `data-spacing` attributes
- **No custom CSS classes** - Only `ds-` prefixed classes allowed
- Design token variables (`var(--ds-*)`) permitted when extending components

### Correct Component Pattern

```typescript
import { Card, Heading, Paragraph } from '@digdir/designsystemet-react';

export interface ProfileCardProps {
  name: string;
  email: string;
}

export function ProfileCard({ name, email }: ProfileCardProps) {
  return (
    <Card data-color="neutral" data-size="medium">
      <Heading level={2} data-size="medium">{name}</Heading>
      <Paragraph data-size="medium">{email}</Paragraph>
    </Card>
  );
}
```

## Package Exports

Tree-shakeable entry points:

```typescript
import { Button } from '@xala-technologies/platform-ui';
import { Button } from '@xala-technologies/platform-ui/primitives';
import { DataTable } from '@xala-technologies/platform-ui/composed';
import { AppLayout } from '@xala-technologies/platform-ui/shells';
import { NotificationBell } from '@xala-technologies/platform-ui/blocks';
import { ResourceCard } from '@xala-technologies/platform-ui/patterns';
```

## Storybook Stories

All components require Storybook stories:

```typescript
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

## Publishing

```bash
# Update version in package.json and CHANGELOG.md
git tag v1.x.x
git push origin main --tags
# GitHub Actions handles publish to GitHub Packages
```

## Key Dependencies

- `@digdir/designsystemet-react` - Primary UI component library
- `@navikt/aksel-icons` - Icon library
- `lucide-react` - Additional icons
- `zod` - Schema validation
- React 18+ (peer dependency)
- react-router-dom 6+ (optional peer dependency)
