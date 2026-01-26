/**
 * NotificationDeliveryDashboard Stories
 *
 * Demonstrates the pure presentational notification delivery monitoring dashboard.
 */

import type { Meta, StoryObj } from '@storybook/react';
import { NotificationDeliveryDashboard } from '../../features/notification-reports';
import type {
  NotificationDeliveryDashboardLabels,
  DeliveryReport,
} from '../../features/notification-reports';

const meta: Meta<typeof NotificationDeliveryDashboard> = {
  title: 'Components/NotificationDeliveryDashboard',
  component: NotificationDeliveryDashboard,
  parameters: {
    layout: 'fullscreen',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof NotificationDeliveryDashboard>;

// Default labels (English)
const defaultLabels: NotificationDeliveryDashboardLabels = {
  title: 'Notification Delivery Reports',
  description: 'Monitor notification delivery status and troubleshoot failed deliveries',
  totalLabel: 'Total',
  sentLabel: 'Sent',
  pendingLabel: 'Pending',
  failedLabel: 'Failed',
  deliveredLabel: 'Delivered',
  searchPlaceholder: 'Search by recipient or subject...',
  retryFailedLabel: 'Retry Failed',
  retryingLabel: 'Retrying...',
  loadingLabel: 'Loading reports...',
  emptyTitle: 'No notification reports found',
  emptySearchHint: 'Try adjusting your search criteria',
  emptyNoData: 'No notifications have been sent yet',
  typeHeader: 'Type',
  recipientHeader: 'Recipient',
  subjectHeader: 'Subject',
  statusHeader: 'Status',
  attemptsHeader: 'Attempts',
  lastAttemptHeader: 'Last Attempt',
  showingOfTotal: 'Showing {count} of {total} total',
  emailTypeLabel: 'Email',
  smsTypeLabel: 'SMS',
  pushTypeLabel: 'Push',
  inAppTypeLabel: 'In-App',
};

// Norwegian labels
const norwegianLabels: NotificationDeliveryDashboardLabels = {
  title: 'Varslingsleveranserapporter',
  description: 'Overvåk varslingsleveransstatus og feilsøk mislykkede leveranser',
  totalLabel: 'Totalt',
  sentLabel: 'Sendt',
  pendingLabel: 'Venter',
  failedLabel: 'Mislyktes',
  deliveredLabel: 'Levert',
  searchPlaceholder: 'Søk etter mottaker eller emne...',
  retryFailedLabel: 'Prøv på nytt mislykkede',
  retryingLabel: 'Prøver på nytt...',
  loadingLabel: 'Laster rapporter...',
  emptyTitle: 'Ingen varselsrapporter funnet',
  emptySearchHint: 'Prøv å justere søkekriteriene dine',
  emptyNoData: 'Ingen varsler er sendt ennå',
  typeHeader: 'Type',
  recipientHeader: 'Mottaker',
  subjectHeader: 'Emne',
  statusHeader: 'Status',
  attemptsHeader: 'Forsøk',
  lastAttemptHeader: 'Siste forsøk',
  showingOfTotal: 'Viser {count} av {total} totalt',
  emailTypeLabel: 'E-post',
  smsTypeLabel: 'SMS',
  pushTypeLabel: 'Push',
  inAppTypeLabel: 'I appen',
};

// Mock data
const mockReports: DeliveryReport[] = [
  {
    id: '1',
    type: 'email',
    recipient: 'user@example.com',
    subject: 'Welcome to the platform',
    status: 'delivered',
    attemptCount: 1,
    lastAttemptAt: '2025-01-26T10:30:00Z',
    createdAt: '2025-01-26T10:28:00Z',
  },
  {
    id: '2',
    type: 'sms',
    recipient: '+47 123 45 678',
    subject: undefined,
    status: 'sent',
    attemptCount: 1,
    lastAttemptAt: '2025-01-26T10:25:00Z',
    createdAt: '2025-01-26T10:24:00Z',
  },
  {
    id: '3',
    type: 'push',
    recipient: 'device-token-abc123',
    subject: 'New message from admin',
    status: 'failed',
    attemptCount: 3,
    lastAttemptAt: '2025-01-26T10:20:00Z',
    createdAt: '2025-01-26T10:10:00Z',
  },
  {
    id: '4',
    type: 'in_app',
    recipient: 'user-id-456',
    subject: 'System maintenance scheduled',
    status: 'pending',
    attemptCount: 0,
    lastAttemptAt: undefined,
    createdAt: '2025-01-26T10:15:00Z',
  },
  {
    id: '5',
    type: 'email',
    recipient: 'admin@example.com',
    subject: 'Password reset request',
    status: 'delivered',
    attemptCount: 1,
    lastAttemptAt: '2025-01-26T09:50:00Z',
    createdAt: '2025-01-26T09:49:00Z',
  },
];

const manyReports: DeliveryReport[] = Array.from({ length: 50 }, (_, i) => ({
  id: `report-${i}`,
  type: ['email', 'sms', 'push', 'in_app'][i % 4] as DeliveryReport['type'],
  recipient: `recipient-${i}@example.com`,
  subject: i % 3 === 0 ? undefined : `Subject ${i}`,
  status: ['sent', 'delivered', 'pending', 'failed'][i % 4] as DeliveryReport['status'],
  attemptCount: (i % 3) + 1,
  lastAttemptAt: i % 5 === 0 ? undefined : new Date(Date.now() - i * 60000).toISOString(),
  createdAt: new Date(Date.now() - i * 120000).toISOString(),
}));

// Stories

export const Default: Story = {
  args: {
    reports: mockReports,
    labels: defaultLabels,
    isLoading: false,
    totalCount: mockReports.length,
  },
};

export const Loading: Story = {
  args: {
    reports: [],
    labels: defaultLabels,
    isLoading: true,
  },
};

export const Empty: Story = {
  args: {
    reports: [],
    labels: defaultLabels,
    isLoading: false,
  },
};

export const EmptyWithSearch: Story = {
  args: {
    reports: [],
    labels: defaultLabels,
    isLoading: false,
    searchValue: 'no results',
  },
};

export const WithFailedNotifications: Story = {
  args: {
    reports: [
      ...mockReports,
      {
        id: '6',
        type: 'email',
        recipient: 'failed@example.com',
        subject: 'Test notification',
        status: 'failed',
        attemptCount: 5,
        lastAttemptAt: '2025-01-26T10:00:00Z',
        createdAt: '2025-01-26T09:00:00Z',
      },
      {
        id: '7',
        type: 'sms',
        recipient: '+47 999 88 777',
        subject: undefined,
        status: 'failed',
        attemptCount: 3,
        lastAttemptAt: '2025-01-26T09:45:00Z',
        createdAt: '2025-01-26T09:30:00Z',
      },
    ],
    labels: defaultLabels,
    isLoading: false,
    onRetryFailed: () => console.log('Retry failed notifications'),
  },
};

export const Retrying: Story = {
  args: {
    reports: mockReports,
    labels: defaultLabels,
    isLoading: false,
    isRetrying: true,
    onRetryFailed: () => console.log('Retry in progress'),
  },
};

export const ManyReports: Story = {
  args: {
    reports: manyReports,
    labels: defaultLabels,
    isLoading: false,
    totalCount: 150,
  },
};

export const WithSearch: Story = {
  args: {
    reports: mockReports.filter((r) => r.recipient.includes('user')),
    labels: defaultLabels,
    isLoading: false,
    searchValue: 'user',
    totalCount: mockReports.length,
  },
};

export const Norwegian: Story = {
  args: {
    reports: mockReports,
    labels: norwegianLabels,
    isLoading: false,
    totalCount: mockReports.length,
  },
};

export const Interactive: Story = {
  args: {
    reports: mockReports,
    labels: defaultLabels,
    isLoading: false,
    totalCount: mockReports.length,
    onSearchChange: (value: string) => console.log('Search changed:', value),
    onSearch: (value: string) => console.log('Search submitted:', value),
    onRetryFailed: () => console.log('Retry failed clicked'),
  },
};
