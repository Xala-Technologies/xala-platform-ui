import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
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
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <Slider
        label={t('storybook.demo.volume')}
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
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <Slider
        label={t('storybook.demo.progress')}
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
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <Slider
        label={t('storybook.demo.price')}
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
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <Slider
        label={t('storybook.demo.value')}
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
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <Slider
        label={t('storybook.demo.temperature')}
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
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <Slider
        label={t('storybook.demo.price')}
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
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <Slider label={t('storybook.demo.small')} defaultValue={50} size="sm" onChange={fn()} />
    </div>
  );
};

const MediumDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <Slider label={t('storybook.demo.medium')} defaultValue={50} size="md" onChange={fn()} />
    </div>
  );
};

const LargeDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <Slider label={t('storybook.demo.large')} defaultValue={50} size="lg" onChange={fn()} />
    </div>
  );
};

const SuccessDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <Slider
        label={t('storybook.story.success')}
        defaultValue={75}
        color="success"
        size="md"
        onChange={fn()}
      />
    </div>
  );
};

const WarningDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <Slider
        label={t('storybook.demo.warning')}
        defaultValue={50}
        color="warning"
        size="md"
        onChange={fn()}
      />
    </div>
  );
};

const DangerDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <Slider
        label={t('storybook.demo.danger')}
        defaultValue={25}
        color="danger"
        size="md"
        onChange={fn()}
      />
    </div>
  );
};

const DisabledDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <Slider
        label={t('storybook.demo.disabled')}
        defaultValue={50}
        disabled
        size="md"
        onChange={fn()}
      />
    </div>
  );
};

const WithStepDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <Slider
        label={t('storybook.demo.stepBy10')}
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
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <RangeSlider
        label={t('storybook.demo.priceRange')}
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
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <RangeSlider
        label={t('storybook.demo.ageRange')}
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
  const t = useT();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-6)',
        width: '400px',
      }}
    >
      <Slider label={t('storybook.demo.small')} defaultValue={50} size="sm" onChange={fn()} />
      <Slider label={t('storybook.demo.medium')} defaultValue={50} size="md" onChange={fn()} />
      <Slider label={t('storybook.demo.large')} defaultValue={50} size="lg" onChange={fn()} />
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
  render: () => <WithLabelDemo />,
};

// With value display
export const WithValue: Story = {
  render: () => <WithValueDemo />,
};

// With tooltip
export const WithTooltip: Story = {
  render: () => <WithTooltipDemo />,
};

// Tooltip always visible
export const TooltipAlways: Story = {
  render: () => <TooltipAlwaysDemo />,
};

// With marks
export const WithMarks: Story = {
  render: () => <WithMarksDemo />,
};

// With custom format
export const CustomFormat: Story = {
  render: () => <CustomFormatDemo />,
};

// Size variants
export const Small: Story = {
  render: () => <SmallDemo />,
};

export const Medium: Story = {
  render: () => <MediumDemo />,
};

export const Large: Story = {
  render: () => <LargeDemo />,
};

// Color variants
export const Success: Story = {
  render: () => <SuccessDemo />,
};

export const Warning: Story = {
  render: () => <WarningDemo />,
};

export const Danger: Story = {
  render: () => <DangerDemo />,
};

// Disabled
export const Disabled: Story = {
  render: () => <DisabledDemo />,
};

// With step
export const WithStep: Story = {
  render: () => <WithStepDemo />,
};

// Range slider
export const RangeSliderExample: Story = {
  render: () => <RangeSliderDemo />,
};

// Range slider with label
export const RangeSliderWithLabel: Story = {
  render: () => <RangeSliderWithLabelDemo />,
};

// Range slider with marks
export const RangeSliderWithMarks: Story = {
  render: () => <RangeSliderWithMarksDemo />,
};

// All sizes showcase
export const AllSizes: Story = {
  render: () => <AllSizesDemo />,
};
