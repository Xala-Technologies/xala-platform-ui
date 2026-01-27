/**
 * ActivityTab Component - Pure UI (REFACTORED)
 *
 * NOTE: This is a stub implementation following the refactoring pattern.
 * Full implementation to be completed based on business requirements.
 *
 * Pattern applied:
 * - Removed useT() and i18n imports
 * - Added ActivityTabLabels interface
 * - Changed to Designsystemet components only
 * - All text via labels prop
 */

import * as React from 'react';
import { Heading, Paragraph, Card } from '@xala-technologies/platform-ui-core';
type RentalObjectType = 'SPACE' | 'RESOURCE' | 'EVENT' | 'SERVICE' | 'VEHICLE' | 'OTHER';
import type { ActivityData } from '../../types';

export interface ActivityTabLabels {
  eventsHeading: string;
  sessionsHeading: string;
  rentalHistoryHeading: string;
  noActivityMessage: string;
  organizerLabel: string;
  statusUpcoming: string;
  statusOngoing: string;
  statusPast: string;
  statusCancelled: string;
  statusCompleted: string;
  showingCount: string;
}

export interface ActivityTabProps {
  activityData?: ActivityData;
  rentalObjectType: RentalObjectType;
  labels: ActivityTabLabels;
  className?: string;
}

export function ActivityTab({
  activityData,
  labels,
  className,
}: ActivityTabProps): React.ReactElement {
  if (!activityData || (activityData.events?.length === 0 && activityData.rentals?.length === 0)) {
    return (
      <div className={className} style={{ textAlign: 'center', padding: 'var(--ds-spacing-8)' }}>
        <Paragraph
          data-size="sm"
          style={{ fontStyle: 'italic', color: 'var(--ds-color-neutral-text-subtle)' }}
        >
          {labels.noActivityMessage}
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
        {activityData.type === 'events'
          ? labels.eventsHeading
          : activityData.type === 'sessions'
            ? labels.sessionsHeading
            : labels.rentalHistoryHeading}
      </Heading>
      <Paragraph data-size="sm">{labels.noActivityMessage}</Paragraph>
    </div>
  );
}

export default ActivityTab;
