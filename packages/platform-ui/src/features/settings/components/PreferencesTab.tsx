/**
 * PreferencesTab - Pure Presentational Component
 *
 * REFACTORED: All SDK and i18n dependencies removed.
 * This component is now a pure presentational component that receives all data via props.
 *
 * @deprecated Use blocks/settings/PreferencesTab directly. This file is kept for reference only.
 * @module @xala-technologies/platform-ui/features/settings
 */

import { PreferencesTab as DSPreferencesTab } from '../../../blocks/settings';

// Re-export the pure presentational component
export { PreferencesTab } from '../../../blocks/settings';
export type { PreferencesTabProps, PreferencesTabLabels } from '../../../blocks/settings';

export default DSPreferencesTab;
