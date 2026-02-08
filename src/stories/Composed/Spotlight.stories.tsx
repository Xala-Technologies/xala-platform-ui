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

// Wrapper components for stories that need translations
const HighlightSingleTermDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <Paragraph data-size="sm">
        <HighlightText
          text="Eksempel Tekst"
          highlight="Eksempel Tekst"
        />
      </Paragraph>
    </div>
  );
};

const HighlightMultipleTermsDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <Paragraph data-size="sm">
        <HighlightText
          text="Eksempel Tekst"
          highlight={[t('platform.common.search'), t('storybook.demo.keywords')]}
        />
      </Paragraph>
    </div>
  );
};

const HighlightCaseSensitiveDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <Paragraph data-size="sm">
        <HighlightText
          text="Eksempel Tekst"
          highlight={t('platform.common.search')}
          caseSensitive={true}
        />
      </Paragraph>
    </div>
  );
};

const HighlightCustomStyleDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <Paragraph data-size="sm">
        <HighlightText
          text="Eksempel Tekst"
          highlight="Eksempel Tekst"
          highlightStyle={{
            backgroundColor: 'var(--ds-color-success-surface-subtle)',
            color: 'var(--ds-color-success-text-default)',
            fontWeight: 'bold',
          }}
        />
      </Paragraph>
    </div>
  );
};

const SpotlightActiveDemo = () => {
  const t = useT();
  return (
    <Spotlight active={true}>
      <Card data-color="neutral" data-size="medium" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
      </Card>
    </Spotlight>
  );
};

const SpotlightInactiveDemo = () => {
  const t = useT();
  return (
    <Spotlight active={false}>
      <Card data-color="neutral" data-size="medium" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
      </Card>
    </Spotlight>
  );
};

const SpotlightWithButtonDemo = () => {
  const t = useT();
  return (
    <Spotlight active={true}>
      <Button data-color="accent" data-size="medium">
        "Eksempel Tekst"
      </Button>
    </Spotlight>
  );
};

const SpotlightCustomPaddingDemo = () => {
  const t = useT();
  return (
    <Spotlight active={true} padding={16}>
      <Card data-color="neutral" data-size="medium" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
      </Card>
    </Spotlight>
  );
};

const SearchHighlightBasicDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <SearchHighlight
        text="Eksempel Tekst"
        query="Eksempel Tekst"
      />
    </div>
  );
};

const SearchHighlightWithContextDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <SearchHighlight
        text="Eksempel Tekst"
        query="Eksempel Tekst"
        contextLength={20}
      />
    </div>
  );
};

const SearchHighlightMaxLengthDemo = () => {
  const t = useT();
  return (
    <div style={{ width: '400px' }}>
      <SearchHighlight
        text="Eksempel Tekst"
        query="Eksempel Tekst"
        maxLength={50}
      />
    </div>
  );
};

const CombinedExampleDemo = () => {
  const t = useT();
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-4)',
        width: '500px',
      }}
    >
      <Card data-color="neutral" data-size="medium" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Paragraph data-size="sm">
          <HighlightText
            text="Eksempel Tekst"
            highlight={[t('platform.common.search'), t('storybook.demo.highlighted')]}
          />
        </Paragraph>
      </Card>
      <Spotlight active={true}>
        <Card data-color="accent" data-size="medium" style={{ padding: 'var(--ds-spacing-4)' }}>
          <Paragraph data-size="sm">"Eksempel Tekst"</Paragraph>
        </Card>
      </Spotlight>
    </div>
  );
};

// HighlightText - single term
export const HighlightSingleTerm: Story = {
  render: function Render() {
    return <HighlightSingleTermDemo />;
  },
};

// HighlightText - multiple terms
export const HighlightMultipleTerms: Story = {
  render: function Render() {
    return <HighlightMultipleTermsDemo />;
  },
};

// HighlightText - case sensitive
export const HighlightCaseSensitive: Story = {
  render: function Render() {
    return <HighlightCaseSensitiveDemo />;
  },
};

// HighlightText - custom style
export const HighlightCustomStyle: Story = {
  render: function Render() {
    return <HighlightCustomStyleDemo />;
  },
};

// Spotlight - active
export const SpotlightActive: Story = {
  render: function Render() {
    return <SpotlightActiveDemo />;
  },
};

// Spotlight - inactive
export const SpotlightInactive: Story = {
  render: function Render() {
    return <SpotlightInactiveDemo />;
  },
};

// Spotlight - with button
export const SpotlightWithButton: Story = {
  render: function Render() {
    return <SpotlightWithButtonDemo />;
  },
};

// Spotlight - custom padding
export const SpotlightCustomPadding: Story = {
  render: function Render() {
    return <SpotlightCustomPaddingDemo />;
  },
};

// SearchHighlight - basic
export const SearchHighlightBasic: Story = {
  render: function Render() {
    return <SearchHighlightBasicDemo />;
  },
};

// SearchHighlight - with context
export const SearchHighlightWithContext: Story = {
  render: function Render() {
    return <SearchHighlightWithContextDemo />;
  },
};

// SearchHighlight - max length
export const SearchHighlightMaxLength: Story = {
  render: function Render() {
    return <SearchHighlightMaxLengthDemo />;
  },
};

// Combined example
export const CombinedExample: Story = {
  render: function Render() {
    return <CombinedExampleDemo />;
  },
};
