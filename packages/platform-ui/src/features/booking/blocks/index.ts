/**
 * @xala-technologies/platform-ui - Booking Blocks
 *
 * Pure presentational booking components.
 * All text content provided via props.
 */

export {
  BookingFormModal,
  type BookingFormModalProps,
  type TimeSlot,
  type ActivityType,
} from './BookingFormModal';

export {
  BookingConfirmation,
  type BookingConfirmationProps,
} from './BookingConfirmation';

export {
  BookingSuccess,
  type BookingSuccessProps,
  type BookingSuccessLabels,
  type BookingDetails,
} from './BookingSuccess';

export {
  PriceSummaryCard,
  type PriceSummaryCardProps,
  type PriceLineItem,
} from './PriceSummaryCard';

export {
  BookingModeSelector,
  createBookingModeOptions,
  type BookingModeSelectorProps,
  type BookingModeSelectorLabels,
  type BookingModeOption,
  type BookingModeType,
  type RecurringConstraints,
} from './BookingModeSelector';
