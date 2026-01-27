/**
 * @digilist/ui - Calendar Feature Kit
 *
 * Unified calendar feature for availability display and admin management.
 * Includes citizen-facing availability calendar and admin timeline/event management.
 *
 * ## Architecture
 *
 * The CalendarSection is a PRESENTATIONAL component - it does not contain SDK hooks.
 * Apps should provide thin wrappers that connect SDK data.
 *
 * ```
 * APP LAYER (Thin Wrapper - ~20 lines)
 * ├── Uses SDK hooks (useCalendarConfig, useAvailabilityMatrix)
 * ├── Subscribes to realtime events (useCalendarRealtime)
 * └── Passes data to CalendarSection
 *
 * UI LAYER (CalendarSection - this package)
 * ├── Receives all data as props
 * ├── Handles selection logic
 * ├── Renders RentalObjectAvailabilityCalendar
 * └── Emits callbacks (onDateChange, onSelectionChange)
 * ```
 *
 * ## Usage
 *
 * ### Pattern 1: Simple Wrapper (Recommended)
 *
 * ```tsx
 * // apps/dashboard/src/components/CalendarSection.tsx
 * import { CalendarSection, getDateRangeForMode } from '@xala-technologies/platform-ui/features/calendar';
 * import { useCalendarConfig, useAvailabilityMatrix, useCalendarRealtime } from '@digilist/client-sdk/hooks';
 *
 * export function DashboardCalendar({ rentalObjectId, onSelectionChange, readOnly }) {
 *   const [currentDate, setCurrentDate] = React.useState(new Date());
 *   const [warningMessage, setWarningMessage] = React.useState();
 *
 *   const { data: config, isLoading: configLoading, error: configError } = useCalendarConfig(rentalObjectId);
 *   const dateRange = getDateRangeForMode(config?.granularity ?? 'TIME_SLOTS', currentDate);
 *   const { data: matrix, isLoading: matrixLoading, error: matrixError } = useAvailabilityMatrix(
 *     rentalObjectId,
 *     dateRange,
 *     { enabled: !!config }
 *   );
 *
 *   useCalendarRealtime((event) => {
 *     if (event.rentalObjectId === rentalObjectId) {
 *       setWarningMessage('Availability has been updated');
 *       setTimeout(() => setWarningMessage(undefined), 5000);
 *     }
 *   });
 *
 *   return (
 *     <CalendarSection
 *       config={config}
 *       cells={matrix?.cells}
 *       legend={matrix?.legend}
 *       currentDate={currentDate}
 *       onDateChange={setCurrentDate}
 *       onSelectionChange={onSelectionChange}
 *       readOnly={readOnly}
 *       isLoading={configLoading || matrixLoading}
 *       errorMessage={configError ? 'Could not load config' : matrixError ? 'Could not load availability' : undefined}
 *       warningMessage={warningMessage}
 *     />
 *   );
 * }
 * ```
 *
 * ### Pattern 2: View-Only (Backoffice Admin)
 *
 * ```tsx
 * // apps/backoffice/src/components/CalendarSection.tsx
 * import { CalendarSection } from '@xala-technologies/platform-ui/features/calendar';
 *
 * export function AdminCalendar({ rentalObjectId }) {
 *   // ... SDK hooks ...
 *   return (
 *     <CalendarSection
 *       config={config}
 *       cells={matrix?.cells}
 *       readOnly={true}
 *       title="Availability Overview"
 *       // ... other props
 *     />
 *   );
 * }
 * ```
 *
 * @module @xala-technologies/platform-ui/features/calendar
 */

// =============================================================================
// Main Component Export
// =============================================================================

export {
  CalendarSection,
  type CalendarSectionProps,
  type CalendarSectionLabels,
  type CalendarConfig,
  type RawCalendarCell,
  type RawLegendItem,
} from './CalendarSection';

// =============================================================================
// Re-export Utilities from blocks/calendar
// =============================================================================

// =============================================================================
// SDK-Connected Components
// =============================================================================

// COMMENTED OUT: Contains forbidden imports (@xala-technologies/platform)
// export {
//   CalendarSectionConnected,
//   type CalendarSectionConnectedProps,
// } from './CalendarSectionConnected';

// =============================================================================
// Re-export Utilities from blocks/calendar
// =============================================================================

export {
  // Utility functions
  formatDateToISO,
  getWeekStart,
  getWeekEnd,
  getMonthStart,
  getMonthEnd,
  getDateRangeForMode,
  mapToCalendarCell,
  buildCalendarLegend,
  getCalendarSubtitle,

  // Constants
  CALENDAR_SLOT_STATUS_LABELS,
  CALENDAR_SLOT_STATUS_KEYS,
  CALENDAR_MODE_LABELS,
  DEFAULT_CALENDAR_LEGEND,

  // Helpers
  isCalendarSlotSelectable,
  getCalendarSlotLabel,
  getCalendarSlotKey,

  // Types
  type CalendarMode,
  type CalendarSlotStatus,
  type CalendarCell,
  type CalendarSelectionRange,
  type CalendarSelection,
  type CalendarLegendItem,
  type CalendarSectionControllerProps,

  // Calendar Components
  RentalObjectAvailabilityCalendar,
  type RentalObjectAvailabilityCalendarProps,
} from './blocks';

// =============================================================================
// Admin/Timeline Components (merged from backoffice-calendar)
// =============================================================================

export {
  ConflictIndicator,
  getConflictStyles,
  getConflictColors,
  getBufferZoneStyles,
  getBufferZoneStyle,
  type ConflictIndicatorProps,
  type BufferZoneProps,
  TimelineView,
  type TimelineViewProps,
  type DragPreview,
  type DragHandlers,
  EventDrawer,
  type EventDrawerProps,
  // COMMENTED OUT: Contains forbidden imports (@xala-technologies/platform)
  // CreateBlockModal,
  // type CreateBlockModalProps,
  // type CreateBlockData,
} from './components';

// =============================================================================
// Admin Types (merged from backoffice-calendar)
// =============================================================================

export type {
  CalendarViewType,
  BlockType,
  CalendarEvent,
  CalendarState,
  CalendarFilters,
  BlockFormData,
  RecurrenceFormData,
  EventDrawerState,
  BlockModalState,
  Block,
  Conflict,
  ConflictInfo,
  ConflictResolution,
  RentalObject as CalendarRentalObject,
  CalendarAction,
  CalendarPermissions,
  BlockTypeConfig,
} from './types';

export {
  BLOCK_TYPE_CONFIG,
  WEEKDAY_LABELS,
  WEEKDAY_FULL_LABELS,
  DEFAULT_BLOCK_FORM,
  DEFAULT_RECURRENCE_FORM,
} from './types';
