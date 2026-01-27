/* eslint-disable no-restricted-syntax */
/**
 * AddOnsSelector
 *
 * A domain-neutral pattern for selecting optional add-ons with quantity controls.
 * Useful for booking extras, product upsells, subscription features, etc.
 *
 * NOTE: Uses raw <button> elements for compact quantity +/- controls.
 *
 * @example
 * ```tsx
 * <AddOnsSelector
 *   addOns={[
 *     { id: '1', name: 'Projector', price: 500, unit: 'per_booking' },
 *     { id: '2', name: 'Catering', price: 150, unit: 'per_person', maxQuantity: 50 },
 *   ]}
 *   selectedAddOns={[{ addOnId: '1', quantity: 1 }]}
 *   onChange={(selected) => setSelected(selected)}
 *   formatPrice={(price) => `${price} kr`}
 * />
 * ```
 */
import * as React from 'react';
import type { ReactNode } from 'react';
import { Paragraph, Checkbox, Tag } from '@xala-technologies/platform-ui-core';

// ============================================================================
// Types
// ============================================================================

/** Pricing unit type */
export type AddOnPricingUnit =
  | 'per_booking'
  | 'per_hour'
  | 'per_day'
  | 'per_unit'
  | 'per_person'
  | string;

/** Add-on item definition */
export interface AddOnItem {
  /** Unique identifier */
  id: string;
  /** Display name */
  name: string;
  /** Optional description */
  description?: string;
  /** Price per unit */
  price: number;
  /** Pricing unit type */
  unit: AddOnPricingUnit;
  /** Maximum quantity allowed */
  maxQuantity?: number;
  /** Category for grouping */
  category?: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Whether this add-on is required */
  isRequired?: boolean;
  /** Whether this add-on requires approval */
  requiresApproval?: boolean;
  /** Whether this add-on is disabled */
  disabled?: boolean;
}

/** Selected add-on with quantity */
export interface SelectedAddOn {
  /** Add-on ID */
  addOnId: string;
  /** Selected quantity */
  quantity: number;
}

/** Localized labels */
export interface AddOnsSelectorLabels {
  /** Title text */
  title?: string;
  /** Selected count template (use {count} placeholder) */
  selectedCount?: string;
  /** Category fallback text */
  defaultCategory?: string;
  /** Quantity label */
  quantity?: string;
  /** Total label */
  totalLabel?: string;
  /** Required badge text */
  required?: string;
  /** Requires approval badge text */
  requiresApproval?: string;
  /** Unit label for per_booking */
  unitPerBooking?: string;
  /** Unit label for per_hour */
  unitPerHour?: string;
  /** Unit label for per_day */
  unitPerDay?: string;
  /** Unit label for per_unit */
  unitPerUnit?: string;
  /** Unit label for per_person */
  unitPerPerson?: string;
}

/** AddOnsSelector props */
export interface AddOnsSelectorProps {
  /** Available add-ons */
  addOns: AddOnItem[];

  /** Currently selected add-ons with quantities */
  selectedAddOns: SelectedAddOn[];

  /** Callback when selection changes */
  onChange: (selected: SelectedAddOn[]) => void;

  /** Duration multiplier for per_hour pricing */
  durationHours?: number;

  /** Custom price formatter */
  formatPrice?: (price: number) => string;

  /** Whether the selector is disabled */
  disabled?: boolean;

  /** Whether to show the total section */
  showTotal?: boolean;

  /** Whether to group by category */
  groupByCategory?: boolean;

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Localized labels */
  labels?: AddOnsSelectorLabels;

  /** Custom class name */
  className?: string;

  /** Test ID for testing */
  'data-testid'?: string;
}

// ============================================================================
// Default Labels
// ============================================================================

const DEFAULT_LABELS: Required<AddOnsSelectorLabels> = {
  title: 'Additional Options',
  selectedCount: '{count} selected',
  defaultCategory: 'Options',
  quantity: 'Quantity',
  totalLabel: 'Add-ons total',
  required: 'Required',
  requiresApproval: 'Requires approval',
  unitPerBooking: '/booking',
  unitPerHour: '/hour',
  unitPerDay: '/day',
  unitPerUnit: '/unit',
  unitPerPerson: '/person',
};

// ============================================================================
// Icons
// ============================================================================

function PlusIcon({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function MinusIcon({ size = 16 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

// ============================================================================
// Helpers
// ============================================================================

function formatCount(template: string, count: number): string {
  return template.replace('{count}', String(count));
}

function defaultFormatPrice(price: number): string {
  return price.toLocaleString();
}

// ============================================================================
// Main Component
// ============================================================================

export function AddOnsSelector({
  addOns,
  selectedAddOns,
  onChange,
  durationHours = 1,
  formatPrice = defaultFormatPrice,
  disabled = false,
  showTotal = true,
  groupByCategory = true,
  size = 'md',
  labels = {},
  className,
  'data-testid': testId = 'add-ons-selector',
}: AddOnsSelectorProps): React.ReactElement | null {
  const mergedLabels: Required<AddOnsSelectorLabels> = {
    ...DEFAULT_LABELS,
    ...labels,
  };

  // Don't render if no add-ons available
  if (!addOns || addOns.length === 0) {
    return null;
  }

  // Group add-ons by category
  const groupedAddOns = groupByCategory
    ? addOns.reduce(
        (acc, addOn) => {
          const category = addOn.category || mergedLabels.defaultCategory;
          if (!acc[category]) {
            acc[category] = [];
          }
          acc[category].push(addOn);
          return acc;
        },
        {} as Record<string, AddOnItem[]>
      )
    : { [mergedLabels.defaultCategory]: addOns };

  // Get selected quantity for an add-on
  const getSelectedQuantity = (addOnId: string): number => {
    const selected = selectedAddOns.find((s) => s.addOnId === addOnId);
    return selected?.quantity ?? 0;
  };

  // Check if add-on is selected
  const isSelected = (addOnId: string): boolean => {
    return getSelectedQuantity(addOnId) > 0;
  };

  // Toggle add-on selection
  const toggleAddOn = (addOn: AddOnItem) => {
    if (addOn.disabled || (disabled && !addOn.isRequired)) return;

    if (isSelected(addOn.id)) {
      // Remove from selection
      onChange(selectedAddOns.filter((s) => s.addOnId !== addOn.id));
    } else {
      // Add with quantity 1
      onChange([...selectedAddOns, { addOnId: addOn.id, quantity: 1 }]);
    }
  };

  // Update quantity for an add-on
  const updateQuantity = (addOnId: string, delta: number) => {
    const addOn = addOns.find((a) => a.id === addOnId);
    if (!addOn || addOn.disabled || disabled) return;

    const currentQuantity = getSelectedQuantity(addOnId);
    const newQuantity = Math.max(0, Math.min(currentQuantity + delta, addOn.maxQuantity ?? 99));

    if (newQuantity === 0) {
      onChange(selectedAddOns.filter((s) => s.addOnId !== addOnId));
    } else {
      const existing = selectedAddOns.find((s) => s.addOnId === addOnId);
      if (existing) {
        onChange(
          selectedAddOns.map((s) => (s.addOnId === addOnId ? { ...s, quantity: newQuantity } : s))
        );
      } else {
        onChange([...selectedAddOns, { addOnId, quantity: newQuantity }]);
      }
    }
  };

  // Calculate total price for add-ons
  const calculateTotal = (): number => {
    return selectedAddOns.reduce((total, selected) => {
      const addOn = addOns.find((a) => a.id === selected.addOnId);
      if (!addOn) return total;

      let price = addOn.price * selected.quantity;
      if (addOn.unit === 'per_hour') {
        price *= durationHours;
      }
      return total + price;
    }, 0);
  };

  // Get unit label
  const getUnitLabel = (unit: string): string => {
    switch (unit) {
      case 'per_booking':
        return mergedLabels.unitPerBooking;
      case 'per_hour':
        return mergedLabels.unitPerHour;
      case 'per_day':
        return mergedLabels.unitPerDay;
      case 'per_unit':
        return mergedLabels.unitPerUnit;
      case 'per_person':
        return mergedLabels.unitPerPerson;
      default:
        return unit;
    }
  };

  const isSmall = size === 'sm';
  const isLarge = size === 'lg';

  const totalPrice = calculateTotal();
  const selectedCount = selectedAddOns.length;

  return (
    <div className={className} data-testid={testId}>
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 'var(--ds-spacing-3)',
        }}
      >
        <Paragraph
          data-size={isSmall ? 'sm' : 'md'}
          style={{
            margin: 0,
            fontWeight: 'var(--ds-font-weight-medium)',
            color: 'var(--ds-color-neutral-text-default)',
          }}
        >
          {mergedLabels.title}
        </Paragraph>
        {selectedCount > 0 && (
          <Tag data-color="accent" data-size={isSmall ? 'sm' : 'md'}>
            {formatCount(mergedLabels.selectedCount, selectedCount)}
          </Tag>
        )}
      </div>

      {/* Grouped Add-ons */}
      {Object.entries(groupedAddOns).map(([category, categoryAddOns]) => (
        <div key={category} style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          {/* Category header */}
          {Object.keys(groupedAddOns).length > 1 && (
            <Paragraph
              data-size="xs"
              style={{
                margin: 0,
                marginBottom: 'var(--ds-spacing-2)',
                color: 'var(--ds-color-neutral-text-subtle)',
                textTransform: 'uppercase',
                letterSpacing: '0.5px',
              }}
            >
              {category}
            </Paragraph>
          )}

          {/* Add-on items */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
            {categoryAddOns.map((addOn) => {
              const selected = isSelected(addOn.id);
              const quantity = getSelectedQuantity(addOn.id);
              const hasQuantityControl = (addOn.maxQuantity ?? 1) > 1;
              const isItemDisabled = disabled || addOn.disabled;

              return (
                <div
                  key={addOn.id}
                  style={{
                    display: 'flex',
                    alignItems: 'flex-start',
                    gap: 'var(--ds-spacing-3)',
                    padding: isSmall
                      ? 'var(--ds-spacing-2)'
                      : isLarge
                        ? 'var(--ds-spacing-4)'
                        : 'var(--ds-spacing-3)',
                    borderRadius: 'var(--ds-border-radius-md)',
                    backgroundColor: selected
                      ? 'var(--ds-color-accent-surface-default)'
                      : 'var(--ds-color-neutral-surface-default)',
                    border: selected
                      ? '2px solid var(--ds-color-accent-border-default)'
                      : '1px solid var(--ds-color-neutral-border-subtle)',
                    opacity: isItemDisabled ? 0.6 : 1,
                  }}
                >
                  <Checkbox
                    checked={selected}
                    onChange={() => toggleAddOn(addOn)}
                    disabled={isItemDisabled || addOn.isRequired}
                    aria-label={addOn.name}
                  />

                  <div style={{ flex: 1 }}>
                    {/* Name and badges row */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: 'var(--ds-spacing-1)',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--ds-spacing-2)',
                          flexWrap: 'wrap',
                        }}
                      >
                        {addOn.icon && (
                          <span
                            style={{
                              display: 'flex',
                              color: 'var(--ds-color-neutral-text-subtle)',
                            }}
                          >
                            {addOn.icon}
                          </span>
                        )}
                        <Paragraph
                          data-size={isSmall ? 'sm' : 'md'}
                          style={{
                            margin: 0,
                            fontWeight: 'var(--ds-font-weight-medium)',
                            color: selected
                              ? 'var(--ds-color-accent-text-default)'
                              : 'var(--ds-color-neutral-text-default)',
                          }}
                        >
                          {addOn.name}
                        </Paragraph>
                        {addOn.isRequired && (
                          <Tag data-color="info" data-size="sm">
                            {mergedLabels.required}
                          </Tag>
                        )}
                        {addOn.requiresApproval && (
                          <Tag data-color="warning" data-size="sm">
                            {mergedLabels.requiresApproval}
                          </Tag>
                        )}
                      </div>

                      {/* Price */}
                      <Paragraph
                        data-size={isSmall ? 'sm' : 'md'}
                        style={{
                          margin: 0,
                          fontWeight: 'var(--ds-font-weight-semibold)',
                          color: 'var(--ds-color-neutral-text-default)',
                          whiteSpace: 'nowrap',
                        }}
                      >
                        {formatPrice(addOn.price)}
                        <span
                          style={{
                            fontSize: 'var(--ds-font-size-xs)',
                            color: 'var(--ds-color-neutral-text-subtle)',
                            fontWeight: 'var(--ds-font-weight-regular)',
                          }}
                        >
                          {' '}
                          {getUnitLabel(addOn.unit)}
                        </span>
                      </Paragraph>
                    </div>

                    {/* Description */}
                    {addOn.description && (
                      <Paragraph
                        data-size="xs"
                        style={{
                          margin: 0,
                          color: 'var(--ds-color-neutral-text-subtle)',
                        }}
                      >
                        {addOn.description}
                      </Paragraph>
                    )}

                    {/* Quantity control */}
                    {selected && hasQuantityControl && (
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: 'var(--ds-spacing-2)',
                          marginTop: 'var(--ds-spacing-2)',
                        }}
                      >
                        <Paragraph
                          data-size="xs"
                          style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
                        >
                          {mergedLabels.quantity}:
                        </Paragraph>
                        <div
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--ds-spacing-1)',
                          }}
                        >
                          <button
                            type="button"
                            onClick={() => updateQuantity(addOn.id, -1)}
                            disabled={isItemDisabled || quantity <= 1}
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: 'var(--ds-border-radius-sm)',
                              border: '1px solid var(--ds-color-neutral-border-subtle)',
                              backgroundColor: 'var(--ds-color-neutral-surface-default)',
                              cursor: isItemDisabled || quantity <= 1 ? 'not-allowed' : 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              opacity: quantity <= 1 ? 0.5 : 1,
                            }}
                            aria-label="Decrease quantity"
                          >
                            <MinusIcon />
                          </button>
                          <span
                            style={{
                              minWidth: '30px',
                              textAlign: 'center',
                              fontWeight: 'var(--ds-font-weight-medium)',
                            }}
                          >
                            {quantity}
                          </span>
                          <button
                            type="button"
                            onClick={() => updateQuantity(addOn.id, 1)}
                            disabled={isItemDisabled || quantity >= (addOn.maxQuantity ?? 99)}
                            style={{
                              width: '28px',
                              height: '28px',
                              borderRadius: 'var(--ds-border-radius-sm)',
                              border: '1px solid var(--ds-color-neutral-border-subtle)',
                              backgroundColor: 'var(--ds-color-neutral-surface-default)',
                              cursor:
                                isItemDisabled || quantity >= (addOn.maxQuantity ?? 99)
                                  ? 'not-allowed'
                                  : 'pointer',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              opacity: quantity >= (addOn.maxQuantity ?? 99) ? 0.5 : 1,
                            }}
                            aria-label="Increase quantity"
                          >
                            <PlusIcon />
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      ))}

      {/* Total */}
      {showTotal && selectedCount > 0 && (
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-md)',
            marginTop: 'var(--ds-spacing-2)',
          }}
        >
          <Paragraph
            data-size="sm"
            style={{
              margin: 0,
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {mergedLabels.totalLabel}:
          </Paragraph>
          <Paragraph
            data-size="sm"
            style={{
              margin: 0,
              fontWeight: 'var(--ds-font-weight-semibold)',
              color: 'var(--ds-color-neutral-text-default)',
            }}
          >
            + {formatPrice(totalPrice)}
          </Paragraph>
        </div>
      )}
    </div>
  );
}

export default AddOnsSelector;
