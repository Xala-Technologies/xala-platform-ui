/**
 * BookingSuccess
 *
 * Success message shown after booking submission.
 * Final step in the booking flow.
 *
 * Pure presentational component - all text provided via labels prop.
 */
import * as React from 'react';
import { Heading, Paragraph, Button, Card } from '@digdir/designsystemet-react';
import {
  CheckCircle2Icon,
  CalendarIcon,
  MailIcon,
  PhoneIcon,
} from 'lucide-react';
import { Stack } from '../../../primitives/stack';

/**
 * Booking details interface
 */
export interface BookingDetails {
  email: string;
  phone?: string;
  name?: string;
  purpose?: string;
  notes?: string;
  organization?: string;
  numberOfPeople?: number;
  showPurposeInCalendar?: boolean;
  bookMultipleDays?: boolean;
  acceptedTerms?: boolean;
}

export interface BookingSuccessLabels {
  heading: string;
  description: string;
  referenceNumber: string;
  confirmationSent: string;
  confirmationEmail: string;
  checkSpam: string;
  contactQuestion: string;
  newBooking: string;
  backToObject: string;
}

export interface BookingSuccessProps {
  /** Booking reference number */
  bookingReference?: string;
  /** Booking details */
  bookingDetails: BookingDetails;
  /** Rental object name */
  rentalObjectName: string;
  /** Contact email for the venue */
  venueEmail?: string;
  /** Contact phone for the venue */
  venuePhone?: string;
  /** All labels for the component */
  labels: BookingSuccessLabels;
  /** Callback to go back to rental object */
  onBackToRentalObject?: () => void;
  /** Callback to make another booking */
  onNewBooking?: () => void;
  /** Custom class name */
  className?: string;
}

/**
 * BookingSuccess component
 */
export function BookingSuccess({
  bookingReference,
  bookingDetails,
  rentalObjectName,
  venueEmail,
  venuePhone,
  labels,
  onBackToRentalObject,
  onNewBooking,
  className,
}: BookingSuccessProps): React.ReactElement {
  return (
    <Stack
      className={className}
      gap="var(--ds-spacing-4)"
      align="center"
      style={{
        textAlign: 'center',
        padding: 'var(--ds-spacing-8)',
      }}
    >
      {/* Success Icon */}
      <span
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          width: '80px',
          height: '80px',
          backgroundColor: 'var(--ds-color-success-surface-default)',
          borderRadius: 'var(--ds-border-radius-full)',
          marginBottom: 'var(--ds-spacing-5)',
        }}
      >
        <CheckCircle2Icon size={40} style={{ color: 'var(--ds-color-success-base-default)' }} />
      </span>

      {/* Success Message */}
      <Heading level={2} data-size="lg">
        {labels.heading}
      </Heading>
      <Paragraph
        data-size="md"
        style={{
          maxWidth: '400px',
          color: 'var(--ds-color-neutral-text-subtle)',
        }}
      >
        {labels.description.replace('{rentalObjectName}', rentalObjectName)}
      </Paragraph>

      {/* Reference Number */}
      {bookingReference && (
        <Card
          data-color="accent"
          style={{
            marginTop: 'var(--ds-spacing-5)',
            display: 'inline-block',
          }}
        >
          <Stack gap="var(--ds-spacing-1)" align="center">
            <Paragraph data-size="xs" style={{ textTransform: 'uppercase', letterSpacing: '0.05em', color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.referenceNumber}
            </Paragraph>
            <Paragraph
              data-size="lg"
              style={{
                fontWeight: 'var(--ds-font-weight-bold)',
                fontFamily: 'monospace',
                letterSpacing: '0.1em',
                color: 'var(--ds-color-accent-text-default)',
              }}
            >
              {bookingReference}
            </Paragraph>
          </Stack>
        </Card>
      )}

      {/* Confirmation Email Notice */}
      <Card
        data-color="neutral"
        style={{
          marginTop: 'var(--ds-spacing-6)',
          textAlign: 'left',
          maxWidth: '400px',
        }}
      >
        <Stack gap="var(--ds-spacing-3)">
          <Stack direction="horizontal" gap="var(--ds-spacing-3)" align="center">
            <span
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '36px',
                height: '36px',
                backgroundColor: 'var(--ds-color-info-surface-default)',
                borderRadius: 'var(--ds-border-radius-md)',
                color: 'var(--ds-color-info-base-default)',
              }}
            >
              <MailIcon size={18} />
            </span>
            <Stack gap="var(--ds-spacing-1)">
              <Paragraph data-size="sm" style={{ fontWeight: 'var(--ds-font-weight-semibold)' }}>
                {labels.confirmationSent}
              </Paragraph>
              <Paragraph data-size="xs" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                {labels.confirmationEmail.replace('{email}', bookingDetails.email)}
              </Paragraph>
            </Stack>
          </Stack>

          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            {labels.checkSpam}
          </Paragraph>
        </Stack>
      </Card>

      {/* Contact Info */}
      {(venueEmail || venuePhone) && (
        <Card
          data-color="neutral"
          style={{
            marginTop: 'var(--ds-spacing-5)',
            maxWidth: '400px',
          }}
        >
          <Stack gap="var(--ds-spacing-2)">
            <Paragraph data-size="xs" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.contactQuestion}
            </Paragraph>
            <Stack direction="horizontal" gap="var(--ds-spacing-4)" justify="center" wrap>
              {venueEmail && (
                <a
                  href={`mailto:${venueEmail}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--ds-spacing-1)',
                    color: 'var(--ds-color-accent-base-default)',
                    textDecoration: 'none',
                    fontSize: 'var(--ds-font-size-sm)',
                  }}
                >
                  <MailIcon size={14} />
                  {venueEmail}
                </a>
              )}
              {venuePhone && (
                <a
                  href={`tel:${venuePhone}`}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--ds-spacing-1)',
                    color: 'var(--ds-color-accent-base-default)',
                    textDecoration: 'none',
                    fontSize: 'var(--ds-font-size-sm)',
                  }}
                >
                  <PhoneIcon size={14} />
                  {venuePhone}
                </a>
              )}
            </Stack>
          </Stack>
        </Card>
      )}

      {/* Action Buttons */}
      <Stack
        direction="horizontal"
        gap="var(--ds-spacing-4)"
        justify="center"
        wrap
        style={{
          marginTop: 'var(--ds-spacing-8)',
        }}
      >
        {onNewBooking && (
          <Button
            type="button"
            variant="secondary"
            onClick={onNewBooking}
          >
            <CalendarIcon size={16} />
            {labels.newBooking}
          </Button>
        )}
        {onBackToRentalObject && (
          <Button
            type="button"
            variant="primary"
            data-color="accent"
            onClick={onBackToRentalObject}
          >
            {labels.backToObject}
          </Button>
        )}
      </Stack>
    </Stack>
  );
}

export default BookingSuccess;
