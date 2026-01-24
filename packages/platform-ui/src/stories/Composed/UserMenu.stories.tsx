import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { UserMenu } from '../../composed/UserMenu';
import { Settings, User, CreditCard, LogOut } from 'lucide-react';

const meta: Meta<typeof UserMenu> = {
  title: 'Composed/UserMenu',
  component: UserMenu,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## UserMenu

A dropdown menu for authenticated users. Displays user info and provides navigation/logout options.

### Features
- User avatar and info display
- Custom menu items
- Logout action
- Icon support
- Danger items styling
- Disabled items

### Usage
\`\`\`tsx
<UserMenu
  user={{ name: 'John Doe', email: 'john@example.com' }}
  items={[
    { id: 'profile', label: 'Profile', href: '/profile' },
    { id: 'settings', label: 'Settings', href: '/settings' },
  ]}
  onLogout={handleLogout}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onLogout: fn(),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Wrapper components for stories that need translations
const DefaultDemo = () => {
  const t = useT();
  return (
    <UserMenu
      user={{
        name: 'John Doe',
        email: 'john.doe@example.com',
      }}
      items={[
        { id: 'profile', label: t('platform.nav.profile'), href: '/profile' },
        { id: 'settings', label: t('platform.nav.settings'), href: '/settings' },
      ]}
      onLogout={fn()}
    />
  );
};

const WithAvatarDemo = () => {
  const t = useT();
  return (
    <UserMenu
      user={{
        name: 'Jane Smith',
        email: 'jane.smith@example.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=1',
      }}
      items={[
        { id: 'profile', label: t('platform.nav.profile'), href: '/profile' },
        { id: 'settings', label: t('platform.nav.settings'), href: '/settings' },
      ]}
      onLogout={fn()}
    />
  );
};

const WithIconsDemo = () => {
  const t = useT();
  return (
    <UserMenu
      user={{
        name: 'Bob Johnson',
        email: 'bob@example.com',
      }}
      items={[
        {
          id: 'profile',
          label: t('platform.nav.profile'),
          icon: <User size={16} />,
          href: '/profile',
        },
        {
          id: 'settings',
          label: t('platform.nav.settings'),
          icon: <Settings size={16} />,
          href: '/settings',
        },
        {
          id: 'billing',
          label: t('storybook.demo.billing'),
          icon: <CreditCard size={16} />,
          href: '/billing',
        },
      ]}
      onLogout={fn()}
    />
  );
};

const WithDangerItemDemo = () => {
  const t = useT();
  return (
    <UserMenu
      user={{
        name: 'Alice Brown',
        email: 'alice@example.com',
      }}
      items={[
        { id: 'profile', label: t('platform.nav.profile'), href: '/profile' },
        { id: 'settings', label: t('platform.nav.settings'), href: '/settings' },
        { id: 'delete', label: t('storybook.demo.deleteAccount'), danger: true, onClick: fn() },
      ]}
      onLogout={fn()}
    />
  );
};

const WithDisabledItemsDemo = () => {
  const t = useT();
  return (
    <UserMenu
      user={{
        name: 'Charlie Wilson',
        email: 'charlie@example.com',
      }}
      items={[
        { id: 'profile', label: t('platform.nav.profile'), href: '/profile' },
        { id: 'settings', label: t('platform.nav.settings'), disabled: true, href: '/settings' },
        { id: 'billing', label: t('storybook.demo.billing'), href: '/billing' },
      ]}
      onLogout={fn()}
    />
  );
};

const WithoutEmailDemo = () => {
  const t = useT();
  return (
    <UserMenu
      user={{
        name: 'David Lee',
      }}
      items={[
        { id: 'profile', label: t('platform.nav.profile'), href: '/profile' },
        { id: 'settings', label: t('platform.nav.settings'), href: '/settings' },
      ]}
      onLogout={fn()}
    />
  );
};

const ManyItemsDemo = () => {
  const t = useT();
  return (
    <UserMenu
      user={{
        name: 'Emma Davis',
        email: 'emma@example.com',
      }}
      items={[
        { id: 'profile', label: t('platform.nav.profile'), href: '/profile' },
        { id: 'settings', label: t('platform.nav.settings'), href: '/settings' },
        { id: 'billing', label: t('storybook.demo.billing'), href: '/billing' },
        { id: 'notifications', label: t('storybook.demo.notifications'), href: '/notifications' },
        { id: 'privacy', label: t('storybook.demo.privacy'), href: '/privacy' },
        { id: 'help', label: t('platform.nav.help'), href: '/help' },
      ]}
      onLogout={fn()}
    />
  );
};

const WithOnClickDemo = () => {
  const t = useT();
  return (
    <UserMenu
      user={{
        name: 'Frank Miller',
        email: 'frank@example.com',
      }}
      items={[
        { id: 'profile', label: t('platform.nav.profile'), onClick: fn() },
        { id: 'settings', label: t('platform.nav.settings'), onClick: fn() },
        { id: 'action', label: t('storybook.demo.customAction'), onClick: fn() },
      ]}
      onLogout={fn()}
    />
  );
};

const CompleteExampleDemo = () => {
  const t = useT();
  return (
    <UserMenu
      user={{
        name: 'Grace Taylor',
        email: 'grace.taylor@example.com',
        avatarUrl: 'https://i.pravatar.cc/150?img=5',
      }}
      items={[
        {
          id: 'profile',
          label: t('platform.nav.profile'),
          icon: <User size={16} />,
          href: '/profile',
        },
        {
          id: 'settings',
          label: t('platform.nav.settings'),
          icon: <Settings size={16} />,
          href: '/settings',
        },
        {
          id: 'billing',
          label: t('storybook.demo.billing'),
          icon: <CreditCard size={16} />,
          href: '/billing',
        },
        { id: 'divider', label: '', disabled: true },
        {
          id: 'delete',
          label: t('storybook.demo.deleteAccount'),
          icon: <LogOut size={16} />,
          danger: true,
          onClick: fn(),
        },
      ]}
      onLogout={fn()}
    />
  );
};

// Basic user menu
export const Default: Story = {
  render: () => <DefaultDemo />,
};

// With avatar
export const WithAvatar: Story = {
  render: () => <WithAvatarDemo />,
};

// With icons
export const WithIcons: Story = {
  render: () => <WithIconsDemo />,
};

// With danger item
export const WithDangerItem: Story = {
  render: () => <WithDangerItemDemo />,
};

// With disabled items
export const WithDisabledItems: Story = {
  render: () => <WithDisabledItemsDemo />,
};

// Without email
export const WithoutEmail: Story = {
  render: () => <WithoutEmailDemo />,
};

// Many items
export const ManyItems: Story = {
  render: () => <ManyItemsDemo />,
};

// With onClick handlers
export const WithOnClick: Story = {
  render: () => <WithOnClickDemo />,
};

// Complete example
export const CompleteExample: Story = {
  render: () => <CompleteExampleDemo />,
};
