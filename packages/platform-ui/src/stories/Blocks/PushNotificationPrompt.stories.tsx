import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { PushNotificationPrompt } from '../../blocks/PushNotificationPrompt';

const meta: Meta<typeof PushNotificationPrompt> = {
  title: 'Blocks/PushNotificationPrompt',
  component: PushNotificationPrompt,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## PushNotificationPrompt

Modal dialog displayed to request browser push notification permission from the user for receiving booking updates and reminders.

### Features
- Contextual messages for different contexts
- Enable and dismiss actions
- Customizable title and description
- Context types (resourceRequest, reminder, general)

### Usage
\`\`\`tsx
<PushNotificationPrompt
  isOpen={true}
  onClose={handleClose}
  onEnable={handleEnable}
  context="resourceRequest"
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onClose: fn(),
    onEnable: fn(),
    onDismiss: fn(),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic prompt
export const Default: Story = {
  args: {
    isOpen: true,
    context: 'general',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div style={{ width: '500px', height: '400px', position: 'relative' }}>
        <PushNotificationPrompt {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};

// Booking context
export const BookingContext: Story = {
  args: {
    isOpen: true,
    context: 'resourceRequest',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div style={{ width: '500px', height: '400px', position: 'relative' }}>
        <PushNotificationPrompt {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};

// Reminder context
export const ReminderContext: Story = {
  args: {
    isOpen: true,
    context: 'reminder',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div style={{ width: '500px', height: '400px', position: 'relative' }}>
        <PushNotificationPrompt {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};

// Custom title and description
export const CustomContent: Story = {
  args: {
    isOpen: true,
    title: 'Enable Notifications',
    description: 'Stay updated with important information about your bookings.',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div style={{ width: '500px', height: '400px', position: 'relative' }}>
        <PushNotificationPrompt {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};

// Closed state
export const Closed: Story = {
  args: {
    isOpen: false,
    context: 'general',
  },
  render: (args) => (
    <div style={{ width: '500px', height: '400px', position: 'relative' }}>
      <PushNotificationPrompt {...args} />
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <p>Modal is closed. Set isOpen to true to show it.</p>
      </div>
    </div>
  ),
};
