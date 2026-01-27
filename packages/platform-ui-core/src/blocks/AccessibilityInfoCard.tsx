/**
 * AccessibilityInfoCard Component
 *
 * Display of universal design / accessibility features.
 * Shows available accessibility accommodations for venues.
 *
 * @example
 * ```tsx
 * import { AccessibilityInfoCard } from '@xala-technologies/platform/ui';
 *
 * const features = [
 *   { id: 'wheelchair', label: 'Rullestoltilgang', available: true },
 *   { id: 'elevator', label: 'Heis', available: true },
 *   { id: 'hearingLoop', label: 'Teleslynge', available: false },
 * ];
 *
 * <AccessibilityInfoCard features={features} />
 * ```
 */

import * as React from 'react';
import { Card, Heading, Paragraph } from '../primitives';
import { cn } from '../utils';
import { CheckIcon } from '../primitives/icons';

// =============================================================================
// Types
// =============================================================================

export interface AccessibilityFeature {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Whether feature is available */
  available: boolean;
  /** Optional icon override */
  icon?: React.ReactNode;
}

export interface AccessibilityInfoCardLabels {
  /** Card title */
  title?: string;
  /** Status labels */
  available?: string;
  notAvailable?: string;
  /** Screen reader labels */
  featureAvailable?: string;
  featureNotAvailable?: string;
}

export interface AccessibilityInfoCardProps {
  /** Accessibility features to display */
  features: AccessibilityFeature[];
  /** Optional card title (overrides labels.title) */
  title?: string;
  /** Localization labels */
  labels?: AccessibilityInfoCardLabels;
  /** Show only available features */
  showOnlyAvailable?: boolean;
  /** Layout variant */
  layout?: 'list' | 'grid';
  /** Additional className */
  className?: string;
}

// =============================================================================
// Default labels (Norwegian)
// =============================================================================

const defaultLabels: Required<AccessibilityInfoCardLabels> = {
  title: 'Universell utforming',
  available: 'Tilgjengelig',
  notAvailable: 'Ikke tilgjengelig',
  featureAvailable: 'er tilgjengelig',
  featureNotAvailable: 'er ikke tilgjengelig',
};

// =============================================================================
// Default features (Norwegian)
// =============================================================================

export const defaultAccessibilityFeatures: AccessibilityFeature[] = [
  { id: 'wheelchair', label: 'Rullestoltilgang', available: false },
  { id: 'elevator', label: 'Heis', available: false },
  { id: 'hearing_loop', label: 'Teleslynge', available: false },
  { id: 'accessible_toilet', label: 'HC-toalett', available: false },
  { id: 'parking', label: 'HC-parkering', available: false },
];

export const defaultAccessibilityFeaturesEn: AccessibilityFeature[] = [
  { id: 'wheelchair', label: 'Wheelchair access', available: false },
  { id: 'elevator', label: 'Elevator', available: false },
  { id: 'hearing_loop', label: 'Hearing loop', available: false },
  { id: 'accessible_toilet', label: 'Accessible toilet', available: false },
  { id: 'parking', label: 'Accessible parking', available: false },
];

// Icons

const CrossIcon = () => (
  <svg
    width="12"
    height="12"
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    aria-hidden="true"
  >
    <path d="M4 4l8 8M12 4l-8 8" />
  </svg>
);

// =============================================================================
// Component
// =============================================================================

/**
 * AccessibilityInfoCard displays universal design features.
 *
 * Accessibility:
 * - Semantic list structure
 * - Status conveyed via icon + text
 * - Screen reader descriptions
 */
export function AccessibilityInfoCard({
  features,
  title,
  labels: customLabels,
  showOnlyAvailable = false,
  layout = 'list',
  className,
}: AccessibilityInfoCardProps): React.ReactElement {
  const labels = { ...defaultLabels, ...customLabels };
  const displayTitle = title || labels.title;

  const displayFeatures = showOnlyAvailable ? features.filter((f) => f.available) : features;

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-3)',
  };

  const listStyle: React.CSSProperties = {
    display: layout === 'grid' ? 'grid' : 'flex',
    gridTemplateColumns: layout === 'grid' ? 'repeat(auto-fill, minmax(180px, 1fr))' : undefined,
    flexDirection: layout === 'list' ? 'column' : undefined,
    gap: 'var(--ds-spacing-2)',
    padding: 0,
    margin: 0,
    listStyle: 'none',
  };

  const featureItemStyle = (available: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    gap: 'var(--ds-spacing-2)',
    padding: 'var(--ds-spacing-2)',
    borderRadius: 'var(--ds-border-radius-sm)',
    backgroundColor: available
      ? 'var(--ds-color-success-surface-default)'
      : 'var(--ds-color-neutral-surface-subtle)',
  });

  const iconStyle = (available: boolean): React.CSSProperties => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 20,
    height: 20,
    borderRadius: '50%',
    backgroundColor: available
      ? 'var(--ds-color-success-base-default)'
      : 'var(--ds-color-neutral-base-default)',
    color: 'white',
    flexShrink: 0,
  });

  const getAriaLabel = (feature: AccessibilityFeature): string => {
    return feature.available
      ? `${feature.label} ${labels.featureAvailable}`
      : `${feature.label} ${labels.featureNotAvailable}`;
  };

  if (displayFeatures.length === 0) {
    return (
      <Card className={cn('accessibility-info-card', className)} style={containerStyle}>
        <Heading level={3} data-size="xs" style={{ margin: 0 }}>
          {displayTitle}
        </Heading>
        <Paragraph
          data-size="sm"
          style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
        >
          Ingen tilgjengelighetsinformasjon
        </Paragraph>
      </Card>
    );
  }

  return (
    <Card className={cn('accessibility-info-card', className)} style={containerStyle}>
      <Heading level={3} data-size="xs" style={{ margin: 0 }}>
        {displayTitle}
      </Heading>

      <ul style={listStyle} role="list" aria-label={displayTitle}>
        {displayFeatures.map((feature) => (
          <li key={feature.id} style={{ listStyle: 'none' }}>
            <div style={featureItemStyle(feature.available)} aria-label={getAriaLabel(feature)}>
              <span style={iconStyle(feature.available)}>
                {feature.available ? <CheckIcon size={12} /> : <CrossIcon />}
              </span>
              <Paragraph
                data-size="sm"
                style={{
                  margin: 0,
                  color: feature.available
                    ? 'var(--ds-color-success-text-default)'
                    : 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {feature.label}
              </Paragraph>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

AccessibilityInfoCard.displayName = 'AccessibilityInfoCard';
