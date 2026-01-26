/**
 * CalendarSectionConnected Component
 *
 * SDK-connected wrapper that fetches calendar data and passes it to
 * the presentational CalendarSection component.
 *
 * This eliminates the need for thin wrappers in each app - apps simply use
 * this connected component directly.
 *
 * @module @xala-technologies/platform-ui/features/calendar
 */

/* eslint-disable no-restricted-imports -- Connected components bridge domain and UI packages */

import * as React from 'react';
import {
  CalendarSection,
  getDateRangeForMode,
  type CalendarSelection,
  type CalendarMode,
  type CalendarConfig,
} from './index';
import { useT } from '@xala-technologies/platform/i18n';
import {
  useCalendarConfig,
  useAvailabilityMatrix,
  useCalendarRealtime,
} from '@digilist/client-sdk/hooks';

export interface CalendarSectionConnectedProps {
  /** Rental object ID to fetch calendar data for */
  rentalObjectId: string;
  /** @deprecated Use rentalObjectId instead */
  listingId?: string;
  /** Optional booking type filter */
  bookingType?: string;
  /** Callback when selection changes */
  onSelectionChange?: (selection: CalendarSelection) => void;
  /** Whether the calendar is read-only (view mode) */
  readOnly?: boolean;
  /** Custom class name */
  className?: string;
  /** Optional title override */
  title?: string;
}

/**
 * SDK-connected CalendarSection component.
 *
 * Automatically fetches calendar configuration and availability matrix
 * from the API, subscribes to realtime updates, and renders the
 * presentational CalendarSection.
 *
 * @example
 * ```tsx
 * import { CalendarSectionConnected } from '@xala-technologies/platform-ui/features/calendar';
 *
 * function RentalObjectPage({ rentalObjectId }) {
 *   return (
 *     <CalendarSectionConnected
 *       rentalObjectId={rentalObjectId}
 *       onSelectionChange={(selection) => console.log(selection)}
 *     />
 *   );
 * }
 * ```
 */
export function CalendarSectionConnected({
  rentalObjectId,
  listingId: deprecatedListingId,
  bookingType,
  onSelectionChange,
  readOnly = false,
  className,
  title,
}: CalendarSectionConnectedProps): React.ReactElement {
  const t = useT();

  // Support both rentalObjectId (new) and listingId (backward compatibility)
  const effectiveRentalObjectId = rentalObjectId || deprecatedListingId || '';

  // Navigation state
  const [currentDate, setCurrentDate] = React.useState<Date>(new Date());

  // Warning message for realtime updates
  const [warningMessage, setWarningMessage] = React.useState<string | undefined>(undefined);

  // Fetch calendar configuration from API
  const {
    data: config,
    isLoading: isConfigLoading,
    error: configError,
  } = useCalendarConfig(effectiveRentalObjectId);

  // Determine calendar mode from config
  const calendarMode = (config?.granularity ?? 'TIME_SLOTS') as CalendarMode;

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
    effectiveRentalObjectId,
    {
      from: dateRange.from,
      to: dateRange.to,
      bookingType,
    },
    { enabled: !!config }
  );

  // Subscribe to realtime events for availability updates
  useCalendarRealtime((event) => {
    if (
      ('rentalObjectId' in event && event.rentalObjectId === effectiveRentalObjectId) ||
      ('listingId' in event && event.listingId === effectiveRentalObjectId)
    ) {
      setWarningMessage(t('components.calendar.selectionChanged'));
      setTimeout(() => setWarningMessage(undefined), 5000);
    }
  });

  // Build error message
  const errorMessage = React.useMemo(() => {
    if (configError) return t('components.calendar.couldNotLoadSettings');
    if (matrixError) return t('components.calendar.couldNotLoadAvailability');
    return undefined;
  }, [configError, matrixError, t]);

  return (
    <CalendarSection
      config={config as CalendarConfig | undefined}
      cells={matrixResponse?.data?.cells}
      legend={matrixResponse?.data?.legend}
      currentDate={currentDate}
      onDateChange={setCurrentDate}
      onSelectionChange={onSelectionChange}
      readOnly={readOnly}
      isLoading={isConfigLoading || isMatrixLoading}
      errorMessage={errorMessage}
      warningMessage={warningMessage}
      className={className}
      title={title}
    />
  );
}

export default CalendarSectionConnected;
