import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { CommandPalette, type CommandItem } from '../../index';
import { HomeIcon, SettingsIcon, SearchIcon, FileIcon } from '../../index';

/**
 * CommandPalette provides a keyboard-driven command palette (Cmd+K / Ctrl+K).
 *
 * ## Features
 * - Keyboard shortcut (Cmd+K / Ctrl+K)
 * - Search/filter commands
 * - Command grouping
 * - Recent commands
 * - Keyboard navigation
 *
 * ## When to Use
 * - Quick actions
 * - Navigation shortcuts
 * - Command execution
 */
const meta: Meta<typeof CommandPalette> = {
  title: 'Composed/CommandPalette',
  component: CommandPalette,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
CommandPalette provides a keyboard-driven command palette.

## Features
- Keyboard shortcut (Cmd+K / Ctrl+K)
- Search/filter commands
- Command grouping
- Recent commands display
- Keyboard navigation (arrow keys, enter)

## When to Use
- Quick actions
- Navigation shortcuts
- Command execution
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof CommandPalette>;

// Sample commands
const useSampleCommands = (): CommandItem[] => {
  const t = useT();
  return [
    {
      id: 'home',
      label: t('storybook.commandPalette.goToHome'),
      description: t('storybook.commandPalette.navigateToHome'),
      icon: <HomeIcon size={16} />,
      group: 'navigation',
      keywords: ['home', 'dashboard'],
      onSelect: () => console.log('Navigate to home'),
    },
    {
      id: 'settings',
      label: t('storybook.commandPalette.goToSettings'),
      description: t('storybook.commandPalette.openSettings'),
      icon: <SettingsIcon size={16} />,
      group: 'navigation',
      keywords: ['settings', 'preferences'],
      onSelect: () => console.log('Navigate to settings'),
    },
    {
      id: 'search',
      label: t('storybook.commandPalette.openSearch'),
      description: t('storybook.commandPalette.openGlobalSearch'),
      icon: <SearchIcon size={16} />,
      group: 'actions',
      keywords: ['search', 'find'],
      onSelect: () => console.log('Open search'),
    },
    {
      id: 'new-file',
      label: t('storybook.commandPalette.createNewFile'),
      description: t('storybook.commandPalette.createNewFileDescription'),
      icon: <FileIcon size={16} />,
      group: 'actions',
      keywords: ['new', 'file', 'create'],
      onSelect: () => console.log('Create new file'),
    },
  ];
};

/**
 * Default command palette
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [isOpen, setIsOpen] = useState(true);
    const commands = useSampleCommands();
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <button onClick={() => setIsOpen(true)}>{t('storybook.commandPalette.openPalette')}</button>
        <CommandPalette
          commands={commands}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placeholder={t('storybook.commandPalette.placeholder')}
        />
      </div>
    );
  },
};

/**
 * Command palette with groups
 */
export const WithGroups: Story = {
  render: function Render() {
    const t = useT();
    const [isOpen, setIsOpen] = useState(true);
    const commands = useSampleCommands();
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <button onClick={() => setIsOpen(true)}>{t('storybook.commandPalette.openPalette')}</button>
        <CommandPalette
          commands={commands}
          groups={[
            { id: 'navigation', label: t('storybook.commandPalette.navigation'), priority: 1 },
            { id: 'actions', label: t('storybook.commandPalette.actions'), priority: 2 },
          ]}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placeholder={t('storybook.commandPalette.placeholder')}
        />
      </div>
    );
  },
};

/**
 * Command palette with recent commands
 */
export const WithRecent: Story = {
  render: function Render() {
    const t = useT();
    const [isOpen, setIsOpen] = useState(true);
    const commands = useSampleCommands();
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <button onClick={() => setIsOpen(true)}>{t('storybook.commandPalette.openPalette')}</button>
        <CommandPalette
          commands={commands}
          recentIds={['home', 'settings']}
          maxRecent={3}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placeholder={t('storybook.commandPalette.placeholder')}
        />
      </div>
    );
  },
};

/**
 * Command palette with search
 */
export const WithSearch: Story = {
  render: function Render() {
    const t = useT();
    const [isOpen, setIsOpen] = useState(true);
    const commands = useSampleCommands();
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <button onClick={() => setIsOpen(true)}>{t('storybook.commandPalette.openPalette')}</button>
        <CommandPalette
          commands={commands}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placeholder={t('storybook.commandPalette.searchPlaceholder')}
          emptyMessage={t('storybook.commandPalette.noCommandsFound')}
        />
      </div>
    );
  },
};

/**
 * Command palette with many commands
 */
export const ManyCommands: Story = {
  render: function Render() {
    const t = useT();
    const [isOpen, setIsOpen] = useState(true);
    const manyCommands: CommandItem[] = Array.from({ length: 20 }, (_, i) => ({
      id: `command-${i}`,
      label: t('storybook.commandPalette.commandLabel', { number: i + 1 }),
      description: t('storybook.commandPalette.commandDescription', { number: i + 1 }),
      group: i % 2 === 0 ? 'navigation' : 'actions',
      keywords: [`command${i}`, `action${i}`],
      onSelect: () => console.log(`Command ${i + 1} selected`),
    }));
    return (
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <button onClick={() => setIsOpen(true)}>{t('storybook.commandPalette.openPalette')}</button>
        <CommandPalette
          commands={manyCommands}
          groups={[
            { id: 'navigation', label: t('storybook.commandPalette.navigation'), priority: 1 },
            { id: 'actions', label: t('storybook.commandPalette.actions'), priority: 2 },
          ]}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          placeholder={t('storybook.commandPalette.placeholder')}
        />
      </div>
    );
  },
};
