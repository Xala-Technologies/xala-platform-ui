/**
 * StatCard Component
 *
 * Enhanced stat/metric cards for dashboards.
 * Uses design token-based CSS classes for animations and styling.
 *
 * @module @xala-technologies/platform/ui/composed/StatCard
 */

import React, { type ReactNode } from 'react';
import { Paragraph } from '@digdir/designsystemet-react';
import { cn } from '../utils';

// =============================================================================
// Types
// =============================================================================

export type StatTrend = 'up' | 'down' | 'neutral';
export type StatVariant = 'default' | 'success' | 'warning' | 'danger' | 'info' | 'accent';

export interface StatCardProps {
  label: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    direction: StatTrend;
    value: string;
    label?: string;
  };
  variant?: StatVariant;
  size?: 'sm' | 'md' | 'lg';
  loading?: boolean;
  onClick?: () => void;
  className?: string;
  style?: React.CSSProperties;
}

// =============================================================================
// Icons
// =============================================================================

function TrendUpIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  );
}

function TrendDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="23 18 13.5 8.5 8.5 13.5 1 6" />
      <polyline points="17 18 23 18 23 12" />
    </svg>
  );
}

function TrendNeutralIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

// =============================================================================
// Skeleton Loader
// =============================================================================

function StatSkeleton({ size }: { size: 'sm' | 'md' | 'lg' }) {
  const valueHeight =
    size === 'sm'
      ? 'var(--ds-sizing-6)'
      : size === 'lg'
        ? 'var(--ds-sizing-10)'
        : 'var(--ds-sizing-8)';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
      <div
        className="ds-stat-skeleton"
        style={{
          height: 'var(--ds-sizing-3-5)',
          width: '60%',
        }}
      />
      <div
        className="ds-stat-skeleton"
        style={{
          height: valueHeight,
          width: '80%',
        }}
      />
    </div>
  );
}

// =============================================================================
// Size Styles
// =============================================================================

const sizeStyles = {
  sm: {
    padding: 'var(--ds-spacing-4)',
    labelSize: 'var(--ds-font-size-xs)',
    valueSize: 'var(--ds-font-size-lg)',
    iconSize: 'var(--ds-stat-icon-size-sm)',
    trendSize: 'var(--ds-font-size-xs)',
  },
  md: {
    padding: 'var(--ds-spacing-5)',
    labelSize: 'var(--ds-font-size-sm)',
    valueSize: 'var(--ds-font-size-xl)',
    iconSize: 'var(--ds-stat-icon-size-md)',
    trendSize: 'var(--ds-font-size-sm)',
  },
  lg: {
    padding: 'var(--ds-spacing-6)',
    labelSize: 'var(--ds-font-size-md)',
    valueSize: 'var(--ds-font-size-2xl)',
    iconSize: 'var(--ds-stat-icon-size-lg)',
    trendSize: 'var(--ds-font-size-sm)',
  },
};

// =============================================================================
// StatCard Component
// =============================================================================

export function StatCard({
  label,
  value,
  icon,
  trend,
  variant = 'default',
  size = 'md',
  loading = false,
  onClick,
  className,
  style,
}: StatCardProps): React.ReactElement {
  const sizeStyle = sizeStyles[size];

  const TrendIcon =
    trend?.direction === 'up'
      ? TrendUpIcon
      : trend?.direction === 'down'
        ? TrendDownIcon
        : TrendNeutralIcon;

  // Build class names using design token-based CSS classes
  const cardClasses = cn(
    'ds-stat-card',
    `ds-stat-card--${variant}`,
    onClick && 'ds-stat-card--clickable',
    className
  );

  const iconClasses = cn('ds-stat-icon', `ds-stat-icon--${variant}`);

  const trendIconClasses = cn(
    'ds-stat-trend-icon',
    trend?.direction && `ds-stat-trend-icon--${trend.direction}`
  );

  return (
    <div
      className={cardClasses}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
      style={{
        padding: sizeStyle.padding,
        ...style,
      }}
    >
      {loading ? (
        <StatSkeleton size={size} />
      ) : (
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
          <div style={{ flex: 1 }}>
            <Paragraph
              data-size="sm"
              style={{
                margin: 0,
                fontSize: sizeStyle.labelSize,
                color: 'var(--ds-color-neutral-text-subtle)',
                fontWeight: 'var(--ds-font-weight-medium)',
                marginBottom: 'var(--ds-spacing-2)',
                letterSpacing: 'var(--ds-font-letter-spacing-wide)',
              }}
            >
              {label}
            </Paragraph>
            <Paragraph
              data-size="md"
              className="ds-stat-value"
              style={{
                margin: 0,
                fontSize: sizeStyle.valueSize,
                fontWeight: 'var(--ds-font-weight-bold)',
                color: 'var(--ds-color-neutral-text-default)',
                lineHeight: 1.2,
                letterSpacing: 'var(--ds-font-letter-spacing-tight)',
              }}
            >
              {value}
            </Paragraph>
            {trend && (
              <div className="ds-stat-trend" style={{ marginTop: 'var(--ds-spacing-3)' }}>
                <span className={trendIconClasses}>
                  <TrendIcon />
                </span>
                <span
                  style={{
                    fontSize: sizeStyle.trendSize,
                    fontWeight: 'var(--ds-font-weight-semibold)',
                    color:
                      trend.direction === 'up'
                        ? 'var(--ds-color-success-text-default)'
                        : trend.direction === 'down'
                          ? 'var(--ds-color-danger-text-default)'
                          : 'var(--ds-color-neutral-text-subtle)',
                  }}
                >
                  {trend.value}
                </span>
                {trend.label && (
                  <span
                    style={{
                      fontSize: sizeStyle.trendSize,
                      color: 'var(--ds-color-neutral-text-subtle)',
                    }}
                  >
                    {trend.label}
                  </span>
                )}
              </div>
            )}
          </div>
          {icon && (
            <div
              className={iconClasses}
              style={{
                width: sizeStyle.iconSize,
                height: sizeStyle.iconSize,
                flexShrink: 0,
              }}
            >
              {icon}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

// =============================================================================
// StatCardGrid - Helper for consistent grid layout
// =============================================================================

export interface StatCardGridProps {
  children: ReactNode;
  columns?: 2 | 3 | 4;
  gap?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

export function StatCardGrid({
  children,
  columns = 4,
  gap = 'md',
  className,
  style,
}: StatCardGridProps): React.ReactElement {
  const gapSize =
    gap === 'sm'
      ? 'var(--ds-spacing-3)'
      : gap === 'lg'
        ? 'var(--ds-spacing-6)'
        : 'var(--ds-spacing-4)';

  return (
    <div
      className={className}
      style={{
        display: 'grid',
        gridTemplateColumns: `repeat(${columns}, 1fr)`,
        gap: gapSize,
        ...style,
      }}
    >
      {children}
    </div>
  );
}

export default StatCard;
