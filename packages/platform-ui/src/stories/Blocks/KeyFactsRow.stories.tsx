import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { KeyFactsRow } from '../../blocks/KeyFactsRow';

const meta: Meta<typeof KeyFactsRow> = {
  title: 'Blocks/KeyFactsRow',
  component: KeyFactsRow,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## KeyFactsRow

Displays key resource facts as a horizontal row of badges/chips. Adapts based on resource type to show relevant information.

### Features
- Multiple fact types (capacity, area, duration, quantity, etc.)
- Automatic icon selection based on type
- Custom icons support
- Variants (default, compact, prominent)
- Max visible with overflow
- Tooltip support

### Usage
\`\`\`tsx
<KeyFactsRow
  facts={[
    { type: 'capacity', label: 'Kapasitet', value: '25 personer' },
    { type: 'area', label: 'Areal', value: '120 m2' },
  ]}
  variant="default"
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'compact', 'prominent'],
      description: 'Visual variant',
    },
    maxVisible: {
      control: 'number',
      description: 'Maximum facts to show before collapse',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic key facts
export const Default: Story = {
  args: {
    facts: [
      { type: 'capacity', label: 'Kapasitet', value: '25 personer' },
      { type: 'area', label: 'Areal', value: '120 m2' },
      { type: 'duration', label: 'Varighet', value: '2 timer' },
    ],
    variant: 'default',
  },
};

// All fact types
export const AllTypes: Story = {
  args: {
    facts: [
      { type: 'capacity', label: 'Kapasitet', value: '25 personer' },
      { type: 'area', label: 'Areal', value: '120 m2' },
      { type: 'duration', label: 'Varighet', value: '2 timer' },
      { type: 'quantity', label: 'Antall', value: '10 enheter' },
      { type: 'resourceRequestMode', label: 'Modus', value: 'Booking' },
      { type: 'accessibility', label: 'Tilgjengelighet', value: 'Rullestol' },
      { type: 'custom', label: 'Egendefinert', value: 'Verdi' },
    ],
    variant: 'default',
  },
};

// Compact variant
export const Compact: Story = {
  args: {
    facts: [
      { type: 'capacity', label: 'Kapasitet', value: '25' },
      { type: 'area', label: 'Areal', value: '120 m2' },
      { type: 'duration', label: 'Varighet', value: '2t' },
    ],
    variant: 'compact',
  },
};

// Prominent variant
export const Prominent: Story = {
  args: {
    facts: [
      { type: 'capacity', label: 'Kapasitet', value: '25 personer' },
      { type: 'area', label: 'Areal', value: '120 m2' },
      { type: 'duration', label: 'Varighet', value: '2 timer' },
    ],
    variant: 'prominent',
  },
};

// With max visible
export const WithMaxVisible: Story = {
  args: {
    facts: [
      { type: 'capacity', label: 'Kapasitet', value: '25 personer' },
      { type: 'area', label: 'Areal', value: '120 m2' },
      { type: 'duration', label: 'Varighet', value: '2 timer' },
      { type: 'quantity', label: 'Antall', value: '10 enheter' },
      { type: 'accessibility', label: 'Tilgjengelighet', value: 'Rullestol' },
    ],
    variant: 'default',
    maxVisible: 3,
  },
};

// With tooltips
export const WithTooltips: Story = {
  args: {
    facts: [
      {
        type: 'capacity',
        label: 'Kapasitet',
        value: '25 personer',
        tooltip: 'Maksimalt antall personer',
      },
      { type: 'area', label: 'Areal', value: '120 m2', tooltip: 'Total areal i kvadratmeter' },
      { type: 'duration', label: 'Varighet', value: '2 timer', tooltip: 'Standard varighet' },
    ],
    variant: 'default',
  },
};

// Single fact
export const SingleFact: Story = {
  args: {
    facts: [{ type: 'capacity', label: 'Kapasitet', value: '25 personer' }],
    variant: 'default',
  },
};

// Many facts
export const ManyFacts: Story = {
  args: {
    facts: [
      { type: 'capacity', label: 'Kapasitet', value: '25 personer' },
      { type: 'area', label: 'Areal', value: '120 m2' },
      { type: 'duration', label: 'Varighet', value: '2 timer' },
      { type: 'quantity', label: 'Antall', value: '10 enheter' },
      { type: 'resourceRequestMode', label: 'Modus', value: 'Booking' },
      { type: 'accessibility', label: 'Tilgjengelighet', value: 'Rullestol' },
      { type: 'custom', label: 'Egendefinert', value: 'Verdi' },
      { type: 'capacity', label: 'Kapasitet 2', value: '50 personer' },
    ],
    variant: 'default',
  },
};
