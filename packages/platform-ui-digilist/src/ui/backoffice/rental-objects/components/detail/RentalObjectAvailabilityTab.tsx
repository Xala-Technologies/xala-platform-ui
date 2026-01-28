import { Paragraph } from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/platform/runtime';

interface RentalObjectAvailabilityTabProps {
  rentalObjectId: string;
  rentalObjectName: string;
}

export function RentalObjectAvailabilityTab({ rentalObjectId, rentalObjectName }: RentalObjectAvailabilityTabProps) {
  const t = useT();
  return (
    <Paragraph>
      {t('common.todo_implement_rentalobjectavailabilitytab')} - {rentalObjectName} ({rentalObjectId})
    </Paragraph>
  );
}
