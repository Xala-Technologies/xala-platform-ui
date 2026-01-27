/**
 * Digilist ViewModel Types
 * 
 * These interfaces define the props-in/events-out contract for Digilist UI components.
 * Apps should map their domain DTOs to these ViewModels before passing to UI components.
 * This ensures UI components remain pure and decoupled from SDK/domain types.
 */

// =============================================================================
// Booking ViewModels
// =============================================================================

export type BookingModeVM = 'slots' | 'daily' | 'dateRange' | 'event' | 'recurring' | 'instant';
export type BookingPriceUnitVM = 'hour' | 'day' | 'week' | 'month' | 'booking' | 'person' | 'unit';

export interface BookingPricingVM {
    basePrice: number;
    currency: string;
    unit: BookingPriceUnitVM;
    minDuration?: number;
    maxDuration?: number;
}

export interface BookingRulesVM {
    minAdvanceBooking?: number;
    maxAdvanceBooking?: number;
    minDuration?: number;
    maxDuration?: number;
    maxAttendees?: number;
    requiresApproval?: boolean;
    cancellationPolicy?: string;
    termsUrl?: string;
}

export interface BookingConfigVM {
    mode: BookingModeVM;
    pricing: BookingPricingVM;
    rules: BookingRulesVM;
    activityTypes?: string[];
}

export interface AvailabilitySlotVM {
    id: string;
    date: Date | string;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
    price?: number;
    capacity?: number;
    remainingCapacity?: number;
}

export interface DayAvailabilityVM {
    date: Date | string;
    isAvailable: boolean;
    availableSlots?: number;
    totalSlots?: number;
    minPrice?: number;
    maxPrice?: number;
    status?: 'available' | 'limited' | 'full' | 'blocked';
}

export interface BookingSelectionVM {
    slots: AvailabilitySlotVM[];
    dateRange?: {
        start: Date;
        end: Date;
    };
    tickets?: number;
}

export interface BookingPriceCalculationVM {
    basePrice: number;
    additionalServicesPrice: number;
    discounts: number;
    taxes: number;
    totalPrice: number;
    currency: string;
    breakdown?: {
        label: string;
        amount: number;
    }[];
}

export interface AdditionalServiceVM {
    id: string;
    name: string;
    description?: string;
    price: number;
    required?: boolean;
    maxQuantity?: number;
}

export interface BookingFormDataVM {
    name?: string;
    email?: string;
    phone?: string;
    organization?: string;
    purpose?: string;
    showPurposeInCalendar?: boolean;
    numberOfPeople?: number;
    activityType?: string;
    notes?: string;
    additionalServices?: string[];
    acceptedTerms?: boolean;
    acceptedCancellationPolicy?: boolean;
}

// =============================================================================
// Calendar ViewModels
// =============================================================================

export type CalendarModeVM = 'TIME_SLOTS' | 'DAILY' | 'WEEKLY' | 'MONTHLY';

export interface CalendarConfigVM {
    granularity: CalendarModeVM;
    startHour?: number;
    endHour?: number;
    slotDuration?: number;
    timezone?: string;
}

export interface CalendarCellVM {
    id: string;
    date: string;
    startTime?: string;
    endTime?: string;
    status: 'available' | 'booked' | 'blocked' | 'pending' | 'past';
    label?: string;
    price?: number;
}

export interface CalendarLegendItemVM {
    status: string;
    label: string;
    color: string;
}

export interface CalendarSelectionVM {
    cells: CalendarCellVM[];
    dateRange?: {
        start: Date;
        end: Date;
    };
}

// =============================================================================
// Season ViewModels
// =============================================================================

export type SeasonStatusVM = 'draft' | 'active' | 'upcoming' | 'ended' | 'archived';

export interface SeasonVM {
    id: string;
    name: string;
    description?: string;
    startDate: Date | string;
    endDate: Date | string;
    status: SeasonStatusVM;
    venueCount?: number;
    image?: string;
}

export interface VenueVM {
    id: string;
    name: string;
    description?: string;
    address?: string;
    capacity?: number;
    image?: string;
    status: 'active' | 'inactive' | 'maintenance';
}

// =============================================================================
// Rental Object ViewModels
// =============================================================================

export type RentalObjectStatusVM = 'available' | 'unavailable' | 'maintenance' | 'draft';

export interface RentalObjectVM {
    id: string;
    name: string;
    description?: string;
    shortDescription?: string;
    images?: string[];
    category?: string;
    status: RentalObjectStatusVM;
    pricing?: BookingPricingVM;
    capacity?: number;
    location?: {
        address?: string;
        city?: string;
        coordinates?: { lat: number; lng: number };
    };
    amenities?: string[];
    features?: { key: string; value: string }[];
}

// =============================================================================
// Review ViewModels
// =============================================================================

export interface ReviewVM {
    id: string;
    author: {
        name: string;
        avatar?: string;
        verified?: boolean;
    };
    rating: number;
    title?: string;
    content: string;
    createdAt: Date | string;
    helpful?: number;
    images?: string[];
    response?: {
        author: string;
        content: string;
        createdAt: Date | string;
    };
}

export interface ReviewSummaryVM {
    averageRating: number;
    totalReviews: number;
    distribution: {
        rating: number;
        count: number;
        percentage: number;
    }[];
}

// =============================================================================
// Common Event Callbacks
// =============================================================================

export interface BookingEngineCallbacks {
    onSelectionChange?: (selection: BookingSelectionVM) => void;
    onStepChange?: (step: number) => void;
    onSubmit?: (selection: BookingSelectionVM, formData: BookingFormDataVM) => Promise<void>;
    onCancel?: () => void;
}

export interface CalendarCallbacks {
    onSelectionChange?: (selection: CalendarSelectionVM) => void;
    onDateChange?: (date: Date) => void;
    onCellClick?: (cell: CalendarCellVM) => void;
}
