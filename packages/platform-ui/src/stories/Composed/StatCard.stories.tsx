import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { StatCard, StatCardGrid } from '../../composed/StatCard';
import { Users, DollarSign, TrendingUp, Activity } from 'lucide-react';

const meta: Meta<typeof StatCard> = {
  title: 'Composed/StatCard',
  component: StatCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## StatCard

Consistent stat/metric cards for dashboards. Displays a value with label, optional trend indicator, and icon.

### Features
- Value and label display
- Trend indicators (up, down, neutral)
- Icon support
- Size variants
- Variant colors
- Loading state
- Clickable cards

### Usage
\`\`\`tsx
<StatCard
  label="Total Users"
  value={1250}
  trend={{ direction: 'up', value: '12%' }}
  icon={<UsersIcon />}
  variant="success"
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger', 'info'],
      description: 'Card variant',
    },
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Card size',
    },
    loading: {
      control: 'boolean',
      description: 'Loading state',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic stat card
export const Default: Story = {
  args: {
    label: 'Total Users',
    value: 1250,
    variant: 'default',
    size: 'md',
    loading: false,
  },
};

// With icon
export const WithIcon: Story = {
  args: {
    label: 'Total Users',
    value: 1250,
    icon: <Users size={24} />,
    variant: 'default',
    size: 'md',
    loading: false,
  },
};

// With trend up
export const TrendUp: Story = {
  args: {
    label: 'Revenue',
    value: '$45,230',
    trend: {
      direction: 'up',
      value: '12.5%',
      label: 'vs last month',
    },
    icon: <TrendingUp size={24} />,
    variant: 'success',
    size: 'md',
    loading: false,
  },
};

// With trend down
export const TrendDown: Story = {
  args: {
    label: 'Active Users',
    value: 892,
    trend: {
      direction: 'down',
      value: '3.2%',
      label: 'vs last week',
    },
    icon: <Activity size={24} />,
    variant: 'danger',
    size: 'md',
    loading: false,
  },
};

// With trend neutral
export const TrendNeutral: Story = {
  args: {
    label: 'Orders',
    value: 1240,
    trend: {
      direction: 'neutral',
      value: '0%',
      label: 'no change',
    },
    icon: <DollarSign size={24} />,
    variant: 'default',
    size: 'md',
    loading: false,
  },
};

// Size variants
export const Small: Story = {
  args: {
    label: 'Small Card',
    value: 100,
    icon: <Users size={20} />,
    variant: 'default',
    size: 'sm',
    loading: false,
  },
};

export const Large: Story = {
  args: {
    label: 'Large Card',
    value: 5000,
    icon: <Users size={32} />,
    variant: 'default',
    size: 'lg',
    loading: false,
  },
};

// Variants
export const Success: Story = {
  args: {
    label: 'Success',
    value: 100,
    icon: <Users size={24} />,
    variant: 'success',
    size: 'md',
    loading: false,
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning',
    value: 50,
    icon: <Activity size={24} />,
    variant: 'warning',
    size: 'md',
    loading: false,
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger',
    value: 25,
    icon: <TrendingUp size={24} />,
    variant: 'danger',
    size: 'md',
    loading: false,
  },
};

export const Info: Story = {
  args: {
    label: 'Info',
    value: 75,
    icon: <DollarSign size={24} />,
    variant: 'info',
    size: 'md',
    loading: false,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    label: 'Loading',
    value: 0,
    variant: 'default',
    size: 'md',
    loading: true,
  },
};

// Clickable
export const Clickable: Story = {
  args: {
    label: 'Clickable Card',
    value: 500,
    icon: <Users size={24} />,
    variant: 'default',
    size: 'md',
    loading: false,
    onClick: fn(),
  },
};

// StatCardGrid
export const Grid: Story = {
  render: () => (
    <StatCardGrid columns={4} gap="md">
      <StatCard
        label="Users"
        value={1250}
        icon={<Users size={24} />}
        trend={{ direction: 'up', value: '12%' }}
        variant="success"
      />
      <StatCard
        label="Revenue"
        value="$45,230"
        icon={<DollarSign size={24} />}
        trend={{ direction: 'up', value: '8%' }}
        variant="success"
      />
      <StatCard
        label="Orders"
        value={892}
        icon={<Activity size={24} />}
        trend={{ direction: 'down', value: '3%' }}
        variant="danger"
      />
      <StatCard
        label="Growth"
        value="24%"
        icon={<TrendingUp size={24} />}
        trend={{ direction: 'up', value: '5%' }}
        variant="info"
      />
    </StatCardGrid>
  ),
};
