import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React, { useState } from 'react';
import {
  NotificationBell,
  ConversationListItem,
  ConversationList,
  MessageBubble,
  ChatThread,
} from '../../blocks/messaging';
import type { ConversationItem, MessageItem } from '../../blocks/messaging';

const meta: Meta<typeof NotificationBell> = {
  title: 'Blocks/Messaging',
  component: NotificationBell,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Messaging Components

Reusable components for chat/messaging functionality including notification bell, conversation lists, and chat threads.

### Features
- Notification bell with badge count
- Conversation list with search
- Message bubbles with read receipts
- Chat thread with input

### Usage
\`\`\`tsx
<NotificationBell count={5} onClick={handleClick} />
<ConversationList conversations={conversations} onSelect={handleSelect} />
<ChatThread messages={messages} onSend={handleSend} />
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample conversations
const sampleConversations: ConversationItem[] = [
  {
    id: '1',
    userName: 'John Doe',
    subject: 'Booking inquiry',
    lastMessage: 'Thank you for your response!',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    unreadCount: 2,
    status: 'active',
    isOnline: true,
  },
  {
    id: '2',
    userName: 'Jane Smith',
    subject: 'Resource availability',
    lastMessage: 'When will the room be available?',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    unreadCount: 0,
    status: 'pending',
    isOnline: false,
  },
  {
    id: '3',
    userName: 'Bob Johnson',
    subject: 'Payment confirmation',
    lastMessage: 'Payment has been received.',
    lastMessageTime: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    unreadCount: 1,
    status: 'resolved',
    isOnline: true,
  },
];

// Sample messages
const sampleMessages: MessageItem[] = [
  {
    id: '1',
    content: 'Hello, I have a question about the booking.',
    senderId: 'user-1',
    senderName: 'John Doe',
    createdAt: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    isRead: true,
    isFromCurrentUser: false,
  },
  {
    id: '2',
    content: 'Sure, how can I help you?',
    senderId: 'current-user',
    senderName: 'You',
    createdAt: new Date(Date.now() - 1000 * 60 * 55).toISOString(),
    isRead: true,
    isFromCurrentUser: true,
  },
  {
    id: '3',
    content: 'When is the earliest I can book?',
    senderId: 'user-1',
    senderName: 'John Doe',
    createdAt: new Date(Date.now() - 1000 * 60 * 50).toISOString(),
    isRead: true,
    isFromCurrentUser: false,
  },
  {
    id: '4',
    content: 'You can book starting from next week.',
    senderId: 'current-user',
    senderName: 'You',
    createdAt: new Date(Date.now() - 1000 * 60 * 45).toISOString(),
    isRead: false,
    isFromCurrentUser: true,
  },
];

// NotificationBell stories
export const NotificationBellDefault: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)', alignItems: 'center' }}>
      <NotificationBell count={0} onClick={fn()} />
      <NotificationBell count={5} onClick={fn()} />
      <NotificationBell count={99} onClick={fn()} />
      <NotificationBell count={150} onClick={fn()} maxCount={99} />
    </div>
  ),
};

// ConversationListItem stories
export const ConversationListItemDefault: Story = {
  render: () => (
    <div style={{ width: '300px' }}>
      <ConversationListItem
        conversation={sampleConversations[0]}
        isSelected={false}
        onClick={fn()}
      />
      <ConversationListItem
        conversation={sampleConversations[1]}
        isSelected={true}
        onClick={fn()}
      />
      <ConversationListItem
        conversation={sampleConversations[2]}
        isSelected={false}
        onClick={fn()}
      />
    </div>
  ),
};

// ConversationList stories
export const ConversationListDefault: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    return (
      <div style={{ width: '350px', height: '500px', border: '1px solid var(--ds-color-neutral-border-default)' }}>
        <ConversationList
          conversations={sampleConversations}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(id)}
        />
      </div>
    );
  },
};

export const ConversationListWithFilters: Story = {
  render: () => {
    const [selectedId, setSelectedId] = useState<string | null>(null);
    const [activeFilter, setActiveFilter] = useState('all');
    return (
      <div style={{ width: '350px', height: '500px', border: '1px solid var(--ds-color-neutral-border-default)' }}>
        <ConversationList
          conversations={sampleConversations}
          selectedId={selectedId}
          onSelect={(id) => setSelectedId(id)}
          filterTabs={[
            { id: 'all', label: 'All', count: 3 },
            { id: 'active', label: 'Active', count: 1 },
            { id: 'pending', label: 'Pending', count: 1 },
          ]}
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
        />
      </div>
    );
  },
};

export const ConversationListEmpty: Story = {
  render: () => (
    <div style={{ width: '350px', height: '500px', border: '1px solid var(--ds-color-neutral-border-default)' }}>
      <ConversationList conversations={[]} emptyMessage="No conversations yet" />
    </div>
  ),
};

// MessageBubble stories
export const MessageBubbleDefault: Story = {
  render: () => (
    <div style={{ width: '400px', display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
      <MessageBubble message={sampleMessages[0]} isFromCurrentUser={false} showReadReceipt={true} />
      <MessageBubble message={sampleMessages[1]} isFromCurrentUser={true} showReadReceipt={true} />
      <MessageBubble message={sampleMessages[3]} isFromCurrentUser={true} showReadReceipt={true} />
    </div>
  ),
};

// ChatThread stories
export const ChatThreadDefault: Story = {
  render: () => {
    const [messages, setMessages] = useState(sampleMessages);
    return (
      <div style={{ width: '500px', height: '600px', border: '1px solid var(--ds-color-neutral-border-default)' }}>
        <ChatThread
          messages={messages}
          currentUserId="current-user"
          onSend={(content) => {
            const newMessage: MessageItem = {
              id: `msg-${Date.now()}`,
              content,
              senderId: 'current-user',
              senderName: 'You',
              createdAt: new Date().toISOString(),
              isRead: false,
              isFromCurrentUser: true,
            };
            setMessages([...messages, newMessage]);
          }}
          placeholder="Type a message..."
        />
      </div>
    );
  },
};

export const ChatThreadEmpty: Story = {
  render: () => {
    const [messages, setMessages] = useState<MessageItem[]>([]);
    return (
      <div style={{ width: '500px', height: '600px', border: '1px solid var(--ds-color-neutral-border-default)' }}>
        <ChatThread
          messages={messages}
          currentUserId="current-user"
          onSend={(content) => {
            const newMessage: MessageItem = {
              id: `msg-${Date.now()}`,
              content,
              senderId: 'current-user',
              senderName: 'You',
              createdAt: new Date().toISOString(),
              isRead: false,
              isFromCurrentUser: true,
            };
            setMessages([newMessage]);
          }}
          placeholder="Start a conversation..."
        />
      </div>
    );
  },
};
