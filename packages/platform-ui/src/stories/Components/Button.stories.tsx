import type { Meta, StoryObj } from '@storybook/react';
import { fn, expect, userEvent, within } from '@storybook/test';
import { Button, Heading } from '../../index';
import {
  PlusIcon,
  FloppydiskIcon,
  TrashIcon,
  PencilIcon,
  ArrowRightIcon,
} from '@navikt/aksel-icons';

/**
 * Button component from Digdir Designsystemet.
 *
 * Buttons allow users to perform actions and make choices with a single tap or click.
 *
 * @see https://designsystemet.no/en/components/docs/button/overview
 */
const meta: Meta<typeof Button> = {
  title: 'Components/Button',
  component: Button,
  parameters: {
    docs: {
      description: {
        component: `
Buttons have an important function and are directly tied to an action. They give the user the ability to complete tasks.

## Emphasis Levels

We use different button variants to emphasise certain actions. The primary, secondary and tertiary variants show how important the action is, and help users understand what should be prioritised.

### Primary
Used for the most important action for the user, for example "Save", "Next" or "Submit". **There should normally only be one primary button per page.**

### Secondary
Used for actions that are not the main action. It often appears next to a primary button — if the primary button is "Save", the secondary button might be "Cancel".

### Tertiary
More discreet than the secondary button. Often used together with a primary or secondary button for less important actions. If used alone, it should include an icon, otherwise it may be difficult to recognise as a button.

## Colors

The button is available in all colors from your theme: **accent**, **brand1**, **brand2**, **brand3**, **neutral**, **danger**.

**Important:** A group of buttons should use the same colour variant. The exception is when you want to highlight an action that cannot be undone, such as "Delete". Otherwise, different colour variants should normally not be combined.

## Icons

Button can have an icon placed either to the left or the right of the text. As a general rule, we recommend placing the icon on the left. Icons inside buttons automatically get spacing to the text.

### Icon Placement
- In most cases, **left** is the best placement
- If the button says "Start" and has an arrow pointing right, it is natural for the arrow to be on the right
- If the button is fixed on the right side of the interface, placing the icon on the right can be more intuitive
- **Use only one icon per button**

### Icon-only Buttons
Use icon-only buttons only for well-known icons such as "Close" and "Delete". When the button has no text, you must add an accessible label describing what it does via \`aria-label\` or \`title\`.

### Icons with Text
When using an icon together with text, the icon should have \`aria-hidden\` so screen readers don't read unnecessary content.

## Best Practices

### Do
- Use one primary button per page to indicate the main action
- Use same color variant in a button group (except danger for destructive actions)
- Place the most important action on the right in a button group
- Use clear, action-oriented labels ("Save changes" not "OK")
- Add \`aria-label\` or \`title\` to icon-only buttons
- Add \`aria-hidden\` to icons when used with text
- Use loading state for async operations
- Disable buttons during processing to prevent double-submission

### Don't
- Don't use multiple primary buttons on the same page
- Don't mix different color variants in a group (except danger)
- Don't use multiple icons in the same button
- Don't use icon-only buttons for uncommon actions
- Don't use buttons for navigation (use Link instead)
- Don't make buttons too small (minimum 44x44px for touch targets)

## Usage Patterns

### Form Actions
\`\`\`tsx
<div style={{ display: 'flex', gap: 'var(--ds-spacing-3)' }}>
  <Button variant="primary" type="submit">Save changes</Button>
  <Button variant="secondary" type="button">Cancel</Button>
</div>
\`\`\`

### Destructive Actions
\`\`\`tsx
<div style={{ display: 'flex', gap: 'var(--ds-spacing-3)' }}>
  <Button variant="primary" data-color="neutral">Keep</Button>
  <Button variant="tertiary" data-color="danger">Delete</Button>
</div>
\`\`\`

### With Loading State
\`\`\`tsx
<Button variant="primary" loading={isLoading} disabled={isLoading}>
  {isLoading ? 'Saving...' : 'Save'}
</Button>
\`\`\`

## Anti-Patterns

### Anti-pattern: Multiple Primary Buttons
Having multiple primary buttons confuses users about which action is most important.

### Anti-pattern: Unclear Labels
Labels like "OK", "Yes", "No" don't provide context. Use specific action verbs instead.

### Anti-pattern: Buttons for Navigation
Buttons should trigger actions, not navigate. Use Link component for navigation.

### Anti-pattern: Tiny Touch Targets
Buttons smaller than 44x44px are difficult to tap on mobile devices.

## Accessibility

### Keyboard Navigation
- **Enter** or **Space** activates the button
- **Tab** moves focus to the button
- Visible focus ring indicates keyboard focus

### Screen Readers
- Button role is automatically announced
- Button label is read (text content or aria-label)
- Disabled state is announced
- Loading state should be communicated via aria-live or status text

### WCAG 2.1 AA Compliance
- **Color contrast**: Minimum 4.5:1 for text, 3:1 for UI components
- **Touch target size**: Minimum 44x44px
- **Focus visible**: Clear focus indicator (2px outline)
- **Name, Role, Value**: Proper semantic HTML and ARIA

### Icon-only Buttons
Must have accessible label via \`aria-label\`, \`title\`, or Tooltip:
\`\`\`tsx
<Button icon aria-label="Delete item">
  <Trash aria-hidden />
</Button>
\`\`\`

### Icons with Text
Icons should be hidden from screen readers:
\`\`\`tsx
<Button>
  <Save aria-hidden />
  Save changes
</Button>
\`\`\`
        `,
      },
    },
  },
  args: {
    // Use fn() to create a spy function for tracking clicks
    onClick: fn(),
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['primary', 'secondary', 'tertiary'],
      description: 'Button emphasis level',
      table: {
        defaultValue: { summary: 'primary' },
      },
    },
    'data-color': {
      control: 'select',
      options: ['accent', 'brand1', 'brand2', 'brand3', 'neutral', 'danger'],
      description: 'Color variant from theme',
    },
    'data-size': {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Size variant',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the button',
    },
    loading: {
      control: 'boolean',
      description: 'Shows loading spinner',
    },
    icon: {
      control: 'boolean',
      description: 'Icon-only button (requires aria-label)',
    },
    asChild: {
      control: 'boolean',
      description: 'Render as child element (e.g., link)',
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

/**
 * Default button with primary variant.
 *
 * This story includes an interaction test that verifies:
 * - Button is rendered and visible
 * - Button can be clicked
 * - Click handler is called
 */
export const Default: Story = {
  args: {
    children: 'Button',
    variant: 'primary',
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    // Find the button
    const button = canvas.getByRole('button', { name: 'Button' });

    // Verify button is visible
    await expect(button).toBeVisible();

    // Click the button
    await userEvent.click(button);

    // Verify onClick was called
    await expect(args.onClick).toHaveBeenCalledTimes(1);
  },
};

/**
 * Emphasis levels - Different button variants show action importance and help users prioritize.
 */
export const EmphasisLevels: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--ds-spacing-3)',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Button variant="primary" type="button">
        Primary
      </Button>
      <Button variant="secondary" type="button">
        Secondary
      </Button>
      <Button variant="tertiary" type="button">
        Tertiary
      </Button>
    </div>
  ),
};

/**
 * All color variants - Available in all theme colors. Use same color in a group except danger for destructive actions.
 */
export const Colors: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)', flexWrap: 'wrap' }}>
        <Button variant="primary" data-color="accent" type="button">
          Accent
        </Button>
        <Button variant="primary" data-color="brand1" type="button">
          Brand 1
        </Button>
        <Button variant="primary" data-color="brand2" type="button">
          Brand 2
        </Button>
        <Button variant="primary" data-color="brand3" type="button">
          Brand 3
        </Button>
        <Button variant="primary" data-color="neutral" type="button">
          Neutral
        </Button>
        <Button variant="primary" data-color="danger" type="button">
          Danger
        </Button>
      </div>
    </div>
  ),
};

/**
 * Combined colors example - Same color in group, except danger for destructive actions.
 */
export const CombinedColors: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--ds-spacing-3)',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Button variant="primary" data-color="neutral" type="button">
        Publish
      </Button>
      <Button variant="secondary" data-color="neutral" type="button">
        Save draft
      </Button>
      <Button variant="tertiary" data-color="danger" type="button">
        Delete
      </Button>
    </div>
  ),
};

/**
 * Icons - Buttons can have icons left or right of text. Icons automatically get spacing.
 */
export const WithIcons: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)', flexWrap: 'wrap' }}>
        <Button variant="primary" type="button">
          <PencilIcon aria-hidden fontSize="1.25rem" />
          Edit
        </Button>
        <Button variant="secondary" type="button">
          <FloppydiskIcon aria-hidden fontSize="1.25rem" />
          Save
        </Button>
        <Button variant="tertiary" type="button">
          Start
          <ArrowRightIcon aria-hidden fontSize="1.25rem" />
        </Button>
      </div>
    </div>
  ),
};

/**
 * Disabled state.
 *
 * This story tests that disabled buttons:
 * - Have the disabled attribute
 * - Do not fire onClick when clicked
 */
export const Disabled: Story = {
  args: {
    children: 'Disabled Button',
    disabled: true,
  },
  play: async ({ canvasElement, args }) => {
    const canvas = within(canvasElement);

    const button = canvas.getByRole('button', { name: 'Disabled Button' });

    // Verify button has disabled attribute
    await expect(button).toBeDisabled();

    // Try to click the button (should not trigger onClick)
    await userEvent.click(button);

    // onClick should NOT have been called because button is disabled
    await expect(args.onClick).not.toHaveBeenCalled();
  },
};

/**
 * Loading buttons - Show loading state with spinner. Combine with loading prop.
 */
export const Loading: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--ds-spacing-3)',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Button variant="primary" loading type="button">
        Loading...
      </Button>
      <Button variant="secondary" loading type="button">
        Loading...
      </Button>
      <Button variant="tertiary" loading type="button">
        Loading...
      </Button>
    </div>
  ),
};

/**
 * Button styled as link - Links can be styled as buttons using asChild prop.
 */
export const AsLink: Story = {
  render: () => (
    <Button asChild>
      <a href="https://www.designsystemet.no" target="_blank" rel="noreferrer">
        Go to designsystemet.no
      </a>
    </Button>
  ),
};

/**
 * Size variants - Buttons scale with data-size attribute.
 */
export const Sizes: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--ds-spacing-3)',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Button data-size="sm" type="button">
        Small
      </Button>
      <Button data-size="md" type="button">
        Medium
      </Button>
      <Button data-size="lg" type="button">
        Large
      </Button>
    </div>
  ),
};

/**
 * Icon-only buttons - Use only for well-known icons. Must have accessible label via aria-label or title.
 *
 * Best practices:
 * - Only use for universally recognized icons (Close, Delete, Edit, etc.)
 * - Always provide aria-label describing the action
 * - Icon should have aria-hidden to prevent duplicate announcements
 * - Consider using Tooltip for additional context
 */
export const IconOnly: Story = {
  render: () => (
    <div
      style={{
        display: 'flex',
        gap: 'var(--ds-spacing-3)',
        alignItems: 'center',
        flexWrap: 'wrap',
      }}
    >
      <Button icon aria-label="Add item" type="button">
        <PlusIcon aria-hidden fontSize="1.25rem" />
      </Button>
      <Button icon variant="secondary" aria-label="Save" type="button">
        <FloppydiskIcon aria-hidden fontSize="1.25rem" />
      </Button>
      <Button icon variant="tertiary" data-color="danger" aria-label="Delete" type="button">
        <TrashIcon aria-hidden fontSize="1.25rem" />
      </Button>
    </div>
  ),
};

/**
 * Best Practices - Examples of correct and incorrect button usage.
 */
export const BestPractices: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-8)' }}>
      <div>
        <Heading
          level={3}
          data-size="sm"
          style={{
            marginBottom: 'var(--ds-spacing-3)',
            color: 'var(--ds-color-success-text-default)',
          }}
        >
          Do: One primary button per page
        </Heading>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)', flexWrap: 'wrap' }}>
          <Button variant="primary" type="button">
            Save changes
          </Button>
          <Button variant="secondary" type="button">
            Cancel
          </Button>
        </div>
      </div>

      <div>
        <Heading
          level={3}
          data-size="sm"
          style={{
            marginBottom: 'var(--ds-spacing-3)',
            color: 'var(--ds-color-success-text-default)',
          }}
        >
          Do: Same color in group, except danger
        </Heading>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)', flexWrap: 'wrap' }}>
          <Button variant="primary" data-color="neutral" type="button">
            Publish
          </Button>
          <Button variant="secondary" data-color="neutral" type="button">
            Save draft
          </Button>
          <Button variant="tertiary" data-color="danger" type="button">
            Delete
          </Button>
        </div>
      </div>

      <div>
        <Heading
          level={3}
          data-size="sm"
          style={{
            marginBottom: 'var(--ds-spacing-3)',
            color: 'var(--ds-color-success-text-default)',
          }}
        >
          Do: Clear, action-oriented labels
        </Heading>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)', flexWrap: 'wrap' }}>
          <Button variant="primary" type="button">
            Save changes
          </Button>
          <Button variant="secondary" type="button">
            Discard changes
          </Button>
        </div>
      </div>

      <div>
        <Heading
          level={3}
          data-size="sm"
          style={{
            marginBottom: 'var(--ds-spacing-3)',
            color: 'var(--ds-color-danger-text-default)',
          }}
        >
          Don't: Multiple primary buttons
        </Heading>
        <div
          style={{ display: 'flex', gap: 'var(--ds-spacing-3)', flexWrap: 'wrap', opacity: 0.6 }}
        >
          <Button variant="primary" type="button">
            Save
          </Button>
          <Button variant="primary" type="button">
            Submit
          </Button>
          <Button variant="primary" type="button">
            Publish
          </Button>
        </div>
      </div>

      <div>
        <Heading
          level={3}
          data-size="sm"
          style={{
            marginBottom: 'var(--ds-spacing-3)',
            color: 'var(--ds-color-danger-text-default)',
          }}
        >
          Don't: Unclear labels
        </Heading>
        <div
          style={{ display: 'flex', gap: 'var(--ds-spacing-3)', flexWrap: 'wrap', opacity: 0.6 }}
        >
          <Button variant="primary" type="button">
            OK
          </Button>
          <Button variant="secondary" type="button">
            Cancel
          </Button>
        </div>
      </div>
    </div>
  ),
};

/**
 * All variants overview - Complete showcase of all button variations.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          Emphasis Levels
        </Heading>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)', flexWrap: 'wrap' }}>
          <Button variant="primary" type="button">
            Primary
          </Button>
          <Button variant="secondary" type="button">
            Secondary
          </Button>
          <Button variant="tertiary" type="button">
            Tertiary
          </Button>
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          All Colors
        </Heading>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)', flexWrap: 'wrap' }}>
          <Button data-color="accent" type="button">
            Accent
          </Button>
          <Button data-color="brand1" type="button">
            Brand 1
          </Button>
          <Button data-color="brand2" type="button">
            Brand 2
          </Button>
          <Button data-color="brand3" type="button">
            Brand 3
          </Button>
          <Button data-color="neutral" type="button">
            Neutral
          </Button>
          <Button data-color="danger" type="button">
            Danger
          </Button>
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          Sizes
        </Heading>
        <div
          style={{
            display: 'flex',
            gap: 'var(--ds-spacing-3)',
            alignItems: 'center',
            flexWrap: 'wrap',
          }}
        >
          <Button data-size="sm" type="button">
            Small
          </Button>
          <Button data-size="md" type="button">
            Medium
          </Button>
          <Button data-size="lg" type="button">
            Large
          </Button>
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          With Icons
        </Heading>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)', flexWrap: 'wrap' }}>
          <Button type="button">
            <PlusIcon aria-hidden fontSize="1.25rem" />
            Add
          </Button>
          <Button type="button">
            <FloppydiskIcon aria-hidden fontSize="1.25rem" />
            Save
          </Button>
          <Button type="button">
            Start
            <ArrowRightIcon aria-hidden fontSize="1.25rem" />
          </Button>
          <Button icon aria-label="Edit" type="button">
            <PencilIcon aria-hidden fontSize="1.25rem" />
          </Button>
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          States
        </Heading>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)', flexWrap: 'wrap' }}>
          <Button type="button">Default</Button>
          <Button loading type="button">
            Loading
          </Button>
          <Button disabled type="button">
            Disabled
          </Button>
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          Combined Example
        </Heading>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)', flexWrap: 'wrap' }}>
          <Button variant="primary" data-color="neutral" type="button">
            Publish
          </Button>
          <Button variant="secondary" data-color="neutral" type="button">
            Save draft
          </Button>
          <Button variant="tertiary" data-color="danger" type="button">
            Delete
          </Button>
        </div>
      </div>
    </div>
  ),
};
