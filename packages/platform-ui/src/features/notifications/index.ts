/**
 * @xala-technologies/platform-ui - Notifications Feature
 *
 * Pure presentational notification components.
 * All notification components are located in blocks/ and composed/ directories.
 *
 * @module @xala-technologies/platform-ui/features/notifications
 */

// Re-export from blocks
export {
  NotificationBell,
  type NotificationBellProps,
  NotificationCenter,
  type NotificationCenterProps,
  type NotificationCenterLabels,
  PushNotificationPrompt,
  type PushNotificationPromptProps,
  type PushNotificationPromptLabels,
  NotificationItemBlock,
  type NotificationItemProps,
  type NotificationItemLabels,
} from '../../blocks';

// Note: NotificationToast is in composed but not exported from the composed index yet
// Import directly from @xala-technologies/platform-ui/composed if needed

// Note: Notification types should be defined by the application or SDK layer
// This feature only provides UI components
