/* eslint-disable no-restricted-syntax */
/**
 * FieldRenderer Component
 *
 * Renders form fields based on field definition, mapping types to appropriate
 * Designsystemet components. This is the core primitive for the form builder system.
 */
import React from 'react';
import {
  Textfield,
  Textarea,
  Checkbox,
  Radio,
  Switch,
  Select,
  Combobox,
  Label,
  Fieldset,
} from '../components';
import { BidiSafeInput } from '../BidiSafeInput';
import { NativeSelect } from '../NativeSelect';
import type {
  FieldRendererProps,
  TextFieldDefinition,
  NumberFieldDefinition,
  DateTimeFieldDefinition,
  TextareaFieldDefinition,
  SelectFieldDefinition,
  MultiSelectFieldDefinition,
  CheckboxFieldDefinition,
  RadioFieldDefinition,
  SwitchFieldDefinition,
  FileFieldDefinition,
  CustomFieldDefinition,
} from './types';

/**
 * FieldRenderer - Renders a form field based on its type
 *
 * Maps field definitions to appropriate Designsystemet components:
 * - text, password, search, number → Textfield
 * - email, tel, url → BidiSafeInput (for RTL safety)
 * - textarea → Textarea
 * - select → Select or NativeSelect
 * - multiselect → Combobox with multiple
 * - checkbox → Checkbox
 * - radio → Radio group
 * - switch → Switch
 * - file → Textfield with type="file"
 * - custom → Custom component from registry
 *
 * @param props - FieldRendererProps
 * @returns Rendered field component
 */
export function FieldRenderer({
  field,
  value,
  onChange,
  onBlur,
  onFocus,
  error,
  touched,
  customFields,
}: FieldRendererProps): React.ReactElement {
  const {
    id,
    label,
    placeholder,
    description,
    required = false,
    disabled = false,
    readOnly = false,
    size,
  } = field;

  // Determine data-size attribute
  const dataSize = (size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md') as 'sm' | 'md' | 'lg';

  // Common props for most input components
  const commonProps = {
    name: id,
    id,
    placeholder,
    disabled,
    readOnly,
    required,
    onBlur: () => onBlur(),
    onFocus: () => onFocus?.(),
  };

  // Text-based inputs (text, password, search, number)
  if (
    field.type === 'text' ||
    field.type === 'password' ||
    field.type === 'search' ||
    field.type === 'number'
  ) {
    const textField = field as TextFieldDefinition | NumberFieldDefinition;
    const inputValue = value != null ? String(value) : '';

    return (
      <Textfield
        {...commonProps}
        data-size={dataSize}
        type={field.type}
        label={label}
        description={description}
        error={error}
        value={inputValue}
        onChange={(e) => {
          const newValue = field.type === 'number' ? Number(e.target.value) : e.target.value;
          onChange(newValue);
        }}
        autoComplete={'autoComplete' in textField ? textField.autoComplete : undefined}
        maxLength={'maxLength' in textField ? textField.maxLength : undefined}
        minLength={'minLength' in textField ? textField.minLength : undefined}
        {...(field.type === 'number' && 'min' in textField ? { min: textField.min } : {})}
        {...(field.type === 'number' && 'max' in textField ? { max: textField.max } : {})}
        {...(field.type === 'number' && 'step' in textField ? { step: textField.step } : {})}
      />
    );
  }

  // Bidirectional-safe inputs (email, tel, url) - must remain LTR
  if (field.type === 'email' || field.type === 'tel' || field.type === 'url') {
    const textField = field as TextFieldDefinition;
    const inputValue = value != null ? String(value) : '';

    return (
      <BidiSafeInput
        {...commonProps}
        type={field.type}
        label={label}
        description={description}
        error={error}
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={textField.autoComplete}
        data-size={dataSize}
      />
    );
  }

  // Date/time inputs
  if (field.type === 'date' || field.type === 'time' || field.type === 'datetime-local') {
    const dateField = field as DateTimeFieldDefinition;
    const inputValue = value != null ? String(value) : '';

    return (
      <Textfield
        {...commonProps}
        data-size={dataSize}
        type={field.type}
        label={label}
        description={description}
        error={error}
        value={inputValue}
        onChange={(e) => onChange(e.target.value)}
        min={dateField.min}
        max={dateField.max}
      />
    );
  }

  // Textarea
  if (field.type === 'textarea') {
    const textareaField = field as TextareaFieldDefinition;
    const textValue = value != null ? String(value) : '';

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-1)' }}>
        {label && (
          <Label htmlFor={id}>
            {label}
            {required && <span style={{ color: 'var(--ds-color-danger-text-default)' }}> *</span>}
          </Label>
        )}
        {description && !error && (
          <span
            style={{
              fontSize: 'var(--ds-font-size-sm)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {description}
          </span>
        )}
        <Textarea
          {...commonProps}
          data-size={dataSize}
          value={textValue}
          onChange={(e) => onChange(e.target.value)}
          rows={textareaField.rows}
          maxLength={textareaField.maxLength}
          style={
            textareaField.autoResize
              ? { resize: 'vertical', minHeight: 'var(--ds-spacing-12)' }
              : undefined
          }
        />
        {error && (
          <span
            style={{
              fontSize: 'var(--ds-font-size-sm)',
              color: 'var(--ds-color-danger-text-default)',
            }}
          >
            {error}
          </span>
        )}
      </div>
    );
  }

  // Select dropdown
  if (field.type === 'select') {
    const selectField = field as SelectFieldDefinition;
    const selectValue = value != null ? String(value) : '';

    // Use native select for simplicity (no search support)
    if (!selectField.searchable) {
      return (
        <NativeSelect
          {...commonProps}
          label={label}
          description={description}
          error={error}
          value={selectValue}
          onChange={(e) => onChange(e.target.value)}
        >
          {selectField.emptyLabel && <option value="">{selectField.emptyLabel}</option>}
          {selectField.options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </NativeSelect>
      );
    }

    // Use Designsystemet Select for searchable
    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-1)' }}>
        {label && (
          <Label htmlFor={id}>
            {label}
            {required && <span style={{ color: 'var(--ds-color-danger-text-default)' }}> *</span>}
          </Label>
        )}
        {description && !error && (
          <span
            style={{
              fontSize: 'var(--ds-font-size-sm)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {description}
          </span>
        )}
        <Select
          {...commonProps}
          data-size={dataSize}
          value={selectValue}
          onChange={(e) => onChange(e.target.value)}
        >
          {selectField.emptyLabel && <option value="">{selectField.emptyLabel}</option>}
          {selectField.options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </Select>
        {error && (
          <span
            style={{
              fontSize: 'var(--ds-font-size-sm)',
              color: 'var(--ds-color-danger-text-default)',
            }}
          >
            {error}
          </span>
        )}
      </div>
    );
  }

  // Multi-select (using Combobox)
  if (field.type === 'multiselect') {
    const multiselectField = field as MultiSelectFieldDefinition;
    const multiValue = Array.isArray(value) ? value : [];

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-1)' }}>
        {label && (
          <Label htmlFor={id}>
            {label}
            {required && <span style={{ color: 'var(--ds-color-danger-text-default)' }}> *</span>}
          </Label>
        )}
        {description && !error && (
          <span
            style={{
              fontSize: 'var(--ds-font-size-sm)',
              color: 'var(--ds-color-neutral-text-subtle)',
            }}
          >
            {description}
          </span>
        )}
        <Combobox
          {...commonProps}
          data-size={dataSize}
          multiple
          value={multiValue}
          onValueChange={(newValue) => onChange(newValue)}
        >
          {multiselectField.options.map((option) => (
            <Combobox.Option key={option.value} value={String(option.value)}>
              {option.label}
            </Combobox.Option>
          ))}
        </Combobox>
        {error && (
          <span
            style={{
              fontSize: 'var(--ds-font-size-sm)',
              color: 'var(--ds-color-danger-text-default)',
            }}
          >
            {error}
          </span>
        )}
      </div>
    );
  }

  // Checkbox
  if (field.type === 'checkbox') {
    const checkboxField = field as CheckboxFieldDefinition;
    const checkedValue = checkboxField.checkedValue ?? true;
    const uncheckedValue = checkboxField.uncheckedValue ?? false;
    const isChecked = value === checkedValue;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-1)' }}>
        <Checkbox
          {...commonProps}
          data-size={dataSize}
          aria-label={label}
          checked={isChecked}
          onChange={(e) => onChange(e.target.checked ? checkedValue : uncheckedValue)}
        >
          {label}
        </Checkbox>
        {description && !error && (
          <span
            style={{
              fontSize: 'var(--ds-font-size-sm)',
              color: 'var(--ds-color-neutral-text-subtle)',
              marginLeft: 'var(--ds-spacing-6)',
            }}
          >
            {description}
          </span>
        )}
        {error && (
          <span
            style={{
              fontSize: 'var(--ds-font-size-sm)',
              color: 'var(--ds-color-danger-text-default)',
              marginLeft: 'var(--ds-spacing-6)',
            }}
          >
            {error}
          </span>
        )}
      </div>
    );
  }

  // Radio group
  if (field.type === 'radio') {
    const radioField = field as RadioFieldDefinition;
    const radioValue = value != null ? String(value) : '';

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}>
        <Fieldset disabled={disabled} data-size={dataSize}>
          <legend
            style={{
              fontSize: 'var(--ds-font-size-md)',
              fontWeight: 'var(--ds-font-weight-medium)',
              marginBottom: 'var(--ds-spacing-2)',
            }}
          >
            {label}
            {required && <span style={{ color: 'var(--ds-color-danger-text-default)' }}> *</span>}
          </legend>
          {description && !error && (
            <span
              style={{
                fontSize: 'var(--ds-font-size-sm)',
                color: 'var(--ds-color-neutral-text-subtle)',
                display: 'block',
                marginBottom: 'var(--ds-spacing-2)',
              }}
            >
              {description}
            </span>
          )}
          {radioField.options.map((option) => (
            <Radio
              key={option.value}
              name={id}
              value={String(option.value)}
              aria-label={option.label}
              checked={radioValue === String(option.value)}
              onChange={(e) => onChange(e.target.value)}
              disabled={disabled || option.disabled}
              onBlur={() => onBlur()}
              onFocus={() => onFocus?.()}
            >
              {option.label}
            </Radio>
          ))}
        </Fieldset>
        {error && (
          <span
            style={{
              fontSize: 'var(--ds-font-size-sm)',
              color: 'var(--ds-color-danger-text-default)',
            }}
          >
            {error}
          </span>
        )}
      </div>
    );
  }

  // Switch
  if (field.type === 'switch') {
    const switchField = field as SwitchFieldDefinition;
    const onValue = switchField.onValue ?? true;
    const offValue = switchField.offValue ?? false;
    const isOn = value === onValue;

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-1)' }}>
        <Switch
          {...commonProps}
          data-size={dataSize}
          aria-label={label}
          checked={isOn}
          onChange={(e) => onChange(e.target.checked ? onValue : offValue)}
        >
          {label}
        </Switch>
        {description && !error && (
          <span
            style={{
              fontSize: 'var(--ds-font-size-sm)',
              color: 'var(--ds-color-neutral-text-subtle)',
              marginLeft: 'var(--ds-spacing-6)',
            }}
          >
            {description}
          </span>
        )}
        {error && (
          <span
            style={{
              fontSize: 'var(--ds-font-size-sm)',
              color: 'var(--ds-color-danger-text-default)',
              marginLeft: 'var(--ds-spacing-6)',
            }}
          >
            {error}
          </span>
        )}
      </div>
    );
  }

  // File input
  if (field.type === 'file') {
    const fileField = field as FileFieldDefinition;

    return (
      <Textfield
        {...commonProps}
        data-size={dataSize}
        type="file"
        label={label}
        description={description}
        error={error}
        onChange={(e) => {
          const files = e.target.files;
          onChange(fileField.multiple ? files : (files?.[0] ?? null));
        }}
        accept={fileField.accept}
        multiple={fileField.multiple}
      />
    );
  }

  // Custom field type
  if (field.type === 'custom') {
    const customField = field as CustomFieldDefinition;
    const CustomComponent = customFields?.[customField.component];

    if (!CustomComponent) {
      return (
        <div style={{ padding: 'var(--ds-spacing-2)', color: 'var(--ds-color-danger-text)' }}>
          <span style={{ fontSize: 'var(--ds-font-size-sm)' }}>
            Custom field component &quot;{customField.component}&quot; not found in registry
          </span>
        </div>
      );
    }

    return (
      <CustomComponent
        field={customField}
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        error={error}
        touched={touched}
        disabled={disabled}
        readOnly={readOnly}
      />
    );
  }

  // Fallback for unsupported field types
  return (
    <div style={{ padding: 'var(--ds-spacing-2)', color: 'var(--ds-color-danger-text)' }}>
      <span style={{ fontSize: 'var(--ds-font-size-sm)' }}>
        Unsupported field type: {field.type}
      </span>
    </div>
  );
}

export default FieldRenderer;
