/** CalendarSection - Refactored Pure UI */
import * as React from 'react';
import { Heading, Paragraph } from '@digdir/designsystemet-react';

export interface QuoteData {
  totalPrice: number;
  currency: string;
}

export interface CalendarSectionLabels {
  heading: string;
  selectDateLabel: string;
  availableLabel: string;
  bookedLabel: string;
}

export interface CalendarSectionProps {
  availableSlots?: Array<{ id: string; date: string; status: string }>;
  onSlotSelect?: (slotId: string) => void;
  quote?: QuoteData;
  labels: CalendarSectionLabels;
  className?: string;
}

export function CalendarSection({ labels, className }: CalendarSectionProps): React.ReactElement {
  return (
    <div className={className}>
      <Heading level={2} data-size="md">
        {labels.heading}
      </Heading>
      <Paragraph data-size="sm">{labels.selectDateLabel}</Paragraph>
    </div>
  );
}

export default CalendarSection;
