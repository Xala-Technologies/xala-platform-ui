/**
 * CalendarSection Component
 *
 * Unified presentational calendar component for displaying rental object availability.
 * Supports TIME_SLOTS, ALL_DAY, and MULTI_DAY modes.
 *
 * This is a PRESENTATIONAL component - it does not contain SDK hooks.
 * Apps should provide their own thin wrappers that connect SDK data.
 *
 * ## Architecture
 *
 * ```
 * APP LAYER (Thin Wrapper)
 * ├── Uses SDK hooks (useCalendarConfig, useAvailabilityMatrix)
 * ├── Manages realtime subscriptions
 * └── Passes data to CalendarSection
 *
 * UI LAYER (This Component)
 * ├── Receives all data as props
 * ├── Handles selection state
 * ├── Renders RentalObjectAvailabilityCalendar
 * └── Emits callbacks (onDateChange, onSelectionChange)
 * ```
 *
 * @example
 * ```tsx
 * // In app wrapper:
 * import { CalendarSection } from '@xala-technologies/platform-ui/features/calendar';
 * import { useCalendarConfig, useAvailabilityMatrix } from '@digilist/client-sdk/hooks';
 *
 * export function CalendarWrapper({ rentalObjectId }) {
 *   const { data: config } = useCalendarConfig(rentalObjectId);
 *   const { data: matrix, isLoading } = useAvailabilityMatrix(rentalObjectId, dateRange);
 *
 *   return (
 *     <CalendarSection
 *       mode={config?.granularity}
 *       cells={matrix?.cells}
 *       isLoading={isLoading}
 *       // ... other props
 *     />
 *   );
 * }
 * ```
 */

import * as React from 'react';
import { Paragraph, Stack } from '@xala-technologies/platform-ui';
import {
  RentalObjectAvailabilityCalendar,
  mapToCalendarCell,
  type CalendarMode,
  type CalendarCell,
  type CalendarSelection,
  type CalendarLegendItem,
} from './blocks';

// =============================================================================
// Types
// =============================================================================

/**
 * Configuration data for the calendar (from SDK config hook)
 */
export interface CalendarConfig {
  granularity: CalendarMode;
  slotSizeMinutes?: number;
  openingHours?: {
    weekly?: Record<string, { open: string; close: string }>;
  };
  permissions?: {
    canBook?: boolean;
    canSelectSlot?: boolean;
  };
}

/**
 * Raw cell data from availability matrix (from SDK matrix hook)
 */
export interface RawCalendarCell {
  start: string;
  end: string;
  status: string;
  reasonKey?: string | null;
  bookingId?: string | null;
  blockId?: string | null;
  lockedUntil?: string | null;
}

/**
 * Legend data from API
 */
export interface RawLegendItem {
  status: string;
  labelKey: string;
}

/**
 * Labels interface for CalendarSection translations
 */
export interface CalendarSectionLabels {
  /** Label for "Select time" title */
  selectTime?: string;
  /** Label for "Not available" empty state */
  notAvailable?: string;
  /** Label for "Select time slots" subtitle */
  selectTimeSlots?: string;
  /** Label for "Select days" subtitle */
  selectDays?: string;
  /** Label for "Select period" subtitle */
  selectPeriod?: string;
  /** Labels for legend items */
  statusAvailable?: string;
  statusReserved?: string;
  statusBooked?: string;
  statusBlocked?: string;
  statusBlackout?: string;
  statusClosed?: string;
}

export interface CalendarSectionProps {
  /**
   * Calendar configuration.
   * If undefined, component shows loading or empty state.
   */
  config?: CalendarConfig | null;

  /**
   * Availability matrix cells.
   * Can be raw cells (will be mapped) or already-mapped CalendarCell[].
   */
  cells?: RawCalendarCell[] | CalendarCell[];

  /**
   * Legend items from API (optional, defaults to standard legend).
   */
  legend?: RawLegendItem[];

  /**
   * Force a specific calendar mode (overrides config.granularity).
   */
  forceMode?: CalendarMode;

  /**
   * Current selection state (controlled).
   */
  selection?: CalendarSelection;

  /**
   * Callback when selection changes.
   */
  onSelectionChange?: (selection: CalendarSelection) => void;

  /**
   * Current date for calendar navigation (controlled).
   * If not provided, component manages its own date state.
   */
  currentDate?: Date;

  /**
   * Callback when navigation date changes.
   */
  onDateChange?: (date: Date) => void;

  /**
   * Whether the calendar is in read-only mode.
   * Default: false (interactive)
   */
  readOnly?: boolean;

  /**
   * Loading state.
   */
  isLoading?: boolean;

  /**
   * Error message to display.
   */
  errorMessage?: string;

  /**
   * Warning message to display (e.g., "selection may have changed").
   */
  warningMessage?: string;

  /**
   * Custom title for the calendar section.
   */
  title?: string;

  /**
   * Custom subtitle for the calendar section.
   */
  subtitle?: string;

  /**
   * Whether to show tips/hints.
   */
  showTips?: boolean;

  /**
   * Start hour for TIME_SLOTS mode (default: 8).
   */
  startHour?: number;

  /**
   * End hour for TIME_SLOTS mode (default: 17).
   */
  endHour?: number;

  /**
   * Custom class name for the wrapper.
   */
  className?: string;

  /**
   * UI labels for translations.
   * Provide all text labels for the component.
   */
  labels?: CalendarSectionLabels;
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Check if cells are already mapped CalendarCells or raw cells
 */
function isCalendarCell(cell: RawCalendarCell | CalendarCell): cell is CalendarCell {
  return 'id' in cell;
}

/**
 * Normalize cells to CalendarCell[]
 */
function normalizeCells(cells: (RawCalendarCell | CalendarCell)[]): CalendarCell[] {
  return cells.map((cell) => {
    if (isCalendarCell(cell)) {
      return cell;
    }
    return mapToCalendarCell(cell) as CalendarCell;
  });
}

/**
 * Extract opening hours from config
 */
function getHoursFromConfig(
  config: CalendarConfig | null | undefined,
  type: 'start' | 'end',
  defaultValue: number
): number {
  const weekdayHours = config?.openingHours?.weekly?.['1'];
  if (!weekdayHours) return defaultValue;

  const timeStr = type === 'start' ? weekdayHours.open : weekdayHours.close;
  if (!timeStr) return defaultValue;

  const hour = parseInt(timeStr.split(':')[0]!, 10);
  return isNaN(hour) ? defaultValue : hour;
}

// =============================================================================
// Component
// =============================================================================

/**
 * Default labels (Norwegian fallback)
 */
const DEFAULT_LABELS: CalendarSectionLabels = {
  selectTime: 'Velg tidspunkt',
  notAvailable: 'Ikke tilgjengelig',
  selectTimeSlots: 'Velg tidspunkt',
  selectDays: 'Velg dag(er)',
  selectPeriod: 'Velg periode',
  statusAvailable: 'Ledig',
  statusReserved: 'Reservert',
  statusBooked: 'Booket',
  statusBlocked: 'Blokkert',
  statusBlackout: 'Utilgjengelig',
  statusClosed: 'Stengt',
};

/**
 * Unified CalendarSection component for displaying rental object availability.
 *
 * This is a presentational component that receives all data as props.
 * Apps should create thin wrappers that connect SDK hooks.
 */
export function CalendarSection({
  config,
  cells = [],
  legend,
  forceMode,
  selection: controlledSelection,
  onSelectionChange,
  currentDate: controlledDate,
  onDateChange,
  readOnly = false,
  isLoading = false,
  errorMessage,
  warningMessage,
  title,
  subtitle,
  showTips = true,
  startHour,
  endHour,
  className,
  labels = DEFAULT_LABELS,
}: CalendarSectionProps): React.ReactElement {
  // Merge provided labels with defaults

  const effectiveLabels = React.useMemo(() => ({ ...DEFAULT_LABELS, ...labels }), [labels]);

  // Internal state for uncontrolled date
  const [internalDate, setInternalDate] = React.useState<Date>(new Date());
  const currentDate = controlledDate ?? internalDate;

  // Internal state for uncontrolled selection
  const [internalSelection, setInternalSelection] = React.useState<CalendarSelection | undefined>(
    undefined
  );
  const selection = controlledSelection ?? internalSelection;

  // Determine calendar mode: forceMode > config.granularity > default
  const calendarMode: CalendarMode = React.useMemo(() => {
    if (forceMode) return forceMode;
    if (config?.granularity) return config.granularity;
    return 'TIME_SLOTS';
  }, [forceMode, config]);

  // Normalize cells to CalendarCell[]
  const normalizedCells = React.useMemo(() => {
    if (!cells || cells.length === 0) return [];
    return normalizeCells(cells);
  }, [cells]);

  // Build legend from API response or use defaults
  const calendarLegend = React.useMemo(() => {
    if (legend) {
      return legend.map((item) => ({
        status: item.status,
        label: item.labelKey.includes('.') ? item.labelKey.split('.').pop()! : item.labelKey,
      }));
    }

    // Default legend with labels
    return [
      { status: 'AVAILABLE', label: effectiveLabels.statusAvailable ?? 'Ledig' },
      { status: 'RESERVED', label: effectiveLabels.statusReserved ?? 'Reservert' },
      { status: 'BOOKED', label: effectiveLabels.statusBooked ?? 'Booket' },
      { status: 'BLOCKED', label: effectiveLabels.statusBlocked ?? 'Blokkert' },
      { status: 'BLACKOUT', label: effectiveLabels.statusBlackout ?? 'Utilgjengelig' },
      { status: 'CLOSED', label: effectiveLabels.statusClosed ?? 'Stengt' },
    ];
  }, [legend, effectiveLabels]);

  // Compute effective hours
  const effectiveStartHour = startHour ?? getHoursFromConfig(config, 'start', 8);
  const effectiveEndHour = endHour ?? getHoursFromConfig(config, 'end', 17);

  // Check permissions
  const canSelect = config?.permissions?.canBook ?? config?.permissions?.canSelectSlot ?? true;

  // Handle date change
  const handleDateChange = React.useCallback(
    (date: Date) => {
      if (onDateChange) {
        onDateChange(date);
      } else {
        setInternalDate(date);
      }
    },
    [onDateChange]
  );

  // Handle cell click
  const handleCellClick = React.useCallback(
    (cell: CalendarCell) => {
      if (readOnly || !canSelect) return;

      const updateSelection = (prev: CalendarSelection | undefined) => {
        const alreadySelected = prev?.cells.some((c) => c.id === cell.id);

        let newCells: CalendarCell[];
        if (alreadySelected) {
          newCells = prev?.cells.filter((c) => c.id !== cell.id) ?? [];
        } else {
          newCells = [...(prev?.cells ?? []), cell];
        }

        const newSelection: CalendarSelection = {
          cells: newCells,
          isValid: newCells.length > 0,
        };

        return newSelection;
      };

      if (onSelectionChange) {
        const newSelection = updateSelection(selection);
        onSelectionChange(newSelection);
      } else {
        setInternalSelection(updateSelection);
      }
    },
    [readOnly, canSelect, selection, onSelectionChange]
  );

  // Handle selection change (direct)
  const handleSelectionChange = React.useCallback(
    (newSelection: CalendarSelection | undefined) => {
      if (onSelectionChange && newSelection) {
        onSelectionChange(newSelection);
      } else {
        setInternalSelection(newSelection);
      }
    },
    [onSelectionChange]
  );

  // Compute title and subtitle
  const effectiveTitle = title ?? effectiveLabels.selectTime ?? 'Velg tidspunkt';
  const effectiveSubtitle =
    subtitle ??
    (() => {
      const subtitles: Record<string, string> = {
        TIME_SLOTS: effectiveLabels.selectTimeSlots ?? 'Velg tidspunkt',
        ALL_DAY: effectiveLabels.selectDays ?? 'Velg dag(er)',
        MULTI_DAY: effectiveLabels.selectPeriod ?? 'Velg periode',
      };
      return subtitles[calendarMode] ?? subtitles.TIME_SLOTS;
    })();

  // Empty state if no config and not loading
  if (!isLoading && !config && !errorMessage) {
    return (
      <Stack
        className={className}
        style={{
          textAlign: 'center',
          padding: 'var(--ds-spacing-8)',
        }}
      >
        <Paragraph data-size="sm" data-color="subtle" style={{ fontStyle: 'italic' }}>
          {effectiveLabels.notAvailable ?? 'Ikke tilgjengelig'}
        </Paragraph>
      </Stack>
    );
  }

  return (
    <Stack className={className}>
      <RentalObjectAvailabilityCalendar
        mode={calendarMode}
        cells={normalizedCells}
        selection={selection}
        legend={calendarLegend as CalendarLegendItem[]}
        currentDate={currentDate}
        onDateChange={handleDateChange}
        onCellClick={readOnly || !canSelect ? undefined : handleCellClick}
        onSelectionChange={readOnly || !canSelect ? undefined : handleSelectionChange}
        startHour={effectiveStartHour}
        endHour={effectiveEndHour}
        slotSizeMinutes={config?.slotSizeMinutes ?? 60}
        showTips={showTips}
        title={effectiveTitle}
        subtitle={effectiveSubtitle}
        isLoading={isLoading}
        errorMessage={errorMessage}
        warningMessage={warningMessage}
        readOnly={readOnly || !canSelect}
      />
    </Stack>
  );
}

export default CalendarSection;
