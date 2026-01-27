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

// QuoteData is defined in the payment section now
export interface QuoteData {
  totalPrice: number;
  currency: string;
}
