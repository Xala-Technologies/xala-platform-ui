/**
 * Backoffice Calendar Components
 *
 * @module @xala-technologies/platform-ui/features/backoffice-calendar/components
 */

export {
  ConflictIndicator,
  getConflictStyles,
  getConflictColors,
  getBufferZoneStyles,
  getBufferZoneStyle,
  type ConflictIndicatorProps,
  type BufferZoneProps,
} from './ConflictIndicator';

export {
  TimelineView,
  type TimelineViewProps,
  type DragPreview,
  type DragHandlers,
} from './TimelineView';

export { EventDrawer, type EventDrawerProps } from './EventDrawer';

// COMMENTED OUT: Contains forbidden imports (@xala-technologies/platform)
// export {
//   CreateBlockModal,
//   type CreateBlockModalProps,
//   type CreateBlockData,
// } from './CreateBlockModal';
