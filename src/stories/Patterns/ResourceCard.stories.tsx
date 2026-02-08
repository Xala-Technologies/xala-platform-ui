/**
 * ResourceCard Stories
 *
 * Comprehensive examples of the ResourceCard pattern component.
 * ResourceCard is a domain-neutral card for displaying any type of resource.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { ResourceCard, type ResourceCardProps } from '@xala-technologies/platform-ui-digilist';
import type {
  ResourceBadge,
  PriceDisplay,
  MetadataItem,
  StatusIndicator,
} from '../../patterns/types';

// Icons for metadata (simplified inline SVGs)
const LocationIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

const UsersIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
    <circle cx="9" cy="7" r="4" />
    <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
  </svg>
);

const StarIcon = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="currentColor"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

const ClockIcon = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <circle cx="12" cy="12" r="10" />
    <polyline points="12 6 12 12 16 14" />
  </svg>
);

// =============================================================================
// Sample Data
// =============================================================================

const sampleBadges: ResourceBadge[] = [
  { id: '1', text: 'Meeting Room', variant: 'accent' },
  { id: '2', text: 'Available', variant: 'success' },
  { id: '3', text: 'Popular', variant: 'warning' },
  { id: '4', text: 'New', variant: 'info' },
];

const sampleMetadata: MetadataItem[] = [
  { id: '1', label: 'Location', value: 'Oslo', icon: <LocationIcon /> },
  { id: '2', label: 'Capacity', value: '12 persons', icon: <UsersIcon /> },
  { id: '3', label: 'Rating', value: '4.8', icon: <StarIcon /> },
];

const samplePrice: PriceDisplay = {
  amount: '1,500 kr',
  unit: 'hour',
  prefix: 'From',
};

const sampleStatus: StatusIndicator = {
  type: 'available',
  label: 'Available',
};

const baseProps: Partial<ResourceCardProps> = {
  id: '1',
  title: 'Conference Room Alpha',
  subtitle: 'Premium Meeting Space',
  description:
    'A modern conference room with state-of-the-art AV equipment, comfortable seating for 12, and natural lighting. Perfect for important client meetings and team workshops.',
  image: {
    src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
    alt: 'Conference room with large table and chairs',
  },
  badges: sampleBadges,
  metadata: sampleMetadata,
  price: samplePrice,
  status: sampleStatus,
};

// =============================================================================
// Meta
// =============================================================================

const meta: Meta<typeof ResourceCard> = {
  title: 'Patterns/ResourceCard',
  component: ResourceCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ResourceCard

A **domain-neutral** card component for displaying any type of resource (rental objects, rooms, equipment, services, etc.).

### Key Features
- **Three variants**: \`grid\`, \`list\`, and \`compact\`
- **Flexible content**: badges, metadata, price, status
- **Interactive**: favorite, share, click handlers
- **Accessible**: ARIA labels, keyboard navigation
- **No business logic**: pure presentation component

### Design Token Compliance
This component uses only Designsystemet tokens for:
- Colors: \`var(--ds-color-*)\`
- Spacing: \`var(--ds-spacing-*)\`
- Typography: \`var(--ds-font-*)\`
- Borders: \`var(--ds-border-*)\`
- Shadows: \`var(--ds-shadow-*)\`

### Usage Pattern

\`\`\`tsx
// Map from domain DTO to ResourceCard props
const mapRentalObjectToCard = (rental: RentalObjectDTO): ResourceCardProps => ({
  id: rental.id,
  title: rental.name,
  subtitle: rental.category,
  description: rental.description,
  image: { src: rental.imageUrl, alt: rental.name },
  badges: rental.amenities.map(a => ({ id: a.id, text: a.name, variant: 'neutral' })),
  metadata: [
    { id: 'loc', label: 'Location', value: rental.address },
    { id: 'cap', label: 'Capacity', value: \`\${rental.capacity} persons\` },
  ],
  price: { amount: formatPrice(rental.price), unit: 'hour' },
  status: { type: rental.available ? 'available' : 'unavailable', label: rental.statusText },
});

<ResourceCard {...mapRentalObjectToCard(rentalObject)} />
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    variant: {
      control: 'select',
      options: ['grid', 'list', 'compact'],
      description: 'Card display variant',
    },
    showBadges: { control: 'boolean' },
    showPrice: { control: 'boolean' },
    showMetadata: { control: 'boolean' },
    showStatus: { control: 'boolean' },
    showDescription: { control: 'boolean' },
    showFavoriteButton: { control: 'boolean' },
    showShareButton: { control: 'boolean' },
    showGradientOverlay: { control: 'boolean' },
    maxBadges: { control: { type: 'number', min: 1, max: 10 } },
    maxMetadata: { control: { type: 'number', min: 1, max: 10 } },
    descriptionLines: { control: { type: 'number', min: 1, max: 5 } },
    imageHeight: { control: { type: 'number', min: 100, max: 400 } },
    isFavorited: { control: 'boolean' },
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '400px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ResourceCard>;

// =============================================================================
// Stories - Variants
// =============================================================================

export const GridVariant: Story = {
  name: 'Grid Variant (Default)',
  args: {
    ...baseProps,
    variant: 'grid',
    onClick: (id) => console.log('Clicked:', id),
    onFavorite: (id) => console.log('Favorite:', id),
    onShare: (id) => console.log('Share:', id),
  },
  parameters: {
    docs: {
      description: {
        story:
          'The default grid variant, optimized for card grid layouts. Shows full content with image, badges, metadata, and actions.',
      },
    },
  },
};

export const ListVariant: Story = {
  name: 'List Variant',
  args: {
    ...baseProps,
    variant: 'list',
    onClick: (id) => console.log('Clicked:', id),
    onFavorite: (id) => console.log('Favorite:', id),
    onShare: (id) => console.log('Share:', id),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '700px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Horizontal layout for list views. Image on the left, content on the right.',
      },
    },
  },
};

export const CompactVariant: Story = {
  name: 'Compact Variant',
  args: {
    ...baseProps,
    variant: 'compact',
    onClick: (id) => console.log('Clicked:', id),
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '500px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Minimal display for dense layouts like dropdowns or autocomplete results.',
      },
    },
  },
};

// =============================================================================
// Stories - States
// =============================================================================

export const WithFavorited: Story = {
  name: 'Favorited State',
  args: {
    ...baseProps,
    isFavorited: true,
    onFavorite: (id) => console.log('Toggle favorite:', id),
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows the card with favorited state (heart filled).',
      },
    },
  },
};

export const WithStatus: Story = {
  name: 'Status Variants',
  render: function Render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <ResourceCard
          {...(baseProps as ResourceCardProps)}
          status={{ type: 'available', label: 'Available Now' }}
        />
        <ResourceCard
          {...(baseProps as ResourceCardProps)}
          id="2"
          status={{ type: 'limited', label: 'Limited Slots' }}
        />
        <ResourceCard
          {...(baseProps as ResourceCardProps)}
          id="3"
          status={{ type: 'unavailable', label: 'Fully Booked' }}
        />
        <ResourceCard
          {...(baseProps as ResourceCardProps)}
          id="4"
          status={{ type: 'pending', label: 'Pending Approval' }}
        />
      </div>
    );
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '350px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Different status indicator types: available, limited, unavailable, pending.',
      },
    },
  },
};

// =============================================================================
// Stories - Customization
// =============================================================================

export const MinimalCard: Story = {
  name: 'Minimal (Title Only)',
  args: {
    id: '1',
    title: 'Simple Resource',
    variant: 'grid',
    showBadges: false,
    showMetadata: false,
    showPrice: false,
    showStatus: false,
    showDescription: false,
    showFavoriteButton: false,
    showShareButton: false,
  },
  parameters: {
    docs: {
      description: {
        story: 'A minimal card showing only the title. Useful for simple selection lists.',
      },
    },
  },
};

export const WithPriceVariants: Story = {
  name: 'Price Display Variants',
  render: function Render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        <ResourceCard
          {...(baseProps as ResourceCardProps)}
          price={{ amount: '500 kr', unit: 'hour' }}
        />
        <ResourceCard
          {...(baseProps as ResourceCardProps)}
          id="2"
          price={{ amount: '2,000 kr', unit: 'day', prefix: 'From' }}
        />
        <ResourceCard
          {...(baseProps as ResourceCardProps)}
          id="3"
          price={{ amount: '1,200 kr', strikethrough: '1,500 kr', unit: 'hour' }}
        />
      </div>
    );
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '350px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Different price display options: basic, with prefix, with strikethrough discount.',
      },
    },
  },
};

export const WithManyBadges: Story = {
  name: 'Many Badges (Overflow)',
  args: {
    ...baseProps,
    badges: [
      { id: '1', text: 'Meeting Room', variant: 'accent' },
      { id: '2', text: 'WiFi', variant: 'neutral' },
      { id: '3', text: 'Projector', variant: 'neutral' },
      { id: '4', text: 'Whiteboard', variant: 'neutral' },
      { id: '5', text: 'Video Conference', variant: 'neutral' },
      { id: '6', text: 'Air Conditioning', variant: 'neutral' },
    ],
    maxBadges: 3,
    moreBadgesText: '+3 more',
  },
  parameters: {
    docs: {
      description: {
        story: 'Shows badge overflow handling with maxBadges and moreBadgesText.',
      },
    },
  },
};

// =============================================================================
// Stories - Grid Layout Example
// =============================================================================

export const GridLayout: Story = {
  name: 'Grid Layout (Multiple Cards)',
  render: function Render() {
    return (
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: '1.5rem',
          padding: '1rem',
        }}
      >
        {[
          {
            id: '1',
            title: 'Conference Room A',
            subtitle: 'Floor 2',
            price: { amount: '800 kr', unit: 'hour' },
            status: { type: 'available' as const, label: 'Available' },
          },
          {
            id: '2',
            title: 'Meeting Pod B',
            subtitle: 'Floor 1',
            price: { amount: '400 kr', unit: 'hour' },
            status: { type: 'limited' as const, label: '2 slots left' },
          },
          {
            id: '3',
            title: 'Workshop Hall',
            subtitle: 'Ground Floor',
            price: { amount: '2,500 kr', unit: 'day' },
            status: { type: 'unavailable' as const, label: 'Booked' },
          },
          {
            id: '4',
            title: 'Creative Studio',
            subtitle: 'Floor 3',
            price: { amount: '1,200 kr', unit: 'hour' },
            status: { type: 'available' as const, label: 'Available' },
          },
        ].map((item) => (
          <ResourceCard
            key={item.id}
            {...item}
            image={{
              src: `https://images.unsplash.com/photo-149736621654${item.id}-37526070297c?w=400&h=300&fit=crop`,
              alt: item.title,
            }}
            badges={[{ id: '1', text: item.subtitle, variant: 'accent' }]}
            metadata={[
              { id: '1', value: 'Oslo', icon: <LocationIcon /> },
              { id: '2', value: '8 pers', icon: <UsersIcon /> },
            ]}
            onClick={(id) => console.log('Clicked:', id)}
            onFavorite={(id) => console.log('Favorite:', id)}
          />
        ))}
      </div>
    );
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', maxWidth: '1200px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Example of multiple ResourceCards in a responsive grid layout.',
      },
    },
  },
};

// =============================================================================
// Stories - List Layout Example
// =============================================================================

export const ListLayout: Story = {
  name: 'List Layout (Multiple Cards)',
  render: function Render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {[
          {
            id: '1',
            title: 'Conference Room A',
            subtitle: 'Premium Meeting Space',
            description: 'Large conference room with panoramic views and modern AV setup.',
          },
          {
            id: '2',
            title: 'Meeting Pod B',
            subtitle: 'Quick Meetings',
            description: 'Compact space for 4 people, ideal for quick syncs and calls.',
          },
          {
            id: '3',
            title: 'Workshop Hall',
            subtitle: 'Events & Training',
            description: 'Flexible space for workshops, training sessions, and team events.',
          },
        ].map((item) => (
          <ResourceCard
            key={item.id}
            {...item}
            variant="list"
            image={{
              src: `https://images.unsplash.com/photo-149736621654${item.id}-37526070297c?w=400&h=300&fit=crop`,
              alt: item.title,
            }}
            badges={sampleBadges.slice(0, 2)}
            metadata={sampleMetadata.slice(0, 2)}
            price={{ amount: '1,000 kr', unit: 'hour' }}
            status={{ type: 'available', label: 'Available' }}
            onClick={(id) => console.log('Clicked:', id)}
            onFavorite={(id) => console.log('Favorite:', id)}
            onShare={(id) => console.log('Share:', id)}
          />
        ))}
      </div>
    );
  },
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', maxWidth: '800px' }}>
        <Story />
      </div>
    ),
  ],
  parameters: {
    docs: {
      description: {
        story: 'Example of ResourceCards in a vertical list layout using the list variant.',
      },
    },
  },
};

// =============================================================================
// Stories - Accessibility
// =============================================================================

export const WithCustomAriaLabels: Story = {
  name: 'Custom ARIA Labels',
  args: {
    ...baseProps,
    favoriteAriaLabel: 'Add Conference Room Alpha to favorites',
    shareAriaLabel: 'Share Conference Room Alpha',
    closeAriaLabel: 'Close Conference Room Alpha details',
    onFavorite: (id) => console.log('Favorite:', id),
    onShare: (id) => console.log('Share:', id),
    onClose: () => console.log('Close'),
  },
  parameters: {
    docs: {
      description: {
        story:
          'Demonstrates custom ARIA labels for improved screen reader experience. Always provide localized, descriptive labels.',
      },
    },
  },
};

// =============================================================================
// Stories - Domain Examples
// =============================================================================

export const RentalObjectExample: Story = {
  name: 'Domain Example: Rental Object',
  args: {
    id: 'rental-001',
    title: 'Storsal Sentrum',
    subtitle: 'Event Hall',
    description:
      'Stor og fleksibel sal egnet for konserter, konferanser og større arrangementer. Kapasitet opp til 500 gjester.',
    image: {
      src: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=600&h=400&fit=crop',
      alt: 'Storsal Sentrum - Large event hall',
    },
    badges: [
      { id: '1', text: 'Event Hall', variant: 'accent' },
      { id: '2', text: 'Accessibility', variant: 'success' },
    ],
    metadata: [
      { id: '1', value: 'Oslo Sentrum', icon: <LocationIcon /> },
      { id: '2', value: '500 gjester', icon: <UsersIcon /> },
      { id: '3', value: '4.9', icon: <StarIcon /> },
    ],
    price: { amount: '15,000 kr', unit: 'dag', prefix: 'Fra' },
    status: { type: 'available', label: 'Ledig' },
    onClick: (id) => console.log('View rental object:', id),
    onFavorite: (id) => console.log('Favorite rental:', id),
    favoriteAriaLabel: 'Legg til i favoritter',
    shareAriaLabel: 'Del',
  },
  parameters: {
    docs: {
      description: {
        story:
          'Example showing how ResourceCard maps to a domain-specific rental object with Norwegian labels.',
      },
    },
  },
};

export const BookingConfirmationExample: Story = {
  name: 'Domain Example: Booking Confirmation',
  args: {
    id: 'booking-123',
    title: 'Møterom 3B',
    subtitle: 'Booking #12345',
    description: 'Tirsdag 15. januar 2026, kl. 09:00–12:00',
    image: {
      src: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop',
      alt: 'Meeting room',
    },
    badges: [{ id: '1', text: 'Bekreftet', variant: 'success' }],
    metadata: [
      { id: '1', value: 'Oslo', icon: <LocationIcon /> },
      { id: '2', value: '3 timer', icon: <ClockIcon /> },
    ],
    price: { amount: '2,400 kr' },
    status: { type: 'confirmed', label: 'Bekreftet' },
    showFavoriteButton: false,
    showShareButton: false,
    onClick: (id) => console.log('View booking:', id),
  },
  parameters: {
    docs: {
      description: {
        story: 'Example showing ResourceCard used for displaying a booking confirmation.',
      },
    },
  },
};
