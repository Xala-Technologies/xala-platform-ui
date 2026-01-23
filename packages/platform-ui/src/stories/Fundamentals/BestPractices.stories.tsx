import type { Meta, StoryObj } from '@storybook/react';
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
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
      <Card style={{ flex: 1, minWidth: '300px', padding: 'var(--ds-spacing-6)' }}>
        <Heading level={4} data-size="sm" style={{ 
          color: 'var(--ds-color-danger-text-default)',
          marginBottom: 'var(--ds-spacing-4)',
        }}>
          ❌ Hardcoded Values
        </Heading>
        <pre style={{ 
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto',
        }}>
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
        <Heading level={4} data-size="sm" style={{ 
          color: 'var(--ds-color-success-text-default)',
          marginBottom: 'var(--ds-spacing-4)',
        }}>
          ✅ Design Tokens
        </Heading>
        <pre style={{ 
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto',
        }}>
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
  ),
};

/**
 * Best Practice 2: Component Composition
 */
export const ComponentComposition: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
      <Card style={{ flex: 1, minWidth: '300px', padding: 'var(--ds-spacing-6)' }}>
        <Heading level={4} data-size="sm" style={{ 
          color: 'var(--ds-color-danger-text-default)',
          marginBottom: 'var(--ds-spacing-4)',
        }}>
          ❌ Custom Implementation
        </Heading>
        <pre style={{ 
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto',
        }}>
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
        <Heading level={4} data-size="sm" style={{ 
          color: 'var(--ds-color-success-text-default)',
          marginBottom: 'var(--ds-spacing-4)',
        }}>
          ✅ Platform Components
        </Heading>
        <pre style={{ 
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto',
        }}>
{`import { Button } from '../../index';

<Button data-variant="primary">
  Click me
</Button>`}
        </pre>
      </Card>
    </div>
  ),
};

/**
 * Best Practice 3: i18n
 */
export const Internationalization: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
      <Card style={{ flex: 1, minWidth: '300px', padding: 'var(--ds-spacing-6)' }}>
        <Heading level={4} data-size="sm" style={{ 
          color: 'var(--ds-color-danger-text-default)',
          marginBottom: 'var(--ds-spacing-4)',
        }}>
          ❌ Hardcoded Text
        </Heading>
        <pre style={{ 
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto',
        }}>
{`<Button>
  Save Changes
</Button>

<p>Welcome to the app</p>`}
        </pre>
      </Card>

      <Card style={{ flex: 1, minWidth: '300px', padding: 'var(--ds-spacing-6)' }}>
        <Heading level={4} data-size="sm" style={{ 
          color: 'var(--ds-color-success-text-default)',
          marginBottom: 'var(--ds-spacing-4)',
        }}>
          ✅ Translated Text
        </Heading>
        <pre style={{ 
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto',
        }}>
{`const { t } = useTranslation();

<Button>
  {t('common.saveChanges')}
</Button>

<p>{t('welcome.message')}</p>`}
        </pre>
      </Card>
    </div>
  ),
};

/**
 * Best Practice 4: SDK-First
 */
export const SDKFirst: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
      <Card style={{ flex: 1, minWidth: '300px', padding: 'var(--ds-spacing-6)' }}>
        <Heading level={4} data-size="sm" style={{ 
          color: 'var(--ds-color-danger-text-default)',
          marginBottom: 'var(--ds-spacing-4)',
        }}>
          ❌ Direct API Calls
        </Heading>
        <pre style={{ 
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto',
        }}>
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
        <Heading level={4} data-size="sm" style={{ 
          color: 'var(--ds-color-success-text-default)',
          marginBottom: 'var(--ds-spacing-4)',
        }}>
          ✅ SDK Methods
        </Heading>
        <pre style={{ 
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto',
        }}>
{`import { sdk } from '@xala-technologies/platform/sdk';

const users = await sdk.users.list();`}
        </pre>
      </Card>
    </div>
  ),
};

/**
 * Best Practice 5: Error Handling
 */
export const ErrorHandling: Story = {
  render: () => (
    <div style={{ display: 'flex', gap: 'var(--ds-spacing-6)', flexWrap: 'wrap' }}>
      <Card style={{ flex: 1, minWidth: '300px', padding: 'var(--ds-spacing-6)' }}>
        <Heading level={4} data-size="sm" style={{ 
          color: 'var(--ds-color-danger-text-default)',
          marginBottom: 'var(--ds-spacing-4)',
        }}>
          ❌ No Error Handling
        </Heading>
        <pre style={{ 
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto',
        }}>
{`const data = await sdk.users.list();
setUsers(data);`}
        </pre>
      </Card>

      <Card style={{ flex: 1, minWidth: '300px', padding: 'var(--ds-spacing-6)' }}>
        <Heading level={4} data-size="sm" style={{ 
          color: 'var(--ds-color-success-text-default)',
          marginBottom: 'var(--ds-spacing-4)',
        }}>
          ✅ Proper Error Handling
        </Heading>
        <pre style={{ 
          padding: 'var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-sm)',
          fontSize: 'var(--ds-font-size-xs)',
          overflow: 'auto',
        }}>
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
  ),
};

/**
 * Best Practices Summary
 */
export const Summary: Story = {
  render: () => (
    <Card style={{ padding: 'var(--ds-spacing-8)', maxWidth: '800px' }}>
      <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        Best Practices Summary
      </Heading>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-6)' }}>
        {[
          {
            title: 'Design Tokens',
            dos: ['Use var(--ds-*) for all values', 'Consistent spacing/colors', 'Theme-aware styling'],
            donts: ['Hardcoded pixels', 'Hex colors', 'Magic numbers'],
          },
          {
            title: 'Components',
            dos: ['Use platform components', 'Compose existing patterns', 'Follow Designsystemet'],
            donts: ['Custom implementations', 'Inline styles', 'Raw HTML elements'],
          },
          {
            title: 'Accessibility',
            dos: ['Keyboard navigation', 'ARIA labels', 'Color contrast'],
            donts: ['Mouse-only interactions', 'Missing labels', 'Poor contrast'],
          },
          {
            title: 'Internationalization',
            dos: ['Use t() for all text', 'Support RTL', 'Format dates/numbers'],
            donts: ['Hardcoded strings', 'English-only', 'Locale assumptions'],
          },
        ].map(({ title, dos, donts }) => (
          <div key={title} style={{ 
            padding: 'var(--ds-spacing-6)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            borderRadius: 'var(--ds-border-radius-lg)',
            border: '1px solid var(--ds-color-neutral-border-default)',
          }}>
            <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
              {title}
            </Heading>
            
            <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
              <Paragraph data-size="sm" style={{ fontWeight: 600, marginBottom: 'var(--ds-spacing-2)', color: 'var(--ds-color-success-text-default)' }}>
                ✅ Do:
              </Paragraph>
              {dos.map((item, i) => (
                <Paragraph key={i} data-size="sm" style={{ marginLeft: 'var(--ds-spacing-4)', marginBottom: 'var(--ds-spacing-1)' }}>
                  • {item}
                </Paragraph>
              ))}
            </div>

            <div>
              <Paragraph data-size="sm" style={{ fontWeight: 600, marginBottom: 'var(--ds-spacing-2)', color: 'var(--ds-color-danger-text-default)' }}>
                ❌ Don't:
              </Paragraph>
              {donts.map((item, i) => (
                <Paragraph key={i} data-size="sm" style={{ marginLeft: 'var(--ds-spacing-4)', marginBottom: 'var(--ds-spacing-1)' }}>
                  • {item}
                </Paragraph>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  ),
};
