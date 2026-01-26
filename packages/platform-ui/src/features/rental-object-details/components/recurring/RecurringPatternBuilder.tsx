/** RecurringPatternBuilder - Refactored Pure UI */
import * as React from 'react';
import { Heading, Paragraph } from '@digdir/designsystemet-react';

export interface RecurringPatternData {
  frequency: 'daily' | 'weekly' | 'monthly';
  interval: number;
  endDate?: string;
}

export interface RecurringPatternBuilderLabels {
  heading: string;
  frequencyLabel: string;
  intervalLabel: string;
  endDateLabel: string;
}

export interface RecurringPatternBuilderProps {
  pattern?: RecurringPatternData;
  onChange?: (pattern: RecurringPatternData) => void;
  labels: RecurringPatternBuilderLabels;
  className?: string;
}

export const DEFAULT_RECURRING_PATTERN: RecurringPatternData = {
  frequency: 'weekly',
  interval: 1,
};

export function RecurringPatternBuilder({ labels, className }: RecurringPatternBuilderProps): React.ReactElement {
  return (
    <div className={className}>
      <Heading level={3} data-size="sm">{labels.heading}</Heading>
      <Paragraph data-size="sm">{labels.frequencyLabel}</Paragraph>
    </div>
  );
}

export default RecurringPatternBuilder;
