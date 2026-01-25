/**
 * PublishingChecklist Component
 *
 * Validation checklist showing OK/Missing/Warning status for each required field.
 * Used in wizard publishing step to show completion status.
 *
 * @example
 * ```tsx
 * import { PublishingChecklist } from '@xala-technologies/platform/ui';
 *
 * const items = [
 *   { id: 'name', label: 'Navn', status: 'ok' },
 *   { id: 'address', label: 'Adresse', status: 'ok' },
 *   { id: 'price', label: 'Pris', status: 'missing', stepIndex: 3 },
 *   { id: 'images', label: 'Bilder', status: 'warning', description: 'Anbefalt' },
 * ];
 *
 * <PublishingChecklist
 *   items={items}
 *   onItemClick={(item) => goToStep(item.stepIndex)}
 * />
 * ```
 */

import * as React from 'react';
import { Heading, Paragraph, Button } from '@digdir/designsystemet-react';
import { cn } from '../utils';
import { StatusTag, type BadgeColor } from '../blocks/StatusBadges';

// =============================================================================
// Types
// =============================================================================

export type ChecklistItemStatus = 'ok' | 'missing' | 'warning';

export interface ChecklistItem {
    /** Unique identifier */
    id: string;
    /** Display label */
    label: string;
    /** Validation status */
    status: ChecklistItemStatus;
    /** Optional description or error message */
    description?: string;
    /** Optional link to wizard step */
    stepIndex?: number;
}

export interface PublishingChecklistLabels {
    /** Title for the checklist */
    title?: string;
    /** Status labels */
    ok?: string;
    missing?: string;
    warning?: string;
    /** Screen reader labels */
    statusOk?: string;
    statusMissing?: string;
    statusWarning?: string;
}

export interface PublishingChecklistProps {
    /** Checklist items */
    items: ChecklistItem[];
    /** Localization labels */
    labels?: PublishingChecklistLabels;
    /** Click handler for navigating to step */
    onItemClick?: (item: ChecklistItem) => void;
    /** Show title header */
    showTitle?: boolean;
    /** Additional className */
    className?: string;
}

// =============================================================================
// Default labels
// =============================================================================

const defaultLabels: Required<PublishingChecklistLabels> = {
    title: 'Sjekkliste for publisering',
    ok: 'OK',
    missing: 'Mangler',
    warning: 'Anbefalt',
    statusOk: 'Fullført',
    statusMissing: 'Mangler - klikk for å fikse',
    statusWarning: 'Anbefalt - klikk for å legge til',
};

// =============================================================================
// Status configuration
// =============================================================================

const statusToColor: Record<ChecklistItemStatus, BadgeColor> = {
    ok: 'success',
    missing: 'danger',
    warning: 'warning',
};

// =============================================================================
// Component
// =============================================================================

/**
 * PublishingChecklist displays a validation checklist for wizard completion.
 *
 * Accessibility:
 * - Semantic list structure
 * - Status conveyed via StatusTag (icon + text, not color-only)
 * - Keyboard accessible when interactive
 * - Screen reader announcements for status
 */
export function PublishingChecklist({
    items,
    labels: customLabels,
    onItemClick,
    showTitle = true,
    className,
}: PublishingChecklistProps): React.ReactElement {
    const labels = { ...defaultLabels, ...customLabels };
    const isInteractive = Boolean(onItemClick);

    const getStatusLabel = (status: ChecklistItemStatus): string => {
        switch (status) {
            case 'ok':
                return labels.ok;
            case 'missing':
                return labels.missing;
            case 'warning':
                return labels.warning;
        }
    };

    const getAriaLabel = (item: ChecklistItem): string => {
        const statusLabel = getStatusLabel(item.status);
        const baseLabel = `${item.label}: ${statusLabel}`;

        if (isInteractive && item.status !== 'ok') {
            switch (item.status) {
                case 'missing':
                    return `${baseLabel}. ${labels.statusMissing}`;
                case 'warning':
                    return `${baseLabel}. ${labels.statusWarning}`;
            }
        }

        return baseLabel;
    };

    // Count statuses for summary
    const statusCounts = items.reduce(
        (acc, item) => {
            acc[item.status]++;
            return acc;
        },
        { ok: 0, missing: 0, warning: 0 }
    );

    const containerStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-3)',
    };

    const listStyle: React.CSSProperties = {
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-2)',
        padding: 0,
        margin: 0,
        listStyle: 'none',
    };

    const itemBaseStyle: React.CSSProperties = {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 'var(--ds-spacing-3)',
        padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
        borderRadius: 'var(--ds-border-radius-md)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        border: 'none',
        width: '100%',
        textAlign: 'left',
    };

    const itemInteractiveStyle: React.CSSProperties = {
        ...itemBaseStyle,
        cursor: 'pointer',
    };

    return (
        <div className={cn('publishing-checklist', className)} style={containerStyle}>
            {showTitle && (
                <Heading level={3} data-size="xs" style={{ margin: 0 }}>
                    {labels.title}
                </Heading>
            )}

            <ul style={listStyle} role="list" aria-label={labels.title}>
                {items.map((item) => {
                    const canClick = isInteractive && item.status !== 'ok';

                    const content = (
                        <>
                            <div style={{ display: 'flex', flexDirection: 'column', flex: 1, minWidth: 0 }}>
                                <Paragraph data-size="sm" style={{ margin: 0 }}>
                                    {item.label}
                                </Paragraph>
                                {item.description && (
                                    <Paragraph
                                        data-size="xs"
                                        style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
                                    >
                                        {item.description}
                                    </Paragraph>
                                )}
                            </div>
                            <StatusTag color={statusToColor[item.status]} size="sm">
                                {getStatusLabel(item.status)}
                            </StatusTag>
                        </>
                    );

                    if (canClick) {
                        return (
                            <li key={item.id} style={{ listStyle: 'none' }}>
                                <Button
                                    variant="tertiary"
                                    data-size="sm"
                                    onClick={() => onItemClick?.(item)}
                                    aria-label={getAriaLabel(item)}
                                    style={{
                                        ...itemInteractiveStyle,
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    {content}
                                </Button>
                            </li>
                        );
                    }

                    return (
                        <li key={item.id} style={{ listStyle: 'none' }}>
                            <div style={itemBaseStyle} aria-label={getAriaLabel(item)}>
                                {content}
                            </div>
                        </li>
                    );
                })}
            </ul>

            {/* Announce summary for screen readers */}
            <div
                style={{
                    position: 'absolute',
                    width: 1,
                    height: 1,
                    padding: 0,
                    margin: -1,
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                    border: 0,
                }}
                aria-live="polite"
            >
                {statusCounts.ok} fullført, {statusCounts.missing} mangler, {statusCounts.warning} anbefalinger
            </div>
        </div>
    );
}

PublishingChecklist.displayName = 'PublishingChecklist';
