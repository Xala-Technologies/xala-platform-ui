/**
 * PaymentMethodsTab
 *
 * Widget for managing user payment methods.
 * Uses @xala-technologies/platform-ui components only.
 */

import { useState, useCallback } from 'react';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Badge,
  Spinner,
  EmptyState,
  useDialog,
  Dialog,
  Textfield,
  Select,
  Stack,
  CreditCardIcon,
  TrashIcon,
  CheckIcon,
} from '@xala-technologies/platform-ui';
import type {
  PaymentMethod,
  PaymentMethodType,
  AddPaymentMethodDTO,
} from '@digilist/client-sdk';

export interface PaymentMethodsTabProps {
  /** Translation function */
  t: (key: string) => string;
  /** Payment methods data */
  paymentMethods: PaymentMethod[] | undefined;
  /** Loading state */
  isLoading: boolean;
  /** Add payment method handler */
  onAddPaymentMethod: (data: AddPaymentMethodDTO) => Promise<void>;
  /** Remove payment method handler */
  onRemovePaymentMethod: (id: string) => Promise<void>;
  /** Set default payment method handler */
  onSetDefault: (id: string) => Promise<void>;
  /** Is mutating */
  isMutating?: boolean;
}

const PAYMENT_TYPE_ICONS: Record<PaymentMethodType, string> = {
  card: '💳',
  vipps: '📱',
  bank_transfer: '🏦',
  invoice: '📄',
};

export function PaymentMethodsTab({
  t,
  paymentMethods,
  isLoading,
  onAddPaymentMethod,
  onRemovePaymentMethod,
  onSetDefault,
  isMutating = false,
}: PaymentMethodsTabProps) {
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMethodType, setNewMethodType] = useState<PaymentMethodType>('card');
  const { confirm } = useDialog();

  const handleRemove = useCallback(
    async (id: string) => {
      const confirmed = await confirm({
        title: t('paymentMethods.removeTitle'),
        description: t('paymentMethods.removeConfirm'),
        confirmText: t('action.remove'),
        cancelText: t('common.cancel'),
        variant: 'danger',
      });
      if (confirmed) {
        await onRemovePaymentMethod(id);
      }
    },
    [confirm, t, onRemovePaymentMethod]
  );

  const handleAddSubmit = useCallback(async () => {
    await onAddPaymentMethod({ type: newMethodType });
    setIsAddDialogOpen(false);
    setNewMethodType('card');
  }, [newMethodType, onAddPaymentMethod]);

  if (isLoading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          padding: 'var(--ds-spacing-8)',
        }}
      >
        <Spinner aria-label={t('state.loading')} data-size="lg" />
      </div>
    );
  }

  return (
    <Stack gap="6">
      {/* Header */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <div>
          <Heading level={2} data-size="md" style={{ margin: 0 }}>
            {t('paymentMethods.title')}
          </Heading>
          <Paragraph data-size="sm" style={{ margin: 0, marginTop: 'var(--ds-spacing-1)' }}>
            {t('paymentMethods.description')}
          </Paragraph>
        </div>
        <Button
          type="button"
          variant="primary"
          data-size="md"
          onClick={() => setIsAddDialogOpen(true)}
          disabled={isMutating}
        >
          {t('paymentMethods.addNew')}
        </Button>
      </div>

      {/* Payment Methods List */}
      {!paymentMethods || paymentMethods.length === 0 ? (
        <EmptyState
          icon={<CreditCardIcon size={48} />}
          title={t('paymentMethods.noMethods')}
          description={t('paymentMethods.noMethodsDesc')}
          action={{
            label: t('paymentMethods.addFirst'),
            onClick: () => setIsAddDialogOpen(true),
          }}
          bordered
        />
      ) : (
        <Stack gap="3">
          {paymentMethods.map((method) => (
            <Card
              key={method.id}
              data-testid={`payment-method-${method.id}`}
              style={{ padding: 'var(--ds-spacing-4)' }}
            >
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)' }}>
                  <span style={{ fontSize: '24px' }}>
                    {PAYMENT_TYPE_ICONS[method.type]}
                  </span>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
                      <Paragraph
                        data-size="md"
                        style={{ margin: 0, fontWeight: 'var(--ds-font-weight-semibold)' }}
                      >
                        {t(`paymentMethods.type.${method.type}`)}
                        {method.cardLast4 && ` •••• ${method.cardLast4}`}
                      </Paragraph>
                      {method.isDefault && (
                        <Badge data-color="success" data-size="sm">
                          {t('paymentMethods.default')}
                        </Badge>
                      )}
                    </div>
                    {method.cardBrand && (
                      <Paragraph
                        data-size="sm"
                        style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
                      >
                        {method.cardBrand}
                        {method.expiryMonth && method.expiryYear && (
                          <> • {t('paymentMethods.expires')} {method.expiryMonth}/{method.expiryYear}</>
                        )}
                      </Paragraph>
                    )}
                  </div>
                </div>

                <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
                  {!method.isDefault && (
                    <Button
                      type="button"
                      variant="secondary"
                      data-size="sm"
                      onClick={() => onSetDefault(method.id)}
                      disabled={isMutating}
                    >
                      <CheckIcon />
                      {t('paymentMethods.setDefault')}
                    </Button>
                  )}
                  <Button
                    type="button"
                    variant="tertiary"
                    data-size="sm"
                    data-color="danger"
                    onClick={() => handleRemove(method.id)}
                    disabled={isMutating || method.isDefault}
                  >
                    <TrashIcon />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </Stack>
      )}

      {/* Add Payment Method Dialog */}
      <Dialog
        open={isAddDialogOpen}
        onClose={() => setIsAddDialogOpen(false)}
        title={t('paymentMethods.addNew')}
      >
        <Stack gap="4">
          <Select
            label={t('paymentMethods.selectType')}
            value={newMethodType}
            onChange={(e) => setNewMethodType(e.target.value as PaymentMethodType)}
          >
            <option value="card">{t('paymentMethods.type.card')}</option>
            <option value="vipps">{t('paymentMethods.type.vipps')}</option>
            <option value="bank_transfer">{t('paymentMethods.type.bank_transfer')}</option>
            <option value="invoice">{t('paymentMethods.type.invoice')}</option>
          </Select>

          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            {t('paymentMethods.addInfo')}
          </Paragraph>

          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', justifyContent: 'flex-end' }}>
            <Button
              type="button"
              variant="secondary"
              onClick={() => setIsAddDialogOpen(false)}
              disabled={isMutating}
            >
              {t('common.cancel')}
            </Button>
            <Button
              type="button"
              variant="primary"
              onClick={handleAddSubmit}
              disabled={isMutating}
            >
              {isMutating ? <Spinner data-size="sm" /> : t('action.add')}
            </Button>
          </div>
        </Stack>
      </Dialog>
    </Stack>
  );
}
