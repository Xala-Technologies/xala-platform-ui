/**
 * PriceSummaryCard
 *
 * A card showing price summary for bookings with calculation breakdown.
 */
import * as React from 'react';
import { Heading, Paragraph, Stack, Card, Button } from '@xala-technologies/platform-ui-core';

// Utility function for class name concatenation
function cn(...classes: (string | undefined | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

export interface PriceLineItem {
  /** Label for the line item */
  label: string;
  /** Quantity (e.g., number of hours) */
  quantity?: number;
  /** Unit price */
  unitPrice?: number;
  /** Total for this line */
  total: number;
  /** Whether this is a discount (shown in green, subtracted) */
  isDiscount?: boolean;
}

export interface PriceSummaryCardProps {
  /** Title of the card */
  title?: string;
  /** Base price per unit */
  basePrice: number;
  /** Price unit (e.g., 'time', 'dag') */
  priceUnit?: string;
  /** Currency code */
  currency?: string;
  /** Line items for breakdown */
  lineItems?: PriceLineItem[];
  /** Total price */
  total: number;
  /** Whether to show VAT info */
  showVat?: boolean;
  /** VAT percentage */
  vatPercentage?: number;
  /** Custom class name */
  className?: string;
  /** CTA button text */
  ctaText?: string;
  /** CTA button handler */
  onCtaClick?: () => void;
  /** Whether CTA is disabled */
  ctaDisabled?: boolean;
}

/**
 * PriceSummaryCard component
 *
 * @example
 * ```tsx
 * <PriceSummaryCard
 *   basePrice={450}
 *   priceUnit="time"
 *   lineItems={[
 *     { label: 'Moterom booking', quantity: 3, unitPrice: 450, total: 1350 },
 *     { label: 'Catering', total: 250 },
 *   ]}
 *   total={1600}
 *   ctaText="Bestill na"
 *   onCtaClick={() => {}}
 * />
 * ```
 */
export function PriceSummaryCard({
  title = 'Prissammendrag',
  basePrice,
  priceUnit = 'time',
  currency = 'kr',
  lineItems = [],
  total,
  showVat = true,
  vatPercentage = 25,
  className,
  ctaText,
  onCtaClick,
  ctaDisabled = false,
}: PriceSummaryCardProps): React.ReactElement {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('nb-NO').format(price);
  };

  return (
    <Card
      className={cn('price-summary-card', className)}
      data-color="neutral"
      style={{
        overflow: 'hidden',
      }}
    >
      {/* Header with base price */}
      <Stack
        style={{
          padding: 'var(--ds-spacing-4)',
          borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
          background:
            'linear-gradient(135deg, var(--ds-color-accent-surface-default) 0%, var(--ds-color-accent-surface-hover) 100%)',
        }}
      >
        <Stack direction="horizontal" spacing="2" style={{ alignItems: 'baseline' }}>
          <Heading
            level={3}
            data-size="lg"
            style={{ color: 'var(--ds-color-accent-text-default)' }}
          >
            {formatPrice(basePrice)} {currency}
          </Heading>
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-accent-text-subtle)' }}>
            / {priceUnit}
          </Paragraph>
        </Stack>
      </Stack>

      {/* Line items breakdown */}
      {lineItems.length > 0 && (
        <Stack
          spacing="3"
          style={{
            padding: 'var(--ds-spacing-4)',
            borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <Paragraph
            data-size="xs"
            data-color="subtle"
            style={{
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
              fontWeight: 'var(--ds-font-weight-medium)',
            }}
          >
            {title}
          </Paragraph>
          <Stack spacing="2">
            {lineItems.map((item, index) => (
              <Stack
                key={index}
                direction="horizontal"
                style={{
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <Paragraph data-size="sm">
                  {item.label}
                  {item.quantity && item.unitPrice && (
                    <span style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                      {' '}
                      ({item.quantity} x {formatPrice(item.unitPrice)} {currency})
                    </span>
                  )}
                </Paragraph>
                <Paragraph
                  data-size="sm"
                  style={{
                    fontWeight: 'var(--ds-font-weight-medium)',
                    color: item.isDiscount
                      ? 'var(--ds-color-success-text-default)'
                      : 'var(--ds-color-neutral-text-default)',
                  }}
                >
                  {item.isDiscount ? '-' : ''}
                  {formatPrice(item.total)} {currency}
                </Paragraph>
              </Stack>
            ))}
          </Stack>
        </Stack>
      )}

      {/* Total section */}
      <Stack
        spacing="1"
        style={{
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
        }}
      >
        <Stack
          direction="horizontal"
          style={{
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <Paragraph
            data-size="md"
            style={{
              fontWeight: 'var(--ds-font-weight-semibold)',
            }}
          >
            Total
          </Paragraph>
          <Heading level={4} data-size="md">
            {formatPrice(total)} {currency}
          </Heading>
        </Stack>
        {showVat && (
          <Paragraph
            data-size="xs"
            data-color="subtle"
            style={{
              textAlign: 'right',
            }}
          >
            Inkl. {vatPercentage}% MVA
          </Paragraph>
        )}
      </Stack>

      {/* CTA Button */}
      {ctaText && onCtaClick && (
        <Stack style={{ padding: 'var(--ds-spacing-4)', paddingTop: 0 }}>
          <Button
            type="button"
            variant="primary"
            data-color="accent"
            onClick={onCtaClick}
            disabled={ctaDisabled}
            style={{ width: '100%' }}
          >
            {ctaText}
          </Button>
        </Stack>
      )}
    </Card>
  );
}

export default PriceSummaryCard;
