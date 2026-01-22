# Storybook Guide

## Overview

Storybook is our component documentation and development environment. Every component must have Storybook stories.

## Running Storybook

```bash
# Development mode
pnpm storybook

# Build static site
pnpm storybook:build

# Run accessibility tests
pnpm test:a11y
```

## Story Structure

### Basic Story
```typescript
// src/stories/Components/Button.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../primitives/Button';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Click me',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Click me',
    variant: 'secondary',
  },
};
```

### With Controls
```typescript
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
      description: 'Visual variant of the button',
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};
```

### With Actions
```typescript
export const WithActions: Story = {
  args: {
    children: 'Click me',
    onClick: () => console.log('Button clicked'),
  },
};
```

### With State
```typescript
export const WithState: Story = {
  render: () => {
    const [count, setCount] = useState(0);
    return (
      <Button onClick={() => setCount(count + 1)}>
        Clicked {count} times
      </Button>
    );
  },
};
```

## Story Organization

### Hierarchy
```
Stories/
├── Introduction
├── Getting Started
├── Fundamentals/
│   ├── Design Tokens
│   ├── Typography
│   └── Accessibility
├── Components/
│   ├── Button
│   ├── Card
│   └── ...
├── Composed/
│   ├── DataTable
│   ├── Modal
│   └── ...
├── Blocks/
├── Patterns/
└── Shells/
```

### Naming Convention
```typescript
// File: Button.stories.tsx
title: 'Components/Button'

// Stories
export const Primary = ...
export const Secondary = ...
export const Disabled = ...
export const WithIcon = ...
```

## Documentation

### MDX Documentation
```mdx
import { Meta, Story, Canvas } from '@storybook/blocks';
import * as ButtonStories from './Button.stories';

<Meta of={ButtonStories} />

# Button

Buttons trigger actions when clicked.

## Usage

<Canvas of={ButtonStories.Primary} />

## Variants

### Primary
<Canvas of={ButtonStories.Primary} />

### Secondary
<Canvas of={ButtonStories.Secondary} />
```

### JSDoc Integration
```typescript
/**
 * Button component for user actions
 * 
 * @example
 * ```tsx
 * <Button variant="primary" onClick={handleClick}>
 *   Click me
 * </Button>
 * ```
 */
export function Button(props: ButtonProps) {
  // ...
}
```

## Accessibility Testing

### Manual Testing
1. Navigate with keyboard (Tab, Enter, Space)
2. Test with screen reader
3. Check color contrast
4. Verify ARIA attributes

### Automated Testing
```typescript
// .storybook/test-runner.ts
import { injectAxe, checkA11y } from 'axe-playwright';

export default {
  async preRender(page) {
    await injectAxe(page);
  },
  async postRender(page) {
    await checkA11y(page, '#storybook-root', {
      detailedReport: true,
      detailedReportOptions: {
        html: true,
      },
    });
  },
};
```

## Theming

### Theme Decorator
```typescript
// .storybook/preview.tsx
import { DesignsystemetProvider } from '../src/provider';

const withTheme: Decorator = (Story) => {
  const isDarkMode = useDarkMode();
  
  return (
    <DesignsystemetProvider 
      theme="xala" 
      colorScheme={isDarkMode ? 'dark' : 'light'}
    >
      <Story />
    </DesignsystemetProvider>
  );
};

export const decorators = [withTheme];
```

### Theme Switcher
Storybook includes a dark mode toggle in the toolbar.

## Viewports

### Custom Viewports
```typescript
// .storybook/preview.tsx
export const parameters = {
  viewport: {
    viewports: {
      mobile: {
        name: 'Mobile',
        styles: { width: '375px', height: '667px' },
      },
      tablet: {
        name: 'Tablet',
        styles: { width: '768px', height: '1024px' },
      },
      desktop: {
        name: 'Desktop',
        styles: { width: '1280px', height: '800px' },
      },
    },
  },
};
```

## Best Practices

### Do's
- ✅ Create stories for all components
- ✅ Show all variants
- ✅ Include interactive examples
- ✅ Add accessibility notes
- ✅ Document props
- ✅ Test keyboard navigation
- ✅ Test with screen readers

### Don'ts
- ❌ Skip component documentation
- ❌ Forget edge cases
- ❌ Ignore accessibility
- ❌ Use real API calls
- ❌ Include business logic
- ❌ Hard-code data

## Examples

### Complete Story Example
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from '../../primitives/Button';
import { HomeIcon } from 'lucide-react';

const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary'],
    },
    size: {
      control: 'select',
      options: ['small', 'medium', 'large'],
    },
    disabled: {
      control: 'boolean',
    },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    children: 'Primary Button',
    variant: 'primary',
  },
};

export const Secondary: Story = {
  args: {
    children: 'Secondary Button',
    variant: 'secondary',
  },
};

export const WithIcon: Story = {
  args: {
    children: (
      <>
        <HomeIcon size={16} />
        Home
      </>
    ),
    variant: 'primary',
  },
};

export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
      <Button size="small">Small</Button>
      <Button size="medium">Medium</Button>
      <Button size="large">Large</Button>
    </div>
  ),
};
```

## Resources

- [Storybook Documentation](https://storybook.js.org/docs)
- [Accessibility Testing](https://storybook.js.org/docs/react/writing-tests/accessibility-testing)
- [Interaction Testing](https://storybook.js.org/docs/react/writing-tests/interaction-testing)
