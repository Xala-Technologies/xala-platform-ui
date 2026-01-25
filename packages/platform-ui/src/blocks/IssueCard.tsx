/**
 * IssueCard Block
 *
 * Display card for GitHub/GitLab issues and pull requests.
 */
import React from 'react';
import { Card, Paragraph, Heading, Link } from '@digdir/designsystemet-react';
import { StatusTag } from './StatusBadges';
import type { BadgeColor } from './StatusBadges';

// ============================================================================
// Types
// ============================================================================

export type IssueState = 'open' | 'closed' | 'merged' | 'draft';
export type IssueType = 'issue' | 'pull_request' | 'merge_request';
export type IssuePlatform = 'github' | 'gitlab' | 'linear';

export interface IssueLabel {
  name: string;
  color?: string;
}

export interface IssueCardProps {
  number: number;
  title: string;
  body?: string;
  state: IssueState;
  type: IssueType;
  platform: IssuePlatform;
  author?: string;
  authorAvatar?: string;
  createdAt?: Date;
  labels?: IssueLabel[];
  commentCount?: number;
  url?: string;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
}

// ============================================================================
// Constants
// ============================================================================

const STATE_COLORS: Record<IssueState, BadgeColor> = {
  open: 'success',
  closed: 'danger',
  merged: 'info',
  draft: 'neutral',
};

const STATE_LABELS: Record<IssueState, string> = {
  open: 'Open',
  closed: 'Closed',
  merged: 'Merged',
  draft: 'Draft',
};

const PLATFORM_ICONS: Record<IssuePlatform, string> = {
  github: '🐙',
  gitlab: '🦊',
  linear: '📋',
};

const TYPE_ICONS: Record<IssueType, string> = {
  issue: '📝',
  pull_request: '🔀',
  merge_request: '🔀',
};

// ============================================================================
// Component
// ============================================================================

export function IssueCard({
  number,
  title,
  body,
  state,
  type,
  platform,
  author,
  authorAvatar,
  createdAt,
  labels,
  commentCount,
  url,
  onClick,
  selected = false,
  className = '',
}: IssueCardProps) {
  const cardStyle: React.CSSProperties = {
    cursor: onClick ? 'pointer' : 'default',
    borderLeft: selected ? '3px solid var(--ds-color-accent-base-default)' : undefined,
    opacity: state === 'closed' || state === 'merged' ? 0.7 : 1,
  };

  const formatDate = (date: Date) => {
    const now = new Date();
    const diff = now.getTime() - date.getTime();
    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    if (days === 0) return 'today';
    if (days === 1) return 'yesterday';
    if (days < 7) return `${days} days ago`;
    return date.toLocaleDateString();
  };

  return (
    <Card data-color="neutral" onClick={onClick} style={cardStyle} className={className}>
      <Card.Block>
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          <Paragraph data-size="sm" style={{ opacity: 0.7 }}>
            {PLATFORM_ICONS[platform]} {TYPE_ICONS[type]} #{number}
          </Paragraph>
          <StatusTag color={STATE_COLORS[state]} size="sm">
            {STATE_LABELS[state]}
          </StatusTag>
        </div>

        {/* Title */}
        <Heading data-size="xs" style={{ marginBottom: '0.5rem' }}>
          {url ? (
            <Link href={url} target="_blank" rel="noopener noreferrer">
              {title}
            </Link>
          ) : (
            title
          )}
        </Heading>

        {/* Body preview */}
        {body && (
          <Paragraph data-size="sm" style={{ marginBottom: '0.75rem', opacity: 0.8 }}>
            {body.length > 120 ? `${body.slice(0, 120)}...` : body}
          </Paragraph>
        )}

        {/* Labels */}
        {labels && labels.length > 0 && (
          <div
            style={{ display: 'flex', gap: '0.25rem', marginBottom: '0.5rem', flexWrap: 'wrap' }}
          >
            {labels.slice(0, 4).map((label) => (
              <span
                key={label.name}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.125rem 0.375rem',
                  backgroundColor: label.color || 'var(--ds-color-neutral-surface-hover)',
                  color: label.color ? '#fff' : 'inherit',
                  borderRadius: '0.25rem',
                }}
              >
                {label.name}
              </span>
            ))}
          </div>
        )}

        {/* Footer */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginTop: '0.5rem',
            opacity: 0.7,
          }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            {authorAvatar && (
              <img
                src={authorAvatar}
                alt={author}
                style={{ width: '20px', height: '20px', borderRadius: '50%' }}
              />
            )}
            {author && <Paragraph data-size="sm">{author}</Paragraph>}
          </div>
          <div style={{ display: 'flex', gap: '0.75rem' }}>
            {commentCount !== undefined && commentCount > 0 && (
              <Paragraph data-size="sm">💬 {commentCount}</Paragraph>
            )}
            {createdAt && <Paragraph data-size="sm">{formatDate(createdAt)}</Paragraph>}
          </div>
        </div>
      </Card.Block>
    </Card>
  );
}

export default IssueCard;
