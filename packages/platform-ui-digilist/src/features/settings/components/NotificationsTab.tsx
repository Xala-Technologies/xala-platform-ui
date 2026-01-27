/**
 * NotificationsTab - Pure Presentational Component
 *
 * REFACTORED: All SDK and i18n dependencies removed.
 * This component is now a pure presentational component that receives all data via props.
 *
 * @deprecated Use blocks/settings/NotificationsTab directly. This file is kept for reference only.
 * @module @xala-technologies/platform-ui/features/settings
 */

import { NotificationsTab as DSNotificationsTab } from '@xala-technologies/platform-ui-core';

// Re-export the pure presentational component
export { NotificationsTab } from '@xala-technologies/platform-ui-core';
export type {
  NotificationsTabProps,
  NotificationsTabLabels,
  NotificationSettingsData,
} from '@xala-technologies/platform-ui-core';

export default DSNotificationsTab;
