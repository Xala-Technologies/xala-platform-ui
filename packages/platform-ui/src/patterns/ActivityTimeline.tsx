/* eslint-disable no-restricted-syntax */
/**
 * ActivityTimeline
 *
 * A domain-neutral activity timeline/feed component.
 * Displays events, history items, or activity logs with status indicators.
 *
 * All text content is pre-localized - this component does not handle i18n internally.
 *
 * @example
 * ```tsx
 * <ActivityTimeline
 *   items={[
 *     {
 *       id: '1',
 *       title: 'Meeting booked',
 *       description: 'Room A - 2 hours',
 *       timestamp: '2024-01-15T10:00:00Z',
 *       status: 'completed',
 *     },
 *   ]}
 *   formatDate={(date) => new Date(date).toLocaleDateString()}
 * />
 * ```
 */
import * as React from 'react';
import type { ReactNode } from 'react';
import { Heading, Paragraph, Card, Tag } from '@digdir/designsystemet-react';

// ============================================================================
// Types
// ============================================================================

/** Activity status */
export type ActivityStatus =
  | 'pending'
  | 'in_progress'
  | 'completed'
  | 'cancelled'
  | 'upcoming'
  | 'ongoing'
  | 'past'
  | string;

/** Timeline item definition */
export interface ActivityTimelineItem {
  /** Unique identifier */
  id: string;
  /** Title text */
  title: string;
  /** Optional description */
  description?: string;
  /** Timestamp (ISO string or Date) */
  timestamp?: string | Date;
  /** End timestamp for date ranges */
  endTimestamp?: string | Date;
  /** Time string (e.g., "09:00-11:00") */
  timeRange?: string;
  /** Status */
  status?: ActivityStatus;
  /** Status label override */
  statusLabel?: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Optional metadata key-value pairs */
  metadata?: Array<{ label: string; value: string }>;
  /** Optional tags */
  tags?: Array<{
    label: string;
    color?: 'accent' | 'neutral' | 'success' | 'warning' | 'danger' | 'info';
  }>;
  /** Optional actor/author */
  actor?: string;
  /** Custom data */
  data?: Record<string, unknown>;
}

/** Status color mapping */
export type StatusColorMap = Record<string, 'success' | 'warning' | 'danger' | 'info' | 'neutral'>;

/** Localized labels */
export interface ActivityTimelineLabels {
  /** Title text */
  title?: string;
  /** Empty state title */
  emptyTitle?: string;
  /** Empty state description */
  emptyDescription?: string;
  /** Showing count template */
  showingCount?: string;
  /** Actor prefix (e.g., "By:") */
  actorPrefix?: string;
}

/** ActivityTimeline props */
export interface ActivityTimelineProps {
  /** Timeline items to display */
  items: ActivityTimelineItem[];

  /** Section title */
  title?: string;

  /** Custom date formatter */
  formatDate?: (date: string | Date) => string;

  /** Custom time formatter */
  formatTime?: (date: string | Date) => string;

  /** Status color mapping */
  statusColors?: StatusColorMap;

  /** Whether to show items in cards */
  variant?: 'cards' | 'timeline' | 'compact';

  /** Empty state icon */
  emptyIcon?: ReactNode;

  /** Total count for "showing X of Y" */
  totalCount?: number;

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Localized labels */
  labels?: ActivityTimelineLabels;

  /** Click handler for items */
  onItemClick?: (item: ActivityTimelineItem) => void;

  /** Custom class name */
  className?: string;

  /** Test ID for testing */
  'data-testid'?: string;
}

// ============================================================================
// Default Labels
// ============================================================================

const DEFAULT_LABELS: Required<ActivityTimelineLabels> = {
  title: 'Activity',
  emptyTitle: 'No activity yet',
  emptyDescription: 'Activity will appear here when available',
  showingCount: 'Showing {current} of {total}',
  actorPrefix: 'By:',
};

// ============================================================================
// Default Status Colors
// ============================================================================

const DEFAULT_STATUS_COLORS: StatusColorMap = {
  pending: 'warning',
  in_progress: 'info',
  completed: 'success',
  cancelled: 'neutral',
  upcoming: 'info',
  ongoing: 'success',
  past: 'neutral',
};

// ============================================================================
// Icons
// ============================================================================

function CalendarIcon(): React.ReactElement {
  return (
    <svg
      width="20"
      height="20"
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
}

function ClockIcon(): React.ReactElement {
  return (
    <svg
      width="16"
      height="16"
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
}

// ============================================================================
// Helpers
// ============================================================================

function formatShowingCount(template: string, current: number, total: number): string {
  return template.replace('{current}', String(current)).replace('{total}', String(total));
}

function defaultFormatDate(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleDateString(undefined, {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
  });
}

function defaultFormatTime(date: string | Date): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return d.toLocaleTimeString(undefined, {
    hour: '2-digit',
    minute: '2-digit',
  });
}

// ============================================================================
// Sub-components
// ============================================================================

interface ActivityCardItemProps {
  item: ActivityTimelineItem;
  labels: Required<ActivityTimelineLabels>;
  statusColors: StatusColorMap;
  formatDate: (date: string | Date) => string;
  formatTime: (date: string | Date) => string;
  size: 'sm' | 'md' | 'lg';
  onClick?: (item: ActivityTimelineItem) => void;
}

function ActivityCardItem({
  item,
  labels,
  statusColors,
  formatDate,
  formatTime: _formatTime,
  size,
  onClick,
}: ActivityCardItemProps): React.ReactElement {
  const isSmall = size === 'sm';
  const statusColor = item.status ? statusColors[item.status] || 'neutral' : undefined;

  return (
    <Card
      style={{
        padding: isSmall ? 'var(--ds-spacing-3)' : 'var(--ds-spacing-4)',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick ? () => onClick(item) : undefined}
    >
      {/* Header row */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 'var(--ds-spacing-2)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
          {item.icon && (
            <span style={{ display: 'flex', color: 'var(--ds-color-neutral-text-subtle)' }}>
              {item.icon}
            </span>
          )}
          <Heading level={4} data-size="xs" style={{ margin: 0 }}>
            {item.title}
          </Heading>
        </div>
        {item.status && statusColor && (
          <Tag data-color={statusColor} data-size="sm">
            {item.statusLabel || item.status}
          </Tag>
        )}
      </div>

      {/* Date/time row */}
      {(item.timestamp || item.timeRange) && (
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--ds-spacing-3)',
            marginBottom: item.description ? 'var(--ds-spacing-2)' : 0,
          }}
        >
          {item.timestamp && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-1)' }}>
              <CalendarIcon />
              <Paragraph data-size="sm" style={{ margin: 0 }}>
                {formatDate(item.timestamp)}
                {item.endTimestamp &&
                  item.endTimestamp !== item.timestamp &&
                  ` - ${formatDate(item.endTimestamp)}`}
              </Paragraph>
            </div>
          )}
          {item.timeRange && (
            <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-1)' }}>
              <ClockIcon />
              <Paragraph
                data-size="sm"
                style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
              >
                {item.timeRange}
              </Paragraph>
            </div>
          )}
        </div>
      )}

      {/* Description */}
      {item.description && (
        <Paragraph
          data-size="sm"
          style={{
            margin: 0,
            marginTop: 'var(--ds-spacing-2)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {item.description}
        </Paragraph>
      )}

      {/* Metadata */}
      {item.metadata && item.metadata.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--ds-spacing-3)',
            marginTop: 'var(--ds-spacing-2)',
          }}
        >
          {item.metadata.map((meta, idx) => (
            <Paragraph key={idx} data-size="xs" style={{ margin: 0 }}>
              <span style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>{meta.label}:</span>{' '}
              {meta.value}
            </Paragraph>
          ))}
        </div>
      )}

      {/* Tags */}
      {item.tags && item.tags.length > 0 && (
        <div
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--ds-spacing-1)',
            marginTop: 'var(--ds-spacing-2)',
          }}
        >
          {item.tags.map((tag, idx) => (
            <Tag key={idx} data-color={tag.color || 'neutral'} data-size="sm">
              {tag.label}
            </Tag>
          ))}
        </div>
      )}

      {/* Actor */}
      {item.actor && (
        <Paragraph
          data-size="xs"
          style={{
            margin: 0,
            marginTop: 'var(--ds-spacing-2)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {labels.actorPrefix} {item.actor}
        </Paragraph>
      )}
    </Card>
  );
}

interface TimelineRowProps {
  item: ActivityTimelineItem;
  labels: Required<ActivityTimelineLabels>;
  statusColors: StatusColorMap;
  formatDate: (date: string | Date) => string;
  size: 'sm' | 'md' | 'lg';
  onClick?: (item: ActivityTimelineItem) => void;
}

function ActivityTimelineItemRow({
  item,
  statusColors,
  formatDate,
  size,
  onClick,
}: TimelineRowProps): React.ReactElement {
  const isSmall = size === 'sm';
  const statusColor = item.status ? statusColors[item.status] || 'neutral' : 'neutral';

  const dotColorMap: Record<string, string> = {
    success: 'var(--ds-color-success-base-default)',
    warning: 'var(--ds-color-warning-base-default)',
    danger: 'var(--ds-color-danger-base-default)',
    info: 'var(--ds-color-info-base-default)',
    neutral: 'var(--ds-color-neutral-base-default)',
  };

  return (
    <div
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--ds-spacing-4)',
        padding: isSmall ? 'var(--ds-spacing-2)' : 'var(--ds-spacing-3)',
        borderRadius: 'var(--ds-border-radius-md)',
        backgroundColor: 'var(--ds-color-neutral-surface-hover)',
        cursor: onClick ? 'pointer' : 'default',
      }}
      onClick={onClick ? () => onClick(item) : undefined}
    >
      {/* Timeline dot */}
      <div
        style={{
          width: '8px',
          height: '8px',
          borderRadius: 'var(--ds-border-radius-full)',
          backgroundColor: dotColorMap[statusColor] || dotColorMap.neutral,
          flexShrink: 0,
        }}
      />

      {/* Content */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Paragraph data-size="sm" style={{ margin: 0 }}>
            {item.timestamp && formatDate(item.timestamp)}
            {item.timeRange && ` • ${item.timeRange}`}
          </Paragraph>
          {item.status && (
            <Tag data-color={statusColor} data-size="sm">
              {item.statusLabel || item.status}
            </Tag>
          )}
        </div>
        {(item.title || item.description) && (
          <Paragraph
            data-size="xs"
            style={{
              margin: 0,
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {item.title}
            {item.description && ` - ${item.description}`}
          </Paragraph>
        )}
      </div>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function ActivityTimeline({
  items,
  title,
  formatDate = defaultFormatDate,
  formatTime = defaultFormatTime,
  statusColors = DEFAULT_STATUS_COLORS,
  variant = 'cards',
  emptyIcon,
  totalCount,
  size = 'md',
  labels = {},
  onItemClick,
  className,
  'data-testid': testId = 'activity-feed',
}: ActivityTimelineProps): React.ReactElement {
  const mergedLabels: Required<ActivityTimelineLabels> = {
    ...DEFAULT_LABELS,
    ...labels,
  };

  const mergedStatusColors: StatusColorMap = {
    ...DEFAULT_STATUS_COLORS,
    ...statusColors,
  };

  const isSmall = size === 'sm';
  const isEmpty = !items || items.length === 0;

  // Empty state
  if (isEmpty) {
    return (
      <div
        className={className}
        data-testid={testId}
        style={{
          textAlign: 'center',
          padding: 'var(--ds-spacing-8)',
          color: 'var(--ds-color-neutral-text-subtle)',
        }}
      >
        {emptyIcon || <CalendarIcon />}
        <Heading level={3} data-size="sm" style={{ margin: 0, marginTop: 'var(--ds-spacing-4)' }}>
          {mergedLabels.emptyTitle}
        </Heading>
        <Paragraph
          data-size="sm"
          style={{ margin: 0, marginTop: 'var(--ds-spacing-2)', fontStyle: 'italic' }}
        >
          {mergedLabels.emptyDescription}
        </Paragraph>
      </div>
    );
  }

  return (
    <div
      className={className}
      data-testid={testId}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-4)',
      }}
    >
      {/* Title */}
      {title && (
        <Heading level={2} data-size={isSmall ? 'xs' : 'sm'} style={{ margin: 0 }}>
          {title}
        </Heading>
      )}

      {/* Items */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: variant === 'timeline' ? 'var(--ds-spacing-2)' : 'var(--ds-spacing-3)',
        }}
      >
        {items.map((item) =>
          variant === 'timeline' || variant === 'compact' ? (
            <ActivityTimelineItemRow
              key={item.id}
              item={item}
              labels={mergedLabels}
              statusColors={mergedStatusColors}
              formatDate={formatDate}
              size={size}
              onClick={onItemClick}
            />
          ) : (
            <ActivityCardItem
              key={item.id}
              item={item}
              labels={mergedLabels}
              statusColors={mergedStatusColors}
              formatDate={formatDate}
              formatTime={formatTime}
              size={size}
              onClick={onItemClick}
            />
          )
        )}
      </div>

      {/* Showing count */}
      {totalCount && totalCount > items.length && (
        <Paragraph
          data-size="sm"
          style={{
            margin: 0,
            textAlign: 'center',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {formatShowingCount(mergedLabels.showingCount, items.length, totalCount)}
        </Paragraph>
      )}
    </div>
  );
}

export default ActivityTimeline;
