/**
 * PaymentMethodConfig Component
 *
 * Checkbox list for enabling/disabling payment methods in admin.
 * Used in admin wizard for payment configuration.
 *
 * @example
 * ```tsx
 * import { PaymentMethodConfig } from '@xala-technologies/platform/ui';
 *
 * const [enabled, setEnabled] = useState({
 *   invoice: true,
 *   card: true,
 *   vipps: false,
 *   external: false,
 * });
 *
 * <PaymentMethodConfig
 *   value={enabled}
 *   onChange={setEnabled}
 * />
 * ```
 */

import * as React from 'react';
import { Checkbox, Fieldset, Paragraph, Label } from '@digdir/designsystemet-react';
import { cn } from '../utils';

// =============================================================================
// Types
// =============================================================================

export interface EnabledPaymentMethods {
  /** Enable invoice (EHF) payment */
  invoice: boolean;
  /** Enable card payment */
  card: boolean;
  /** Enable Vipps payment */
  vipps: boolean;
  /** Enable external/offline payment */
  external: boolean;
}

export interface PaymentMethodConfigLabels {
  /** Fieldset legend */
  legend?: string;
  /** Helper text */
  helperText?: string;
  /** Method labels */
  invoice?: string;
  card?: string;
  vipps?: string;
  external?: string;
  /** Method descriptions */
  invoiceDescription?: string;
  cardDescription?: string;
  vippsDescription?: string;
  externalDescription?: string;
}

export interface PaymentMethodConfigProps {
  /** Current enabled state */
  value: EnabledPaymentMethods;
  /** Change handler */
  onChange: (value: EnabledPaymentMethods) => void;
  /** Disabled state */
  disabled?: boolean;
  /** Localization labels */
  labels?: PaymentMethodConfigLabels;
  /** Additional className */
  className?: string;
}

// =============================================================================
// Default labels (Norwegian)
// =============================================================================

const defaultLabels: Required<PaymentMethodConfigLabels> = {
  legend: 'Betalingsmetoder',
  helperText: 'Velg hvilke betalingsmetoder som skal være tilgjengelige',
  invoice: 'Faktura (EHF)',
  card: 'Kort',
  vipps: 'Vipps',
  external: 'Betaling utenfor systemet',
  invoiceDescription: 'Elektronisk faktura til organisasjoner',
  cardDescription: 'Visa, Mastercard og andre korttransaksjoner',
  vippsDescription: 'Norsk mobilbetaling',
  externalDescription: 'For betalinger som håndteres manuelt',
};

// =============================================================================
// Method order
// =============================================================================

type PaymentMethodKey = keyof EnabledPaymentMethods;

const methodOrder: PaymentMethodKey[] = ['invoice', 'card', 'vipps', 'external'];

// =============================================================================
// Component
// =============================================================================

/**
 * PaymentMethodConfig provides checkbox configuration for payment methods.
 *
 * Accessibility:
 * - Fieldset with legend for grouping
 * - Checkbox labels with descriptions
 * - Keyboard navigation
 */
export function PaymentMethodConfig({
  value,
  onChange,
  disabled = false,
  labels: customLabels,
  className,
}: PaymentMethodConfigProps): React.ReactElement {
  const labels = { ...defaultLabels, ...customLabels };

  const handleChange = (method: PaymentMethodKey, checked: boolean) => {
    onChange({
      ...value,
      [method]: checked,
    });
  };

  const getMethodLabel = (method: PaymentMethodKey): string => {
    return labels[method];
  };

  const getMethodDescription = (method: PaymentMethodKey): string => {
    const descKey = `${method}Description` as keyof PaymentMethodConfigLabels;
    return labels[descKey] || '';
  };

  const itemStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-1)',
    padding: 'var(--ds-spacing-3)',
    backgroundColor: 'var(--ds-color-neutral-surface-default)',
    borderRadius: 'var(--ds-border-radius-md)',
    border: '1px solid var(--ds-color-neutral-border-subtle)',
  };

  const checkboxContainerStyle: React.CSSProperties = {
    display: 'flex',
    alignItems: 'flex-start',
    gap: 'var(--ds-spacing-3)',
  };

  const labelContainerStyle: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: 'var(--ds-spacing-1)',
    flex: 1,
  };

  return (
    <Fieldset className={cn('payment-method-config', className)}>
      <Fieldset.Legend>{labels.legend}</Fieldset.Legend>
      <Fieldset.Description>{labels.helperText}</Fieldset.Description>

      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          gap: 'var(--ds-spacing-2)',
          marginTop: 'var(--ds-spacing-3)',
        }}
      >
        {methodOrder.map((method) => {
          const methodLabel = getMethodLabel(method);
          const methodDescription = getMethodDescription(method);
          const checkboxId = `payment-${method}`;
          const labelId = `payment-${method}-label`;

          return (
            <div key={method} style={itemStyle}>
              <div style={checkboxContainerStyle}>
                <Checkbox
                  id={checkboxId}
                  checked={value[method]}
                  onChange={(e) => handleChange(method, e.target.checked)}
                  disabled={disabled}
                  value={method}
                  aria-labelledby={labelId}
                />
                <div style={labelContainerStyle}>
                  <Label
                    id={labelId}
                    htmlFor={checkboxId}
                    style={{
                      cursor: disabled ? 'default' : 'pointer',
                      fontWeight: 'var(--ds-font-weight-medium)',
                    }}
                  >
                    {methodLabel}
                  </Label>
                  {methodDescription && (
                    <Paragraph
                      data-size="xs"
                      style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
                    >
                      {methodDescription}
                    </Paragraph>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Fieldset>
  );
}

PaymentMethodConfig.displayName = 'PaymentMethodConfig';
