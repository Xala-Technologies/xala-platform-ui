import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Link, Paragraph } from '../../index';
import { ExternalLinkIcon, ArrowRightIcon, DownloadIcon } from '@navikt/aksel-icons';

/**
 * Link component from Digdir Designsystemet.
 * 
 * Link is clickable text or graphics that take the user to other pages or documents.
 * 
 * @see https://designsystemet.no/en/components/docs/link/overview
 */
const meta: Meta<typeof Link> = {
  title: 'Components/Link',
  component: Link,
  parameters: {
    docs: {
      description: {
        component: `
Link is clickable text or graphics that take the user to other pages or documents. Links provide navigation and access to additional content.

## Variants

- **Default** - Standard link (accent color)
- **Neutral** - Neutral color for special backgrounds
- **Inverted** - For dark backgrounds
- **With icon** - Icon on left or right for visual context
- **In text** - Inline with paragraph text
- **External** - Links to external websites
- **Download** - Links to downloadable content

## Colors

Available colors: **accent**, **neutral**, **inverted**.

## When to Use

- Navigation to other pages or sections
- External resources and references
- In-page anchor links
- Download links for files
- Actions that navigate away
- Email and contact links

## Best Practices

### Do
- Use descriptive link text (not "click here" or "read more")
- Place icons on the left as a general rule
- Make link text meaningful out of context
- Use appropriate link colors for background
- Provide hover and focus states
- Use semantic anchor elements

### Don't
- Don't use generic text like "click here"
- Don't open links in new tabs without user consent
- Don't use external link icons (redundant with proper styling)
- Don't underline non-link text
- Don't use links for actions that don't navigate
- Don't create very long link text

## Usage Patterns

### Basic Link
\`\`\`tsx
<Link href="/page">Navigate to page</Link>
\`\`\`

### Link with Icon
\`\`\`tsx
<Link href="#">
  <ArrowRight aria-hidden />
  Continue
</Link>
\`\`\`

### External Link
\`\`\`tsx
<Link href="https://example.com" target="_blank" rel="noopener noreferrer">
  External resource
</Link>
\`\`\`

### Download Link
\`\`\`tsx
<Link href="/file.pdf" download>
  <Download aria-hidden />
  Download PDF
</Link>
\`\`\`

### Inline Link
\`\`\`tsx
<Paragraph>
  Read more about our <Link href="#">policies</Link> and{' '}
  <Link href="#">terms of service</Link> before continuing.
</Paragraph>
\`\`\`

### Color Variants
\`\`\`tsx
<Link href="#" data-color="accent">Accent link</Link>
<Link href="#" data-color="neutral">Neutral link</Link>
<Link href="#" data-color="inverted">Inverted link</Link>
\`\`\`

## Anti-Patterns

### Anti-pattern: Generic Link Text
Links like "click here" or "read more" don't provide context.

### Anti-pattern: Unnecessary New Tabs
Opening links in new tabs without user expectation breaks navigation flow.

### Anti-pattern: Links for Actions
Using links for actions like "Save" or "Submit" instead of buttons.

### Anti-pattern: Underlined Non-Links
Underlining text that isn't a link confuses users.

## Accessibility

### Screen Readers
- Link text is announced with "link" role
- Purpose should be clear from text alone
- External links are announced when target="_blank"
- Download links are announced when download attribute present

### Keyboard Navigation
- Tab key navigates to links
- Enter key activates link
- Focus indicator is clearly visible
- Tab order follows logical sequence

### WCAG 2.1 AA Compliance
- **Color contrast**: Minimum 4.5:1 for link text
- **Focus indicator**: Visible focus state required
- **Link purpose**: Clear from text or context
- **Keyboard accessible**: All links reachable via keyboard
- **External links**: Warned when opening new windows

### External Links
Always include rel attributes for security:
\`\`\`tsx
<Link href="https://example.com" target="_blank" rel="noopener noreferrer">
  External resource
</Link>
\`\`\`

### Descriptive Link Text
Good: "View all user settings"
Bad: "Click here"

### Links with Icons
Icons should be decorative:
\`\`\`tsx
<Link href="#">
  <Download aria-hidden />
  Download report
</Link>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
  argTypes: {
    'data-color': {
      control: 'select',
      options: ['accent', 'neutral', 'inverted'],
      description: 'Color variant',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => <Link href="#">Default link</Link>,
};

export const InText: Story = {
  render: () => (
    <Paragraph>
      Read more about our <Link href="#">resourceRequest policies</Link> and{' '}
      <Link href="#">terms of service</Link> before making a reservation.
    </Paragraph>
  ),
};

export const External: Story = {
  render: () => (
    <Link href="https://designsystemet.no" target="_blank" rel="noopener noreferrer">
      Designsystemet documentation ↗
    </Link>
  ),
};

/**
 * With icon - Icons can be placed left or right
 */
export const WithIcon: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
      <Link href="https://designsystemet.no/slack">
        <ExternalLinkIcon fontSize="1.25rem" aria-hidden />
        <span>Talk to us on Slack</span>
      </Link>
      <Link href="#">
        <DownloadIcon fontSize="1.25rem" aria-hidden />
        <span>Download report</span>
      </Link>
      <Link href="#">
        <span>Continue reading</span>
        <ArrowRightIcon fontSize="1.25rem" aria-hidden />
      </Link>
    </div>
  ),
};

/**
 * Neutral color - For special backgrounds
 */
export const Neutral: Story = {
  render: () => (
    <Link href="#" data-color="neutral">
      Privacy Policy
    </Link>
  ),
};

/**
 * Inverted - For dark backgrounds
 */
export const Inverted: Story = {
  render: () => (
    <div style={{ 
      backgroundColor: 'var(--ds-color-accent-base-default)', 
      padding: 'var(--ds-spacing-4)',
      borderRadius: 'var(--ds-border-radius-md)',
    }}>
      <Link href="#" data-color="inverted">Inverted link on dark background</Link>
    </div>
  ),
};

/**
 * All variants overview
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
      <div>
        <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>Colors</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
          <Link href="#">Default (accent)</Link>
          <Link href="#" data-color="neutral">Neutral</Link>
          <div style={{ backgroundColor: 'var(--ds-color-accent-base-default)', padding: 'var(--ds-spacing-3)', borderRadius: 'var(--ds-border-radius-md)' }}>
            <Link href="#" data-color="inverted">Inverted</Link>
          </div>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>With Icons</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
          <Link href="#">
            <ExternalLinkIcon fontSize="1.25rem" aria-hidden />
            <span>Icon on left</span>
          </Link>
          <Link href="#">
            <span>Icon on right</span>
            <ArrowRightIcon fontSize="1.25rem" aria-hidden />
          </Link>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>In Text</h3>
        <Paragraph>
          This is a paragraph with an <Link href="#">inline link</Link> that demonstrates how links appear within body text. You can have <Link href="#">multiple links</Link> in the same paragraph.
        </Paragraph>
      </div>

      <div>
        <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>External Links</h3>
        <Link href="https://designsystemet.no" target="_blank" rel="noopener noreferrer">
          Visit Designsystemet
        </Link>
      </div>
    </div>
  ),
};
