/**
 * ProfileTab - Pure Presentational Component
 *
 * REFACTORED: All SDK and i18n dependencies removed.
 * This component is now a pure presentational component that receives all data via props.
 *
 * @deprecated Use blocks/settings/ProfileTab directly. This file is kept for reference only.
 * @module @xala-technologies/platform-ui/features/settings
 */

import { ProfileTab as DSProfileTab } from '@xala-technologies/platform-ui-core';

// Re-export the pure presentational component
export { ProfileTab } from '@xala-technologies/platform-ui-core';
export type {
  ProfileTabProps,
  ProfileData,
  ProfileAddress,
  ProfileTabLabels,
} from '@xala-technologies/platform-ui-core';

export default DSProfileTab;
