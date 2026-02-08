/**
 * ExplorerItem Stories
 *
 * Storybook stories for the ExplorerItem component.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { ExplorerItem, Stack, FileTextIcon, ChartIcon, SettingsIcon } from '../../index';

const meta: Meta<typeof ExplorerItem> = {
  title: 'Blocks/ExplorerItem',
  component: ExplorerItem,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    selected: {
      control: 'boolean',
      description: 'Whether the item is currently selected',
    },
  },
};

export default meta;
type Story = StoryObj<typeof ExplorerItem>;

export const Default: Story = {
  args: {
    title: 'Button',
    description: 'Interactive button component',
  },
};

export const Selected: Story = {
  args: {
    title: 'Button',
    description: 'Interactive button component',
    selected: true,
  },
};

export const WithIcon: Story = {
  args: {
    title: 'Dashboard',
    description: 'Overview and metrics',
    icon: <ChartIcon size={20} />,
  },
};

export const WithIconSelected: Story = {
  args: {
    title: 'Dashboard',
    description: 'Overview and metrics',
    icon: <ChartIcon size={20} />,
    selected: true,
  },
};

export const ExplorerList: Story = {
  render: function ExplorerListExample() {
    const t = useT();
    const [selected, setSelected] = useState<string | null>('button');

    const items = [
      {
        id: 'button',
        title: 'Button',
        description: 'Interactive button component',
        icon: <FileTextIcon size={18} />,
      },
      {
        id: 'card',
        title: 'Card',
        description: 'Content container with borders',
        icon: <FileTextIcon size={18} />,
      },
      {
        id: 'table',
        title: 'DataTable',
        description: 'Sortable, filterable table',
        icon: <FileTextIcon size={18} />,
      },
      {
        id: 'settings',
        title: t('platform.nav.settings'),
        description: 'Application configuration',
        icon: <SettingsIcon size={18} />,
      },
    ];

    return (
      <Stack spacing="0">
        {items.map((item) => (
          <ExplorerItem
            key={item.id}
            title={item.title}
            description={item.description}
            icon={item.icon}
            selected={selected === item.id}
            onClick={() => setSelected(item.id)}
          />
        ))}
      </Stack>
    );
  },
};
