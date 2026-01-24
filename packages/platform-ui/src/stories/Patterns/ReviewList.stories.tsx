/**
 * ReviewList Stories
 *
 * List component for displaying reviews with summary statistics.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { useT } from '@xala-technologies/i18n';
import {
  ReviewList,
  type ReviewListProps,
  type ReviewListItem,
  type ReviewSummary,
  type ReviewSortOption,
} from '../../patterns/ReviewList';

const meta: Meta<typeof ReviewList> = {
  title: 'Patterns/ReviewList',
  component: ReviewList,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
## ReviewList

A domain-neutral component for displaying a list of reviews with summary statistics.

### Features
- Rating distribution visualization
- Average rating display
- Sortable review list
- "Show more" pagination
- "Write a review" CTA
- Empty state

### Usage

\`\`\`tsx
<ReviewList
  reviews={reviews}
  summary={{
    average: 4.5,
    total: 128,
    distribution: { 5: 80, 4: 30, 3: 10, 2: 5, 1: 3 },
  }}
  sortOptions={[
    { id: 'newest', label: 'Newest first' },
    { id: 'highest', label: 'Highest rated' },
  ]}
  onSortChange={handleSortChange}
  onMarkHelpful={handleHelpful}
/>
\`\`\`

### Accessibility
- Review cards are properly labeled
- Sort dropdown is accessible
- Empty state provides clear guidance
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '1rem', maxWidth: '700px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ReviewList>;

// =============================================================================
// Sample Data
// =============================================================================

const sampleReviews: ReviewListItem[] = [
  {
    id: '1',
    author: { name: 'Anna Johansen', avatar: 'https://i.pravatar.cc/150?img=1', verified: true },
    rating: 5,
    title: 'Excellent venue!',
    content:
      'Perfect space for our team meeting. Clean, well-equipped, and great natural lighting.',
    date: '2 days ago',
    helpfulCount: 12,
  },
  {
    id: '2',
    author: { name: 'Erik Larsen', verified: false },
    rating: 4,
    content: 'Good experience overall. The room was nice but parking was a bit difficult to find.',
    date: '1 week ago',
    helpfulCount: 5,
  },
  {
    id: '3',
    author: { name: 'Maria Hansen', avatar: 'https://i.pravatar.cc/150?img=5', verified: true },
    rating: 5,
    title: 'Will book again!',
    content: 'Third time booking here and it never disappoints. The staff is incredibly helpful.',
    date: '2 weeks ago',
    helpfulCount: 18,
    isHelpful: true,
  },
  {
    id: '4',
    author: { name: 'Ole Kristiansen' },
    rating: 3,
    content: 'Decent space. The projector quality could be better.',
    date: '3 weeks ago',
    helpfulCount: 2,
  },
  {
    id: '5',
    author: { name: 'Ingrid Nilsen', avatar: 'https://i.pravatar.cc/150?img=9', verified: true },
    rating: 5,
    title: 'Absolutely perfect',
    content: 'Used this space for a workshop and it exceeded all expectations. Highly recommended!',
    date: '1 month ago',
    helpfulCount: 24,
  },
];

const sampleSummary: ReviewSummary = {
  average: 4.4,
  total: 128,
  distribution: {
    5: 72,
    4: 35,
    3: 12,
    2: 6,
    1: 3,
  },
};

const sampleSortOptions: ReviewSortOption[] = [
  { id: 'newest', label: 'Newest first' },
  { id: 'oldest', label: 'Oldest first' },
  { id: 'highest', label: 'Highest rated' },
  { id: 'lowest', label: 'Lowest rated' },
  { id: 'helpful', label: 'Most helpful' },
];

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    reviews: sampleReviews,
    summary: sampleSummary,
    sortOptions: sampleSortOptions,
    sortValue: 'newest',
    onSortChange: (sortId) => console.log('Sort changed:', sortId),
    onMarkHelpful: (reviewId) => console.log('Marked helpful:', reviewId),
    onWriteReview: () => console.log('Write review clicked'),
    hasMore: true,
    onShowMore: () => console.log('Show more clicked'),
  },
};

export const WithoutSummary: Story = {
  name: 'Without Summary',
  args: {
    reviews: sampleReviews.slice(0, 3),
    sortOptions: sampleSortOptions,
    sortValue: 'newest',
    onSortChange: (sortId) => console.log('Sort changed:', sortId),
    onMarkHelpful: (reviewId) => console.log('Marked helpful:', reviewId),
  },
};

export const WithSummaryOnly: Story = {
  name: 'With Summary Only',
  args: {
    reviews: sampleReviews,
    summary: sampleSummary,
    onMarkHelpful: (reviewId) => console.log('Marked helpful:', reviewId),
  },
};

export const CompactCards: Story = {
  name: 'Compact Review Cards',
  args: {
    reviews: sampleReviews,
    summary: sampleSummary,
    cardVariant: 'compact',
    onMarkHelpful: (reviewId) => console.log('Marked helpful:', reviewId),
  },
};

export const WithShowMore: Story = {
  name: 'With Show More Button',
  args: {
    reviews: sampleReviews.slice(0, 3),
    summary: sampleSummary,
    hasMore: true,
    onShowMore: () => console.log('Show more clicked'),
    onMarkHelpful: (reviewId) => console.log('Marked helpful:', reviewId),
  },
};

export const Loading: Story = {
  name: 'Loading More',
  args: {
    reviews: sampleReviews.slice(0, 3),
    summary: sampleSummary,
    hasMore: true,
    loading: true,
    onShowMore: () => console.log('Show more clicked'),
    onMarkHelpful: (reviewId) => console.log('Marked helpful:', reviewId),
  },
};

export const EmptyState: Story = {
  name: 'Empty State',
  args: {
    reviews: [],
    onWriteReview: () => console.log('Write review clicked'),
  },
};

export const HighRatings: Story = {
  name: 'Mostly High Ratings',
  args: {
    reviews: sampleReviews.filter((r) => r.rating >= 4),
    summary: {
      average: 4.8,
      total: 256,
      distribution: {
        5: 180,
        4: 65,
        3: 8,
        2: 2,
        1: 1,
      },
    },
    onMarkHelpful: (reviewId) => console.log('Marked helpful:', reviewId),
  },
};

export const MixedRatings: Story = {
  name: 'Mixed Ratings',
  args: {
    reviews: [
      ...sampleReviews,
      {
        id: '6',
        author: { name: 'Critical Reviewer' },
        rating: 2,
        content: 'Not impressed with the facility.',
        date: '2 months ago',
        helpfulCount: 1,
      },
      {
        id: '7',
        author: { name: 'Unhappy Customer' },
        rating: 1,
        content: 'Very disappointing experience.',
        date: '3 months ago',
        helpfulCount: 0,
      },
    ],
    summary: {
      average: 3.2,
      total: 45,
      distribution: {
        5: 12,
        4: 10,
        3: 8,
        2: 8,
        1: 7,
      },
    },
    onMarkHelpful: (reviewId) => console.log('Marked helpful:', reviewId),
  },
};

export const FewReviews: Story = {
  name: 'Few Reviews',
  args: {
    reviews: sampleReviews.slice(0, 2),
    summary: {
      average: 4.5,
      total: 2,
      distribution: {
        5: 1,
        4: 1,
        3: 0,
        2: 0,
        1: 0,
      },
    },
    onMarkHelpful: (reviewId) => console.log('Marked helpful:', reviewId),
    onWriteReview: () => console.log('Write review clicked'),
  },
};

export const SingleReview: Story = {
  name: 'Single Review',
  args: {
    reviews: [sampleReviews[0]],
    summary: {
      average: 5.0,
      total: 1,
      distribution: {
        5: 1,
        4: 0,
        3: 0,
        2: 0,
        1: 0,
      },
    },
    onMarkHelpful: (reviewId) => console.log('Marked helpful:', reviewId),
    onWriteReview: () => console.log('Write review clicked'),
  },
};

export const NorwegianLabels: Story = {
  name: 'Norwegian Labels (i18n)',
  args: {
    reviews: [
      {
        id: '1',
        author: { name: 'Kari Nordmann', verified: true },
        rating: 5,
        title: 'Fantastisk lokale',
        content: 'Perfekt plass for vårt teammøte. Rent, godt utstyrt og flott naturlig lys.',
        date: 'for 2 dager siden',
        helpfulCount: 12,
      },
      {
        id: '2',
        author: { name: 'Ola Nordmann' },
        rating: 4,
        content: 'God opplevelse. Fint lokale, men parkering var litt vanskelig.',
        date: 'for 1 uke siden',
        helpfulCount: 5,
      },
    ],
    summary: {
      average: 4.5,
      total: 64,
      distribution: {
        5: 36,
        4: 18,
        3: 6,
        2: 3,
        1: 1,
      },
    },
    sortOptions: [
      { id: 'newest', label: 'Nyeste først' },
      { id: 'oldest', label: 'Eldste først' },
      { id: 'highest', label: 'Høyest vurdert' },
      { id: 'helpful', label: 'Mest nyttig' },
    ],
    sortValue: 'newest',
    onSortChange: (sortId) => console.log('Sort changed:', sortId),
    hasMore: true,
    onShowMore: () => console.log('Show more clicked'),
    labels: {
      reviews: 'vurderinger',
      sortBy: 'Sorter etter',
      showMore: 'Vis flere vurderinger',
      noReviews: 'Ingen vurderinger ennå',
      beFirst: 'Bli den første til å dele din opplevelse',
      writeReview: 'Skriv en vurdering',
      helpful: 'Nyttig',
      helpfulCount: '{count} fant dette nyttig',
      verified: 'Verifisert',
    },
  },
};

export const ProductReviews: Story = {
  name: 'Domain Example: Product Reviews',
  args: {
    reviews: [
      {
        id: '1',
        author: { name: 'Sarah M.', avatar: 'https://i.pravatar.cc/150?img=5', verified: true },
        rating: 5,
        title: 'Best office chair ever!',
        content:
          'After 6 months of daily use, this chair is still as comfortable as day one. The lumbar support is excellent.',
        date: 'Dec 15, 2025',
        helpfulCount: 156,
      },
      {
        id: '2',
        author: { name: 'Mike T.' },
        rating: 4,
        title: 'Great chair, minor assembly issues',
        content:
          'Love the chair once assembled. Instructions could be clearer. Took about 45 minutes.',
        date: 'Dec 10, 2025',
        helpfulCount: 42,
      },
      {
        id: '3',
        author: { name: 'Jessica R.', verified: true },
        rating: 5,
        content: 'Worth every penny. My back pain has significantly reduced since switching.',
        date: 'Nov 28, 2025',
        helpfulCount: 89,
      },
    ],
    summary: {
      average: 4.7,
      total: 1243,
      distribution: {
        5: 892,
        4: 251,
        3: 67,
        2: 22,
        1: 11,
      },
    },
    sortOptions: [
      { id: 'helpful', label: 'Most helpful' },
      { id: 'newest', label: 'Most recent' },
      { id: 'highest', label: 'Highest rated' },
      { id: 'lowest', label: 'Lowest rated' },
    ],
    sortValue: 'helpful',
    hasMore: true,
    onShowMore: () => console.log('Show more clicked'),
    onWriteReview: () => console.log('Write review clicked'),
    onMarkHelpful: (reviewId) => console.log('Marked helpful:', reviewId),
  },
};

export const VenueReviews: Story = {
  name: 'Domain Example: Venue Reviews',
  args: {
    reviews: [
      {
        id: '1',
        author: { name: 'Tech Corp Inc.' },
        rating: 5,
        title: 'Perfect for our annual conference',
        content:
          'We hosted 200 attendees. Great facilities, excellent catering, and helpful staff.',
        date: 'Jan 8, 2026',
        helpfulCount: 23,
      },
      {
        id: '2',
        author: { name: 'Creative Agency', verified: true },
        rating: 4,
        content:
          'Beautiful space with lots of natural light. Acoustics could be better for presentations.',
        date: 'Dec 20, 2025',
        helpfulCount: 15,
      },
    ],
    summary: {
      average: 4.3,
      total: 87,
      distribution: {
        5: 45,
        4: 28,
        3: 9,
        2: 3,
        1: 2,
      },
    },
    sortOptions: [
      { id: 'newest', label: 'Most recent' },
      { id: 'helpful', label: 'Most helpful' },
    ],
    hasMore: true,
    onShowMore: () => console.log('Show more clicked'),
    onWriteReview: () => console.log('Write review clicked'),
    onMarkHelpful: (reviewId) => console.log('Marked helpful:', reviewId),
  },
};

export const Interactive: Story = {
  name: 'Interactive Example',
  render: function Render() {
    const [sortValue, setSortValue] = React.useState('newest');
    const [reviews, setReviews] = React.useState(sampleReviews.slice(0, 3));
    const [loading, setLoading] = React.useState(false);

    const handleShowMore = () => {
      setLoading(true);
      setTimeout(() => {
        setReviews([...reviews, ...sampleReviews.slice(3)]);
        setLoading(false);
      }, 1000);
    };

    const handleMarkHelpful = (reviewId: string) => {
      setReviews(
        reviews.map((r) =>
          r.id === reviewId
            ? {
                ...r,
                isHelpful: !r.isHelpful,
                helpfulCount: r.isHelpful ? (r.helpfulCount || 1) - 1 : (r.helpfulCount || 0) + 1,
              }
            : r
        )
      );
    };

    return (
      <ReviewList
        reviews={reviews}
        summary={sampleSummary}
        sortOptions={sampleSortOptions}
        sortValue={sortValue}
        onSortChange={setSortValue}
        onMarkHelpful={handleMarkHelpful}
        hasMore={reviews.length < sampleReviews.length}
        loading={loading}
        onShowMore={handleShowMore}
        onWriteReview={() => alert('Open write review modal')}
      />
    );
  },
};
