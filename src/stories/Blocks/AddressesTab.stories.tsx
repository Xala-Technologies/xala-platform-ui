import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { useT } from '@xala-technologies/i18n';
import { AddressesTab, Stack, Paragraph, Card } from '../../index';

/**
 * AddressesTab manages user address information (invoice and residence addresses).
 *
 * ## Features
 * - Invoice address management
 * - Residence address management
 * - Copy residence to invoice
 * - Save functionality
 *
 * ## When to Use
 * - Settings pages
 * - User profile pages
 * - Address management
 */
const meta: Meta<typeof AddressesTab> = {
  title: 'Blocks/AddressesTab',
  component: AddressesTab,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof AddressesTab>;

/**
 * Default addresses tab
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    const [addressData, setAddressData] = useState({
      invoiceAddress: {
        street: '',
        postalCode: '',
        city: '',
        country: '',
      },
      residenceAddress: {
        street: '',
        postalCode: '',
        city: '',
        country: '',
      },
    });
    return (
      <Stack
        spacing="var(--ds-spacing-4)"
        style={{ maxWidth: '800px', padding: 'var(--ds-spacing-4)' }}
      >
        <Card data-color="neutral" data-size="medium">
          <Stack spacing="var(--ds-spacing-4)">
            <Paragraph data-size="md">{t('storybook.addressesTab.description')}</Paragraph>
            <AddressesTab
              addressData={addressData}
              onAddressDataChange={(partial) => setAddressData({ ...addressData, ...partial })}
              onSave={async () => {
                console.log('Save addresses');
                await new Promise((resolve) => setTimeout(resolve, 1000));
              }}
              onCopyResidenceToInvoice={() => {
                setAddressData({
                  ...addressData,
                  invoiceAddress: addressData.residenceAddress,
                });
              }}
              labels={{
                title: t('storybook.addressesTab.title'),
                description: t('storybook.addressesTab.descriptionText'),
                invoiceAddress: t('storybook.addressesTab.invoiceAddress'),
                invoiceAddressDescription: t('storybook.addressesTab.invoiceAddressDescription'),
                residenceAddress: t('storybook.addressesTab.residenceAddress'),
                residenceAddressDescription: t(
                  'storybook.addressesTab.residenceAddressDescription'
                ),
                street: t('storybook.addressesTab.street'),
                streetPlaceholder: t('storybook.addressesTab.streetPlaceholder'),
                postalCode: t('storybook.addressesTab.postalCode'),
                postalCodePlaceholder: t('storybook.addressesTab.postalCodePlaceholder'),
                city: t('storybook.addressesTab.city'),
                cityPlaceholder: t('storybook.addressesTab.cityPlaceholder'),
                country: t('storybook.addressesTab.country'),
                countryPlaceholder: t('storybook.addressesTab.countryPlaceholder'),
                copyResidenceToInvoice: t('storybook.addressesTab.copyResidenceToInvoice'),
                copyResidenceToInvoiceDescription: t(
                  'storybook.addressesTab.copyResidenceToInvoiceDescription'
                ),
                saveChanges: t('storybook.addressesTab.saveChanges'),
                saving: t('storybook.addressesTab.saving'),
                saveAddressSettings: t('storybook.addressesTab.saveAddressSettings'),
              }}
            />
          </Stack>
        </Card>
      </Stack>
    );
  },
};
