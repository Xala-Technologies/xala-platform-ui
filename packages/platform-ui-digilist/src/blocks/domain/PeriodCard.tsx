/**
 * PeriodCard
 *
 * A domain-neutral card component for time-period-based items.
 * Suitable for seasons, campaigns, programs, events, and other time-bound entities.
 *
 * This component is designed to be used across any domain:
 * - Sports seasons and tournaments
 * - Marketing campaigns
 * - Subscription periods
 * - Event series
 * - Program enrollment periods
 *
 * All text content is pre-localized - pass labels via props for i18n support.
 *
 * @example
 * ```tsx
 * <PeriodCard
 *   id="season-2026"
 *   title="Spring Season 2026"
 *   subtitle="Basketball League"
 *   period={{
 *     startDate: "March 1, 2026",
 *     endDate: "June 30, 2026",
 *     label: "3 months",
 *   }}
 *   status={{
 *     type: "upcoming",
 *     label: "Registration Open",
 *   }}
 *   onClick={(id) => navigate(`/seasons/${id}`)}
 *   onAction={(id) => handleRegister(id)}
 *   actionLabel="Register Now"
 * />
 * ```
 */
import * as React from 'react';
import { Heading, Paragraph, Button } from '@xala-technologies/platform-ui-core';
import { Stack, Text } from '@xala-technologies/platform-ui-core';
import type { PeriodStatus, PeriodInfo } from '@xala-technologies/platform-ui-core';

// ============================================================================
// Types
// ============================================================================

/** Status with pre-localized label */
export interface PeriodStatusDisplay {
  /** Status type for styling */
  type: PeriodStatus;
  /** Pre-localized status label */
  label: string;
}

/** Deadline information */
export interface PeriodDeadline {
  /** Formatted deadline date (pre-localized) */
  date: string;
  /** Deadline label (pre-localized, e.g., "Registration deadline") */
  label: string;
}

/** Image configuration */
export interface PeriodCardImage {
  /** Image source URL */
  src: string;
  /** Alt text for accessibility */
  alt: string;
}

/** PeriodCard props interface */
export interface PeriodCardProps {
  /** Unique identifier */
  id: string;

  /** Primary title (pre-localized) */
  title: string;

  /** Secondary title/category (pre-localized, optional) */
  subtitle?: string;

  /** Description text (pre-localized, optional) */
  description?: string;

  /** Period date range */
  period: PeriodInfo;

  /** Status indicator with pre-localized label */
  status: PeriodStatusDisplay;

  /** Optional deadline information */
  deadline?: PeriodDeadline;

  /** Optional image */
  image?: PeriodCardImage;

  // ========== Event Handlers ==========

  /** Click handler for the card */
  onClick?: (id: string) => void;

  /** Action button click handler */
  onAction?: (id: string) => void;

  /** Action button label (pre-localized) */
  actionLabel?: string;

  /** Whether action is disabled */
  actionDisabled?: boolean;

  // ========== Display Options ==========

  /** Card variant */
  variant?: 'default' | 'compact';

  /** Custom class name */
  className?: string;
}

// ============================================================================
// Icons (inline SVG for portability)
// ============================================================================

const CalendarIcon = ({ size = 16 }: { size?: number }) => (
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
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ClockIcon = ({ size = 14 }: { size?: number }) => (
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
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

const ArrowRightIcon = ({ size = 14 }: { size?: number }) => (
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
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12 5 19 12 12 19" />
  </svg>
);

// ============================================================================
// Utility Functions
// ============================================================================

/** Concatenate class names, filtering out falsy values */
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Get status colors based on type */
function getStatusColors(type: PeriodStatus): { bg: string; text: string; border: string } {
  const colors: Record<PeriodStatus, { bg: string; text: string; border: string }> = {
    upcoming: {
      bg: 'var(--ds-color-info-surface-default)',
      text: 'var(--ds-color-info-text-default)',
      border: 'var(--ds-color-info-border-default)',
    },
    active: {
      bg: 'var(--ds-color-success-surface-default)',
      text: 'var(--ds-color-success-text-default)',
      border: 'var(--ds-color-success-border-default)',
    },
    ending_soon: {
      bg: 'var(--ds-color-warning-surface-default)',
      text: 'var(--ds-color-warning-text-default)',
      border: 'var(--ds-color-warning-border-default)',
    },
    ended: {
      bg: 'var(--ds-color-neutral-surface-default)',
      text: 'var(--ds-color-neutral-text-subtle)',
      border: 'var(--ds-color-neutral-border-default)',
    },
    draft: {
      bg: 'var(--ds-color-neutral-surface-hover)',
      text: 'var(--ds-color-neutral-text-subtle)',
      border: 'var(--ds-color-neutral-border-subtle)',
    },
    cancelled: {
      bg: 'var(--ds-color-danger-surface-default)',
      text: 'var(--ds-color-danger-text-default)',
      border: 'var(--ds-color-danger-border-default)',
    },
  };
  return colors[type];
}

// ============================================================================
// Sub-components
// ============================================================================

/** Status badge component */
interface StatusBadgeProps {
  status: PeriodStatusDisplay;
}

function StatusBadge({ status }: StatusBadgeProps) {
  const colors = getStatusColors(status.type);

  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        padding: 'var(--ds-spacing-1) var(--ds-spacing-3)',
        fontSize: 'var(--ds-font-size-xs)',
        fontWeight: 500,
        backgroundColor: colors.bg,
        color: colors.text,
        borderRadius: 'var(--ds-border-radius-full)',
        whiteSpace: 'nowrap',
      }}
    >
      {status.label}
    </span>
  );
}

/** Period date display component */
interface PeriodDateDisplayProps {
  period: PeriodInfo;
}

function PeriodDateDisplay({ period }: PeriodDateDisplayProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--ds-spacing-2)',
        color: 'var(--ds-color-neutral-text-subtle)',
        fontSize: 'var(--ds-font-size-sm)',
      }}
    >
      <CalendarIcon size={14} />
      <Text>{period.startDate}</Text>
      <ArrowRightIcon size={12} />
      <Text>{period.endDate}</Text>
      {period.label && (
        <span
          style={{
            marginLeft: 'var(--ds-spacing-1)',
            color: 'var(--ds-color-neutral-text-default)',
            fontWeight: 500,
          }}
        >
          ({period.label})
        </span>
      )}
    </div>
  );
}

/** Deadline display component */
interface DeadlineDisplayProps {
  deadline: PeriodDeadline;
}

function DeadlineDisplay({ deadline }: DeadlineDisplayProps) {
  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--ds-spacing-2)',
        color: 'var(--ds-color-warning-text-default)',
        fontSize: 'var(--ds-font-size-xs)',
        padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
        backgroundColor: 'var(--ds-color-warning-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)',
      }}
    >
      <ClockIcon size={12} />
      <Text style={{ fontWeight: 'var(--ds-font-weight-medium)' as unknown as number }}>{deadline.label}:</Text>
      <Text>{deadline.date}</Text>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function PeriodCard({
  id,
  title,
  subtitle,
  description,
  period,
  status,
  deadline,
  image,
  onClick,
  onAction,
  actionLabel,
  actionDisabled = false,
  variant = 'default',
  className,
}: PeriodCardProps): React.ReactElement {
  const [isHovered, setIsHovered] = React.useState(false);

  const handleClick = () => {
    if (onClick) {
      onClick(id);
    }
  };

  const handleAction = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onAction) {
      onAction(id);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if ((e.key === 'Enter' || e.key === ' ') && onClick) {
      e.preventDefault();
      onClick(id);
    }
  };

  const isClickable = !!onClick;

  // Compact variant
  if (variant === 'compact') {
    return (
      <div
        className={cn('period-card period-card--compact', className)}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        role={isClickable ? 'button' : undefined}
        tabIndex={isClickable ? 0 : undefined}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--ds-spacing-4)',
          padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
          backgroundColor:
            isHovered && isClickable
              ? 'var(--ds-color-neutral-surface-hover)'
              : 'var(--ds-color-neutral-background-default)',
          borderRadius: 'var(--ds-border-radius-lg)',
          border: '1px solid var(--ds-color-neutral-border-subtle)',
          cursor: isClickable ? 'pointer' : 'default',
          transition: 'all 0.2s ease',
        }}
      >
        {/* Title and status */}
        <div style={{ flex: 1, minWidth: 0 }}>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-3)',
            }}
          >
            <Paragraph
              data-size="sm"
              style={{
                margin: 0,
                fontWeight: 600,
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                whiteSpace: 'nowrap',
              }}
            >
              {title}
            </Paragraph>
            <StatusBadge status={status} />
          </div>
        </div>

        {/* Period */}
        <div style={{ flexShrink: 0 }}>
          <Paragraph
            data-size="xs"
            style={{
              margin: 0,
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {period.startDate} - {period.endDate}
          </Paragraph>
        </div>

        {/* Action */}
        {onAction && actionLabel && (
          <Button
            type="button"
            variant="secondary"
            data-size="sm"
            onClick={handleAction}
            disabled={actionDisabled}
          >
            {actionLabel}
          </Button>
        )}
      </div>
    );
  }

  // Default variant
  return (
    <div
      className={cn('period-card', className)}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      role={isClickable ? 'button' : undefined}
      tabIndex={isClickable ? 0 : undefined}
      style={{
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
        borderRadius: 'var(--ds-border-radius-xl)',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
        overflow: 'hidden',
        cursor: isClickable ? 'pointer' : 'default',
        transition: 'all 0.2s ease',
        boxShadow: isHovered && isClickable ? 'var(--ds-shadow-md)' : 'var(--ds-shadow-sm)',
        transform: isHovered && isClickable ? 'translateY(-2px)' : 'none',
      }}
    >
      {/* Image section (optional) */}
      {image && (
        <Stack
          style={{
            position: 'relative',
            width: '100%',
            height: '140px',
            overflow: 'hidden',
          }}
        >
          <img
            src={image.src}
            alt={image.alt}
            style={{
              width: '100%',
              maxWidth: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          />
          {/* Status badge overlay */}
          <div
            style={{
              position: 'absolute',
              top: 'var(--ds-spacing-3)',
              right: 'var(--ds-spacing-3)',
            }}
          >
            <StatusBadge status={status} />
          </div>
        </Stack>
      )}

      {/* Content section */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-3)',
          padding: 'var(--ds-spacing-4)',
        }}
      >
        {/* Header: Title, subtitle, and status (if no image) */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            gap: 'var(--ds-spacing-3)',
          }}
        >
          <div style={{ flex: 1, minWidth: 0 }}>
            {subtitle && (
              <Paragraph
                data-size="xs"
                style={{
                  margin: 0,
                  marginBottom: 'var(--ds-spacing-1)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 500,
                }}
              >
                {subtitle}
              </Paragraph>
            )}
            <Heading level={3} data-size="sm" style={{ margin: 0 }}>
              {title}
            </Heading>
          </div>
          {!image && <StatusBadge status={status} />}
        </div>

        {/* Description */}
        {description && (
          <Paragraph
            data-size="sm"
            style={{
              margin: 0,
              color: 'var(--ds-color-neutral-text-subtle)',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
            }}
          >
            {description}
          </Paragraph>
        )}

        {/* Period dates */}
        <PeriodDateDisplay period={period} />

        {/* Deadline (if provided) */}
        {deadline && <DeadlineDisplay deadline={deadline} />}

        {/* Action button */}
        {onAction && actionLabel && (
          <div style={{ marginTop: 'var(--ds-spacing-2)' }}>
            <Button
              type="button"
              variant="primary"
              data-color="accent"
              onClick={handleAction}
              disabled={actionDisabled}
              style={{ width: '100%' }}
            >
              {actionLabel}
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default PeriodCard;
