import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import {
  NotificationBell,
  ConversationListItem,
  ConversationList,
  MessageBubble,
  ChatThread,
  Stack,
  Paragraph,
  Card,
} from '../../index';

/**
 * Messaging provides reusable components for chat/messaging functionality.
 *
 * ## Components
 * - NotificationBell: Notification bell with count
 * - ConversationListItem: Individual conversation item
 * - ConversationList: List of conversations
 * - MessageBubble: Single message bubble
 * - ChatThread: Full chat thread with messages
 *
 * ## When to Use
 * - Chat interfaces
 * - Messaging systems
 * - Notification centers
 */
const meta: Meta<typeof NotificationBell> = {
  title: 'Blocks/Messaging',
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NotificationBell>;

/**
 * NotificationBell component
 */
export const NotificationBellExample: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '200px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.messaging.notificationBell')}</Paragraph>
            <NotificationBell count={5} onClick={() => console.log('Bell clicked')} />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * ConversationListItem component
 */
export const ConversationListItemExample: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.messaging.conversationItem')}</Paragraph>
            <ConversationListItem
              conversation={{
                id: '1',
                userName: t('storybook.messaging.userName'),
                lastMessage: t('storybook.messaging.lastMessage'),
                lastMessageTime: new Date().toISOString(),
                unreadCount: 2,
                isOnline: true,
              }}
              isSelected={false}
              onClick={() => console.log('Conversation clicked')}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * ConversationList component
 */
export const ConversationListExample: Story = {
  render: function Render() {
    const t = useT();
    const [selectedId, setSelectedId] = useState<string | undefined>();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.messaging.conversationList')}</Paragraph>
            <div
              style={{
                height: '400px',
                border: '1px solid var(--ds-color-neutral-border-default)',
                borderRadius: 'var(--ds-border-radius-md)',
              }}
            >
              <ConversationList
                conversations={[
                  {
                    id: '1',
                    userName: t('storybook.messaging.userName'),
                    lastMessage: t('storybook.messaging.lastMessage'),
                    lastMessageTime: new Date().toISOString(),
                    unreadCount: 2,
                  },
                  {
                    id: '2',
                    userName: t('storybook.messaging.userName2'),
                    lastMessage: t('storybook.messaging.lastMessage2'),
                    lastMessageTime: new Date(Date.now() - 3600000).toISOString(),
                    unreadCount: 0,
                  },
                ]}
                selectedId={selectedId}
                onSelect={setSelectedId}
                emptyMessage={t('storybook.messaging.noConversations')}
              />
            </div>
          </Stack>
        </Card>
      </Stack>
    );
  },
};

/**
 * MessageBubble component
 */
export const MessageBubbleExample: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.messaging.messageBubble')}</Paragraph>
            <Stack spacing="var(--ds-spacing-2)">
              <MessageBubble
                message={{
                  id: '1',
                  content: t('storybook.messaging.message1'),
                  senderId: 'user1',
                  senderName: t('storybook.messaging.userName'),
                  createdAt: new Date().toISOString(),
                  isFromCurrentUser: false,
                }}
              />
              <MessageBubble
                message={{
                  id: '2',
                  content: t('storybook.messaging.message2'),
                  senderId: 'current',
                  senderName: t('storybook.messaging.currentUser'),
                  createdAt: new Date().toISOString(),
                  isFromCurrentUser: true,
                }}
                isFromCurrentUser={true}
              />
            </Stack>
          </Stack>
        </Card>
      </Stack>
    );
  },
};
