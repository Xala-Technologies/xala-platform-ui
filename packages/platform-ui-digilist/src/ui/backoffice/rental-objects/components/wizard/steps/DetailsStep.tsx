import { useT } from '@xala-technologies/platform/runtime';
import { Heading } from '@xala-technologies/platform-ui';
import { useRentalObjectWizard } from '../../../hooks/useRentalObjectWizard';
import { LocationStep } from './LocationStep';
import { CapacityStep } from './CapacityStep';

interface DetailsStepProps {
  wizard: ReturnType<typeof useRentalObjectWizard>;
}

export function DetailsStep({ wizard }: DetailsStepProps) {
  const t = useT();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-8)' }}>
      <div>
        <Heading level={2} data-size="md" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
          {t('wizard.step.details')}
        </Heading>
      </div>

      {/* Render Location Step Content */}
      <LocationStep wizard={wizard} />

      {/* Render Capacity Step Content */}
      <div style={{ paddingTop: 'var(--ds-spacing-8)', borderTop: '1px solid var(--ds-color-neutral-border-default)' }}>
         <CapacityStep wizard={wizard} />
      </div>
    </div>
  );
}
