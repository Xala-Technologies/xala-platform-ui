import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { Icon, Stack, Paragraph, Card } from '../../index';

/**
 * Icon provides a simple SVG icon wrapper component.
 *
 * ## Features
 * - Configurable size
 * - Color support
 * - SVG-based
 *
 * ## When to Use
 * - Custom icons
 * - SVG icons
 * - Icon components
 */
const meta: Meta<typeof Icon> = {
  title: 'Primitives/Icon',
  component: Icon,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Icon>;

/**
 * Default icon
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
            <Paragraph data-size="md">{t('storybook.icon.description')}</Paragraph>
            <Icon>
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12" y2="16" />
            </Icon>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Different sizes
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
            <Paragraph data-size="md">{t('storybook.icon.sizes')}</Paragraph>
            <Stack
              spacing="var(--ds-spacing-2)"
              style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}
            >
              <Icon size={16}>
                <circle cx="12" cy="12" r="10" />
              </Icon>
              <Icon size={24}>
                <circle cx="12" cy="12" r="10" />
              </Icon>
              <Icon size={32}>
                <circle cx="12" cy="12" r="10" />
              </Icon>
              <Icon size={48}>
                <circle cx="12" cy="12" r="10" />
              </Icon>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Different colors
 */
export const Colors: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.icon.colors')}</Paragraph>
            <Stack
              spacing="var(--ds-spacing-2)"
              style={{ flexDirection: 'row', alignItems: 'center', flexWrap: 'wrap' }}
            >
              <Icon color="var(--ds-color-neutral-text-default)">
                <circle cx="12" cy="12" r="10" />
              </Icon>
              <Icon color="var(--ds-color-accent-base-default)">
                <circle cx="12" cy="12" r="10" />
              </Icon>
              <Icon color="var(--ds-color-success-base-default)">
                <circle cx="12" cy="12" r="10" />
              </Icon>
              <Icon color="var(--ds-color-warning-base-default)">
                <circle cx="12" cy="12" r="10" />
              </Icon>
              <Icon color="var(--ds-color-danger-base-default)">
                <circle cx="12" cy="12" r="10" />
              </Icon>
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  },
};
