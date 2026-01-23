import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Slider, RangeSlider } from '../../composed/Slider';

const meta: Meta<typeof Slider> = {
  title: 'Composed/Slider',
  component: Slider,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Slider & RangeSlider

Interactive sliders with labels, marks, and tooltips. Supports single value and range selection.

### Features
- Single value slider
- Range slider (min/max)
- Marks and labels
- Tooltip support
- Size variants
- Color variants
- Custom value formatting
- Disabled state

### Usage
\`\`\`tsx
<Slider
  value={50}
  min={0}
  max={100}
  step={1}
  onChange={handleChange}
  showTooltip
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
      description: 'Slider size',
    },
    color: {
      control: 'select',
      options: ['default', 'success', 'warning', 'danger'],
      description: 'Slider color',
    },
    showTooltip: {
      control: 'select',
      options: [false, true, 'always'],
      description: 'Show tooltip',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic slider
export const Default: Story = {
  args: {
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    size: 'md',
    color: 'default',
    showTooltip: false,
    showValue: false,
  },
};

// With label
export const WithLabel: Story = {
  args: {
    label: 'Volume',
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    size: 'md',
  },
};

// With value display
export const WithValue: Story = {
  args: {
    label: 'Progress',
    defaultValue: 75,
    min: 0,
    max: 100,
    step: 1,
    showValue: true,
    size: 'md',
  },
};

// With tooltip
export const WithTooltip: Story = {
  args: {
    label: 'Price',
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    showTooltip: true,
    size: 'md',
  },
};

// Tooltip always visible
export const TooltipAlways: Story = {
  args: {
    label: 'Value',
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    showTooltip: 'always',
    size: 'md',
  },
};

// With marks
export const WithMarks: Story = {
  args: {
    label: 'Temperature',
    defaultValue: 20,
    min: 0,
    max: 100,
    step: 5,
    marks: [
      { value: 0, label: '0°C' },
      { value: 25, label: '25°C' },
      { value: 50, label: '50°C' },
      { value: 75, label: '75°C' },
      { value: 100, label: '100°C' },
    ],
    size: 'md',
  },
};

// With custom format
export const CustomFormat: Story = {
  args: {
    label: 'Price',
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 1,
    formatValue: (value) => `$${value}`,
    showTooltip: true,
    size: 'md',
  },
};

// Size variants
export const Small: Story = {
  args: {
    label: 'Small',
    defaultValue: 50,
    size: 'sm',
  },
};

export const Medium: Story = {
  args: {
    label: 'Medium',
    defaultValue: 50,
    size: 'md',
  },
};

export const Large: Story = {
  args: {
    label: 'Large',
    defaultValue: 50,
    size: 'lg',
  },
};

// Color variants
export const Success: Story = {
  args: {
    label: 'Success',
    defaultValue: 75,
    color: 'success',
    size: 'md',
  },
};

export const Warning: Story = {
  args: {
    label: 'Warning',
    defaultValue: 50,
    color: 'warning',
    size: 'md',
  },
};

export const Danger: Story = {
  args: {
    label: 'Danger',
    defaultValue: 25,
    color: 'danger',
    size: 'md',
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    label: 'Disabled',
    defaultValue: 50,
    disabled: true,
    size: 'md',
  },
};

// With step
export const WithStep: Story = {
  args: {
    label: 'Step by 10',
    defaultValue: 50,
    min: 0,
    max: 100,
    step: 10,
    size: 'md',
  },
};

// Range slider
export const RangeSliderExample: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <RangeSlider
        defaultValue={[20, 80]}
        min={0}
        max={100}
        step={1}
        onChange={fn()}
        showTooltip={true}
      />
    </div>
  ),
};

// Range slider with label
export const RangeSliderWithLabel: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <RangeSlider
        label="Price Range"
        defaultValue={[25, 75]}
        min={0}
        max={100}
        step={5}
        onChange={fn()}
        showTooltip={true}
      />
    </div>
  ),
};

// Range slider with marks
export const RangeSliderWithMarks: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <RangeSlider
        label="Age Range"
        defaultValue={[25, 65]}
        min={0}
        max={100}
        step={5}
        marks={[
          { value: 0, label: '0' },
          { value: 25, label: '25' },
          { value: 50, label: '50' },
          { value: 75, label: '75' },
          { value: 100, label: '100' },
        ]}
        onChange={fn()}
        showTooltip={true}
      />
    </div>
  ),
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)', width: '400px' }}>
      <Slider label="Small" defaultValue={50} size="sm" onChange={fn()} />
      <Slider label="Medium" defaultValue={50} size="md" onChange={fn()} />
      <Slider label="Large" defaultValue={50} size="lg" onChange={fn()} />
    </div>
  ),
};
