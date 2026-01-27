/**
 * ReviewStep
 *
 * A domain-neutral review/confirmation step component for displaying summary sections.
 * Designed to show a summary of selections before final submission in multi-step flows.
 *
 * This component is designed to be used across any domain:
 * - Booking confirmation reviews
 * - Order summaries
 * - Registration reviews
 * - Settings confirmation
 * - Checkout reviews
 *
 * All text content is pre-localized - pass labels via props for i18n support.
 *
 * @example
 * ```tsx
 * <ReviewStep
 *   title="Review Your Booking"
 *   message="Please verify all details before confirming."
 *   sections={[
 *     {
 *       id: 'resource',
 *       title: 'Selected Resource',
 *       items: [
 *         { label: 'Name', value: 'Main Court' },
 *         { label: 'Date', value: 'January 25, 2026' },
 *       ],
 *       onEdit: () => goToStep(0),
 *       editLabel: 'Change',
 *     },
 *   ]}
 *   terms={{
 *     label: 'I agree to the terms and conditions',
 *     checked: termsAccepted,
 *     onChange: setTermsAccepted,
 *   }}
 * />
 * ```
 */
import * as React from 'react';
import type { ReactNode } from 'react';
import { Heading, Paragraph, Button, Checkbox } from '@digdir/designsystemet-react';
import type { ReviewSection, ReviewItem } from './types';
import { cn } from './utils';

// ============================================================================
// Types
// ============================================================================

/** Terms checkbox configuration */
export interface ReviewStepTerms {
  /** Checkbox label (pre-localized) */
  label: string;
  /** Whether the checkbox is checked */
  checked: boolean;
  /** Change handler */
  onChange: (checked: boolean) => void;
  /** Error message (pre-localized) */
  error?: string;
}

/** ReviewStep props interface */
export interface ReviewStepProps {
  /** Optional header title (pre-localized) */
  title?: string;

  /** Optional header message (pre-localized) */
  message?: string;

  /** Optional header icon */
  icon?: ReactNode;

  /** Array of review sections */
  sections: ReviewSection[];

  /** Additional content slot (rendered after sections) */
  children?: ReactNode;

  /** Terms checkbox configuration (optional) */
  terms?: ReviewStepTerms;

  /** Custom class name */
  className?: string;
}

// ============================================================================
// Icons (inline SVG for portability)
// ============================================================================

const CheckCircleIcon = () => (
  <svg
    width="32"
    height="32"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <circle cx="12" cy="12" r="10" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const EditIcon = ({ size = 14 }: { size?: number }) => (
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
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

// ============================================================================
// Sub-components
// ============================================================================

/** Review item display component */
interface ReviewItemDisplayProps {
  item: ReviewItem;
}

function ReviewItemDisplay({ item }: ReviewItemDisplayProps) {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        gap: 'var(--ds-spacing-4)',
        padding: 'var(--ds-spacing-2) 0',
      }}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--ds-spacing-2)',
          color: 'var(--ds-color-neutral-text-subtle)',
          fontSize: 'var(--ds-font-size-sm)',
        }}
      >
        {item.icon && <span style={{ display: 'inline-flex', flexShrink: 0 }}>{item.icon}</span>}
        <span>{item.label}</span>
      </div>
      <Paragraph
        data-size="sm"
        style={{
          margin: 0,
          fontWeight: 500,
          textAlign: 'right',
          wordBreak: 'break-word',
        }}
      >
        {item.value}
      </Paragraph>
    </div>
  );
}

/** Review section component */
interface ReviewSectionDisplayProps {
  section: ReviewSection;
}

function ReviewSectionDisplay({ section }: ReviewSectionDisplayProps) {
  return (
    <div
      style={{
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderRadius: 'var(--ds-border-radius-lg)',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
      }}
    >
      {/* Section header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--ds-spacing-3)',
          paddingBottom: 'var(--ds-spacing-3)',
          borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'var(--ds-spacing-2)',
          }}
        >
          {section.icon && (
            <span
              style={{
                display: 'inline-flex',
                color: 'var(--ds-color-accent-base-default)',
              }}
            >
              {section.icon}
            </span>
          )}
          <Heading level={4} data-size="xs" style={{ margin: 0 }}>
            {section.title}
          </Heading>
        </div>

        {section.onEdit && section.editLabel && (
          <Button
            type="button"
            variant="tertiary"
            data-size="sm"
            onClick={section.onEdit}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-1)',
            }}
          >
            <EditIcon size={14} />
            {section.editLabel}
          </Button>
        )}
      </div>

      {/* Section items */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        {section.items.map((item, index) => (
          <ReviewItemDisplay key={index} item={item} />
        ))}
      </div>
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function ReviewStep({
  title,
  message,
  icon,
  sections,
  children,
  terms,
  className,
}: ReviewStepProps): React.ReactElement {
  const displayIcon = icon ?? <CheckCircleIcon />;

  return (
    <div
      className={cn('review-step', className)}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-5)',
      }}
    >
      {/* Header (optional) */}
      {(title || message) && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            gap: 'var(--ds-spacing-3)',
            padding: 'var(--ds-spacing-4)',
          }}
        >
          {/* Icon */}
          <div
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 'var(--ds-spacing-16)',
              height: 'var(--ds-spacing-16)',
              backgroundColor: 'var(--ds-color-accent-surface-default)',
              borderRadius: 'var(--ds-border-radius-full)',
              color: 'var(--ds-color-accent-base-default)',
            }}
          >
            {displayIcon}
          </div>

          {/* Title */}
          {title && (
            <Heading level={2} data-size="md" style={{ margin: 0 }}>
              {title}
            </Heading>
          )}

          {/* Message */}
          {message && (
            <Paragraph
              data-size="sm"
              style={{
                margin: 0,
                color: 'var(--ds-color-neutral-text-subtle)',
                maxWidth: 'var(--ds-sizing-480)',
              }}
            >
              {message}
            </Paragraph>
          )}
        </div>
      )}

      {/* Sections */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-4)',
        }}
      >
        {sections.map((section) => (
          <ReviewSectionDisplay key={section.id} section={section} />
        ))}
      </div>

      {/* Additional content */}
      {children}

      {/* Terms checkbox (optional) */}
      {terms && (
        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: terms.error
              ? 'var(--ds-color-danger-surface-default)'
              : 'var(--ds-color-neutral-surface-default)',
            borderRadius: 'var(--ds-border-radius-lg)',
            border: `1px solid ${
              terms.error
                ? 'var(--ds-color-danger-border-default)'
                : 'var(--ds-color-neutral-border-subtle)'
            }`,
          }}
        >
          <Checkbox
            label={terms.label}
            checked={terms.checked}
            onChange={(e) => terms.onChange(e.target.checked)}
            data-size="sm"
          />

          {terms.error && (
            <Paragraph
              data-size="xs"
              style={{
                margin: 0,
                marginTop: 'var(--ds-spacing-2)',
                color: 'var(--ds-color-danger-text-default)',
              }}
            >
              {terms.error}
            </Paragraph>
          )}
        </div>
      )}
    </div>
  );
}

export default ReviewStep;
