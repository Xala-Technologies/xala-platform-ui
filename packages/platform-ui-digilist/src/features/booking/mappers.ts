/**
 * Booking Mappers
 *
 * DEPRECATED: These mappers are kept for backward compatibility.
 * In pure presentational components, pass data directly via props.
 * These mappers assume specific DTO shapes from @digilist/contracts
 * which creates a dependency on backend projections.
 *
 * Instead, transform data in your app layer before passing to components.
 */

// =============================================================================
// Status Badge Types
// =============================================================================

export type BookingStatusColor = 'success' | 'warning' | 'danger' | 'info' | 'neutral';

export interface StatusBadgeData {
  label: string;
  color: BookingStatusColor;
}

// =============================================================================
// Booking Card Display Props
// =============================================================================

/**
 * Props for booking card display.
 * This interface aligns with typical card patterns.
 */
export interface BookingCardDisplayProps {
  id: string;
  title: string;
  subtitle?: string;
  dateDisplay: string;
  timeDisplay: string;
  durationDisplay?: string;
  priceDisplay?: string;
  imageUrl?: string;
  status: StatusBadgeData;
  paymentStatus?: StatusBadgeData;
  isPast: boolean;
  isUpcoming: boolean;
  isCancellable: boolean;
  userName?: string;
}

// =============================================================================
// Booking Details Display Props
// =============================================================================

/**
 * Props for booking details display.
 */
export interface BookingDetailsDisplayProps extends BookingCardDisplayProps {
  startTime: string;
  endTime: string;
  rentalObject: {
    id: string;
    name: string;
    address?: string;
    imageUrl?: string;
  };
  user?: {
    id: string;
    name: string;
    email: string;
    phone?: string;
  };
  organization?: {
    id: string;
    name: string;
  } | null;
  payment: {
    total: string;
    breakdown: Array<{ label: string; amount: string }>;
    method?: string;
    paidAt?: string;
  };
  notes?: string;
  canCancel: boolean;
  canModify: boolean;
  actions: Array<{
    action: string;
    label: string;
    enabled: boolean;
    reason?: string;
  }>;
  createdAt: string;
}

// =============================================================================
// Price Summary Types
// =============================================================================

/**
 * Price line item for summary display.
 */
export interface PriceSummaryLine {
  id: string;
  label: string;
  amount: string;
  isDiscount?: boolean;
  isSubtotal?: boolean;
  isTotal?: boolean;
}

// =============================================================================
// Calendar Event Types
// =============================================================================

/**
 * Calendar event display props.
 */
export interface CalendarEventDisplayProps {
  id: string;
  title: string;
  start: Date;
  end: Date;
  allDay?: boolean;
  color?: string;
  textColor?: string;
  editable: boolean;
  clickable: boolean;
  resourceId?: string;
  extendedProps: {
    bookingId?: string;
    status: string;
    statusLabel: string;
    userName?: string;
    organizationName?: string;
  };
}
