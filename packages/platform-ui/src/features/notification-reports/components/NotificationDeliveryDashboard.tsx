/**
 * NotificationDeliveryDashboard
 * Presentational dashboard for monitoring notification delivery status
 *
 * @pure - All data via props, all actions via callbacks. No SDK, no i18n.
 * @module @xala-technologies/platform-ui/features/notification-reports
 */

import { useMemo } from 'react';
import { Button, Paragraph, Spinner, Table } from '@digdir/designsystemet-react';
import { HeaderSearch } from '../../../composed/header-parts';
import { StatusTag } from '../../../blocks/StatusBadges';
import type { BadgeColor } from '../../../blocks/StatusBadges';
import type { DeliveryReport, DeliveryStats } from '../types';

// ============================================================================
// Types
// ============================================================================

/**
 * Labels for NotificationDeliveryDashboard
 */
export interface NotificationDeliveryDashboardLabels {
  // Header
  title: string;
  description: string;
  // Stats
  totalLabel: string;
  sentLabel: string;
  pendingLabel: string;
  failedLabel: string;
  deliveredLabel: string;
  // Search and actions
  searchPlaceholder: string;
  retryFailedLabel: string;
  retryingLabel: string;
  loadingLabel: string;
  // Empty states
  emptyTitle: string;
  emptySearchHint: string;
  emptyNoData: string;
  // Table headers
  typeHeader: string;
  recipientHeader: string;
  subjectHeader: string;
  statusHeader: string;
  attemptsHeader: string;
  lastAttemptHeader: string;
  // Footer
  showingOfTotal: string;
  // Type labels
  emailTypeLabel: string;
  smsTypeLabel: string;
  pushTypeLabel: string;
  inAppTypeLabel: string;
}

export interface NotificationDeliveryDashboardProps {
  /** List of delivery reports */
  reports: DeliveryReport[];
  /** UI labels for all text content */
  labels: NotificationDeliveryDashboardLabels;
  /** Whether data is loading */
  isLoading?: boolean;
  /** Total count from server (for pagination) */
  totalCount?: number;
  /** Current search value (controlled) */
  searchValue?: string;
  /** Whether retry operation is in progress */
  isRetrying?: boolean;
  /** Format date function */
  formatDate?: (date: string) => string;
  /** Format time function */
  formatTime?: (date: string) => string;
  /** Callback when search value changes */
  onSearchChange?: (value: string) => void;
  /** Callback when search is submitted */
  onSearch?: (value: string) => void;
  /** Callback to retry failed notifications */
  onRetryFailed?: () => void;
}

// ============================================================================
// Constants
// ============================================================================

// Status badge color mapping
const STATUS_COLORS: Record<string, BadgeColor> = {
  sent: 'success',
  delivered: 'success',
  pending: 'warning',
  failed: 'danger',
};

// Type badge color mapping
const TYPE_COLORS: Record<DeliveryReport['type'], BadgeColor> = {
  email: 'info',
  sms: 'success',
  push: 'neutral',
  in_app: 'neutral',
};

// ============================================================================
// Component
// ============================================================================

export function NotificationDeliveryDashboard({
  reports,
  labels,
  isLoading = false,
  totalCount,
  searchValue = '',
  isRetrying = false,
  formatDate = (d) => new Date(d).toLocaleDateString('nb-NO'),
  formatTime = (d) =>
    new Date(d).toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' }),
  onSearchChange,
  onSearch,
  onRetryFailed,
}: NotificationDeliveryDashboardProps) {
  // Calculate stats from reports
  const stats = useMemo<DeliveryStats>(() => {
    const total = reports.length;
    const sent = reports.filter((r) => r.status === 'sent' || r.status === 'delivered').length;
    const pending = reports.filter((r) => r.status === 'pending').length;
    const failed = reports.filter((r) => r.status === 'failed').length;

    return { total, sent, pending, failed };
  }, [reports]);

  const displayTotal = totalCount ?? reports.length;

  // Type labels
  const getTypeLabel = (type: DeliveryReport['type']) => {
    const typeLabels: Record<DeliveryReport['type'], string> = {
      email: labels.emailTypeLabel,
      sms: labels.smsTypeLabel,
      push: labels.pushTypeLabel,
      in_app: labels.inAppTypeLabel,
    };
    return typeLabels[type] || type;
  };

  // Status labels
  const getStatusLabel = (status: DeliveryReport['status']) => {
    const statusLabels: Record<DeliveryReport['status'], string> = {
      sent: labels.sentLabel,
      delivered: labels.deliveredLabel,
      pending: labels.pendingLabel,
      failed: labels.failedLabel,
    };
    return statusLabels[status] || status;
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-4)',
        flex: 1,
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div>
        <Paragraph
          data-size="lg"
          style={{ margin: 0, fontWeight: 'var(--ds-font-weight-semibold)' }}
        >
          {labels.title}
        </Paragraph>
        <Paragraph
          data-size="sm"
          style={{
            margin: 0,
            marginTop: 'var(--ds-spacing-1)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {labels.description}
        </Paragraph>
      </div>

      {/* Stats Row */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: 'var(--ds-spacing-3)',
        }}
      >
        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
            border: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Paragraph
            data-size="xs"
            style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
          >
            {labels.totalLabel}
          </Paragraph>
          <Paragraph
            data-size="lg"
            style={{
              margin: 0,
              marginTop: 'var(--ds-spacing-1)',
              fontWeight: 'var(--ds-font-weight-semibold)',
            }}
          >
            {stats.total}
          </Paragraph>
        </div>
        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-success-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
            border: '1px solid var(--ds-color-success-border-subtle)',
          }}
        >
          <Paragraph
            data-size="xs"
            style={{ margin: 0, color: 'var(--ds-color-success-text-default)' }}
          >
            {labels.sentLabel}
          </Paragraph>
          <Paragraph
            data-size="lg"
            style={{
              margin: 0,
              marginTop: 'var(--ds-spacing-1)',
              fontWeight: 'var(--ds-font-weight-semibold)',
              color: 'var(--ds-color-success-text-default)',
            }}
          >
            {stats.sent}
          </Paragraph>
        </div>
        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-warning-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
            border: '1px solid var(--ds-color-warning-border-subtle)',
          }}
        >
          <Paragraph
            data-size="xs"
            style={{ margin: 0, color: 'var(--ds-color-warning-text-default)' }}
          >
            {labels.pendingLabel}
          </Paragraph>
          <Paragraph
            data-size="lg"
            style={{
              margin: 0,
              marginTop: 'var(--ds-spacing-1)',
              fontWeight: 'var(--ds-font-weight-semibold)',
              color: 'var(--ds-color-warning-text-default)',
            }}
          >
            {stats.pending}
          </Paragraph>
        </div>
        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-danger-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
            border: '1px solid var(--ds-color-danger-border-subtle)',
          }}
        >
          <Paragraph
            data-size="xs"
            style={{ margin: 0, color: 'var(--ds-color-danger-text-default)' }}
          >
            {labels.failedLabel}
          </Paragraph>
          <Paragraph
            data-size="lg"
            style={{
              margin: 0,
              marginTop: 'var(--ds-spacing-1)',
              fontWeight: 'var(--ds-font-weight-semibold)',
              color: 'var(--ds-color-danger-text-default)',
            }}
          >
            {stats.failed}
          </Paragraph>
        </div>
      </div>

      {/* Toolbar Row */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)' }}>
        <HeaderSearch
          placeholder={labels.searchPlaceholder}
          value={searchValue}
          onSearchChange={onSearchChange}
          onSearch={onSearch}
          width="350px"
        />

        <div style={{ flex: 1 }} />

        {/* Retry button */}
        {stats.failed > 0 && onRetryFailed && (
          <Button type="button" variant="secondary" onClick={onRetryFailed} disabled={isRetrying}>
            {isRetrying ? labels.retryingLabel : labels.retryFailedLabel}
          </Button>
        )}
      </div>

      {/* Table */}
      <div style={{ flex: 1, overflow: 'auto' }}>
        {isLoading ? (
          <div
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              padding: 'var(--ds-spacing-10)',
            }}
          >
            <Spinner aria-label={labels.loadingLabel} />
          </div>
        ) : reports.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding: 'var(--ds-spacing-10)',
              backgroundColor: 'var(--ds-color-neutral-surface-default)',
              borderRadius: 'var(--ds-border-radius-md)',
              border: '1px solid var(--ds-color-neutral-border-subtle)',
            }}
          >
            <Paragraph
              data-size="md"
              style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
            >
              {labels.emptyTitle}
            </Paragraph>
            <Paragraph
              data-size="sm"
              style={{
                margin: 0,
                marginTop: 'var(--ds-spacing-2)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {searchValue ? labels.emptySearchHint : labels.emptyNoData}
            </Paragraph>
          </div>
        ) : (
          <div
            style={{
              backgroundColor: 'var(--ds-color-neutral-surface-default)',
              borderRadius: 'var(--ds-border-radius-md)',
              border: '1px solid var(--ds-color-neutral-border-subtle)',
              overflow: 'hidden',
            }}
          >
            <Table>
              <Table.Head>
                <Table.Row>
                  <Table.HeaderCell style={{ width: '100px' }}>
                    {labels.typeHeader}
                  </Table.HeaderCell>
                  <Table.HeaderCell>{labels.recipientHeader}</Table.HeaderCell>
                  <Table.HeaderCell>{labels.subjectHeader}</Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '120px' }}>
                    {labels.statusHeader}
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '100px' }}>
                    {labels.attemptsHeader}
                  </Table.HeaderCell>
                  <Table.HeaderCell style={{ width: '180px' }}>
                    {labels.lastAttemptHeader}
                  </Table.HeaderCell>
                </Table.Row>
              </Table.Head>
              <Table.Body>
                {reports.map((report) => {
                  const statusColor = STATUS_COLORS[report.status] || 'neutral';
                  const typeColor = TYPE_COLORS[report.type];
                  const typeLabel = getTypeLabel(report.type);

                  return (
                    <Table.Row key={report.id}>
                      <Table.Cell>
                        <StatusTag color={typeColor}>{typeLabel}</StatusTag>
                      </Table.Cell>
                      <Table.Cell>
                        <Paragraph
                          data-size="sm"
                          style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}
                        >
                          {report.recipient}
                        </Paragraph>
                      </Table.Cell>
                      <Table.Cell>
                        <Paragraph data-size="sm" style={{ margin: 0 }}>
                          {report.subject || '-'}
                        </Paragraph>
                      </Table.Cell>
                      <Table.Cell>
                        <StatusTag color={statusColor}>{getStatusLabel(report.status)}</StatusTag>
                      </Table.Cell>
                      <Table.Cell>
                        <Paragraph data-size="sm" style={{ margin: 0 }}>
                          {report.attemptCount}
                        </Paragraph>
                      </Table.Cell>
                      <Table.Cell>
                        {report.lastAttemptAt ? (
                          <div>
                            <Paragraph data-size="sm" style={{ margin: 0 }}>
                              {formatDate(report.lastAttemptAt)}
                            </Paragraph>
                            <Paragraph
                              data-size="xs"
                              style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
                            >
                              {formatTime(report.lastAttemptAt)}
                            </Paragraph>
                          </div>
                        ) : (
                          <Paragraph
                            data-size="sm"
                            style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
                          >
                            -
                          </Paragraph>
                        )}
                      </Table.Cell>
                    </Table.Row>
                  );
                })}
              </Table.Body>
            </Table>
          </div>
        )}
      </div>

      {/* Footer with total count */}
      {!isLoading && reports.length > 0 && (
        <div
          style={{
            padding: 'var(--ds-spacing-3)',
            textAlign: 'center',
            borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Paragraph
            data-size="sm"
            style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
          >
            {labels.showingOfTotal
              .replace('{count}', String(reports.length))
              .replace('{total}', String(displayTotal))}
          </Paragraph>
        </div>
      )}
    </div>
  );
}
