import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
import { ActivityFeed } from '../../blocks/activity/ActivityFeed';
import type { ActivityItemData } from '../../blocks/activity/ActivityFeed';

const meta: Meta<typeof ActivityFeed> = {
  title: 'Blocks/ActivityFeed',
  component: ActivityFeed,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## ActivityFeed

Display timeline of user activity with different activity types and statuses.

### Features
- Timeline display
- Activity types (resourceRequest, payment, message, review, system)
- Status badges
- Click handlers
- Max items limit
- Empty state

### Usage
\`\`\`tsx
<ActivityFeed
  activities={activities}
  onClick={handleClick}
  maxItems={10}
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onClick: fn(),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Sample activities
const sampleActivities: ActivityItemData[] = [
  {
    id: '1',
    type: 'resourceRequest',
    title: 'Booking created',
    description: 'Meeting Room A - Jan 15, 2024',
    timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
    status: 'completed',
  },
  {
    id: '2',
    type: 'payment',
    title: 'Payment processed',
    description: '500 NOK - Credit card',
    timestamp: new Date(Date.now() - 1000 * 60 * 10).toISOString(),
    status: 'completed',
  },
  {
    id: '3',
    type: 'message',
    title: 'New message received',
    description: 'From support team',
    timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    status: 'pending',
  },
  {
    id: '4',
    type: 'review',
    title: 'Review submitted',
    description: '5 stars - Meeting Room A',
    timestamp: new Date(Date.now() - 1000 * 60 * 60).toISOString(),
    status: 'completed',
  },
  {
    id: '5',
    type: 'system',
    title: 'System update',
    description: 'New features available',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2).toISOString(),
  },
];

// Basic activity feed
export const Default: Story = {
  args: {
    activities: sampleActivities,
  },
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '400px' }}>
        <ActivityFeed {...args} />
      </div>
    );
  },
};

// With click handler
export const WithClickHandler: Story = {
  args: {
    activities: sampleActivities,
    onClick: fn(),
  },
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '400px' }}>
        <ActivityFeed {...args} />
      </div>
    );
  },
};

// Limited items
export const LimitedItems: Story = {
  args: {
    activities: sampleActivities,
    maxItems: 3,
  },
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '400px' }}>
        <ActivityFeed {...args} />
      </div>
    );
  },
};

// Many activities
export const ManyActivities: Story = {
  args: {
    activities: Array.from({ length: 15 }, (_, i) => ({
      id: `activity-${i}`,
      type: ['resourceRequest', 'payment', 'message', 'review', 'system'][i % 5] as
        | 'resourceRequest'
        | 'payment'
        | 'message'
        | 'review'
        | 'system',
      title: `Activity ${i + 1}`,
      description: `Description for activity ${i + 1}`,
      timestamp: new Date(Date.now() - 1000 * 60 * i).toISOString(),
      status: i % 3 === 0 ? 'completed' : i % 3 === 1 ? 'pending' : 'cancelled',
    })),
    maxItems: 10,
  },
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '400px' }}>
        <ActivityFeed {...args} />
      </div>
    );
  },
};

// Empty state
export const Empty: Story = {
  args: {
    activities: [],
  },
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '400px' }}>
        <ActivityFeed {...args} emptyMessage={t('storybook.demo.sampleText')} />
      </div>
    );
  },
};

// All types
export const AllTypes: Story = {
  args: {
    activities: [
      {
        id: '1',
        type: 'resourceRequest',
        title: 'Booking activity',
        description: 'Resource booking',
        timestamp: new Date().toISOString(),
        status: 'completed',
      },
      {
        id: '2',
        type: 'payment',
        title: 'Payment activity',
        description: 'Payment processed',
        timestamp: new Date().toISOString(),
        status: 'completed',
      },
      {
        id: '3',
        type: 'message',
        title: 'Message activity',
        description: 'New message',
        timestamp: new Date().toISOString(),
        status: 'pending',
      },
      {
        id: '4',
        type: 'review',
        title: 'Review activity',
        description: 'Review submitted',
        timestamp: new Date().toISOString(),
        status: 'completed',
      },
      {
        id: '5',
        type: 'system',
        title: 'System activity',
        description: 'System update',
        timestamp: new Date().toISOString(),
      },
    ],
  },
  render: function Render(args) {
    const t = useT();
    return (
      <div style={{ width: '400px' }}>
        <ActivityFeed {...args} />
      </div>
    );
  },
};
