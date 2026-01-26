import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { FilterChip } from '../../index';

/**
 * FilterChip displays an active filter with a remove button.
 *
 * ## Features
 * - Removable chip component
 * - Keyboard navigation (Enter, Backspace, Delete)
 * - Size variants
 * - Visual variants
 *
 * ## When to Use
 * - Active filter display
 * - Tag removal
 * - Filter management
 */
const meta: Meta<typeof FilterChip> = {
  title: 'Primitives/FilterChip',
  component: FilterChip,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
FilterChip displays an active filter with a remove button.

## Features
- Removable chip component
- Keyboard navigation (Enter, Backspace, Delete)
- Size variants (sm, md)
- Visual variants (default, accent)

## When to Use
- Active filter display
- Tag removal
- Filter management
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FilterChip>;

/**
 * Default filter chip
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
        <FilterChip label={t('storybook.filterChip.oslo')} onRemove={() => console.log('Remove Oslo')} />
        <FilterChip label={t('storybook.filterChip.active')} onRemove={() => console.log('Remove Active')} />
        <FilterChip label={t('storybook.filterChip.premium')} onRemove={() => console.log('Remove Premium')} />
      </div>
    );
  },
};

/**
 * Small size variant
 */
export const Small: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
        <FilterChip
          size="sm"
          label={t('storybook.filterChip.oslo')}
          onRemove={() => console.log('Remove Oslo')}
        />
        <FilterChip
          size="sm"
          label={t('storybook.filterChip.active')}
          onRemove={() => console.log('Remove Active')}
        />
      </div>
    );
  },
};

/**
 * Accent variant
 */
export const Accent: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
        <FilterChip
          variant="accent"
          label={t('storybook.filterChip.oslo')}
          onRemove={() => console.log('Remove Oslo')}
        />
        <FilterChip
          variant="accent"
          label={t('storybook.filterChip.active')}
          onRemove={() => console.log('Remove Active')}
        />
      </div>
    );
  },
};

/**
 * Disabled filter chip
 */
export const Disabled: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
        <FilterChip
          disabled
          label={t('storybook.filterChip.oslo')}
          onRemove={() => console.log('Remove Oslo')}
        />
        <FilterChip
          disabled
          label={t('storybook.filterChip.active')}
          onRemove={() => console.log('Remove Active')}
        />
      </div>
    );
  },
};

/**
 * Multiple filter chips
 */
export const Multiple: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
        <FilterChip label={t('storybook.filterChip.oslo')} onRemove={() => console.log('Remove Oslo')} />
        <FilterChip label={t('storybook.filterChip.bergen')} onRemove={() => console.log('Remove Bergen')} />
        <FilterChip label={t('storybook.filterChip.active')} onRemove={() => console.log('Remove Active')} />
        <FilterChip label={t('storybook.filterChip.premium')} onRemove={() => console.log('Remove Premium')} />
        <FilterChip label={t('storybook.filterChip.verified')} onRemove={() => console.log('Remove Verified')} />
      </div>
    );
  },
};
