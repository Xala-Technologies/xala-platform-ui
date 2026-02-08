/**
 * IssueCard Block
 *
 * Display card for GitHub/GitLab issues and pull requests.
 */
import React from 'react';
import { Card, Paragraph, Heading, Link } from '@digdir/designsystemet-react';
import { Stack } from '../primitives';
import { StatusTag } from './StatusBadges';
import type { BadgeColor } from './StatusBadges';
import { RepeatIcon, EditIcon, MessageSquareIcon, GridIcon } from '../primitives/icons';

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

const PLATFORM_ICONS: Record<IssuePlatform, React.ReactNode> = {
  github: <RepeatIcon size={14} />,
  gitlab: <RepeatIcon size={14} />,
  linear: <GridIcon size={14} />,
};

const TYPE_ICONS: Record<IssueType, React.ReactNode> = {
  issue: <EditIcon size={14} />,
  pull_request: <RepeatIcon size={14} />,
  merge_request: <RepeatIcon size={14} />,
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
        <Stack
          direction="horizontal"
          justify="between"
          style={{ marginBottom: 'var(--ds-spacing-2)' }}
        >
          <Paragraph
            data-size="sm"
            style={{
              opacity: 0.7,
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-1)',
            }}
          >
            {PLATFORM_ICONS[platform]} {TYPE_ICONS[type]} #{number}
          </Paragraph>
          <StatusTag color={STATE_COLORS[state]} size="sm">
            {STATE_LABELS[state]}
          </StatusTag>
        </Stack>

        {/* Title */}
        <Heading data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
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
          <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)', opacity: 0.8 }}>
            {body.length > 120 ? `${body.slice(0, 120)}...` : body}
          </Paragraph>
        )}

        {/* Labels */}
        {labels && labels.length > 0 && (
          <Stack
            direction="horizontal"
            gap="var(--ds-spacing-1)"
            wrap
            style={{ marginBottom: 'var(--ds-spacing-2)' }}
          >
            {labels.slice(0, 4).map((label) => (
              <span
                key={label.name}
                style={{
                  backgroundColor: label.color || undefined,
                  borderRadius: 'var(--ds-border-radius-full)',
                }}
              >
                <StatusTag color="neutral" size="sm">
                  {label.name}
                </StatusTag>
              </span>
            ))}
          </Stack>
        )}

        {/* Footer */}
        <Stack
          direction="horizontal"
          justify="between"
          align="center"
          style={{ marginTop: 'var(--ds-spacing-2)', opacity: 0.7 }}
        >
          <Stack direction="horizontal" align="center" gap="var(--ds-spacing-2)">
            {authorAvatar && (
              <img
                src={authorAvatar}
                alt={author}
                style={{ width: '20px', maxWidth: '100%', height: '20px', borderRadius: '50%' }}
              />
            )}
            {author && <Paragraph data-size="sm">{author}</Paragraph>}
          </Stack>
          <Stack direction="horizontal" align="center" gap="var(--ds-spacing-3)">
            {commentCount !== undefined && commentCount > 0 && (
              <Paragraph
                data-size="sm"
                style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-1)' }}
              >
                <MessageSquareIcon size={12} /> {commentCount}
              </Paragraph>
            )}
            {createdAt && <Paragraph data-size="sm">{formatDate(createdAt)}</Paragraph>}
          </Stack>
        </Stack>
      </Card.Block>
    </Card>
  );
}

export default IssueCard;
