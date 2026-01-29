/**
 * Backoffice Components
 */

// Layout
export * from './layout';

// Organizations
export * from './organizations';

// Seasons
export * from './seasons';

// GDPR
export * from './gdpr';

// Bookings
export * from './bookings';

// Dashboard
export * from './dashboard';

// Integrations
export * from './integrations';

// Users
export * from './users';

// Support
export * from './support';

// Root components
// COMMENTED OUT: Depends on RentalObjectAvailabilityCalendar from rental-objects feature (not yet refactored)
// export { CalendarSection } from './CalendarSection';
export { RefundDialog } from './RefundDialog';
export { RoleSelector } from './RoleSelector';
export { RoleSwitcher } from './RoleSwitcher';
export { SavedFilters } from './SavedFilters';
// COMMENTED OUT: Depends on BookingStatusBadge from booking feature (not yet refactored)
// export { SearchResults } from './SearchResults';
export { PaymentDetailsDrawer } from './PaymentDetailsDrawer';
export { IntegrationConfigModal } from './IntegrationConfigModal';
