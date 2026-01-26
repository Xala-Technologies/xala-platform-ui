/**
 * Booking Feature
 *
 * Pure presentational booking components.
 * All text content provided via props/labels.
 *
 * ## Usage Pattern
 *
 * ```tsx
 * import { BookingSuccess, type BookingSuccessLabels } from '@xala-technologies/platform-ui/features/booking';
 *
 * const labels: BookingSuccessLabels = {
 *   heading: 'Booking sent!',
 *   description: 'Your request has been received.',
 *   // ... other labels
 * };
 *
 * <BookingSuccess
 *   bookingReference="BK-12345"
 *   bookingDetails={details}
 *   labels={labels}
 * />
 * ```
 */

// =============================================================================
// Domain-to-Display Mappers (DEPRECATED - Commented out for now)
// =============================================================================

// COMMENTED OUT: Mappers have export errors - functions don't exist
// export {
//   // Card mappers
//   mapBookingToCardDisplay,
//   mapBookingsToCardDisplays,
//   type BookingCardDisplayProps,
//   // Details mappers
//   mapBookingToDetailsDisplay,
//   type BookingDetailsDisplayProps,
//   // Price summary mapper
//   mapBookingToPriceSummary,
//   type PriceSummaryLine,
//   // Calendar event mapper
//   mapCalendarEventToDisplay,
//   type CalendarEventDisplayProps,
//   // Status types
//   type BookingStatusColor,
//   type StatusBadgeData,
// } from './mappers';

// =============================================================================
// Blocks
// =============================================================================

export {
  // Modal/Form components
  BookingFormModal,
  type BookingFormModalProps,
  type TimeSlot,
  type ActivityType,

  // Confirmation components
  BookingConfirmation,
  type BookingConfirmationProps,

  BookingSuccess,
  type BookingSuccessProps,
  type BookingSuccessLabels,
  type BookingDetails,

  // Price display
  PriceSummaryCard,
  type PriceSummaryCardProps,
  type PriceLineItem,

  // Mode selector (unified component)
  BookingModeSelector,
  createBookingModeOptions,
  type BookingModeSelectorProps,
  type BookingModeSelectorLabels,
  type BookingModeOption,
  type BookingModeType,
  type RecurringConstraints,
} from './blocks';

// =============================================================================
// Booking Engine (COMMENTED OUT - Contains forbidden imports)
// =============================================================================

// COMMENTED OUT: Engine components still have @digilist/client-sdk and @digilist/contracts imports
// export {
//   // Main component
//   BookingEngine,
//   type BookingEngineProps,
//   BookingPage,
//   type BookingPageProps,
//   // Mode views
//   DailyModeView,
//   type DailyModeViewProps,
//   DateRangeModeView,
//   type DateRangeModeViewProps,
//   EventModeView,
//   type EventModeViewProps,
//   InstantModeView,
//   type InstantModeViewProps,
//   RecurringModeView,
//   type RecurringModeViewProps,
//   // Step components
//   BookingFormStep,
//   type BookingFormStepProps,
//   BookingConfirmStep,
//   type BookingConfirmStepProps,
//   // Support components
//   PriceSummary,
//   type PriceSummaryProps,
//   // Utilities
//   getModeLabel,
//   getModeDescription,
//   formatPrice,
//   formatPriceUnit,
// } from './engine';

// =============================================================================
// Sidebar Components
// =============================================================================

export {
  // Visibility & Context
  BookingVisibilitySelector,
  type BookingVisibility,
  type BookingVisibilitySelectorProps,
  BookingContextSelector,
  type BookingContext,
  type BookingContextType,
  type BookingContextSelectorProps,
  type OrganizationMembership,

  // Stepper & Navigation
  BookingStepperHeader,
  type BookingStep,
  type BookingStepIcon,
  type BookingStepperHeaderProps,
  type BookingStepperHeaderLabels,

  // Pricing
  PriceBreakdown,
  type PriceBreakdownProps,
  type PriceBreakdownData,
  // Note: PriceLineItem is already exported from blocks
  BookingAddOnsSelector,
  type BookingAddOnsSelectorProps,
  type AddOn,
  type SelectedAddOn,

  // Recurring Booking
  RecurringBuilder,
  type RecurringBuilderProps,
  type RecurringPattern,
  type RecurringFrequency,
  type RecurringEndCondition,
  // Note: RecurringConstraints already exported from blocks
  RecurringPreview,
  type RecurringPreviewProps,
  type RecurringOccurrence,
  type RecurringSummary,
  type OccurrenceStatus,
  ConflictResolver,
  type ConflictResolverProps,
  type ConflictResolution,
  type AlternativeSlot,

  // Booking Flow Steps
  BookingPricingStep,
  type BookingPricingStepProps,
  type PriceGroup,
  type AdditionalService,
  BookingConfirmationStep,
  type BookingConfirmationStepProps,
  type FlowSelectedSlot,
  type BookingFlowState,
  type LoginWithFlowContextOptions,
  type Organization,

  // Cart & Slot Selection
  BookingCartSidebar,
  type BookingCartSidebarProps,
  type CartPriceGroup,
  type CartAdditionalService,
  type CartSlotDetail,
  BookingSelectedSlotsSidebar,
  type BookingSelectedSlotsSidebarProps,
  type SelectedSlotDetail,

  // Dialogs
  BookingAvailabilityConflictDialog,
  type BookingAvailabilityConflictDialogProps,
  type SlotAvailability,
} from './components';
