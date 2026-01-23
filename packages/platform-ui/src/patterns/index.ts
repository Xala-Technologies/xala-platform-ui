// Platform UI Patterns
// Domain-neutral, reusable UI patterns

// Types
export * from './types';

// Pattern Components
export { FeatureChips } from './FeatureChips';
export type { FeatureChipsProps, FeatureChipsLabels } from './FeatureChips';

export { MetadataRow, MetadataRowInline } from './MetadataRow';
export type { MetadataRowProps } from './MetadataRow';

export { ResourceCard } from './ResourceCard';
export type { ResourceCardProps, ResourceCardVariant, ResourceCardImage } from './ResourceCard';

export { PricingSummary } from './PricingSummary';
export type {
  PricingSummaryProps,
  PricingSummaryLineItem,
  PriceLineItemType,
} from './PricingSummary';

export { SlotCalendar } from './SlotCalendar';
export type {
  SlotCalendarProps,
  SlotCalendarLabels,
  ViewMode as SlotViewMode,
  SelectionMode,
  CellStatus,
} from './SlotCalendar';

export { ResourceGrid } from './ResourceGrid';
export type { ResourceGridProps } from './ResourceGrid';

export { ResourceDetailHeader } from './ResourceDetailHeader';
export type { ResourceDetailHeaderProps } from './ResourceDetailHeader';

export { ScheduleCard } from './ScheduleCard';
export type { ScheduleCardProps } from './ScheduleCard';

// Utilities
export { cn, getGapValue, spacingValues } from './utils';

// Confirmation & Success Patterns
export { ConfirmationView } from './ConfirmationView';
export type {
  ConfirmationViewProps,
  ConfirmationDetail,
  ConfirmationVariant,
} from './ConfirmationView';

export { SuccessView } from './SuccessView';
export type { SuccessViewProps, SuccessDetail, SuccessAction } from './SuccessView';

// Form Wizard Modal
export { FormWizardModal } from './FormWizardModal';
export type { FormWizardModalProps, FormWizardModalLabels } from './FormWizardModal';

// Multi-Step Form Modal
export { MultiStepFormModal } from './MultiStepFormModal';
export type {
  MultiStepFormModalProps,
  MultiStepFormModalLabels,
  FormStep,
} from './MultiStepFormModal';

// Review Step
export { ReviewStep } from './ReviewStep';
export type { ReviewStepProps, ReviewStepTerms } from './ReviewStep';

// Mode Selector
export { ModeSelector } from './ModeSelector';
export type { ModeSelectorProps, ModeOption } from './ModeSelector';

// Review Components
export { ReviewCard } from './ReviewCard';
export type {
  ReviewCardProps,
  ReviewCardLabels,
  ReviewAuthor,
  ReviewBadge,
  ReviewStatus,
} from './ReviewCard';

export { ReviewList } from './ReviewList';
export type {
  ReviewListProps,
  ReviewListLabels,
  ReviewListItem,
  ReviewSummary,
  ReviewSortOption,
  RatingDistribution,
} from './ReviewList';

// Feedback Form
export { FeedbackForm } from './FeedbackForm';
export type {
  FeedbackFormProps,
  FeedbackFormLabels,
  FeedbackFormData,
  FeedbackFormErrors,
} from './FeedbackForm';

// Toggle Matrix
export { ToggleMatrix } from './ToggleMatrix';
export type {
  ToggleMatrixProps,
  ToggleMatrixLabels,
  ToggleMatrixRow,
  ToggleMatrixColumn,
  ToggleMatrixValues,
} from './ToggleMatrix';

// Selection Actions Bar
export { SelectionActionsBar } from './SelectionActionsBar';
export type {
  SelectionActionsBarProps,
  SelectionActionsBarLabels,
  SelectionAction,
} from './SelectionActionsBar';

// Cart Sidebar
export { CartSidebar } from './CartSidebar';
export type {
  CartSidebarProps,
  CartSidebarLabels,
  CartItem,
  CartSummary,
  PriceBreakdownLine,
} from './CartSidebar';

// Add-Ons Selector
export { AddOnsSelector } from './AddOnsSelector';
export type {
  AddOnsSelectorProps,
  AddOnsSelectorLabels,
  AddOnItem,
  SelectedAddOn,
  AddOnPricingUnit,
} from './AddOnsSelector';

// Stepper Header
export { StepperHeader } from './StepperHeader';
export type { StepperHeaderProps, StepperHeaderLabels, StepperStep } from './StepperHeader';

// Activity Timeline
export { ActivityTimeline } from './ActivityTimeline';
export type {
  ActivityTimelineProps,
  ActivityTimelineLabels,
  ActivityTimelineItem,
  StatusColorMap,
} from './ActivityTimeline';
// Note: ActivityStatus is not exported to avoid conflict with blocks/activity

// Key Facts
export { KeyFacts } from './KeyFacts';
export type { KeyFactsProps, KeyFactsLabels, KeyFactItem, KeyFactType } from './KeyFacts';
