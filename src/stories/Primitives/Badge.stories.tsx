import type { Meta, StoryObj } from '@storybook/react';
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
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Badge>"Eksempel Tekst"</Badge>
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
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Stack spacing="var(--ds-spacing-2)" style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
              <Badge variant="neutral">"Eksempel Tekst"</Badge>
              <Badge variant="info">"Eksempel Tekst"</Badge>
              <Badge variant="success">"Eksempel Tekst"</Badge>
              <Badge variant="warning">"Eksempel Tekst"</Badge>
              <Badge variant="danger">"Eksempel Tekst"</Badge>
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
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Stack
              spacing="var(--ds-spacing-2)"
              style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}
            >
              <Badge size="sm">"Eksempel Tekst"</Badge>
              <Badge size="md">"Eksempel Tekst"</Badge>
              <Badge size="lg">"Eksempel Tekst"</Badge>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  },
};
