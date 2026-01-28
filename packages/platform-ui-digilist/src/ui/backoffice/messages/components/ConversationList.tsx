/**
 * ConversationList - Conversation list with search and filters
 */

import { type ChangeEvent } from 'react';
import {
  Card,
  Paragraph,
  Button,
  Badge,
  Spinner,
  SearchIcon,
  MessageSquareIcon,
  UserIcon,
  Stack,
} from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/platform/runtime';
import type { ConversationVM } from '@digilist/client-sdk';
import type { FilterType } from '../MessagesWidget';

// Time ago formatting
function formatTimeAgo(dateStr: string): string {
  const date = new Date(dateStr);
  const now = new Date();
  const diffMs = now.getTime() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMs / 3600000);
  const diffDays = Math.floor(diffMs / 86400000);

  if (diffMins < 1) return 'Na';
  if (diffMins < 60) return `${diffMins}m`;
  if (diffHours < 24) return `${diffHours}t`;
  if (diffDays < 7) return `${diffDays}d`;
  return date.toLocaleDateString('nb-NO', { day: 'numeric', month: 'short' });
}

export interface ConversationListProps {
  conversations: ConversationVM[];
  selectedConversationId: string | null;
  onSelectConversation: (id: string) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  filter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  isLoading: boolean;
}

export function ConversationList({
  conversations,
  selectedConversationId,
  onSelectConversation,
  searchQuery,
  onSearchChange,
  filter,
  onFilterChange,
  isLoading,
}: ConversationListProps) {
  const t = useT();

  const filterTabs: { key: FilterType; label: string }[] = [
    { key: 'all', label: t('messages.filter.all', 'Alle') },
    { key: 'unread', label: t('messages.filter.unread', 'Uleste') },
    { key: 'active', label: t('messages.filter.active', 'Aktive') },
    { key: 'resolved', label: t('common.lost', 'Lost') },
  ];

  return (
    <Card style={{ width: '380px', padding: 0, overflow: 'hidden', display: 'flex', flexDirection: 'column', flexShrink: 0 }}>
      {/* Search & Filter */}
      <div style={{ padding: 'var(--ds-spacing-4)', borderBottom: '1px solid var(--ds-color-neutral-border-subtle)', backgroundColor: 'var(--ds-color-neutral-background-subtle)' }}>
        {/* Search */}
        <div style={{ position: 'relative', marginBottom: 'var(--ds-spacing-3)' }}>
          <input
            type="text"
            placeholder={t('common.sok_etter_samtaler', 'Sok etter samtaler...')}
            value={searchQuery}
            onChange={(e: ChangeEvent<HTMLInputElement>) => onSearchChange(e.target.value)}
            style={{
              width: '100%',
              padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
              paddingLeft: 'var(--ds-spacing-9)',
              border: '1px solid var(--ds-color-neutral-border-default)',
              borderRadius: 'var(--ds-border-radius-md)',
              fontSize: 'var(--ds-font-size-sm)',
              backgroundColor: 'var(--ds-color-neutral-background-default)',
            }}
          />
          <div style={{
            position: 'absolute',
            left: 'var(--ds-spacing-3)',
            top: '50%',
            transform: 'translateY(-50%)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}>
            <SearchIcon />
          </div>
        </div>

        {/* Filter Tabs */}
        <Stack direction="row" spacing={1}>
          {filterTabs.map((tab) => (
            <Button
              key={tab.key}
              type="button"
              variant="tertiary"
              onClick={() => onFilterChange(tab.key)}
              style={{
                flex: 1,
                padding: 'var(--ds-spacing-2)',
                borderRadius: 'var(--ds-border-radius-md)',
                backgroundColor: filter === tab.key
                  ? 'var(--ds-color-brand-1-surface-default)'
                  : 'transparent',
                color: filter === tab.key
                  ? 'var(--ds-color-brand-1-text-default)'
                  : 'var(--ds-color-neutral-text-default)',
                fontSize: 'var(--ds-font-size-xs)',
                fontWeight: filter === tab.key ? 600 : 400,
              }}
            >
              {tab.label}
            </Button>
          ))}
        </Stack>
      </div>

      {/* Conversations */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {isLoading ? (
          <Stack align="center" justify="center" style={{ padding: 'var(--ds-spacing-8)' }}>
            <Spinner aria-label={t('state.loading', 'Laster...')} data-size="md" />
          </Stack>
        ) : conversations.length === 0 ? (
          <Stack align="center" justify="center" spacing={3} style={{ padding: 'var(--ds-spacing-8)' }}>
            <div style={{
              width: '56px',
              height: '56px',
              borderRadius: 'var(--ds-border-radius-full)',
              backgroundColor: 'var(--ds-color-neutral-surface-hover)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}>
              <MessageSquareIcon />
            </div>
            <Paragraph color="subtle">
              {searchQuery ? t('common.ingen_samtaler_funnet', 'Ingen samtaler funnet') : t('messages.noConversations', 'Ingen samtaler enna')}
            </Paragraph>
          </Stack>
        ) : (
          conversations.map((conversation) => {
            const isSelected = selectedConversationId === conversation.id;
            const hasUnread = (conversation.unreadCount ?? 0) > 0;
            const lastMessageTime = conversation.updatedAt || conversation.lastMessageAt || conversation.createdAt;

            return (
              <div
                key={conversation.id}
                onClick={() => onSelectConversation(conversation.id)}
                style={{
                  padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
                  borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
                  cursor: 'pointer',
                  backgroundColor: isSelected
                    ? 'var(--ds-color-brand-1-surface-default)'
                    : hasUnread
                      ? 'var(--ds-color-accent-surface-default)'
                      : 'transparent',
                  borderLeft: isSelected
                    ? '3px solid var(--ds-color-brand-1-base-default)'
                    : '3px solid transparent',
                }}
              >
                <Stack direction="row" spacing={3}>
                  {/* Avatar */}
                  <div style={{ position: 'relative', flexShrink: 0 }}>
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

                  {/* Content */}
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Stack direction="row" justify="space-between" align="start">
                      <Paragraph data-size="sm" style={{
                        fontWeight: hasUnread ? 700 : 500,
                        color: 'var(--ds-color-neutral-text-default)',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                        whiteSpace: 'nowrap',
                        margin: 0,
                      }}>
                        {String(conversation.userName || conversation.subject || 'Ukjent bruker')}
                      </Paragraph>
                      <span style={{ fontSize: 'var(--ds-font-size-body-xs)', color: 'var(--ds-color-neutral-text-subtle)', whiteSpace: 'nowrap' }}>
                        {lastMessageTime ? formatTimeAgo(lastMessageTime) : ''}
                      </span>
                    </Stack>

                    {conversation.bookingId && (
                      <Paragraph data-size="xs" style={{ margin: 0, marginTop: '2px', color: 'var(--ds-color-brand-1-text-default)' }}>
                        Booking: {String(conversation.bookingId).slice(0, 8)}...
                      </Paragraph>
                    )}

                    <Stack direction="row" align="center" spacing={2} style={{ marginTop: 'var(--ds-spacing-1)' }}>
                      <Paragraph
                        data-size="xs"
                        style={{
                          margin: 0,
                          flex: 1,
                          color: 'var(--ds-color-neutral-text-subtle)',
                          overflow: 'hidden',
                          textOverflow: 'ellipsis',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {typeof conversation.lastMessage === 'object' && conversation.lastMessage !== null
                          ? String((conversation.lastMessage as { content?: string }).content || 'Ingen meldinger')
                          : String(conversation.lastMessage || 'Ingen meldinger')}
                      </Paragraph>
                      {hasUnread && (
                        <Badge data-color="danger" data-size="sm">
                          {conversation.unreadCount}
                        </Badge>
                      )}
                    </Stack>
                  </div>
                </Stack>
              </div>
            );
          })
        )}
      </div>
    </Card>
  );
}
