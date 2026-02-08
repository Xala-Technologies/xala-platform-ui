/**
 * TicketRegistrationCard Component
 *
 * Display ticket/registration info for events.
 * Shows prices, capacity, registration status, deadlines.
 *
 * @example
 * ```tsx
 * import { TicketRegistrationCard } from '@xala-technologies/platform/ui';
 *
 * <TicketRegistrationCard
 *   registration={{
 *     type: 'tickets',
 *     status: 'open',
 *     prices: [
 *       { label: 'Voksen', price: 250 },
 *       { label: 'Barn', price: 100 },
 *     ],
 *     capacity: { total: 100, available: 45 },
 *     registrationDeadline: '2024-09-01T12:00:00',
 *   }}
 * />
 * ```
 */

import * as React from 'react';
import { Card, Heading, Paragraph, Button, Link } from '@digdir/designsystemet-react';
import { cn } from '../utils';

// =============================================================================
// Types
// =============================================================================

export type RegistrationType = 'tickets' | 'registration' | 'free' | 'external';
export type RegistrationStatus =
  | 'upcoming'
  | 'open'
  | 'closing_soon'
  | 'sold_out'
  | 'closed'
  | 'waitlist';

export interface TicketPrice {
  /** Price label */
  label: string;
  /** Price amount */
  price: number;
  /** Description */
  description?: string;
  /** Available count */
  available?: number;
}

export interface Capacity {
  /** Total capacity */
  total: number;
  /** Available spots */
  available: number;
  /** Waitlist count */
  waitlist?: number;
}

export interface Registration {
  /** Registration type */
  type: RegistrationType;
  /** Current status */
  status: RegistrationStatus;
  /** Ticket prices */
  prices?: TicketPrice[];
  /** Capacity info */
  capacity?: Capacity;
  /** Registration opens date */
  registrationOpens?: string;
  /** Registration deadline */
  registrationDeadline?: string;
  /** External registration URL */
  externalUrl?: string;
  /** Age restrictions */
  ageRestriction?: number;
}

export interface TicketRegistrationCardLabels {
  /** Card title */
  title?: string;
  /** Type labels */
  tickets?: string;
  registration?: string;
  free?: string;
  external?: string;
  /** Status labels */
  statusUpcoming?: string;
  statusOpen?: string;
  statusClosingSoon?: string;
  statusSoldOut?: string;
  statusClosed?: string;
  statusWaitlist?: string;
  /** Field labels */
  price?: string;
  freeLabel?: string;
  capacity?: string;
  available?: string;
  deadline?: string;
  opens?: string;
  ageRestriction?: string;
  /** Actions */
  register?: string;
  joinWaitlist?: string;
  externalLink?: string;
  /** Units */
  spotsAvailable?: string;
  spotsLeft?: string;
  currency?: string;
}

export interface TicketRegistrationCardProps {
  /** Registration details */
  registration: Registration;
  /** Registration handler */
  onRegister?: () => void;
  /** Localization labels */
  labels?: TicketRegistrationCardLabels;
  /** Compact layout */
  compact?: boolean;
  /** Additional className */
  className?: string;
}

// =============================================================================
// Default labels (Norwegian)
// =============================================================================

const defaultLabels: Required<TicketRegistrationCardLabels> = {
  title: 'Påmelding',
  tickets: 'Billetter',
  registration: 'Påmelding',
  free: 'Gratis',
  external: 'Ekstern påmelding',
  statusUpcoming: 'Påmelding åpner snart',
  statusOpen: 'Åpen for påmelding',
  statusClosingSoon: 'Påmelding stenger snart',
  statusSoldOut: 'Utsolgt',
  statusClosed: 'Påmelding stengt',
  statusWaitlist: 'Venteliste',
  price: 'Pris',
  freeLabel: 'Gratis',
  capacity: 'Kapasitet',
  available: 'Ledige',
  deadline: 'Påmeldingsfrist',
  opens: 'Påmelding åpner',
  ageRestriction: 'Aldersgrense',
  register: 'Meld deg på',
  joinWaitlist: 'Bli med på venteliste',
  externalLink: 'Gå til påmelding',
  spotsAvailable: 'plasser totalt',
  spotsLeft: 'ledige plasser',
  currency: 'kr',
};

// =============================================================================
// Utility
// =============================================================================

const formatDateTime = (dateStr: string, locale = 'nb-NO'): string => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(locale, {
    day: 'numeric',
    month: 'short',
    hour: '2-digit',
    minute: '2-digit',
  });
};

// =============================================================================
// Icons
// =============================================================================

const TicketIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M2 9a3 3 0 0 1 0 6v2a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-2a3 3 0 0 1 0-6V7a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v2Z" />
    <path d="M13 5v2" />
    <path d="M13 17v2" />
    <path d="M13 11v2" />
  </svg>
);

const UsersIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

// =============================================================================
// Component
// =============================================================================

/**
 * TicketRegistrationCard displays ticket/registration information.
 *
 * Accessibility:
 * - Semantic heading structure
 * - Status via badge
 * - Clear action buttons
 */
export function TicketRegistrationCard({
  registration,
  onRegister,
  labels: customLabels,
  compact = false,
  className,
}: TicketRegistrationCardProps): React.ReactElement {
  const labels = { ...defaultLabels, ...customLabels };

  const getStatusLabel = (): string => {
    switch (registration.status) {
      case 'upcoming':
        return labels.statusUpcoming;
      case 'open':
        return labels.statusOpen;
      case 'closing_soon':
        return labels.statusClosingSoon;
      case 'sold_out':
        return labels.statusSoldOut;
      case 'closed':
        return labels.statusClosed;
      case 'waitlist':
        return labels.statusWaitlist;
    }
  };

  const getStatusColor = (): { bg: string; text: string } => {
    switch (registration.status) {
      case 'open':
        return {
          bg: 'var(--ds-color-success-surface-default)',
          text: 'var(--ds-color-success-text-default)',
        };
      case 'closing_soon':
        return {
          bg: 'var(--ds-color-warning-surface-default)',
          text: 'var(--ds-color-warning-text-default)',
        };
      case 'sold_out':
      case 'closed':
        return {
          bg: 'var(--ds-color-danger-surface-default)',
          text: 'var(--ds-color-danger-text-default)',
        };
      case 'waitlist':
        return {
          bg: 'var(--ds-color-accent-surface-default)',
          text: 'var(--ds-color-accent-text-default)',
        };
      default:
        return {
          bg: 'var(--ds-color-neutral-surface-default)',
          text: 'var(--ds-color-neutral-text-subtle)',
        };
    }
  };

  const canRegister = registration.status === 'open' || registration.status === 'closing_soon';
  const canJoinWaitlist = registration.status === 'waitlist';
  const isExternal = registration.type === 'external';

  const statusColors = getStatusColor();

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: compact ? 'var(--ds-spacing-2)' : 'var(--ds-spacing-3)',
  };

  const badgeStyle: React.CSSProperties = {
    display: 'inline-flex',
    alignItems: 'center',
    padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
    backgroundColor: statusColors.bg,
    color: statusColors.text,
    borderRadius: 'var(--ds-border-radius-full)',
    fontSize: 'var(--ds-font-size-xs)',
    fontWeight: 'var(--ds-font-weight-medium)',
  };

  const priceListStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-2)',
    padding: 0,
    margin: 0,
    listStyle: 'none',
  };

  const priceItemStyle: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 'var(--ds-spacing-2)',
    backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
    borderRadius: 'var(--ds-border-radius-sm)',
  };

  const capacityFillStyle = (available: number, total: number): React.CSSProperties => {
    const percent = Math.round((available / total) * 100);
    return {
      position: 'absolute',
      top: 0,
      left: 0,
      height: '100%',
      width: `${percent}%`,
      backgroundColor:
        percent > 30
          ? 'var(--ds-color-success-base-default)'
          : percent > 10
            ? 'var(--ds-color-warning-base-default)'
            : 'var(--ds-color-danger-base-default)',
      borderRadius: 'var(--ds-border-radius-full)',
    };
  };

  return (
    <Card
      className={cn('ticket-registration-card', className)}
      style={{ padding: compact ? 'var(--ds-spacing-3)' : 'var(--ds-spacing-4)' }}
    >
      <div style={containerStyle}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 'var(--ds-spacing-2)',
          }}
        >
          <Heading
            level={3}
            data-size="xs"
            style={{ margin: 0, display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}
          >
            <TicketIcon />
            {labels.title}
          </Heading>
          <span style={badgeStyle}>{getStatusLabel()}</span>
        </div>

        {/* Prices */}
        {registration.prices && registration.prices.length > 0 && (
          <ul style={priceListStyle}>
            {registration.prices.map((price, index) => (
              <li key={index} style={priceItemStyle}>
                <div>
                  <Paragraph data-size="sm" style={{ margin: 0 }}>
                    {price.label}
                  </Paragraph>
                  {price.description && (
                    <Paragraph
                      data-size="xs"
                      style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
                    >
                      {price.description}
                    </Paragraph>
                  )}
                </div>
                <Paragraph
                  data-size="sm"
                  style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}
                >
                  {price.price === 0 ? labels.freeLabel : `${price.price} ${labels.currency}`}
                </Paragraph>
              </li>
            ))}
          </ul>
        )}

        {/* Free event */}
        {registration.type === 'free' && (
          <Paragraph
            data-size="lg"
            style={{
              margin: 0,
              fontWeight: 'var(--ds-font-weight-medium)',
              color: 'var(--ds-color-success-text-default)',
            }}
          >
            {labels.freeLabel}
          </Paragraph>
        )}

        {/* Capacity */}
        {registration.capacity && (
          <div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                marginBottom: 'var(--ds-spacing-1)',
              }}
            >
              <Paragraph
                data-size="sm"
                style={{
                  margin: 0,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-1)',
                }}
              >
                <UsersIcon />
                {registration.capacity.available} {labels.spotsLeft}
              </Paragraph>
              <Paragraph
                data-size="xs"
                style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
              >
                av {registration.capacity.total}
              </Paragraph>
            </div>
            <div
              style={{
                height: 6,
                borderRadius: 'var(--ds-border-radius-full)',
                backgroundColor: 'var(--ds-color-neutral-surface-default)',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div
                style={capacityFillStyle(
                  registration.capacity.available,
                  registration.capacity.total
                )}
              />
            </div>
          </div>
        )}

        {/* Deadline */}
        {registration.registrationDeadline && (
          <Paragraph
            data-size="sm"
            style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
          >
            {labels.deadline}: {formatDateTime(registration.registrationDeadline)}
          </Paragraph>
        )}

        {/* Opens date */}
        {registration.registrationOpens && registration.status === 'upcoming' && (
          <Paragraph
            data-size="sm"
            style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
          >
            {labels.opens}: {formatDateTime(registration.registrationOpens)}
          </Paragraph>
        )}

        {/* Age restriction */}
        {registration.ageRestriction && (
          <Paragraph data-size="sm" style={{ margin: 0 }}>
            {labels.ageRestriction}: {registration.ageRestriction}+
          </Paragraph>
        )}

        {/* Action button */}
        {(canRegister || canJoinWaitlist || isExternal) && (
          <div style={{ marginTop: 'var(--ds-spacing-2)' }}>
            {isExternal && registration.externalUrl ? (
              <Link
                href={registration.externalUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '100%',
                  padding: 'var(--ds-spacing-2) var(--ds-spacing-4)',
                  backgroundColor: 'var(--ds-color-accent-base-default)',
                  color: 'var(--ds-color-neutral-background-default)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  fontWeight: 'var(--ds-font-weight-medium)',
                  textDecoration: 'none',
                }}
              >
                {labels.externalLink}
              </Link>
            ) : (
              <Button
                variant="primary"
                data-size="sm"
                data-color={canJoinWaitlist ? 'neutral' : undefined}
                onClick={onRegister}
                style={{ width: '100%' }}
              >
                {canJoinWaitlist ? labels.joinWaitlist : labels.register}
              </Button>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}

TicketRegistrationCard.displayName = 'TicketRegistrationCard';
