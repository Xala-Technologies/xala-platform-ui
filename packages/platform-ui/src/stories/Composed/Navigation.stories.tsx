import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
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
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Navigation>
          <NavigationLink href="/" active>
            {t('storybook.navigation.home')}
          </NavigationLink>
          <NavigationLink href="/about">{t('storybook.navigation.about')}</NavigationLink>
          <NavigationLink href="/services">{t('storybook.navigation.services')}</NavigationLink>
          <NavigationLink href="/contact">{t('storybook.navigation.contact')}</NavigationLink>
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
    const t = useT();
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <Navigation spacing={48}>
          <NavigationLink href="/" active>
            {t('storybook.navigation.home')}
          </NavigationLink>
          <NavigationLink href="/about">{t('storybook.navigation.about')}</NavigationLink>
          <NavigationLink href="/services">{t('storybook.navigation.services')}</NavigationLink>
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
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Navigation>
          <NavigationLink href="/" active>
            {t('storybook.navigation.home')}
          </NavigationLink>
          <NavigationLink href="/products">{t('storybook.navigation.products')}</NavigationLink>
          <NavigationLink href="/services">{t('storybook.navigation.services')}</NavigationLink>
          <NavigationLink href="/about">{t('storybook.navigation.about')}</NavigationLink>
          <NavigationLink href="/blog">{t('storybook.navigation.blog')}</NavigationLink>
          <NavigationLink href="/contact">{t('storybook.navigation.contact')}</NavigationLink>
        </Navigation>
      </Stack>
    );
  },
};
