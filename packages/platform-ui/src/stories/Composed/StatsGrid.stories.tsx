import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { StatsGrid, StatCardEnhanced, MiniStat } from '../../composed/StatsGrid';
import { Users, DollarSign, TrendingUp, Activity, ShoppingCart } from 'lucide-react';

const meta: Meta<typeof StatsGrid> = {
  title: 'Composed/StatsGrid',
  component: StatsGrid,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## StatsGrid

Dashboard metrics grid with rich stat cards. Displays multiple stats in a responsive grid layout.

### Features
- Responsive grid layout
- Rich stat cards with trends
- Icons and colors
- Clickable cards
- Loading states
- Mini stat variant

### Usage
\`\`\`tsx
<StatsGrid
  stats={[
    {
      id: '1',
      label: 'Users',
      value: 1250,
      trend: 'up',
      change: 12
    }
  ]}
  columns={4}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    columns: {
      control: 'select',
      options: [2, 3, 4, 5, 6],
      description: 'Number of columns',
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

// Sample stats
const sampleStats = [
  {
    id: '1',
    label: 'Total Users',
    value: 1250,
    change: 12,
    trend: 'up' as const,
    icon: <Users size={20} />,
    color: 'success' as const,
  },
  {
    id: '2',
    label: 'Revenue',
    value: '$45,230',
    change: 8,
    trend: 'up' as const,
    icon: <DollarSign size={20} />,
    color: 'success' as const,
  },
  {
    id: '3',
    label: 'Orders',
    value: 892,
    change: -3,
    trend: 'down' as const,
    icon: <ShoppingCart size={20} />,
    color: 'danger' as const,
  },
  {
    id: '4',
    label: 'Growth',
    value: '24%',
    change: 5,
    trend: 'up' as const,
    icon: <TrendingUp size={20} />,
    color: 'info' as const,
  },
];

// Default grid
export const Default: Story = {
  args: {
    stats: sampleStats,
    columns: 4,
    loading: false,
  },
};

// Two columns
export const TwoColumns: Story = {
  args: {
    stats: sampleStats.slice(0, 2),
    columns: 2,
    loading: false,
  },
};

// Three columns
export const ThreeColumns: Story = {
  args: {
    stats: sampleStats.slice(0, 3),
    columns: 3,
    loading: false,
  },
};

// With click handlers
export const Clickable: Story = {
  args: {
    stats: sampleStats.map((stat) => ({
      ...stat,
      onClick: fn(),
    })),
    columns: 4,
    loading: false,
  },
};

// Loading state
export const Loading: Story = {
  args: {
    stats: sampleStats,
    columns: 4,
    loading: true,
  },
};

// All trends
export const AllTrends: Story = {
  args: {
    stats: [
      {
        id: '1',
        label: 'Up Trend',
        value: 100,
        change: 10,
        trend: 'up' as const,
        icon: <TrendingUp size={20} />,
        color: 'success' as const,
      },
      {
        id: '2',
        label: 'Down Trend',
        value: 50,
        change: -5,
        trend: 'down' as const,
        icon: <Activity size={20} />,
        color: 'danger' as const,
      },
      {
        id: '3',
        label: 'Neutral',
        value: 75,
        change: 0,
        trend: 'neutral' as const,
        icon: <Users size={20} />,
        color: 'default' as const,
      },
    ],
    columns: 3,
    loading: false,
  },
};

// StatCardEnhanced standalone
export const EnhancedCard: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <StatCardEnhanced
        stat={{
          id: '1',
          label: 'Total Users',
          value: 1250,
          change: 12,
          trend: 'up',
          icon: <Users size={20} />,
          color: 'success',
        }}
      />
    </div>
  ),
};

// MiniStat component
export const MiniStatExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)', width: '300px' }}>
      <MiniStat
        label="Users"
        value={1250}
        icon={<Users size={16} />}
        trend="up"
        change={12}
      />
      <MiniStat
        label="Revenue"
        value="$45,230"
        icon={<DollarSign size={16} />}
        trend="up"
        change={8}
      />
      <MiniStat
        label="Orders"
        value={892}
        icon={<ShoppingCart size={16} />}
        trend="down"
        change={-3}
      />
    </div>
  ),
};
