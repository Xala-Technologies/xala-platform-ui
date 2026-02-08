import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { BidiSafeInput, Stack, Paragraph, Card } from '../../index';

/**
 * BidiSafeInput provides bidirectional-safe input for content that must remain LTR.
 *
 * ## Features
 * - Email input
 * - URL input
 * - Phone number input
 * - Code input
 * - LTR direction enforcement
 *
 * ## When to Use
 * - Email addresses
 * - URLs
 * - Phone numbers
 * - Code snippets
 */
const meta: Meta<typeof BidiSafeInput> = {
  title: 'Primitives/BidiSafeInput',
  component: BidiSafeInput,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof BidiSafeInput>;

/**
 * Email input
 */
export const Email: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState('');
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <BidiSafeInput
              type="email"
              label="Eksempel Tekst"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Eksempel Tekst"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * URL input
 */
export const Url: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState('');
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <BidiSafeInput
              type="url"
              label="Eksempel Tekst"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Eksempel Tekst"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Phone input
 */
export const Phone: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState('');
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <BidiSafeInput
              type="tel"
              label="Eksempel Tekst"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Eksempel Tekst"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Code input
 */
export const Code: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState('');
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <BidiSafeInput
              type="code"
              label="Eksempel Tekst"
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder="Eksempel Tekst"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
