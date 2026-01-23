import type { Meta, StoryObj } from '@storybook/react';
import { CapacityCard } from '../../blocks/CapacityCard';
import { Users } from 'lucide-react';

const meta: Meta<typeof CapacityCard> = {
  title: 'Blocks/CapacityCard',
  component: CapacityCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## CapacityCard

Dark card displaying maximum capacity with people icon. Displays capacity information in a prominent way.

### Features
- Maximum capacity display
- Customizable label
- Custom icon support
- Dark and default variants
- Prominent number display

### Usage
\`\`\`tsx
<CapacityCard maxCapacity={50} />
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['default', 'dark'],
      description: 'Card variant',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default dark variant
export const Default: Story = {
  args: {
    maxCapacity: 50,
    label: 'MAKS TILLATT',
    variant: 'dark',
  },
};

// Default variant (light)
export const LightVariant: Story = {
  args: {
    maxCapacity: 50,
    label: 'MAKS TILLATT',
    variant: 'default',
  },
};

// Custom label
export const CustomLabel: Story = {
  args: {
    maxCapacity: 100,
    label: 'Maksimal kapasitet',
    variant: 'dark',
  },
};

// Small capacity
export const SmallCapacity: Story = {
  args: {
    maxCapacity: 10,
    label: 'MAKS TILLATT',
    variant: 'dark',
  },
};

// Large capacity
export const LargeCapacity: Story = {
  args: {
    maxCapacity: 5000,
    label: 'MAKS TILLATT',
    variant: 'dark',
  },
};

// With custom icon
export const CustomIcon: Story = {
  args: {
    maxCapacity: 50,
    label: 'MAKS TILLATT',
    variant: 'dark',
    icon: <Users size={24} />,
  },
};

// All variants showcase
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <CapacityCard maxCapacity={50} variant="dark" />
      <CapacityCard maxCapacity={50} variant="default" />
      <CapacityCard maxCapacity={100} label="Maksimal kapasitet" variant="dark" />
    </div>
  ),
};
