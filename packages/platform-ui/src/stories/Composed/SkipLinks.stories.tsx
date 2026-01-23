import type { Meta, StoryObj } from '@storybook/react';
import { SkipLinks } from '../../composed/SkipLinks';

const meta: Meta<typeof SkipLinks> = {
  title: 'Composed/SkipLinks',
  component: SkipLinks,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component: `
## SkipLinks

Accessibility component that provides skip links for keyboard users. Allows users to skip directly to main content or navigation.

### Features
- Keyboard accessible skip links
- Hidden by default, visible on focus
- Customizable links
- Norwegian default labels

### Usage
\`\`\`tsx
<SkipLinks links={[{ targetId: 'main-content', label: 'Skip to main content' }]} />
<main id="main-content">...</main>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Default skip links
export const Default: Story = {
  render: () => (
    <div>
      <SkipLinks />
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <p>
          Press Tab to see the skip link. The link is hidden by default and appears when focused.
        </p>
        <main id="main-content" style={{ marginTop: 'var(--ds-spacing-8)', padding: 'var(--ds-spacing-4)', border: '1px solid var(--ds-color-neutral-border-subtle)' }}>
          <h2>Main Content</h2>
          <p>This is the main content area that the skip link targets.</p>
        </main>
      </div>
    </div>
  ),
};

// Custom links
export const CustomLinks: Story = {
  render: () => (
    <div>
      <SkipLinks
        links={[
          { targetId: 'main-content', label: 'Skip to main content' },
          { targetId: 'navigation', label: 'Skip to navigation' },
        ]}
      />
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <nav id="navigation" style={{ marginBottom: 'var(--ds-spacing-4)', padding: 'var(--ds-spacing-4)', border: '1px solid var(--ds-color-neutral-border-subtle)' }}>
          <h2>Navigation</h2>
          <ul>
            <li><a href="#">Link 1</a></li>
            <li><a href="#">Link 2</a></li>
          </ul>
        </nav>
        <main id="main-content" style={{ padding: 'var(--ds-spacing-4)', border: '1px solid var(--ds-color-neutral-border-subtle)' }}>
          <h2>Main Content</h2>
          <p>This is the main content area.</p>
        </main>
      </div>
    </div>
  ),
};

// English labels
export const EnglishLabels: Story = {
  render: () => (
    <div>
      <SkipLinks
        links={[
          { targetId: 'main-content', label: 'Skip to main content' },
        ]}
      />
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <p>
          Press Tab to see the skip link. The link uses English labels.
        </p>
        <main id="main-content" style={{ marginTop: 'var(--ds-spacing-8)', padding: 'var(--ds-spacing-4)', border: '1px solid var(--ds-color-neutral-border-subtle)' }}>
          <h2>Main Content</h2>
          <p>This is the main content area.</p>
        </main>
      </div>
    </div>
  ),
};

// Multiple skip links
export const MultipleLinks: Story = {
  render: () => (
    <div>
      <SkipLinks
        links={[
          { targetId: 'navigation', label: 'Skip to navigation' },
          { targetId: 'main-content', label: 'Skip to main content' },
          { targetId: 'footer', label: 'Skip to footer' },
        ]}
      />
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <nav id="navigation" style={{ marginBottom: 'var(--ds-spacing-4)', padding: 'var(--ds-spacing-4)', border: '1px solid var(--ds-color-neutral-border-subtle)' }}>
          <h2>Navigation</h2>
        </nav>
        <main id="main-content" style={{ marginBottom: 'var(--ds-spacing-4)', padding: 'var(--ds-spacing-4)', border: '1px solid var(--ds-color-neutral-border-subtle)' }}>
          <h2>Main Content</h2>
        </main>
        <footer id="footer" style={{ padding: 'var(--ds-spacing-4)', border: '1px solid var(--ds-color-neutral-border-subtle)' }}>
          <h2>Footer</h2>
        </footer>
      </div>
    </div>
  ),
};
