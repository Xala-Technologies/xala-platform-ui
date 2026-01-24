import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
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

// Sample stats helper
const useSampleStats = () => {
  const t = useT();
  return [
    {
      id: '1',
      label: t('storybook.demo.totalUsers'),
      value: 1250,
      change: 12,
      trend: 'up' as const,
      icon: <Users size={20} />,
      color: 'success' as const,
    },
    {
      id: '2',
      label: t('storybook.demo.revenue'),
      value: '$45,230',
      change: 8,
      trend: 'up' as const,
      icon: <DollarSign size={20} />,
      color: 'success' as const,
    },
    {
      id: '3',
      label: t('storybook.demo.orders'),
      value: 892,
      change: -3,
      trend: 'down' as const,
      icon: <ShoppingCart size={20} />,
      color: 'danger' as const,
    },
    {
      id: '4',
      label: t('storybook.demo.growth'),
      value: '24%',
      change: 5,
      trend: 'up' as const,
      icon: <TrendingUp size={20} />,
      color: 'info' as const,
    },
  ];
};

// Wrapper for stories that need translations
const StatsGridDemo = ({
  columns,
  loading,
  clickable,
}: {
  columns: number;
  loading?: boolean;
  clickable?: boolean;
}) => {
  const stats = useSampleStats();
  const statsToUse = clickable ? stats.map((stat) => ({ ...stat, onClick: fn() })) : stats;
  return <StatsGrid stats={statsToUse} columns={columns} loading={loading} />;
};

const TwoColumnsDemo = () => {
  const stats = useSampleStats();
  return <StatsGrid stats={stats.slice(0, 2)} columns={2} loading={false} />;
};

const ThreeColumnsDemo = () => {
  const stats = useSampleStats();
  return <StatsGrid stats={stats.slice(0, 3)} columns={3} loading={false} />;
};

const AllTrendsDemo = () => {
  const t = useT();
  const stats = [
    {
      id: '1',
      label: t('storybook.demo.upTrend'),
      value: 100,
      change: 10,
      trend: 'up' as const,
      icon: <TrendingUp size={20} />,
      color: 'success' as const,
    },
    {
      id: '2',
      label: t('storybook.demo.downTrend'),
      value: 50,
      change: -5,
      trend: 'down' as const,
      icon: <Activity size={20} />,
      color: 'danger' as const,
    },
    {
      id: '3',
      label: t('storybook.demo.neutral'),
      value: 75,
      change: 0,
      trend: 'neutral' as const,
      icon: <Users size={20} />,
      color: 'default' as const,
    },
  ];
  return <StatsGrid stats={stats} columns={3} loading={false} />;
};

const EnhancedCardDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '300px' }}>
      <StatCardEnhanced
        stat={{
          id: '1',
          label: t('storybook.demo.totalUsers'),
          value: 1250,
          change: 12,
          trend: 'up',
          icon: <Users size={20} />,
          color: 'success',
        }}
      />
    </div>
  );
};

const MiniStatDemo = () => {
  const t = useT();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-2)',
        width: '300px',
      }}
    >
      <MiniStat
        label={t('storybook.demo.users')}
        value={1250}
        icon={<Users size={16} />}
        trend="up"
        change={12}
      />
      <MiniStat
        label={t('storybook.demo.revenue')}
        value="$45,230"
        icon={<DollarSign size={16} />}
        trend="up"
        change={8}
      />
      <MiniStat
        label={t('storybook.demo.orders')}
        value={892}
        icon={<ShoppingCart size={16} />}
        trend="down"
        change={-3}
      />
    </div>
  );
};

// Default grid
export const Default: Story = {
  render: () => <StatsGridDemo columns={4} loading={false} />,
};

// Two columns
export const TwoColumns: Story = {
  render: () => <TwoColumnsDemo />,
};

// Three columns
export const ThreeColumns: Story = {
  render: () => <ThreeColumnsDemo />,
};

// With click handlers
export const Clickable: Story = {
  render: () => <StatsGridDemo columns={4} loading={false} clickable />,
};

// Loading state
export const Loading: Story = {
  render: () => <StatsGridDemo columns={4} loading={true} />,
};

// All trends
export const AllTrends: Story = {
  render: () => <AllTrendsDemo />,
};

// StatCardEnhanced standalone
export const EnhancedCard: Story = {
  render: () => <EnhancedCardDemo />,
};

// MiniStat component
export const MiniStatExample: Story = {
  render: () => <MiniStatDemo />,
};
