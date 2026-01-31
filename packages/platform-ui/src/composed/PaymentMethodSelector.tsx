/**
 * PaymentMethodSelector Component
 *
 * Chip-based payment method indicator/selector.
 * Shows available payment methods (Kort, Vipps, Faktura).
 *
 * @example
 * ```tsx
 * import { PaymentMethodSelector } from '@xala-technologies/platform/ui';
 *
 * // Read-only display
 * <PaymentMethodSelector
 *   methods={[
 *     { id: 'card', label: 'Kort' },
 *     { id: 'vipps', label: 'Vipps' },
 *   ]}
 *   readOnly
 * />
 *
 * // Selectable
 * <PaymentMethodSelector
 *   methods={methods}
 *   selectedMethod="card"
 *   onSelect={setSelectedMethod}
 * />
 * ```
 */

import * as React from 'react';
import { Button, Paragraph } from '@digdir/designsystemet-react';
import { cn } from '../utils';
import { CheckIcon } from '../primitives/icons';

// =============================================================================
// Types
// =============================================================================

export interface PaymentMethod {
  /** Unique identifier */
  id: string;
  /** Display label */
  label: string;
  /** Optional icon */
  icon?: React.ReactNode;
  /** Whether this method is disabled */
  disabled?: boolean;
}

export interface PaymentMethodSelectorLabels {
  /** Screen reader label for the group */
  groupLabel?: string;
  /** Label shown above methods */
  title?: string;
}

export interface PaymentMethodSelectorProps {
  /** Available payment methods */
  methods: PaymentMethod[];
  /** Currently selected method ID (single selection) */
  selectedMethod?: string;
  /** Selection handler */
  onSelect?: (methodId: string) => void;
  /** Read-only mode (display only) */
  readOnly?: boolean;
  /** Localization labels */
  labels?: PaymentMethodSelectorLabels;
  /** Size variant */
  size?: 'sm' | 'md';
  /** Additional className */
  className?: string;
}

// =============================================================================
// Default labels
// =============================================================================

const defaultLabels: Required<PaymentMethodSelectorLabels> = {
  groupLabel: 'Betalingsmetoder',
  title: 'Aksepterte betalingsmetoder',
};

// =============================================================================
// Default payment methods (Norwegian)
// =============================================================================

export const defaultPaymentMethods: PaymentMethod[] = [
  { id: 'card', label: 'Kort' },
  { id: 'vipps', label: 'Vipps' },
  { id: 'invoice', label: 'Faktura (EHF)' },
];

export const defaultPaymentMethodsEn: PaymentMethod[] = [
  { id: 'card', label: 'Card' },
  { id: 'vipps', label: 'Vipps' },
  { id: 'invoice', label: 'Invoice' },
];

// =============================================================================
// Component
// =============================================================================

/**
 * PaymentMethodSelector displays available payment methods as selectable chips.
 *
 * Accessibility:
 * - Uses role="group" for proper grouping
 * - Keyboard navigation between options
 * - Clear selected state indication with icon
 */
export function PaymentMethodSelector({
  methods,
  selectedMethod,
  onSelect,
  readOnly = false,
  labels: customLabels,
  size = 'md',
  className,
}: PaymentMethodSelectorProps): React.ReactElement {
  const labels = { ...defaultLabels, ...customLabels };
  const isInteractive = !readOnly && Boolean(onSelect);

  const containerStyle: React.CSSProperties = {
    display: 'flex',
    flexWrap: 'wrap',
    gap: 'var(--ds-spacing-2)',
  };

  const chipStyle = (selected: boolean): React.CSSProperties => ({
    display: 'inline-flex',
    alignItems: 'center',
    gap: 'var(--ds-spacing-1)',
    padding:
      size === 'sm'
        ? 'var(--ds-spacing-1) var(--ds-spacing-2)'
        : 'var(--ds-spacing-2) var(--ds-spacing-3)',
    borderRadius: 'var(--ds-border-radius-full)',
    backgroundColor: selected
      ? 'var(--ds-color-accent-surface-default)'
      : 'var(--ds-color-neutral-surface-default)',
    border: selected
      ? '1.5px solid var(--ds-color-accent-border-default)'
      : '1.5px solid var(--ds-color-neutral-border-default)',
    color: selected
      ? 'var(--ds-color-accent-text-default)'
      : 'var(--ds-color-neutral-text-default)',
    fontSize: size === 'sm' ? 'var(--ds-font-size-xs)' : 'var(--ds-font-size-sm)',
    fontWeight: 'var(--ds-font-weight-medium)',
  });

  const handleSelect = (methodId: string) => {
    if (isInteractive && onSelect) {
      onSelect(methodId);
    }
  };

  if (readOnly) {
    return (
      <div
        className={cn('payment-method-selector', className)}
        style={containerStyle}
        role="group"
        aria-label={labels.groupLabel}
      >
        {methods.map((method) => (
          <Paragraph
            key={method.id}
            data-size={size}
            style={{
              ...chipStyle(true),
              margin: 0,
            }}
          >
            {method.icon}
            <CheckIcon size={size === 'sm' ? 12 : 14} />
            {method.label}
          </Paragraph>
        ))}
      </div>
    );
  }

  return (
    <div
      className={cn('payment-method-selector', className)}
      style={containerStyle}
      role="group"
      aria-label={labels.groupLabel}
    >
      {methods.map((method) => {
        const isSelected = selectedMethod === method.id;

        return (
          <Button
            key={method.id}
            variant="tertiary"
            data-size={size}
            onClick={() => handleSelect(method.id)}
            disabled={method.disabled}
            aria-pressed={isSelected}
            style={chipStyle(isSelected)}
          >
            {method.icon}
            {isSelected && <CheckIcon size={size === 'sm' ? 12 : 14} />}
            {method.label}
          </Button>
        );
      })}
    </div>
  );
}

PaymentMethodSelector.displayName = 'PaymentMethodSelector';
