import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import {
  PaymentMethodSelector,
  defaultPaymentMethods,
  defaultPaymentMethodsEn,
} from '../../composed/PaymentMethodSelector';
import type { PaymentMethod } from '../../composed/PaymentMethodSelector';

const meta: Meta<typeof PaymentMethodSelector> = {
  title: 'Composed/PaymentMethodSelector',
  component: PaymentMethodSelector,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## PaymentMethodSelector

Chip-based payment method indicator/selector.
Shows available payment methods (Kort, Vipps, Faktura).

### Features
- Read-only mode for display
- Interactive selection mode
- Size variants (sm/md)
- Disabled state per method

### Accessibility
- Uses role="group" for semantic grouping
- aria-pressed for toggle state
- Keyboard navigation
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'radio',
      options: ['sm', 'md'],
    },
    readOnly: {
      control: 'boolean',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Read-only display
export const Default: Story = {
  args: {
    methods: defaultPaymentMethods,
    readOnly: true,
  },
};

// Selectable
function SelectableDemo() {
  const [selected, setSelected] = useState<string>('card');

  return (
    <PaymentMethodSelector
      methods={defaultPaymentMethods}
      selectedMethod={selected}
      onSelect={setSelected}
    />
  );
}

export const Selectable: Story = {
  render: () => <SelectableDemo />,
  parameters: {
    docs: {
      description: {
        story: 'Interactive mode with selection.',
      },
    },
  },
};

// Small size
export const SmallSize: Story = {
  args: {
    methods: defaultPaymentMethods,
    selectedMethod: 'vipps',
    size: 'sm',
  },
};

// With disabled option
export const WithDisabled: Story = {
  args: {
    methods: [
      { id: 'card', label: 'Kort' },
      { id: 'vipps', label: 'Vipps' },
      { id: 'invoice', label: 'Faktura (EHF)', disabled: true },
    ],
    selectedMethod: 'card',
    onSelect: (id: string) => console.log('Selected:', id),
  },
  parameters: {
    docs: {
      description: {
        story: 'Invoice option disabled.',
      },
    },
  },
};

// Single method
export const SingleMethod: Story = {
  args: {
    methods: [{ id: 'vipps', label: 'Vipps' }],
    readOnly: true,
  },
};

// English labels
export const EnglishLabels: Story = {
  args: {
    methods: defaultPaymentMethodsEn,
    readOnly: true,
    labels: {
      groupLabel: 'Payment Methods',
      title: 'Accepted Payment Methods',
    },
  },
};

// With icons
export const WithIcons: Story = {
  args: {
    methods: [
      { id: 'card', label: 'Kort', icon: '💳' },
      { id: 'vipps', label: 'Vipps', icon: '📱' },
      { id: 'invoice', label: 'Faktura', icon: '📄' },
    ],
    readOnly: true,
  },
  parameters: {
    docs: {
      description: {
        story: 'With emoji icons as demonstration.',
      },
    },
  },
};
