/**
 * ChartsSection - Usage and Revenue charts
 */

import { useMemo } from 'react';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  BarChart,
  DownloadIcon,
  Grid,
  Stack,
} from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/platform/runtime';

export interface UsageReportItem {
  listingId: string;
  listingName?: string;
  totalHours?: number;
}

export interface RevenueReportItem {
  period: string;
  totalRevenue?: number;
}

export interface ChartsSectionProps {
  usageReport: UsageReportItem[];
  revenueReport: RevenueReportItem[];
  onExportUsage: () => void;
  onExportRevenue: () => void;
  isExporting: boolean;
}

export function ChartsSection({
  usageReport,
  revenueReport,
  onExportUsage,
  onExportRevenue,
  isExporting,
}: ChartsSectionProps) {
  const t = useT();

  const usageChartData = useMemo(() => {
    return usageReport.slice(0, 10).map((item) => ({
      label: item.listingName || item.listingId,
      value: item.totalHours || 0,
    }));
  }, [usageReport]);

  const revenueChartData = useMemo(() => {
    return revenueReport.slice(0, 10).map((item) => ({
      label: item.period || '',
      value: item.totalRevenue || 0,
    }));
  }, [revenueReport]);

  return (
    <Grid columns={2} spacing={4}>
      {/* Usage Chart */}
      <Card>
        <Stack spacing={4}>
          <Stack direction="row" justify="space-between" align="center">
            <Heading level={3} data-size="sm">
              {t('reports.usagePerListing', 'Bruk per lokale (timer)')}
            </Heading>
            <Button
              type="button"
              variant="tertiary"
              data-size="sm"
              onClick={onExportUsage}
              disabled={isExporting}
            >
              <DownloadIcon />
              CSV
            </Button>
          </Stack>
          {usageChartData.length > 0 ? (
            <BarChart data={usageChartData} />
          ) : (
            <Paragraph color="subtle" align="center">
              {t('reports.noUsageData', 'Ingen bruksdata for valgt periode.')}
            </Paragraph>
          )}
        </Stack>
      </Card>

      {/* Revenue Chart */}
      <Card>
        <Stack spacing={4}>
          <Stack direction="row" justify="space-between" align="center">
            <Heading level={3} data-size="sm">
              {t('reports.revenueOverTime', 'Omsetning over tid')}
            </Heading>
            <Button
              type="button"
              variant="tertiary"
              data-size="sm"
              onClick={onExportRevenue}
              disabled={isExporting}
            >
              <DownloadIcon />
              CSV
            </Button>
          </Stack>
          {revenueChartData.length > 0 ? (
            <BarChart
              data={revenueChartData}
              maxValue={Math.max(...revenueChartData.map((d) => d.value))}
            />
          ) : (
            <Paragraph color="subtle" align="center">
              {t('reports.noRevenueData', 'Ingen omsetningsdata for valgt periode.')}
            </Paragraph>
          )}
        </Stack>
      </Card>
    </Grid>
  );
}
