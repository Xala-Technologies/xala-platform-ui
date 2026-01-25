/**
 * ChangelogCard Block
 *
 * Display card for changelog entries with version, date, and changes.
 */
import React from 'react';
import { Card, Paragraph, Heading, Link } from '@digdir/designsystemet-react';
import { StatusTag } from './StatusBadges';
import type { BadgeColor } from './StatusBadges';

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

const CHANGE_TYPE_LABELS: Record<ChangeType, string> = {
    added: '✨ Added',
    changed: '🔄 Changed',
    fixed: '🐛 Fixed',
    removed: '🗑️ Removed',
    deprecated: '⚠️ Deprecated',
    security: '🔒 Security',
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
                <div
                    style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        marginBottom: '0.75rem',
                    }}
                >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
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
                    </div>
                    <Paragraph data-size="sm" style={{ opacity: 0.7 }}>
                        {formatDate(date)}
                    </Paragraph>
                </div>

                {/* Title */}
                {title && (
                    <Paragraph style={{ marginBottom: '0.75rem', fontWeight: 500 }}>{title}</Paragraph>
                )}

                {/* Changes grouped by type */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                    {Object.entries(groupedChanges).map(([type, items]) => (
                        <div key={type}>
                            <Paragraph data-size="sm" style={{ fontWeight: 600, marginBottom: '0.375rem' }}>
                                {CHANGE_TYPE_LABELS[type as ChangeType]}
                            </Paragraph>
                            <ul style={{ margin: 0, paddingLeft: '1.25rem' }}>
                                {items.map((item, idx) => (
                                    <li key={idx} style={{ marginBottom: '0.25rem' }}>
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
                        </div>
                    ))}
                </div>

                {/* Summary badges */}
                <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.75rem', flexWrap: 'wrap' }}>
                    {Object.entries(groupedChanges).map(([type, items]) => (
                        <StatusTag key={type} color={CHANGE_TYPE_COLORS[type as ChangeType]} size="sm">
                            {items.length} {type}
                        </StatusTag>
                    ))}
                </div>
            </Card.Block>
        </Card>
    );
}

export default ChangelogCard;
