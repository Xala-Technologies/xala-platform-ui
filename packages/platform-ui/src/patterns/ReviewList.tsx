/* eslint-disable no-restricted-syntax */
/**
 * ReviewList
 *
 * A domain-neutral component for displaying a list of reviews with summary stats.
 * Includes rating distribution, average rating, and sortable review list.
 *
 * All text content is pre-localized - this component does not handle i18n internally.
 *
 * @example
 * ```tsx
 * <ReviewList
 *   reviews={reviews}
 *   summary={{
 *     average: 4.5,
 *     total: 128,
 *     distribution: { 5: 80, 4: 30, 3: 10, 2: 5, 1: 3 },
 *   }}
 *   sortOptions={[
 *     { id: 'newest', label: 'Newest first' },
 *     { id: 'highest', label: 'Highest rated' },
 *     { id: 'helpful', label: 'Most helpful' },
 *   ]}
 *   onSortChange={handleSortChange}
 *   onMarkHelpful={handleHelpful}
 *   labels={{
 *     reviews: 'reviews',
 *     sortBy: 'Sort by',
 *     showMore: 'Show more reviews',
 *   }}
 * />
 * ```
 */
import * as React from 'react';
import { Heading, Paragraph, Button } from '@digdir/designsystemet-react';
import { NativeSelect } from '../primitives/NativeSelect';
import { ReviewCard, type ReviewCardLabels } from './ReviewCard';

// ============================================================================
// Types
// ============================================================================

/** Rating distribution (key = star count, value = number of reviews) */
export interface RatingDistribution {
  [stars: number]: number;
}

/** Review summary statistics */
export interface ReviewSummary {
  /** Average rating */
  average: number;
  /** Total number of reviews */
  total: number;
  /** Distribution by star rating */
  distribution: RatingDistribution;
  /** Maximum rating (default: 5) */
  maxRating?: number;
}

/** Sort option */
export interface ReviewSortOption {
  /** Unique identifier */
  id: string;
  /** Display label (pre-localized) */
  label: string;
}

/** Review data for the list */
export interface ReviewListItem {
  /** Unique review ID */
  id: string;
  /** Author information */
  author: {
    name: string;
    avatar?: string;
    verified?: boolean;
  };
  /** Star rating */
  rating: number;
  /** Review content */
  content?: string;
  /** Formatted date */
  date: string;
  /** Review title */
  title?: string;
  /** Helpful count */
  helpfulCount?: number;
  /** Current user marked helpful */
  isHelpful?: boolean;
}

/** Localized labels */
export interface ReviewListLabels extends ReviewCardLabels {
  /** "reviews" label */
  reviews?: string;
  /** "Sort by" label */
  sortBy?: string;
  /** "Show more reviews" button label */
  showMore?: string;
  /** "No reviews yet" empty state */
  noReviews?: string;
  /** "Be the first to review" CTA */
  beFirst?: string;
  /** "Write a review" button */
  writeReview?: string;
}

/** ReviewList props interface */
export interface ReviewListProps {
  /** Array of reviews */
  reviews: ReviewListItem[];

  /** Review summary (optional - shows stats header) */
  summary?: ReviewSummary;

  /** Sort options (optional - shows sort dropdown) */
  sortOptions?: ReviewSortOption[];

  /** Currently selected sort option */
  sortValue?: string;

  /** Callback when sort changes */
  onSortChange?: (sortId: string) => void;

  /** Callback when "helpful" is clicked */
  onMarkHelpful?: (reviewId: string) => void;

  /** Callback when "show more" is clicked */
  onShowMore?: () => void;

  /** Callback when "write review" is clicked */
  onWriteReview?: () => void;

  /** Whether more reviews are available */
  hasMore?: boolean;

  /** Loading state */
  loading?: boolean;

  /** Maximum rating (default: 5) */
  maxRating?: number;

  /** Review card variant */
  cardVariant?: 'default' | 'compact';

  /** Localized labels */
  labels?: ReviewListLabels;

  /** Custom class name */
  className?: string;

  /** Test ID for testing */
  'data-testid'?: string;
}

// ============================================================================
// Icons (inline SVG for portability)
// ============================================================================

const StarIcon = ({ size = 20 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="1"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

// ============================================================================
// Utility Functions
// ============================================================================

/** Concatenate class names, filtering out falsy values */
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

// ============================================================================
// Sub-components
// ============================================================================

/** Rating distribution bar */
interface DistributionBarProps {
  star: number;
  count: number;
  total: number;
  maxRating: number;
}

function DistributionBar({ star, count, total, maxRating: _maxRating }: DistributionBarProps) {
  const percentage = total > 0 ? (count / total) * 100 : 0;

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--ds-spacing-2)',
      }}
    >
      <span
        style={{
          width: '20px',
          fontSize: 'var(--ds-font-size-sm)',
          color: 'var(--ds-color-neutral-text-subtle)',
          textAlign: 'right',
        }}
      >
        {star}
      </span>
      <StarIcon size={14} />
      <div
        style={{
          flex: 1,
          height: '8px',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          borderRadius: 'var(--ds-border-radius-full)',
          overflow: 'hidden',
        }}
      >
        <div
          style={{
            width: `${percentage}%`,
            height: '100%',
            backgroundColor: 'var(--ds-color-warning-base-default)',
            borderRadius: 'var(--ds-border-radius-full)',
            transition: 'width 0.3s ease',
          }}
        />
      </div>
      <span
        style={{
          width: '40px',
          fontSize: 'var(--ds-font-size-sm)',
          color: 'var(--ds-color-neutral-text-subtle)',
        }}
      >
        {count}
      </span>
    </div>
  );
}

/** Review summary header */
interface SummaryHeaderProps {
  summary: ReviewSummary;
  maxRating: number;
  labels: Required<ReviewListLabels>;
}

function SummaryHeader({ summary, maxRating, labels }: SummaryHeaderProps) {
  return (
    <div
      style={{
        display: 'flex',
        gap: 'var(--ds-spacing-6)',
        padding: 'var(--ds-spacing-5)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderRadius: 'var(--ds-border-radius-lg)',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
        marginBottom: 'var(--ds-spacing-5)',
        flexWrap: 'wrap',
      }}
    >
      {/* Average rating */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          padding: 'var(--ds-spacing-4)',
          minWidth: '120px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'baseline',
            gap: 'var(--ds-spacing-1)',
          }}
        >
          <span
            style={{
              fontSize: 'var(--ds-font-size-3xl)',
              fontWeight: 700,
              color: 'var(--ds-color-neutral-text-default)',
            }}
          >
            {summary.average.toFixed(1)}
          </span>
          <span
            style={{
              fontSize: 'var(--ds-font-size-md)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            / {maxRating}
          </span>
        </div>
        <div
          style={{
            display: 'flex',
            gap: '2px',
            marginTop: 'var(--ds-spacing-2)',
            color: 'var(--ds-color-warning-base-default)',
          }}
        >
          {Array.from({ length: maxRating }).map((_, i) => (
            <StarIcon key={i} size={16} />
          ))}
        </div>
        <Paragraph
          data-size="sm"
          style={{
            margin: 0,
            marginTop: 'var(--ds-spacing-2)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {summary.total} {labels.reviews}
        </Paragraph>
      </div>

      {/* Distribution bars */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-2)',
          minWidth: '200px',
        }}
      >
        {Array.from({ length: maxRating })
          .map((_, i) => maxRating - i)
          .map((star) => (
            <DistributionBar
              key={star}
              star={star}
              count={summary.distribution[star] || 0}
              total={summary.total}
              maxRating={maxRating}
            />
          ))}
      </div>
    </div>
  );
}

/** Empty state */
interface EmptyStateProps {
  labels: Required<ReviewListLabels>;
  onWriteReview?: () => void;
}

function EmptyState({ labels, onWriteReview }: EmptyStateProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 'var(--ds-spacing-8)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderRadius: 'var(--ds-border-radius-lg)',
        border: '1px dashed var(--ds-color-neutral-border-default)',
        textAlign: 'center',
      }}
    >
      <div
        style={{
          display: 'flex',
          gap: '4px',
          marginBottom: 'var(--ds-spacing-4)',
          color: 'var(--ds-color-neutral-border-default)',
        }}
      >
        {Array.from({ length: 5 }).map((_, i) => (
          <StarIcon key={i} size={24} />
        ))}
      </div>
      <Heading level={3} data-size="sm" style={{ margin: 0 }}>
        {labels.noReviews}
      </Heading>
      <Paragraph
        data-size="sm"
        style={{
          margin: 0,
          marginTop: 'var(--ds-spacing-2)',
          color: 'var(--ds-color-neutral-text-subtle)',
        }}
      >
        {labels.beFirst}
      </Paragraph>
      {onWriteReview && (
        <Button
          type="button"
          variant="primary"
          data-color="accent"
          onClick={onWriteReview}
          style={{ marginTop: 'var(--ds-spacing-4)' }}
        >
          {labels.writeReview}
        </Button>
      )}
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function ReviewList({
  reviews,
  summary,
  sortOptions,
  sortValue,
  onSortChange,
  onMarkHelpful,
  onShowMore,
  onWriteReview,
  hasMore = false,
  loading = false,
  maxRating = 5,
  cardVariant = 'default',
  labels = {},
  className,
  'data-testid': testId = 'review-list',
}: ReviewListProps): React.ReactElement {
  const defaultLabels: Required<ReviewListLabels> = {
    reviews: 'reviews',
    sortBy: 'Sort by',
    showMore: 'Show more reviews',
    noReviews: 'No reviews yet',
    beFirst: 'Be the first to share your experience',
    writeReview: 'Write a review',
    helpful: 'Helpful',
    helpfulCount: '{count} found this helpful',
    verified: 'Verified',
    status: {
      approved: 'Approved',
      pending: 'Pending',
      rejected: 'Rejected',
      flagged: 'Flagged',
    },
  };

  const mergedLabels: Required<ReviewListLabels> = {
    ...defaultLabels,
    ...labels,
    status: { ...defaultLabels.status, ...labels.status },
  };

  return (
    <div className={cn('review-list', className)} data-testid={testId}>
      {/* Summary header */}
      {summary && <SummaryHeader summary={summary} maxRating={maxRating} labels={mergedLabels} />}

      {/* Sort and actions bar */}
      {(sortOptions || onWriteReview) && reviews.length > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            gap: 'var(--ds-spacing-4)',
            marginBottom: 'var(--ds-spacing-4)',
            flexWrap: 'wrap',
          }}
        >
          {sortOptions && onSortChange && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
              <Paragraph
                data-size="sm"
                style={{
                  margin: 0,
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {mergedLabels.sortBy}:
              </Paragraph>
              <NativeSelect
                value={sortValue}
                onChange={(e: React.ChangeEvent<HTMLSelectElement>) => onSortChange(e.target.value)}
                data-size="sm"
                style={{ minWidth: '150px' }}
              >
                {sortOptions.map((option) => (
                  <option key={option.id} value={option.id}>
                    {option.label}
                  </option>
                ))}
              </NativeSelect>
            </div>
          )}

          {onWriteReview && (
            <Button
              type="button"
              variant="secondary"
              data-size="sm"
              onClick={onWriteReview}
              style={{ marginLeft: 'auto' }}
            >
              {mergedLabels.writeReview}
            </Button>
          )}
        </div>
      )}

      {/* Reviews list */}
      {reviews.length === 0 ? (
        <EmptyState labels={mergedLabels} onWriteReview={onWriteReview} />
      ) : (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ds-spacing-4)',
          }}
        >
          {reviews.map((review) => (
            <ReviewCard
              key={review.id}
              id={review.id}
              author={review.author}
              rating={review.rating}
              maxRating={maxRating}
              content={review.content}
              date={review.date}
              title={review.title}
              helpfulCount={review.helpfulCount}
              isHelpful={review.isHelpful}
              onMarkHelpful={onMarkHelpful}
              variant={cardVariant}
              labels={mergedLabels}
            />
          ))}
        </div>
      )}

      {/* Show more button */}
      {hasMore && onShowMore && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: 'var(--ds-spacing-5)',
          }}
        >
          <Button
            type="button"
            variant="secondary"
            onClick={onShowMore}
            disabled={loading}
            style={{
              minWidth: '200px',
            }}
          >
            {loading ? '...' : mergedLabels.showMore}
          </Button>
        </div>
      )}
    </div>
  );
}

export default ReviewList;
