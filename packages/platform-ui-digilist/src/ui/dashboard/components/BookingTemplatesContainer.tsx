/**
 * BookingTemplatesContainer (Container)
 *
 * Container widget that connects SDK hooks to BookingTemplatesWidget.
 * Follows thin-app pattern: routes pass minimal props, container handles data.
 */

import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useT } from '@xala-technologies/platform/i18n';
import { DashboardPageHeader } from '@xala-technologies/platform-ui';
import {
  useBookingTemplates,
  useCreateBookingTemplate,
  useUpdateBookingTemplate,
  useDeleteBookingTemplate,
  useRentalObjects,
} from '@digilist/client-sdk';
import { BookingTemplatesWidget } from './BookingTemplatesWidget';

export interface BookingTemplatesContainerProps {
  /** Page title */
  title?: string;
  /** Page description */
  description?: string;
}

export function BookingTemplatesContainer({
  title,
  description,
}: BookingTemplatesContainerProps) {
  const t = useT();
  const navigate = useNavigate();

  // SDK hooks
  const { data: templates, isLoading } = useBookingTemplates();
  const { data: rentalObjectsData } = useRentalObjects();
  const createTemplate = useCreateBookingTemplate();
  const updateTemplate = useUpdateBookingTemplate();
  const deleteTemplate = useDeleteBookingTemplate();

  // Transform rental objects for select
  const rentalObjects = rentalObjectsData?.data?.map((ro) => ({
    id: ro.id,
    name: ro.name,
  }));

  // Handlers
  const handleCreateTemplate = useCallback(
    async (data: Parameters<typeof createTemplate.mutateAsync>[0]) => {
      await createTemplate.mutateAsync(data);
    },
    [createTemplate]
  );

  const handleUpdateTemplate = useCallback(
    async (id: string, data: Parameters<typeof updateTemplate.mutateAsync>[0]['data']) => {
      await updateTemplate.mutateAsync({ id, data });
    },
    [updateTemplate]
  );

  const handleDeleteTemplate = useCallback(
    async (id: string) => {
      await deleteTemplate.mutateAsync(id);
    },
    [deleteTemplate]
  );

  const handleUseTemplate = useCallback(
    (templateId: string) => {
      // Navigate to booking flow with template pre-filled
      navigate(`/bookings/new?templateId=${templateId}`);
    },
    [navigate]
  );

  const isMutating =
    createTemplate.isPending || updateTemplate.isPending || deleteTemplate.isPending;

  return (
    <>
      {(title || description) && (
        <DashboardPageHeader
          title={title ?? t('templates.title')}
          subtitle={description ?? t('templates.description')}
        />
      )}
      <BookingTemplatesWidget
        t={t}
        templates={templates}
        rentalObjects={rentalObjects}
        isLoading={isLoading}
        onCreateTemplate={handleCreateTemplate}
        onUpdateTemplate={handleUpdateTemplate}
        onDeleteTemplate={handleDeleteTemplate}
        onUseTemplate={handleUseTemplate}
        isMutating={isMutating}
      />
    </>
  );
}

// Re-export with expected name for routes
export { BookingTemplatesContainer as BookingTemplatesWidgetContainer };
