/**
 * SeasonCard Block - Pure Presentational Component
 *
 * Displays seasonal booking information with no business logic, i18n, or SDK dependencies.
 * All text, formatting, and state managed via props following pure component patterns.
 *
 * @module @xala-technologies/platform-ui/features/seasons
 *
 * @example
 * ```tsx
 * import { SeasonCard } from '@xala-technologies/platform-ui/features/seasons';
 *
 * <SeasonCard
 *   season={seasonVM}
 *   labels={{
 *     periodLabel: 'Period',
 *     deadlineLabel: 'Application Deadline',
 *     viewDetailsLabel: 'View Details',
 *     applyLabel: 'Apply Now',
 *   }}
 *   statusDisplay={{
 *     label: 'Open',
 *     color: 'success',
 *   }}
 *   formatDate={(date) => new Date(date).toLocaleDateString('en')}
 *   onViewDetails={(id) => navigate(`/seasons/${id}`)}
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
} from '@xala-technologies/platform-ui-core';

// =============================================================================
// Types
// =============================================================================

/**
 * Season status enumeration
 */
export type SeasonStatus = 'draft' | 'open' | 'closed' | 'cancelled' | 'completed';

/**
 * Season ViewModel - Data structure for SeasonCard component
 *
 * This is the UI representation of a season, decoupled from backend DTOs.
 */
export interface SeasonVM {
  id: string;
  name: string;
  description?: string;
  status: SeasonStatus;
  startDate: string;
  endDate: string;
  applicationDeadline: string;
  totalApplications?: number;
  approvedApplications?: number;
}

/**
 * Backwards compatibility: SeasonCardData alias
 * @deprecated Use SeasonVM instead
 */
export type SeasonCardData = SeasonVM;

/**
 * Text labels for SeasonCard
 *
 * All text content must be provided by parent component for i18n support.
 */
export interface SeasonCardLabels {
  /** Label for period section (e.g., "Period", "Periode") */
  periodLabel: string;
  /** Label for deadline section (e.g., "Application Deadline", "Søknadsfrist") */
  deadlineLabel: string;
  /** Text for view details button (e.g., "View Details", "Se detaljer") */
  viewDetailsLabel: string;
  /** Text for apply button (e.g., "Apply Now", "Søk nå") */
  applyLabel: string;
}

/**
 * Status badge display configuration
 */
export interface SeasonStatusDisplay {
  /** Translated status label */
  label: string;
  /** Badge color */
  color: 'success' | 'warning' | 'danger' | 'info' | 'neutral';
}

// =============================================================================
// Component Props
// =============================================================================

export interface SeasonCardProps {
  /** Season data */
  season: SeasonVM;
  /** All text labels */
  labels: SeasonCardLabels;
  /** Status display configuration */
  statusDisplay: SeasonStatusDisplay;
  /** Function to format dates for display */
  formatDate: (date: string) => string;
  /** Whether to show action buttons */
  showActions?: boolean;
  /** Callback when view details is clicked */
  onViewDetails?: (id: string) => void;
  /** Callback when apply is clicked */
  onApply?: (id: string) => void;
  /** Whether apply button should be shown (overrides status check) */
  showApplyButton?: boolean;
  /** Test ID for testing */
  'data-testid'?: string;
}

// =============================================================================
// Component
// =============================================================================

/**
 * Pure presentational component for displaying season cards.
 *
 * **Pure Component Pattern:**
 * - No hooks (no useT, useNavigate, etc.)
 * - All text via props (labels)
 * - All formatting via props (formatDate)
 * - All state via props (season, showActions)
 * - Events emitted via callbacks (onViewDetails, onApply)
 *
 * **Integration:**
 * Applications should create connected wrappers that:
 * 1. Provide translations via labels prop
 * 2. Provide date formatting via formatDate prop
 * 3. Handle navigation in callbacks
 * 4. Map backend DTOs to SeasonVM
 */
export function SeasonCard({
  season,
  labels,
  statusDisplay,
  formatDate,
  showActions = true,
  onViewDetails,
  onApply,
  showApplyButton,
  'data-testid': testId = 'season-card',
}: SeasonCardProps) {
  // Determine if apply button should show
  const shouldShowApply =
    showApplyButton !== undefined
      ? showApplyButton
      : season.status === 'open' && onApply !== undefined;

  return (
    <Card data-testid={testId} data-color="neutral">
      <Stack spacing="4">
        <Stack direction="horizontal" spacing="4" style={{ justifyContent: 'space-between' }}>
          <Stack spacing="1" style={{ flex: 1 }}>
            <Heading level={3} data-size="sm">
              {season.name}
            </Heading>
            {season.description && (
              <Paragraph data-size="sm" data-color="subtle">
                {season.description}
              </Paragraph>
            )}
          </Stack>
          <Tag data-color={statusDisplay.color} data-size="sm">
            {statusDisplay.label}
          </Tag>
        </Stack>

        <Stack spacing="2">
          <Paragraph data-size="sm">
            {labels.periodLabel}: {formatDate(season.startDate)} - {formatDate(season.endDate)}
          </Paragraph>
          <Paragraph data-size="sm">
            {labels.deadlineLabel}: {formatDate(season.applicationDeadline)}
          </Paragraph>
        </Stack>

        {showActions && (
          <Stack direction="horizontal" spacing="3" style={{ justifyContent: 'flex-end' }}>
            <Button
              type="button"
              variant="tertiary"
              data-size="sm"
              onClick={() => onViewDetails?.(season.id)}
            >
              {labels.viewDetailsLabel}
            </Button>
            {shouldShowApply && (
              <Button
                type="button"
                variant="primary"
                data-size="sm"
                onClick={() => onApply?.(season.id)}
              >
                {labels.applyLabel}
              </Button>
            )}
          </Stack>
        )}
      </Stack>
    </Card>
  );
}
