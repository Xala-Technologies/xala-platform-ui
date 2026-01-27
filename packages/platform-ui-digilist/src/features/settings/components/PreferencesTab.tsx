/**
 * PreferencesTab - Pure Presentational Component
 *
 * REFACTORED: All SDK and i18n dependencies removed.
 * This component is now a pure presentational component that receives all data via props.
 *
 * @deprecated Use blocks/settings/PreferencesTab directly. This file is kept for reference only.
 * @module @xala-technologies/platform-ui/features/settings
 */

import { PreferencesTab as DSPreferencesTab } from '@xala-technologies/platform-ui-core';

// Re-export the pure presentational component
export { PreferencesTab } from '@xala-technologies/platform-ui-core';
export type { PreferencesTabProps, PreferencesTabLabels } from '@xala-technologies/platform-ui-core';

export default DSPreferencesTab;
