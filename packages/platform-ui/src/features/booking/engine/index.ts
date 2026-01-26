/**
 * Booking Engine
 *
 * Main booking engine and mode-specific views.
 * Pure presentational components - all text provided via props.
 */

// =============================================================================
// Main Engine
// =============================================================================

export { BookingEngine, type BookingEngineProps } from './BookingEngine';

export { BookingPage, type BookingPageProps } from './BookingPage';

// =============================================================================
// Mode Views
// =============================================================================

export { DailyModeView, type DailyModeViewProps } from './modes/DailyModeView';

export { DateRangeModeView, type DateRangeModeViewProps } from './modes/DateRangeModeView';

export { EventModeView, type EventModeViewProps } from './modes/EventModeView';

export { InstantModeView, type InstantModeViewProps } from './modes/InstantModeView';

export { RecurringModeView, type RecurringModeViewProps } from './modes/RecurringModeView';

// =============================================================================
// Step Components
// =============================================================================

export { BookingFormStep, type BookingFormStepProps } from './steps/BookingFormStep';

export { BookingConfirmStep, type BookingConfirmStepProps } from './steps/BookingConfirmStep';

// =============================================================================
// Support Components
// =============================================================================

export { PriceSummary, type PriceSummaryProps } from './components/PriceSummary';

// =============================================================================
// Utilities
// =============================================================================

export { getModeLabel, getModeDescription, formatPrice, formatPriceUnit } from './utils';

// =============================================================================
// Styles
// =============================================================================

export * from './styles';
