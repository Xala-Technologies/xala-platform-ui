/**
 * FaqTab Component
 *
 * Pure presentational component displaying frequently asked questions in accordion format.
 * All text content is provided via labels prop (no i18n).
 *
 * @module @xala-technologies/platform-ui/features/rental-object-details/components/tabs
 */

import * as React from 'react';
import { Heading, Paragraph } from '@xala-technologies/platform-ui-core';
type RentalObjectType = 'SPACE' | 'RESOURCE' | 'EVENT' | 'SERVICE' | 'VEHICLE' | 'OTHER';
import { createPresenter } from '../../presenters';

// =============================================================================
// Icons
// =============================================================================

function HelpIcon(): React.ReactElement {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

/**
 * Individual FAQ item card with accordion behavior.
 * Extracted as separate component to use React.useState properly.
 */
function FAQItemCard({ item }: { item: FAQItem }): React.ReactElement {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <details
      open={isOpen}
      onToggle={(e) => setIsOpen((e.target as HTMLDetailsElement).open)}
      style={{
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
        borderRadius: 'var(--ds-border-radius-lg)',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
      }}
    >
      <summary
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--ds-spacing-2)',
          cursor: 'pointer',
          fontWeight: 'var(--ds-font-weight-medium)',
          color: 'var(--ds-color-neutral-text-default)',
          listStyle: 'none',
        }}
      >
        <HelpIcon />
        <span>{item.question}</span>
      </summary>
      <div style={{ marginTop: 'var(--ds-spacing-3)' }}>
        <Paragraph
          data-size="sm"
          style={{
            whiteSpace: 'pre-wrap',
            lineHeight: 'var(--ds-font-line-height-default)',
          }}
        >
          {item.answer}
        </Paragraph>
      </div>
    </details>
  );
}

// =============================================================================
// Types
// =============================================================================

export interface FAQItem {
  id: string;
  question: string;
  answer: string;
  category?: string;
}

/**
 * Labels for FaqTab component
 */
export interface FaqTabLabels {
  /** Main heading for FAQ section */
  faqHeading: string;
  /** Empty state message when no FAQs */
  noFaqMessage: string;
}

export interface FaqTabProps {
  /** FAQ items to display */
  faq: FAQItem[];
  /** Rental object type for presenter configuration */
  rentalObjectType: RentalObjectType;
  /** UI labels for all text content */
  labels: FaqTabLabels;
  /** Custom class name */
  className?: string;
}

// =============================================================================
// Component
// =============================================================================

/**
 * Displays frequently asked questions in an accordion format.
 * Pure presentational component - all text content via labels prop.
 *
 * @example
 * ```tsx
 * import { FaqTab } from '@xala-technologies/platform-ui/features/rental-object-details';
 *
 * const labels = {
 *   faqHeading: 'Frequently Asked Questions',
 *   noFaqMessage: 'No FAQ available',
 * };
 *
 * function RentalObjectPage({ rentalObject }) {
 *   return (
 *     <FaqTab
 *       faq={rentalObject.metadata.faq}
 *       rentalObjectType={rentalObject.type}
 *       labels={labels}
 *     />
 *   );
 * }
 * ```
 */
export function FaqTab({
  faq,
  rentalObjectType,
  labels,
  className,
}: FaqTabProps): React.ReactElement {
  const presenter = React.useMemo(() => createPresenter(rentalObjectType), [rentalObjectType]);

  // Empty state
  if (faq.length === 0) {
    return (
      <div
        className={className}
        style={{
          textAlign: 'center',
          padding: 'var(--ds-spacing-8)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <span style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
          <HelpIcon />
        </span>
        <Paragraph
          data-size="sm"
          style={{ fontStyle: 'italic', color: 'var(--ds-color-neutral-text-subtle)' }}
        >
          {labels.noFaqMessage}
        </Paragraph>
      </div>
    );
  }

  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}
    >
      <Heading level={2} data-size="sm">
        {labels.faqHeading}
      </Heading>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
        {faq.map((item: FAQItem, index: number) => (
          <FAQItemCard key={`${item.id}-${index}`} item={item} />
        ))}
      </div>
    </div>
  );
}

export default FaqTab;
