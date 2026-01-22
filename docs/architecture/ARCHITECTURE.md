# Package Architecture

## Overview

`@xala-technologies/platform-ui` is a standalone UI component library built on Norwegian Designsystemet, designed for maximum reusability and minimal dependencies.

## Design Principles

### 1. Separation of Concerns
- **UI Package**: Pure presentation components
- **Platform Package**: Business logic, SDK, auth, i18n
- **Clear Boundaries**: ESLint enforces no cross-package imports

### 2. Dependency Direction
```
Applications
    ↓
Platform Package (@xala-technologies/platform)
    ↓
UI Package (@xala-technologies/platform-ui)
    ↓
Designsystemet (@digdir/designsystemet-react)
```

### 3. Minimal Dependencies
The UI package has minimal dependencies:
- `@digdir/designsystemet-react` - Base components
- `@navikt/aksel-icons` - Icon library
- `lucide-react` - Additional icons
- `zod` - Schema validation for props

## Package Structure

```
src/
├── primitives/      # Atomic components (Button, Card, Input)
├── composed/        # Multi-component compositions (DataTable, Modal)
├── blocks/          # Feature blocks (NotificationBell, StatusBadges)
├── patterns/        # Reusable UI patterns (ResourceCard, FormWizard)
├── shells/          # Layout components (AppLayout, DashboardSidebar)
├── pages/           # Page-level components (LoginPage)
├── themes/          # Theme configurations
├── tokens/          # Design token extensions
├── types/           # TypeScript type definitions
├── provider.tsx     # DesignsystemetProvider wrapper
└── index.ts         # Main entry point
```

## Component Hierarchy

### Level 1: Primitives
Thin wrappers around Designsystemet components:
```typescript
// src/primitives/Button.tsx
import { Button as DSButton } from '@digdir/designsystemet-react';

export function Button(props: ButtonProps) {
  return <DSButton data-color="accent" {...props} />;
}
```

### Level 2: Composed
Multi-component compositions:
```typescript
// src/composed/DataTable.tsx
import { Table, Pagination, Search } from '../primitives';

export function DataTable({ data, columns }: DataTableProps) {
  return (
    <>
      <Search />
      <Table data={data} columns={columns} />
      <Pagination />
    </>
  );
}
```

### Level 3: Blocks
Feature-specific UI blocks:
```typescript
// src/blocks/NotificationBell.tsx
import { Button, Badge, Popover } from '../primitives';

export function NotificationBell({ count }: Props) {
  return (
    <Popover>
      <Button>
        <BellIcon />
        {count > 0 && <Badge>{count}</Badge>}
      </Button>
    </Popover>
  );
}
```

### Level 4: Patterns
Reusable UI patterns:
```typescript
// src/patterns/ResourceCard.tsx
import { Card, Heading, Paragraph, Button } from '../primitives';

export function ResourceCard({ title, description, actions }: Props) {
  return (
    <Card>
      <Heading>{title}</Heading>
      <Paragraph>{description}</Paragraph>
      <Button>{actions}</Button>
    </Card>
  );
}
```

### Level 5: Shells
Layout components:
```typescript
// src/shells/AppLayout.tsx
import { DashboardSidebar } from './DashboardSidebar';

export function AppLayout({ children }: Props) {
  return (
    <div className="ds-layout">
      <DashboardSidebar />
      <main>{children}</main>
    </div>
  );
}
```

## Build System

### TypeScript Compilation
- **Compiler**: TypeScript 5.3
- **Mode**: Strict
- **Target**: ES2020
- **Module**: ESNext

### Bundling
- **Bundler**: tsup (esbuild-based)
- **Formats**: ESM + CJS
- **Entry Points**: Multiple (index, primitives, composed, etc.)
- **Tree Shaking**: Enabled

### Output Structure
```
dist/
├── index.js              # ESM main entry
├── index.cjs             # CJS main entry
├── index.d.ts            # TypeScript definitions
├── primitives/
│   ├── index.js
│   ├── index.cjs
│   └── index.d.ts
├── composed/
│   └── ...
└── ...
```

## Storybook

### Purpose
- Component documentation
- Visual testing
- Design system showcase
- Accessibility testing

### Structure
```
src/stories/
├── Introduction.stories.tsx
├── GettingStarted.stories.tsx
├── Components/
│   ├── Button.stories.tsx
│   └── ...
├── Composed/
├── Blocks/
├── Patterns/
└── Shells/
```

## Testing Strategy

### Unit Tests
- Component rendering
- Props validation
- Event handlers
- Accessibility

### Storybook Tests
- Visual regression
- Interaction testing
- Accessibility audits

### Type Checking
- TypeScript strict mode
- No `any` types
- Explicit return types

## Publishing

### GitHub Packages
- **Registry**: `https://npm.pkg.github.com`
- **Scope**: `@xala-technologies`
- **Access**: Public

### Versioning
- **Strategy**: Semantic Versioning (semver)
- **Major**: Breaking changes
- **Minor**: New features (backward compatible)
- **Patch**: Bug fixes

### Release Process
1. Update version in `package.json`
2. Update `CHANGELOG.md`
3. Commit changes
4. Create git tag (`v*`)
5. Push tag (triggers GitHub Actions)
6. Automated publish to GitHub Packages

## Quality Gates

### Pre-commit
- Type checking (`pnpm typecheck`)
- Linting (`pnpm lint`)
- Format checking (`pnpm format:check`)

### CI/CD (GitHub Actions)
- Type checking
- Linting
- Format checking
- Build verification
- Storybook build

### Pre-publish
- All quality checks
- Build verification
- No uncommitted changes

## Performance Considerations

### Bundle Size
- Tree-shakeable exports
- No unnecessary dependencies
- Minimal runtime overhead

### Runtime Performance
- Pure components (no side effects)
- Memoization where appropriate
- Lazy loading for large components

## Security

### Dependencies
- Regular updates via Dependabot
- Security audits (`pnpm audit`)
- No known vulnerabilities

### Code Quality
- ESLint security rules
- TypeScript strict mode
- No `eval()` or dynamic code execution

## Future Considerations

### Potential Enhancements
- Component variants system
- Advanced theming
- Animation library integration
- Form validation helpers
- Accessibility testing automation

### Breaking Changes
- Major version bumps required
- Migration guides provided
- Deprecation warnings first
