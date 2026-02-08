/**
 * ResourceRequest Types
 *
 * Comprehensive type definitions for the unified resourceRequest system.
 * Supports all resource types: SPACE, RESOURCE, EVENT, SERVICE, VEHICLE
 *
 * Platform-neutral terminology - use generic "resource" or "item".
 */

/**
 * Resource type for resourceRequest configuration
 */
export type ResourceRequestResourceType =
  | 'SPACE'
  | 'RESOURCE'
  | 'EVENT'
  | 'SERVICE'
  | 'VEHICLE'
  | 'OTHER';

/**
 * ResourceRequest mode determines the UI and flow
 */
export type ResourceRequestMode =
  | 'slots' // Hourly time slots (e.g., meeting rooms, sports halls)
  | 'daily' // Full day resourceRequest (e.g., conference rooms, outdoor spaces)
  | 'dateRange' // Multi-day range (e.g., vehicles, equipment resource)
  | 'event' // Event/ticket based (e.g., workshops, classes)
  | 'recurring' // Seasonal/recurring (e.g., sports clubs weekly slot)
  | 'instant'; // Instant resourceRequest without calendar (e.g., digital services)

/**
 * Pricing unit for display and calculation
 */
export type ResourceRequestPriceUnit =
  | 'hour'
  | 'day'
  | 'week'
  | 'month'
  | 'resourceRequest'
  | 'person'
  | 'unit';

/**
 * Availability slot status
 */
export type SlotStatus = 'available' | 'selected' | 'occupied' | 'blocked' | 'maintenance' | 'past';

/**
 * Single availability slot
 */
export interface AvailabilitySlot {
  id: string;
  date: Date;
  startTime: string;
  endTime: string;
  status: SlotStatus;
  price?: number;
  note?: string;
}

/**
 * Day availability summary
 */
export interface DayAvailability {
  date: Date;
  isAvailable: boolean;
  availableSlots: number;
  totalSlots: number;
  minPrice?: number;
  maxPrice?: number;
  status: 'open' | 'full' | 'limited' | 'closed';
}

/**
 * Pricing configuration
 */
export interface ResourceRequestPricing {
  basePrice: number;
  currency: string;
  unit: ResourceRequestPriceUnit;
  /** Weekend price multiplier (e.g., 1.5 = 50% more) */
  weekendMultiplier?: number;
  /** Evening/night price multiplier */
  eveningMultiplier?: number;
  /** Minimum resourceRequest duration in units */
  minimumDuration?: number;
  /** Maximum resourceRequest duration in units */
  maximumDuration?: number;
  /** Discount for members (percentage) */
  memberDiscount?: number;
  /** Per-person pricing (for events) */
  perPerson?: boolean;
  /** Setup fee */
  setupFee?: number;
  /** Cleaning fee */
  cleaningFee?: number;
  /** VAT percentage */
  vatPercentage?: number;
}

/**
 * ResourceRequest rules and constraints
 */
export interface ResourceRequestRules {
  /** Require admin approval */
  requireApproval: boolean;
  /** Minimum lead time in hours */
  minLeadTimeHours: number;
  /** Maximum advance resourceRequest in days */
  maxAdvanceDays: number;
  /** Cancellation policy */
  cancellationPolicy: 'flexible' | 'moderate' | 'strict';
  /** Free cancellation hours before */
  freeCancellationHours: number;
  /** Minimum attendees (for events) */
  minAttendees?: number;
  /** Maximum attendees/capacity */
  maxAttendees?: number;
  /** Allow partial day resourceRequest */
  allowPartialDay?: boolean;
  /** Allow same-day resourceRequest */
  allowSameDayResourceRequest?: boolean;
  /** Required fields */
  requiredFields?: string[];
  /** Custom terms to accept */
  termsUrl?: string;
}

/**
 * Opening hours for a day
 */
export interface DaySchedule {
  /** 0 = Sunday, 1 = Monday, etc. */
  dayOfWeek: number;
  /** Is open this day */
  isOpen: boolean;
  /** Opening time HH:MM */
  openTime?: string;
  /** Closing time HH:MM */
  closeTime?: string;
  /** Break periods */
  breaks?: { start: string; end: string }[];
}

/**
 * Complete resourceRequest configuration for a resource
 */
export interface ResourceRequestConfig {
  /** Resource ID */
  resourceId: string;
  /** Resource type */
  resourceType: ResourceRequestResourceType;
  /** ResourceRequest mode */
  mode: ResourceRequestMode;
  /** Pricing configuration */
  pricing: ResourceRequestPricing;
  /** ResourceRequest rules */
  rules: ResourceRequestRules;
  /** Weekly schedule */
  schedule: DaySchedule[];
  /** Slot duration in minutes (for slot mode) */
  slotDurationMinutes?: number;
  /** Buffer time between resourceRequests in minutes */
  bufferMinutes?: number;
  /** Event capacity (for event mode) */
  eventCapacity?: number;
  /** Event date (for event mode) */
  eventDate?: Date;
  /** Supported activity types */
  activityTypes?: string[];
}

/**
 * User's resourceRequest selection state
 */
export interface ResourceRequestSelection {
  /** Selected slots (for slot mode) */
  slots: AvailabilitySlot[];
  /** Selected date range (for dateRange mode) */
  dateRange?: {
    start: Date;
    end: Date;
  };
  /** Selected event tickets (for event mode) */
  tickets?: number;
  /** Recurring pattern (for recurring mode) */
  recurring?: {
    weekdays: number[];
    startDate: Date;
    endDate: Date;
    startTime: string;
    endTime: string;
  };
}

/**
 * ResourceRequest form data
 */
export interface ResourceRequestFormData {
  // Contact info
  name: string;
  email: string;
  phone: string;
  organization?: string;

  // ResourceRequest details
  purpose: string;
  showPurposeInCalendar: boolean;
  numberOfPeople: number;
  activityType?: string;
  notes?: string;

  // Additional options
  additionalServices: string[];
  discountCode?: string;

  // Terms
  acceptedTerms: boolean;
  acceptedCancellationPolicy: boolean;
}

/**
 * Price breakdown item
 */
export interface PriceItem {
  id: string;
  label: string;
  quantity?: number;
  unitPrice?: number;
  total: number;
  type: 'base' | 'service' | 'fee' | 'discount' | 'tax';
}

/**
 * Complete price calculation
 */
export interface ResourceRequestPriceCalculation {
  items: PriceItem[];
  subtotal: number;
  discount: number;
  vat: number;
  total: number;
  currency: string;
}

/**
 * ResourceRequest step configuration
 */
export interface ResourceRequestStepConfig {
  id: string;
  label: string;
  icon: 'calendar' | 'form' | 'confirm' | 'success' | 'payment';
  description?: string;
  isOptional?: boolean;
}

/**
 * Get default resourceRequest steps based on mode
 *
 * @param mode - The resourceRequest mode
 * @param requirePayment - Whether payment step is required
 * @returns Array of resourceRequest step configurations
 */
export function getResourceRequestSteps(
  mode: ResourceRequestMode,
  requirePayment: boolean = false
): ResourceRequestStepConfig[] {
  const baseSteps: ResourceRequestStepConfig[] = [
    { id: 'select', label: 'Velg tid', icon: 'calendar' },
    { id: 'details', label: 'Detaljer', icon: 'form' },
    { id: 'confirm', label: 'Bekreft', icon: 'confirm' },
  ];

  if (requirePayment) {
    baseSteps.push({ id: 'payment', label: 'Betaling', icon: 'payment' });
  }

  baseSteps.push({ id: 'complete', label: 'Fullfort', icon: 'success' });

  // Customize based on mode
  switch (mode) {
    case 'event':
      baseSteps[0] = { id: 'select', label: 'Velg billetter', icon: 'calendar' };
      break;
    case 'dateRange':
      baseSteps[0] = { id: 'select', label: 'Velg datoer', icon: 'calendar' };
      break;
    case 'recurring':
      baseSteps[0] = { id: 'select', label: 'Velg monster', icon: 'calendar' };
      break;
    case 'instant':
      return [
        { id: 'details', label: 'Detaljer', icon: 'form' },
        { id: 'confirm', label: 'Bekreft', icon: 'confirm' },
        { id: 'complete', label: 'Fullfort', icon: 'success' },
      ];
  }

  return baseSteps;
}

/**
 * Determine resourceRequest mode from resource type and config
 *
 * @param resourceType - The type of resource being booked
 * @param pricingUnit - The pricing unit for the resource
 * @param hasEventDate - Whether the resource has a specific event date
 * @returns The appropriate resourceRequest mode
 */
export function determineResourceRequestMode(
  resourceType: string,
  pricingUnit: ResourceRequestPriceUnit,
  hasEventDate?: boolean
): ResourceRequestMode {
  if (hasEventDate) return 'event';

  switch (resourceType) {
    case 'EVENT':
      return 'event';
    case 'VEHICLE':
      return 'dateRange';
    case 'SERVICE':
      return pricingUnit === 'hour' ? 'slots' : 'instant';
    case 'SPACE':
    case 'RESOURCE':
      if (pricingUnit === 'hour') return 'slots';
      if (pricingUnit === 'day') return 'daily';
      if (pricingUnit === 'week' || pricingUnit === 'month') return 'dateRange';
      return 'slots';
    default:
      return 'slots';
  }
}

/**
 * Format price for display
 *
 * @param amount - The price amount
 * @param currency - Currency code (default: 'NOK')
 * @param locale - Locale for formatting (default: 'nb-NO')
 * @returns Formatted price string
 */
export function formatPrice(
  amount: number,
  currency: string = 'NOK',
  locale: string = 'nb-NO'
): string {
  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

/**
 * Format price unit for display (Norwegian)
 *
 * @param unit - The resourceRequest price unit
 * @returns Norwegian display string for the unit
 */
export function formatPriceUnit(unit: ResourceRequestPriceUnit): string {
  const unitMap: Record<ResourceRequestPriceUnit, string> = {
    hour: 'time',
    day: 'dag',
    week: 'uke',
    month: 'maned',
    resourceRequest: 'resourceRequest',
    person: 'person',
    unit: 'stk',
  };
  return unitMap[unit] || unit;
}
