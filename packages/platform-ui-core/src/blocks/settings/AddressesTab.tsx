/**
 * AddressesTab Block - Reusable DS Component
 *
 * Manages user address information (invoice and residence addresses).
 * Domain-agnostic - receives all data and handlers via props.
 *
 * @example
 * ```tsx
 * import { useT } from '@xala/i18n';
 * import { useAddresses } from '@app/hooks';
 *
 * function MyAddressesTab() {
 *   const t = useT();
 *   const { addresses, updateAddresses, isSaving } = useAddresses();
 *
 *   return (
 *     <AddressesTab
 *       addressData={addresses}
 *       isSaving={isSaving}
 *       onAddressDataChange={(partial) => updateAddresses(partial)}
 *       onSave={handleSave}
 *       onCopyResidenceToInvoice={handleCopy}
 *       labels={{
 *         title: t('settings.addresses.title'),
 *         description: t('settings.addresses.description'),
 *         // ... other labels
 *       }}
 *     />
 *   );
 * }
 * ```
 */
import { Card, Heading, Paragraph, Button, Textfield } from '../../primitives';
import { Stack, SaveIcon, CopyIcon } from '../../primitives';
import { FormField } from '../../composed';

// =============================================================================
// Types
// =============================================================================

/**
 * Generic address interface - domain-agnostic
 */
export interface Address {
  street: string;
  postalCode: string;
  city: string;
  country: string;
}

export interface AddressData {
  invoiceAddress: Address;
  residenceAddress: Address;
}

export interface AddressesTabLabels {
  title: string;
  description: string;
  invoiceAddress: string;
  invoiceAddressDescription: string;
  residenceAddress: string;
  residenceAddressDescription: string;
  street: string;
  streetPlaceholder: string;
  postalCode: string;
  postalCodePlaceholder: string;
  city: string;
  cityPlaceholder: string;
  country: string;
  countryPlaceholder: string;
  copyResidenceToInvoice: string;
  copyResidenceToInvoiceDescription: string;
  saveChanges: string;
  saving: string;
  saveAddressSettings: string;
}

export interface AddressesTabProps {
  addressData: AddressData;
  isSaving?: boolean;
  onAddressDataChange: (data: Partial<AddressData>) => void;
  onSave: () => void;
  onCopyResidenceToInvoice?: () => void;
  /** Labels for i18n */
  labels?: Partial<AddressesTabLabels>;
  'data-testid'?: string;
}

// =============================================================================
// Default Labels
// =============================================================================

const DEFAULT_LABELS: AddressesTabLabels = {
  title: 'Adresser',
  description: 'Administrer dine faktura- og bostedsadresser',
  invoiceAddress: 'Fakturaadresse',
  invoiceAddressDescription: 'Adressen som brukes for fakturering',
  residenceAddress: 'Bostedsadresse',
  residenceAddressDescription: 'Din bostedsadresse',
  street: 'Gate',
  streetPlaceholder: 'Gatenavn og nummer',
  postalCode: 'Postnummer',
  postalCodePlaceholder: '0000',
  city: 'Poststed',
  cityPlaceholder: 'By',
  country: 'Land',
  countryPlaceholder: 'Norge',
  copyResidenceToInvoice: 'Kopier til fakturaadresse',
  copyResidenceToInvoiceDescription: 'Bruk bostedsadresse som fakturaadresse',
  saveChanges: 'Lagre endringer',
  saving: 'Lagrer...',
  saveAddressSettings: 'Lagre adresseinnstillinger',
};

// =============================================================================
// Component
// =============================================================================

export function AddressesTab({
  addressData,
  isSaving = false,
  onAddressDataChange,
  onSave,
  onCopyResidenceToInvoice,
  labels: customLabels,
  'data-testid': testId = 'addresses-tab',
}: AddressesTabProps) {
  const labels = { ...DEFAULT_LABELS, ...customLabels };

  return (
    <Stack spacing="var(--ds-spacing-6)" data-testid={testId}>
      {/* Residence Address */}
      <Card>
        <Stack spacing="var(--ds-spacing-5)">
          <div>
            <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
              {labels.residenceAddress}
            </Heading>
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.residenceAddressDescription}
            </Paragraph>
          </div>

          <Stack spacing="var(--ds-spacing-4)">
            <FormField label={labels.street} required>
              <Textfield
                value={addressData.residenceAddress.street}
                onChange={(e) =>
                  onAddressDataChange({
                    residenceAddress: { ...addressData.residenceAddress, street: e.target.value },
                  })
                }
                placeholder={labels.streetPlaceholder}
                aria-label={labels.street}
              />
            </FormField>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: 'var(--ds-spacing-3)',
              }}
            >
              <FormField label={labels.postalCode} required>
                <Textfield
                  value={addressData.residenceAddress.postalCode}
                  onChange={(e) =>
                    onAddressDataChange({
                      residenceAddress: {
                        ...addressData.residenceAddress,
                        postalCode: e.target.value,
                      },
                    })
                  }
                  placeholder={labels.postalCodePlaceholder}
                  aria-label={labels.postalCode}
                />
              </FormField>

              <FormField label={labels.city} required>
                <Textfield
                  value={addressData.residenceAddress.city}
                  onChange={(e) =>
                    onAddressDataChange({
                      residenceAddress: { ...addressData.residenceAddress, city: e.target.value },
                    })
                  }
                  placeholder={labels.cityPlaceholder}
                  aria-label={labels.city}
                />
              </FormField>
            </div>

            <FormField label={labels.country} required>
              <Textfield
                value={addressData.residenceAddress.country}
                onChange={(e) =>
                  onAddressDataChange({
                    residenceAddress: { ...addressData.residenceAddress, country: e.target.value },
                  })
                }
                placeholder={labels.countryPlaceholder}
                aria-label={labels.country}
              />
            </FormField>
          </Stack>
        </Stack>
      </Card>

      {/* Invoice Address */}
      <Card>
        <Stack spacing="var(--ds-spacing-5)">
          <div>
            <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
              {labels.invoiceAddress}
            </Heading>
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.invoiceAddressDescription}
            </Paragraph>
          </div>

          <Stack spacing="var(--ds-spacing-4)">
            {onCopyResidenceToInvoice && (
              <div>
                <Button
                  variant="secondary"
                  data-size="sm"
                  onClick={onCopyResidenceToInvoice}
                  type="button"
                  aria-label={labels.copyResidenceToInvoice}
                >
                  <CopyIcon />
                  {labels.copyResidenceToInvoice}
                </Button>
                <Paragraph
                  data-size="xs"
                  style={{
                    marginTop: 'var(--ds-spacing-2)',
                    color: 'var(--ds-color-neutral-text-subtle)',
                  }}
                >
                  {labels.copyResidenceToInvoiceDescription}
                </Paragraph>
              </div>
            )}

            <FormField label={labels.street} required>
              <Textfield
                value={addressData.invoiceAddress.street}
                onChange={(e) =>
                  onAddressDataChange({
                    invoiceAddress: { ...addressData.invoiceAddress, street: e.target.value },
                  })
                }
                placeholder={labels.streetPlaceholder}
                aria-label={labels.street}
              />
            </FormField>

            <div
              style={{
                display: 'grid',
                gridTemplateColumns: '1fr 2fr',
                gap: 'var(--ds-spacing-3)',
              }}
            >
              <FormField label={labels.postalCode} required>
                <Textfield
                  value={addressData.invoiceAddress.postalCode}
                  onChange={(e) =>
                    onAddressDataChange({
                      invoiceAddress: { ...addressData.invoiceAddress, postalCode: e.target.value },
                    })
                  }
                  placeholder={labels.postalCodePlaceholder}
                  aria-label={labels.postalCode}
                />
              </FormField>

              <FormField label={labels.city} required>
                <Textfield
                  value={addressData.invoiceAddress.city}
                  onChange={(e) =>
                    onAddressDataChange({
                      invoiceAddress: { ...addressData.invoiceAddress, city: e.target.value },
                    })
                  }
                  placeholder={labels.cityPlaceholder}
                  aria-label={labels.city}
                />
              </FormField>
            </div>

            <FormField label={labels.country} required>
              <Textfield
                value={addressData.invoiceAddress.country}
                onChange={(e) =>
                  onAddressDataChange({
                    invoiceAddress: { ...addressData.invoiceAddress, country: e.target.value },
                  })
                }
                placeholder={labels.countryPlaceholder}
                aria-label={labels.country}
              />
            </FormField>
          </Stack>

          <div
            style={{
              paddingTop: 'var(--ds-spacing-4)',
              borderTop: '1px solid var(--ds-color-neutral-border-subtle)',
            }}
          >
            <Button
              onClick={onSave}
              disabled={isSaving}
              type="button"
              aria-label={labels.saveAddressSettings}
            >
              <SaveIcon />
              {isSaving ? labels.saving : labels.saveChanges}
            </Button>
          </div>
        </Stack>
      </Card>
    </Stack>
  );
}
