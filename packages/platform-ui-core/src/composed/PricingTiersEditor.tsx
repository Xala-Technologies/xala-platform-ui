/**
 * PricingTiersEditor Component
 *
 * Editable list of pricing tiers by target group.
 * Used in admin wizard for price configuration.
 *
 * @example
 * ```tsx
 * import { PricingTiersEditor } from '@xala-technologies/platform/ui';
 *
 * const [tiers, setTiers] = useState([
 *   { id: '1', targetGroup: 'Voksne', price: 500, unit: 'per_hour' },
 *   { id: '2', targetGroup: 'Barn', price: 250, unit: 'per_hour' },
 * ]);
 *
 * <PricingTiersEditor
 *   tiers={tiers}
 *   onChange={setTiers}
 * />
 * ```
 */

import * as React from 'react';
import {
  Button,
  Textfield,
  Select,
  Fieldset,
  Paragraph,
  Label,
} from '@digdir/designsystemet-react';
import { cn } from '../utils';

// =============================================================================
// Types
// =============================================================================

export type PriceUnit = 'per_hour' | 'per_day' | 'per_unit' | 'per_person';

export interface PricingTier {
  /** Unique identifier */
  id: string;
  /** Target group name */
  targetGroup: string;
  /** Price amount */
  price: number;
  /** Price unit */
  unit: PriceUnit;
}

export interface PricingTiersEditorLabels {
  /** Fieldset legend */
  legend?: string;
  /** Helper text */
  helperText?: string;
  /** Column headers */
  targetGroup?: string;
  price?: string;
  unit?: string;
  /** Actions */
  addTier?: string;
  remove?: string;
  /** Unit labels */
  perHour?: string;
  perDay?: string;
  perUnit?: string;
  perPerson?: string;
  /** Placeholder */
  targetGroupPlaceholder?: string;
  /** Empty state */
  emptyMessage?: string;
}

export interface PricingTiersEditorProps {
  /** Current pricing tiers */
  tiers: PricingTier[];
  /** Change handler */
  onChange: (tiers: PricingTier[]) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Localization labels */
  labels?: PricingTiersEditorLabels;
  /** Currency symbol */
  currency?: string;
  /** Additional className */
  className?: string;
}

// =============================================================================
// Default labels (Norwegian)
// =============================================================================

const defaultLabels: Required<PricingTiersEditorLabels> = {
  legend: 'Priser',
  helperText: 'Legg til priser for ulike målgrupper',
  targetGroup: 'Målgruppe',
  price: 'Pris',
  unit: 'Enhet',
  addTier: '+ Legg til pris',
  remove: 'Fjern',
  perHour: 'Per time',
  perDay: 'Per dag',
  perUnit: 'Per enhet',
  perPerson: 'Per person',
  targetGroupPlaceholder: 'F.eks. Voksne, Barn, Student',
  emptyMessage: 'Ingen priser lagt til ennå',
};

// =============================================================================
// Utility
// =============================================================================

const generateId = (): string => `tier-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;

// =============================================================================
// Component
// =============================================================================

/**
 * PricingTiersEditor provides an editable list of pricing tiers.
 *
 * Accessibility:
 * - Fieldset with legend for grouping
 * - Labeled inputs
 * - Keyboard navigation
 */
export function PricingTiersEditor({
  tiers,
  onChange,
  disabled = false,
  labels: customLabels,
  currency = 'kr',
  className,
}: PricingTiersEditorProps): React.ReactElement {
  const labels = { ...defaultLabels, ...customLabels };

  const handleAddTier = () => {
    const newTier: PricingTier = {
      id: generateId(),
      targetGroup: '',
      price: 0,
      unit: 'per_hour',
    };
    onChange([...tiers, newTier]);
  };

  const handleRemoveTier = (id: string) => {
    onChange(tiers.filter((t) => t.id !== id));
  };

  const handleUpdateTier = (id: string, field: keyof PricingTier, value: string | number) => {
    onChange(tiers.map((tier) => (tier.id === id ? { ...tier, [field]: value } : tier)));
  };

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-3)',
  };

  const rowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 120px 140px auto',
    gap: 'var(--ds-spacing-3)',
    alignItems: 'end',
    padding: 'var(--ds-spacing-3)',
    backgroundColor: 'var(--ds-color-neutral-surface-default)',
    borderRadius: 'var(--ds-border-radius-md)',
    border: '1px solid var(--ds-color-neutral-border-subtle)',
  };

  const headerRowStyle: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: '1fr 120px 140px auto',
    gap: 'var(--ds-spacing-3)',
    padding: '0 var(--ds-spacing-3)',
  };

  return (
    <Fieldset className={cn('pricing-tiers-editor', className)}>
      <Fieldset.Legend>{labels.legend}</Fieldset.Legend>
      <Fieldset.Description>{labels.helperText}</Fieldset.Description>

      <div style={containerStyle}>
        {tiers.length > 0 && (
          <div style={headerRowStyle} aria-hidden="true">
            <Paragraph
              data-size="xs"
              style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}
            >
              {labels.targetGroup}
            </Paragraph>
            <Paragraph
              data-size="xs"
              style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}
            >
              {labels.price} ({currency})
            </Paragraph>
            <Paragraph
              data-size="xs"
              style={{ margin: 0, fontWeight: 'var(--ds-font-weight-medium)' }}
            >
              {labels.unit}
            </Paragraph>
            <div style={{ width: 80 }} />
          </div>
        )}

        {tiers.length === 0 && (
          <Paragraph
            data-size="sm"
            style={{
              margin: 0,
              padding: 'var(--ds-spacing-4)',
              textAlign: 'center',
              color: 'var(--ds-color-neutral-text-subtle)',
              backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
              borderRadius: 'var(--ds-border-radius-md)',
            }}
          >
            {labels.emptyMessage}
          </Paragraph>
        )}

        {tiers.map((tier, index) => {
          const targetGroupId = `tier-${tier.id}-group`;
          const priceId = `tier-${tier.id}-price`;
          const unitId = `tier-${tier.id}-unit`;
          const targetGroupLabelId = `tier-${tier.id}-group-label`;
          const priceLabelId = `tier-${tier.id}-price-label`;
          const unitLabelId = `tier-${tier.id}-unit-label`;

          return (
            <div key={tier.id} style={rowStyle} role="group" aria-label={`Pris ${index + 1}`}>
              <div>
                <Label
                  id={targetGroupLabelId}
                  htmlFor={targetGroupId}
                  style={{
                    position: 'absolute',
                    width: 1,
                    height: 1,
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                  }}
                >
                  {labels.targetGroup}
                </Label>
                <Textfield
                  id={targetGroupId}
                  value={tier.targetGroup}
                  onChange={(e) => handleUpdateTier(tier.id, 'targetGroup', e.target.value)}
                  placeholder={labels.targetGroupPlaceholder}
                  disabled={disabled}
                  data-size="sm"
                  aria-labelledby={targetGroupLabelId}
                />
              </div>

              <div>
                <Label
                  id={priceLabelId}
                  htmlFor={priceId}
                  style={{
                    position: 'absolute',
                    width: 1,
                    height: 1,
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                  }}
                >
                  {labels.price}
                </Label>
                <Textfield
                  id={priceId}
                  type="number"
                  value={tier.price.toString()}
                  onChange={(e) =>
                    handleUpdateTier(tier.id, 'price', parseFloat(e.target.value) || 0)
                  }
                  disabled={disabled}
                  data-size="sm"
                  aria-labelledby={priceLabelId}
                />
              </div>

              <div>
                <Label
                  id={unitLabelId}
                  htmlFor={unitId}
                  style={{
                    position: 'absolute',
                    width: 1,
                    height: 1,
                    overflow: 'hidden',
                    clip: 'rect(0, 0, 0, 0)',
                  }}
                >
                  {labels.unit}
                </Label>
                <Select
                  id={unitId}
                  value={tier.unit}
                  onChange={(e) => handleUpdateTier(tier.id, 'unit', e.target.value as PriceUnit)}
                  disabled={disabled}
                  data-size="sm"
                  aria-labelledby={unitLabelId}
                >
                  <option value="per_hour">{labels.perHour}</option>
                  <option value="per_day">{labels.perDay}</option>
                  <option value="per_unit">{labels.perUnit}</option>
                  <option value="per_person">{labels.perPerson}</option>
                </Select>
              </div>

              <Button
                variant="tertiary"
                data-size="sm"
                data-color="danger"
                onClick={() => handleRemoveTier(tier.id)}
                disabled={disabled}
                aria-label={`${labels.remove} ${tier.targetGroup || `pris ${index + 1}`}`}
              >
                {labels.remove}
              </Button>
            </div>
          );
        })}

        <Button
          variant="secondary"
          data-size="sm"
          onClick={handleAddTier}
          disabled={disabled}
          style={{ alignSelf: 'flex-start' }}
        >
          {labels.addTier}
        </Button>
      </div>
    </Fieldset>
  );
}

PricingTiersEditor.displayName = 'PricingTiersEditor';
