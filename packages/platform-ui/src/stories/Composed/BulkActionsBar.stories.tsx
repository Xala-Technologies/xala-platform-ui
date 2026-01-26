import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { BulkActionsBar, Stack, Paragraph, Card, Button } from '../../index';
import { TrashIcon, EditIcon, CopyIcon } from '../../index';

/**
 * BulkActionsBar provides an action bar for bulk operations on selected items.
 *
 * ## Features
 * - Appears when items are selected
 * - Fixed or inline positioning
 * - Multiple action buttons
 * - Clear selection
 *
 * ## When to Use
 * - Data tables with selection
 * - List views with bulk actions
 * - Multi-select interfaces
 */
const meta: Meta<typeof BulkActionsBar> = {
  title: 'Composed/BulkActionsBar',
  component: BulkActionsBar,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BulkActionsBar>;

/**
 * Default bulk actions bar (fixed position)
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [selectedCount, setSelectedCount] = useState(5);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.bulkActionsBar.description')}</Paragraph>
            <Button onClick={() => setSelectedCount(selectedCount > 0 ? 0 : 5)}>
              {selectedCount > 0 ? t('storybook.bulkActionsBar.clearSelection') : t('storybook.bulkActionsBar.selectItems')}
            </Button>
            <BulkActionsBar
              selectedCount={selectedCount}
              selectedLabel={t('storybook.bulkActionsBar.selectedLabel', { count: selectedCount })}
              clearLabel={t('storybook.bulkActionsBar.clear')}
              onClear={() => setSelectedCount(0)}
              actions={[
                {
                  label: t('storybook.bulkActionsBar.edit'),
                  onClick: () => console.log('Edit'),
                  icon: <EditIcon />,
                },
                {
                  label: t('storybook.bulkActionsBar.delete'),
                  onClick: () => console.log('Delete'),
                  variant: 'danger',
                  icon: <TrashIcon />,
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
 * Inline bulk actions bar
 */
export const Inline: Story = {
  render: function Render() {
    const t = useT();
    const [selectedCount, setSelectedCount] = useState(3);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.bulkActionsBar.inline')}</Paragraph>
            <BulkActionsBar
              selectedCount={selectedCount}
              selectedLabel={t('storybook.bulkActionsBar.selectedLabel', { count: selectedCount })}
              clearLabel={t('storybook.bulkActionsBar.clear')}
              onClear={() => setSelectedCount(0)}
              position="inline"
              actions={[
                {
                  label: t('storybook.bulkActionsBar.copy'),
                  onClick: () => console.log('Copy'),
                  icon: <CopyIcon />,
                },
                {
                  label: t('storybook.bulkActionsBar.edit'),
                  onClick: () => console.log('Edit'),
                  icon: <EditIcon />,
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
 * Multiple actions
 */
export const MultipleActions: Story = {
  render: function Render() {
    const t = useT();
    const [selectedCount, setSelectedCount] = useState(10);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.bulkActionsBar.multipleActions')}</Paragraph>
            <BulkActionsBar
              selectedCount={selectedCount}
              selectedLabel={t('storybook.bulkActionsBar.selectedLabel', { count: selectedCount })}
              clearLabel={t('storybook.bulkActionsBar.clear')}
              onClear={() => setSelectedCount(0)}
              actions={[
                {
                  label: t('storybook.bulkActionsBar.edit'),
                  onClick: () => console.log('Edit'),
                  variant: 'primary',
                  icon: <EditIcon />,
                },
                {
                  label: t('storybook.bulkActionsBar.copy'),
                  onClick: () => console.log('Copy'),
                  variant: 'secondary',
                  icon: <CopyIcon />,
                },
                {
                  label: t('storybook.bulkActionsBar.delete'),
                  onClick: () => console.log('Delete'),
                  variant: 'tertiary',
                  icon: <TrashIcon />,
                },
              ]}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
