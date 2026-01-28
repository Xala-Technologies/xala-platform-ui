/**
 * SeasonalPatternsSection - Seasonal patterns analysis
 */

import { useMemo } from 'react';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Badge,
  BarChart,
  DownloadIcon,
  Table,
  Grid,
  Stack,
} from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/platform/runtime';
import { formatCurrency } from '@digilist/client-sdk';

export interface SeasonalPattern {
  period: string;
  year: number;
  bookingCount: number;
  revenue: number;
  utilizationRate: number;
}

export interface SeasonalPatternsSectionProps {
  seasonalPatterns: SeasonalPattern[];
  onExport: () => void;
  isExporting: boolean;
}

export function SeasonalPatternsSection({
  seasonalPatterns,
  onExport,
  isExporting,
}: SeasonalPatternsSectionProps) {
  const t = useT();

  // Transform seasonal data for charts
  const seasonalChartData = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const periodMap = new Map<string, { bookingCount: number; revenue: number }>();

    seasonalPatterns.forEach((item) => {
      if (item.year === currentYear) {
        periodMap.set(item.period, {
          bookingCount: item.bookingCount,
          revenue: item.revenue,
        });
      }
    });

    return Array.from(periodMap.entries()).map(([period, data]) => ({
      label: period,
      value: data.bookingCount,
    }));
  }, [seasonalPatterns]);

  // Calculate year-over-year comparison
  const yearOverYearData = useMemo(() => {
    const currentYear = new Date().getFullYear();
    const previousYear = currentYear - 1;

    const currentYearData = seasonalPatterns.filter((item) => item.year === currentYear);
    const previousYearData = seasonalPatterns.filter((item) => item.year === previousYear);

    const currentTotal = currentYearData.reduce((sum, item) => sum + item.bookingCount, 0);
    const previousTotal = previousYearData.reduce((sum, item) => sum + item.bookingCount, 0);
    const change = previousTotal > 0 ? ((currentTotal - previousTotal) / previousTotal) * 100 : 0;

    return {
      currentYear,
      previousYear,
      currentTotal,
      previousTotal,
      change,
      currentRevenue: currentYearData.reduce((sum, item) => sum + item.revenue, 0),
      previousRevenue: previousYearData.reduce((sum, item) => sum + item.revenue, 0),
    };
  }, [seasonalPatterns]);

  if (seasonalPatterns.length === 0) {
    return (
      <Card>
        <Stack spacing={4}>
          <Stack spacing={1}>
            <Heading level={3} data-size="sm">
              {t('reports.seasonal.title', 'Sesongmonstre')}
            </Heading>
            <Paragraph data-size="sm" color="subtle">
              {t('reports.seasonal.description', 'Bookingvolum per sesong/maned med ar-over-ar sammenligning')}
            </Paragraph>
          </Stack>
          <Paragraph color="subtle" align="center">
            {t('reports.seasonal.noData', 'Ingen sesongdata for valgt periode.')}
          </Paragraph>
        </Stack>
      </Card>
    );
  }

  return (
    <Card>
      <Stack spacing={5}>
        <Stack direction="row" justify="space-between" align="center">
          <Stack spacing={1}>
            <Heading level={3} data-size="sm">
              {t('reports.seasonal.title', 'Sesongmonstre')}
            </Heading>
            <Paragraph data-size="sm" color="subtle">
              {t('reports.seasonal.description', 'Bookingvolum per sesong/maned med ar-over-ar sammenligning')}
            </Paragraph>
          </Stack>
          <Button
            type="button"
            variant="tertiary"
            data-size="sm"
            onClick={onExport}
            disabled={isExporting}
          >
            <DownloadIcon />
            CSV
          </Button>
        </Stack>

        {/* Year-over-year comparison cards */}
        <Grid columns={4} spacing={4}>
          <Card variant="subtle">
            <Stack spacing={1}>
              <Paragraph data-size="sm" color="subtle">
                {yearOverYearData.currentYear} {t('reports.seasonal.bookings', 'Bookinger')}
              </Paragraph>
              <Heading level={4} data-size="md">
                {yearOverYearData.currentTotal}
              </Heading>
            </Stack>
          </Card>

          <Card variant="subtle">
            <Stack spacing={1}>
              <Paragraph data-size="sm" color="subtle">
                {yearOverYearData.previousYear} {t('reports.seasonal.bookings', 'Bookinger')}
              </Paragraph>
              <Heading level={4} data-size="md">
                {yearOverYearData.previousTotal}
              </Heading>
            </Stack>
          </Card>

          <Card variant="subtle">
            <Stack spacing={1}>
              <Paragraph data-size="sm" color="subtle">
                {t('reports.seasonal.yearOverYear', 'Endring (Ar-over-ar)')}
              </Paragraph>
              <Stack direction="row" align="center" spacing={2}>
                <Heading level={4} data-size="md">
                  {yearOverYearData.change >= 0 ? '+' : ''}{yearOverYearData.change.toFixed(1)}%
                </Heading>
                <Badge
                  data-color={yearOverYearData.change >= 0 ? 'success' : 'danger'}
                  data-size="sm"
                >
                  {yearOverYearData.change >= 0 ? t('common.okning', 'Okning') : 'Nedgang'}
                </Badge>
              </Stack>
            </Stack>
          </Card>

          <Card variant="subtle">
            <Stack spacing={1}>
              <Paragraph data-size="sm" color="subtle">
                {t('reports.seasonal.revenue', 'Omsetning')} {yearOverYearData.currentYear}
              </Paragraph>
              <Heading level={4} data-size="md">
                {formatCurrency(yearOverYearData.currentRevenue)}
              </Heading>
            </Stack>
          </Card>
        </Grid>

        {/* Seasonal chart */}
        {seasonalChartData.length > 0 && (
          <Stack spacing={3}>
            <Paragraph data-size="sm" style={{ fontWeight: 'var(--ds-font-weight-medium)' }}>
              {t('reports.seasonal.bookingsPerPeriod', 'Bookinger per periode')} ({yearOverYearData.currentYear})
            </Paragraph>
            <BarChart data={seasonalChartData} />
          </Stack>
        )}

        {/* Monthly breakdown table */}
        <Stack spacing={3}>
          <Paragraph data-size="sm" style={{ fontWeight: 'var(--ds-font-weight-medium)' }}>
            {t('reports.seasonal.detailedOverview', 'Detaljert oversikt')}
          </Paragraph>
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>{t('timeMode.period', 'Periode')}</Table.HeaderCell>
                <Table.HeaderCell align="right">{t('reports.seasonal.year', 'Ar')}</Table.HeaderCell>
                <Table.HeaderCell align="right">{t('reports.seasonal.bookings', 'Bookinger')}</Table.HeaderCell>
                <Table.HeaderCell align="right">{t('reports.seasonal.revenue', 'Omsetning')}</Table.HeaderCell>
                <Table.HeaderCell align="right">{t('reports.seasonal.utilization', 'Utnyttelse')}</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {seasonalPatterns.slice(0, 12).map((item, idx) => (
                <Table.Row key={`${item.period}-${item.year}`}>
                  <Table.Cell>{item.period}</Table.Cell>
                  <Table.Cell align="right">{item.year}</Table.Cell>
                  <Table.Cell align="right" style={{ fontWeight: 'var(--ds-font-weight-medium)' }}>
                    {item.bookingCount}
                  </Table.Cell>
                  <Table.Cell align="right" style={{ fontWeight: 'var(--ds-font-weight-medium)' }}>
                    {formatCurrency(item.revenue)}
                  </Table.Cell>
                  <Table.Cell align="right">
                    <Badge
                      data-color={
                        item.utilizationRate >= 70 ? 'success' :
                        item.utilizationRate >= 40 ? 'warning' : 'neutral'
                      }
                      data-size="sm"
                    >
                      {item.utilizationRate.toFixed(0)}%
                    </Badge>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Stack>
      </Stack>
    </Card>
  );
}
