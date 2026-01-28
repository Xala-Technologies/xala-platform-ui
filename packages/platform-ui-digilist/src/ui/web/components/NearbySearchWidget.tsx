/**
 * NearbySearchWidget
 *
 * Widget for geolocation-based rental object search.
 * Uses @xala-technologies/platform-ui components only.
 */

import { useState, useCallback, useEffect } from 'react';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Badge,
  Spinner,
  EmptyState,
  Select,
  Stack,
  Alert,
  MapPinIcon,
  NavigationIcon,
  ImageIcon,
} from '@xala-technologies/platform-ui';
import type {
  GeolocationPosition,
  GeolocationError,
  NearbyRentalObject,
} from '@digilist/client-sdk';
import { RADIUS_OPTIONS, formatDistance } from '@digilist/client-sdk';

export interface NearbySearchWidgetProps {
  /** Translation function */
  t: (key: string) => string;
  /** Locale */
  locale: string;
  /** User's current position */
  position: GeolocationPosition | null;
  /** Geolocation error */
  geoError: GeolocationError | null;
  /** Is requesting location */
  isRequestingLocation: boolean;
  /** Is geolocation supported */
  isSupported: boolean;
  /** Nearby rental objects */
  nearbyObjects: NearbyRentalObject[] | undefined;
  /** Is loading nearby objects */
  isLoadingNearby: boolean;
  /** Current search radius */
  radiusKm: number;
  /** Request location handler */
  onRequestLocation: () => void;
  /** Change radius handler */
  onRadiusChange: (radius: number) => void;
  /** View rental object handler */
  onViewRentalObject: (id: string) => void;
  /** Category filter */
  category?: string;
  /** Available categories */
  categories?: { id: string; name: string }[];
  /** Category change handler */
  onCategoryChange?: (category: string | undefined) => void;
}

export function NearbySearchWidget({
  t,
  locale,
  position,
  geoError,
  isRequestingLocation,
  isSupported,
  nearbyObjects,
  isLoadingNearby,
  radiusKm,
  onRequestLocation,
  onRadiusChange,
  onViewRentalObject,
  category,
  categories,
  onCategoryChange,
}: NearbySearchWidgetProps) {
  const [hasRequestedOnce, setHasRequestedOnce] = useState(false);

  const handleRequestLocation = useCallback(() => {
    setHasRequestedOnce(true);
    onRequestLocation();
  }, [onRequestLocation]);

  // Error message mapping
  const getErrorMessage = (error: GeolocationError) => {
    switch (error.code) {
      case 1:
        return t('geolocation.errors.permissionDenied');
      case 2:
        return t('geolocation.errors.positionUnavailable');
      case 3:
        return t('geolocation.errors.timeout');
      default:
        return error.message;
    }
  };

  if (!isSupported) {
    return (
      <Alert data-color="warning">
        <Alert.Heading>{t('geolocation.notSupported')}</Alert.Heading>
        <Paragraph>{t('geolocation.notSupportedDesc')}</Paragraph>
      </Alert>
    );
  }

  return (
    <Stack gap="6">
      {/* Header & Controls */}
      <Card style={{ padding: 'var(--ds-spacing-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 'var(--ds-spacing-4)' }}>
          <div>
            <Heading level={2} data-size="md" style={{ margin: 0 }}>
              {t('geolocation.nearbyTitle')}
            </Heading>
            <Paragraph data-size="sm" style={{ margin: 0, marginTop: 'var(--ds-spacing-1)' }}>
              {position
                ? t('geolocation.searchingNearYou')
                : t('geolocation.enableLocationDesc')}
            </Paragraph>
          </div>

          {!position ? (
            <Button
              type="button"
              variant="primary"
              data-size="md"
              onClick={handleRequestLocation}
              disabled={isRequestingLocation}
            >
              {isRequestingLocation ? (
                <>
                  <Spinner data-size="sm" />
                  {t('geolocation.requesting')}
                </>
              ) : (
                <>
                  <MapPinIcon />
                  {t('geolocation.enableLocation')}
                </>
              )}
            </Button>
          ) : (
            <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', alignItems: 'center' }}>
              <Badge data-color="success" data-size="sm">
                <MapPinIcon style={{ width: '12px', height: '12px' }} />
                {t('geolocation.locationEnabled')}
              </Badge>
              <Button
                type="button"
                variant="tertiary"
                data-size="sm"
                onClick={handleRequestLocation}
                disabled={isRequestingLocation}
              >
                {t('geolocation.refresh')}
              </Button>
            </div>
          )}
        </div>

        {/* Filters (only show when position is available) */}
        {position && (
          <div
            style={{
              display: 'flex',
              gap: 'var(--ds-spacing-4)',
              marginTop: 'var(--ds-spacing-4)',
              paddingTop: 'var(--ds-spacing-4)',
              borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
              flexWrap: 'wrap',
            }}
          >
            <Select
              label={t('geolocation.radius')}
              value={radiusKm.toString()}
              onChange={(e) => onRadiusChange(parseInt(e.target.value, 10))}
              style={{ minWidth: '150px' }}
            >
              {RADIUS_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {t(option.labelKey)}
                </option>
              ))}
            </Select>

            {categories && onCategoryChange && (
              <Select
                label={t('geolocation.category')}
                value={category || ''}
                onChange={(e) => onCategoryChange(e.target.value || undefined)}
                style={{ minWidth: '180px' }}
              >
                <option value="">{t('geolocation.allCategories')}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </Select>
            )}
          </div>
        )}
      </Card>

      {/* Error Alert */}
      {geoError && hasRequestedOnce && (
        <Alert data-color="danger">
          <Alert.Heading>{t('geolocation.errorTitle')}</Alert.Heading>
          <Paragraph>{getErrorMessage(geoError)}</Paragraph>
        </Alert>
      )}

      {/* Results */}
      {position && (
        <>
          {isLoadingNearby ? (
            <div
              style={{
                display: 'flex',
                justifyContent: 'center',
                padding: 'var(--ds-spacing-8)',
              }}
            >
              <Spinner aria-label={t('state.loading')} data-size="lg" />
            </div>
          ) : !nearbyObjects || nearbyObjects.length === 0 ? (
            <EmptyState
              icon={<MapPinIcon size={48} />}
              title={t('geolocation.noResults')}
              description={t('geolocation.noResultsDesc', { radius: radiusKm })}
              action={{
                label: t('geolocation.increaseRadius'),
                onClick: () => {
                  const currentIndex = RADIUS_OPTIONS.findIndex((o) => o.value === radiusKm);
                  if (currentIndex < RADIUS_OPTIONS.length - 1) {
                    onRadiusChange(RADIUS_OPTIONS[currentIndex + 1].value);
                  }
                },
              }}
              bordered
            />
          ) : (
            <Stack gap="3">
              <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                {t('geolocation.resultsCount', { count: nearbyObjects.length, radius: radiusKm })}
              </Paragraph>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                  gap: 'var(--ds-spacing-4)',
                }}
              >
                {nearbyObjects.map((obj) => (
                  <Card
                    key={obj.id}
                    data-testid={`nearby-object-${obj.id}`}
                    style={{ padding: 0, overflow: 'hidden', cursor: 'pointer' }}
                    onClick={() => onViewRentalObject(obj.id)}
                  >
                    {/* Image */}
                    <div
                      style={{
                        height: '140px',
                        backgroundColor: 'var(--ds-color-neutral-background-subtle)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {obj.imageUrl ? (
                        <img
                          src={obj.imageUrl}
                          alt={obj.name}
                          style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                      ) : (
                        <ImageIcon
                          style={{
                            width: '48px',
                            height: '48px',
                            color: 'var(--ds-color-neutral-text-subtle)',
                          }}
                        />
                      )}
                    </div>

                    {/* Content */}
                    <div style={{ padding: 'var(--ds-spacing-4)' }}>
                      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                        <div>
                          <Heading level={3} data-size="sm" style={{ margin: 0 }}>
                            {obj.name}
                          </Heading>
                          <Badge data-size="sm" style={{ marginTop: 'var(--ds-spacing-1)' }}>
                            {obj.category}
                          </Badge>
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--ds-spacing-1)',
                            color: 'var(--ds-color-info-text-default)',
                          }}
                        >
                          <NavigationIcon style={{ width: '14px', height: '14px' }} />
                          <Paragraph data-size="sm" style={{ margin: 0, fontWeight: 'var(--ds-font-weight-semibold)' }}>
                            {formatDistance(obj.distanceKm, locale)}
                          </Paragraph>
                        </div>
                      </div>

                      {obj.pricePerHour !== undefined && (
                        <Paragraph
                          data-size="md"
                          style={{
                            margin: 0,
                            marginTop: 'var(--ds-spacing-3)',
                            fontWeight: 'var(--ds-font-weight-semibold)',
                          }}
                        >
                          {obj.pricePerHour.toLocaleString(locale === 'en' ? 'en-US' : 'nb-NO')} kr/{t('time.hour')}
                        </Paragraph>
                      )}
                    </div>
                  </Card>
                ))}
              </div>
            </Stack>
          )}
        </>
      )}

      {/* Initial state (no position, no error) */}
      {!position && !geoError && !hasRequestedOnce && (
        <Card
          style={{
            padding: 'var(--ds-spacing-8)',
            textAlign: 'center',
            backgroundColor: 'var(--ds-color-neutral-background-subtle)',
          }}
        >
          <MapPinIcon
            style={{
              width: '64px',
              height: '64px',
              color: 'var(--ds-color-neutral-text-subtle)',
              margin: '0 auto var(--ds-spacing-4)',
            }}
          />
          <Heading level={3} data-size="md" style={{ margin: 0 }}>
            {t('geolocation.discoverNearby')}
          </Heading>
          <Paragraph
            data-size="sm"
            style={{ margin: 0, marginTop: 'var(--ds-spacing-2)', color: 'var(--ds-color-neutral-text-subtle)' }}
          >
            {t('geolocation.discoverNearbyDesc')}
          </Paragraph>
          <Button
            type="button"
            variant="primary"
            data-size="lg"
            onClick={handleRequestLocation}
            style={{ marginTop: 'var(--ds-spacing-4)' }}
          >
            <MapPinIcon />
            {t('geolocation.enableLocation')}
          </Button>
        </Card>
      )}
    </Stack>
  );
}
