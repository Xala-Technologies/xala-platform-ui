import type { Meta, StoryObj } from '@storybook/react';
import { fn } from '@storybook/test';
import {
  FormSection,
  FormActions,
  FormRow,
  FormField,
  FormDivider,
} from '../../composed/FormLayout';
import { Button, Textfield, Textarea, Select } from '@digdir/designsystemet-react';

const meta: Meta<typeof FormSection> = {
  title: 'Composed/FormLayout',
  component: FormSection,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## FormLayout Components

Form sections, actions, and layout helpers for consistent form structure.

### Features
- FormSection with collapsible support
- FormActions with alignment options
- FormRow with grid layout
- FormField with label and error handling
- FormDivider for visual separation

### Usage
\`\`\`tsx
<FormSection title="Personal Information" description="Enter your details">
  <FormRow columns={2}>
    <FormField label="First Name" required>
      <Textfield />
    </FormField>
  </FormRow>
</FormSection>
\`\`\`
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof meta>;

// Basic form section
export const BasicSection: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <FormSection title="Personal Information" description="Enter your personal details">
        <FormField label="Full Name" required>
          <Textfield placeholder="John Doe" />
        </FormField>
        <FormField label="Email" required>
          <Textfield type="email" placeholder="john@example.com" />
        </FormField>
      </FormSection>
    </div>
  ),
};

// Collapsible section
export const CollapsibleSection: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <FormSection
        title="Advanced Settings"
        description="Optional advanced configuration"
        collapsible
        defaultCollapsed={true}
      >
        <FormField label="API Key">
          <Textfield placeholder="Enter API key" />
        </FormField>
        <FormField label="Webhook URL">
          <Textfield placeholder="https://example.com/webhook" />
        </FormField>
      </FormSection>
    </div>
  ),
};

// Form row with multiple columns
export const FormRowTwoColumns: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <FormSection title="Contact Information">
        <FormRow columns={2}>
          <FormField label="First Name" required>
            <Textfield placeholder="John" />
          </FormField>
          <FormField label="Last Name" required>
            <Textfield placeholder="Doe" />
          </FormField>
        </FormRow>
        <FormRow columns={2}>
          <FormField label="Phone">
            <Textfield type="tel" placeholder="+47 12 34 56 78" />
          </FormField>
          <FormField label="Email" required>
            <Textfield type="email" placeholder="john@example.com" />
          </FormField>
        </FormRow>
      </FormSection>
    </div>
  ),
};

// Form row with three columns
export const FormRowThreeColumns: Story = {
  render: () => (
    <div style={{ width: '800px' }}>
      <FormSection title="Address">
        <FormRow columns={3}>
          <FormField label="Street">
            <Textfield placeholder="Storgata 1" />
          </FormField>
          <FormField label="Postal Code">
            <Textfield placeholder="0155" />
          </FormField>
          <FormField label="City">
            <Textfield placeholder="Oslo" />
          </FormField>
        </FormRow>
      </FormSection>
    </div>
  ),
};

// Form field with error
export const FormFieldWithError: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <FormSection title="Validation Example">
        <FormField label="Email" required error="Please enter a valid email address">
          <Textfield type="email" placeholder="invalid-email" />
        </FormField>
        <FormField label="Password" required helperText="Must be at least 8 characters">
          <Textfield type="password" />
        </FormField>
      </FormSection>
    </div>
  ),
};

// Form actions - right aligned
export const FormActionsRight: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <FormSection title="Form with Actions">
        <FormField label="Name">
          <Textfield placeholder="Enter name" />
        </FormField>
        <FormActions align="right">
          <Button onClick={fn()} data-color="neutral" data-size="medium">
            Cancel
          </Button>
          <Button onClick={fn()} data-color="accent" data-size="medium">
            Save
          </Button>
        </FormActions>
      </FormSection>
    </div>
  ),
};

// Form actions - left aligned
export const FormActionsLeft: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <FormSection title="Form with Left Actions">
        <FormField label="Name">
          <Textfield placeholder="Enter name" />
        </FormField>
        <FormActions align="left">
          <Button onClick={fn()} data-color="accent" data-size="medium">
            Save
          </Button>
          <Button onClick={fn()} data-color="neutral" data-size="medium">
            Cancel
          </Button>
        </FormActions>
      </FormSection>
    </div>
  ),
};

// Form actions - between
export const FormActionsBetween: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <FormSection title="Form with Between Actions">
        <FormField label="Name">
          <Textfield placeholder="Enter name" />
        </FormField>
        <FormActions align="between">
          <Button onClick={fn()} data-color="neutral" data-size="medium">
            Delete
          </Button>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
            <Button onClick={fn()} data-color="neutral" data-size="medium">
              Cancel
            </Button>
            <Button onClick={fn()} data-color="accent" data-size="medium">
              Save
            </Button>
          </div>
        </FormActions>
      </FormSection>
    </div>
  ),
};

// Form actions - sticky
export const FormActionsSticky: Story = {
  render: () => (
    <div
      style={{
        width: '600px',
        height: '400px',
        overflow: 'auto',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
      }}
    >
      <FormSection title="Long Form">
        {Array.from({ length: 10 }, (_, i) => (
          <FormField key={i} label={`Field ${i + 1}`}>
            <Textfield placeholder={`Enter value ${i + 1}`} />
          </FormField>
        ))}
        <FormActions align="right" sticky>
          <Button onClick={fn()} data-color="neutral" data-size="medium">
            Cancel
          </Button>
          <Button onClick={fn()} data-color="accent" data-size="medium">
            Save
          </Button>
        </FormActions>
      </FormSection>
    </div>
  ),
};

// Form divider
export const FormDividerExample: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <FormSection title="Form Sections">
        <FormField label="First Section Field">
          <Textfield placeholder="Value 1" />
        </FormField>
        <FormDivider label="OR" />
        <FormField label="Second Section Field">
          <Textfield placeholder="Value 2" />
        </FormField>
      </FormSection>
    </div>
  ),
};

// Complete form example
export const CompleteForm: Story = {
  render: () => (
    <div style={{ width: '600px' }}>
      <FormSection title="Personal Information" description="Tell us about yourself">
        <FormRow columns={2}>
          <FormField label="First Name" required>
            <Textfield placeholder="John" />
          </FormField>
          <FormField label="Last Name" required>
            <Textfield placeholder="Doe" />
          </FormField>
        </FormRow>
        <FormField label="Email" required helperText="We'll never share your email">
          <Textfield type="email" placeholder="john@example.com" />
        </FormField>
        <FormField label="Bio">
          <Textarea placeholder="Tell us about yourself" rows={4} />
        </FormField>
      </FormSection>

      <FormDivider />

      <FormSection title="Preferences" collapsible defaultCollapsed={true}>
        <FormField label="Language">
          <Select>
            <option value="en">English</option>
            <option value="no">Norwegian</option>
          </Select>
        </FormField>
        <FormField label="Theme">
          <Select>
            <option value="light">Light</option>
            <option value="dark">Dark</option>
            <option value="auto">Auto</option>
          </Select>
        </FormField>
      </FormSection>

      <FormActions align="right">
        <Button onClick={fn()} data-color="neutral" data-size="medium">
          Cancel
        </Button>
        <Button onClick={fn()} data-color="accent" data-size="medium">
          Save Changes
        </Button>
      </FormActions>
    </div>
  ),
};
