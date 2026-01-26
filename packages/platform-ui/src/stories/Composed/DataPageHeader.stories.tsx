import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { DataPageHeader, Stack, Paragraph, Card } from '../../index';

/**
 * DataPageHeader provides an enhanced page header with count badge support.
 *
 * ## Features
 * - Page title
 * - Optional item count badge
 * - Extends PageHeader component
 *
 * ## When to Use
 * - Data listing pages
 * - Pages with item counts
 * - Table/list headers
 */
const meta: Meta<typeof DataPageHeader> = {
  title: 'Composed/DataPageHeader',
  component: DataPageHeader,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof DataPageHeader>;

/**
 * Default header without count
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.dataPageHeader.description')}</Paragraph>
            <DataPageHeader title={t('storybook.dataPageHeader.title')} />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Header with count badge
 */
export const WithCount: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.dataPageHeader.withCount')}</Paragraph>
            <DataPageHeader
              title={t('storybook.dataPageHeader.title')}
              count={42}
              countLabel={t('storybook.dataPageHeader.countLabel', { count: 42 })}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Header with zero count
 */
export const ZeroCount: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.dataPageHeader.zeroCount')}</Paragraph>
            <DataPageHeader
              title={t('storybook.dataPageHeader.title')}
              count={0}
              countLabel={t('storybook.dataPageHeader.countLabel', { count: 0 })}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
