/**
 * ReturnPolicyCard Component
 *
 * Display return/cancellation policy for rentals and bookings.
 * Shows deadline, refund terms, and conditions.
 *
 * @example
 * ```tsx
 * import { ReturnPolicyCard } from '@xala-technologies/platform/ui';
 *
 * <ReturnPolicyCard
 *   policy={{
 *     type: 'flexible',
 *     cancellationDeadline: 24,
 *     refundPercent: 100,
 *     conditions: ['Full refusjon opptil 24t før', 'Ingen refusjon etter'],
 *   }}
 * />
 * ```
 */

import * as React from 'react';
import { Card, Heading, Paragraph } from '../primitives';
import { cn } from '../utils';
import { CheckIcon, ClockIcon } from '../primitives/icons';

// =============================================================================
// Types
// =============================================================================

export type PolicyType = 'flexible' | 'moderate' | 'strict' | 'custom';

export interface ReturnPolicy {
  /** Policy type */
  type: PolicyType;
  /** Hours before booking that cancellation is free */
  cancellationDeadline?: number;
  /** Refund percentage if cancelled before deadline */
  refundPercent?: number;
  /** Refund percentage if cancelled after deadline */
  lateRefundPercent?: number;
  /** List of conditions */
  conditions?: string[];
  /** Custom policy description */
  customDescription?: string;
}

export interface ReturnPolicyCardLabels {
  /** Card title */
  title?: string;
  /** Policy type labels */
  flexible?: string;
  moderate?: string;
  strict?: string;
  custom?: string;
  /** Field labels */
  cancellationDeadline?: string;
  refund?: string;
  lateRefund?: string;
  conditions?: string;
  /** Units */
  hoursBeforeStart?: string;
  refundText?: string;
  noRefund?: string;
}

export interface ReturnPolicyCardProps {
  /** Policy details */
  policy: ReturnPolicy;
  /** Localization labels */
  labels?: ReturnPolicyCardLabels;
  /** Compact layout */
  compact?: boolean;
  /** Additional className */
  className?: string;
}

// =============================================================================
// Default labels (Norwegian)
// =============================================================================

const defaultLabels: Required<ReturnPolicyCardLabels> = {
  title: 'Avbestillingspolicy',
  flexible: 'Fleksibel',
  moderate: 'Moderat',
  strict: 'Streng',
  custom: 'Tilpasset',
  cancellationDeadline: 'Avbestillingsfrist',
  refund: 'Refusjon',
  lateRefund: 'Sen avbestilling',
  conditions: 'Vilkår',
  hoursBeforeStart: 'timer før start',
  refundText: '% refusjon',
  noRefund: 'Ingen refusjon',
};

// =============================================================================
// Icons
// =============================================================================

const ShieldIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
  </svg>
);

// =============================================================================
// Component
// =============================================================================

/**
 * ReturnPolicyCard displays return/cancellation policy.
 *
 * Accessibility:
 * - Semantic heading structure
 * - List for conditions
 * - Descriptive text
 */
export function ReturnPolicyCard({
  policy,
  labels: customLabels,
  compact = false,
  className,
}: ReturnPolicyCardProps): React.ReactElement {
  const labels = { ...defaultLabels, ...customLabels };

  const getPolicyTypeLabel = (type: PolicyType): string => {
    switch (type) {
      case 'flexible':
        return labels.flexible;
      case 'moderate':
        return labels.moderate;
      case 'strict':
        return labels.strict;
      case 'custom':
        return labels.custom;
    }
  };

  const getPolicyTypeColor = (type: PolicyType): { bg: string; text: string; border: string } => {
    switch (type) {
      case 'flexible':
        return {
          bg: 'var(--ds-color-success-surface-default)',
          text: 'var(--ds-color-success-text-default)',
          border: 'var(--ds-color-success-border-subtle)',
        };
      case 'moderate':
        return {
          bg: 'var(--ds-color-warning-surface-default)',
          text: 'var(--ds-color-warning-text-default)',
          border: 'var(--ds-color-warning-border-subtle)',
        };
      case 'strict':
        return {
          bg: 'var(--ds-color-danger-surface-default)',
          text: 'var(--ds-color-danger-text-default)',
          border: 'var(--ds-color-danger-border-subtle)',
        };
      case 'custom':
        return {
          bg: 'var(--ds-color-accent-surface-default)',
          text: 'var(--ds-color-accent-text-default)',
          border: 'var(--ds-color-accent-border-subtle)',
        };
    }
  };

  const colors = getPolicyTypeColor(policy.type);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: compact ? 'var(--ds-spacing-2)' : 'var(--ds-spacing-3)',
  };

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--ds-spacing-1)',
    padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
    backgroundColor: colors.bg,
    color: colors.text,
    borderRadius: 'var(--ds-border-radius-full)',
    fontSize: 'var(--ds-font-size-xs)',
    fontWeight: 'var(--ds-font-weight-medium)',
  };

  const fieldStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--ds-spacing-2)',
  };

  const listStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-1)',
    padding: 0,
    margin: 0,
    listStyle: 'none',
  };

  const listItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--ds-spacing-2)',
  };

  return (
    <Card
      className={cn('return-policy-card', className)}
      style={{ padding: compact ? 'var(--ds-spacing-3)' : 'var(--ds-spacing-4)' }}
    >
      <div style={containerStyle}>
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--ds-spacing-2)',
          }}
        >
          <Heading
            level={3}
            data-size="xs"
            style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}
          >
            <ShieldIcon />
            {labels.title}
          </Heading>
          <span style={badgeStyle}>{getPolicyTypeLabel(policy.type)}</span>
        </div>

        {/* Custom description */}
        {policy.customDescription && (
          <Paragraph data-size="sm" style={{ margin: 0 }}>
            {policy.customDescription}
          </Paragraph>
        )}

        {/* Cancellation deadline */}
        {policy.cancellationDeadline !== undefined && (
          <div style={fieldStyle}>
            <ClockIcon size={14} />
            <Paragraph data-size="sm" style={{ margin: 0 }}>
              {labels.cancellationDeadline}: {policy.cancellationDeadline} {labels.hoursBeforeStart}
            </Paragraph>
          </div>
        )}

        {/* Refund info */}
        {policy.refundPercent !== undefined && (
          <div style={fieldStyle}>
            <CheckIcon size={14} />
            <Paragraph data-size="sm" style={{ margin: 0 }}>
              {labels.refund}: {policy.refundPercent}
              {labels.refundText}
            </Paragraph>
          </div>
        )}

        {/* Late refund */}
        {policy.lateRefundPercent !== undefined && (
          <div style={fieldStyle}>
            <Paragraph
              data-size="sm"
              style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
            >
              {labels.lateRefund}:{' '}
              {policy.lateRefundPercent > 0
                ? `${policy.lateRefundPercent}${labels.refundText}`
                : labels.noRefund}
            </Paragraph>
          </div>
        )}

        {/* Conditions */}
        {policy.conditions && policy.conditions.length > 0 && (
          <div>
            <Paragraph
              data-size="xs"
              style={{
                margin: '0 0 var(--ds-spacing-2)',
                fontWeight: 'var(--ds-font-weight-medium)',
                color: 'var(--ds-color-neutral-text-subtle)',
                textTransform: 'uppercase',
                letterSpacing: '0.05em',
              }}
            >
              {labels.conditions}
            </Paragraph>
            <ul style={listStyle}>
              {policy.conditions.map((condition, index) => (
                <li key={index} style={listItemStyle}>
                  <span style={{ color: 'var(--ds-color-accent-base-default)', marginTop: 2 }}>
                    •
                  </span>
                  <Paragraph data-size="sm" style={{ margin: 0 }}>
                    {condition}
                  </Paragraph>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Card>
  );
}

ReturnPolicyCard.displayName = 'ReturnPolicyCard';
