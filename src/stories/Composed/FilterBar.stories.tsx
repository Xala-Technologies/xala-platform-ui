import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { FilterBar, Stack, Paragraph, Card } from '../../index';

/**
 * FilterBar provides a horizontal filter bar with primary and secondary filters.
 *
 * ## Features
 * - Primary resource type filter
 * - Secondary filters
 * - Results count
 * - View mode toggle
 *
 * ## When to Use
 * - Resource listing pages
 * - Filtered data views
 * - Search results
 */
const meta: Meta<typeof FilterBar> = {
  title: 'Composed/FilterBar',
  component: FilterBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FilterBar>;

/**
 * Default filter bar
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [primaryValue, setPrimaryValue] = useState<'SPACE' | 'EQUIPMENT' | 'ALL'>('ALL');
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '1000px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.filterBar.description')}</Paragraph>
            <FilterBar
              primaryFilter={{
                value: primaryValue,
                onChange: setPrimaryValue,
                options: [
                  { id: 'ALL', label: t('storybook.filterBar.all') },
                  { id: 'SPACE', label: t('storybook.filterBar.spaces') },
                  { id: 'EQUIPMENT', label: t('storybook.filterBar.equipment') },
                ],
              }}
              resultsCount={42}
              resultsLabel={t('storybook.filterBar.results')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Filter bar with view mode
 */
export const WithViewMode: Story = {
  render: function Render() {
    const t = useT();
    const [primaryValue, setPrimaryValue] = useState<'SPACE' | 'EQUIPMENT' | 'ALL'>('ALL');
    const [viewMode, setViewMode] = useState<'grid' | 'list' | 'map'>('grid');
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '1000px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.filterBar.withViewMode')}</Paragraph>
            <FilterBar
              primaryFilter={{
                value: primaryValue,
                onChange: setPrimaryValue,
                options: [
                  { id: 'ALL', label: t('storybook.filterBar.all') },
                  { id: 'SPACE', label: t('storybook.filterBar.spaces') },
                  { id: 'EQUIPMENT', label: t('storybook.filterBar.equipment') },
                ],
              }}
              resultsCount={42}
              resultsLabel={t('storybook.filterBar.results')}
              viewMode={viewMode}
              onViewModeChange={setViewMode}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
