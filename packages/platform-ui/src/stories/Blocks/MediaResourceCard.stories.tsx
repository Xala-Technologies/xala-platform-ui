import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { MediaResourceCard } from '../../blocks/MediaResourceCard';

const meta: Meta<typeof MediaResourceCard> = {
  title: 'Blocks/MediaResourceCard',
  component: MediaResourceCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## MediaResourceCard

A domain-neutral card component with prominent media display, designed for visual-first content like venues, properties, and products.

### Features
- Three layout variants: grid (default), list, and featured
- Prominent image display with hover zoom effect
- Badge support with overflow handling
- Capacity and location metadata
- Status indicator overlay
- Favorite button with toggle state
- Price display
- Gradient overlay for visual depth

### Variants
- **Grid**: Vertical card layout ideal for grid displays
- **List**: Horizontal layout for list views
- **Featured**: Large, immersive card with overlay content

### Usage
\`\`\`tsx
import { MediaResourceCard } from '@xala-technologies/platform-ui/blocks';

<MediaResourceCard
  id="venue-1"
  title="Main Arena"
  subtitle="Sports Complex"
  image={{
    src: "/images/arena.jpg",
    alt: "Main Arena exterior",
  }}
  badges={[
    { id: "1", text: "Indoor", variant: "neutral" },
    { id: "2", text: "Premium", variant: "accent" },
  ]}
  capacity={{ value: 5000, label: "capacity" }}
  location="Downtown District"
  onClick={(id) => navigate(\`/venues/\${id}\`)}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onClick: fn(),
    onFavorite: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['grid', 'list', 'featured'],
      description: 'Card layout variant',
    },
    showGradientOverlay: {
      control: 'boolean',
      description: 'Show gradient overlay on image',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample badges for reuse
const sampleBadges = [
  { id: '1', text: 'Indoor', variant: 'neutral' as const },
  { id: '2', text: 'Premium', variant: 'accent' as const },
  { id: '3', text: 'Air Conditioned', variant: 'info' as const },
];

// Default grid variant
export const Default: Story = {
  args: {
    id: 'venue-1',
    title: 'Main Sports Arena',
    subtitle: 'Multi-purpose Venue',
    description: 'State-of-the-art sports facility with professional-grade courts and amenities.',
    image: {
      src: 'https://images.unsplash.com/photo-1504450758481-7338eba7524a?w=600',
      alt: 'Sports arena interior',
    },
    badges: sampleBadges,
    capacity: { value: 5000, label: 'capacity' },
    location: 'Downtown District',
    status: { type: 'available', label: 'Available' },
    price: { amount: '$150', unit: '/hour' },
  },
};

// List variant
export const ListVariant: Story = {
  args: {
    id: 'venue-2',
    title: 'Conference Hall A',
    subtitle: 'Meeting Space',
    description:
      'Large conference room with modern AV equipment and flexible seating arrangements.',
    image: {
      src: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?w=600',
      alt: 'Conference hall',
    },
    badges: [
      { id: '1', text: 'AV Equipment', variant: 'accent' },
      { id: '2', text: 'Catering Available', variant: 'success' },
    ],
    capacity: { value: 200, label: 'seats' },
    location: 'West Building, Floor 3',
    price: { amount: '$500', unit: '/day' },
    variant: 'list',
  },
};

// Featured variant
export const FeaturedVariant: Story = {
  args: {
    id: 'venue-3',
    title: 'Grand Stadium',
    subtitle: 'Main Event Venue',
    image: {
      src: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800',
      alt: 'Grand stadium',
      height: 300,
    },
    badges: [
      { id: '1', text: 'Premium', variant: 'accent' },
      { id: '2', text: 'VIP Access', variant: 'warning' },
    ],
    capacity: { value: 50000, label: 'seats' },
    location: 'Sports District',
    price: { prefix: 'From', amount: '$10,000', unit: '/event' },
    variant: 'featured',
  },
};

// With badges
export const WithBadges: Story = {
  args: {
    id: 'venue-4',
    title: 'Multi-Sport Complex',
    subtitle: 'Versatile Facility',
    description: 'Flexible space for various sports and events.',
    image: {
      src: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600',
      alt: 'Sports complex',
    },
    badges: [
      { id: '1', text: 'Indoor', variant: 'neutral' },
      { id: '2', text: 'Basketball', variant: 'info' },
      { id: '3', text: 'Volleyball', variant: 'info' },
      { id: '4', text: 'Badminton', variant: 'info' },
      { id: '5', text: 'Futsal', variant: 'info' },
    ],
    maxBadges: 3,
    moreBadgesLabel: '+2 more',
    capacity: { value: 500, label: 'capacity' },
    location: 'Recreation Center',
  },
};

// With capacity
export const WithCapacity: Story = {
  args: {
    id: 'venue-5',
    title: 'Community Hall',
    subtitle: 'Public Venue',
    description: 'Spacious hall suitable for community events and gatherings.',
    image: {
      src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600',
      alt: 'Community hall',
    },
    capacity: { value: 300, label: 'guests' },
    location: 'Community Center',
    status: { type: 'available', label: 'Available' },
    price: { amount: '$200', unit: '/day' },
  },
};

// With favorite
export const WithFavorite: Story = {
  args: {
    id: 'venue-6',
    title: 'Yoga Studio',
    subtitle: 'Wellness Space',
    description: 'Peaceful environment for yoga and meditation classes.',
    image: {
      src: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?w=600',
      alt: 'Yoga studio',
    },
    badges: [
      { id: '1', text: 'Mirror Wall', variant: 'neutral' },
      { id: '2', text: 'Sound System', variant: 'neutral' },
    ],
    capacity: { value: 30, label: 'mats' },
    location: 'Wellness Wing',
    isFavorited: true,
    favoriteAriaLabel: 'Remove Yoga Studio from favorites',
  },
};

// Without gradient overlay
export const NoGradientOverlay: Story = {
  args: {
    id: 'venue-7',
    title: 'Outdoor Pavilion',
    subtitle: 'Open Air Venue',
    description: 'Beautiful outdoor space for events and gatherings.',
    image: {
      src: 'https://images.unsplash.com/photo-1519671482749-fd09be7ccebf?w=600',
      alt: 'Outdoor pavilion',
    },
    badges: [{ id: '1', text: 'Outdoor', variant: 'success' }],
    capacity: { value: 100, label: 'guests' },
    location: 'Garden Area',
    showGradientOverlay: false,
  },
};

// Status: Available
export const StatusAvailable: Story = {
  args: {
    id: 'status-1',
    title: 'Available Venue',
    image: {
      src: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=600',
      alt: 'Venue',
    },
    status: { type: 'available', label: 'Available' },
  },
};

// Status: Limited
export const StatusLimited: Story = {
  args: {
    id: 'status-2',
    title: 'Limited Availability',
    image: {
      src: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?w=600',
      alt: 'Venue',
    },
    status: { type: 'limited', label: '2 slots left' },
  },
};

// Status: Unavailable
export const StatusUnavailable: Story = {
  args: {
    id: 'status-3',
    title: 'Unavailable Venue',
    image: {
      src: 'https://images.unsplash.com/photo-1497215842964-222b430dc094?w=600',
      alt: 'Venue',
    },
    status: { type: 'unavailable', label: 'Fully Booked' },
  },
};

// Status: Pending
export const StatusPending: Story = {
  args: {
    id: 'status-4',
    title: 'Pending Approval',
    image: {
      src: 'https://images.unsplash.com/photo-1497215728101-856f4ea42174?w=600',
      alt: 'Venue',
    },
    status: { type: 'pending', label: 'Under Review' },
  },
};

// Status: Confirmed
export const StatusConfirmed: Story = {
  args: {
    id: 'status-5',
    title: 'Confirmed Booking',
    image: {
      src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600',
      alt: 'Venue',
    },
    status: { type: 'confirmed', label: 'Confirmed' },
  },
};
