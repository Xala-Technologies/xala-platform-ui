/**
 * AdminSupportTicketsWidget (GAP-009)
 *
 * Admin widget for managing all support tickets.
 * Uses @xala-technologies/platform-ui components only.
 */

import { useState, useCallback } from 'react';
import { useT } from '@xala-technologies/platform/runtime';
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
  Textarea,
  Select,
  Stack,
  Tabs,
  useDialog,
  DashboardPageHeader,
  StatCard,
  ListToolbar,
  type ListToolbarFilter,
  MessageIcon,
  ClockIcon,
  UserIcon,
  SendIcon,
  CheckIcon,
} from '@xala-technologies/platform-ui';
import {
  useAdminTicketQueue,
  useSupportTicket,
  useAdminReplyToTicket,
  useAssignTicket,
  useCloseSupportTicket,
  useUpdateTicketStatus,
  type SupportTicket,
  type TicketStatus,
  type TicketPriority,
} from '@digilist/client-sdk';

export interface AdminSupportTicketsWidgetProps {
  /** Page title */
  title?: string;
  /** Page description */
  description?: string;
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

export function AdminSupportTicketsWidget({
  title,
  description,
}: AdminSupportTicketsWidgetProps) {
  const t = useT();
  const locale = 'nb';
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);
  const [statusFilter, setStatusFilter] = useState<TicketStatus | undefined>(undefined);
  const [newMessage, setNewMessage] = useState('');
  const [isAssignDialogOpen, setIsAssignDialogOpen] = useState(false);
  const [selectedAgentId, setSelectedAgentId] = useState('');
  const { confirm } = useDialog();

  // SDK hooks
  const { data: tickets, isLoading } = useAdminTicketQueue({ status: statusFilter });
  const { data: selectedTicket } = useSupportTicket(selectedTicketId ?? '');
  const replyToTicket = useAdminReplyToTicket();
  const assignTicket = useAssignTicket();
  const closeTicket = useCloseSupportTicket();
  const updateStatus = useUpdateTicketStatus();

  // Calculate stats
  const stats = {
    total: tickets?.data?.length ?? 0,
    open: tickets?.data?.filter((t) => t.status === 'open').length ?? 0,
    inProgress: tickets?.data?.filter((t) => t.status === 'in_progress').length ?? 0,
    urgent: tickets?.data?.filter((t) => t.priority === 'urgent').length ?? 0,
  };

  const handleSendMessage = useCallback(async () => {
    if (!selectedTicketId || !newMessage.trim()) return;
    await replyToTicket.mutateAsync({
      ticketId: selectedTicketId,
      data: { content: newMessage },
    });
    setNewMessage('');
  }, [selectedTicketId, newMessage, replyToTicket]);

  const handleAssign = useCallback(async () => {
    if (!selectedTicketId || !selectedAgentId) return;
    await assignTicket.mutateAsync({
      ticketId: selectedTicketId,
      agentId: selectedAgentId,
    });
    setIsAssignDialogOpen(false);
    setSelectedAgentId('');
  }, [selectedTicketId, selectedAgentId, assignTicket]);

  const handleStatusChange = useCallback(
    async (ticketId: string, newStatus: TicketStatus) => {
      await updateStatus.mutateAsync({ ticketId, status: newStatus });
    },
    [updateStatus]
  );

  const handleClose = useCallback(
    async (ticketId: string) => {
      const confirmed = await confirm({
        title: t('support.admin.closeTitle'),
        description: t('support.admin.closeConfirm'),
        confirmText: t('support.closeTicket'),
        cancelText: t('common.cancel'),
      });
      if (confirmed) {
        await closeTicket.mutateAsync(ticketId);
        setSelectedTicketId(null);
      }
    },
    [confirm, t, closeTicket]
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(locale === 'en' ? 'en-US' : 'nb-NO', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const isMutating =
    replyToTicket.isPending || assignTicket.isPending || closeTicket.isPending || updateStatus.isPending;

  // Filter configuration
  const statusFilters: ListToolbarFilter[] = [
    {
      id: 'status',
      label: t('label.status'),
      options: [
        { id: 'all', label: t('common.all'), count: stats.total },
        { id: 'open', label: t('support.status.open'), count: stats.open },
        { id: 'in_progress', label: t('support.status.in_progress'), count: stats.inProgress },
        { id: 'waiting_on_customer', label: t('support.status.waiting_on_customer') },
        { id: 'resolved', label: t('support.status.resolved') },
        { id: 'closed', label: t('support.status.closed') },
      ],
    },
  ];

  const handleFilterChange = useCallback((filterId: string, value: string | undefined) => {
    if (filterId === 'status') {
      setStatusFilter(value === 'all' || !value ? undefined : (value as TicketStatus));
    }
  }, []);

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--ds-spacing-8)' }}>
        <Spinner aria-label={t('state.loading')} data-size="lg" />
      </div>
    );
  }

  // Detail view
  if (selectedTicket) {
    return (
      <>
        <DashboardPageHeader
          title={`#${selectedTicket.ticketNumber}`}
          subtitle={selectedTicket.subject}
        />
        <Stack gap="4">
          {/* Back button */}
          <Button type="button" variant="tertiary" data-size="sm" onClick={() => setSelectedTicketId(null)}>
            ← {t('common.back')}
          </Button>

          {/* Ticket header */}
          <Card style={{ padding: 'var(--ds-spacing-4)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
              <div>
                <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', marginBottom: 'var(--ds-spacing-2)' }}>
                  <Badge data-color={STATUS_COLORS[selectedTicket.status]} data-size="sm">
                    {t(`support.status.${selectedTicket.status}`)}
                  </Badge>
                  <Badge data-color={PRIORITY_COLORS[selectedTicket.priority]} data-size="sm">
                    {t(`support.priority.${selectedTicket.priority}`)}
                  </Badge>
                  <Badge data-size="sm">{t(`support.category.${selectedTicket.category}`)}</Badge>
                </div>
                <Paragraph data-size="sm" style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}>
                  {t('support.admin.createdBy')}: {selectedTicket.createdBy?.name || t('common.unknown')}
                </Paragraph>
                {selectedTicket.assignedTo && (
                  <Paragraph data-size="sm" style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}>
                    {t('support.admin.assignedTo')}: {selectedTicket.assignedTo.name}
                  </Paragraph>
                )}
              </div>
              <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
                <Select
                  value={selectedTicket.status}
                  onChange={(e) => handleStatusChange(selectedTicket.id, e.target.value as TicketStatus)}
                  data-size="sm"
                >
                  <option value="open">{t('support.status.open')}</option>
                  <option value="in_progress">{t('support.status.in_progress')}</option>
                  <option value="waiting_on_customer">{t('support.status.waiting_on_customer')}</option>
                  <option value="resolved">{t('support.status.resolved')}</option>
                </Select>
                <Button
                  type="button"
                  variant="secondary"
                  data-size="sm"
                  onClick={() => setIsAssignDialogOpen(true)}
                >
                  {t('support.admin.assign')}
                </Button>
                <Button
                  type="button"
                  variant="secondary"
                  data-size="sm"
                  onClick={() => handleClose(selectedTicket.id)}
                  disabled={isMutating}
                >
                  {t('support.closeTicket')}
                </Button>
              </div>
            </div>
          </Card>

          {/* Conversation */}
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
                <Paragraph data-size="sm" style={{ margin: 0 }}>{selectedTicket.description}</Paragraph>
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
                      {msg.isFromSupport && <Badge data-size="xs" style={{ marginLeft: 'var(--ds-spacing-1)' }}>{t('support.supportTeam')}</Badge>}
                    </Paragraph>
                  </div>
                  <Paragraph data-size="sm" style={{ margin: 0 }}>{msg.content}</Paragraph>
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
                <Button type="button" variant="primary" onClick={handleSendMessage} disabled={isMutating || !newMessage.trim()}>
                  <SendIcon />
                </Button>
              </div>
            )}
          </Card>
        </Stack>

        {/* Assign Dialog */}
        <Dialog open={isAssignDialogOpen} onClose={() => setIsAssignDialogOpen(false)} title={t('support.admin.assignTicket')}>
          <Stack gap="4">
            <Select
              label={t('support.admin.selectAgent')}
              value={selectedAgentId}
              onChange={(e) => setSelectedAgentId(e.target.value)}
            >
              <option value="">{t('support.admin.selectAgentPlaceholder')}</option>
              {/* TODO: Load agents from API */}
              <option value="agent-1">Support Agent 1</option>
              <option value="agent-2">Support Agent 2</option>
            </Select>
            <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', justifyContent: 'flex-end' }}>
              <Button type="button" variant="secondary" onClick={() => setIsAssignDialogOpen(false)}>{t('common.cancel')}</Button>
              <Button type="button" variant="primary" onClick={handleAssign} disabled={!selectedAgentId || isMutating}>
                {isMutating ? <Spinner data-size="sm" /> : t('support.admin.assign')}
              </Button>
            </div>
          </Stack>
        </Dialog>
      </>
    );
  }

  // List view
  return (
    <>
      {(title || description) && (
        <DashboardPageHeader
          title={title ?? t('support.admin.title')}
          subtitle={description ?? t('support.admin.description')}
        />
      )}

      <Stack gap="6">
        {/* Stats */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 'var(--ds-spacing-4)' }}>
          <StatCard title={t('common.total')} value={stats.total} />
          <StatCard title={t('support.status.open')} value={stats.open} color="var(--ds-color-warning-text-default)" />
          <StatCard title={t('support.status.in_progress')} value={stats.inProgress} color="var(--ds-color-info-text-default)" />
          <StatCard title={t('support.priority.urgent')} value={stats.urgent} color="var(--ds-color-danger-text-default)" />
        </div>

        {/* Filters */}
        <ListToolbar
          filters={statusFilters}
          activeFilters={{ status: statusFilter ?? 'all' }}
          onFilterChange={handleFilterChange}
          resultsCount={tickets?.data?.length ?? 0}
          resultsLabel={t('support.tickets')}
          variant="compact"
        />

        {/* Tickets Table */}
        {!tickets?.data || tickets.data.length === 0 ? (
          <EmptyState icon={<MessageIcon size={48} />} title={t('support.admin.noTickets')} description={t('support.admin.noTicketsDesc')} bordered />
        ) : (
          <Card style={{ padding: 0, overflow: 'hidden' }}>
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell>{t('support.ticketNumber')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('support.subject')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('support.category')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('support.priority')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('label.status')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('support.admin.assignedTo')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('support.lastUpdated')}</Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {tickets.data.map((ticket) => (
                  <Table.Row key={ticket.id} onClick={() => setSelectedTicketId(ticket.id)} style={{ cursor: 'pointer' }}>
                    <Table.Cell><span style={{ fontFamily: 'monospace' }}>#{ticket.ticketNumber}</span></Table.Cell>
                    <Table.Cell><span style={{ fontWeight: 'var(--ds-font-weight-medium)' }}>{ticket.subject}</span></Table.Cell>
                    <Table.Cell><Badge data-size="sm">{t(`support.category.${ticket.category}`)}</Badge></Table.Cell>
                    <Table.Cell><Badge data-color={PRIORITY_COLORS[ticket.priority]} data-size="sm">{t(`support.priority.${ticket.priority}`)}</Badge></Table.Cell>
                    <Table.Cell><Badge data-color={STATUS_COLORS[ticket.status]} data-size="sm">{t(`support.status.${ticket.status}`)}</Badge></Table.Cell>
                    <Table.Cell>{ticket.assignedTo?.name || '-'}</Table.Cell>
                    <Table.Cell>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-1)' }}>
                        <ClockIcon style={{ width: '14px', height: '14px' }} />
                        <span>{formatDate(ticket.updatedAt)}</span>
                      </div>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </Card>
        )}
      </Stack>
    </>
  );
}
