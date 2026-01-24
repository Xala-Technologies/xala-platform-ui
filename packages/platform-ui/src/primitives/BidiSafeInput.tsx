/**
 * Bidirectional-safe input component for content that must remain LTR.
 *
 * In RTL layouts, certain content types (emails, URLs, phone numbers, code)
 * should always display left-to-right regardless of the document direction.
 * This component ensures proper display and editing of such content.
 *
 * @example
 * ```tsx
 * import { BidiSafeInput } from '@xala-technologies/platform-ui';
 *
 * function ContactForm() {
 *   return (
 *     <form>
 *       <BidiSafeInput type="email" label="Email" />
 *       <BidiSafeInput type="tel" label="Phone" />
 *       <BidiSafeInput type="url" label="Website" />
 *     </form>
 *   );
 * }
 * ```
 */
import * as React from 'react';
import { Textfield } from '@digdir/designsystemet-react';

/**
 * Input types that should always render as LTR.
 */
export type BidiSafeInputType = 'email' | 'url' | 'tel' | 'code';

/**
 * Props for the BidiSafeInput component.
 */
export interface BidiSafeInputProps {
  /**
   * The type of content being entered.
   * Determines the HTML input type and ensures LTR direction.
   * - 'email': Email addresses
   * - 'url': URLs and web addresses
   * - 'tel': Phone numbers
   * - 'code': Code snippets, identifiers, or technical content
   * @default 'email'
   */
  type?: BidiSafeInputType;
  /** Input label */
  label: string;
  /** Optional description text */
  description?: string;
  /** Error message */
  error?: string;
  /** Input value */
  value?: string;
  /** Default value for uncontrolled usage */
  defaultValue?: string;
  /** Change handler */
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  /** Placeholder text */
  placeholder?: string;
  /** Disabled state */
  disabled?: boolean;
  /** Read-only state */
  readOnly?: boolean;
  /** Required field */
  required?: boolean;
  /** Input name attribute */
  name?: string;
  /** Input id attribute */
  id?: string;
  /** Auto-complete attribute */
  autoComplete?: string;
  /** Additional CSS styles */
  style?: React.CSSProperties;
  /** Additional CSS class name */
  className?: string;
  /** Data attributes */
  'data-size'?: 'sm' | 'md' | 'lg';
}

/**
 * Input component that forces LTR direction for content like email, URLs, code, and phone numbers.
 *
 * Essential for RTL layouts where these values must remain left-to-right for proper
 * display and editing. The input content will always flow LTR while the label and
 * surrounding layout respect the document direction.
 *
 * @param props - Component props
 * @returns A Textfield with forced LTR direction
 *
 * @example Basic usage
 * ```tsx
 * <BidiSafeInput type="email" label="Email Address" />
 * ```
 *
 * @example With validation
 * ```tsx
 * <BidiSafeInput
 *   type="url"
 *   label="Website"
 *   error="Please enter a valid URL"
 * />
 * ```
 *
 * @example Code input
 * ```tsx
 * <BidiSafeInput
 *   type="code"
 *   label="API Key"
 *   placeholder="sk-..."
 * />
 * ```
 */
export function BidiSafeInput({
  type = 'email',
  label,
  description,
  error,
  value,
  defaultValue,
  onChange,
  placeholder,
  disabled,
  readOnly,
  required,
  name,
  id,
  autoComplete,
  style,
  className,
  'data-size': dataSize,
}: BidiSafeInputProps) {
  // Map our type to HTML input type
  const htmlType = type === 'code' ? 'text' : type;

  return (
    <Textfield
      label={label}
      description={description}
      error={error}
      value={value}
      defaultValue={defaultValue}
      onChange={onChange}
      placeholder={placeholder}
      disabled={disabled}
      readOnly={readOnly}
      required={required}
      name={name}
      id={id}
      autoComplete={autoComplete}
      className={className}
      data-size={dataSize}
      type={htmlType}
      style={{
        direction: 'ltr',
        textAlign: 'left',
        ...style,
      }}
    />
  );
}
