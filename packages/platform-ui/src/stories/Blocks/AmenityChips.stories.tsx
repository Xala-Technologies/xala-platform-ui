import type { Meta, StoryObj } from '@storybook/react';
import { AmenityChips } from '../../blocks/AmenityChips';
import { Wifi, Car, Coffee, Utensils, Dumbbell, Music } from 'lucide-react';

const meta: Meta<typeof AmenityChips> = {
  title: 'Blocks/AmenityChips',
  component: AmenityChips,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## AmenityChips

Displays a list of amenities as chips with optional icons. Domain-agnostic component that receives all data via props.

### Features
- Icon support for visual amenity representation
- Overflow handling with "more" indicator
- Size variants (sm, md, lg)
- Filtering of unavailable amenities
- Customizable labels for i18n

### Usage
\`\`\`tsx
<AmenityChips
  amenities={[
    { id: '1', name: 'WiFi', icon: <WifiIcon /> },
    { id: '2', name: 'Parking', icon: <CarIcon /> },
  ]}
  maxVisible={5}
  size="sm"
  showIcons={true}
/>
\`\`\`
        `,
      },
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    showIcons: {
      control: 'boolean',
      description: 'Show icons with labels',
    },
    maxVisible: {
      control: 'number',
      description: 'Maximum number of chips to display',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample amenities with icons
const sampleAmenities = [
  { id: '1', name: 'WiFi', icon: <Wifi size={16} />, available: true },
  { id: '2', name: 'Parking', icon: <Car size={16} />, available: true },
  { id: '3', name: 'Café', icon: <Coffee size={16} />, available: true },
  { id: '4', name: 'Restaurant', icon: <Utensils size={16} />, available: true },
  { id: '5', name: 'Gym', icon: <Dumbbell size={16} />, available: true },
  { id: '6', name: 'Music Room', icon: <Music size={16} />, available: true },
];

// Default usage
export const Default: Story = {
  args: {
    amenities: sampleAmenities.slice(0, 4),
    size: 'sm',
    showIcons: true,
    maxVisible: 5,
  },
};

// With overflow
export const WithOverflow: Story = {
  args: {
    amenities: sampleAmenities,
    size: 'sm',
    showIcons: true,
    maxVisible: 4,
  },
};

// Without icons
export const WithoutIcons: Story = {
  args: {
    amenities: sampleAmenities.slice(0, 4),
    size: 'sm',
    showIcons: false,
    maxVisible: 5,
  },
};

// Medium size
export const MediumSize: Story = {
  args: {
    amenities: sampleAmenities.slice(0, 4),
    size: 'md',
    showIcons: true,
    maxVisible: 5,
  },
};

// Large size
export const LargeSize: Story = {
  args: {
    amenities: sampleAmenities.slice(0, 4),
    size: 'lg',
    showIcons: true,
    maxVisible: 5,
  },
};

// With unavailable amenities
export const WithUnavailable: Story = {
  args: {
    amenities: [
      ...sampleAmenities.slice(0, 3),
      { id: '7', name: 'Pool', icon: <Wifi size={16} />, available: false },
      ...sampleAmenities.slice(3, 5),
    ],
    size: 'sm',
    showIcons: true,
    maxVisible: 5,
  },
};

// Custom labels
export const CustomLabels: Story = {
  args: {
    amenities: sampleAmenities,
    size: 'sm',
    showIcons: true,
    maxVisible: 4,
    labels: {
      moreLabel: '+{count} more amenities',
    },
  },
};
