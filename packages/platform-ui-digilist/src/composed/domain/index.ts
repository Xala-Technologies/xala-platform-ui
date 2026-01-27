/**
 * Domain-Specific Composed Components (Digilist/Rental Domain)
 *
 * These components are rental/booking domain-specific and have been
 * moved from platform-ui-core to platform-ui-digilist.
 */

export { AvailabilityLegend, defaultBookingLegendItems, defaultBookingLegendItemsEn } from './AvailabilityLegend';
export type { AvailabilityLegendProps } from './AvailabilityLegend';

export { BlockedPeriodsManager, validateBlockedPeriods } from './BlockedPeriodsManager';
export type { BlockedPeriodsManagerProps } from './BlockedPeriodsManager';

export { ResourceRequestStepper } from './ResourceRequestStepper';
export type { ResourceRequestStepperProps } from './ResourceRequestStepper';

export { OpeningHoursEditor, defaultWeekdaySchedule, emptySchedule, validateSchedule } from './OpeningHoursEditor';
export type { OpeningHoursEditorProps } from './OpeningHoursEditor';

export { ContactPersonsEditor } from './ContactPersonsEditor';
export type { ContactPersonsEditorProps } from './ContactPersonsEditor';

export { PricingTiersEditor } from './PricingTiersEditor';
export type { PricingTiersEditorProps } from './PricingTiersEditor';
