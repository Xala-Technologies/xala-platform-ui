/**
 * Blocks
 *
 * Business-logic components composed from primitives and composed components
 */

// =============================================================================
// PLATFORM-NEUTRAL BLOCKS (remain in @xala-technologies/platform/ui)
// =============================================================================

// Results Display
export { ResultsSkeleton } from './ResultsSkeleton';
export type { ResultsSkeletonProps } from './ResultsSkeleton';

export { ResultsEmptyState } from './ResultsEmptyState';
export type { ResultsEmptyStateProps } from './ResultsEmptyState';

// Resource Detail Components (platform-neutral)
export { ImageGallery } from './ImageGallery';
export type { ImageGalleryProps } from './ImageGallery';

export { CapacityCard } from './CapacityCard';
export type { CapacityCardProps } from './CapacityCard';

export { AdditionalServicesList } from './AdditionalServicesList';
export type { AdditionalServicesListProps } from './AdditionalServicesList';

export { ContactInfoCard } from './ContactInfoCard';
export type { ContactInfoCardProps } from './ContactInfoCard';

export { LocationCard } from './LocationCard';
export type { LocationCardProps } from './LocationCard';

export { OpeningHoursCard } from './OpeningHoursCard';
export type { OpeningHoursCardProps } from './OpeningHoursCard';

export { GuidelinesTab } from './GuidelinesTab';
export type { GuidelinesTabProps } from './GuidelinesTab';

export { FAQTab } from './FAQTab';
export type { FAQTabProps } from './FAQTab';

export { ImageSlider } from './ImageSlider';
export type { ImageSliderProps } from './ImageSlider';

// Auth Gating Modal
export { RequireAuthModal } from './RequireAuthModal';
export type { RequireAuthModalProps } from './RequireAuthModal';

// Login Components
export {
  LoginOption,
  FeatureItem,
  IntegrationBadge,
  LoginFooterLink,
  LoginLayout,
} from './LoginComponents';
export type {
  LoginOptionProps,
  FeatureItemProps,
  IntegrationBadgeProps,
  LoginFooterLinkProps,
  LoginLayoutProps,
} from './LoginComponents';

// Dashboard Components (StatCard exported as BlockStatCard to avoid conflict with composed/StatCard)
export {
  StatCard as BlockStatCard,
  ActivityItem,
  ActivityFeed,
  QuickActionCard,
  formatTimeAgo,
} from './DashboardComponents';
export type {
  StatCardProps as BlockStatCardProps,
  ActivityItemProps,
  ActivityStatus,
  ActivityFeedProps,
  QuickActionProps,
} from './DashboardComponents';

// Status Badge Components (Platform-neutral only)
export {
  StatusTag,
  BookingStatusBadge,
  PaymentStatusBadge,
  ResourceStatusBadge,
  RequestStatusBadge,
  OrganizationStatusBadge,
  UserStatusBadge,
  GenericStatusBadge,
  statusConfigs,
  // Utility Badges
  InventoryBadge,
  CapacityBadge,
  BlackoutIndicator,
  RequiresApprovalBadge,
  // Platform Status Badges
  GdprRequestStatusBadge,
  BlockStatusBadge,
  InvoiceStatusBadge,
  IntegrationStatusBadge,
} from './StatusBadges';
export type {
  StatusTagProps,
  BadgeColor,
  StatusBadgeConfig,
  BookingStatusType,
  BookingStatusBadgeProps,
  PaymentStatusType,
  PaymentStatusBadgeProps,
  ResourceStatusType,
  ResourceStatusBadgeProps,
  RequestStatusType,
  RequestStatusBadgeProps,
  OrganizationStatusType,
  OrganizationStatusBadgeProps,
  UserStatusType,
  UserStatusBadgeProps,
  GenericStatusBadgeProps,
  // Utility Badge Types
  InventoryBadgeProps,
  CapacityBadgeProps,
  BlackoutIndicatorProps,
  RequiresApprovalBadgeProps,
  // Platform Status Badge Types
  GdprRequestStatusType,
  GdprRequestStatusBadgeProps,
  BlockStatusType,
  BlockStatusBadgeProps,
  InvoiceStatusType,
  InvoiceStatusBadgeProps,
  IntegrationStatusType,
  IntegrationStatusBadgeProps,
} from './StatusBadges';

// Chart Components
export { BarChart, VerticalBarChart } from './BarChart';
export type { BarChartDataItem, BarChartProps, VerticalBarChartProps } from './BarChart';

// Auth UI Components
export {
  LoadingScreen,
  AccessDeniedScreen,
  NotFoundScreen,
  ErrorScreen,
  PermissionGate,
} from './AuthComponents';
export type {
  LoadingScreenProps,
  AccessDeniedScreenProps,
  NotFoundScreenProps,
  ErrorScreenProps,
  PermissionGateProps,
} from './AuthComponents';

// Messaging Components
export {
  NotificationBell,
  ConversationList,
  ConversationListItem,
  MessageBubble,
  ChatThread,
} from './messaging';
export type {
  NotificationBellProps,
  ConversationListProps,
  ConversationListItemProps,
  ConversationItem,
  MessageBubbleProps,
  MessageItem,
  ChatThreadProps,
} from './messaging';

// Error Handling Components
export { ErrorBoundary, withErrorBoundary } from './ErrorBoundary';
export type {
  ErrorBoundaryProps,
  ErrorBoundaryLabels,
  WithErrorBoundaryOptions,
} from './ErrorBoundary';

export { GlobalErrorHandler, useGlobalError } from './GlobalErrorHandler';
export type {
  GlobalErrorHandlerProps,
  GlobalError,
  UseGlobalErrorOptions,
} from './GlobalErrorHandler';

// GDPR Components
export {
  ConsentManager,
  ConsentPopup,
  ConsentSettings as GdprPrivacyConsentSettings,
  DataExportCard,
  DeleteAccountCard,
  DataSubjectRequestForm,
  // RequestStatusBadge exported from StatusBadges as GdprRequestStatusBadge
} from './gdpr';

// Help System Components
export { HelpPanel } from './help';
export type {
  HelpPanelProps,
  HelpLevel,
  HelpCategory,
  TooltipContent,
  GuideContent,
  FAQItem,
} from './help';

// Admin Components
export { ScopeSelector, PermissionMatrix, EffectivePermissionsView, UserInviteForm } from './admin';
export type {
  ScopeSelectorProps,
  ScopeType as AdminScopeType,
  ScopeAssignment,
  Resource as ScopeResource,
  Organization as ScopeOrganization,
  PermissionMatrixProps,
  Permission,
  Role as AdminRole,
  EffectivePermissionsViewProps,
  EffectivePermission,
  PermissionSource,
  UserInviteFormProps,
  InviteUserFormData,
} from './admin';

// Settings Blocks
export { SettingsTabLayout, SettingsField, SettingsSection } from './settings';
export type { SettingsTabLayoutProps, SettingsFieldProps, SettingsSectionProps } from './settings';

// Settings Tab Components
export { PreferencesTab, ProfileTab, NotificationsTab, AddressesTab, PrivacyTab } from './settings';
export type {
  PreferencesTabProps,
  PreferencesTabLabels,
  ProfileTabProps,
  ProfileData,
  ProfileAddress,
  ProfileTabLabels,
  NotificationsTabProps,
  NotificationsTabLabels,
  NotificationSettingsData,
  AddressesTabProps,
  AddressesTabLabels,
  AddressData,
  Address,
  PrivacyTabProps,
  PrivacyTabLabels,
  PrivacyConsentSettings,
} from './settings';

// Notifications Blocks
export { NotificationItem, NotificationList } from './notifications';
export type {
  NotificationItemProps,
  NotificationItemData,
  NotificationListProps,
} from './notifications';

export { NotificationCenter } from './NotificationCenter';
export type {
  NotificationCenterProps,
  NotificationCenterLabels,
  NotificationFilter,
} from './NotificationCenter';

export { PushNotificationPrompt } from './PushNotificationPrompt';
export type {
  PushNotificationPromptProps,
  PushNotificationPromptLabels,
} from './PushNotificationPrompt';

// NotificationItem (main blocks version with StatusTag)
export { NotificationItem as NotificationItemBlock } from './NotificationItem';
export type {
  NotificationItemProps as NotificationItemBlockProps,
  NotificationItemData as NotificationItemBlockData,
  NotificationItemLabels,
  NotificationType,
  NotificationPriority,
} from './NotificationItem';

// Profile Blocks
export { ProfileCard, QuickStat } from './profile';
export type { ProfileCardProps, ProfileCardData, QuickStatProps } from './profile';

// Account Blocks
export { AccountSwitcher, AccountSelector, AccountSelectionModal } from './account';
export type {
  AccountSwitcherProps,
  AccountType,
  ActiveAccount,
  AccountSelectorProps,
  AccountSelectionType,
  AccountSelectionModalProps,
} from './account';

// Activity Blocks

// Note: Domain blocks (AmenityChips) now re-exported from @xala-technologies/platform-ui-digilist


// Share Components
export { ShareButton, ShareSheet } from './ShareButton';
export type { ShareButtonProps, ShareSheetProps, ShareData, SharePlatform } from './ShareButton';

// Favorite Button
export { FavoriteButton } from './FavoriteButton';
export type { FavoriteButtonProps } from './FavoriteButton';

// Note: Domain blocks (PeriodCard, MediaResourceCard) now re-exported from @xala-technologies/platform-ui-digilist

// Re-export PeriodStatus from patterns for convenience
export type { PeriodStatus, PeriodInfo } from '../patterns/types';


// Workflow Components (for design governance apps)
export {
  WorkflowStep,
  WorkflowPipeline,
  WorkflowCard,
  CardGrid,
  ButtonGroup,
  FormGrid,
} from './WorkflowComponents';

// Explorer Components (for sidebar navigation)
export { ExplorerItem } from './ExplorerItem';
export type { ExplorerItemProps } from './ExplorerItem';

// Preview Components (for playground/storybook)
export { PreviewArea } from './PreviewArea';
export type { PreviewAreaProps } from './PreviewArea';
export type {
  WorkflowStepProps,
  WorkflowPipelineProps,
  WorkflowCardProps,
  WorkflowStatus,
  CardGridProps,
  ButtonGroupProps,
  FormGridProps,
} from './WorkflowComponents';

// =============================================================================
// NOTE: This package contains ONLY platform-neutral UI components.
// Domain-specific components (reservations, allocations, periods) belong in domain repos.
// =============================================================================

// =============================================================================
// XAHEEN-CODER BLOCKS (AI workflow components)
// =============================================================================

// Approval Components
export { ApprovalFlow } from './ApprovalFlow';
export type { ApprovalFlowProps, ApprovalItem, ChecklistItem } from './ApprovalFlow';

// Terminal Components
export { CommandTerminal } from './CommandTerminal';
export type { CommandTerminalProps, TerminalStatus } from './CommandTerminal';

// Artifact Components
export { ArtifactPreview } from './ArtifactPreview';
export type { ArtifactPreviewProps, Artifact } from './ArtifactPreview';

export { ArtifactValidationPanel } from './ArtifactValidationPanel';
export type { ArtifactValidationPanelProps, ValidationResult } from './ArtifactValidationPanel';

export { ArtifactDiffViewer } from './ArtifactDiffViewer';
export type { ArtifactDiffViewerProps, ArtifactChange } from './ArtifactDiffViewer';

// Composition Preview
export { CompositionPreview } from './CompositionPreview';
export type { CompositionPreviewProps, CompositionData } from './CompositionPreview';

// Clarification Panel
export { ClarificationPanel } from './ClarificationPanel';
export type {
  ClarificationPanelProps,
  ClarificationQuestion,
  ClarificationAnswer,
} from './ClarificationPanel';

// Wizard Status Sidebar
export { WizardStatusSidebar } from './WizardStatusSidebar';
export type {
  WizardStatusSidebarProps,
  WizardStatusLabels,
  StatusSection,
  WizardStatus,
  SectionStatus,
} from './WizardStatusSidebar';

// Accessibility Info Card (universal design features)
export {
  AccessibilityInfoCard,
  defaultAccessibilityFeatures,
  defaultAccessibilityFeaturesEn,
} from './AccessibilityInfoCard';
export type {
  AccessibilityInfoCardProps,
  AccessibilityInfoCardLabels,
  AccessibilityFeature,
} from './AccessibilityInfoCard';

// Logistics Details Card (pickup/delivery info for equipment)
export { LogisticsDetailsCard } from './LogisticsDetailsCard';
export type {
  LogisticsDetailsCardProps,
  LogisticsDetailsCardLabels,
  LogisticsInfo,
  DetailsInfo,
} from './LogisticsDetailsCard';

// Return Policy Card (cancellation/refund policy)
export { ReturnPolicyCard } from './ReturnPolicyCard';
export type {
  ReturnPolicyCardProps,
  ReturnPolicyCardLabels,
  ReturnPolicy,
  PolicyType,
} from './ReturnPolicyCard';

// Event Schedule Card (event timing with recurrence)
export { EventScheduleCard } from './EventScheduleCard';
export type {
  EventScheduleCardProps,
  EventScheduleCardLabels,
  EventSchedule,
  TimeSlot,
  Recurrence,
  RecurrencePattern,
  Weekday,
} from './EventScheduleCard';

// Ticket Registration Card (event tickets and registration)
export { TicketRegistrationCard } from './TicketRegistrationCard';
export type {
  TicketRegistrationCardProps,
  TicketRegistrationCardLabels,
  Registration,
  RegistrationType,
  RegistrationStatus,
  TicketPrice,
  Capacity,
} from './TicketRegistrationCard';

// Location Card Editable (editable address input extension)
export { LocationCardEditable } from './LocationCardEditable';
export type { LocationCardEditableProps, LocationCardEditableLabels } from './LocationCardEditable';

// Note: ResourceListItem, ResourceToolbar, ResourceTabs now re-exported from @xala-technologies/platform-ui-digilist


// =============================================================================
// XAHEEN-CODER EXTENDED BLOCKS (Task management, Git integration, File browsing)
// =============================================================================

// TaskCard (Kanban task display)
export { TaskCard } from './TaskCard';
export type {
  TaskCardProps,
  TaskStatus,
  TaskPriority,
  TaskComplexity,
  TaskPhase,
  TaskCategory,
} from './TaskCard';

// IssueCard (GitHub/GitLab issue display)
export { IssueCard } from './IssueCard';
export type { IssueCardProps, IssueState, IssueType, IssuePlatform, IssueLabel } from './IssueCard';

// FileTree (File explorer navigation)
export { FileTree } from './FileTree';
export type { FileTreeProps, FileNode, FileNodeType } from './FileTree';

// ChangelogCard (Release notes display)
export { ChangelogCard } from './ChangelogCard';
export type { ChangelogCardProps, ChangeType, ChangeItem } from './ChangelogCard';

// XTerminal (Terminal display)
export { XTerminal } from './XTerminal';
export type { XTerminalProps } from './XTerminal';

// =============================================================================
// CALENDAR BLOCKS
// =============================================================================

// Calendar Components
export { RentalObjectAvailabilityCalendar } from './calendar';
export type { RentalObjectAvailabilityCalendarProps } from './calendar';
