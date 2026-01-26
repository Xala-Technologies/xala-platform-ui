/**
 * Booking Sidebar Components
 *
 * Pure presentational components for the booking sidebar/flow.
 * All text content provided via props.
 *
 * @module @xala-technologies/platform-ui/features/booking/components/sidebar
 */

// =============================================================================
// Visibility & Context
// =============================================================================

export {
  BookingVisibilitySelector,
  type BookingVisibility,
  type BookingVisibilitySelectorProps,
} from './BookingVisibilitySelector';

export {
  BookingContextSelector,
  type BookingContext,
  type BookingContextType,
  type BookingContextSelectorProps,
  type OrganizationMembership,
} from './BookingContextSelector';

// =============================================================================
// Stepper & Navigation
// =============================================================================

export {
  BookingStepperHeader,
  type BookingStep,
  type BookingStepIcon,
  type BookingStepperHeaderProps,
  type BookingStepperHeaderLabels,
} from './BookingStepperHeader';

// =============================================================================
// Pricing
// =============================================================================

export {
  PriceBreakdown,
  type PriceBreakdownProps,
  type PriceBreakdownData,
  type PriceLineItem,
} from './PriceBreakdown';

export {
  BookingAddOnsSelector,
  type BookingAddOnsSelectorProps,
  type AddOn,
  type SelectedAddOn,
} from './BookingAddOnsSelector';

// =============================================================================
// Recurring Booking
// =============================================================================

export {
  RecurringBuilder,
  type RecurringBuilderProps,
  type RecurringPattern,
  type RecurringFrequency,
  type RecurringEndCondition,
  type RecurringConstraints,
} from './RecurringBuilder';

export {
  RecurringPreview,
  type RecurringPreviewProps,
  type RecurringOccurrence,
  type RecurringSummary,
  type OccurrenceStatus,
} from './RecurringPreview';

export {
  ConflictResolver,
  type ConflictResolverProps,
  type ConflictResolution,
  type AlternativeSlot,
} from './ConflictResolver';

// =============================================================================
// Booking Flow Steps
// =============================================================================

export {
  BookingPricingStep,
  type BookingPricingStepProps,
  type PriceGroup,
  type AdditionalService,
} from './BookingPricingStep';

export {
  BookingConfirmationStep,
  type BookingConfirmationStepProps,
  type FlowSelectedSlot,
  type BookingFlowState,
  type LoginWithFlowContextOptions,
  type Organization,
} from './BookingConfirmationStep';

// =============================================================================
// Cart & Slot Selection
// =============================================================================

export {
  BookingCartSidebar,
  type BookingCartSidebarProps,
  type CartPriceGroup,
  type CartAdditionalService,
  type CartSlotDetail,
} from './BookingCartSidebar';

export {
  BookingSelectedSlotsSidebar,
  type BookingSelectedSlotsSidebarProps,
  type SelectedSlotDetail,
} from './BookingSelectedSlotsSidebar';

// =============================================================================
// Dialogs
// =============================================================================

export {
  BookingAvailabilityConflictDialog,
  type BookingAvailabilityConflictDialogProps,
  type SlotAvailability,
} from './BookingAvailabilityConflictDialog';
