/**
 * BookingsWidget
 *
 * Mobile-first responsive bookings widget using @xala-technologies/platform-ui.
 * Includes export functionality (CSV download).
 */

import { useState, useMemo, useEffect, useCallback } from 'react';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Table,
  BookingStatusBadge,
  useDialog,
  CalendarIcon,
  ClockIcon,
  DownloadIcon,
  Link,
  DashboardPageHeader,
  StatCard,
  ListToolbar,
  EmptyState,
  Spinner,
  type ListToolbarFilter,
} from '@xala-technologies/platform-ui';
import {
  useCancelBooking,
  type BookingStatus,
  type Booking,
  formatDate,
  formatTime,
} from '@digilist/client-sdk';

// Types
export interface BookingsWidgetProps {
  /** Translation function */
  t: (key: string) => string;
  /** Current locale (e.g., 'en', 'nb') */
  locale: string;
  /** All bookings data */
  data: { data: Booking[] } | undefined;
  /** Loading state */
  isLoading: boolean;
  /** Offline mode indicator */
  isOffline?: boolean;
  /** Cached data indicator */
  isCached?: boolean;
  /** Web app URL for new bookings */
  webAppUrl?: string;
}

// Mobile breakpoint
const MOBILE_BREAKPOINT = 768;

/**
 * Export bookings to CSV and download
 */
function exportBookingsToCSV(
  bookings: Booking[],
  t: (key: string) => string,
  locale: string
): void {
  // CSV headers
  const headers = [
    t('bookings.resource'),
    t('bookings.date'),
    t('bookings.startTime'),
    t('bookings.endTime'),
    t('label.status'),
    t('label.price'),
  ];

  // CSV rows
  const rows = bookings.map((booking) => [
    booking.listingName || booking.rentalObjectId,
    formatDate(booking.startTime),
    formatTime(booking.startTime),
    formatTime(booking.endTime),
    booking.status,
    parseFloat(booking.totalPrice ?? '0').toLocaleString(
      locale === 'en' ? 'en-US' : 'nb-NO'
    ),
  ]);

  // Build CSV content
  const csvContent = [
    headers.join(','),
    ...rows.map((row) =>
      row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(',')
    ),
  ].join('\n');

  // Create and download file
  const blob = new Blob(['\uFEFF' + csvContent], {
    type: 'text/csv;charset=utf-8;',
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}

export function BookingsWidget({
  t,
  locale,
  data,
  isLoading,
  isOffline = false,
  isCached = false,
  webAppUrl = 'https://digilist.no',
}: BookingsWidgetProps) {
  const [statusFilter, setStatusFilter] = useState<BookingStatus | undefined>(
    undefined
  );
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < MOBILE_BREAKPOINT : false
  );

  // Track viewport size for mobile/desktop detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < MOBILE_BREAKPOINT);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Filter bookings client-side based on statusFilter
  const bookings = useMemo(() => {
    const allBookings = data?.data ?? [];
    if (!statusFilter) return allBookings;

    // Handle status mapping for canonical states
    if (statusFilter === 'confirmed') {
      return allBookings.filter(
        (b) => b.status === 'confirmed' || (b.status as string) === 'approved'
      );
    }
    if (statusFilter === 'pending') {
      return allBookings.filter(
        (b) =>
          b.status === 'pending' || (b.status as string) === 'pending_approval'
      );
    }
    if (statusFilter === 'cancelled') {
      return allBookings.filter(
        (b) => b.status === 'cancelled' || (b.status as string) === 'rejected'
      );
    }
    return allBookings.filter((b) => b.status === statusFilter);
  }, [data, statusFilter]);

  const cancelBooking = useCancelBooking();
  const { confirm } = useDialog();

  const handleCancel = useCallback(
    async (id: string) => {
      const confirmed = await confirm({
        title: t('bookings.cancelBooking'),
        description: t('bookings.confirmCancel'),
        confirmText: t('bookings.cancel'),
        cancelText: t('common.abort'),
        variant: 'danger',
      });
      if (confirmed) {
        await cancelBooking.mutateAsync({ id });
      }
    },
    [confirm, t, cancelBooking]
  );

  const handleExport = useCallback(() => {
    exportBookingsToCSV(bookings, t, locale);
  }, [bookings, t, locale]);

  // Calculate stats from actual booking data
  const stats = useMemo(() => {
    const allBookings = data?.data ?? [];
    const total = allBookings.length;

    const confirmed = allBookings.filter(
      (b) => b.status === 'confirmed' || (b.status as string) === 'approved'
    ).length;
    const pending = allBookings.filter(
      (b) => b.status === 'pending' || (b.status as string) === 'pending_approval'
    ).length;
    const cancelled = allBookings.filter(
      (b) => b.status === 'cancelled' || (b.status as string) === 'rejected'
    ).length;

    return { total, confirmed, pending, cancelled };
  }, [data]);

  // Filter configuration for ListToolbar
  const statusFilters: ListToolbarFilter[] = [
    {
      id: 'status',
      label: t('label.status'),
      options: [
        { id: 'all', label: t('bookings.all'), count: stats.total },
        { id: 'confirmed', label: t('booking.confirmed'), count: stats.confirmed },
        { id: 'pending', label: t('requests.pending'), count: stats.pending },
        { id: 'cancelled', label: t('state.cancelled'), count: stats.cancelled },
      ],
    },
  ];

  const handleFilterChange = useCallback(
    (filterId: string, value: string | undefined) => {
      if (filterId === 'status') {
        if (value === 'all' || !value) {
          setStatusFilter(undefined);
        } else {
          setStatusFilter(value as BookingStatus);
        }
      }
    },
    []
  );

  // Primary action buttons
  const primaryActions = (
    <>
      {bookings.length > 0 && (
        <Button
          data-testid="export-bookings-button"
          type="button"
          variant="secondary"
          data-size="md"
          onClick={handleExport}
        >
          <DownloadIcon />
          {t('action.export')}
        </Button>
      )}
      <Link href={webAppUrl} target="_blank" rel="noopener noreferrer">
        <Button
          data-testid="create-booking-button"
          type="button"
          variant="primary"
          data-size="md"
        >
          {t('dashboard.bookNow')}
        </Button>
      </Link>
    </>
  );

  return (
    <>
      {/* Offline Indicator */}
      {isOffline && isCached && (
        <Card
          data-color="warning"
          style={{
            padding: 'var(--ds-spacing-4)',
            borderLeft: '4px solid var(--ds-color-warning-border-default)',
            marginBottom: 'var(--ds-spacing-6)',
          }}
        >
          <Paragraph
            data-size="sm"
            style={{
              margin: 0,
              fontWeight: 'var(--ds-font-weight-semibold)',
              color: 'var(--ds-color-warning-text-default)',
            }}
          >
            {t('dashboard.offlineMode')}
          </Paragraph>
          <Paragraph
            data-size="xs"
            style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
          >
            {t('dashboard.viewingCachedBookings')}
          </Paragraph>
        </Card>
      )}

      {/* Page Header */}
      <DashboardPageHeader
        title={t('dashboard.myBookings')}
        subtitle={t('dashboard.myBookingsDesc')}
        primaryAction={!isMobile ? primaryActions : undefined}
      />

      {/* Mobile primary actions */}
      {isMobile && (
        <div
          style={{
            display: 'flex',
            gap: 'var(--ds-spacing-2)',
            marginBottom: 'var(--ds-spacing-4)',
          }}
        >
          {primaryActions}
        </div>
      )}

      {/* Stats Cards */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: isMobile ? '1fr' : 'repeat(3, 1fr)',
          gap: 'var(--ds-spacing-4)',
          marginBottom: 'var(--ds-spacing-6)',
        }}
      >
        <StatCard
          title={t('booking.confirmed')}
          value={stats.confirmed}
          color="var(--ds-color-success-text-default)"
        />
        <StatCard
          title={t('requests.pending')}
          value={stats.pending}
          color="var(--ds-color-warning-text-default)"
        />
        <StatCard title={t('state.cancelled')} value={stats.cancelled} />
      </div>

      {/* Filters */}
      <ListToolbar
        filters={statusFilters}
        activeFilters={{ status: statusFilter ?? 'all' }}
        onFilterChange={handleFilterChange}
        resultsCount={bookings.length}
        resultsLabel={t('dashboard.myBookings') || 'bookings'}
        variant="compact"
        data-testid="bookings-toolbar"
      />

      {/* Bookings List */}
      {isLoading ? (
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            padding: 'var(--ds-spacing-8)',
          }}
        >
          <Spinner aria-label={t('state.loading')} data-size="lg" />
        </div>
      ) : bookings.length === 0 ? (
        <EmptyState
          icon={<CalendarIcon size={48} />}
          title={t('dashboard.noUpcomingBookings')}
          action={{
            label: t('dashboard.bookNow'),
            onClick: () => window.open(webAppUrl, '_blank'),
          }}
          bordered
        />
      ) : isMobile ? (
        <MobileBookingsList
          bookings={bookings}
          t={t}
          locale={locale}
          onCancel={handleCancel}
          isCancelling={cancelBooking.isPending}
        />
      ) : (
        <DesktopBookingsTable
          bookings={bookings}
          t={t}
          locale={locale}
          onCancel={handleCancel}
          isCancelling={cancelBooking.isPending}
        />
      )}
    </>
  );
}

// Mobile card-based layout
interface BookingListProps {
  bookings: Booking[];
  t: (key: string) => string;
  locale: string;
  onCancel: (id: string) => Promise<void>;
  isCancelling: boolean;
}

function MobileBookingsList({
  bookings,
  t,
  locale,
  onCancel,
  isCancelling,
}: BookingListProps) {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-3)',
        marginTop: 'var(--ds-spacing-4)',
      }}
    >
      {bookings.map((booking) => (
        <Card
          key={booking.id}
          data-testid={`booking-row-${booking.id}`}
          style={{ padding: 'var(--ds-spacing-4)' }}
        >
          {/* Resource Name & Status */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'flex-start',
              marginBottom: 'var(--ds-spacing-3)',
            }}
          >
            <Heading
              level={3}
              data-size="sm"
              data-testid="booking-title"
              style={{ margin: 0, fontWeight: 'var(--ds-font-weight-semibold)' }}
            >
              {booking.listingName || booking.rentalObjectId}
            </Heading>
            <div data-testid="booking-status-badge">
              <BookingStatusBadge status={booking.status} />
            </div>
          </div>

          {/* Date & Time */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-2)',
              marginBottom: 'var(--ds-spacing-2)',
            }}
          >
            <CalendarIcon
              style={{
                width: '16px',
                height: '16px',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            />
            <Paragraph
              data-size="sm"
              style={{ margin: 0, color: 'var(--ds-color-neutral-text-default)' }}
            >
              {formatDate(booking.startTime)}
            </Paragraph>
          </div>

          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-2)',
              marginBottom: 'var(--ds-spacing-3)',
            }}
          >
            <ClockIcon
              style={{
                width: '16px',
                height: '16px',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            />
            <Paragraph
              data-size="sm"
              style={{ margin: 0, color: 'var(--ds-color-neutral-text-default)' }}
            >
              {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
            </Paragraph>
          </div>

          {/* Price */}
          <Paragraph
            data-size="md"
            style={{
              margin: 0,
              marginBottom: 'var(--ds-spacing-4)',
              fontWeight: 'var(--ds-font-weight-semibold)',
              color: 'var(--ds-color-neutral-text-default)',
            }}
          >
            {parseFloat(booking.totalPrice ?? '0').toLocaleString(
              locale === 'en' ? 'en-US' : 'nb-NO'
            )}{' '}
            kr
          </Paragraph>

          {/* Actions */}
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', width: '100%' }}>
            {booking.status !== 'cancelled' && (
              <Button
                data-testid="cancel-button"
                type="button"
                variant="secondary"
                data-size="sm"
                onClick={() => onCancel(booking.id)}
                disabled={isCancelling}
                style={{ flex: 1, minHeight: '44px' }}
              >
                {t('action.cancel')}
              </Button>
            )}
            <Button
              data-testid="view-details-button"
              type="button"
              variant="tertiary"
              data-size="sm"
              style={{ flex: 1, minHeight: '44px' }}
            >
              {t('common.details')}
            </Button>
          </div>
        </Card>
      ))}
    </div>
  );
}

// Desktop table layout
function DesktopBookingsTable({
  bookings,
  t,
  locale,
  onCancel,
  isCancelling,
}: BookingListProps) {
  return (
    <Card style={{ padding: 0, overflow: 'hidden', marginTop: 'var(--ds-spacing-4)' }}>
      <Table>
        <Table.Head>
          <Table.Row>
            <Table.HeaderCell>{t('bookings.resource')}</Table.HeaderCell>
            <Table.HeaderCell>{t('bookings.timespan')}</Table.HeaderCell>
            <Table.HeaderCell>{t('label.status')}</Table.HeaderCell>
            <Table.HeaderCell>{t('label.price')}</Table.HeaderCell>
            <Table.HeaderCell style={{ width: '80px' }}>
              {t('common.actions')}
            </Table.HeaderCell>
          </Table.Row>
        </Table.Head>
        <Table.Body>
          {bookings.map((booking) => (
            <Table.Row key={booking.id} data-testid={`booking-row-${booking.id}`}>
              <Table.Cell>
                <span
                  data-testid="booking-title"
                  style={{ fontWeight: 'var(--ds-font-weight-medium)' }}
                >
                  {booking.listingName || booking.rentalObjectId}
                </span>
              </Table.Cell>
              <Table.Cell>
                <div>
                  <span
                    style={{
                      fontSize: 'var(--ds-font-size-sm)',
                      fontWeight: 'var(--ds-font-weight-medium)',
                    }}
                  >
                    {formatDate(booking.startTime)}
                  </span>
                  <Paragraph
                    data-size="xs"
                    style={{ margin: 0, color: 'var(--ds-color-neutral-text-default)' }}
                  >
                    {formatTime(booking.startTime)} - {formatTime(booking.endTime)}
                  </Paragraph>
                </div>
              </Table.Cell>
              <Table.Cell>
                <div data-testid="booking-status-badge">
                  <BookingStatusBadge status={booking.status} />
                </div>
              </Table.Cell>
              <Table.Cell>
                {parseFloat(booking.totalPrice ?? '0').toLocaleString(
                  locale === 'en' ? 'en-US' : 'nb-NO'
                )}{' '}
                kr
              </Table.Cell>
              <Table.Cell>
                <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
                  {booking.status !== 'cancelled' && (
                    <Button
                      data-testid="cancel-button"
                      type="button"
                      variant="secondary"
                      data-size="sm"
                      onClick={() => onCancel(booking.id)}
                      disabled={isCancelling}
                    >
                      {t('action.cancel')}
                    </Button>
                  )}
                  <Button
                    data-testid="view-details-button"
                    type="button"
                    variant="tertiary"
                    data-size="sm"
                  >
                    {t('common.details')}
                  </Button>
                </div>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </Card>
  );
}
