import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { PeriodCard } from '../../blocks/PeriodCard';

const meta: Meta<typeof PeriodCard> = {
  title: 'Blocks/PeriodCard',
  component: PeriodCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## PeriodCard

A domain-neutral card component for time-period-based items such as seasons, campaigns, programs, and events.

### Features
- Status badge with multiple states (upcoming, active, ending_soon, ended, draft, cancelled)
- Period date range display
- Optional deadline warning
- Optional image
- Action button support
- Compact variant for dense layouts

### Usage
\`\`\`tsx
import { PeriodCard } from '@xala-technologies/platform-ui/blocks';

<PeriodCard
  id="season-1"
  title="Spring Season 2026"
  period={{
    startDate: "March 1, 2026",
    endDate: "June 30, 2026",
  }}
  status={{
    type: "upcoming",
    label: "Registration Open",
  }}
  onClick={(id) => navigate(\`/seasons/\${id}\`)}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onClick: fn(),
    onAction: fn(),
  },
  argTypes: {
    status: {
      control: 'object',
      description: 'Status indicator with type and label',
    },
    variant: {
      control: 'select',
      options: ['default', 'compact'],
      description: 'Card layout variant',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default story
export const Default: Story = {
  args: {
    id: 'season-1',
    title: 'Spring Season 2026',
    subtitle: 'Basketball League',
    description: 'Join our spring basketball league with competitive matches every weekend.',
    period: {
      startDate: 'March 1, 2026',
      endDate: 'June 30, 2026',
      label: '4 months',
    },
    status: {
      type: 'upcoming',
      label: 'Registration Open',
    },
    actionLabel: 'Register Now',
  },
};

// Compact variant
export const CompactVariant: Story = {
  args: {
    id: 'season-2',
    title: 'Summer Tournament 2026',
    period: {
      startDate: 'July 1, 2026',
      endDate: 'August 31, 2026',
    },
    status: {
      type: 'active',
      label: 'In Progress',
    },
    variant: 'compact',
    actionLabel: 'View Details',
  },
};

// With image
export const WithImage: Story = {
  args: {
    id: 'season-3',
    title: 'Indoor Soccer League',
    subtitle: 'Recreational',
    description: 'Join our indoor soccer league for fun and competitive games.',
    period: {
      startDate: 'April 1, 2026',
      endDate: 'July 31, 2026',
    },
    status: {
      type: 'upcoming',
      label: 'Registration Open',
    },
    image: {
      src: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400',
      alt: 'Soccer field',
    },
    actionLabel: 'Sign Up',
  },
};

// With deadline
export const WithDeadline: Story = {
  args: {
    id: 'season-4',
    title: 'Tennis Championship',
    subtitle: 'Singles & Doubles',
    description: 'Annual tennis championship open to all skill levels.',
    period: {
      startDate: 'May 15, 2026',
      endDate: 'June 15, 2026',
    },
    status: {
      type: 'upcoming',
      label: 'Registration Open',
    },
    deadline: {
      date: 'April 30, 2026',
      label: 'Registration deadline',
    },
    actionLabel: 'Register',
  },
};

// With action button
export const WithActionButton: Story = {
  args: {
    id: 'season-5',
    title: 'Swimming Program',
    subtitle: 'Beginner to Advanced',
    description: 'Learn to swim or improve your technique with certified instructors.',
    period: {
      startDate: 'June 1, 2026',
      endDate: 'August 15, 2026',
    },
    status: {
      type: 'upcoming',
      label: 'Enrolling Now',
    },
    actionLabel: 'Enroll Now',
    onAction: fn(),
  },
};

// Disabled action
export const DisabledAction: Story = {
  args: {
    id: 'season-6',
    title: 'Sold Out Event',
    subtitle: 'Workshop Series',
    description: 'This program has reached maximum capacity.',
    period: {
      startDate: 'March 10, 2026',
      endDate: 'March 20, 2026',
    },
    status: {
      type: 'active',
      label: 'Full',
    },
    actionLabel: 'Join Waitlist',
    actionDisabled: true,
  },
};

// Full featured
export const FullFeatured: Story = {
  args: {
    id: 'season-7',
    title: 'Youth Basketball Camp',
    subtitle: 'Ages 8-14',
    description:
      'Intensive week-long basketball camp with professional coaches. Includes meals and equipment.',
    period: {
      startDate: 'July 15, 2026',
      endDate: 'July 22, 2026',
      label: '1 week',
    },
    status: {
      type: 'upcoming',
      label: 'Early Bird Pricing',
    },
    deadline: {
      date: 'June 30, 2026',
      label: 'Early bird ends',
    },
    image: {
      src: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400',
      alt: 'Basketball court',
    },
    actionLabel: 'Reserve Spot',
  },
};

// Status: Active
export const StatusActive: Story = {
  args: {
    id: 'active-1',
    title: 'Active Season',
    period: { startDate: 'Jan 1', endDate: 'Mar 31' },
    status: { type: 'active', label: 'In Progress' },
  },
};

// Status: Ending Soon
export const StatusEndingSoon: Story = {
  args: {
    id: 'ending-1',
    title: 'Ending Soon',
    period: { startDate: 'Jan 1', endDate: 'Jan 31' },
    status: { type: 'ending_soon', label: 'Ends in 5 days' },
  },
};

// Status: Ended
export const StatusEnded: Story = {
  args: {
    id: 'ended-1',
    title: 'Past Season',
    period: { startDate: 'Sep 1', endDate: 'Dec 31' },
    status: { type: 'ended', label: 'Completed' },
  },
};

// Status: Draft
export const StatusDraft: Story = {
  args: {
    id: 'draft-1',
    title: 'Draft Season',
    period: { startDate: 'TBD', endDate: 'TBD' },
    status: { type: 'draft', label: 'Draft' },
  },
};

// Status: Cancelled
export const StatusCancelled: Story = {
  args: {
    id: 'cancelled-1',
    title: 'Cancelled Event',
    period: { startDate: 'Feb 15', endDate: 'Feb 20' },
    status: { type: 'cancelled', label: 'Cancelled' },
  },
};
