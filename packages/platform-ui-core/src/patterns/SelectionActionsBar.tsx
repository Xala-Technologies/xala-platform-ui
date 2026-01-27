/**
 * SelectionActionsBar
 *
 * A domain-neutral floating action bar for bulk operations on selected items.
 * Appears when items are selected in a list/grid view.
 *
 * All text content is pre-localized - this component does not handle i18n internally.
 *
 * @example
 * ```tsx
 * <SelectionActionsBar
 *   selectedCount={selectedIds.length}
 *   actions={[
 *     { id: 'publish', label: 'Publish', onClick: handlePublish, variant: 'secondary' },
 *     { id: 'archive', label: 'Archive', onClick: handleArchive, variant: 'secondary' },
 *     { id: 'delete', label: 'Delete', onClick: handleDelete, variant: 'primary', color: 'danger' },
 *   ]}
 *   onClearSelection={() => setSelectedIds([])}
 *   labels={{
 *     selectedCount: '{count} selected',
 *     clearSelection: 'Clear selection',
 *   }}
 * />
 * ```
 */
import * as React from 'react';
import type { ReactNode } from 'react';
import { Button, Tag } from '../primitives';

// ============================================================================
// Types
// ============================================================================

/** Color type for action buttons */
export type SelectionActionColor = 'accent' | 'neutral' | 'danger';

/** Action button configuration */
export interface SelectionAction {
  /** Unique identifier */
  id: string;
  /** Button label (pre-localized) */
  label: string;
  /** Click handler */
  onClick: () => void;
  /** Button variant */
  variant?: 'primary' | 'secondary' | 'tertiary';
  /** Color variant */
  color?: SelectionActionColor;
  /** Icon to display */
  icon?: ReactNode;
  /** Whether the action is disabled */
  disabled?: boolean;
  /** Whether the action is loading */
  loading?: boolean;
}

/** Localized labels */
export interface SelectionActionsBarLabels {
  /** Selected count template (use {count} placeholder) */
  selectedCount?: string;
  /** Clear selection button label */
  clearSelection?: string;
}

/** SelectionActionsBar props */
export interface SelectionActionsBarProps {
  /** Number of selected items */
  selectedCount: number;

  /** Array of action buttons */
  actions: SelectionAction[];

  /** Handler for clearing selection */
  onClearSelection: () => void;

  /** Position of the bar */
  position?: 'bottom' | 'top';

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Whether to show the bar even when count is 0 */
  showWhenEmpty?: boolean;

  /** Localized labels */
  labels?: SelectionActionsBarLabels;

  /** Custom class name */
  className?: string;

  /** Test ID for testing */
  'data-testid'?: string;
}

// ============================================================================
// Default Labels
// ============================================================================

const DEFAULT_LABELS: Required<SelectionActionsBarLabels> = {
  selectedCount: '{count} selected',
  clearSelection: 'Clear',
};

// ============================================================================
// Utility Functions
// ============================================================================

/** Replace {count} placeholder with actual count */
function formatCount(template: string, count: number): string {
  return template.replace('{count}', String(count));
}

// ============================================================================
// Main Component
// ============================================================================

export function SelectionActionsBar({
  selectedCount,
  actions,
  onClearSelection,
  position = 'bottom',
  size = 'md',
  showWhenEmpty = false,
  labels = {},
  className,
  'data-testid': testId = 'selection-actions-bar',
}: SelectionActionsBarProps): React.ReactElement | null {
  const mergedLabels: Required<SelectionActionsBarLabels> = {
    ...DEFAULT_LABELS,
    ...labels,
  };

  // Hide when no items are selected (unless showWhenEmpty is true)
  if (selectedCount === 0 && !showWhenEmpty) {
    return null;
  }

  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  const padding = isSmall
    ? 'var(--ds-spacing-3) var(--ds-spacing-4)'
    : isLarge
      ? 'var(--ds-spacing-5) var(--ds-spacing-8)'
      : 'var(--ds-spacing-4) var(--ds-spacing-6)';

  const gap = isSmall
    ? 'var(--ds-spacing-3)'
    : isLarge
      ? 'var(--ds-spacing-5)'
      : 'var(--ds-spacing-4)';

  const positionStyle =
    position === 'top'
      ? { top: 'var(--ds-spacing-6)', bottom: 'auto' }
      : { bottom: 'var(--ds-spacing-6)', top: 'auto' };

  return (
    <div
      className={className}
      data-testid={testId}
      style={{
        position: 'fixed',
        left: '50%',
        transform: 'translateX(-50%)',
        zIndex: 1000,
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        border: '1px solid var(--ds-color-neutral-border-default)',
        borderRadius: 'var(--ds-border-radius-xl)',
        boxShadow: 'var(--ds-shadow-xl)',
        padding,
        display: 'flex',
        alignItems: 'center',
        gap,
        animation: position === 'top' ? 'slideDown 0.3s ease' : 'slideUp 0.3s ease',
        ...positionStyle,
      }}
    >
      {/* Selected Count Tag */}
      <Tag data-color="accent" data-size={isSmall ? 'sm' : isLarge ? 'lg' : 'md'}>
        {formatCount(mergedLabels.selectedCount, selectedCount)}
      </Tag>

      {/* Divider */}
      <div
        style={{
          width: '1px',
          height: isSmall ? '24px' : isLarge ? '40px' : '32px',
          backgroundColor: 'var(--ds-color-neutral-border-default)',
        }}
      />

      {/* Action Buttons */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: isSmall ? 'var(--ds-spacing-2)' : 'var(--ds-spacing-3)',
        }}
      >
        {actions.map((action) => {
          const buttonColor: SelectionActionColor = action.color || 'neutral';
          return (
            <Button
              key={action.id}
              variant={action.variant || 'secondary'}
              data-color={buttonColor}
              data-size={isSmall ? 'sm' : isLarge ? 'lg' : 'md'}
              onClick={action.onClick}
              disabled={action.disabled || action.loading || selectedCount === 0}
              type="button"
            >
              {action.icon && (
                <span style={{ display: 'flex', marginRight: 'var(--ds-spacing-1)' }}>
                  {action.icon}
                </span>
              )}
              {action.label}
            </Button>
          );
        })}
      </div>

      {/* Divider */}
      <div
        style={{
          width: '1px',
          height: isSmall ? '24px' : isLarge ? '40px' : '32px',
          backgroundColor: 'var(--ds-color-neutral-border-default)',
        }}
      />

      {/* Clear Selection */}
      <Button
        variant="tertiary"
        data-size={isSmall ? 'sm' : isLarge ? 'lg' : 'md'}
        onClick={onClearSelection}
        type="button"
        disabled={selectedCount === 0}
      >
        {mergedLabels.clearSelection}
      </Button>

      {/* Animations */}
      <style>{`
        @keyframes slideUp {
          from {
            transform: translateX(-50%) translateY(20px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }
        @keyframes slideDown {
          from {
            transform: translateX(-50%) translateY(-20px);
            opacity: 0;
          }
          to {
            transform: translateX(-50%) translateY(0);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
}

export default SelectionActionsBar;
