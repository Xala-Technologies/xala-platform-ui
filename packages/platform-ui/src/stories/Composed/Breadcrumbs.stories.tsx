import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Breadcrumbs } from '../../composed/Breadcrumbs';
import { Home } from 'lucide-react';

const meta: Meta<typeof Breadcrumbs> = {
  title: 'Composed/Breadcrumbs',
  component: Breadcrumbs,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Breadcrumbs

Navigation breadcrumbs with route integration support. Supports icons, custom separators, and max items with overflow.

### Features
- Breadcrumb navigation items
- Custom separators
- Home icon support
- Max items with overflow indicator
- Icon support for items
- Current page indication

### Usage
\`\`\`tsx
<Breadcrumbs
  items={[
    { label: 'Home', href: '/' },
    { label: 'Resources', href: '/resources' },
    { label: 'Current Page', current: true },
  ]}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onNavigate: fn(),
  },
  argTypes: {
    maxItems: {
      control: 'number',
      description: 'Maximum items before showing overflow',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic breadcrumbs
export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Resources', href: '/resources' },
      { label: 'Current Page', current: true },
    ],
  },
};

// With home icon
export const WithHomeIcon: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', icon: <Home size={16} /> },
      { label: 'Resources', href: '/resources' },
      { label: 'Current Page', current: true },
    ],
    homeIcon: <Home size={16} />,
  },
};

// With icons
export const WithIcons: Story = {
  args: {
    items: [
      { label: 'Home', href: '/', icon: <Home size={16} /> },
      { label: 'Settings', href: '/settings', icon: <Home size={16} /> },
      { label: 'Profile', current: true, icon: <Home size={16} /> },
    ],
  },
};

// Long breadcrumb trail
export const LongTrail: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Administration', href: '/admin' },
      { label: 'Settings', href: '/admin/settings' },
      { label: 'User Management', href: '/admin/settings/users' },
      { label: 'Edit User', current: true },
    ],
  },
};

// With max items
export const WithMaxItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Level 1', href: '/level1' },
      { label: 'Level 2', href: '/level1/level2' },
      { label: 'Level 3', href: '/level1/level2/level3' },
      { label: 'Level 4', href: '/level1/level2/level3/level4' },
      { label: 'Current Page', current: true },
    ],
    maxItems: 3,
  },
};

// Custom separator
export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Resources', href: '/resources' },
      { label: 'Current Page', current: true },
    ],
    separator: '/',
  },
};

// Single item
export const SingleItem: Story = {
  args: {
    items: [{ label: 'Home', current: true }],
  },
};

// Two items
export const TwoItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Current Page', current: true },
    ],
  },
};
