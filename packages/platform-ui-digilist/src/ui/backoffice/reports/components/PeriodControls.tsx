/**
 * PeriodControls - Date range and period selector
 */

import {
  Card,
  Button,
  CalendarIcon,
  Textfield,
  Stack,
} from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/platform/runtime';
import type { ReportPeriod } from '@digilist/client-sdk';

export interface DateRange {
  startDate: string;
  endDate: string;
}

export interface PeriodControlsProps {
  period: ReportPeriod;
  onPeriodChange: (period: ReportPeriod) => void;
  dateRange: DateRange;
  onDateRangeChange: (range: DateRange) => void;
  periodLabels: Record<ReportPeriod, string>;
}

export function PeriodControls({
  period,
  onPeriodChange,
  dateRange,
  onDateRangeChange,
  periodLabels,
}: PeriodControlsProps) {
  const t = useT();

  return (
    <Card>
      <Stack direction="row" justify="space-between" align="center" spacing={4}>
        <Stack direction="row" align="center" spacing={4}>
          <Stack direction="row" align="center" spacing={2}>
            <CalendarIcon />
            <span style={{ fontWeight: 'var(--ds-font-weight-medium)' }}>
              {t('common.periode', 'Periode')}
            </span>
          </Stack>
          <Textfield
            type="date"
            value={dateRange.startDate}
            onChange={(e) => onDateRangeChange({ ...dateRange, startDate: e.target.value })}
            aria-label={t('reports.startDate', 'Startdato')}
          />
          <span style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            {t('common.til', 'til')}
          </span>
          <Textfield
            type="date"
            value={dateRange.endDate}
            onChange={(e) => onDateRangeChange({ ...dateRange, endDate: e.target.value })}
            aria-label={t('reports.endDate', 'Sluttdato')}
          />
        </Stack>
        <Stack direction="row" spacing={2}>
          {(Object.keys(periodLabels) as ReportPeriod[]).map((p) => (
            <Button
              key={p}
              type="button"
              variant={period === p ? 'primary' : 'tertiary'}
              data-size="sm"
              onClick={() => onPeriodChange(p)}
            >
              {periodLabels[p]}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Card>
  );
}
