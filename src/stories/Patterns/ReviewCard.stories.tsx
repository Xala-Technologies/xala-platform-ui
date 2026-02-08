/**
 * ReviewCard Stories
 *
 * Card component for displaying user reviews and feedback.
 */
import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { ReviewCard, type ReviewCardProps, type ReviewAuthor } from '../../patterns/ReviewCard';

const meta: Meta<typeof ReviewCard> = {
  title: 'Patterns/ReviewCard',
  component: ReviewCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ReviewCard

A domain-neutral card component for displaying user reviews and feedback.

### Features
- Star rating display
- Author info with avatar
- Verified badge support
- "Helpful" action with count
- Compact variant
- Status badges (moderation)
- Custom badges

### Usage

\`\`\`tsx
<ReviewCard
  author={{ name: 'John Doe', avatar: '/avatars/john.jpg', verified: true }}
  rating={4}
  maxRating={5}
  content="Great experience! The service was excellent."
  date="2 days ago"
  helpfulCount={12}
  onMarkHelpful={() => handleHelpful(reviewId)}
/>
\`\`\`

### Accessibility
- Star rating with aria-label
- Proper button roles
- Screen reader announcements for helpful counts
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '500px' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ReviewCard>;

// =============================================================================
// Sample Data
// =============================================================================

const sampleAuthor: ReviewAuthor = {
  name: 'Anna Johansen',
  avatar: 'https://i.pravatar.cc/150?img=1',
  verified: true,
};

const sampleAuthorNoAvatar: ReviewAuthor = {
  name: 'Erik Larsen',
  verified: false,
};

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    id: '1',
    author: sampleAuthor,
    rating: 4,
    maxRating: 5,
    content:
      'Great experience! The meeting room was clean, well-equipped, and the booking process was seamless. Would definitely recommend.',
    date: '2 days ago',
    helpfulCount: 12,
    onMarkHelpful: () => console.log('Marked helpful'),
  },
};

export const WithTitle: Story = {
  name: 'With Review Title',
  args: {
    id: '2',
    author: sampleAuthor,
    rating: 5,
    title: 'Exceptional Quality and Service',
    content:
      'This was my third time using this facility and it continues to exceed expectations. The staff is incredibly helpful and the amenities are top-notch.',
    date: 'Jan 15, 2026',
    helpfulCount: 24,
    onMarkHelpful: () => console.log('Marked helpful'),
  },
};

export const NoAvatar: Story = {
  name: 'Without Avatar (Initials)',
  args: {
    id: '3',
    author: sampleAuthorNoAvatar,
    rating: 3,
    content:
      'Decent experience overall. The location was convenient but the equipment could use some updates.',
    date: '1 week ago',
    helpfulCount: 5,
    onMarkHelpful: () => console.log('Marked helpful'),
  },
};

export const CompactVariant: Story = {
  name: 'Compact Variant',
  args: {
    id: '4',
    author: sampleAuthor,
    rating: 4,
    content: 'Quick and easy booking process. Good value for money.',
    date: '3 days ago',
    variant: 'compact',
  },
};

export const VerifiedAuthor: Story = {
  name: 'Verified Author',
  args: {
    id: '5',
    author: { ...sampleAuthor, verified: true },
    rating: 5,
    content: 'Outstanding experience from start to finish!',
    date: 'Yesterday',
    helpfulCount: 8,
    onMarkHelpful: () => console.log('Marked helpful'),
  },
};

export const UnverifiedAuthor: Story = {
  name: 'Unverified Author',
  args: {
    id: '6',
    author: { ...sampleAuthor, verified: false },
    rating: 4,
    content: 'Very nice space, will come back.',
    date: '5 days ago',
  },
};

export const HighRating: Story = {
  name: 'High Rating (5 Stars)',
  args: {
    id: '7',
    author: sampleAuthor,
    rating: 5,
    maxRating: 5,
    title: 'Perfect!',
    content: 'Could not have asked for a better experience. Everything was perfect.',
    date: 'Jan 10, 2026',
    helpfulCount: 42,
    onMarkHelpful: () => console.log('Marked helpful'),
  },
};

export const LowRating: Story = {
  name: 'Low Rating (1 Star)',
  args: {
    id: '8',
    author: sampleAuthorNoAvatar,
    rating: 1,
    maxRating: 5,
    title: 'Disappointed',
    content: 'The room was not as described. Very disappointed with the experience.',
    date: '2 weeks ago',
    helpfulCount: 3,
    onMarkHelpful: () => console.log('Marked helpful'),
  },
};

export const WithBadges: Story = {
  name: 'With Badges',
  args: {
    id: '9',
    author: sampleAuthor,
    rating: 5,
    content: 'Excellent venue for our corporate event!',
    date: 'Dec 20, 2025',
    badges: [
      { label: 'Top Reviewer', variant: 'accent' },
      { label: 'Premium', variant: 'success' },
    ],
    helpfulCount: 18,
    onMarkHelpful: () => console.log('Marked helpful'),
  },
};

export const WithStatus: Story = {
  name: 'With Moderation Status',
  args: {
    id: '10',
    author: sampleAuthorNoAvatar,
    rating: 2,
    content: 'This review contains some feedback that may need moderation.',
    date: '1 day ago',
    status: 'pending',
    showStatus: true,
    moderatorNotes: 'Review is pending approval due to policy check.',
  },
};

export const ApprovedStatus: Story = {
  name: 'Approved Status',
  args: {
    id: '11',
    author: sampleAuthor,
    rating: 4,
    content: 'Great space for our team meeting.',
    date: '3 days ago',
    status: 'approved',
    showStatus: true,
  },
};

export const FlaggedStatus: Story = {
  name: 'Flagged Status',
  args: {
    id: '12',
    author: sampleAuthorNoAvatar,
    rating: 1,
    content: 'This review has been flagged for review.',
    date: '1 week ago',
    status: 'flagged',
    showStatus: true,
    moderatorNotes: 'Review contains inappropriate language.',
  },
};

export const MarkedHelpful: Story = {
  name: 'Already Marked Helpful',
  args: {
    id: '13',
    author: sampleAuthor,
    rating: 5,
    content: 'Fantastic experience! Highly recommend.',
    date: '4 days ago',
    helpfulCount: 15,
    isHelpful: true,
    onMarkHelpful: () => console.log('Toggle helpful'),
  },
};

export const NoHelpfulSection: Story = {
  name: 'Without Helpful Section',
  args: {
    id: '14',
    author: sampleAuthor,
    rating: 4,
    content: 'Good experience overall.',
    date: '1 week ago',
    showHelpful: false,
  },
};

export const Clickable: Story = {
  name: 'Clickable Card',
  args: {
    id: '15',
    author: sampleAuthor,
    rating: 4,
    content: 'Click this card to see more details.',
    date: '2 days ago',
    onClick: (id) => console.log('Card clicked:', id),
  },
};

export const LongContent: Story = {
  name: 'Long Content',
  args: {
    id: '16',
    author: sampleAuthor,
    rating: 4,
    title: 'Comprehensive Review',
    content: `This is a detailed review of my experience.

The venue was excellent for our corporate retreat. Here are the highlights:

• Spacious meeting room with modern AV equipment
• Comfortable seating for 20+ people
• Great natural lighting
• Helpful on-site staff

The only minor issue was the parking situation, which could be improved. Overall, I would highly recommend this venue for any business event or team meeting.

We will definitely be booking again for our next quarterly meeting.`,
    date: 'Jan 5, 2026',
    helpfulCount: 35,
    onMarkHelpful: () => console.log('Marked helpful'),
  },
};

export const NorwegianLabels: Story = {
  name: 'Norwegian Labels (i18n)',
  args: {
    id: '17',
    author: { name: 'Kari Nordmann', verified: true },
    rating: 5,
    content: 'Fantastisk opplevelse! Lokalet var perfekt for vårt arrangement.',
    date: 'for 2 dager siden',
    helpfulCount: 8,
    onMarkHelpful: () => console.log('Marked helpful'),
    labels: {
      helpful: 'Nyttig',
      helpfulCount: '{count} fant dette nyttig',
      verified: 'Verifisert',
    },
  },
};

export const ProductReview: Story = {
  name: 'Domain Example: Product Review',
  args: {
    id: '18',
    author: { name: 'Sarah M.', avatar: 'https://i.pravatar.cc/150?img=5', verified: true },
    rating: 5,
    title: 'Best office chair I have ever owned',
    content:
      'After 6 months of daily use, this chair is still as comfortable as day one. The lumbar support is excellent and the build quality is top-notch.',
    date: 'Dec 15, 2025',
    badges: [{ label: 'Verified Purchase', variant: 'success' }],
    helpfulCount: 156,
    onMarkHelpful: () => console.log('Marked helpful'),
  },
};

export const VenueReview: Story = {
  name: 'Domain Example: Venue Review',
  args: {
    id: '19',
    author: { name: 'Tech Corp Inc.' },
    rating: 4,
    title: 'Great venue for our annual conference',
    content:
      'We hosted our annual company conference here with 200 attendees. The event spaces were well-maintained, catering was excellent, and the technical support team was very helpful.',
    date: 'Jan 8, 2026',
    badges: [
      { label: 'Corporate Event', variant: 'info' },
      { label: '200+ Attendees', variant: 'neutral' },
    ],
    helpfulCount: 23,
    onMarkHelpful: () => console.log('Marked helpful'),
  },
};

export const MinimalReview: Story = {
  name: 'Minimal (Rating Only)',
  args: {
    id: '20',
    author: { name: 'Quick Reviewer' },
    rating: 5,
    date: 'Just now',
  },
};
