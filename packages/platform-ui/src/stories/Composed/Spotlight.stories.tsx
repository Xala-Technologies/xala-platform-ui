import type { Meta, StoryObj } from '@storybook/react';
import { Spotlight, HighlightText, SearchHighlight } from '../../composed/Spotlight';
import { Card, Paragraph, Button } from '@digdir/designsystemet-react';

const meta: Meta<typeof Spotlight> = {
  title: 'Composed/Spotlight',
  component: Spotlight,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## Spotlight & HighlightText

Text highlighting and spotlight effects for search results and focus states.

### Features
- HighlightText for highlighting search terms
- Spotlight effect for focus/attention
- SearchHighlight with context
- Case-sensitive option
- Custom highlight styles

### Usage
\`\`\`tsx
<HighlightText text="Hello World" highlight="World" />
<Spotlight active={true}>
  <Button>Focused Button</Button>
</Spotlight>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// HighlightText - single term
export const HighlightSingleTerm: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Paragraph data-size="sm">
        <HighlightText text="This is a sample text with highlighted words" highlight="highlighted" />
      </Paragraph>
    </div>
  ),
};

// HighlightText - multiple terms
export const HighlightMultipleTerms: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Paragraph data-size="sm">
        <HighlightText text="Search for keywords in this text" highlight={['search', 'keywords']} />
      </Paragraph>
    </div>
  ),
};

// HighlightText - case sensitive
export const HighlightCaseSensitive: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Paragraph data-size="sm">
        <HighlightText
          text="Case Sensitive Search for Search"
          highlight="Search"
          caseSensitive={true}
        />
      </Paragraph>
    </div>
  ),
};

// HighlightText - custom style
export const HighlightCustomStyle: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <Paragraph data-size="sm">
        <HighlightText
          text="Custom styled highlight"
          highlight="highlight"
          highlightStyle={{
            backgroundColor: 'var(--ds-color-success-surface-subtle)',
            color: 'var(--ds-color-success-text-default)',
            fontWeight: 'bold',
          }}
        />
      </Paragraph>
    </div>
  ),
};

// Spotlight - active
export const SpotlightActive: Story = {
  render: () => (
    <Spotlight active={true}>
      <Card data-color="neutral" data-size="medium" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Paragraph data-size="sm">This card has a spotlight effect</Paragraph>
      </Card>
    </Spotlight>
  ),
};

// Spotlight - inactive
export const SpotlightInactive: Story = {
  render: () => (
    <Spotlight active={false}>
      <Card data-color="neutral" data-size="medium" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Paragraph data-size="sm">This card has no spotlight effect</Paragraph>
      </Card>
    </Spotlight>
  ),
};

// Spotlight - with button
export const SpotlightWithButton: Story = {
  render: () => (
    <Spotlight active={true}>
      <Button data-color="accent" data-size="medium">
        Focused Button
      </Button>
    </Spotlight>
  ),
};

// Spotlight - custom padding
export const SpotlightCustomPadding: Story = {
  render: () => (
    <Spotlight active={true} padding={16}>
      <Card data-color="neutral" data-size="medium" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Paragraph data-size="sm">Custom padding spotlight</Paragraph>
      </Card>
    </Spotlight>
  ),
};

// SearchHighlight - basic
export const SearchHighlightBasic: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <SearchHighlight text="This is a long text that contains the search query somewhere in the middle" query="search query" />
    </div>
  ),
};

// SearchHighlight - with context
export const SearchHighlightWithContext: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <SearchHighlight
        text="This is a very long text that contains multiple instances of the search term. The search term appears here and also later in the text. We want to show context around each match."
        query="search term"
        contextLength={20}
      />
    </div>
  ),
};

// SearchHighlight - max length
export const SearchHighlightMaxLength: Story = {
  render: () => (
    <div style={{ width: '400px' }}>
      <SearchHighlight
        text="This is a very long text that contains the search query somewhere in the middle and continues for a long time"
        query="search query"
        maxLength={50}
      />
    </div>
  ),
};

// Combined example
export const CombinedExample: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)', width: '500px' }}>
      <Card data-color="neutral" data-size="medium" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Paragraph data-size="sm">
          <HighlightText
            text="Search results with highlighted terms"
            highlight={['search', 'highlighted']}
          />
        </Paragraph>
      </Card>
      <Spotlight active={true}>
        <Card data-color="accent" data-size="medium" style={{ padding: 'var(--ds-spacing-4)' }}>
          <Paragraph data-size="sm">This result is highlighted with spotlight</Paragraph>
        </Card>
      </Spotlight>
    </div>
  ),
};
