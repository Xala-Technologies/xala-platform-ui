/**
 * LogisticsDetailsCard Component
 *
 * Two-column card for logistics (pickup) and details (specs).
 * Used for equipment rentals and venues with specific requirements.
 *
 * @example
 * ```tsx
 * import { LogisticsDetailsCard } from '@xala-technologies/platform/ui';
 *
 * <LogisticsDetailsCard
 *   logistics={{
 *     pickupLocation: 'Hovedlager',
 *     pickupAddress: 'Industriveien 15, 0580 Oslo',
 *     pickupHours: 'Man-Fre 08-16',
 *     deliveryAvailable: true,
 *   }}
 *   details={{
 *     specifications: ['50 stoler inkludert', 'Maks 100 personer'],
 *     includedItems: ['Lydanlegg', 'Mikrofon'],
 *     returnDeadline: 'Samme dag innen kl 16:00',
 *   }}
 * />
 * ```
 */

import * as React from 'react';
import { Card, Heading, Paragraph } from '@digdir/designsystemet-react';
import { cn } from '../utils';
import { MapPinIcon, ClockIcon, CheckIcon } from '../primitives/icons';

// =============================================================================
// Types
// =============================================================================

export interface LogisticsInfo {
  /** Pickup location name */
  pickupLocation?: string;
  /** Pickup address */
  pickupAddress?: string;
  /** Pickup hours */
  pickupHours?: string;
  /** Whether delivery is available */
  deliveryAvailable?: boolean;
  /** Transport/delivery info */
  transportInfo?: string;
}

export interface DetailsInfo {
  /** Technical specifications */
  specifications?: string[];
  /** Items included */
  includedItems?: string[];
  /** Return deadline */
  returnDeadline?: string;
  /** Damage policy */
  damagePolicy?: string;
}

export interface LogisticsDetailsCardLabels {
  /** Section titles */
  logisticsTitle?: string;
  detailsTitle?: string;
  /** Field labels */
  pickupLocation?: string;
  pickupHours?: string;
  delivery?: string;
  transport?: string;
  specifications?: string;
  included?: string;
  returnDeadline?: string;
  damagePolicy?: string;
  /** Values */
  deliveryAvailable?: string;
  deliveryNotAvailable?: string;
}

export interface LogisticsDetailsCardProps {
  /** Logistics information */
  logistics?: LogisticsInfo;
  /** Details information */
  details?: DetailsInfo;
  /** Localization labels */
  labels?: LogisticsDetailsCardLabels;
  /** Layout variant */
  layout?: 'side-by-side' | 'stacked';
  /** Additional className */
  className?: string;
}

// =============================================================================
// Default labels (Norwegian)
// =============================================================================

const defaultLabels: Required<LogisticsDetailsCardLabels> = {
  logisticsTitle: 'Logistikk',
  detailsTitle: 'Detaljer',
  pickupLocation: 'Hentested',
  pickupHours: 'Hentetider',
  delivery: 'Levering',
  transport: 'Transport',
  specifications: 'Spesifikasjoner',
  included: 'Inkludert',
  returnDeadline: 'Returfrist',
  damagePolicy: 'Skadepolicy',
  deliveryAvailable: 'Levering tilgjengelig',
  deliveryNotAvailable: 'Kun henting',
};

// =============================================================================
// Component
// =============================================================================

/**
 * LogisticsDetailsCard displays logistics and details in a two-column layout.
 *
 * Accessibility:
 * - Semantic heading hierarchy
 * - List structure for items
 * - Descriptive labels
 */
export function LogisticsDetailsCard({
  logistics,
  details,
  labels: customLabels,
  layout = 'side-by-side',
  className,
}: LogisticsDetailsCardProps): React.ReactElement {
  const labels = { ...defaultLabels, ...customLabels };

  const hasLogistics =
    logistics &&
    (logistics.pickupLocation ||
      logistics.pickupAddress ||
      logistics.pickupHours ||
      logistics.deliveryAvailable !== undefined ||
      logistics.transportInfo);

  const hasDetails =
    details &&
    ((details.specifications && details.specifications.length > 0) ||
      (details.includedItems && details.includedItems.length > 0) ||
      details.returnDeadline ||
      details.damagePolicy);

  const containerStyle: React.CSSProperties = {
    display: layout === 'side-by-side' ? 'grid' : 'flex',
    gridTemplateColumns: layout === 'side-by-side' ? '1fr 1fr' : undefined,
    flexDirection: layout === 'stacked' ? 'column' : undefined,
    gap: 'var(--ds-spacing-4)',
  };

  const sectionStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-3)',
  };

  const fieldStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-1)',
  };

  const listStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-1)',
    padding: 0,
    margin: 0,
    listStyle: 'none',
  };

  const listItemStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--ds-spacing-2)',
  };

  const renderField = (label: string, value: React.ReactNode, icon?: React.ReactNode) => {
    if (!value) return null;
    return (
      <div style={fieldStyle}>
        <Paragraph
          data-size="xs"
          style={{
            margin: 0,
            fontWeight: 'var(--ds-font-weight-medium)',
            color: 'var(--ds-color-neutral-text-subtle)',
            textTransform: 'uppercase',
            letterSpacing: '0.05em',
          }}
        >
          {label}
        </Paragraph>
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--ds-spacing-2)' }}>
          {icon && (
            <span style={{ color: 'var(--ds-color-accent-base-default)', flexShrink: 0 }}>
              {icon}
            </span>
          )}
          <Paragraph data-size="sm" style={{ margin: 0 }}>
            {value}
          </Paragraph>
        </div>
      </div>
    );
  };

  const renderList = (items: string[]) => (
    <ul style={listStyle}>
      {items.map((item, index) => (
        <li key={index} style={listItemStyle}>
          <span style={{ color: 'var(--ds-color-success-base-default)', marginTop: 2 }}>
            <CheckIcon size={14} />
          </span>
          <Paragraph data-size="sm" style={{ margin: 0 }}>
            {item}
          </Paragraph>
        </li>
      ))}
    </ul>
  );

  return (
    <Card
      className={cn('logistics-details-card', className)}
      style={{ padding: 'var(--ds-spacing-4)' }}
    >
      <div style={containerStyle}>
        {/* Logistics Section */}
        {hasLogistics && (
          <div style={sectionStyle}>
            <Heading level={3} data-size="xs" style={{ margin: 0 }}>
              {labels.logisticsTitle}
            </Heading>

            {logistics?.pickupLocation &&
              renderField(
                labels.pickupLocation,
                <>
                  <strong>{logistics.pickupLocation}</strong>
                  {logistics.pickupAddress && (
                    <>
                      <br />
                      {logistics.pickupAddress}
                    </>
                  )}
                </>,
                <MapPinIcon size={16} />
              )}

            {logistics?.pickupHours &&
              renderField(labels.pickupHours, logistics.pickupHours, <ClockIcon size={16} />)}

            {logistics?.deliveryAvailable !== undefined &&
              renderField(
                labels.delivery,
                logistics.deliveryAvailable ? labels.deliveryAvailable : labels.deliveryNotAvailable
              )}

            {logistics?.transportInfo && renderField(labels.transport, logistics.transportInfo)}
          </div>
        )}

        {/* Details Section */}
        {hasDetails && (
          <div style={sectionStyle}>
            <Heading level={3} data-size="xs" style={{ margin: 0 }}>
              {labels.detailsTitle}
            </Heading>

            {details?.specifications && details.specifications.length > 0 && (
              <div style={fieldStyle}>
                <Paragraph
                  data-size="xs"
                  style={{
                    margin: 0,
                    fontWeight: 'var(--ds-font-weight-medium)',
                    color: 'var(--ds-color-neutral-text-subtle)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {labels.specifications}
                </Paragraph>
                {renderList(details.specifications)}
              </div>
            )}

            {details?.includedItems && details.includedItems.length > 0 && (
              <div style={fieldStyle}>
                <Paragraph
                  data-size="xs"
                  style={{
                    margin: 0,
                    fontWeight: 'var(--ds-font-weight-medium)',
                    color: 'var(--ds-color-neutral-text-subtle)',
                    textTransform: 'uppercase',
                    letterSpacing: '0.05em',
                  }}
                >
                  {labels.included}
                </Paragraph>
                {renderList(details.includedItems)}
              </div>
            )}

            {details?.returnDeadline && renderField(labels.returnDeadline, details.returnDeadline)}

            {details?.damagePolicy && renderField(labels.damagePolicy, details.damagePolicy)}
          </div>
        )}
      </div>
    </Card>
  );
}

LogisticsDetailsCard.displayName = 'LogisticsDetailsCard';
