import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import { useT } from '@xala-technologies/i18n';
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
  render: function Render() {
    const t = useT();
    return (
      <PeriodCard
        id="season-1"
        title={t('storybook.demo.cardTitle')}
        subtitle="Basketball League"
        description={t('storybook.demo.cardDescription')}
        period={{
          startDate: 'March 1, 2026',
          endDate: 'June 30, 2026',
          label: '4 months',
        }}
        status={{
          type: 'upcoming',
          label: t('platform.status.pending'),
        }}
        actionLabel={t('platform.common.submit')}
        onClick={fn()}
        onAction={fn()}
      />
    );
  },
};

// Compact variant
export const CompactVariant: Story = {
  render: function Render() {
    const t = useT();
    return (
      <PeriodCard
        id="season-2"
        title={t('storybook.demo.cardTitle')}
        period={{
          startDate: 'July 1, 2026',
          endDate: 'August 31, 2026',
        }}
        status={{
          type: 'active',
          label: t('platform.status.active'),
        }}
        variant="compact"
        actionLabel={t('platform.common.view')}
        onClick={fn()}
        onAction={fn()}
      />
    );
  },
};

// With image
export const WithImage: Story = {
  render: function Render() {
    const t = useT();
    return (
      <PeriodCard
        id="season-3"
        title="Indoor Soccer League"
        subtitle="Recreational"
        description={t('storybook.demo.cardDescription')}
        period={{
          startDate: 'April 1, 2026',
          endDate: 'July 31, 2026',
        }}
        status={{
          type: 'upcoming',
          label: t('platform.status.pending'),
        }}
        image={{
          src: 'https://images.unsplash.com/photo-1431324155629-1a6deb1dec8d?w=400',
          alt: 'Soccer field',
        }}
        actionLabel={t('platform.common.submit')}
        onClick={fn()}
        onAction={fn()}
      />
    );
  },
};

// With deadline
export const WithDeadline: Story = {
  render: function Render() {
    const t = useT();
    return (
      <PeriodCard
        id="season-4"
        title="Tennis Championship"
        subtitle="Singles & Doubles"
        description={t('storybook.demo.cardDescription')}
        period={{
          startDate: 'May 15, 2026',
          endDate: 'June 15, 2026',
        }}
        status={{
          type: 'upcoming',
          label: t('platform.status.pending'),
        }}
        deadline={{
          date: 'April 30, 2026',
          label: 'Registration deadline',
        }}
        actionLabel={t('platform.common.submit')}
        onClick={fn()}
        onAction={fn()}
      />
    );
  },
};

// With action button
export const WithActionButton: Story = {
  render: function Render() {
    const t = useT();
    return (
      <PeriodCard
        id="season-5"
        title="Swimming Program"
        subtitle="Beginner to Advanced"
        description={t('storybook.demo.cardDescription')}
        period={{
          startDate: 'June 1, 2026',
          endDate: 'August 15, 2026',
        }}
        status={{
          type: 'upcoming',
          label: t('platform.status.pending'),
        }}
        actionLabel={t('platform.common.submit')}
        onClick={fn()}
        onAction={fn()}
      />
    );
  },
};

// Disabled action
export const DisabledAction: Story = {
  render: function Render() {
    const t = useT();
    return (
      <PeriodCard
        id="season-6"
        title="Sold Out Event"
        subtitle="Workshop Series"
        description={t('storybook.demo.cardDescription')}
        period={{
          startDate: 'March 10, 2026',
          endDate: 'March 20, 2026',
        }}
        status={{
          type: 'active',
          label: t('platform.status.active'),
        }}
        actionLabel={t('platform.common.submit')}
        actionDisabled={true}
        onClick={fn()}
        onAction={fn()}
      />
    );
  },
};

// Full featured
export const FullFeatured: Story = {
  render: function Render() {
    const t = useT();
    return (
      <PeriodCard
        id="season-7"
        title="Youth Basketball Camp"
        subtitle="Ages 8-14"
        description={t('storybook.demo.cardDescription')}
        period={{
          startDate: 'July 15, 2026',
          endDate: 'July 22, 2026',
          label: '1 week',
        }}
        status={{
          type: 'upcoming',
          label: t('platform.status.pending'),
        }}
        deadline={{
          date: 'June 30, 2026',
          label: 'Early bird ends',
        }}
        image={{
          src: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=400',
          alt: 'Basketball court',
        }}
        actionLabel={t('platform.common.submit')}
        onClick={fn()}
        onAction={fn()}
      />
    );
  },
};

// Status: Active
export const StatusActive: Story = {
  render: function Render() {
    const t = useT();
    return (
      <PeriodCard
        id="active-1"
        title={t('storybook.demo.cardTitle')}
        period={{ startDate: 'Jan 1', endDate: 'Mar 31' }}
        status={{ type: 'active', label: t('platform.status.active') }}
        onClick={fn()}
        onAction={fn()}
      />
    );
  },
};

// Status: Ending Soon
export const StatusEndingSoon: Story = {
  render: function Render() {
    const t = useT();
    return (
      <PeriodCard
        id="ending-1"
        title={t('storybook.demo.cardTitle')}
        period={{ startDate: 'Jan 1', endDate: 'Jan 31' }}
        status={{ type: 'ending_soon', label: t('platform.status.pending') }}
        onClick={fn()}
        onAction={fn()}
      />
    );
  },
};

// Status: Ended
export const StatusEnded: Story = {
  render: function Render() {
    const t = useT();
    return (
      <PeriodCard
        id="ended-1"
        title={t('storybook.demo.cardTitle')}
        period={{ startDate: 'Sep 1', endDate: 'Dec 31' }}
        status={{ type: 'ended', label: t('platform.status.completed') }}
        onClick={fn()}
        onAction={fn()}
      />
    );
  },
};

// Status: Draft
export const StatusDraft: Story = {
  render: function Render() {
    const t = useT();
    return (
      <PeriodCard
        id="draft-1"
        title={t('storybook.demo.cardTitle')}
        period={{ startDate: 'TBD', endDate: 'TBD' }}
        status={{ type: 'draft', label: t('platform.status.pending') }}
        onClick={fn()}
        onAction={fn()}
      />
    );
  },
};

// Status: Cancelled
export const StatusCancelled: Story = {
  render: function Render() {
    const t = useT();
    return (
      <PeriodCard
        id="cancelled-1"
        title={t('storybook.demo.cardTitle')}
        period={{ startDate: 'Feb 15', endDate: 'Feb 20' }}
        status={{ type: 'cancelled', label: t('platform.status.cancelled') }}
        onClick={fn()}
        onAction={fn()}
      />
    );
  },
};
