import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Badge, Button, Heading } from '../../index';
import { useT } from '@xala-technologies/i18n';

/**
 * Badge component from Digdir Designsystemet.
 *
 * Badge displays NUMBERS and COUNTS only. For text labels, use Tag component.
 *
 * @see https://designsystemet.no/en/components/docs/badge/overview
 * @see https://designsystemet.no/en/components/docs/tag/overview (for text labels)
 */
const meta: Meta<typeof Badge> = {
  title: 'Components/Badge',
  component: Badge,
  parameters: {
    docs: {
      description: {
        component: `
**IMPORTANT**: Badge is for numbers and counts only. Use Tag component for text labels.

Badge displays numeric counts and status indicators with two variants: base (solid) and tinted (subtle).

## Key Properties

- count: Numeric value to display
- maxCount: Maximum before showing "99+" (default 99)
- data-color: Color variant (neutral, accent, success, warning, danger, info)
- data-size: Size variant (sm, md, lg)

## When to Use Badge

- Notification counts (unread messages, alerts)
- Numeric indicators on buttons or tabs
- Status dots with accompanying text labels
- Quantity badges

## When to Use Tag Instead

- Status labels like "Active", "Pending", "Draft"
- Category labels like "Bug", "Feature"
- Metadata tags like "Premium", "New", "Beta"
- Any text-based labels

## Best Practices

Do:
- Use count prop for numeric values
- Use maxCount to cap large numbers
- Place notification badges consistently
- Use status dots with text labels nearby
- Use semantic colors appropriately

Don't:
- Don't use text in Badge (use Tag instead)
- Don't use Badge for status words
- Don't rely on color alone
- Don't use for interactive elements

## Accessibility

- Badge counts are announced by screen readers
- Color meaning supplemented with text
- Minimum 4.5:1 color contrast
- Context clear from surrounding content
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    'data-size': {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
      table: {
        defaultValue: { summary: 'md' },
      },
    },
    'data-color': {
      control: 'select',
      options: ['neutral', 'accent', 'success', 'warning', 'danger', 'info'],
      description: 'Color variant',
      table: {
        defaultValue: { summary: 'neutral' },
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof Badge>;

export const Default: Story = {
  render: () => <Badge count={5} />,
};

export const Colors: Story = {
  render: function Render() {
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)', alignItems: 'center' }}>
        <Badge count={5} data-color="neutral" />
        <Badge count={12} data-color="accent" />
        <Badge count={3} data-color="success" />
        <Badge count={7} data-color="warning" />
        <Badge count={99} data-color="danger" />
        <Badge count={42} data-color="info" />
      </div>
    );
  },
};

export const Sizes: Story = {
  render: function Render() {
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)', alignItems: 'center' }}>
        <Badge count={5} data-size="sm" />
        <Badge count={15} data-size="md" />
        <Badge count={99} data-size="lg" />
      </div>
    );
  },
};

export const WithButton: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)', alignItems: 'center' }}>
        <Button variant="secondary" type="button">
          Notifications
          <Badge
            count={3}
            data-color="danger"
            data-size="sm"
            style={{ marginLeft: 'var(--ds-spacing-2)' }}
          />
        </Button>
        <Button variant="secondary" type="button">
          Messages
          <Badge
            count={150}
            maxCount={99}
            data-color="info"
            data-size="sm"
            style={{ marginLeft: 'var(--ds-spacing-2)' }}
          />
        </Button>
      </div>
    );
  },
};

export const StatusDots: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Badge data-color="success" style={{ marginInlineEnd: 'var(--ds-spacing-2)' }} />
          {t('platform.status.active')}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Badge data-color="warning" style={{ marginInlineEnd: 'var(--ds-spacing-2)' }} />
          {t('platform.status.pending')}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Badge data-color="danger" style={{ marginInlineEnd: 'var(--ds-spacing-2)' }} />
          {t('platform.status.cancelled')}
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Badge data-color="neutral" style={{ marginInlineEnd: 'var(--ds-spacing-2)' }} />
          Draft
        </div>
      </div>
    );
  },
};

/**
 * All variants overview
 */
export const AllVariants: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <div>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {t('storybook.story.variants')}
          </Heading>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', flexWrap: 'wrap' }}>
            <Badge count={5} data-color="neutral" />
            <Badge count={12} data-color="accent" />
            <Badge count={3} data-color="success" />
            <Badge count={7} data-color="warning" />
            <Badge count={99} data-color="danger" />
            <Badge count={42} data-color="info" />
          </div>
        </div>
        <div>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {t('storybook.story.sizes')}
          </Heading>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', alignItems: 'center' }}>
            <Badge count={5} data-size="sm" />
            <Badge count={15} data-size="md" />
            <Badge count={99} data-size="lg" />
          </div>
        </div>
        <div>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {t('storybook.story.interactive')}
          </Heading>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)' }}>
            <Button variant="secondary" type="button">
              Notifications
              <Badge
                count={5}
                data-color="danger"
                data-size="sm"
                style={{ marginLeft: 'var(--ds-spacing-2)' }}
              />
            </Button>
            <Button variant="secondary" type="button">
              Messages
              <Badge
                count={150}
                maxCount={99}
                data-color="info"
                data-size="sm"
                style={{ marginLeft: 'var(--ds-spacing-2)' }}
              />
            </Button>
          </div>
        </div>
        <div>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {t('storybook.story.states')}
          </Heading>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Badge data-color="success" style={{ marginInlineEnd: 'var(--ds-spacing-2)' }} />
              {t('platform.status.active')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Badge data-color="warning" style={{ marginInlineEnd: 'var(--ds-spacing-2)' }} />
              {t('platform.status.pending')}
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <Badge data-color="danger" style={{ marginInlineEnd: 'var(--ds-spacing-2)' }} />
              {t('storybook.story.error')}
            </div>
          </div>
        </div>
      </div>
    );
  },
};
