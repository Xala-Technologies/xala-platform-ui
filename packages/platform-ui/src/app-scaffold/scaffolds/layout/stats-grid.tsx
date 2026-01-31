/**
 * Stats Grid Scaffold
 *
 * Creates a responsive grid of stat cards.
 * Pattern from Digilist StatCard usage.
 */

import React from 'react';

export interface StatConfig {
  /** Stat label */
  label: string;
  /** Stat value */
  value: string | number;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Trend direction */
  trend?: 'up' | 'down' | 'neutral';
  /** Trend value (e.g., "+5%") */
  trendValue?: string;
  /** Color variant */
  color?: 'default' | 'success' | 'warning' | 'danger' | 'info';
  /** Link href */
  href?: string;
  /** Click handler */
  onClick?: () => void;
}

export interface StatsGridConfig {
  /** Stats to display */
  stats: StatConfig[];
  /** Grid columns [mobile, desktop] */
  columns?: [number, number];
}

const colorMap: Record<string, { bg: string; text: string }> = {
  default: { bg: 'var(--ds-color-neutral-surface-default)', text: 'var(--ds-color-neutral-text-default)' },
  success: { bg: 'var(--ds-color-success-surface-default)', text: 'var(--ds-color-success-text-default)' },
  warning: { bg: 'var(--ds-color-warning-surface-default)', text: 'var(--ds-color-warning-text-default)' },
  danger: { bg: 'var(--ds-color-danger-surface-default)', text: 'var(--ds-color-danger-text-default)' },
  info: { bg: 'var(--ds-color-info-surface-default)', text: 'var(--ds-color-info-text-default)' },
};

/**
 * StatCard component
 */
export function StatCard({
  label,
  value,
  icon,
  trend,
  trendValue,
  color = 'default',
  href,
  onClick,
}: StatConfig): React.ReactElement {
  const colors = colorMap[color] || colorMap.default;
  const isInteractive = !!href || !!onClick;
  
  const content = React.createElement(
    'div',
    {
      style: {
        backgroundColor: colors.bg,
        borderRadius: 'var(--ds-border-radius-lg)',
        padding: 'var(--ds-spacing-4)',
        cursor: isInteractive ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
      },
      onClick: onClick,
    },
    React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginBottom: 'var(--ds-spacing-2)',
        },
      },
      React.createElement(
        'span',
        {
          style: {
            fontSize: 'var(--ds-font-size-sm)',
            color: 'var(--ds-color-neutral-text-subtle)',
          },
        },
        label
      ),
      icon && React.createElement(
        'span',
        { style: { color: colors.text } },
        icon
      )
    ),
    React.createElement(
      'div',
      {
        style: {
          fontSize: 'var(--ds-font-size-2xl)',
          fontWeight: 'var(--ds-font-weight-semibold)',
          color: colors.text,
        },
      },
      value
    ),
    trend && trendValue && React.createElement(
      'div',
      {
        style: {
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--ds-spacing-1)',
          marginTop: 'var(--ds-spacing-1)',
          fontSize: 'var(--ds-font-size-xs)',
          color: trend === 'up' 
            ? 'var(--ds-color-success-text-default)'
            : trend === 'down'
              ? 'var(--ds-color-danger-text-default)'
              : 'var(--ds-color-neutral-text-subtle)',
        },
      },
      React.createElement('span', null, trend === 'up' ? '↑' : trend === 'down' ? '↓' : '→'),
      React.createElement('span', null, trendValue)
    )
  );

  if (href) {
    return React.createElement('a', { href, style: { textDecoration: 'none', display: 'block' } }, content);
  }
  
  return content;
}

/**
 * StatsGrid component
 */
export function StatsGrid({ stats, columns = [1, 3] }: StatsGridConfig): React.ReactElement {
  return React.createElement(
    'div',
    {
      'data-testid': 'stats-grid',
      style: {
        display: 'grid',
        gridTemplateColumns: `repeat(${columns[1]}, 1fr)`,
        gap: 'var(--ds-spacing-4)',
      },
    },
    React.createElement('style', null, `
      @media (max-width: 768px) {
        [data-testid="stats-grid"] {
          grid-template-columns: repeat(${columns[0]}, 1fr) !important;
        }
      }
    `),
    stats.map((stat, i) => React.createElement(StatCard, { key: i, ...stat }))
  );
}

/**
 * Create a stats grid element
 */
export function createStatsGrid(config: StatsGridConfig): React.ReactElement {
  return React.createElement(StatsGrid, config);
}
