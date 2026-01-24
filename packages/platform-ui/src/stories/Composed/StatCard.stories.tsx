import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
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

// Wrapper for default story
const DefaultDemo = () => {
  const t = useT();
  return (
    <StatCard
      label={t('storybook.demo.totalUsers')}
      value={1250}
      variant="default"
      size="md"
      loading={false}
    />
  );
};

// Basic stat card
export const Default: Story = {
  render: function Render() {
    return <DefaultDemo />;
  },
};

// Wrapper for with icon story
const WithIconDemo = () => {
  const t = useT();
  return (
    <StatCard
      label={t('storybook.demo.totalUsers')}
      value={1250}
      icon={<Users size={24} />}
      variant="default"
      size="md"
      loading={false}
    />
  );
};

// With icon
export const WithIcon: Story = {
  render: function Render() {
    return <WithIconDemo />;
  },
};

// Wrapper for trend up story
const TrendUpDemo = () => {
  const t = useT();
  return (
    <StatCard
      label={t('storybook.demo.revenue')}
      value="$45,230"
      trend={{
        direction: 'up',
        value: '12.5%',
        label: t('storybook.demo.vsLastMonth'),
      }}
      icon={<TrendingUp size={24} />}
      variant="success"
      size="md"
      loading={false}
    />
  );
};

// With trend up
export const TrendUp: Story = {
  render: function Render() {
    return <TrendUpDemo />;
  },
};

// Wrapper for trend down story
const TrendDownDemo = () => {
  const t = useT();
  return (
    <StatCard
      label={t('storybook.demo.activeUsers')}
      value={892}
      trend={{
        direction: 'down',
        value: '3.2%',
        label: t('storybook.demo.vsLastWeek'),
      }}
      icon={<Activity size={24} />}
      variant="danger"
      size="md"
      loading={false}
    />
  );
};

// With trend down
export const TrendDown: Story = {
  render: function Render() {
    return <TrendDownDemo />;
  },
};

// Wrapper for trend neutral story
const TrendNeutralDemo = () => {
  const t = useT();
  return (
    <StatCard
      label={t('storybook.demo.orders')}
      value={1240}
      trend={{
        direction: 'neutral',
        value: '0%',
        label: t('storybook.demo.noChange'),
      }}
      icon={<DollarSign size={24} />}
      variant="default"
      size="md"
      loading={false}
    />
  );
};

// With trend neutral
export const TrendNeutral: Story = {
  render: function Render() {
    return <TrendNeutralDemo />;
  },
};

// Wrapper for small size story
const SmallDemo = () => {
  const t = useT();
  return (
    <StatCard
      label={t('storybook.demo.smallCard')}
      value={100}
      icon={<Users size={20} />}
      variant="default"
      size="sm"
      loading={false}
    />
  );
};

// Size variants
export const Small: Story = {
  render: function Render() {
    return <SmallDemo />;
  },
};

// Wrapper for large size story
const LargeDemo = () => {
  const t = useT();
  return (
    <StatCard
      label={t('storybook.demo.largeCard')}
      value={5000}
      icon={<Users size={32} />}
      variant="default"
      size="lg"
      loading={false}
    />
  );
};

export const Large: Story = {
  render: function Render() {
    return <LargeDemo />;
  },
};

// Wrapper for success variant
const SuccessDemo = () => {
  const t = useT();
  return (
    <StatCard
      label={t('storybook.story.success')}
      value={100}
      icon={<Users size={24} />}
      variant="success"
      size="md"
      loading={false}
    />
  );
};

// Variants
export const Success: Story = {
  render: function Render() {
    return <SuccessDemo />;
  },
};

// Wrapper for warning variant
const WarningDemo = () => {
  const t = useT();
  return (
    <StatCard
      label={t('storybook.demo.warning')}
      value={50}
      icon={<Activity size={24} />}
      variant="warning"
      size="md"
      loading={false}
    />
  );
};

export const Warning: Story = {
  render: function Render() {
    return <WarningDemo />;
  },
};

// Wrapper for danger variant
const DangerDemo = () => {
  const t = useT();
  return (
    <StatCard
      label={t('storybook.demo.danger')}
      value={25}
      icon={<TrendingUp size={24} />}
      variant="danger"
      size="md"
      loading={false}
    />
  );
};

export const Danger: Story = {
  render: function Render() {
    return <DangerDemo />;
  },
};

// Wrapper for info variant
const InfoDemo = () => {
  const t = useT();
  return (
    <StatCard
      label={t('storybook.demo.info')}
      value={75}
      icon={<DollarSign size={24} />}
      variant="info"
      size="md"
      loading={false}
    />
  );
};

export const Info: Story = {
  render: function Render() {
    return <InfoDemo />;
  },
};

// Wrapper for loading state
const LoadingDemo = () => {
  const t = useT();
  return (
    <StatCard
      label={t('storybook.story.loading')}
      value={0}
      variant="default"
      size="md"
      loading={true}
    />
  );
};

// Loading state
export const Loading: Story = {
  render: function Render() {
    return <LoadingDemo />;
  },
};

// Wrapper for clickable story
const ClickableDemo = () => {
  const t = useT();
  return (
    <StatCard
      label={t('storybook.demo.clickableCard')}
      value={500}
      icon={<Users size={24} />}
      variant="default"
      size="md"
      loading={false}
      onClick={fn()}
    />
  );
};

// Clickable
export const Clickable: Story = {
  render: function Render() {
    return <ClickableDemo />;
  },
};

// Wrapper for grid story
const GridDemo = () => {
  const t = useT();
  return (
    <StatCardGrid columns={4} gap="md">
      <StatCard
        label={t('storybook.demo.users')}
        value={1250}
        icon={<Users size={24} />}
        trend={{ direction: 'up', value: '12%' }}
        variant="success"
      />
      <StatCard
        label={t('storybook.demo.revenue')}
        value="$45,230"
        icon={<DollarSign size={24} />}
        trend={{ direction: 'up', value: '8%' }}
        variant="success"
      />
      <StatCard
        label={t('storybook.demo.orders')}
        value={892}
        icon={<Activity size={24} />}
        trend={{ direction: 'down', value: '3%' }}
        variant="danger"
      />
      <StatCard
        label={t('storybook.demo.growth')}
        value="24%"
        icon={<TrendingUp size={24} />}
        trend={{ direction: 'up', value: '5%' }}
        variant="info"
      />
    </StatCardGrid>
  );
};

// StatCardGrid
export const Grid: Story = {
  render: function Render() {
    return <GridDemo />;
  },
};
