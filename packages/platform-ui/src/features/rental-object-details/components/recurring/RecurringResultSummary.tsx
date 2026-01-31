/** RecurringResultSummary - Refactored Pure UI */

import * as React from 'react';
import { Paragraph } from '@digdir/designsystemet-react';

export interface RecurringResultSummaryLabels {
  totalBookingsLabel: string;
  successfulLabel: string;
  failedLabel: string;
}

export interface RecurringResultSummaryProps {
  total: number;
  successful: number;
  failed: number;
  labels: RecurringResultSummaryLabels;
  className?: string;
}

export function RecurringResultSummary({
  total,
  successful,
  failed,
  labels,
  className,
}: RecurringResultSummaryProps): React.ReactElement {
  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}
    >
      <Paragraph data-size="sm">
        {labels.totalBookingsLabel}: {total}
      </Paragraph>
      <Paragraph data-size="sm" style={{ color: 'var(--ds-color-success-text-default)' }}>
        {labels.successfulLabel}: {successful}
      </Paragraph>
      <Paragraph data-size="sm" style={{ color: 'var(--ds-color-danger-text-default)' }}>
        {labels.failedLabel}: {failed}
      </Paragraph>
    </div>
  );
}

export default RecurringResultSummary;
