/**
 * Backoffice Settings Feature Types
 *
 * Types specific to the backoffice settings module UI.
 *
 * @module @xala-technologies/platform-ui/features/backoffice-settings
 */

// =============================================================================
// Settings Section Types
// =============================================================================

export type SettingsSection =
  | 'general'
  | 'branding'
  | 'booking'
  | 'integrations'
  | 'organization'
  | 'security';

export interface SettingsState {
  currentSection: SettingsSection;
  hasUnsavedChanges: boolean;
}

// =============================================================================
// General Settings Types
// =============================================================================

export type Locale = 'nb' | 'nn' | 'en';
export type Timezone = 'Europe/Oslo' | 'Europe/London' | 'America/New_York';
export type Currency = 'NOK' | 'EUR' | 'USD';
export type DateFormat = 'dd.MM.yyyy' | 'yyyy-MM-dd' | 'MM/dd/yyyy';
export type TimeFormat = '24h' | '12h';

export interface GeneralSettingsData {
  name: string;
  locale: Locale;
  timezone: Timezone;
  currency: Currency;
  dateFormat: DateFormat;
  timeFormat: TimeFormat;
}

// =============================================================================
// Branding Settings Types
// =============================================================================

export interface BrandingSettingsData {
  logo: string;
  primaryColor: string;
  secondaryColor: string;
  favicon: string;
}

// =============================================================================
// Booking Settings Types
// =============================================================================

export interface BookingSettingsData {
  autoConfirm: boolean;
  requireApproval: boolean;
  allowCancellation: boolean;
  cancellationDeadlineHours: number;
  maxAdvanceBookingDays: number;
  minAdvanceBookingHours: number;
  bufferTimeMinutes: number;
}

// =============================================================================
// Integration Types
// =============================================================================

export interface Integration {
  enabled: boolean;
  configuredAt?: string;
  lastSyncAt?: string;
}

export interface IntegrationsData {
  bankid?: Integration;
  idporten?: Integration;
  vipps?: Integration;
  rco?: Integration;
  googleCalendar?: Integration;
  outlook?: Integration;
  visma?: Integration;
  brreg?: Integration;
}

export type IntegrationProvider =
  | 'bankid'
  | 'idporten'
  | 'vipps'
  | 'rco'
  | 'googleCalendar'
  | 'outlook'
  | 'visma'
  | 'brreg';

// =============================================================================
// Default Values
// =============================================================================

export const DEFAULT_GENERAL_SETTINGS: GeneralSettingsData = {
  name: '',
  locale: 'nb',
  timezone: 'Europe/Oslo',
  currency: 'NOK',
  dateFormat: 'dd.MM.yyyy',
  timeFormat: '24h',
};

export const DEFAULT_BRANDING_SETTINGS: BrandingSettingsData = {
  logo: '',
  primaryColor: '#0062BA',
  secondaryColor: '#1E2B3C',
  favicon: '',
};

export const DEFAULT_BOOKING_SETTINGS: BookingSettingsData = {
  autoConfirm: false,
  requireApproval: true,
  allowCancellation: true,
  cancellationDeadlineHours: 24,
  maxAdvanceBookingDays: 365,
  minAdvanceBookingHours: 2,
  bufferTimeMinutes: 15,
};
