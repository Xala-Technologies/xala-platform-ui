/**
 * Quick Actions Scaffold
 *
 * Creates a grid of quick action cards.
 * Pattern from Digilist QuickActionCard usage.
 */

import React from 'react';

export interface QuickAction {
  /** Action title */
  title: string;
  /** Optional description */
  description?: string;
  /** Icon */
  icon: React.ReactNode;
  /** Link href */
  href?: string;
  /** Click handler */
  onClick?: () => void;
  /** Disabled state */
  disabled?: boolean;
}

export interface QuickActionsConfig {
  /** Section title */
  title?: string;
  /** Actions to display */
  actions: QuickAction[];
  /** Grid columns [mobile, desktop] */
  columns?: [number, number];
}

/**
 * QuickActionCard component
 */
export function QuickActionCard({
  title,
  description,
  icon,
  href,
  onClick,
  disabled = false,
}: QuickAction): React.ReactElement {
  const handleClick = () => {
    if (!disabled && onClick) {
      onClick();
    }
  };

  const content = React.createElement(
    'div',
    {
      style: {
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderRadius: 'var(--ds-border-radius-lg)',
        padding: 'var(--ds-spacing-4)',
        textAlign: 'center',
        cursor: disabled ? 'not-allowed' : 'pointer',
        opacity: disabled ? 0.5 : 1,
        transition: 'transform 0.2s, box-shadow 0.2s',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
      },
      onClick: handleClick,
    },
    React.createElement(
      'div',
      {
        style: {
          width: '48px',
          height: '48px',
          margin: '0 auto var(--ds-spacing-3)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--ds-color-accent-surface-default)',
          borderRadius: 'var(--ds-border-radius-md)',
          color: 'var(--ds-color-accent-text-default)',
        },
      },
      icon
    ),
    React.createElement(
      'div',
      {
        style: {
          fontWeight: 'var(--ds-font-weight-medium)',
          fontSize: 'var(--ds-font-size-sm)',
        },
      },
      title
    ),
    description && React.createElement(
      'div',
      {
        style: {
          fontSize: 'var(--ds-font-size-xs)',
          color: 'var(--ds-color-neutral-text-subtle)',
          marginTop: 'var(--ds-spacing-1)',
        },
      },
      description
    )
  );

  if (href && !disabled) {
    return React.createElement('a', { href, style: { textDecoration: 'none', display: 'block' } }, content);
  }

  return content;
}

/**
 * QuickActions component
 */
export function QuickActions({ title, actions, columns = [2, 4] }: QuickActionsConfig): React.ReactElement {
  return React.createElement(
    'div',
    { 'data-testid': 'quick-actions' },
    title && React.createElement(
      'h2',
      {
        style: {
          fontSize: 'var(--ds-font-size-lg)',
          fontWeight: 'var(--ds-font-weight-semibold)',
          marginBottom: 'var(--ds-spacing-4)',
        },
      },
      title
    ),
    React.createElement(
      'div',
      {
        'data-testid': 'quick-actions-grid',
        style: {
          display: 'grid',
          gridTemplateColumns: `repeat(${columns[1]}, 1fr)`,
          gap: 'var(--ds-spacing-3)',
        },
      },
      React.createElement('style', null, `
        @media (max-width: 768px) {
          [data-testid="quick-actions-grid"] {
            grid-template-columns: repeat(${columns[0]}, 1fr) !important;
          }
        }
      `),
      actions.map((action, i) => React.createElement(QuickActionCard, { key: i, ...action }))
    )
  );
}

/**
 * Create quick actions element
 */
export function createQuickActions(config: QuickActionsConfig): React.ReactElement {
  return React.createElement(QuickActions, config);
}
