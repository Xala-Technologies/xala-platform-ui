import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { RequireAuthModal } from '../../blocks/RequireAuthModal';

const meta: Meta<typeof RequireAuthModal> = {
  title: 'Blocks/RequireAuthModal',
  component: RequireAuthModal,
  parameters: {
    layout: 'centered',
    docs: {
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

// Basic modal
export const Default: Story = {
  args: {
    isOpen: true,
    actionContext: 'general',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div style={{ width: '500px', height: '400px', position: 'relative' }}>
        <RequireAuthModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};

// Favorite action context
export const FavoriteContext: Story = {
  args: {
    isOpen: true,
    actionContext: 'favorite',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div style={{ width: '500px', height: '400px', position: 'relative' }}>
        <RequireAuthModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};

// Book action context
export const BookContext: Story = {
  args: {
    isOpen: true,
    actionContext: 'book',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div style={{ width: '500px', height: '400px', position: 'relative' }}>
        <RequireAuthModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};

// Message action context
export const MessageContext: Story = {
  args: {
    isOpen: true,
    actionContext: 'message',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div style={{ width: '500px', height: '400px', position: 'relative' }}>
        <RequireAuthModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};

// Review action context
export const ReviewContext: Story = {
  args: {
    isOpen: true,
    actionContext: 'review',
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div style={{ width: '500px', height: '400px', position: 'relative' }}>
        <RequireAuthModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};

// Custom title and description
export const CustomContent: Story = {
  render: function Render() {
    const t = useT();
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div style={{ width: '500px', height: '400px', position: 'relative' }}>
        <RequireAuthModal
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onLogin={fn()}
          onRegister={fn()}
          title={t('platform.auth.login')}
          description={t('storybook.demo.cardDescription')}
        />
      </div>
    );
  },
};

// Without register button
export const WithoutRegister: Story = {
  args: {
    isOpen: true,
    actionContext: 'general',
    onRegister: undefined,
  },
  render: (args) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
      <div style={{ width: '500px', height: '400px', position: 'relative' }}>
        <RequireAuthModal {...args} isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    );
  },
};

// Closed state
export const Closed: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ width: '500px', height: '400px', position: 'relative' }}>
        <RequireAuthModal
          isOpen={false}
          actionContext="general"
          onClose={fn()}
          onLogin={fn()}
          onRegister={fn()}
        />
        <div style={{ padding: 'var(--ds-spacing-4)' }}>
          <p>{t('storybook.demo.sampleText')}</p>
        </div>
      </div>
    );
  },
};
