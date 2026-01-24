import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useT } from '@xala-technologies/i18n';
import { Card, Heading, Paragraph, Button, Link } from '../../index';

/**
 * Card component from Digdir Designsystemet.
 *
 * Card highlights information or tasks that are related.
 *
 * @see https://designsystemet.no/en/components/docs/card/overview
 */
const meta: Meta<typeof Card> = {
  title: 'Components/Card',
  component: Card,
  parameters: {
    docs: {
      description: {
        component: `
Card highlights information or tasks that are related. The component comes in two variants and can contain text, images, buttons, and links.

## Variants

- **Default** - Standard card with white background
- **Tinted** - Colored background variant
- **With sections** - Card.Block for divided content
- **Link card** - Navigation to another page (use asChild with anchor)
- **Button card** - Triggers action on same page (use asChild with button)
- **Horizontal** - Side-by-side layout using grid

## Colors

Available in all theme colors: **accent**, **brand1**, **brand2**, **brand3**, **neutral**.

## When to Use

- Displaying grouped related information
- List items with multiple data points
- Interactive content blocks that navigate or trigger actions
- Navigation cards to other pages
- Media content with descriptions
- Dashboard widgets and summaries

## Best Practices

### Do
- Use Card.Block to divide content into logical sections
- Keep content concise and scannable
- Use appropriate heading levels (h2, h3, h4)
- Ensure interactive cards are keyboard accessible
- Use asChild with semantic HTML (button for actions, anchor for navigation)
- Provide clear visual hierarchy
- Use consistent card sizes in grids
- Add hover states for interactive cards

### Don't
- Don't nest cards inside cards
- Don't use cards for single pieces of information (use other components)
- Don't make cards too tall (keep content focused)
- Don't use onClick without proper semantic HTML
- Don't mix interactive and non-interactive cards in same context
- Don't use cards for form inputs

## Usage Patterns

### Basic Card
\`\`\`tsx
<Card>
  <Heading level={3} data-size="sm">Card Title</Heading>
  <Paragraph>
    Card content goes here. Keep it concise and scannable.
  </Paragraph>
</Card>
\`\`\`

### Card with Sections
\`\`\`tsx
<Card data-color="neutral">
  <Card.Block>
    <Heading level={3} data-size="md">Section 1</Heading>
    <Paragraph>First section content</Paragraph>
  </Card.Block>
  <Card.Block>
    <Heading level={4} data-size="sm">Section 2</Heading>
    <Paragraph>Second section content</Paragraph>
  </Card.Block>
</Card>
\`\`\`

### Interactive Card as Link
\`\`\`tsx
<Card asChild data-color="neutral">
  <a href="/details">
    <Card.Block>
      <Heading level={3} data-size="md">View Details</Heading>
      <Paragraph>Click to navigate to details page</Paragraph>
    </Card.Block>
  </a>
</Card>
\`\`\`

### Interactive Card as Button
\`\`\`tsx
<Card asChild data-color="neutral">
  <button type="button" onClick={handleAction}>
    <Card.Block>
      <Heading level={3} data-size="md">Settings</Heading>
      <Paragraph>Click to open settings dialog</Paragraph>
    </Card.Block>
  </button>
</Card>
\`\`\`

### Card with Actions
\`\`\`tsx
<Card>
  <Heading level={3} data-size="sm">Request</Heading>
  <Paragraph>John Doe has requested access.</Paragraph>
  <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', marginTop: 'var(--ds-spacing-4)' }}>
    <Button variant="secondary" type="button">Decline</Button>
    <Button variant="primary" type="button">Approve</Button>
  </div>
</Card>
\`\`\`

## Anti-Patterns

### Anti-pattern: Using onClick Without Semantic HTML
Don't use onClick directly on Card. Use asChild with button or anchor instead.

### Anti-pattern: Nested Cards
Cards inside cards create confusing visual hierarchy and poor accessibility.

### Anti-pattern: Cards for Everything
Not all content needs a card. Use cards for grouped, related information only.

### Anti-pattern: Inconsistent Card Heights in Grids
Cards in the same grid should have consistent heights for visual harmony.

## Accessibility

### Keyboard Navigation
- **Tab** moves focus to interactive elements inside card
- **Enter** or **Space** activates interactive cards (when using asChild with button)
- **Enter** follows links (when using asChild with anchor)
- Focus indicators must be visible on interactive cards

### Screen Readers
- Card content structure is announced
- Heading hierarchy provides context
- Interactive cards announce role (button or link)
- Card.Block sections are properly separated
- Images require alt text

### WCAG 2.1 AA Compliance
- **Color contrast**: Minimum 4.5:1 for text
- **Focus visible**: Clear focus indicator on interactive cards
- **Touch target**: Minimum 44x44px for interactive elements
- **Semantic HTML**: Use asChild with button/anchor for interactive cards
- **Heading hierarchy**: Proper heading levels (h2, h3, h4)
- **Keyboard accessible**: All interactive elements reachable via keyboard

### Interactive Cards
Always use semantic HTML for interactive cards:
\`\`\`tsx
// For navigation
<Card asChild>
  <a href="/page" aria-label="View details">
    <Card.Block>Content</Card.Block>
  </a>
</Card>

// For actions
<Card asChild>
  <button type="button" aria-label="Open settings">
    <Card.Block>Content</Card.Block>
  </button>
</Card>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    'data-color': {
      control: 'select',
      options: ['accent', 'brand1', 'brand2', 'brand3', 'neutral'],
      description: 'Color variant',
      table: {
        defaultValue: { summary: 'neutral' },
      },
    },
    asChild: {
      control: 'boolean',
      description: 'Render as child element (button/link)',
    },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default card
 */
export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Card>
        <Heading level={3} data-size="sm">
          {t('storybook.demo.cardTitle')}
        </Heading>
        <Paragraph>{t('storybook.demo.cardDescription')}</Paragraph>
      </Card>
    );
  },
};

/**
 * Card with actions
 */
export const WithActions: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Card>
        <Heading level={3} data-size="sm">
          {t('storybook.demo.resourceRequest')}
        </Heading>
        <Paragraph>{t('storybook.demo.bookingRequestDescription')}</Paragraph>
        <div
          style={{ display: 'flex', gap: 'var(--ds-spacing-2)', marginTop: 'var(--ds-spacing-4)' }}
        >
          <Button variant="secondary" type="button">
            {t('storybook.demo.decline')}
          </Button>
          <Button variant="primary" type="button">
            {t('storybook.demo.approve')}
          </Button>
        </div>
      </Card>
    );
  },
};

/**
 * Card as clickable
 */
export const AsClickable: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Card style={{ cursor: 'pointer' }} onClick={() => {}}>
        <Heading level={3} data-size="sm">
          {t('storybook.demo.clickToViewDetails')}
        </Heading>
        <Paragraph>{t('storybook.demo.clickableCardDescription')}</Paragraph>
      </Card>
    );
  },
};

/**
 * Card with image
 */
export const WithImage: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Card style={{ overflow: 'hidden' }}>
        <div
          style={{
            aspectRatio: '16/9',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <span style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            {t('storybook.demo.imagePlaceholder')}
          </span>
        </div>
        <div style={{ padding: 'var(--ds-spacing-4)' }}>
          <Heading level={3} data-size="sm">
            {t('storybook.demo.featuredResource')}
          </Heading>
          <Paragraph>{t('storybook.demo.meetingSpaceDescription')}</Paragraph>
        </div>
      </Card>
    );
  },
};

/**
 * Color variants - Available in all theme colors
 */
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      {['accent', 'brand1', 'brand2', 'brand3', 'neutral'].map((color) => (
        <div key={color} style={{ display: 'flex', gap: 'var(--ds-spacing-4)' }}>
          <Card data-color={color as any} data-variant="default" style={{ flex: 1 }}>
            <Card.Block>
              <Paragraph>default: {color}</Paragraph>
            </Card.Block>
          </Card>
          <Card data-color={color as any} data-variant="tinted" style={{ flex: 1 }}>
            <Card.Block>
              <Paragraph>tinted: {color}</Paragraph>
            </Card.Block>
          </Card>
        </div>
      ))}
    </div>
  ),
};

/**
 * With sections - Use Card.Block to divide content
 */
export const WithSections: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Card data-color="neutral" style={{ maxWidth: '380px' }}>
        <Card.Block>
          <div
            style={{
              aspectRatio: '16/9',
              backgroundColor: 'var(--ds-color-neutral-surface-default)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <span style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {t('storybook.demo.videoImagePlaceholder')}
            </span>
          </div>
        </Card.Block>
        <Card.Block>
          <Heading level={3} data-size="md">
            {t('storybook.demo.aboutDesignsystemet')}
          </Heading>
          <Paragraph>{t('storybook.demo.cardBlockDescription')}</Paragraph>
        </Card.Block>
      </Card>
    );
  },
};

/**
 * Link card - For navigation
 */
export const LinkCard: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Card data-color="neutral">
        <Card.Block>
          <Heading level={3} data-size="md">
            <Link href="https://designsystemet.no" target="_blank" rel="noopener noreferrer">
              {t('storybook.demo.visitDesignsystemet')}
            </Link>
          </Heading>
          <Paragraph>{t('storybook.demo.designsystemetDescription')}</Paragraph>
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
            {t('storybook.demo.norwegianDigitalisationAgency')}
          </Paragraph>
        </Card.Block>
      </Card>
    );
  },
};

/**
 * Card as button - For actions on same page
 */
export const AsButton: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Card asChild data-color="neutral">
        <button type="button" onClick={() => {}}>
          <Card.Block>
            <Heading level={3} data-size="md">
              {t('storybook.demo.settingsAndPrivacy')}
            </Heading>
          </Card.Block>
          <Card.Block>
            <Paragraph>{t('storybook.demo.settingsDialogDescription')}</Paragraph>
          </Card.Block>
        </button>
      </Card>
    );
  },
};

/**
 * Horizontal layout - Side-by-side content
 */
export const Horizontal: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Card
        data-color="neutral"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: 0,
        }}
      >
        <Card.Block>
          <Heading level={3} data-size="md">
            {t('storybook.demo.wanderlust')}
          </Heading>
        </Card.Block>
        <Card.Block>
          <Paragraph>{t('storybook.demo.wanderlustDescription')}</Paragraph>
        </Card.Block>
      </Card>
    );
  },
};

/**
 * Multiple cards in grid
 */
export const CardGrid: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: 'var(--ds-spacing-4)',
        }}
      >
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} data-color="neutral">
            <Card.Block>
              <Heading level={3} data-size="sm">
                {t('storybook.demo.card')} {i}
              </Heading>
              <Paragraph>
                {t('storybook.demo.cardContentFor')} {i}.{' '}
                {t('storybook.demo.eachCardCanContainDifferentInfo')}
              </Paragraph>
              <Button
                variant="secondary"
                type="button"
                style={{ marginTop: 'var(--ds-spacing-3)' }}
              >
                {t('storybook.demo.learnMore')}
              </Button>
            </Card.Block>
          </Card>
        ))}
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
            {t('storybook.story.defaultVsTinted')}
          </Heading>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)' }}>
            <Card data-variant="default" style={{ flex: 1 }}>
              <Card.Block>
                <Heading level={4} data-size="sm">
                  {t('storybook.story.default')}
                </Heading>
                <Paragraph>{t('storybook.demo.whiteBackground')}</Paragraph>
              </Card.Block>
            </Card>
            <Card data-variant="tinted" data-color="accent" style={{ flex: 1 }}>
              <Card.Block>
                <Heading level={4} data-size="sm">
                  {t('storybook.demo.tinted')}
                </Heading>
                <Paragraph>{t('storybook.demo.coloredBackground')}</Paragraph>
              </Card.Block>
            </Card>
          </div>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {t('storybook.story.withSections')}
          </Heading>
          <Card data-color="neutral" style={{ maxWidth: '300px' }}>
            <Card.Block>
              <Heading level={4} data-size="sm">
                {t('storybook.demo.section')} 1
              </Heading>
            </Card.Block>
            <Card.Block>
              <Paragraph>{t('storybook.demo.sectionWithDivider')}</Paragraph>
            </Card.Block>
          </Card>
        </div>

        <div>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            {t('storybook.story.interactiveCards')}
          </Heading>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)' }}>
            <Card style={{ cursor: 'pointer', flex: 1 }} onClick={() => {}}>
              <Card.Block>
                <Heading level={4} data-size="sm">
                  {t('storybook.demo.clickable')}
                </Heading>
                <Paragraph>{t('storybook.demo.withOnClick')}</Paragraph>
              </Card.Block>
            </Card>
            <Card asChild style={{ flex: 1 }}>
              <button type="button">
                <Card.Block>
                  <Heading level={4} data-size="sm">
                    {t('storybook.demo.asButton')}
                  </Heading>
                  <Paragraph>{t('storybook.demo.semanticButton')}</Paragraph>
                </Card.Block>
              </button>
            </Card>
          </div>
        </div>
      </div>
    );
  },
};
