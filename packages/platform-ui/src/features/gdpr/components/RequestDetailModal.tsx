/**
 * RequestDetailModal Component
 *
 * Pure presentational modal component for displaying GDPR request details
 * with approve/reject actions. All data, state, and translations via props.
 *
 * @module @xala-technologies/platform-ui/features/gdpr
 */
import * as React from 'react';
import {
  Dialog,
  Heading,
  Paragraph,
  Button,
  Spinner,
  Alert,
  Textarea,
} from '@digdir/designsystemet-react';
import { StatusTag } from '../../../blocks/StatusBadges';
import type { BadgeColor } from '../../../blocks/StatusBadges';
import type { GdprRequestVM } from '../types';
import {
  AlertTriangleIcon,
  CheckIcon,
  XIcon,
  ClockIcon,
  UserIcon,
  CalendarIcon,
} from '../../../primitives/icons';

// =============================================================================
// Types
// =============================================================================

/**
 * Label interface for all UI text in RequestDetailModal
 */
export interface RequestDetailModalLabels {
  // Modal metadata
  title: string;
  loading: string;
  loadError: string;

  // Field labels
  requestTypeLabel: string;
  userLabel: string;
  requestedDateLabel: string;
  expiresLabel: string;
  processedLabel: string;
  processedByLabel: string;
  rejectionReasonLabel: string;
  requestIdLabel: string;
  userIdLabel: string;
  atLabel: string;

  // Days remaining
  daysRemainingLabel: string;

  // Status labels
  statusPending: string;
  statusProcessing: string;
  statusCompleted: string;
  statusRejected: string;

  // Type labels
  typeExport: string;
  typeDeletion: string;

  // Actions
  cancel: string;
  close: string;
  back: string;
  reject: string;
  approve: string;
  approving: string;
  rejecting: string;
  confirmReject: string;

  // Warnings
  warning: string;
  deletionWarning: string;

  // Reject form
  rejectFormTitle: string;
  rejectFormDescription: string;
  rejectFormPlaceholder: string;
}

/**
 * Props for RequestDetailModal component
 */
export interface RequestDetailModalProps {
  /** Whether the modal is open */
  isOpen: boolean;
  /** Callback to close the modal */
  onClose: () => void;
  /** GDPR request data (null when loading or no request) */
  request: GdprRequestVM | null;
  /** UI labels for all text content */
  labels: RequestDetailModalLabels;
  /** Whether request data is loading */
  isLoading?: boolean;
  /** Whether approve/reject action is in progress */
  isSubmitting?: boolean;
  /** User name for display */
  userName?: string;
  /** User email for display */
  userEmail?: string;
  /** Days remaining until deadline */
  daysRemaining?: number;
  /** Formatted requested date */
  requestedDate?: string;
  /** Formatted requested time */
  requestedTime?: string;
  /** Formatted expiration date */
  expiresDate?: string;
  /** Formatted expiration time */
  expiresTime?: string;
  /** Formatted processed date (if processed) */
  processedDate?: string;
  /** Formatted processed time (if processed) */
  processedTime?: string;
  /** Callback when approve is clicked */
  onApprove?: () => void;
  /** Callback when reject is confirmed with reason */
  onReject?: (reason: string) => void;
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
 * RequestDetailModal - Pure presentational modal for GDPR request details
 *
 * @example
 * ```tsx
 * <RequestDetailModal
 *   isOpen={isOpen}
 *   onClose={handleClose}
 *   request={request}
 *   labels={englishLabels}
 *   userName="John Doe"
 *   userEmail="john@example.com"
 *   daysRemaining={15}
 *   requestedDate="2024-01-15"
 *   requestedTime="14:30"
 *   expiresDate="2024-02-15"
 *   expiresTime="14:30"
 *   onApprove={handleApprove}
 *   onReject={handleReject}
 * />
 * ```
 */
export function RequestDetailModal({
  isOpen,
  onClose,
  request,
  labels,
  isLoading = false,
  isSubmitting = false,
  userName,
  userEmail,
  daysRemaining,
  requestedDate,
  requestedTime,
  expiresDate,
  expiresTime,
  processedDate,
  processedTime,
  onApprove,
  onReject,
}: RequestDetailModalProps): React.ReactElement {
  // Local state for rejection form
  const [showRejectForm, setShowRejectForm] = React.useState(false);
  const [rejectionReason, setRejectionReason] = React.useState('');

  // Reset form when modal closes
  React.useEffect(() => {
    if (!isOpen) {
      setShowRejectForm(false);
      setRejectionReason('');
    }
  }, [isOpen]);

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

  // Handle reject confirmation
  const handleRejectConfirm = () => {
    if (rejectionReason.trim() && onReject) {
      onReject(rejectionReason.trim());
    }
  };

  // Handle back from reject form
  const handleBackFromReject = () => {
    setShowRejectForm(false);
    setRejectionReason('');
  };

  return (
    <Dialog open={isOpen} onClose={onClose} style={{ maxWidth: '600px', width: '100%' }}>
      <Dialog.Block>
        {/* Loading state */}
        {isLoading && (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 'var(--ds-spacing-4)',
              padding: 'var(--ds-spacing-10)',
              minHeight: '300px',
            }}
          >
            <Spinner aria-label={labels.loading} />
            <Paragraph data-size="md" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.loading}
            </Paragraph>
          </div>
        )}

        {/* Error state */}
        {!isLoading && !request && (
          <div style={{ padding: 'var(--ds-spacing-4)' }}>
            <Alert data-color="danger">{labels.loadError}</Alert>
            <div
              style={{
                display: 'flex',
                justifyContent: 'flex-end',
                marginTop: 'var(--ds-spacing-4)',
              }}
            >
              <Button onClick={onClose} variant="secondary">
                {labels.close}
              </Button>
            </div>
          </div>
        )}

        {/* Rejection form */}
        {!isLoading && request && showRejectForm && (
          <div style={{ padding: 'var(--ds-spacing-4)' }}>
            <Heading level={2} data-size="md" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
              {labels.rejectFormTitle}
            </Heading>

            <Paragraph
              data-size="sm"
              style={{
                marginBottom: 'var(--ds-spacing-4)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {labels.rejectFormDescription}
            </Paragraph>

            <Textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder={labels.rejectFormPlaceholder}
              rows={4}
              style={{ resize: 'vertical', marginBottom: 'var(--ds-spacing-4)' }}
            />

            <div
              style={{
                display: 'flex',
                gap: 'var(--ds-spacing-2)',
                justifyContent: 'flex-end',
              }}
            >
              <Button onClick={handleBackFromReject} variant="secondary" disabled={isSubmitting}>
                {labels.back}
              </Button>
              <Button
                onClick={handleRejectConfirm}
                data-color="danger"
                disabled={!rejectionReason.trim() || isSubmitting}
              >
                {isSubmitting ? (
                  <>
                    <Spinner aria-label={labels.rejecting} />
                    {labels.rejecting}
                  </>
                ) : (
                  <>
                    <XIcon size={16} />
                    {labels.confirmReject}
                  </>
                )}
              </Button>
            </div>
          </div>
        )}

        {/* Request details */}
        {!isLoading && request && !showRejectForm && (
          <div style={{ padding: 'var(--ds-spacing-4)' }}>
            {/* Header */}
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                marginBottom: 'var(--ds-spacing-4)',
              }}
            >
              <Heading level={2} data-size="md">
                {labels.title}
              </Heading>
              <StatusTag color={STATUS_COLORS[request.status] || 'neutral'} size="md">
                {getStatusLabel(request.status)}
              </StatusTag>
            </div>

            {/* Deletion warning */}
            {request.requestType === 'deletion' && request.status === 'pending' && (
              <Alert data-color="warning" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                <div
                  style={{ display: 'flex', gap: 'var(--ds-spacing-2)', alignItems: 'flex-start' }}
                >
                  <AlertTriangleIcon size={20} />
                  <div>
                    <Paragraph data-size="sm" style={{ fontWeight: 'var(--ds-font-weight-bold)' }}>
                      {labels.warning}
                    </Paragraph>
                    <Paragraph data-size="sm">{labels.deletionWarning}</Paragraph>
                  </div>
                </div>
              </Alert>
            )}

            {/* Urgency indicator */}
            {daysRemaining !== undefined && daysRemaining <= 7 && request.status === 'pending' && (
              <Alert
                data-color={daysRemaining <= 3 ? 'danger' : 'warning'}
                style={{ marginBottom: 'var(--ds-spacing-4)' }}
              >
                <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', alignItems: 'center' }}>
                  <ClockIcon size={20} />
                  <Paragraph data-size="sm" style={{ fontWeight: 'var(--ds-font-weight-medium)' }}>
                    {daysRemaining} {labels.daysRemainingLabel}
                  </Paragraph>
                </div>
              </Alert>
            )}

            {/* Details grid */}
            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '140px 1fr',
                gap: 'var(--ds-spacing-3)',
                marginBottom: 'var(--ds-spacing-4)',
              }}
            >
              {/* Request Type */}
              <Paragraph
                data-size="sm"
                style={{
                  fontWeight: 'var(--ds-font-weight-medium)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {labels.requestTypeLabel}
              </Paragraph>
              <Paragraph data-size="sm">{getTypeLabel(request.requestType)}</Paragraph>

              {/* User */}
              <Paragraph
                data-size="sm"
                style={{
                  fontWeight: 'var(--ds-font-weight-medium)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {labels.userLabel}
              </Paragraph>
              <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', alignItems: 'center' }}>
                <UserIcon size={16} />
                <div>
                  <Paragraph data-size="sm" style={{ fontWeight: 'var(--ds-font-weight-medium)' }}>
                    {userName || request.userId}
                  </Paragraph>
                  {userEmail && (
                    <Paragraph
                      data-size="xs"
                      style={{ color: 'var(--ds-color-neutral-text-subtle)' }}
                    >
                      {userEmail}
                    </Paragraph>
                  )}
                </div>
              </div>

              {/* Requested Date */}
              <Paragraph
                data-size="sm"
                style={{
                  fontWeight: 'var(--ds-font-weight-medium)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {labels.requestedDateLabel}
              </Paragraph>
              <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', alignItems: 'center' }}>
                <CalendarIcon size={16} />
                <Paragraph data-size="sm">
                  {requestedDate}
                  {requestedTime && (
                    <span style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                      {' '}
                      {labels.atLabel} {requestedTime}
                    </span>
                  )}
                </Paragraph>
              </div>

              {/* Expires */}
              <Paragraph
                data-size="sm"
                style={{
                  fontWeight: 'var(--ds-font-weight-medium)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {labels.expiresLabel}
              </Paragraph>
              <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', alignItems: 'center' }}>
                <CalendarIcon size={16} />
                <Paragraph data-size="sm">
                  {expiresDate}
                  {expiresTime && (
                    <span style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                      {' '}
                      {labels.atLabel} {expiresTime}
                    </span>
                  )}
                </Paragraph>
              </div>

              {/* Processed info (if processed) */}
              {processedDate && (
                <>
                  <Paragraph
                    data-size="sm"
                    style={{
                      fontWeight: 'var(--ds-font-weight-medium)',
                      color: 'var(--ds-color-neutral-text-subtle)',
                    }}
                  >
                    {labels.processedLabel}
                  </Paragraph>
                  <Paragraph data-size="sm">
                    {processedDate}
                    {processedTime && (
                      <span style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                        {' '}
                        {labels.atLabel} {processedTime}
                      </span>
                    )}
                  </Paragraph>
                </>
              )}

              {/* Processed by (if processed) */}
              {request.processedBy && (
                <>
                  <Paragraph
                    data-size="sm"
                    style={{
                      fontWeight: 'var(--ds-font-weight-medium)',
                      color: 'var(--ds-color-neutral-text-subtle)',
                    }}
                  >
                    {labels.processedByLabel}
                  </Paragraph>
                  <Paragraph data-size="sm">{request.processedBy}</Paragraph>
                </>
              )}

              {/* Rejection reason (if rejected) */}
              {request.status === 'rejected' && request.metadata?.rejectionReason && (
                <>
                  <Paragraph
                    data-size="sm"
                    style={{
                      fontWeight: 'var(--ds-font-weight-medium)',
                      color: 'var(--ds-color-neutral-text-subtle)',
                    }}
                  >
                    {labels.rejectionReasonLabel}
                  </Paragraph>
                  <Paragraph
                    data-size="sm"
                    style={{
                      padding: 'var(--ds-spacing-2)',
                      backgroundColor: 'var(--ds-color-danger-surface-default)',
                      borderRadius: 'var(--ds-border-radius-sm)',
                    }}
                  >
                    {request.metadata.rejectionReason}
                  </Paragraph>
                </>
              )}

              {/* Request ID */}
              <Paragraph
                data-size="sm"
                style={{
                  fontWeight: 'var(--ds-font-weight-medium)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {labels.requestIdLabel}
              </Paragraph>
              <Paragraph
                data-size="xs"
                style={{
                  fontFamily: 'monospace',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {request.id}
              </Paragraph>

              {/* User ID */}
              <Paragraph
                data-size="sm"
                style={{
                  fontWeight: 'var(--ds-font-weight-medium)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {labels.userIdLabel}
              </Paragraph>
              <Paragraph
                data-size="xs"
                style={{
                  fontFamily: 'monospace',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {request.userId}
              </Paragraph>
            </div>

            {/* Actions */}
            <div
              style={{
                display: 'flex',
                gap: 'var(--ds-spacing-2)',
                justifyContent: 'flex-end',
                borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
                paddingTop: 'var(--ds-spacing-4)',
              }}
            >
              <Button onClick={onClose} variant="secondary" disabled={isSubmitting}>
                {request.status === 'pending' ? labels.cancel : labels.close}
              </Button>

              {request.status === 'pending' && onReject && (
                <Button
                  onClick={() => setShowRejectForm(true)}
                  data-color="danger"
                  variant="secondary"
                  disabled={isSubmitting}
                >
                  <XIcon size={16} />
                  {labels.reject}
                </Button>
              )}

              {request.status === 'pending' && onApprove && (
                <Button onClick={onApprove} disabled={isSubmitting}>
                  {isSubmitting ? (
                    <>
                      <Spinner aria-label={labels.approving} />
                      {labels.approving}
                    </>
                  ) : (
                    <>
                      <CheckIcon size={16} />
                      {labels.approve}
                    </>
                  )}
                </Button>
              )}
            </div>
          </div>
        )}
      </Dialog.Block>
    </Dialog>
  );
}

export default RequestDetailModal;
