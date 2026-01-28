/**
 * FilterControls - Report filter dropdowns
 */

import {
  Card,
  Dropdown,
  FilterIcon,
  Stack,
} from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/platform/runtime';

export interface FilterControlsProps {
  rentalObjectId: string;
  onRentalObjectChange: (id: string) => void;
  organizationId: string;
  onOrganizationChange: (id: string) => void;
  bookingType: string;
  onBookingTypeChange: (type: string) => void;
}

export function FilterControls({
  rentalObjectId,
  onRentalObjectChange,
  organizationId,
  onOrganizationChange,
  bookingType,
  onBookingTypeChange,
}: FilterControlsProps) {
  const t = useT();

  const rentalObjectOptions = [
    { id: 'all', label: t('common.alle_lokaler', 'Alle lokaler') },
    { id: 'rental-object-1', label: t('common.moterom_a', 'Møterom A') },
    { id: 'rental-object-2', label: t('common.konferansesal_b', 'Konferansesal B') },
    { id: 'rental-object-3', label: t('common.fellesareal_c', 'Fellesareal C') },
  ];

  const organizationOptions = [
    { id: 'all', label: t('common.alle_organisasjoner', 'Alle organisasjoner') },
    { id: 'org-1', label: 'Kulturhuset' },
    { id: 'org-2', label: 'Idrettslaget' },
    { id: 'org-3', label: 'Frivilligsentralen' },
  ];

  const bookingTypeOptions = [
    { id: 'all', label: t('common.alle_typer', 'Alle typer') },
    { id: 'meeting', label: t('common.mote', 'Møte') },
    { id: 'event', label: 'Arrangement' },
    { id: 'training', label: 'Trening' },
    { id: 'other', label: 'Annet' },
  ];

  return (
    <Card>
      <Stack direction="row" align="center" spacing={4}>
        <Stack direction="row" align="center" spacing={2}>
          <FilterIcon />
          <span style={{ fontWeight: 'var(--ds-font-weight-medium)' }}>
            {t('reports.filters', 'Filtre:')}
          </span>
        </Stack>
        <Stack direction="row" spacing={3} style={{ flex: 1 }}>
          <Dropdown
            items={rentalObjectOptions.map((opt) => ({
              id: opt.id,
              label: opt.label,
              onSelect: () => onRentalObjectChange(opt.id),
            }))}
            label={rentalObjectOptions.find((opt) => opt.id === rentalObjectId)?.label || 'Velg lokale'}
            data-size="md"
          />
          <Dropdown
            items={organizationOptions.map((opt) => ({
              id: opt.id,
              label: opt.label,
              onSelect: () => onOrganizationChange(opt.id),
            }))}
            label={organizationOptions.find((opt) => opt.id === organizationId)?.label || 'Velg organisasjon'}
            data-size="md"
          />
          <Dropdown
            items={bookingTypeOptions.map((opt) => ({
              id: opt.id,
              label: opt.label,
              onSelect: () => onBookingTypeChange(opt.id),
            }))}
            label={bookingTypeOptions.find((opt) => opt.id === bookingType)?.label || 'Velg type'}
            data-size="md"
          />
        </Stack>
      </Stack>
    </Card>
  );
}
