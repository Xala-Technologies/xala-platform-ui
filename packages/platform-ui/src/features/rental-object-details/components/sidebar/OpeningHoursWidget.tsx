/** OpeningHoursWidget - Refactored Pure UI */
import * as React from 'react';
import { Card, Paragraph } from '@digdir/designsystemet-react';

export interface DayHours {
  day: string;
  hours: string;
  isClosed?: boolean;
}

export interface HoursException {
  date: string;
  label: string;
  hours?: string;
}

export interface OpeningHours {
  regular: DayHours[];
  exceptions?: HoursException[];
}

export interface OpeningHoursWidgetLabels {
  openingHoursHeading: string;
  closedLabel: string;
}

export interface OpeningHoursWidgetProps {
  openingHours?: OpeningHours;
  labels: OpeningHoursWidgetLabels;
  className?: string;
}

export function OpeningHoursWidget({ openingHours, labels, className }: OpeningHoursWidgetProps): React.ReactElement {
  if (!openingHours || !openingHours.regular || openingHours.regular.length === 0) return <></>;
  
  return (
    <Card className={className} data-color="neutral">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
        <Paragraph data-size="xs" style={{ 
          textTransform: 'uppercase',
          fontWeight: 'var(--ds-font-weight-medium)',
          color: 'var(--ds-color-neutral-text-subtle)'
        }}>
          {labels.openingHoursHeading}
        </Paragraph>
        {openingHours.regular.map((day, idx) => (
          <div key={idx} style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Paragraph data-size="sm">{day.day}</Paragraph>
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {day.isClosed ? labels.closedLabel : day.hours}
            </Paragraph>
          </div>
        ))}
      </div>
    </Card>
  );
}

export default OpeningHoursWidget;
