/**
 * DynamicForm Stories
 *
 * Enhanced form component with advanced conditional field support and runtime schema manipulation.
 */
import type { Meta, StoryObj } from '@storybook/react';
import * as React from 'react';
import { z } from 'zod';
import { DynamicForm, createDependency } from '../../patterns/DynamicForm';
import type { DynamicFormSchema, FormValues } from '../../types/form-builder';
import { Paragraph, Button } from '@digdir/designsystemet-react';

const meta: Meta<typeof DynamicForm> = {
  title: 'FormBuilder/DynamicForm',
  component: DynamicForm,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: `
## DynamicForm

An enhanced form component with advanced conditional field support and runtime schema manipulation.
Built on top of SchemaForm, it provides additional capabilities for dynamic forms that change based on user input.

### Features
- Dynamic field registration and removal at runtime
- Enhanced conditional logic with field dependencies
- Cascading field updates based on dependencies
- Custom field type registration with validation
- Dynamic schema updates without remounting
- Field visibility management with animations
- Debug mode for development

### Use Cases
- Configuration wizards with dependent fields
- Multi-stage onboarding forms
- Complex booking flows with dynamic pricing
- Questionnaires with branching logic
- Registration forms with progressive disclosure

### Usage

\`\`\`tsx
import { DynamicForm, createDependency } from '@xala-technologies/platform-ui/patterns';

const formSchema: DynamicFormSchema = {
  id: 'booking-form',
  title: 'Book a Resource',
  fields: [
    {
      id: 'type',
      type: 'select',
      label: 'Booking Type',
      options: [
        { value: 'hourly', label: 'Hourly' },
        { value: 'daily', label: 'Daily' },
      ],
    },
    {
      id: 'duration',
      type: 'number',
      label: 'Duration (hours)',
      showIf: [{ fieldId: 'type', operator: 'equals', value: 'hourly' }],
      dependencies: [createDependency('type', { clearOnChange: true })],
    },
  ],
};

<DynamicForm
  schema={formSchema}
  onSubmit={handleSubmit}
  debug={true}
/>
\`\`\`

### Accessibility
- Semantic HTML form elements
- Proper label associations
- Error messages linked to fields
- Keyboard navigation support
- Required field indicators
- Smooth transitions for conditional fields
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
type Story = StoryObj<typeof DynamicForm>;

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
      id: 'default-form',
      title: 'Event Registration',
      description: 'Register for an event',
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
          id: 'location',
          type: 'text',
          label: 'Preferred Location',
          placeholder: 'City or venue',
          showIf: [{ fieldId: 'attendanceType', operator: 'equals', value: 'in-person' }],
        },
        {
          id: 'timezone',
          type: 'select',
          label: 'Time Zone',
          showIf: [{ fieldId: 'attendanceType', operator: 'equals', value: 'virtual' }],
          options: [
            { value: 'utc', label: 'UTC' },
            { value: 'cet', label: 'CET (Europe/Oslo)' },
            { value: 'est', label: 'EST (America/New_York)' },
            { value: 'pst', label: 'PST (America/Los_Angeles)' },
          ],
        },
      ],
      validationSchema: z.object({
        name: z.string().min(2, 'Name must be at least 2 characters'),
        email: z.string().email('Invalid email address'),
        attendanceType: z.enum(['in-person', 'virtual']),
        location: z.string().optional(),
        timezone: z.string().optional(),
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
      title: 'Subscription Form',
      description: 'Fields appear based on your selections',
      fields: [
        {
          id: 'plan',
          type: 'select',
          label: 'Subscription Plan',
          required: true,
          options: [
            { value: '', label: 'Select a plan' },
            { value: 'free', label: 'Free' },
            { value: 'basic', label: 'Basic - $10/month' },
            { value: 'pro', label: 'Pro - $25/month' },
            { value: 'enterprise', label: 'Enterprise' },
          ],
        },
        {
          id: 'billingCycle',
          type: 'radio',
          label: 'Billing Cycle',
          showIf: [
            { fieldId: 'plan', operator: 'equals', value: 'basic' },
            { fieldId: 'plan', operator: 'equals', value: 'pro', conjunction: 'or' },
          ],
          options: [
            { value: 'monthly', label: 'Monthly' },
            { value: 'annual', label: 'Annual (Save 20%)' },
          ],
          defaultValue: 'monthly',
        },
        {
          id: 'paymentMethod',
          type: 'select',
          label: 'Payment Method',
          showIf: [
            { fieldId: 'plan', operator: 'notEquals', value: 'free' },
            { fieldId: 'plan', operator: 'notEquals', value: '' },
          ],
          options: [
            { value: 'card', label: 'Credit Card' },
            { value: 'invoice', label: 'Invoice' },
          ],
        },
        {
          id: 'cardNumber',
          type: 'text',
          label: 'Card Number',
          placeholder: '1234 5678 9012 3456',
          showIf: [{ fieldId: 'paymentMethod', operator: 'equals', value: 'card' }],
        },
        {
          id: 'companyName',
          type: 'text',
          label: 'Company Name',
          placeholder: 'Acme Inc.',
          showIf: [
            { fieldId: 'plan', operator: 'equals', value: 'enterprise' },
            { fieldId: 'paymentMethod', operator: 'equals', value: 'invoice', conjunction: 'or' },
          ],
        },
        {
          id: 'seats',
          type: 'number',
          label: 'Number of Seats',
          placeholder: '5',
          showIf: [{ fieldId: 'plan', operator: 'equals', value: 'enterprise' }],
        },
      ],
    },
    onSubmit: handleSubmit,
  },
};

export const WithDependencies: Story = {
  name: 'Field Dependencies',
  args: {
    schema: {
      id: 'dependencies-form',
      title: 'Booking Form',
      description: 'Fields update automatically based on dependencies',
      fields: [
        {
          id: 'bookingType',
          type: 'select',
          label: 'Booking Type',
          required: true,
          options: [
            { value: '', label: 'Select type' },
            { value: 'hourly', label: 'Hourly Rate' },
            { value: 'daily', label: 'Daily Rate' },
            { value: 'weekly', label: 'Weekly Rate' },
          ],
        },
        {
          id: 'duration',
          type: 'number',
          label: 'Duration',
          placeholder: 'Enter duration',
          showIf: [{ fieldId: 'bookingType', operator: 'notEquals', value: '' }],
          dependencies: [createDependency('bookingType', { clearOnChange: true })],
        },
        {
          id: 'basePrice',
          type: 'number',
          label: 'Base Price (NOK)',
          placeholder: 'Price per unit',
          showIf: [{ fieldId: 'bookingType', operator: 'notEquals', value: '' }],
          dependencies: [
            createDependency('bookingType', {
              transform: (bookingType) => {
                if (bookingType === 'hourly') return 500;
                if (bookingType === 'daily') return 3000;
                if (bookingType === 'weekly') return 15000;
                return 0;
              },
            }),
          ],
        },
        {
          id: 'addEquipment',
          type: 'checkbox',
          label: 'Add Equipment',
          showIf: [{ fieldId: 'bookingType', operator: 'notEquals', value: '' }],
        },
        {
          id: 'equipmentFee',
          type: 'number',
          label: 'Equipment Fee (NOK)',
          showIf: [{ fieldId: 'addEquipment', operator: 'equals', value: true }],
          defaultValue: 200,
          readOnly: true,
        },
      ],
    },
    onSubmit: handleSubmit,
    debug: true,
  },
};

export const CascadingDependencies: Story = {
  name: 'Cascading Dependencies',
  args: {
    schema: {
      id: 'cascading-form',
      title: 'Location Selector',
      description: 'Fields cascade based on selections',
      fields: [
        {
          id: 'country',
          type: 'select',
          label: 'Country',
          required: true,
          options: [
            { value: '', label: 'Select country' },
            { value: 'no', label: 'Norway' },
            { value: 'se', label: 'Sweden' },
            { value: 'dk', label: 'Denmark' },
          ],
        },
        {
          id: 'region',
          type: 'select',
          label: 'Region',
          showIf: [{ fieldId: 'country', operator: 'notEquals', value: '' }],
          dependencies: [
            createDependency('country', {
              transform: (country) => {
                // Clear region when country changes
                return '';
              },
            }),
          ],
          options: [
            { value: '', label: 'Select region' },
            { value: 'oslo', label: 'Oslo' },
            { value: 'bergen', label: 'Bergen' },
            { value: 'trondheim', label: 'Trondheim' },
          ],
        },
        {
          id: 'city',
          type: 'select',
          label: 'City',
          showIf: [{ fieldId: 'region', operator: 'notEquals', value: '' }],
          dependencies: [
            createDependency('region', {
              transform: (region) => {
                // Clear city when region changes
                return '';
              },
            }),
            createDependency('country', {
              transform: (country) => {
                // Clear city when country changes
                return '';
              },
            }),
          ],
          options: [
            { value: '', label: 'Select city' },
            { value: 'oslo-center', label: 'Oslo Center' },
            { value: 'oslo-east', label: 'Oslo East' },
            { value: 'oslo-west', label: 'Oslo West' },
          ],
        },
        {
          id: 'postalCode',
          type: 'text',
          label: 'Postal Code',
          placeholder: 'Enter postal code',
          showIf: [{ fieldId: 'city', operator: 'notEquals', value: '' }],
          dependencies: [createDependency('city', { clearOnChange: true })],
        },
      ],
    },
    onSubmit: handleSubmit,
    debug: true,
  },
};

export const WithSections: Story = {
  name: 'With Sections',
  args: {
    schema: {
      id: 'sectioned-dynamic-form',
      title: 'Project Setup',
      description: 'Configure your project settings',
      sections: [
        {
          id: 'basic',
          title: 'Basic Information',
          fields: [
            {
              id: 'projectName',
              type: 'text',
              label: 'Project Name',
              placeholder: 'My Project',
              required: true,
            },
            {
              id: 'projectType',
              type: 'select',
              label: 'Project Type',
              required: true,
              options: [
                { value: '', label: 'Select type' },
                { value: 'web', label: 'Web Application' },
                { value: 'mobile', label: 'Mobile App' },
                { value: 'api', label: 'API Service' },
              ],
            },
          ],
        },
        {
          id: 'platform',
          title: 'Platform Configuration',
          showIf: [{ fieldId: 'projectType', operator: 'equals', value: 'mobile' }],
          fields: [
            {
              id: 'platforms',
              type: 'checkbox',
              label: 'Target Platforms',
              options: [
                { value: 'ios', label: 'iOS' },
                { value: 'android', label: 'Android' },
              ],
            },
            {
              id: 'minVersion',
              type: 'text',
              label: 'Minimum Version',
              placeholder: 'e.g., iOS 14, Android 10',
            },
          ],
        },
        {
          id: 'deployment',
          title: 'Deployment',
          fields: [
            {
              id: 'environment',
              type: 'select',
              label: 'Environment',
              options: [
                { value: 'dev', label: 'Development' },
                { value: 'staging', label: 'Staging' },
                { value: 'production', label: 'Production' },
              ],
              defaultValue: 'dev',
            },
            {
              id: 'autoDeployEnabled',
              type: 'checkbox',
              label: 'Enable Auto Deploy',
            },
            {
              id: 'deployBranch',
              type: 'text',
              label: 'Deploy Branch',
              placeholder: 'main',
              showIf: [{ fieldId: 'autoDeployEnabled', operator: 'equals', value: true }],
              defaultValue: 'main',
            },
          ],
        },
      ],
    },
    onSubmit: handleSubmit,
  },
};

export const ComplexConditionals: Story = {
  name: 'Complex Conditionals',
  args: {
    schema: {
      id: 'complex-conditional-form',
      title: 'Service Request',
      description: 'Complex conditional logic with multiple rules',
      fields: [
        {
          id: 'serviceType',
          type: 'select',
          label: 'Service Type',
          required: true,
          options: [
            { value: '', label: 'Select service' },
            { value: 'consultation', label: 'Consultation' },
            { value: 'development', label: 'Development' },
            { value: 'maintenance', label: 'Maintenance' },
          ],
        },
        {
          id: 'urgency',
          type: 'radio',
          label: 'Urgency Level',
          required: true,
          options: [
            { value: 'low', label: 'Low' },
            { value: 'medium', label: 'Medium' },
            { value: 'high', label: 'High' },
            { value: 'critical', label: 'Critical' },
          ],
          defaultValue: 'medium',
        },
        {
          id: 'expressService',
          type: 'checkbox',
          label: 'Express Service (+50% fee)',
          showIf: [
            { fieldId: 'urgency', operator: 'equals', value: 'high' },
            { fieldId: 'urgency', operator: 'equals', value: 'critical', conjunction: 'or' },
          ],
        },
        {
          id: 'estimatedHours',
          type: 'number',
          label: 'Estimated Hours',
          placeholder: '8',
          showIf: [
            { fieldId: 'serviceType', operator: 'equals', value: 'development' },
            { fieldId: 'serviceType', operator: 'equals', value: 'maintenance', conjunction: 'or' },
          ],
        },
        {
          id: 'requiresOnsite',
          type: 'checkbox',
          label: 'Requires On-site Visit',
          showIf: [
            { fieldId: 'serviceType', operator: 'equals', value: 'maintenance' },
            { fieldId: 'urgency', operator: 'equals', value: 'critical' },
          ],
        },
        {
          id: 'location',
          type: 'text',
          label: 'Service Location',
          placeholder: 'Enter address',
          showIf: [{ fieldId: 'requiresOnsite', operator: 'equals', value: true }],
          required: true,
        },
        {
          id: 'contactPreference',
          type: 'radio',
          label: 'Preferred Contact Method',
          options: [
            { value: 'email', label: 'Email' },
            { value: 'phone', label: 'Phone' },
            { value: 'sms', label: 'SMS' },
          ],
          defaultValue: 'email',
        },
        {
          id: 'phoneNumber',
          type: 'tel',
          label: 'Phone Number',
          placeholder: '+47 123 45 678',
          showIf: [
            { fieldId: 'contactPreference', operator: 'equals', value: 'phone' },
            { fieldId: 'contactPreference', operator: 'equals', value: 'sms', conjunction: 'or' },
          ],
          required: true,
        },
      ],
    },
    onSubmit: handleSubmit,
  },
};

export const WithInitialValues: Story = {
  name: 'With Initial Values',
  args: {
    schema: {
      id: 'edit-form',
      title: 'Edit Event',
      description: 'Update event details',
      fields: [
        {
          id: 'eventName',
          type: 'text',
          label: 'Event Name',
          required: true,
        },
        {
          id: 'eventType',
          type: 'select',
          label: 'Event Type',
          required: true,
          options: [
            { value: 'conference', label: 'Conference' },
            { value: 'workshop', label: 'Workshop' },
            { value: 'webinar', label: 'Webinar' },
            { value: 'meetup', label: 'Meetup' },
          ],
        },
        {
          id: 'requiresRegistration',
          type: 'checkbox',
          label: 'Requires Registration',
        },
        {
          id: 'maxAttendees',
          type: 'number',
          label: 'Maximum Attendees',
          placeholder: '100',
          showIf: [{ fieldId: 'requiresRegistration', operator: 'equals', value: true }],
        },
        {
          id: 'isPaidEvent',
          type: 'checkbox',
          label: 'Paid Event',
        },
        {
          id: 'ticketPrice',
          type: 'number',
          label: 'Ticket Price (NOK)',
          placeholder: '500',
          showIf: [{ fieldId: 'isPaidEvent', operator: 'equals', value: true }],
        },
      ],
    },
    initialValues: {
      eventName: 'Nordic Tech Summit 2026',
      eventType: 'conference',
      requiresRegistration: true,
      maxAttendees: 500,
      isPaidEvent: true,
      ticketPrice: 2500,
    },
    onSubmit: handleSubmit,
  },
};

export const LoadingState: Story = {
  name: 'Loading State',
  args: {
    schema: {
      id: 'loading-form',
      title: 'Creating Resource',
      description: 'Please wait...',
      fields: [
        {
          id: 'name',
          type: 'text',
          label: 'Resource Name',
        },
        {
          id: 'type',
          type: 'select',
          label: 'Type',
          options: [
            { value: 'type1', label: 'Type 1' },
            { value: 'type2', label: 'Type 2' },
          ],
        },
      ],
    },
    loading: true,
    onSubmit: handleSubmit,
  },
};

export const DebugMode: Story = {
  name: 'Debug Mode',
  args: {
    schema: {
      id: 'debug-form',
      title: 'Debug Mode Demo',
      description: 'Open browser console to see field changes and dependency updates',
      fields: [
        {
          id: 'category',
          type: 'select',
          label: 'Category',
          options: [
            { value: '', label: 'Select category' },
            { value: 'electronics', label: 'Electronics' },
            { value: 'clothing', label: 'Clothing' },
            { value: 'food', label: 'Food' },
          ],
        },
        {
          id: 'subcategory',
          type: 'select',
          label: 'Subcategory',
          showIf: [{ fieldId: 'category', operator: 'notEquals', value: '' }],
          dependencies: [createDependency('category', { clearOnChange: true })],
          options: [
            { value: '', label: 'Select subcategory' },
            { value: 'sub1', label: 'Subcategory 1' },
            { value: 'sub2', label: 'Subcategory 2' },
          ],
        },
        {
          id: 'quantity',
          type: 'number',
          label: 'Quantity',
          defaultValue: 1,
        },
        {
          id: 'price',
          type: 'number',
          label: 'Unit Price',
          defaultValue: 100,
        },
      ],
    },
    onSubmit: handleSubmit,
    debug: true,
    onFieldChange: (fieldId, value, allValues) => {
      console.log('Field Change Callback:', { fieldId, value, allValues });
    },
  },
};

export const InteractiveDemo: Story = {
  name: 'Interactive Demo',
  render: function Render() {
    const [formSchema, setFormSchema] = React.useState<DynamicFormSchema>({
      id: 'interactive-form',
      title: 'Interactive Form',
      description: 'Try changing the form configuration below',
      fields: [
        {
          id: 'firstName',
          type: 'text',
          label: 'First Name',
          placeholder: 'Enter first name',
          required: true,
        },
        {
          id: 'lastName',
          type: 'text',
          label: 'Last Name',
          placeholder: 'Enter last name',
          required: true,
        },
      ],
    });

    const [showEmail, setShowEmail] = React.useState(false);
    const [showPhone, setShowPhone] = React.useState(false);

    React.useEffect(() => {
      const newFields = [
        {
          id: 'firstName',
          type: 'text' as const,
          label: 'First Name',
          placeholder: 'Enter first name',
          required: true,
        },
        {
          id: 'lastName',
          type: 'text' as const,
          label: 'Last Name',
          placeholder: 'Enter last name',
          required: true,
        },
      ];

      if (showEmail) {
        newFields.push({
          id: 'email',
          type: 'email' as const,
          label: 'Email Address',
          placeholder: 'you@example.com',
          required: false,
        });
      }

      if (showPhone) {
        newFields.push({
          id: 'phone',
          type: 'tel' as const,
          label: 'Phone Number',
          placeholder: '+47 123 45 678',
          required: false,
        });
      }

      setFormSchema((prev) => ({
        ...prev,
        fields: newFields,
      }));
    }, [showEmail, showPhone]);

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
        <div
          style={{
            padding: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
            borderRadius: 'var(--ds-border-radius-md)',
          }}
        >
          <Paragraph data-size="sm" style={{ marginBottom: 'var(--ds-spacing-2)' }}>
            Form Configuration:
          </Paragraph>
          <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
            <Button
              size="sm"
              variant={showEmail ? 'primary' : 'secondary'}
              onClick={() => setShowEmail(!showEmail)}
            >
              {showEmail ? 'Hide' : 'Show'} Email Field
            </Button>
            <Button
              size="sm"
              variant={showPhone ? 'primary' : 'secondary'}
              onClick={() => setShowPhone(!showPhone)}
            >
              {showPhone ? 'Hide' : 'Show'} Phone Field
            </Button>
          </div>
        </div>

        <DynamicForm
          schema={formSchema}
          onSubmit={handleSubmit}
          onSchemaChange={(newSchema) => {
            console.log('Schema changed:', newSchema);
          }}
        />
      </div>
    );
  },
};

export const AllFieldTypes: Story = {
  name: 'All Field Types',
  args: {
    schema: {
      id: 'all-types-form',
      title: 'All Field Types',
      description: 'Demonstration of all supported field types with conditional logic',
      sections: [
        {
          id: 'text-inputs',
          title: 'Text Inputs',
          fields: [
            { id: 'text', type: 'text', label: 'Text Field', placeholder: 'Enter text' },
            { id: 'email', type: 'email', label: 'Email Field', placeholder: 'you@example.com' },
            { id: 'password', type: 'password', label: 'Password Field', placeholder: 'Password' },
            { id: 'tel', type: 'tel', label: 'Phone Field', placeholder: '+47 123 45 678' },
            { id: 'url', type: 'url', label: 'URL Field', placeholder: 'https://example.com' },
            { id: 'search', type: 'search', label: 'Search Field', placeholder: 'Search...' },
          ],
        },
        {
          id: 'numeric',
          title: 'Numeric Inputs',
          fields: [{ id: 'number', type: 'number', label: 'Number Field', placeholder: '42' }],
        },
        {
          id: 'datetime',
          title: 'Date & Time',
          fields: [
            { id: 'date', type: 'date', label: 'Date Field' },
            { id: 'time', type: 'time', label: 'Time Field' },
            { id: 'datetime', type: 'datetime-local', label: 'DateTime Field' },
          ],
        },
        {
          id: 'selection',
          title: 'Selection Fields',
          fields: [
            {
              id: 'select',
              type: 'select',
              label: 'Select Field',
              options: [
                { value: '', label: 'Choose option' },
                { value: 'opt1', label: 'Option 1' },
                { value: 'opt2', label: 'Option 2' },
              ],
            },
            {
              id: 'radio',
              type: 'radio',
              label: 'Radio Field',
              options: [
                { value: 'yes', label: 'Yes' },
                { value: 'no', label: 'No' },
              ],
            },
          ],
        },
        {
          id: 'boolean',
          title: 'Boolean Fields',
          fields: [
            { id: 'checkbox', type: 'checkbox', label: 'Checkbox Field' },
            { id: 'switch', type: 'switch', label: 'Switch Field' },
          ],
        },
        {
          id: 'multiline',
          title: 'Multiline Input',
          fields: [
            {
              id: 'textarea',
              type: 'textarea',
              label: 'Textarea Field',
              placeholder: 'Enter multiple lines...',
            },
          ],
        },
        {
          id: 'conditional-demo',
          title: 'Conditional Fields Demo',
          fields: [
            {
              id: 'showAdvanced',
              type: 'checkbox',
              label: 'Show Advanced Options',
            },
            {
              id: 'advancedOption1',
              type: 'text',
              label: 'Advanced Option 1',
              placeholder: 'Only visible when enabled',
              showIf: [{ fieldId: 'showAdvanced', operator: 'equals', value: true }],
            },
            {
              id: 'advancedOption2',
              type: 'select',
              label: 'Advanced Option 2',
              showIf: [{ fieldId: 'showAdvanced', operator: 'equals', value: true }],
              options: [
                { value: 'a', label: 'Option A' },
                { value: 'b', label: 'Option B' },
              ],
            },
          ],
        },
      ],
    },
    onSubmit: handleSubmit,
  },
};
