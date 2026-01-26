import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { Button } from '@digdir/designsystemet-react';
import { PushNotificationPrompt } from '../../blocks/PushNotificationPrompt';

const meta: Meta<typeof PushNotificationPrompt> = {
  title: 'Blocks/PushNotificationPrompt',
  component: PushNotificationPrompt,
  parameters: {
    layout: 'fullscreen',
    docs: {
      inlineStories: false,
      iframeHeight: 500,
      source: {
        type: 'code',
        state: 'closed',
      },
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

// Helper component with trigger button
function PromptWithTrigger(args: any) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Notification Prompt</Button>
      <PushNotificationPrompt {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

// Basic prompt
export const Default: Story = {
  args: {
    context: 'general',
  },
  render: (args) => <PromptWithTrigger {...args} />,
};

// Booking context
export const BookingContext: Story = {
  args: {
    context: 'resourceRequest',
  },
  render: (args) => <PromptWithTrigger {...args} />,
};

// Reminder context
export const ReminderContext: Story = {
  args: {
    context: 'reminder',
  },
  render: (args) => <PromptWithTrigger {...args} />,
};

// Custom title and description
export const CustomContent: Story = {
  args: {
    title: 'Enable Notifications',
    description: 'Stay updated with the latest notifications about your activity.',
  },
  render: (args) => <PromptWithTrigger {...args} />,
};
