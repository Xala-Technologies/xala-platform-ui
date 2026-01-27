/**
 * @xala-technologies/platform-ui-digilist
 *
 * Digilist-specific UI components and features - Extension Package.
 * Built on @xala-technologies/platform-ui-core.
 *
 * This package contains business-specific UI components for the Digilist domain:
 * - Booking engine and calendar features
 * - Rental object management
 * - Seasons and venues
 * - Reviews and ratings
 * - GDPR compliance
 * - Organizations and settings
 *
 * ## Import Examples
 *
 * ```tsx
 * // Feature-specific imports
 * import { BookingEngine } from '@xala-technologies/platform-ui-digilist/features/booking';
 * import { CalendarSection } from '@xala-technologies/platform-ui-digilist/features/calendar';
 * import { SeasonCard } from '@xala-technologies/platform-ui-digilist/features/seasons';
 * ```
 */

// =============================================================================
// Re-export core for convenience (optional - apps can import directly from core)
// =============================================================================
// Note: We do NOT re-export core here to keep bundle sizes small.
// Apps should import universal components from @xala-technologies/platform-ui-core

// =============================================================================
// ViewModel Types for props-in/events-out pattern
// =============================================================================
export * from './types';

// =============================================================================
// i18n Registration
// =============================================================================
// Digilist UI provides i18n strings for business-specific components
// Apps must call this during bootstrap after creating the i18n instance
export function registerDigilistI18n(i18n: { addResourceBundle: (lng: string, ns: string, resources: object) => void }): void {
    // Register digilist UI namespace with business-specific strings
    const digilistResources = {
        booking: {
            selectSlot: 'Velg tidspunkt',
            selectDate: 'Velg dato',
            selectPeriod: 'Velg periode',
            selectTickets: 'Velg billetter',
            selectSeason: 'Velg sesong',
            instantBook: 'Bestill nå',
            continue: 'Fortsett',
            confirm: 'Bekreft booking',
            back: 'Tilbake',
            noAvailability: 'Ingen ledige tidspunkter',
            priceTotal: 'Totalt',
            pricePerUnit: 'Pris per enhet',
        },
        calendar: {
            noAvailability: 'Ingen tilgjengelighet',
            selectionChanged: 'Tilgjengeligheten har endret seg',
            couldNotLoadSettings: 'Kunne ikke laste kalenderinnstillinger',
            couldNotLoadAvailability: 'Kunne ikke laste tilgjengelighet',
            available: 'Ledig',
            booked: 'Opptatt',
            blocked: 'Blokkert',
        },
        seasons: {
            active: 'Aktiv',
            upcoming: 'Kommende',
            ended: 'Avsluttet',
            draft: 'Utkast',
        },
        rentalObjects: {
            available: 'Tilgjengelig',
            unavailable: 'Ikke tilgjengelig',
            maintenance: 'Under vedlikehold',
        },
        reviews: {
            writeReview: 'Skriv anmeldelse',
            rating: 'Vurdering',
            noReviews: 'Ingen anmeldelser ennå',
        },
    };

    i18n.addResourceBundle('nb', 'digilist', digilistResources);
    i18n.addResourceBundle('no', 'digilist', digilistResources);

    // English fallback
    i18n.addResourceBundle('en', 'digilist', {
        booking: {
            selectSlot: 'Select time slot',
            selectDate: 'Select date',
            selectPeriod: 'Select period',
            selectTickets: 'Select tickets',
            selectSeason: 'Select season',
            instantBook: 'Book now',
            continue: 'Continue',
            confirm: 'Confirm booking',
            back: 'Back',
            noAvailability: 'No available time slots',
            priceTotal: 'Total',
            pricePerUnit: 'Price per unit',
        },
        calendar: {
            noAvailability: 'No availability',
            selectionChanged: 'Availability has changed',
            couldNotLoadSettings: 'Could not load calendar settings',
            couldNotLoadAvailability: 'Could not load availability',
            available: 'Available',
            booked: 'Booked',
            blocked: 'Blocked',
        },
        seasons: {
            active: 'Active',
            upcoming: 'Upcoming',
            ended: 'Ended',
            draft: 'Draft',
        },
        rentalObjects: {
            available: 'Available',
            unavailable: 'Unavailable',
            maintenance: 'Under maintenance',
        },
        reviews: {
            writeReview: 'Write a review',
            rating: 'Rating',
            noReviews: 'No reviews yet',
        },
    });
}
