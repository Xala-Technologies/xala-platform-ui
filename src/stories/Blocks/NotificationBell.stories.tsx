import type { Meta, StoryObj } from '@storybook/react';
import { NotificationBell } from '../../blocks';

const meta = {
  title: 'Blocks/NotificationBell',
  component: NotificationBell,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
} satisfies Meta<typeof NotificationBell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    count: 0,
    onClick: () => console.log('Notification bell clicked'),
  },
};

export const WithNotifications: Story = {
  args: {
    count: 5,
    onClick: () => console.log('Notification bell clicked'),
  },
};

export const ManyNotifications: Story = {
  args: {
    count: 99,
    onClick: () => console.log('Notification bell clicked'),
  },
};
