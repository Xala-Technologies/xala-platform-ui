import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { CommandTerminal, Stack, Paragraph, Card } from '../../index';

/**
 * CommandTerminal provides a terminal-style output display for CLI commands.
 *
 * ## Features
 * - Terminal-style output display
 * - Status indicators (idle, running, completed, failed)
 * - Auto-scrolling
 * - Customizable max height
 *
 * ## When to Use
 * - Command execution displays
 * - Build output viewers
 * - Log displays
 */
const meta: Meta<typeof CommandTerminal> = {
  title: 'Blocks/CommandTerminal',
  component: CommandTerminal,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommandTerminal>;

/**
 * Default terminal with idle status
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.commandTerminal.description')}</Paragraph>
            <CommandTerminal
              command="npm run build"
              logs={[]}
              status="idle"
              title={t('storybook.commandTerminal.buildCommand')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Terminal with running status
 */
export const Running: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.commandTerminal.running')}</Paragraph>
            <CommandTerminal
              command="npm run build"
              logs={[
                '> Building application...',
                '✓ Compiled successfully',
                '> Optimizing bundles...',
                '✓ Build completed',
              ]}
              status="running"
              title={t('storybook.commandTerminal.buildCommand')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Terminal with completed status
 */
export const Completed: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.commandTerminal.completed')}</Paragraph>
            <CommandTerminal
              command="npm run build"
              logs={[
                '> Building application...',
                '✓ Compiled successfully',
                '> Optimizing bundles...',
                '✓ Build completed',
                '✓ All bundles optimized',
              ]}
              status="completed"
              title={t('storybook.commandTerminal.buildCommand')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Terminal with failed status
 */
export const Failed: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.commandTerminal.failed')}</Paragraph>
            <CommandTerminal
              command="npm run build"
              logs={[
                '> Building application...',
                '✗ Compilation failed',
                'Error: Module not found',
                '  at ./src/index.ts:5:10',
              ]}
              status="failed"
              title={t('storybook.commandTerminal.buildCommand')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * Terminal with many logs
 */
export const ManyLogs: Story = {
  render: function Render() {
    const t = useT();
    const logs = Array.from({ length: 50 }, (_, i) => `Log line ${i + 1}: Processing item ${i + 1}`);
    return (
      <Stack spacing="var(--ds-spacing-4)" style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}>
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.commandTerminal.manyLogs')}</Paragraph>
            <CommandTerminal
              command="npm run test"
              logs={logs}
              status="running"
              title={t('storybook.commandTerminal.testCommand')}
              maxHeight="400px"
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
