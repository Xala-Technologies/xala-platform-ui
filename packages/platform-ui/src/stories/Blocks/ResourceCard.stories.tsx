import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { ResourceCard } from '../../blocks/ResourceCard';

const meta: Meta<typeof ResourceCard> = {
  title: 'Blocks/ResourceCard',
  component: ResourceCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ResourceCard

A reusable card component for displaying resource information. Supports images, ratings, pricing, amenities, and action buttons.

### Features
- Grid and detailed variants
- Image with overlay badges
- Ratings and reviews
- Pricing information
- Amenities display
- Favorite and share buttons
- Capacity information
- Customizable visibility options

### Usage
\`\`\`tsx
<ResourceCard
  id="1"
  name="Meeting Room A"
  type="Moterom"
  location="Oslo"
  description="Modern meeting room..."
  image="/image.jpg"
  amenities={['WiFi', 'Projector']}
  capacity={10}
  price={500}
  onClick={handleClick}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onClick: fn(),
    onFavorite: fn(),
    onShare: fn(),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample data
const sampleResource = {
  id: '1',
  name: 'Meeting Room A',
  type: 'Moterom',
  location: 'Oslo, Sentrum',
  description: 'Modern meeting room with state-of-the-art equipment and comfortable seating.',
  image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400',
  amenities: ['WiFi', 'Projector', 'Whiteboard', 'Coffee'],
  capacity: 10,
  price: 500,
  priceUnit: 'time',
  currency: 'NOK',
  rating: 4.5,
  reviewCount: 24,
  available: true,
};

// Grid variant (default)
export const GridVariant: Story = {
  args: {
    ...sampleResource,
    variant: 'grid',
  },
  render: (args) => (
    <div style={{ width: '320px' }}>
      <ResourceCard {...args} />
    </div>
  ),
};

// Detailed variant
export const DetailedVariant: Story = {
  args: {
    ...sampleResource,
    variant: 'detailed',
  },
  render: (args) => (
    <div style={{ width: '600px' }}>
      <ResourceCard {...args} />
    </div>
  ),
};

// With favorite
export const WithFavorite: Story = {
  args: {
    ...sampleResource,
    variant: 'grid',
    isFavorited: true,
    showFavoriteButton: true,
  },
  render: (args) => (
    <div style={{ width: '320px' }}>
      <ResourceCard {...args} />
    </div>
  ),
};

// Without rating
export const WithoutRating: Story = {
  args: {
    ...sampleResource,
    variant: 'grid',
    showRating: false,
  },
  render: (args) => (
    <div style={{ width: '320px' }}>
      <ResourceCard {...args} />
    </div>
  ),
};

// Without price
export const WithoutPrice: Story = {
  args: {
    ...sampleResource,
    variant: 'grid',
    showPrice: false,
  },
  render: (args) => (
    <div style={{ width: '320px' }}>
      <ResourceCard {...args} />
    </div>
  ),
};

// Without amenities
export const WithoutAmenities: Story = {
  args: {
    ...sampleResource,
    variant: 'grid',
    showAmenities: false,
  },
  render: (args) => (
    <div style={{ width: '320px' }}>
      <ResourceCard {...args} />
    </div>
  ),
};

// Minimal card
export const Minimal: Story = {
  args: {
    ...sampleResource,
    variant: 'grid',
    showRating: false,
    showPrice: false,
    showCapacity: false,
    showAmenities: false,
    showDescription: false,
    showFavoriteButton: false,
    showShareButton: false,
  },
  render: (args) => (
    <div style={{ width: '320px' }}>
      <ResourceCard {...args} />
    </div>
  ),
};

// Unavailable resource
export const Unavailable: Story = {
  args: {
    ...sampleResource,
    variant: 'grid',
    available: false,
  },
  render: (args) => (
    <div style={{ width: '320px' }}>
      <ResourceCard {...args} />
    </div>
  ),
};

// Many amenities
export const ManyAmenities: Story = {
  args: {
    ...sampleResource,
    variant: 'grid',
    amenities: [
      'WiFi',
      'Projector',
      'Whiteboard',
      'Coffee',
      'Parking',
      'Accessibility',
      'Air Conditioning',
      'Video Conference',
    ],
    moreAmenities: 3,
  },
  render: (args) => (
    <div style={{ width: '320px' }}>
      <ResourceCard {...args} />
    </div>
  ),
};

// High rating
export const HighRating: Story = {
  args: {
    ...sampleResource,
    variant: 'grid',
    rating: 4.9,
    reviewCount: 127,
  },
  render: (args) => (
    <div style={{ width: '320px' }}>
      <ResourceCard {...args} />
    </div>
  ),
};

// No reviews
export const NoReviews: Story = {
  args: {
    ...sampleResource,
    variant: 'grid',
    rating: 0,
    reviewCount: 0,
  },
  render: (args) => (
    <div style={{ width: '320px' }}>
      <ResourceCard {...args} />
    </div>
  ),
};
