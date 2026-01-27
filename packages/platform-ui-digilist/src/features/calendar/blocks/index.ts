/**
 * @xala-technologies/platform-ui-digilist - Calendar Blocks
 *
 * Shared calendar utilities, types, and helper functions.
 * These are used by CalendarSection controllers in apps.
 *
 * ## Architecture
 *
 * The calendar architecture follows a controller-presenter pattern:
 *
 * ```
 * APP LAYER (CalendarSection Controller)
 * ├── Uses SDK hooks (useCalendarConfig, useAvailabilityMatrix)
 * ├── Manages state (currentDate, selection)
 * └── Passes data to...
 *
 * UI LAYER (RentalObjectAvailabilityCalendar Presenter)
 * ├── Receives data as props
 * ├── Renders calendar UI
 * └── Emits callbacks (onDateChange, onCellClick, onSelectionChange)
 * ```
 *
 * ## Usage
 *
 * ```tsx
 * import {
 *   // Utility functions
 *   formatDateToISO,
 *   getWeekStart,
 *   getWeekEnd,
 *   getMonthStart,
 *   getMonthEnd,
 *   mapToCalendarCell,
 * } from '@xala-technologies/platform-ui-digilist/features/calendar';
 *
 * // For calendar types (CalendarMode, CalendarCell, etc.), import from core:
 * import { CalendarMode, CalendarCell } from '@xala-technologies/platform-ui-core';
 * ```
 */

// =============================================================================
// Re-export Calendar Components
// =============================================================================

export {
  RentalObjectAvailabilityCalendar,
  type RentalObjectAvailabilityCalendarProps,
} from '@xala-technologies/platform-ui-core';

// =============================================================================
// Local Calendar Type Definitions (matching core types)
// =============================================================================

/**
 * Calendar display and selection mode
 */
export type CalendarMode = 'TIME_SLOTS' | 'ALL_DAY' | 'MULTI_DAY';

/**
 * Availability status for calendar slots
 */
export type CalendarSlotStatus =
  | 'AVAILABLE'
  | 'RESERVED'
  | 'BOOKED'
  | 'BLOCKED'
  | 'BLACKOUT'
  | 'CLOSED';

/**
 * Single cell in the availability calendar
 */
export interface CalendarCell {
  id: string;
  start: string;
  end: string;
  status: CalendarSlotStatus;
  reasonKey?: string | null;
  bookingId?: string | null;
  blockId?: string | null;
  lockedUntil?: string | null;
}

/**
 * Selected time range for booking
 */
export interface CalendarSelectionRange {
  startDate: string;
  endDate: string;
  startTime?: string;
  endTime?: string;
}

/**
 * Current calendar selection state
 */
export interface CalendarSelection {
  cells: CalendarCell[];
  range?: CalendarSelectionRange;
  isValid: boolean;
  errorKey?: string;
}

/**
 * Legend item for slot status display
 */
export interface CalendarLegendItem {
  status: CalendarSlotStatus;
  labelKey: string;
  label: string;
}

// =============================================================================
// Calendar Constants
// =============================================================================

export const CALENDAR_SLOT_STATUS_LABELS: Record<CalendarSlotStatus, string> = {
  AVAILABLE: 'Ledig',
  RESERVED: 'Reservert',
  BOOKED: 'Booket',
  BLOCKED: 'Blokkert',
  BLACKOUT: 'Utilgjengelig',
  CLOSED: 'Stengt',
};

export const CALENDAR_SLOT_STATUS_KEYS: Record<CalendarSlotStatus, string> = {
  AVAILABLE: 'calendar.slot.available',
  RESERVED: 'calendar.slot.reserved',
  BOOKED: 'calendar.slot.booked',
  BLOCKED: 'calendar.slot.blocked',
  BLACKOUT: 'calendar.slot.blackout',
  CLOSED: 'calendar.slot.closed',
};

export const CALENDAR_MODE_LABELS: Record<CalendarMode, string> = {
  TIME_SLOTS: 'Tidsluke',
  ALL_DAY: 'Heldag',
  MULTI_DAY: 'Flere dager',
};

export const DEFAULT_CALENDAR_LEGEND: CalendarLegendItem[] = [
  { status: 'AVAILABLE', labelKey: 'calendar.slot.available', label: 'Ledig' },
  { status: 'RESERVED', labelKey: 'calendar.slot.reserved', label: 'Reservert' },
  { status: 'BOOKED', labelKey: 'calendar.slot.booked', label: 'Booket' },
  { status: 'BLOCKED', labelKey: 'calendar.slot.blocked', label: 'Blokkert' },
  { status: 'BLACKOUT', labelKey: 'calendar.slot.blackout', label: 'Utilgjengelig' },
  { status: 'CLOSED', labelKey: 'calendar.slot.closed', label: 'Stengt' },
];

// =============================================================================
// Calendar Utility Functions
// =============================================================================

export function isCalendarSlotSelectable(status: CalendarSlotStatus): boolean {
  return status === 'AVAILABLE';
}

export function getCalendarSlotLabel(status: CalendarSlotStatus): string {
  return CALENDAR_SLOT_STATUS_LABELS[status] ?? status;
}

export function getCalendarSlotKey(status: CalendarSlotStatus): string {
  return CALENDAR_SLOT_STATUS_KEYS[status] ?? `calendar.slot.${status.toLowerCase()}`;
}

/**
 * Format date to ISO date string (YYYY-MM-DD).
 */
export function formatDateToISO(date: Date): string {
  return date.toISOString().split('T')[0]!;
}

/**
 * Get week start date (Monday).
 */
export function getWeekStart(date: Date): Date {
  const d = new Date(date);
  const day = d.getDay();
  const diff = d.getDate() - day + (day === 0 ? -6 : 1);
  d.setDate(diff);
  d.setHours(0, 0, 0, 0);
  return d;
}

/**
 * Get week end date (Sunday).
 */
export function getWeekEnd(date: Date): Date {
  const weekStart = getWeekStart(date);
  const weekEnd = new Date(weekStart);
  weekEnd.setDate(weekEnd.getDate() + 6);
  return weekEnd;
}

/**
 * Get month start date.
 */
export function getMonthStart(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

/**
 * Get month end date.
 */
export function getMonthEnd(date: Date): Date {
  return new Date(date.getFullYear(), date.getMonth() + 1, 0);
}

/**
 * Calculate date range based on calendar mode.
 */
export function getDateRangeForMode(
  mode: CalendarMode,
  currentDate: Date
): { from: string; to: string } {
  if (mode === 'TIME_SLOTS') {
    const from = getWeekStart(currentDate);
    const to = getWeekEnd(currentDate);
    return { from: formatDateToISO(from), to: formatDateToISO(to) };
  } else {
    const from = getMonthStart(currentDate);
    const to = getMonthEnd(currentDate);
    return { from: formatDateToISO(from), to: formatDateToISO(to) };
  }
}

/**
 * Map SDK AvailabilityCellDTO to CalendarCell.
 */
export function mapToCalendarCell(cell: {
  start: string;
  end: string;
  status: string;
  reasonKey?: string | null;
  bookingId?: string | null;
  blockId?: string | null;
  lockedUntil?: string | null;
}): CalendarCell {
  return {
    id: `${cell.start}-${cell.end}`,
    start: cell.start,
    end: cell.end,
    status: cell.status as CalendarSlotStatus,
    reasonKey: cell.reasonKey ?? undefined,
    bookingId: cell.bookingId ?? undefined,
    blockId: cell.blockId ?? undefined,
    lockedUntil: cell.lockedUntil ?? undefined,
  };
}

/**
 * Build calendar legend from API response or use defaults.
 */
export function buildCalendarLegend(
  apiLegend?: Array<{ status: string; labelKey: string }>,
  t?: (key: string) => string
): Array<{ status: string; label: string }> {
  if (apiLegend) {
    return apiLegend.map((item) => ({
      status: item.status,
      label: item.labelKey.includes('.') ? item.labelKey.split('.').pop()! : item.labelKey,
    }));
  }

  const fallbackLegend = [
    { status: 'AVAILABLE', label: t?.('components.calendar.statusAvailable') ?? 'Ledig' },
    { status: 'RESERVED', label: t?.('components.calendar.statusReserved') ?? 'Reservert' },
    { status: 'BOOKED', label: t?.('components.calendar.statusBooked') ?? 'Booket' },
    { status: 'BLOCKED', label: t?.('components.calendar.statusBlocked') ?? 'Blokkert' },
    { status: 'BLACKOUT', label: t?.('components.calendar.statusBlackout') ?? 'Utilgjengelig' },
    { status: 'CLOSED', label: t?.('components.calendar.statusClosed') ?? 'Stengt' },
  ];

  return fallbackLegend;
}

/**
 * Get subtitle text based on calendar mode.
 */
export function getCalendarSubtitle(
  mode: CalendarMode,
  t?: (key: string) => string
): string {
  const subtitles: Record<string, string> = {
    TIME_SLOTS: t?.('components.calendar.selectTimeSlots') ?? 'Velg tidspunkt',
    ALL_DAY: t?.('components.calendar.selectDays') ?? 'Velg dag(er)',
    MULTI_DAY: t?.('components.calendar.selectPeriod') ?? 'Velg periode',
  };
  return subtitles[mode] ?? subtitles.TIME_SLOTS;
}

// =============================================================================
// CalendarSection Props Type (for app controllers)
// =============================================================================

/**
 * Standard props for CalendarSection controller components.
 */
export interface CalendarSectionControllerProps {
  rentalObjectId: string;
  /** @deprecated Use rentalObjectId instead */
  listingId?: string;
  bookingType?: string;
  mode?: 'view' | 'interactive';
  onSelectionChange?: (selection: CalendarSelection) => void;
  readOnly?: boolean;
  title?: string;
  subtitle?: string;
  forceMode?: CalendarMode;
  className?: string;
}
