/** PaymentSection - Refactored Pure UI */
/* eslint-disable no-restricted-syntax */
import * as React from 'react';
import { Heading, Paragraph, Card } from '@digdir/designsystemet-react';

export interface PriceLine {
  label: string;
  amount: number;
  currency: string;
}

export interface PaymentSectionLabels {
  heading: string;
  subtotalLabel: string;
  taxLabel: string;
  totalLabel: string;
}

export interface PaymentSectionProps {
  priceLines: PriceLine[];
  subtotal: number;
  tax?: number;
  total: number;
  currency: string;
  labels: PaymentSectionLabels;
  className?: string;
}

export function PaymentSection({
  priceLines,
  subtotal: _subtotal,
  tax: _tax,
  total,
  currency,
  labels,
  className,
}: PaymentSectionProps): React.ReactElement {
  return (
    <Card className={className} data-color="neutral">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
        <Heading level={3} data-size="sm">
          {labels.heading}
        </Heading>
        {priceLines.map((line, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Paragraph data-size="sm">{line.label}</Paragraph>
            <Paragraph data-size="sm">
              {line.amount} {line.currency}
            </Paragraph>
          </div>
        ))}
        <div
          style={{
            borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
            paddingTop: 'var(--ds-spacing-2)',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Paragraph data-size="md" style={{ fontWeight: 'var(--ds-font-weight-semibold)' }}>
              {labels.totalLabel}
            </Paragraph>
            <Paragraph data-size="md" style={{ fontWeight: 'var(--ds-font-weight-semibold)' }}>
              {total} {currency}
            </Paragraph>
          </div>
        </div>
      </div>
    </Card>
  );
}

export default PaymentSection;
