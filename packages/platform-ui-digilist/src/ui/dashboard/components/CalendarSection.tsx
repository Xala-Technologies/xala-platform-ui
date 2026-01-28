/**
 * CalendarSection Component (Dashboard App)
 *
 * Backward-compatible wrapper for the unified CalendarSection.
 * Configured for user selection mode.
 *
 * @deprecated Import from '@xala-technologies/platform-ui-digilist/ui/shared' instead
 */

import * as React from 'react';
import {
  CalendarSection as UnifiedCalendarSection,
} from '../../shared/components/CalendarSection';
import type { CalendarSelection } from '@xala-technologies/platform-ui/features/calendar';

export interface CalendarSectionProps {
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
}

/**
 * @deprecated Use unified CalendarSection from '@xala-technologies/platform-ui-digilist/ui/shared'
 */
export function CalendarSection({
  rentalObjectId,
  listingId,
  bookingType,
  onSelectionChange,
  readOnly = false,
  className,
}: CalendarSectionProps): React.ReactElement {
  return (
    <UnifiedCalendarSection
      rentalObjectId={rentalObjectId || listingId || ''}
      bookingType={bookingType}
      mode="user"
      readOnly={readOnly}
      onSelectionChange={onSelectionChange}
      className={className}
    />
  );
}

export default CalendarSection;
