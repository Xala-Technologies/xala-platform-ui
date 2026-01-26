/**
 * VenueCard Block - Pure Presentational Component
 *
 * Displays venue information with no business logic, i18n, or SDK dependencies.
 * All text and state managed via props following pure component patterns.
 *
 * @module @xala-technologies/platform-ui/features/seasons
 *
 * @example
 * ```tsx
 * import { VenueCard } from '@xala-technologies/platform-ui/features/seasons';
 *
 * <VenueCard
 *   venue={venueVM}
 *   labels={{
 *     capacityLabel: 'Capacity',
 *     applyLabel: 'Apply',
 *   }}
 *   onApply={(id) => handleApply(id)}
 * />
 * ```
 */
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Tag,
  Stack,
} from '@xala-technologies/platform-ui/primitives';

// =============================================================================
// Types
// =============================================================================

/**
 * Venue ViewModel - Data structure for VenueCard component
 *
 * This is the UI representation of a venue, decoupled from backend DTOs.
 */
export interface VenueVM {
  id: string;
  name: string;
  description?: string;
  capacity?: number;
  size?: number;
  address?: { street?: string; city?: string };
  imageUrl?: string;
  categories?: string[];
}

/**
 * Backwards compatibility: VenueCardData alias
 * @deprecated Use VenueVM instead
 */
export type VenueCardData = VenueVM;

/**
 * Text labels for VenueCard
 *
 * All text content must be provided by parent component for i18n support.
 */
export interface VenueCardLabels {
  /** Label for capacity field (e.g., "Capacity", "Kapasitet") */
  capacityLabel: string;
  /** Text for apply button (e.g., "Apply", "Søk") */
  applyLabel: string;
}

// =============================================================================
// Component Props
// =============================================================================

export interface VenueCardProps {
  /** Venue data */
  venue: VenueVM;
  /** All text labels */
  labels: VenueCardLabels;
  /** Callback when apply button is clicked */
  onApply?: (id: string) => void;
  /** Whether to show the apply button */
  showApplyButton?: boolean;
  /** Maximum number of categories to display (default: 2) */
  maxCategories?: number;
  /** Test ID for testing */
  'data-testid'?: string;
}

// =============================================================================
// Component
// =============================================================================

/**
 * Pure presentational component for displaying venue cards.
 *
 * **Pure Component Pattern:**
 * - No hooks (no useT, useNavigate, etc.)
 * - All text via props (labels)
 * - All state via props (venue, showApplyButton)
 * - Events emitted via callbacks (onApply)
 * - Uses only Designsystemet components (no raw HTML divs)
 *
 * **Integration:**
 * Applications should create connected wrappers that:
 * 1. Provide translations via labels prop
 * 2. Handle actions in callbacks
 * 3. Map backend DTOs to VenueVM
 */
export function VenueCard({
  venue,
  labels,
  onApply,
  showApplyButton = true,
  maxCategories = 2,
  'data-testid': testId = 'venue-card',
}: VenueCardProps) {
  const categories = venue.categories || [];
  const displayCategories = categories.slice(0, maxCategories);

  return (
    <Card
      data-testid={testId}
      style={{
        padding: 0,
        border: '1px solid var(--ds-color-neutral-border-default)',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
      }}
    >
      {/* Image header */}
      <Stack
        style={{
          width: '100%',
          height: '150px',
          backgroundColor: 'var(--ds-color-neutral-background-subtle)',
          backgroundImage: venue.imageUrl ? `url(${venue.imageUrl})` : undefined,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      />

      {/* Content area */}
      <Stack
        spacing="3"
        style={{
          padding: 'var(--ds-spacing-5)',
          flex: 1,
        }}
      >
        <Heading level={3} data-size="sm" style={{ margin: 0 }}>
          {venue.name}
        </Heading>

        {venue.address && (
          <Paragraph data-size="sm" data-color="subtle" style={{ margin: 0 }}>
            {venue.address.street}, {venue.address.city}
          </Paragraph>
        )}

        {venue.description && (
          <Paragraph data-size="sm" data-color="subtle" style={{ margin: 0 }}>
            {venue.description}
          </Paragraph>
        )}

        {/* Tags area - push to bottom */}
        <Stack
          direction="horizontal"
          spacing="2"
          style={{
            marginTop: 'auto',
            flexWrap: 'wrap',
          }}
        >
          {venue.capacity && (
            <Tag data-size="sm" data-color="neutral">
              {labels.capacityLabel}: {venue.capacity}
            </Tag>
          )}
          {displayCategories.map((category, index) => (
            <Tag key={index} data-size="sm" data-color="neutral">
              {category}
            </Tag>
          ))}
        </Stack>
      </Stack>

      {/* Apply button footer */}
      {showApplyButton && onApply && (
        <Stack
          style={{
            padding: 'var(--ds-spacing-4)',
            borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Button
            type="button"
            variant="primary"
            data-size="sm"
            onClick={() => onApply(venue.id)}
            style={{ width: '100%' }}
          >
            {labels.applyLabel}
          </Button>
        </Stack>
      )}
    </Card>
  );
}
