import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { ErrorSummary } from '../../index';

const meta: Meta = {
  title: 'Components/ErrorSummary',
  parameters: {
    docs: {
      description: {
        component: `
ErrorSummary displays a summary of form validation errors, helping users identify and fix multiple issues quickly.

## Variants

- **Default** - Standard error summary with heading and list
- **Single error** - Single error message
- **Multiple errors** - List of multiple validation errors
- **With field links** - Links directly to error fields
- **Inline** - Inline error display

## When to Use

- Form validation errors at the top of a form
- After form submission with errors
- To guide users to fix multiple errors
- Complex forms with validation requirements
- Multi-step forms with error collection
- Search results with no matches

## Best Practices

### Do
- Place at top of form after submission
- Use clear, actionable error messages
- Link directly to fields with errors
- Receive focus when displayed
- Use role="alert" for screen readers
- Group related errors together

### Don't
- Don't show before form submission
- Don't use technical jargon
- Don't hide error summary from users
- Don't use for single field errors (use inline)
- Don't overwhelm with too many errors
- Don't forget to update when errors are fixed

## Usage Patterns

### Basic Error Summary
\`\`\`tsx
<ErrorSummary>
  <ErrorSummary.Heading>Please fix the following errors:</ErrorSummary.Heading>
  <ErrorSummary.List>
    <ErrorSummary.Item>
      <ErrorSummary.Link href="#name">Name is required</ErrorSummary.Link>
    </ErrorSummary.Item>
    <ErrorSummary.Item>
      <ErrorSummary.Link href="#email">Enter a valid email address</ErrorSummary.Link>
    </ErrorSummary.Item>
  </ErrorSummary.List>
</ErrorSummary>
\`\`\`

### Single Error
\`\`\`tsx
<ErrorSummary>
  <ErrorSummary.Heading>Please fix the following error:</ErrorSummary.Heading>
  <ErrorSummary.List>
    <ErrorSummary.Item>
      <ErrorSummary.Link href="#date">Select a valid date</ErrorSummary.Link>
    </ErrorSummary.Item>
  </ErrorSummary.List>
</ErrorSummary>
\`\`\`

### Multiple Errors
\`\`\`tsx
<ErrorSummary>
  <ErrorSummary.Heading>There are 4 errors in your form</ErrorSummary.Heading>
  <ErrorSummary.List>
    <ErrorSummary.Item>
      <ErrorSummary.Link href="#firstName">First name is required</ErrorSummary.Link>
    </ErrorSummary.Item>
    <ErrorSummary.Item>
      <ErrorSummary.Link href="#lastName">Last name is required</ErrorSummary.Link>
    </ErrorSummary.Item>
    <ErrorSummary.Item>
      <ErrorSummary.Link href="#phone">Phone number must be 8 digits</ErrorSummary.Link>
    </ErrorSummary.Item>
    <ErrorSummary.Item>
      <ErrorSummary.Link href="#terms">You must accept the terms</ErrorSummary.Link>
    </ErrorSummary.Item>
  </ErrorSummary.List>
</ErrorSummary>
\`\`\`

### With Error Count
\`\`\`tsx
const errors = [
  { id: '1', fieldId: 'firstName', message: 'First name is required' },
  { id: '2', fieldId: 'lastName', message: 'Last name is required' }
];
const errorCount = errors.length;

<ErrorSummary>
  <ErrorSummary.Heading>
    {errorCount === 1
      ? 'There is 1 error in your form'
      : \`There are \${errorCount} errors in your form\`
    }
  </ErrorSummary.Heading>
  <ErrorSummary.List>
    {errors.map(error => (
      <ErrorSummary.Item key={error.id}>
        <ErrorSummary.Link href={\`#\${error.fieldId}\`}>
          {error.message}
        </ErrorSummary.Link>
      </ErrorSummary.Item>
    ))}
  </ErrorSummary.List>
</ErrorSummary>
\`\`\`

## Anti-Patterns

### Anti-pattern: Pre-submission Errors
Showing error summary before user submits the form.

### Anti-pattern: Vague Error Messages
Using generic text like "Invalid input" without context.

### Anti-pattern: No Field Links
Not providing links to the specific fields with errors.

### Anti-pattern: Persistent Errors
Not updating error summary when errors are fixed.

## Accessibility

### Screen Readers
- Role="alert" announces errors immediately
- Error count and messages announced
- Links provide navigation to error fields
- Focus management for error correction
- State changes communicated

### Keyboard Navigation
- Tab navigates through error links
- Enter activates error field links
- Focus moves to linked field
- Logical tab order maintained
- All errors accessible via keyboard

### WCAG 2.1 AA Compliance
- **Error identification**: Errors clearly identified
- **Error correction**: Suggestions for fixing errors
- **Error prevention**: Confirmation for important actions
- **Keyboard accessible**: All errors reachable via keyboard
- **Focus management**: Focus moves to error fields

### ARIA Implementation
\`\`\`tsx
<div role="alert" aria-labelledby="error-summary-heading">
  <h2 id="error-summary-heading">There are 2 errors</h2>
  <ul>
    <li>
      <a href="#field1" aria-describedby="field1-error">
        Name is required
      </a>
    </li>
    <li>
      <a href="#field2" aria-describedby="field2-error">
        Email is invalid
      </a>
    </li>
  </ul>
</div>
\`\`\`

### Best Practice for Error Messages
Use clear, actionable messages:
\`\`\`tsx
// Good
<ErrorSummary.Link href="#email">Enter a valid email address (e.g., name@example.com)</ErrorSummary.Link>

// Bad
<ErrorSummary.Link href="#email">Invalid input</ErrorSummary.Link>
\`\`\`

### Focus Management
\`\`\`tsx
const errorSummaryRef = useRef<HTMLDivElement>(null);

// After form validation with errors
if (hasErrors) {
  errorSummaryRef.current?.focus();
}
\`\`\`

### Link Implementation
Links should focus and scroll to error fields:
\`\`\`tsx
<ErrorSummary.Link
  href="#email-field"
  onClick={(e) => {
    e.preventDefault();
    const field = document.getElementById('email-field');
    field?.focus();
    field?.scrollIntoView({ behavior: 'smooth', block: 'center' });
  }}
>
  Email is required
</ErrorSummary.Link>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ErrorSummary>
        <ErrorSummary.Heading>{t('storybook.demo.pleaseFixErrors')}</ErrorSummary.Heading>
        <ErrorSummary.List>
          <ErrorSummary.Item>
            <ErrorSummary.Link href="#name">
              {t('platform.validation.required', { field: t('storybook.demo.name') })}
            </ErrorSummary.Link>
          </ErrorSummary.Item>
          <ErrorSummary.Item>
            <ErrorSummary.Link href="#email">{t('platform.validation.email')}</ErrorSummary.Link>
          </ErrorSummary.Item>
        </ErrorSummary.List>
      </ErrorSummary>
    );
  },
};

export const MultipleErrors: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ErrorSummary>
        <ErrorSummary.Heading>
          {t('storybook.demo.thereAreNErrorsInForm', { count: 4 })}
        </ErrorSummary.Heading>
        <ErrorSummary.List>
          <ErrorSummary.Item>
            <ErrorSummary.Link href="#firstName">
              {t('platform.validation.required', { field: t('storybook.demo.firstName') })}
            </ErrorSummary.Link>
          </ErrorSummary.Item>
          <ErrorSummary.Item>
            <ErrorSummary.Link href="#lastName">
              {t('platform.validation.required', { field: t('storybook.demo.lastName') })}
            </ErrorSummary.Link>
          </ErrorSummary.Item>
          <ErrorSummary.Item>
            <ErrorSummary.Link href="#phone">
              {t('storybook.demo.phoneMustBe8Digits')}
            </ErrorSummary.Link>
          </ErrorSummary.Item>
          <ErrorSummary.Item>
            <ErrorSummary.Link href="#terms">
              {t('storybook.demo.mustAcceptTerms')}
            </ErrorSummary.Link>
          </ErrorSummary.Item>
        </ErrorSummary.List>
      </ErrorSummary>
    );
  },
};

export const SingleError: Story = {
  render: function Render() {
    const t = useT();
    return (
      <ErrorSummary>
        <ErrorSummary.Heading>{t('storybook.demo.pleaseFixFollowingError')}</ErrorSummary.Heading>
        <ErrorSummary.List>
          <ErrorSummary.Item>
            <ErrorSummary.Link href="#date">
              {t('storybook.demo.selectValidDate')}
            </ErrorSummary.Link>
          </ErrorSummary.Item>
        </ErrorSummary.List>
      </ErrorSummary>
    );
  },
};

export const Sizes: Story = {
  render: function Render() {
    const t = useT();
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
        <ErrorSummary data-size="sm">
          <ErrorSummary.Heading>{t('storybook.story.smallSize')}</ErrorSummary.Heading>
          <ErrorSummary.List>
            <ErrorSummary.Item>
              <ErrorSummary.Link href="#field1">
                {t('storybook.demo.errorMessage')}
              </ErrorSummary.Link>
            </ErrorSummary.Item>
          </ErrorSummary.List>
        </ErrorSummary>
        <ErrorSummary data-size="md">
          <ErrorSummary.Heading>{t('storybook.story.mediumSizeDefault')}</ErrorSummary.Heading>
          <ErrorSummary.List>
            <ErrorSummary.Item>
              <ErrorSummary.Link href="#field2">
                {t('storybook.demo.errorMessage')}
              </ErrorSummary.Link>
            </ErrorSummary.Item>
          </ErrorSummary.List>
        </ErrorSummary>
        <ErrorSummary data-size="lg">
          <ErrorSummary.Heading>{t('storybook.story.largeSize')}</ErrorSummary.Heading>
          <ErrorSummary.List>
            <ErrorSummary.Item>
              <ErrorSummary.Link href="#field3">
                {t('storybook.demo.errorMessage')}
              </ErrorSummary.Link>
            </ErrorSummary.Item>
          </ErrorSummary.List>
        </ErrorSummary>
      </div>
    );
  },
};
