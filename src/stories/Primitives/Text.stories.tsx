import type { Meta, StoryObj } from '@storybook/react';
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
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Text>"Eksempel Tekst"</Text>
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
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Stack spacing="var(--ds-spacing-2)">
              <Text variant="body">"Eksempel Tekst"</Text>
              <Text variant="subtitle">"Eksempel Tekst"</Text>
              <Text variant="caption">"Eksempel Tekst"</Text>
              <Text variant="overline">"Eksempel Tekst"</Text>
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
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Stack spacing="var(--ds-spacing-2)">
              <Text size="xs">"Eksempel Tekst"</Text>
              <Text size="sm">"Eksempel Tekst"</Text>
              <Text size="md">"Eksempel Tekst"</Text>
              <Text size="lg">"Eksempel Tekst"</Text>
              <Text size="xl">"Eksempel Tekst"</Text>
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
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Stack spacing="var(--ds-spacing-2)">
              <Text weight="normal">"Eksempel Tekst"</Text>
              <Text weight="medium">"Eksempel Tekst"</Text>
              <Text weight="semibold">"Eksempel Tekst"</Text>
              <Text weight="bold">"Eksempel Tekst"</Text>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  },
};
