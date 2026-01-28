/**
 * MessagesWidget - Messaging Dashboard Widget
 *
 * Comprehensive messaging interface with:
 * - Conversation list with search and filters
 * - Chat view with message grouping
 * - User info panel
 * - Assignment and resolution actions
 *
 * @module @digilist/runtime/features/backoffice/messages
 */

import { useState, useEffect, useRef, useMemo, type ChangeEvent, type KeyboardEvent } from 'react';
import { useT } from '@xala-technologies/platform/runtime';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Badge,
  Spinner,
  Select,
  SendIcon,
  MessageSquareIcon,
  ContentLayout,
  Stack,
} from '@xala-technologies/platform-ui';
import {
  useConversationsVM,
  useMessagesVM,
  useSendMessage,
  useMarkMessagesRead,
  useResolveConversation,
  useReopenConversation,
  useAssignConversation,
  useUsers,
  type ConversationVM,
} from '@digilist/client-sdk';

// Internal components
import { ConversationList } from './components/ConversationList';
import { ChatView } from './components/ChatView';
import { UserInfoPanel } from './components/UserInfoPanel';

export interface MessagesWidgetProps {
  /** Custom class name */
  className?: string;
}

export type FilterType = 'all' | 'unread' | 'active' | 'resolved';

export function MessagesWidget({ className }: MessagesWidgetProps) {
  const t = useT();
  const [selectedConversationId, setSelectedConversationId] = useState<string | null>(null);
  const [messageInput, setMessageInput] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filter, setFilter] = useState<FilterType>('all');
  const [attachedFiles, setAttachedFiles] = useState<File[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  // Fetch conversations from API
  const { conversations, isLoading: isLoadingConversations } = useConversationsVM();

  // Fetch messages for selected conversation
  const { messages, isLoading: isLoadingMessages } = useMessagesVM(
    selectedConversationId!,
    { enabled: !!selectedConversationId }
  );

  // Mutations
  const sendMessage = useSendMessage();
  const markAsRead = useMarkMessagesRead();
  const resolveConversation = useResolveConversation();
  const reopenConversation = useReopenConversation();
  const assignConversation = useAssignConversation();

  // Fetch saksbehandlere for assignment
  const { data: usersData } = useUsers({ role: 'saksbehandler' });
  const saksbehandlere = usersData?.data ?? [];

  // Filter conversations
  const filteredConversations = useMemo(() => {
    let result = conversations;

    if (searchQuery) {
      result = result.filter((c) =>
        (c.userName && c.userName.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (c.subject && c.subject.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }

    if (filter === 'unread') {
      result = result.filter((c) => (c.unreadCount ?? 0) > 0);
    } else if (filter === 'active') {
      result = result.filter((c) => c.status === 'active');
    } else if (filter === 'resolved') {
      result = result.filter((c) => c.status === 'resolved');
    }

    return result;
  }, [conversations, searchQuery, filter]);

  // Stats
  const unreadTotal = conversations.reduce((sum, c) => sum + (c.unreadCount || 0), 0);
  const activeCount = conversations.filter((c) => c.status === 'active').length;

  // Auto-select first conversation
  useEffect(() => {
    if (conversations.length > 0 && !selectedConversationId) {
      const firstConversation = conversations[0];
      if (firstConversation) {
        setSelectedConversationId(firstConversation.id);
      }
    }
  }, [conversations, selectedConversationId]);

  // Mark messages as read when conversation is selected
  useEffect(() => {
    if (selectedConversationId) {
      const conversation = conversations.find((c: ConversationVM) => c.id === selectedConversationId);
      if (conversation && (conversation.unreadCount ?? 0) > 0) {
        markAsRead.mutate(selectedConversationId);
      }
    }
  }, [selectedConversationId, conversations]);

  // Focus input when conversation selected
  useEffect(() => {
    if (selectedConversationId) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [selectedConversationId]);

  const selectedConversation = conversations.find((c: ConversationVM) => c.id === selectedConversationId);

  const handleSendMessage = () => {
    if (!messageInput.trim() || !selectedConversationId) return;

    sendMessage.mutate(
      {
        conversationId: selectedConversationId,
        content: messageInput.trim(),
      },
      {
        onSuccess: () => {
          setMessageInput('');
          inputRef.current?.focus();
        },
      }
    );
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const handleFileSelect = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setAttachedFiles(Array.from(files));
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles(prev => prev.filter((_, i) => i !== index));
  };

  const handleResolveToggle = async () => {
    if (!selectedConversationId) return;

    if (selectedConversation?.status === 'active') {
      await resolveConversation.mutateAsync(selectedConversationId);
    } else {
      await reopenConversation.mutateAsync(selectedConversationId);
    }
  };

  const handleAssign = async (userId: string) => {
    if (!selectedConversationId) return;
    await assignConversation.mutateAsync({
      conversationId: selectedConversationId,
      assigneeId: userId || undefined,
    } as any);
  };

  return (
    <ContentLayout className={className}>
      <Stack spacing={4} style={{ height: 'calc(100vh - 160px)' }}>
        {/* Header */}
        <Stack direction="row" justify="space-between" align="center">
          <Stack direction="row" align="center" spacing={3}>
            <div style={{
              width: '40px',
              height: '40px',
              borderRadius: 'var(--ds-border-radius-md)',
              backgroundColor: 'var(--ds-color-brand-1-surface-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ds-color-brand-1-base-default)',
            }}>
              <MessageSquareIcon />
            </div>
            <Stack spacing={0}>
              <Heading level={1} data-size="lg">
                {t('messages.title', 'Meldinger')}
              </Heading>
              <Paragraph data-size="sm" color="subtle">
                {t('messages.description', 'Kommunikasjon med brukere og organisasjoner')}
              </Paragraph>
            </Stack>
          </Stack>
          <Stack direction="row" spacing={3}>
            {unreadTotal > 0 && (
              <Badge data-color="danger" data-size="md">
                {unreadTotal} {t('messages.unread', 'uleste')}
              </Badge>
            )}
            <Badge data-color="success" data-size="md">
              {activeCount} {t('messages.active', 'aktive')}
            </Badge>
          </Stack>
        </Stack>

        {/* Main Content */}
        <Stack direction="row" spacing={4} style={{ flex: 1, minHeight: 0 }}>
          {/* Conversation List */}
          <ConversationList
            conversations={filteredConversations}
            selectedConversationId={selectedConversationId}
            onSelectConversation={setSelectedConversationId}
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            filter={filter}
            onFilterChange={setFilter}
            isLoading={isLoadingConversations}
          />

          {/* Chat View */}
          <ChatView
            conversation={selectedConversation}
            messages={messages}
            isLoading={isLoadingMessages}
            messageInput={messageInput}
            onMessageInputChange={setMessageInput}
            onSendMessage={handleSendMessage}
            onKeyPress={handleKeyPress}
            isSending={sendMessage.isPending}
            attachedFiles={attachedFiles}
            onFileSelect={handleFileSelect}
            onRemoveFile={handleRemoveFile}
            inputRef={inputRef}
          />

          {/* User Info Panel */}
          {selectedConversation && (
            <UserInfoPanel
              conversation={selectedConversation}
              saksbehandlere={saksbehandlere}
              onAssign={handleAssign}
              onResolveToggle={handleResolveToggle}
              isResolving={resolveConversation.isPending || reopenConversation.isPending}
            />
          )}
        </Stack>
      </Stack>
    </ContentLayout>
  );
}

export default MessagesWidget;
