import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import {
  StatCard,
  ActivityItem,
  ActivityFeed,
  QuickActionCard,
  Stack,
  Paragraph,
  Card,
} from '../../index';
import { UsersIcon, CalendarIcon, TrendingUpIcon } from '../../index';

/**
 * DashboardComponents provides reusable components for admin dashboards.
 *
 * ## Components
 * - StatCard: KPI/Metric display card
 * - ActivityItem: Individual activity item
 * - ActivityFeed: List of activities
 * - QuickActionCard: Quick action card
 *
 * ## When to Use
 * - Admin dashboards
 * - Analytics pages
 * - Activity feeds
 */
const meta: Meta<typeof StatCard> = {
  title: 'Blocks/DashboardComponents',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatCard>;

/**
 * StatCard component
 */
export const StatCardExample: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.dashboardComponents.statCard')}</Paragraph>
            <StatCard
              title={t('storybook.dashboardComponents.totalUsers')}
              value="1,234"
              description={t('storybook.dashboardComponents.activeUsers')}
              icon={<UsersIcon />}
              trend={{ value: 12, isPositive: true }}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * ActivityItem component
 */
export const ActivityItemExample: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.dashboardComponents.activityItem')}</Paragraph>
            <ActivityItem
              title={t('storybook.dashboardComponents.activityTitle')}
              description={t('storybook.dashboardComponents.activityDescription')}
              timestamp={new Date().toISOString()}
              status="completed"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * ActivityFeed component
 */
export const ActivityFeedExample: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.dashboardComponents.activityFeed')}</Paragraph>
            <ActivityFeed
              activities={[
                {
                  id: '1',
                  title: t('storybook.dashboardComponents.activity1'),
                  description: t('storybook.dashboardComponents.activity1Description'),
                  timestamp: new Date().toISOString(),
                  status: 'completed',
                },
                {
                  id: '2',
                  title: t('storybook.dashboardComponents.activity2'),
                  description: t('storybook.dashboardComponents.activity2Description'),
                  timestamp: new Date(Date.now() - 3600000).toISOString(),
                  status: 'pending',
                },
              ]}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * QuickActionCard component
 */
export const QuickActionCardExample: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.dashboardComponents.quickAction')}</Paragraph>
            <QuickActionCard
              title={t('storybook.dashboardComponents.createNew')}
              description={t('storybook.dashboardComponents.createNewDescription')}
              icon={<CalendarIcon />}
              onClick={() => console.log('Quick action clicked')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
