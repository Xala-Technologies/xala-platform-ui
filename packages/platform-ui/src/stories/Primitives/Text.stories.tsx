import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { Text, Stack, Paragraph, Card } from '../../index';

/**
 * Text provides a typography component for text content.
 *
 * ## Features
 * - Multiple variants (body, subtitle, caption, overline)
 * - Size variants (xs, sm, md, lg, xl)
 * - Weight variants (normal, medium, semibold, bold)
 * - Design token-based styling
 *
 * ## When to Use
 * - Text content
 * - Typography
 * - Text styling
 */
const meta: Meta<typeof Text> = {
  title: 'Primitives/Text',
  component: Text,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Text>;

/**
 * Default text
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.text.description')}</Paragraph>
            <Text>{t('storybook.text.default')}</Text>
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
            <Paragraph data-size="md">{t('storybook.text.variants')}</Paragraph>
            <Stack spacing="var(--ds-spacing-2)">
              <Text variant="body">{t('storybook.text.body')}</Text>
              <Text variant="subtitle">{t('storybook.text.subtitle')}</Text>
              <Text variant="caption">{t('storybook.text.caption')}</Text>
              <Text variant="overline">{t('storybook.text.overline')}</Text>
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
            <Paragraph data-size="md">{t('storybook.text.sizes')}</Paragraph>
            <Stack spacing="var(--ds-spacing-2)">
              <Text size="xs">{t('storybook.text.extraSmall')}</Text>
              <Text size="sm">{t('storybook.text.small')}</Text>
              <Text size="md">{t('storybook.text.medium')}</Text>
              <Text size="lg">{t('storybook.text.large')}</Text>
              <Text size="xl">{t('storybook.text.extraLarge')}</Text>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Weights
 */
export const Weights: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.text.weights')}</Paragraph>
            <Stack spacing="var(--ds-spacing-2)">
              <Text weight="normal">{t('storybook.text.weightNormal')}</Text>
              <Text weight="medium">{t('storybook.text.weightMedium')}</Text>
              <Text weight="semibold">{t('storybook.text.weightSemibold')}</Text>
              <Text weight="bold">{t('storybook.text.weightBold')}</Text>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  },
};
