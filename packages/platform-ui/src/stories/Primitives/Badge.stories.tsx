import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { Badge, Stack, Paragraph, Card } from '../../index';

/**
 * Badge provides a small status or label component.
 *
 * ## Features
 * - Multiple variants (neutral, info, success, warning, danger)
 * - Size variants (sm, md, lg)
 * - Design token-based styling
 *
 * ## When to Use
 * - Status indicators
 * - Labels
 * - Count badges
 */
const meta: Meta<typeof Badge> = {
  title: 'Primitives/Badge',
  component: Badge,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Badge>;

/**
 * Default badge
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.badge.description')}</Paragraph>
            <Badge>{t('storybook.badge.default')}</Badge>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Variants
 */
export const Variants: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.badge.variants')}</Paragraph>
            <Stack spacing="var(--ds-spacing-2)" style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Badge variant="neutral">{t('storybook.badge.neutral')}</Badge>
              <Badge variant="info">{t('storybook.badge.info')}</Badge>
              <Badge variant="success">{t('storybook.badge.success')}</Badge>
              <Badge variant="warning">{t('storybook.badge.warning')}</Badge>
              <Badge variant="danger">{t('storybook.badge.danger')}</Badge>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Sizes
 */
export const Sizes: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.badge.sizes')}</Paragraph>
            <Stack spacing="var(--ds-spacing-2)" style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}>
              <Badge size="sm">{t('storybook.badge.small')}</Badge>
              <Badge size="md">{t('storybook.badge.medium')}</Badge>
              <Badge size="lg">{t('storybook.badge.large')}</Badge>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  },
};
