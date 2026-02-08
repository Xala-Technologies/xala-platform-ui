import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { ResourceListItem } from '@xala-technologies/platform-ui-digilist';

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
  render: function Render() {
    const t = useT();
    return (
      <ResourceListItem
        id="1"
        name="Meeting Room 101"
        type="Meeting Room"
        category="SPACE"
        location="Storgata 1, 0155 Oslo"
        description={t('storybook.demo.cardDescription')}
        image="https://picsum.photos/800/600?random=1"
        amenities={['WiFi', 'Projector', 'Whiteboard', 'Video Conference']}
        capacity={25}
        price={500}
        priceUnit="time"
        currency="NOK"
        isFavorited={false}
        showCapacity={true}
        showAmenities={true}
        showDescription={true}
        showLocation={true}
        showTypeBadge={true}
        showMap={true}
        showFavoriteButton={true}
        showShareButton={true}
        showCategory={true}
        showPrice={true}
        latitude={59.7439}
        longitude={10.2045}
        onClick={fn()}
        onFavorite={fn()}
        onShare={fn()}
      />
    );
  },
};

// Favorited
export const Favorited: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ResourceListItem
        id="1"
        name="Conference Hall A"
        type="Conference Hall"
        category="SPACE"
        location="Storgata 1, 0155 Oslo"
        description={t('storybook.demo.cardDescription')}
        image="https://picsum.photos/800/600?random=2"
        amenities={['WiFi', 'Projector', 'Sound System', 'Stage']}
        capacity={100}
        price={2000}
        priceUnit="time"
        currency="NOK"
        isFavorited={true}
        showCapacity={true}
        showAmenities={true}
        showDescription={true}
        showLocation={true}
        showTypeBadge={true}
        showMap={true}
        showFavoriteButton={true}
        showShareButton={true}
        showCategory={true}
        showPrice={true}
        latitude={59.7439}
        longitude={10.2045}
        onClick={fn()}
        onFavorite={fn()}
        onShare={fn()}
      />
    );
  },
};

// Without map
export const WithoutMap: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ResourceListItem
        id="1"
        name="Workspace Desk"
        type="Workspace"
        category="RESOURCE"
        location="Storgata 1, 0155 Oslo"
        description={t('storybook.demo.cardDescription')}
        image="https://picsum.photos/800/600?random=3"
        amenities={['WiFi', 'Monitor', 'Keyboard']}
        capacity={1}
        price={200}
        priceUnit="time"
        currency="NOK"
        isFavorited={false}
        showCapacity={true}
        showAmenities={true}
        showDescription={true}
        showLocation={true}
        showTypeBadge={true}
        showMap={false}
        showFavoriteButton={true}
        showShareButton={true}
        showCategory={true}
        showPrice={true}
        onClick={fn()}
        onFavorite={fn()}
        onShare={fn()}
      />
    );
  },
};

// Without amenities
export const WithoutAmenities: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ResourceListItem
        id="1"
        name="Simple Room"
        type="Room"
        category="SPACE"
        location="Storgata 1, 0155 Oslo"
        description={t('storybook.demo.cardDescription')}
        image="https://picsum.photos/800/600?random=4"
        amenities={[]}
        capacity={10}
        isFavorited={false}
        showCapacity={true}
        showAmenities={false}
        showDescription={true}
        showLocation={true}
        showTypeBadge={true}
        showMap={true}
        showFavoriteButton={true}
        showShareButton={true}
        showCategory={true}
        showPrice={false}
        latitude={59.7439}
        longitude={10.2045}
        onClick={fn()}
        onFavorite={fn()}
        onShare={fn()}
      />
    );
  },
};

// Without price
export const WithoutPrice: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ResourceListItem
        id="1"
        name="Free Resource"
        type="Resource"
        category="RESOURCE"
        location="Storgata 1, 0155 Oslo"
        description={t('storybook.demo.cardDescription')}
        image="https://picsum.photos/800/600?random=5"
        amenities={['WiFi']}
        capacity={5}
        isFavorited={false}
        showCapacity={true}
        showAmenities={true}
        showDescription={true}
        showLocation={true}
        showTypeBadge={true}
        showMap={true}
        showFavoriteButton={true}
        showShareButton={true}
        showCategory={true}
        showPrice={false}
        latitude={59.7439}
        longitude={10.2045}
        onClick={fn()}
        onFavorite={fn()}
        onShare={fn()}
      />
    );
  },
};

// Many amenities
export const ManyAmenities: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ResourceListItem
        id="1"
        name="Fully Equipped Room"
        type="Meeting Room"
        category="SPACE"
        location="Storgata 1, 0155 Oslo"
        description={t('storybook.demo.cardDescription')}
        image="https://picsum.photos/800/600?random=6"
        amenities={[
          'WiFi',
          'Projector',
          'Whiteboard',
          'Video Conference',
          'Sound System',
          'Coffee Machine',
          'Printer',
          'Scanner',
        ]}
        moreAmenities={2}
        capacity={30}
        price={800}
        priceUnit="time"
        currency="NOK"
        isFavorited={false}
        showCapacity={true}
        showAmenities={true}
        showDescription={true}
        showLocation={true}
        showTypeBadge={true}
        showMap={true}
        showFavoriteButton={true}
        showShareButton={true}
        showCategory={true}
        showPrice={true}
        maxAmenities={4}
        latitude={59.7439}
        longitude={10.2045}
        onClick={fn()}
        onFavorite={fn()}
        onShare={fn()}
      />
    );
  },
};

// Different category
export const EventCategory: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ResourceListItem
        id="1"
        name="Workshop Event"
        type="Workshop"
        category="EVENT"
        location="Storgata 1, 0155 Oslo"
        description={t('storybook.demo.cardDescription')}
        image="https://picsum.photos/800/600?random=7"
        amenities={['WiFi', 'Materials']}
        capacity={20}
        price={1500}
        priceUnit="time"
        currency="NOK"
        isFavorited={false}
        showCapacity={true}
        showAmenities={true}
        showDescription={true}
        showLocation={true}
        showTypeBadge={true}
        showMap={true}
        showFavoriteButton={true}
        showShareButton={true}
        showCategory={true}
        showPrice={true}
        latitude={59.7439}
        longitude={10.2045}
        onClick={fn()}
        onFavorite={fn()}
        onShare={fn()}
      />
    );
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
