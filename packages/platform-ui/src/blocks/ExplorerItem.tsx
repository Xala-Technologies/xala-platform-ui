/**
 * ExplorerItem Block
 *
 * A selectable list item for component explorers, sidebars, and navigation.
 * Uses design tokens only, no hardcoded values.
 */

import * as React from 'react';
import { forwardRef } from 'react';
import { Paragraph } from '@digdir/designsystemet-react';
import { cn } from '../utils';

export interface ExplorerItemProps extends React.HTMLAttributes<HTMLButtonElement> {
  /** Item title */
  title: string;

  /** Optional description */
  description?: string;

  /** Whether this item is currently selected */
  selected?: boolean;

  /** Optional icon */
  icon?: React.ReactNode;

  /** Click handler */
  onClick?: () => void;
}

export const ExplorerItem = forwardRef<HTMLButtonElement, ExplorerItemProps>(
  ({ title, description, selected = false, icon, onClick, className, ...props }, ref) => {
    return (
      <button
        ref={ref}
        type="button"
        className={cn('ds-explorer-item', selected && 'ds-explorer-item--selected', className)}
        onClick={onClick}
        style={{
          display: 'flex',
          alignItems: 'flex-start',
          gap: 'var(--ds-spacing-3)',
          width: '100%',
          padding: 'var(--ds-spacing-3)',
          marginBottom: 'var(--ds-spacing-2)',
          borderRadius: 'var(--ds-border-radius-md)',
          cursor: 'pointer',
          backgroundColor: selected
            ? 'var(--ds-color-accent-surface-default)'
            : 'transparent',
          border: selected
            ? '1px solid var(--ds-color-accent-border-default)'
            : '1px solid transparent',
          textAlign: 'left',
          transition: 'background-color 150ms ease, border-color 150ms ease',
        }}
        {...props}
      >
        {icon && (
          <span
            style={{
              color: 'var(--ds-color-neutral-text-subtle)',
              flexShrink: 0,
            }}
          >
            {icon}
          </span>
        )}
        <span style={{ flex: 1, minWidth: 0 }}>
          <Paragraph
            data-size="sm"
            style={{
              fontWeight: 'var(--ds-font-weight-medium)',
              margin: 0,
            }}
          >
            {title}
          </Paragraph>
          {description && (
            <Paragraph
              data-size="xs"
              style={{
                color: 'var(--ds-color-neutral-text-subtle)',
                margin: 0,
              }}
            >
              {description}
            </Paragraph>
          )}
        </span>
      </button>
    );
  }
);

ExplorerItem.displayName = 'ExplorerItem';

export default ExplorerItem;
