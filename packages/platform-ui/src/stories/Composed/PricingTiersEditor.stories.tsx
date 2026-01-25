import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { PricingTiersEditor } from '../../composed/PricingTiersEditor';
import type { PricingTier } from '../../composed/PricingTiersEditor';

const meta: Meta<typeof PricingTiersEditor> = {
  title: 'Composed/PricingTiersEditor',
  component: PricingTiersEditor,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## PricingTiersEditor

Editable list of pricing tiers by target group.
Used in admin wizard for price configuration.

### Features
- Add/remove pricing tiers
- Target group, price, and unit per tier
- Currency customization
- Empty state message

### Accessibility
- Fieldset with legend for grouping
- Labeled inputs (visually hidden)
- Keyboard navigation
        `,
      },
    },
  },
  argTypes: {
    disabled: {
      control: 'boolean',
    },
    currency: {
      control: 'text',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Controlled wrapper
function ControlledEditor({
  initialTiers,
  disabled = false,
  currency = 'kr',
}: {
  initialTiers: PricingTier[];
  disabled?: boolean;
  currency?: string;
}) {
  const [tiers, setTiers] = useState(initialTiers);

  return (
    <div style={{ width: 600 }}>
      <PricingTiersEditor
        tiers={tiers}
        onChange={setTiers}
        disabled={disabled}
        currency={currency}
      />
    </div>
  );
}

// Empty
export const Empty: Story = {
  render: () => <ControlledEditor initialTiers={[]} />,
};

// Single tier
export const SingleTier: Story = {
  render: () => (
    <ControlledEditor
      initialTiers={[{ id: '1', targetGroup: 'Standard', price: 500, unit: 'per_hour' }]}
    />
  ),
};

// Multiple tiers
export const MultipleTiers: Story = {
  render: () => (
    <ControlledEditor
      initialTiers={[
        { id: '1', targetGroup: 'Voksne', price: 500, unit: 'per_hour' },
        { id: '2', targetGroup: 'Barn (under 18)', price: 250, unit: 'per_hour' },
        { id: '3', targetGroup: 'Student', price: 350, unit: 'per_hour' },
        { id: '4', targetGroup: 'Honnør', price: 300, unit: 'per_hour' },
      ]}
    />
  ),
};

// Different units
export const DifferentUnits: Story = {
  render: () => (
    <ControlledEditor
      initialTiers={[
        { id: '1', targetGroup: 'Timeleie', price: 500, unit: 'per_hour' },
        { id: '2', targetGroup: 'Dagsleie', price: 2000, unit: 'per_day' },
        { id: '3', targetGroup: 'Per person', price: 50, unit: 'per_person' },
      ]}
    />
  ),
  parameters: {
    docs: {
      description: {
        story: 'Different price units for different tiers.',
      },
    },
  },
};

// EUR currency
export const EuroCurrency: Story = {
  render: () => (
    <ControlledEditor
      initialTiers={[
        { id: '1', targetGroup: 'Adults', price: 50, unit: 'per_hour' },
        { id: '2', targetGroup: 'Children', price: 25, unit: 'per_hour' },
      ]}
      currency="€"
    />
  ),
};

// Disabled
export const Disabled: Story = {
  render: () => (
    <ControlledEditor
      initialTiers={[
        { id: '1', targetGroup: 'Voksne', price: 500, unit: 'per_hour' },
        { id: '2', targetGroup: 'Barn', price: 250, unit: 'per_hour' },
      ]}
      disabled
    />
  ),
};

// English labels
export const EnglishLabels: Story = {
  render: () => {
    function EnglishEditor() {
      const [tiers, setTiers] = useState<PricingTier[]>([
        { id: '1', targetGroup: 'Adults', price: 50, unit: 'per_hour' },
        { id: '2', targetGroup: 'Children', price: 25, unit: 'per_hour' },
      ]);

      return (
        <div style={{ width: 600 }}>
          <PricingTiersEditor
            tiers={tiers}
            onChange={setTiers}
            currency="$"
            labels={{
              legend: 'Pricing',
              helperText: 'Add prices for different target groups',
              targetGroup: 'Target Group',
              price: 'Price',
              unit: 'Unit',
              addTier: '+ Add Price',
              remove: 'Remove',
              perHour: 'Per hour',
              perDay: 'Per day',
              perUnit: 'Per unit',
              perPerson: 'Per person',
              targetGroupPlaceholder: 'e.g. Adults, Children, Students',
              emptyMessage: 'No prices added yet',
            }}
          />
        </div>
      );
    }

    return <EnglishEditor />;
  },
};
