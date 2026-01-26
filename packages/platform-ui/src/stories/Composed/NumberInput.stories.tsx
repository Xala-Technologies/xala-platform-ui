import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
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

// Wrapper for with label story
const WithLabelDemo = () => {
  const t = useT();
  return (
    <NumberInput
      label={t('storybook.demo.quantity')}
      defaultValue={5}
      min={0}
      max={100}
      step={1}
      size="md"
      onChange={fn()}
    />
  );
};

// With label
export const WithLabel: Story = {
  render: function Render() {
    return <WithLabelDemo />;
  },
};

// Wrapper for min max story
const WithMinMaxDemo = () => {
  const t = useT();
  return (
    <NumberInput
      label={t('storybook.demo.age')}
      defaultValue={25}
      min={0}
      max={120}
      step={1}
      size="md"
      onChange={fn()}
    />
  );
};

// With min and max
export const WithMinMax: Story = {
  render: function Render() {
    return <WithMinMaxDemo />;
  },
};

// Wrapper for step story
const WithStepDemo = () => {
  const t = useT();
  return (
    <NumberInput
      label={t('storybook.demo.stepBy5')}
      defaultValue={10}
      min={0}
      max={100}
      step={5}
      size="md"
      onChange={fn()}
    />
  );
};

// With step
export const WithStep: Story = {
  render: function Render() {
    return <WithStepDemo />;
  },
};

// Wrapper for decimal story
const DecimalPrecisionDemo = () => {
  const t = useT();
  return (
    <NumberInput
      label={t('platform.common.price')}
      defaultValue={9.99}
      min={0}
      max={1000}
      step={0.01}
      precision={2}
      allowDecimal={true}
      size="md"
      onChange={fn()}
    />
  );
};

// Decimal precision
export const DecimalPrecision: Story = {
  render: function Render() {
    return <DecimalPrecisionDemo />;
  },
};

// Wrapper for prefix story
const WithPrefixDemo = () => {
  const t = useT();
  return (
    <NumberInput
      label={t('platform.common.price')}
      defaultValue={100}
      prefix="$"
      min={0}
      max={10000}
      step={10}
      size="md"
      onChange={fn()}
    />
  );
};

// With prefix
export const WithPrefix: Story = {
  render: function Render() {
    return <WithPrefixDemo />;
  },
};

// Wrapper for suffix story
const WithSuffixDemo = () => {
  const t = useT();
  return (
    <NumberInput
      label={t('storybook.demo.weight')}
      defaultValue={50}
      suffix="kg"
      min={0}
      max={200}
      step={1}
      size="md"
      onChange={fn()}
    />
  );
};

// With suffix
export const WithSuffix: Story = {
  render: function Render() {
    return <WithSuffixDemo />;
  },
};

// Wrapper for prefix and suffix story
const WithPrefixAndSuffixDemo = () => {
  const t = useT();
  return (
    <NumberInput
      label={t('storybook.demo.amount')}
      defaultValue={1000}
      prefix="NOK"
      suffix="kr"
      min={0}
      max={100000}
      step={100}
      size="md"
      onChange={fn()}
    />
  );
};

// With prefix and suffix
export const WithPrefixAndSuffix: Story = {
  render: function Render() {
    return <WithPrefixAndSuffixDemo />;
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

// Wrapper for error story
const WithErrorDemo = () => {
  const t = useT();
  return (
    <NumberInput
      label={t('storybook.demo.quantity')}
      defaultValue={150}
      min={0}
      max={100}
      step={1}
      error={t('storybook.demo.valueMustBeBetween')}
      size="md"
      onChange={fn()}
    />
  );
};

// With error
export const WithError: Story = {
  render: function Render() {
    return <WithErrorDemo />;
  },
};

// Wrapper for helper text story
const WithHelperTextDemo = () => {
  const t = useT();
  return (
    <NumberInput
      label={t('storybook.demo.quantity')}
      defaultValue={10}
      min={0}
      max={100}
      step={1}
      helperText={t('storybook.demo.enterValueBetween')}
      size="md"
      onChange={fn()}
    />
  );
};

// With helper text
export const WithHelperText: Story = {
  render: function Render() {
    return <WithHelperTextDemo />;
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

// Wrapper for all sizes story
const AllSizesDemo = () => {
  const t = useT();
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <NumberInput label={t('storybook.demo.small')} defaultValue={10} size="sm" onChange={fn()} />
      <NumberInput label={t('storybook.demo.medium')} defaultValue={10} size="md" onChange={fn()} />
      <NumberInput label={t('storybook.demo.large')} defaultValue={10} size="lg" onChange={fn()} />
    </div>
  );
};

// All sizes showcase
export const AllSizes: Story = {
  render: function Render() {
    return <AllSizesDemo />;
  },
};
