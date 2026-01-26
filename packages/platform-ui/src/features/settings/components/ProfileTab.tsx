/**
 * ProfileTab - Pure Presentational Component
 *
 * REFACTORED: All SDK and i18n dependencies removed.
 * This component is now a pure presentational component that receives all data via props.
 *
 * @deprecated Use blocks/settings/ProfileTab directly. This file is kept for reference only.
 * @module @xala-technologies/platform-ui/features/settings
 */

import { ProfileTab as DSProfileTab } from '../../../blocks/settings';

// Re-export the pure presentational component
export { ProfileTab } from '../../../blocks/settings';
export type { ProfileTabProps, ProfileData, ProfileAddress, ProfileTabLabels } from '../../../blocks/settings';

export default DSProfileTab;
