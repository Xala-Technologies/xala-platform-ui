/**
 * ChangelogCard Block
 *
 * Display card for changelog entries with version, date, and changes.
 */
import React from 'react';
import { Card, Paragraph, Heading, Link } from '../primitives';
import { StatusTag } from './StatusBadges';
import type { BadgeColor } from './StatusBadges';
import { Stack } from '../primitives';
import {
  SparklesIcon,
  RefreshIcon,
  AlertTriangleIcon,
  TrashIcon,
  InfoIcon,
  ShieldCheckIcon,
} from '../primitives/icons';

// ============================================================================
// Types
// ============================================================================

export type ChangeType = 'added' | 'changed' | 'fixed' | 'removed' | 'deprecated' | 'security';

export interface ChangeItem {
  type: ChangeType;
  description: string;
  issueNumber?: string;
  issueUrl?: string;
}

export interface ChangelogCardProps {
  version: string;
  title?: string;
  date: Date;
  changes: ChangeItem[];
  releaseUrl?: string;
  isLatest?: boolean;
  isPrerelease?: boolean;
  onClick?: () => void;
  className?: string;
}

// ============================================================================
// Constants
// ============================================================================

const CHANGE_TYPE_COLORS: Record<ChangeType, BadgeColor> = {
  added: 'success',
  changed: 'info',
  fixed: 'warning',
  removed: 'danger',
  deprecated: 'neutral',
  security: 'danger',
};

const CHANGE_TYPE_ICONS: Record<ChangeType, React.ReactNode> = {
  added: <SparklesIcon size={12} />,
  changed: <RefreshIcon size={12} />,
  fixed: <AlertTriangleIcon size={12} />,
  removed: <TrashIcon size={12} />,
  deprecated: <InfoIcon size={12} />,
  security: <ShieldCheckIcon size={12} />,
};

const CHANGE_TYPE_LABELS: Record<ChangeType, string> = {
  added: 'Added',
  changed: 'Changed',
  fixed: 'Fixed',
  removed: 'Removed',
  deprecated: 'Deprecated',
  security: 'Security',
};

// ============================================================================
// Component
// ============================================================================

export function ChangelogCard({
  version,
  title,
  date,
  changes,
  releaseUrl,
  isLatest = false,
  isPrerelease = false,
  onClick,
  className = '',
}: ChangelogCardProps) {
  // Group changes by type
  const groupedChanges = changes.reduce(
    (acc, change) => {
      if (!acc[change.type]) acc[change.type] = [];
      acc[change.type].push(change);
      return acc;
    },
    {} as Record<ChangeType, ChangeItem[]>
  );

  const formatDate = (d: Date) =>
    d.toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

  return (
    <Card
      data-color="neutral"
      onClick={onClick}
      style={{ cursor: onClick ? 'pointer' : 'default' }}
      className={className}
    >
      <Card.Block>
        {/* Header */}
        <Stack
          direction="horizontal"
          justify="between"
          align="center"
          style={{ marginBottom: 'var(--ds-spacing-3)' }}
        >
          <Stack direction="horizontal" align="center" gap="var(--ds-spacing-2)">
            <Heading data-size="sm">
              {releaseUrl ? (
                <Link href={releaseUrl} target="_blank" rel="noopener noreferrer">
                  v{version}
                </Link>
              ) : (
                `v${version}`
              )}
            </Heading>
            {isLatest && (
              <StatusTag color="success" size="sm">
                Latest
              </StatusTag>
            )}
            {isPrerelease && (
              <StatusTag color="warning" size="sm">
                Pre-release
              </StatusTag>
            )}
          </Stack>
          <Paragraph data-size="sm" style={{ opacity: 0.7 }}>
            {formatDate(date)}
          </Paragraph>
        </Stack>

        {/* Title */}
        {title && (
          <Paragraph style={{ marginBottom: 'var(--ds-spacing-3)', fontWeight: 'var(--ds-font-weight-medium)' as unknown as number }}>
            {title}
          </Paragraph>
        )}

        {/* Changes grouped by type */}
        <Stack direction="vertical" spacing="var(--ds-spacing-3)">
          {Object.entries(groupedChanges).map(([type, items]) => (
            <Stack key={type} direction="vertical">
              <Paragraph
                data-size="sm"
                style={{
                  fontWeight: 'var(--ds-font-weight-semibold)' as unknown as number,
                  marginBottom: 'var(--ds-spacing-1)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-1)',
                }}
              >
                {CHANGE_TYPE_ICONS[type as ChangeType]}
                {CHANGE_TYPE_LABELS[type as ChangeType]}
              </Paragraph>
              <ul style={{ margin: 0, paddingLeft: 'var(--ds-spacing-5)' }}>
                {items.map((item, idx) => (
                  <li key={idx} style={{ marginBottom: 'var(--ds-spacing-1)' }}>
                    <Paragraph data-size="sm">
                      {item.description}
                      {item.issueNumber && item.issueUrl && (
                        <>
                          {' '}
                          <Link
                            href={item.issueUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            style={{ opacity: 0.7 }}
                          >
                            (#{item.issueNumber})
                          </Link>
                        </>
                      )}
                    </Paragraph>
                  </li>
                ))}
              </ul>
            </Stack>
          ))}
        </Stack>

        {/* Summary badges */}
        <Stack
          direction="horizontal"
          gap="var(--ds-spacing-2)"
          wrap
          style={{ marginTop: 'var(--ds-spacing-3)' }}
        >
          {Object.entries(groupedChanges).map(([type, items]) => (
            <StatusTag key={type} color={CHANGE_TYPE_COLORS[type as ChangeType]} size="sm">
              {items.length} {type}
            </StatusTag>
          ))}
        </Stack>
      </Card.Block>
    </Card>
  );
}

export default ChangelogCard;
