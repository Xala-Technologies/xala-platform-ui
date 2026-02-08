import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { StatusTabs, Stack, Paragraph, Card } from '../../index';
import { CheckCircleIcon, ClockIcon, XCircleIcon } from '../../index';

/**
 * StatusTabs provides horizontal status tabs with counts for filtering data.
 *
 * ## Features
 * - Status-based filtering
 * - Count badges
 * - Color variants
 * - Icon support
 *
 * ## When to Use
 * - Filtering by status
 * - Tab-based navigation with counts
 * - Status dashboards
 */
const meta: Meta<typeof StatusTabs> = {
  title: 'Composed/StatusTabs',
  component: StatusTabs,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof StatusTabs>;

/**
 * Default status tabs
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [activeTab, setActiveTab] = useState('all');
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.statusTabs.description')}</Paragraph>
            <StatusTabs
              tabs={[
                { id: 'all', label: t('storybook.statusTabs.all'), count: 42 },
                {
                  id: 'active',
                  label: t('storybook.statusTabs.active'),
                  count: 25,
                  color: 'success',
                },
                {
                  id: 'pending',
                  label: t('storybook.statusTabs.pending'),
                  count: 12,
                  color: 'warning',
                },
                {
                  id: 'inactive',
                  label: t('storybook.statusTabs.inactive'),
                  count: 5,
                  color: 'neutral',
                },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Status tabs with icons
 */
export const WithIcons: Story = {
  render: function Render() {
    const t = useT();
    const [activeTab, setActiveTab] = useState('active');
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.statusTabs.withIcons')}</Paragraph>
            <StatusTabs
              tabs={[
                { id: 'all', label: t('storybook.statusTabs.all'), count: 42 },
                {
                  id: 'active',
                  label: t('storybook.statusTabs.active'),
                  count: 25,
                  color: 'success',
                  icon: <CheckCircleIcon />,
                },
                {
                  id: 'pending',
                  label: t('storybook.statusTabs.pending'),
                  count: 12,
                  color: 'warning',
                  icon: <ClockIcon />,
                },
                {
                  id: 'inactive',
                  label: t('storybook.statusTabs.inactive'),
                  count: 5,
                  color: 'danger',
                  icon: <XCircleIcon />,
                },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Status tabs without counts
 */
export const WithoutCounts: Story = {
  render: function Render() {
    const t = useT();
    const [activeTab, setActiveTab] = useState('all');
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.statusTabs.withoutCounts')}</Paragraph>
            <StatusTabs
              tabs={[
                { id: 'all', label: t('storybook.statusTabs.all') },
                { id: 'active', label: t('storybook.statusTabs.active'), color: 'success' },
                { id: 'pending', label: t('storybook.statusTabs.pending'), color: 'warning' },
                { id: 'inactive', label: t('storybook.statusTabs.inactive'), color: 'neutral' },
              ]}
              activeTab={activeTab}
              onChange={setActiveTab}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
