/**
 * StepperHeader
 *
 * A domain-neutral multi-step progress indicator.
 * Displays current position in a multi-step flow with visual feedback.
 *
 * All text content is pre-localized - this component does not handle i18n internally.
 *
 * @example
 * ```tsx
 * <StepperHeader
 *   steps={[
 *     { id: 'select', label: 'Select Items' },
 *     { id: 'details', label: 'Enter Details' },
 *     { id: 'confirm', label: 'Confirm' },
 *   ]}
 *   currentStep={1}
 *   title="Checkout"
 * />
 * ```
 */
import * as React from 'react';
import type { ReactNode } from 'react';
import { Heading, Paragraph } from '../primitives';

// ============================================================================
// Types
// ============================================================================

/** Step definition */
export interface StepperStep {
  /** Unique identifier */
  id: string;
  /** Step label */
  label: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Optional description */
  description?: string;
}

/** Localized labels */
export interface StepperHeaderLabels {
  /** Progress template (use {current} and {total} placeholders) */
  stepProgress?: string;
}

/** StepperHeader props */
export interface StepperHeaderProps {
  /** Steps in the flow */
  steps: StepperStep[];

  /** Current step index (0-based) */
  currentStep: number;

  /** Optional title to display */
  title?: string;

  /** Optional subtitle */
  subtitle?: string;

  /** Optional icon for the header */
  headerIcon?: ReactNode;

  /** Whether to show labels on all steps or only current */
  showAllLabels?: boolean;

  /** Whether to show step progress text */
  showProgress?: boolean;

  /** Variant style */
  variant?: 'default' | 'compact' | 'pills';

  /** Whether to use mobile-optimized view */
  compact?: boolean;

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Localized labels */
  labels?: StepperHeaderLabels;

  /** Custom class name */
  className?: string;

  /** Test ID for testing */
  'data-testid'?: string;
}

// ============================================================================
// Default Labels
// ============================================================================

const DEFAULT_LABELS: Required<StepperHeaderLabels> = {
  stepProgress: 'Step {current} of {total}',
};

// ============================================================================
// Icons
// ============================================================================

function CheckIcon({ size = 14 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

// ============================================================================
// Helpers
// ============================================================================

function formatProgress(template: string, current: number, total: number): string {
  return template.replace('{current}', String(current)).replace('{total}', String(total));
}

// ============================================================================
// Main Component
// ============================================================================

export function StepperHeader({
  steps,
  currentStep,
  title,
  subtitle,
  headerIcon,
  showAllLabels = true,
  showProgress = true,
  variant = 'default',
  compact = false,
  size = 'md',
  labels = {},
  className,
  'data-testid': testId = 'stepper-header',
}: StepperHeaderProps): React.ReactElement {
  const mergedLabels: Required<StepperHeaderLabels> = {
    ...DEFAULT_LABELS,
    ...labels,
  };

  const isSmall = size === 'sm';
  const isLarge = size === 'lg';
  const isPills = variant === 'pills';
  const isCompact = variant === 'compact' || compact;

  const stepIconSize = isSmall ? 20 : isLarge ? 28 : 24;
  const checkIconSize = isSmall ? 12 : isLarge ? 16 : 14;

  return (
    <div
      className={className}
      data-testid={testId}
      style={{
        backgroundColor: 'var(--ds-color-neutral-background-default)',
        borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
        padding: isSmall
          ? 'var(--ds-spacing-3)'
          : isLarge
            ? 'var(--ds-spacing-5)'
            : 'var(--ds-spacing-4)',
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-3)',
      }}
    >
      {/* Header content */}
      {(title || showProgress) && (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
            {headerIcon && (
              <div
                style={{
                  width: isSmall ? '28px' : isLarge ? '40px' : '32px',
                  height: isSmall ? '28px' : isLarge ? '40px' : '32px',
                  borderRadius: 'var(--ds-border-radius-md)',
                  backgroundColor: 'var(--ds-color-accent-surface-default)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--ds-color-accent-base-default)',
                }}
              >
                {headerIcon}
              </div>
            )}
            <div>
              {title && (
                <Heading
                  level={2}
                  data-size={isSmall ? 'xs' : isLarge ? 'md' : 'sm'}
                  style={{
                    margin: 0,
                    color: 'var(--ds-color-neutral-text-default)',
                  }}
                >
                  {title}
                </Heading>
              )}
              {subtitle && (
                <Paragraph
                  data-size="xs"
                  style={{
                    margin: 0,
                    color: 'var(--ds-color-neutral-text-subtle)',
                  }}
                >
                  {subtitle}
                </Paragraph>
              )}
            </div>
          </div>

          {showProgress && (
            <Paragraph
              data-size="xs"
              style={{
                margin: 0,
                color: 'var(--ds-color-neutral-text-subtle)',
                backgroundColor: 'var(--ds-color-neutral-surface-default)',
                padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
                borderRadius: 'var(--ds-border-radius-sm)',
              }}
            >
              {formatProgress(mergedLabels.stepProgress, currentStep + 1, steps.length)}
            </Paragraph>
          )}
        </div>
      )}

      {/* Step Indicator */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: isPills ? 'var(--ds-spacing-1)' : 'var(--ds-spacing-0)',
          backgroundColor: isPills ? 'var(--ds-color-neutral-surface-default)' : 'transparent',
          borderRadius: isPills ? 'var(--ds-border-radius-md)' : '0',
          padding: isPills ? 'var(--ds-spacing-1)' : '0',
        }}
      >
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;
          const isLast = index === steps.length - 1;

          return (
            <React.Fragment key={step.id}>
              {/* Step item */}
              <div
                style={{
                  flex: isPills ? 1 : 'none',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: isPills ? 'center' : 'flex-start',
                  gap: 'var(--ds-spacing-2)',
                  padding: isPills
                    ? 'var(--ds-spacing-2) var(--ds-spacing-3)'
                    : 'var(--ds-spacing-1)',
                  borderRadius: isPills ? 'var(--ds-border-radius-sm)' : '0',
                  backgroundColor: isPills
                    ? isCurrent
                      ? 'var(--ds-color-accent-surface-default)'
                      : isCompleted
                        ? 'var(--ds-color-success-surface-default)'
                        : 'transparent'
                    : 'transparent',
                  transition: 'all 200ms ease',
                }}
              >
                {/* Step icon/number */}
                <div
                  style={{
                    width: `${stepIconSize}px`,
                    height: `${stepIconSize}px`,
                    borderRadius: 'var(--ds-border-radius-full)',
                    backgroundColor: isCompleted
                      ? 'var(--ds-color-success-base-default)'
                      : isCurrent
                        ? 'var(--ds-color-accent-base-default)'
                        : 'var(--ds-color-neutral-border-default)',
                    color:
                      isCompleted || isCurrent ? 'white' : 'var(--ds-color-neutral-text-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: isSmall ? 'var(--ds-font-size-xs)' : 'var(--ds-font-size-sm)',
                    fontWeight: 'var(--ds-font-weight-medium)',
                    flexShrink: 0,
                  }}
                >
                  {isCompleted ? (
                    <CheckIcon size={checkIconSize} />
                  ) : step.icon ? (
                    step.icon
                  ) : (
                    index + 1
                  )}
                </div>

                {/* Step label */}
                {(showAllLabels || isCurrent || isCompleted) && !isCompact && (
                  <div style={{ overflow: 'hidden' }}>
                    <Paragraph
                      data-size="xs"
                      style={{
                        margin: 0,
                        color: isCurrent
                          ? 'var(--ds-color-accent-text-default)'
                          : isCompleted
                            ? 'var(--ds-color-success-text-default)'
                            : 'var(--ds-color-neutral-text-subtle)',
                        fontWeight: isCurrent
                          ? 'var(--ds-font-weight-medium)'
                          : 'var(--ds-font-weight-regular)',
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {step.label}
                    </Paragraph>
                    {step.description && isCurrent && (
                      <Paragraph
                        data-size="xs"
                        style={{
                          margin: 0,
                          color: 'var(--ds-color-neutral-text-subtle)',
                          fontSize: 'var(--ds-font-size-xs)',
                        }}
                      >
                        {step.description}
                      </Paragraph>
                    )}
                  </div>
                )}
              </div>

              {/* Connector line (not for pills variant or last item) */}
              {!isPills && !isLast && (
                <div
                  style={{
                    flex: 1,
                    height: '2px',
                    minWidth: '20px',
                    backgroundColor: isCompleted
                      ? 'var(--ds-color-success-base-default)'
                      : 'var(--ds-color-neutral-border-default)',
                    margin: '0 var(--ds-spacing-2)',
                  }}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
}

export default StepperHeader;
