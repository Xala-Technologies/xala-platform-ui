/** RentalObjectHeader - Refactored Pure UI */
/* eslint-disable no-restricted-syntax */
import * as React from 'react';
import { Heading, Paragraph } from '@digdir/designsystemet-react';

export interface RentalObjectHeaderLabels {
  backLabel: string;
  shareLabel: string;
}

export interface RentalObjectHeaderProps {
  name: string;
  category?: string;
  imageUrl?: string;
  onBack?: () => void;
  onShare?: () => void;
  labels: RentalObjectHeaderLabels;
  className?: string;
}

export function RentalObjectHeader({
  name,
  category,
  labels: _labels,
  className,
}: RentalObjectHeaderProps): React.ReactElement {
  return (
    <div
      className={className}
      style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}
    >
      <Heading level={1} data-size="lg">
        {name}
      </Heading>
      {category && (
        <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
          {category}
        </Paragraph>
      )}
    </div>
  );
}

export default RentalObjectHeader;
