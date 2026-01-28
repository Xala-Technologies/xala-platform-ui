/**
 * TopListingsSection - Top performing listings
 */

import {
  Card,
  Heading,
  Paragraph,
  Badge,
  Stack,
} from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/platform/runtime';

export interface UsageReportItem {
  listingId: string;
  listingName?: string;
  totalHours?: number;
  bookingCount?: number;
  utilizationRate?: number;
}

export interface TopListingsSectionProps {
  usageReport: UsageReportItem[];
}

export function TopListingsSection({ usageReport }: TopListingsSectionProps) {
  const t = useT();

  if (usageReport.length === 0) {
    return null;
  }

  return (
    <Card>
      <Stack spacing={4}>
        <Heading level={3} data-size="sm">
          {t('reports.topListings.title', 'Mest brukte lokaler')}
        </Heading>
        <Stack spacing={3}>
          {usageReport.slice(0, 5).map((item, idx) => (
            <div
              key={item.listingId}
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
                backgroundColor: 'var(--ds-color-neutral-surface-default)',
                borderRadius: 'var(--ds-border-radius-md)',
                border: '1px solid var(--ds-color-neutral-border-subtle)',
              }}
            >
              <Stack direction="row" align="center" spacing={3}>
                <div
                  style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: 'var(--ds-border-radius-full)',
                    backgroundColor: 'var(--ds-color-accent-surface-default)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: 'var(--ds-font-size-sm)',
                    fontWeight: 'var(--ds-font-weight-bold)',
                    color: 'var(--ds-color-accent-text-default)',
                  }}
                >
                  {idx + 1}
                </div>
                <span style={{ fontWeight: 'var(--ds-font-weight-medium)' }}>
                  {item.listingName || item.listingId}
                </span>
              </Stack>
              <Stack direction="row" align="center" spacing={4}>
                <Stack spacing={0} align="end">
                  <Paragraph data-size="xs" color="subtle">
                    {t('reports.topListings.hours', 'Timer')}
                  </Paragraph>
                  <span style={{ fontWeight: 'var(--ds-font-weight-medium)' }}>
                    {item.totalHours?.toFixed(1) ?? 0}
                  </span>
                </Stack>
                <Stack spacing={0} align="end">
                  <Paragraph data-size="xs" color="subtle">
                    {t('reports.topListings.bookings', 'Bookinger')}
                  </Paragraph>
                  <span style={{ fontWeight: 'var(--ds-font-weight-medium)' }}>
                    {item.bookingCount ?? 0}
                  </span>
                </Stack>
                <Stack spacing={0} align="end">
                  <Paragraph data-size="xs" color="subtle">
                    {t('reports.topListings.utilization', 'Utnyttelse')}
                  </Paragraph>
                  <Badge
                    data-color={
                      (item.utilizationRate ?? 0) >= 70 ? 'success' :
                      (item.utilizationRate ?? 0) >= 40 ? 'warning' : 'neutral'
                    }
                    data-size="sm"
                  >
                    {item.utilizationRate?.toFixed(0) ?? 0}%
                  </Badge>
                </Stack>
              </Stack>
            </div>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}
