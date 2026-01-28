/**
 * HeatmapSection - Booking heatmap visualization
 */

import { useMemo } from 'react';
import {
  Card,
  Heading,
  Paragraph,
  Stack,
} from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/platform/runtime';

export interface HeatmapItem {
  hour: number;
  dayOfWeek: number;
  bookingCount: number;
  utilizationRate: number;
}

export interface HeatmapSectionProps {
  heatmap: HeatmapItem[];
}

const DAY_LABELS = ['Man', 'Tir', 'Ons', 'Tor', 'Fre', 'Lor', 'Son'];
const INTENSITY_LEVELS = [0.1, 0.3, 0.5, 0.7, 1.0];

export function HeatmapSection({ heatmap }: HeatmapSectionProps) {
  const t = useT();

  // Transform heatmap data into 2D grid
  const heatmapGrid = useMemo(() => {
    const grid: Record<number, Record<number, { bookingCount: number; utilizationRate: number }>> = {};

    // Initialize grid with zeros
    for (let hour = 0; hour < 24; hour++) {
      grid[hour] = {};
      for (let day = 0; day < 7; day++) {
        grid[hour]![day] = { bookingCount: 0, utilizationRate: 0 };
      }
    }

    // Fill grid with actual data
    heatmap.forEach((item) => {
      const hourRow = grid[item.hour];
      if (hourRow && hourRow[item.dayOfWeek] !== undefined) {
        hourRow[item.dayOfWeek] = {
          bookingCount: item.bookingCount,
          utilizationRate: item.utilizationRate,
        };
      }
    });

    return grid;
  }, [heatmap]);

  // Get max booking count for color scaling
  const maxBookingCount = useMemo(() => {
    return Math.max(...heatmap.map((item) => item.bookingCount), 1);
  }, [heatmap]);

  if (heatmap.length === 0) {
    return (
      <Card>
        <Stack spacing={4}>
          <Stack spacing={1}>
            <Heading level={3} data-size="sm">
              {t('reports.heatmap.title', 'Booking-heatmap')}
            </Heading>
            <Paragraph data-size="sm" color="subtle">
              {t('reports.heatmap.description', 'Populaere tidspunkter for bookinger (dager x timer)')}
            </Paragraph>
          </Stack>
          <Paragraph color="subtle" align="center">
            {t('reports.heatmap.noData', 'Ingen heatmap-data for valgt periode.')}
          </Paragraph>
        </Stack>
      </Card>
    );
  }

  return (
    <Card>
      <Stack spacing={4}>
        <Stack spacing={1}>
          <Heading level={3} data-size="sm">
            {t('reports.heatmap.title', 'Booking-heatmap')}
          </Heading>
          <Paragraph data-size="sm" color="subtle">
            {t('reports.heatmap.description', 'Populaere tidspunkter for bookinger (dager x timer)')}
          </Paragraph>
        </Stack>

        <div style={{ overflowX: 'auto' }}>
          <div style={{ display: 'inline-flex', flexDirection: 'column', gap: '2px', minWidth: 'min-content' }}>
            {/* Day labels */}
            <div style={{ display: 'flex', gap: '2px', paddingLeft: 'var(--ds-spacing-12)' }}>
              {DAY_LABELS.map((day, idx) => (
                <div
                  key={idx}
                  style={{
                    width: '60px',
                    fontSize: 'var(--ds-font-size-xs)',
                    fontWeight: 'var(--ds-font-weight-medium)',
                    textAlign: 'center',
                    color: 'var(--ds-color-neutral-text-subtle)',
                    padding: 'var(--ds-spacing-1)',
                  }}
                >
                  {day}
                </div>
              ))}
            </div>

            {/* Heatmap grid */}
            {Object.entries(heatmapGrid).map(([hour, days]) => (
              <div key={hour} style={{ display: 'flex', gap: '2px', alignItems: 'center' }}>
                {/* Hour label */}
                <div
                  style={{
                    width: 'var(--ds-spacing-12)',
                    fontSize: 'var(--ds-font-size-xs)',
                    fontWeight: 'var(--ds-font-weight-medium)',
                    textAlign: 'right',
                    color: 'var(--ds-color-neutral-text-subtle)',
                    paddingRight: 'var(--ds-spacing-2)',
                  }}
                >
                  {hour.toString().padStart(2, '0')}:00
                </div>

                {/* Day cells */}
                {[1, 2, 3, 4, 5, 6, 0].map((dayOfWeek) => {
                  const cellData = days[dayOfWeek];
                  if (!cellData) {
                    return (
                      <div
                        key={dayOfWeek}
                        style={{
                          width: '60px',
                          height: '32px',
                          backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
                          border: '1px solid var(--ds-color-neutral-border-subtle)',
                          borderRadius: 'var(--ds-border-radius-sm)',
                        }}
                      />
                    );
                  }

                  const intensity = cellData.bookingCount / maxBookingCount;
                  const backgroundColor = intensity > 0
                    ? `rgba(59, 130, 246, ${Math.max(0.1, intensity)})`
                    : 'var(--ds-color-neutral-surface-subtle)';

                  return (
                    <div
                      key={dayOfWeek}
                      style={{
                        width: '60px',
                        height: '32px',
                        backgroundColor,
                        border: '1px solid var(--ds-color-neutral-border-subtle)',
                        borderRadius: 'var(--ds-border-radius-sm)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: 'var(--ds-font-size-xs)',
                        fontWeight: 'var(--ds-font-weight-medium)',
                        color: intensity > 0.5 ? 'var(--ds-color-neutral-contrast-default)' : 'var(--ds-color-neutral-text-default)',
                        cursor: 'pointer',
                        transition: 'transform 0.1s',
                      }}
                      title={`${cellData.bookingCount} bookinger (${cellData.utilizationRate.toFixed(1)}% utnyttelse)`}
                    >
                      {cellData.bookingCount > 0 ? cellData.bookingCount : ''}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>

          {/* Legend */}
          <Stack direction="row" align="center" spacing={4} style={{ marginTop: 'var(--ds-spacing-4)', paddingLeft: 'var(--ds-spacing-12)' }}>
            <Paragraph data-size="xs" color="subtle">
              {t('reports.heatmap.fewerBookings', 'Faerre bookinger')}
            </Paragraph>
            <div style={{ display: 'flex', gap: 'var(--ds-spacing-1)' }}>
              {INTENSITY_LEVELS.map((intensity, idx) => (
                <div
                  key={idx}
                  style={{
                    width: '24px',
                    height: '16px',
                    backgroundColor: `rgba(59, 130, 246, ${intensity})`,
                    border: '1px solid var(--ds-color-neutral-border-subtle)',
                    borderRadius: 'var(--ds-border-radius-sm)',
                  }}
                />
              ))}
            </div>
            <Paragraph data-size="xs" color="subtle">
              {t('reports.heatmap.moreBookings', 'Flere bookinger')}
            </Paragraph>
          </Stack>
        </div>
      </Stack>
    </Card>
  );
}
