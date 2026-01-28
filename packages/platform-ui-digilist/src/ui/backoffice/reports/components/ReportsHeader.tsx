/**
 * ReportsHeader - Page header with export actions
 */

import {
  Heading,
  Paragraph,
  Button,
  DownloadIcon,
  Stack,
} from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/platform/runtime';

export interface ReportsHeaderProps {
  onExportExcel: () => void;
  onExportPdf: () => void;
  isExporting: boolean;
}

export function ReportsHeader({
  onExportExcel,
  onExportPdf,
  isExporting,
}: ReportsHeaderProps) {
  const t = useT();

  return (
    <Stack direction="row" justify="space-between" align="start">
      <Stack spacing={1}>
        <Heading level={1} data-size="lg">
          {t('reports.title', 'Rapporter')}
        </Heading>
        <Paragraph data-size="sm" color="subtle">
          {t('reports.description', 'Oversikt og statistikk over bookinger og bruk.')}
        </Paragraph>
      </Stack>
      <Stack direction="row" spacing={3}>
        <Button
          type="button"
          variant="secondary"
          data-size="md"
          onClick={onExportExcel}
          disabled={isExporting}
        >
          <DownloadIcon />
          {t('reports.exportExcel', 'Eksporter Excel')}
        </Button>
        <Button
          type="button"
          variant="secondary"
          data-size="md"
          onClick={onExportPdf}
          disabled={isExporting}
        >
          <DownloadIcon />
          {t('reports.exportPdf', 'Eksporter PDF')}
        </Button>
      </Stack>
    </Stack>
  );
}
