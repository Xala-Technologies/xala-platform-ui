import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import React from 'react';
import { HelpPanel } from '../../blocks/help/HelpPanel';
import type { TooltipContent, GuideContent, FAQItem } from '../../blocks/help/HelpPanel';

const meta: Meta<typeof HelpPanel> = {
  title: 'Blocks/HelpPanel',
  component: HelpPanel,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## HelpPanel

Three-tiered help system providing contextual assistance:
- Level 1: Quick tooltips (inline help)
- Level 2: Step-by-step guides
- Level 3: Comprehensive FAQ

### Features
- Three help levels
- Tooltip, guide, and FAQ content
- Customizable categories
- Closeable panels

### Usage
\`\`\`tsx
<HelpPanel
  level={2}
  title="How to Create a Booking"
  content={guideContent}
  category="resourceRequests"
/>
\`\`\`
        `,
      },
    },
  },
  args: {
    onClose: fn(),
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Level 1: Tooltip
const tooltipContent: TooltipContent = {
  content: 'This field is required for completing your booking.',
  learnMoreUrl: 'https://example.com/help',
};

export const Level1Tooltip: Story = {
  args: {
    level: 1,
    title: 'Help',
    content: tooltipContent,
    category: 'resourceRequests',
    closeable: true,
  },
  render: (args) => (
    <div style={{ width: '400px', padding: 'var(--ds-spacing-4)' }}>
      <HelpPanel {...args} />
    </div>
  ),
};

// Level 2: Guide
const guideContent: GuideContent = {
  title: 'How to Create a Booking',
  description: 'Follow these steps to create a new booking.',
  estimatedTime: '5 minutes',
  steps: [
    {
      title: 'Select a Resource',
      content: 'Choose the resource you want to book from the available options.',
      screenshot: '/screenshots/step1.png',
    },
    {
      title: 'Choose Date and Time',
      content: 'Pick your preferred date and time slot from the calendar.',
      screenshot: '/screenshots/step2.png',
    },
    {
      title: 'Review and Confirm',
      content: 'Review your booking details and click confirm to complete.',
      screenshot: '/screenshots/step3.png',
    },
  ],
};

export const Level2Guide: Story = {
  args: {
    level: 2,
    title: 'How to Create a Booking',
    content: guideContent,
    category: 'resourceRequests',
    closeable: true,
  },
  render: (args) => (
    <div style={{ width: '600px', padding: 'var(--ds-spacing-4)' }}>
      <HelpPanel {...args} />
    </div>
  ),
};

// Level 3: FAQ
const faqContent: FAQItem[] = [
  {
    question: 'How do I cancel a booking?',
    answer:
      'You can cancel a booking by going to your bookings page and clicking the cancel button.',
    category: 'resourceRequests',
    tags: ['booking', 'cancellation'],
  },
  {
    question: 'Can I modify a booking?',
    answer: 'Yes, you can modify bookings up to 24 hours before the scheduled time.',
    category: 'resourceRequests',
    tags: ['booking', 'modification'],
  },
  {
    question: 'What payment methods are accepted?',
    answer: 'We accept credit cards, debit cards, and bank transfers.',
    category: 'general',
    tags: ['payment'],
  },
];

export const Level3FAQ: Story = {
  args: {
    level: 3,
    title: 'Frequently Asked Questions',
    content: faqContent,
    category: 'resourceRequests',
    closeable: true,
  },
  render: (args) => (
    <div style={{ width: '600px', padding: 'var(--ds-spacing-4)' }}>
      <HelpPanel {...args} />
    </div>
  ),
};

// Not closeable
export const NotCloseable: Story = {
  args: {
    level: 1,
    title: 'Help',
    content: tooltipContent,
    category: 'resourceRequests',
    closeable: false,
  },
  render: (args) => (
    <div style={{ width: '400px', padding: 'var(--ds-spacing-4)' }}>
      <HelpPanel {...args} />
    </div>
  ),
};

// Different categories
export const DifferentCategories: Story = {
  args: {
    level: 2,
    title: 'User Management Guide',
    content: {
      title: 'User Management Guide',
      description: 'Learn how to manage users in your organization.',
      steps: [
        {
          title: 'Add a User',
          content: 'Click the "Add User" button and fill in the required information.',
        },
        {
          title: 'Edit User Details',
          content: 'Click on a user to edit their details and permissions.',
        },
      ],
    },
    category: 'users',
    closeable: true,
  },
  render: (args) => (
    <div style={{ width: '600px', padding: 'var(--ds-spacing-4)' }}>
      <HelpPanel {...args} />
    </div>
  ),
};
