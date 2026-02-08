import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { Button, Card, Heading, Paragraph } from '../../index';

const meta: Meta = {
  title: 'Fundamentals/Best Practices',
  parameters: {
    docs: {
      description: {
        component: `
# Best Practices

Guidelines for building maintainable, scalable applications with the platform.

## Core Principles
- **Design Tokens First**: Always use tokens, never hardcode
- **Component Composition**: Build with platform components
- **Accessibility**: WCAG 2.1 AA compliance
- **i18n**: All text must be translatable
- **SDK-First**: Never bypass the SDK

## Architecture
- Thin app architecture
- Feature flags for domain logic
- Multi-tenancy support
- RBAC enforcement
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/**
 * Best Practice 1: Design Tokens
 */
export const DesignTokens: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
        <Card style={{ flex: 1, minWidth: '300px', padding: 'var(--ds-spacing-6)' }}>
          <Heading
            level={4}
            data-size="sm"
            style={{
              color: 'var(--ds-color-danger-text-default)',
              marginBottom: 'var(--ds-spacing-4)',
            }}
          >
            {t('storybook.bestPractices.dont')} {t('storybook.bestPractices.hardcodedValues')}
          </Heading>
          <pre
            style={{
              padding: 'var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-neutral-surface-hover)',
              borderRadius: 'var(--ds-border-radius-sm)',
              fontSize: 'var(--ds-font-size-xs)',
              overflow: 'auto',
            }}
          >
            {`<div style={{
  padding: '24px',
  color: '#333',
  fontSize: '16px'
}}>
  Content
</div>`}
          </pre>
        </Card>

        <Card style={{ flex: 1, minWidth: '300px', padding: 'var(--ds-spacing-6)' }}>
          <Heading
            level={4}
            data-size="sm"
            style={{
              color: 'var(--ds-color-success-text-default)',
              marginBottom: 'var(--ds-spacing-4)',
            }}
          >
            {t('storybook.bestPractices.do')} {t('storybook.bestPractices.designTokens')}
          </Heading>
          <pre
            style={{
              padding: 'var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-neutral-surface-hover)',
              borderRadius: 'var(--ds-border-radius-sm)',
              fontSize: 'var(--ds-font-size-xs)',
              overflow: 'auto',
            }}
          >
            {`<div style={{
  padding: 'var(--ds-spacing-6)',
  color: 'var(--ds-color-neutral-text-default)',
  fontSize: 'var(--ds-font-size-md)'
}}>
  Content
</div>`}
          </pre>
        </Card>
      </div>
    );
  },
};

/**
 * Best Practice 2: Component Composition
 */
export const ComponentComposition: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
        <Card style={{ flex: 1, minWidth: '300px', padding: 'var(--ds-spacing-6)' }}>
          <Heading
            level={4}
            data-size="sm"
            style={{
              color: 'var(--ds-color-danger-text-default)',
              marginBottom: 'var(--ds-spacing-4)',
            }}
          >
            {t('storybook.bestPractices.dont')} {t('storybook.bestPractices.customImplementation')}
          </Heading>
          <pre
            style={{
              padding: 'var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-neutral-surface-hover)',
              borderRadius: 'var(--ds-border-radius-sm)',
              fontSize: 'var(--ds-font-size-xs)',
              overflow: 'auto',
            }}
          >
            {`<div className="custom-button">
  Click me
</div>

// Custom CSS
.custom-button {
  padding: 12px 24px;
  background: blue;
}`}
          </pre>
        </Card>

        <Card style={{ flex: 1, minWidth: '300px', padding: 'var(--ds-spacing-6)' }}>
          <Heading
            level={4}
            data-size="sm"
            style={{
              color: 'var(--ds-color-success-text-default)',
              marginBottom: 'var(--ds-spacing-4)',
            }}
          >
            {t('storybook.bestPractices.do')} {t('storybook.bestPractices.platformComponents')}
          </Heading>
          <pre
            style={{
              padding: 'var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-neutral-surface-hover)',
              borderRadius: 'var(--ds-border-radius-sm)',
              fontSize: 'var(--ds-font-size-xs)',
              overflow: 'auto',
            }}
          >
            {`import { Button } from '../../index';

<Button data-variant="primary">
  Click me
</Button>`}
          </pre>
        </Card>
      </div>
    );
  },
};

/**
 * Best Practice 3: i18n
 */
export const Internationalization: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
        <Card style={{ flex: 1, minWidth: '300px', padding: 'var(--ds-spacing-6)' }}>
          <Heading
            level={4}
            data-size="sm"
            style={{
              color: 'var(--ds-color-danger-text-default)',
              marginBottom: 'var(--ds-spacing-4)',
            }}
          >
            {t('storybook.bestPractices.dont')} {t('storybook.bestPractices.hardcodedText')}
          </Heading>
          <pre
            style={{
              padding: 'var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-neutral-surface-hover)',
              borderRadius: 'var(--ds-border-radius-sm)',
              fontSize: 'var(--ds-font-size-xs)',
              overflow: 'auto',
            }}
          >
            {`<Button>
  Save Changes
</Button>

<p>Welcome to the app</p>`}
          </pre>
        </Card>

        <Card style={{ flex: 1, minWidth: '300px', padding: 'var(--ds-spacing-6)' }}>
          <Heading
            level={4}
            data-size="sm"
            style={{
              color: 'var(--ds-color-success-text-default)',
              marginBottom: 'var(--ds-spacing-4)',
            }}
          >
            {t('storybook.bestPractices.do')} {t('storybook.bestPractices.translatedText')}
          </Heading>
          <pre
            style={{
              padding: 'var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-neutral-surface-hover)',
              borderRadius: 'var(--ds-border-radius-sm)',
              fontSize: 'var(--ds-font-size-xs)',
              overflow: 'auto',
            }}
          >
            {`const { t } = useTranslation();

<Button>
  {t('common.saveChanges')}
</Button>

<p>{t('welcome.message')}</p>`}
          </pre>
        </Card>
      </div>
    );
  },
};

/**
 * Best Practice 4: SDK-First
 */
export const SDKFirst: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
        <Card style={{ flex: 1, minWidth: '300px', padding: 'var(--ds-spacing-6)' }}>
          <Heading
            level={4}
            data-size="sm"
            style={{
              color: 'var(--ds-color-danger-text-default)',
              marginBottom: 'var(--ds-spacing-4)',
            }}
          >
            {t('storybook.bestPractices.dont')} {t('storybook.bestPractices.directApiCalls')}
          </Heading>
          <pre
            style={{
              padding: 'var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-neutral-surface-hover)',
              borderRadius: 'var(--ds-border-radius-sm)',
              fontSize: 'var(--ds-font-size-xs)',
              overflow: 'auto',
            }}
          >
            {`const response = await fetch(
  '/api/users',
  {
    method: 'GET',
    headers: { ... }
  }
);`}
          </pre>
        </Card>

        <Card style={{ flex: 1, minWidth: '300px', padding: 'var(--ds-spacing-6)' }}>
          <Heading
            level={4}
            data-size="sm"
            style={{
              color: 'var(--ds-color-success-text-default)',
              marginBottom: 'var(--ds-spacing-4)',
            }}
          >
            {t('storybook.bestPractices.do')} {t('storybook.bestPractices.sdkMethods')}
          </Heading>
          <pre
            style={{
              padding: 'var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-neutral-surface-hover)',
              borderRadius: 'var(--ds-border-radius-sm)',
              fontSize: 'var(--ds-font-size-xs)',
              overflow: 'auto',
            }}
          >
            {`import { sdk } from '@xala-technologies/platform/sdk';

const users = await sdk.users.list();`}
          </pre>
        </Card>
      </div>
    );
  },
};

/**
 * Best Practice 5: Error Handling
 */
export const ErrorHandling: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
        <Card style={{ flex: 1, minWidth: '300px', padding: 'var(--ds-spacing-6)' }}>
          <Heading
            level={4}
            data-size="sm"
            style={{
              color: 'var(--ds-color-danger-text-default)',
              marginBottom: 'var(--ds-spacing-4)',
            }}
          >
            {t('storybook.bestPractices.dont')} {t('storybook.bestPractices.noErrorHandling')}
          </Heading>
          <pre
            style={{
              padding: 'var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-neutral-surface-hover)',
              borderRadius: 'var(--ds-border-radius-sm)',
              fontSize: 'var(--ds-font-size-xs)',
              overflow: 'auto',
            }}
          >
            {`const data = await sdk.users.list();
setUsers(data);`}
          </pre>
        </Card>

        <Card style={{ flex: 1, minWidth: '300px', padding: 'var(--ds-spacing-6)' }}>
          <Heading
            level={4}
            data-size="sm"
            style={{
              color: 'var(--ds-color-success-text-default)',
              marginBottom: 'var(--ds-spacing-4)',
            }}
          >
            {t('storybook.bestPractices.do')} {t('storybook.bestPractices.properErrorHandling')}
          </Heading>
          <pre
            style={{
              padding: 'var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-neutral-surface-hover)',
              borderRadius: 'var(--ds-border-radius-sm)',
              fontSize: 'var(--ds-font-size-xs)',
              overflow: 'auto',
            }}
          >
            {`try {
  const data = await sdk.users.list();
  setUsers(data);
} catch (error) {
  console.error(error);
  showError(t('errors.loadFailed'));
}`}
          </pre>
        </Card>
      </div>
    );
  },
};

/**
 * Best Practices Summary
 */
export const Summary: Story = {
  render: function Render() {
    const t = useT();

    const practices = [
      {
        title: t('storybook.bestPractices.designTokens'),
        dos: [
          t('storybook.bestPractices.useTokens'),
          t('storybook.bestPractices.consistentSpacing'),
          t('storybook.bestPractices.themeAwareStyling'),
        ],
        donts: [
          t('storybook.bestPractices.hardcodedPixels'),
          t('storybook.bestPractices.hexColors'),
          t('storybook.bestPractices.magicNumbers'),
        ],
      },
      {
        title: t('storybook.bestPractices.components'),
        dos: [
          t('storybook.bestPractices.usePlatformComponents'),
          t('storybook.bestPractices.composePatterns'),
          t('storybook.bestPractices.followDesignsystemet'),
        ],
        donts: [
          t('storybook.bestPractices.customImplementations'),
          t('storybook.bestPractices.inlineStyles'),
          t('storybook.bestPractices.rawHtmlElements'),
        ],
      },
      {
        title: t('storybook.a11y.title'),
        dos: [
          t('storybook.a11y.keyboardNavigation'),
          t('storybook.a11y.ariaLabels'),
          t('storybook.a11y.colorContrast'),
        ],
        donts: [
          t('storybook.bestPractices.mouseOnlyInteractions'),
          t('storybook.bestPractices.missingLabels'),
          t('storybook.bestPractices.poorContrast'),
        ],
      },
      {
        title: t('storybook.bestPractices.internationalization'),
        dos: [
          t('storybook.bestPractices.useTFunction'),
          t('storybook.bestPractices.supportRtl'),
          t('storybook.bestPractices.formatDatesNumbers'),
        ],
        donts: [
          t('storybook.bestPractices.hardcodedStrings'),
          t('storybook.bestPractices.englishOnly'),
          t('storybook.bestPractices.localeAssumptions'),
        ],
      },
    ];

    return (
      <Card style={{ padding: 'var(--ds-spacing-8)', maxWidth: '800px' }}>
        <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
          {t('storybook.bestPractices.summary')}
        </Heading>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-6)' }}>
          {practices.map(({ title, dos, donts }) => (
            <div
              key={title}
              style={{
                padding: 'var(--ds-spacing-6)',
                backgroundColor: 'var(--ds-color-neutral-surface-default)',
                borderRadius: 'var(--ds-border-radius-lg)',
                border: '1px solid var(--ds-color-neutral-border-default)',
              }}
            >
              <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                {title}
              </Heading>

              <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                <Paragraph
                  data-size="sm"
                  style={{
                    fontWeight: 600,
                    marginBottom: 'var(--ds-spacing-2)',
                    color: 'var(--ds-color-success-text-default)',
                  }}
                >
                  {t('storybook.bestPractices.do')}:
                </Paragraph>
                {dos.map((item, i) => (
                  <Paragraph
                    key={i}
                    data-size="sm"
                    style={{
                      marginLeft: 'var(--ds-spacing-4)',
                      marginBottom: 'var(--ds-spacing-1)',
                    }}
                  >
                    {item}
                  </Paragraph>
                ))}
              </div>

              <div>
                <Paragraph
                  data-size="sm"
                  style={{
                    fontWeight: 600,
                    marginBottom: 'var(--ds-spacing-2)',
                    color: 'var(--ds-color-danger-text-default)',
                  }}
                >
                  {t('storybook.bestPractices.dont')}:
                </Paragraph>
                {donts.map((item, i) => (
                  <Paragraph
                    key={i}
                    data-size="sm"
                    style={{
                      marginLeft: 'var(--ds-spacing-4)',
                      marginBottom: 'var(--ds-spacing-1)',
                    }}
                  >
                    {item}
                  </Paragraph>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>
    );
  },
};
