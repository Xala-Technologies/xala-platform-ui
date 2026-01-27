/**
 * VenueCardConnected Component
 *
 * @deprecated This component is deprecated and will be removed in v3.0.0.
 *
 * **Why deprecated:**
 * - Violates pure UI component pattern by importing from SDK
 * - Creates tight coupling to @digilist/client-sdk
 * - Cannot be used in applications with different SDKs or data sources
 *
 * **Migration path:**
 * Create an application-level connected wrapper instead:
 *
 * ```tsx
 * // app/features/seasons/ConnectedVenueCard.tsx
 * import {
 *   VenueCard,
 *   mapVenueDTOToVM,
 * } from '@xala-technologies/platform-ui/features/seasons';
 * import type { RentalObject } from '@digilist/client-sdk/types';
 * import { useT } from '@xala-technologies/platform/i18n';
 *
 * export function ConnectedVenueCard({
 *   venue,
 *   onApply,
 * }: {
 *   venue: RentalObject;
 *   onApply?: (id: string) => void;
 * }) {
 *   const t = useT();
 *   const venueVM = mapVenueDTOToVM(venue as any); // Type casting needed
 *
 *   return (
 *     <VenueCard
 *       venue={venueVM}
 *       labels={{
 *         capacityLabel: t('common.capacity'),
 *         applyLabel: t('common.apply'),
 *       }}
 *       onApply={onApply}
 *     />
 *   );
 * }
 * ```
 *
 * @module @xala-technologies/platform-ui/features/seasons
 */

import { VenueCard, type VenueVM } from './blocks';

// Temporary interface for SDK RentalObject type to avoid import error
// Applications should import from their SDK
interface RentalObject {
  id: string;
  name: string;
  description?: string;
  capacity?: number;
  category?: string;
  images?: Array<string | { url?: string }>;
}

export interface VenueCardConnectedProps {
  /** Venue (rental object) data from SDK */
  venue: RentalObject;
  /** Callback when apply button is clicked */
  onApply?: (id: string) => void;
  /** Whether to show the apply button */
  showApplyButton?: boolean;
}

/**
 * Maps SDK RentalObject type to VenueVM for the presentational component.
 */
function mapToVenueVM(venue: RentalObject): VenueVM {
  return {
    id: venue.id,
    name: venue.name,
    description: venue.description,
    capacity: venue.capacity,
    size: (venue as unknown as Record<string, unknown>).size as number | undefined,
    address: (venue as unknown as Record<string, unknown>).address as
      | { street?: string; city?: string }
      | undefined,
    imageUrl: venue.images?.[0]
      ? typeof venue.images[0] === 'string'
        ? venue.images[0]
        : (venue.images[0] as { url?: string }).url
      : undefined,
    categories:
      ((venue as unknown as Record<string, unknown>).categories as string[]) ||
      (venue.category ? [venue.category] : []),
  };
}

// Default Norwegian labels (hardcoded for backwards compatibility)
const DEFAULT_LABELS = {
  capacityLabel: 'Kapasitet',
  applyLabel: 'Søk',
};

/**
 * SDK-connected VenueCard component.
 *
 * Automatically maps SDK RentalObject data to VenueCard props.
 *
 * @example
 * ```tsx
 * import { VenueCardConnected } from '@xala-technologies/platform-ui/features/seasons';
 * import { useRentalObjects } from '@digilist/client-sdk/hooks';
 *
 * function VenuesPage({ seasonId }) {
 *   const { data: venues } = useRentalObjects({ seasonId });
 *
 *   return (
 *     <Grid columns={3}>
 *       {venues?.map(venue => (
 *         <VenueCardConnected
 *           key={venue.id}
 *           venue={venue}
 *           onApply={(id) => handleApply(id)}
 *         />
 *       ))}
 *     </Grid>
 *   );
 * }
 * ```
 */
export function VenueCardConnected({
  venue,
  onApply,
  showApplyButton = true,
}: VenueCardConnectedProps) {
  return (
    <VenueCard
      venue={mapToVenueVM(venue)}
      labels={DEFAULT_LABELS}
      onApply={onApply}
      showApplyButton={showApplyButton}
    />
  );
}

export default VenueCardConnected;
