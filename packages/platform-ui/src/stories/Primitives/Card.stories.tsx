import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { Card, Stack, Paragraph, Heading } from '../../index';

/**
 * Card provides a container component for content.
 *
 * ## Features
 * - Multiple variants (default, outlined, elevated)
 * - Design token-based styling
 *
 * ## When to Use
 * - Content containers
 * - Card layouts
 * - Grouped content
 */
const meta: Meta<typeof Card> = {
  title: 'Primitives/Card',
  component: Card,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Card>;

/**
 * Default card
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card>
          <Stack spacing="var(--ds-spacing-4)">
            <Heading level={3} data-size="md">{t('storybook.card.title')}</Heading>
            <Paragraph data-size="sm">{t('storybook.card.description')}</Paragraph>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Outlined variant
 */
export const Outlined: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card variant="outlined">
          <Stack spacing="var(--ds-spacing-4)">
            <Heading level={3} data-size="md">{t('storybook.card.outlined')}</Heading>
            <Paragraph data-size="sm">{t('storybook.card.description')}</Paragraph>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Elevated variant
 */
export const Elevated: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card variant="elevated">
          <Stack spacing="var(--ds-spacing-4)">
            <Heading level={3} data-size="md">{t('storybook.card.elevated')}</Heading>
            <Paragraph data-size="sm">{t('storybook.card.description')}</Paragraph>
          </Stack>
        </Card>
      </Stack>
    );
  },
};
