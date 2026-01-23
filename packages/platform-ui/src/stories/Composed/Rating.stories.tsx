import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { Rating, RatingDisplay } from '../../composed/Rating';
import { Heart } from 'lucide-react';

const meta: Meta<typeof Rating> = {
  title: 'Composed/Rating',
  component: Rating,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Rating & RatingDisplay

Interactive rating inputs with stars, hearts, or custom icons. Supports half ratings and read-only display.

### Features
- Star rating (default)
- Custom icons (hearts, etc.)
- Half ratings support
- Read-only display mode
- Size variants
- Color variants
- Value display

### Usage
\`\`\`tsx
<Rating
  value={3.5}
  max={5}
  onChange={handleChange}
  allowHalf
  showValue
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
      description: 'Rating size',
    },
    color: {
      control: 'select',
      options: ['default', 'gold', 'red', 'green'],
      description: 'Rating color',
    },
    allowHalf: {
      control: 'boolean',
      description: 'Allow half ratings',
    },
    readonly: {
      control: 'boolean',
      description: 'Read-only mode',
    },
    showValue: {
      control: 'boolean',
      description: 'Show numeric value',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic rating
export const Default: Story = {
  args: {
    defaultValue: 3,
    max: 5,
    size: 'md',
    color: 'gold',
    allowHalf: false,
    readonly: false,
    showValue: false,
  },
};

// With value display
export const WithValue: Story = {
  args: {
    defaultValue: 4.5,
    max: 5,
    size: 'md',
    color: 'gold',
    allowHalf: true,
    readonly: false,
    showValue: true,
  },
};

// Half ratings
export const HalfRatings: Story = {
  args: {
    defaultValue: 3.5,
    max: 5,
    size: 'md',
    color: 'gold',
    allowHalf: true,
    readonly: false,
    showValue: true,
  },
};

// Read-only
export const ReadOnly: Story = {
  args: {
    value: 4,
    max: 5,
    size: 'md',
    color: 'gold',
    readonly: true,
    showValue: false,
  },
};

// Small size
export const Small: Story = {
  args: {
    defaultValue: 3,
    max: 5,
    size: 'sm',
    color: 'gold',
    readonly: false,
    showValue: false,
  },
};

// Large size
export const Large: Story = {
  args: {
    defaultValue: 4,
    max: 5,
    size: 'lg',
    color: 'gold',
    readonly: false,
    showValue: false,
  },
};

// Color variants
export const Gold: Story = {
  args: {
    defaultValue: 4,
    max: 5,
    size: 'md',
    color: 'gold',
    readonly: false,
    showValue: false,
  },
};

export const Red: Story = {
  args: {
    defaultValue: 4,
    max: 5,
    size: 'md',
    color: 'red',
    readonly: false,
    showValue: false,
  },
};

export const Green: Story = {
  args: {
    defaultValue: 4,
    max: 5,
    size: 'md',
    color: 'green',
    readonly: false,
    showValue: false,
  },
};

// With custom icon (heart)
export const CustomIcon: Story = {
  args: {
    defaultValue: 3,
    max: 5,
    size: 'md',
    color: 'red',
    readonly: false,
    showValue: false,
    icon: <Heart size={24} fill="currentColor" />,
    emptyIcon: <Heart size={24} />,
  },
};

// With label
export const WithLabel: Story = {
  args: {
    defaultValue: 0,
    max: 5,
    size: 'md',
    color: 'gold',
    readonly: false,
    showValue: false,
    label: 'Rate this product',
  },
};

// Disabled
export const Disabled: Story = {
  args: {
    defaultValue: 3,
    max: 5,
    size: 'md',
    color: 'gold',
    readonly: false,
    disabled: true,
    showValue: false,
  },
};

// RatingDisplay component
export const DisplayOnly: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <RatingDisplay value={4.5} max={5} size="md" showValue />
      <RatingDisplay value={3.2} max={5} size="md" showValue showCount={128} />
      <RatingDisplay value={5} max={5} size="lg" showValue showCount={1024} />
    </div>
  ),
};
