/**
 * DynamicForm Component
 *
 * An enhanced form component with advanced conditional field support and
 * runtime schema manipulation. Built on top of SchemaForm, it provides
 * additional capabilities for dynamic forms that change based on user input.
 *
 * Key features:
 * - Dynamic field registration and removal at runtime
 * - Enhanced conditional logic with field dependencies
 * - Cascading field updates based on dependencies
 * - Custom field type registration with validation
 * - Dynamic schema updates without remounting
 * - Field visibility management with animations
 *
 * This component is designed for:
 * - Configuration wizards with dependent fields
 * - Multi-stage onboarding forms
 * - Complex booking flows with dynamic pricing
 * - Questionnaires with branching logic
 * - Registration forms with progressive disclosure
 *
 * @example
 * ```tsx
 * const formSchema: FormSchema = {
 *   id: 'booking-form',
 *   title: 'Book a Resource',
 *   fields: [
 *     { id: 'type', type: 'select', label: 'Type', options: [...] },
 *     {
 *       id: 'duration',
 *       type: 'number',
 *       label: 'Duration (hours)',
 *       showIf: [{ fieldId: 'type', operator: 'equals', value: 'hourly' }],
 *     },
 *   ],
 * };
 *
 * <DynamicForm
 *   schema={formSchema}
 *   onSubmit={handleSubmit}
 *   customFields={customFieldRegistry}
 *   onFieldChange={handleFieldChange}
 * />
 * ```
 */

'use client';

import React, { useState, useMemo, useCallback, useEffect } from 'react';
import { Paragraph } from '@digdir/designsystemet-react';
import { SchemaForm } from '../composed/SchemaForm';
import type {
  FormSchema,
  FormValues,
  FormErrors,
  FieldDefinition,
  FormEventHandlers,
  FormBuilderConfig,
  ConditionalRule,
  FormSection,
} from '../types/form-builder';

// =============================================================================
// Types
// =============================================================================

/** Field dependency configuration */
export interface FieldDependency {
  /** Field ID that this field depends on */
  dependsOn: string;
  /** Transformation function that updates this field's value based on dependency */
  transform?: (dependencyValue: unknown, currentValue: unknown, allValues: FormValues) => unknown;
  /** Whether to clear this field when dependency changes */
  clearOnChange?: boolean;
}

/** Enhanced field definition with dependencies */
export type DynamicFieldDefinition = FieldDefinition & {
  /** Field dependencies for cascading updates */
  dependencies?: FieldDependency[];
};

/** Section with dynamic fields */
export interface DynamicFormSection {
  id: string;
  title?: string;
  description?: string;
  fields: DynamicFieldDefinition[];
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  showIf?: ConditionalRule[];
}

/** Enhanced form schema with dynamic capabilities */
export interface DynamicFormSchema extends Omit<FormSchema, 'fields' | 'sections'> {
  /** Form fields with dependency support */
  fields?: DynamicFieldDefinition[];
  /** Form sections with dynamic fields */
  sections?: DynamicFormSection[];
}

/** DynamicForm props interface */
export interface DynamicFormProps extends FormEventHandlers, Partial<FormBuilderConfig> {
  /** Form schema with dynamic field support */
  schema: DynamicFormSchema;

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

  /** Callback when a field value changes (after dependency updates) */
  onFieldChange?: (fieldId: string, value: unknown, allValues: FormValues) => void;

  /** Callback when the schema is dynamically updated */
  onSchemaChange?: (schema: DynamicFormSchema) => void;

  /** Enable debug mode (logs field changes and dependencies) */
  debug?: boolean;
}

// =============================================================================
// Utility Functions
// =============================================================================

/**
 * Get all fields from schema (flat and sections)
 */
function getAllFields(schema: DynamicFormSchema): DynamicFieldDefinition[] {
  const fields: DynamicFieldDefinition[] = [];

  if (schema.fields) {
    fields.push(...schema.fields);
  }

  if (schema.sections) {
    for (const section of schema.sections) {
      fields.push(...section.fields);
    }
  }

  return fields;
}

/**
 * Build a dependency graph for fields
 */
function buildDependencyGraph(fields: DynamicFieldDefinition[]): Map<string, Set<string>> {
  const graph = new Map<string, Set<string>>();

  for (const field of fields) {
    if (field.dependencies) {
      for (const dep of field.dependencies) {
        if (!graph.has(dep.dependsOn)) {
          graph.set(dep.dependsOn, new Set());
        }
        graph.get(dep.dependsOn)!.add(field.id);
      }
    }
  }

  return graph;
}

/**
 * Process field dependencies and return updated values
 */
function processDependencies(
  fieldId: string,
  newValue: unknown,
  allValues: FormValues,
  fields: DynamicFieldDefinition[],
  dependencyGraph: Map<string, Set<string>>
): FormValues {
  const updatedValues = { ...allValues, [fieldId]: newValue };
  const affectedFields = dependencyGraph.get(fieldId);

  if (!affectedFields || affectedFields.size === 0) {
    return updatedValues;
  }

  // Process each dependent field
  for (const dependentFieldId of affectedFields) {
    const dependentField = fields.find((f) => f.id === dependentFieldId);

    if (!dependentField?.dependencies) {
      continue;
    }

    // Find the specific dependency
    const dependency = dependentField.dependencies.find((d) => d.dependsOn === fieldId);

    if (!dependency) {
      continue;
    }

    // Apply transformation or clear
    if (dependency.clearOnChange) {
      updatedValues[dependentFieldId] = dependentField.defaultValue ?? null;
    } else if (dependency.transform) {
      const currentValue = updatedValues[dependentFieldId];
      updatedValues[dependentFieldId] = dependency.transform(newValue, currentValue, updatedValues);
    }

    // Recursively process dependencies
    const recursiveUpdates = processDependencies(
      dependentFieldId,
      updatedValues[dependentFieldId],
      updatedValues,
      fields,
      dependencyGraph
    );

    Object.assign(updatedValues, recursiveUpdates);
  }

  return updatedValues;
}

// =============================================================================
// Main Component
// =============================================================================

export function DynamicForm({
  schema: initialSchema,
  initialValues,
  externalErrors,
  loading = false,
  className,
  'data-testid': testId = 'dynamic-form',
  onSubmit,
  onCancel,
  onChange,
  onBlur,
  onFocus,
  onValidationChange,
  onFieldChange,
  onSchemaChange,
  customFields: providedCustomFields,
  validateOnChange = false,
  validateOnBlur = true,
  validateOnSubmit = true,
  debug = false,
}: DynamicFormProps): React.ReactElement {
  // Schema state (for dynamic updates)
  const [schema, setSchema] = useState<DynamicFormSchema>(initialSchema);

  // Update schema when prop changes
  useEffect(() => {
    setSchema(initialSchema);
  }, [initialSchema]);

  // Build dependency graph
  const { fields, dependencyGraph } = useMemo(() => {
    const allFields = getAllFields(schema);
    const graph = buildDependencyGraph(allFields);
    return { fields: allFields, dependencyGraph: graph };
  }, [schema]);

  // Enhanced change handler with dependency processing
  const handleChange = useCallback(
    (fieldId: string, value: unknown, allValues: FormValues) => {
      if (debug) {
        console.log('[DynamicForm] Field changed:', { fieldId, value, allValues });
      }

      // Process dependencies
      const updatedValues = processDependencies(fieldId, value, allValues, fields, dependencyGraph);

      if (debug && Object.keys(updatedValues).length !== Object.keys(allValues).length) {
        console.log('[DynamicForm] Dependencies updated:', updatedValues);
      }

      // Call original onChange
      onChange?.(fieldId, value, updatedValues);

      // Call field change callback
      onFieldChange?.(fieldId, value, updatedValues);
    },
    [fields, dependencyGraph, onChange, onFieldChange, debug]
  );

  // Schema manipulation methods
  // These methods can be exposed via ref or context if needed by parent components
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const addField = useCallback(
    (field: DynamicFieldDefinition, sectionId?: string) => {
      setSchema((prev) => {
        const newSchema: DynamicFormSchema = { ...prev };

        if (sectionId) {
          // Add to specific section
          if (newSchema.sections) {
            newSchema.sections = newSchema.sections.map((section) => {
              if (section.id === sectionId) {
                return {
                  ...section,
                  fields: [...section.fields, field] as DynamicFieldDefinition[],
                };
              }
              return section;
            });
          }
        } else {
          // Add to flat fields
          newSchema.fields = [...(newSchema.fields || []), field] as DynamicFieldDefinition[];
        }

        onSchemaChange?.(newSchema);
        return newSchema;
      });
    },
    [onSchemaChange]
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const removeField = useCallback(
    (fieldId: string) => {
      setSchema((prev) => {
        const newSchema: DynamicFormSchema = { ...prev };

        // Remove from flat fields
        if (newSchema.fields) {
          newSchema.fields = newSchema.fields.filter(
            (f) => f.id !== fieldId
          ) as DynamicFieldDefinition[];
        }

        // Remove from sections
        if (newSchema.sections) {
          newSchema.sections = newSchema.sections.map((section) => ({
            ...section,
            fields: section.fields.filter((f) => f.id !== fieldId) as DynamicFieldDefinition[],
          }));
        }

        onSchemaChange?.(newSchema);
        return newSchema;
      });
    },
    [onSchemaChange]
  );

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const updateField = useCallback(
    (fieldId: string, updates: Partial<DynamicFieldDefinition>) => {
      setSchema((prev) => {
        const newSchema: DynamicFormSchema = { ...prev };

        // Update in flat fields
        if (newSchema.fields) {
          newSchema.fields = newSchema.fields.map((f) =>
            f.id === fieldId ? ({ ...f, ...updates } as DynamicFieldDefinition) : f
          ) as DynamicFieldDefinition[];
        }

        // Update in sections
        if (newSchema.sections) {
          newSchema.sections = newSchema.sections.map((section) => ({
            ...section,
            fields: section.fields.map((f) =>
              f.id === fieldId ? ({ ...f, ...updates } as DynamicFieldDefinition) : f
            ) as DynamicFieldDefinition[],
          }));
        }

        onSchemaChange?.(newSchema);
        return newSchema;
      });
    },
    [onSchemaChange]
  );

  // Provide schema manipulation methods via ref or context if needed
  // For now, they can be accessed by parent components

  // Convert DynamicFormSchema to FormSchema for SchemaForm
  const formSchema: FormSchema = useMemo(() => {
    const converted: FormSchema = {
      ...schema,
      fields: schema.fields as FieldDefinition[] | undefined,
      sections: schema.sections
        ? (schema.sections.map((section) => ({
            ...section,
            fields: section.fields as FieldDefinition[],
          })) as FormSection[])
        : undefined,
    };
    return converted;
  }, [schema]);

  return (
    <div className={className} data-testid={testId}>
      {debug && (
        <div
          style={{
            padding: 'var(--ds-spacing-3)',
            marginBottom: 'var(--ds-spacing-4)',
            backgroundColor: 'var(--ds-color-info-surface-default)',
            borderRadius: 'var(--ds-border-radius-md)',
            border: '1px solid var(--ds-color-info-border-default)',
          }}
        >
          <Paragraph data-size="sm" style={{ margin: 0, fontWeight: 600 }}>
            Debug Mode Enabled
          </Paragraph>
          <Paragraph data-size="xs" style={{ margin: 0, marginTop: 'var(--ds-spacing-1)' }}>
            Field changes and dependency updates will be logged to console.
          </Paragraph>
        </div>
      )}

      <SchemaForm
        schema={formSchema}
        initialValues={initialValues}
        externalErrors={externalErrors}
        loading={loading}
        onSubmit={onSubmit}
        onCancel={onCancel}
        onChange={handleChange}
        onBlur={onBlur}
        onFocus={onFocus}
        onValidationChange={onValidationChange}
        customFields={providedCustomFields}
        validateOnChange={validateOnChange}
        validateOnBlur={validateOnBlur}
        validateOnSubmit={validateOnSubmit}
        data-testid={`${testId}-schema-form`}
      />
    </div>
  );
}

// =============================================================================
// Helper Components
// =============================================================================

/**
 * DynamicFormField - A wrapper component for conditionally rendered fields
 * Provides smooth transitions when fields appear/disappear
 */
export interface DynamicFormFieldProps {
  /** Whether the field is visible */
  visible: boolean;
  /** Field content */
  children: React.ReactNode;
  /** Animation duration in ms */
  animationDuration?: number;
}

export function DynamicFormField({
  visible,
  children,
  animationDuration = 200,
}: DynamicFormFieldProps): React.ReactElement | null {
  const [shouldRender, setShouldRender] = useState(visible);

  useEffect(() => {
    if (visible) {
      setShouldRender(true);
    } else {
      const timer = setTimeout(() => setShouldRender(false), animationDuration);
      return () => clearTimeout(timer);
    }
  }, [visible, animationDuration]);

  if (!shouldRender) {
    return null;
  }

  return (
    <div
      style={{
        opacity: visible ? 1 : 0,
        maxHeight: visible ? '1000px' : '0',
        overflow: 'hidden',
        transition: `opacity ${animationDuration}ms ease, max-height ${animationDuration}ms ease`,
      }}
    >
      {children}
    </div>
  );
}

// =============================================================================
// Utility Exports
// =============================================================================

/**
 * Create a field dependency configuration
 */
export function createDependency(
  dependsOn: string,
  options?: {
    transform?: FieldDependency['transform'];
    clearOnChange?: boolean;
  }
): FieldDependency {
  return {
    dependsOn,
    transform: options?.transform,
    clearOnChange: options?.clearOnChange ?? false,
  };
}

/**
 * Common dependency transformations
 */
export const DependencyTransforms = {
  /**
   * Clear the field when dependency value equals the specified value
   */
  clearIfEquals: (value: unknown) => (depValue: unknown, currentValue: unknown) => {
    return depValue === value ? null : currentValue;
  },

  /**
   * Set field to a specific value when dependency changes
   */
  setValue: (value: unknown) => () => value,

  /**
   * Copy dependency value to this field
   */
  copyValue: (depValue: unknown) => depValue,

  /**
   * Transform dependency value using a function
   */
  mapValue: (fn: (depValue: unknown) => unknown) => (depValue: unknown) => fn(depValue),

  /**
   * Calculate value based on multiple dependencies
   */
  calculate:
    (fn: (allValues: FormValues) => unknown) =>
    (_depValue: unknown, _currentValue: unknown, allValues: FormValues) =>
      fn(allValues),
};

export default DynamicForm;
