import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { AvatarGroup, AvatarItem } from '../../composed/AvatarGroup';

const meta: Meta<typeof AvatarGroup> = {
  title: 'Composed/AvatarGroup',
  component: AvatarGroup,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## AvatarGroup

Stack of avatars with overflow indicator. Displays multiple avatars in a grouped layout.

### Features
- Overlapping avatars with proper z-index
- Overflow indicator (+N)
- Multiple size variants
- Spacing options (tight, normal, loose)
- Status indicators (online, offline, away, busy)

### Usage
\`\`\`tsx
<AvatarGroup
  items={[
    { name: 'John Doe', src: '/avatar1.jpg' },
    { name: 'Jane Smith', src: '/avatar2.jpg' },
  ]}
  max={5}
  size="md"
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
    spacing: {
      control: 'select',
      options: ['tight', 'normal', 'loose'],
      description: 'Spacing between avatars',
    },
    max: {
      control: 'number',
      description: 'Maximum number of avatars to display',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample items
const sampleItems = [
  { name: 'John Doe', src: 'https://i.pravatar.cc/150?img=1' },
  { name: 'Jane Smith', src: 'https://i.pravatar.cc/150?img=2' },
  { name: 'Bob Johnson', src: 'https://i.pravatar.cc/150?img=3' },
  { name: 'Alice Brown', src: 'https://i.pravatar.cc/150?img=4' },
  { name: 'Charlie Wilson', src: 'https://i.pravatar.cc/150?img=5' },
];

// Basic group
export const Default: Story = {
  args: {
    items: sampleItems.slice(0, 3),
    max: 5,
    size: 'md',
    spacing: 'normal',
  },
};

// With overflow
export const WithOverflow: Story = {
  args: {
    items: sampleItems,
    max: 3,
    size: 'md',
    spacing: 'normal',
  },
};

// With status indicators
export const WithStatus: Story = {
  args: {
    items: [
      { name: 'John Doe', src: 'https://i.pravatar.cc/150?img=1', status: 'online' as const },
      { name: 'Jane Smith', src: 'https://i.pravatar.cc/150?img=2', status: 'away' as const },
      { name: 'Bob Johnson', src: 'https://i.pravatar.cc/150?img=3', status: 'busy' as const },
      { name: 'Alice Brown', src: 'https://i.pravatar.cc/150?img=4', status: 'offline' as const },
    ],
    max: 5,
    size: 'md',
    spacing: 'normal',
  },
};

// With initials only
export const WithInitials: Story = {
  args: {
    items: [
      { name: 'John Doe' },
      { name: 'Jane Smith' },
      { name: 'Bob Johnson' },
      { name: 'Alice Brown' },
    ],
    max: 5,
    size: 'md',
    spacing: 'normal',
  },
};

// Tight spacing
export const TightSpacing: Story = {
  args: {
    items: sampleItems.slice(0, 4),
    max: 5,
    size: 'md',
    spacing: 'tight',
  },
};

// Loose spacing
export const LooseSpacing: Story = {
  args: {
    items: sampleItems.slice(0, 4),
    max: 5,
    size: 'md',
    spacing: 'loose',
  },
};

// Small size
export const SmallSize: Story = {
  args: {
    items: sampleItems.slice(0, 4),
    max: 5,
    size: 'sm',
    spacing: 'normal',
  },
};

// Large size
export const LargeSize: Story = {
  args: {
    items: sampleItems.slice(0, 4),
    max: 5,
    size: 'lg',
    spacing: 'normal',
  },
};

// Many avatars
export const ManyAvatars: Story = {
  args: {
    items: [
      ...sampleItems,
      { name: 'David Lee' },
      { name: 'Emma Davis' },
      { name: 'Frank Miller' },
      { name: 'Grace Taylor' },
    ],
    max: 5,
    size: 'md',
    spacing: 'normal',
  },
};

// Single avatar item
export const SingleAvatarItem: Story = {
  render: function Render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <AvatarItem name="John Doe" src="https://i.pravatar.cc/150?img=1" size="md" />
        <AvatarItem name="Jane Smith" size="md" status="online" />
        <AvatarItem name="Bob Johnson" size="md" status="away" />
        <AvatarItem name="Alice Brown" size="md" status="busy" />
      </div>
    );
  },
};
