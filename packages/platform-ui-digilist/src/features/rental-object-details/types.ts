/**
 * Rental Object Details Feature - Extended Type Definitions
 *
 * These types extend the base types from @digilist/ui/types for the
 * rental object details feature components.
 *
 * @module @xala-technologies/platform-ui/features/rental-object-details
 */

// Re-export base types
export type {
  RentalObjectType,
  RentalObjectDetail,
  ContactInfo,
  Coordinates,
  OpeningHoursDay,
  GalleryImage,
  AdditionalService,
  GuidelineSection,
  FAQItem,
  Amenity,
  TimeSlotStatus,
  BookingDetails,
  BookingState,
  BookingStep,
  ActivityType,
  CalendarMode,
  CalendarSlotStatus,
  CalendarSelectionType,
  CalendarViewMode,
  CalendarCell,
  CalendarSelection,
  CalendarSelectionRange,
  CalendarLegendItem,
} from '../../types/rental-object-detail';

// =============================================================================
// Booking Mode Types
// =============================================================================

/**
 * Booking modes supported by rental objects.
 * - SINGLE_SLOT: Standard one-time booking selection
 * - IN_GAME: Short notice / live availability / rapid reserve-confirm patterns
 * - RECURRING: Weekly/monthly patterns with conflict detection and preview
 */
export type BookingMode = 'SINGLE_SLOT' | 'IN_GAME' | 'RECURRING';

export type ApprovalMode = 'NONE' | 'REQUIRED' | 'AUTO';

// =============================================================================
// Extended Types for Tab Components
// =============================================================================

/**
 * Included equipment for rental objects
 */
export interface IncludedEquipment {
  id: string;
  name: string;
  description?: string;
  quantity?: number;
}

/**
 * Rule/guideline for rental objects
 */
export interface Rule {
  id: string;
  title: string;
  content: string;
  category?: 'general' | 'cancellation' | 'safety' | 'cleaning' | 'noise' | 'other';
  icon?: string;
}

/**
 * Activity event for rental object
 */
export interface RentalObjectEvent {
  id: string;
  title: string;
  description?: string;
  startDate: string;
  endDate?: string;
  startTime?: string;
  endTime?: string;
  isRecurring?: boolean;
  organizer?: string;
  status: 'upcoming' | 'ongoing' | 'past' | 'cancelled';
}

/**
 * Rental history item
 */
export interface RentalHistoryItem {
  id: string;
  date: string;
  duration?: string;
  purpose?: string;
  status: 'completed' | 'cancelled';
}

/**
 * Activity data for the activity tab
 */
export interface ActivityData {
  type: 'events' | 'rentals' | 'sessions';
  events?: RentalObjectEvent[];
  rentals?: RentalHistoryItem[];
  totalCount?: number;
}

/**
 * Key facts for rental objects
 */
export interface KeyFacts {
  capacity?: number;
  capacityLabel?: string;
  area?: number;
  areaUnit?: 'sqm' | 'sqft';
  floors?: number;
  quantity?: number;
  unitLabel?: string;
  condition?: 'new' | 'good' | 'fair';
  duration?: string;
  sessions?: number;
  wheelchairAccessible?: boolean;
  accessibilityFeatures?: string[];
  bookingMode?: BookingMode;
  approvalRequired?: boolean;
}

/**
 * Rental object metadata containing detailed info
 */
export interface RentalObjectMetadata {
  description?: string;
  shortDescription?: string;
  amenities: Array<{
    id: string;
    name: string;
    icon?: string;
    category?: string;
    description?: string;
  }>;
  includedEquipment: IncludedEquipment[];
  rules: Rule[];
  faq: Array<{ id: string; question: string; answer: string; category?: string }>;
  tags?: string[];
  highlights?: string[];
}

// =============================================================================
// Address Types
// =============================================================================

/**
 * Address information for rental objects
 */
export interface RentalObjectAddress {
  street?: string;
  streetNumber?: string;
  postalCode?: string;
  city?: string;
  municipality?: string;
  county?: string;
  country?: string;
  formatted?: string;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
}
