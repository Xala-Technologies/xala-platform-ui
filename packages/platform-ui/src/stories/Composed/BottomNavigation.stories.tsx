import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { BottomNavigation, HomeIcon, CalendarIcon, SettingsIcon, UserIcon, BellIcon, Stack, Paragraph } from '../../index';

/**
 * BottomNavigation provides mobile-first bottom navigation.
 *
 * ## Features
 * - Mobile-first design
 * - 44px+ touch targets
 * - Badge support
 * - Fixed positioning
 * - Safe area support
 *
 * ## When to Use
 * - Mobile navigation
 * - Primary navigation
 * - App navigation
 */
const meta: Meta<typeof BottomNavigation> = {
  title: 'Composed/BottomNavigation',
  component: BottomNavigation,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
BottomNavigation provides mobile-first bottom navigation.

## Features
- Mobile-first design
- 44px+ touch targets
- Badge support
- Fixed positioning
- Safe area support (iPhone notches)

## When to Use
- Mobile navigation
- Primary navigation
- App navigation
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BottomNavigation>;

// Sample navigation items
const useSampleItems = () => {
  const t = useT();
  return [
    { id: 'home', label: t('storybook.bottomNav.home'), icon: <HomeIcon size={20} />, href: '/', active: true },
    {
      id: 'calendar',
      label: t('storybook.bottomNav.calendar'),
      icon: <CalendarIcon size={20} />,
      href: '/calendar',
    },
    {
      id: 'notifications',
      label: t('storybook.bottomNav.notifications'),
      icon: <BellIcon size={20} />,
      href: '/notifications',
      badge: 3,
    },
    {
      id: 'profile',
      label: t('storybook.bottomNav.profile'),
      icon: <UserIcon size={20} />,
      href: '/profile',
    },
  ];
};

/**
 * Default bottom navigation
 */
export const Default: Story = {
  render: function Render() {
    const items = useSampleItems();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ height: '100vh', paddingBottom: '80px' }}>
        <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
          <Paragraph data-size="md">Scroll down to see bottom navigation</Paragraph>
        </Stack>
        <BottomNavigation items={items} />
      </Stack>
    );
  },
};

/**
 * Bottom navigation without labels
 */
export const WithoutLabels: Story = {
  render: function Render() {
    const items = useSampleItems();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ height: '100vh', paddingBottom: '80px' }}>
        <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
          <Paragraph data-size="md">Bottom navigation without labels</Paragraph>
        </Stack>
        <BottomNavigation items={items} showLabels={false} />
      </Stack>
    );
  },
};

/**
 * Bottom navigation with many items
 */
export const ManyItems: Story = {
  render: function Render() {
    const t = useT();
    const items = [
      { id: 'home', label: t('storybook.bottomNav.home'), icon: <HomeIcon size={20} />, href: '/', active: true },
      {
        id: 'calendar',
        label: t('storybook.bottomNav.calendar'),
        icon: <CalendarIcon size={20} />,
        href: '/calendar',
      },
      {
        id: 'notifications',
        label: t('storybook.bottomNav.notifications'),
        icon: <BellIcon size={20} />,
        href: '/notifications',
        badge: 5,
      },
      {
        id: 'profile',
        label: t('storybook.bottomNav.profile'),
        icon: <UserIcon size={20} />,
        href: '/profile',
      },
      {
        id: 'settings',
        label: t('storybook.bottomNav.settings'),
        icon: <SettingsIcon size={20} />,
        href: '/settings',
      },
    ];
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ height: '100vh', paddingBottom: '80px' }}>
        <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
          <Paragraph data-size="md">Bottom navigation with 5 items</Paragraph>
        </Stack>
        <BottomNavigation items={items} />
      </Stack>
    );
  },
};

/**
 * Bottom navigation - not fixed
 */
export const NotFixed: Story = {
  render: function Render() {
    const items = useSampleItems();
    return (
      <Stack style={{ padding: 'var(--ds-spacing-4)' }}>
        <BottomNavigation items={items} fixed={false} />
      </Stack>
    );
  },
};

/**
 * Bottom navigation with background variant
 */
export const BackgroundVariant: Story = {
  render: function Render() {
    const items = useSampleItems();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ height: '100vh', paddingBottom: '80px' }}>
        <Stack spacing="var(--ds-spacing-4)" style={{ padding: 'var(--ds-spacing-4)' }}>
          <Paragraph data-size="md">Bottom navigation with background variant</Paragraph>
        </Stack>
        <BottomNavigation items={items} variant="background" />
      </Stack>
    );
  },
};
