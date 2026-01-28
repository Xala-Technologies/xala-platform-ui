/**
 * Unified CalendarSection Component
 *
 * Consolidated wrapper that connects SDK hooks to the unified CalendarSection
 * from @xala-technologies/platform-ui/features/calendar.
 *
 * Replaces the 4 separate implementations in:
 * - features/backoffice/components/CalendarSection.tsx
 * - features/dashboard/components/CalendarSection.tsx
 * - features/monitoring/components/CalendarSection.tsx
 * - features/web/rental-object-details/components/CalendarSection.tsx
 *
 * @example
 * // Backoffice (admin view-only mode)
 * <CalendarSection
 *   rentalObjectId="123"
 *   mode="admin"
 *   readOnly={true}
 *   title="Availability"
 * />
 *
 * @example
 * // Web/Dashboard (user selection mode)
 * <CalendarSection
 *   rentalObjectId="123"
 *   mode="user"
 *   onSelectionChange={(selection) => handleSelection(selection)}
 * />
 */

import * as React from 'react';
import {
  CalendarSection as CalendarSectionUI,
  getDateRangeForMode,
  type CalendarSelection,
  type CalendarMode,
} from '@xala-technologies/platform-ui/features/calendar';
import { useT } from '@xala-technologies/platform/runtime';
import {
  useRentalObjectCalendarConfig,
  useCalendarConfig,
  useAvailabilityMatrix,
  useCalendarRealtime,
} from '@digilist/client-sdk/hooks';

/**
 * Mode determines which SDK hook and behavior to use
 * - 'admin': Uses useRentalObjectCalendarConfig, for backoffice/monitoring
 * - 'user': Uses useCalendarConfig, for dashboard/web public views
 */
export type CalendarSectionMode = 'admin' | 'user';

export interface CalendarSectionProps {
  /** Rental object ID to fetch calendar data for */
  rentalObjectId: string;
  /** @deprecated Use rentalObjectId instead */
  listingId?: string;
  /** Optional booking type filter */
  bookingType?: string;
  /** Mode determines SDK hook selection: 'admin' for backoffice, 'user' for public */
  mode?: CalendarSectionMode;
  /** Force a specific calendar mode (overrides API config) */
  forceMode?: CalendarMode;
  /** Callback when selection changes */
  onSelectionChange?: (selection: CalendarSelection) => void;
  /** Whether the calendar is read-only (view mode). Defaults to true for admin, false for user */
  readOnly?: boolean;
  /** Custom title for the calendar section (admin mode only) */
  title?: string;
  /** Custom subtitle for the calendar section (admin mode only) */
  subtitle?: string;
  /** Whether to show calendar tips. Defaults to true for admin, false for user/web */
  showTips?: boolean;
  /** Custom class name */
  className?: string;
}

export function CalendarSection({
  rentalObjectId,
  listingId: deprecatedListingId,
  bookingType,
  mode = 'user',
  forceMode,
  onSelectionChange,
  readOnly,
  title,
  subtitle,
  showTips,
  className,
}: CalendarSectionProps): React.ReactElement {
  const t = useT();

  // Support both rentalObjectId (new) and listingId (backward compatibility)
  const effectiveId = rentalObjectId || deprecatedListingId || '';

  // Determine defaults based on mode
  const effectiveReadOnly = readOnly ?? (mode === 'admin');
  const effectiveShowTips = showTips ?? (mode === 'admin');

  // Navigation state
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());

  // Warning message for realtime updates
  const [warningMessage, setWarningMessage] = React.useState<string | undefined>(undefined);

  // Fetch calendar configuration from API - hook selection based on mode
  const adminConfigQuery = useRentalObjectCalendarConfig(
    effectiveId,
    bookingType ? { bookingType } : undefined,
    { enabled: mode === 'admin' }
  );

  const userConfigQuery = useCalendarConfig(effectiveId, {
    enabled: mode === 'user',
  });

  // Select the appropriate query result based on mode
  const configQuery = mode === 'admin' ? adminConfigQuery : userConfigQuery;

  // Extract config - admin mode has nested .data, user mode is direct
  const config = mode === 'admin'
    ? (configQuery.data as { data?: unknown })?.data
    : configQuery.data;

  const isConfigLoading = configQuery.isLoading;
  const configError = configQuery.error;

  // Determine calendar mode: forceMode > config.granularity > default
  const calendarMode: CalendarMode = forceMode ?? (config as { granularity?: CalendarMode })?.granularity ?? 'TIME_SLOTS';

  // Calculate date range based on mode
  const dateRange = React.useMemo(
    () => getDateRangeForMode(calendarMode, currentDate),
    [calendarMode, currentDate]
  );

  // Fetch availability matrix from API
  const {
    data: matrixResponse,
    isLoading: isMatrixLoading,
    error: matrixError,
  } = useAvailabilityMatrix(
    effectiveId,
    {
      from: dateRange.from,
      to: dateRange.to,
      bookingType,
    },
    { enabled: !!config }
  );

  // Subscribe to realtime events for availability updates
  useCalendarRealtime((event) => {
    const matchesRentalObjectId = 'rentalObjectId' in event && event.rentalObjectId === effectiveId;
    const matchesListingId = 'listingId' in event && event.listingId === effectiveId;

    if (matchesRentalObjectId || matchesListingId) {
      const messageKey = mode === 'admin'
        ? 'components.calendar.dataUpdated'
        : 'components.calendar.selectionChanged';
      setWarningMessage(t(messageKey));
      setTimeout(() => setWarningMessage(undefined), 5000);
    }
  });

  // Build error message
  const errorMessage = React.useMemo(() => {
    if (configError) return t('components.calendar.couldNotLoadSettings');
    if (matrixError) return t('components.calendar.couldNotLoadAvailability');
    return undefined;
  }, [configError, matrixError, t]);

  // Default titles based on mode (admin only)
  const defaultTitle = mode === 'admin' ? t('components.calendar.availability') : '';
  const defaultSubtitle = React.useMemo(() => {
    if (mode !== 'admin') return '';
    switch (calendarMode) {
      case 'TIME_SLOTS':
        return t('components.calendar.overviewTimeSlots');
      case 'ALL_DAY':
        return t('components.calendar.overviewDays');
      case 'MULTI_DAY':
        return t('components.calendar.overviewPeriods');
      default:
        return t('components.calendar.overviewAvailability');
    }
  }, [calendarMode, mode, t]);

  return (
    <CalendarSectionUI
      config={config}
      cells={matrixResponse?.data?.cells}
      legend={matrixResponse?.data?.legend}
      forceMode={forceMode}
      currentDate={currentDate}
      onDateChange={setCurrentDate}
      onSelectionChange={onSelectionChange}
      readOnly={effectiveReadOnly}
      isLoading={isConfigLoading || isMatrixLoading}
      errorMessage={errorMessage}
      warningMessage={warningMessage}
      showTips={effectiveShowTips}
      title={title ?? defaultTitle}
      subtitle={subtitle ?? defaultSubtitle}
      className={className}
    />
  );
}

export default CalendarSection;
