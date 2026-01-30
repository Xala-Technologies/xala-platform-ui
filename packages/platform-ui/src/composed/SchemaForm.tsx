/* eslint-disable no-restricted-syntax */
/**
 * SchemaForm Component
 *
 * A declarative form component that generates accessible forms from schema definitions.
 * Integrates with Zod for validation, supports conditional fields, and custom field types.
 *
 * @example
 * ```tsx
 * import { z } from 'zod';
 *
 * const schema = z.object({
 *   name: z.string().min(2, 'Name must be at least 2 characters'),
 *   email: z.string().email('Invalid email address'),
 *   age: z.number().min(18, 'Must be at least 18'),
 * });
 *
 * const formSchema: FormSchema = {
 *   id: 'user-form',
 *   title: 'User Information',
 *   fields: [
 *     { id: 'name', type: 'text', label: 'Full Name', required: true },
 *     { id: 'email', type: 'email', label: 'Email', required: true },
 *     { id: 'age', type: 'number', label: 'Age', required: true },
 *   ],
 *   validationSchema: schema,
 * };
 *
 * <SchemaForm
 *   schema={formSchema}
 *   onSubmit={handleSubmit}
 *   initialValues={{ name: 'John Doe' }}
 * />
 * ```
 *
 * @module @xala-technologies/platform-ui/composed/SchemaForm
 */

'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Button, Heading, Paragraph } from '@digdir/designsystemet-react';
import type { ZodError } from 'zod';
import { FieldRenderer } from '../primitives/FormBuilder';
import { FormSection, FormActions, FormRow } from './FormLayout';
import type {
  FormSchema,
  FormValues,
  FormErrors,
  FormTouched,
  FormState,
  FormEventHandlers,
  FormBuilderConfig,
  FieldDefinition,
  ConditionalRule,
  FormSection as FormSectionType,
} from '../types/form-builder';

// =============================================================================
// Types
// =============================================================================

export interface SchemaFormProps extends FormEventHandlers, Partial<FormBuilderConfig> {
  /** Form schema definition */
  schema: FormSchema;
  /** Initial form values */
  initialValues?: FormValues;
  /** External validation errors */
  externalErrors?: FormErrors;
  /** Whether form is loading/submitting */
  loading?: boolean;
  /** Custom class name */
  className?: string;
  /** Test ID for testing */
  'data-testid'?: string;
}

// =============================================================================
// Helper Functions
// =============================================================================

/**
 * Concatenate class names, filtering out falsy values
 */
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/**
 * Evaluate a conditional rule against form values
 */
function evaluateCondition(rule: ConditionalRule, values: FormValues): boolean {
  const fieldValue = values[rule.fieldId];

  switch (rule.operator) {
    case 'equals':
      return fieldValue === rule.value;
    case 'notEquals':
      return fieldValue !== rule.value;
    case 'contains':
      return (
        typeof fieldValue === 'string' &&
        typeof rule.value === 'string' &&
        fieldValue.includes(rule.value)
      );
    case 'notContains':
      return (
        typeof fieldValue === 'string' &&
        typeof rule.value === 'string' &&
        !fieldValue.includes(rule.value)
      );
    case 'greaterThan':
      return typeof fieldValue === 'number' && fieldValue > Number(rule.value);
    case 'lessThan':
      return typeof fieldValue === 'number' && fieldValue < Number(rule.value);
    case 'greaterThanOrEqual':
      return typeof fieldValue === 'number' && fieldValue >= Number(rule.value);
    case 'lessThanOrEqual':
      return typeof fieldValue === 'number' && fieldValue <= Number(rule.value);
    case 'isEmpty':
      return (
        fieldValue === null ||
        fieldValue === undefined ||
        fieldValue === '' ||
        (Array.isArray(fieldValue) && fieldValue.length === 0)
      );
    case 'isNotEmpty':
      return !(
        fieldValue === null ||
        fieldValue === undefined ||
        fieldValue === '' ||
        (Array.isArray(fieldValue) && fieldValue.length === 0)
      );
    case 'isTrue':
      return fieldValue === true;
    case 'isFalse':
      return fieldValue === false;
    default:
      return true;
  }
}

/**
 * Check if a field should be shown based on conditional rules
 */
function shouldShowField(field: FieldDefinition, values: FormValues): boolean {
  if (!field.showIf || field.showIf.length === 0) {
    return true;
  }

  return field.showIf.every((rule) => evaluateCondition(rule, values));
}

/**
 * Check if a section should be shown based on conditional rules
 */
function shouldShowSection(section: FormSectionType, values: FormValues): boolean {
  if (!section.showIf || section.showIf.length === 0) {
    return true;
  }

  return section.showIf.every((rule) => evaluateCondition(rule, values));
}

/**
 * Get initial form values from schema
 */
function getInitialValues(schema: FormSchema, providedValues?: FormValues): FormValues {
  const initialValues: FormValues = {};

  // Collect all fields (from both flat fields and sections)
  const allFields: FieldDefinition[] = [
    ...(schema.fields || []),
    ...(schema.sections || []).flatMap((section) => section.fields),
  ];

  // Set default values
  for (const field of allFields) {
    if (field.defaultValue !== undefined) {
      initialValues[field.id] = field.defaultValue;
    }
  }

  // Override with provided values
  return { ...initialValues, ...providedValues };
}

/**
 * Validate form values using Zod schema
 */
function validateWithZod(values: FormValues, schema?: FormSchema['validationSchema']): FormErrors {
  if (!schema) {
    return {};
  }

  try {
    schema.parse(values);
    return {};
  } catch (error) {
    const zodError = error as ZodError;
    const errors: FormErrors = {};

    for (const issue of zodError.errors) {
      const fieldPath = issue.path.join('.');
      errors[fieldPath] = issue.message;
    }

    return errors;
  }
}

// =============================================================================
// Main Component
// =============================================================================

export function SchemaForm({
  schema,
  initialValues: providedInitialValues,
  externalErrors,
  loading = false,
  className,
  'data-testid': testId = 'schema-form',
  onSubmit,
  onCancel,
  onChange,
  onBlur,
  onFocus,
  onValidationChange,
  customFields,
  validateOnChange = false,
  validateOnBlur = true,
  validateOnSubmit = true,
}: SchemaFormProps): React.ReactElement {
  // Initialize form values
  const initialValues = useMemo(
    () => getInitialValues(schema, providedInitialValues),
    [schema, providedInitialValues]
  );

  // Form state
  const [values, setValues] = useState<FormValues>(initialValues);
  const [errors, setErrors] = useState<FormErrors>({});
  const [touched, setTouched] = useState<FormTouched>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Compute form state
  const formState = useMemo<FormState>(
    () => ({
      values,
      errors,
      touched,
      isSubmitting,
      isValid: Object.keys(errors).length === 0,
      isDirty: JSON.stringify(values) !== JSON.stringify(initialValues),
    }),
    [values, errors, touched, isSubmitting, initialValues]
  );

  // Update values when initialValues change
  useEffect(() => {
    setValues(initialValues);
  }, [initialValues]);

  // Validate form
  const validate = useCallback(
    (valuesToValidate: FormValues = values): FormErrors => {
      const validationErrors = validateWithZod(valuesToValidate, schema.validationSchema);
      setErrors(validationErrors);
      onValidationChange?.(Object.keys(validationErrors).length === 0, validationErrors);
      return validationErrors;
    },
    [values, schema.validationSchema, onValidationChange]
  );

  // Handle field change
  const handleFieldChange = useCallback(
    (fieldId: string, value: unknown) => {
      const newValues = { ...values, [fieldId]: value };
      setValues(newValues);
      onChange?.(fieldId, value, newValues);

      if (validateOnChange) {
        validate(newValues);
      }
    },
    [values, onChange, validateOnChange, validate]
  );

  // Handle field blur
  const handleFieldBlur = useCallback(
    (fieldId: string) => {
      setTouched((prev) => ({ ...prev, [fieldId]: true }));
      onBlur?.(fieldId);

      if (validateOnBlur) {
        validate();
      }
    },
    [onBlur, validateOnBlur, validate]
  );

  // Handle field focus
  const handleFieldFocus = useCallback(
    (fieldId: string) => {
      onFocus?.(fieldId);
    },
    [onFocus]
  );

  // Handle form submit
  const handleSubmit = useCallback(
    async (e: React.FormEvent) => {
      e.preventDefault();

      // Mark all fields as touched
      const allFields: FieldDefinition[] = [
        ...(schema.fields || []),
        ...(schema.sections || []).flatMap((section) => section.fields),
      ];
      const allTouched: FormTouched = {};
      for (const field of allFields) {
        allTouched[field.id] = true;
      }
      setTouched(allTouched);

      // Validate if enabled
      let validationErrors: FormErrors = {};
      if (validateOnSubmit) {
        validationErrors = validate();
      }

      // Don't submit if there are validation errors
      if (Object.keys(validationErrors).length > 0) {
        return;
      }

      // Submit
      setIsSubmitting(true);
      try {
        const result = await onSubmit?.(values);

        // Handle field errors from submit result
        if (result && typeof result === 'object' && 'fieldErrors' in result && result.fieldErrors) {
          setErrors(result.fieldErrors);
        }
      } finally {
        setIsSubmitting(false);
      }
    },
    [schema, values, validateOnSubmit, validate, onSubmit]
  );

  // Handle cancel
  const handleCancel = useCallback(() => {
    onCancel?.();
  }, [onCancel]);

  // Combine internal and external errors
  const displayErrors = useMemo(() => ({ ...errors, ...externalErrors }), [errors, externalErrors]);

  // Determine if form is disabled
  const isDisabled = schema.disabled || loading || isSubmitting;

  // Render a single field
  const renderField = useCallback(
    (field: FieldDefinition) => {
      // Check if field should be shown
      if (!shouldShowField(field, values)) {
        return null;
      }

      return (
        <FieldRenderer
          key={field.id}
          field={field}
          value={values[field.id]}
          onChange={(value) => handleFieldChange(field.id, value)}
          onBlur={() => handleFieldBlur(field.id)}
          onFocus={() => handleFieldFocus(field.id)}
          error={touched[field.id] ? displayErrors[field.id] : undefined}
          touched={touched[field.id]}
          formValues={values}
          customFields={customFields}
        />
      );
    },
    [
      values,
      touched,
      displayErrors,
      customFields,
      handleFieldChange,
      handleFieldBlur,
      handleFieldFocus,
    ]
  );

  // Render fields with layout
  const renderFieldsWithLayout = useCallback(
    (fields: FieldDefinition[]) => {
      const visibleFields = fields.filter((field) => shouldShowField(field, values));

      if (visibleFields.length === 0) {
        return null;
      }

      if (schema.layout === 'grid') {
        const columns = (schema.gridColumns || 2) as 1 | 2 | 3 | 4 | 6 | 12;
        return (
          <FormRow columns={columns} gap="md">
            {visibleFields.map(renderField)}
          </FormRow>
        );
      }

      return (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-4)' }}>
          {visibleFields.map(renderField)}
        </div>
      );
    },
    [schema.layout, schema.gridColumns, values, renderField]
  );

  return (
    <form
      className={cn('schema-form', className)}
      data-testid={testId}
      onSubmit={handleSubmit}
      style={{
        display: 'flex',
        flexDirection: 'column',
        gap: 'var(--ds-spacing-5)',
      }}
    >
      {/* Form header */}
      {(schema.title || schema.description) && (
        <div>
          {schema.title && (
            <Heading level={2} data-size="md" style={{ margin: 0 }}>
              {schema.title}
            </Heading>
          )}
          {schema.description && (
            <Paragraph
              data-size="sm"
              style={{
                margin: 0,
                marginTop: 'var(--ds-spacing-1)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {schema.description}
            </Paragraph>
          )}
        </div>
      )}

      {/* Render sections if provided */}
      {schema.sections && schema.sections.length > 0
        ? schema.sections.map((section) => {
            if (!shouldShowSection(section, values)) {
              return null;
            }

            return (
              <FormSection
                key={section.id}
                title={section.title}
                description={section.description}
                collapsible={section.collapsible}
                defaultCollapsed={section.defaultCollapsed}
              >
                {renderFieldsWithLayout(section.fields)}
              </FormSection>
            );
          })
        : /* Render flat fields */
          schema.fields && renderFieldsWithLayout(schema.fields)}

      {/* Form actions */}
      <FormActions align="right">
        {schema.showCancelButton && onCancel && (
          <Button type="button" variant="tertiary" onClick={handleCancel} disabled={isSubmitting}>
            {schema.cancelLabel || 'Cancel'}
          </Button>
        )}
        <Button
          type="submit"
          variant="primary"
          data-color="accent"
          disabled={
            isDisabled ||
            (validateOnSubmit && !formState.isValid && Object.keys(touched).length > 0)
          }
        >
          {isSubmitting ? 'Submitting...' : schema.submitLabel || 'Submit'}
        </Button>
      </FormActions>
    </form>
  );
}

export default SchemaForm;
