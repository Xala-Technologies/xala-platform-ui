/** RecurringPreviewTable - Refactored Pure UI */
import * as React from 'react';
import { Heading, Paragraph } from '@xala-technologies/platform-ui-core';

export interface RecurringPreviewTableLabels {
  heading: string;
  dateHeader: string;
  timeHeader: string;
  statusHeader: string;
}

export interface RecurringPreviewTableProps {
  previews: Array<{ date: string; time: string; status: string }>;
  labels: RecurringPreviewTableLabels;
  className?: string;
}

export function RecurringPreviewTable({
  labels,
  className,
}: RecurringPreviewTableProps): React.ReactElement {
  return (
    <div className={className}>
      <Heading level={3} data-size="sm">
        {labels.heading}
      </Heading>
      <Paragraph data-size="sm">{labels.dateHeader}</Paragraph>
    </div>
  );
}

export default RecurringPreviewTable;
