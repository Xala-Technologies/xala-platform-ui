/**
 * LocationCardEditable
 *
 * Editable location card with address input and geocoding support.
 * Extends LocationCard with editing capabilities.
 *
 * @example
 * ```tsx
 * import { LocationCardEditable } from '@xala-technologies/platform/ui';
 *
 * <LocationCardEditable
 *   address={address}
 *   onAddressChange={setAddress}
 *   latitude={lat}
 *   longitude={lng}
 *   onCoordinatesChange={(lat, lng) => { setLat(lat); setLng(lng); }}
 *   mapboxToken="your-token"
 * />
 * ```
 */
import * as React from 'react';
import { Heading, Paragraph, Button, Textfield } from '@digdir/designsystemet-react';
import { cn } from '../utils';
import { MapPinIcon } from '../primitives/icons';

// =============================================================================
// Types
// =============================================================================

export interface LocationCardEditableLabels {
  /** Card title */
  title?: string;
  /** Address input label */
  addressLabel?: string;
  /** Address placeholder */
  addressPlaceholder?: string;
  /** Coordinates label */
  coordinates?: string;
  /** Latitude label */
  latitude?: string;
  /** Longitude label */
  longitude?: string;
  /** Save button */
  save?: string;
  /** Cancel button */
  cancel?: string;
  /** Edit button */
  edit?: string;
  /** Map link */
  viewOnMap?: string;
  /** Map placeholder */
  mapPlaceholder?: string;
}

export interface LocationCardEditableProps {
  /** Address text */
  address: string;
  /** Address change handler */
  onAddressChange: (address: string) => void;
  /** Latitude coordinate */
  latitude?: number;
  /** Longitude coordinate */
  longitude?: number;
  /** Coordinates change handler */
  onCoordinatesChange?: (lat: number, lng: number) => void;
  /** Mapbox access token */
  mapboxToken?: string;
  /** Height of the map preview */
  height?: number | string;
  /** Whether component starts in edit mode */
  defaultEditing?: boolean;
  /** Disabled state */
  disabled?: boolean;
  /** Localization labels */
  labels?: LocationCardEditableLabels;
  /** Custom class name */
  className?: string;
}

// =============================================================================
// Default labels (Norwegian)
// =============================================================================

const defaultLabels: Required<LocationCardEditableLabels> = {
  title: 'Lokasjon',
  addressLabel: 'Adresse',
  addressPlaceholder: 'Storgata 1, 0155 Oslo',
  coordinates: 'Koordinater',
  latitude: 'Breddegrad',
  longitude: 'Lengdegrad',
  save: 'Lagre',
  cancel: 'Avbryt',
  edit: 'Rediger',
  viewOnMap: 'Vis i kart',
  mapPlaceholder: 'Kart',
};

// =============================================================================
// Component
// =============================================================================

/**
 * LocationCardEditable provides editable location card with address input.
 *
 * Accessibility:
 * - Labeled inputs
 * - Keyboard accessible
 * - Clear action buttons
 */
export function LocationCardEditable({
  address,
  onAddressChange,
  latitude,
  longitude,
  onCoordinatesChange,
  mapboxToken,
  height = 180,
  defaultEditing = false,
  disabled = false,
  labels: customLabels,
  className,
}: LocationCardEditableProps): React.ReactElement {
  const labels = { ...defaultLabels, ...customLabels };

  const [isEditing, setIsEditing] = React.useState(defaultEditing);
  const [editAddress, setEditAddress] = React.useState(address);
  const [editLat, setEditLat] = React.useState(latitude?.toString() || '');
  const [editLng, setEditLng] = React.useState(longitude?.toString() || '');

  const hasCoordinates = latitude !== undefined && longitude !== undefined;
  const mapHeight = typeof height === 'number' ? height : 180;

  // Detect color scheme for map style
  const [isDark, setIsDark] = React.useState(false);

  React.useEffect(() => {
    const checkColorScheme = () => {
      const colorScheme = document.documentElement.getAttribute('data-color-scheme');
      if (colorScheme === 'dark') {
        setIsDark(true);
      } else if (colorScheme === 'auto') {
        setIsDark(window.matchMedia('(prefers-color-scheme: dark)').matches);
      } else {
        setIsDark(false);
      }
    };

    checkColorScheme();
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    mediaQuery.addEventListener('change', checkColorScheme);
    return () => mediaQuery.removeEventListener('change', checkColorScheme);
  }, []);

  // Reset edit state when props change
  React.useEffect(() => {
    setEditAddress(address);
    setEditLat(latitude?.toString() || '');
    setEditLng(longitude?.toString() || '');
  }, [address, latitude, longitude]);

  // Generate Mapbox static image URL
  const mapStyle = isDark ? 'dark-v11' : 'streets-v12';
  const mapUrl =
    hasCoordinates && mapboxToken
      ? `https://api.mapbox.com/styles/v1/mapbox/${mapStyle}/static/pin-s+ef4444(${longitude},${latitude})/${longitude},${latitude},14/400x${mapHeight}@2x?access_token=${mapboxToken}`
      : null;

  // Google Maps URL
  const googleMapsUrl = hasCoordinates
    ? `https://www.google.com/maps/search/?api=1&query=${latitude},${longitude}`
    : `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  const handleStartEdit = () => {
    setEditAddress(address);
    setEditLat(latitude?.toString() || '');
    setEditLng(longitude?.toString() || '');
    setIsEditing(true);
  };

  const handleSave = () => {
    onAddressChange(editAddress);
    const lat = parseFloat(editLat);
    const lng = parseFloat(editLng);
    if (!isNaN(lat) && !isNaN(lng) && onCoordinatesChange) {
      onCoordinatesChange(lat, lng);
    }
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditAddress(address);
    setEditLat(latitude?.toString() || '');
    setEditLng(longitude?.toString() || '');
    setIsEditing(false);
  };

  const containerStyle: React.CSSProperties = {
    backgroundColor: 'var(--ds-color-neutral-background-default)',
    border: '1px solid var(--ds-color-neutral-border-subtle)',
    borderRadius: 'var(--ds-border-radius-lg)',
    overflow: 'hidden',
  };

  const headerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 'var(--ds-spacing-2)',
    padding: 'var(--ds-spacing-4)',
    borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
  };

  const contentStyle: React.CSSProperties = {
    padding: 'var(--ds-spacing-4)',
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-3)',
  };

  const coordRowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: 'var(--ds-spacing-3)',
  };

  const actionsStyle: React.CSSProperties = {
    display: 'flex',
    gap: 'var(--ds-spacing-2)',
    justifyContent: 'flex-end',
  };

  const mapContainerStyle: React.CSSProperties = {
    position: 'relative',
    height: typeof height === 'number' ? `${height}px` : height,
    backgroundColor: 'var(--ds-color-neutral-surface-hover)',
    borderRadius: 'var(--ds-border-radius-md)',
    overflow: 'hidden',
  };

  return (
    <div className={cn('location-card-editable', className)} style={containerStyle}>
      {/* Header */}
      <div style={headerStyle}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
          <MapPinIcon size={18} style={{ color: 'var(--ds-color-neutral-text-subtle)' }} />
          <Heading level={3} data-size="xs" style={{ margin: 0 }}>
            {labels.title}
          </Heading>
        </div>
        {!isEditing && !disabled && (
          <Button variant="tertiary" data-size="sm" onClick={handleStartEdit}>
            {labels.edit}
          </Button>
        )}
      </div>

      {isEditing ? (
        /* Edit mode */
        <div style={contentStyle}>
          <Textfield
            label={labels.addressLabel}
            value={editAddress}
            onChange={(e) => setEditAddress(e.target.value)}
            placeholder={labels.addressPlaceholder}
            data-size="sm"
          />

          {onCoordinatesChange && (
            <>
              <Paragraph
                data-size="sm"
                style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}
              >
                {labels.coordinates}
              </Paragraph>
              <div style={coordRowStyle}>
                <Textfield
                  label={labels.latitude}
                  type="number"
                  value={editLat}
                  onChange={(e) => setEditLat(e.target.value)}
                  placeholder="59.9139"
                  data-size="sm"
                />
                <Textfield
                  label={labels.longitude}
                  type="number"
                  value={editLng}
                  onChange={(e) => setEditLng(e.target.value)}
                  placeholder="10.7522"
                  data-size="sm"
                />
              </div>
            </>
          )}

          <div style={actionsStyle}>
            <Button variant="tertiary" data-size="sm" onClick={handleCancel}>
              {labels.cancel}
            </Button>
            <Button variant="primary" data-size="sm" onClick={handleSave}>
              {labels.save}
            </Button>
          </div>
        </div>
      ) : (
        /* View mode */
        <div style={contentStyle}>
          {/* Address display */}
          <Paragraph data-size="sm" style={{ margin: 0 }}>
            {address || '—'}
          </Paragraph>

          {/* Map preview */}
          <div style={mapContainerStyle}>
            {mapUrl ? (
              <img
                src={mapUrl}
                alt={`Kart som viser ${address}`}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <div
                style={{
                  width: '100%',
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Paragraph
                  data-size="sm"
                  style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
                >
                  {labels.mapPlaceholder}
                </Paragraph>
              </div>
            )}
          </div>

          {/* View on map link */}
          {address && (
            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: 'var(--ds-font-size-sm)',
                color: 'var(--ds-color-accent-text-default)',
              }}
            >
              {labels.viewOnMap} ↗
            </a>
          )}
        </div>
      )}
    </div>
  );
}

LocationCardEditable.displayName = 'LocationCardEditable';
