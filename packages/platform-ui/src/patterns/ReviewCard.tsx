/**
 * ReviewCard
 *
 * A domain-neutral card component for displaying user reviews and feedback.
 * Shows star rating, review text, author info, date, and helpful actions.
 *
 * All text content is pre-localized - this component does not handle i18n internally.
 *
 * @example
 * ```tsx
 * <ReviewCard
 *   author={{ name: 'John Doe', avatar: '/avatars/john.jpg' }}
 *   rating={4}
 *   maxRating={5}
 *   content="Great experience! The service was excellent and the staff was very helpful."
 *   date="2 days ago"
 *   helpfulCount={12}
 *   onMarkHelpful={() => handleHelpful(reviewId)}
 *   labels={{
 *     helpful: 'Helpful',
 *     helpfulCount: '{count} found this helpful',
 *   }}
 * />
 * ```
 */
import * as React from 'react';
import type { ReactNode } from 'react';
import { Heading, Paragraph, Button } from '@digdir/designsystemet-react';

// ============================================================================
// Types
// ============================================================================

/** Review status type */
export type ReviewStatus = 'approved' | 'pending' | 'rejected' | 'flagged';

/** Author information */
export interface ReviewAuthor {
  /** Display name (pre-localized) */
  name: string;
  /** Avatar URL (optional) */
  avatar?: string;
  /** Verified badge */
  verified?: boolean;
}

/** Review badge */
export interface ReviewBadge {
  /** Badge label (pre-localized) */
  label: string;
  /** Badge color variant */
  variant?: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

/** Localized labels for the component */
export interface ReviewCardLabels {
  /** "Helpful" button label */
  helpful?: string;
  /** "{count} found this helpful" template */
  helpfulCount?: string;
  /** "Verified" badge label */
  verified?: string;
  /** Status labels */
  status?: {
    approved?: string;
    pending?: string;
    rejected?: string;
    flagged?: string;
  };
}

/** ReviewCard props interface */
export interface ReviewCardProps {
  /** Unique review ID */
  id?: string;

  /** Author information */
  author: ReviewAuthor;

  /** Star rating value */
  rating: number;

  /** Maximum rating (default: 5) */
  maxRating?: number;

  /** Review content/text (pre-localized) */
  content?: string;

  /** Formatted date string (pre-localized, e.g., "2 days ago") */
  date: string;

  /** Review title (optional, pre-localized) */
  title?: string;

  /** Number of people who found this helpful */
  helpfulCount?: number;

  /** Current user has marked as helpful */
  isHelpful?: boolean;

  /** Moderation status (optional) */
  status?: ReviewStatus;

  /** Additional badges */
  badges?: ReviewBadge[];

  /** Moderator notes (shown when status is provided) */
  moderatorNotes?: string;

  // ========== Event Handlers ==========

  /** Callback when "helpful" is clicked */
  onMarkHelpful?: (id: string) => void;

  /** Callback when card is clicked */
  onClick?: (id: string) => void;

  // ========== Display Options ==========

  /** Card variant */
  variant?: 'default' | 'compact';

  /** Show/hide helpful section */
  showHelpful?: boolean;

  /** Show/hide status badge */
  showStatus?: boolean;

  /** Custom icon for rating (defaults to star) */
  ratingIcon?: ReactNode;

  /** Localized labels */
  labels?: ReviewCardLabels;

  /** Custom class name */
  className?: string;

  /** Test ID for testing */
  'data-testid'?: string;
}

// ============================================================================
// Icons (inline SVG for portability)
// ============================================================================

const StarIcon = ({ filled = false, size = 16 }: { filled?: boolean; size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill={filled ? 'currentColor' : 'none'}
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ThumbsUpIcon = ({ size = 14 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M14 9V5a3 3 0 0 0-3-3l-4 9v11h11.28a2 2 0 0 0 2-1.7l1.38-9a2 2 0 0 0-2-2.3zM7 22H4a2 2 0 0 1-2-2v-7a2 2 0 0 1 2-2h3" />
  </svg>
);

const CheckIcon = ({ size = 12 }: { size?: number }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="3"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// ============================================================================
// Utility Functions
// ============================================================================

/** Concatenate class names, filtering out falsy values */
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Get status colors */
function getStatusColors(status: ReviewStatus): { bg: string; text: string } {
  const colors: Record<ReviewStatus, { bg: string; text: string }> = {
    approved: {
      bg: 'var(--ds-color-success-surface-default)',
      text: 'var(--ds-color-success-text-default)',
    },
    pending: {
      bg: 'var(--ds-color-warning-surface-default)',
      text: 'var(--ds-color-warning-text-default)',
    },
    rejected: {
      bg: 'var(--ds-color-danger-surface-default)',
      text: 'var(--ds-color-danger-text-default)',
    },
    flagged: {
      bg: 'var(--ds-color-danger-surface-default)',
      text: 'var(--ds-color-danger-text-default)',
    },
  };
  return colors[status];
}

/** Get badge colors */
function getBadgeColors(variant: string): { bg: string; text: string } {
  const colors: Record<string, { bg: string; text: string }> = {
    success: {
      bg: 'var(--ds-color-success-surface-default)',
      text: 'var(--ds-color-success-text-default)',
    },
    warning: {
      bg: 'var(--ds-color-warning-surface-default)',
      text: 'var(--ds-color-warning-text-default)',
    },
    danger: {
      bg: 'var(--ds-color-danger-surface-default)',
      text: 'var(--ds-color-danger-text-default)',
    },
    info: {
      bg: 'var(--ds-color-info-surface-default)',
      text: 'var(--ds-color-info-text-default)',
    },
    neutral: {
      bg: 'var(--ds-color-neutral-surface-default)',
      text: 'var(--ds-color-neutral-text-subtle)',
    },
  };
  return colors[variant] || colors.neutral;
}

// ============================================================================
// Sub-components
// ============================================================================

/** Star rating display */
interface StarRatingProps {
  rating: number;
  maxRating: number;
  size?: number;
  customIcon?: ReactNode;
}

function StarRating({ rating, maxRating, size = 16, customIcon }: StarRatingProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '2px',
      }}
      role="img"
      aria-label={`${rating} out of ${maxRating} stars`}
    >
      {Array.from({ length: maxRating }).map((_, index) => (
        <span
          key={index}
          style={{
            color:
              index < rating
                ? 'var(--ds-color-warning-base-default)'
                : 'var(--ds-color-neutral-border-default)',
          }}
        >
          {customIcon || <StarIcon filled={index < rating} size={size} />}
        </span>
      ))}
      <span
        style={{
          marginLeft: 'var(--ds-spacing-2)',
          fontSize: 'var(--ds-font-size-sm)',
          fontWeight: 600,
          color: 'var(--ds-color-neutral-text-default)',
        }}
      >
        {rating}/{maxRating}
      </span>
    </div>
  );
}

/** Author avatar */
interface AvatarProps {
  author: ReviewAuthor;
  size?: number;
}

function Avatar({ author, size = 40 }: AvatarProps) {
  const initials = author.name
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase()
    .slice(0, 2);

  if (author.avatar) {
    return (
      <img
        src={author.avatar}
        alt={author.name}
        style={{
          width: size,
          height: size,
          borderRadius: 'var(--ds-border-radius-full)',
          objectFit: 'cover',
        }}
      />
    );
  }

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 'var(--ds-border-radius-full)',
        backgroundColor: 'var(--ds-color-accent-surface-default)',
        color: 'var(--ds-color-accent-text-default)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize: size * 0.4,
        fontWeight: 600,
      }}
    >
      {initials}
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function ReviewCard({
  id,
  author,
  rating,
  maxRating = 5,
  content,
  date,
  title,
  helpfulCount = 0,
  isHelpful = false,
  status,
  badges,
  moderatorNotes,
  onMarkHelpful,
  onClick,
  variant = 'default',
  showHelpful = true,
  showStatus = false,
  ratingIcon,
  labels = {},
  className,
  'data-testid': testId = 'review-card',
}: ReviewCardProps): React.ReactElement {
  const isCompact = variant === 'compact';
  const isClickable = !!onClick;

  const handleClick = () => {
    if (onClick && id) {
      onClick(id);
    }
  };

  const handleHelpful = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onMarkHelpful && id) {
      onMarkHelpful(id);
    }
  };

  const defaultLabels: Required<ReviewCardLabels> = {
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

  const mergedLabels = {
    ...defaultLabels,
    ...labels,
    status: { ...defaultLabels.status, ...labels.status },
  };

  const formatHelpfulCount = (count: number): string => {
    return mergedLabels.helpfulCount.replace('{count}', String(count));
  };

  return (
    <div
      className={cn('review-card', className)}
      data-testid={testId}
      onClick={isClickable ? handleClick : undefined}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      style={{
        padding: isCompact ? 'var(--ds-spacing-4)' : 'var(--ds-spacing-5)',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
        borderRadius: 'var(--ds-border-radius-lg)',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
        cursor: isClickable ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
      }}
    >
      {/* Header: Author, Date, Status */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          gap: 'var(--ds-spacing-3)',
          marginBottom: 'var(--ds-spacing-3)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)' }}>
          {!isCompact && <Avatar author={author} size={40} />}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
              <Heading
                level={isCompact ? 4 : 3}
                data-size={isCompact ? 'xs' : 'sm'}
                style={{ margin: 0 }}
              >
                {author.name}
              </Heading>
              {author.verified && (
                <span
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '2px',
                    padding: '2px 6px',
                    backgroundColor: 'var(--ds-color-success-surface-default)',
                    color: 'var(--ds-color-success-text-default)',
                    borderRadius: 'var(--ds-border-radius-full)',
                    fontSize: 'var(--ds-font-size-xs)',
                    fontWeight: 500,
                  }}
                >
                  <CheckIcon size={10} />
                  {mergedLabels.verified}
                </span>
              )}
            </div>
            <Paragraph
              data-size="sm"
              style={{
                margin: 0,
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {date}
            </Paragraph>
          </div>
        </div>

        {/* Status & Badges */}
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
          {showStatus && status && (
            <span
              style={{
                padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
                backgroundColor: getStatusColors(status).bg,
                color: getStatusColors(status).text,
                borderRadius: 'var(--ds-border-radius-sm)',
                fontSize: 'var(--ds-font-size-xs)',
                fontWeight: 500,
              }}
            >
              {mergedLabels.status[status]}
            </span>
          )}
          {badges?.map((badge, index) => (
            <span
              key={index}
              style={{
                padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
                backgroundColor: getBadgeColors(badge.variant || 'neutral').bg,
                color: getBadgeColors(badge.variant || 'neutral').text,
                borderRadius: 'var(--ds-border-radius-sm)',
                fontSize: 'var(--ds-font-size-xs)',
                fontWeight: 500,
              }}
            >
              {badge.label}
            </span>
          ))}
        </div>
      </div>

      {/* Star Rating */}
      <div style={{ marginBottom: 'var(--ds-spacing-3)' }}>
        <StarRating
          rating={rating}
          maxRating={maxRating}
          size={isCompact ? 14 : 16}
          customIcon={ratingIcon}
        />
      </div>

      {/* Title */}
      {title && (
        <Heading
          level={4}
          data-size="xs"
          style={{
            margin: 0,
            marginBottom: 'var(--ds-spacing-2)',
          }}
        >
          {title}
        </Heading>
      )}

      {/* Content */}
      {content && (
        <Paragraph
          data-size={isCompact ? 'sm' : 'md'}
          style={{
            margin: 0,
            color: 'var(--ds-color-neutral-text-default)',
            lineHeight: 'var(--ds-line-height-lg)',
            whiteSpace: 'pre-wrap',
          }}
        >
          {content}
        </Paragraph>
      )}

      {/* Moderator Notes */}
      {showStatus && moderatorNotes && (
        <div
          style={{
            marginTop: 'var(--ds-spacing-3)',
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-info-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
            borderLeft: '3px solid var(--ds-color-info-border-default)',
          }}
        >
          <Paragraph
            data-size="sm"
            style={{
              margin: 0,
              fontWeight: 600,
              color: 'var(--ds-color-info-text-default)',
              marginBottom: 'var(--ds-spacing-1)',
            }}
          >
            Moderator Note:
          </Paragraph>
          <Paragraph
            data-size="sm"
            style={{
              margin: 0,
              color: 'var(--ds-color-neutral-text-default)',
            }}
          >
            {moderatorNotes}
          </Paragraph>
        </div>
      )}

      {/* Helpful Section */}
      {showHelpful && (helpfulCount > 0 || onMarkHelpful) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 'var(--ds-spacing-3)',
            marginTop: 'var(--ds-spacing-4)',
            paddingTop: 'var(--ds-spacing-3)',
            borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          {helpfulCount > 0 && (
            <Paragraph
              data-size="sm"
              style={{
                margin: 0,
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {formatHelpfulCount(helpfulCount)}
            </Paragraph>
          )}

          {onMarkHelpful && (
            <Button
              type="button"
              variant="tertiary"
              data-size="sm"
              onClick={handleHelpful}
              style={{
                marginLeft: 'auto',
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ds-spacing-1)',
                color: isHelpful
                  ? 'var(--ds-color-accent-text-default)'
                  : 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              <ThumbsUpIcon size={14} />
              {mergedLabels.helpful}
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default ReviewCard;
