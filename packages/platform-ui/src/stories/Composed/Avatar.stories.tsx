import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { Avatar, UserInfo } from '../../composed/Avatar';

const meta: Meta<typeof Avatar> = {
  title: 'Composed/Avatar',
  component: Avatar,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Avatar

Consistent user avatar display with fallback initials. Supports different sizes and online status indicator.

### Features
- Image with fallback to initials
- Color-coded backgrounds based on name
- Online/offline status indicator
- Multiple size variants
- UserInfo component for avatar with name/subtitle

### Usage
\`\`\`tsx
<Avatar
  src="/avatar.jpg"
  name="John Doe"
  size="md"
  showStatus={true}
  isOnline={true}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['xs', 'sm', 'md', 'lg', 'xl'],
      description: 'Avatar size',
    },
    showStatus: {
      control: 'boolean',
      description: 'Show online status indicator',
    },
    isOnline: {
      control: 'boolean',
      description: 'Online status (only relevant if showStatus is true)',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// With image
export const WithImage: Story = {
  args: {
    src: 'https://i.pravatar.cc/150?img=1',
    name: 'John Doe',
    alt: 'John Doe',
    size: 'md',
    showStatus: false,
  },
};

// With initials
export const WithInitials: Story = {
  args: {
    name: 'John Doe',
    size: 'md',
    showStatus: false,
  },
};

// Single name
export const SingleName: Story = {
  args: {
    name: 'John',
    size: 'md',
    showStatus: false,
  },
};

// Online status
export const Online: Story = {
  args: {
    name: 'Jane Smith',
    size: 'md',
    showStatus: true,
    isOnline: true,
  },
};

// Offline status
export const Offline: Story = {
  args: {
    name: 'Jane Smith',
    size: 'md',
    showStatus: true,
    isOnline: false,
  },
};

// Size variants
export const ExtraSmall: Story = {
  args: {
    name: 'XS Avatar',
    size: 'xs',
    showStatus: false,
  },
};

export const Small: Story = {
  args: {
    name: 'SM Avatar',
    size: 'sm',
    showStatus: false,
  },
};

export const Medium: Story = {
  args: {
    name: 'MD Avatar',
    size: 'md',
    showStatus: false,
  },
};

export const Large: Story = {
  args: {
    name: 'LG Avatar',
    size: 'lg',
    showStatus: false,
  },
};

export const ExtraLarge: Story = {
  args: {
    name: 'XL Avatar',
    size: 'xl',
    showStatus: false,
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: function Render() {
    return (
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-4)' }}>
        <Avatar name="XS" size="xs" />
        <Avatar name="SM" size="sm" />
        <Avatar name="MD" size="md" />
        <Avatar name="LG" size="lg" />
        <Avatar name="XL" size="xl" />
      </div>
    );
  },
};

// UserInfo component
const UserInfoExample = () => {
  const t = useT();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <UserInfo name="John Doe" subtitle={t('storybook.demo.administrator')} size="md" />
      <UserInfo name="Jane Smith" subtitle="jane@example.com" size="md" showStatus isOnline />
      <UserInfo name="Bob Johnson" subtitle={t('storybook.demo.developer')} size="lg" />
    </div>
  );
};

export const UserInfoExampleStory: Story = {
  name: 'UserInfoExample',
  render: () => <UserInfoExample />,
};

// UserInfo clickable
const UserInfoClickableExample = () => {
  const t = useT();
  return (
    <UserInfo
      name={t('storybook.demo.clickableUser')}
      subtitle={t('storybook.demo.clickToViewProfile')}
      size="md"
      onClick={() => alert('Clicked!')}
    />
  );
};

export const UserInfoClickable: Story = {
  render: () => <UserInfoClickableExample />,
};
