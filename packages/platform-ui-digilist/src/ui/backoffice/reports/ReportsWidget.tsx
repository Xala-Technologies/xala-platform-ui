/**
 * ReportsWidget - Reports Dashboard Widget
 *
 * Comprehensive reports dashboard with KPIs, charts, heatmaps, and seasonal patterns.
 * Encapsulates all state management and UI rendering for the reports feature.
 *
 * @module @digilist/runtime/features/backoffice/reports
 */

import { useState, useMemo } from 'react';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Badge,
  Spinner,
  BarChart,
  DownloadIcon,
  CalendarIcon,
  Dropdown,
  FilterIcon,
  Stack,
  ContentLayout,
} from '@xala-technologies/platform-ui';
import {
  useDashboardKPIs,
  useUsageReport,
  useRevenueReport,
  useBookingStats,
  useTimeSlotHeatmap,
  useSeasonalPatterns,
  useExportReport,
  type ReportPeriod,
  type ExportFormat,
  formatCurrency,
  formatPercent,
} from '@digilist/client-sdk';
import { useT } from '@xala-technologies/platform/runtime';

// Internal components for the reports widget
import { ReportsHeader } from './components/ReportsHeader';
import { PeriodControls } from './components/PeriodControls';
import { FilterControls } from './components/FilterControls';
import { KPICards } from './components/KPICards';
import { ChartsSection } from './components/ChartsSection';
import { HeatmapSection } from './components/HeatmapSection';
import { SeasonalPatternsSection } from './components/SeasonalPatternsSection';
import { BookingStatsSection } from './components/BookingStatsSection';
import { TopListingsSection } from './components/TopListingsSection';

export interface ReportsWidgetProps {
  /** Custom class name */
  className?: string;
}

// Period labels for display
const PERIOD_LABELS: Record<ReportPeriod, string> = {
  day: 'Dag',
  week: 'Uke',
  month: 'Måned',
  quarter: 'Kvartal',
  year: 'År',
};

export function ReportsWidget({ className }: ReportsWidgetProps) {
  const t = useT();

  // Period and date range state
  const [period, setPeriod] = useState<ReportPeriod>('month');
  const [dateRange, setDateRange] = useState(() => {
    const end = new Date();
    const start = new Date();
    start.setMonth(start.getMonth() - 1);
    return {
      startDate: start.toISOString().split('T')[0],
      endDate: end.toISOString().split('T')[0],
    };
  });

  // Filter state
  const [rentalObjectId, setRentalObjectId] = useState<string>('all');
  const [organizationId, setOrganizationId] = useState<string>('all');
  const [bookingType, setBookingType] = useState<string>('all');

  // Build query params
  const queryParams = useMemo(() => ({
    period,
    ...(dateRange.startDate && { startDate: dateRange.startDate }),
    ...(dateRange.endDate && { endDate: dateRange.endDate }),
    ...(rentalObjectId !== 'all' && { rentalObjectId }),
    ...(organizationId !== 'all' && { organizationId }),
    ...(bookingType !== 'all' && { bookingType }),
  }), [period, dateRange, rentalObjectId, organizationId, bookingType]);

  // Data fetching
  const { data: kpis, isLoading: isLoadingKPIs } = useDashboardKPIs();
  const { data: usageData, isLoading: isLoadingUsage } = useUsageReport(queryParams);
  const { data: revenueData, isLoading: isLoadingRevenue } = useRevenueReport(queryParams);
  const { data: bookingStats, isLoading: isLoadingStats } = useBookingStats(queryParams);
  const { data: heatmapData, isLoading: isLoadingHeatmap } = useTimeSlotHeatmap(queryParams);
  const { data: seasonalData, isLoading: isLoadingSeasonal } = useSeasonalPatterns(queryParams);

  const exportReport = useExportReport();

  // Normalize arrays
  const usageReport = Array.isArray(usageData) ? usageData : [];
  const revenueReport = Array.isArray(revenueData) ? revenueData : [];
  const heatmap = Array.isArray(heatmapData) ? heatmapData : [];
  const seasonalPatterns = Array.isArray(seasonalData) ? seasonalData : [];

  // Loading state
  const isLoading = isLoadingKPIs || isLoadingUsage || isLoadingRevenue ||
    isLoadingStats || isLoadingHeatmap || isLoadingSeasonal;

  // Export handler
  const handleExport = (format: ExportFormat, type: 'usage' | 'revenue' | 'bookings') => {
    exportReport.mutate({
      type,
      format,
      params: {
        ...(dateRange.startDate && { startDate: dateRange.startDate }),
        ...(dateRange.endDate && { endDate: dateRange.endDate }),
      },
    });
  };

  return (
    <ContentLayout className={className}>
      <Stack spacing={6}>
        <ReportsHeader
          onExportExcel={() => handleExport('xlsx', 'usage')}
          onExportPdf={() => handleExport('pdf', 'usage')}
          isExporting={exportReport.isPending}
        />

        <PeriodControls
          period={period}
          onPeriodChange={setPeriod}
          dateRange={dateRange}
          onDateRangeChange={setDateRange}
          periodLabels={PERIOD_LABELS}
        />

        <FilterControls
          rentalObjectId={rentalObjectId}
          onRentalObjectChange={setRentalObjectId}
          organizationId={organizationId}
          onOrganizationChange={setOrganizationId}
          bookingType={bookingType}
          onBookingTypeChange={setBookingType}
        />

        {isLoading ? (
          <Card>
            <Stack spacing={4} align="center" justify="center" style={{ padding: 'var(--ds-spacing-12)' }}>
              <Spinner aria-label={t('state.loading')} />
            </Stack>
          </Card>
        ) : (
          <>
            <KPICards
              kpis={kpis}
              periodLabel={PERIOD_LABELS[period]}
            />

            <ChartsSection
              usageReport={usageReport}
              revenueReport={revenueReport}
              onExportUsage={() => handleExport('csv', 'usage')}
              onExportRevenue={() => handleExport('csv', 'revenue')}
              isExporting={exportReport.isPending}
            />

            <HeatmapSection heatmap={heatmap} />

            <SeasonalPatternsSection
              seasonalPatterns={seasonalPatterns}
              onExport={() => handleExport('csv', 'usage')}
              isExporting={exportReport.isPending}
            />

            <BookingStatsSection bookingStats={bookingStats} />

            <TopListingsSection usageReport={usageReport} />
          </>
        )}
      </Stack>
    </ContentLayout>
  );
}

export default ReportsWidget;
