import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { NumberInput } from '../../composed/NumberInput';

const meta: Meta<typeof NumberInput> = {
  title: 'Composed/NumberInput',
  component: NumberInput,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## NumberInput

Number input with stepper buttons and validation. Supports min/max, step, precision, and custom formatting.

### Features
- Stepper buttons (increment/decrement)
- Min/max constraints
- Step value control
- Precision for decimal numbers
- Prefix and suffix support
- Size variants
- Hide controls option
- Allow/deny negative and decimal

### Usage
\`\`\`tsx
<NumberInput
  value={10}
  min={0}
  max={100}
  step={1}
  onChange={handleChange}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onChange: fn(),
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Input size',
    },
    hideControls: {
      control: 'boolean',
      description: 'Hide stepper buttons',
    },
    allowNegative: {
      control: 'boolean',
      description: 'Allow negative values',
    },
    allowDecimal: {
      control: 'boolean',
      description: 'Allow decimal values',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic number input
export const Default: Story = {
  args: {
    defaultValue: 10,
    min: 0,
    max: 100,
    step: 1,
    size: 'md',
    hideControls: false,
    allowNegative: true,
    allowDecimal: false,
  },
};

// With label
export const WithLabel: Story = {
  args: {
    label: 'Quantity',
    defaultValue: 5,
    min: 0,
    max: 100,
    step: 1,
    size: 'md',
  },
};

// With min and max
export const WithMinMax: Story = {
  args: {
    label: 'Age',
    defaultValue: 25,
    min: 0,
    max: 120,
    step: 1,
    size: 'md',
  },
};

// With step
export const WithStep: Story = {
  args: {
    label: 'Step by 5',
    defaultValue: 10,
    min: 0,
    max: 100,
    step: 5,
    size: 'md',
  },
};

// Decimal precision
export const DecimalPrecision: Story = {
  args: {
    label: 'Price',
    defaultValue: 9.99,
    min: 0,
    max: 1000,
    step: 0.01,
    precision: 2,
    allowDecimal: true,
    size: 'md',
  },
};

// With prefix
export const WithPrefix: Story = {
  args: {
    label: 'Price',
    defaultValue: 100,
    prefix: '$',
    min: 0,
    max: 10000,
    step: 10,
    size: 'md',
  },
};

// With suffix
export const WithSuffix: Story = {
  args: {
    label: 'Weight',
    defaultValue: 50,
    suffix: 'kg',
    min: 0,
    max: 200,
    step: 1,
    size: 'md',
  },
};

// With prefix and suffix
export const WithPrefixAndSuffix: Story = {
  args: {
    label: 'Amount',
    defaultValue: 1000,
    prefix: 'NOK',
    suffix: 'kr',
    min: 0,
    max: 100000,
    step: 100,
    size: 'md',
  },
};

// Size variants
export const Small: Story = {
  args: {
    label: 'Small',
    defaultValue: 10,
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium',
    defaultValue: 10,
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large',
    defaultValue: 10,
    size: 'lg',
  },
};

// Without controls
export const WithoutControls: Story = {
  args: {
    label: 'No Controls',
    defaultValue: 10,
    hideControls: true,
    size: 'md',
  },
};

// With error
export const WithError: Story = {
  args: {
    label: 'Quantity',
    defaultValue: 150,
    min: 0,
    max: 100,
    step: 1,
    error: 'Value must be between 0 and 100',
    size: 'md',
  },
};

// With helper text
export const WithHelperText: Story = {
  args: {
    label: 'Quantity',
    defaultValue: 10,
    min: 0,
    max: 100,
    step: 1,
    helperText: 'Enter a value between 0 and 100',
    size: 'md',
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Disabled',
    defaultValue: 10,
    disabled: true,
    size: 'md',
  },
};

// Read only
export const ReadOnly: Story = {
  args: {
    label: 'Read Only',
    defaultValue: 42,
    readOnly: true,
    size: 'md',
  },
};

// Integer only (no decimals)
export const IntegerOnly: Story = {
  args: {
    label: 'Count',
    defaultValue: 10,
    allowDecimal: false,
    precision: 0,
    size: 'md',
  },
};

// Positive only (no negatives)
export const PositiveOnly: Story = {
  args: {
    label: 'Positive Number',
    defaultValue: 10,
    min: 0,
    allowNegative: false,
    size: 'md',
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <NumberInput label="Small" defaultValue={10} size="sm" onChange={fn()} />
      <NumberInput label="Medium" defaultValue={10} size="md" onChange={fn()} />
      <NumberInput label="Large" defaultValue={10} size="lg" onChange={fn()} />
    </div>
  ),
};
