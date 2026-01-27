/**
 * SeasonCardConnected Component
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
 * // app/features/seasons/ConnectedSeasonCard.tsx
 * import {
 *   SeasonCard,
 *   mapSeasonDTOToVM,
 *   getSeasonStatusColor,
 * } from '@xala-technologies/platform-ui/features/seasons';
 * import type { Season } from '@digilist/client-sdk/types';
 * import { useT } from '@xala-technologies/platform/i18n';
 * import { useNavigate } from 'react-router-dom';
 *
 * export function ConnectedSeasonCard({ season }: { season: Season }) {
 *   const t = useT();
 *   const navigate = useNavigate();
 *   const seasonVM = mapSeasonDTOToVM(season);
 *
 *   return (
 *     <SeasonCard
 *       season={seasonVM}
 *       labels={{
 *         periodLabel: t('seasons.period'),
 *         deadlineLabel: t('seasons.deadline'),
 *         viewDetailsLabel: t('seasons.viewDetails'),
 *         applyLabel: t('seasons.apply'),
 *       }}
 *       statusDisplay={{
 *         label: t(`seasons.status.${seasonVM.status}`),
 *         color: getSeasonStatusColor(seasonVM.status),
 *       }}
 *       formatDate={(date) => new Date(date).toLocaleDateString('nb-NO')}
 *       onViewDetails={(id) => navigate(`/seasons/${id}`)}
 *       onApply={(id) => navigate(`/seasons/${id}/apply`)}
 *     />
 *   );
 * }
 * ```
 *
 * @module @xala-technologies/platform-ui/features/seasons
 */

import { useNavigate } from 'react-router-dom';
import { SeasonCard, type SeasonVM } from './blocks';
import { getSeasonStatusColor } from './mappers';

// Temporary interface for SDK Season type to avoid import error
// Applications should import from their SDK
interface Season {
  id: string;
  name: string;
  description?: string;
  status: string;
  startDate: string;
  endDate: string;
  applicationDeadline: string;
  totalApplications?: number;
  approvedApplications?: number;
}

export interface SeasonCardConnectedProps {
  /** Season data from SDK */
  season: Season;
  /** Whether to show action buttons */
  showActions?: boolean;
  /** Custom navigation base path (default: /seasons) */
  basePath?: string;
}

/**
 * Maps SDK Season type to SeasonVM for the presentational component.
 */
function mapSeasonToVM(season: Season): SeasonVM {
  return {
    id: season.id,
    name: season.name,
    description: season.description,
    status: season.status as SeasonVM['status'],
    startDate: season.startDate,
    endDate: season.endDate,
    applicationDeadline: season.applicationDeadline,
    totalApplications: season.totalApplications,
    approvedApplications: season.approvedApplications,
  };
}

// Default Norwegian labels (hardcoded for backwards compatibility)
const DEFAULT_LABELS = {
  periodLabel: 'Periode',
  deadlineLabel: 'Søknadsfrist',
  viewDetailsLabel: 'Se detaljer',
  applyLabel: 'Søk nå',
};

const STATUS_LABELS: Record<string, string> = {
  draft: 'Utkast',
  open: 'Åpen',
  closed: 'Stengt',
  cancelled: 'Kansellert',
  completed: 'Fullført',
};

/**
 * SDK-connected SeasonCard component.
 *
 * Automatically maps SDK Season data and handles navigation.
 *
 * @example
 * ```tsx
 * import { SeasonCardConnected } from '@xala-technologies/platform-ui/features/seasons';
 * import { useSeasons } from '@digilist/client-sdk/hooks';
 *
 * function SeasonsPage() {
 *   const { data: seasons } = useSeasons();
 *
 *   return (
 *     <Grid columns={3}>
 *       {seasons?.map(season => (
 *         <SeasonCardConnected key={season.id} season={season} />
 *       ))}
 *     </Grid>
 *   );
 * }
 * ```
 */
export function SeasonCardConnected({
  season,
  showActions = true,
  basePath = '/seasons',
}: SeasonCardConnectedProps) {
  const navigate = useNavigate();
  const seasonVM = mapSeasonToVM(season);

  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('nb-NO', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <SeasonCard
      season={seasonVM}
      labels={DEFAULT_LABELS}
      statusDisplay={{
        label: STATUS_LABELS[seasonVM.status] || seasonVM.status,
        color: getSeasonStatusColor(seasonVM.status),
      }}
      formatDate={formatDate}
      showActions={showActions}
      onViewDetails={(id) => navigate(`${basePath}/${id}`)}
      onApply={(id) => navigate(`${basePath}/${id}?apply=true`)}
    />
  );
}

export default SeasonCardConnected;
