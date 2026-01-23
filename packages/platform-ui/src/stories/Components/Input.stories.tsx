import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { expect, userEvent, within } from '@storybook/test';
import { Textfield, Tag, Heading } from '../../index';

/**
 * Textfield component from Digdir Designsystemet.
 * 
 * Textfield allows users to enter free text or numbers.
 * 
 * @see https://designsystemet.no/en/components/docs/textfield/overview
 */
const meta: Meta<typeof Textfield> = {
  title: 'Components/Input',
  component: Textfield,
  parameters: {
    docs: {
      description: {
        component: `
Textfield allows users to enter free text or numbers. It is one of the most commonly used form components.

## Variants

- **Single-line** - Default text input for short text
- **Multiline** - Textarea for longer text (use Textarea component instead)
- **With prefix/suffix** - Show units, currency, or context
- **With counter** - Character count feedback for length limits
- **Required/Optional** - Clear field requirements with visual indicators

## Input Types

Use appropriate input types for better mobile keyboards and validation:

- **text** - General text input (default)
- **email** - Email addresses with @ keyboard
- **password** - Password fields with hidden characters
- **tel** - Phone numbers with numeric keyboard
- **number** - Numeric input with increment/decrement
- **url** - URLs with .com keyboard shortcuts
- **search** - Search fields with clear button

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## Best Practices

### Do
- Always provide a visible label (required for accessibility)
- Use appropriate input types for better UX and validation
- Adjust width to match expected input length
- Provide clear, helpful error messages
- Use description text for additional context
- Mark required fields clearly with visual indicators
- Allow copy and paste functionality
- Show character counter for length-limited fields
- Use prefix/suffix for units or currency

### Don't
- Don't rely only on placeholder text (it disappears on input)
- Don't make inputs too narrow (minimum 20 characters visible)
- Don't use generic error messages like "Invalid input"
- Don't disable paste functionality
- Don't use input type="number" for IDs or codes (use type="text")
- Don't make labels too long (keep under 40 characters)

## Usage Patterns

### Basic Input with Label
\`\`\`tsx
<Textfield 
  label="Email address" 
  type="email"
  placeholder="name@example.com"
/>
\`\`\`

### With Description
\`\`\`tsx
<Textfield 
  label="Username" 
  description="Choose a unique username (3-20 characters)"
  minLength={3}
  maxLength={20}
/>
\`\`\`

### With Error
\`\`\`tsx
<Textfield 
  label="Email" 
  type="email"
  error="Please enter a valid email address"
  defaultValue="invalid-email"
/>
\`\`\`

### With Prefix/Suffix
\`\`\`tsx
<Textfield 
  label="Price" 
  type="number"
  prefix="$"
  suffix="USD"
/>
\`\`\`

### With Character Counter
\`\`\`tsx
<Textfield 
  label="Bio" 
  counter={160}
  maxLength={160}
  description="Brief description for your profile"
/>
\`\`\`

## Anti-Patterns

### Anti-pattern: Placeholder as Label
Placeholders disappear when user starts typing, making it hard to remember what the field is for.

### Anti-pattern: No Error Messages
Showing only a red border without explaining what's wrong frustrates users.

### Anti-pattern: Wrong Input Type
Using type="number" for credit cards or phone numbers causes issues with leading zeros and formatting.

### Anti-pattern: Disabled Paste
Preventing paste makes it harder for users with password managers and reduces security.

## Accessibility

### Keyboard Navigation
- **Tab** moves focus to the input
- **Shift+Tab** moves focus to previous element
- **Arrow keys** move cursor within text
- **Home/End** jump to start/end of text

### Screen Readers
- Label is announced when input receives focus
- Description text provides additional context
- Error messages are announced via aria-describedby
- Required state is announced
- Input type affects how value is read

### WCAG 2.1 AA Compliance
- **Label**: Every input must have a visible label (not just placeholder)
- **Color contrast**: Minimum 4.5:1 for text, 3:1 for borders
- **Focus visible**: Clear focus indicator (2px outline)
- **Error identification**: Errors clearly identified with text (not just color)
- **Touch target**: Minimum 44x44px for mobile
- **Name, Role, Value**: Proper semantic HTML and ARIA attributes

### Required Fields
Mark required fields clearly:
\`\`\`tsx
<Textfield
  label={<>
    Email address
    <Tag data-color="warning" style={{ marginInlineStart: 'var(--ds-spacing-2)' }}>
      Required
    </Tag>
  </>}
  type="email"
  required
/>
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
    type: {
      control: 'select',
      options: ['text', 'email', 'password', 'tel', 'number', 'url', 'search'],
      description: 'Input type for validation and keyboard',
    },
    disabled: {
      control: 'boolean',
      description: 'Disables the input',
    },
    readOnly: {
      control: 'boolean',
      description: 'Makes input read-only',
    },
    error: {
      control: 'text',
      description: 'Error message',
    },
    multiline: {
      control: 'boolean',
      description: 'Converts to textarea',
    },
  },
};

export default meta;
type Story = StoryObj;

/**
 * Default text input with typing interaction test.
 *
 * This story tests:
 * - Input can be focused
 * - User can type into input
 * - Value updates correctly
 */
export const Default: Story = {
  render: () => (
    <Textfield label="Name" placeholder="Enter your name" />
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    // Find the input by label
    const input = canvas.getByLabelText('Name');

    // Verify placeholder
    await expect(input).toHaveAttribute('placeholder', 'Enter your name');

    // Type into the input
    await userEvent.type(input, 'Ola Nordmann');

    // Verify value was typed
    await expect(input).toHaveValue('Ola Nordmann');
  },
};

/**
 * With description - Provide helpful context
 */
export const WithDescription: Story = {
  render: () => (
    <Textfield 
      label="Email" 
      description="We will never share your email with anyone"
      placeholder="name@example.com"
      type="email"
    />
  ),
};

/**
 * Input with error
 */
export const WithError: Story = {
  render: () => (
    <Textfield 
      label="Email" 
      error="Please enter a valid email address"
      defaultValue="invalid-email"
      type="email"
    />
  ),
};

/**
 * Disabled input
 */
export const Disabled: Story = {
  render: () => (
    <Textfield 
      label="Username" 
      defaultValue="john_doe"
      disabled
    />
  ),
};

/**
 * Read-only input
 */
export const ReadOnly: Story = {
  render: () => (
    <Textfield 
      label="Account ID" 
      defaultValue="ACC-12345-XYZ"
      readOnly
    />
  ),
};

/**
 * Password input
 */
export const Password: Story = {
  render: () => (
    <Textfield 
      label="Password" 
      type="password"
      placeholder="Enter your password"
    />
  ),
};

/**
 * Multiline textarea - Use for longer text input
 */
export const Multiline: Story = {
  render: () => (
    <Textfield 
      label="Comments" 
      multiline 
      rows={4}
      placeholder="Enter your comments here..."
    />
  ),
};

/**
 * With prefix and suffix - Show units, currency, or context
 */
export const WithPrefixSuffix: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <Textfield 
        prefix="GBP" 
        suffix="per month" 
        label="How much does it cost per month?" 
      />
      <Textfield 
        prefix="$" 
        label="Price" 
        type="number"
      />
      <Textfield 
        suffix="kg" 
        label="Weight" 
        type="number"
      />
    </div>
  ),
};

/**
 * With character counter - Inform users about character limits
 */
export const WithCounter: Story = {
  render: () => (
    <Textfield 
      counter={50} 
      label="Short description" 
      placeholder="Max 50 characters"
    />
  ),
};

/**
 * Required and optional fields - Clear field requirements
 */
export const RequiredOptional: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <Textfield
        label={
          <>
            Where do you live?
            <Tag data-color="warning" style={{ marginInlineStart: 'var(--ds-spacing-2)' }}>
              Required
            </Tag>
          </>
        }
        required
      />
      <Textfield
        label={
          <>
            Middle name
            <Tag data-color="neutral" style={{ marginInlineStart: 'var(--ds-spacing-2)' }}>
              Optional
            </Tag>
          </>
        }
      />
    </div>
  ),
};

/**
 * Input types - Different input types for better UX
 */
export const InputTypes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <Textfield label="Text" type="text" placeholder="General text" />
      <Textfield label="Email" type="email" placeholder="name@example.com" />
      <Textfield label="Password" type="password" placeholder="Enter password" />
      <Textfield label="Phone" type="tel" placeholder="+47 XXX XX XXX" />
      <Textfield label="Number" type="number" placeholder="0" />
      <Textfield label="URL" type="url" placeholder="https://example.com" />
      <Textfield label="Search" type="search" placeholder="Search..." />
    </div>
  ),
};

/**
 * Size variants - Different sizes for different contexts
 */
export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <Textfield label="Small" data-size="sm" placeholder="Small input" />
      <Textfield label="Medium" data-size="md" placeholder="Medium input" />
      <Textfield label="Large" data-size="lg" placeholder="Large input" />
    </div>
  ),
};

/**
 * Form example with validation
 */
export const FormExample: Story = {
  render: () => {
    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');

    const validateEmail = (value: string) => {
      if (!value) {
        setEmailError('Email is required');
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
        setEmailError('Please enter a valid email address');
      } else {
        setEmailError('');
      }
    };

    return (
      <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)', maxWidth: '400px' }}>
        <Textfield 
          label="First Name" 
          placeholder="Enter first name" 
          required
        />
        <Textfield 
          label="Last Name" 
          placeholder="Enter last name" 
          required
        />
        <Textfield 
          label="Email" 
          type="email" 
          placeholder="name@example.com"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e.target.value);
          }}
          error={emailError}
          required
        />
        <Textfield 
          label="Phone" 
          type="tel" 
          placeholder="+47 XXX XX XXX"
          description="We'll only use this for order updates"
        />
      </form>
    );
  },
};

/**
 * Best Practices - Examples of correct and incorrect input usage.
 */
export const BestPractices: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-8)' }}>
      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)', color: 'var(--ds-color-success-text-default)' }}>Do: Always provide visible labels</Heading>
        <Textfield 
          label="Email address" 
          type="email"
          placeholder="name@example.com"
        />
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)', color: 'var(--ds-color-success-text-default)' }}>Do: Use appropriate input types</Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
          <Textfield label="Email" type="email" placeholder="name@example.com" />
          <Textfield label="Phone" type="tel" placeholder="+47 XXX XX XXX" />
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)', color: 'var(--ds-color-success-text-default)' }}>Do: Provide clear error messages</Heading>
        <Textfield 
          label="Email" 
          type="email"
          error="Please enter a valid email address (e.g., name@example.com)"
          defaultValue="invalid"
        />
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)', color: 'var(--ds-color-danger-text-default)' }}>Don't: Use placeholder as label</Heading>
        <div style={{ opacity: 0.6 }}>
          <Textfield aria-label="Email address (bad example)" placeholder="Enter your email address" />
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)', color: 'var(--ds-color-danger-text-default)' }}>Don't: Use generic error messages</Heading>
        <div style={{ opacity: 0.6 }}>
          <Textfield 
            label="Email" 
            error="Invalid input"
            defaultValue="test"
          />
        </div>
      </div>
    </div>
  ),
};

/**
 * All variants overview - Complete showcase of all input variations.
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>States</Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
          <Textfield label="Default" placeholder="Enter text" />
          <Textfield label="With value" defaultValue="Some text" />
          <Textfield label="With error" error="This field is required" />
          <Textfield label="Disabled" defaultValue="Cannot edit" disabled />
          <Textfield label="Read-only" defaultValue="Can read only" readOnly />
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>Sizes</Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
          <Textfield label="Small" data-size="sm" placeholder="Small" />
          <Textfield label="Medium" data-size="md" placeholder="Medium" />
          <Textfield label="Large" data-size="lg" placeholder="Large" />
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>Input Types</Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
          <Textfield label="Text" type="text" placeholder="General text" />
          <Textfield label="Email" type="email" placeholder="name@example.com" />
          <Textfield label="Password" type="password" placeholder="Enter password" />
          <Textfield label="Phone" type="tel" placeholder="+47 XXX XX XXX" />
          <Textfield label="Number" type="number" placeholder="0" />
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>With Affixes</Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
          <Textfield prefix="$" label="Price" type="number" />
          <Textfield suffix="kg" label="Weight" type="number" />
          <Textfield prefix="https://" suffix=".com" label="Website" />
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>With Description & Counter</Heading>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
          <Textfield 
            label="Username" 
            description="Choose a unique username"
            placeholder="johndoe"
          />
          <Textfield 
            label="Bio" 
            counter={50}
            maxLength={50}
            placeholder="Short bio"
          />
        </div>
      </div>

      <div>
        <Heading level={3} data-size="sm" style={{ marginBottom: 'var(--ds-spacing-3)' }}>Required Fields</Heading>
        <Textfield
          label={<>
            Email address
            <Tag data-color="warning" style={{ marginInlineStart: 'var(--ds-spacing-2)' }}>
              Required
            </Tag>
          </>}
          type="email"
          required
        />
      </div>
    </div>
  ),
};
