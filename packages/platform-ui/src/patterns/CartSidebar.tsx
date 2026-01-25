/* eslint-disable no-restricted-syntax */
/**
 * CartSidebar
 *
 * A domain-neutral sidebar component for displaying selected items with pricing.
 * Useful for booking carts, shopping carts, selection summaries, etc.
 *
 * NOTE: Uses raw <button> elements for compact remove item controls.
 *
 * @example
 * ```tsx
 * <CartSidebar
 *   items={[
 *     { id: '1', title: 'Meeting Room A', subtitle: 'Mon, Jan 15 • 09:00-11:00', price: 500 },
 *     { id: '2', title: 'Meeting Room A', subtitle: 'Tue, Jan 16 • 14:00-16:00', price: 500 },
 *   ]}
 *   summary={{
 *     subtotal: 1000,
 *     tax: 250,
 *     taxLabel: 'VAT (25%)',
 *     total: 1250,
 *   }}
 *   onRemoveItem={(id) => handleRemove(id)}
 *   onCheckout={() => handleCheckout()}
 *   labels={{
 *     title: 'Your Selection',
 *     emptyTitle: 'No items selected',
 *     checkout: 'Continue to checkout',
 *   }}
 * />
 * ```
 */
import * as React from 'react';
import type { ReactNode } from 'react';
import { Button, Card, Heading, Paragraph } from '@digdir/designsystemet-react';
import { XMarkIcon } from '@navikt/aksel-icons';

// ============================================================================
// Types
// ============================================================================

/** Cart item */
export interface CartItem {
  /** Unique identifier */
  id: string;
  /** Item title */
  title: string;
  /** Item subtitle (e.g., date, time, variant) */
  subtitle?: string;
  /** Item description */
  description?: string;
  /** Price (numeric value) */
  price?: number;
  /** Formatted price string (overrides price) */
  formattedPrice?: string;
  /** Quantity */
  quantity?: number;
  /** Icon or image */
  icon?: ReactNode;
  /** Whether item can be removed */
  removable?: boolean;
  /** Additional metadata to display */
  metadata?: Array<{ label: string; value: string }>;
}

/** Price breakdown line */
export interface PriceBreakdownLine {
  /** Label for the line */
  label: string;
  /** Amount */
  amount: number;
  /** Formatted amount (overrides amount) */
  formattedAmount?: string;
  /** Whether this is a discount (negative styling) */
  isDiscount?: boolean;
}

/** Cart summary */
export interface CartSummary {
  /** Subtotal before tax */
  subtotal?: number;
  /** Formatted subtotal */
  formattedSubtotal?: string;
  /** Tax amount */
  tax?: number;
  /** Formatted tax */
  formattedTax?: string;
  /** Tax label (e.g., "VAT (25%)") */
  taxLabel?: string;
  /** Total amount */
  total: number;
  /** Formatted total */
  formattedTotal?: string;
  /** Additional breakdown lines */
  breakdownLines?: PriceBreakdownLine[];
}

/** Localized labels */
export interface CartSidebarLabels {
  /** Sidebar title */
  title?: string;
  /** Empty state title */
  emptyTitle?: string;
  /** Empty state description */
  emptyDescription?: string;
  /** Subtotal label */
  subtotalLabel?: string;
  /** Total label */
  totalLabel?: string;
  /** Checkout/continue button */
  checkout?: string;
  /** Remove item aria label template */
  removeItem?: string;
  /** Item count template */
  itemCount?: string;
}

/** CartSidebar props */
export interface CartSidebarProps {
  /** Array of cart items */
  items: CartItem[];

  /** Price summary */
  summary?: CartSummary;

  /** Handler for removing an item */
  onRemoveItem?: (itemId: string) => void;

  /** Handler for item click */
  onItemClick?: (itemId: string) => void;

  /** Handler for checkout/continue action */
  onCheckout?: () => void;

  /** Whether checkout is disabled */
  checkoutDisabled?: boolean;

  /** Whether checkout is loading */
  checkoutLoading?: boolean;

  /** Currency formatter function */
  formatCurrency?: (amount: number) => string;

  /** Variant */
  variant?: 'default' | 'compact';

  /** Show item count in header */
  showItemCount?: boolean;

  /** Header actions (additional buttons in header) */
  headerActions?: ReactNode;

  /** Footer content (above checkout button) */
  footerContent?: ReactNode;

  /** Localized labels */
  labels?: CartSidebarLabels;

  /** Custom class name */
  className?: string;

  /** Test ID for testing */
  'data-testid'?: string;
}

// ============================================================================
// Default Values
// ============================================================================

const DEFAULT_LABELS: Required<CartSidebarLabels> = {
  title: 'Your Selection',
  emptyTitle: 'No items selected',
  emptyDescription: 'Add items to see them here',
  subtotalLabel: 'Subtotal',
  totalLabel: 'Total',
  checkout: 'Continue',
  removeItem: 'Remove {item}',
  itemCount: '{count} items',
};

const defaultFormatCurrency = (amount: number): string => {
  return `${amount.toLocaleString()} kr`;
};

// ============================================================================
// Subcomponents
// ============================================================================

interface CartItemRowProps {
  item: CartItem;
  onRemove?: () => void;
  onClick?: () => void;
  formatCurrency: (amount: number) => string;
  compact?: boolean;
  removeLabel: string;
}

function CartItemRow({
  item,
  onRemove,
  onClick,
  formatCurrency,
  compact,
  removeLabel,
}: CartItemRowProps) {
  const priceDisplay =
    item.formattedPrice ?? (item.price !== undefined ? formatCurrency(item.price) : null);

  const content = (
    <div
      style={{
        display: 'flex',
        gap: 'var(--ds-spacing-3)',
        padding: compact ? 'var(--ds-spacing-3)' : 'var(--ds-spacing-4)',
        borderRadius: 'var(--ds-border-radius-md)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'background-color 0.15s ease',
      }}
    >
      {/* Icon/Image */}
      {item.icon && (
        <div
          style={{
            flexShrink: 0,
            width: compact ? '32px' : '40px',
            height: compact ? '32px' : '40px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 'var(--ds-border-radius-md)',
            backgroundColor: 'var(--ds-color-accent-surface-default)',
            color: 'var(--ds-color-accent-text-default)',
          }}
        >
          {item.icon}
        </div>
      )}

      {/* Content */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
          <div style={{ flex: 1, minWidth: 0 }}>
            <Paragraph
              data-size={compact ? 'sm' : 'md'}
              style={{
                margin: 0,
                fontWeight: 500,
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {item.title}
              {item.quantity && item.quantity > 1 && (
                <span style={{ color: 'var(--ds-color-neutral-text-subtle)', fontWeight: 400 }}>
                  {' '}
                  × {item.quantity}
                </span>
              )}
            </Paragraph>
            {item.subtitle && (
              <Paragraph
                data-size="sm"
                style={{
                  margin: 0,
                  marginTop: '2px',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {item.subtitle}
              </Paragraph>
            )}
            {item.description && !compact && (
              <Paragraph
                data-size="xs"
                style={{
                  margin: 0,
                  marginTop: 'var(--ds-spacing-1)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {item.description}
              </Paragraph>
            )}
          </div>

          {/* Price and Remove */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-2)',
              marginLeft: 'var(--ds-spacing-2)',
            }}
          >
            {priceDisplay && (
              <Paragraph
                data-size={compact ? 'sm' : 'md'}
                style={{
                  margin: 0,
                  fontWeight: 600,
                  whiteSpace: 'nowrap',
                }}
              >
                {priceDisplay}
              </Paragraph>
            )}
            {item.removable !== false && onRemove && (
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  onRemove();
                }}
                aria-label={removeLabel.replace('{item}', item.title)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '24px',
                  height: '24px',
                  padding: 0,
                  border: 'none',
                  borderRadius: 'var(--ds-border-radius-full)',
                  backgroundColor: 'transparent',
                  color: 'var(--ds-color-neutral-text-subtle)',
                  cursor: 'pointer',
                  transition: 'background-color 0.15s ease, color 0.15s ease',
                }}
              >
                <XMarkIcon aria-hidden fontSize="16px" />
              </button>
            )}
          </div>
        </div>

        {/* Metadata */}
        {item.metadata && item.metadata.length > 0 && !compact && (
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: 'var(--ds-spacing-2)',
              marginTop: 'var(--ds-spacing-2)',
            }}
          >
            {item.metadata.map((meta, index) => (
              <span
                key={index}
                style={{
                  fontSize: 'var(--ds-font-size-xs)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {meta.label}: {meta.value}
              </span>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  if (onClick) {
    return (
      <div
        role="button"
        tabIndex={0}
        onClick={() => onClick()}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            onClick();
          }
        }}
        style={{ cursor: 'pointer' }}
      >
        {content}
      </div>
    );
  }

  return content;
}

// ============================================================================
// Main Component
// ============================================================================

export function CartSidebar({
  items,
  summary,
  onRemoveItem,
  onItemClick,
  onCheckout,
  checkoutDisabled = false,
  checkoutLoading = false,
  formatCurrency = defaultFormatCurrency,
  variant = 'default',
  showItemCount = true,
  headerActions,
  footerContent,
  labels = {},
  className,
  'data-testid': testId = 'cart-sidebar',
}: CartSidebarProps): React.ReactElement {
  const mergedLabels: Required<CartSidebarLabels> = {
    ...DEFAULT_LABELS,
    ...labels,
  };

  const isCompact = variant === 'compact';
  const isEmpty = items.length === 0;

  return (
    <Card
      className={className}
      data-testid={testId}
      style={{
        display: 'flex',
        flexDirection: 'column',
        height: '100%',
        overflow: 'hidden',
      }}
    >
      {/* Header */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: isCompact ? 'var(--ds-spacing-3) var(--ds-spacing-4)' : 'var(--ds-spacing-4)',
          borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
          <Heading level={2} data-size={isCompact ? 'xs' : 'sm'} style={{ margin: 0 }}>
            {mergedLabels.title}
          </Heading>
          {showItemCount && items.length > 0 && (
            <span
              style={{
                fontSize: 'var(--ds-font-size-sm)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              ({mergedLabels.itemCount.replace('{count}', String(items.length))})
            </span>
          )}
        </div>
        {headerActions}
      </div>

      {/* Items List */}
      <div
        style={{
          flex: 1,
          overflow: 'auto',
          padding: isCompact ? 'var(--ds-spacing-3)' : 'var(--ds-spacing-4)',
        }}
      >
        {isEmpty ? (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              padding: 'var(--ds-spacing-8)',
              textAlign: 'center',
            }}
          >
            <Paragraph
              data-size="md"
              style={{
                margin: 0,
                fontWeight: 500,
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {mergedLabels.emptyTitle}
            </Paragraph>
            {mergedLabels.emptyDescription && (
              <Paragraph
                data-size="sm"
                style={{
                  margin: 0,
                  marginTop: 'var(--ds-spacing-2)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {mergedLabels.emptyDescription}
              </Paragraph>
            )}
          </div>
        ) : (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: isCompact ? 'var(--ds-spacing-2)' : 'var(--ds-spacing-3)',
            }}
          >
            {items.map((item) => (
              <CartItemRow
                key={item.id}
                item={item}
                onRemove={onRemoveItem ? () => onRemoveItem(item.id) : undefined}
                onClick={onItemClick ? () => onItemClick(item.id) : undefined}
                formatCurrency={formatCurrency}
                compact={isCompact}
                removeLabel={mergedLabels.removeItem}
              />
            ))}
          </div>
        )}
      </div>

      {/* Summary & Checkout */}
      {(summary || onCheckout || footerContent) && (
        <div
          style={{
            borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
            padding: isCompact ? 'var(--ds-spacing-3) var(--ds-spacing-4)' : 'var(--ds-spacing-4)',
          }}
        >
          {summary && (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                gap: 'var(--ds-spacing-2)',
                marginBottom: 'var(--ds-spacing-4)',
              }}
            >
              {/* Subtotal */}
              {(summary.subtotal !== undefined || summary.formattedSubtotal) && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Paragraph
                    data-size="sm"
                    style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
                  >
                    {mergedLabels.subtotalLabel}
                  </Paragraph>
                  <Paragraph data-size="sm" style={{ margin: 0 }}>
                    {summary.formattedSubtotal ?? formatCurrency(summary.subtotal!)}
                  </Paragraph>
                </div>
              )}

              {/* Additional breakdown lines */}
              {summary.breakdownLines?.map((line, index) => (
                <div key={index} style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Paragraph
                    data-size="sm"
                    style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
                  >
                    {line.label}
                  </Paragraph>
                  <Paragraph
                    data-size="sm"
                    style={{
                      margin: 0,
                      color: line.isDiscount ? 'var(--ds-color-success-text-default)' : undefined,
                    }}
                  >
                    {line.isDiscount ? '−' : ''}
                    {line.formattedAmount ?? formatCurrency(Math.abs(line.amount))}
                  </Paragraph>
                </div>
              ))}

              {/* Tax */}
              {(summary.tax !== undefined || summary.formattedTax) && (
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Paragraph
                    data-size="sm"
                    style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
                  >
                    {summary.taxLabel || 'Tax'}
                  </Paragraph>
                  <Paragraph data-size="sm" style={{ margin: 0 }}>
                    {summary.formattedTax ?? formatCurrency(summary.tax!)}
                  </Paragraph>
                </div>
              )}

              {/* Total */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  paddingTop: 'var(--ds-spacing-2)',
                  borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
                }}
              >
                <Paragraph data-size="md" style={{ margin: 0, fontWeight: 600 }}>
                  {mergedLabels.totalLabel}
                </Paragraph>
                <Paragraph data-size="md" style={{ margin: 0, fontWeight: 600 }}>
                  {summary.formattedTotal ?? formatCurrency(summary.total)}
                </Paragraph>
              </div>
            </div>
          )}

          {footerContent}

          {onCheckout && (
            <Button
              variant="primary"
              data-size={isCompact ? 'sm' : 'md'}
              onClick={onCheckout}
              disabled={checkoutDisabled || isEmpty}
              loading={checkoutLoading}
              type="button"
              style={{ width: '100%' }}
            >
              {mergedLabels.checkout}
            </Button>
          )}
        </div>
      )}
    </Card>
  );
}

export default CartSidebar;
