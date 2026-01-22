import type { Meta, StoryObj } from '@storybook/react';
import { Field, Label, Input, Textarea, Select, ValidationMessage } from '@xala-technologies/platform/ui';

const meta: Meta = {
  title: 'Components/Field',
  parameters: {
    docs: {
      description: {
        component: `
Field component wraps form inputs with proper labeling, descriptions, and validation messages. It ensures accessibility and consistent form structure.

## Variants

- **Default** - Basic field with label and input
- **With description** - Includes helpful description text
- **With validation** - Shows error or success messages
- **With counter** - Character counter for text inputs
- **Required** - Indicates required fields
- **Disabled** - Disabled field state

## When to Use

- Form inputs requiring labels
- Inputs with descriptions or help text
- Inputs with validation messages
- Text inputs with character limits
- Required form fields
- Complex form layouts

## Best Practices

### Do
- Always provide labels for inputs
- Use descriptions for additional context
- Show validation messages clearly
- Connect error messages to inputs
- Use character counters when appropriate
- Mark required fields clearly

### Don't
- Don't use placeholder text as labels
- Don't hide validation messages
- Don't use fields without proper labeling
- Don't forget error state indicators
- Don't make descriptions too long
- Don't use multiple labels per input

## Usage Patterns

### Basic Field
\`\`\`tsx
<Field>
  <Label>Full name</Label>
  <Input aria-label="Full name" />
</Field>
\`\`\`

### With Description
\`\`\`tsx
<Field>
  <Label>Email address</Label>
  <Field.Description>We will never share your email with anyone.</Field.Description>
  <Input type="email" aria-label="Email address" />
</Field>
\`\`\`

### With Validation
\`\`\`tsx
<Field>
  <Label>Phone number</Label>
  <Input aria-invalid="true" />
  <ValidationMessage>Phone number must be 8 digits</ValidationMessage>
</Field>
\`\`\`

### With Textarea and Counter
\`\`\`tsx
<Field>
  <Label>Description</Label>
  <Field.Description>Max 500 characters</Field.Description>
  <Textarea rows={4} />
  <Field.Counter limit={500} />
</Field>
\`\`\`

### With Select
\`\`\`tsx
<Field>
  <Label>Country</Label>
  <Select>
    <Select.Option value="">Choose a country...</Select.Option>
    <Select.Option value="no">Norway</Select.Option>
    <Select.Option value="se">Sweden</Select.Option>
    <Select.Option value="dk">Denmark</Select.Option>
  </Select>
</Field>
\`\`\`

### Required Field
\`\`\`tsx
<Field>
  <Label required>Email address</Label>
  <Input type="email" required aria-required="true" aria-label="Email address" />
</Field>
\`\`\`

## Anti-Patterns

### Anti-pattern: Placeholder as Label
Using placeholder text instead of proper labels harms accessibility.

### Anti-pattern: Missing Error Association
Not connecting error messages to their inputs confuses users.

### Anti-pattern: Vague Descriptions
Using generic text that doesn't help users understand the field.

### Anti-pattern: Hidden Validation
Making validation messages hard to find or understand.

## Accessibility

### Screen Readers
- Label properly associated with input
- Description text announced
- Error messages connected to inputs
- Required state clearly indicated
- Character counts announced

### Keyboard Navigation
- Tab navigates to input field
- Focus moves to label first
- Error messages reachable via keyboard
- All interactive elements accessible

### WCAG 2.1 AA Compliance
- **Label association**: Labels properly connected to inputs
- **Error identification**: Errors clearly identified and described
- **Instructions**: Additional instructions provided when needed
- **Error prevention**: Validation helps prevent errors
- **Keyboard accessible**: All elements reachable via keyboard

### ARIA Implementation
\`\`\`tsx
<Field>
  <Label htmlFor="email">Email address</Label>
  <Field.Description id="email-desc">We'll never share your email.</Field.Description>
  <Input 
    id="email"
    aria-describedby="email-desc email-error"
    aria-invalid="true"
    aria-required="true"
  />
  <ValidationMessage id="email-error" role="alert">
    Please enter a valid email
  </ValidationMessage>
</Field>
\`\`\`

### Best Practice for Labels
Use clear, descriptive labels:
\`\`\`tsx
// Good
<Label>First name</Label>
<Label>Email address</Label>
<Label>Phone number (optional)</Label>

// Bad
<Label>Name</Label>
<Label>Info</Label>
<Label>Enter text</Label>
\`\`\`

### Validation States
\`\`\`tsx
// Error state
<Field>
  <Label>Email</Label>
  <Input aria-invalid="true" />
  <ValidationMessage>Invalid email format</ValidationMessage>
</Field>

// Success state
<Field>
  <Label>Password</Label>
  <Input aria-invalid="false" />
  <ValidationMessage variant="success">Password strength: Strong</ValidationMessage>
</Field>
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
  render: () => (
    <Field>
      <Label>Full name</Label>
      <Input aria-label="Full name" />
    </Field>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Field>
      <Label>Email address</Label>
      <Field.Description>We will never share your email with anyone.</Field.Description>
      <Input type="email" aria-label="Email address" />
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field>
      <Label>Phone number</Label>
      <Input aria-invalid="true" aria-label="Phone number" />
      <ValidationMessage>Phone number must be 8 digits</ValidationMessage>
    </Field>
  ),
};

export const WithTextarea: Story = {
  render: () => (
    <Field>
      <Label>Description</Label>
      <Field.Description>Max 500 characters</Field.Description>
      <Textarea rows={4} />
      <Field.Counter limit={500} />
    </Field>
  ),
};

export const WithSelect: Story = {
  render: () => (
    <Field>
      <Label>Country</Label>
      <Select>
        <Select.Option value="">Choose a country...</Select.Option>
        <Select.Option value="no">Norway</Select.Option>
        <Select.Option value="se">Sweden</Select.Option>
        <Select.Option value="dk">Denmark</Select.Option>
      </Select>
    </Field>
  ),
};

export const Required: Story = {
  render: () => (
    <Field>
      <Label>
        Name <span aria-hidden="true">*</span>
      </Label>
      <Input required aria-label="Name" />
    </Field>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
      <Field data-size="sm">
        <Label>Small field</Label>
        <Input aria-label="Small field input" />
      </Field>
      <Field data-size="md">
        <Label>Medium field</Label>
        <Input aria-label="Medium field input" />
      </Field>
      <Field data-size="lg">
        <Label>Large field</Label>
        <Input aria-label="Large field input" />
      </Field>
    </div>
  ),
};
