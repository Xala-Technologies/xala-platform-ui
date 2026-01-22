import type { Meta, StoryObj } from '@storybook/react';
import React, { useState } from 'react';
import { Select, Label, Field, ValidationMessage } from '@xala-technologies/platform/ui';

/**
 * Select component from Digdir Designsystemet.
 * 
 * Select allows users to choose an option from a list.
 * 
 * @see https://designsystemet.no/en/components/docs/select/overview
 */
const meta: Meta<typeof Select> = {
  title: 'Components/Select',
  component: Select,
  parameters: {
    docs: {
      description: {
        component: `
Select allows users to choose an option from a list. It is best suited for longer lists of options where space is limited.

## Variants

- **Default** - Standard select dropdown
- **With description** - Additional context below label
- **With grouping** - Organize options into categories using optgroup
- **With error** - Validation errors
- **Disabled** - Not editable (avoid if possible)
- **Read-only** - Show preselected value without editing

## Sizes

Available in three sizes: **sm**, **md** (default), **lg**.

## When to Use

- Many options (8+) to choose from
- Single selection required from predefined list
- Options are predefined and limited
- Space is limited (compared to radio buttons)
- Use Radio buttons for 2-7 options
- Use Combobox for searchable lists

## Best Practices

### Do
- Always provide a visible label using Field and Label components
- Include a default "Choose..." or "Select..." option
- Group related options with Select.Optgroup
- Sort options logically (alphabetically or by frequency)
- Use descriptions to provide additional context
- Provide clear error messages with ValidationMessage
- Make labels concise and descriptive

### Don't
- Don't use for 2-7 options (use Radio buttons instead)
- Don't disable without explaining why
- Don't use vague labels like "Select" or "Choose"
- Don't pre-select options unless there's a clear default
- Don't use for actions (use Button or Link instead)
- Don't nest optgroups (not supported)

## Usage Patterns

### Basic Select
\`\`\`tsx
<Field>
  <Label>Select a country</Label>
  <Select>
    <Select.Option value="">Choose...</Select.Option>
    <Select.Option value="no">Norway</Select.Option>
    <Select.Option value="se">Sweden</Select.Option>
    <Select.Option value="dk">Denmark</Select.Option>
  </Select>
</Field>
\`\`\`

### With Description
\`\`\`tsx
<Field>
  <Label>Preferred language</Label>
  <Field.Description>This will be used for all communications</Field.Description>
  <Select>
    <Select.Option value="">Choose...</Select.Option>
    <Select.Option value="nb">Norwegian (Bokmål)</Select.Option>
    <Select.Option value="en">English</Select.Option>
  </Select>
</Field>
\`\`\`

### With Error Validation
\`\`\`tsx
<Field>
  <Label>Category</Label>
  <Select aria-invalid="true">
    <Select.Option value="">Choose...</Select.Option>
    <Select.Option value="cat1">Category 1</Select.Option>
  </Select>
  <ValidationMessage>Please select a category</ValidationMessage>
</Field>
\`\`\`

### With Option Groups
\`\`\`tsx
<Field>
  <Label>Select a park</Label>
  <Select>
    <Select.Optgroup label="City Centre">
      <Select.Option value="park1">Central Park</Select.Option>
      <Select.Option value="park2">Palace Park</Select.Option>
    </Select.Optgroup>
    <Select.Optgroup label="Suburbs">
      <Select.Option value="park3">North Park</Select.Option>
    </Select.Optgroup>
  </Select>
</Field>
\`\`\`

## Anti-Patterns

### Anti-pattern: Using Select for Few Options
If you have 2-7 options, use Radio buttons instead for better visibility and accessibility.

### Anti-pattern: No Default Option
Without a "Choose..." option, users can't tell if a value was pre-selected or if they selected it.

### Anti-pattern: Using Select for Actions
Select is for choosing data, not triggering actions. Use Button or Link for actions.

### Anti-pattern: Disabling Without Explanation
Disabled selects without context confuse users. Provide explanation via description text.

## Accessibility

### Keyboard Navigation
- **Tab** moves focus to the select
- **Space** or **Enter** opens the dropdown
- **Arrow keys** (Up/Down) navigate options
- **Home/End** jump to first/last option
- **Escape** closes dropdown without selecting
- **Enter** selects focused option and closes dropdown

### Screen Readers
- Select role is announced
- Label is read when focused
- Current selection is announced
- Optgroup labels provide context
- Total number of options announced
- Disabled state is announced

### WCAG 2.1 AA Compliance
- **Label**: Every select must have a visible label
- **Color contrast**: Minimum 4.5:1 for text, 3:1 for borders
- **Focus visible**: Clear focus indicator (2px outline)
- **Touch target**: Minimum 44x44px for mobile
- **Name, Role, Value**: Proper semantic HTML and ARIA
- **Error identification**: Errors clearly identified with text
- **Keyboard accessible**: Full keyboard navigation support

### Required Selects
For required selections:
\`\`\`tsx
<Field>
  <Label>Country (required)</Label>
  <Select required aria-required="true">
    <Select.Option value="">Choose...</Select.Option>
    <Select.Option value="no">Norway</Select.Option>
  </Select>
</Field>
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
    disabled: {
      control: 'boolean',
      description: 'Disables the select',
    },
    readOnly: {
      control: 'boolean',
      description: 'Makes select read-only',
    },
    required: {
      control: 'boolean',
      description: 'Marks select as required',
    },
  },
};

export default meta;
type Story = StoryObj;

export const Default: Story = {
  render: () => (
    <Field>
      <Label>Select a country</Label>
      <Select>
        <Select.Option value="">Choose...</Select.Option>
        <Select.Option value="no">Norway</Select.Option>
        <Select.Option value="se">Sweden</Select.Option>
        <Select.Option value="dk">Denmark</Select.Option>
      </Select>
    </Field>
  ),
};

export const WithDescription: Story = {
  render: () => (
    <Field>
      <Label>Preferred language</Label>
      <Field.Description>This will be used for all communications</Field.Description>
      <Select>
        <Select.Option value="">Choose...</Select.Option>
        <Select.Option value="nb">Norwegian (Bokmal)</Select.Option>
        <Select.Option value="nn">Norwegian (Nynorsk)</Select.Option>
        <Select.Option value="en">English</Select.Option>
      </Select>
    </Field>
  ),
};

export const WithError: Story = {
  render: () => (
    <Field>
      <Label>Category</Label>
      <Select aria-invalid="true">
        <Select.Option value="">Choose...</Select.Option>
        <Select.Option value="lokaler">Lokaler og baner</Select.Option>
        <Select.Option value="utstyr">Utstyr og inventar</Select.Option>
      </Select>
      <ValidationMessage>Please select a category</ValidationMessage>
    </Field>
  ),
};

export const Disabled: Story = {
  render: () => (
    <Field>
      <Label>Status</Label>
      <Select disabled>
        <Select.Option value="active">Active</Select.Option>
      </Select>
    </Field>
  ),
};

export const Sizes: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
      <Field>
        <Label>Small</Label>
        <Select data-size="sm">
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select>
      </Field>
      <Field>
        <Label>Medium</Label>
        <Select data-size="md">
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select>
      </Field>
      <Field>
        <Label>Large</Label>
        <Select data-size="lg">
          <Select.Option value="1">Option 1</Select.Option>
          <Select.Option value="2">Option 2</Select.Option>
        </Select>
      </Field>
    </div>
  ),
};

/**
 * Read-only select - Show preselected value without editing
 */
export const ReadOnly: Story = {
  render: () => (
    <Field>
      <Label>Country</Label>
      <Select readOnly value="no">
        <Select.Option value="no">Norway</Select.Option>
      </Select>
    </Field>
  ),
};

/**
 * Option groups - Organize options into categories
 */
export const OptionGroups: Story = {
  render: () => (
    <Field>
      <Label>Select a park</Label>
      <Select>
        <Select.Optgroup label="Grünerløkka">
          <Select.Option value="sofienbergparken">Sofienberg Park</Select.Option>
          <Select.Option value="birkelunden">Birkelunden</Select.Option>
          <Select.Option value="olafryesplass">Olaf Ryes Plass</Select.Option>
        </Select.Optgroup>
        <Select.Optgroup label="City centre">
          <Select.Option value="slottsparken">The Palace Park</Select.Option>
          <Select.Option value="studenterlunden">Studenterlunden</Select.Option>
        </Select.Optgroup>
        <Select.Optgroup label="Old Oslo">
          <Select.Option value="botsparken">Botsparken</Select.Option>
          <Select.Option value="klosterenga">Klosterenga Park</Select.Option>
        </Select.Optgroup>
      </Select>
    </Field>
  ),
};

/**
 * Multiple selects in a form
 */
export const FormExample: Story = {
  render: () => {
    const [country, setCountry] = useState('');
    const [city, setCity] = useState('');

    return (
      <form style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)', maxWidth: '400px' }}>
        <Field>
          <Label>Country</Label>
          <Field.Description>Select your country of residence</Field.Description>
          <Select value={country} onChange={(e) => setCountry(e.target.value)}>
            <Select.Option value="">Choose...</Select.Option>
            <Select.Option value="no">Norway</Select.Option>
            <Select.Option value="se">Sweden</Select.Option>
            <Select.Option value="dk">Denmark</Select.Option>
            <Select.Option value="fi">Finland</Select.Option>
          </Select>
        </Field>

        <Field>
          <Label>City</Label>
          <Select value={city} onChange={(e) => setCity(e.target.value)} disabled={!country}>
            <Select.Option value="">Choose...</Select.Option>
            {country === 'no' && (
              <>
                <Select.Option value="oslo">Oslo</Select.Option>
                <Select.Option value="bergen">Bergen</Select.Option>
                <Select.Option value="trondheim">Trondheim</Select.Option>
              </>
            )}
            {country === 'se' && (
              <>
                <Select.Option value="stockholm">Stockholm</Select.Option>
                <Select.Option value="gothenburg">Gothenburg</Select.Option>
              </>
            )}
          </Select>
          {!country && <Field.Description>Select a country first</Field.Description>}
        </Field>
      </form>
    );
  },
};

/**
 * All variants overview
 */
export const AllVariants: Story = {
  render: () => (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-6)' }}>
      <div>
        <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>States</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
          <Field>
            <Label>Default</Label>
            <Select>
              <Select.Option value="">Choose...</Select.Option>
              <Select.Option value="1">Option 1</Select.Option>
              <Select.Option value="2">Option 2</Select.Option>
            </Select>
          </Field>
          <Field>
            <Label>With error</Label>
            <Select aria-invalid="true">
              <Select.Option value="">Choose...</Select.Option>
              <Select.Option value="1">Option 1</Select.Option>
            </Select>
            <ValidationMessage>Please select an option</ValidationMessage>
          </Field>
          <Field>
            <Label>Disabled</Label>
            <Select disabled>
              <Select.Option value="1">Option 1</Select.Option>
            </Select>
          </Field>
          <Field>
            <Label>Read-only</Label>
            <Select readOnly value="1">
              <Select.Option value="1">Selected Option</Select.Option>
            </Select>
          </Field>
        </div>
      </div>

      <div>
        <h3 style={{ marginBottom: 'var(--ds-spacing-3)', fontSize: 'var(--ds-font-size-4)' }}>Sizes</h3>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-3)' }}>
          <Field>
            <Label>Small</Label>
            <Select data-size="sm">
              <Select.Option value="1">Option 1</Select.Option>
            </Select>
          </Field>
          <Field>
            <Label>Medium</Label>
            <Select data-size="md">
              <Select.Option value="1">Option 1</Select.Option>
            </Select>
          </Field>
          <Field>
            <Label>Large</Label>
            <Select data-size="lg">
              <Select.Option value="1">Option 1</Select.Option>
            </Select>
          </Field>
        </div>
      </div>
    </div>
  ),
};
