import { Paragraph } from '@xala-technologies/platform-ui';
import { useT } from '@xala-technologies/platform/runtime';

interface RentalObjectBookingsTabProps {
  rentalObjectId: string;
}

export function RentalObjectBookingsTab({ rentalObjectId }: RentalObjectBookingsTabProps) {
  const t = useT();
  return (
    <Paragraph>
      {t('common.todo_implement_rentalobjectbookingstab')} - {rentalObjectId}
    </Paragraph>
  );
}
