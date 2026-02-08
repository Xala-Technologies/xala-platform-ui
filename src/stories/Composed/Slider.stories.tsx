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

// Wrapper components for stories that need translations
const WithLabelDemo = () => {
  return (
    <div style={{ width: '400px' }}>
      <Slider
        label="Eksempel Tekst"
        defaultValue={50}
        min={0}
        max={100}
        step={1}
        size="md"
        onChange={fn()}
      />
    </div>
  );
};

const WithValueDemo = () => {
  return (
    <div style={{ width: '400px' }}>
      <Slider
        label="Eksempel Tekst"
        defaultValue={75}
        min={0}
        max={100}
        step={1}
        showValue
        size="md"
        onChange={fn()}
      />
    </div>
  );
};

const WithTooltipDemo = () => {
  return (
    <div style={{ width: '400px' }}>
      <Slider
        label={t('platform.common.price')}
        defaultValue={50}
        min={0}
        max={100}
        step={1}
        showTooltip
        size="md"
        onChange={fn()}
      />
    </div>
  );
};

const TooltipAlwaysDemo = () => {
  return (
    <div style={{ width: '400px' }}>
      <Slider
        label="Eksempel Tekst"
        defaultValue={50}
        min={0}
        max={100}
        step={1}
        showTooltip="always"
        size="md"
        onChange={fn()}
      />
    </div>
  );
};

const WithMarksDemo = () => {
  return (
    <div style={{ width: '400px' }}>
      <Slider
        label="Eksempel Tekst"
        defaultValue={20}
        min={0}
        max={100}
        step={5}
        marks={[
          { value: 0, label: '0°C' },
          { value: 25, label: '25°C' },
          { value: 50, label: '50°C' },
          { value: 75, label: '75°C' },
          { value: 100, label: '100°C' },
        ]}
        size="md"
        onChange={fn()}
      />
    </div>
  );
};

const CustomFormatDemo = () => {
  return (
    <div style={{ width: '400px' }}>
      <Slider
        label={t('platform.common.price')}
        defaultValue={50}
        min={0}
        max={100}
        step={1}
        formatValue={(value) => `$${value}`}
        showTooltip
        size="md"
        onChange={fn()}
      />
    </div>
  );
};

const SmallDemo = () => {
  return (
    <div style={{ width: '400px' }}>
      <Slider label="Eksempel Tekst" defaultValue={50} size="sm" onChange={fn()} />
    </div>
  );
};

const MediumDemo = () => {
  return (
    <div style={{ width: '400px' }}>
      <Slider label="Eksempel Tekst" defaultValue={50} size="md" onChange={fn()} />
    </div>
  );
};

const LargeDemo = () => {
  return (
    <div style={{ width: '400px' }}>
      <Slider label="Eksempel Tekst" defaultValue={50} size="lg" onChange={fn()} />
    </div>
  );
};

const SuccessDemo = () => {
  return (
    <div style={{ width: '400px' }}>
      <Slider
        label="Eksempel Tekst"
        defaultValue={75}
        color="success"
        size="md"
        onChange={fn()}
      />
    </div>
  );
};

const WarningDemo = () => {
  return (
    <div style={{ width: '400px' }}>
      <Slider
        label="Eksempel Tekst"
        defaultValue={50}
        color="warning"
        size="md"
        onChange={fn()}
      />
    </div>
  );
};

const DangerDemo = () => {
  return (
    <div style={{ width: '400px' }}>
      <Slider
        label="Eksempel Tekst"
        defaultValue={25}
        color="danger"
        size="md"
        onChange={fn()}
      />
    </div>
  );
};

const DisabledDemo = () => {
  return (
    <div style={{ width: '400px' }}>
      <Slider
        label="Eksempel Tekst"
        defaultValue={50}
        disabled
        size="md"
        onChange={fn()}
      />
    </div>
  );
};

const WithStepDemo = () => {
  return (
    <div style={{ width: '400px' }}>
      <Slider
        label="Eksempel Tekst"
        defaultValue={50}
        min={0}
        max={100}
        step={10}
        size="md"
        onChange={fn()}
      />
    </div>
  );
};

const RangeSliderDemo = () => {
  return (
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
  );
};

const RangeSliderWithLabelDemo = () => {
  return (
    <div style={{ width: '400px' }}>
      <RangeSlider
        label="Eksempel Tekst"
        defaultValue={[25, 75]}
        min={0}
        max={100}
        step={5}
        onChange={fn()}
        showTooltip={true}
      />
    </div>
  );
};

const RangeSliderWithMarksDemo = () => {
  return (
    <div style={{ width: '400px' }}>
      <RangeSlider
        label="Eksempel Tekst"
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
  );
};

const AllSizesDemo = () => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-6)',
        width: '400px',
      }}
    >
      <Slider label="Eksempel Tekst" defaultValue={50} size="sm" onChange={fn()} />
      <Slider label="Eksempel Tekst" defaultValue={50} size="md" onChange={fn()} />
      <Slider label="Eksempel Tekst" defaultValue={50} size="lg" onChange={fn()} />
    </div>
  );
};

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
  render: function Render() {
    return <WithLabelDemo />;
  },
};

// With value display
export const WithValue: Story = {
  render: function Render() {
    return <WithValueDemo />;
  },
};

// With tooltip
export const WithTooltip: Story = {
  render: function Render() {
    return <WithTooltipDemo />;
  },
};

// Tooltip always visible
export const TooltipAlways: Story = {
  render: function Render() {
    return <TooltipAlwaysDemo />;
  },
};

// With marks
export const WithMarks: Story = {
  render: function Render() {
    return <WithMarksDemo />;
  },
};

// With custom format
export const CustomFormat: Story = {
  render: function Render() {
    return <CustomFormatDemo />;
  },
};

// Size variants
export const Small: Story = {
  render: function Render() {
    return <SmallDemo />;
  },
};

export const Medium: Story = {
  render: function Render() {
    return <MediumDemo />;
  },
};

export const Large: Story = {
  render: function Render() {
    return <LargeDemo />;
  },
};

// Color variants
export const Success: Story = {
  render: function Render() {
    return <SuccessDemo />;
  },
};

export const Warning: Story = {
  render: function Render() {
    return <WarningDemo />;
  },
};

export const Danger: Story = {
  render: function Render() {
    return <DangerDemo />;
  },
};

// Disabled
export const Disabled: Story = {
  render: function Render() {
    return <DisabledDemo />;
  },
};

// With step
export const WithStep: Story = {
  render: function Render() {
    return <WithStepDemo />;
  },
};

// Range slider
export const RangeSliderExample: Story = {
  render: function Render() {
    return <RangeSliderDemo />;
  },
};

// Range slider with label
export const RangeSliderWithLabel: Story = {
  render: function Render() {
    return <RangeSliderWithLabelDemo />;
  },
};

// Range slider with marks
export const RangeSliderWithMarks: Story = {
  render: function Render() {
    return <RangeSliderWithMarksDemo />;
  },
};

// All sizes showcase
export const AllSizes: Story = {
  render: function Render() {
    return <AllSizesDemo />;
  },
};
