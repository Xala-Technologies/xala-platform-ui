import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { HeatmapChart } from '../../blocks/HeatmapChart';

const meta: Meta<typeof HeatmapChart> = {
  title: 'Blocks/HeatmapChart',
  component: HeatmapChart,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## HeatmapChart

Grid-based heatmap visualization for displaying patterns across two dimensions. Commonly used for time-based analytics.

### Features
- Grid-based heatmap
- Color intensity based on values
- Row and column labels
- Value labels in cells
- Click handlers
- Custom formatting

### Usage
\`\`\`tsx
<HeatmapChart
  data={heatmapData}
  rowLabels={['Mon', 'Tue', 'Wed']}
  colLabels={['9am', '10am', '11am']}
  showValues={true}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onCellClick: fn(),
  },
  argTypes: {
    showValues: {
      control: 'boolean',
      description: 'Show value labels in cells',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data for day/hour heatmap
const dayHourData = [
  { row: 'Mon', col: '9am', value: 10 },
  { row: 'Mon', col: '10am', value: 25 },
  { row: 'Mon', col: '11am', value: 30 },
  { row: 'Tue', col: '9am', value: 15 },
  { row: 'Tue', col: '10am', value: 35 },
  { row: 'Tue', col: '11am', value: 40 },
  { row: 'Wed', col: '9am', value: 20 },
  { row: 'Wed', col: '10am', value: 30 },
  { row: 'Wed', col: '11am', value: 45 },
];

// Basic heatmap
export const Default: Story = {
  args: {
    data: dayHourData,
    rowLabels: ['Mon', 'Tue', 'Wed'],
    colLabels: ['9am', '10am', '11am'],
    showValues: false,
  },
};

// With values
export const WithValues: Story = {
  args: {
    data: dayHourData,
    rowLabels: ['Mon', 'Tue', 'Wed'],
    colLabels: ['9am', '10am', '11am'],
    showValues: true,
  },
};

// Week heatmap
export const WeekHeatmap: Story = {
  args: {
    data: [
      { row: 'Mon', col: '9am', value: 10 },
      { row: 'Mon', col: '12pm', value: 25 },
      { row: 'Mon', col: '3pm', value: 30 },
      { row: 'Tue', col: '9am', value: 15 },
      { row: 'Tue', col: '12pm', value: 35 },
      { row: 'Tue', col: '3pm', value: 40 },
      { row: 'Wed', col: '9am', value: 20 },
      { row: 'Wed', col: '12pm', value: 30 },
      { row: 'Wed', col: '3pm', value: 45 },
      { row: 'Thu', col: '9am', value: 18 },
      { row: 'Thu', col: '12pm', value: 28 },
      { row: 'Thu', col: '3pm', value: 38 },
      { row: 'Fri', col: '9am', value: 12 },
      { row: 'Fri', col: '12pm', value: 22 },
      { row: 'Fri', col: '3pm', value: 32 },
    ],
    rowLabels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'],
    colLabels: ['9am', '12pm', '3pm'],
    showValues: true,
  },
};

// Custom colors
export const CustomColors: Story = {
  args: {
    data: dayHourData,
    rowLabels: ['Mon', 'Tue', 'Wed'],
    colLabels: ['9am', '10am', '11am'],
    showValues: false,
    heatColor: 'var(--ds-color-success-base-default)',
  },
};

// Custom formatting
export const CustomFormatting: Story = {
  args: {
    data: dayHourData,
    rowLabels: ['Mon', 'Tue', 'Wed'],
    colLabels: ['9am', '10am', '11am'],
    showValues: true,
    formatValue: (value) => `${value}%`,
  },
};

// Custom max value
export const CustomMaxValue: Story = {
  args: {
    data: dayHourData,
    rowLabels: ['Mon', 'Tue', 'Wed'],
    colLabels: ['9am', '10am', '11am'],
    showValues: true,
    maxValue: 100,
  },
};

// Large heatmap
export const LargeHeatmap: Story = {
  args: {
    data: Array.from({ length: 24 }, (_, i) => ({
      row: `Row ${Math.floor(i / 6) + 1}`,
      col: `Col ${(i % 6) + 1}`,
      value: Math.floor(Math.random() * 100),
    })),
    rowLabels: ['Row 1', 'Row 2', 'Row 3', 'Row 4'],
    colLabels: ['Col 1', 'Col 2', 'Col 3', 'Col 4', 'Col 5', 'Col 6'],
    showValues: false,
  },
};

// With tooltips
export const WithTooltips: Story = {
  args: {
    data: dayHourData.map((cell) => ({
      ...cell,
      tooltip: `${cell.row} ${cell.col}: ${cell.value} users`,
    })),
    rowLabels: ['Mon', 'Tue', 'Wed'],
    colLabels: ['9am', '10am', '11am'],
    showValues: true,
  },
};
