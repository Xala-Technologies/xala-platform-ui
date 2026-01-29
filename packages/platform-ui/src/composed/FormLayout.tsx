/**
 * FormLayout Components
 *
 * Form sections, actions, and layout helpers with responsive support.
 * SSR-safe with 'use client' directive.
 *
 * @example
 * ```tsx
 * // Responsive columns - 1 on mobile, 2 on md, 3 on lg
 * <FormRow columns={{ base: 1, md: 2, lg: 3 }}>
 *   <Field /><Field /><Field />
 * </FormRow>
 *
 * // Responsive gap
 * <FormRow gap={{ base: 'sm', md: 'md' }}>
 *   <Field /><Field />
 * </FormRow>
 *
 * // Form actions with mobile stacking
 * <FormActions stackOn="md">
 *   <Button>Cancel</Button>
 *   <Button>Save</Button>
 * </FormActions>
 * ```
 *
 * @module @xala-technologies/platform/ui/composed/FormLayout
 */

/* eslint-disable no-restricted-syntax -- Raw HTML elements (section, div, span, label, svg) required for form layout, grid structure, and semantic sections with design tokens */

'use client';

import React, { type ReactNode, useMemo } from 'react';
import { Heading, Paragraph } from '@digdir/designsystemet-react';
import { cn } from '../utils';
import {
  type GapSize,
  type ResponsiveGap,
  type ColCount,
  type ResponsiveCols,
  type Breakpoint,
  isResponsive,
  gapTokenMap,
} from '../primitives/responsive-types';

// =============================================================================
// Types
// =============================================================================

export interface FormSectionProps {
  title?: string;
  description?: string;
  children: ReactNode;
  collapsible?: boolean;
  defaultCollapsed?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface FormActionsProps {
  children: ReactNode;
  align?: 'left' | 'center' | 'right' | 'between';
  sticky?: boolean;
  /**
   * Stack buttons vertically on mobile. Specifies breakpoint where horizontal layout begins.
   * - 'sm': Stack until 640px, row at 640px+
   * - 'md': Stack until 768px, row at 768px+
   * - 'lg': Stack until 1024px, row at 1024px+
   */
  stackOn?: 'sm' | 'md' | 'lg';
  className?: string;
  style?: React.CSSProperties;
}

export interface FormRowProps {
  children: ReactNode;
  /**
   * Number of columns. Can be a simple value or responsive object.
   *
   * @example columns={2}
   * @example columns={{ base: 1, md: 2, lg: 3 }}
   * @default 1
   */
  columns?: ColCount | ResponsiveCols;
  /**
   * Gap between items. Can be a token name or responsive object.
   *
   * @example gap="md"
   * @example gap={{ base: 'sm', md: 'md' }}
   * @default 'md'
   */
  gap?: GapSize | ResponsiveGap;
  className?: string;
  style?: React.CSSProperties;
}

export interface FormFieldProps {
  label: string;
  htmlFor?: string;
  required?: boolean;
  error?: string;
  helperText?: string;
  children: ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export interface FormDividerProps {
  label?: string;
  className?: string;
  style?: React.CSSProperties;
}

// =============================================================================
// Icons
// =============================================================================

function ChevronDownIcon(): React.ReactElement {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

// =============================================================================
// Helpers
// =============================================================================

/**
 * Check if a gap value is a token size
 */
function isGapToken(value: unknown): value is GapSize {
  return typeof value === 'string' && value in gapTokenMap;
}

/**
 * Get CSS class for column count at breakpoint
 */
function getColClass(breakpoint: Breakpoint, cols: ColCount): string {
  if (breakpoint === 'base') {
    return `ds-grid-cols-${cols}`;
  }
  return `ds-grid-cols-${breakpoint}-${cols}`;
}

/**
 * Get CSS class for gap at breakpoint
 */
function getGapClass(breakpoint: Breakpoint, size: GapSize): string {
  if (breakpoint === 'base') {
    return `ds-grid-gap-${size}`;
  }
  return `ds-gap-${breakpoint}-${size}`;
}

// =============================================================================
// FormSection Component
// =============================================================================

export function FormSection({
  title,
  description,
  children,
  collapsible = false,
  defaultCollapsed = false,
  className,
  style,
}: FormSectionProps): React.ReactElement {
  const [isCollapsed, setIsCollapsed] = React.useState(defaultCollapsed);

  return (
    <section
      className={className}
      style={{
        padding: 'var(--ds-spacing-5)',
        backgroundColor: 'var(--ds-color-neutral-background-default)',
        borderWidth: 'var(--ds-border-width-default)',
        borderStyle: 'solid',
        borderColor: 'var(--ds-color-neutral-border-subtle)',
        borderRadius: 'var(--ds-border-radius-lg)',
        ...style,
      }}
    >
      {(title || description) && (
        <div
          onClick={collapsible ? () => setIsCollapsed(!isCollapsed) : undefined}
          style={{
            display: 'flex',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
            marginBottom: isCollapsed ? 0 : 'var(--ds-spacing-5)',
            cursor: collapsible ? 'pointer' : 'default',
          }}
        >
          <div>
            {title && (
              <Heading
                level={3}
                data-size="md"
                style={{
                  margin: 0,
                  fontSize: 'var(--ds-font-size-lg)',
                  fontWeight: 'var(--ds-font-weight-semibold)',
                  color: 'var(--ds-color-neutral-text-default)',
                }}
              >
                {title}
              </Heading>
            )}
            {description && (
              <Paragraph
                data-size="sm"
                style={{
                  margin: 'var(--ds-spacing-1) 0 0 0',
                  fontSize: 'var(--ds-font-size-sm)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {description}
              </Paragraph>
            )}
          </div>
          {collapsible && (
            <div
              style={{
                color: 'var(--ds-color-neutral-text-subtle)',
                transform: isCollapsed ? 'rotate(-90deg)' : 'rotate(0)',
                transition: 'transform 0.2s ease',
              }}
            >
              <ChevronDownIcon />
            </div>
          )}
        </div>
      )}
      {!isCollapsed && <div>{children}</div>}
    </section>
  );
}

// =============================================================================
// FormActions Component
// =============================================================================

export function FormActions({
  children,
  align = 'right',
  sticky = false,
  stackOn,
  className,
  style,
}: FormActionsProps): React.ReactElement {
  const alignStyles: Record<string, React.CSSProperties> = {
    left: { justifyContent: 'flex-start' },
    center: { justifyContent: 'center' },
    right: { justifyContent: 'flex-end' },
    between: { justifyContent: 'space-between' },
  };

  // Build class name with stacking support
  const actionsClassName = cn(
    'ds-form-actions',
    stackOn && `ds-horizontal-layout--stack-${stackOn}`,
    className
  );

  return (
    <div
      className={actionsClassName}
      style={{
        display: 'flex',
        flexDirection: stackOn ? undefined : 'row', // Let CSS handle direction when stacking
        alignItems: 'center',
        gap: 'var(--ds-spacing-3)',
        padding: 'var(--ds-spacing-4) 0',
        borderTopWidth: 'var(--ds-border-width-default)',
        borderTopStyle: 'solid',
        borderTopColor: 'var(--ds-color-neutral-border-subtle)',
        marginTop: 'var(--ds-spacing-4)',
        ...(sticky && {
          position: 'sticky',
          bottom: 0,
          backgroundColor: 'var(--ds-color-neutral-background-default)',
          padding: 'var(--ds-spacing-4)',
          margin: 'var(--ds-spacing-4) calc(-1 * var(--ds-spacing-4)) 0',
          boxShadow: 'var(--ds-shadow-sm)',
        }),
        ...(!stackOn && alignStyles[align]),
        ...style,
      }}
    >
      {children}
    </div>
  );
}

// =============================================================================
// FormRow Component
// =============================================================================

export function FormRow({
  children,
  columns = 1,
  gap = 'md',
  className,
  style,
}: FormRowProps): React.ReactElement {
  // Build responsive column classes
  const colClasses = useMemo(() => {
    // Simple number - fixed columns
    if (typeof columns === 'number') {
      return [`ds-grid-cols-${columns}`];
    }

    // Responsive object
    const classes: string[] = [];
    const breakpoints: Breakpoint[] = ['base', 'sm', 'md', 'lg', 'xl'];

    for (const bp of breakpoints) {
      const bpCols = columns[bp];
      if (bpCols) {
        classes.push(getColClass(bp, bpCols));
      }
    }

    return classes;
  }, [columns]);

  // Build responsive gap classes
  const gapClasses = useMemo(() => {
    // Responsive gap object - use CSS classes
    if (isResponsive(gap)) {
      const classes: string[] = [];
      const breakpoints: Breakpoint[] = ['base', 'sm', 'md', 'lg', 'xl'];

      for (const bp of breakpoints) {
        const bpGap = gap[bp];
        if (bpGap) {
          classes.push(getGapClass(bp, bpGap));
        }
      }

      return classes;
    }

    // Token gap - use CSS class
    if (isGapToken(gap)) {
      return [`ds-grid-gap-${gap}`];
    }

    return [];
  }, [gap]);

  // Determine if we should use inline styles for gap
  const useInlineGap = !isResponsive(gap) && !isGapToken(gap);

  // Build style object
  const rowStyle = useMemo<React.CSSProperties>(
    () => ({
      display: 'grid',
      // Don't set gridTemplateColumns inline if using responsive classes
      gridTemplateColumns: typeof columns === 'number' ? `repeat(${columns}, 1fr)` : undefined,
      gap: useInlineGap ? (typeof gap === 'string' ? gap : undefined) : undefined,
      ...style,
    }),
    [columns, useInlineGap, gap, style]
  );

  // Build class name
  const rowClassName = cn(
    'ds-grid',
    'ds-form-row',
    colClasses.join(' '),
    gapClasses.join(' '),
    className
  );

  return (
    <div className={rowClassName} style={rowStyle}>
      {children}
    </div>
  );
}

// =============================================================================
// FormField Component
// =============================================================================

export function FormField({
  label,
  htmlFor,
  required = false,
  error,
  helperText,
  children,
  className,
  style,
}: FormFieldProps): React.ReactElement {
  return (
    <div className={className} style={{ marginBottom: 'var(--ds-spacing-4)', ...style }}>
      <label
        htmlFor={htmlFor}
        style={{
          display: 'block',
          marginBottom: 'var(--ds-spacing-2)',
          fontSize: 'var(--ds-font-size-sm)',
          fontWeight: 'var(--ds-font-weight-medium)',
          color: 'var(--ds-color-neutral-text-default)',
        }}
      >
        {label}
        {required && (
          <span
            style={{
              color: 'var(--ds-color-danger-text-default)',
              marginLeft: 'var(--ds-spacing-1)',
            }}
          >
            *
          </span>
        )}
      </label>
      {children}
      {(error || helperText) && (
        <Paragraph
          data-size="sm"
          style={{
            margin: 'var(--ds-spacing-1) 0 0 0',
            fontSize: 'var(--ds-font-size-sm)',
            color: error
              ? 'var(--ds-color-danger-text-default)'
              : 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {error || helperText}
        </Paragraph>
      )}
    </div>
  );
}

// =============================================================================
// FormDivider Component
// =============================================================================

export function FormDivider({ label, className, style }: FormDividerProps): React.ReactElement {
  return (
    <div
      className={className}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 'var(--ds-spacing-3)',
        margin: 'var(--ds-spacing-6) 0',
        ...style,
      }}
    >
      <div
        style={{
          flex: 1,
          height: 'var(--ds-border-width-default)',
          backgroundColor: 'var(--ds-color-neutral-border-subtle)',
        }}
      />
      {label && (
        <>
          <span
            style={{
              fontSize: 'var(--ds-font-size-sm)',
              fontWeight: 'var(--ds-font-weight-medium)',
              color: 'var(--ds-color-neutral-text-subtle)',
              textTransform: 'uppercase',
              letterSpacing: '0.05em',
            }}
          >
            {label}
          </span>
          <div
            style={{
              flex: 1,
              height: 'var(--ds-border-width-default)',
              backgroundColor: 'var(--ds-color-neutral-border-subtle)',
            }}
          />
        </>
      )}
    </div>
  );
}

export default { FormSection, FormActions, FormRow, FormField, FormDivider };
