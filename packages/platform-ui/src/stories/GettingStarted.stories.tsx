import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Button, Card, Heading, Paragraph, Textfield } from '../../index';
import { BookOpen, Palette, Globe, Code, Zap, CheckCircle, ArrowRight, Play, Layers, Package, Terminal, Shield } from 'lucide-react';

const meta: Meta = {
  title: 'Overview/Getting Started',
  parameters: {
    docs: {
      description: {
        component: `
# Getting Started

Quick guide to start building with the Xala Platform Design System.

## Installation

\`\`\`bash
pnpm add @xala-technologies/platform
\`\`\`

## Setup

1. Import components
2. Configure theme
3. Add i18n
4. Start building

## First Steps

- Create your first component
- Use design tokens
- Follow accessibility guidelines
- Test in Storybook
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/**
 * Installation Steps
 */
export const InstallationSteps: Story = {
  render: () => (
    <div>
      <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        Installation
      </Heading>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        {[
          {
            step: 1,
            title: 'Install Package',
            command: 'pnpm add @xala-technologies/platform',
            description: 'Add the platform package to your project',
          },
          {
            step: 2,
            title: 'Install Peer Dependencies',
            command: 'pnpm add react react-dom',
            description: 'Ensure React is installed (if not already)',
          },
          {
            step: 3,
            title: 'Import Styles',
            command: "import '@xala-technologies/platform/styles';",
            description: 'Import the base styles in your app entry point',
          },
        ].map(({ step, title, command, description }) => (
          <Card key={step} style={{ padding: 'var(--ds-spacing-6)' }}>
            <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)', alignItems: 'flex-start' }}>
              <div style={{ 
                width: '40px',
                height: '40px',
                backgroundColor: 'var(--ds-color-accent-base-default)',
                color: 'var(--ds-color-accent-contrast-default)',
                borderRadius: 'var(--ds-border-radius-full)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 'var(--ds-font-size-4)',
                fontWeight: 600,
                flexShrink: 0,
              }}>
                {step}
              </div>
              <div style={{ flex: 1 }}>
                <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                  {title}
                </Heading>
                <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)', color: 'var(--ds-color-neutral-text-subtle)' }}>
                  {description}
                </Paragraph>
                <pre style={{ 
                  padding: 'var(--ds-spacing-3)',
                  backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                  borderRadius: 'var(--ds-border-radius-sm)',
                  fontSize: 'var(--ds-font-size-xs)',
                  overflow: 'auto',
                }}>
                  {command}
                </pre>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  ),
};

/**
 * Basic Setup
 */
export const BasicSetup: Story = {
  render: () => (
    <div>
      <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        Basic Setup
      </Heading>

      <div style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          1. Configure Theme Provider
        </Heading>
        <pre style={{ 
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-md)',
          overflow: 'auto',
          fontSize: 'var(--ds-font-size-sm)',
          marginBottom: 'var(--ds-spacing-4)',
        }}>
{`import { ThemeProvider } from '@xala-technologies/platform/theme';

function App() {
  return (
    <ThemeProvider theme="digdir" colorScheme="auto">
      <YourApp />
    </ThemeProvider>
  );
}`}
        </pre>
      </div>

      <div style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          2. Setup i18n
        </Heading>
        <pre style={{ 
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-md)',
          overflow: 'auto',
          fontSize: 'var(--ds-font-size-sm)',
          marginBottom: 'var(--ds-spacing-4)',
        }}>
{`import { I18nProvider } from '@xala-technologies/platform/i18n';

function App() {
  return (
    <I18nProvider locale="nb">
      <YourApp />
    </I18nProvider>
  );
}`}
        </pre>
      </div>

      <div>
        <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
          3. Import Components
        </Heading>
        <pre style={{ 
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-neutral-surface-hover)',
          borderRadius: 'var(--ds-border-radius-md)',
          overflow: 'auto',
          fontSize: 'var(--ds-font-size-sm)',
        }}>
{`import { Button, Card, Heading } from '../../index';

export function MyComponent() {
  return (
    <Card>
      <Heading level={2}>Hello World</Heading>
      <Button data-variant="primary">Click me</Button>
    </Card>
  );
}`}
        </pre>
      </div>
    </div>
  ),
};

/**
 * First Component
 */
export const FirstComponent: Story = {
  render: () => (
    <div>
      <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        Your First Component
      </Heading>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--ds-spacing-6)' }}>
        {/* Code */}
        <div>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            Code
          </Heading>
          <pre style={{ 
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-md)',
            overflow: 'auto',
            fontSize: 'var(--ds-font-size-xs)',
          }}>
{`import { 
  Button, 
  Card, 
  Heading, 
  Paragraph 
} from '../../index';
import { useTranslation } from '@xala-technologies/platform/i18n';

export function WelcomeCard() {
  const { t } = useTranslation();

  return (
    <Card style={{ 
      padding: 'var(--ds-spacing-6)' 
    }}>
      <Heading 
        level={2} 
        data-size="md"
        style={{ 
          marginBottom: 'var(--ds-spacing-3)' 
        }}
      >
        {t('welcome.title')}
      </Heading>
      
      <Paragraph 
        style={{ 
          marginBottom: 'var(--ds-spacing-4)',
          color: 'var(--ds-color-neutral-text-subtle)'
        }}
      >
        {t('welcome.description')}
      </Paragraph>
      
      <Button data-variant="primary">
        {t('common.getStarted')}
      </Button>
    </Card>
  );
}`}
          </pre>
        </div>

        {/* Preview */}
        <div>
          <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
            Preview
          </Heading>
          <Card style={{ padding: 'var(--ds-spacing-6)' }}>
            <Heading level={2} data-size="md" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
              Welcome to Xala Platform
            </Heading>
            <Paragraph style={{ 
              marginBottom: 'var(--ds-spacing-4)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}>
              Start building accessible, consistent applications with our design system
            </Paragraph>
            <Button data-variant="primary">
              Get Started
            </Button>
          </Card>
        </div>
      </div>

      <div style={{ 
        marginTop: 'var(--ds-spacing-6)',
        padding: 'var(--ds-spacing-4)',
        backgroundColor: 'var(--ds-color-success-surface-default)',
        borderRadius: 'var(--ds-border-radius-md)',
      }}>
        <Paragraph data-size="sm" style={{ color: 'var(--ds-color-success-text-default)' }}>
          <strong>Best Practices Used:</strong>
          <br />• Platform components (Button, Card, Heading)
          <br />• Design tokens (--ds-spacing-*, --ds-color-*)
          <br />• i18n for all text (t() function)
          <br />• Semantic HTML (proper heading levels)
          <br />• Accessible props (data-variant, data-size)
        </Paragraph>
      </div>
    </div>
  ),
};

/**
 * Common Patterns
 */
export const CommonPatterns: Story = {
  render: () => (
    <div>
      <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        Common Patterns
      </Heading>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-6)' }}>
        {[
          {
            title: 'Form with Validation',
            code: `<Textfield
  label="Email"
  type="email"
  error={errors.email}
  required
/>`,
          },
          {
            title: 'Loading Button',
            code: `<Button 
  data-variant="primary"
  disabled={loading}
>
  {loading ? 'Saving...' : 'Save'}
</Button>`,
          },
          {
            title: 'Conditional Rendering',
            code: `{data ? (
  <DataTable data={data} />
) : (
  <EmptyState title="No data" />
)}`,
          },
          {
            title: 'Error Handling',
            code: `try {
  await sdk.users.create(data);
} catch (error) {
  showError(t('errors.saveFailed'));
}`,
          },
        ].map(({ title, code }) => (
          <Card key={title} style={{ padding: 'var(--ds-spacing-5)' }}>
            <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
              {title}
            </Heading>
            <pre style={{ 
              padding: 'var(--ds-spacing-3)',
              backgroundColor: 'var(--ds-color-neutral-surface-hover)',
              borderRadius: 'var(--ds-border-radius-sm)',
              fontSize: 'var(--ds-font-size-xs)',
              overflow: 'auto',
            }}>
              {code}
            </pre>
          </Card>
        ))}
      </div>
    </div>
  ),
};

/**
 * Design Tokens in Action
 */
export const DesignTokensInAction: Story = {
  render: () => {
    const [selectedToken, setSelectedToken] = useState<'spacing' | 'color' | 'typography'>('spacing');

    const tokenExamples = {
      spacing: [
        { token: '--ds-spacing-1', value: '4px', usage: 'Minimal gap between elements' },
        { token: '--ds-spacing-2', value: '8px', usage: 'Small spacing' },
        { token: '--ds-spacing-4', value: '16px', usage: 'Default spacing' },
        { token: '--ds-spacing-6', value: '24px', usage: 'Section spacing' },
        { token: '--ds-spacing-8', value: '32px', usage: 'Large spacing' },
      ],
      color: [
        { token: '--ds-color-accent-base-default', value: '#0066CC', usage: 'Primary actions' },
        { token: '--ds-color-success-base-default', value: '#06A77D', usage: 'Success states' },
        { token: '--ds-color-danger-base-default', value: '#E02E49', usage: 'Error states' },
        { token: '--ds-color-warning-base-default', value: '#FF9100', usage: 'Warning states' },
        { token: '--ds-color-neutral-text-subtle', value: '#68707D', usage: 'Secondary text' },
      ],
      typography: [
        { token: '--ds-font-size-xs', value: '0.75rem', usage: 'Small text, captions' },
        { token: '--ds-font-size-sm', value: '0.875rem', usage: 'Body text (small)' },
        { token: '--ds-font-size-md', value: '1rem', usage: 'Body text (default)' },
        { token: '--ds-font-size-lg', value: '1.125rem', usage: 'Emphasized text' },
        { token: '--ds-font-size-xl', value: '1.5rem', usage: 'Headings' },
      ],
    };

    return (
      <div>
        <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
          Design Tokens in Action
        </Heading>

        <div style={{ display: 'flex', gap: 'var(--ds-spacing-3)', marginBottom: 'var(--ds-spacing-6)' }}>
          {(['spacing', 'color', 'typography'] as const).map((type) => (
            <Button
              key={type}
              data-variant={selectedToken === type ? 'primary' : 'tertiary'}
              data-size="sm"
              onClick={() => setSelectedToken(type)}
            >
              {type.charAt(0).toUpperCase() + type.slice(1)}
            </Button>
          ))}
        </div>

        <Card style={{ padding: 'var(--ds-spacing-6)' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
            {tokenExamples[selectedToken].map(({ token, value, usage }) => (
              <div
                key={token}
                style={{
                  padding: 'var(--ds-spacing-4)',
                  backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  display: 'grid',
                  gridTemplateColumns: '1fr 100px 1fr',
                  gap: 'var(--ds-spacing-4)',
                  alignItems: 'center',
                }}
              >
                <code style={{ fontSize: 'var(--ds-font-size-xs)', fontWeight: 600 }}>
                  var({token})
                </code>
                <div
                  style={{
                    padding: 'var(--ds-spacing-2)',
                    backgroundColor: selectedToken === 'spacing' ? 'var(--ds-color-accent-base-default)' : selectedToken === 'color' ? `var(${token})` : 'transparent',
                    border: selectedToken === 'color' ? '1px solid var(--ds-color-neutral-border-default)' : 'none',
                    borderRadius: 'var(--ds-border-radius-sm)',
                    textAlign: 'center',
                    fontSize: selectedToken === 'typography' ? `var(${token})` : 'var(--ds-font-size-xs)',
                    height: selectedToken === 'spacing' ? `var(${token})` : 'auto',
                    minHeight: selectedToken === 'spacing' ? '20px' : 'auto',
                  }}
                >
                  {selectedToken === 'typography' && 'Aa'}
                </div>
                <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                  {usage}
                </Paragraph>
              </div>
            ))}
          </div>
        </Card>

        <div style={{
          marginTop: 'var(--ds-spacing-6)',
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-accent-surface-default)',
          borderRadius: 'var(--ds-border-radius-md)',
        }}>
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-accent-text-default)' }}>
            <strong>Pro Tip:</strong> Always use design tokens instead of hardcoded values. This ensures consistency and enables theming.
          </Paragraph>
        </div>
      </div>
    );
  },
};

/**
 * Real-World Patterns
 */
export const RealWorldPatterns: Story = {
  render: () => (
    <div>
      <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        Real-World Patterns
      </Heading>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        {[
          {
            title: 'Form with Validation',
            description: 'Handle user input with proper validation and error states',
            code: `import { Textfield, Button } from '../../index';
import { useForm } from 'react-hook-form';
import { useTranslation } from '@xala-technologies/platform/i18n';

export function ContactForm() {
  const { t } = useTranslation();
  const { register, handleSubmit, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await sdk.contacts.create(data);
      showSuccess(t('contact.created'));
    } catch (error) {
      showError(t('errors.saveFailed'));
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Textfield
        label={t('form.email')}
        type="email"
        error={errors.email?.message}
        {...register('email', { 
          required: t('validation.required') 
        })}
      />
      
      <Button 
        data-variant="primary"
        type="submit"
      >
        {t('common.submit')}
      </Button>
    </form>
  );
}`,
          },
          {
            title: 'Loading States',
            description: 'Provide feedback during async operations',
            code: `import { Button, Spinner } from '../../index';
import { useState } from 'react';

export function SaveButton() {
  const [loading, setLoading] = useState(false);
  const { t } = useTranslation();

  const handleSave = async () => {
    setLoading(true);
    try {
      await sdk.data.save();
      showSuccess(t('common.saved'));
    } catch (error) {
      showError(t('errors.saveFailed'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <Button
      data-variant="primary"
      disabled={loading}
      onClick={handleSave}
    >
      {loading ? (
        <>
          <Spinner size="sm" />
          {t('common.saving')}
        </>
      ) : (
        t('common.save')
      )}
    </Button>
  );
}`,
          },
          {
            title: 'Conditional Rendering',
            description: 'Show different UI based on data state',
            code: `import { DataTable, EmptyState, ErrorState } from '../../index';
import { useQuery } from '@tanstack/react-query';

export function UserList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: () => sdk.users.list(),
  });

  if (isLoading) {
    return <LoadingState />;
  }

  if (error) {
    return (
      <ErrorState 
        title={t('errors.loadFailed')}
        onRetry={() => queryClient.invalidateQueries(['users'])}
      />
    );
  }

  if (!data || data.length === 0) {
    return (
      <EmptyState 
        title={t('users.empty')}
        action={<Button>{t('users.create')}</Button>}
      />
    );
  }

  return <DataTable data={data} columns={columns} />;
}`,
          },
          {
            title: 'Responsive Layout',
            description: 'Build layouts that adapt to screen size',
            code: `import { Card, Heading } from '../../index';

export function DashboardGrid() {
  return (
    <div style={{
      display: 'flex',
      flexWrap: 'wrap',
      gap: 'var(--ds-spacing-6)',
      padding: 'var(--ds-spacing-6)',
    }}>
      {widgets.map(widget => (
        <Card 
          key={widget.id}
          style={{ padding: 'var(--ds-spacing-6)' }}
        >
          <Heading level={3} data-size="md">
            {widget.title}
          </Heading>
          {widget.content}
        </Card>
      ))}
    </div>
  );
}`,
          },
        ].map(({ title, description, code }) => (
          <Card key={title} style={{ padding: 'var(--ds-spacing-6)' }}>
            <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
              <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
                {title}
              </Heading>
              <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                {description}
              </Paragraph>
            </div>

            <pre style={{
              padding: 'var(--ds-spacing-4)',
              backgroundColor: 'var(--ds-color-neutral-surface-hover)',
              borderRadius: 'var(--ds-border-radius-md)',
              overflow: 'auto',
              fontSize: 'var(--ds-font-size-xs)',
              lineHeight: '1.6',
            }}>
              {code}
            </pre>
          </Card>
        ))}
      </div>
    </div>
  ),
};

/**
 * Interactive Quick Start
 */
export const InteractiveQuickStart: Story = {
  render: () => {
    const [name, setName] = useState('');
    const [step, setStep] = useState(1);

    return (
      <div>
        <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
          Interactive Quick Start
        </Heading>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 'var(--ds-spacing-6)' }}>
          {/* Steps */}
          <div>
            <Card style={{ padding: 'var(--ds-spacing-6)' }}>
              <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                Build Your First Component
              </Heading>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
                <div style={{
                  padding: 'var(--ds-spacing-4)',
                  backgroundColor: step >= 1 ? 'var(--ds-color-accent-surface-default)' : 'var(--ds-color-neutral-surface-default)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  borderLeft: step === 1 ? '4px solid var(--ds-color-accent-base-default)' : 'none',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)', marginBottom: 'var(--ds-spacing-2)' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: step >= 1 ? 'var(--ds-color-accent-base-default)' : 'var(--ds-color-neutral-border-default)',
                      color: 'white',
                      borderRadius: 'var(--ds-border-radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'var(--ds-font-size-xs)',
                      fontWeight: 600,
                    }}>
                      1
                    </div>
                    <strong>Enter Your Name</strong>
                  </div>
                  <Textfield
                    label="Your Name"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (e.target.value && step === 1) setStep(2);
                    }}
                    placeholder="John Doe"
                    data-size="sm"
                  />
                </div>

                <div style={{
                  padding: 'var(--ds-spacing-4)',
                  backgroundColor: step >= 2 ? 'var(--ds-color-accent-surface-default)' : 'var(--ds-color-neutral-surface-default)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  borderLeft: step === 2 ? '4px solid var(--ds-color-accent-base-default)' : 'none',
                  opacity: step >= 2 ? 1 : 0.5,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)', marginBottom: 'var(--ds-spacing-2)' }}>
                    <div style={{
                      width: '24px',
                      height: '24px',
                      backgroundColor: step >= 2 ? 'var(--ds-color-accent-base-default)' : 'var(--ds-color-neutral-border-default)',
                      color: 'white',
                      borderRadius: 'var(--ds-border-radius-full)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: 'var(--ds-font-size-xs)',
                      fontWeight: 600,
                    }}>
                      2
                    </div>
                    <strong>See the Preview</strong>
                  </div>
                  <Paragraph data-size="sm">
                    Your component updates in real-time →
                  </Paragraph>
                </div>

                <div style={{
                  padding: 'var(--ds-spacing-4)',
                  backgroundColor: step >= 3 ? 'var(--ds-color-success-surface-default)' : 'var(--ds-color-neutral-surface-default)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  opacity: step >= 3 ? 1 : 0.5,
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-2)' }}>
                    <CheckCircle size={24} style={{ color: step >= 3 ? 'var(--ds-color-success-base-default)' : 'var(--ds-color-neutral-border-default)' }} />
                    <strong>Ready to Build!</strong>
                  </div>
                </div>
              </div>

              {step >= 2 && (
                <Button
                  data-variant="primary"
                  style={{ width: '100%', marginTop: 'var(--ds-spacing-4)' }}
                  onClick={() => setStep(3)}
                >
                  Complete Tutorial
                </Button>
              )}
            </Card>
          </div>

          {/* Preview */}
          <div>
            <Card style={{ padding: 'var(--ds-spacing-6)', minHeight: '400px' }}>
              <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
                Live Preview
              </Heading>

              {name ? (
                <Card style={{ padding: 'var(--ds-spacing-6)', backgroundColor: 'var(--ds-color-neutral-surface-default)' }}>
                  <Heading level={4} data-size="md" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
                    Welcome, {name}!
                  </Heading>
                  <Paragraph style={{ marginBottom: 'var(--ds-spacing-4)', color: 'var(--ds-color-neutral-text-subtle)' }}>
                    You're building with Xala Platform design tokens and components.
                  </Paragraph>
                  <Button data-variant="primary">
                    Get Started
                  </Button>
                </Card>
              ) : (
                <div style={{
                  padding: 'var(--ds-spacing-8)',
                  textAlign: 'center',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}>
                  <Paragraph>Enter your name to see the preview</Paragraph>
                </div>
              )}

              {name && (
                <div style={{ marginTop: 'var(--ds-spacing-6)' }}>
                  <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
                    The Code
                  </Heading>
                  <pre style={{
                    padding: 'var(--ds-spacing-4)',
                    backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                    borderRadius: 'var(--ds-border-radius-md)',
                    fontSize: 'var(--ds-font-size-xs)',
                    overflow: 'auto',
                  }}>
{`<Card style={{ padding: 'var(--ds-spacing-6)' }}>
  <Heading level={4} data-size="md">
    Welcome, ${name}!
  </Heading>
  <Paragraph>
    You're building with Xala Platform.
  </Paragraph>
  <Button data-variant="primary">
    Get Started
  </Button>
</Card>`}
                  </pre>
                </div>
              )}
            </Card>
          </div>
        </div>
      </div>
    );
  },
};

/**
 * Next Steps
 */
export const NextSteps: Story = {
  render: () => (
    <div>
      <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        Next Steps
      </Heading>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-5)' }}>
        {[
          {
            Icon: Package,
            title: 'Explore Components',
            description: 'Browse all 50+ components with live examples and code snippets',
            action: 'View Components',
            link: '?path=/docs/components-button--docs',
          },
          {
            Icon: Palette,
            title: 'Learn Design Tokens',
            description: 'Understand how to use design tokens for consistent styling',
            action: 'View Tokens',
            link: '?path=/docs/fundamentals-tokens--docs',
          },
          {
            Icon: Shield,
            title: 'Accessibility Guide',
            description: 'Learn how to build accessible applications with WCAG 2.1 AA compliance',
            action: 'View Guide',
            link: '?path=/docs/fundamentals-accessibility--docs',
          },
          {
            Icon: Code,
            title: 'View Examples',
            description: 'See 1000+ code examples and learn from best practices',
            action: 'View Examples',
            link: '?path=/docs/examples-component-examples--docs',
          },
        ].map(({ Icon, title, description, action, link }) => (
          <div key={title} style={{ 
            display: 'flex',
            gap: 'var(--ds-spacing-4)',
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
            alignItems: 'center',
          }}>
            <Icon size={32} style={{ flexShrink: 0, color: 'var(--ds-color-accent-base-default)' }} />
            <div style={{ flex: 1 }}>
              <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-1)' }}>
                {title}
              </Heading>
              <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                {description}
              </Paragraph>
            </div>
            <Button 
              data-variant="tertiary" 
              data-size="sm"
              onClick={() => window.location.href = link}
            >
              {action} →
            </Button>
          </div>
        ))}
      </div>
    </div>
  ),
};
