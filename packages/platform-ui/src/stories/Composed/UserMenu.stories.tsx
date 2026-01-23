import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
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

// Basic user menu
export const Default: Story = {
  args: {
    user: {
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    items: [
      { id: 'profile', label: 'Min profil', href: '/profile' },
      { id: 'settings', label: 'Innstillinger', href: '/settings' },
    ],
  },
};

// With avatar
export const WithAvatar: Story = {
  args: {
    user: {
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
    },
    items: [
      { id: 'profile', label: 'Min profil', href: '/profile' },
      { id: 'settings', label: 'Innstillinger', href: '/settings' },
    ],
  },
};

// With icons
export const WithIcons: Story = {
  args: {
    user: {
      name: 'Bob Johnson',
      email: 'bob@example.com',
    },
    items: [
      { id: 'profile', label: 'Min profil', icon: <User size={16} />, href: '/profile' },
      { id: 'settings', label: 'Innstillinger', icon: <Settings size={16} />, href: '/settings' },
      { id: 'billing', label: 'Fakturering', icon: <CreditCard size={16} />, href: '/billing' },
    ],
  },
};

// With danger item
export const WithDangerItem: Story = {
  args: {
    user: {
      name: 'Alice Brown',
      email: 'alice@example.com',
    },
    items: [
      { id: 'profile', label: 'Min profil', href: '/profile' },
      { id: 'settings', label: 'Innstillinger', href: '/settings' },
      { id: 'delete', label: 'Slett konto', danger: true, onClick: fn() },
    ],
  },
};

// With disabled items
export const WithDisabledItems: Story = {
  args: {
    user: {
      name: 'Charlie Wilson',
      email: 'charlie@example.com',
    },
    items: [
      { id: 'profile', label: 'Min profil', href: '/profile' },
      { id: 'settings', label: 'Innstillinger', disabled: true, href: '/settings' },
      { id: 'billing', label: 'Fakturering', href: '/billing' },
    ],
  },
};

// Without email
export const WithoutEmail: Story = {
  args: {
    user: {
      name: 'David Lee',
    },
    items: [
      { id: 'profile', label: 'Min profil', href: '/profile' },
      { id: 'settings', label: 'Innstillinger', href: '/settings' },
    ],
  },
};

// Many items
export const ManyItems: Story = {
  args: {
    user: {
      name: 'Emma Davis',
      email: 'emma@example.com',
    },
    items: [
      { id: 'profile', label: 'Min profil', href: '/profile' },
      { id: 'settings', label: 'Innstillinger', href: '/settings' },
      { id: 'billing', label: 'Fakturering', href: '/billing' },
      { id: 'notifications', label: 'Varsler', href: '/notifications' },
      { id: 'privacy', label: 'Personvern', href: '/privacy' },
      { id: 'help', label: 'Hjelp', href: '/help' },
    ],
  },
};

// With onClick handlers
export const WithOnClick: Story = {
  args: {
    user: {
      name: 'Frank Miller',
      email: 'frank@example.com',
    },
    items: [
      { id: 'profile', label: 'Min profil', onClick: fn() },
      { id: 'settings', label: 'Innstillinger', onClick: fn() },
      { id: 'action', label: 'Custom Action', onClick: fn() },
    ],
  },
};

// Complete example
export const CompleteExample: Story = {
  args: {
    user: {
      name: 'Grace Taylor',
      email: 'grace.taylor@example.com',
      avatarUrl: 'https://i.pravatar.cc/150?img=5',
    },
    items: [
      { id: 'profile', label: 'Min profil', icon: <User size={16} />, href: '/profile' },
      { id: 'settings', label: 'Innstillinger', icon: <Settings size={16} />, href: '/settings' },
      { id: 'billing', label: 'Fakturering', icon: <CreditCard size={16} />, href: '/billing' },
      { id: 'divider', label: '', disabled: true },
      { id: 'delete', label: 'Slett konto', icon: <LogOut size={16} />, danger: true, onClick: fn() },
    ],
  },
};
