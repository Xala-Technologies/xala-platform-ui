import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { SkipLinks } from '../../index';

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

// Wrapper components for stories that need translations
const DefaultDemo = () => {
  const t = useT();
  return (
    <div>
      <SkipLinks />
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <p>{t('storybook.demo.pressTabToSeeSkipLink')}</p>
        <main
          id="main-content"
          style={{
            marginTop: 'var(--ds-spacing-8)',
            padding: 'var(--ds-spacing-4)',
            border: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <h2>{t('storybook.demo.mainContent')}</h2>
          <p>{t('storybook.demo.mainContentDescription')}</p>
        </main>
      </div>
    </div>
  );
};

const CustomLinksDemo = () => {
  const t = useT();
  return (
    <div>
      <SkipLinks
        links={[
          { targetId: 'main-content', label: t('storybook.demo.skipToMainContent') },
          { targetId: 'navigation', label: t('storybook.demo.skipToNavigation') },
        ]}
      />
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <nav
          id="navigation"
          style={{
            marginBottom: 'var(--ds-spacing-4)',
            padding: 'var(--ds-spacing-4)',
            border: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <h2>{t('storybook.demo.navigation')}</h2>
          <ul>
            <li>
              <a href="#">{t('storybook.demo.link')} 1</a>
            </li>
            <li>
              <a href="#">{t('storybook.demo.link')} 2</a>
            </li>
          </ul>
        </nav>
        <main
          id="main-content"
          style={{
            padding: 'var(--ds-spacing-4)',
            border: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <h2>{t('storybook.demo.mainContent')}</h2>
          <p>{t('storybook.demo.mainContentArea')}</p>
        </main>
      </div>
    </div>
  );
};

const EnglishLabelsDemo = () => {
  const t = useT();
  return (
    <div>
      <SkipLinks
        links={[{ targetId: 'main-content', label: t('storybook.demo.skipToMainContent') }]}
      />
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <p>{t('storybook.demo.pressTabEnglishLabels')}</p>
        <main
          id="main-content"
          style={{
            marginTop: 'var(--ds-spacing-8)',
            padding: 'var(--ds-spacing-4)',
            border: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <h2>{t('storybook.demo.mainContent')}</h2>
          <p>{t('storybook.demo.mainContentArea')}</p>
        </main>
      </div>
    </div>
  );
};

const MultipleLinksDemo = () => {
  const t = useT();
  return (
    <div>
      <SkipLinks
        links={[
          { targetId: 'navigation', label: t('storybook.demo.skipToNavigation') },
          { targetId: 'main-content', label: t('storybook.demo.skipToMainContent') },
          { targetId: 'footer', label: t('storybook.demo.skipToFooter') },
        ]}
      />
      <div style={{ padding: 'var(--ds-spacing-4)' }}>
        <nav
          id="navigation"
          style={{
            marginBottom: 'var(--ds-spacing-4)',
            padding: 'var(--ds-spacing-4)',
            border: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <h2>{t('storybook.demo.navigation')}</h2>
        </nav>
        <main
          id="main-content"
          style={{
            marginBottom: 'var(--ds-spacing-4)',
            padding: 'var(--ds-spacing-4)',
            border: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <h2>{t('storybook.demo.mainContent')}</h2>
        </main>
        <footer
          id="footer"
          style={{
            padding: 'var(--ds-spacing-4)',
            border: '1px solid var(--ds-color-neutral-border-subtle)',
          }}
        >
          <h2>{t('storybook.demo.footer')}</h2>
        </footer>
      </div>
    </div>
  );
};

// Default skip links
export const Default: Story = {
  render: function Render() {
    return <DefaultDemo />;
  },
};

// Custom links
export const CustomLinks: Story = {
  render: function Render() {
    return <CustomLinksDemo />;
  },
};

// English labels
export const EnglishLabels: Story = {
  render: function Render() {
    return <EnglishLabelsDemo />;
  },
};

// Multiple skip links
export const MultipleLinks: Story = {
  render: function Render() {
    return <MultipleLinksDemo />;
  },
};
