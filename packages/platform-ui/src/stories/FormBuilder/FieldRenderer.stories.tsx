import type { Meta, StoryObj } from '@storybook/react';
import { useT } from '@xala-technologies/i18n';
import { FieldRenderer } from '../../index';
import type {
  TextFieldDefinition,
  NumberFieldDefinition,
  TextareaFieldDefinition,
  SelectFieldDefinition,
  CheckboxFieldDefinition,
  RadioFieldDefinition,
  SwitchFieldDefinition,
  DateTimeFieldDefinition,
  FileFieldDefinition,
} from '../../types/form-builder';
import { useState } from 'react';

/**
 * FieldRenderer maps field definitions to appropriate Designsystemet components.
 *
 * ## Supported Field Types
 * - Text inputs: text, password, email, tel, url, search
 * - Numbers: number
 * - Dates/Times: date, time, datetime-local
 * - Textarea
 * - Select (single and searchable)
 * - Checkbox
 * - Radio groups
 * - Switch
 * - File upload
 * - Custom fields
 *
 * ## When to Use
 * - Building dynamic forms from schemas
 * - Form builders
 * - Schema-driven UIs
 */
const meta: Meta<typeof FieldRenderer> = {
  title: 'FormBuilder/FieldRenderer',
  component: FieldRenderer,
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component: `
FieldRenderer is the core primitive for the form builder system. It renders form fields based on field definitions, mapping types to appropriate Designsystemet components.

## Supported Field Types
- **Text inputs**: text, password, email, tel, url, search
- **Numbers**: number
- **Dates/Times**: date, time, datetime-local
- **Textarea**: Multi-line text input
- **Select**: Single-select dropdown (native or searchable)
- **Checkbox**: Boolean input with custom values
- **Radio**: Single choice from multiple options
- **Switch**: Toggle input
- **File**: File upload
- **Custom**: Custom field components

## Features
- Automatic component selection based on field type
- Built-in validation error display
- Label and description support
- Required field indicators
- Disabled and read-only states
- RTL-safe inputs for email/tel/url
- Customizable field sizes
        `,
      },
    },
  },
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof FieldRenderer>;

/**
 * Text input field
 */
export const TextField: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState('');

    const field: TextFieldDefinition = {
      id: 'name',
      type: 'text',
      label: t('storybook.formField.name'),
      placeholder: t('storybook.formField.enterName'),
      required: true,
    };

    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FieldRenderer field={field} value={value} onChange={setValue} onBlur={() => {}} />
      </div>
    );
  },
};

/**
 * Email input with RTL safety
 */
export const EmailField: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState('');

    const field: TextFieldDefinition = {
      id: 'email',
      type: 'email',
      label: t('storybook.formField.email'),
      placeholder: t('storybook.formField.enterEmail'),
      description: t('storybook.formField.emailDescription'),
      required: true,
    };

    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FieldRenderer field={field} value={value} onChange={setValue} onBlur={() => {}} />
      </div>
    );
  },
};

/**
 * Number input with min/max
 */
export const NumberField: Story = {
  render: function Render() {
    const [value, setValue] = useState<number>(5);

    const field: NumberFieldDefinition = {
      id: 'quantity',
      type: 'number',
      label: 'Quantity',
      description: 'Enter a number between 1 and 10',
      min: 1,
      max: 10,
      step: 1,
      required: true,
    };

    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FieldRenderer field={field} value={value} onChange={setValue} onBlur={() => {}} />
      </div>
    );
  },
};

/**
 * Password input field
 */
export const PasswordField: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState('');

    const field: TextFieldDefinition = {
      id: 'password',
      type: 'password',
      label: t('storybook.formField.password'),
      placeholder: t('storybook.formField.enterPassword'),
      description: t('storybook.formField.passwordDescription'),
      required: true,
    };

    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FieldRenderer field={field} value={value} onChange={setValue} onBlur={() => {}} />
      </div>
    );
  },
};

/**
 * Textarea field
 */
export const TextareaField: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    const field: TextareaFieldDefinition = {
      id: 'description',
      type: 'textarea',
      label: 'Description',
      placeholder: 'Enter a detailed description',
      description: 'Provide as much detail as possible',
      rows: 4,
      maxLength: 500,
    };

    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FieldRenderer field={field} value={value} onChange={setValue} onBlur={() => {}} />
      </div>
    );
  },
};

/**
 * Select field (native dropdown)
 */
export const SelectField: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    const field: SelectFieldDefinition = {
      id: 'country',
      type: 'select',
      label: 'Country',
      description: 'Select your country',
      emptyLabel: 'Choose a country',
      options: [
        { value: 'no', label: 'Norway' },
        { value: 'se', label: 'Sweden' },
        { value: 'dk', label: 'Denmark' },
        { value: 'fi', label: 'Finland' },
      ],
      required: true,
    };

    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FieldRenderer field={field} value={value} onChange={setValue} onBlur={() => {}} />
      </div>
    );
  },
};

/**
 * Checkbox field
 */
export const CheckboxField: Story = {
  render: function Render() {
    const [value, setValue] = useState(false);

    const field: CheckboxFieldDefinition = {
      id: 'terms',
      type: 'checkbox',
      label: 'I accept the terms and conditions',
      description: 'You must accept to continue',
      required: true,
    };

    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FieldRenderer field={field} value={value} onChange={setValue} onBlur={() => {}} />
      </div>
    );
  },
};

/**
 * Radio group field
 */
export const RadioField: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    const field: RadioFieldDefinition = {
      id: 'plan',
      type: 'radio',
      label: 'Subscription Plan',
      description: 'Choose your subscription plan',
      options: [
        { value: 'basic', label: 'Basic - $9/month' },
        { value: 'pro', label: 'Pro - $29/month' },
        { value: 'enterprise', label: 'Enterprise - $99/month' },
      ],
      required: true,
    };

    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FieldRenderer field={field} value={value} onChange={setValue} onBlur={() => {}} />
      </div>
    );
  },
};

/**
 * Switch field
 */
export const SwitchField: Story = {
  render: function Render() {
    const [value, setValue] = useState(false);

    const field: SwitchFieldDefinition = {
      id: 'notifications',
      type: 'switch',
      label: 'Enable notifications',
      description: 'Receive email notifications for updates',
    };

    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FieldRenderer field={field} value={value} onChange={setValue} onBlur={() => {}} />
      </div>
    );
  },
};

/**
 * Date input field
 */
export const DateField: Story = {
  render: function Render() {
    const [value, setValue] = useState('');

    const field: DateTimeFieldDefinition = {
      id: 'birthdate',
      type: 'date',
      label: 'Birth Date',
      description: 'Select your birth date',
      required: true,
    };

    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FieldRenderer field={field} value={value} onChange={setValue} onBlur={() => {}} />
      </div>
    );
  },
};

/**
 * File upload field
 */
export const FileField: Story = {
  render: function Render() {
    const [value, setValue] = useState<File | null>(null);

    const field: FileFieldDefinition = {
      id: 'avatar',
      type: 'file',
      label: 'Profile Picture',
      description: 'Upload a profile picture (JPG, PNG)',
      accept: 'image/jpeg,image/png',
    };

    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FieldRenderer field={field} value={value} onChange={setValue} onBlur={() => {}} />
        {value && (
          <div
            style={{
              marginTop: 'var(--ds-spacing-2)',
              fontSize: 'var(--ds-font-size-sm)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            Selected: {value.name}
          </div>
        )}
      </div>
    );
  },
};

/**
 * Field with error state
 */
export const WithError: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState('');

    const field: TextFieldDefinition = {
      id: 'email',
      type: 'email',
      label: t('storybook.formField.email'),
      placeholder: t('storybook.formField.enterEmail'),
      required: true,
    };

    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FieldRenderer
          field={field}
          value={value}
          onChange={setValue}
          onBlur={() => {}}
          error={t('storybook.formField.emailError')}
          touched={true}
        />
      </div>
    );
  },
};

/**
 * Disabled field
 */
export const Disabled: Story = {
  render: function Render() {
    const t = useT();
    const [value, setValue] = useState('Disabled value');

    const field: TextFieldDefinition = {
      id: 'name',
      type: 'text',
      label: t('storybook.formField.name'),
      disabled: true,
    };

    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FieldRenderer field={field} value={value} onChange={setValue} onBlur={() => {}} />
      </div>
    );
  },
};

/**
 * Read-only field
 */
export const ReadOnly: Story = {
  render: function Render() {
    const [value, setValue] = useState('Read-only value');

    const field: TextFieldDefinition = {
      id: 'name',
      type: 'text',
      label: 'Name',
      readOnly: true,
      description: 'This field cannot be edited',
    };

    return (
      <div style={{ maxWidth: '400px', padding: 'var(--ds-spacing-4)' }}>
        <FieldRenderer field={field} value={value} onChange={setValue} onBlur={() => {}} />
      </div>
    );
  },
};

/**
 * All field types showcase
 */
export const AllFieldTypes: Story = {
  render: function Render() {
    const [values, setValues] = useState<Record<string, unknown>>({
      text: '',
      email: '',
      number: 5,
      password: '',
      textarea: '',
      select: '',
      checkbox: false,
      radio: '',
      switch: false,
      date: '',
      file: null,
    });

    const updateValue = (id: string, value: unknown) => {
      setValues((prev) => ({ ...prev, [id]: value }));
    };

    const fields = [
      {
        field: {
          id: 'text',
          type: 'text',
          label: 'Text Input',
          placeholder: 'Enter text',
        } as TextFieldDefinition,
        value: values.text,
      },
      {
        field: {
          id: 'email',
          type: 'email',
          label: 'Email',
          placeholder: 'Enter email',
        } as TextFieldDefinition,
        value: values.email,
      },
      {
        field: {
          id: 'number',
          type: 'number',
          label: 'Number',
          min: 1,
          max: 10,
        } as NumberFieldDefinition,
        value: values.number,
      },
      {
        field: {
          id: 'password',
          type: 'password',
          label: 'Password',
          placeholder: 'Enter password',
        } as TextFieldDefinition,
        value: values.password,
      },
      {
        field: {
          id: 'textarea',
          type: 'textarea',
          label: 'Textarea',
          placeholder: 'Enter description',
          rows: 3,
        } as TextareaFieldDefinition,
        value: values.textarea,
      },
      {
        field: {
          id: 'select',
          type: 'select',
          label: 'Select',
          emptyLabel: 'Choose option',
          options: [
            { value: 'a', label: 'Option A' },
            { value: 'b', label: 'Option B' },
            { value: 'c', label: 'Option C' },
          ],
        } as SelectFieldDefinition,
        value: values.select,
      },
      {
        field: {
          id: 'checkbox',
          type: 'checkbox',
          label: 'I agree to the terms',
        } as CheckboxFieldDefinition,
        value: values.checkbox,
      },
      {
        field: {
          id: 'radio',
          type: 'radio',
          label: 'Choose one',
          options: [
            { value: 'x', label: 'Option X' },
            { value: 'y', label: 'Option Y' },
            { value: 'z', label: 'Option Z' },
          ],
        } as RadioFieldDefinition,
        value: values.radio,
      },
      {
        field: { id: 'switch', type: 'switch', label: 'Enable feature' } as SwitchFieldDefinition,
        value: values.switch,
      },
      {
        field: { id: 'date', type: 'date', label: 'Date' } as DateTimeFieldDefinition,
        value: values.date,
      },
      {
        field: {
          id: 'file',
          type: 'file',
          label: 'Upload file',
          accept: 'image/*',
        } as FileFieldDefinition,
        value: values.file,
      },
    ];

    return (
      <div style={{ maxWidth: '600px', padding: 'var(--ds-spacing-4)' }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: 'var(--ds-spacing-6)',
          }}
        >
          {fields.map(({ field, value }) => (
            <FieldRenderer
              key={field.id}
              field={field}
              value={value}
              onChange={(newValue) => updateValue(field.id, newValue)}
              onBlur={() => {}}
            />
          ))}
        </div>
      </div>
    );
  },
};
