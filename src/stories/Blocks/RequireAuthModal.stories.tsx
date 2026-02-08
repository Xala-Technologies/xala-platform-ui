import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { Button } from '@digdir/designsystemet-react';
import { RequireAuthModal } from '../../blocks/RequireAuthModal';

const meta: Meta<typeof RequireAuthModal> = {
  title: 'Blocks/RequireAuthModal',
  component: RequireAuthModal,
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
## RequireAuthModal

Modal dialog displayed when an unauthenticated user attempts an action that requires authentication.

### Features
- Contextual messages for different actions
- Login and register buttons
- Customizable title and description
- Action context (favorite, book, message, review, general)

### Usage
\`\`\`tsx
<RequireAuthModal
  isOpen={true}
  onClose={handleClose}
  onLogin={handleLogin}
  onRegister={handleRegister}
  actionContext="book"
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onClose: fn(),
    onLogin: fn(),
    onRegister: fn(),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Helper component with trigger button
function ModalWithTrigger(args: any) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button onClick={() => setIsOpen(true)}>Open Auth Modal</Button>
      <RequireAuthModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}

// Basic modal
export const Default: Story = {
  args: {
    actionContext: 'general',
  },
  render: (args) => <ModalWithTrigger {...args} />,
};

// Favorite action context
export const FavoriteContext: Story = {
  args: {
    actionContext: 'favorite',
  },
  render: (args) => <ModalWithTrigger {...args} />,
};

// Book action context
export const BookContext: Story = {
  args: {
    actionContext: 'book',
  },
  render: (args) => <ModalWithTrigger {...args} />,
};

// Message action context
export const MessageContext: Story = {
  args: {
    actionContext: 'message',
  },
  render: (args) => <ModalWithTrigger {...args} />,
};

// Review action context
export const ReviewContext: Story = {
  args: {
    actionContext: 'review',
  },
  render: (args) => <ModalWithTrigger {...args} />,
};

// Custom title and description
export const CustomContent: Story = {
  args: {
    title: 'Login Required',
    description: 'Please login to continue with this action.',
  },
  render: (args) => <ModalWithTrigger {...args} />,
};

// Without register button
export const WithoutRegister: Story = {
  args: {
    actionContext: 'general',
    onRegister: undefined,
  },
  render: (args) => <ModalWithTrigger {...args} />,
};
