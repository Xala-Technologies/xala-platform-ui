/**
 * Rental Object Detail Types
 * 
 * Re-exports types from core for consistency.
 * Do NOT define local calendar/booking types - use core types.
 */

// Base ViewModel types from the main index
export * from './index';

// DO NOT define CalendarCell, CalendarLegendItem, etc. here
// Use types from @xala-technologies/platform-ui-core directly in features
// This file only contains digilist-specific supplemental types

// =============================================================================
// Digilist-Specific Types (not in core)
// =============================================================================

// These are placeholder supplemental types that may be needed
// by the rental-object-details feature but aren't in core

export interface RentalObjectDetailExtra {
    // Extend as needed for digilist-specific fields
    customField?: string;
}
