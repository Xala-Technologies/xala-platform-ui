/**
 * BookingsWidget
 *
 * Comprehensive booking management widget for backoffice.
 * Handles listing, filtering, search, bulk actions, and approval workflow.
 *
 * Uses @xala-technologies/platform-ui components only.
 */

import { useState, useMemo, useCallback } from 'react';
import {
  Button,
  Paragraph,
  Spinner,
  Table,
  Checkbox,
  Dropdown,
  HeaderSearch,
  Drawer,
  DrawerSection,
  DrawerItem,
  Stack,
  Text,
  BookingStatusBadge,
  PaymentStatusBadge,
  CheckIcon,
  CloseIcon,
  MoreVerticalIcon,
  FilterIcon,
  DownloadIcon,
  useDialog,
  PageHeader,
  Dialog,
  Heading,
  Alert,
} from '@xala-technologies/platform-ui';
import {
  useBookingsVM,
  useBookings,
  useApproveBooking,
  useRejectBooking,
  useCancelBooking,
  type BookingStatus,
  type BookingVM,
} from '@digilist/client-sdk';
import { useT, useLocale } from '@xala-technologies/platform/i18n';

export interface BookingsWidgetProps {
  /** Navigation handler for viewing booking details */
  onViewBooking?: (bookingId: string) => void;
  /** Navigation handler for editing a booking */
  onEditBooking?: (bookingId: string) => void;
  /** Initial status filter tab */
  initialTab?: string;
}

// Status tabs for main navigation
const STATUS_TABS = [
  { id: 'all', labelKey: 'bookings.status.all', color: 'neutral' },
  { id: 'pending', labelKey: 'bookings.status.pending', color: 'warning' },
  { id: 'pending_approval', labelKey: 'bookings.status.pendingApproval', color: 'warning' },
  { id: 'approved', labelKey: 'bookings.status.approved', color: 'success' },
  { id: 'confirmed', labelKey: 'bookings.status.confirmed', color: 'success' },
  { id: 'rejected', labelKey: 'bookings.status.rejected', color: 'danger' },
  { id: 'cancelled', labelKey: 'bookings.status.cancelled', color: 'danger' },
  { id: 'completed', labelKey: 'bookings.status.completed', color: 'info' },
] as const;

// Payment status filter options
const PAYMENT_OPTIONS = [
  { id: 'all', labelKey: 'bookings.payment.all' },
  { id: 'paid', labelKey: 'bookings.payment.paid' },
  { id: 'unpaid', labelKey: 'bookings.payment.unpaid' },
  { id: 'refunded', labelKey: 'bookings.payment.refunded' },
] as const;

// Sort options
const SORT_OPTIONS = [
  { id: 'date-desc', labelKey: 'bookings.sort.newestFirst' },
  { id: 'date-asc', labelKey: 'bookings.sort.oldestFirst' },
  { id: 'price-desc', labelKey: 'bookings.sort.highestPrice' },
  { id: 'price-asc', labelKey: 'bookings.sort.lowestPrice' },
] as const;

// Status color map
const STATUS_COLOR_MAP: Record<string, string> = {
  warning: 'var(--ds-color-warning-text-default)',
  success: 'var(--ds-color-success-text-default)',
  info: 'var(--ds-color-info-text-default)',
  danger: 'var(--ds-color-danger-text-default)',
  neutral: 'var(--ds-color-neutral-text-default)',
};

// Get booking reference from ID
function getBookingRef(id: string): string {
  if (id.includes('-')) {
    const firstSegment = id.split('-')[0];
    if (firstSegment && firstSegment !== '00000000') {
      return firstSegment.toUpperCase();
    }
    const nonZeroSegment = id.split('-').find(s => s && !/^0+$/.test(s));
    if (nonZeroSegment) return nonZeroSegment.toUpperCase();
  }
  const last8 = id.slice(-8);
  return last8 && last8 !== '00000000' ? last8.toUpperCase() : id.slice(0, 8).toUpperCase();
}

export function BookingsWidget({
  onViewBooking,
  onEditBooking,
  initialTab = 'all',
}: BookingsWidgetProps) {
  const t = useT();
  const { locale } = useLocale();
  const formatLocale = locale === 'en' ? 'en-US' : 'nb-NO';

  // State
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedIds, setSelectedIds] = useState<string[]>([]);
  const [searchValue, setSearchValue] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Approve dialog state
  const [approveDialogOpen, setApproveDialogOpen] = useState(false);
  const [bookingToApprove, setBookingToApprove] = useState<BookingVM | null>(null);
  const [isApproving, setIsApproving] = useState(false);
  const [statusMessage, setStatusMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Filter state
  const [activeTab, setActiveTab] = useState<string>(initialTab);
  const [selectedPayment, setSelectedPayment] = useState<string>('all');
  const [selectedSort, setSelectedSort] = useState<string>('date-desc');
  const [dateFrom, setDateFrom] = useState('');
  const [dateTo, setDateTo] = useState('');

  // Active filter count
  const activeFilterCount = [
    selectedPayment !== 'all',
    dateFrom,
    dateTo,
  ].filter(Boolean).length;

  // Build query params
  const bookingParams = useMemo(() => {
    const params: { status?: BookingStatus; from?: string; to?: string } = {};
    if (activeTab !== 'all') params.status = activeTab as BookingStatus;
    if (dateFrom) params.from = dateFrom;
    if (dateTo) params.to = dateTo;
    return Object.keys(params).length > 0 ? params : undefined;
  }, [activeTab, dateFrom, dateTo]);

  // For 'confirmed' tab, fetch all and filter client-side
  const fetchParams = useMemo(() => {
    if (activeTab === 'confirmed') {
      const params: { from?: string; to?: string } = {};
      if (dateFrom) params.from = dateFrom;
      if (dateTo) params.to = dateTo;
      return Object.keys(params).length > 0 ? params : undefined;
    }
    return bookingParams;
  }, [activeTab, bookingParams, dateFrom, dateTo]);

  // Fetch bookings with ViewModels
  const { bookings: bookingsData, isLoading } = useBookingsVM(fetchParams, {
    locale: formatLocale,
    includeNameMaps: true,
  });

  // Filter bookings client-side
  const bookings = useMemo(() => {
    let data = bookingsData ?? [];

    if (activeTab === 'confirmed') {
      data = data.filter((booking: BookingVM) =>
        booking.status === 'confirmed' || (booking.status as string) === 'approved'
      );
    }

    if (!searchQuery.trim()) return data;

    const query = searchQuery.toLowerCase();
    return data.filter((booking: BookingVM) => {
      const listingName = booking.rentalObjectDisplay.name || '';
      const userName = booking.guestDisplay.name || '';
      const orgName = booking.guestDisplay.organizationName || '';
      const bookingId = booking.id.toLowerCase();

      return (
        listingName.toLowerCase().includes(query) ||
        userName.toLowerCase().includes(query) ||
        orgName.toLowerCase().includes(query) ||
        bookingId.includes(query)
      );
    });
  }, [bookingsData, searchQuery, activeTab]);

  // Fetch counts for status tabs
  const { data: pendingData } = useBookings({ status: 'pending' });
  const { data: confirmedData } = useBookings({ status: 'confirmed' });
  const { data: approvedData } = useBookings({ status: 'approved' as BookingStatus });
  const { data: completedData } = useBookings({ status: 'completed' });
  const { data: cancelledData } = useBookings({ status: 'cancelled' });
  const { data: allData } = useBookings();

  const approveBooking = useApproveBooking();
  const rejectBooking = useRejectBooking();
  const cancelBooking = useCancelBooking();
  const { confirm } = useDialog();

  // Tab counts
  const confirmedCount = (confirmedData?.meta?.total ?? confirmedData?.data?.length ?? 0) +
    (approvedData?.meta?.total ?? approvedData?.data?.length ?? 0);
  const tabCounts: Record<string, number> = {
    pending: pendingData?.meta?.total ?? pendingData?.data?.length ?? 0,
    confirmed: confirmedCount,
    completed: completedData?.meta?.total ?? completedData?.data?.length ?? 0,
    cancelled: cancelledData?.meta?.total ?? cancelledData?.data?.length ?? 0,
    all: allData?.meta?.total ?? allData?.data?.length ?? 0,
  };

  const totalCount = bookingsData?.meta?.total || bookings.length;

  // Handlers
  const handleSearchChange = useCallback((value: string) => {
    setSearchValue(value);
  }, []);

  const handleSearch = useCallback((value: string) => {
    setSearchQuery(value || '');
  }, []);

  const handleApprove = async (booking: BookingVM) => {
    setBookingToApprove(booking);
    setApproveDialogOpen(true);
  };

  const confirmApprove = async () => {
    if (!bookingToApprove) return;

    setIsApproving(true);
    setStatusMessage(null);

    try {
      await approveBooking.mutateAsync({ id: bookingToApprove.id });
      setStatusMessage({ type: 'success', text: t('bookings.approveSuccess') });
      setApproveDialogOpen(false);
      setBookingToApprove(null);
      setTimeout(() => setStatusMessage(null), 3000);
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : t('bookings.approveFailed');
      setStatusMessage({ type: 'error', text: errorMessage });
    } finally {
      setIsApproving(false);
    }
  };

  const cancelApproveDialog = () => {
    setApproveDialogOpen(false);
    setBookingToApprove(null);
  };

  const handleReject = async (id: string) => {
    const confirmed = await confirm({
      title: t('bookings.action.rejectBooking'),
      description: t('bookings.confirmCancel'),
      confirmText: t('bookings.action.reject'),
      cancelText: t('common.abort'),
      variant: 'danger',
    });
    if (confirmed) {
      await rejectBooking.mutateAsync({ id, reason: 'Rejected by admin' });
    }
  };

  const handleCancel = async (id: string) => {
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
  };

  const handleCopyId = (id: string) => {
    navigator.clipboard.writeText(id);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const handleSelectAll = useCallback((selected: boolean) => {
    if (selected) {
      setSelectedIds(bookings.map((b) => b.id));
    } else {
      setSelectedIds([]);
    }
  }, [bookings]);

  const handleSelectOne = useCallback((id: string, selected: boolean) => {
    if (selected) {
      setSelectedIds((prev) => [...prev, id]);
    } else {
      setSelectedIds((prev) => prev.filter((i) => i !== id));
    }
  }, []);

  const resetFilters = useCallback(() => {
    setSelectedPayment('all');
    setSelectedSort('date-desc');
    setDateFrom('');
    setDateTo('');
  }, []);

  const handleView = (booking: BookingVM) => {
    onViewBooking?.(booking.id);
  };

  // Bulk actions
  const handleBulkConfirm = async () => {
    const confirmed = await confirm({
      title: t('bookings.bulkConfirm'),
      description: t('bookings.bulk.confirmApprove', { count: selectedIds.length }),
      confirmText: t('bookings.bulk.approveAll'),
      cancelText: t('common.abort'),
      variant: 'info',
    });
    if (confirmed) {
      for (const id of selectedIds) {
        await approveBooking.mutateAsync({ id });
      }
      setSelectedIds([]);
    }
  };

  const handleBulkCancel = async () => {
    const confirmed = await confirm({
      title: t('bookings.bulkCancel'),
      description: t('bookings.bulk.confirmReject', { count: selectedIds.length }),
      confirmText: t('bookings.bulk.rejectAll'),
      cancelText: t('common.abort'),
      variant: 'danger',
    });
    if (confirmed) {
      for (const id of selectedIds) {
        await cancelBooking.mutateAsync({ id });
      }
      setSelectedIds([]);
    }
  };

  const handleBulkExport = () => {
    const selectedBookings = bookings.filter(b => selectedIds.includes(b.id));
    const csvContent = [
      [t('bookings.csv.id'), t('bookings.csv.listing'), t('bookings.csv.user'), t('bookings.csv.startTime'), t('bookings.csv.endTime'), t('bookings.csv.status'), t('bookings.csv.price')].join(','),
      ...selectedBookings.map(b => [
        b.id,
        b.rentalObjectDisplay.name || b.rentalObjectDisplay.id,
        b.guestDisplay.name || b.guestDisplay.id,
        b.timeDisplay.startTime,
        b.timeDisplay.endTime,
        b.statusDisplay.label,
        b.paymentDisplay.total || 0,
      ].join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `bookings-${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
  };

  const allSelected = bookings.length > 0 && selectedIds.length === bookings.length;

  return (
    <>
      {/* Filter Drawer */}
      <Drawer
        isOpen={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        title={t('bookings.filter.page.title')}
        icon={<FilterIcon />}
        position="right"
        footer={
          <Stack gap="3">
            <Text style={{ textAlign: 'center', color: 'var(--ds-color-neutral-text-subtle)' }}>
              {t('bookings.filter.showingCount', { count: totalCount })}
            </Text>
            <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
              <Button type="button" variant="secondary" style={{ flex: 1 }} onClick={() => { resetFilters(); setIsFilterOpen(false); }}>
                {t('bookings.filter.reset')}
              </Button>
              <Button type="button" variant="primary" style={{ flex: 1 }} onClick={() => setIsFilterOpen(false)}>
                {t('bookings.filter.apply')}
              </Button>
            </div>
          </Stack>
        }
      >
        <DrawerSection title={t('rule.payment')} collapsible>
          <Stack gap="1">
            {PAYMENT_OPTIONS.map((payment) => (
              <DrawerItem
                key={payment.id}
                left={
                  <input
                    type="radio"
                    name="payment"
                    checked={selectedPayment === payment.id}
                    onChange={() => setSelectedPayment(payment.id)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--ds-color-accent-base-default)' }}
                  />
                }
                onClick={() => setSelectedPayment(payment.id)}
                selected={selectedPayment === payment.id}
              >
                <Text>{t(payment.labelKey)}</Text>
              </DrawerItem>
            ))}
          </Stack>
        </DrawerSection>

        <DrawerSection title={t('bookings.filter.datePeriod')} collapsible defaultCollapsed>
          <Stack gap="3">
            <div>
              <Text data-size="sm" style={{ marginBottom: 'var(--ds-spacing-1)', color: 'var(--ds-color-neutral-text-subtle)' }}>
                {t('bookings.filter.fromDate')}
              </Text>
              <input
                type="date"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--ds-spacing-2)',
                  border: '1px solid var(--ds-color-neutral-border-default)',
                  borderRadius: 'var(--ds-border-radius-sm)',
                  fontSize: 'var(--ds-font-size-sm)',
                }}
              />
            </div>
            <div>
              <Text data-size="sm" style={{ marginBottom: 'var(--ds-spacing-1)', color: 'var(--ds-color-neutral-text-subtle)' }}>
                {t('bookings.filter.toDate')}
              </Text>
              <input
                type="date"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
                style={{
                  width: '100%',
                  padding: 'var(--ds-spacing-2)',
                  border: '1px solid var(--ds-color-neutral-border-default)',
                  borderRadius: 'var(--ds-border-radius-sm)',
                  fontSize: 'var(--ds-font-size-sm)',
                }}
              />
            </div>
          </Stack>
        </DrawerSection>

        <DrawerSection title={t('bookings.filter.sorting')} collapsible defaultCollapsed>
          <Stack gap="1">
            {SORT_OPTIONS.map((sort) => (
              <DrawerItem
                key={sort.id}
                left={
                  <input
                    type="radio"
                    name="sort"
                    checked={selectedSort === sort.id}
                    onChange={() => setSelectedSort(sort.id)}
                    style={{ width: '18px', height: '18px', accentColor: 'var(--ds-color-accent-base-default)' }}
                  />
                }
                onClick={() => setSelectedSort(sort.id)}
                selected={selectedSort === sort.id}
              >
                <Text>{t(sort.labelKey)}</Text>
              </DrawerItem>
            ))}
          </Stack>
        </DrawerSection>
      </Drawer>

      {/* Main Content */}
      <Stack gap="4" style={{ flex: 1, overflow: 'hidden' }}>
        <PageHeader
          title={t('nav.bookings')}
          actions={
            <Button type="button" variant="tertiary" onClick={() => setIsFilterOpen(true)}>
              <FilterIcon />
              {t('bookings.filter.page.title')}
            </Button>
          }
        />

        {/* Status Tabs */}
        <div style={{
          display: 'flex',
          gap: 'var(--ds-spacing-1)',
          borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
          paddingBottom: 'var(--ds-spacing-1)',
          overflowX: 'auto'
        }}>
          {STATUS_TABS.map((tab) => {
            const isActive = activeTab === tab.id;
            const count = tabCounts[tab.id] || 0;

            return (
              <Button
                key={tab.id}
                type="button"
                variant="tertiary"
                onClick={() => setActiveTab(tab.id)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 'var(--ds-spacing-2)',
                  padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                  borderRadius: 'var(--ds-border-radius-md) var(--ds-border-radius-md) 0 0',
                  backgroundColor: isActive ? 'var(--ds-color-neutral-surface-default)' : 'transparent',
                  color: isActive ? STATUS_COLOR_MAP[tab.color] : 'var(--ds-color-neutral-text-subtle)',
                  fontWeight: isActive ? 600 : 400,
                  fontSize: 'var(--ds-font-size-sm)',
                  borderBottom: isActive ? `2px solid ${STATUS_COLOR_MAP[tab.color]}` : '2px solid transparent',
                  marginBottom: '-1px',
                  whiteSpace: 'nowrap'
                }}
              >
                <span>{t(tab.labelKey)}</span>
                {count > 0 && (
                  <span style={{
                    minWidth: '20px',
                    height: '20px',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--ds-font-size-xs)',
                    fontWeight: 600,
                    backgroundColor: isActive ? 'var(--ds-color-neutral-surface-hover)' : 'var(--ds-color-neutral-surface-hover)',
                    color: isActive ? STATUS_COLOR_MAP[tab.color] : 'var(--ds-color-neutral-text-subtle)',
                    borderRadius: 'var(--ds-border-radius-full)',
                    padding: '0 var(--ds-spacing-1)',
                  }}>
                    {count}
                  </span>
                )}
              </Button>
            );
          })}
        </div>

        {/* Toolbar */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)' }}>
          <HeaderSearch
            placeholder={t('form.bookings.search.placeholder')}
            value={searchValue}
            onSearchChange={handleSearchChange}
            onSearch={handleSearch}
            width="350px"
          />

          <div style={{ flex: 1 }} />

          {/* Bulk actions */}
          {selectedIds.length > 0 && (
            <div style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-2)',
              padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-accent-surface-default)',
              borderRadius: 'var(--ds-border-radius-md)',
              border: '1px solid var(--ds-color-accent-border-default)',
            }}>
              <Paragraph data-size="sm" style={{ margin: 0, fontWeight: 600 }}>
                {t('bookings.bulk.selected', { count: selectedIds.length })}
              </Paragraph>
              {activeTab === 'pending' && (
                <>
                  <Button type="button" variant="tertiary" data-size="sm" onClick={handleBulkConfirm} disabled={approveBooking.isPending}>
                    <CheckIcon /> {t('action.approve')}
                  </Button>
                  <Button type="button" variant="tertiary" data-size="sm" onClick={handleBulkCancel} disabled={cancelBooking.isPending}>
                    <CloseIcon /> {t('bookings.bulk.reject')}
                  </Button>
                </>
              )}
              <Button type="button" variant="tertiary" data-size="sm" onClick={handleBulkExport}>
                <DownloadIcon /> {t('bookings.bulk.export')}
              </Button>
              <Button type="button" variant="tertiary" data-size="sm" onClick={() => setSelectedIds([])}>
                <CloseIcon />
              </Button>
            </div>
          )}

          <Button type="button" variant="tertiary" onClick={() => setIsFilterOpen(true)} style={{ position: 'relative' }}>
            <FilterIcon />
            {activeFilterCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-4px',
                right: '-4px',
                minWidth: '16px',
                height: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--ds-font-size-xs)',
                fontWeight: 600,
                backgroundColor: 'var(--ds-color-accent-base-default)',
                color: 'var(--ds-color-accent-contrast-default)',
                borderRadius: 'var(--ds-border-radius-full)',
              }}>
                {activeFilterCount}
              </span>
            )}
          </Button>
        </div>

        {/* Table */}
        <div style={{ flex: 1, overflow: 'auto' }}>
          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', padding: 'var(--ds-spacing-10)' }}>
              <Spinner aria-label={t('state.loading')} />
            </div>
          ) : bookings.length === 0 ? (
            <div style={{
              textAlign: 'center',
              padding: 'var(--ds-spacing-10)',
              backgroundColor: activeTab === 'pending' ? 'var(--ds-color-success-surface-default)' : 'var(--ds-color-neutral-surface-default)',
              borderRadius: 'var(--ds-border-radius-md)',
              border: `1px solid ${activeTab === 'pending' ? 'var(--ds-color-success-border-subtle)' : 'var(--ds-color-neutral-border-subtle)'}`,
            }}>
              {activeTab === 'pending' ? (
                <>
                  <div style={{ fontSize: 'var(--ds-font-size-heading-lg)', marginBottom: 'var(--ds-spacing-3)' }}>✓</div>
                  <Paragraph data-size="md" style={{ margin: 0, fontWeight: 600, color: 'var(--ds-color-success-text-default)' }}>
                    {t('bookings.empty.noPending')}
                  </Paragraph>
                  <Paragraph data-size="sm" style={{ margin: 0, marginTop: 'var(--ds-spacing-2)', color: 'var(--ds-color-neutral-text-subtle)' }}>
                    {t('bookings.empty.allProcessed')}
                  </Paragraph>
                </>
              ) : (
                <>
                  <Paragraph data-size="md" style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}>
                    {t('bookings.empty.noBookings')}
                  </Paragraph>
                  <Paragraph data-size="sm" style={{ margin: 0, marginTop: 'var(--ds-spacing-2)', color: 'var(--ds-color-neutral-text-subtle)' }}>
                    {searchQuery ? t('bookings.empty.tryDifferentSearch') : t('bookings.empty.noBookingsInCategory')}
                  </Paragraph>
                </>
              )}
            </div>
          ) : (
            <div style={{
              backgroundColor: 'var(--ds-color-neutral-surface-default)',
              borderRadius: 'var(--ds-border-radius-md)',
              border: '1px solid var(--ds-color-neutral-border-subtle)',
              overflow: 'hidden',
            }}>
              <Table>
                <Table.Head>
                  <Table.Row>
                    <Table.HeaderCell style={{ width: '48px' }}>
                      <Checkbox
                        aria-label={t('ui.selectAll')}
                        checked={allSelected}
                        onChange={(e) => handleSelectAll(e.target.checked)}
                      />
                    </Table.HeaderCell>
                    <Table.HeaderCell style={{ width: '110px' }}>{t('bookings.table.booking')}</Table.HeaderCell>
                    <Table.HeaderCell>{t('bookings.table.resource')}</Table.HeaderCell>
                    <Table.HeaderCell>{t('bookings.table.user')}</Table.HeaderCell>
                    <Table.HeaderCell>{t('bookings.table.time')}</Table.HeaderCell>
                    <Table.HeaderCell style={{ width: '100px' }}>{t('bookings.table.status')}</Table.HeaderCell>
                    <Table.HeaderCell style={{ width: '100px' }}>{t('rule.payment')}</Table.HeaderCell>
                    <Table.HeaderCell style={{ width: '100px', textAlign: 'right' }}>{t('bookings.table.price')}</Table.HeaderCell>
                    <Table.HeaderCell style={{ width: '60px' }} />
                  </Table.Row>
                </Table.Head>
                <Table.Body>
                  {bookings.map((booking) => {
                    const bookingRef = getBookingRef(booking.id);
                    const isCopied = copiedId === booking.id;

                    return (
                      <Table.Row
                        key={booking.id}
                        style={{ cursor: 'pointer' }}
                        onClick={() => handleView(booking)}
                      >
                        <Table.Cell onClick={(e) => e.stopPropagation()}>
                          <Checkbox
                            aria-label={t('bookings.action.selectBooking', { ref: bookingRef })}
                            checked={selectedIds.includes(booking.id)}
                            onChange={(e) => handleSelectOne(booking.id, e.target.checked)}
                          />
                        </Table.Cell>
                        <Table.Cell>
                          <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-1)' }}>
                            <span style={{
                              fontFamily: 'var(--ds-font-family-monospace)',
                              fontSize: 'var(--ds-font-size-sm)',
                              color: 'var(--ds-color-accent-text-default)'
                            }}>
                              #{bookingRef}
                            </span>
                            <Button
                              type="button"
                              variant="tertiary"
                              data-size="sm"
                              onClick={(e) => { e.stopPropagation(); handleCopyId(booking.id); }}
                              aria-label={t('bookings.action.copyId')}
                              style={{ padding: '2px', color: isCopied ? 'var(--ds-color-success-text-default)' : undefined }}
                            >
                              📋
                            </Button>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <Paragraph data-size="sm" style={{ margin: 0, fontWeight: 500 }}>
                            {booking.rentalObjectDisplay.name}
                          </Paragraph>
                        </Table.Cell>
                        <Table.Cell>
                          <div>
                            <Paragraph data-size="sm" style={{ margin: 0, fontWeight: 500 }}>
                              {booking.guestDisplay.name || t('common.unknown')}
                            </Paragraph>
                            {booking.guestDisplay.organizationName && (
                              <Paragraph data-size="xs" style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}>
                                {booking.guestDisplay.organizationName}
                              </Paragraph>
                            )}
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <div>
                            <Paragraph data-size="sm" style={{ margin: 0, fontWeight: 500 }}>
                              {booking.timeDisplay.startFormatted.split(' ')[0]}
                            </Paragraph>
                            <Paragraph data-size="xs" style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}>
                              {booking.timeDisplay.startTime.substring(11, 16)} – {booking.timeDisplay.endTime.substring(11, 16)} ({booking.timeDisplay.duration})
                            </Paragraph>
                          </div>
                        </Table.Cell>
                        <Table.Cell>
                          <BookingStatusBadge status={booking.status} />
                        </Table.Cell>
                        <Table.Cell>
                          <PaymentStatusBadge status={booking.paymentStatus || 'unpaid'} />
                        </Table.Cell>
                        <Table.Cell style={{ textAlign: 'right' }}>
                          <Paragraph data-size="sm" style={{ margin: 0, fontWeight: 500 }}>
                            {booking.paymentDisplay.totalFormatted}
                          </Paragraph>
                        </Table.Cell>
                        <Table.Cell onClick={(e) => e.stopPropagation()}>
                          <div style={{ display: 'flex', gap: 'var(--ds-spacing-1)' }}>
                            {(booking.status === 'pending' || booking.status === 'pending_approval') && (
                              <>
                                <Button
                                  type="button"
                                  variant="secondary"
                                  data-color="brand1"
                                  data-size="sm"
                                  onClick={() => handleApprove(booking)}
                                  disabled={approveBooking.isPending}
                                  aria-label={t('action.approve')}
                                >
                                  <CheckIcon />
                                </Button>
                                <Button
                                  type="button"
                                  variant="secondary"
                                  data-color="danger"
                                  data-size="sm"
                                  onClick={() => handleReject(booking.id)}
                                  disabled={rejectBooking.isPending}
                                  aria-label={t('bookings.action.reject')}
                                >
                                  <CloseIcon />
                                </Button>
                              </>
                            )}
                            <Button type="button" variant="primary" data-size="sm" icon popovertarget={`dropdown-${booking.id}`}>
                              <MoreVerticalIcon />
                            </Button>
                            <Dropdown id={`dropdown-${booking.id}`} placement="bottom-end">
                              <Dropdown.List>
                                <Dropdown.Item>
                                  <Dropdown.Button onClick={() => handleView(booking)}>
                                    {t('bookings.viewDetails')}
                                  </Dropdown.Button>
                                </Dropdown.Item>
                                {booking.status !== 'cancelled' && (
                                  <Dropdown.Item>
                                    <Dropdown.Button onClick={() => handleCancel(booking.id)}>
                                      {t('bookings.cancel')}
                                    </Dropdown.Button>
                                  </Dropdown.Item>
                                )}
                              </Dropdown.List>
                            </Dropdown>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </div>
          )}
        </div>
      </Stack>

      {/* Status Toast */}
      {statusMessage && (
        <div style={{
          position: 'fixed',
          bottom: 'var(--ds-spacing-6)',
          right: 'var(--ds-spacing-6)',
          padding: 'var(--ds-spacing-4)',
          borderRadius: 'var(--ds-border-radius-md)',
          backgroundColor: statusMessage.type === 'success' ? 'var(--ds-color-success-surface-default)' : 'var(--ds-color-danger-surface-default)',
          color: statusMessage.type === 'success' ? 'var(--ds-color-success-text-default)' : 'var(--ds-color-danger-text-default)',
          boxShadow: 'var(--ds-shadow-md)',
          zIndex: 1000,
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--ds-spacing-2)',
        }}>
          {statusMessage.type === 'success' ? <CheckIcon /> : <CloseIcon />}
          <span>{statusMessage.text}</span>
          <Button variant="tertiary" data-size="sm" onClick={() => setStatusMessage(null)}>
            <CloseIcon />
          </Button>
        </div>
      )}

      {/* Approve Dialog */}
      <Dialog open={approveDialogOpen} onClose={cancelApproveDialog}>
        <Dialog.Block>
          <Heading level={3} data-size="md" style={{ margin: 0 }}>
            {t('bookings.approveConfirmTitle')}
          </Heading>
        </Dialog.Block>
        <Dialog.Block>
          <Paragraph style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            {t('bookings.approveConfirmDescription')}
          </Paragraph>

          {bookingToApprove && (
            <div style={{
              backgroundColor: 'var(--ds-color-neutral-surface-default)',
              borderRadius: 'var(--ds-border-radius-md)',
              padding: 'var(--ds-spacing-4)',
              marginTop: 'var(--ds-spacing-4)',
            }}>
              <Stack gap="3">
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>{t('bookings.user')}</Text>
                  <Text style={{ fontWeight: 500 }}>{bookingToApprove.guestDisplay.name}</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>{t('bookings.resource')}</Text>
                  <Text style={{ fontWeight: 500 }}>{bookingToApprove.rentalObjectDisplay.name}</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>{t('bookings.date')}</Text>
                  <Text style={{ fontWeight: 500 }}>{bookingToApprove.timeDisplay.startFormatted.split(' ')[0]}</Text>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Text style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>{t('bookings.price')}</Text>
                  <Text style={{ fontWeight: 600, color: 'var(--ds-color-brand1-text-default)' }}>
                    {bookingToApprove.paymentDisplay.totalFormatted}
                  </Text>
                </div>
              </Stack>
            </div>
          )}

          {statusMessage?.type === 'error' && (
            <Alert data-color="danger" style={{ marginTop: 'var(--ds-spacing-4)' }}>
              {statusMessage.text}
            </Alert>
          )}
        </Dialog.Block>
        <Dialog.Block>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)', justifyContent: 'flex-end' }}>
            <Button type="button" variant="secondary" onClick={cancelApproveDialog} disabled={isApproving}>
              {t('common.cancel')}
            </Button>
            <Button type="button" variant="primary" data-color="success" onClick={confirmApprove} disabled={isApproving}>
              {isApproving ? <Spinner data-size="sm" /> : <CheckIcon />}
              {isApproving ? t('common.processing') : t('bookings.action.approve')}
            </Button>
          </div>
        </Dialog.Block>
      </Dialog>
    </>
  );
}

export default BookingsWidget;
