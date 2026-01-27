import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
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
            <Paragraph data-size="md">{t('storybook.bidiSafeInput.email')}</Paragraph>
            <BidiSafeInput
              type="email"
              label={t('storybook.bidiSafeInput.emailLabel')}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('storybook.bidiSafeInput.emailPlaceholder')}
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
            <Paragraph data-size="md">{t('storybook.bidiSafeInput.url')}</Paragraph>
            <BidiSafeInput
              type="url"
              label={t('storybook.bidiSafeInput.urlLabel')}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('storybook.bidiSafeInput.urlPlaceholder')}
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
            <Paragraph data-size="md">{t('storybook.bidiSafeInput.phone')}</Paragraph>
            <BidiSafeInput
              type="tel"
              label={t('storybook.bidiSafeInput.phoneLabel')}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('storybook.bidiSafeInput.phonePlaceholder')}
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
            <Paragraph data-size="md">{t('storybook.bidiSafeInput.code')}</Paragraph>
            <BidiSafeInput
              type="code"
              label={t('storybook.bidiSafeInput.codeLabel')}
              value={value}
              onChange={(e) => setValue(e.target.value)}
              placeholder={t('storybook.bidiSafeInput.codePlaceholder')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
