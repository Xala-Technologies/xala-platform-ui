import type { Meta, StoryObj } from '@storybook/react';
import React from 'react';
import { useT } from '@xala-technologies/i18n';
import { Button, Spinner } from '../../index';

/**
 * Spinner component from Digdir Designsystemet.
 *
 * Spinner for indicating loading states and async operations.
 *
 * @see https://designsystemet.no/en/components/docs/spinner/overview
 */
const meta: Meta<typeof Spinner> = {
  title: 'Components/Spinner',
  component: Spinner,
  parameters: {
    docs: {
      description: {
        component: `
Spinner is a loading indicator that shows users that content is being loaded or processed. It provides visual feedback during asynchronous operations.

## Variants

- **Default** - Standard spinner
- **With label** - Spinner with descriptive text
- **Inline** - Small spinner for inline loading states
- **Full page** - Centered spinner for page-level loading

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## Colors

Available colors: **neutral**, **accent**.

## When to Use

- Loading data from API or server
- Processing user actions or form submissions
- Waiting for async operations to complete
- Initial page or component load
- Refreshing or updating content
- File uploads or downloads

## Best Practices

### Do
- Always include descriptive aria-label
- Pair with loading text when space allows
- Use appropriate size for context
- Show spinner only when necessary
- Remove spinner when content loads
- Use consistent spinner placement
- Provide estimated time for long operations

### Don't
- Don't use spinner without aria-label
- Don't show spinner for very fast operations (< 300ms)
- Don't use multiple spinners in same view
- Don't block entire interface unnecessarily
- Don't use spinner as decoration
- Don't forget to remove spinner on error

## Usage Patterns

### Basic Spinner
\`\`\`tsx
<Spinner aria-label="Loading content" />
\`\`\`

### Spinner with Text
\`\`\`tsx
<div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
  <Spinner data-size="sm" aria-label="Loading" />
  <span>Loading content...</span>
</div>
\`\`\`

### Inline Spinner (in button)
\`\`\`tsx
<Button disabled>
  <Spinner data-size="sm" aria-label="Saving" />
  Saving...
</Button>
\`\`\`

### Full Page Loading
\`\`\`tsx
<div style={{
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  minHeight: '400px'
}}>
  <Spinner data-size="lg" aria-label="Loading page" />
</div>
\`\`\`

### Size Variants
\`\`\`tsx
<Spinner data-size="sm" aria-label="Loading" />
<Spinner data-size="md" aria-label="Loading" />
<Spinner data-size="lg" aria-label="Loading" />
\`\`\`

## Anti-Patterns

### Anti-pattern: No Accessible Label
Spinners without aria-label leave screen reader users without feedback.

### Anti-pattern: Spinner for Fast Operations
Showing spinner for operations under 300ms creates unnecessary visual noise.

### Anti-pattern: Multiple Spinners
Multiple spinners in one view confuses users about what's loading.

### Anti-pattern: Permanent Spinners
Forgetting to remove spinner on completion or error frustrates users.

## Accessibility

### Screen Readers
- Spinner role is announced as "loading" or "busy"
- aria-label provides context about what's loading
- Loading state is announced to screen readers
- Completion should be announced via aria-live region

### WCAG 2.1 AA Compliance
- **Text alternative**: aria-label required for all spinners
- **Status messages**: Loading state communicated to assistive technology
- **Focus management**: Focus should not be trapped during loading
- **Timeout**: Provide way to cancel long operations
- **Color not sole indicator**: Animation provides loading indication

### Spinner with Context
Provide specific loading context:
\`\`\`tsx
<Spinner aria-label="Loading user profile data" />
\`\`\`

### Announcing Completion
Announce when loading completes:
\`\`\`tsx
{isLoading ? (
  <Spinner aria-label="Loading content" />
) : (
  <div role="status" aria-live="polite">
    Content loaded successfully
  </div>
)}
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
  render: function Render() {
    const t = useT();
    return <Spinner aria-label={t('platform.common.loading')} />;
  },
};

export const WithLabel: Story = {
  render: function Render() {
    const t = useT();
    return <Spinner aria-label={t('storybook.demo.loadingContent')} />;
  },
};

export const Sizes: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)', alignItems: 'center' }}>
        <Spinner data-size="sm" aria-label={t('platform.common.loading')} />
        <Spinner data-size="md" aria-label={t('platform.common.loading')} />
        <Spinner data-size="lg" aria-label={t('platform.common.loading')} />
      </div>
    );
  },
};

export const Colors: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)', alignItems: 'center' }}>
        <Spinner data-color="neutral" aria-label={t('platform.common.loading')} />
        <Spinner data-color="accent" aria-label={t('platform.common.loading')} />
      </div>
    );
  },
};

export const InButton: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Button loading disabled type="button">
        {t('platform.common.loading')}...
      </Button>
    );
  },
};

export const LoadingState: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 'var(--ds-spacing-4)',
          padding: 'var(--ds-spacing-10)',
          border: '1px dashed var(--ds-color-neutral-border-default)',
          borderRadius: 'var(--ds-border-radius-lg)',
        }}
      >
        <Spinner data-size="lg" aria-label={t('storybook.demo.loadingData')} />
        <span style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
          {t('storybook.demo.loadingData')}...
        </span>
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
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)', alignItems: 'center' }}>
            <Spinner data-size="sm" aria-label={t('storybook.demo.smallSpinner')} />
            <Spinner data-size="md" aria-label={t('storybook.demo.mediumSpinner')} />
            <Spinner data-size="lg" aria-label={t('storybook.demo.largeSpinner')} />
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>
            {t('storybook.story.colors')}
          </h3>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)', alignItems: 'center' }}>
            <Spinner data-color="neutral" aria-label={t('storybook.demo.neutralSpinner')} />
            <Spinner data-color="accent" aria-label={t('storybook.demo.accentSpinner')} />
          </div>
        </div>
        <div>
          <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>
            {t('storybook.story.inButton')}
          </h3>
          <Button loading disabled type="button">
            {t('platform.common.loading')}...
          </Button>
        </div>
      </div>
    );
  },
};
