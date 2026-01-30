/**
 * Composed Components
 *
 * Higher-level components built from primitives
 */

export { ContentLayout } from './content-layout';
export type { ContentLayoutProps } from './content-layout';

export { ContentSection } from './content-section';
export type { ContentSectionProps } from './content-section';

export { PageHeader } from './page-header';
export type { PageHeaderProps } from './page-header';

// Header Components
export { AppHeader } from './header';
export type { AppHeaderProps } from './header';

export {
  HeaderLogo,
  HeaderSearch,
  HeaderActions,
  HeaderActionButton,
  HeaderIconButton,
  HeaderThemeToggle,
  HeaderLanguageSwitch,
  HeaderLoginButton,
} from './header-parts';
export type {
  HeaderLogoProps,
  HeaderSearchProps,
  HeaderActionsProps,
  HeaderIconButtonProps,
  HeaderThemeToggleProps,
  HeaderLanguageSwitchProps,
  HeaderLoginButtonProps,
  SearchResultItem,
  SearchResultGroup,
} from './header-parts';

// Navigation
export { Navigation, NavigationLink } from './navigation';
export type { NavigationProps, NavigationLinkProps } from './navigation';

// Filter Bar
export { FilterBar } from './filter-bar';
export type { FilterBarProps } from './filter-bar';

// Filter Types
export type {
  ResourceType,
  PriceUnit,
  AvailabilityStatus,
  FilterOption,
  PriceRangeFilter,
  CapacityRangeFilter,
  RatingFilter,
  LocationFilter,
  AmenitiesFilter,
  DateTimeFilter,
  FilterState,
  FilterConfig,
} from '../types/filters';
export { mockFilterData } from '../types/filters';

// Drawer / Slide Panel
export { Drawer, DrawerSection, DrawerItem, DrawerEmptyState } from './Drawer';
export type {
  DrawerProps,
  DrawerPosition,
  DrawerSize,
  DrawerSectionProps,
  DrawerItemProps,
  DrawerEmptyStateProps,
} from './Drawer';

// Breadcrumb
export { Breadcrumb } from './Breadcrumb';
export type { BreadcrumbProps } from './Breadcrumb';

// Note: ResourceRequestStepper now re-exported from @xala-technologies/platform-ui-digilist
export { WizardStepper } from './WizardStepper';
export type {
  WizardStepperProps,
  WizardStep,
  WizardStepState,
  WizardStepperLabels,
} from './WizardStepper';

// Dialogs
export { ConfirmDialog, AlertDialog, DialogProvider, useDialog } from './dialogs';
export type { ConfirmDialogProps, AlertDialogProps, DialogVariant } from './dialogs';

// Mobile Navigation
export { MobileNav, MobileNavToggle } from './mobile-nav';
export type {
  MobileNavProps,
  MobileNavToggleProps,
  MobileNavItem,
  MobileNavSection,
} from './mobile-nav';

export { BottomNavigation } from './bottom-navigation';
export type { BottomNavigationProps, BottomNavigationItem } from './bottom-navigation';

// Language Switcher
export { LanguageSwitcher, ConnectedLanguageSwitcher } from './LanguageSwitcher';
export type {
  LanguageSwitcherProps,
  LanguageSwitcherVariant,
  LanguageSwitcherSize,
  LocaleLabels,
  ConnectedLanguageSwitcherProps,
} from './LanguageSwitcher';

// ResourceCalendar (XALA-compliant shared calendar)
export { ResourceCalendar } from './ResourceCalendar';
export type {
  ResourceCalendarProps,
  CalendarSlot,
  CalendarMode,
  SlotStatus as CalendarSlotStatus,
  CalendarAction,
  CalendarConfig,
  CalendarSelection,
} from './ResourceCalendar';

// Demo Login Dialog
export { DemoLoginDialog } from './DemoLoginDialog';
export type { DemoLoginDialogProps, DemoLoginFormData } from './DemoLoginDialog';

// Demo Role Switcher (one-click demo login by role)
export { DemoRoleSwitcher } from './DemoRoleSwitcher';
export type { DemoRoleSwitcherProps, DemoRoleKey, DemoRoleOption } from './DemoRoleSwitcher';

// Global Search
export { GlobalSearch } from './GlobalSearch';

// Protected Route
export { ProtectedRoute } from './ProtectedRoute';
export type { ProtectedRouteProps, ProtectedRouteLoginState } from './ProtectedRoute';

// Data Page Components
export {
  EmptyState,
  StatusTabs,
  BulkActionsBar,
  FilterChips,
  DataPageHeader,
  DataPageToolbar,
  Wizard,
  WizardNavigation,
} from './data-page';
export type {
  EmptyStateProps,
  EmptyStateVariant,
  StatusTabsProps,
  StatusTabItem,
  BulkActionsBarProps,
  BulkAction,
  FilterChipsProps,
  FilterChipItem,
  DataPageHeaderProps,
  DataPageToolbarProps,
  FilterConfig as DataPageFilterConfig,
  ViewMode,
  WizardProps,
  WizardNavigationProps,
} from './data-page';

// DataTable Components
export { DataTable } from './DataTable';
export type { DataTableProps, ColumnDef, SortDirection } from './DataTable';

// TableFilter Component
export { TableFilter } from './TableFilter';
export type { TableFilterProps, FilterValues } from './TableFilter';
export type {
  FilterConfig as TableFilterDef,
  FilterOption as TableFilterOption,
} from './TableFilter';

// UserMenu Component
export { UserMenu } from './UserMenu';
export type { UserMenuProps, UserMenuItem, UserMenuUser } from './UserMenu';

// ListToolbar Component
export {
  ListToolbar,
  type ListToolbarProps,
  type ListToolbarFilter,
  type ListToolbarFilterOption,
  type ListToolbarSearchConfig,
  type ListToolbarSortOption,
} from './ListToolbar';

// DashboardHeader moved to shells/ (uses blocks-level components)

export { DashboardPageHeader } from './DashboardPageHeader';
export type {
  DashboardPageHeaderProps,
  PageHeaderMetaItem,
  PageHeaderTab,
} from './DashboardPageHeader';

// Toast Notifications
export { ToastProvider, useToast } from './Toast';
export type {
  ToastOptions,
  Toast,
  ToastVariant,
  ToastPosition,
  ToastContextValue,
  ToastProviderProps,
} from './Toast';

// Alert - Use Designsystemet Alert (exported from primitives)
// Custom Alert implementation removed to avoid conflicts with Designsystemet
// export { Alert } from './Alert';
// export type { AlertProps, AlertVariant } from './Alert';

// Modal
export { Modal, ModalHeader, ModalBody, ModalFooter } from './Modal';
export type {
  ModalProps,
  ModalSize,
  ModalHeaderProps,
  ModalBodyProps,
  ModalFooterProps,
} from './Modal';

// Table Conditions Filter (advanced filter builder)
export { TableConditionsFilter, useTableConditions } from './TableConditionsFilter';
export type {
  TableConditionsFilterProps,
  Condition,
  ConditionField,
  ConditionFieldOption,
  ConditionOperator,
  FieldType,
  LogicOperator,
  UseTableConditionsReturn,
} from './TableConditionsFilter';

// Filter Chips Bar (active filters display)
export { FilterChipsBar } from './FilterChipsBar';
export type { FilterChipsBarProps, ActiveFilter } from './FilterChipsBar';

// Filter Panel (dropdown filter builder)
export { FilterPanel } from './FilterPanel';
export type {
  FilterPanelProps,
  FilterCondition,
  FilterField,
  FilterFieldOption,
  FilterFieldType,
  FilterLogic,
  FilterOperator,
} from './FilterPanel';

// Action Button Group (consistent table actions)
export { ActionButtonGroup, TableActions } from './ActionButtonGroup';
export type {
  ActionButtonGroupProps,
  TableActionsProps,
  Action,
  ActionType,
} from './ActionButtonGroup';

// Stat Card (dashboard statistics)
export { StatCard, StatCardGrid } from './StatCard';
export type { StatCardProps, StatCardGridProps, StatTrend, StatVariant } from './StatCard';

// Section Card (page sections)
export {
  SectionCard,
  SectionCardHeader,
  SectionCardContent,
  SectionCardFooter,
} from './SectionCard';
export type {
  SectionCardProps,
  SectionCardHeaderProps,
  SectionCardContentProps,
  SectionCardFooterProps,
} from './SectionCard';

// Avatar - Use Designsystemet Avatar (exported from primitives)
// Custom Avatar implementation deprecated - use official Designsystemet component
// export { Avatar, AvatarGroup, UserInfo } from './Avatar';
// export type { AvatarProps, AvatarGroupProps, UserInfoProps, AvatarSize, } from './Avatar';

// Accessibility Statement (Norwegian universal design compliance)
export { AccessibilityStatement } from './AccessibilityStatement';
export type {
  AccessibilityStatementProps,
  ConformanceLevel,
  WCAGLevel,
  KnownIssue,
  AccessibilityContact,
} from './AccessibilityStatement';

// Page Shell Components (List, Detail, Form page layouts)
export {
  PageHeader as ShellPageHeader,
  ListPageShell,
  DetailPageShell,
  FormPageShell,
} from './PageShell';
export type {
  PageHeaderProps as ShellPageHeaderProps,
  ListPageShellProps,
  DetailPageShellProps,
  FormPageShellProps,
} from './PageShell';

// Status Banner (contextual status displays)
export { StatusBanner } from './StatusBanner';
export type { StatusBannerProps, StatusBannerVariant } from './StatusBanner';

// Detail Field Components (labeled data display)
export { DetailField, DetailFieldGroup, DetailCard, MonoField, LinkField } from './DetailField';
export type {
  DetailFieldProps,
  DetailFieldGroupProps,
  DetailCardProps,
  MonoFieldProps,
  LinkFieldProps,
} from './DetailField';

// Page States (Loading, Empty, NotFound, Error)
export {
  LoadingState,
  EmptyState as PageEmptyState,
  NotFoundState,
  ErrorState,
} from './PageStates';
export type {
  LoadingStateProps,
  EmptyStateProps as PageEmptyStateProps,
  NotFoundStateProps,
  ErrorStateProps,
} from './PageStates';

// Loading Fallback (Suspense fallback component)
export { LoadingFallback } from './LoadingFallback';
export type { LoadingFallbackProps } from './LoadingFallback';

// StateWrapper (Component state matrix handler)
export { StateWrapper, computeState, useComputedState } from './StateWrapper';
export type {
  StateWrapperProps,
  ComponentState,
  StateConfig,
  ComputedStateOptions,
} from './StateWrapper';

// Table Row Actions (dropdown menu for table actions)
export {
  TableRowActions,
  createViewAction,
  createEditAction,
  createDeleteAction,
  createDuplicateAction,
} from './TableRowActions';
export type { TableRowActionsProps, RowAction, ActionVariant } from './TableRowActions';

// Rich Text Editor
export { RichTextEditor } from './RichTextEditor';
export type { RichTextEditorProps, TextFormat } from './RichTextEditor';

// File Uploader
export { FileUploader } from './FileUploader';
export type { FileUploaderProps, UploadedFile } from './FileUploader';

// PDF Preview
export { PDFPreview } from './PDFPreview';
export type { PDFPreviewProps } from './PDFPreview';

// Template Canvas (Email/Invoice template builder)
export { TemplateCanvas, BlockPalette } from './TemplateCanvas';
export type {
  TemplateCanvasProps,
  BlockPaletteProps,
  TemplateBlock,
  TemplatePlaceholder,
  BlockType,
} from './TemplateCanvas';

// Confirm Dialog & Action Dialog (Rich version with async support)
export {
  ConfirmDialog as RichConfirmDialog,
  ActionDialog,
  useConfirmDialog,
} from './ConfirmDialog';
export type {
  ConfirmDialogProps as RichConfirmDialogProps,
  ActionDialogProps,
  DialogVariant as RichDialogVariant,
  UseConfirmDialogOptions,
} from './ConfirmDialog';

// Stepper & Wizard (Multi-step form navigation)
export { Stepper, Wizard as FormWizard, useWizard } from './Stepper';
export type { StepperProps, WizardProps as FormWizardProps, Step, StepStatus } from './Stepper';

// Stats Grid & Mini Stats
export { StatsGrid, StatCardEnhanced, MiniStat } from './StatsGrid';
export type {
  StatsGridProps,
  StatCardEnhancedProps,
  StatItem,
  TrendDirection,
  MiniStatProps,
} from './StatsGrid';

// Timeline & Activity Feed
export { Timeline, CompactTimeline } from './Timeline';
export type {
  TimelineProps,
  TimelineItem,
  TimelineItemType,
  CompactTimelineProps,
} from './Timeline';

// Date Range Picker
export { DateRangePicker } from './DateRangePicker';
export type { DateRangePickerProps, DateRange, DatePreset } from './DateRangePicker';

// Searchable Select / Combobox
export { SearchableSelect } from './SearchableSelect';
export type {
  SearchableSelectProps,
  SelectOption as SearchableSelectOption,
  SelectOptionValue,
  RenderOptionContext,
} from './SearchableSelect';

// Rich Notification Toast (with queue management)
export {
  ToastProvider as RichToastProvider,
  useToast as useRichToast,
  toast as richToast,
  toast,
  setGlobalToastHandler,
} from './NotificationToast';
export type {
  ToastProviderProps as RichToastProviderProps,
  Toast as RichToast,
  ToastOptions as RichToastOptions,
  ToastType as RichToastType,
  ToastPosition as RichToastPosition,
  ToastContextValue as RichToastContextValue,
  ToastItemProps,
} from './NotificationToast';

// Breadcrumbs - Custom implementation with context
// Note: Base Breadcrumbs component is exported from primitives
export { useBreadcrumbs } from './Breadcrumbs';
export type { BreadcrumbsProps, BreadcrumbItem } from './Breadcrumbs';

// Command Palette (Cmd+K)
export { CommandPalette, useCommandPalette } from './CommandPalette';
export type { CommandPaletteProps, CommandItem, CommandGroup } from './CommandPalette';

// FormSection and FormActions (standalone versions - simpler API)
export { FormSection } from './FormSection';
export { FormActions } from './FormActions';
export type { FormSectionProps } from './FormSection';
export type { FormActionsProps } from './FormActions';

// Form Layout Components (from FormLayout.tsx - collapsible sections, layout helpers)
export {
  FormSection as FormLayoutSection,
  FormActions as FormLayoutActions,
  FormRow,
  FormField,
  FormDivider,
} from './FormLayout';
export type {
  FormSectionProps as FormLayoutSectionProps,
  FormActionsProps as FormLayoutActionsProps,
  FormRowProps,
  FormFieldProps,
  FormDividerProps,
} from './FormLayout';

// Avatar Group (Rich version with status indicators)
export { AvatarItem as RichAvatarItem, AvatarGroup as RichAvatarGroup } from './AvatarGroup';
export type {
  AvatarItemProps as RichAvatarItemProps,
  AvatarGroupProps as RichAvatarGroupProps,
  AvatarSize as RichAvatarSize,
} from './AvatarGroup';

// Badge & Tag - Use Designsystemet Badge and Tag (exported from primitives)
// Custom implementations deprecated - use official Designsystemet components
// export { Badge, Tag, NotificationBadge } from './Badge';
// export type { BadgeProps, BadgeVariant, BadgeSize, TagProps, NotificationBadgeProps } from './Badge';
// Note: NotificationBadge is custom - keep if needed for specific features

// Tooltip - Use Designsystemet Tooltip (exported from primitives)
// Custom Tooltip implementation deprecated - use official Designsystemet component
// export { Tooltip } from './Tooltip';
// export type { TooltipProps, TooltipPosition } from './Tooltip';

// Popover
export { Popover, PopoverHeader, PopoverBody, PopoverFooter } from './Popover';
export type {
  PopoverProps,
  PopoverPosition,
  PopoverTrigger,
  PopoverHeaderProps,
  PopoverBodyProps,
  PopoverFooterProps,
} from './Popover';

// ProjectSelector
export { ProjectSelector } from './ProjectSelector';
export type { ProjectSelectorProps, ProjectItem } from './ProjectSelector';

// Skeleton Loading
export { Skeleton, SkeletonText, SkeletonCard, SkeletonTable, SkeletonAvatar } from './Skeleton';
export type {
  SkeletonProps,
  SkeletonTextProps,
  SkeletonCardProps,
  SkeletonTableProps,
  SkeletonAvatarProps,
} from './Skeleton';

// Progress
export { ProgressBar, ProgressRing, ProgressSteps } from './Progress';
export type {
  ProgressBarProps,
  ProgressRingProps,
  ProgressStepsProps,
  ProgressVariant,
  ProgressSize,
} from './Progress';

// Accordion & Collapsible
export { Accordion, Collapsible } from './Accordion';
export type { AccordionProps, AccordionItem, CollapsibleProps } from './Accordion';

// KeyValue Display
export { KeyValue, KeyValueList, DefinitionList } from './KeyValue';
export type {
  KeyValueProps,
  KeyValueListProps,
  KeyValuePair,
  DefinitionListProps,
} from './KeyValue';

// Slider & RangeSlider
export { Slider, RangeSlider } from './Slider';
export type { SliderProps, RangeSliderProps, SliderMark } from './Slider';

// Rating
export { Rating, RatingDisplay } from './Rating';
export type { RatingProps, RatingDisplayProps } from './Rating';

// ColorPicker removed - themes are created via https://designsystemet.no/en/fundamentals/start-here/own-theme/
// Note: ColorPicker component was removed

// SortableList
export { SortableList } from './SortableList';
export type { SortableListProps, SortableItem } from './SortableList';

// ActionMenu & ContextMenu
export { ActionMenu, ContextMenu } from './ActionMenu';
export type { ActionMenuProps, ContextMenuProps, MenuItem, MenuGroup } from './ActionMenu';

// InfiniteScroll & VirtualList
export { InfiniteScroll, VirtualList, useInfiniteScroll } from './InfiniteScroll';
export type { InfiniteScrollProps, VirtualListProps } from './InfiniteScroll';

// Spotlight & HighlightText
export { HighlightText, Spotlight, SearchHighlight, TextTruncate } from './Spotlight';
export type {
  HighlightTextProps,
  SpotlightProps,
  SearchHighlightProps,
  TextTruncateProps,
} from './Spotlight';

// NumberInput
export { NumberInput } from './NumberInput';
export type { NumberInputProps } from './NumberInput';

// CodeBlock & CopyButton
export { CopyButton, CodeBlock, InlineCode } from './CodeBlock';
export type { CopyButtonProps, CodeBlockProps, InlineCodeProps } from './CodeBlock';

// SimpleTabs & TabItem (convenience wrapper for Designsystemet Tabs)
// Exports Tabs which supports both simple TabItem API and Designsystemet compound pattern
export { SimpleTabs, TabItem, Tabs } from './SimpleTabs';
export type { SimpleTabsProps, TabItemProps } from './SimpleTabs';

// PageContainer (consistent page wrapper)
export { PageContainer } from './PageContainer';
export type { PageContainerProps } from './PageContainer';

// InfoBox (colored info/status boxes)
export { InfoBox } from './InfoBox';
export type { InfoBoxProps, InfoBoxVariant } from './InfoBox';

// SkipLinks (accessibility skip navigation)
export { SkipLinks } from './SkipLinks';
export type { SkipLinksProps, SkipLink } from './SkipLinks';

// Note: AvailabilityLegend now re-exported from @xala-technologies/platform-ui-digilist

// PublishingChecklist (wizard validation checklist)
export { PublishingChecklist } from './PublishingChecklist';
export type {
  PublishingChecklistProps,
  PublishingChecklistLabels,
  ChecklistItem as PublishingChecklistItem,
  ChecklistItemStatus as PublishingChecklistItemStatus,
} from './PublishingChecklist';

// Note: OpeningHoursEditor now re-exported from @xala-technologies/platform-ui-digilist

// PaymentMethodSelector (chip-based payment method display/selector)
export {
  PaymentMethodSelector,
  defaultPaymentMethods,
  defaultPaymentMethodsEn,
} from './PaymentMethodSelector';
export type {
  PaymentMethodSelectorProps,
  PaymentMethodSelectorLabels,
  PaymentMethod,
} from './PaymentMethodSelector';

// PaymentMethodConfig (admin checkbox config for payment methods)
export { PaymentMethodConfig } from './PaymentMethodConfig';
export type {
  PaymentMethodConfigProps,
  PaymentMethodConfigLabels,
  EnabledPaymentMethods,
} from './PaymentMethodConfig';

// Note: PricingTiersEditor now re-exported from @xala-technologies/platform-ui-digilist

// Note: BlockedPeriodsManager now re-exported from @xala-technologies/platform-ui-digilist

// ExternalImportInput (URL import with validation)
export { ExternalImportInput } from './ExternalImportInput';
export type {
  ExternalImportInputProps,
  ExternalImportInputLabels,
  ImportSource,
  ImportStatus,
} from './ExternalImportInput';

// Note: ContactPersonsEditor now re-exported from @xala-technologies/platform-ui-digilist

// TreeView (hierarchical navigation, sidebar, file explorer)
export { TreeView, TreeViewToolbar, useTreeView } from './TreeView';
export type { TreeViewProps, TreeViewToolbarProps, TreeNode } from './TreeView';

// ThemeToolbar (theme/locale/brand switching toolbar)
export { ThemeToolbar } from './ThemeToolbar';
export type {
  ThemeToolbarProps,
  ThemeToolbarLabels,
  ThemeOption,
  LocaleOption,
  ColorScheme,
} from './ThemeToolbar';

// IframeViewer (iframe container with loading/error states)
export { IframeViewer } from './IframeViewer';
export type { IframeViewerProps, IframeViewerLabels } from './IframeViewer';

// CatalogSidebar (searchable, filterable catalog navigation)
export { CatalogSidebar } from './CatalogSidebar';
export type {
  CatalogSidebarProps,
  CatalogSidebarLabels,
  CatalogItem,
  CatalogFilterOption,
} from './CatalogSidebar';

// ErrorSummary is provided by @digdir/designsystemet-react
// Re-exported from primitives/components.ts with compound sub-components
