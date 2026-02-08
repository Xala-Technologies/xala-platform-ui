import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { Center, Stack, Paragraph, Card, Button } from '../../index';

/**
 * Center provides a component for centering content horizontally and/or vertically.
 *
 * ## Features
 * - Horizontal centering
 * - Vertical centering
 * - Both axes centering
 * - Fill parent option
 *
 * ## When to Use
 * - Centering content
 * - Layout alignment
 * - Flexbox centering
 */
const meta: Meta<typeof Center> = {
  title: 'Primitives/Center',
  component: Center,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof Center>;

/**
 * Center both axes
 */
export const BothAxes: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.center.bothAxes')}</Paragraph>
            <Center
              axis="both"
              style={{
                height: '200px',
                border: '1px solid var(--ds-color-neutral-border-default)',
                borderRadius: 'var(--ds-border-radius-md)',
              }}
            >
              <Button>{t('storybook.center.centered')}</Button>
            </Center>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Center horizontally
 */
export const Horizontal: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.center.horizontal')}</Paragraph>
            <Center
              axis="horizontal"
              style={{
                border: '1px solid var(--ds-color-neutral-border-default)',
                borderRadius: 'var(--ds-border-radius-md)',
                padding: 'var(--ds-spacing-4)',
              }}
            >
              <Button>{t('storybook.center.centered')}</Button>
            </Center>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Center vertically
 */
export const Vertical: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.center.vertical')}</Paragraph>
            <Center
              axis="vertical"
              style={{
                height: '200px',
                border: '1px solid var(--ds-color-neutral-border-default)',
                borderRadius: 'var(--ds-border-radius-md)',
              }}
            >
              <Button>{t('storybook.center.centered')}</Button>
            </Center>
          </Stack>
        </Card>
      </Stack>
    );
  },
};
