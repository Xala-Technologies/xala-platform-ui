import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { Button, Card, Heading, Paragraph, Textfield, Checkbox } from '../../index';
import { useState } from 'react';
import { Inbox, AlertCircle, CheckCircle, Loader2 } from 'lucide-react';

const meta: Meta = {
  title: 'Examples/Component Examples',
  parameters: {
    docs: {
      description: {
        component: `
# Component Examples Library

Comprehensive examples demonstrating proper component usage patterns.

## Categories
- **Basic Usage**: Simple, common patterns
- **Advanced Patterns**: Complex compositions
- **Accessibility**: WCAG-compliant examples
- **State Management**: Interactive examples
- **Error Handling**: Validation and feedback

## For AI Agents
These examples serve as training data for:
- Pattern recognition
- Code generation
- Validation
- Best practice enforcement
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/**
 * Example 1: Button - Basic Usage
 *
 * Demonstrates: Primary action button
 * Use Case: Form submission, primary actions
 * Difficulty: Beginner
 */
export const ButtonBasic: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)', flexWrap: 'wrap' }}>
        <Button data-variant="primary" data-size="md">
          {t('storybook.examples.primaryAction')}
        </Button>
        <Button data-variant="secondary" data-size="md">
          {t('storybook.examples.secondaryAction')}
        </Button>
        <Button data-variant="tertiary" data-size="md">
          {t('storybook.examples.tertiaryAction')}
        </Button>
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
// Good: Using design system components
<Button data-variant="primary" data-size="md">
  Primary Action
</Button>

// Bad: Custom button with hardcoded styles
<button style={{
  padding: '12px 24px',
  backgroundColor: '#0066CC',
  color: 'white'
}}>
  Primary Action
</button>
        `,
      },
    },
  },
};

/**
 * Example 2: Button - With Icons
 *
 * Demonstrates: Icon + text button pattern
 * Use Case: Actions with visual indicators
 * Difficulty: Beginner
 */
export const ButtonWithIcons: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', gap: 'var(--ds-spacing-4)', flexWrap: 'wrap' }}>
        <Button data-variant="primary">
          <span style={{ marginRight: 'var(--ds-spacing-2)' }}>+</span>
          {t('platform.common.add')}
        </Button>
        <Button data-variant="secondary">
          <span style={{ marginRight: 'var(--ds-spacing-2)' }}>💾</span>
          {t('platform.common.save')}
        </Button>
        <Button data-variant="tertiary">
          <span style={{ marginRight: 'var(--ds-spacing-2)' }}>🗑️</span>
          {t('platform.common.delete')}
        </Button>
      </div>
    );
  },
};

/**
 * Example 3: Button - Loading States
 *
 * Demonstrates: Async action feedback
 * Use Case: API calls, form submissions
 * Difficulty: Intermediate
 */
export const ButtonLoadingState: Story = {
  render: function Render() {
    const t = useT();
    const [loading, setLoading] = useState(false);

    const handleClick = () => {
      setLoading(true);
      setTimeout(() => setLoading(false), 2000);
    };

    return (
      <Button data-variant="primary" onClick={handleClick} disabled={loading}>
        {loading ? t('storybook.loading.loading') : t('storybook.examples.submitForm')}
      </Button>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
const [loading, setLoading] = useState(false);

const handleSubmit = async () => {
  setLoading(true);
  try {
    await api.submitForm(data);
  } finally {
    setLoading(false);
  }
};

return (
  <Button
    data-variant="primary"
    onClick={handleSubmit}
    disabled={loading}
  >
    {loading ? 'Submitting...' : 'Submit'}
  </Button>
);
        `,
      },
    },
  },
};

/**
 * Example 4: Form - Complete Pattern
 *
 * Demonstrates: Form with validation
 * Use Case: User input collection
 * Difficulty: Intermediate
 */
export const FormComplete: Story = {
  render: function Render() {
    const t = useT();
    const [formData, setFormData] = useState({ name: '', email: '', terms: false });
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
      const newErrors: Record<string, string> = {};
      if (!formData.name) newErrors.name = t('storybook.examples.nameRequired');
      if (!formData.email) newErrors.email = t('storybook.examples.emailRequired');
      if (!formData.terms) newErrors.terms = t('storybook.examples.termsRequired');
      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      if (validate()) {
        alert(t('storybook.examples.formSubmitted'));
      }
    };

    return (
      <Card style={{ maxWidth: '400px', padding: 'var(--ds-spacing-6)' }}>
        <form onSubmit={handleSubmit}>
          <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            {t('storybook.examples.signUp')}
          </Heading>

          <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            <Textfield
              label={t('platform.common.name')}
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              error={errors.name}
            />
          </div>

          <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
            <Textfield
              label={t('platform.common.email')}
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              error={errors.email}
            />
          </div>

          <div style={{ marginBottom: 'var(--ds-spacing-6)' }}>
            <Checkbox
              checked={formData.terms}
              onChange={(e) => setFormData({ ...formData, terms: e.target.checked })}
            >
              {t('storybook.examples.acceptTerms')}
            </Checkbox>
            {errors.terms && (
              <Paragraph
                data-size="sm"
                style={{
                  color: 'var(--ds-color-danger-text-default)',
                  marginTop: 'var(--ds-spacing-1)',
                }}
              >
                {errors.terms}
              </Paragraph>
            )}
          </div>

          <Button data-variant="primary" type="submit" style={{ width: '100%' }}>
            {t('storybook.examples.createAccount')}
          </Button>
        </form>
      </Card>
    );
  },
  parameters: {
    docs: {
      description: {
        story: `
**Key Patterns:**
- Controlled inputs with state
- Client-side validation
- Error display
- Accessible form structure
- Design tokens for spacing

**Accessibility:**
- Labels associated with inputs
- Error messages announced
- Keyboard navigation
- Focus management
        `,
      },
    },
  },
};

/**
 * Example 5: Card - Content Layout
 *
 * Demonstrates: Structured card content
 * Use Case: Content display, dashboards
 * Difficulty: Beginner
 */
export const CardContentLayout: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-4)' }}>
        {[1, 2, 3].map((i) => (
          <Card key={i} style={{ padding: 'var(--ds-spacing-6)' }}>
            <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
              {t('storybook.examples.cardTitle')} {i}
            </Heading>
            <Paragraph
              data-size="sm"
              style={{
                color: 'var(--ds-color-neutral-text-subtle)',
                marginBottom: 'var(--ds-spacing-4)',
              }}
            >
              {t('storybook.examples.cardDescription')}
            </Paragraph>
            <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
              <Button data-variant="primary" data-size="sm">
                {t('storybook.examples.action')}
              </Button>
              <Button data-variant="tertiary" data-size="sm">
                {t('platform.common.cancel')}
              </Button>
            </div>
          </Card>
        ))}
      </div>
    );
  },
  parameters: {
    docs: {
      source: {
        code: `
// Good: Responsive grid with design tokens
<div style={{
  display: 'flex',
  flexWrap: 'wrap',
  gap: 'var(--ds-spacing-4)'
}}>
  <Card style={{ padding: 'var(--ds-spacing-6)' }}>
    <Heading level={3} data-size="sm">Title</Heading>
    <Paragraph>Content</Paragraph>
    <Button>Action</Button>
  </Card>
</div>

// Bad: Fixed widths, hardcoded spacing
<div style={{ display: 'flex', gap: '16px' }}>
  <div style={{ width: '300px', padding: '24px' }}>
    <h3>Title</h3>
    <p>Content</p>
    <button>Action</button>
  </div>
</div>
        `,
      },
    },
  },
};

/**
 * Example 6: List - Interactive Items
 *
 * Demonstrates: Selectable list pattern
 * Use Case: Item selection, navigation
 * Difficulty: Intermediate
 */
export const ListInteractive: Story = {
  render: function Render() {
    const t = useT();
    const [selected, setSelected] = useState<number | null>(null);
    const items = [
      t('platform.nav.dashboard'),
      t('storybook.examples.projects'),
      t('storybook.examples.team'),
      t('platform.common.settings'),
    ];

    return (
      <Card style={{ maxWidth: '300px', padding: 'var(--ds-spacing-4)' }}>
        <Heading
          level={3}
          data-size="sm"
          style={{ marginBottom: 'var(--ds-spacing-3)', paddingLeft: 'var(--ds-spacing-3)' }}
        >
          {t('storybook.examples.navigation')}
        </Heading>
        <div role="list">
          {items.map((item, index) => (
            <button
              key={index}
              onClick={() => setSelected(index)}
              style={{
                width: '100%',
                padding: 'var(--ds-spacing-3)',
                textAlign: 'left',
                border: 'none',
                backgroundColor:
                  selected === index ? 'var(--ds-color-accent-surface-default)' : 'transparent',
                color:
                  selected === index
                    ? 'var(--ds-color-accent-text-default)'
                    : 'var(--ds-color-neutral-text-default)',
                borderRadius: 'var(--ds-border-radius-md)',
                cursor: 'pointer',
                fontSize: 'var(--ds-font-size-sm)',
                fontWeight: selected === index ? 600 : 400,
                transition: 'all 0.2s',
              }}
              type="button"
            >
              {item}
            </button>
          ))}
        </div>
      </Card>
    );
  },
};

/**
 * Example 7: Empty State
 *
 * Demonstrates: No content feedback
 * Use Case: Empty lists, no results
 * Difficulty: Beginner
 */
export const EmptyState: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Card
        style={{
          padding: 'var(--ds-spacing-12)',
          textAlign: 'center',
        }}
      >
        <Inbox
          size={48}
          style={{
            marginBottom: 'var(--ds-spacing-4)',
            margin: '0 auto',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        />
        <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
          {t('storybook.patterns.noItemsYet')}
        </Heading>
        <Paragraph
          style={{
            color: 'var(--ds-color-neutral-text-subtle)',
            marginBottom: 'var(--ds-spacing-6)',
          }}
        >
          {t('storybook.patterns.getStarted')}
        </Paragraph>
        <Button data-variant="primary">{t('storybook.patterns.createItem')}</Button>
      </Card>
    );
  },
};

/**
 * Example 8: Error State
 *
 * Demonstrates: Error feedback
 * Use Case: Failed operations, validation
 * Difficulty: Beginner
 */
export const ErrorState: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Card
        style={{
          padding: 'var(--ds-spacing-6)',
          maxWidth: '400px',
          borderLeft: '4px solid var(--ds-color-danger-border-default)',
          backgroundColor: 'var(--ds-color-danger-surface-default)',
        }}
      >
        <Heading
          level={3}
          data-size="sm"
          style={{
            color: 'var(--ds-color-danger-text-default)',
            marginBottom: 'var(--ds-spacing-2)',
          }}
        >
          {t('storybook.notifications.error')}
        </Heading>
        <Paragraph
          style={{
            color: 'var(--ds-color-danger-text-default)',
            marginBottom: 'var(--ds-spacing-4)',
          }}
        >
          {t('storybook.examples.failedToLoadData')}
        </Paragraph>
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
          <Button data-variant="primary" data-size="sm">
            {t('storybook.examples.retry')}
          </Button>
          <Button data-variant="tertiary" data-size="sm">
            {t('platform.common.cancel')}
          </Button>
        </div>
      </Card>
    );
  },
};

/**
 * Example 9: Success State
 *
 * Demonstrates: Success feedback
 * Use Case: Confirmations, completions
 * Difficulty: Beginner
 */
export const SuccessState: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Card
        style={{
          padding: 'var(--ds-spacing-6)',
          borderLeft: '4px solid var(--ds-color-success-border-default)',
          backgroundColor: 'var(--ds-color-success-surface-default)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-3)' }}>
          <CheckCircle size={24} style={{ color: 'var(--ds-color-success-base-default)' }} />
          <div>
            <Heading
              level={3}
              data-size="sm"
              style={{
                color: 'var(--ds-color-success-text-default)',
                marginBottom: 'var(--ds-spacing-1)',
              }}
            >
              {t('storybook.notifications.success')}
            </Heading>
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-success-text-default)' }}>
              {t('storybook.notifications.changesSaved')}
            </Paragraph>
          </div>
        </div>
      </Card>
    );
  },
};

/**
 * Example 10: Loading State
 *
 * Demonstrates: Loading feedback
 * Use Case: Async operations, data fetching
 * Difficulty: Beginner
 */
export const LoadingState: Story = {
  render: function Render() {
    const t = useT();
    return (
      <Card
        style={{
          padding: 'var(--ds-spacing-12)',
          textAlign: 'center',
        }}
      >
        <Loader2
          size={40}
          style={{
            margin: '0 auto var(--ds-spacing-4)',
            animation: 'spin 1s linear infinite',
            color: 'var(--ds-color-accent-base-default)',
          }}
        />
        <Paragraph style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
          {t('storybook.loading.loading')}
        </Paragraph>
        <style>{`
          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        `}</style>
      </Card>
    );
  },
};
