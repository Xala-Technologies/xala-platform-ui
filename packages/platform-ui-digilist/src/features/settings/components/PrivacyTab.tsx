/**
 * PrivacyTab - Pure Presentational Component
 *
 * REFACTORED: All SDK and i18n dependencies removed.
 * This component is now a pure presentational component that receives all data via props.
 *
 * @deprecated Use blocks/settings/PrivacyTab directly. This file is kept for reference only.
 * @module @xala-technologies/platform-ui/features/settings
 */

import { PrivacyTab as DSPrivacyTab } from '../../../blocks/settings';

// Re-export the pure presentational component
export { PrivacyTab } from '../../../blocks/settings';
export type {
  PrivacyTabProps,
  PrivacyTabLabels,
  PrivacyConsentSettings,
} from '../../../blocks/settings';

export default DSPrivacyTab;
