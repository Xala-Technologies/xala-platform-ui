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
  render: function Render() {
    return (
      <Details>
        <Details.Summary>"Eksempel Tekst"</Details.Summary>
        <Details.Content>
          <Paragraph>"Eksempel Tekst"</Paragraph>
        </Details.Content>
      </Details>
    );
  },
};

export const Multiple: Story = {
  render: function Render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
        <Details>
          <Details.Summary>"Eksempel Tekst"</Details.Summary>
          <Details.Content>
            <Paragraph>"Eksempel Tekst"</Paragraph>
          </Details.Content>
        </Details>
        <Details>
          <Details.Summary>"Eksempel Tekst"</Details.Summary>
          <Details.Content>
            <Paragraph>"Eksempel Tekst"</Paragraph>
          </Details.Content>
        </Details>
        <Details>
          <Details.Summary>"Eksempel Tekst"</Details.Summary>
          <Details.Content>
            <Paragraph>"Eksempel Tekst"</Paragraph>
          </Details.Content>
        </Details>
      </div>
    );
  },
};

export const OpenByDefault: Story = {
  render: function Render() {
    const [open, setOpen] = React.useState(true);
    return (
      <Details open={open} onToggle={() => setOpen(!open)}>
        <Details.Summary>"Eksempel Tekst"</Details.Summary>
        <Details.Content>
          <Paragraph>"Eksempel Tekst"</Paragraph>
        </Details.Content>
      </Details>
    );
  },
};

export const Sizes: Story = {
  render: function Render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Details data-size="sm">
          <Details.Summary>"Eksempel Tekst"</Details.Summary>
          <Details.Content>
            <Paragraph>"Eksempel Tekst"</Paragraph>
          </Details.Content>
        </Details>
        <Details data-size="md">
          <Details.Summary>"Eksempel Tekst"</Details.Summary>
          <Details.Content>
            <Paragraph>"Eksempel Tekst"</Paragraph>
          </Details.Content>
        </Details>
        <Details data-size="lg">
          <Details.Summary>"Eksempel Tekst"</Details.Summary>
          <Details.Content>
            <Paragraph>"Eksempel Tekst"</Paragraph>
          </Details.Content>
        </Details>
      </div>
    );
  },
};

export const FAQ: Story = {
  render: function Render() {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
        <Details>
          <Details.Summary>"Eksempel Tekst"</Details.Summary>
          <Details.Content>
            <Paragraph>"Eksempel Tekst"</Paragraph>
          </Details.Content>
        </Details>
        <Details>
          <Details.Summary>"Eksempel Tekst"</Details.Summary>
          <Details.Content>
            <Paragraph>"Eksempel Tekst"</Paragraph>
          </Details.Content>
        </Details>
        <Details>
          <Details.Summary>"Eksempel Tekst"</Details.Summary>
          <Details.Content>
            <Paragraph>"Eksempel Tekst"</Paragraph>
          </Details.Content>
        </Details>
      </div>
    );
  },
};
