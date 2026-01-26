/**
 * @xala-technologies/platform-ui - Rental Objects Feature
 *
 * Pure presentational rental object components.
 * The main component (RentalObjectAvailabilityCalendar) is located in blocks/calendar.
 *
 * @module @xala-technologies/platform-ui/features/rental-objects
 */

// Re-export RentalObjectAvailabilityCalendar from blocks/calendar
export {
  RentalObjectAvailabilityCalendar,
  type RentalObjectAvailabilityCalendarProps,
} from '../../blocks/calendar';

// Note: Calendar utilities (CalendarMode, CalendarCell, etc.) should be imported from
// @xala-technologies/platform-ui/blocks/calendar or @xala-technologies/platform-ui/features/calendar
// They are not re-exported here to avoid circular dependencies.
