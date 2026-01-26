/**
 * Backoffice Calendar Feature Types
 *
 * Types specific to the calendar module UI.
 * These are presentational types for the calendar feature kit.
 *
 * @module @xala-technologies/platform-ui/features/backoffice-calendar
 */

// =============================================================================
// Calendar View Types
// =============================================================================

export type CalendarViewType = 'day' | 'week' | 'month' | 'timeline';

export type BlockType = 'maintenance' | 'closed' | 'hold' | 'emergency' | 'internal';

// =============================================================================
// State Types
// =============================================================================

export interface CalendarEvent {
  id: string;
  title?: string;
  userName?: string;
  organizationName?: string;
  listingId?: string;
  listingName?: string;
  bookingId?: string;
  start?: string;
  end?: string;
  startTime?: string;
  endTime?: string;
  status: string;
}

export interface CalendarState {
  view: CalendarViewType;
  currentDate: Date;
  selectedListing: string | undefined;
  selectedEvent: CalendarEvent | null;
}

export interface CalendarFilters {
  listingId?: string;
  showBlocks?: boolean;
  showBookings?: boolean;
  showMaintenance?: boolean;
  status?: string[];
}

// =============================================================================
// Form Types
// =============================================================================

export interface BlockFormData {
  listingId: string;
  title: string;
  blockType: BlockType;
  startDate: string;
  endDate: string;
  startTime: string;
  endTime: string;
  allDay: boolean;
  notes: string;
  notifyAffectedUsers: boolean;
  recurrence: RecurrenceFormData | null;
}

export interface RecurrenceFormData {
  frequency: 'daily' | 'weekly' | 'monthly';
  interval: number;
  weekdays: number[];
  endDate: string;
}

// =============================================================================
// Drawer/Modal State Types
// =============================================================================

export interface EventDrawerState {
  isOpen: boolean;
  event: CalendarEvent | null;
  mode: 'view' | 'edit';
}

export interface BlockModalState {
  isOpen: boolean;
  mode: 'create' | 'edit';
  block: Block | null;
  initialDate?: Date;
  initialListingId?: string;
}

export interface Block {
  id: string;
  listingId: string;
  title: string;
  blockType: BlockType;
  startTime: string;
  endTime: string;
  allDay?: boolean;
  notes?: string;
}

// =============================================================================
// Conflict Types
// =============================================================================

export interface Conflict {
  id: string;
  title: string;
  startTime: string;
  endTime: string;
}

export interface ConflictInfo {
  hasConflicts: boolean;
  conflictingEvents: Array<{
    id: string;
    title?: string;
    listingName?: string;
  }>;
  isBufferConflict?: boolean;
}

export interface ConflictResolution {
  conflicts: Conflict[];
  canOverride: boolean;
  overrideReason?: string;
}

// =============================================================================
// Rental Object Type (simplified for calendar)
// =============================================================================

export interface RentalObject {
  id: string;
  name: string;
  capacity?: number;
}

// =============================================================================
// Calendar Actions
// =============================================================================

export type CalendarAction =
  | { type: 'CREATE_BLOCK'; listingId?: string; date?: Date }
  | { type: 'EDIT_BLOCK'; block: Block }
  | { type: 'DELETE_BLOCK'; blockId: string }
  | { type: 'VIEW_EVENT'; event: CalendarEvent }
  | { type: 'APPROVE_REQUEST'; bookingId: string }
  | { type: 'REJECT_REQUEST'; bookingId: string };

// =============================================================================
// Permissions
// =============================================================================

export interface CalendarPermissions {
  canApproveRequests: boolean;
  canDeleteBlock: boolean;
  canCreateBlock: boolean;
  canCreateRecurringBlocks: boolean;
  canOverrideConflicts: boolean;
}

// =============================================================================
// Block Type Configuration
// =============================================================================

export interface BlockTypeConfig {
  label: string;
  description: string;
  colorBg: string;
  colorBorder: string;
  colorText: string;
  icon?: string;
}

export const BLOCK_TYPE_CONFIG: Record<BlockType, BlockTypeConfig> = {
  maintenance: {
    label: 'backoffice.calendar.blockType.maintenance',
    description: 'backoffice.calendar.blockType.maintenanceDescription',
    colorBg: 'var(--ds-color-neutral-surface-hover)',
    colorBorder: 'var(--ds-color-neutral-border-default)',
    colorText: 'var(--ds-color-neutral-text-subtle)',
  },
  closed: {
    label: 'backoffice.calendar.blockType.closed',
    description: 'backoffice.calendar.blockType.closedDescription',
    colorBg: 'var(--ds-color-danger-surface-default)',
    colorBorder: 'var(--ds-color-danger-border-default)',
    colorText: 'var(--ds-color-danger-text-default)',
  },
  hold: {
    label: 'backoffice.calendar.blockType.hold',
    description: 'backoffice.calendar.blockType.holdDescription',
    colorBg: 'var(--ds-color-warning-surface-default)',
    colorBorder: 'var(--ds-color-warning-border-default)',
    colorText: 'var(--ds-color-warning-text-default)',
  },
  emergency: {
    label: 'backoffice.calendar.blockType.emergency',
    description: 'backoffice.calendar.blockType.emergencyDescription',
    colorBg: 'var(--ds-color-danger-surface-default)',
    colorBorder: 'var(--ds-color-danger-border-default)',
    colorText: 'var(--ds-color-danger-text-default)',
  },
  internal: {
    label: 'backoffice.calendar.blockType.internal',
    description: 'backoffice.calendar.blockType.internalDescription',
    colorBg: 'var(--ds-color-info-surface-default)',
    colorBorder: 'var(--ds-color-info-border-default)',
    colorText: 'var(--ds-color-info-text-default)',
  },
};

// =============================================================================
// Constants
// =============================================================================

export const WEEKDAY_LABELS = ['Søn', 'Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lør'];
export const WEEKDAY_FULL_LABELS = [
  'Søndag',
  'Mandag',
  'Tirsdag',
  'Onsdag',
  'Torsdag',
  'Fredag',
  'Lørdag',
];

export const DEFAULT_BLOCK_FORM: BlockFormData = {
  listingId: '',
  title: '',
  blockType: 'maintenance',
  startDate: '',
  endDate: '',
  startTime: '08:00',
  endTime: '16:00',
  allDay: false,
  notes: '',
  notifyAffectedUsers: false,
  recurrence: null,
};

export const DEFAULT_RECURRENCE_FORM: RecurrenceFormData = {
  frequency: 'weekly',
  interval: 1,
  weekdays: [],
  endDate: '',
};
