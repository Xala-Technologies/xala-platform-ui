/**
 * @xala-technologies/platform-ui - Rental Object Details Feature Kit
 *
 * Pure presentational components for rental object detail pages.
 * All components receive data/handlers via props and text via labels.
 * No SDK hooks, no i18n, no business logic.
 *
 * @module @xala-technologies/platform-ui/features/rental-object-details
 *
 * ## Usage
 *
 * ```tsx
 * import {
 *   OverviewTab,
 *   RulesTab,
 *   FaqTab,
 *   ActivityTab,
 *   RentalObjectHeader,
 *   RentalObjectDetailsLayout,
 *   ContactWidget,
 *   OpeningHoursWidget,
 *   MapWidget,
 *   type OverviewTabLabels,
 *   type RulesTabLabels,
 * } from '@xala-technologies/platform-ui/features/rental-object-details';
 *
 * function RentalObjectPage({ rentalObject }) {
 *   const t = useT(); // Your i18n hook
 *
 *   const overviewLabels: OverviewTabLabels = {
 *     descriptionHeading: t('overview.description'),
 *     capacityMaxAllowed: t('overview.capacity.maxAllowed'),
 *     capacityPeople: t('overview.capacity.people'),
 *     amenitiesHeading: t('overview.amenities'),
 *     additionalServicesHeading: t('overview.additionalServices'),
 *     includedEquipmentHeading: t('overview.includedEquipment'),
 *     highlightsHeading: t('overview.highlights'),
 *     noInfoMessage: t('overview.noInfo'),
 *     noDescriptionMessage: t('overview.noDescription'),
 *   };
 *
 *   return (
 *     <RentalObjectDetailsLayout
 *       header={<RentalObjectHeader name={rentalObject.name} labels={headerLabels} />}
 *       mainContent={
 *         <OverviewTab
 *           metadata={rentalObject.metadata}
 *           rentalObjectType={rentalObject.type}
 *           capacity={rentalObject.capacity}
 *           labels={overviewLabels}
 *         />
 *       }
 *       sidebar={<ContactWidget contact={rentalObject.contact} labels={contactLabels} />}
 *       labels={layoutLabels}
 *     />
 *   );
 * }
 * ```
 *
 * ## Components
 *
 * ### Tab Components
 * - `OverviewTab` - Description, capacity, amenities, services
 * - `RulesTab` - Rules and regulations with categorized icons
 * - `FaqTab` - FAQ accordion
 * - `ActivityTab` - Events/rental history
 *
 * ### Layout Components
 * - `RentalObjectHeader` - Header with title, breadcrumb, share button
 * - `RentalObjectDetailsLayout` - Main layout with sidebar
 *
 * ### Sidebar Widgets
 * - `ContactWidget` - Contact information display
 * - `OpeningHoursWidget` - Opening hours table
 * - `MapWidget` - Map with coordinates
 *
 * ### Booking Components
 * - `CalendarSection` - Availability calendar
 * - `PaymentSection` - Price breakdown
 * - `RecurringPatternBuilder` - Recurring booking pattern builder
 * - `RecurringPreviewTable` - Preview of recurring bookings
 * - `RecurringResultSummary` - Summary of recurring booking results
 *
 * ## Presenters
 * - `createPresenter(type)` - Creates type-specific presenter
 * - `getRentalObjectTypeLabel(type)` - Get rental object type label
 * - `getBookingModeLabel(mode)` - Get booking mode label
 */

// =============================================================================
// Components
// =============================================================================

export {
  // Tab Components
  OverviewTab,
  RulesTab,
  FaqTab,
  ActivityTab,
  // Layout Components
  RentalObjectHeader,
  RentalObjectDetailsLayout,
  // Sidebar Widgets
  ContactWidget,
  OpeningHoursWidget,
  MapWidget,
  // Recurring Components
  RecurringPatternBuilder,
  RecurringPreviewTable,
  RecurringResultSummary,
  DEFAULT_RECURRING_PATTERN,
  // Calendar & Payment
  CalendarSection,
  PaymentSection,
} from './components';

// =============================================================================
// Component Props and Labels
// =============================================================================

export type {
  // Tab Components
  OverviewTabProps,
  OverviewTabLabels,
  RulesTabProps,
  RulesTabLabels,
  FaqTabProps,
  FaqTabLabels,
  ActivityTabProps,
  ActivityTabLabels,
  Amenity,
  AdditionalService,
  Rule,
  FAQItem,
  // Layout Components
  RentalObjectHeaderProps,
  RentalObjectHeaderLabels,
  RentalObjectDetailsLayoutProps,
  LayoutLabels,
  // Sidebar Widgets
  ContactWidgetProps,
  ContactWidgetLabels,
  OpeningHoursWidgetProps,
  OpeningHoursWidgetLabels,
  OpeningHours,
  DayHours,
  HoursException,
  MapWidgetProps,
  MapWidgetLabels,
  MapCoordinates,
  // Recurring Components
  RecurringPatternBuilderProps,
  RecurringPatternBuilderLabels,
  RecurringPatternData,
  RecurringPreviewTableProps,
  RecurringPreviewTableLabels,
  RecurringResultSummaryProps,
  RecurringResultSummaryLabels,
  // Calendar & Payment
  CalendarSectionProps,
  CalendarSectionLabels,
  QuoteData,
  PaymentSectionProps,
  PaymentSectionLabels,
  PriceLine,
} from './components';

// =============================================================================
// Types
// =============================================================================

export type {
  BookingMode,
  ApprovalMode,
  IncludedEquipment,
  RentalObjectEvent,
  RentalHistoryItem,
  ActivityData,
  KeyFacts,
  RentalObjectMetadata,
  RentalObjectAddress,
} from './types';

// =============================================================================
// Presenters
// =============================================================================

export {
  RentalObjectTypePresenter,
  createPresenter,
  getRentalObjectTypeLabel,
  getBookingModeLabel,
  type KeyFactConfig,
  type ActivityTabConfig,
  type RentalObjectTypeConfig,
} from './presenters';

// =============================================================================
// Mappers
// =============================================================================

export {
  mapContactInfoToCardProps,
  mapOpeningHoursToCardProps,
  type ContactInfoDTO,
  type OpeningHoursDTO,
  type DayHoursDTO,
} from './mappers';

// =============================================================================
// Calendar Types - Import from Core
// =============================================================================
// Calendar types (CalendarMode, CalendarCell, CalendarSelection, etc.) 
// should be imported directly from @xala-technologies/platform-ui-core
// 
// Example:
// import { CalendarMode, CalendarCell } from '@xala-technologies/platform-ui-core';

