/**
 * SupportTicketWidget
 *
 * Widget for managing support tickets.
 * Uses @xala-technologies/platform-ui components only.
 */

import { useState, useCallback } from 'react';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Badge,
  Table,
  Spinner,
  EmptyState,
  Dialog,
  Textfield,
  Textarea,
  Select,
  Stack,
  Tabs,
  MessageIcon,
  ClockIcon,
  UserIcon,
  SendIcon,
} from '@xala-technologies/platform-ui';
import type {
  SupportTicket,
  TicketMessage,
  TicketStatus,
  TicketCategory,
  TicketPriority,
  CreateTicketDTO,
  AddTicketMessageDTO,
} from '@digilist/client-sdk';

export interface SupportTicketWidgetProps {
  /** Translation function */
  t: (key: string) => string;
  /** Locale */
  locale: string;
  /** Support tickets list */
  tickets: { data: SupportTicket[]; meta?: { total: number } } | undefined;
  /** Selected ticket (for detail view) */
  selectedTicket: SupportTicket | null;
  /** Loading state */
  isLoading: boolean;
  /** Create ticket handler */
  onCreateTicket: (data: CreateTicketDTO) => Promise<void>;
  /** Add message handler */
  onAddMessage: (ticketId: string, data: AddTicketMessageDTO) => Promise<void>;
  /** Close ticket handler */
  onCloseTicket: (id: string) => Promise<void>;
  /** Select ticket handler */
  onSelectTicket: (id: string | null) => void;
  /** Is mutating */
  isMutating?: boolean;
}

const STATUS_COLORS: Record<TicketStatus, string> = {
  open: 'warning',
  in_progress: 'info',
  waiting_on_customer: 'neutral',
  resolved: 'success',
  closed: 'neutral',
};

const PRIORITY_COLORS: Record<TicketPriority, string> = {
  low: 'neutral',
  medium: 'info',
  high: 'warning',
  urgent: 'danger',
};

export function SupportTicketWidget({
  t,
  locale,
  tickets,
  selectedTicket,
  isLoading,
  onCreateTicket,
  onAddMessage,
  onCloseTicket,
  onSelectTicket,
  isMutating = false,
}: SupportTicketWidgetProps) {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false);
  const [newTicket, setNewTicket] = useState<Partial<CreateTicketDTO>>({
    category: 'booking',
    priority: 'medium',
  });
  const [newMessage, setNewMessage] = useState('');

  const handleCreateSubmit = useCallback(async () => {
    if (!newTicket.subject || !newTicket.description || !newTicket.category) return;
    await onCreateTicket(newTicket as CreateTicketDTO);
    setIsCreateDialogOpen(false);
    setNewTicket({ category: 'booking', priority: 'medium' });
  }, [newTicket, onCreateTicket]);

  const handleSendMessage = useCallback(async () => {
    if (!selectedTicket || !newMessage.trim()) return;
    await onAddMessage(selectedTicket.id, { content: newMessage });
    setNewMessage('');
  }, [selectedTicket, newMessage, onAddMessage]);

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(locale === 'en' ? 'en-US' : 'nb-NO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: 'var(--ds-spacing-8)',
        }}
      >
        <Spinner aria-label={t('state.loading')} data-size="lg" />
      </div>
    );
  }

  // Detail view
  if (selectedTicket) {
    return (
      <Stack gap="4">
        {/* Back button */}
        <Button
          type="button"
          variant="tertiary"
          data-size="sm"
          onClick={() => onSelectTicket(null)}
        >
          {t('common.back')}
        </Button>

        {/* Ticket header */}
        <Card style={{ padding: 'var(--ds-spacing-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <Paragraph data-size="xs" style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}>
                #{selectedTicket.ticketNumber}
              </Paragraph>
              <Heading level={2} data-size="md" style={{ margin: 0 }}>
                {selectedTicket.subject}
              </Heading>
              <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', marginTop: 'var(--ds-spacing-2)' }}>
                <Badge data-color={STATUS_COLORS[selectedTicket.status]} data-size="sm">
                  {t(`support.status.${selectedTicket.status}`)}
                </Badge>
                <Badge data-color={PRIORITY_COLORS[selectedTicket.priority]} data-size="sm">
                  {t(`support.priority.${selectedTicket.priority}`)}
                </Badge>
                <Badge data-size="sm">
                  {t(`support.category.${selectedTicket.category}`)}
                </Badge>
              </div>
            </div>
            {selectedTicket.status !== 'closed' && (
              <Button
                type="button"
                variant="secondary"
                data-size="sm"
                onClick={() => onCloseTicket(selectedTicket.id)}
                disabled={isMutating}
              >
                {t('support.closeTicket')}
              </Button>
            )}
          </div>
        </Card>

        {/* Messages */}
        <Card style={{ padding: 'var(--ds-spacing-4)' }}>
          <Heading level={3} data-size="sm" style={{ margin: 0, marginBottom: 'var(--ds-spacing-4)' }}>
            {t('support.conversation')}
          </Heading>

          <Stack gap="3">
            {/* Original description */}
            <div
              style={{
                padding: 'var(--ds-spacing-3)',
                backgroundColor: 'var(--ds-color-neutral-background-subtle)',
                borderRadius: 'var(--ds-border-radius-md)',
              }}
            >
              <Paragraph data-size="sm" style={{ margin: 0 }}>
                {selectedTicket.description}
              </Paragraph>
              <Paragraph data-size="xs" style={{ margin: 0, marginTop: 'var(--ds-spacing-2)', color: 'var(--ds-color-neutral-text-subtle)' }}>
                {formatDate(selectedTicket.createdAt)}
              </Paragraph>
            </div>

            {/* Messages */}
            {selectedTicket.messages.map((msg) => (
              <div
                key={msg.id}
                style={{
                  padding: 'var(--ds-spacing-3)',
                  backgroundColor: msg.isFromSupport
                    ? 'var(--ds-color-info-background-subtle)'
                    : 'var(--ds-color-neutral-background-subtle)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  marginLeft: msg.isFromSupport ? 0 : 'var(--ds-spacing-4)',
                  marginRight: msg.isFromSupport ? 'var(--ds-spacing-4)' : 0,
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)', marginBottom: 'var(--ds-spacing-2)' }}>
                  <UserIcon style={{ width: '14px', height: '14px' }} />
                  <Paragraph data-size="xs" style={{ margin: 0, fontWeight: 'var(--ds-font-weight-semibold)' }}>
                    {msg.author.name}
                    {msg.isFromSupport && (
                      <Badge data-size="xs" style={{ marginLeft: 'var(--ds-spacing-1)' }}>
                        {t('support.supportTeam')}
                      </Badge>
                    )}
                  </Paragraph>
                </div>
                <Paragraph data-size="sm" style={{ margin: 0 }}>
                  {msg.content}
                </Paragraph>
                <Paragraph data-size="xs" style={{ margin: 0, marginTop: 'var(--ds-spacing-2)', color: 'var(--ds-color-neutral-text-subtle)' }}>
                  {formatDate(msg.createdAt)}
                </Paragraph>
              </div>
            ))}
          </Stack>

          {/* Reply form */}
          {selectedTicket.status !== 'closed' && (
            <div style={{ marginTop: 'var(--ds-spacing-4)', display: 'flex', gap: 'var(--ds-spacing-2)' }}>
              <Textarea
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                placeholder={t('support.typeMessage')}
                rows={2}
                style={{ flex: 1 }}
              />
              <Button
                type="button"
                variant="primary"
                onClick={handleSendMessage}
                disabled={isMutating || !newMessage.trim()}
              >
                <SendIcon />
              </Button>
            </div>
          )}
        </Card>
      </Stack>
    );
  }

  // List view
  return (
    <Stack gap="6">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Heading level={2} data-size="lg" style={{ margin: 0 }}>
            {t('support.title')}
          </Heading>
          <Paragraph data-size="sm" style={{ margin: 0, marginTop: 'var(--ds-spacing-1)' }}>
            {t('support.description')}
          </Paragraph>
        </div>
        <Button
          type="button"
          variant="primary"
          data-size="md"
          onClick={() => setIsCreateDialogOpen(true)}
        >
          {t('support.createTicket')}
        </Button>
      </div>

      {/* Tickets List */}
      {!tickets?.data || tickets.data.length === 0 ? (
        <EmptyState
          icon={<MessageIcon size={48} />}
          title={t('support.noTickets')}
          description={t('support.noTicketsDesc')}
          action={{
            label: t('support.createFirst'),
            onClick: () => setIsCreateDialogOpen(true),
          }}
          bordered
        />
      ) : (
        <Card style={{ padding: 0, overflow: 'hidden' }}>
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>{t('support.ticketNumber')}</Table.HeaderCell>
                <Table.HeaderCell>{t('support.subject')}</Table.HeaderCell>
                <Table.HeaderCell>{t('support.category')}</Table.HeaderCell>
                <Table.HeaderCell>{t('label.status')}</Table.HeaderCell>
                <Table.HeaderCell>{t('support.lastUpdated')}</Table.HeaderCell>
                <Table.HeaderCell style={{ width: '100px' }}>{t('common.actions')}</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {tickets.data.map((ticket) => (
                <Table.Row
                  key={ticket.id}
                  data-testid={`ticket-${ticket.id}`}
                  onClick={() => onSelectTicket(ticket.id)}
                  style={{ cursor: 'pointer' }}
                >
                  <Table.Cell>
                    <span style={{ fontFamily: 'monospace' }}>#{ticket.ticketNumber}</span>
                  </Table.Cell>
                  <Table.Cell>
                    <span style={{ fontWeight: 'var(--ds-font-weight-medium)' }}>
                      {ticket.subject}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge data-size="sm">{t(`support.category.${ticket.category}`)}</Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <Badge data-color={STATUS_COLORS[ticket.status]} data-size="sm">
                      {t(`support.status.${ticket.status}`)}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-1)' }}>
                      <ClockIcon style={{ width: '14px', height: '14px' }} />
                      <span>{formatDate(ticket.updatedAt)}</span>
                    </div>
                  </Table.Cell>
                  <Table.Cell>
                    <Button
                      type="button"
                      variant="tertiary"
                      data-size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectTicket(ticket.id);
                      }}
                    >
                      {t('common.view')}
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card>
      )}

      {/* Create Ticket Dialog */}
      <Dialog
        open={isCreateDialogOpen}
        onClose={() => setIsCreateDialogOpen(false)}
        title={t('support.createTicket')}
      >
        <Stack gap="4">
          <Textfield
            label={t('support.subject')}
            value={newTicket.subject || ''}
            onChange={(e) => setNewTicket({ ...newTicket, subject: e.target.value })}
            required
          />

          <Textarea
            label={t('support.description')}
            value={newTicket.description || ''}
            onChange={(e) => setNewTicket({ ...newTicket, description: e.target.value })}
            rows={4}
            required
          />

          <Select
            label={t('support.category')}
            value={newTicket.category}
            onChange={(e) => setNewTicket({ ...newTicket, category: e.target.value as TicketCategory })}
          >
            <option value="booking">{t('support.category.booking')}</option>
            <option value="payment">{t('support.category.payment')}</option>
            <option value="technical">{t('support.category.technical')}</option>
            <option value="account">{t('support.category.account')}</option>
            <option value="other">{t('support.category.other')}</option>
          </Select>

          <Select
            label={t('support.priority')}
            value={newTicket.priority}
            onChange={(e) => setNewTicket({ ...newTicket, priority: e.target.value as TicketPriority })}
          >
            <option value="low">{t('support.priority.low')}</option>
            <option value="medium">{t('support.priority.medium')}</option>
            <option value="high">{t('support.priority.high')}</option>
            <option value="urgent">{t('support.priority.urgent')}</option>
          </Select>

          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', justifyContent: 'flex-end' }}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsCreateDialogOpen(false)}
              disabled={isMutating}
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleCreateSubmit}
              disabled={isMutating || !newTicket.subject || !newTicket.description}
            >
              {isMutating ? <Spinner data-size="sm" /> : t('action.create')}
            </Button>
          </div>
        </Stack>
      </Dialog>
    </Stack>
  );
}
