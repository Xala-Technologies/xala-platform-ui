import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { DashboardHeader, type SearchResultGroup } from '../../index';
import { Button } from '@digdir/designsystemet-react';
import { PlusIcon } from '../../index';

/**
 * DashboardHeader is a sticky header for dashboard applications.
 *
 * ## Features
 * - Global search with keyboard shortcut (Cmd/Ctrl+K)
 * - Theme toggle (light/dark mode)
 * - Notification bell with count badge
 * - User profile dropdown with avatar
 * - Customizable left slot (for AccountSwitcher, etc.)
 * - Mobile responsive
 *
 * ## Accessibility
 * - Semantic header structure
 * - Keyboard navigable
 * - ARIA labels for interactive elements
 */
const meta: Meta<typeof DashboardHeader> = {
  title: 'Shells/DashboardHeader',
  component: DashboardHeader,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
DashboardHeader provides a sticky header for dashboard applications.

## Features
- Logo slot for mobile
- Left slot for AccountSwitcher or other widgets
- Centered global search with keyboard shortcut
- Theme toggle button
- Notification bell with badge
- User profile dropdown

## When to Use
- Dashboard applications
- Admin panels
- Any app needing a persistent header with search

## data-testid
- Header: \`data-testid="app-layout-header"\` (aligned with AppLayout header)
- Logo (left zone): \`data-testid="app-layout-header-logo"\` when logo is shown
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DashboardHeader>;

// Sample logo
const SampleLogo = () => (
  <div
    style={{
      width: '40px',
      height: '40px',
      borderRadius: 'var(--ds-border-radius-md)',
      backgroundColor: 'var(--ds-color-accent-base-default)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      color: 'white',
      fontWeight: 'bold',
    }}
  >
    D
  </div>
);

// Sample search results
const useSampleSearchResults = (): SearchResultGroup[] => {
  const t = useT();
  return [
    {
      title: t('storybook.header.recentSearches'),
      items: [
        { id: '1', title: t('storybook.header.orderNumber', { number: '12345' }), type: 'recent' },
        { id: '2', title: t('storybook.header.customerJohnDoe'), type: 'recent' },
      ],
    },
    {
      title: t('storybook.header.suggestions'),
      items: [
        {
          id: '3',
          title: t('storybook.header.productCatalog'),
          subtitle: t('storybook.header.productsCategory'),
          type: 'page',
        },
        {
          id: '4',
          title: t('storybook.header.orderHistory'),
          subtitle: t('storybook.header.ordersCategory'),
          type: 'page',
        },
        {
          id: '5',
          title: t('storybook.header.customerDatabase'),
          subtitle: t('storybook.header.customersCategory'),
          type: 'page',
        },
      ],
    },
  ];
};

const useSampleUser = () => {
  const t = useT();
  return {
    name: t('storybook.header.userName'),
    email: 'ola.nordmann@example.com',
  };
};

/**
 * Default header – logo, centralized search, user, theme toggle, notifications.
 * Use this when passing DashboardHeader as AppLayout's header prop.
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [isDark, setIsDark] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const user = useSampleUser();

    return (
      <div
        style={{
          minHeight: '400px',
          backgroundColor: 'var(--ds-color-neutral-background-default)',
        }}
      >
        <DashboardHeader
          logo={<SampleLogo />}
          user={user}
          searchPlaceholder={t('storybook.header.searchPlaceholder')}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          showThemeToggle
          isDark={isDark}
          onThemeToggle={() => setIsDark(!isDark)}
          showNotifications
          notificationCount={3}
          onNotificationClick={() => console.log('Notifications clicked')}
          onLogout={() => console.log('Logout')}
        />
        <div style={{ padding: 'var(--ds-spacing-6)' }}>
          <p style={{ color: 'var(--ds-color-neutral-text-default)' }}>
            {t('storybook.header.mainContentBelow')}
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Header without search
 */
export const WithoutSearch: Story = {
  render: function Render() {
    const t = useT();
    const [isDark, setIsDark] = useState(false);
    const user = useSampleUser();

    return (
      <div
        style={{
          minHeight: '400px',
          backgroundColor: 'var(--ds-color-neutral-background-default)',
        }}
      >
        <DashboardHeader
          logo={<SampleLogo />}
          user={user}
          showThemeToggle
          isDark={isDark}
          onThemeToggle={() => setIsDark(!isDark)}
          showNotifications
          notificationCount={3}
          onNotificationClick={() => console.log('Notifications clicked')}
          onLogout={() => console.log('Logout')}
        />
        <div style={{ padding: 'var(--ds-spacing-6)' }}>
          <p style={{ color: 'var(--ds-color-neutral-text-default)' }}>
            {t('storybook.header.headerWithoutSearch')}
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Header without user (logged out state)
 */
export const WithoutUser: Story = {
  render: function Render() {
    const t = useT();
    const [isDark, setIsDark] = useState(false);
    const [searchValue, setSearchValue] = useState('');

    return (
      <div
        style={{
          minHeight: '400px',
          backgroundColor: 'var(--ds-color-neutral-background-default)',
        }}
      >
        <DashboardHeader
          logo={<SampleLogo />}
          searchPlaceholder={t('storybook.header.searchPlaceholder')}
          searchValue={searchValue}
          onSearchChange={setSearchValue}
          showThemeToggle
          isDark={isDark}
          onThemeToggle={() => setIsDark(!isDark)}
          showNotifications={false}
        />
        <div style={{ padding: 'var(--ds-spacing-6)' }}>
          <p style={{ color: 'var(--ds-color-neutral-text-default)' }}>
            {t('storybook.header.headerWithoutUser')}
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Header with custom actions
 */
export const WithCustomActions: Story = {
  render: function Render() {
    const t = useT();
    const [isDark, setIsDark] = useState(false);
    const user = useSampleUser();

    return (
      <div
        style={{
          minHeight: '400px',
          backgroundColor: 'var(--ds-color-neutral-background-default)',
        }}
      >
        <DashboardHeader
          logo={<SampleLogo />}
          user={user}
          showThemeToggle
          isDark={isDark}
          onThemeToggle={() => setIsDark(!isDark)}
          showNotifications
          notificationCount={0}
          onNotificationClick={() => console.log('Notifications clicked')}
          onLogout={() => console.log('Logout')}
          actions={
            <Button data-size="sm" data-color="accent">
              <PlusIcon size={16} />
              {t('storybook.header.newItem')}
            </Button>
          }
        />
        <div style={{ padding: 'var(--ds-spacing-6)' }}>
          <p style={{ color: 'var(--ds-color-neutral-text-default)' }}>
            {t('storybook.header.headerWithCustomAction')}
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Header with many notifications
 */
export const ManyNotifications: Story = {
  render: function Render() {
    const t = useT();
    const [isDark, setIsDark] = useState(false);
    const user = useSampleUser();

    return (
      <div
        style={{
          minHeight: '400px',
          backgroundColor: 'var(--ds-color-neutral-background-default)',
        }}
      >
        <DashboardHeader
          logo={<SampleLogo />}
          user={user}
          showThemeToggle
          isDark={isDark}
          onThemeToggle={() => setIsDark(!isDark)}
          showNotifications
          notificationCount={99}
          onNotificationClick={() => console.log('Notifications clicked')}
          onLogout={() => console.log('Logout')}
        />
        <div style={{ padding: 'var(--ds-spacing-6)' }}>
          <p style={{ color: 'var(--ds-color-neutral-text-default)' }}>
            {t('storybook.header.headerWithManyNotifications')}
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Minimal header (just logo and user)
 */
export const Minimal: Story = {
  render: function Render() {
    const t = useT();
    const user = useSampleUser();

    return (
      <div
        style={{
          minHeight: '400px',
          backgroundColor: 'var(--ds-color-neutral-background-default)',
        }}
      >
        <DashboardHeader
          logo={<SampleLogo />}
          user={user}
          showThemeToggle={false}
          showNotifications={false}
          onLogout={() => console.log('Logout')}
        />
        <div style={{ padding: 'var(--ds-spacing-6)' }}>
          <p style={{ color: 'var(--ds-color-neutral-text-default)' }}>
            {t('storybook.header.minimalHeader')}
          </p>
        </div>
      </div>
    );
  },
};

/**
 * Header with user avatar
 */
export const WithUserAvatar: Story = {
  render: function Render() {
    const t = useT();
    const [isDark, setIsDark] = useState(false);

    return (
      <div
        style={{
          minHeight: '400px',
          backgroundColor: 'var(--ds-color-neutral-background-default)',
        }}
      >
        <DashboardHeader
          logo={<SampleLogo />}
          user={{
            name: t('storybook.header.userName'),
            email: 'ola.nordmann@example.com',
            avatarUrl: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Ola',
          }}
          showThemeToggle
          isDark={isDark}
          onThemeToggle={() => setIsDark(!isDark)}
          showNotifications
          notificationCount={2}
          onNotificationClick={() => console.log('Notifications clicked')}
          onLogout={() => console.log('Logout')}
          onSettingsClick={() => console.log('Settings')}
          onProfileClick={() => console.log('Profile')}
        />
        <div style={{ padding: 'var(--ds-spacing-6)' }}>
          <p style={{ color: 'var(--ds-color-neutral-text-default)' }}>
            {t('storybook.header.headerWithAvatar')}
          </p>
        </div>
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
    const [isDark, setIsDark] = useState(false);
    const user = useSampleUser();

    return (
      <div
        style={{
          minHeight: '400px',
          backgroundColor: 'var(--ds-color-neutral-background-default)',
        }}
      >
        <DashboardHeader
          logo={<SampleLogo />}
          user={user}
          height={100}
          showThemeToggle
          isDark={isDark}
          onThemeToggle={() => setIsDark(!isDark)}
          showNotifications
          notificationCount={5}
          onNotificationClick={() => console.log('Notifications clicked')}
          onLogout={() => console.log('Logout')}
        />
        <div style={{ padding: 'var(--ds-spacing-6)' }}>
          <p style={{ color: 'var(--ds-color-neutral-text-default)' }}>
            {t('storybook.header.headerWithCustomHeight')}
          </p>
        </div>
      </div>
    );
  },
};
