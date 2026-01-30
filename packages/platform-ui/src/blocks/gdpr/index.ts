/**
 * GDPR Blocks
 *
 * Privacy and data management components
 */

// Consent Management
export { ConsentManager } from './ConsentManager';
export { ConsentBanner, DEFAULT_CONSENT_BANNER_LABELS } from './ConsentPopup';
export type { ConsentBannerProps, ConsentBannerLabels } from './ConsentPopup';
// Backward compatibility alias
export { ConsentBanner as ConsentPopup } from './ConsentPopup';
export {
  ConsentPreferences,
  ConsentSettings,
  DEFAULT_CONSENT_PREFERENCES_LABELS,
  DEFAULT_CONSENT_OPTIONS,
} from './ConsentSettings';
export type {
  ConsentPreferencesProps,
  ConsentPreferencesLabels,
  ConsentOption,
} from './ConsentSettings';

// Data Export
export { DataExportCard } from './DataExportCard';

// Account Deletion
export { DeleteAccountCard } from './DeleteAccountCard';

// Data Subject Requests
export { DataSubjectRequestForm } from './DataSubjectRequestForm';
export { RequestStatusBadge } from './RequestStatusBadge';
