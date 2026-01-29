/**
 * ContactWidget - Pure UI Component (Refactored)
 * All text via labels prop, Designsystemet only
 */
/* eslint-disable no-restricted-syntax */
import * as React from 'react';
import { Paragraph, Card } from '@digdir/designsystemet-react';
import type { ContactInfo } from '../../../../types/rental-object-detail';

export interface ContactWidgetLabels {
  contactInfoHeading: string;
  contactPersonLabel: string;
  emailLabel: string;
  phoneLabel: string;
}

export interface ContactWidgetProps {
  contact: ContactInfo;
  labels: ContactWidgetLabels;
  className?: string;
}

export function ContactWidget({
  contact,
  labels,
  className,
}: ContactWidgetProps): React.ReactElement {
  if (!contact.email && !contact.phone && !contact.name) {
    return <></>;
  }

  return (
    <Card className={className} data-color="neutral">
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
        <Paragraph
          data-size="xs"
          style={{
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
            fontWeight: 'var(--ds-font-weight-medium)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {labels.contactInfoHeading}
        </Paragraph>
        {contact.name && <Paragraph data-size="sm">{contact.name}</Paragraph>}
        {contact.email && <Paragraph data-size="sm">{contact.email}</Paragraph>}
        {contact.phone && <Paragraph data-size="sm">{contact.phone}</Paragraph>}
      </div>
    </Card>
  );
}

export default ContactWidget;
