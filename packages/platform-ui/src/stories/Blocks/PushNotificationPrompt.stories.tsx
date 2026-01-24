import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
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
  render: () => {
    const t = useT();
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div style={{ width: '500px', height: '400px', position: 'relative' }}>
        <PushNotificationPrompt
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onEnable={fn()}
          onDismiss={fn()}
          title={t('platform.common.notifications')}
          description={t('storybook.demo.cardDescription')}
        />
      </div>
    );
  },
};

// Closed state
export const Closed: Story = {
  render: () => {
    const t = useT();
    return (
      <div style={{ width: '500px', height: '400px', position: 'relative' }}>
        <PushNotificationPrompt
          isOpen={false}
          context="general"
          onClose={fn()}
          onEnable={fn()}
          onDismiss={fn()}
        />
        <div style={{ padding: 'var(--ds-spacing-4)' }}>
          <p>{t('storybook.demo.sampleText')}</p>
        </div>
      </div>
    );
  },
};
