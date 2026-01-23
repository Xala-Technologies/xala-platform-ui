import type { Meta, StoryObj } from '@storybook/react';
import { Button, Card, Heading, Paragraph, Textfield } from '../../index';
import { useState } from 'react';
import { Inbox, Search, AlertCircle } from 'lucide-react';

const meta: Meta = {
  title: 'Fundamentals/Patterns',
  parameters: {
    docs: {
      description: {
        component: `
# Design Patterns

Reusable solutions to common design problems. These patterns create consistent, recognizable user experiences.

## Categories
- **Form Patterns**: Validation, required fields, error handling
- **Navigation Patterns**: Menus, breadcrumbs, wizards
- **Feedback Patterns**: Notifications, loading states, empty states
- **Data Patterns**: Tables, lists, filtering, pagination

## Reference
[Designsystemet Patterns](https://designsystemet.no/no/patterns)
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

/**
 * Pattern 1: Required vs Optional Fields
 *
 * Mark optional fields, not required ones
 */
export const RequiredOptionalFields: Story = {
  render: () => (
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
          ❌ Wrong Pattern
        </Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
          <Textfield label="Name *" required />
          <Textfield label="Email *" type="email" required />
          <Textfield label="Phone" type="tel" />
        </div>
        <Paragraph
          data-size="sm"
          style={{ marginTop: 'var(--ds-spacing-4)', color: 'var(--ds-color-neutral-text-subtle)' }}
        >
          Asterisks create visual clutter
        </Paragraph>
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
          ✅ Correct Pattern
        </Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
          <Textfield label="Name" required />
          <Textfield label="Email" type="email" required />
          <Textfield label="Phone (optional)" type="tel" />
        </div>
        <Paragraph
          data-size="sm"
          style={{ marginTop: 'var(--ds-spacing-4)', color: 'var(--ds-color-neutral-text-subtle)' }}
        >
          Mark only optional fields
        </Paragraph>
      </Card>
    </div>
  ),
};

/**
 * Pattern 2: User-Triggered Validation
 *
 * Show errors after user interaction, not on load
 */
export const UserTriggeredValidation: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [touched, setTouched] = useState(false);

    const error = touched && !email.includes('@') ? 'Please enter a valid email' : undefined;

    return (
      <Card style={{ padding: 'var(--ds-spacing-6)' }}>
        <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          User-Triggered Validation
        </Heading>
        <Paragraph
          style={{
            marginBottom: 'var(--ds-spacing-6)',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          Error appears only after you leave the field (onBlur)
        </Paragraph>

        <Textfield
          label="Email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          onBlur={() => setTouched(true)}
          error={error}
        />

        <div
          style={{
            marginTop: 'var(--ds-spacing-4)',
            padding: 'var(--ds-spacing-3)',
            backgroundColor: 'var(--ds-color-info-surface-default)',
            borderRadius: 'var(--ds-border-radius-sm)',
          }}
        >
          <Paragraph data-size="sm" style={{ color: 'var(--ds-color-info-text-default)' }}>
            <strong>Pattern:</strong> Validate onBlur, not onChange
          </Paragraph>
        </div>
      </Card>
    );
  },
};

/**
 * Pattern 3: Multi-Step Wizard
 *
 * Clear progress indication and navigation
 */
export const MultiStepWizard: Story = {
  render: () => {
    const [step, setStep] = useState(1);
    const totalSteps = 3;

    return (
      <Card style={{ padding: 'var(--ds-spacing-6)' }}>
        <Heading level={3} data-size="md" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
          Multi-Step Wizard
        </Heading>

        {/* Progress Indicator */}
        <div
          style={{
            display: 'flex',
            gap: 'var(--ds-spacing-2)',
            marginBottom: 'var(--ds-spacing-8)',
          }}
        >
          {[1, 2, 3].map((num) => (
            <div key={num} style={{ flex: 1 }}>
              <div
                style={{
                  height: 'var(--ds-spacing-1)',
                  backgroundColor:
                    num <= step
                      ? 'var(--ds-color-accent-base-default)'
                      : 'var(--ds-color-neutral-border-subtle)',
                  borderRadius: 'var(--ds-border-radius-full)',
                }}
              />
              <Paragraph
                data-size="xs"
                style={{
                  marginTop: 'var(--ds-spacing-1)',
                  textAlign: 'center',
                  color:
                    num <= step
                      ? 'var(--ds-color-accent-text-default)'
                      : 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                Step {num}
              </Paragraph>
            </div>
          ))}
        </div>

        {/* Step Content */}
        <div style={{ minHeight: '200px', marginBottom: 'var(--ds-spacing-6)' }}>
          {step === 1 && (
            <div>
              <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
                Step 1: Basic Information
              </Heading>
              <Textfield label="Name" />
            </div>
          )}
          {step === 2 && (
            <div>
              <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
                Step 2: Contact Details
              </Heading>
              <Textfield label="Email" type="email" />
            </div>
          )}
          {step === 3 && (
            <div>
              <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
                Step 3: Confirmation
              </Heading>
              <Paragraph>Review and confirm your information</Paragraph>
            </div>
          )}
        </div>

        {/* Navigation */}
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button
            data-variant="tertiary"
            onClick={() => setStep(Math.max(1, step - 1))}
            disabled={step === 1}
          >
            Previous
          </Button>
          <Button
            data-variant="primary"
            onClick={() => setStep(Math.min(totalSteps, step + 1))}
            disabled={step === totalSteps}
          >
            {step === totalSteps ? 'Complete' : 'Next'}
          </Button>
        </div>
      </Card>
    );
  },
};

/**
 * Pattern 4: Empty State
 *
 * Helpful guidance when no content exists
 */
export const EmptyStatePattern: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-6)' }}>
      {/* No Data */}
      <Card style={{ padding: 'var(--ds-spacing-8)', textAlign: 'center' }}>
        <Inbox
          size={48}
          style={{
            marginBottom: 'var(--ds-spacing-4)',
            margin: '0 auto',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        />
        <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
          No items yet
        </Heading>
        <Paragraph
          style={{
            color: 'var(--ds-color-neutral-text-subtle)',
            marginBottom: 'var(--ds-spacing-4)',
          }}
        >
          Get started by creating your first item
        </Paragraph>
        <Button data-variant="primary">Create Item</Button>
      </Card>

      {/* No Results */}
      <Card style={{ padding: 'var(--ds-spacing-8)', textAlign: 'center' }}>
        <Search
          size={48}
          style={{
            marginBottom: 'var(--ds-spacing-4)',
            margin: '0 auto',
            color: 'var(--ds-color-neutral-text-subtle)',
          }}
        />
        <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
          No results found
        </Heading>
        <Paragraph
          style={{
            color: 'var(--ds-color-neutral-text-subtle)',
            marginBottom: 'var(--ds-spacing-4)',
          }}
        >
          Try adjusting your search or filters
        </Paragraph>
        <Button data-variant="secondary">Clear Filters</Button>
      </Card>

      {/* Error State */}
      <Card style={{ padding: 'var(--ds-spacing-8)', textAlign: 'center' }}>
        <AlertCircle
          size={48}
          style={{
            marginBottom: 'var(--ds-spacing-4)',
            margin: '0 auto',
            color: 'var(--ds-color-warning-base-default)',
          }}
        />
        <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
          Something went wrong
        </Heading>
        <Paragraph
          style={{
            color: 'var(--ds-color-neutral-text-subtle)',
            marginBottom: 'var(--ds-spacing-4)',
          }}
        >
          We couldn't load the content
        </Paragraph>
        <Button data-variant="secondary">Try Again</Button>
      </Card>
    </div>
  ),
};

/**
 * Pattern 5: Notification Types
 *
 * Consistent feedback for different scenarios
 */
export const NotificationTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      {/* Success */}
      <div
        style={{
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-success-surface-default)',
          borderLeft: '4px solid var(--ds-color-success-border-default)',
          borderRadius: 'var(--ds-border-radius-md)',
        }}
      >
        <Heading
          level={4}
          data-size="sm"
          style={{
            color: 'var(--ds-color-success-text-default)',
            marginBottom: 'var(--ds-spacing-2)',
          }}
        >
          ✓ Success
        </Heading>
        <Paragraph style={{ color: 'var(--ds-color-success-text-default)' }}>
          Your changes have been saved successfully
        </Paragraph>
      </div>

      {/* Warning */}
      <div
        style={{
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-warning-surface-default)',
          borderLeft: '4px solid var(--ds-color-warning-border-default)',
          borderRadius: 'var(--ds-border-radius-md)',
        }}
      >
        <Heading
          level={4}
          data-size="sm"
          style={{
            color: 'var(--ds-color-warning-text-default)',
            marginBottom: 'var(--ds-spacing-2)',
          }}
        >
          ⚠ Warning
        </Heading>
        <Paragraph style={{ color: 'var(--ds-color-warning-text-default)' }}>
          Your session will expire in 5 minutes
        </Paragraph>
      </div>

      {/* Error */}
      <div
        style={{
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-danger-surface-default)',
          borderLeft: '4px solid var(--ds-color-danger-border-default)',
          borderRadius: 'var(--ds-border-radius-md)',
        }}
      >
        <Heading
          level={4}
          data-size="sm"
          style={{
            color: 'var(--ds-color-danger-text-default)',
            marginBottom: 'var(--ds-spacing-2)',
          }}
        >
          ✕ Error
        </Heading>
        <Paragraph style={{ color: 'var(--ds-color-danger-text-default)' }}>
          Failed to save changes. Please try again
        </Paragraph>
      </div>

      {/* Info */}
      <div
        style={{
          padding: 'var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-info-surface-default)',
          borderLeft: '4px solid var(--ds-color-info-border-default)',
          borderRadius: 'var(--ds-border-radius-md)',
        }}
      >
        <Heading
          level={4}
          data-size="sm"
          style={{
            color: 'var(--ds-color-info-text-default)',
            marginBottom: 'var(--ds-spacing-2)',
          }}
        >
          ℹ Information
        </Heading>
        <Paragraph style={{ color: 'var(--ds-color-info-text-default)' }}>
          Scheduled maintenance on Saturday 02:00-04:00
        </Paragraph>
      </div>
    </div>
  ),
};

/**
 * Pattern 6: Loading States
 *
 * Clear feedback during async operations
 */
export const LoadingStates: Story = {
  render: () => (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-6)' }}>
      {/* Button Loading */}
      <Card style={{ padding: 'var(--ds-spacing-6)' }}>
        <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          Button Loading
        </Heading>
        <Button data-variant="primary" disabled>
          <span style={{ marginRight: 'var(--ds-spacing-2)' }}>⏳</span>
          Saving...
        </Button>
      </Card>

      {/* Spinner */}
      <Card style={{ padding: 'var(--ds-spacing-6)', textAlign: 'center' }}>
        <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          Spinner
        </Heading>
        <div
          style={{
            width: '40px',
            height: '40px',
            border: '4px solid var(--ds-color-neutral-border-subtle)',
            borderTop: '4px solid var(--ds-color-accent-base-default)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto',
          }}
        />
        <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
      </Card>

      {/* Skeleton */}
      <Card style={{ padding: 'var(--ds-spacing-6)' }}>
        <Heading level={4} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          Skeleton
        </Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
          {[100, 80, 90].map((width, i) => (
            <div
              key={i}
              style={{
                height: '16px',
                width: `${width}%`,
                backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                borderRadius: 'var(--ds-border-radius-sm)',
                animation: 'pulse 1.5s ease-in-out infinite',
              }}
            />
          ))}
        </div>
        <style>{`@keyframes pulse { 0%, 100% { opacity: 1; } 50% { opacity: 0.5; } }`}</style>
      </Card>
    </div>
  ),
};

/**
 * Patterns Summary
 */
export const Summary: Story = {
  render: () => (
    <Card style={{ padding: 'var(--ds-spacing-8)' }}>
      <Heading level={2} data-size="lg" style={{ marginBottom: 'var(--ds-spacing-6)' }}>
        Design Patterns Summary
      </Heading>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        {[
          {
            title: 'Form Patterns',
            patterns: [
              'Mark optional fields, not required',
              'Validate on blur, not on change',
              'Show errors after user interaction',
              'Provide clear error messages',
            ],
          },
          {
            title: 'Feedback Patterns',
            patterns: [
              'Use semantic colors (success, warning, error, info)',
              'Provide loading states for async operations',
              'Show empty states with helpful guidance',
              'Use consistent notification styles',
            ],
          },
          {
            title: 'Navigation Patterns',
            patterns: [
              'Show progress in multi-step flows',
              'Provide clear back/next navigation',
              'Indicate current location',
              'Enable keyboard navigation',
            ],
          },
        ].map(({ title, patterns }) => (
          <div key={title}>
            <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>
              {title}
            </Heading>
            <div
              style={{
                padding: 'var(--ds-spacing-4)',
                backgroundColor: 'var(--ds-color-neutral-surface-default)',
                borderRadius: 'var(--ds-border-radius-md)',
              }}
            >
              {patterns.map((pattern, i) => (
                <div
                  key={i}
                  style={{
                    display: 'flex',
                    gap: 'var(--ds-spacing-2)',
                    marginBottom: i < patterns.length - 1 ? 'var(--ds-spacing-2)' : 0,
                  }}
                >
                  <span style={{ color: 'var(--ds-color-success-text-default)' }}>✓</span>
                  <Paragraph data-size="sm">{pattern}</Paragraph>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  ),
};
