/**
 * Form Builder Types
 *
 * Declarative form building system with schema-driven configuration.
 * Supports Zod validation, conditional fields, and custom field types.
 */

import type { ZodSchema, ZodTypeAny } from 'zod';

/**
 * Supported field types for form builder
 */
export type FieldType =
  | 'text'
  | 'email'
  | 'password'
  | 'number'
  | 'tel'
  | 'url'
  | 'search'
  | 'date'
  | 'time'
  | 'datetime-local'
  | 'textarea'
  | 'select'
  | 'multiselect'
  | 'checkbox'
  | 'radio'
  | 'switch'
  | 'file'
  | 'custom';

/**
 * Field size variants
 */
export type FieldSize = 'sm' | 'md' | 'lg';

/**
 * Field layout options
 */
export type FieldLayout = 'vertical' | 'horizontal';

/**
 * Conditional rule operators
 */
export type ConditionalOperator =
  | 'equals'
  | 'notEquals'
  | 'contains'
  | 'notContains'
  | 'greaterThan'
  | 'lessThan'
  | 'greaterThanOrEqual'
  | 'lessThanOrEqual'
  | 'isEmpty'
  | 'isNotEmpty'
  | 'isTrue'
  | 'isFalse';

/**
 * Field validation rule
 */
export interface ValidationRule {
  /** Validation type */
  type:
    | 'required'
    | 'minLength'
    | 'maxLength'
    | 'min'
    | 'max'
    | 'pattern'
    | 'email'
    | 'url'
    | 'custom';
  /** Validation value (e.g., min length, pattern regex) */
  value?: string | number | RegExp;
  /** Error message to display when validation fails */
  message: string;
  /** Custom validation function (for type: 'custom') */
  validator?: (value: unknown) => boolean | Promise<boolean>;
}

/**
 * Conditional display rule
 */
export interface ConditionalRule {
  /** Field ID to check */
  fieldId: string;
  /** Comparison operator */
  operator: ConditionalOperator;
  /** Value to compare against */
  value?: unknown;
}

/**
 * Field option for select, radio, and multiselect fields
 */
export interface FieldOption {
  /** Option value */
  value: string | number;
  /** Display label */
  label: string;
  /** Whether this option is disabled */
  disabled?: boolean;
  /** Optional description/help text */
  description?: string;
}

/**
 * Base field definition
 */
export interface BaseFieldDefinition {
  /** Unique field identifier */
  id: string;
  /** Field type */
  type: FieldType;
  /** Display label */
  label: string;
  /** Placeholder text */
  placeholder?: string;
  /** Help text / description */
  description?: string;
  /** Default value */
  defaultValue?: unknown;
  /** Whether field is required */
  required?: boolean;
  /** Whether field is disabled */
  disabled?: boolean;
  /** Whether field is read-only */
  readOnly?: boolean;
  /** Field size */
  size?: FieldSize;
  /** Field layout */
  layout?: FieldLayout;
  /** Validation rules */
  validation?: ValidationRule[];
  /** Conditional display rules (field is shown if ALL rules match) */
  showIf?: ConditionalRule[];
  /** Custom CSS class name */
  className?: string;
  /** Additional HTML attributes */
  attributes?: Record<string, string | number | boolean>;
  /** Test ID for testing */
  testId?: string;
}

/**
 * Text input field definition
 */
export interface TextFieldDefinition extends BaseFieldDefinition {
  type: 'text' | 'email' | 'password' | 'tel' | 'url' | 'search';
  /** Input autocomplete attribute */
  autoComplete?: string;
  /** Maximum character length */
  maxLength?: number;
  /** Minimum character length */
  minLength?: number;
}

/**
 * Number input field definition
 */
export interface NumberFieldDefinition extends BaseFieldDefinition {
  type: 'number';
  /** Minimum value */
  min?: number;
  /** Maximum value */
  max?: number;
  /** Step increment */
  step?: number;
}

/**
 * Date/time input field definition
 */
export interface DateTimeFieldDefinition extends BaseFieldDefinition {
  type: 'date' | 'time' | 'datetime-local';
  /** Minimum date/time */
  min?: string;
  /** Maximum date/time */
  max?: string;
}

/**
 * Textarea field definition
 */
export interface TextareaFieldDefinition extends BaseFieldDefinition {
  type: 'textarea';
  /** Number of visible text rows */
  rows?: number;
  /** Maximum character length */
  maxLength?: number;
  /** Minimum character length */
  minLength?: number;
  /** Whether to auto-resize based on content */
  autoResize?: boolean;
}

/**
 * Select field definition
 */
export interface SelectFieldDefinition extends BaseFieldDefinition {
  type: 'select';
  /** Available options */
  options: FieldOption[];
  /** Whether to allow search/filtering */
  searchable?: boolean;
  /** Placeholder for empty selection */
  emptyLabel?: string;
}

/**
 * Multi-select field definition
 */
export interface MultiSelectFieldDefinition extends BaseFieldDefinition {
  type: 'multiselect';
  /** Available options */
  options: FieldOption[];
  /** Whether to allow search/filtering */
  searchable?: boolean;
  /** Maximum number of selections */
  maxSelections?: number;
}

/**
 * Checkbox field definition
 */
export interface CheckboxFieldDefinition extends BaseFieldDefinition {
  type: 'checkbox';
  /** Checkbox value when checked */
  checkedValue?: string | number | boolean;
  /** Checkbox value when unchecked */
  uncheckedValue?: string | number | boolean;
}

/**
 * Radio field definition
 */
export interface RadioFieldDefinition extends BaseFieldDefinition {
  type: 'radio';
  /** Available options */
  options: FieldOption[];
}

/**
 * Switch field definition
 */
export interface SwitchFieldDefinition extends BaseFieldDefinition {
  type: 'switch';
  /** Switch value when on */
  onValue?: string | number | boolean;
  /** Switch value when off */
  offValue?: string | number | boolean;
}

/**
 * File input field definition
 */
export interface FileFieldDefinition extends BaseFieldDefinition {
  type: 'file';
  /** Accepted file types (MIME types or extensions) */
  accept?: string;
  /** Whether to allow multiple files */
  multiple?: boolean;
  /** Maximum file size in bytes */
  maxSize?: number;
  /** Maximum number of files */
  maxFiles?: number;
}

/**
 * Custom field definition
 */
export interface CustomFieldDefinition extends BaseFieldDefinition {
  type: 'custom';
  /** Custom component name/identifier */
  component: string;
  /** Additional props for custom component */
  componentProps?: Record<string, unknown>;
}

/**
 * Union of all field definitions
 */
export type FieldDefinition =
  | TextFieldDefinition
  | NumberFieldDefinition
  | DateTimeFieldDefinition
  | TextareaFieldDefinition
  | SelectFieldDefinition
  | MultiSelectFieldDefinition
  | CheckboxFieldDefinition
  | RadioFieldDefinition
  | SwitchFieldDefinition
  | FileFieldDefinition
  | CustomFieldDefinition;

/**
 * Form section for grouping fields
 */
export interface FormSection {
  /** Section identifier */
  id: string;
  /** Section title */
  title?: string;
  /** Section description */
  description?: string;
  /** Fields in this section */
  fields: FieldDefinition[];
  /** Whether section is collapsible */
  collapsible?: boolean;
  /** Whether section is initially collapsed */
  defaultCollapsed?: boolean;
  /** Conditional display rules */
  showIf?: ConditionalRule[];
}

/**
 * Form layout options
 */
export type FormLayout = 'vertical' | 'horizontal' | 'grid';

/**
 * Form submit behavior
 */
export type FormSubmitBehavior = 'default' | 'preventDefault' | 'custom';

/**
 * Form schema definition
 */
export interface FormSchema {
  /** Form identifier */
  id: string;
  /** Form title */
  title?: string;
  /** Form description */
  description?: string;
  /** Form fields (flat structure) */
  fields?: FieldDefinition[];
  /** Form sections (grouped structure) */
  sections?: FormSection[];
  /** Form layout */
  layout?: FormLayout;
  /** Grid columns (for grid layout) */
  gridColumns?: number;
  /** Zod validation schema */
  validationSchema?: ZodSchema | ZodTypeAny;
  /** Submit button label */
  submitLabel?: string;
  /** Cancel button label */
  cancelLabel?: string;
  /** Show cancel button */
  showCancelButton?: boolean;
  /** Submit behavior */
  submitBehavior?: FormSubmitBehavior;
  /** Whether form is disabled */
  disabled?: boolean;
  /** Whether form is read-only */
  readOnly?: boolean;
  /** Custom CSS class name */
  className?: string;
}

/**
 * Form values (field ID to value map)
 */
export type FormValues = Record<string, unknown>;

/**
 * Form errors (field ID to error message map)
 */
export type FormErrors = Record<string, string | undefined>;

/**
 * Form touched state (field ID to touched boolean map)
 */
export type FormTouched = Record<string, boolean>;

/**
 * Form state
 */
export interface FormState {
  /** Current form values */
  values: FormValues;
  /** Field errors */
  errors: FormErrors;
  /** Touched fields */
  touched: FormTouched;
  /** Whether form is submitting */
  isSubmitting: boolean;
  /** Whether form is valid */
  isValid: boolean;
  /** Whether form has been modified */
  isDirty: boolean;
}

/**
 * Form submission result
 */
export interface FormSubmitResult {
  /** Whether submission was successful */
  success: boolean;
  /** Result data */
  data?: unknown;
  /** Error message */
  error?: string;
  /** Field-specific errors */
  fieldErrors?: FormErrors;
}

/**
 * Form event handlers
 */
export interface FormEventHandlers {
  /** Called when form is submitted */
  onSubmit?: (values: FormValues) => void | Promise<void> | Promise<FormSubmitResult>;
  /** Called when form is cancelled */
  onCancel?: () => void;
  /** Called when field value changes */
  onChange?: (fieldId: string, value: unknown, allValues: FormValues) => void;
  /** Called when field is blurred */
  onBlur?: (fieldId: string) => void;
  /** Called when field is focused */
  onFocus?: (fieldId: string) => void;
  /** Called when form validation state changes */
  onValidationChange?: (isValid: boolean, errors: FormErrors) => void;
}

/**
 * Custom field renderer component props
 */
export interface CustomFieldRendererProps {
  /** Field definition */
  field: CustomFieldDefinition;
  /** Current field value */
  value: unknown;
  /** Change handler */
  onChange: (value: unknown) => void;
  /** Blur handler */
  onBlur: () => void;
  /** Field error message */
  error?: string;
  /** Whether field has been touched */
  touched?: boolean;
  /** Whether field is disabled */
  disabled?: boolean;
  /** Whether field is read-only */
  readOnly?: boolean;
}

/**
 * Custom field type registry
 */
export type CustomFieldRegistry = Record<string, React.ComponentType<CustomFieldRendererProps>>;

/**
 * Form builder configuration
 */
export interface FormBuilderConfig {
  /** Custom field type registry */
  customFields?: CustomFieldRegistry;
  /** Default field size */
  defaultFieldSize?: FieldSize;
  /** Default form layout */
  defaultLayout?: FormLayout;
  /** Whether to show required indicators */
  showRequiredIndicators?: boolean;
  /** Whether to show optional indicators */
  showOptionalIndicators?: boolean;
  /** Whether to validate on change */
  validateOnChange?: boolean;
  /** Whether to validate on blur */
  validateOnBlur?: boolean;
  /** Whether to validate on submit */
  validateOnSubmit?: boolean;
}

/**
 * Field renderer props
 */
export interface FieldRendererProps {
  /** Field definition */
  field: FieldDefinition;
  /** Current field value */
  value: unknown;
  /** Change handler */
  onChange: (value: unknown) => void;
  /** Blur handler */
  onBlur: () => void;
  /** Focus handler */
  onFocus?: () => void;
  /** Field error message */
  error?: string;
  /** Whether field has been touched */
  touched?: boolean;
  /** All form values (for conditional logic) */
  formValues?: FormValues;
  /** Custom field registry */
  customFields?: CustomFieldRegistry;
}
