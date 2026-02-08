import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { Heading, Paragraph, Label, Link } from '../../index';

const meta: Meta = {
  title: 'Components/Typography',
  parameters: {
    docs: {
      description: {
        component: `
Typography components for text styling.

## Components
- **Heading**: Page and section headings (h1-h6)
- **Paragraph**: Body text
- **Label**: Form labels and captions
- **Link**: Inline links

## Best Practices
- Use semantic heading levels (h1 -> h2 -> h3)
- Don't skip heading levels
- Use data-size to adjust visual size
- Keep paragraphs concise
- Use lead paragraphs for introductions

## Accessibility
- Semantic heading levels
- Proper text hierarchy
- Link styling for visibility
- Sufficient contrast
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Headings: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Heading level={1}>"Eksempel Tekst" 1</Heading>
        <Heading level={2}>"Eksempel Tekst" 2</Heading>
        <Heading level={3}>"Eksempel Tekst" 3</Heading>
        <Heading level={4}>"Eksempel Tekst" 4</Heading>
        <Heading level={5}>"Eksempel Tekst" 5</Heading>
        <Heading level={6}>"Eksempel Tekst" 6</Heading>
      </div>
    );
  },
};

export const HeadingSizes: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Heading level={2} data-size="2xs">
          2XS "Eksempel Tekst"
        </Heading>
        <Heading level={2} data-size="xs">
          XS "Eksempel Tekst"
        </Heading>
        <Heading level={2} data-size="sm">
          SM "Eksempel Tekst"
        </Heading>
        <Heading level={2} data-size="md">
          MD "Eksempel Tekst"
        </Heading>
        <Heading level={2} data-size="lg">
          LG "Eksempel Tekst"
        </Heading>
        <Heading level={2} data-size="xl">
          XL "Eksempel Tekst"
        </Heading>
        <Heading level={2} data-size="2xl">
          2XL "Eksempel Tekst"
        </Heading>
      </div>
    );
  },
};

export const Paragraphs: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Paragraph data-size="sm">
          "Eksempel Tekst". "Eksempel Tekst"
        </Paragraph>
        <Paragraph data-size="md">
          "Eksempel Tekst". "Eksempel Tekst"
        </Paragraph>
        <Paragraph data-size="lg">
          "Eksempel Tekst". "Eksempel Tekst"
        </Paragraph>
      </div>
    );
  },
};

export const LeadParagraph: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Heading level={1}>"Eksempel Tekst"</Heading>
        <Paragraph data-size="lg">"Eksempel Tekst"</Paragraph>
        <Paragraph>"Eksempel Tekst"</Paragraph>
      </div>
    );
  },
};

export const Labels: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <Label data-size="sm">"Eksempel Tekst"</Label>
        <Label data-size="md">"Eksempel Tekst"</Label>
        <Label data-size="lg">"Eksempel Tekst"</Label>
      </div>
    );
  },
};

export const InlineLink: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Paragraph>
        "Eksempel Tekst"{' '}
        <Link href="#">"Eksempel Tekst"</Link> "Eksempel Tekst"{' '}
        <Link href="#">"Eksempel Tekst"</Link>{' '}
        "Eksempel Tekst"
      </Paragraph>
    );
  },
};

export const CombinedExample: Story = {
  render: function Render() {
    const t = useT();
    return (
      <article>
        <Heading level={1} data-size="xl">
          "Eksempel Tekst"
        </Heading>
        <Paragraph data-size="lg">"Eksempel Tekst"</Paragraph>
        <Heading level={2} data-size="md">
          "Eksempel Tekst"
        </Heading>
        <Paragraph>
          "Eksempel Tekst" <Link href="#">"Eksempel Tekst"</Link>
          , "Eksempel Tekst".
        </Paragraph>
        <Heading level={2} data-size="md">
          "Eksempel Tekst"
        </Heading>
        <Paragraph>
          "Eksempel Tekst". "Eksempel Tekst"{' '}
          <Link href="#">"Eksempel Tekst"</Link> "Eksempel Tekst"{' '}
          <Link href="#">"Eksempel Tekst"</Link>.
        </Paragraph>
      </article>
    );
  },
};

export const AllVariants: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>
            "Eksempel Tekst"
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
            <Heading level={1} data-size="lg">
              H1 "Eksempel Tekst"
            </Heading>
            <Heading level={2} data-size="md">
              H2 "Eksempel Tekst"
            </Heading>
            <Heading level={3} data-size="sm">
              H3 "Eksempel Tekst"
            </Heading>
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>
            "Eksempel Tekst"
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
            <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
            <Paragraph data-size="md">"Eksempel Tekst"</Paragraph>
            <Paragraph data-size="lg">"Eksempel Tekst"</Paragraph>
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>
            "Eksempel Tekst"
          </h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
            <Label data-size="sm">"Eksempel Tekst"</Label>
            <Label data-size="md">"Eksempel Tekst"</Label>
            <Label data-size="lg">"Eksempel Tekst"</Label>
          </div>
        </div>
      </div>
    );
  },
};
