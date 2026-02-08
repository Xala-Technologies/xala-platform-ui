# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

`@xala-technologies/platform-ui` is a **standalone** React component library built on [Norwegian Designsystemet](https://designsystemet.no/). This package is **UI-only** - no business logic, API calls, authentication, or i18n.

**Package Type:** Standalone (not a monorepo)  
**Storybook:** Integrated at root (`.storybook/`)  
**Themes:** Designsystemet-based theming in `src/themes/`

## Commands

```bash
pnpm install            # Install dependencies
pnpm storybook          # Start Storybook dev server (port 6006)
pnpm build              # Build package (tsup)
pnpm dev                # Watch mode build

# Quality checks
pnpm quality            # Run all checks (typecheck + lint + format:check)
pnpm typecheck          # TypeScript type checking
pnpm lint               # ESLint validation
pnpm lint:fix           # Auto-fix ESLint issues
pnpm format             # Format with Prettier
pnpm format:check       # Check formatting

# Verification (run in CI)
pnpm verify:boundaries    # Check layer hierarchy and forbidden imports
pnpm verify:design-tokens # Check Designsystemet compliance

# Testing
pnpm test:storybook     # Run Storybook tests
pnpm test:a11y          # Accessibility tests
```

## Architecture

### Simplified 3-Layer Structure

Components are organized by complexity level. **Lower layers cannot import from higher layers.**

| Level | Layer | Description |
|-------|-------|-------------|
| 0 | **primitives/** | Direct Designsystemet wrappers (Button, Card, Textfield, Heading) |
| 1 | **components/** | Composed components (DataTable, Modal, Forms, ImageGallery) |
| 2 | **layouts/** | Application shells and page layouts (AppLayout, DashboardLayout) |

**Other directories:**
- `features/` - Domain-specific components (booking, calendar, etc.)
- `themes/` - Designsystemet theme CSS files with `@layer` organization
- `tokens/` - Design token exports
- `types/` - TypeScript definitions
- `utils/` - Helper functions

### Theme Structure (Designsystemet-based)

Themes follow Designsystemet's CSS layer architecture:

```
src/themes/
├── xala.css                    # Base Designsystemet theme (@layer ds.theme.*)
├── common-extensions.css       # Shared extensions (@layer ds.app)
├── digilist-colors.css         # Digilist theme colors
├── platform-colors.css         # Platform theme colors  
├── xaheen-colors.css           # Xaheen theme colors
├── xala-navy.css               # Xala Navy theme (@layer ds.app)
├── index.ts                    # Theme TypeScript exports
├── schema.ts                   # Theme configuration schema
└── validator.ts                # Runtime theme validation
```

## Critical Rules

### 1. No Business Logic
- Components receive data via props, emit events via callbacks
- No API calls, authentication, database queries, or i18n translations
- **Forbidden imports** (enforced by ESLint and `verify:boundaries`):
  - `@xala-technologies/platform`
  - `@xala-technologies/platform-schema`
  - `@xala-technologies/governance`

### 2. Designsystemet Components Only

ESLint and `verify:design-tokens` enforce:
- **No raw HTML elements** (`div`, `span`, `p`, `h1-h6`, `section`, `button`, etc.)
- **No inline styles** (exception: `var(--ds-*)` token variables)
- **No custom CSS classes** (only `ds-` prefixed classes allowed)

Use Designsystemet components and data attributes:
```typescript
import { Card, Heading, Paragraph } from '@digdir/designsystemet-react';

<Card data-color="neutral" data-size="medium">
  <Heading level={2} data-size="medium">{name}</Heading>
  <Paragraph data-size="medium">{email}</Paragraph>
</Card>
```

### 3. Layer Import Rules

```
primitives/  ← Can only import: external packages
components/  ← Can import: primitives
layouts/     ← Can import: primitives, components
features/    ← Can import: primitives, components, layouts
```

## Code Style

Prettier configuration:
- Single quotes, semicolons, trailing commas (ES5)
- 100 char line width, 2 space indent

TypeScript: strict mode enabled, target ES2020

## Package Exports

Tree-shakeable entry points for optimal bundle sizes:

```typescript
// ✅ Recommended (tree-shakeable subpath imports)
import { Button, Card } from '@xala-technologies/platform-ui/primitives';
import { DataTable, Modal } from '@xala-technologies/platform-ui/components';
import { AppLayout } from '@xala-technologies/platform-ui/layouts';
import { BookingForm } from '@xala-technologies/platform-ui/features/booking';

// ❌ Avoid (imports entire library)
import { Button } from '@xala-technologies/platform-ui';
```

**Available subpaths:**
- `/primitives` - Designsystemet component wrappers
- `/components` - Composed components
- `/layouts` - Application layouts
- `/features/*` - Domain-specific features
- `/themes` - Theme configurations and CSS
- `/tokens` - Design tokens
- `/types` - TypeScript definitions

## AI Agent Quick Start

**For AI coding agents:**
- 📖 **[Getting Started for AI](docs/GETTING_STARTED_AI.md)** - Quick rules and examples
- 📚 **[AI Agent Playbook](docs/AI_AGENT_PLAYBOOK.md)** - Complete HTML translation table and decision trees

**Golden Rules:**
1. **Never use raw HTML** (`<div>`, `<h1>`, `<button>`, etc.) - Always use Designsystemet components
2. **No custom CSS** - Use data attributes (`data-size`, `data-color`, etc.)
3. **Import from subpaths** - `/primitives`, `/components`, `/layouts`

## Storybook

**Location:** `.storybook/` at package root  
**Port:** 6006  
**Stories:** Located in `src/stories/` directory

All components require Storybook stories:
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../primitives/Button';

const meta: Meta<typeof Button> = {
  title: 'Primitives/Button',
  component: Button,
};
export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: { children: 'Click me', variant: 'primary' },
};
```

## CI/CD

**CI runs on every push/PR:**
1. Type check → Lint → Format check
2. Verify boundaries → Verify design tokens
3. Build → Storybook build

**Publishing:** Tag with `v*` (e.g., `git tag v3.0.0`) triggers publish to GitHub Packages.

## Key Dependencies

- `@digdir/designsystemet-react` - Primary UI component library
- `@navikt/aksel-icons`, `lucide-react` - Icons
- `zod` - Schema validation
- React 18+, react-router-dom 6+ (optional)

## Content Security Policy (CSP)

This library is **CSP-compatible** and designed to work with strict Content Security Policy headers. When deploying applications that use `@xala-technologies/platform-ui`, configure CSP headers to allow required resources.

### Recommended CSP Directives

For applications consuming this library, use these CSP directives as a baseline:

```
Content-Security-Policy: default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data: https:;
  font-src 'self' data:;
  connect-src 'self';
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self'
```

### Why 'unsafe-inline' is Required

This library depends on Designsystemet components that use:
- **Inline styles** for design tokens and CSS variables
- **Dynamic styling** via data attributes

While `'unsafe-inline'` reduces CSP effectiveness, the risk is mitigated because:
- No user-generated content is rendered inline
- All styles come from trusted build artifacts
- Components use data attributes, not arbitrary inline styles

### Platform-Specific Configuration

#### Nginx
```nginx
add_header Content-Security-Policy "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'" always;
```

#### Netlify (`netlify.toml`)
```toml
[[headers]]
  for = "/*"
  [headers.values]
    Content-Security-Policy = "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
```

#### Vercel (`vercel.json`)
```json
{
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "Content-Security-Policy",
          "value": "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; base-uri 'self'; form-action 'self'"
        }
      ]
    }
  ]
}
```

### Additional Resources

- For Storybook-specific CSP configuration, see [`docs/security/CSP_CONFIGURATION.md`](docs/security/CSP_CONFIGURATION.md)
- For production deployments, consider using CSP reporting to detect violations
- Test your CSP configuration in report-only mode before enforcing
