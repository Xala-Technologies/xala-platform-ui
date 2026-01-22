# AGENTS.md

Guidelines for AI agents working in this repository.

## Package Boundary

This is `@xala-technologies/platform-ui` - a **UI-only** component library.

| Allowed | Forbidden |
|---------|-----------|
| React components | API calls, SDK usage |
| Themes, design tokens | Authentication logic |
| TypeScript UI types | Business rules, domain logic |
| Storybook stories | Database queries, i18n |

**Forbidden imports** (CI will fail):
- `@xala-technologies/platform`
- `@xala-technologies/platform-schema`
- `@xala-technologies/governance`

## Layer Hierarchy

Lower layers cannot import from higher layers:

```
Level 0: primitives/  → Can only import external packages
Level 1: composed/    → Can import primitives
Level 2: blocks/      → Can import primitives, composed
Level 3: patterns/    → Can import primitives, composed, blocks
Level 4: shells/      → Can import primitives, composed, blocks, patterns
Level 5: pages/       → Can import all layers
```

## Designsystemet Compliance

### Required Pattern
```typescript
import { Card, Heading, Paragraph } from '@digdir/designsystemet-react';

<Card data-color="neutral" data-size="medium">
  <Heading level={2} data-size="medium">{title}</Heading>
  <Paragraph>{content}</Paragraph>
</Card>

// Design tokens allowed when extending:
style={{ padding: 'var(--ds-spacing-4)' }}
```

### Prohibited
```typescript
// Raw HTML elements
<div>, <span>, <p>, <h1-h6>, <section>, <button>, <input>

// Inline styles (without design tokens)
style={{ padding: '20px', color: '#0062BA' }}

// Custom CSS classes
className="my-custom-class"  // Only ds-* classes allowed
```

## Validation Checklist

Before accepting code:

| Check | Result |
|-------|--------|
| Is it a UI component? | ✅ Accept |
| Makes API calls? | ❌ Reject |
| Has business logic? | ❌ Reject |
| Imports from platform packages? | ❌ Reject |
| Uses raw HTML elements? | ❌ Reject |
| Uses inline styles (no tokens)? | ❌ Reject |
| Violates layer hierarchy? | ❌ Reject |
| Has Storybook story? | ✅ Required |

## Quality Gates

Run before committing:
```bash
pnpm quality              # typecheck + lint + format:check
pnpm verify:boundaries    # layer hierarchy + forbidden imports
pnpm verify:design-tokens # raw HTML, inline styles, custom classes
```

## CI Pipeline

Runs on every push/PR to `main`:

1. **Type check** - `pnpm typecheck`
2. **Lint** - `pnpm lint`
3. **Format** - `pnpm format:check`
4. **Boundaries** - `pnpm verify:boundaries`
5. **Design tokens** - `pnpm verify:design-tokens`
6. **Build** - `pnpm build`
7. **Storybook** - `pnpm storybook:build`

All must pass to merge.

## Component Template

```typescript
// 1. Import from Designsystemet
import { Button as DSButton } from '@digdir/designsystemet-react';

// 2. TypeScript interface
export interface ButtonProps {
  /** Button label */
  children: React.ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary';
}

// 3. Pure presentation component
export function Button({ children, onClick, variant }: ButtonProps) {
  return (
    <DSButton
      data-color={variant === 'primary' ? 'accent' : 'neutral'}
      onClick={onClick}
    >
      {children}
    </DSButton>
  );
}
```

## Publishing

```bash
# Update version in package.json
# Update CHANGELOG.md
git tag v1.x.x
git push origin main --tags
# GitHub Actions publishes to GitHub Packages
```

## Detailed Documentation

- Governance: `docs/governance/GOVERNANCE.md`
- Design tokens: `docs/guides/DESIGN_TOKENS.md`
- Architecture: `docs/architecture/ARCHITECTURE.md`
- Components: `docs/architecture/COMPONENTS.md`
