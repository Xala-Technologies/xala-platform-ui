/**
 * SchemaForm Stories
 *
 * Declarative form component that generates accessible forms from schema definitions.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { z } from 'zod';
import { SchemaForm } from '../../composed/SchemaForm';
import type { FormSchema, FormValues, FormSubmitResult } from '../../types/form-builder';

const meta: Meta<typeof SchemaForm> = {
  title: 'FormBuilder/SchemaForm',
  component: SchemaForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## SchemaForm

A declarative form component that generates accessible forms from schema definitions.
Integrates with Zod for validation, supports conditional fields, and custom field types.

### Features
- Schema-driven form generation
- Zod validation integration
- Conditional field visibility
- Multiple field types (text, number, select, checkbox, etc.)
- Section-based organization
- Grid and vertical layouts
- Loading and disabled states
- External error handling
- Initial values support

### Usage

\`\`\`tsx
import { z } from 'zod';
import { SchemaForm } from '@xala-technologies/platform-ui/composed';

const schema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  age: z.number().min(18, 'Must be at least 18'),
});

const formSchema: FormSchema = {
  id: 'user-form',
  title: 'User Information',
  fields: [
    { id: 'name', type: 'text', label: 'Full Name', required: true },
    { id: 'email', type: 'email', label: 'Email', required: true },
    { id: 'age', type: 'number', label: 'Age', required: true },
  ],
  validationSchema: schema,
};

<SchemaForm
  schema={formSchema}
  onSubmit={handleSubmit}
  initialValues={{ name: 'John Doe' }}
/>
\`\`\`

### Accessibility
- Semantic HTML form elements
- Proper label associations
- Error messages linked to fields
- Keyboard navigation support
- Required field indicators
        `,
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div style={{ padding: '2rem', maxWidth: '600px', width: '100%' }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof SchemaForm>;

// =============================================================================
// Helper Functions
// =============================================================================

const handleSubmit = async (values: FormValues): Promise<void> => {
  console.log('Submitted:', values);
  await new Promise((resolve) => setTimeout(resolve, 1000));
  alert(`Form submitted!\n${JSON.stringify(values, null, 2)}`);
};

// =============================================================================
// Stories
// =============================================================================

export const Default: Story = {
  args: {
    schema: {
      id: 'basic-form',
      title: 'Contact Information',
      description: 'Please provide your contact details',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Full Name',
          placeholder: 'Enter your name',
          required: true,
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email Address',
          placeholder: 'you@example.com',
          required: true,
        },
        {
          id: 'phone',
          type: 'tel',
          label: 'Phone Number',
          placeholder: '+47 123 45 678',
        },
      ],
      validationSchema: z.object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.string().email('Invalid email address'),
        phone: z.string().optional(),
      }),
    },
    onSubmit: handleSubmit,
  },
};

export const WithSections: Story = {
  name: 'With Sections',
  args: {
    schema: {
      id: 'sectioned-form',
      title: 'User Registration',
      description: 'Create your account',
      sections: [
        {
          id: 'personal',
          title: 'Personal Information',
          description: 'Tell us about yourself',
          fields: [
            {
              id: 'firstName',
              type: 'text',
              label: 'First Name',
              required: true,
            },
            {
              id: 'lastName',
              type: 'text',
              label: 'Last Name',
              required: true,
            },
            {
              id: 'dateOfBirth',
              type: 'date',
              label: 'Date of Birth',
            },
          ],
        },
        {
          id: 'contact',
          title: 'Contact Details',
          description: 'How can we reach you?',
          fields: [
            {
              id: 'email',
              type: 'email',
              label: 'Email',
              required: true,
            },
            {
              id: 'phone',
              type: 'tel',
              label: 'Phone',
            },
          ],
        },
        {
          id: 'preferences',
          title: 'Preferences',
          collapsible: true,
          defaultCollapsed: false,
          fields: [
            {
              id: 'newsletter',
              type: 'checkbox',
              label: 'Subscribe to newsletter',
              defaultValue: false,
            },
            {
              id: 'notifications',
              type: 'switch',
              label: 'Enable notifications',
              defaultValue: true,
            },
          ],
        },
      ],
      validationSchema: z.object({
        firstName: z.string().min(2, 'First name is required'),
        lastName: z.string().min(2, 'Last name is required'),
        dateOfBirth: z.string().optional(),
        email: z.string().email('Invalid email address'),
        phone: z.string().optional(),
        newsletter: z.boolean().optional(),
        notifications: z.boolean().optional(),
      }),
    },
    onSubmit: handleSubmit,
  },
};

export const GridLayout: Story = {
  name: 'Grid Layout',
  args: {
    schema: {
      id: 'grid-form',
      title: 'Address Form',
      layout: 'grid',
      gridColumns: 2,
      fields: [
        {
          id: 'street',
          type: 'text',
          label: 'Street Address',
          required: true,
        },
        {
          id: 'city',
          type: 'text',
          label: 'City',
          required: true,
        },
        {
          id: 'postalCode',
          type: 'text',
          label: 'Postal Code',
          required: true,
        },
        {
          id: 'country',
          type: 'select',
          label: 'Country',
          required: true,
          options: [
            { value: 'no', label: 'Norway' },
            { value: 'se', label: 'Sweden' },
            { value: 'dk', label: 'Denmark' },
            { value: 'fi', label: 'Finland' },
          ],
        },
      ],
      validationSchema: z.object({
        street: z.string().min(1, 'Street address is required'),
        city: z.string().min(1, 'City is required'),
        postalCode: z.string().min(4, 'Postal code is required'),
        country: z.string().min(1, 'Country is required'),
      }),
    },
    onSubmit: handleSubmit,
  },
};

export const ConditionalFields: Story = {
  name: 'Conditional Fields',
  args: {
    schema: {
      id: 'conditional-form',
      title: 'Event Registration',
      description: 'Fields appear based on your selections',
      fields: [
        {
          id: 'attendanceType',
          type: 'radio',
          label: 'Attendance Type',
          required: true,
          options: [
            { value: 'in-person', label: 'In Person' },
            { value: 'virtual', label: 'Virtual' },
          ],
        },
        {
          id: 'dietaryRestrictions',
          type: 'textarea',
          label: 'Dietary Restrictions',
          placeholder: 'Please list any dietary restrictions',
          showIf: [{ fieldId: 'attendanceType', operator: 'equals', value: 'in-person' }],
        },
        {
          id: 'meetingLink',
          type: 'url',
          label: 'Preferred Meeting Platform',
          placeholder: 'https://...',
          showIf: [{ fieldId: 'attendanceType', operator: 'equals', value: 'virtual' }],
        },
        {
          id: 'requiresAccommodation',
          type: 'checkbox',
          label: 'I need accommodation',
          defaultValue: false,
          showIf: [{ fieldId: 'attendanceType', operator: 'equals', value: 'in-person' }],
        },
        {
          id: 'accommodationDetails',
          type: 'textarea',
          label: 'Accommodation Details',
          placeholder: 'Describe your needs',
          showIf: [
            { fieldId: 'attendanceType', operator: 'equals', value: 'in-person' },
            { fieldId: 'requiresAccommodation', operator: 'isTrue' },
          ],
        },
      ],
      validationSchema: z.object({
        attendanceType: z.enum(['in-person', 'virtual']),
        dietaryRestrictions: z.string().optional(),
        meetingLink: z.string().url().optional(),
        requiresAccommodation: z.boolean().optional(),
        accommodationDetails: z.string().optional(),
      }),
    },
    onSubmit: handleSubmit,
  },
};

export const AllFieldTypes: Story = {
  name: 'All Field Types',
  args: {
    schema: {
      id: 'all-fields-form',
      title: 'Field Type Showcase',
      description: 'Demonstrating all available field types',
      sections: [
        {
          id: 'text-inputs',
          title: 'Text Inputs',
          fields: [
            {
              id: 'text',
              type: 'text',
              label: 'Text Input',
              placeholder: 'Enter text',
            },
            {
              id: 'email',
              type: 'email',
              label: 'Email Input',
              placeholder: 'you@example.com',
            },
            {
              id: 'password',
              type: 'password',
              label: 'Password Input',
              placeholder: 'Enter password',
            },
            {
              id: 'url',
              type: 'url',
              label: 'URL Input',
              placeholder: 'https://example.com',
            },
            {
              id: 'tel',
              type: 'tel',
              label: 'Phone Input',
              placeholder: '+47 123 45 678',
            },
          ],
        },
        {
          id: 'numeric-date',
          title: 'Numeric & Date Inputs',
          fields: [
            {
              id: 'number',
              type: 'number',
              label: 'Number Input',
              placeholder: '0',
              min: 0,
              max: 100,
            },
            {
              id: 'date',
              type: 'date',
              label: 'Date Input',
            },
            {
              id: 'time',
              type: 'time',
              label: 'Time Input',
            },
          ],
        },
        {
          id: 'text-areas',
          title: 'Text Areas',
          fields: [
            {
              id: 'textarea',
              type: 'textarea',
              label: 'Textarea',
              placeholder: 'Enter multiple lines',
              rows: 4,
            },
          ],
        },
        {
          id: 'selections',
          title: 'Selection Inputs',
          fields: [
            {
              id: 'select',
              type: 'select',
              label: 'Select Dropdown',
              options: [
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
                { value: '3', label: 'Option 3' },
              ],
            },
            {
              id: 'radio',
              type: 'radio',
              label: 'Radio Buttons',
              options: [
                { value: 'a', label: 'Choice A' },
                { value: 'b', label: 'Choice B' },
                { value: 'c', label: 'Choice C' },
              ],
            },
          ],
        },
        {
          id: 'toggles',
          title: 'Toggle Inputs',
          fields: [
            {
              id: 'checkbox',
              type: 'checkbox',
              label: 'Checkbox',
            },
            {
              id: 'switch',
              type: 'switch',
              label: 'Switch Toggle',
            },
          ],
        },
      ],
    },
    onSubmit: handleSubmit,
  },
};

export const WithValidation: Story = {
  name: 'With Validation',
  args: {
    schema: {
      id: 'validation-form',
      title: 'Registration Form',
      description: 'All fields have validation rules',
      fields: [
        {
          id: 'username',
          type: 'text',
          label: 'Username',
          placeholder: 'Choose a username',
          required: true,
          minLength: 3,
          maxLength: 20,
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email',
          placeholder: 'you@example.com',
          required: true,
        },
        {
          id: 'age',
          type: 'number',
          label: 'Age',
          required: true,
          min: 18,
          max: 120,
        },
        {
          id: 'password',
          type: 'password',
          label: 'Password',
          placeholder: 'Min 8 characters',
          required: true,
          minLength: 8,
        },
        {
          id: 'bio',
          type: 'textarea',
          label: 'Bio',
          placeholder: 'Tell us about yourself',
          maxLength: 200,
          rows: 3,
        },
        {
          id: 'terms',
          type: 'checkbox',
          label: 'I agree to the terms and conditions',
          required: true,
        },
      ],
      validationSchema: z.object({
        username: z
          .string()
          .min(3, 'Username must be at least 3 characters')
          .max(20, 'Username must be at most 20 characters')
          .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
        email: z.string().email('Invalid email address'),
        age: z
          .number()
          .min(18, 'Must be at least 18 years old')
          .max(120, 'Please enter a valid age'),
        password: z
          .string()
          .min(8, 'Password must be at least 8 characters')
          .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
          .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
          .regex(/[0-9]/, 'Password must contain at least one number'),
        bio: z.string().max(200, 'Bio must be at most 200 characters').optional(),
        terms: z.literal(true, { errorMap: () => ({ message: 'You must accept the terms' }) }),
      }),
    },
    onSubmit: handleSubmit,
    validateOnBlur: true,
  },
};

export const WithInitialValues: Story = {
  name: 'With Initial Values (Edit Mode)',
  args: {
    schema: {
      id: 'edit-form',
      title: 'Edit Profile',
      description: 'Update your profile information',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Full Name',
          required: true,
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email',
          required: true,
        },
        {
          id: 'bio',
          type: 'textarea',
          label: 'Bio',
          rows: 4,
        },
        {
          id: 'country',
          type: 'select',
          label: 'Country',
          options: [
            { value: 'no', label: 'Norway' },
            { value: 'se', label: 'Sweden' },
            { value: 'dk', label: 'Denmark' },
          ],
        },
        {
          id: 'newsletter',
          type: 'checkbox',
          label: 'Subscribe to newsletter',
        },
      ],
      validationSchema: z.object({
        name: z.string().min(2, 'Name is required'),
        email: z.string().email('Invalid email'),
        bio: z.string().optional(),
        country: z.string().optional(),
        newsletter: z.boolean().optional(),
      }),
      submitLabel: 'Save Changes',
      showCancelButton: true,
      cancelLabel: 'Cancel',
    },
    initialValues: {
      name: 'Ola Nordmann',
      email: 'ola@example.no',
      bio: 'Software developer from Oslo',
      country: 'no',
      newsletter: true,
    },
    onSubmit: handleSubmit,
    onCancel: () => console.log('Cancelled'),
  },
};

export const LoadingState: Story = {
  name: 'Loading State',
  args: {
    schema: {
      id: 'loading-form',
      title: 'Submitting Form',
      description: 'Form in loading state',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Name',
          required: true,
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email',
          required: true,
        },
      ],
      validationSchema: z.object({
        name: z.string().min(1),
        email: z.string().email(),
      }),
    },
    initialValues: {
      name: 'John Doe',
      email: 'john@example.com',
    },
    loading: true,
    onSubmit: handleSubmit,
  },
};

export const WithExternalErrors: Story = {
  name: 'With External Errors',
  args: {
    schema: {
      id: 'error-form',
      title: 'Form with Server Errors',
      description: 'Showing validation errors from server',
      fields: [
        {
          id: 'username',
          type: 'text',
          label: 'Username',
          required: true,
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email',
          required: true,
        },
      ],
      validationSchema: z.object({
        username: z.string().min(3),
        email: z.string().email(),
      }),
    },
    initialValues: {
      username: 'johndoe',
      email: 'john@example.com',
    },
    externalErrors: {
      username: 'This username is already taken',
      email: 'This email is already registered',
    },
    onSubmit: handleSubmit,
  },
};

export const DisabledForm: Story = {
  name: 'Disabled Form',
  args: {
    schema: {
      id: 'disabled-form',
      title: 'Disabled Form',
      description: 'All fields are disabled',
      disabled: true,
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Name',
          required: true,
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email',
          required: true,
        },
        {
          id: 'status',
          type: 'select',
          label: 'Status',
          options: [
            { value: 'active', label: 'Active' },
            { value: 'inactive', label: 'Inactive' },
          ],
        },
      ],
    },
    initialValues: {
      name: 'John Doe',
      email: 'john@example.com',
      status: 'active',
    },
    onSubmit: handleSubmit,
  },
};

export const ReadOnlyForm: Story = {
  name: 'Read-Only Form',
  args: {
    schema: {
      id: 'readonly-form',
      title: 'View Profile',
      description: 'Read-only view of profile data',
      readOnly: true,
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Name',
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email',
        },
        {
          id: 'role',
          type: 'text',
          label: 'Role',
        },
        {
          id: 'department',
          type: 'text',
          label: 'Department',
        },
      ],
      submitLabel: 'Close',
    },
    initialValues: {
      name: 'Ola Nordmann',
      email: 'ola@example.no',
      role: 'Developer',
      department: 'Engineering',
    },
    onSubmit: () => console.log('Closed'),
  },
};

export const WithCancelButton: Story = {
  name: 'With Cancel Button',
  args: {
    schema: {
      id: 'cancel-form',
      title: 'Create Account',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Name',
          required: true,
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email',
          required: true,
        },
      ],
      validationSchema: z.object({
        name: z.string().min(2),
        email: z.string().email(),
      }),
      showCancelButton: true,
      submitLabel: 'Create',
      cancelLabel: 'Cancel',
    },
    onSubmit: handleSubmit,
    onCancel: () => {
      console.log('Cancelled');
      alert('Form cancelled');
    },
  },
};

export const ComplexForm: Story = {
  name: 'Complex Multi-Section Form',
  args: {
    schema: {
      id: 'complex-form',
      title: 'Booking Request',
      description: 'Complete all required sections to submit your booking',
      sections: [
        {
          id: 'personal',
          title: 'Personal Information',
          fields: [
            {
              id: 'firstName',
              type: 'text',
              label: 'First Name',
              required: true,
            },
            {
              id: 'lastName',
              type: 'text',
              label: 'Last Name',
              required: true,
            },
            {
              id: 'email',
              type: 'email',
              label: 'Email',
              required: true,
            },
            {
              id: 'phone',
              type: 'tel',
              label: 'Phone',
            },
          ],
        },
        {
          id: 'booking',
          title: 'Booking Details',
          fields: [
            {
              id: 'serviceType',
              type: 'select',
              label: 'Service Type',
              required: true,
              options: [
                { value: 'venue', label: 'Venue Rental' },
                { value: 'equipment', label: 'Equipment Rental' },
                { value: 'both', label: 'Both' },
              ],
            },
            {
              id: 'date',
              type: 'date',
              label: 'Preferred Date',
              required: true,
            },
            {
              id: 'time',
              type: 'time',
              label: 'Preferred Time',
              required: true,
            },
            {
              id: 'duration',
              type: 'number',
              label: 'Duration (hours)',
              required: true,
              min: 1,
              max: 24,
            },
          ],
        },
        {
          id: 'additional',
          title: 'Additional Information',
          collapsible: true,
          defaultCollapsed: false,
          fields: [
            {
              id: 'participants',
              type: 'number',
              label: 'Number of Participants',
              min: 1,
            },
            {
              id: 'specialRequests',
              type: 'textarea',
              label: 'Special Requests',
              placeholder: 'Any special requirements or requests?',
              rows: 4,
            },
            {
              id: 'newsletter',
              type: 'checkbox',
              label: 'Send me updates about future events',
              defaultValue: false,
            },
          ],
        },
      ],
      validationSchema: z.object({
        firstName: z.string().min(2, 'First name is required'),
        lastName: z.string().min(2, 'Last name is required'),
        email: z.string().email('Invalid email address'),
        phone: z.string().optional(),
        serviceType: z.enum(['venue', 'equipment', 'both']),
        date: z.string().min(1, 'Date is required'),
        time: z.string().min(1, 'Time is required'),
        duration: z.number().min(1).max(24),
        participants: z.number().min(1).optional(),
        specialRequests: z.string().optional(),
        newsletter: z.boolean().optional(),
      }),
      showCancelButton: true,
      submitLabel: 'Submit Booking',
      cancelLabel: 'Cancel',
    },
    onSubmit: handleSubmit,
    onCancel: () => console.log('Cancelled'),
  },
};

export const InteractiveValidation: Story = {
  name: 'Interactive Validation Demo',
  render: () => {
    const [validationState, setValidationState] = React.useState<{
      isValid: boolean;
      errors: Record<string, string | undefined>;
    }>({ isValid: true, errors: {} });

    const schema: FormSchema = {
      id: 'interactive-validation',
      title: 'Interactive Validation',
      description: 'See validation feedback as you type',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Name',
          placeholder: 'At least 3 characters',
          required: true,
        },
        {
          id: 'email',
          type: 'email',
          label: 'Email',
          placeholder: 'Valid email required',
          required: true,
        },
        {
          id: 'age',
          type: 'number',
          label: 'Age',
          placeholder: 'Must be 18 or older',
          required: true,
        },
      ],
      validationSchema: z.object({
        name: z.string().min(3, 'Name must be at least 3 characters'),
        email: z.string().email('Invalid email address'),
        age: z.number().min(18, 'Must be at least 18'),
      }),
    };

    return (
      <div>
        <SchemaForm
          schema={schema}
          onSubmit={handleSubmit}
          validateOnChange={true}
          onValidationChange={(isValid, errors) => {
            setValidationState({ isValid, errors });
          }}
        />
        <div
          style={{
            marginTop: 'var(--ds-spacing-4)',
            padding: 'var(--ds-spacing-3)',
            backgroundColor: validationState.isValid
              ? 'var(--ds-color-success-surface)'
              : 'var(--ds-color-danger-surface)',
            borderRadius: 'var(--ds-border-radius-sm)',
          }}
        >
          <strong>Validation Status:</strong> {validationState.isValid ? '✓ Valid' : '✗ Invalid'}
          {!validationState.isValid && (
            <ul style={{ margin: '0.5rem 0 0 0', paddingLeft: '1.5rem' }}>
              {Object.entries(validationState.errors).map(
                ([field, error]) =>
                  error && (
                    <li key={field}>
                      {field}: {error}
                    </li>
                  )
              )}
            </ul>
          )}
        </div>
      </div>
    );
  },
};
