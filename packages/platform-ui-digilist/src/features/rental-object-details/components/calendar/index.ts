/**
 * Calendar re-exports from features/calendar
 * This directory previously had a local CalendarSection stub.
 * Now re-exports the canonical CalendarSection from features/calendar.
 */
export {
  CalendarSection,
  type CalendarSectionProps,
  type CalendarSectionLabels,
} from '../../../calendar';

// Local calendar components
export { RentalObjectCalendarSection } from './RentalObjectCalendarSection';
export type { RentalObjectCalendarSectionProps } from './RentalObjectCalendarSection';

// Deprecated wrapper - re-exported for backward compatibility
export { CalendarSection as LegacyCalendarSection } from './CalendarSection';
export type { CalendarSectionProps as LegacyCalendarSectionProps } from './CalendarSection';

// QuoteData is defined in the payment section now
export interface QuoteData {
  totalPrice: number;
  currency: string;
}
