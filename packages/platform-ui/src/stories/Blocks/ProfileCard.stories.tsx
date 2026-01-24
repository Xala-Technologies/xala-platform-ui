import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { ProfileCard, QuickStat } from '../../blocks/profile/ProfileCard';

const meta: Meta<typeof ProfileCard> = {
  title: 'Blocks/ProfileCard',
  component: ProfileCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ProfileCard

Display user profile information with avatar, contact details, and optional edit button.

### Features
- Avatar display
- Contact information
- Role and member since date
- Compact variant
- Edit button
- Quick stats component

### Usage
\`\`\`tsx
<ProfileCard
  profile={{
    id: '1',
    name: 'John Doe',
    email: 'john@example.com',
    phone: '+47 123 45 678',
  }}
  onEdit={handleEdit}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onEdit: fn(),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic profile card
export const Default: Story = {
  args: {
    profile: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+47 123 45 678',
      role: 'Administrator',
      memberSince: '2023-01-15',
    },
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <ProfileCard {...args} />
    </div>
  ),
};

// With avatar URL
export const WithAvatar: Story = {
  args: {
    profile: {
      id: '1',
      name: 'Jane Smith',
      email: 'jane.smith@example.com',
      phone: '+47 987 65 432',
      avatarUrl: 'https://i.pravatar.cc/150?img=1',
      role: 'User',
      memberSince: '2023-06-20',
    },
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <ProfileCard {...args} />
    </div>
  ),
};

// Compact variant
export const Compact: Story = {
  args: {
    profile: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+47 123 45 678',
      role: 'Administrator',
    },
    compact: true,
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <ProfileCard {...args} />
    </div>
  ),
};

// With edit button
export const WithEditButton: Story = {
  args: {
    profile: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      phone: '+47 123 45 678',
      role: 'Administrator',
      memberSince: '2023-01-15',
    },
    onEdit: fn(),
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <ProfileCard {...args} />
    </div>
  ),
};

// Minimal profile
export const Minimal: Story = {
  args: {
    profile: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <ProfileCard {...args} />
    </div>
  ),
};

// Without phone
export const WithoutPhone: Story = {
  args: {
    profile: {
      id: '1',
      name: 'John Doe',
      email: 'john.doe@example.com',
      role: 'User',
      memberSince: '2023-01-15',
    },
  },
  render: (args) => (
    <div style={{ width: '400px' }}>
      <ProfileCard {...args} />
    </div>
  ),
};

// Quick stats
export const QuickStats: Story = {
  render: () => {
    const t = useT();
    return (
      <div style={{ width: '600px' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--ds-spacing-4)',
          }}
        >
          <QuickStat label={t('storybook.demo.cardTitle')} value={24} />
          <QuickStat label={t('storybook.demo.cardTitle')} value={8} />
          <QuickStat label={t('storybook.demo.cardTitle')} value={12} />
        </div>
      </div>
    );
  },
};

// Profile card with quick stats
export const WithQuickStats: Story = {
  render: () => {
    const t = useT();
    return (
      <div style={{ width: '500px' }}>
        <ProfileCard
          profile={{
            id: '1',
            name: 'John Doe',
            email: 'john.doe@example.com',
            phone: '+47 123 45 678',
            role: 'Administrator',
            memberSince: '2023-01-15',
          }}
          onEdit={fn()}
        />
        <div
          style={{
            marginTop: 'var(--ds-spacing-4)',
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: 'var(--ds-spacing-4)',
          }}
        >
          <QuickStat label={t('storybook.demo.cardTitle')} value={24} />
          <QuickStat label={t('storybook.demo.cardTitle')} value={8} />
          <QuickStat label={t('storybook.demo.cardTitle')} value={12} />
        </div>
      </div>
    );
  },
};
