/**
 * PaymentMethodsWidget (GAP-001)
 *
 * Widget for managing user payment methods.
 * Uses @xala-technologies/platform-ui components only.
 */

import { useState, useCallback } from 'react';
import { useT } from '@xala-technologies/platform/i18n';
import {
  Card,
  Heading,
  Paragraph,
  Button,
  Badge,
  Spinner,
  EmptyState,
  Dialog,
  Textfield,
  Select,
  Stack,
  useDialog,
  DashboardPageHeader,
  CreditCardIcon,
  TrashIcon,
  CheckIcon,
  StarIcon,
} from '@xala-technologies/platform-ui';
import {
  usePaymentMethods,
  useAddPaymentMethod,
  useRemovePaymentMethod,
  useSetDefaultPaymentMethod,
  type PaymentMethod,
  type CreatePaymentMethodDTO,
} from '@digilist/client-sdk';

export interface PaymentMethodsWidgetProps {
  /** Page title */
  title?: string;
  /** Page description */
  description?: string;
}

const CARD_BRAND_ICONS: Record<string, string> = {
  visa: 'Visa',
  mastercard: 'Mastercard',
  amex: 'Amex',
  vipps: 'Vipps',
  default: 'Card',
};

export function PaymentMethodsWidget({
  title,
  description,
}: PaymentMethodsWidgetProps) {
  const t = useT();
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [newMethod, setNewMethod] = useState<Partial<CreatePaymentMethodDTO>>({
    type: 'card',
  });
  const { confirm } = useDialog();

  // SDK hooks
  const { data: paymentMethods, isLoading } = usePaymentMethods();
  const addMethod = useAddPaymentMethod();
  const removeMethod = useRemovePaymentMethod();
  const setDefault = useSetDefaultPaymentMethod();

  const handleAddMethod = useCallback(async () => {
    if (!newMethod.type) return;
    await addMethod.mutateAsync(newMethod as CreatePaymentMethodDTO);
    setIsAddDialogOpen(false);
    setNewMethod({ type: 'card' });
  }, [newMethod, addMethod]);

  const handleRemoveMethod = useCallback(
    async (id: string, label: string) => {
      const confirmed = await confirm({
        title: t('paymentMethods.removeTitle'),
        description: t('paymentMethods.removeConfirm', { method: label }),
        confirmText: t('action.remove'),
        cancelText: t('common.cancel'),
        variant: 'danger',
      });
      if (confirmed) {
        await removeMethod.mutateAsync(id);
      }
    },
    [confirm, t, removeMethod]
  );

  const handleSetDefault = useCallback(
    async (id: string) => {
      await setDefault.mutateAsync(id);
    },
    [setDefault]
  );

  const isMutating = addMethod.isPending || removeMethod.isPending || setDefault.isPending;

  const getMethodLabel = (method: PaymentMethod) => {
    if (method.type === 'card' && method.lastFour) {
      return `${method.brand || 'Card'} •••• ${method.lastFour}`;
    }
    if (method.type === 'vipps') {
      return 'Vipps';
    }
    return method.type;
  };

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
    <>
      {(title || description) && (
        <DashboardPageHeader
          title={title ?? t('paymentMethods.title')}
          subtitle={description ?? t('paymentMethods.description')}
        />
      )}

      <Stack gap="6">
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <Heading level={2} data-size="lg" style={{ margin: 0 }}>
              {t('paymentMethods.yourMethods')}
            </Heading>
            <Paragraph data-size="sm" style={{ margin: 0, marginTop: 'var(--ds-spacing-1)' }}>
              {t('paymentMethods.manageDescription')}
            </Paragraph>
          </div>
          <Button
            type="button"
            variant="primary"
            data-size="md"
            onClick={() => setIsAddDialogOpen(true)}
          >
            {t('paymentMethods.addMethod')}
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
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)' }}>
                    <div
                      style={{
                        width: '48px',
                        height: '32px',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        backgroundColor: 'var(--ds-color-neutral-background-subtle)',
                        borderRadius: 'var(--ds-border-radius-sm)',
                        fontSize: 'var(--ds-font-size-lg)',
                      }}
                    >
                      <CreditCardIcon />
                    </div>
                    <div>
                      <Paragraph
                        data-size="md"
                        style={{ margin: 0, fontWeight: 'var(--ds-font-weight-semibold)' }}
                      >
                        {getMethodLabel(method)}
                      </Paragraph>
                      {method.expiresAt && (
                        <Paragraph
                          data-size="xs"
                          style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
                        >
                          {t('paymentMethods.expires')}: {method.expiresAt}
                        </Paragraph>
                      )}
                    </div>
                    {method.isDefault && (
                      <Badge data-color="success" data-size="sm">
                        <StarIcon style={{ width: '12px', height: '12px' }} />
                        {t('paymentMethods.default')}
                      </Badge>
                    )}
                  </div>

                  <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
                    {!method.isDefault && (
                      <Button
                        type="button"
                        variant="secondary"
                        data-size="sm"
                        onClick={() => handleSetDefault(method.id)}
                        disabled={isMutating}
                      >
                        <CheckIcon />
                        {t('paymentMethods.makeDefault')}
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="tertiary"
                      data-size="sm"
                      data-color="danger"
                      onClick={() => handleRemoveMethod(method.id, getMethodLabel(method))}
                      disabled={isMutating}
                    >
                      <TrashIcon />
                    </Button>
                  </div>
                </div>
              </Card>
            ))}
          </Stack>
        )}

        {/* Add Method Dialog */}
        <Dialog
          open={isAddDialogOpen}
          onClose={() => setIsAddDialogOpen(false)}
          title={t('paymentMethods.addMethod')}
        >
          <Stack gap="4">
            <Select
              label={t('paymentMethods.methodType')}
              value={newMethod.type}
              onChange={(e) => setNewMethod({ ...newMethod, type: e.target.value as 'card' | 'vipps' })}
            >
              <option value="card">{t('paymentMethods.type.card')}</option>
              <option value="vipps">{t('paymentMethods.type.vipps')}</option>
            </Select>

            {newMethod.type === 'card' && (
              <>
                <Textfield
                  label={t('paymentMethods.cardNumber')}
                  value={newMethod.cardNumber || ''}
                  onChange={(e) => setNewMethod({ ...newMethod, cardNumber: e.target.value })}
                  placeholder="1234 5678 9012 3456"
                  maxLength={19}
                />
                <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
                  <Textfield
                    label={t('paymentMethods.expiry')}
                    value={newMethod.expiryDate || ''}
                    onChange={(e) => setNewMethod({ ...newMethod, expiryDate: e.target.value })}
                    placeholder="MM/YY"
                    maxLength={5}
                    style={{ flex: 1 }}
                  />
                  <Textfield
                    label={t('paymentMethods.cvc')}
                    value={newMethod.cvc || ''}
                    onChange={(e) => setNewMethod({ ...newMethod, cvc: e.target.value })}
                    placeholder="123"
                    maxLength={4}
                    style={{ flex: 1 }}
                  />
                </div>
              </>
            )}

            {newMethod.type === 'vipps' && (
              <Textfield
                label={t('paymentMethods.phoneNumber')}
                value={newMethod.phoneNumber || ''}
                onChange={(e) => setNewMethod({ ...newMethod, phoneNumber: e.target.value })}
                placeholder="+47 123 45 678"
              />
            )}

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
                onClick={handleAddMethod}
                disabled={isMutating}
              >
                {isMutating ? <Spinner data-size="sm" /> : t('action.add')}
              </Button>
            </div>
          </Stack>
        </Dialog>
      </Stack>
    </>
  );
}
