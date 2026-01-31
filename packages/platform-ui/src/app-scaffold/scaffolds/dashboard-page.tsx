/**
 * Dashboard Page Scaffold
 *
 * Generates dashboard pages with stats, widgets, and charts.
 */

import React from 'react';
import type { CreateDashboardPageOptions, StatConfig } from '../types';

/**
 * Stats Card Component
 */
function StatsCard({ stat }: { stat: StatConfig }): React.ReactElement {
  const trendColor = stat.trend === 'up' 
    ? 'var(--ds-color-success-text-default)'
    : stat.trend === 'down'
    ? 'var(--ds-color-danger-text-default)'
    : 'var(--ds-color-neutral-text-subtle)';

  return React.createElement(
    'div',
    {
      className: 'stats-card',
      style: {
        padding: 'var(--ds-spacing-4)',
        background: 'var(--ds-color-neutral-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
      },
    },
    // Icon and label
    React.createElement(
      'div',
      { style: { display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)', marginBottom: 'var(--ds-spacing-2)' } },
      stat.icon,
      React.createElement('span', { style: { fontSize: 'var(--ds-font-size-sm)', color: 'var(--ds-color-neutral-text-subtle)' } }, stat.label)
    ),
    // Value
    React.createElement(
      'div',
      { style: { fontSize: 'var(--ds-font-size-2xl)', fontWeight: 'var(--ds-font-weight-semibold)' } },
      stat.value ?? '—'
    ),
    // Trend
    stat.trendValue && React.createElement(
      'div',
      { style: { fontSize: 'var(--ds-font-size-sm)', color: trendColor, marginTop: 'var(--ds-spacing-1)' } },
      stat.trend === 'up' ? '↑' : stat.trend === 'down' ? '↓' : '',
      ' ',
      stat.trendValue
    )
  );
}

/**
 * Stats Grid Component
 */
function StatsGrid({ stats }: { stats: StatConfig[] }): React.ReactElement {
  return React.createElement(
    'div',
    {
      className: 'stats-grid',
      style: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: 'var(--ds-spacing-4)',
      },
    },
    stats.map((stat, index) =>
      React.createElement(StatsCard, { key: index, stat })
    )
  );
}

/**
 * Create a Dashboard page component
 *
 * @example
 * ```tsx
 * const DashboardPage = createDashboardPage({
 *   title: 'Overview',
 *   subtitle: 'Your task summary',
 *   stats: [
 *     { label: 'Total Tasks', value: 42, icon: <TaskIcon />, trend: 'up', trendValue: '+5 this week' },
 *     { label: 'Completed', value: 28, icon: <CheckIcon />, trend: 'up', trendValue: '+3 today' },
 *     { label: 'Pending', value: 14, icon: <ClockIcon /> },
 *   ],
 *   widgets: ['RecentTasks', 'ActivityChart'],
 * });
 * ```
 */
export function createDashboardPage(
  options: CreateDashboardPageOptions
): React.FC {
  const { title, subtitle, stats = [], widgets = [] } = options;

  return function DashboardPage() {
    return React.createElement(
      'div',
      { 'data-testid': 'dashboard-page', className: 'page-container' },
      // Header
      React.createElement(
        'div',
        { className: 'section-header' },
        React.createElement('h1', { style: { margin: 0 } }, title),
        subtitle && React.createElement(
          'p',
          { style: { margin: 0, color: 'var(--ds-color-neutral-text-subtle)' } },
          subtitle
        )
      ),
      // Stats grid
      stats.length > 0 && React.createElement(StatsGrid, { stats }),
      // Widgets placeholder
      widgets.length > 0 && React.createElement(
        'div',
        {
          className: 'widgets-grid',
          style: {
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
            gap: 'var(--ds-spacing-4)',
            marginTop: 'var(--ds-spacing-4)',
          },
        },
        widgets.map((widget, index) =>
          React.createElement(
            'div',
            {
              key: index,
              className: 'widget-placeholder',
              style: {
                padding: 'var(--ds-spacing-4)',
                background: 'var(--ds-color-neutral-surface-default)',
                borderRadius: 'var(--ds-border-radius-md)',
                border: '1px solid var(--ds-color-neutral-border-subtle)',
                minHeight: '200px',
              },
            },
            React.createElement('span', { style: { color: 'var(--ds-color-neutral-text-subtle)' } }, widget)
          )
        )
      )
    );
  };
}

// Export components for direct use
export { StatsCard, StatsGrid };
