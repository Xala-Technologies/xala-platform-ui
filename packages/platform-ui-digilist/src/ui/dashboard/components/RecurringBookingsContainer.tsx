/**
 * RecurringBookingsContainer (GAP-005)
 *
 * Container widget that connects RecurringBookingWidget to SDK hooks.
 * Uses @xala-technologies/platform-ui components only.
 */

import { useState, useCallback } from 'react';
import { useT } from '@xala-technologies/platform/i18n';
import { DashboardPageHeader } from '@xala-technologies/platform-ui';
import {
  useRecurringBookingSeries,
  useRecurringBookingOccurrences,
  usePauseRecurringBooking,
  useResumeRecurringBooking,
  useCancelRecurringBooking,
  useSkipOccurrence,
} from '@digilist/client-sdk';
import { RecurringBookingWidget } from './RecurringBookingWidget';

export interface RecurringBookingsContainerProps {
  /** Page title */
  title?: string;
  /** Page description */
  description?: string;
  /** Handler for creating new recurring booking */
  onCreateNew?: () => void;
}

export function RecurringBookingsContainer({
  title,
  description,
  onCreateNew,
}: RecurringBookingsContainerProps) {
  const t = useT();
  const locale = 'nb';
  const [selectedSeriesId, setSelectedSeriesId] = useState<string | null>(null);

  // SDK hooks
  const { data: seriesData, isLoading } = useRecurringBookingSeries();
  const { data: occurrencesData, isLoading: isLoadingOccurrences } = useRecurringBookingOccurrences(
    selectedSeriesId ?? '',
    { enabled: !!selectedSeriesId }
  );

  const pauseSeries = usePauseRecurringBooking();
  const resumeSeries = useResumeRecurringBooking();
  const cancelSeries = useCancelRecurringBooking();
  const skipOccurrence = useSkipOccurrence();

  const handlePauseSeries = useCallback(
    async (id: string) => {
      await pauseSeries.mutateAsync(id);
    },
    [pauseSeries]
  );

  const handleResumeSeries = useCallback(
    async (id: string) => {
      await resumeSeries.mutateAsync(id);
    },
    [resumeSeries]
  );

  const handleCancelSeries = useCallback(
    async (id: string, cancelFutureOnly?: boolean) => {
      await cancelSeries.mutateAsync({ id, cancelFutureOnly });
    },
    [cancelSeries]
  );

  const handleSkipOccurrence = useCallback(
    async (seriesId: string, occurrenceId: string) => {
      await skipOccurrence.mutateAsync({ seriesId, occurrenceId });
    },
    [skipOccurrence]
  );

  return (
    <>
      {(title || description) && (
        <DashboardPageHeader
          title={title ?? t('recurring.title')}
          subtitle={description ?? t('recurring.description')}
        />
      )}

      <RecurringBookingWidget
        t={t}
        locale={locale}
        series={seriesData}
        selectedOccurrences={occurrencesData}
        selectedSeriesId={selectedSeriesId}
        isLoading={isLoading}
        isLoadingOccurrences={isLoadingOccurrences}
        onPauseSeries={handlePauseSeries}
        onResumeSeries={handleResumeSeries}
        onCancelSeries={handleCancelSeries}
        onSkipOccurrence={handleSkipOccurrence}
        onSelectSeries={setSelectedSeriesId}
        onCreateNew={onCreateNew}
      />
    </>
  );
}

export default RecurringBookingsContainer;
