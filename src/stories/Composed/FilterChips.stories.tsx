import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { FilterChips, Stack, Paragraph, Card } from '../../index';

/**
 * FilterChips displays active filter chips with remove buttons.
 *
 * ## Features
 * - Active filter display
 * - Individual chip removal
 * - Reset all filters
 * - Hidden when no filters active
 *
 * ## When to Use
 * - Filtered data views
 * - Search results with filters
 * - List views with active filters
 */
const meta: Meta<typeof FilterChips> = {
  title: 'Composed/FilterChips',
  component: FilterChips,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FilterChips>;

/**
 * Default filter chips
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [chips, setChips] = useState([
      { key: 'status', label: t('storybook.filterChips.statusActive'), onRemove: () => {} },
      { key: 'category', label: t('storybook.filterChips.categoryTech'), onRemove: () => {} },
    ]);
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.filterChips.description')}</Paragraph>
            <FilterChips
              chips={chips}
              onResetAll={() => setChips([])}
              resetLabel={t('storybook.filterChips.resetAll')}
              activeFiltersLabel={t('storybook.filterChips.activeFilters')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Filter chips with many filters
 */
export const ManyFilters: Story = {
  render: function Render() {
    const t = useT();
    const [chips, setChips] = useState([
      { key: 'status', label: t('storybook.filterChips.statusActive'), onRemove: () => {} },
      { key: 'category', label: t('storybook.filterChips.categoryTech'), onRemove: () => {} },
      { key: 'date', label: t('storybook.filterChips.dateToday'), onRemove: () => {} },
      { key: 'location', label: t('storybook.filterChips.locationOslo'), onRemove: () => {} },
    ]);
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.filterChips.manyFilters')}</Paragraph>
            <FilterChips
              chips={chips}
              onResetAll={() => setChips([])}
              resetLabel={t('storybook.filterChips.resetAll')}
              activeFiltersLabel={t('storybook.filterChips.activeFilters')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Filter chips without label
 */
export const WithoutLabel: Story = {
  render: function Render() {
    const t = useT();
    const [chips, setChips] = useState([
      { key: 'status', label: t('storybook.filterChips.statusActive'), onRemove: () => {} },
      { key: 'category', label: t('storybook.filterChips.categoryTech'), onRemove: () => {} },
    ]);
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.filterChips.withoutLabel')}</Paragraph>
            <FilterChips
              chips={chips}
              onResetAll={() => setChips([])}
              resetLabel={t('storybook.filterChips.resetAll')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
