/**
 * ChatView - Chat messages area with input
 */

import { useRef, useEffect, useMemo, type ChangeEvent, type KeyboardEvent, type RefObject } from 'react';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Badge,
  Spinner,
  SendIcon,
  MessageSquareIcon,
  UserIcon,
  CheckCircleIcon,
  PaperclipIcon,
  XIcon,
  Stack,
} from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/platform/runtime';
import { formatTime, type ConversationVM, type MessageVM } from '@digilist/client-sdk';

// Date grouping
function formatMessageDate(dateStr: string): string {
  const date = new Date(dateStr);
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(yesterday.getDate() - 1);

  if (date.toDateString() === today.toDateString()) return 'I dag';
  if (date.toDateString() === yesterday.toDateString()) return 'I gar';
  return date.toLocaleDateString('nb-NO', { weekday: 'long', day: 'numeric', month: 'long' });
}

export interface ChatViewProps {
  conversation: ConversationVM | undefined;
  messages: MessageVM[];
  isLoading: boolean;
  messageInput: string;
  onMessageInputChange: (value: string) => void;
  onSendMessage: () => void;
  onKeyPress: (e: KeyboardEvent<HTMLInputElement>) => void;
  isSending: boolean;
  attachedFiles: File[];
  onFileSelect: (e: ChangeEvent<HTMLInputElement>) => void;
  onRemoveFile: (index: number) => void;
  inputRef: RefObject<HTMLInputElement>;
}

export function ChatView({
  conversation,
  messages,
  isLoading,
  messageInput,
  onMessageInputChange,
  onSendMessage,
  onKeyPress,
  isSending,
  attachedFiles,
  onFileSelect,
  onRemoveFile,
  inputRef,
}: ChatViewProps) {
  const t = useT();
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to newest message
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  // Group messages by date
  const groupedMessages = useMemo(() => {
    return messages.reduce((groups: Record<string, MessageVM[]>, message: MessageVM) => {
      const dateKey = formatMessageDate(message.createdAt);
      if (!groups[dateKey]) groups[dateKey] = [];
      groups[dateKey].push(message);
      return groups;
    }, {});
  }, [messages]);

  if (!conversation) {
    return (
      <Card style={{ flex: 1, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
        <Stack align="center" justify="center" spacing={4} style={{ flex: 1, backgroundColor: 'var(--ds-color-neutral-background-subtle)' }}>
          <div style={{
            width: '80px',
            height: '80px',
            borderRadius: 'var(--ds-border-radius-full)',
            backgroundColor: 'var(--ds-color-neutral-background-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}>
            <MessageSquareIcon />
          </div>
          <Heading level={3} data-size="md">
            {t('messages.selectConversation', 'Velg en samtale')}
          </Heading>
          <Paragraph color="subtle" align="center" style={{ maxWidth: '280px' }}>
            {t('messages.selectConversationDesc', 'Klikk pa en samtale for a svare brukeren')}
          </Paragraph>
        </Stack>
      </Card>
    );
  }

  return (
    <Card style={{ flex: 1, padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
      {/* Header */}
      <div style={{
        padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
        borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        <Stack direction="row" align="center" spacing={3}>
          <div style={{ position: 'relative' }}>
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: 'var(--ds-border-radius-full)',
              backgroundColor: 'var(--ds-color-brand-1-surface-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ds-color-brand-1-base-default)',
            }}>
              <UserIcon />
            </div>
            <div style={{
              position: 'absolute',
              bottom: '2px',
              right: '2px',
              width: '10px',
              height: '10px',
              borderRadius: 'var(--ds-border-radius-full)',
              backgroundColor: conversation.status === 'active'
                ? 'var(--ds-color-success-base-default)'
                : 'var(--ds-color-neutral-border-default)',
              border: '2px solid var(--ds-color-neutral-background-default)',
            }} />
          </div>
          <Stack spacing={0}>
            <Heading level={3} data-size="sm">
              {String(conversation.userName || conversation.subject || 'Ukjent bruker')}
            </Heading>
            <Paragraph data-size="xs" style={{ color: conversation.status === 'active' ? 'var(--ds-color-success-text-default)' : 'var(--ds-color-neutral-text-subtle)', margin: 0 }}>
              {conversation.status === 'active' ? t('common.aktiv_samtale', 'Aktiv samtale') : t('status.resolved', 'Lost')}
            </Paragraph>
          </Stack>
        </Stack>
        <Badge
          data-color={conversation.status === 'active' ? 'success' : 'neutral'}
          data-size="sm"
        >
          {conversation.status === 'active' ? t('messages.status.active', 'Aktiv') : t('messages.status.resolved', 'Lost')}
        </Badge>
      </div>

      {/* Messages */}
      <div style={{
        flex: 1,
        overflow: 'auto',
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-background-subtle)',
      }}>
        {isLoading ? (
          <Stack align="center" justify="center" style={{ padding: 'var(--ds-spacing-8)' }}>
            <Spinner aria-label={t('backoffice.ariaLabel.lasterMeldinger', 'Laster meldinger')} data-size="md" />
          </Stack>
        ) : messages.length === 0 ? (
          <Stack align="center" justify="center" spacing={3} style={{ height: '100%' }}>
            <div style={{
              width: '64px',
              height: '64px',
              borderRadius: 'var(--ds-border-radius-full)',
              backgroundColor: 'var(--ds-color-neutral-background-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}>
              <MessageSquareIcon />
            </div>
            <Paragraph>{t('messages.noMessages', 'Ingen meldinger enna')}</Paragraph>
            <Paragraph data-size="sm" color="subtle">
              {t('messages.replyPrompt', 'Svar pa brukerens henvendelse')}
            </Paragraph>
          </Stack>
        ) : (
          <Stack spacing={5}>
            {Object.entries(groupedMessages).map(([date, dateMessages]) => (
              <div key={date}>
                {/* Date Separator */}
                <Stack direction="row" align="center" spacing={3} style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                  <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--ds-color-neutral-border-subtle)' }} />
                  <span style={{
                    color: 'var(--ds-color-neutral-text-subtle)',
                    fontSize: 'var(--ds-font-size-xs)',
                    fontWeight: 'var(--ds-font-weight-medium)',
                    textTransform: 'capitalize',
                  }}>
                    {date}
                  </span>
                  <div style={{ flex: 1, height: '1px', backgroundColor: 'var(--ds-color-neutral-border-subtle)' }} />
                </Stack>

                {/* Messages for this date */}
                <Stack spacing={3}>
                  {dateMessages.map((message) => {
                    const isAdmin = message.sender === 'admin' || message.senderId === 'admin';

                    return (
                      <div
                        key={message.id}
                        style={{
                          display: 'flex',
                          flexDirection: isAdmin ? 'row-reverse' : 'row',
                          alignItems: 'flex-end',
                          gap: 'var(--ds-spacing-2)',
                        }}
                      >
                        {/* Avatar */}
                        {!isAdmin && (
                          <div style={{
                            width: '32px',
                            height: '32px',
                            borderRadius: 'var(--ds-border-radius-full)',
                            backgroundColor: 'var(--ds-color-brand-1-surface-default)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            color: 'var(--ds-color-brand-1-base-default)',
                            flexShrink: 0,
                          }}>
                            <UserIcon />
                          </div>
                        )}

                        {/* Bubble */}
                        <div style={{
                          maxWidth: '65%',
                          padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
                          borderRadius: isAdmin
                            ? 'var(--ds-border-radius-lg) var(--ds-border-radius-lg) var(--ds-border-radius-sm) var(--ds-border-radius-lg)'
                            : 'var(--ds-border-radius-lg) var(--ds-border-radius-lg) var(--ds-border-radius-lg) var(--ds-border-radius-sm)',
                          backgroundColor: isAdmin
                            ? 'var(--ds-color-brand-1-base-default)'
                            : 'var(--ds-color-neutral-background-default)',
                          color: isAdmin ? 'var(--ds-color-neutral-contrast-default)' : 'var(--ds-color-neutral-text-default)',
                          boxShadow: 'var(--ds-shadow-xs)',
                        }}>
                          {!isAdmin && (
                            <Paragraph data-size="xs" style={{ margin: 0, marginBottom: 'var(--ds-spacing-1)', fontWeight: 'var(--ds-font-weight-semibold)', color: 'inherit', opacity: 0.8 }}>
                              {String(message.senderName || 'Bruker')}
                            </Paragraph>
                          )}
                          <Paragraph data-size="sm" style={{ margin: 0, color: 'inherit', lineHeight: 'var(--ds-font-line-height-md)' }}>
                            {String(message.content)}
                          </Paragraph>
                          <Stack direction="row" align="center" justify={isAdmin ? 'end' : 'start'} spacing={1} style={{ marginTop: 'var(--ds-spacing-1)' }}>
                            <span style={{ fontSize: 'var(--ds-font-size-body-xs)', opacity: 0.7 }}>
                              {formatTime(message.createdAt)}
                            </span>
                            {isAdmin && (
                              <CheckCircleIcon style={{ width: '12px', height: '12px', opacity: 0.7 }} />
                            )}
                          </Stack>
                        </div>
                      </div>
                    );
                  })}
                </Stack>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </Stack>
        )}
      </div>

      {/* Input */}
      <div style={{
        padding: 'var(--ds-spacing-4)',
        borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
      }}>
        {/* Attached Files Display */}
        {attachedFiles.length > 0 && (
          <Stack direction="row" wrap spacing={2} style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {attachedFiles.map((file, index) => (
              <Stack
                key={index}
                direction="row"
                align="center"
                spacing={2}
                style={{
                  padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                  backgroundColor: 'var(--ds-color-neutral-surface-default)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  border: '1px solid var(--ds-color-neutral-border-default)',
                }}
              >
                <PaperclipIcon style={{ color: 'var(--ds-color-neutral-text-subtle)', fontSize: 'var(--ds-font-size-sm)' }} />
                <Paragraph data-size="xs" style={{ margin: 0 }}>
                  {file.name}
                </Paragraph>
                <Button
                  type="button"
                  variant="tertiary"
                  data-size="sm"
                  onClick={() => onRemoveFile(index)}
                  aria-label={t('common.fjern_vedlegg', 'Fjern vedlegg')}
                  style={{ padding: '2px' }}
                >
                  <XIcon style={{ fontSize: 'var(--ds-font-size-sm)', color: 'var(--ds-color-neutral-text-subtle)' }} />
                </Button>
              </Stack>
            ))}
          </Stack>
        )}

        <Stack
          direction="row"
          align="center"
          spacing={3}
          style={{
            backgroundColor: 'var(--ds-color-neutral-background-subtle)',
            borderRadius: 'var(--ds-border-radius-lg)',
            padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
            border: '1px solid var(--ds-color-neutral-border-default)',
          }}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            onChange={onFileSelect}
            style={{ display: 'none' }}
          />
          <Button
            type="button"
            variant="tertiary"
            onClick={() => fileInputRef.current?.click()}
            aria-label={t('common.legg_til_vedlegg', 'Legg til vedlegg')}
            title={t('common.legg_til_vedlegg', 'Legg til vedlegg')}
            style={{
              padding: 'var(--ds-spacing-1)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            <PaperclipIcon />
          </Button>
          <input
            ref={inputRef}
            type="text"
            placeholder={t('common.skriv_et_svar', 'Skriv et svar...')}
            value={messageInput}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onMessageInputChange(e.target.value)}
            onKeyDown={onKeyPress}
            style={{
              flex: 1,
              padding: 'var(--ds-spacing-2)',
              border: 'none',
              fontSize: 'var(--ds-font-size-sm)',
              backgroundColor: 'transparent',
              outline: 'none',
            }}
          />
          <Button
            type="button"
            variant="primary"
            data-size="sm"
            onClick={onSendMessage}
            disabled={!messageInput.trim() || isSending}
          >
            <SendIcon />
            {isSending ? t('common.sender', 'Sender...') : t('messages.send', 'Send')}
          </Button>
        </Stack>
      </div>
    </Card>
  );
}
