# @xala-technologies/platform-ui

Design system components built on Norwegian Designsystemet for modern React applications

## Overview

`@xala-technologies/platform-ui` is a comprehensive React component library built on top of [Designsystemet](https://designsystemet.no/) - Norway's official design system. It provides a complete set of accessible, customizable UI components for building modern web applications.

## Features

- **100+ Components** - Primitives, composed components, blocks, patterns, and shells
- **Designsystemet Compliant** - Built on Norway's official design system
- **TypeScript First** - Full type safety and IntelliSense support
- **Accessible** - WCAG 2.1 AA compliant components
- **Storybook Documentation** - Interactive component playground
- **Tree-shakeable** - Import only what you need
- **Theme Support** - Customizable design tokens
- **React 18+** - Built for modern React

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
import { Button, Card, Badge } from '@xala-technologies/platform-ui';

function App() {
  return (
    <Card>
      <h1>Welcome</h1>
      <Badge count={5} data-color="accent" />
      <Button>Get Started</Button>
    </Card>
  );
}
```

## Component Categories

### Primitives
Basic building blocks from Designsystemet:

```tsx
import { 
  Button, 
  Card, 
  Badge, 
  Chip,
  TextField,
  Select,
  Checkbox,
  Radio,
  Switch
} from '@xala-technologies/platform-ui/primitives';
```

### Composed Components
Higher-level components combining primitives:

```tsx
import { 
  DataTable,
  Modal,
  Drawer,
  Tabs,
  Accordion,
  Breadcrumbs
} from '@xala-technologies/platform-ui/composed';
```

### Blocks
Feature-complete UI blocks:

```tsx
import { 
  NotificationBell,
  UserMenu,
  SearchBar,
  FilterPanel
} from '@xala-technologies/platform-ui/blocks';
```

### Shells
Layout components:

```tsx
import { 
  AppLayout,
  DashboardLayout,
  DashboardSidebar
} from '@xala-technologies/platform-ui/shells';
```

### Patterns
Common UI patterns:

```tsx
import { 
  ResourceCard,
  ResourceGrid,
  SlotCalendar,
  PricingSummary
} from '@xala-technologies/platform-ui/patterns';
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
// Main export
import { Button } from '@xala-technologies/platform-ui';

// Specific categories
import { Button } from '@xala-technologies/platform-ui/primitives';
import { DataTable } from '@xala-technologies/platform-ui/composed';
import { AppLayout } from '@xala-technologies/platform-ui/shells';
import { ResourceCard } from '@xala-technologies/platform-ui/patterns';

// Themes
import { theme } from '@xala-technologies/platform-ui/themes';

// Tokens
import { tokens } from '@xala-technologies/platform-ui/tokens';
```

## Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details.

## License

MIT - Xala Technologies

## Links

- [Designsystemet Documentation](https://designsystemet.no/)
- [GitHub Repository](https://github.com/Xala-Technologies/xala-platform-ui)
- [Issue Tracker](https://github.com/Xala-Technologies/xala-platform-ui/issues)

## Support

For questions and support, create an issue on GitHub.
