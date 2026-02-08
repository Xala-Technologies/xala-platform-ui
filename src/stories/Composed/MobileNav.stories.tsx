import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import {
  MobileNav,
  MobileNavToggle,
  type MobileNavItem,
  HomeIcon,
  CalendarIcon,
  SettingsIcon,
  UserIcon,
  BellIcon,
  Stack,
  Paragraph,
} from '../../index';

/**
 * MobileNav provides mobile hamburger navigation.
 *
 * ## Features
 * - Hamburger menu
 * - Mobile-optimized drawer
 * - Navigation items/sections
 * - Badge support
 * - Header/footer support
 *
 * ## When to Use
 * - Mobile navigation
 * - Hamburger menus
 * - Mobile-first UIs
 */
const meta: Meta<typeof MobileNav> = {
  title: 'Composed/MobileNav',
  component: MobileNav,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
MobileNav provides mobile hamburger navigation.

## Features
- Hamburger menu toggle
- Mobile-optimized drawer
- Navigation items/sections
- Badge support
- Header/footer support

## When to Use
- Mobile navigation
- Hamburger menus
- Mobile-first UIs
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof MobileNav>;

// Sample navigation items
const useSampleItems = (): MobileNavItem[] => {
  const t = useT();
  return [
    {
      id: 'home',
      label: t('storybook.mobileNav.home'),
      icon: <HomeIcon size={20} />,
      href: '/',
      active: true,
    },
    {
      id: 'calendar',
      label: t('storybook.mobileNav.calendar'),
      icon: <CalendarIcon size={20} />,
      href: '/calendar',
    },
    {
      id: 'notifications',
      label: t('storybook.mobileNav.notifications'),
      icon: <BellIcon size={20} />,
      href: '/notifications',
      badge: 3,
    },
    {
      id: 'profile',
      label: t('storybook.mobileNav.profile'),
      icon: <UserIcon size={20} />,
      href: '/profile',
    },
    {
      id: 'settings',
      label: t('storybook.mobileNav.settings'),
      icon: <SettingsIcon size={20} />,
      href: '/settings',
    },
  ];
};

/**
 * Default mobile nav
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [isOpen, setIsOpen] = useState(false);
    const items = useSampleItems();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <MobileNavToggle
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={t('storybook.mobileNav.toggleMenu')}
        />
        <MobileNav
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          items={items}
          title={t('storybook.mobileNav.navigation')}
        />
      </Stack>
    );
  },
};

/**
 * Mobile nav with sections
 */
export const WithSections: Story = {
  render: function Render() {
    const t = useT();
    const [isOpen, setIsOpen] = useState(false);
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <MobileNavToggle
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={t('storybook.mobileNav.toggleMenu')}
        />
        <MobileNav
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          sections={[
            {
              title: t('storybook.mobileNav.main'),
              items: [
                {
                  id: 'home',
                  label: t('storybook.mobileNav.home'),
                  icon: <HomeIcon size={20} />,
                  href: '/',
                  active: true,
                },
                {
                  id: 'calendar',
                  label: t('storybook.mobileNav.calendar'),
                  icon: <CalendarIcon size={20} />,
                  href: '/calendar',
                },
              ],
            },
            {
              title: t('storybook.mobileNav.account'),
              items: [
                {
                  id: 'profile',
                  label: t('storybook.mobileNav.profile'),
                  icon: <UserIcon size={20} />,
                  href: '/profile',
                },
                {
                  id: 'settings',
                  label: t('storybook.mobileNav.settings'),
                  icon: <SettingsIcon size={20} />,
                  href: '/settings',
                },
              ],
            },
          ]}
          title={t('storybook.mobileNav.navigation')}
        />
      </div>
    );
  },
};

/**
 * Mobile nav with header
 */
export const WithHeader: Story = {
  render: function Render() {
    const t = useT();
    const [isOpen, setIsOpen] = useState(false);
    const items = useSampleItems();
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <MobileNavToggle
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={t('storybook.mobileNav.toggleMenu')}
        />
        <MobileNav
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          items={items}
          header={
            <Stack
              spacing="var(--ds-spacing-4)"
              style={{
                padding: 'var(--ds-spacing-4)',
                borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
              }}
            >
              <Paragraph
                data-size="md"
                style={{ margin: 0, fontWeight: 'var(--ds-font-weight-semibold)' }}
              >
                {t('storybook.mobileNav.appName')}
              </Paragraph>
            </Stack>
          }
        />
      </div>
    );
  },
};

/**
 * Mobile nav with footer
 */
export const WithFooter: Story = {
  render: function Render() {
    const t = useT();
    const [isOpen, setIsOpen] = useState(false);
    const items = useSampleItems();
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <MobileNavToggle
          isOpen={isOpen}
          onClick={() => setIsOpen(!isOpen)}
          aria-label={t('storybook.mobileNav.toggleMenu')}
        />
        <MobileNav
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          items={items}
          footer={
            <Stack
              spacing="var(--ds-spacing-4)"
              style={{
                padding: 'var(--ds-spacing-4)',
                borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
              }}
            >
              <Paragraph
                data-size="sm"
                style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
              >
                {t('storybook.mobileNav.footerText')}
              </Paragraph>
            </Stack>
          }
        />
      </div>
    );
  },
};
