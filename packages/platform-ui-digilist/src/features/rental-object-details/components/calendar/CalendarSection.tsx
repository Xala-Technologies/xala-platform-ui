/**
 * CalendarSection Component (Web App)
 *
 * Backward-compatible wrapper for the unified CalendarSection.
 * Configured for user selection mode with forceMode support.
 *
 * @deprecated Import from shared components instead
 */

import * as React from 'react';
import {
  CalendarSection as UnifiedCalendarSection,
} from '../../../shared/components/CalendarSection';
import type { CalendarSelection, CalendarMode } from '@xala-technologies/platform-ui/features/calendar';

export interface CalendarSectionProps {
  /** Rental object ID to fetch calendar data for */
  rentalObjectId: string;
  /** Optional booking type filter */
  bookingType?: string;
  /** Force a specific calendar mode (overrides API config) */
  forceMode?: CalendarMode;
  /** Callback when selection changes */
  onSelectionChange?: (selection: CalendarSelection) => void;
  /** Whether the calendar is read-only (view mode) */
  readOnly?: boolean;
  /** Custom class name */
  className?: string;
}

/**
 * @deprecated Use unified CalendarSection from shared components
 */
export function CalendarSection({
  rentalObjectId,
  bookingType,
  forceMode,
  onSelectionChange,
  readOnly = false,
  className,
}: CalendarSectionProps): React.ReactElement {
  return (
    <UnifiedCalendarSection
      rentalObjectId={rentalObjectId}
      bookingType={bookingType}
      mode="admin"  // Web uses admin hook (useRentalObjectCalendarConfig)
      forceMode={forceMode}
      readOnly={readOnly}
      onSelectionChange={onSelectionChange}
      showTips={false}
      title=""
      subtitle=""
      className={className}
    />
  );
}

export default CalendarSection;
