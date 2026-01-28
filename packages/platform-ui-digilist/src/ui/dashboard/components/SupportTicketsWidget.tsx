/**
 * SupportTicketsWidget (Container)
 *
 * Container widget that connects SDK hooks to SupportTicketWidget.
 * Follows thin-app pattern: routes pass minimal props, container handles data.
 */

import { useState, useCallback } from 'react';
import { useT } from '@xala-technologies/platform/i18n';
import { DashboardPageHeader } from '@xala-technologies/platform-ui';
import {
  useSupportTickets,
  useSupportTicket,
  useCreateSupportTicket,
  useAddTicketMessage,
  useCloseSupportTicket,
} from '@digilist/client-sdk';
import { SupportTicketWidget } from './SupportTicketWidget';

export interface SupportTicketsWidgetProps {
  /** Page title */
  title?: string;
  /** Page description */
  description?: string;
}

export function SupportTicketsWidget({
  title,
  description,
}: SupportTicketsWidgetProps) {
  const t = useT();
  const locale = 'nb'; // TODO: Get from i18n context
  const [selectedTicketId, setSelectedTicketId] = useState<string | null>(null);

  // SDK hooks
  const { data: tickets, isLoading } = useSupportTickets();
  const { data: selectedTicketData } = useSupportTicket(selectedTicketId ?? '');
  const createTicket = useCreateSupportTicket();
  const addMessage = useAddTicketMessage();
  const closeTicket = useCloseSupportTicket();

  // Handlers
  const handleCreateTicket = useCallback(
    async (data: Parameters<typeof createTicket.mutateAsync>[0]) => {
      await createTicket.mutateAsync(data);
    },
    [createTicket]
  );

  const handleAddMessage = useCallback(
    async (ticketId: string, data: Parameters<typeof addMessage.mutateAsync>[0]['data']) => {
      await addMessage.mutateAsync({ ticketId, data });
    },
    [addMessage]
  );

  const handleCloseTicket = useCallback(
    async (id: string) => {
      await closeTicket.mutateAsync(id);
    },
    [closeTicket]
  );

  const handleSelectTicket = useCallback((id: string | null) => {
    setSelectedTicketId(id);
  }, []);

  const isMutating =
    createTicket.isPending || addMessage.isPending || closeTicket.isPending;

  return (
    <>
      {(title || description) && (
        <DashboardPageHeader
          title={title ?? t('support.title')}
          subtitle={description ?? t('support.description')}
        />
      )}
      <SupportTicketWidget
        t={t}
        locale={locale}
        tickets={tickets}
        selectedTicket={selectedTicketData ?? null}
        isLoading={isLoading}
        onCreateTicket={handleCreateTicket}
        onAddMessage={handleAddMessage}
        onCloseTicket={handleCloseTicket}
        onSelectTicket={handleSelectTicket}
        isMutating={isMutating}
      />
    </>
  );
}
