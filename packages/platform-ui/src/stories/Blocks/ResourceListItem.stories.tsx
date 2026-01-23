import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { ResourceListItem } from '../../blocks/ResourceListItem';

const meta: Meta<typeof ResourceListItem> = {
  title: 'Blocks/ResourceListItem',
  component: ResourceListItem,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## ResourceListItem

A horizontal list item component for displaying resource information. Used in list view mode. Supports images, location map, amenities, and capacity.

### Features
- Image display
- Location map preview
- Amenities list
- Capacity display
- Price display
- Favorite and share buttons
- Category badges
- Click handlers

### Usage
\`\`\`tsx
<ResourceListItem
  id="1"
  name="Meeting Room 101"
  type="Meeting Room"
  location="Storgata 1, Oslo"
  description="A spacious meeting room"
  image="/room.jpg"
  capacity={25}
  amenities={['WiFi', 'Projector']}
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

// Basic resource list item
export const Default: Story = {
  args: {
    id: '1',
    name: 'Meeting Room 101',
    type: 'Meeting Room',
    category: 'SPACE',
    location: 'Storgata 1, 0155 Oslo',
    description: 'A spacious meeting room perfect for team meetings and presentations.',
    image: 'https://picsum.photos/800/600?random=1',
    amenities: ['WiFi', 'Projector', 'Whiteboard', 'Video Conference'],
    capacity: 25,
    price: 500,
    priceUnit: 'time',
    currency: 'NOK',
    isFavorited: false,
    showCapacity: true,
    showAmenities: true,
    showDescription: true,
    showLocation: true,
    showTypeBadge: true,
    showMap: true,
    showFavoriteButton: true,
    showShareButton: true,
    showCategory: true,
    showPrice: true,
    latitude: 59.7439,
    longitude: 10.2045,
  },
};

// Favorited
export const Favorited: Story = {
  args: {
    id: '1',
    name: 'Conference Hall A',
    type: 'Conference Hall',
    category: 'SPACE',
    location: 'Storgata 1, 0155 Oslo',
    description: 'Large conference hall suitable for events and presentations.',
    image: 'https://picsum.photos/800/600?random=2',
    amenities: ['WiFi', 'Projector', 'Sound System', 'Stage'],
    capacity: 100,
    price: 2000,
    priceUnit: 'time',
    currency: 'NOK',
    isFavorited: true,
    showCapacity: true,
    showAmenities: true,
    showDescription: true,
    showLocation: true,
    showTypeBadge: true,
    showMap: true,
    showFavoriteButton: true,
    showShareButton: true,
    showCategory: true,
    showPrice: true,
    latitude: 59.7439,
    longitude: 10.2045,
  },
};

// Without map
export const WithoutMap: Story = {
  args: {
    id: '1',
    name: 'Workspace Desk',
    type: 'Workspace',
    category: 'RESOURCE',
    location: 'Storgata 1, 0155 Oslo',
    description: 'Individual workspace desk with monitor and keyboard.',
    image: 'https://picsum.photos/800/600?random=3',
    amenities: ['WiFi', 'Monitor', 'Keyboard'],
    capacity: 1,
    price: 200,
    priceUnit: 'time',
    currency: 'NOK',
    isFavorited: false,
    showCapacity: true,
    showAmenities: true,
    showDescription: true,
    showLocation: true,
    showTypeBadge: true,
    showMap: false,
    showFavoriteButton: true,
    showShareButton: true,
    showCategory: true,
    showPrice: true,
  },
};

// Without amenities
export const WithoutAmenities: Story = {
  args: {
    id: '1',
    name: 'Simple Room',
    type: 'Room',
    category: 'SPACE',
    location: 'Storgata 1, 0155 Oslo',
    description: 'A simple room without amenities.',
    image: 'https://picsum.photos/800/600?random=4',
    amenities: [],
    capacity: 10,
    isFavorited: false,
    showCapacity: true,
    showAmenities: false,
    showDescription: true,
    showLocation: true,
    showTypeBadge: true,
    showMap: true,
    showFavoriteButton: true,
    showShareButton: true,
    showCategory: true,
    showPrice: false,
    latitude: 59.7439,
    longitude: 10.2045,
  },
};

// Without price
export const WithoutPrice: Story = {
  args: {
    id: '1',
    name: 'Free Resource',
    type: 'Resource',
    category: 'RESOURCE',
    location: 'Storgata 1, 0155 Oslo',
    description: 'A free resource available for use.',
    image: 'https://picsum.photos/800/600?random=5',
    amenities: ['WiFi'],
    capacity: 5,
    isFavorited: false,
    showCapacity: true,
    showAmenities: true,
    showDescription: true,
    showLocation: true,
    showTypeBadge: true,
    showMap: true,
    showFavoriteButton: true,
    showShareButton: true,
    showCategory: true,
    showPrice: false,
    latitude: 59.7439,
    longitude: 10.2045,
  },
};

// Many amenities
export const ManyAmenities: Story = {
  args: {
    id: '1',
    name: 'Fully Equipped Room',
    type: 'Meeting Room',
    category: 'SPACE',
    location: 'Storgata 1, 0155 Oslo',
    description: 'A fully equipped meeting room with all amenities.',
    image: 'https://picsum.photos/800/600?random=6',
    amenities: [
      'WiFi',
      'Projector',
      'Whiteboard',
      'Video Conference',
      'Sound System',
      'Coffee Machine',
      'Printer',
      'Scanner',
    ],
    moreAmenities: 2,
    capacity: 30,
    price: 800,
    priceUnit: 'time',
    currency: 'NOK',
    isFavorited: false,
    showCapacity: true,
    showAmenities: true,
    showDescription: true,
    showLocation: true,
    showTypeBadge: true,
    showMap: true,
    showFavoriteButton: true,
    showShareButton: true,
    showCategory: true,
    showPrice: true,
    maxAmenities: 4,
    latitude: 59.7439,
    longitude: 10.2045,
  },
};

// Different category
export const EventCategory: Story = {
  args: {
    id: '1',
    name: 'Workshop Event',
    type: 'Workshop',
    category: 'EVENT',
    location: 'Storgata 1, 0155 Oslo',
    description: 'A workshop event for team building.',
    image: 'https://picsum.photos/800/600?random=7',
    amenities: ['WiFi', 'Materials'],
    capacity: 20,
    price: 1500,
    priceUnit: 'time',
    currency: 'NOK',
    isFavorited: false,
    showCapacity: true,
    showAmenities: true,
    showDescription: true,
    showLocation: true,
    showTypeBadge: true,
    showMap: true,
    showFavoriteButton: true,
    showShareButton: true,
    showCategory: true,
    showPrice: true,
    latitude: 59.7439,
    longitude: 10.2045,
  },
};

// Minimal (no optional elements)
export const Minimal: Story = {
  args: {
    id: '1',
    name: 'Basic Resource',
    type: 'Resource',
    category: 'RESOURCE',
    location: 'Storgata 1, 0155 Oslo',
    description: 'A basic resource.',
    image: 'https://picsum.photos/800/600?random=8',
    amenities: [],
    isFavorited: false,
    showCapacity: false,
    showAmenities: false,
    showDescription: false,
    showLocation: false,
    showTypeBadge: false,
    showMap: false,
    showFavoriteButton: false,
    showShareButton: false,
    showCategory: false,
    showPrice: false,
  },
};
