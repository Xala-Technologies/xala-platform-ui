/**
 * BookingStepperHeader Component
 *
 * Displays the current step in the booking flow with visual indicators.
 * Enhanced with progress animations and better visual feedback.
 *
 * Pure presentational component - all text provided via labels prop.
 *
 * @module @xala-technologies/platform-ui/features/booking/components/sidebar
 */

import * as React from 'react';
import { Heading, Paragraph } from '@digdir/designsystemet-react';
import { Stack } from '../../../../primitives/stack';

// =============================================================================
// Icons
// =============================================================================

function CalendarIcon({ size = 20 }: { size?: number }): React.ReactElement {
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

function TagIcon({ size = 20 }: { size?: number }): React.ReactElement {
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
      <path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z" />
      <line x1="7" y1="7" x2="7.01" y2="7" />
    </svg>
  );
}

function CheckCircleIcon({ size = 20 }: { size?: number }): React.ReactElement {
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

function CheckIcon({ size = 16 }: { size?: number }): React.ReactElement {
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

function SendIcon({ size = 20 }: { size?: number }): React.ReactElement {
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
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

function UserIcon({ size = 20 }: { size?: number }): React.ReactElement {
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
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

// =============================================================================
// Types
// =============================================================================

export type BookingStepIcon = 'calendar' | 'pricing' | 'login' | 'confirm' | 'success';

export interface BookingStep {
  id: string;
  label: string;
  icon?: BookingStepIcon;
}

export interface BookingStepperHeaderLabels {
  /** Default title when listingTitle not provided */
  defaultTitle: string;
  /** Step progress text (use {current} and {total} placeholders) */
  stepProgress: string;
}

export interface BookingStepperHeaderProps {
  /** Steps in the booking flow */
  steps: BookingStep[];
  /** Current step index (0-based) */
  currentStep: number;
  /** All labels for the component */
  labels: BookingStepperHeaderLabels;
  /** Optional listing title to display */
  listingTitle?: string;
  /** Whether to show mobile-optimized view */
  isMobile?: boolean;
  /** Custom class name */
  className?: string;
}

// =============================================================================
// Constants
// =============================================================================

const STEP_ICONS: Record<string, React.ComponentType<{ size?: number }>> = {
  calendar: CalendarIcon,
  pricing: TagIcon,
  login: UserIcon,
  confirm: CheckCircleIcon,
  success: SendIcon,
};

// =============================================================================
// Component
// =============================================================================

export function BookingStepperHeader({
  steps,
  currentStep,
  labels,
  listingTitle,
  isMobile = false,
  className,
}: BookingStepperHeaderProps): React.ReactElement {
  const stepProgressText = labels.stepProgress
    .replace('{current}', String(currentStep + 1))
    .replace('{total}', String(steps.length));

  return (
    <Stack
      className={className}
      style={{
        gap: 'var(--ds-spacing-3)',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
        borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
        padding: 'var(--ds-spacing-4)',
      }}
    >
      {/* Header content - compact */}
      <Stack
        direction="horizontal"
        style={{ alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Stack direction="horizontal" style={{ alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
          <span
            style={{
              width: '32px',
              height: '32px',
              borderRadius: 'var(--ds-border-radius-md)',
              backgroundColor: 'var(--ds-color-accent-surface-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: 'var(--ds-color-accent-base-default)',
            }}
          >
            <CalendarIcon size={18} />
          </span>
          <Heading level={2} data-size="sm">
            {listingTitle || labels.defaultTitle}
          </Heading>
        </Stack>
        <Paragraph
          data-size="xs"
          style={{
            color: 'var(--ds-color-neutral-text-subtle)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
            borderRadius: 'var(--ds-border-radius-sm)',
          }}
        >
          {stepProgressText}
        </Paragraph>
      </Stack>

      {/* Step Indicator - horizontal pills */}
      <Stack
        direction="horizontal"
        className={isMobile ? 'booking-stepper-mobile' : ''}
        style={{
          gap: 'var(--ds-spacing-1)',
          alignItems: 'center',
          backgroundColor: 'var(--ds-color-neutral-surface-default)',
          borderRadius: 'var(--ds-border-radius-md)',
          padding: 'var(--ds-spacing-1)',
        }}
      >
        {steps.map((step, index) => {
          const isCompleted = index < currentStep;
          const isCurrent = index === currentStep;

          return (
            <Stack
              key={step.id}
              direction="horizontal"
              style={{
                flex: 1,
                gap: 'var(--ds-spacing-2)',
                alignItems: 'center',
                justifyContent: 'center',
                padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                borderRadius: 'var(--ds-border-radius-sm)',
                backgroundColor: isCurrent
                  ? 'var(--ds-color-accent-surface-default)'
                  : isCompleted
                    ? 'var(--ds-color-success-surface-default)'
                    : 'transparent',
                transition: 'all 200ms ease',
              }}
            >
              {/* Step icon/number */}
              <span
                style={{
                  width: '24px',
                  height: '24px',
                  borderRadius: 'var(--ds-border-radius-full)',
                  backgroundColor: isCompleted
                    ? 'var(--ds-color-success-base-default)'
                    : isCurrent
                      ? 'var(--ds-color-accent-base-default)'
                      : 'var(--ds-color-neutral-border-default)',
                  color: isCompleted || isCurrent ? 'white' : 'var(--ds-color-neutral-text-subtle)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: 'var(--ds-font-size-xs)',
                  fontWeight: 'var(--ds-font-weight-medium)',
                  flexShrink: 0,
                }}
              >
                {isCompleted ? (
                  <CheckIcon size={14} />
                ) : (
                  (() => {
                    const IconComponent = step.icon ? STEP_ICONS[step.icon] : null;
                    return IconComponent ? <IconComponent size={14} /> : index + 1;
                  })()
                )}
              </span>

              {/* Step label - only show on current and completed on desktop */}
              {!isMobile && (
                <Paragraph
                  data-size="xs"
                  style={{
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
              )}
            </Stack>
          );
        })}
      </Stack>
    </Stack>
  );
}

export default BookingStepperHeader;
