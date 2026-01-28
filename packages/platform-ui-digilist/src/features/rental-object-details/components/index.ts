/**
 * Rental Object Details Components
 *
 * All pure presentational components for the rental object details feature.
 *
 * @module @xala-technologies/platform-ui/features/rental-object-details/components
 */

// =============================================================================
// Tab Components
// =============================================================================

export {
  OverviewTab,
  RulesTab,
  FaqTab,
  ActivityTab,
  type OverviewTabProps,
  type OverviewTabLabels,
  type RulesTabProps,
  type RulesTabLabels,
  type FaqTabProps,
  type FaqTabLabels,
  type ActivityTabProps,
  type ActivityTabLabels,
  type Amenity,
  type AdditionalService,
  type Rule,
  type FAQItem,
} from './tabs';

// =============================================================================
// Sidebar Widgets
// =============================================================================

export {
  ContactWidget,
  MapWidget,
  OpeningHoursWidget,
  type ContactWidgetProps,
  type ContactWidgetLabels,
  type MapWidgetProps,
  type MapWidgetLabels,
  type MapCoordinates,
  type OpeningHoursWidgetProps,
  type OpeningHoursWidgetLabels,
  type OpeningHours,
  type DayHours,
  type HoursException,
} from './sidebar';

// =============================================================================
// Layout Components
// =============================================================================

export {
  RentalObjectHeader,
  RentalObjectDetailsLayout,
  type RentalObjectHeaderProps,
  type RentalObjectHeaderLabels,
  type RentalObjectDetailsLayoutProps,
  type LayoutLabels,
} from './layout';

// =============================================================================
// Recurring Components
// =============================================================================

export {
  RecurringPatternBuilder,
  RecurringPreviewTable,
  RecurringResultSummary,
  DEFAULT_RECURRING_PATTERN,
  type RecurringPatternBuilderProps,
  type RecurringPatternBuilderLabels,
  type RecurringPatternData,
  type RecurringPreviewTableProps,
  type RecurringPreviewTableLabels,
  type RecurringResultSummaryProps,
  type RecurringResultSummaryLabels,
} from './recurring';

// =============================================================================
// Calendar Components
// =============================================================================

export {
  CalendarSection,
  RentalObjectCalendarSection,
  LegacyCalendarSection,
  type CalendarSectionProps,
  type CalendarSectionLabels,
  type RentalObjectCalendarSectionProps,
  type LegacyCalendarSectionProps,
  type QuoteData,
} from './calendar';

// =============================================================================
// Booking Components
// =============================================================================

export {
  BookingDialog,
  BookingWidgetPlacement,
  type BookingDialogProps,
  type BookingSlot,
  type BookingFormData,
  type BookingDialogOpeningHours,
  type BookingWidgetPlacementProps,
  type BookingWidgetOpeningHours,
} from './booking';

// =============================================================================
// Payment Components
// =============================================================================

export {
  PaymentSection,
  type PaymentSectionProps,
  type PaymentSectionLabels,
  type PriceLine,
} from './payment';
