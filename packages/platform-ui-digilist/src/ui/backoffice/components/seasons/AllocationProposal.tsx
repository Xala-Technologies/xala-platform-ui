/**
 * Allocation Proposal Component
 * Displays automated allocation suggestions based on priority rules and conflict resolution
 * KRAV-ADM-05: Regelstyrt forslag til sesongfordeling
 */

import { useState, useMemo } from 'react';
import {
  Button,
  Stack,
  Table,
  Badge,
  Heading,
  Paragraph,
  Card,
  Spinner,
  Alert,
  CheckIcon,
  CloseIcon,
  EditIcon,
  PlayIcon,
  InfoIcon,
  Checkbox,
} from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/platform/runtime';

// Local WarningIcon since it's not exported from @xala-technologies/platform/ui
function WarningIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  );
}

// Placeholder types matching backend interfaces
interface AllocationSuggestion {
  applicationId: string;
  organizationId: string;
  organizationName: string;
  listingId: string;
  listingName: string;
  weekday: number;
  suggestedStartTime: string;
  suggestedEndTime: string;
  originalStartTime: string;
  originalEndTime: string;
  timeAdjusted: boolean;
  priority: number;
  priorityReason: string;
  status: 'approve' | 'reject' | 'adjust';
  reasoning: string;
  conflicts: string[];
  hasConflicts: boolean;
}

interface AllocationProposalData {
  seasonId: string;
  seasonName: string;
  generatedAt: string;
  algorithm: string;
  totalApplications: number;
  approvedCount: number;
  rejectedCount: number;
  adjustedCount: number;
  suggestions: AllocationSuggestion[];
  unresolvableConflicts: number;
  canOverride: boolean;
}

interface AllocationProposalProps {
  seasonId: string;
  onApplyComplete?: () => void;
}

// TODO: Replace with actual SDK hook
function useAllocationProposal(_seasonId: string) {
  // Placeholder implementation
  return {
    data: null as AllocationProposalData | null,
    isLoading: false,
    error: null,
    refetch: () => Promise.resolve(),
  };
}

// TODO: Replace with actual SDK hook
function useApplyAllocationProposal() {
  // Placeholder implementation
  return {
    mutateAsync: async (_params: {
      seasonId: string;
      options: {
        autoApproveNoConflicts: boolean;
        autoAdjustTimes: boolean;
        rejectUnresolvable: boolean;
      };
    }) => {
      return {
        approvedCount: 0,
        rejectedCount: 0,
        adjustedCount: 0,
        skippedCount: 0,
      };
    },
    isPending: false,
  };
}

export function AllocationProposal({ seasonId, onApplyComplete }: AllocationProposalProps) {
  const t = useT();
  const [applyOptions, setApplyOptions] = useState({
    autoApproveNoConflicts: true,
    autoAdjustTimes: false,
    rejectUnresolvable: false,
  });

  // Queries
  const { data: proposal, isLoading, refetch } = useAllocationProposal(seasonId);

  // Mutations
  const applyMutation = useApplyAllocationProposal();

  // Group suggestions by status
  const suggestionsByStatus = useMemo(() => {
    if (!proposal) return { approve: [], adjust: [], reject: [] };

    return proposal.suggestions.reduce(
      (acc, suggestion) => {
        acc[suggestion.status].push(suggestion);
        return acc;
      },
      { approve: [] as AllocationSuggestion[], adjust: [] as AllocationSuggestion[], reject: [] as AllocationSuggestion[] }
    );
  }, [proposal]);

  // Handlers
  const handleGenerateProposal = async () => {
    await refetch();
  };

  const handleApplyProposal = async () => {
    if (!proposal) return;

    const confirmMessage = [
      'Anvend forslag til tildeling?',
      applyOptions.autoApproveNoConflicts && `${t('common.godkjenn_proposalapprovedcount_soknader_uten')}`,
      applyOptions.autoAdjustTimes && `${t('common.juster_proposaladjustedcount_soknader_til')}`,
      applyOptions.rejectUnresolvable && `- ${t('status.avslaa')} ${proposal.rejectedCount} uloselige soknader`,
    ].filter(Boolean).join('\n');

    if (confirm(confirmMessage)) {
      await applyMutation.mutateAsync({
        seasonId,
        options: applyOptions,
      });
      onApplyComplete?.();
    }
  };

  const formatTime = (time: string) => {
    return time.substring(0, 5); // HH:MM
  };

  const getWeekdayName = (weekday: number) => {
    const days = ['Sondag', 'Mandag', 'Tirsdag', 'Onsdag', 'Torsdag', 'Fredag', 'Lordag'];
    return days[weekday];
  };

  const getStatusBadge = (status: 'approve' | 'reject' | 'adjust') => {
    switch (status) {
      case 'approve':
        return <Badge variant="success">{t('seasons.text.approve')}</Badge>;
      case 'reject':
        return <Badge variant="danger">{t('common.avslaa')}</Badge>;
      case 'adjust':
        return <Badge variant="warning">{t('seasons.text.juster')}</Badge>;
    }
  };

  // Helper for status icons - used in table rows
  const _getStatusIcon = (status: 'approve' | 'reject' | 'adjust') => {
    switch (status) {
      case 'approve':
        return <CheckIcon style={{ color: 'var(--ds-color-success-text-default)' }} />;
      case 'reject':
        return <CloseIcon style={{ color: 'var(--ds-color-danger-text-default)' }} />;
      case 'adjust':
        return <EditIcon style={{ color: 'var(--ds-color-warning-text-default)' }} />;
    }
  };

  if (isLoading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--ds-spacing-8)' }}>
        <Spinner data-size="lg" aria-label={t('seasons.ariaLabel.generererForslag')} />
      </div>
    );
  }

  if (!proposal) {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Alert severity="info">
          <Heading level={4} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            Automatisk tildelingsforslag
          </Heading>
          <Paragraph data-size="sm" style={{ margin: 0 }}>
            Generer forslag til tildeling basert pa prioritetsregler og konfliktlosning.
            Systemet vil analysere alle soknader og foresla godkjenning, justering eller avslag.
          </Paragraph>
        </Alert>

        <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--ds-spacing-4)' }}>
          <Button onClick={handleGenerateProposal} variant="primary" type="button">
            <PlayIcon />
            Generer forslag
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      {/* Header with metadata */}
      <Alert severity="info">
        <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--ds-spacing-3)' }}>
          <InfoIcon />
          <div style={{ flex: 1 }}>
            <Heading level={4} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              Tildelingsforslag generert
            </Heading>
            <Paragraph data-size="sm" style={{ margin: 0 }}>
              Algoritme: <code style={{ fontFamily: 'var(--ds-font-family-mono)', fontSize: 'var(--ds-font-size-sm)' }}>{proposal.algorithm}</code>
              {' - '}
              Generert: {new Date(proposal.generatedAt).toLocaleString('nb-NO')}
            </Paragraph>
          </div>
          <Button onClick={handleGenerateProposal} data-size="sm" variant="tertiary" type="button">
            Oppdater
          </Button>
        </div>
      </Alert>

      {/* Summary statistics */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 'var(--ds-spacing-3)' }}>
        <Card style={{ padding: 'var(--ds-spacing-3)' }}>
          <div style={{ fontSize: 'var(--ds-font-size-sm)', color: 'var(--ds-color-neutral-text-subtle)' }}>
            Totalt soknader
          </div>
          <div style={{ fontSize: 'var(--ds-font-size-2xl)', fontWeight: 'var(--ds-font-weight-semibold)' }}>
            {proposal.totalApplications}
          </div>
        </Card>
        <Card style={{ padding: 'var(--ds-spacing-3)' }}>
          <div style={{ fontSize: 'var(--ds-font-size-sm)', color: 'var(--ds-color-neutral-text-subtle)' }}>
            Foreslaatt godkjent
          </div>
          <div style={{ fontSize: 'var(--ds-font-size-2xl)', fontWeight: 'var(--ds-font-weight-semibold)', color: 'var(--ds-color-success-text-default)' }}>
            {proposal.approvedCount}
          </div>
        </Card>
        <Card style={{ padding: 'var(--ds-spacing-3)' }}>
          <div style={{ fontSize: 'var(--ds-font-size-sm)', color: 'var(--ds-color-neutral-text-subtle)' }}>
            Foreslaatt justert
          </div>
          <div style={{ fontSize: 'var(--ds-font-size-2xl)', fontWeight: 'var(--ds-font-weight-semibold)', color: 'var(--ds-color-warning-text-default)' }}>
            {proposal.adjustedCount}
          </div>
        </Card>
        <Card style={{ padding: 'var(--ds-spacing-3)' }}>
          <div style={{ fontSize: 'var(--ds-font-size-sm)', color: 'var(--ds-color-neutral-text-subtle)' }}>
            Foreslaatt avslaatt
          </div>
          <div style={{ fontSize: 'var(--ds-font-size-2xl)', fontWeight: 'var(--ds-font-weight-semibold)', color: 'var(--ds-color-danger-text-default)' }}>
            {proposal.rejectedCount}
          </div>
        </Card>
      </div>

      {/* Unresolvable conflicts warning */}
      {proposal.unresolvableConflicts > 0 && (
        <Alert severity="warning">
          <div style={{ display: 'flex', alignItems: 'flex-start', gap: 'var(--ds-spacing-2)' }}>
            <WarningIcon />
            <div>
              <Heading level={5} data-size="xs" style={{ marginBottom: 'var(--ds-spacing-1)' }}>
                {proposal.unresolvableConflicts} uloselige konflikter
              </Heading>
              <Paragraph data-size="sm" style={{ margin: 0 }}>
                Systemet kunne ikke finne alternative tidspunkt for disse soknadene.
                Vurder manuell handtering eller kontakt sokerne for alternative tidspunkt.
              </Paragraph>
            </div>
          </div>
        </Alert>
      )}

      {/* Application options */}
      <Card style={{ padding: 'var(--ds-spacing-4)' }}>
        <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          Anvendelses-innstillinger
        </Heading>
        <Stack gap={3}>
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)', cursor: 'pointer' }}>
            <Checkbox
              checked={applyOptions.autoApproveNoConflicts}
              onChange={(e) => setApplyOptions({ ...applyOptions, autoApproveNoConflicts: e.target.checked })}
            />
            <span style={{ fontSize: 'var(--ds-font-size-sm)' }}>
              Godkjenn automatisk soknader uten konflikter ({proposal.approvedCount} soknader)
            </span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)', cursor: 'pointer' }}>
            <Checkbox
              checked={applyOptions.autoAdjustTimes}
              onChange={(e) => setApplyOptions({ ...applyOptions, autoAdjustTimes: e.target.checked })}
            />
            <span style={{ fontSize: 'var(--ds-font-size-sm)' }}>
              Juster automatisk tidspunkt for soknader med konflikter ({proposal.adjustedCount} soknader)
            </span>
          </label>
          <label style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)', cursor: 'pointer' }}>
            <Checkbox
              checked={applyOptions.rejectUnresolvable}
              onChange={(e) => setApplyOptions({ ...applyOptions, rejectUnresolvable: e.target.checked })}
            />
            <span style={{ fontSize: 'var(--ds-font-size-sm)' }}>
              Avsla automatisk uloselige konflikter ({proposal.rejectedCount} soknader)
            </span>
          </label>
        </Stack>
        <div style={{ marginTop: 'var(--ds-spacing-4)', display: 'flex', gap: 'var(--ds-spacing-2)', justifyContent: 'flex-end' }}>
          <Button
            onClick={handleApplyProposal}
            variant="primary"
            disabled={applyMutation.isPending || (!applyOptions.autoApproveNoConflicts && !applyOptions.autoAdjustTimes && !applyOptions.rejectUnresolvable)}
            type="button"
          >
            <PlayIcon />
            Anvend forslag
          </Button>
        </div>
      </Card>

      {/* Suggestions by status */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        {/* Approved suggestions */}
        {suggestionsByStatus.approve.length > 0 && (
          <div>
            <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
              <CheckIcon style={{ marginRight: 'var(--ds-spacing-2)' }} />
              Foreslaatt godkjent ({suggestionsByStatus.approve.length})
            </Heading>
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell>{t('seasons.text.organization')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('seasons.text.lokale')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('seasons.text.dag')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('seasons.text.tidspunkt')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('seasons.text.prioritet')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('seasons.text.status')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('seasons.text.begrunnelse')}</Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {suggestionsByStatus.approve.map((suggestion) => (
                  <Table.Row key={suggestion.applicationId}>
                    <Table.Cell>{suggestion.organizationName}</Table.Cell>
                    <Table.Cell>{suggestion.listingName}</Table.Cell>
                    <Table.Cell>{getWeekdayName(suggestion.weekday)}</Table.Cell>
                    <Table.Cell>
                      <span style={{ fontFamily: 'var(--ds-font-family-mono)' }}>
                        {formatTime(suggestion.suggestedStartTime)} - {formatTime(suggestion.suggestedEndTime)}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant="info">{suggestion.priority}</Badge>
                    </Table.Cell>
                    <Table.Cell>{getStatusBadge(suggestion.status)}</Table.Cell>
                    <Table.Cell>
                      <span style={{ fontSize: 'var(--ds-font-size-sm)', color: 'var(--ds-color-neutral-text-subtle)' }}>
                        {suggestion.reasoning}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}

        {/* Adjusted suggestions */}
        {suggestionsByStatus.adjust.length > 0 && (
          <div>
            <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
              <EditIcon style={{ marginRight: 'var(--ds-spacing-2)' }} />
              Foreslaatt justert ({suggestionsByStatus.adjust.length})
            </Heading>
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell>{t('seasons.text.organization')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('seasons.text.lokale')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('seasons.text.dag')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('common.opprinnelig_tidspunkt')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('common.foreslaatt_tidspunkt')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('seasons.text.prioritet')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('seasons.text.status')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('seasons.text.begrunnelse')}</Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {suggestionsByStatus.adjust.map((suggestion) => (
                  <Table.Row key={suggestion.applicationId}>
                    <Table.Cell>{suggestion.organizationName}</Table.Cell>
                    <Table.Cell>{suggestion.listingName}</Table.Cell>
                    <Table.Cell>{getWeekdayName(suggestion.weekday)}</Table.Cell>
                    <Table.Cell>
                      <span style={{ fontFamily: 'var(--ds-font-family-mono)', textDecoration: 'line-through', color: 'var(--ds-color-neutral-text-subtle)' }}>
                        {formatTime(suggestion.originalStartTime)} - {formatTime(suggestion.originalEndTime)}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <span style={{ fontFamily: 'var(--ds-font-family-mono)', fontWeight: 'var(--ds-font-weight-semibold)', color: 'var(--ds-color-warning-text-default)' }}>
                        {formatTime(suggestion.suggestedStartTime)} - {formatTime(suggestion.suggestedEndTime)}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant="info">{suggestion.priority}</Badge>
                    </Table.Cell>
                    <Table.Cell>{getStatusBadge(suggestion.status)}</Table.Cell>
                    <Table.Cell>
                      <span style={{ fontSize: 'var(--ds-font-size-sm)', color: 'var(--ds-color-neutral-text-subtle)' }}>
                        {suggestion.reasoning}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}

        {/* Rejected suggestions */}
        {suggestionsByStatus.reject.length > 0 && (
          <div>
            <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
              <CloseIcon style={{ marginRight: 'var(--ds-spacing-2)' }} />
              Foreslaatt avslaatt ({suggestionsByStatus.reject.length})
            </Heading>
            <Alert severity="warning" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
              <Paragraph data-size="sm" style={{ margin: 0 }}>
                Disse soknadene har konflikter med hoyere prioriterte soknader og det finnes ingen alternative tidspunkt.
                Vurder manuell handtering eller kontakt sokerne.
              </Paragraph>
            </Alert>
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell>{t('seasons.text.organization')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('seasons.text.lokale')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('seasons.text.dag')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('seasons.text.tidspunkt')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('seasons.text.prioritet')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('seasons.text.status')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('seasons.text.begrunnelse')}</Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {suggestionsByStatus.reject.map((suggestion) => (
                  <Table.Row key={suggestion.applicationId}>
                    <Table.Cell>{suggestion.organizationName}</Table.Cell>
                    <Table.Cell>{suggestion.listingName}</Table.Cell>
                    <Table.Cell>{getWeekdayName(suggestion.weekday)}</Table.Cell>
                    <Table.Cell>
                      <span style={{ fontFamily: 'var(--ds-font-family-mono)' }}>
                        {formatTime(suggestion.originalStartTime)} - {formatTime(suggestion.originalEndTime)}
                      </span>
                    </Table.Cell>
                    <Table.Cell>
                      <Badge variant="info">{suggestion.priority}</Badge>
                    </Table.Cell>
                    <Table.Cell>{getStatusBadge(suggestion.status)}</Table.Cell>
                    <Table.Cell>
                      <span style={{ fontSize: 'var(--ds-font-size-sm)', color: 'var(--ds-color-neutral-text-subtle)' }}>
                        {suggestion.reasoning}
                      </span>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </div>
    </div>
  );
}
