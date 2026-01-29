/**
 * BookingWidgetPlacement Component (Stub)
 *
 * Placeholder component for booking widget placement.
 * TODO: Import and adapt from features/rental-object-details/components/booking/BookingWidgetPlacement
 */

import * as React from 'react';
import { Card, Heading, Paragraph, Button } from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/platform/runtime';

export interface BookingWidgetPlacementProps {
  rentalObjectId: string;
  bookingConfig?: unknown;
  pricing?: unknown;
  onBookClick?: () => void;
}

/**
 * BookingWidgetPlacement renders the booking widget for a rental object.
 * This is a stub implementation - the full component is in features/rental-object-details.
 */
export function BookingWidgetPlacement({
  rentalObjectId,
  onBookClick,
}: BookingWidgetPlacementProps): React.ReactElement {
  const t = useT();

  return (
    <Card
      style={{
        padding: 'var(--ds-spacing-6)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
        borderRadius: 'var(--ds-border-radius-lg)',
      }}
    >
      <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
        {t('booking.title')}
      </Heading>
      <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)', color: 'var(--ds-color-neutral-text-subtle)' }}>
        {t('booking.selectDatesPrompt')}
      </Paragraph>
      <Button
        variant="primary"
        onClick={onBookClick}
        style={{ width: '100%' }}
      >
        {t('booking.checkAvailability')}
      </Button>
    </Card>
  );
}

export default BookingWidgetPlacement;
