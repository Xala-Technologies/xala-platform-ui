import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useT } from '@xala-technologies/i18n';
import { Breadcrumbs, Heading } from '../../index';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Components/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    docs: {
      description: {
        component: `
Breadcrumbs show the navigation hierarchy and help users understand their current location within the site structure. They provide quick navigation to parent pages.

## Variants

- **Default** - Standard breadcrumb navigation
- **With icons** - Icons for navigation items
- **Custom separator** - Custom separator character
- **Collapsed** - Collapsed for deep hierarchies

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## When to Use

- Deep page hierarchies (3+ levels)
- Complex site structures
- Help users understand current location
- Enable quick navigation to parent pages
- Multi-level category navigation
- Step-based processes

## Best Practices

### Do
- Show current page as text (not clickable)
- Keep labels short and clear
- Use consistent separator throughout site
- Start with home or main section
- Use meaningful page names
- Keep breadcrumbs on a single line

### Don't
- Don't use for single-level navigation
- Don't make current page clickable
- Don't use overly long labels
- Don't use for primary navigation
- Don't hide breadcrumbs on mobile
- Don't use more than 5-6 levels

## Usage Patterns

### Basic Breadcrumbs
\`\`\`tsx
<Breadcrumbs>
  <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
  <Breadcrumbs.Link href="/products">Products</Breadcrumbs.Link>
  <span>Current Product</span>
</Breadcrumbs>
\`\`\`

### Three-Level Navigation
\`\`\`tsx
<Breadcrumbs>
  <Breadcrumbs.Link href="/">Dashboard</Breadcrumbs.Link>
  <Breadcrumbs.Link href="/reports">Reports</Breadcrumbs.Link>
  <Breadcrumbs.Link href="/reports/2024">2024</Breadcrumbs.Link>
  <span>January Report</span>
</Breadcrumbs>
\`\`\`

### Size Variants
\`\`\`tsx
<Breadcrumbs data-size="sm">
  <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
  <span>Page</span>
</Breadcrumbs>
<Breadcrumbs data-size="md">
  <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
  <span>Page</span>
</Breadcrumbs>
<Breadcrumbs data-size="lg">
  <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
  <span>Page</span>
</Breadcrumbs>
\`\`\`

## Anti-Patterns

### Anti-pattern: Single-Level Breadcrumbs
Breadcrumbs with only one level provide no value.

### Anti-pattern: Clickable Current Page
Making the current page clickable confuses navigation.

### Anti-pattern: Too Many Levels
More than 6 levels becomes overwhelming and hard to scan.

### Anti-pattern: Vague Labels
Using "Page" or "Section" doesn't help users understand location.

## Accessibility

### Screen Readers
- Uses nav landmark with navigation role
- Current page is properly indicated
- Links are announced with their destinations
- ARIA labels provide context
- Breadcrumb list structure is announced

### Keyboard Navigation
- Tab key navigates through breadcrumb links
- Enter key activates navigation
- Focus moves in logical order
- Current page (text) is skipped in tab order

### WCAG 2.1 AA Compliance
- **Navigation landmark**: Uses nav element with proper role
- **Current location**: Current page clearly indicated
- **Keyboard accessible**: All links reachable via keyboard
- **Focus management**: Logical tab order
- **Meaningful sequence**: Items read in correct order

### ARIA Implementation
\`\`\`tsx
<nav aria-label="Breadcrumb navigation">
  <ol>
    <li>
      <a href="/">Home</a>
    </li>
    <li>
      <a href="/products">Products</a>
    </li>
    <li aria-current="page">
      <span>Current Product</span>
    </li>
  </ol>
</nav>
\`\`\`

### Best Practice for Current Page
Use aria-current="page" for the current location:
\`\`\`tsx
<Breadcrumbs>
  <Breadcrumbs.Link href="/">Home</Breadcrumbs.Link>
  <span aria-current="page">Current Page</span>
</Breadcrumbs>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    'data-size': {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Breadcrumbs>
        <Breadcrumbs.Link href="/">{t('platform.common.home')}</Breadcrumbs.Link>
        <Breadcrumbs.Link href="/listings">{t('storybook.demo.listings')}</Breadcrumbs.Link>
        <span>{t('storybook.demo.currentPage')}</span>
      </Breadcrumbs>
    );
  },
};

export const ThreeLevels: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Breadcrumbs>
        <Breadcrumbs.Link href="/">{t('storybook.demo.dashboard')}</Breadcrumbs.Link>
        <Breadcrumbs.Link href="/resourceRequests">
          {t('storybook.demo.resourceRequests')}
        </Breadcrumbs.Link>
        <Breadcrumbs.Link href="/resourceRequests/2024">2024</Breadcrumbs.Link>
        <span>{t('storybook.demo.january')}</span>
      </Breadcrumbs>
    );
  },
};

export const TwoLevels: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Breadcrumbs>
        <Breadcrumbs.Link href="/">{t('platform.common.home')}</Breadcrumbs.Link>
        <span>{t('storybook.demo.settings')}</span>
      </Breadcrumbs>
    );
  },
};

export const Sizes: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Breadcrumbs data-size="sm">
          <Breadcrumbs.Link href="/">{t('platform.common.home')}</Breadcrumbs.Link>
          <span>{t('storybook.story.small')}</span>
        </Breadcrumbs>
        <Breadcrumbs data-size="md">
          <Breadcrumbs.Link href="/">{t('platform.common.home')}</Breadcrumbs.Link>
          <span>{t('storybook.story.medium')}</span>
        </Breadcrumbs>
        <Breadcrumbs data-size="lg">
          <Breadcrumbs.Link href="/">{t('platform.common.home')}</Breadcrumbs.Link>
          <span>{t('storybook.story.large')}</span>
        </Breadcrumbs>
      </div>
    );
  },
};

export const AllVariants: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <div>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {t('storybook.story.twoLevels')}
          </Heading>
          <Breadcrumbs>
            <Breadcrumbs.Link href="/">{t('platform.common.home')}</Breadcrumbs.Link>
            <span>{t('storybook.demo.settings')}</span>
          </Breadcrumbs>
        </div>
        <div>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {t('storybook.story.threeLevels')}
          </Heading>
          <Breadcrumbs>
            <Breadcrumbs.Link href="/">{t('platform.common.home')}</Breadcrumbs.Link>
            <Breadcrumbs.Link href="/products">{t('storybook.demo.products')}</Breadcrumbs.Link>
            <span>{t('storybook.demo.details')}</span>
          </Breadcrumbs>
        </div>
        <div>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {t('storybook.story.fourLevels')}
          </Heading>
          <Breadcrumbs>
            <Breadcrumbs.Link href="/">{t('storybook.demo.dashboard')}</Breadcrumbs.Link>
            <Breadcrumbs.Link href="/bookings">{t('storybook.demo.bookings')}</Breadcrumbs.Link>
            <Breadcrumbs.Link href="/bookings/2024">2024</Breadcrumbs.Link>
            <span>{t('storybook.demo.january')}</span>
          </Breadcrumbs>
        </div>
      </div>
    );
  },
};
