import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { BarChart, VerticalBarChart } from '../../blocks/BarChart';

const meta: Meta<typeof BarChart> = {
  title: 'Blocks/BarChart',
  component: BarChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## BarChart

Simple horizontal and vertical bar chart components for data visualization. Follows Digdir design tokens for consistent styling.

### Features
- Horizontal bar chart
- Vertical bar chart
- Custom colors
- Value labels
- Custom formatting
- Configurable dimensions

### Usage
\`\`\`tsx
<BarChart
  data={[
    { label: 'Jan', value: 100 },
    { label: 'Feb', value: 150 },
  ]}
  showValues={true}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    showValues: {
      control: 'boolean',
      description: 'Show value labels',
    },
    barHeight: {
      control: 'text',
      description: 'Bar height',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleData = [
  { label: 'Jan', value: 100 },
  { label: 'Feb', value: 150 },
  { label: 'Mar', value: 200 },
  { label: 'Apr', value: 180 },
  { label: 'May', value: 250 },
];

// Basic horizontal bar chart
export const Default: Story = {
  args: {
    data: sampleData,
    showValues: true,
    barHeight: '24px',
  },
};

// Without values
export const WithoutValues: Story = {
  args: {
    data: sampleData,
    showValues: false,
    barHeight: '24px',
  },
};

// Custom colors
export const CustomColors: Story = {
  args: {
    data: [
      { label: 'Q1', value: 100, color: 'var(--ds-color-success-base-default)' },
      { label: 'Q2', value: 150, color: 'var(--ds-color-warning-base-default)' },
      { label: 'Q3', value: 200, color: 'var(--ds-color-danger-base-default)' },
      { label: 'Q4', value: 180, color: 'var(--ds-color-info-base-default)' },
    ],
    showValues: true,
    barHeight: '24px',
  },
};

// Custom formatting
export const CustomFormatting: Story = {
  args: {
    data: sampleData,
    showValues: true,
    formatValue: (value) => `$${value.toLocaleString()}`,
    barHeight: '24px',
  },
};

// Custom max value
export const CustomMaxValue: Story = {
  args: {
    data: sampleData,
    maxValue: 300,
    showValues: true,
    barHeight: '24px',
  },
};

// Tall bars
export const TallBars: Story = {
  args: {
    data: sampleData,
    showValues: true,
    barHeight: '40px',
  },
};

// Short bars
export const ShortBars: Story = {
  args: {
    data: sampleData,
    showValues: true,
    barHeight: '16px',
  },
};

// Vertical bar chart
export const Vertical: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ width: '400px', height: '300px' }}>
        <VerticalBarChart
          data={sampleData}
          showValues={true}
          height="250px"
          barWidth="40px"
          gap="12px"
        />
      </div>
    );
  },
};

// Vertical without values
export const VerticalWithoutValues: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ width: '400px', height: '300px' }}>
        <VerticalBarChart
          data={sampleData}
          showValues={false}
          height="250px"
          barWidth="40px"
          gap="12px"
        />
      </div>
    );
  },
};

// Vertical custom colors
export const VerticalCustomColors: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ width: '400px', height: '300px' }}>
        <VerticalBarChart
          data={[
            { label: 'Q1', value: 100, color: 'var(--ds-color-success-base-default)' },
            { label: 'Q2', value: 150, color: 'var(--ds-color-warning-base-default)' },
            { label: 'Q3', value: 200, color: 'var(--ds-color-danger-base-default)' },
            { label: 'Q4', value: 180, color: 'var(--ds-color-info-base-default)' },
          ]}
          showValues={true}
          height="250px"
          barWidth="40px"
          gap="12px"
        />
      </div>
    );
  },
};

// Many items
export const ManyItems: Story = {
  args: {
    data: [
      { label: 'Jan', value: 100 },
      { label: 'Feb', value: 150 },
      { label: 'Mar', value: 200 },
      { label: 'Apr', value: 180 },
      { label: 'May', value: 250 },
      { label: 'Jun', value: 220 },
      { label: 'Jul', value: 300 },
      { label: 'Aug', value: 280 },
      { label: 'Sep', value: 320 },
      { label: 'Oct', value: 290 },
      { label: 'Nov', value: 260 },
      { label: 'Dec', value: 350 },
    ],
    showValues: true,
    barHeight: '24px',
  },
};
