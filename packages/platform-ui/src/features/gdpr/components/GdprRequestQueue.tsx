/**
 * GdprRequestQueue Component
 *
 * Pure presentational component for displaying a queue of GDPR requests.
 * All data, state, and translations are provided via props.
 *
 * @module @xala-technologies/platform-ui/features/gdpr
 */

import * as React from 'react';
import { NativeSelect } from '../../../primitives/NativeSelect';
import { Card, Paragraph, Button, Table, Spinner, Textfield } from '@digdir/designsystemet-react';
import { StatusTag } from '../../../blocks/StatusBadges';
import type { BadgeColor } from '../../../blocks/StatusBadges';
import type { GdprRequestVM, GdprSortOption } from '../types';
import { SearchIcon, FilterIcon, CopyIcon, CheckIcon } from '../../../primitives/icons';

// =============================================================================
// Types
// =============================================================================

/**
 * GDPR request with display data (user info, formatted dates, computed values)
 */
export interface GdprRequestDisplayVM extends GdprRequestVM {
  /** User's display name */
  userName: string;
  /** User's email (optional) */
  userEmail?: string;
  /** Number of days remaining until deadline */
  daysRemaining: number;
  /** Formatted requested date string */
  requestedDate: string;
}

/**
 * Label interface for all UI text in GdprRequestQueue
 */
export interface GdprRequestQueueLabels {
  // Search and controls
  searchPlaceholder: string;
  sortButtonLabel: string;
  showingResults: string;

  // Loading states
  loadingRequests: string;
  loadingLabel: string;

  // Empty states
  noPendingRequests: string;
  noRequestsFound: string;
  resetSearch: string;

  // User display
  unknownUser: string;

  // Actions
  copyId: string;
  actions: string;
  viewDetails: string;

  // Days remaining
  daysRemainingLabel: string;

  // Table headers
  userHeader: string;
  typeHeader: string;
  statusHeader: string;
  requestedHeader: string;
  daysRemainingHeader: string;
  idHeader: string;

  // Status labels
  statusPending: string;
  statusProcessing: string;
  statusCompleted: string;
  statusRejected: string;

  // Type labels
  typeExport: string;
  typeDeletion: string;
}

/**
 * Props for GdprRequestQueue component
 */
export interface GdprRequestQueueProps {
  /** List of GDPR requests with display data */
  requests: GdprRequestDisplayVM[];
  /** UI labels for all text content */
  labels: GdprRequestQueueLabels;
  /** Available sort options */
  sortOptions: GdprSortOption[];
  /** Currently selected sort option ID */
  selectedSort: string;
  /** Current search value (controlled) */
  searchValue: string;
  /** Whether data is loading */
  isLoading?: boolean;
  /** Total count from server (for pagination display) */
  totalCount?: number;
  /** ID of the item that was recently copied */
  copiedId?: string | null;
  /** Callback when search value changes */
  onSearchChange: (value: string) => void;
  /** Callback when search is submitted */
  onSearchSubmit: () => void;
  /** Callback when sort option is selected */
  onSortChange: (sortId: string) => void;
  /** Callback when a request row is clicked */
  onRequestClick?: (request: GdprRequestVM) => void;
  /** Callback when copy ID is clicked */
  onCopyId: (id: string) => void;
  /** Callback to reset search */
  onResetSearch?: () => void;
}

// =============================================================================
// Constants
// =============================================================================

const STATUS_COLORS: Record<string, BadgeColor> = {
  pending: 'warning',
  processing: 'info',
  completed: 'success',
  rejected: 'danger',
};

// =============================================================================
// Component
// =============================================================================

/**
 * GdprRequestQueue - Pure presentational component for GDPR request queue
 *
 * @example
 * ```tsx
 * <GdprRequestQueue
 *   requests={processedRequests}
 *   labels={englishLabels}
 *   sortOptions={sortOptions}
 *   selectedSort="daysRemaining-asc"
 *   searchValue={searchQuery}
 *   isLoading={false}
 *   onSearchChange={setSearchQuery}
 *   onSearchSubmit={handleSearch}
 *   onSortChange={handleSortChange}
 *   onRequestClick={handleRequestClick}
 *   onCopyId={handleCopyId}
 * />
 * ```
 */
export function GdprRequestQueue({
  requests,
  labels,
  sortOptions,
  selectedSort,
  searchValue,
  isLoading = false,
  totalCount,
  copiedId = null,
  onSearchChange,
  onSearchSubmit,
  onSortChange,
  onRequestClick,
  onCopyId,
  onResetSearch,
}: GdprRequestQueueProps): React.ReactElement {
  // Get status label
  const getStatusLabel = (status: string): string => {
    switch (status) {
      case 'pending':
        return labels.statusPending;
      case 'processing':
        return labels.statusProcessing;
      case 'completed':
        return labels.statusCompleted;
      case 'rejected':
        return labels.statusRejected;
      default:
        return status;
    }
  };

  // Get type label
  const getTypeLabel = (type: string): string => {
    switch (type) {
      case 'export':
        return labels.typeExport;
      case 'deletion':
        return labels.typeDeletion;
      default:
        return type;
    }
  };

  // Get urgency color for days remaining
  const getUrgencyColor = (daysRemaining: number): string => {
    if (daysRemaining <= 3) return 'var(--ds-color-danger-text-default)';
    if (daysRemaining <= 7) return 'var(--ds-color-warning-text-default)';
    return 'var(--ds-color-neutral-text-default)';
  };

  // Handle search form submit
  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearchSubmit();
  };

  // Loading state
  if (isLoading) {
    return (
      <Card data-color="neutral">
        <Card.Block>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--ds-spacing-4)',
              padding: 'var(--ds-spacing-10)',
              minHeight: '400px',
            }}
          >
            <Spinner aria-label={labels.loadingLabel} />
            <Paragraph data-size="md" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.loadingRequests}
            </Paragraph>
          </div>
        </Card.Block>
      </Card>
    );
  }

  // Empty state - no requests
  if (requests.length === 0 && !searchValue) {
    return (
      <Card data-color="neutral">
        <Card.Block>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--ds-spacing-4)',
              padding: 'var(--ds-spacing-10)',
              minHeight: '400px',
            }}
          >
            <Paragraph
              data-size="lg"
              style={{
                color: 'var(--ds-color-neutral-text-subtle)',
                textAlign: 'center',
              }}
            >
              {labels.noPendingRequests}
            </Paragraph>
          </div>
        </Card.Block>
      </Card>
    );
  }

  // Empty state - no search results
  if (requests.length === 0 && searchValue) {
    return (
      <Card data-color="neutral">
        <Card.Block>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--ds-spacing-4)',
              padding: 'var(--ds-spacing-10)',
              minHeight: '400px',
            }}
          >
            <Paragraph
              data-size="lg"
              style={{
                color: 'var(--ds-color-neutral-text-subtle)',
                textAlign: 'center',
              }}
            >
              {labels.noRequestsFound}
            </Paragraph>
            {onResetSearch && (
              <Button onClick={onResetSearch} variant="secondary" data-size="md">
                {labels.resetSearch}
              </Button>
            )}
          </div>
        </Card.Block>
      </Card>
    );
  }

  return (
    <Card data-color="neutral">
      <Card.Block>
        {/* Header with search and controls */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: 'var(--ds-spacing-4)',
            gap: 'var(--ds-spacing-4)',
            flexWrap: 'wrap',
          }}
        >
          {/* Search */}
          <form onSubmit={handleSearchSubmit} style={{ flex: '1 1 300px' }}>
            <div style={{ position: 'relative' }}>
              <div
                style={{
                  position: 'absolute',
                  left: 'var(--ds-spacing-3)',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                <SearchIcon size={20} />
              </div>
              <Textfield
                type="search"
                value={searchValue}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder={labels.searchPlaceholder}
                aria-label={labels.searchPlaceholder}
                style={{ width: '100%', paddingLeft: 'var(--ds-spacing-9)' }}
              />
            </div>
          </form>

          {/* Sort dropdown */}
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', alignItems: 'center' }}>
            <FilterIcon size={20} />
            <NativeSelect
              value={selectedSort}
              onChange={(e) => onSortChange(e.target.value)}
              aria-label={labels.sortButtonLabel}
              style={{
                padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                borderRadius: 'var(--ds-border-radius-md)',
                border: '1px solid var(--ds-color-neutral-border-default)',
                backgroundColor: 'var(--ds-color-neutral-surface-default)',
                color: 'var(--ds-color-neutral-text-default)',
                fontSize: 'var(--ds-font-size-sm)',
                cursor: 'pointer',
              }}
            >
              {sortOptions.map((option) => (
                <option key={option.id} value={option.id}>
                  {option.label}
                </option>
              ))}
            </NativeSelect>
          </div>
        </div>

        {/* Results count */}
        {totalCount !== undefined && (
          <Paragraph
            data-size="sm"
            style={{
              color: 'var(--ds-color-neutral-text-subtle)',
              marginBottom: 'var(--ds-spacing-3)',
            }}
          >
            {labels.showingResults.replace('{count}', totalCount.toString())}
          </Paragraph>
        )}

        {/* Table */}
        <div style={{ overflowX: 'auto', width: '100%' }}>
          <Table style={{ width: '100%' }}>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>{labels.userHeader}</Table.HeaderCell>
                <Table.HeaderCell>{labels.typeHeader}</Table.HeaderCell>
                <Table.HeaderCell>{labels.statusHeader}</Table.HeaderCell>
                <Table.HeaderCell>{labels.requestedHeader}</Table.HeaderCell>
                <Table.HeaderCell>{labels.daysRemainingHeader}</Table.HeaderCell>
                <Table.HeaderCell>{labels.idHeader}</Table.HeaderCell>
                <Table.HeaderCell>{labels.actions}</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {requests.map((request) => (
                <Table.Row
                  key={request.id}
                  style={{
                    cursor: onRequestClick ? 'pointer' : 'default',
                  }}
                  onClick={() => onRequestClick?.(request)}
                >
                  {/* User */}
                  <Table.Cell>
                    <div
                      style={{
                        display: 'flex',
                        flexDirection: 'column',
                        gap: 'var(--ds-spacing-1)',
                      }}
                    >
                      <Paragraph
                        data-size="sm"
                        style={{ fontWeight: 'var(--ds-font-weight-medium)' }}
                      >
                        {request.userName || labels.unknownUser}
                      </Paragraph>
                      {request.userEmail && (
                        <Paragraph
                          data-size="xs"
                          style={{ color: 'var(--ds-color-neutral-text-subtle)' }}
                        >
                          {request.userEmail}
                        </Paragraph>
                      )}
                    </div>
                  </Table.Cell>

                  {/* Type */}
                  <Table.Cell>
                    <Paragraph data-size="sm">{getTypeLabel(request.requestType)}</Paragraph>
                  </Table.Cell>

                  {/* Status */}
                  <Table.Cell>
                    <StatusTag color={STATUS_COLORS[request.status] || 'neutral'} size="sm">
                      {getStatusLabel(request.status)}
                    </StatusTag>
                  </Table.Cell>

                  {/* Requested date */}
                  <Table.Cell>
                    <Paragraph data-size="sm">{request.requestedDate}</Paragraph>
                  </Table.Cell>

                  {/* Days remaining */}
                  <Table.Cell>
                    <Paragraph
                      data-size="sm"
                      style={{
                        color: getUrgencyColor(request.daysRemaining),
                        fontWeight:
                          request.daysRemaining <= 3
                            ? 'var(--ds-font-weight-bold)'
                            : 'var(--ds-font-weight-regular)',
                      }}
                    >
                      {request.daysRemaining} {labels.daysRemainingLabel}
                    </Paragraph>
                  </Table.Cell>

                  {/* ID */}
                  <Table.Cell>
                    <Paragraph
                      data-size="xs"
                      style={{
                        fontFamily: 'monospace',
                        color: 'var(--ds-color-neutral-text-subtle)',
                      }}
                    >
                      {request.id.substring(0, 8)}...
                    </Paragraph>
                  </Table.Cell>

                  {/* Actions */}
                  <Table.Cell>
                    <Button
                      type="button"
                      variant="tertiary"
                      data-size="sm"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCopyId(request.id);
                      }}
                      aria-label={labels.copyId}
                      style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-1)' }}
                    >
                      {copiedId === request.id ? <CheckIcon size={16} /> : <CopyIcon size={16} />}
                    </Button>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </div>
      </Card.Block>
    </Card>
  );
}

export default GdprRequestQueue;
