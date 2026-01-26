/**
 * Storybook Stories: RequestDetailModal
 *
 * Pure presentational component for viewing and processing GDPR request details.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button } from '../../primitives';
import {
  RequestDetailModal,
  type RequestDetailModalLabels,
  type GdprRequestVM,
} from '../../features/gdpr';

// =============================================================================
// Mock Data
// =============================================================================

const mockLabels: RequestDetailModalLabels = {
  title: 'GDPR Request Details',
  loading: 'Loading request details...',
  loadError: 'Failed to load request details',
  requestTypeLabel: 'Request Type',
  userLabel: 'User',
  requestedDateLabel: 'Requested Date',
  expiresLabel: 'Expires',
  processedLabel: 'Processed',
  processedByLabel: 'Processed By',
  rejectionReasonLabel: 'Rejection Reason',
  requestIdLabel: 'Request ID',
  userIdLabel: 'User ID',
  atLabel: 'at',
  daysRemainingLabel: '{count} days remaining',
  statusPending: 'Pending',
  statusProcessing: 'Processing',
  statusCompleted: 'Completed',
  statusRejected: 'Rejected',
  typeExport: 'Data Export',
  typeDeletion: 'Data Deletion',
  cancel: 'Cancel',
  close: 'Close',
  back: 'Back',
  reject: 'Reject',
  approve: 'Approve',
  approving: 'Approving...',
  rejecting: 'Rejecting...',
  confirmReject: 'Confirm Rejection',
  warning: 'Warning',
  deletionWarning:
    'This is a data deletion request. Approving this will permanently delete all user data. This action cannot be undone.',
  rejectFormTitle: 'Reason for Rejection',
  rejectFormDescription:
    'Please provide a reason for rejecting this GDPR request. This will be sent to the user.',
  rejectFormPlaceholder: 'Enter rejection reason...',
};

const mockPendingExportRequest: GdprRequestVM = {
  id: '550e8400-e29b-41d4-a716-446655440000',
  userId: 'user-123',
  requestType: 'export',
  status: 'pending',
  requestedAt: '2025-01-20T10:00:00Z',
  expiresAt: '2025-02-19T10:00:00Z',
};

const mockPendingDeletionRequest: GdprRequestVM = {
  id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
  userId: 'user-456',
  requestType: 'deletion',
  status: 'pending',
  requestedAt: '2025-01-15T14:30:00Z',
  expiresAt: '2025-02-14T14:30:00Z',
};

const mockCompletedRequest: GdprRequestVM = {
  id: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
  userId: 'user-789',
  requestType: 'export',
  status: 'completed',
  requestedAt: '2025-01-10T09:15:00Z',
  expiresAt: '2025-02-09T09:15:00Z',
  processedAt: '2025-01-12T14:30:00Z',
  processedBy: 'admin@example.com',
};

const mockRejectedRequest: GdprRequestVM = {
  id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
  userId: 'user-101',
  requestType: 'deletion',
  status: 'rejected',
  requestedAt: '2025-01-08T11:00:00Z',
  expiresAt: '2025-02-07T11:00:00Z',
  processedAt: '2025-01-09T16:45:00Z',
  processedBy: 'admin@example.com',
  metadata: {
    rejectionReason:
      'User account is involved in an ongoing investigation. Request will be processed after investigation is complete.',
  },
};

const mockUrgentRequest: GdprRequestVM = {
  id: 'urgent-001',
  userId: 'user-urgent',
  requestType: 'export',
  status: 'pending',
  requestedAt: '2025-01-03T08:00:00Z',
  expiresAt: '2025-02-02T08:00:00Z',
};

// =============================================================================
// Meta Configuration
// =============================================================================

const meta: Meta<typeof RequestDetailModal> = {
  title: 'Features/GDPR/RequestDetailModal',
  component: RequestDetailModal,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component:
          'Pure presentational modal for viewing and processing GDPR request details. Provides approve/reject actions for admins.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ minHeight: '600px', minWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof RequestDetailModal>;

// =============================================================================
// Stories
// =============================================================================

export const PendingExportRequest: Story = {
  args: {
    isOpen: true,
    onClose: () => console.log('Close modal'),
    request: mockPendingExportRequest,
    labels: mockLabels,
    isLoading: false,
    isSubmitting: false,
    userName: 'Alice Johnson',
    userEmail: 'alice@example.com',
    daysRemaining: 24,
    requestedDate: 'Jan 20, 2025',
    requestedTime: '10:00 AM',
    expiresDate: 'Feb 19, 2025',
    expiresTime: '10:00 AM',
    onApprove: () => console.log('Approve clicked'),
    onReject: (reason) => console.log('Reject with reason:', reason),
  },
};

export const PendingDeletionRequest: Story = {
  args: {
    ...PendingExportRequest.args,
    request: mockPendingDeletionRequest,
    userName: 'Bob Smith',
    userEmail: 'bob@example.com',
    daysRemaining: 19,
    requestedDate: 'Jan 15, 2025',
    requestedTime: '2:30 PM',
    expiresDate: 'Feb 14, 2025',
    expiresTime: '2:30 PM',
  },
};

export const CompletedRequest: Story = {
  args: {
    ...PendingExportRequest.args,
    request: mockCompletedRequest,
    userName: 'Charlie Davis',
    userEmail: 'charlie@example.com',
    daysRemaining: 14,
    requestedDate: 'Jan 10, 2025',
    requestedTime: '9:15 AM',
    expiresDate: 'Feb 9, 2025',
    expiresTime: '9:15 AM',
    processedDate: 'Jan 12, 2025',
    processedTime: '2:30 PM',
  },
};

export const RejectedRequest: Story = {
  args: {
    ...PendingExportRequest.args,
    request: mockRejectedRequest,
    userName: 'Diana Prince',
    userEmail: 'diana@example.com',
    daysRemaining: 12,
    requestedDate: 'Jan 8, 2025',
    requestedTime: '11:00 AM',
    expiresDate: 'Feb 7, 2025',
    expiresTime: '11:00 AM',
    processedDate: 'Jan 9, 2025',
    processedTime: '4:45 PM',
  },
};

export const UrgentRequest: Story = {
  args: {
    ...PendingExportRequest.args,
    request: mockUrgentRequest,
    userName: 'Frank Miller',
    userEmail: 'frank@example.com',
    daysRemaining: 2,
    requestedDate: 'Jan 3, 2025',
    requestedTime: '8:00 AM',
    expiresDate: 'Feb 2, 2025',
    expiresTime: '8:00 AM',
  },
};

export const Loading: Story = {
  args: {
    ...PendingExportRequest.args,
    request: null,
    isLoading: true,
  },
};

export const LoadError: Story = {
  args: {
    ...PendingExportRequest.args,
    request: null,
    isLoading: false,
  },
};

export const Submitting: Story = {
  args: {
    ...PendingExportRequest.args,
    isSubmitting: true,
  },
};

export const WithUnknownUser: Story = {
  args: {
    ...PendingExportRequest.args,
    userName: '550e8400-e29b-41d4-a716-446655440000',
    userEmail: undefined,
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [isOpen, setIsOpen] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleApprove = async () => {
      setIsSubmitting(true);
      console.log('Approving request...');
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setIsOpen(false);
      console.log('Request approved!');
    };

    const handleReject = async (reason: string) => {
      setIsSubmitting(true);
      console.log('Rejecting request with reason:', reason);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setIsSubmitting(false);
      setIsOpen(false);
      console.log('Request rejected!');
    };

    return (
      <>
        <Button onClick={() => setIsOpen(true)}>Open GDPR Request Modal</Button>
        <RequestDetailModal
          {...args}
          isOpen={isOpen}
          isSubmitting={isSubmitting}
          onClose={() => setIsOpen(false)}
          onApprove={handleApprove}
          onReject={handleReject}
        />
      </>
    );
  },
  args: {
    request: mockPendingExportRequest,
    labels: mockLabels,
    userName: 'Alice Johnson',
    userEmail: 'alice@example.com',
    daysRemaining: 24,
    requestedDate: 'Jan 20, 2025',
    requestedTime: '10:00 AM',
    expiresDate: 'Feb 19, 2025',
    expiresTime: '10:00 AM',
  },
};

export const Norwegian: Story = {
  args: {
    ...PendingExportRequest.args,
    labels: {
      title: 'GDPR-forespørselsdetaljer',
      loading: 'Laster forespørselsdetaljer...',
      loadError: 'Kunne ikke laste forespørselsdetaljer',
      requestTypeLabel: 'Forespørselstype',
      userLabel: 'Bruker',
      requestedDateLabel: 'Forespurt dato',
      expiresLabel: 'Utløper',
      processedLabel: 'Behandlet',
      processedByLabel: 'Behandlet av',
      rejectionReasonLabel: 'Avvisningsårsak',
      requestIdLabel: 'Forespørsels-ID',
      userIdLabel: 'Bruker-ID',
      atLabel: 'kl',
      daysRemainingLabel: '{count} dager igjen',
      statusPending: 'Venter',
      statusProcessing: 'Behandler',
      statusCompleted: 'Fullført',
      statusRejected: 'Avvist',
      typeExport: 'Dataeksport',
      typeDeletion: 'Datasletting',
      cancel: 'Avbryt',
      close: 'Lukk',
      back: 'Tilbake',
      reject: 'Avvis',
      approve: 'Godkjenn',
      approving: 'Godkjenner...',
      rejecting: 'Avviser...',
      confirmReject: 'Bekreft avvisning',
      warning: 'Advarsel',
      deletionWarning:
        'Dette er en forespørsel om datasletting. Godkjenning vil permanent slette alle brukerdata. Denne handlingen kan ikke angres.',
      rejectFormTitle: 'Årsak til avvisning',
      rejectFormDescription:
        'Vennligst oppgi en årsak for å avvise denne GDPR-forespørselen. Dette vil bli sendt til brukeren.',
      rejectFormPlaceholder: 'Skriv inn avvisningsårsak...',
    },
  },
};
