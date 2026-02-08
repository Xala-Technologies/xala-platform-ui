import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { HorizontalLayout, Stack, Paragraph, Card, Button } from '../../index';

/**
 * HorizontalLayout provides a flexible horizontal layout component for row-based layouts.
 *
 * ## Features
 * - Gap control
 * - Alignment options
 * - Justify options
 * - Full height option
 * - Background presets
 *
 * ## When to Use
 * - Row layouts
 * - Horizontal arrangements
 * - Toolbars
 * - Button groups
 */
const meta: Meta<typeof HorizontalLayout> = {
  title: 'Primitives/HorizontalLayout',
  component: HorizontalLayout,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof HorizontalLayout>;

/**
 * Default horizontal layout
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
            <Paragraph data-size="md">{t('storybook.horizontalLayout.description')}</Paragraph>
            <HorizontalLayout gap="var(--ds-spacing-4)">
              <Button>{t('storybook.horizontalLayout.button1')}</Button>
              <Button>{t('storybook.horizontalLayout.button2')}</Button>
              <Button>{t('storybook.horizontalLayout.button3')}</Button>
            </HorizontalLayout>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * With alignment
 */
export const WithAlignment: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.horizontalLayout.withAlignment')}</Paragraph>
            <HorizontalLayout
              gap="var(--ds-spacing-4)"
              align="center"
              justify="space-between"
              style={{
                border: '1px solid var(--ds-color-neutral-border-default)',
                borderRadius: 'var(--ds-border-radius-md)',
                padding: 'var(--ds-spacing-4)',
              }}
            >
              <Button>{t('storybook.horizontalLayout.left')}</Button>
              <Button>{t('storybook.horizontalLayout.right')}</Button>
            </HorizontalLayout>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Full height
 */
export const FullHeight: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.horizontalLayout.fullHeight')}</Paragraph>
            <HorizontalLayout
              fullHeight
              gap="var(--ds-spacing-4)"
              style={{
                height: '200px',
                border: '1px solid var(--ds-color-neutral-border-default)',
                borderRadius: 'var(--ds-border-radius-md)',
                padding: 'var(--ds-spacing-4)',
              }}
            >
              <Button>{t('storybook.horizontalLayout.button1')}</Button>
              <Button>{t('storybook.horizontalLayout.button2')}</Button>
            </HorizontalLayout>
          </Stack>
        </Card>
      </Stack>
    );
  },
};
