/**
 * OverviewTab Component
 *
 * Pure presentational component displaying rental object description, capacity, amenities, and services.
 * All text content is provided via labels prop (no i18n).
 *
 * @module @xala-technologies/platform-ui/features/rental-object-details/components/tabs
 */

import * as React from 'react';
import { Heading, Paragraph, Card } from '@digdir/designsystemet-react';
import type { RentalObjectType } from '../../../../types/rental-object-detail';
import type { RentalObjectMetadata, IncludedEquipment } from '../../types';
import { createPresenter } from '../../presenters';

// =============================================================================
// Icons
// =============================================================================

function CheckIcon({ size = 16, color = 'currentColor' }: { size?: number; color?: string }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function UsersIcon({ size = 24 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

// Amenity Icons
function ProjectorIcon({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="10" rx="2" />
      <circle cx="8" cy="12" r="2" />
      <path d="M18 12h.01" />
    </svg>
  );
}

function WhiteboardIcon({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="14" rx="2" />
      <path d="M3 17h18" />
    </svg>
  );
}

function WifiIcon({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12.55a11 11 0 0 1 14.08 0" />
      <path d="M1.42 9a16 16 0 0 1 21.16 0" />
      <path d="M8.53 16.11a6 6 0 0 1 6.95 0" />
      <circle cx="12" cy="20" r="1" />
    </svg>
  );
}

function VideoIcon({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="23 7 16 12 23 17 23 7" />
      <rect x="1" y="5" width="15" height="14" rx="2" />
    </svg>
  );
}

function ParkingIcon({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <path d="M9 17V7h4a3 3 0 0 1 0 6H9" />
    </svg>
  );
}

function CoffeeIcon({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M17 8h1a4 4 0 1 1 0 8h-1" />
      <path d="M3 8h14v9a4 4 0 0 1-4 4H7a4 4 0 0 1-4-4V8z" />
      <line x1="6" y1="2" x2="6" y2="4" />
      <line x1="10" y1="2" x2="10" y2="4" />
      <line x1="14" y1="2" x2="14" y2="4" />
    </svg>
  );
}

function ToiletIcon({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 12h10" />
      <path d="M5 12a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2v-5z" />
      <path d="M12 19v3" />
      <path d="M8 22h8" />
      <path d="M7 7h10" />
      <path d="M12 3v4" />
    </svg>
  );
}

function AirConditionerIcon({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="4" width="20" height="8" rx="2" />
      <path d="M6 12v4" />
      <path d="M10 12v6" />
      <path d="M14 12v4" />
      <path d="M18 12v6" />
    </svg>
  );
}

function SpeakerIcon({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="2" width="16" height="20" rx="2" />
      <circle cx="12" cy="14" r="4" />
      <line x1="12" y1="6" x2="12" y2="6.01" />
    </svg>
  );
}

function MicrophoneIcon({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z" />
      <path d="M19 10v2a7 7 0 0 1-14 0v-2" />
      <line x1="12" y1="19" x2="12" y2="23" />
      <line x1="8" y1="23" x2="16" y2="23" />
    </svg>
  );
}

function TVIcon({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="7" width="20" height="15" rx="2" />
      <polyline points="17 2 12 7 7 2" />
    </svg>
  );
}

function KitchenIcon({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M3 2v7c0 1.1.9 2 2 2h4a2 2 0 0 0 2-2V2" />
      <path d="M7 2v20" />
      <path d="M21 15V2v0a5 5 0 0 0-5 5v6c0 1.1.9 2 2 2h3Zm0 0v7" />
    </svg>
  );
}

function AccessibilityIcon({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="4" r="2" />
      <path d="M12 6v6" />
      <path d="M8 10h8" />
      <path d="M8 22l4-10 4 10" />
    </svg>
  );
}

function StorageIcon({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 8.35V20a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8.35A2 2 0 0 1 3.26 6.5l8-3.2a2 2 0 0 1 1.48 0l8 3.2A2 2 0 0 1 22 8.35Z" />
      <path d="M6 18h12" />
      <path d="M6 14h12" />
      <rect x="6" y="10" width="12" height="0" />
    </svg>
  );
}

function getAmenityIcon(name: string): React.ReactElement {
  const lowerName = name.toLowerCase();

  if (lowerName.includes('projektor') || lowerName.includes('projector')) return <ProjectorIcon />;
  if (lowerName.includes('tavle') || lowerName.includes('whiteboard')) return <WhiteboardIcon />;
  if (lowerName.includes('tv') || lowerName.includes('skjerm') || lowerName.includes('screen')) return <TVIcon />;
  if (lowerName.includes('video') || lowerName.includes('konferanse')) return <VideoIcon />;
  if (lowerName.includes('wifi') || lowerName.includes('internet') || lowerName.includes('nett')) return <WifiIcon />;
  if (lowerName.includes('lyd') || lowerName.includes('høyttaler') || lowerName.includes('speaker') || lowerName.includes('sound')) return <SpeakerIcon />;
  if (lowerName.includes('mikrofon') || lowerName.includes('microphone') || lowerName.includes('mic')) return <MicrophoneIcon />;
  if (lowerName.includes('parkering') || lowerName.includes('parking')) return <ParkingIcon />;
  if (lowerName.includes('kaffe') || lowerName.includes('coffee') || lowerName.includes('te') || lowerName.includes('drikke')) return <CoffeeIcon />;
  if (lowerName.includes('toalett') || lowerName.includes('wc') || lowerName.includes('bad') || lowerName.includes('toilet')) return <ToiletIcon />;
  if (lowerName.includes('kjøkken') || lowerName.includes('kitchen') || lowerName.includes('mat')) return <KitchenIcon />;
  if (lowerName.includes('klima') || lowerName.includes('ac') || lowerName.includes('air') || lowerName.includes('ventilasjon')) return <AirConditionerIcon />;
  if (lowerName.includes('rullestol') || lowerName.includes('handicap') || lowerName.includes('tilgjengelig') || lowerName.includes('accessibility')) return <AccessibilityIcon />;
  if (lowerName.includes('lager') || lowerName.includes('storage') || lowerName.includes('oppbevaring')) return <StorageIcon />;

  return <CheckIcon size={16} />;
}

// =============================================================================
// Types
// =============================================================================

export interface Amenity {
  id: string;
  name: string;
  icon?: string;
  category?: string;
  description?: string;
}

export interface AdditionalService {
  id: string;
  name: string;
  description?: string;
  price?: number;
  currency?: string;
}

/**
 * Labels for OverviewTab component
 */
export interface OverviewTabLabels {
  /** Section heading for description */
  descriptionHeading: string;
  /** Heading for capacity section */
  capacityMaxAllowed: string;
  /** Label for capacity unit (e.g., "people", "persons") */
  capacityPeople: string;
  /** Heading for amenities section */
  amenitiesHeading: string;
  /** Heading for additional services section */
  additionalServicesHeading: string;
  /** Heading for included equipment section */
  includedEquipmentHeading: string;
  /** Heading for highlights section */
  highlightsHeading: string;
  /** Empty state message when no information is available */
  noInfoMessage: string;
  /** Empty state message when no description is available */
  noDescriptionMessage: string;
}

export interface OverviewTabProps {
  /** Rental object metadata containing description, amenities, equipment */
  metadata: RentalObjectMetadata;
  /** Rental object type for presenter configuration */
  rentalObjectType: RentalObjectType;
  /** Capacity of the rental object */
  capacity?: number;
  /** Additional services that can be added */
  additionalServices?: AdditionalService[];
  /** Selected service IDs (controlled) */
  selectedServices?: string[];
  /** Callback when services are toggled */
  onServiceToggle?: (serviceId: string) => void;
  /** UI labels for all text content */
  labels: OverviewTabLabels;
  /** Custom class name */
  className?: string;
}

// =============================================================================
// Component
// =============================================================================

/**
 * Displays the overview tab with description, capacity, amenities, and services.
 * Pure presentational component - all text content via labels prop.
 *
 * @example
 * ```tsx
 * import { OverviewTab } from '@xala-technologies/platform-ui/features/rental-object-details';
 *
 * const labels = {
 *   descriptionHeading: 'Description',
 *   capacityMaxAllowed: 'Max Capacity',
 *   capacityPeople: 'people',
 *   amenitiesHeading: 'Amenities',
 *   additionalServicesHeading: 'Additional Services',
 *   includedEquipmentHeading: 'Included Equipment',
 *   highlightsHeading: 'Highlights',
 *   noInfoMessage: 'No information available',
 *   noDescriptionMessage: 'No description provided',
 * };
 *
 * function RentalObjectPage({ rentalObject }) {
 *   return (
 *     <OverviewTab
 *       metadata={rentalObject.metadata}
 *       rentalObjectType={rentalObject.type}
 *       capacity={rentalObject.capacity}
 *       additionalServices={rentalObject.additionalServices}
 *       labels={labels}
 *     />
 *   );
 * }
 * ```
 */
export function OverviewTab({
  metadata,
  rentalObjectType,
  capacity,
  additionalServices,
  selectedServices: controlledSelected,
  onServiceToggle,
  labels,
  className,
}: OverviewTabProps): React.ReactElement {
  const presenter = React.useMemo(() => createPresenter(rentalObjectType), [rentalObjectType]);

  // Local state for uncontrolled mode
  const [internalSelected, setInternalSelected] = React.useState<string[]>([]);
  const selectedServices = controlledSelected ?? internalSelected;

  const toggleService = (serviceId: string) => {
    if (onServiceToggle) {
      onServiceToggle(serviceId);
    } else {
      setInternalSelected((prev) =>
        prev.includes(serviceId) ? prev.filter((id) => id !== serviceId) : [...prev, serviceId]
      );
    }
  };

  const services = additionalServices || [];

  return (
    <div
      className={className}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-6)',
      }}
    >
      {/* Description */}
      <section style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
        <Heading level={2} data-size="sm">
          {labels.descriptionHeading}
        </Heading>
        {metadata.description ? (
          <Paragraph
            data-size="md"
            style={{
              whiteSpace: 'pre-wrap',
              lineHeight: '1.6',
            }}
          >
            {metadata.description}
          </Paragraph>
        ) : (
          <Paragraph data-size="sm" style={{ fontStyle: 'italic', color: 'var(--ds-color-neutral-text-subtle)' }}>
            {labels.noDescriptionMessage}
          </Paragraph>
        )}
      </section>

      {/* Capacity Card */}
      {capacity && capacity > 0 && (
        <Card data-color="neutral">
          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-4)' }}>
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: '48px',
                height: '48px',
                backgroundColor: 'var(--ds-color-neutral-background-default)',
                borderRadius: 'var(--ds-border-radius-md)',
                color: 'var(--ds-color-accent-base-default)',
                flexShrink: 0,
              }}
            >
              <UsersIcon size={24} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-1)' }}>
              <Paragraph
                data-size="xs"
                style={{
                  textTransform: 'uppercase',
                  letterSpacing: '0.05em',
                  fontWeight: 'var(--ds-font-weight-medium)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {labels.capacityMaxAllowed}
              </Paragraph>
              <Paragraph data-size="md" style={{ fontWeight: 'var(--ds-font-weight-semibold)' }}>
                {capacity} {labels.capacityPeople}
              </Paragraph>
            </div>
          </div>
        </Card>
      )}

      {/* Amenities */}
      {metadata.amenities && metadata.amenities.length > 0 && (
        <section>
          <Paragraph
            data-size="xs"
            style={{
              margin: 0,
              marginBottom: 'var(--ds-spacing-3)',
              color: 'var(--ds-color-neutral-text-subtle)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 'var(--ds-font-weight-medium)',
            }}
          >
            {labels.amenitiesHeading}
          </Paragraph>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-2)' }}>
            {metadata.amenities.map((amenity) => (
              <span
                key={amenity.id}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-2)',
                  padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                  backgroundColor: 'var(--ds-color-neutral-surface-default)',
                  border: '1px solid var(--ds-color-neutral-border-default)',
                  borderRadius: 'var(--ds-border-radius-full)',
                  fontSize: 'var(--ds-font-size-sm)',
                  color: 'var(--ds-color-neutral-text-default)',
                }}
              >
                {getAmenityIcon(amenity.name)}
                {amenity.name}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Additional Services */}
      {services.length > 0 && (
        <section>
          <Paragraph
            data-size="xs"
            style={{
              margin: 0,
              marginBottom: 'var(--ds-spacing-3)',
              color: 'var(--ds-color-neutral-text-subtle)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 'var(--ds-font-weight-medium)',
            }}
          >
            {labels.additionalServicesHeading}
          </Paragraph>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
            {services.map((service) => {
              const isSelected = selectedServices.includes(service.id);
              return (
                <div
                  key={service.id}
                  onClick={() => toggleService(service.id)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      toggleService(service.id);
                    }
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 'var(--ds-spacing-3)',
                    padding: 'var(--ds-spacing-4)',
                    backgroundColor: isSelected
                      ? 'var(--ds-color-accent-surface-default)'
                      : 'var(--ds-color-neutral-background-default)',
                    border: `1px solid ${isSelected ? 'var(--ds-color-accent-border-default)' : 'var(--ds-color-neutral-border-subtle)'}`,
                    borderRadius: 'var(--ds-border-radius-lg)',
                    cursor: 'pointer',
                    transition: 'all 0.2s ease',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      width: '24px',
                      height: '24px',
                      flexShrink: 0,
                      color: 'var(--ds-color-success-base-default)',
                    }}
                  >
                    <CheckIcon size={20} color="var(--ds-color-success-base-default)" />
                  </div>
                  <div style={{ flex: 1, minWidth: 0 }}>
                    <Paragraph
                      data-size="sm"
                      style={{
                        margin: 0,
                        fontWeight: 'var(--ds-font-weight-medium)',
                        color: 'var(--ds-color-neutral-text-default)',
                      }}
                    >
                      {service.name}
                    </Paragraph>
                    {service.description && (
                      <Paragraph
                        data-size="xs"
                        style={{ margin: 'var(--ds-spacing-1) 0 0 0', color: 'var(--ds-color-neutral-text-subtle)' }}
                      >
                        {service.description}
                      </Paragraph>
                    )}
                  </div>
                  {service.price !== undefined && (
                    <div
                      style={{
                        padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                        backgroundColor: 'var(--ds-color-accent-surface-default)',
                        borderRadius: 'var(--ds-border-radius-md)',
                        color: 'var(--ds-color-accent-base-default)',
                        fontSize: 'var(--ds-font-size-sm)',
                        fontWeight: 'var(--ds-font-weight-semibold)',
                        flexShrink: 0,
                      }}
                    >
                      +{service.price} {service.currency || 'kr'}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Included Equipment */}
      {metadata.includedEquipment && metadata.includedEquipment.length > 0 && (
        <section>
          <Heading level={2} data-size="sm" style={{ margin: 0, marginBottom: 'var(--ds-spacing-4)' }}>
            {labels.includedEquipmentHeading}
          </Heading>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(180px, 1fr))',
              gap: 'var(--ds-spacing-3)',
            }}
          >
            {metadata.includedEquipment.map((equipment: IncludedEquipment) => (
              <div
                key={equipment.id}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-2)',
                  padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  border: '1px solid var(--ds-color-neutral-border-subtle)',
                }}
              >
                <CheckIcon size={16} />
                <Paragraph data-size="sm" style={{ margin: 0 }}>
                  {equipment.name}
                  {equipment.quantity && equipment.quantity > 1 && ` (${equipment.quantity})`}
                </Paragraph>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Highlights */}
      {metadata.highlights && metadata.highlights.length > 0 && (
        <section>
          <Heading level={2} data-size="sm" style={{ margin: 0, marginBottom: 'var(--ds-spacing-4)' }}>
            {labels.highlightsHeading}
          </Heading>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-2)' }}>
            {metadata.highlights.map((highlight, index) => (
              <span
                key={index}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-1)',
                  padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                  backgroundColor: 'var(--ds-color-success-surface-default)',
                  color: 'var(--ds-color-success-text-default)',
                  borderRadius: 'var(--ds-border-radius-full)',
                  fontSize: 'var(--ds-font-size-sm)',
                }}
              >
                <CheckIcon size={14} color="var(--ds-color-success-base-default)" />
                {highlight}
              </span>
            ))}
          </div>
        </section>
      )}

      {/* Empty state if no content */}
      {!metadata.description && (!metadata.amenities || metadata.amenities.length === 0) && !capacity && (
        <div
          style={{
            textAlign: 'center',
            padding: 'var(--ds-spacing-8)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          <Paragraph data-size="sm" style={{ margin: 0, fontStyle: 'italic' }}>
            {labels.noInfoMessage}
          </Paragraph>
        </div>
      )}
    </div>
  );
}

export default OverviewTab;
