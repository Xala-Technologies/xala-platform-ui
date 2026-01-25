import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PaymentMethodConfig } from '../../composed/PaymentMethodConfig';
import type { EnabledPaymentMethods } from '../../composed/PaymentMethodConfig';

const meta: Meta<typeof PaymentMethodConfig> = {
  title: 'Composed/PaymentMethodConfig',
  component: PaymentMethodConfig,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## PaymentMethodConfig

Checkbox list for enabling/disabling payment methods in admin.
Used in admin wizard for payment configuration.

### Features
- Four payment method options
- Descriptions for each method
- Disabled state

### Accessibility
- Fieldset with legend for grouping
- Checkbox labels with descriptions
- Keyboard navigation
        `,
      },
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Controlled wrapper
function ControlledConfig({
  initialValue,
  disabled = false,
}: {
  initialValue: EnabledPaymentMethods;
  disabled?: boolean;
}) {
  const [value, setValue] = useState(initialValue);

  return (
    <div style={{ width: 400 }}>
      <PaymentMethodConfig value={value} onChange={setValue} disabled={disabled} />
    </div>
  );
}

// Default (none selected)
export const Default: Story = {
  render: () => (
    <ControlledConfig
      initialValue={{
        invoice: false,
        card: false,
        vipps: false,
        external: false,
      }}
    />
  ),
};

// Some selected
export const SomeSelected: Story = {
  render: () => (
    <ControlledConfig
      initialValue={{
        invoice: true,
        card: true,
        vipps: false,
        external: false,
      }}
    />
  ),
};

// All selected
export const AllSelected: Story = {
  render: () => (
    <ControlledConfig
      initialValue={{
        invoice: true,
        card: true,
        vipps: true,
        external: true,
      }}
    />
  ),
};

// Disabled
export const Disabled: Story = {
  render: () => (
    <ControlledConfig
      initialValue={{
        invoice: true,
        card: true,
        vipps: false,
        external: false,
      }}
      disabled
    />
  ),
};

// English labels
export const EnglishLabels: Story = {
  render: () => {
    function EnglishConfig() {
      const [value, setValue] = useState<EnabledPaymentMethods>({
        invoice: true,
        card: true,
        vipps: false,
        external: false,
      });

      return (
        <div style={{ width: 400 }}>
          <PaymentMethodConfig
            value={value}
            onChange={setValue}
            labels={{
              legend: 'Payment Methods',
              helperText: 'Select which payment methods are available',
              invoice: 'Invoice',
              card: 'Card',
              vipps: 'Vipps',
              external: 'External Payment',
              invoiceDescription: 'Electronic invoice for organizations',
              cardDescription: 'Visa, Mastercard and other card payments',
              vippsDescription: 'Norwegian mobile payment',
              externalDescription: 'For payments handled manually',
            }}
          />
        </div>
      );
    }

    return <EnglishConfig />;
  },
};
