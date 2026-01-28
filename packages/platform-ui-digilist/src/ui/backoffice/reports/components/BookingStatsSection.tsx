/**
 * BookingStatsSection - Booking statistics summary
 */

import {
  Card,
  Heading,
  Paragraph,
  Grid,
  Stack,
} from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/platform/runtime';

export interface BookingStats {
  totalBookings?: number;
  confirmedBookings?: number;
  pendingBookings?: number;
  cancelledBookings?: number;
  averageDuration?: number;
}

export interface BookingStatsSectionProps {
  bookingStats: BookingStats | undefined;
}

export function BookingStatsSection({ bookingStats }: BookingStatsSectionProps) {
  const t = useT();

  const stats = [
    {
      label: t('reports.stats.total', 'Totalt antall'),
      value: bookingStats?.totalBookings ?? 0,
      color: undefined,
    },
    {
      label: t('status.confirmed', 'Bekreftet'),
      value: bookingStats?.confirmedBookings ?? 0,
      color: 'var(--ds-color-success-text-default)',
    },
    {
      label: t('status.pending', 'Ventende'),
      value: bookingStats?.pendingBookings ?? 0,
      color: 'var(--ds-color-warning-text-default)',
    },
    {
      label: t('reports.stats.cancelled', 'Kansellert'),
      value: bookingStats?.cancelledBookings ?? 0,
      color: 'var(--ds-color-danger-text-default)',
    },
    {
      label: t('reports.stats.averageDuration', 'Gj.snitt varighet'),
      value: bookingStats?.averageDuration ? `${bookingStats.averageDuration.toFixed(1)}t` : '-',
      color: undefined,
    },
  ];

  return (
    <Card>
      <Stack spacing={4}>
        <Heading level={3} data-size="sm">
          {t('reports.bookingStats.title', 'Bookingstatistikk')}
        </Heading>
        <Grid columns={5} spacing={4}>
          {stats.map((stat, index) => (
            <Stack key={index} spacing={1}>
              <Paragraph data-size="sm" color="subtle">
                {stat.label}
              </Paragraph>
              <Heading
                level={4}
                data-size="md"
                style={stat.color ? { color: stat.color } : undefined}
              >
                {stat.value}
              </Heading>
            </Stack>
          ))}
        </Grid>
      </Stack>
    </Card>
  );
}
