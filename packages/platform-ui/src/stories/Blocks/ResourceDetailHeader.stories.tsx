import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { ResourceDetailHeader } from '../../blocks/ResourceDetailHeader';

const meta: Meta<typeof ResourceDetailHeader> = {
  title: 'Blocks/ResourceDetailHeader',
  component: ResourceDetailHeader,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ResourceDetailHeader

Header section for resource detail page showing category, title, key facts, location, and action buttons (favorite, share).

### Features
- Category badge
- Resource title
- Key facts row
- Location display
- Favorite button
- Share button
- Simple mode (capacity) or advanced mode (keyFacts)

### Usage
\`\`\`tsx
<ResourceDetailHeader
  category="Rom"
  title="Moterom 101"
  location="Storgata 1, 0155 Oslo"
  capacity={25}
  onFavorite={handleFavorite}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onFavorite: fn(),
    onShare: fn(),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic header with capacity
export const Default: Story = {
  args: {
    category: 'Rom',
    resourceType: 'SPACE',
    title: 'Moterom 101',
    location: 'Storgata 1, 0155 Oslo',
    capacity: 25,
    isFavorited: false,
    isAuthenticated: true,
    isFavoriteLoading: false,
  },
};

// Favorited
export const Favorited: Story = {
  args: {
    category: 'Rom',
    resourceType: 'SPACE',
    title: 'Moterom 101',
    location: 'Storgata 1, 0155 Oslo',
    capacity: 25,
    isFavorited: true,
    isAuthenticated: true,
    isFavoriteLoading: false,
  },
};

// With key facts
export const WithKeyFacts: Story = {
  render: () => {
    const t = useT();
    return (
      <ResourceDetailHeader
        category="Rom"
        resourceType="SPACE"
        title="Moterom 101"
        location="Storgata 1, 0155 Oslo"
        keyFacts={[
          { type: 'capacity', label: t('platform.common.details'), value: '25 personer' },
          { type: 'area', label: t('platform.common.details'), value: '120 m2' },
          { type: 'duration', label: t('platform.common.details'), value: '2 timer' },
        ]}
        isFavorited={false}
        isAuthenticated={true}
        isFavoriteLoading={false}
        onFavorite={fn()}
        onShare={fn()}
      />
    );
  },
};

// With share data
export const WithShare: Story = {
  render: () => {
    const t = useT();
    return (
      <ResourceDetailHeader
        category="Rom"
        resourceType="SPACE"
        title="Moterom 101"
        location="Storgata 1, 0155 Oslo"
        capacity={25}
        isFavorited={false}
        isAuthenticated={true}
        isFavoriteLoading={false}
        shareData={{
          url: 'https://example.com/resource/1',
          title: 'Moterom 101',
          description: t('storybook.demo.cardDescription'),
        }}
        onFavorite={fn()}
        onShare={fn()}
      />
    );
  },
};

// Unauthenticated
export const Unauthenticated: Story = {
  args: {
    category: 'Rom',
    resourceType: 'SPACE',
    title: 'Moterom 101',
    location: 'Storgata 1, 0155 Oslo',
    capacity: 25,
    isFavorited: false,
    isAuthenticated: false,
    onAuthRequired: fn(),
    isFavoriteLoading: false,
  },
};

// Loading favorite
export const LoadingFavorite: Story = {
  args: {
    category: 'Rom',
    resourceType: 'SPACE',
    title: 'Moterom 101',
    location: 'Storgata 1, 0155 Oslo',
    capacity: 25,
    isFavorited: false,
    isAuthenticated: true,
    isFavoriteLoading: true,
  },
};

// Different resource type
export const ResourceType: Story = {
  render: () => {
    const t = useT();
    return (
      <ResourceDetailHeader
        category="Ressurs"
        resourceType="RESOURCE"
        title="Projector Equipment"
        location="Storgata 1, 0155 Oslo"
        keyFacts={[
          { type: 'quantity', label: t('platform.common.details'), value: '5 enheter' },
          { type: 'duration', label: t('platform.common.details'), value: '7 dager' },
        ]}
        isFavorited={false}
        isAuthenticated={true}
        isFavoriteLoading={false}
        onFavorite={fn()}
        onShare={fn()}
      />
    );
  },
};

// Event type
export const EventType: Story = {
  render: () => {
    const t = useT();
    return (
      <ResourceDetailHeader
        category="Arrangement"
        resourceType="EVENT"
        title="Workshop Event"
        location="Storgata 1, 0155 Oslo"
        keyFacts={[
          { type: 'capacity', label: t('platform.common.details'), value: '50 personer' },
          { type: 'resourceRequestMode', label: t('platform.common.details'), value: 'Booking' },
        ]}
        isFavorited={true}
        isAuthenticated={true}
        isFavoriteLoading={false}
        onFavorite={fn()}
        onShare={fn()}
      />
    );
  },
};

// Complete example
export const Complete: Story = {
  render: () => {
    const t = useT();
    return (
      <ResourceDetailHeader
        category="Rom"
        resourceType="SPACE"
        title="Moterom 101"
        location="Storgata 1, 0155 Oslo"
        keyFacts={[
          { type: 'capacity', label: t('platform.common.details'), value: '25 personer' },
          { type: 'area', label: t('platform.common.details'), value: '120 m2' },
          { type: 'duration', label: t('platform.common.details'), value: '2 timer' },
          { type: 'accessibility', label: t('platform.common.details'), value: 'Rullestol' },
        ]}
        isFavorited={true}
        isAuthenticated={true}
        isFavoriteLoading={false}
        shareData={{
          url: 'https://example.com/resource/1',
          title: 'Moterom 101',
          description: t('storybook.demo.cardDescription'),
        }}
        shareUtmParams={{
          source: 'storybook',
          medium: 'web',
          campaign: 'test',
        }}
        onFavorite={fn()}
        onShare={fn()}
      />
    );
  },
};
