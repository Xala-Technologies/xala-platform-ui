/**
 * ActivityTimeline Stories
 *
 * Activity timeline component for displaying events and history.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import {
  ActivityTimeline,
  type ActivityTimelineProps,
  type ActivityTimelineItem,
} from '../../patterns/ActivityTimeline';
import { Paragraph } from '@digdir/designsystemet-react';

const meta: Meta<typeof ActivityTimeline> = {
  title: 'Patterns/ActivityTimeline',
  component: ActivityTimeline,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ActivityTimeline

A domain-neutral activity timeline component.

### Features
- Card and timeline variants
- Status indicators with color coding
- Date/time formatting
- Metadata display
- Tags support
- Empty state handling
- Click handlers for items

### Usage

\`\`\`tsx
<ActivityTimeline
  items={[
    {
      id: '1',
      title: 'Meeting booked',
      description: 'Room A - 2 hours',
      timestamp: '2024-01-15T10:00:00Z',
      status: 'completed',
    },
  ]}
  formatDate={(date) => new Date(date).toLocaleDateString()}
/>
\`\`\`

### Accessibility
- Semantic heading structure
- Status colors have text labels
- Clickable items are keyboard accessible
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ width: '500px', padding: '2rem' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof ActivityTimeline>;

// =============================================================================
// Sample Icons
// =============================================================================

const CalendarIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const UserIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
    <circle cx="12" cy="7" r="4" />
  </svg>
);

const EditIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const CheckIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);

// =============================================================================
// Sample Data
// =============================================================================

const eventItems: ActivityTimelineItem[] = [
  {
    id: '1',
    title: 'Team Planning Meeting',
    description: 'Q1 roadmap discussion with the product team',
    timestamp: '2024-01-20T09:00:00Z',
    endTimestamp: '2024-01-20T11:00:00Z',
    timeRange: '09:00-11:00',
    status: 'upcoming',
    statusLabel: 'Upcoming',
    icon: <CalendarIcon />,
    actor: 'John Smith',
  },
  {
    id: '2',
    title: 'Client Presentation',
    description: 'Product demo for Acme Corp',
    timestamp: '2024-01-18T14:00:00Z',
    timeRange: '14:00-15:30',
    status: 'completed',
    statusLabel: 'Completed',
    icon: <CalendarIcon />,
    metadata: [
      { label: 'Room', value: 'Conference Hall A' },
      { label: 'Attendees', value: '12' },
    ],
  },
  {
    id: '3',
    title: 'Training Session',
    description: 'New employee onboarding',
    timestamp: '2024-01-15T10:00:00Z',
    timeRange: '10:00-12:00',
    status: 'past',
    statusLabel: 'Past',
    icon: <CalendarIcon />,
  },
];

const historyItems: ActivityTimelineItem[] = [
  {
    id: '1',
    title: 'Booking confirmed',
    description: 'Meeting Room A - Jan 20, 2024',
    timestamp: '2024-01-15T10:30:00Z',
    status: 'completed',
    icon: <CheckIcon />,
  },
  {
    id: '2',
    title: 'Profile updated',
    description: 'Changed notification preferences',
    timestamp: '2024-01-14T16:45:00Z',
    status: 'completed',
    icon: <EditIcon />,
  },
  {
    id: '3',
    title: 'Account created',
    description: 'Welcome to the platform!',
    timestamp: '2024-01-10T09:00:00Z',
    status: 'completed',
    icon: <UserIcon />,
  },
];

const rentalHistory: ActivityTimelineItem[] = [
  {
    id: '1',
    title: 'Meeting Room A',
    timestamp: '2024-01-15',
    timeRange: '2 hours',
    status: 'completed',
    metadata: [{ label: 'Purpose', value: 'Team meeting' }],
  },
  {
    id: '2',
    title: 'Conference Hall',
    timestamp: '2024-01-10',
    timeRange: '4 hours',
    status: 'completed',
    metadata: [{ label: 'Purpose', value: 'Workshop' }],
  },
  {
    id: '3',
    title: 'Meeting Room B',
    timestamp: '2024-01-05',
    timeRange: '1 hour',
    status: 'cancelled',
    statusLabel: 'Cancelled',
  },
];

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    items: eventItems,
    title: 'Upcoming Events',
  },
};

export const TimelineVariant: Story = {
  name: 'Timeline Variant',
  args: {
    items: historyItems,
    title: 'Activity History',
    variant: 'timeline',
  },
};

export const CompactVariant: Story = {
  name: 'Compact Variant',
  args: {
    items: rentalHistory,
    title: 'Rental History',
    variant: 'compact',
  },
};

export const EmptyState: Story = {
  name: 'Empty State',
  args: {
    items: [],
    title: 'Activity',
    labels: {
      emptyTitle: 'No activity yet',
      emptyDescription: 'Your activity will appear here',
    },
  },
};

export const WithTags: Story = {
  name: 'With Tags',
  args: {
    items: [
      {
        id: '1',
        title: 'Conference Room Booking',
        description: 'Annual company meeting',
        timestamp: '2024-01-20T09:00:00Z',
        status: 'upcoming',
        tags: [
          { label: 'High Priority', color: 'danger' },
          { label: 'All Hands', color: 'info' },
        ],
      },
      {
        id: '2',
        title: 'Team Standup',
        description: 'Daily sync',
        timestamp: '2024-01-19T10:00:00Z',
        status: 'completed',
        tags: [{ label: 'Recurring', color: 'neutral' }],
      },
    ],
    title: 'Events',
  },
};

export const WithMetadata: Story = {
  name: 'With Metadata',
  args: {
    items: [
      {
        id: '1',
        title: 'Board Meeting',
        description: 'Quarterly review',
        timestamp: '2024-01-25T14:00:00Z',
        timeRange: '14:00-17:00',
        status: 'upcoming',
        metadata: [
          { label: 'Location', value: 'Board Room' },
          { label: 'Attendees', value: '8' },
          { label: 'Catering', value: 'Yes' },
        ],
        actor: 'CEO Office',
      },
    ],
    title: 'Scheduled Events',
  },
};

export const WithShowingCount: Story = {
  name: 'With "Showing X of Y"',
  args: {
    items: historyItems.slice(0, 2),
    title: 'Recent Activity',
    totalCount: 25,
    labels: {
      showingCount: 'Showing {current} of {total} items',
    },
  },
};

export const CustomStatusColors: Story = {
  name: 'Custom Status Colors',
  args: {
    items: [
      { id: '1', title: 'Pending Review', timestamp: '2024-01-20', status: 'review' },
      { id: '2', title: 'Approved', timestamp: '2024-01-19', status: 'approved' },
      { id: '3', title: 'Rejected', timestamp: '2024-01-18', status: 'rejected' },
      { id: '4', title: 'Draft', timestamp: '2024-01-17', status: 'draft' },
    ],
    title: 'Submissions',
    variant: 'timeline',
    statusColors: {
      review: 'warning',
      approved: 'success',
      rejected: 'danger',
      draft: 'neutral',
    },
  },
};

export const SmallSize: Story = {
  name: 'Small Size',
  args: {
    items: historyItems,
    title: 'Activity',
    size: 'sm',
    variant: 'timeline',
  },
};

export const NorwegianLabels: Story = {
  name: 'Norwegian Labels (i18n)',
  args: {
    items: [
      {
        id: '1',
        title: 'Møterom A bestilt',
        description: 'Teammøte',
        timestamp: '2024-01-20T09:00:00Z',
        status: 'completed',
        statusLabel: 'Fullført',
        actor: 'Ola Nordmann',
      },
      {
        id: '2',
        title: 'Profil oppdatert',
        description: 'Endret varsler',
        timestamp: '2024-01-19T14:30:00Z',
        status: 'completed',
        statusLabel: 'Fullført',
      },
    ],
    title: 'Aktivitet',
    formatDate: (date) =>
      new Date(date).toLocaleDateString('nb-NO', {
        weekday: 'short',
        day: 'numeric',
        month: 'short',
      }),
    labels: {
      title: 'Aktivitet',
      emptyTitle: 'Ingen aktivitet',
      emptyDescription: 'Aktivitet vises her når tilgjengelig',
      actorPrefix: 'Av:',
      showingCount: 'Viser {current} av {total}',
    },
  },
};

export const ClickableItems: Story = {
  name: 'Clickable Items',
  args: {
    items: eventItems,
    title: 'Events',
    onItemClick: (item) => alert(`Clicked: ${item.title}`),
  },
};

export const RentalObjectHistory: Story = {
  name: 'Domain Example: Rental History',
  args: {
    items: rentalHistory,
    title: 'Rental History',
    variant: 'compact',
    formatDate: (date) =>
      new Date(date).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'short',
        year: 'numeric',
      }),
  },
};

export const Interactive: Story = {
  name: 'Interactive Example',
  render: () => {
    const [selectedItem, setSelectedItem] = React.useState<ActivityTimelineItem | null>(null);

    const items: ActivityTimelineItem[] = [
      {
        id: '1',
        title: 'Meeting Room Booked',
        description: 'Conference Room A for team standup',
        timestamp: new Date().toISOString(),
        status: 'completed',
        icon: <CalendarIcon />,
        metadata: [
          { label: 'Duration', value: '1 hour' },
          { label: 'Attendees', value: '5' },
        ],
      },
      {
        id: '2',
        title: 'Document Uploaded',
        description: 'Q4_Report_Final.pdf',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'completed',
        icon: <EditIcon />,
      },
      {
        id: '3',
        title: 'Pending Approval',
        description: 'Budget request for new equipment',
        timestamp: new Date(Date.now() - 7200000).toISOString(),
        status: 'pending',
        statusLabel: 'Awaiting',
        icon: <UserIcon />,
      },
    ];

    return (
      <div>
        <ActivityTimeline
          items={items}
          title="Recent Activity"
          onItemClick={setSelectedItem}
          formatDate={(date) => {
            const d = new Date(date);
            const now = new Date();
            const diffMs = now.getTime() - d.getTime();
            const diffMins = Math.floor(diffMs / 60000);

            if (diffMins < 1) return 'Just now';
            if (diffMins < 60) return `${diffMins}m ago`;
            const diffHours = Math.floor(diffMins / 60);
            if (diffHours < 24) return `${diffHours}h ago`;
            return d.toLocaleDateString();
          }}
        />

        {selectedItem && (
          <div
            style={{
              marginTop: 'var(--ds-spacing-4)',
              padding: 'var(--ds-spacing-4)',
              backgroundColor: 'var(--ds-color-accent-surface-default)',
              borderRadius: 'var(--ds-border-radius-md)',
            }}
          >
            <Paragraph data-size="sm" style={{ margin: 0 }}>
              <strong>Selected:</strong> {selectedItem.title}
            </Paragraph>
            <Paragraph data-size="xs" style={{ margin: 0, marginTop: 'var(--ds-spacing-1)' }}>
              ID: {selectedItem.id}
            </Paragraph>
          </div>
        )}
      </div>
    );
  },
};
