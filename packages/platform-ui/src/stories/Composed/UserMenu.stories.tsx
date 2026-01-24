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
        name: t('storybook.demo.userName.johnDoe'),
        email: t('storybook.demo.email.john'),
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
        name: t('storybook.demo.userName.janeSmith'),
        email: t('storybook.demo.email.jane'),
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
        name: t('storybook.demo.userName.bobJohnson'),
        email: t('storybook.demo.email.bob'),
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
        name: t('storybook.demo.userName.aliceBrown'),
        email: t('storybook.demo.email.alice'),
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
        name: t('storybook.demo.userName.charlieWilson'),
        email: t('storybook.demo.email.charlie'),
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
        name: t('storybook.demo.userName.davidLee'),
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
        name: t('storybook.demo.userName.emmaDavis'),
        email: t('storybook.demo.email.emma'),
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
        name: t('storybook.demo.userName.frankMiller'),
        email: t('storybook.demo.email.frank'),
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
        name: t('storybook.demo.userName.graceTaylor'),
        email: t('storybook.demo.email.grace'),
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
  render: function Render() {
    return <DefaultDemo />;
  },
};

// With avatar
export const WithAvatar: Story = {
  render: function Render() {
    return <WithAvatarDemo />;
  },
};

// With icons
export const WithIcons: Story = {
  render: function Render() {
    return <WithIconsDemo />;
  },
};

// With danger item
export const WithDangerItem: Story = {
  render: function Render() {
    return <WithDangerItemDemo />;
  },
};

// With disabled items
export const WithDisabledItems: Story = {
  render: function Render() {
    return <WithDisabledItemsDemo />;
  },
};

// Without email
export const WithoutEmail: Story = {
  render: function Render() {
    return <WithoutEmailDemo />;
  },
};

// Many items
export const ManyItems: Story = {
  render: function Render() {
    return <ManyItemsDemo />;
  },
};

// With onClick handlers
export const WithOnClick: Story = {
  render: function Render() {
    return <WithOnClickDemo />;
  },
};

// Complete example
export const CompleteExample: Story = {
  render: function Render() {
    return <CompleteExampleDemo />;
  },
};
