import type { Meta, StoryObj } from '@storybook/react';
import { Logo } from '../../index';

/**
 * Logo component for displaying application logos.
 *
 * ## Features
 * - Customizable source URL
 * - Configurable height
 * - Alt text support
 *
 * ## When to Use
 * - Application headers
 * - Branding
 * - Navigation bars
 */
const meta: Meta<typeof Logo> = {
  title: 'Primitives/Logo',
  component: Logo,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
Logo component for displaying application logos.

## Features
- Customizable source URL
- Configurable height
- Alt text support

## When to Use
- Application headers
- Branding
- Navigation bars
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Logo>;

/**
 * Default logo
 */
export const Default: Story = {
  render: function Render() {
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Logo alt="Platform Logo" />
      </div>
    );
  },
};

/**
 * Custom height
 */
export const CustomHeight: Story = {
  render: function Render() {
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Logo height={60} alt="Platform Logo" />
      </div>
    );
  },
};

/**
 * Small logo
 */
export const Small: Story = {
  render: function Render() {
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Logo height={24} alt="Platform Logo" />
      </div>
    );
  },
};

/**
 * Large logo
 */
export const Large: Story = {
  render: function Render() {
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Logo height={80} alt="Platform Logo" />
      </div>
    );
  },
};

/**
 * Custom source
 */
export const CustomSource: Story = {
  render: function Render() {
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Logo src="/custom-logo.svg" alt="Tilpasset Logo" />
      </div>
    );
  },
};
