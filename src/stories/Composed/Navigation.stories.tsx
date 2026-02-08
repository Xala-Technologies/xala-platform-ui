import type { Meta, StoryObj } from '@storybook/react';
import { Navigation, NavigationLink, Stack } from '../../index';

/**
 * Navigation provides horizontal navigation following Designsystemet patterns.
 *
 * ## Features
 * - Horizontal navigation links
 * - Active state support
 * - Customizable spacing
 *
 * ## When to Use
 * - Header navigation
 * - Horizontal menus
 * - Top-level navigation
 */
const meta: Meta<typeof Navigation> = {
  title: 'Composed/Navigation',
  component: Navigation,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Navigation provides horizontal navigation following Designsystemet patterns.

## Features
- Horizontal navigation links
- Active state support
- Customizable spacing

## When to Use
- Header navigation
- Horizontal menus
- Top-level navigation
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Navigation>;

/**
 * Default navigation
 */
export const Default: Story = {
  render: function Render() {
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Navigation>
          <NavigationLink href="/" active>
            "Eksempel Tekst"
          </NavigationLink>
          <NavigationLink href="/about">"Eksempel Tekst"</NavigationLink>
          <NavigationLink href="/services">"Eksempel Tekst"</NavigationLink>
          <NavigationLink href="/contact">"Eksempel Tekst"</NavigationLink>
        </Navigation>
      </Stack>
    );
  },
};

/**
 * Navigation with custom spacing
 */
export const CustomSpacing: Story = {
  render: function Render() {
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Navigation spacing={48}>
          <NavigationLink href="/" active>
            "Eksempel Tekst"
          </NavigationLink>
          <NavigationLink href="/about">"Eksempel Tekst"</NavigationLink>
          <NavigationLink href="/services">"Eksempel Tekst"</NavigationLink>
        </Navigation>
      </div>
    );
  },
};

/**
 * Navigation with many items
 */
export const ManyItems: Story = {
  render: function Render() {
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Navigation>
          <NavigationLink href="/" active>
            "Eksempel Tekst"
          </NavigationLink>
          <NavigationLink href="/products">"Eksempel Tekst"</NavigationLink>
          <NavigationLink href="/services">"Eksempel Tekst"</NavigationLink>
          <NavigationLink href="/about">"Eksempel Tekst"</NavigationLink>
          <NavigationLink href="/blog">"Eksempel Tekst"</NavigationLink>
          <NavigationLink href="/contact">"Eksempel Tekst"</NavigationLink>
        </Navigation>
      </Stack>
    );
  },
};
