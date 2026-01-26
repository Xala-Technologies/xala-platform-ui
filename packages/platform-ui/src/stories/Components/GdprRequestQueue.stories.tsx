/**
 * Storybook Stories: GdprRequestQueue
 *
 * Pure presentational component for GDPR request queue management.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  GdprRequestQueue,
  type GdprRequestQueueLabels,
  type GdprRequestDisplayVM,
  type GdprSortOption,
} from '../../features/gdpr';

// =============================================================================
// Mock Data
// =============================================================================

const mockLabels: GdprRequestQueueLabels = {
  searchPlaceholder: 'Search by name, email, type, or ID...',
  sortButtonLabel: 'Sort',
  showingResults: 'Showing {shown} of {total} requests',
  loadingRequests: 'Loading GDPR requests...',
  noPendingRequests: 'No pending GDPR requests',
  noRequestsFound: 'No requests found matching your search',
  resetSearch: 'Reset Search',
  unknownUser: 'Unknown User',
  copyId: 'Copy Request ID',
  actions: 'Actions',
  viewDetails: 'View Details',
  daysRemainingLabel: '{count} days',
  loadingLabel: 'Loading...',
  userHeader: 'User',
  typeHeader: 'Type',
  statusHeader: 'Status',
  requestedHeader: 'Requested',
  daysRemainingHeader: 'Days Remaining',
  idHeader: 'ID',
  statusPending: 'Pending',
  statusProcessing: 'Processing',
  statusCompleted: 'Completed',
  statusRejected: 'Rejected',
  typeExport: 'Data Export',
  typeDeletion: 'Data Deletion',
};

const mockSortOptions: GdprSortOption[] = [
  { id: 'urgency-asc', label: 'Most Urgent First', field: 'daysRemaining', order: 'asc' },
  { id: 'urgency-desc', label: 'Least Urgent First', field: 'daysRemaining', order: 'desc' },
  { id: 'date-desc', label: 'Newest First', field: 'requestedAt', order: 'desc' },
  { id: 'date-asc', label: 'Oldest First', field: 'requestedAt', order: 'asc' },
];

const mockRequests: GdprRequestDisplayVM[] = [
  {
    id: '550e8400-e29b-41d4-a716-446655440000',
    userId: 'user-123',
    userName: 'Alice Johnson',
    userEmail: 'alice@example.com',
    requestType: 'export',
    status: 'pending',
    requestedAt: '2025-01-20T10:00:00Z',
    expiresAt: '2025-02-19T10:00:00Z',
    daysRemaining: 24,
    requestedDate: 'Jan 20, 2025',
  },
  {
    id: '6ba7b810-9dad-11d1-80b4-00c04fd430c8',
    userId: 'user-456',
    userName: 'Bob Smith',
    userEmail: 'bob@example.com',
    requestType: 'deletion',
    status: 'pending',
    requestedAt: '2025-01-15T14:30:00Z',
    expiresAt: '2025-02-14T14:30:00Z',
    daysRemaining: 19,
    requestedDate: 'Jan 15, 2025',
  },
  {
    id: '7c9e6679-7425-40de-944b-e07fc1f90ae7',
    userId: 'user-789',
    userName: 'Charlie Davis',
    userEmail: 'charlie@example.com',
    requestType: 'export',
    status: 'pending',
    requestedAt: '2025-01-10T09:15:00Z',
    expiresAt: '2025-02-09T09:15:00Z',
    daysRemaining: 14,
    requestedDate: 'Jan 10, 2025',
  },
  {
    id: '3fa85f64-5717-4562-b3fc-2c963f66afa6',
    userId: 'user-101',
    userName: 'Diana Prince',
    userEmail: 'diana@example.com',
    requestType: 'deletion',
    status: 'pending',
    requestedAt: '2025-01-23T16:00:00Z',
    expiresAt: '2025-02-22T16:00:00Z',
    daysRemaining: 27,
    requestedDate: 'Jan 23, 2025',
  },
  {
    id: '8f9e8679-8425-50de-a44b-f17fc2f90bf8',
    userId: 'user-202',
    userName: 'Eve Wilson',
    userEmail: 'eve@example.com',
    requestType: 'export',
    status: 'pending',
    requestedAt: '2025-01-24T11:20:00Z',
    expiresAt: '2025-02-23T11:20:00Z',
    daysRemaining: 28,
    requestedDate: 'Jan 24, 2025',
  },
];

const urgentRequests: GdprRequestDisplayVM[] = [
  {
    id: 'urgent-001',
    userId: 'user-urgent-1',
    userName: 'Frank Miller',
    userEmail: 'frank@example.com',
    requestType: 'deletion',
    status: 'pending',
    requestedAt: '2025-01-03T08:00:00Z',
    expiresAt: '2025-02-02T08:00:00Z',
    daysRemaining: 2,
    requestedDate: 'Jan 3, 2025',
  },
  {
    id: 'urgent-002',
    userId: 'user-urgent-2',
    userName: 'Grace Lee',
    userEmail: 'grace@example.com',
    requestType: 'export',
    status: 'pending',
    requestedAt: '2025-01-01T12:00:00Z',
    expiresAt: '2025-01-31T12:00:00Z',
    daysRemaining: 5,
    requestedDate: 'Jan 1, 2025',
  },
];

// =============================================================================
// Meta Configuration
// =============================================================================

const meta: Meta<typeof GdprRequestQueue> = {
  title: 'Features/GDPR/GdprRequestQueue',
  component: GdprRequestQueue,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Pure presentational component for displaying GDPR data subject rights requests. Shows requests with 30-day GDPR timeline tracking.',
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof GdprRequestQueue>;

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    requests: mockRequests,
    labels: mockLabels,
    sortOptions: mockSortOptions,
    selectedSort: 'urgency-asc',
    searchValue: '',
    isLoading: false,
    totalCount: mockRequests.length,
    copiedId: null,
    onSearchChange: (value) => console.log('Search change:', value),
    onSearchSubmit: () => console.log('Search submitted'),
    onSortChange: (sortId) => console.log('Sort changed:', sortId),
    onRequestClick: (request) => console.log('Request clicked:', request),
    onCopyId: (id) => {
      navigator.clipboard.writeText(id);
      console.log('Copied ID:', id);
    },
    onResetSearch: () => console.log('Reset search'),
  },
};

export const Loading: Story = {
  args: {
    ...Default.args,
    requests: [],
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    ...Default.args,
    requests: [],
    isLoading: false,
  },
};

export const EmptyWithSearch: Story = {
  args: {
    ...Default.args,
    requests: [],
    searchValue: 'nonexistent',
    isLoading: false,
  },
};

export const UrgentRequests: Story = {
  args: {
    ...Default.args,
    requests: urgentRequests,
    totalCount: urgentRequests.length,
  },
};

export const ManyRequests: Story = {
  args: {
    ...Default.args,
    requests: Array.from({ length: 50 }, (_, i) => ({
      id: `request-${i}`,
      userId: `user-${i}`,
      userName: `User ${i}`,
      userEmail: `user${i}@example.com`,
      requestType: i % 2 === 0 ? 'export' : 'deletion',
      status: 'pending',
      requestedAt: new Date(2025, 0, Math.floor(i / 2) + 1).toISOString(),
      expiresAt: new Date(2025, 1, Math.floor(i / 2) + 1).toISOString(),
      daysRemaining: 30 - Math.floor(i / 2),
      requestedDate: `Jan ${Math.floor(i / 2) + 1}, 2025`,
    })) as GdprRequestDisplayVM[],
    totalCount: 50,
  },
};

export const WithCopiedId: Story = {
  args: {
    ...Default.args,
    copiedId: mockRequests[0].id,
  },
};

export const Interactive: Story = {
  render: (args) => {
    const [searchValue, setSearchValue] = useState('');
    const [selectedSort, setSelectedSort] = useState('urgency-asc');
    const [copiedId, setCopiedId] = useState<string | null>(null);

    const handleCopyId = (id: string) => {
      navigator.clipboard.writeText(id);
      setCopiedId(id);
      setTimeout(() => setCopiedId(null), 2000);
    };

    return (
      <GdprRequestQueue
        {...args}
        searchValue={searchValue}
        selectedSort={selectedSort}
        copiedId={copiedId}
        onSearchChange={setSearchValue}
        onSearchSubmit={() => console.log('Search:', searchValue)}
        onSortChange={setSelectedSort}
        onCopyId={handleCopyId}
        onResetSearch={() => setSearchValue('')}
      />
    );
  },
  args: {
    requests: mockRequests,
    labels: mockLabels,
    sortOptions: mockSortOptions,
    onRequestClick: (request) => console.log('Request clicked:', request),
  },
};

export const WithUnknownUsers: Story = {
  args: {
    ...Default.args,
    requests: [
      {
        id: 'unknown-001',
        userId: '550e8400-e29b-41d4-a716-446655440000',
        userName: '550e8400-e29b-41d4-a716-446655440000',
        requestType: 'export',
        status: 'pending',
        requestedAt: '2025-01-20T10:00:00Z',
        expiresAt: '2025-02-19T10:00:00Z',
        daysRemaining: 24,
        requestedDate: 'Jan 20, 2025',
      },
    ],
  },
};

export const Norwegian: Story = {
  args: {
    ...Default.args,
    labels: {
      searchPlaceholder: 'Søk etter navn, e-post, type eller ID...',
      sortButtonLabel: 'Sorter',
      showingResults: 'Viser {shown} av {total} forespørsler',
      loadingRequests: 'Laster GDPR-forespørsler...',
      noPendingRequests: 'Ingen ventende GDPR-forespørsler',
      noRequestsFound: 'Ingen forespørsler funnet',
      resetSearch: 'Tilbakestill søk',
      unknownUser: 'Ukjent bruker',
      copyId: 'Kopier forespørsels-ID',
      actions: 'Handlinger',
      viewDetails: 'Vis detaljer',
      daysRemainingLabel: '{count} dager',
      loadingLabel: 'Laster...',
      userHeader: 'Bruker',
      typeHeader: 'Type',
      statusHeader: 'Status',
      requestedHeader: 'Forespurt',
      daysRemainingHeader: 'Dager igjen',
      idHeader: 'ID',
      statusPending: 'Venter',
      statusProcessing: 'Behandler',
      statusCompleted: 'Fullført',
      statusRejected: 'Avvist',
      typeExport: 'Dataeksport',
      typeDeletion: 'Datasletting',
    },
  },
};
