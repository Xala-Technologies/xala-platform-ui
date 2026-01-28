/**
 * RecurringBookingWidget
 *
 * Widget for managing recurring booking series.
 * Uses @xala-technologies/platform-ui components only.
 */

import { useState, useCallback } from 'react';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Badge,
  Table,
  Spinner,
  EmptyState,
  useDialog,
  Stack,
  Tabs,
  CalendarIcon,
  ClockIcon,
  PauseIcon,
  PlayIcon,
  XCircleIcon,
  RefreshIcon,
} from '@xala-technologies/platform-ui';
import type {
  RecurringBookingSeries,
  RecurringBookingOccurrence,
  RecurrenceFrequency,
} from '@digilist/client-sdk';
import { DAY_OF_WEEK_LABELS, formatRecurrencePattern } from '@digilist/client-sdk';

export interface RecurringBookingWidgetProps {
  /** Translation function */
  t: (key: string) => string;
  /** Locale */
  locale: string;
  /** Recurring booking series list */
  series: RecurringBookingSeries[] | undefined;
  /** Selected series occurrences */
  selectedOccurrences: RecurringBookingOccurrence[] | undefined;
  /** Selected series ID */
  selectedSeriesId: string | null;
  /** Loading state */
  isLoading: boolean;
  /** Loading occurrences */
  isLoadingOccurrences: boolean;
  /** Pause series handler */
  onPauseSeries: (id: string) => Promise<void>;
  /** Resume series handler */
  onResumeSeries: (id: string) => Promise<void>;
  /** Cancel series handler */
  onCancelSeries: (id: string, cancelFutureOnly?: boolean) => Promise<void>;
  /** Skip occurrence handler */
  onSkipOccurrence: (seriesId: string, occurrenceId: string) => Promise<void>;
  /** Select series handler */
  onSelectSeries: (id: string | null) => void;
  /** Create new recurring booking */
  onCreateNew: () => void;
  /** Is mutating */
  isMutating?: boolean;
}

const STATUS_COLORS: Record<string, string> = {
  active: 'success',
  paused: 'warning',
  cancelled: 'danger',
  scheduled: 'info',
  confirmed: 'success',
  skipped: 'neutral',
};

const FREQUENCY_ICONS: Record<RecurrenceFrequency, string> = {
  daily: 'D',
  weekly: 'W',
  biweekly: 'B',
  monthly: 'M',
};

export function RecurringBookingWidget({
  t,
  locale,
  series,
  selectedOccurrences,
  selectedSeriesId,
  isLoading,
  isLoadingOccurrences,
  onPauseSeries,
  onResumeSeries,
  onCancelSeries,
  onSkipOccurrence,
  onSelectSeries,
  onCreateNew,
  isMutating = false,
}: RecurringBookingWidgetProps) {
  const [activeTab, setActiveTab] = useState<'active' | 'all'>('active');
  const { confirm } = useDialog();

  const handleCancel = useCallback(
    async (id: string, name: string) => {
      const confirmed = await confirm({
        title: t('recurring.cancelTitle'),
        description: t('recurring.cancelConfirm', { name }),
        confirmText: t('action.cancel'),
        cancelText: t('common.abort'),
        variant: 'danger',
      });
      if (confirmed) {
        await onCancelSeries(id, true);
      }
    },
    [confirm, t, onCancelSeries]
  );

  const handleSkipOccurrence = useCallback(
    async (seriesId: string, occurrenceId: string, date: string) => {
      const confirmed = await confirm({
        title: t('recurring.skipTitle'),
        description: t('recurring.skipConfirm', { date }),
        confirmText: t('action.skip'),
        cancelText: t('common.abort'),
        variant: 'warning',
      });
      if (confirmed) {
        await onSkipOccurrence(seriesId, occurrenceId);
      }
    },
    [confirm, t, onSkipOccurrence]
  );

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(locale === 'en' ? 'en-US' : 'nb-NO', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: 'var(--ds-spacing-8)',
        }}
      >
        <Spinner aria-label={t('state.loading')} data-size="lg" />
      </div>
    );
  }

  const selectedSeries = series?.find((s) => s.id === selectedSeriesId);

  // Detail view
  if (selectedSeries) {
    return (
      <Stack gap="4">
        {/* Back button */}
        <Button
          type="button"
          variant="tertiary"
          data-size="sm"
          onClick={() => onSelectSeries(null)}
        >
          {t('common.back')}
        </Button>

        {/* Series header */}
        <Card style={{ padding: 'var(--ds-spacing-4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
            <div>
              <Heading level={2} data-size="md" style={{ margin: 0 }}>
                {selectedSeries.rentalObjectName}
              </Heading>
              <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)', marginTop: 'var(--ds-spacing-2)' }}>
                <span style={{ fontSize: '20px' }}>
                  {FREQUENCY_ICONS[selectedSeries.pattern.frequency]}
                </span>
                <Paragraph data-size="sm" style={{ margin: 0 }}>
                  {formatRecurrencePattern(selectedSeries.pattern, t)}
                </Paragraph>
              </div>
              <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', marginTop: 'var(--ds-spacing-2)' }}>
                <Badge data-color={STATUS_COLORS[selectedSeries.status]} data-size="sm">
                  {t(`recurring.status.${selectedSeries.status}`)}
                </Badge>
                <Badge data-size="sm">
                  {selectedSeries.completedOccurrences}/{selectedSeries.totalOccurrences} {t('recurring.completed')}
                </Badge>
              </div>
            </div>

            <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
              {selectedSeries.status === 'active' && (
                <Button
                  type="button"
                  variant="secondary"
                  data-size="sm"
                  onClick={() => onPauseSeries(selectedSeries.id)}
                  disabled={isMutating}
                >
                  <PauseIcon />
                  {t('action.pause')}
                </Button>
              )}
              {selectedSeries.status === 'paused' && (
                <Button
                  type="button"
                  variant="secondary"
                  data-size="sm"
                  onClick={() => onResumeSeries(selectedSeries.id)}
                  disabled={isMutating}
                >
                  <PlayIcon />
                  {t('action.resume')}
                </Button>
              )}
              {selectedSeries.status !== 'cancelled' && (
                <Button
                  type="button"
                  variant="secondary"
                  data-size="sm"
                  data-color="danger"
                  onClick={() => handleCancel(selectedSeries.id, selectedSeries.rentalObjectName)}
                  disabled={isMutating}
                >
                  <XCircleIcon />
                  {t('action.cancel')}
                </Button>
              )}
            </div>
          </div>
        </Card>

        {/* Occurrences */}
        <Card style={{ padding: 'var(--ds-spacing-4)' }}>
          <Heading level={3} data-size="sm" style={{ margin: 0, marginBottom: 'var(--ds-spacing-4)' }}>
            {t('recurring.upcomingOccurrences')}
          </Heading>

          {isLoadingOccurrences ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: 'var(--ds-spacing-4)' }}>
              <Spinner data-size="md" />
            </div>
          ) : !selectedOccurrences || selectedOccurrences.length === 0 ? (
            <Paragraph style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {t('recurring.noOccurrences')}
            </Paragraph>
          ) : (
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell>#</Table.HeaderCell>
                  <Table.HeaderCell>{t('recurring.date')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('recurring.time')}</Table.HeaderCell>
                  <Table.HeaderCell>{t('label.status')}</Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '100px' }}>{t('common.actions')}</Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {selectedOccurrences.map((occ) => (
                  <Table.Row key={occ.id}>
                    <Table.Cell>{occ.occurrenceNumber}</Table.Cell>
                    <Table.Cell>{formatDate(occ.scheduledDate)}</Table.Cell>
                    <Table.Cell>{occ.startTime} - {occ.endTime}</Table.Cell>
                    <Table.Cell>
                      <Badge data-color={STATUS_COLORS[occ.status]} data-size="sm">
                        {t(`recurring.occurrenceStatus.${occ.status}`)}
                      </Badge>
                    </Table.Cell>
                    <Table.Cell>
                      {occ.status === 'scheduled' && (
                        <Button
                          type="button"
                          variant="tertiary"
                          data-size="sm"
                          onClick={() => handleSkipOccurrence(selectedSeries.id, occ.id, formatDate(occ.scheduledDate))}
                          disabled={isMutating}
                        >
                          {t('action.skip')}
                        </Button>
                      )}
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          )}
        </Card>
      </Stack>
    );
  }

  // List view
  const displaySeries = activeTab === 'active'
    ? series?.filter((s) => s.status === 'active' || s.status === 'paused')
    : series;

  return (
    <Stack gap="6">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <Heading level={2} data-size="lg" style={{ margin: 0 }}>
            {t('recurring.title')}
          </Heading>
          <Paragraph data-size="sm" style={{ margin: 0, marginTop: 'var(--ds-spacing-1)' }}>
            {t('recurring.description')}
          </Paragraph>
        </div>
        <Button
          type="button"
          variant="primary"
          data-size="md"
          onClick={onCreateNew}
        >
          {t('recurring.create')}
        </Button>
      </div>

      {/* Tabs */}
      <Tabs
        value={activeTab}
        onChange={(value) => setActiveTab(value as 'active' | 'all')}
      >
        <Tabs.List>
          <Tabs.Tab value="active">{t('recurring.activeSeries')}</Tabs.Tab>
          <Tabs.Tab value="all">{t('recurring.allSeries')}</Tabs.Tab>
        </Tabs.List>
      </Tabs>

      {/* Series List */}
      {!displaySeries || displaySeries.length === 0 ? (
        <EmptyState
          icon={<RefreshIcon size={48} />}
          title={t('recurring.noSeries')}
          description={t('recurring.noSeriesDesc')}
          action={{
            label: t('recurring.createFirst'),
            onClick: onCreateNew,
          }}
          bordered
        />
      ) : (
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: 'var(--ds-spacing-4)',
          }}
        >
          {displaySeries.map((s) => (
            <Card
              key={s.id}
              data-testid={`series-${s.id}`}
              style={{ padding: 'var(--ds-spacing-4)', cursor: 'pointer' }}
              onClick={() => onSelectSeries(s.id)}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                <div>
                  <Heading level={3} data-size="sm" style={{ margin: 0 }}>
                    {s.rentalObjectName}
                  </Heading>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-1)', marginTop: 'var(--ds-spacing-1)' }}>
                    <span>{FREQUENCY_ICONS[s.pattern.frequency]}</span>
                    <Paragraph data-size="xs" style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}>
                      {t(`recurring.frequency.${s.pattern.frequency}`)}
                    </Paragraph>
                  </div>
                </div>
                <Badge data-color={STATUS_COLORS[s.status]} data-size="sm">
                  {t(`recurring.status.${s.status}`)}
                </Badge>
              </div>

              <div style={{ marginTop: 'var(--ds-spacing-3)', display: 'flex', gap: 'var(--ds-spacing-4)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-1)' }}>
                  <ClockIcon style={{ width: '14px', height: '14px', color: 'var(--ds-color-neutral-text-subtle)' }} />
                  <Paragraph data-size="xs" style={{ margin: 0 }}>
                    {s.pattern.startTime} - {s.pattern.endTime}
                  </Paragraph>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-1)' }}>
                  <CalendarIcon style={{ width: '14px', height: '14px', color: 'var(--ds-color-neutral-text-subtle)' }} />
                  <Paragraph data-size="xs" style={{ margin: 0 }}>
                    {s.upcomingOccurrences} {t('recurring.upcoming')}
                  </Paragraph>
                </div>
              </div>

              {s.nextOccurrence && (
                <div
                  style={{
                    marginTop: 'var(--ds-spacing-3)',
                    paddingTop: 'var(--ds-spacing-3)',
                    borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
                  }}
                >
                  <Paragraph data-size="xs" style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}>
                    {t('recurring.nextBooking')}
                  </Paragraph>
                  <Paragraph data-size="sm" style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}>
                    {formatDate(s.nextOccurrence)}
                  </Paragraph>
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
    </Stack>
  );
}
