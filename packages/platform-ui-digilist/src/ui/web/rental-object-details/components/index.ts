/**
 * Components for the rental object details feature.
 */

// Main layout
export { RentalObjectDetailsLayout, type RentalObjectDetailsLayoutProps } from './RentalObjectDetailsLayout';
export { RentalObjectHeader, type RentalObjectHeaderProps, KeyFactsRow, type KeyFactsRowProps, FavoriteButton, type FavoriteButtonProps, ShareButton, type ShareButtonProps } from './RentalObjectHeader';

// Tab components
export { OverviewTab, type OverviewTabProps } from './OverviewTab';
export { ActivityTab, type ActivityTabProps } from './ActivityTab';
export { RulesTab, type RulesTabProps } from './RulesTab';
export { FaqTab, type FaqTabProps } from './FaqTab';

// Calendar - re-export from shared
export { CalendarSection, type CalendarSectionProps } from '../../../shared/components/CalendarSection';

// Sidebar components
export { ContactWidget, type ContactWidgetProps } from './Sidebar/ContactWidget';
export { MapWidget, type MapWidgetProps } from './Sidebar/MapWidget';
export { OpeningHoursWidget, type OpeningHoursWidgetProps } from './Sidebar/OpeningHoursWidget';
export { BookingWidgetPlacement, type BookingWidgetPlacementProps } from './Sidebar/BookingWidgetPlacement';
