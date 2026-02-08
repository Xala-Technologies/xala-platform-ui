# Xala Platform UI

**Standalone** Norwegian Designsystemet-based React component library for modern web applications

[![CI](https://github.com/Xala-Technologies/xala-platform-ui/actions/workflows/ci.yml/badge.svg)](https://github.com/Xala-Technologies/xala-platform-ui/actions/workflows/ci.yml)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.3-blue)](https://www.typescriptlang.org/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](./LICENSE)

## Overview

Xala Platform UI is a **standalone, copyable** React component library built on [Norwegian Designsystemet](https://designsystemet.no/). It provides a complete set of accessible, customizable UI components for building modern web applications.

**Key Features:**
- ✅ **Standalone Package** - Self-contained, no monorep dependencies
- ✅ **Storybook Integrated** - Interactive component playground at root
- ✅ **Verification Tools** - Built-in design token and boundary checks
- ✅ **AI-Ready Documentation** - Comprehensive AI agent guides

## Features

- **250+ Components** - Primitives, components, layouts, and domain features
- **Designsystemet Compliant** - Built on Norway's official design system
- **TypeScript First** - Full type safety and IntelliSense support
- **Accessible** - WCAG 2.1 AA compliant components
- **Storybook Documentation** - Interactive component playground
- **Tree-shakeable** - Import only what you need
- **Theme Support** - Customizable design tokens and Designsystemet themes
- **React 18+** - Built for modern React
- **3-Layer Architecture** - Simplified component hierarchy

## Installation

```bash
# Using pnpm (recommended)
pnpm add @xala-technologies/platform-ui

# Using npm
npm install @xala-technologies/platform-ui

# Using yarn
yarn add @xala-technologies/platform-ui
```

### GitHub Packages Setup

This package is published to GitHub Packages. Configure your `.npmrc`:

```
@xala-technologies:registry=https://npm.pkg.github.com
//npm.pkg.github.com/:_authToken=${GITHUB_TOKEN}
```

## Quick Start

```tsx
import { Button, Card, Heading } from '@xala-technologies/platform-ui/primitives';

function App() {
  return (
    <Card data-color="neutral" data-size="medium">
      <Heading level={1} data-size="large">Welcome</Heading>
      <Button variant="primary">Get Started</Button>
    </Card>
  );
}
```

## Architecture

### Simplified 3-Layer Structure

Components are organized by complexity level:

| Level | Layer | Description | Import Path |
|-------|-------|-------------|-------------|
| 0 | **primitives/** | Direct Designsystemet wrappers | `/primitives` |
| 1 | **components/** | Composed components | `/components` |
| 2 | **layouts/** | Application shells | `/layouts` |

**Additional directories:**
- **features/** - Domain-specific components (`/features/booking`, `/features/calendar`)
- **themes/** - Designsystemet theme configurations
- **tokens/** - Design token exports
- **types/** - TypeScript type definitions

## Component Categories

### Primitives
Basic Designsystemet component wrappers:

```tsx
import { 
  Button, 
  Card, 
  Heading,
  Paragraph,
  Textfield,
  Select,
  Checkbox,
  Radio,
  Switch
} from '@xala-technologies/platform-ui/primitives';
```

### Components
Higher-level composed components:

```tsx
import { 
  DataTable,
  Modal,
  Drawer,
  Tabs,
  Accordion,
  ImageGallery,
  Forms
} from '@xala-technologies/platform-ui/components';
```

### Layouts
Application layout components:

```tsx
import { 
  AppLayout,
  DashboardLayout,
  DashboardSidebar
} from '@xala-technologies/platform-ui/layouts';
```

### Features
Domain-specific feature components:

```tsx
import { BookingForm, BookingFlow } from '@xala-technologies/platform-ui/features/booking';
import { SlotCalendar } from '@xala-technologies/platform-ui/features/calendar';
import { RentalObjectCard } from '@xala-technologies/platform-ui/features/rental-objects';
```

## Theming

```tsx
import { ThemeProvider } from '@xala-technologies/platform-ui';

function App() {
  return (
    <ThemeProvider theme="light">
      {/* Your app */}
    </ThemeProvider>
  );
}
```

## Storybook

Explore all components interactively:

```bash
pnpm install
pnpm storybook
```

Visit http://localhost:6006 to browse the component library.

## TypeScript Support

Full TypeScript support with comprehensive type definitions:

```tsx
import type { ButtonProps } from '@xala-technologies/platform-ui/primitives';

const MyButton: React.FC<ButtonProps> = (props) => {
  return <Button {...props} />;
};
```

## Accessibility

All components follow WCAG 2.1 AA guidelines:

- Keyboard navigation
- Screen reader support
- Focus management
- ARIA attributes
- Color contrast compliance

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Peer Dependencies

```json
{
  "react": ">=18.0.0",
  "react-dom": ">=18.0.0",
  "react-router-dom": ">=6.0.0" (optional)
}
```

## Package Exports

The package provides multiple entry points for optimal tree-shaking:

```tsx
// ✅ Recommended (tree-shakeable subpath imports)
import { Button } from '@xala-technologies/platform-ui/primitives';
import { Data Table } from '@xala-technologies/platform-ui/components';
import { AppLayout } from '@xala-technologies/platform-ui/layouts';
import { BookingForm } from '@xala-technologies/platform-ui/features/booking';

// ❌ Avoid (imports entire library)
import { Button } from '@xala-technologies/platform-ui';

// Themes and tokens
import { theme } from '@xala-technologies/platform-ui/themes';
import { tokens } from '@xala-technologies/platform-ui/tokens';

// Styles (includes all CSS)
import '@xala-technologies/platform-ui/styles';
```

## AI Agent Documentation

This package includes comprehensive AI coding agent documentation:

- **[Getting Started for AI](docs/GETTING_STARTED_AI.md)** - Quick rules and examples
- **[AI Agent Playbook](docs/AI_AGENT_PLAYBOOK.md)** - Complete HTML→Designsystemet translation
- **[CLAUDE.md](CLAUDE.md)** - Full architecture and guidelines

**Golden Rules for AI:**
1. Never use raw HTML elements - use Designsystemet components
2. No custom CSS - use data attributes
3. Import from subpaths for tree-shaking

## Storybook

Integrated Storybook for interactive component exploration:

```bash
pnpm install
pnpm storybook
```

Visit http://localhost:6006 to browse the component library.

**Storybook Location:** `.storybook/` at package root

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT - Xala Technologies

## Links

- [Designsystemet Documentation](https://designsystemet.no/)
- [GitHub Repository](https://github.com/Xala-Technologies/xala-platform-ui)
- [Issue Tracker](https://github.com/Xala-Technologies/xala-platform-ui/issues)

## Documentation

Complete documentation is available in the [docs](./docs) folder:

- **[Getting Started](./docs/README.md)** - Quick start guide
- **[Design Tokens](./docs/guides/DESIGN_TOKENS.md)** - Using Designsystemet tokens
- **[Storybook Guide](./docs/guides/STORYBOOK.md)** - Component documentation
- **[Governance](./docs/governance/GOVERNANCE.md)** - Rules and standards
- **[AI Agents](./docs/governance/AGENTS.md)** - AI agent guidelines
- **[Architecture](./docs/architecture/ARCHITECTURE.md)** - Package architecture
- **[Components](./docs/architecture/COMPONENTS.md)** - Component structure

## Development

### Quality Checks

```bash
# Run all quality checks
pnpm quality

# Individual checks
pnpm typecheck    # TypeScript type checking
pnpm lint         # ESLint
pnpm format:check # Prettier formatting
```

### Pre-commit

Quality checks run automatically before publishing. To run manually:

```bash
pnpm prepublishOnly
```

## Support

For questions and support, create an issue on GitHub.
