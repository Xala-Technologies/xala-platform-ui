import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Avatar } from '../../index';
import { useT } from '@xala-technologies/i18n';

/**
 * Avatar component from Digdir Designsystemet.
 *
 * Avatar for displaying user profile images or initials.
 *
 * @see https://designsystemet.no/en/components/docs/avatar/overview
 */
const meta: Meta<typeof Avatar> = {
  title: 'Components/Avatar',
  component: Avatar,
  parameters: {
    docs: {
      description: {
        component: `
Avatar is used to represent users or entities with profile images or initials. Avatars help users quickly identify people in the interface.

## Variants

- **Circle** - Default rounded shape (recommended for people)
- **Square** - Square with rounded corners (for organizations or objects)
- **With image** - Profile photo
- **With initials** - Text fallback when no image available
- **Avatar group** - Multiple overlapping avatars

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## Colors

Available colors: **neutral**, **accent**.

## When to Use

- User profile representations
- Comment or post authors
- Contact and user lists
- Team member displays
- Chat participants
- Avatar groups showing multiple users

## Best Practices

### Do
- Use 2 initials (first name + last name initial)
- Always provide aria-label describing the person
- Use consistent sizes within the same context
- Use circle variant for people
- Use square variant for organizations or objects
- Provide alt text for images
- Overlap avatars in groups with negative margin

### Don't
- Don't use more than 2 initials
- Don't use avatars without accessible labels
- Don't mix circle and square variants in same context
- Don't use inconsistent sizes in groups
- Don't use avatars for decorative purposes
- Don't show more than 5-6 avatars in a group

## Usage Patterns

### Avatar with Initials
\`\`\`tsx
<Avatar aria-label="John Doe">JD</Avatar>
\`\`\`

### Avatar with Image
\`\`\`tsx
<Avatar aria-label="John Doe">
  <img src="/avatar.jpg" alt="" />
</Avatar>
\`\`\`

### Size Variants
\`\`\`tsx
<Avatar data-size="sm" aria-label="John Doe">JD</Avatar>
<Avatar data-size="md" aria-label="John Doe">JD</Avatar>
<Avatar data-size="lg" aria-label="John Doe">JD</Avatar>
\`\`\`

### Avatar Group
\`\`\`tsx
<div style={{ display: 'flex' }}>
  <Avatar aria-label="John Doe" style={{ marginLeft: '-8px' }}>JD</Avatar>
  <Avatar aria-label="Alice Brown" style={{ marginLeft: '-8px' }}>AB</Avatar>
  <Avatar aria-label="Charlie Wilson" style={{ marginLeft: '-8px' }}>CW</Avatar>
</div>
\`\`\`

### Square Variant (for organizations)
\`\`\`tsx
<Avatar variant="square" aria-label="Acme Corporation">AC</Avatar>
\`\`\`

## Anti-Patterns

### Anti-pattern: Too Many Initials
Using 3+ initials makes avatars hard to read. Stick to 2 characters.

### Anti-pattern: No Accessible Label
Avatars without aria-label are not accessible to screen reader users.

### Anti-pattern: Mixing Shapes
Mixing circle and square avatars in the same context creates visual inconsistency.

### Anti-pattern: Too Many Avatars in Group
Showing 7+ avatars becomes cluttered. Show first 5 and indicate "+N more".

## Accessibility

### Screen Readers
- Avatar content (initials or image) is announced
- aria-label provides person's full name
- Images should have empty alt attribute (name in aria-label)
- Avatar groups should have descriptive labels

### WCAG 2.1 AA Compliance
- **Color contrast**: Minimum 4.5:1 for initials
- **Text alternative**: aria-label required for all avatars
- **Meaningful sequence**: Avatar groups read in logical order
- **Readable text**: Initials are clear and legible

### Avatar with Image
Images should have empty alt since aria-label provides context:
\`\`\`tsx
<Avatar aria-label="John Doe">
  <img src="/avatar.jpg" alt="" />
</Avatar>
\`\`\`

### Avatar Groups
Provide context for groups:
\`\`\`tsx
<div role="group" aria-label="Team members: John Doe, Alice Brown, Charlie Wilson">
  <Avatar aria-label="John Doe">JD</Avatar>
  <Avatar aria-label="Alice Brown">AB</Avatar>
  <Avatar aria-label="Charlie Wilson">CW</Avatar>
</div>
\`\`\`
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
      options: ['neutral', 'accent'],
      description: 'Color variant',
      table: {
        defaultValue: { summary: 'neutral' },
      },
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <Avatar aria-label="User avatar">JD</Avatar>,
};

export const WithInitials: Story = {
  render: () => <Avatar aria-label="John Doe">JD</Avatar>,
};

export const Initials: Story = {
  render: function Render() {
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
        <Avatar aria-label="John Doe">JD</Avatar>
        <Avatar aria-label="Alice Brown">AB</Avatar>
        <Avatar aria-label="Charlie Wilson">CW</Avatar>
      </div>
    );
  },
};

export const Sizes: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', alignItems: 'center' }}>
        <Avatar data-size="sm" aria-label="Small avatar">
          SM
        </Avatar>
        <Avatar data-size="md" aria-label="Medium avatar">
          MD
        </Avatar>
        <Avatar data-size="lg" aria-label="Large avatar">
          LG
        </Avatar>
      </div>
    );
  },
};

export const Colors: Story = {
  render: function Render() {
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
        <Avatar data-color="neutral" aria-label="Neutral avatar">
          N
        </Avatar>
        <Avatar data-color="accent" aria-label="Accent avatar">
          A
        </Avatar>
      </div>
    );
  },
};

export const Variant: Story = {
  render: function Render() {
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
        <Avatar variant="circle" aria-label="Circle avatar">
          C
        </Avatar>
        <Avatar variant="square" aria-label="Square avatar">
          S
        </Avatar>
      </div>
    );
  },
};

export const AvatarGroup: Story = {
  render: function Render() {
    return (
      <div style={{ display: 'flex' }}>
        <Avatar aria-label="User 1">A</Avatar>
        <Avatar aria-label="User 2" style={{ marginLeft: 'calc(-1 * var(--ds-spacing-2))' }}>
          B
        </Avatar>
        <Avatar aria-label="User 3" style={{ marginLeft: 'calc(-1 * var(--ds-spacing-2))' }}>
          C
        </Avatar>
        <Avatar aria-label="3 more users" style={{ marginLeft: 'calc(-1 * var(--ds-spacing-2))' }}>
          +3
        </Avatar>
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
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>
            {t('storybook.story.sizes')}
          </h3>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)', alignItems: 'center' }}>
            <Avatar data-size="sm" aria-label="Small">
              SM
            </Avatar>
            <Avatar data-size="md" aria-label="Medium">
              MD
            </Avatar>
            <Avatar data-size="lg" aria-label="Large">
              LG
            </Avatar>
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>
            {t('storybook.story.variants')}
          </h3>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
            <Avatar variant="circle" aria-label="Circle">
              C
            </Avatar>
            <Avatar variant="square" aria-label="Square">
              S
            </Avatar>
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>
            {t('storybook.story.states')}
          </h3>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
            <Avatar data-color="neutral" aria-label="Neutral">
              N
            </Avatar>
            <Avatar data-color="accent" aria-label="Accent">
              A
            </Avatar>
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>
            {t('storybook.story.interactive')}
          </h3>
          <div style={{ display: 'flex' }}>
            <Avatar aria-label="Alice">AB</Avatar>
            <Avatar aria-label="Bob" style={{ marginLeft: 'calc(-1 * var(--ds-spacing-2))' }}>
              BC
            </Avatar>
            <Avatar aria-label="Charlie" style={{ marginLeft: 'calc(-1 * var(--ds-spacing-2))' }}>
              CD
            </Avatar>
            <Avatar aria-label="2 more" style={{ marginLeft: 'calc(-1 * var(--ds-spacing-2))' }}>
              +2
            </Avatar>
          </div>
        </div>
      </div>
    );
  },
};
