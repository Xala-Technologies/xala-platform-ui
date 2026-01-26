import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { XTerminal, Stack, Paragraph, Card } from '../../index';

/**
 * XTerminal provides a terminal component for displaying command output.
 *
 * ## Features
 * - Terminal-style output display
 * - Session management
 * - Customizable height
 * - Project context support
 *
 * ## When to Use
 * - Command execution interfaces
 * - Log viewers
 * - Development tools
 */
const meta: Meta<typeof XTerminal> = {
  title: 'Blocks/XTerminal',
  component: XTerminal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof XTerminal>;

/**
 * Default terminal
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.xTerminal.description')}</Paragraph>
            <XTerminal
              sessionId="session-1"
              cwd="~/projects/my-app"
              height={300}
              isActive={true}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Terminal with initial command
 */
export const WithInitialCommand: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.xTerminal.withCommand')}</Paragraph>
            <XTerminal
              sessionId="session-2"
              cwd="~/projects/my-app"
              initialCommand="npm run build"
              height={300}
              isActive={true}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Terminal with custom height
 */
export const CustomHeight: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.xTerminal.customHeight')}</Paragraph>
            <XTerminal
              sessionId="session-3"
              cwd="~/projects/my-app"
              height={500}
              isActive={true}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Inactive terminal
 */
export const Inactive: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.xTerminal.inactive')}</Paragraph>
            <XTerminal
              sessionId="session-4"
              cwd="~/projects/my-app"
              height={300}
              isActive={false}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
