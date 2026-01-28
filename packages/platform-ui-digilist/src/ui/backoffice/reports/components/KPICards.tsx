/**
 * KPICards - Key Performance Indicator cards grid
 */

import {
  Card,
  Heading,
  Paragraph,
  Badge,
  Grid,
  Stack,
} from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/platform/runtime';
import { formatCurrency, formatPercent } from '@digilist/client-sdk';

export interface KPIData {
  activeListings?: number;
  pendingRequests?: number;
  todayBookings?: number;
  periodRevenue?: number;
  revenueChange?: number;
}

export interface KPICardsProps {
  kpis: KPIData | undefined;
  periodLabel: string;
}

export function KPICards({ kpis, periodLabel }: KPICardsProps) {
  const t = useT();

  const cards = [
    {
      label: t('reports.kpi.activeListings', 'Aktive lokaler'),
      value: kpis?.activeListings ?? 0,
      badge: null,
    },
    {
      label: t('reports.kpi.pendingRequests', 'Ventende forespørsler'),
      value: kpis?.pendingRequests ?? 0,
      badge: (kpis?.pendingRequests ?? 0) > 0 ? (
        <Badge data-color="warning" data-size="sm">
          {t('backoffice.text.kreverHandling', 'Krever handling')}
        </Badge>
      ) : null,
    },
    {
      label: t('reports.kpi.todayBookings', 'Bookinger i dag'),
      value: kpis?.todayBookings ?? 0,
      badge: null,
    },
    {
      label: t('reports.kpi.periodRevenue', `Omsetning denne ${periodLabel.toLowerCase()}en`),
      value: formatCurrency(kpis?.periodRevenue ?? 0),
      badge: kpis?.revenueChange !== undefined ? (
        <Badge data-color={kpis.revenueChange >= 0 ? 'success' : 'danger'} data-size="sm">
          {formatPercent(kpis.revenueChange)}
        </Badge>
      ) : null,
    },
  ];

  return (
    <Grid columns={4} spacing={4}>
      {cards.map((card, index) => (
        <Card key={index}>
          <Stack spacing={2}>
            <Paragraph data-size="sm" color="subtle">
              {card.label}
            </Paragraph>
            <Stack direction="row" align="baseline" spacing={2}>
              <Heading level={2} data-size="xl">
                {card.value}
              </Heading>
              {card.badge}
            </Stack>
          </Stack>
        </Card>
      ))}
    </Grid>
  );
}
