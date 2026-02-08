import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
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
    const t = useT();
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Logo alt={t('storybook.logo.platformLogo')} />
      </div>
    );
  },
};

/**
 * Custom height
 */
export const CustomHeight: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Logo height={60} alt={t('storybook.logo.platformLogo')} />
      </div>
    );
  },
};

/**
 * Small logo
 */
export const Small: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Logo height={24} alt={t('storybook.logo.platformLogo')} />
      </div>
    );
  },
};

/**
 * Large logo
 */
export const Large: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Logo height={80} alt={t('storybook.logo.platformLogo')} />
      </div>
    );
  },
};

/**
 * Custom source
 */
export const CustomSource: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Logo src="/custom-logo.svg" alt={t('storybook.logo.customLogo')} />
      </div>
    );
  },
};
