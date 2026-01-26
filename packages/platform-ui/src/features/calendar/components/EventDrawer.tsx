/**
 * Event Drawer
 *
 * Side drawer for viewing and managing calendar events.
 * Presentational component - all actions passed via callbacks.
 *
 * @module @xala-technologies/platform-ui/features/backoffice-calendar/components
 */

import * as React from 'react';
import {
  Dialog,
  Button,
  Heading,
  Paragraph,
  Tag,
  Spinner,
  Stack,
  Card,
} from '@xala-technologies/platform-ui';

import { BLOCK_TYPE_CONFIG } from '../types';
import type { CalendarEvent, BlockType, CalendarPermissions } from '../types';

// =============================================================================
// Types
// =============================================================================

export interface EventDrawerLabels {
  /** Label for "Booking" fallback */
  booking?: string;
  /** Label for listing field */
  listing?: string;
  /** Label for date field */
  date?: string;
  /** Label for time field */
  time?: string;
  /** Label for "Booked by" field */
  bookedBy?: string;
  /** Label for organization field */
  organization?: string;
  /** Label for block type field */
  blockType?: string;
  /** Label for "Close" button */
  close?: string;
  /** Label for "Reject" button */
  reject?: string;
  /** Label for "Approve" button */
  approve?: string;
  /** Label for "Edit" button */
  edit?: string;
  /** Label for "Delete" button */
  delete?: string;
  /** Label for "View booking" button */
  viewBooking?: string;
  /** Aria label for "Rejecting..." */
  rejecting?: string;
  /** Aria label for "Approving..." */
  approving?: string;
  /** Aria label for "Deleting..." */
  deleting?: string;
  /** Confirmation message for reject */
  confirmReject?: string;
  /** Confirmation message for delete block */
  confirmDeleteBlock?: string;
  /** Status labels */
  statusConfirmed?: string;
  statusPending?: string;
  statusBlocked?: string;
  statusCancelled?: string;
  /** Block type labels (if overriding BLOCK_TYPE_CONFIG) */
  blockTypeMaintenance?: string;
  blockTypeClosed?: string;
  blockTypeHold?: string;
  blockTypeEmergency?: string;
  blockTypeInternal?: string;
}

export interface EventDrawerProps {
  /** Whether the drawer is open */
  isOpen: boolean;
  /** The event to display */
  event: CalendarEvent | null;
  /** User permissions */
  permissions: CalendarPermissions;
  /** Whether approve action is pending */
  isApproving?: boolean;
  /** Whether reject action is pending */
  isRejecting?: boolean;
  /** Whether delete block action is pending */
  isDeletingBlock?: boolean;
  /** Handler for closing the drawer */
  onClose: () => void;
  /** Handler for editing the event */
  onEdit?: (event: CalendarEvent) => void;
  /** Handler for approving a booking request */
  onApprove?: (bookingId: string) => void;
  /** Handler for rejecting a booking request */
  onReject?: (bookingId: string) => void;
  /** Handler for deleting a block */
  onDeleteBlock?: (blockId: string) => void;
  /** Handler for viewing booking details */
  onViewBooking?: (bookingId: string) => void;
  /** Callback for reject confirmation (replaces window.confirm) */
  onConfirmReject?: () => Promise<boolean> | boolean;
  /** Callback for delete block confirmation (replaces window.confirm) */
  onConfirmDeleteBlock?: () => Promise<boolean> | boolean;
  /** UI labels for translations */
  labels?: EventDrawerLabels;
}

// =============================================================================
// Helpers
// =============================================================================

function formatTime(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleTimeString('nb-NO', { hour: '2-digit', minute: '2-digit' });
}

function formatDate(dateStr: string): string {
  const date = new Date(dateStr);
  return date.toLocaleDateString('nb-NO', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

const DEFAULT_LABELS: EventDrawerLabels = {
  booking: 'Booking',
  listing: 'Objekt',
  date: 'Dato',
  time: 'Tid',
  bookedBy: 'Booket av',
  organization: 'Organisasjon',
  blockType: 'Blokkeringstype',
  close: 'Lukk',
  reject: 'Avvis',
  approve: 'Godkjenn',
  edit: 'Rediger',
  delete: 'Slett',
  viewBooking: 'Se booking',
  rejecting: 'Avviser...',
  approving: 'Godkjenner...',
  deleting: 'Sletter...',
  confirmReject: 'Er du sikker på at du vil avvise denne bookingen?',
  confirmDeleteBlock: 'Er du sikker på at du vil slette denne blokkeringen?',
  statusConfirmed: 'Bekreftet',
  statusPending: 'Avventer',
  statusBlocked: 'Blokkert',
  statusCancelled: 'Kansellert',
  blockTypeMaintenance: 'Vedlikehold',
  blockTypeClosed: 'Stengt',
  blockTypeHold: 'Hold',
  blockTypeEmergency: 'Nødsituasjon',
  blockTypeInternal: 'Intern',
};

function getStatusBadge(
  status: string,
  labels: EventDrawerLabels
): { color: 'success' | 'warning' | 'danger' | 'info' | 'neutral'; label: string } {
  const normalizedStatus = status?.toLowerCase() || '';

  switch (normalizedStatus) {
    case 'confirmed':
      return { color: 'success', label: labels.statusConfirmed ?? 'Bekreftet' };
    case 'pending':
      return { color: 'warning', label: labels.statusPending ?? 'Avventer' };
    case 'blocked':
    case 'maintenance':
      return { color: 'neutral', label: labels.statusBlocked ?? 'Blokkert' };
    case 'cancelled':
      return { color: 'danger', label: labels.statusCancelled ?? 'Kansellert' };
    default:
      return { color: 'info', label: status };
  }
}

// =============================================================================
// Component
// =============================================================================

export function EventDrawer({
  isOpen,
  event,
  permissions,
  isApproving = false,
  isRejecting = false,
  isDeletingBlock = false,
  onClose,
  onEdit,
  onApprove,
  onReject,
  onDeleteBlock,
  onViewBooking,
  onConfirmReject,
  onConfirmDeleteBlock,
  labels = DEFAULT_LABELS,
}: EventDrawerProps): React.ReactElement | null {
  const effectiveLabels = { ...DEFAULT_LABELS, ...labels };

  if (!event) return null;

  const startStr = event.start || event.startTime || '';
  const endStr = event.end || event.endTime || '';
  const statusBadge = getStatusBadge(event.status, effectiveLabels);
  const isBlock = event.status === 'blocked' || event.status === 'maintenance';
  const isPending = event.status?.toLowerCase() === 'pending';

  const handleApprove = () => {
    if (event.bookingId && onApprove) {
      onApprove(event.bookingId);
    }
  };

  const handleReject = async () => {
    if (event.bookingId && onReject) {
      // Use custom confirmation callback or fallback to window.confirm
      const confirmed = onConfirmReject
        ? await onConfirmReject()
        : window.confirm(effectiveLabels.confirmReject ?? 'Er du sikker på at du vil avvise denne bookingen?');

      if (confirmed) {
        onReject(event.bookingId);
      }
    }
  };

  const handleDeleteBlock = async () => {
    if (onDeleteBlock) {
      // Use custom confirmation callback or fallback to window.confirm
      const confirmed = onConfirmDeleteBlock
        ? await onConfirmDeleteBlock()
        : window.confirm(effectiveLabels.confirmDeleteBlock ?? 'Er du sikker på at du vil slette denne blokkeringen?');

      if (confirmed) {
        onDeleteBlock(event.id);
      }
    }
  };

  const handleViewBooking = () => {
    if (event.bookingId && onViewBooking) {
      onViewBooking(event.bookingId);
    }
  };

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <Dialog.Block>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'flex-start',
            marginBottom: 'var(--ds-spacing-4)',
          }}
        >
          <Heading level={2} data-size="sm" style={{ margin: 0 }}>
            {event.title || event.userName || effectiveLabels.booking}
          </Heading>
          <Tag data-color={statusBadge.color}>{statusBadge.label}</Tag>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
          {/* Listing */}
          {event.listingName && (
            <div>
              <Paragraph
                data-size="xs"
                style={{
                  margin: 0,
                  color: 'var(--ds-color-neutral-text-subtle)',
                  marginBottom: 'var(--ds-spacing-1)',
                }}
              >
                {effectiveLabels.listing}
              </Paragraph>
              <Paragraph data-size="sm" style={{ margin: 0 }}>
                {event.listingName}
              </Paragraph>
            </div>
          )}

          {/* Date */}
          <div>
            <Paragraph
              data-size="xs"
              style={{
                margin: 0,
                color: 'var(--ds-color-neutral-text-subtle)',
                marginBottom: 'var(--ds-spacing-1)',
              }}
            >
              {effectiveLabels.date}
            </Paragraph>
            <Paragraph data-size="sm" style={{ margin: 0 }}>
              {startStr ? formatDate(startStr) : '-'}
            </Paragraph>
          </div>

          {/* Time */}
          <div>
            <Paragraph
              data-size="xs"
              style={{
                margin: 0,
                color: 'var(--ds-color-neutral-text-subtle)',
                marginBottom: 'var(--ds-spacing-1)',
              }}
            >
              {effectiveLabels.time}
            </Paragraph>
            <Paragraph data-size="sm" style={{ margin: 0 }}>
              {startStr && endStr ? `${formatTime(startStr)} - ${formatTime(endStr)}` : '-'}
            </Paragraph>
          </div>

          {/* User (for bookings) */}
          {event.userName && !isBlock && (
            <div>
              <Paragraph
                data-size="xs"
                style={{
                  margin: 0,
                  color: 'var(--ds-color-neutral-text-subtle)',
                  marginBottom: 'var(--ds-spacing-1)',
                }}
              >
                {effectiveLabels.bookedBy}
              </Paragraph>
              <Paragraph data-size="sm" style={{ margin: 0 }}>
                {event.userName}
              </Paragraph>
            </div>
          )}

          {/* Organization */}
          {event.organizationName && (
            <div>
              <Paragraph
                data-size="xs"
                style={{
                  margin: 0,
                  color: 'var(--ds-color-neutral-text-subtle)',
                  marginBottom: 'var(--ds-spacing-1)',
                }}
              >
                {effectiveLabels.organization}
              </Paragraph>
              <Paragraph data-size="sm" style={{ margin: 0 }}>
                {event.organizationName}
              </Paragraph>
            </div>
          )}

          {/* Block type indicator */}
          {isBlock && (
            <div
              style={{
                padding: 'var(--ds-spacing-3)',
                borderRadius: 'var(--ds-border-radius-md)',
                backgroundColor: 'var(--ds-color-neutral-surface-default)',
                border: '1px solid var(--ds-color-neutral-border-subtle)',
              }}
            >
              <Paragraph
                data-size="xs"
                style={{
                  margin: 0,
                  color: 'var(--ds-color-neutral-text-subtle)',
                  marginBottom: 'var(--ds-spacing-1)',
                }}
              >
                {effectiveLabels.blockType}
              </Paragraph>
              <Paragraph
                data-size="sm"
                style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}
              >
                {(() => {
                  const blockType = event.status as BlockType;
                  const labelKey = BLOCK_TYPE_CONFIG[blockType]?.label;

                  // Map block type to label
                  if (blockType === 'maintenance') return effectiveLabels.blockTypeMaintenance ?? 'Vedlikehold';
                  if (blockType === 'closed') return effectiveLabels.blockTypeClosed ?? 'Stengt';
                  if (blockType === 'hold') return effectiveLabels.blockTypeHold ?? 'Hold';
                  if (blockType === 'emergency') return effectiveLabels.blockTypeEmergency ?? 'Nødsituasjon';
                  if (blockType === 'internal') return effectiveLabels.blockTypeInternal ?? 'Intern';
                  return effectiveLabels.statusBlocked ?? 'Blokkert';
                })()}
              </Paragraph>
            </div>
          )}
        </div>
      </Dialog.Block>

      <Dialog.Block>
        <div
          style={{
            display: 'flex',
            gap: 'var(--ds-spacing-3)',
            justifyContent: 'flex-end',
            flexWrap: 'wrap',
          }}
        >
          <Button type="button" variant="secondary" onClick={onClose}>
            {effectiveLabels.close}
          </Button>

          {/* Pending request actions */}
          {isPending && event.bookingId && permissions.canApproveRequests && (
            <>
              <Button
                type="button"
                variant="secondary"
                onClick={handleReject}
                disabled={isRejecting}
                data-color="danger"
              >
                {isRejecting ? (
                  <Spinner data-size="sm" aria-label={effectiveLabels.rejecting} aria-hidden="true" />
                ) : (
                  effectiveLabels.reject
                )}
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={handleApprove}
                disabled={isApproving}
              >
                {isApproving ? (
                  <Spinner data-size="sm" aria-label={effectiveLabels.approving} aria-hidden="true" />
                ) : (
                  effectiveLabels.approve
                )}
              </Button>
            </>
          )}

          {/* Block actions */}
          {isBlock && permissions.canDeleteBlock && (
            <>
              {onEdit && (
                <Button type="button" variant="secondary" onClick={() => onEdit(event)}>
                  {effectiveLabels.edit}
                </Button>
              )}
              <Button
                type="button"
                variant="secondary"
                onClick={handleDeleteBlock}
                disabled={isDeletingBlock}
                data-color="danger"
              >
                {isDeletingBlock ? (
                  <Spinner data-size="sm" aria-label={effectiveLabels.deleting} aria-hidden="true" />
                ) : (
                  effectiveLabels.delete
                )}
              </Button>
            </>
          )}

          {/* View booking link */}
          {event.bookingId && !isPending && onViewBooking && (
            <Button type="button" variant="primary" onClick={handleViewBooking}>
              {effectiveLabels.viewBooking}
            </Button>
          )}
        </div>
      </Dialog.Block>
    </Dialog>
  );
}
