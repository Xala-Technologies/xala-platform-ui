/**
 * @xala-technologies/platform-ui - Reviews Feature
 *
 * Pure presentational review components.
 * All review components are located in patterns/ directory.
 *
 * @module @xala-technologies/platform-ui/features/reviews
 */

// Re-export from patterns
export {
  ReviewCard,
  type ReviewCardProps,
  type ReviewCardLabels,
  ReviewList,
  type ReviewListProps,
  type ReviewListLabels,
  FeedbackForm,
  type FeedbackFormProps,
  type FeedbackFormLabels,
  ReviewStep,
  type ReviewStepProps,
  // Note: ReviewStep doesn't export labels type - component uses inline labels
} from '../../patterns';

// Note: Review data types should be defined by the application or SDK layer
// This feature only provides UI components
