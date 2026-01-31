/**
 * KeyFacts
 *
 * A domain-neutral component for displaying key facts/stats as horizontal badges.
 * Each fact has an auto-selected icon based on type, or can use a custom icon.
 *
 * All text content is pre-localized - this component does not handle i18n internally.
 *
 * @example
 * ```tsx
 * <KeyFacts
 *   facts={[
 *     { type: 'capacity', value: '25 people' },
 *     { type: 'area', value: '120 m²' },
 *     { type: 'duration', value: '2 hours' },
 *   ]}
 * />
 * ```
 */
import * as React from 'react';
import type { ReactNode } from 'react';

// ============================================================================
// Types
// ============================================================================

/** Built-in fact types with auto-icons */
export type KeyFactType =
  | 'capacity'
  | 'area'
  | 'duration'
  | 'quantity'
  | 'price'
  | 'date'
  | 'time'
  | 'location'
  | 'rating'
  | 'status'
  | 'custom';

/** Fact item definition */
export interface KeyFactItem {
  /** Type for automatic icon selection */
  type: KeyFactType;
  /** Display label (optional, e.g., "Capacity") */
  label?: string;
  /** Display value (e.g., "25 people", "120 m²") */
  value: string;
  /** Custom icon override */
  icon?: ReactNode;
  /** Tooltip text */
  tooltip?: string;
  /** Unique identifier */
  id?: string;
}

/** Localized labels */
export interface KeyFactsLabels {
  /** "more" text for overflow (e.g., "+3 more") */
  moreText?: string;
}

/** KeyFacts props */
export interface KeyFactsProps {
  /** Array of key facts to display */
  facts: KeyFactItem[];
  /** Visual variant */
  variant?: 'default' | 'compact' | 'prominent';
  /** Maximum facts to show before collapse */
  maxVisible?: number;
  /** Size variant */
  size?: 'sm' | 'md' | 'lg';
  /** Show labels alongside values */
  showLabels?: boolean;
  /** Localized labels */
  labels?: KeyFactsLabels;
  /** Custom class name */
  className?: string;
  /** Test ID for testing */
  'data-testid'?: string;
}

// ============================================================================
// Default Labels
// ============================================================================

const DEFAULT_LABELS: Required<KeyFactsLabels> = {
  moreText: '+{count} more',
};

// ============================================================================
// Icons
// ============================================================================

function UsersIcon({ size = 14 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function AreaIcon({ size = 14 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M3 9h18" />
      <path d="M9 21V9" />
    </svg>
  );
}

function ClockIcon({ size = 14 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function PackageIcon({ size = 14 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M16.5 9.4l-9-5.19M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
      <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
      <line x1="12" y1="22.08" x2="12" y2="12" />
    </svg>
  );
}

function CurrencyIcon({ size = 14 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function CalendarIcon({ size = 14 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
      <line x1="16" y1="2" x2="16" y2="6" />
      <line x1="8" y1="2" x2="8" y2="6" />
      <line x1="3" y1="10" x2="21" y2="10" />
    </svg>
  );
}

function MapPinIcon({ size = 14 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function StarIcon({ size = 14 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  );
}

function CheckCircleIcon({ size = 14 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  );
}

function InfoIcon({ size = 14 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

// ============================================================================
// Helpers
// ============================================================================

function getIconForType(type: KeyFactType, size: number): React.ReactNode {
  switch (type) {
    case 'capacity':
      return <UsersIcon size={size} />;
    case 'area':
      return <AreaIcon size={size} />;
    case 'duration':
    case 'time':
      return <ClockIcon size={size} />;
    case 'quantity':
      return <PackageIcon size={size} />;
    case 'price':
      return <CurrencyIcon size={size} />;
    case 'date':
      return <CalendarIcon size={size} />;
    case 'location':
      return <MapPinIcon size={size} />;
    case 'rating':
      return <StarIcon size={size} />;
    case 'status':
      return <CheckCircleIcon size={size} />;
    case 'custom':
    default:
      return <InfoIcon size={size} />;
  }
}

function formatMoreText(template: string, count: number): string {
  return template.replace('{count}', String(count));
}

// ============================================================================
// Main Component
// ============================================================================

export function KeyFacts({
  facts,
  variant = 'default',
  maxVisible,
  size = 'md',
  showLabels = false,
  labels = {},
  className,
  'data-testid': testId = 'key-facts',
}: KeyFactsProps): React.ReactElement | null {
  const mergedLabels: Required<KeyFactsLabels> = {
    ...DEFAULT_LABELS,
    ...labels,
  };

  if (!facts || facts.length === 0) {
    return null;
  }

  const visibleFacts = maxVisible ? facts.slice(0, maxVisible) : facts;
  const hiddenCount = maxVisible ? Math.max(0, facts.length - maxVisible) : 0;

  const isCompact = variant === 'compact';
  const isProminent = variant === 'prominent';
  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  const iconSize = isSmall ? 12 : isLarge ? 16 : 14;

  return (
    <div
      className={className}
      data-testid={testId}
      role="list"
      aria-label="Key facts"
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        gap: isCompact ? 'var(--ds-spacing-2)' : 'var(--ds-spacing-3)',
        alignItems: 'center',
      }}
    >
      {visibleFacts.map((fact, index) => (
        <div
          key={fact.id || `${fact.type}-${index}`}
          role="listitem"
          title={fact.tooltip || (fact.label ? `${fact.label}: ${fact.value}` : fact.value)}
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: 'var(--ds-spacing-2)',
            padding: isCompact
              ? 'var(--ds-spacing-1) var(--ds-spacing-2)'
              : isLarge
                ? 'var(--ds-spacing-3) var(--ds-spacing-4)'
                : 'var(--ds-spacing-2) var(--ds-spacing-3)',
            backgroundColor: isProminent
              ? 'var(--ds-color-accent-surface-default)'
              : 'var(--ds-color-neutral-surface-default)',
            borderRadius: 'var(--ds-border-radius-full)',
            color: isProminent
              ? 'var(--ds-color-accent-text-default)'
              : 'var(--ds-color-neutral-text-default)',
            fontSize: isSmall
              ? 'var(--ds-font-size-xs)'
              : isLarge
                ? 'var(--ds-font-size-md)'
                : 'var(--ds-font-size-sm)',
            fontWeight: 500,
            whiteSpace: 'nowrap',
            border: isProminent ? 'none' : '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <span
            style={{
              display: 'flex',
              alignItems: 'center',
              color: isProminent
                ? 'var(--ds-color-accent-base-default)'
                : 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {fact.icon || getIconForType(fact.type, iconSize)}
          </span>
          {showLabels && fact.label && (
            <span
              style={{
                color: 'var(--ds-color-neutral-text-subtle)',
                fontWeight: 400,
              }}
            >
              {fact.label}:
            </span>
          )}
          <span>{fact.value}</span>
        </div>
      ))}

      {hiddenCount > 0 && (
        <div
          role="listitem"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            padding: isCompact
              ? 'var(--ds-spacing-1) var(--ds-spacing-2)'
              : 'var(--ds-spacing-2) var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-full)',
            color: 'var(--ds-color-neutral-text-subtle)',
            fontSize: isSmall
              ? 'var(--ds-font-size-xs)'
              : isLarge
                ? 'var(--ds-font-size-md)'
                : 'var(--ds-font-size-sm)',
          }}
        >
          {formatMoreText(mergedLabels.moreText, hiddenCount)}
        </div>
      )}
    </div>
  );
}

export default KeyFacts;
