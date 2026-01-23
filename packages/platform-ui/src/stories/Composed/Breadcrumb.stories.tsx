import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Breadcrumb } from '../../composed/Breadcrumb';

const meta: Meta<typeof Breadcrumb> = {
  title: 'Composed/Breadcrumb',
  component: Breadcrumb,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Breadcrumb

Navigation breadcrumb component for showing page hierarchy. Supports links and click handlers.

### Features
- Hierarchical navigation display
- Custom separators
- Link and onClick support
- Current page indication
- Proper ARIA labels

### Usage
\`\`\`tsx
<Breadcrumb
  items={[
    { label: 'Home', href: '/' },
    { label: 'Facilities', href: '/facilities' },
    { label: 'Meeting Room 101' }
  ]}
/>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic breadcrumb
export const Default: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Facilities', href: '/facilities' },
      { label: 'Meeting Room 101' },
    ],
  },
};

// With onClick handlers
export const WithOnClick: Story = {
  args: {
    items: [
      { label: 'Home', onClick: fn() },
      { label: 'Facilities', onClick: fn() },
      { label: 'Meeting Room 101' },
    ],
  },
};

// Custom separator
export const CustomSeparator: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Facilities', href: '/facilities' },
      { label: 'Meeting Room 101' },
    ],
    separator: '/',
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
      { label: 'Edit User' },
    ],
  },
};

// Single item
export const SingleItem: Story = {
  args: {
    items: [{ label: 'Home' }],
  },
};

// Two items
export const TwoItems: Story = {
  args: {
    items: [
      { label: 'Home', href: '/' },
      { label: 'Current Page' },
    ],
  },
};
