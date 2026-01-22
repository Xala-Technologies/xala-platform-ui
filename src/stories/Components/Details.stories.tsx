import type { Meta, StoryObj } from '@storybook/react';
import { Details, Paragraph } from '../../index';
import React from 'react';

const meta: Meta = {
  title: 'Components/Details',
  parameters: {
    docs: {
      description: {
        component: `
Details (Accordion) provides collapsible content sections that users can expand or collapse to show or hide information.

## Variants

- **Default** - Standard collapsible section
- **Multiple** - Multiple accordion items
- **Controlled** - Programmatically controlled state
- **Nested** - Accordion within accordion
- **With icons** - Icons indicate expand/collapse state

## When to Use

- FAQ sections and help content
- Additional information that doesn't need to be visible by default
- Complex forms with optional sections
- Progressive disclosure of content
- Product specifications and details
- Terms and conditions sections

## Best Practices

### Do
- Use clear, descriptive summary text
- Keep content sections focused
- Allow only one section open at a time (when related)
- Provide smooth expand/collapse animations
- Use semantic heading structure
- Consider default state carefully

### Don't
- Don't nest accordions too deeply
- Don't use for critical information
- Don't make summaries too long
- Don't hide form validation errors
- Don't use for navigation
- Don't force all sections closed

## Usage Patterns

### Basic Details
\`\`\`tsx
<Details>
  <Details.Summary>Click to expand</Details.Summary>
  <Details.Content>
    <Paragraph>This content appears when expanded.</Paragraph>
  </Details.Content>
</Details>
\`\`\`

### Multiple Sections
\`\`\`tsx
<div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
  <Details>
    <Details.Summary>Getting Started</Details.Summary>
    <Details.Content>
      <Paragraph>Learn how to set up your account.</Paragraph>
    </Details.Content>
  </Details>
  <Details>
    <Details.Summary>Managing ResourceRequests</Details.Summary>
    <Details.Content>
      <Paragraph>View, modify, and cancel resourceRequests.</Paragraph>
    </Details.Content>
  </Details>
</div>
\`\`\`

### Controlled State
\`\`\`tsx
const [isOpen, setIsOpen] = useState(false);

<Details open={isOpen} onToggle={setIsOpen}>
  <Details.Summary>Controlled accordion</Details.Summary>
  <Details.Content>
    <Paragraph>Content controlled by state.</Paragraph>
  </Details.Content>
</Details>
\`\`\`

### Open by Default
\`\`\`tsx
<Details defaultOpen>
  <Details.Summary>Already expanded</Details.Summary>
  <Details.Content>
    <Paragraph>This content is visible by default.</Paragraph>
  </Details.Content>
</Details>
\`\`\`

## Anti-Patterns

### Anti-pattern: Hiding Critical Information
Using accordions to hide important information users need to see.

### Anti-pattern: Too Much Nesting
Deep nesting creates confusing navigation patterns.

### Anti-pattern: Vague Summaries
Using generic text like "Click here" for summaries.

### Anti-pattern: All Sections Closed
Forcing users to open every section to find information.

## Accessibility

### Screen Readers
- Button role announced for summary
- Expanded/collapsed state communicated
- Content visibility changes announced
- Proper heading structure maintained
- State changes clearly indicated

### Keyboard Navigation
- Tab navigates to summary buttons
- Enter/Space toggles expand/collapse
- Focus stays on summary after toggle
- Logical tab order maintained
- All content accessible via keyboard

### WCAG 2.1 AA Compliance
- **Keyboard accessible**: All sections reachable via keyboard
- **State indication**: Expanded/collapsed state clearly shown
- **Focus management**: Focus stays on trigger
- **Semantic structure**: Proper heading hierarchy
- **Content discoverability**: All content can be accessed

### ARIA Implementation
\`\`\`tsx
<details>
  <summary 
    aria-expanded="false" 
    aria-controls="content-1"
    role="button"
    tabindex="0"
  >
    Section Title
  </summary>
  <div id="content-1" role="region" aria-labelledby="summary-1">
    <p>Content goes here.</p>
  </div>
</details>
\`\`\`

### Best Practice for Summaries
Use descriptive, action-oriented text:
\`\`\`tsx
<Details.Summary>View payment options</Details.Summary>
<Details.Summary>Learn about shipping</Details.Summary>
<Details.Summary>Read terms and conditions</Details.Summary>
\`\`\`

### Controlled Accordion Example
\`\`\`tsx
const AccordionGroup = () => {
  const [openSection, setOpenSection] = useState<string | null>(null);

  const handleToggle = (value: string) => {
    setOpenSection(openSection === value ? null : value);
  };

  return (
    <div>
      <Details open={openSection === 'section1'} onToggle={() => handleToggle('section1')}>
        <Details.Summary>Section 1</Details.Summary>
        <Details.Content>Content 1</Details.Content>
      </Details>
      <Details open={openSection === 'section2'} onToggle={() => handleToggle('section2')}>
        <Details.Summary>Section 2</Details.Summary>
        <Details.Content>Content 2</Details.Content>
      </Details>
    </div>
  );
};
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Details>
      <Details.Summary>Click to expand</Details.Summary>
      <Details.Content>
        <Paragraph>This is the hidden content that appears when expanded.</Paragraph>
      </Details.Content>
    </Details>
  ),
};

export const Multiple: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
      <Details>
        <Details.Summary>Section 1: Getting Started</Details.Summary>
        <Details.Content>
          <Paragraph>Learn how to set up your account and make your first resourceRequest.</Paragraph>
        </Details.Content>
      </Details>
      <Details>
        <Details.Summary>Section 2: Managing ResourceRequests</Details.Summary>
        <Details.Content>
          <Paragraph>Learn how to view, modify, and cancel your resourceRequests.</Paragraph>
        </Details.Content>
      </Details>
      <Details>
        <Details.Summary>Section 3: Payment Options</Details.Summary>
        <Details.Content>
          <Paragraph>We accept various payment methods including Vipps and credit cards.</Paragraph>
        </Details.Content>
      </Details>
    </div>
  ),
};

export const OpenByDefault: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(true);
    return (
      <Details open={open} onToggle={() => setOpen(!open)}>
        <Details.Summary>Already expanded</Details.Summary>
        <Details.Content>
          <Paragraph>This content is visible by default because the details is open.</Paragraph>
        </Details.Content>
      </Details>
    );
  },
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <Details data-size="sm">
        <Details.Summary>Small size</Details.Summary>
        <Details.Content>
          <Paragraph>Content for small details.</Paragraph>
        </Details.Content>
      </Details>
      <Details data-size="md">
        <Details.Summary>Medium size (default)</Details.Summary>
        <Details.Content>
          <Paragraph>Content for medium details.</Paragraph>
        </Details.Content>
      </Details>
      <Details data-size="lg">
        <Details.Summary>Large size</Details.Summary>
        <Details.Content>
          <Paragraph>Content for large details.</Paragraph>
        </Details.Content>
      </Details>
    </div>
  ),
};

export const FAQ: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
      <Details>
        <Details.Summary>How do I cancel my resourceRequest?</Details.Summary>
        <Details.Content>
          <Paragraph>
            You can cancel your resourceRequest up to 24 hours before the scheduled time. 
            Go to My ResourceRequests, find the resourceRequest you want to cancel, and click the Cancel button.
          </Paragraph>
        </Details.Content>
      </Details>
      <Details>
        <Details.Summary>What is the refund policy?</Details.Summary>
        <Details.Content>
          <Paragraph>
            Cancellations made more than 48 hours in advance receive a full refund. 
            Cancellations within 24-48 hours receive a 50% refund.
          </Paragraph>
        </Details.Content>
      </Details>
      <Details>
        <Details.Summary>Can I modify my resourceRequest?</Details.Summary>
        <Details.Content>
          <Paragraph>
            Yes, you can modify your resourceRequest up to 24 hours before the scheduled time, 
            subject to availability.
          </Paragraph>
        </Details.Content>
      </Details>
    </div>
  ),
};
