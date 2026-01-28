import { Paragraph } from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/platform/runtime';
import type { RentalObject } from '@digilist/client-sdk';

interface RentalObjectOverviewTabProps {
  rentalObject: RentalObject;
}

export function RentalObjectOverviewTab({ rentalObject }: RentalObjectOverviewTabProps) {
  const t = useT();
  return (
    <Paragraph>
      {t('common.todo_implement_rentalobjectoverviewtab')} - {rentalObject.name}
    </Paragraph>
  );
}
