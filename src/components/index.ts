/**
 * Components Layer - Composed Multi-Component Compositions
 *
 * @module @xala-technologies/platform-ui/components
 */

export * from './AccessibilityStatement';
export * from './Accordion';
export * from './ActionMenu';
// Avatar exported from primitives
export { AvatarGroup, UserInfo } from './Avatar';
export type { AvatarGroupProps, UserInfoProps } from './Avatar';
// Badge re-exports from primitives, plus composed components
export { BadgeTag, NotificationBadge } from './Badge';
export type { TagProps, NotificationBadgeProps } from './Badge';
// Breadcrumbs exported from primitives  
export * from './CodeBlock';
export * from './CommandPalette';
export * from './DataTable';
export * from './DateRangePicker';
export * from './DetailField';
export * from './FormSection';
export * from './GlobalSearch';
export * from './InfoBox';
export * from './InfiniteScroll';
export * from './LoadingFallback';
export * from './Modal';
export * from './NotificationToast';
export * from './RichTextEditor';
export * from './SchemaForm';
export * from './SectionCard';
export * from './SimpleTabs';
export * from './Skeleton';
export * from './Slider';
export * from './StatCard';
export * from './TableConditionsFilter';
export * from './TemplateCanvas';
export * from './Timeline';
// Tooltip exported from primitives
export * from './TreeView';
export * from './UserMenu';

// Subdirectories
export * from './data-page/DataPageHeader';

export * from './help/HelpPanel';
export * from './MultiStepFormModal';
export * from './data-page/Wizard';
