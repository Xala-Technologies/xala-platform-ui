/**
 * ResourceDetailHeader Stories
 *
 * Header component for resource detail pages.
 */
import type { Meta, StoryObj } from '@storybook/react';
import {
  ResourceDetailHeader,
  type ResourceDetailHeaderProps,
} from '../../patterns/ResourceDetailHeader';
import type { ResourceBadge, ActionButton, PatternBreadcrumbItem } from '../../patterns/types';

const meta: Meta<typeof ResourceDetailHeader> = {
  title: 'Patterns/ResourceDetailHeader',
  component: ResourceDetailHeader,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## ResourceDetailHeader

A generic header component for resource detail pages.

### Features
- Title and subtitle
- Breadcrumb navigation
- Badges/tags display
- Primary image
- Action buttons
- Favorite and share actions
- Responsive design

### Usage

\`\`\`tsx
<ResourceDetailHeader
  title="Conference Room Alpha"
  subtitle="Building 1, Floor 2"
  badges={[
    { id: '1', text: 'Available', variant: 'success' },
    { id: '2', text: 'Premium', variant: 'accent' },
  ]}
  breadcrumbs={[
    { label: 'Home', href: '/' },
    { label: 'Resources', href: '/resources' },
    { label: 'Conference Room Alpha' },
  ]}
  primaryImage={{ url: '/room.jpg', alt: 'Conference Room' }}
  actions={[
    { id: 'book', label: 'Book Now', variant: 'primary', onClick: handleBook },
  ]}
  isFavorited={false}
  onFavoriteToggle={handleFavorite}
  onShare={handleShare}
/>
\`\`\`

### Accessibility
- Semantic header element
- Breadcrumb navigation with ARIA
- Favorite toggle with aria-pressed
- Proper button labels
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', maxWidth: '900px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ResourceDetailHeader>;

// =============================================================================
// Sample Data
// =============================================================================

const sampleBreadcrumbs: PatternBreadcrumbItem[] = [
  { label: 'Home', href: '/' },
  { label: 'Resources', href: '/resources' },
  { label: 'Meeting Rooms', href: '/resources/meeting-rooms' },
  { label: 'Conference Room Alpha' },
];

const sampleBadges: ResourceBadge[] = [
  { id: '1', text: 'Available', variant: 'success' },
  { id: '2', text: 'Premium', variant: 'accent' },
];

const sampleActions: ActionButton[] = [
  { id: 'book', label: 'Book Now', variant: 'primary', onClick: () => console.log('Book clicked') },
  {
    id: 'contact',
    label: 'Contact',
    variant: 'secondary',
    onClick: () => console.log('Contact clicked'),
  },
];

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    title: 'Conference Room Alpha',
    subtitle: 'Building 1, Floor 2 • Capacity: 25 people',
    badges: sampleBadges,
    breadcrumbs: sampleBreadcrumbs,
    actions: sampleActions,
    onFavoriteToggle: () => console.log('Favorite toggled'),
    onShare: () => console.log('Share clicked'),
    onBreadcrumbClick: (item) => console.log('Breadcrumb clicked:', item.label),
  },
};

export const WithImage: Story = {
  name: 'With Primary Image',
  args: {
    title: 'Conference Room Alpha',
    subtitle: 'Building 1, Floor 2 • Capacity: 25 people',
    badges: sampleBadges,
    breadcrumbs: sampleBreadcrumbs,
    primaryImage: {
      url: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=400&h=300&fit=crop',
      alt: 'Conference Room',
    },
    actions: sampleActions,
    onFavoriteToggle: () => console.log('Favorite toggled'),
    onShare: () => console.log('Share clicked'),
  },
};

export const Favorited: Story = {
  name: 'Favorited State',
  args: {
    title: 'Conference Room Alpha',
    subtitle: 'Building 1, Floor 2 • Capacity: 25 people',
    badges: sampleBadges,
    isFavorited: true,
    onFavoriteToggle: () => console.log('Favorite toggled'),
    onShare: () => console.log('Share clicked'),
  },
};

export const MinimalHeader: Story = {
  name: 'Minimal (Title Only)',
  args: {
    title: 'Resource Name',
  },
};

export const WithSubtitle: Story = {
  name: 'Title and Subtitle',
  args: {
    title: 'Workshop Space',
    subtitle: 'A flexible space for creative work and collaboration',
  },
};

export const WithBreadcrumbs: Story = {
  name: 'With Breadcrumbs',
  args: {
    title: 'Conference Room Alpha',
    subtitle: 'Building 1, Floor 2',
    breadcrumbs: sampleBreadcrumbs,
    onBreadcrumbClick: (item) => console.log('Navigate to:', item.href),
  },
};

export const WithBadges: Story = {
  name: 'With Badges',
  args: {
    title: 'Event Hall',
    subtitle: 'Main Building, Ground Floor',
    badges: [
      { id: '1', text: 'Popular', variant: 'accent' },
      { id: '2', text: 'Verified', variant: 'success' },
      { id: '3', text: 'New', variant: 'info' },
    ],
  },
};

export const StatusBadges: Story = {
  name: 'Status Badges',
  args: {
    title: 'Hot Desk Area',
    subtitle: 'Open workspace',
    badges: [
      { id: '1', text: 'Fully Booked', variant: 'danger' },
      { id: '2', text: 'High Demand', variant: 'warning' },
    ],
  },
};

export const WithActions: Story = {
  name: 'With Action Buttons',
  args: {
    title: 'Meeting Room B',
    subtitle: 'Small meeting room for 6 people',
    actions: [
      { id: 'book', label: 'Book Now', variant: 'primary', onClick: () => {} },
      { id: 'schedule', label: 'View Schedule', variant: 'secondary', onClick: () => {} },
    ],
  },
};

export const LoadingAction: Story = {
  name: 'Action Loading State',
  args: {
    title: 'Podcast Studio',
    subtitle: 'Professional recording studio',
    actions: [
      { id: 'book', label: 'Processing...', variant: 'primary', loading: true, onClick: () => {} },
      { id: 'cancel', label: 'Cancel', variant: 'secondary', onClick: () => {} },
    ],
  },
};

export const DisabledAction: Story = {
  name: 'Disabled Action',
  args: {
    title: 'Event Hall',
    subtitle: 'Under maintenance until January 20',
    badges: [{ id: '1', text: 'Maintenance', variant: 'warning' }],
    actions: [
      { id: 'book', label: 'Book Now', variant: 'primary', disabled: true, onClick: () => {} },
      { id: 'notify', label: 'Notify When Available', variant: 'secondary', onClick: () => {} },
    ],
  },
};

export const NoQuickActions: Story = {
  name: 'Without Favorite/Share',
  args: {
    title: 'Private Office',
    subtitle: 'Building 2, Floor 4',
    badges: [{ id: '1', text: 'Reserved', variant: 'neutral' }],
    actions: [{ id: 'details', label: 'View Details', variant: 'secondary', onClick: () => {} }],
  },
};

export const NorwegianLabels: Story = {
  name: 'Norwegian Labels (i18n)',
  args: {
    title: 'Konferanserom A',
    subtitle: 'Bygg 1, Etasje 2 • Kapasitet: 25 personer',
    badges: [
      { id: '1', text: 'Ledig', variant: 'success' },
      { id: '2', text: 'Premium', variant: 'accent' },
    ],
    breadcrumbs: [
      { label: 'Hjem', href: '/' },
      { label: 'Ressurser', href: '/ressurser' },
      { label: 'Konferanserom A' },
    ],
    labels: {
      share: 'Del',
      favorite: 'Legg til favoritter',
      unfavorite: 'Fjern fra favoritter',
    },
    actions: [
      { id: 'book', label: 'Book nå', variant: 'primary', onClick: () => {} },
      { id: 'contact', label: 'Kontakt', variant: 'secondary', onClick: () => {} },
    ],
    onFavoriteToggle: () => console.log('Favorite toggled'),
    onShare: () => console.log('Share clicked'),
  },
};

export const VenueDetail: Story = {
  name: 'Domain Example: Venue',
  args: {
    title: 'Storsal Sentrum',
    subtitle: 'Premier event venue in the heart of the city',
    badges: [
      { id: '1', text: 'Event Hall', variant: 'neutral' },
      { id: '2', text: 'Verified', variant: 'success' },
      { id: '3', text: 'Top Rated', variant: 'accent' },
    ],
    breadcrumbs: [
      { label: 'Venues', href: '/venues' },
      { label: 'Event Halls', href: '/venues/event-halls' },
      { label: 'Storsal Sentrum' },
    ],
    primaryImage: {
      url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=400&h=300&fit=crop',
      alt: 'Storsal Sentrum venue',
    },
    actions: [
      { id: 'inquiry', label: 'Request Quote', variant: 'primary', onClick: () => {} },
      { id: 'tour', label: 'Schedule Tour', variant: 'secondary', onClick: () => {} },
    ],
    isFavorited: false,
    onFavoriteToggle: () => console.log('Favorite toggled'),
    onShare: () => console.log('Share clicked'),
    onBreadcrumbClick: (item) => console.log('Navigate to:', item.href),
  },
};

export const ProductDetail: Story = {
  name: 'Domain Example: Product',
  args: {
    title: 'Premium Ergonomic Chair',
    subtitle: 'SKU: CHR-ERG-001 • In Stock',
    badges: [
      { id: '1', text: 'Bestseller', variant: 'accent' },
      { id: '2', text: 'Eco-Friendly', variant: 'success' },
    ],
    breadcrumbs: [
      { label: 'Shop', href: '/shop' },
      { label: 'Office Furniture', href: '/shop/office' },
      { label: 'Chairs', href: '/shop/office/chairs' },
      { label: 'Premium Ergonomic Chair' },
    ],
    primaryImage: {
      url: 'https://images.unsplash.com/photo-1592078615290-033ee584e267?w=400&h=300&fit=crop',
      alt: 'Ergonomic office chair',
    },
    actions: [
      { id: 'cart', label: 'Add to Cart', variant: 'primary', onClick: () => {} },
      { id: 'wishlist', label: 'Save for Later', variant: 'secondary', onClick: () => {} },
    ],
    isFavorited: true,
    onFavoriteToggle: () => console.log('Wishlist toggled'),
    onShare: () => console.log('Share product'),
  },
};

export const BookingConfirmation: Story = {
  name: 'Domain Example: Booking Confirmation',
  args: {
    title: 'Booking Confirmed',
    subtitle: 'Reference: BK-2026-12345',
    badges: [
      { id: '1', text: 'Confirmed', variant: 'success' },
      { id: '2', text: 'Paid', variant: 'success' },
    ],
    breadcrumbs: [{ label: 'My Bookings', href: '/bookings' }, { label: 'BK-2026-12345' }],
    actions: [
      { id: 'calendar', label: 'Add to Calendar', variant: 'primary', onClick: () => {} },
      { id: 'modify', label: 'Modify Booking', variant: 'secondary', onClick: () => {} },
      { id: 'cancel', label: 'Cancel', variant: 'secondary', onClick: () => {} },
    ],
    onShare: () => console.log('Share booking'),
  },
};

export const CompleteExample: Story = {
  name: 'Complete Example (All Features)',
  args: {
    title: 'Innovation Lab',
    subtitle: 'High-tech collaboration space with cutting-edge equipment',
    badges: [
      { id: '1', text: 'Available', variant: 'success' },
      { id: '2', text: 'Tech-Enabled', variant: 'accent' },
      { id: '3', text: 'Popular', variant: 'info' },
    ],
    breadcrumbs: [
      { label: 'Home', href: '/' },
      { label: 'Spaces', href: '/spaces' },
      { label: 'Labs', href: '/spaces/labs' },
      { label: 'Innovation Lab' },
    ],
    primaryImage: {
      url: 'https://images.unsplash.com/photo-1497366754035-f200968a6e72?w=400&h=300&fit=crop',
      alt: 'Innovation Lab workspace',
    },
    actions: [
      { id: 'book', label: 'Book Now', variant: 'primary', onClick: () => {} },
      { id: 'tour', label: 'Virtual Tour', variant: 'secondary', onClick: () => {} },
      { id: 'contact', label: 'Contact', variant: 'secondary', onClick: () => {} },
    ],
    isFavorited: false,
    labels: {
      share: 'Share this space',
      favorite: 'Add to favorites',
      unfavorite: 'Remove from favorites',
    },
    onFavoriteToggle: () => console.log('Favorite toggled'),
    onShare: () => console.log('Share clicked'),
    onBreadcrumbClick: (item) => console.log('Navigate to:', item.href),
  },
};
