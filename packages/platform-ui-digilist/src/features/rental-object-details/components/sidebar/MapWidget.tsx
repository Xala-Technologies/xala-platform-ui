/** MapWidget - Refactored Pure UI */
import * as React from 'react';
import { Card, Paragraph } from '@xala-technologies/platform-ui-core';

export interface MapCoordinates {
  latitude: number;
  longitude: number;
}

export interface MapWidgetLabels {
  mapHeading: string;
  getDirectionsLabel: string;
}

export interface MapWidgetProps {
  coordinates?: MapCoordinates;
  address?: string;
  labels: MapWidgetLabels;
  className?: string;
}

export function MapWidget({
  coordinates,
  address,
  labels,
  className,
}: MapWidgetProps): React.ReactElement {
  if (!coordinates) return <></>;
  return (
    <Card className={className} data-color="neutral">
      <Paragraph data-size="sm">{labels.mapHeading}</Paragraph>
      {address && (
        <Paragraph data-size="xs" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
          {address}
        </Paragraph>
      )}
    </Card>
  );
}

export default MapWidget;
