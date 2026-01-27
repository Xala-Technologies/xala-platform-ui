/* eslint-disable no-restricted-syntax */
/**
 * ModeSelector
 *
 * A domain-neutral component for selecting between multiple modes or options.
 * Supports tabs and segmented button variants.
 *
 * All text content is pre-localized - this component does not handle i18n internally.
 *
 * NOTE: This component uses raw <button> elements intentionally for custom styling
 * that cannot be achieved with the standard Designsystemet Button component.
 * The styling uses design tokens from xala-extensions.css (compact button tokens).
 *
 * @example
 * ```tsx
 * <ModeSelector
 *   options={[
 *     { id: 'single', label: 'Single', icon: <CalendarIcon /> },
 *     { id: 'recurring', label: 'Recurring', icon: <RepeatIcon /> },
 *     { id: 'series', label: 'Series', icon: <ListIcon /> },
 *   ]}
 *   value="single"
 *   onChange={(id) => setMode(id)}
 *   variant="tabs"
 * />
 * ```
 */
import * as React from 'react';
import type { ReactNode } from 'react';
import { Paragraph } from '../primitives';

// ============================================================================
// Types
// ============================================================================

/** Mode option configuration */
export interface ModeOption {
  /** Unique identifier */
  id: string;
  /** Display label (pre-localized) */
  label: string;
  /** Optional description (pre-localized) */
  description?: string;
  /** Optional icon */
  icon?: ReactNode;
  /** Whether this option is disabled */
  disabled?: boolean;
}

/** ModeSelector props interface */
export interface ModeSelectorProps {
  /** Array of available options */
  options: ModeOption[];

  /** Currently selected option id */
  value: string;

  /** Callback when selection changes */
  onChange: (id: string) => void;

  /** Visual variant */
  variant?: 'tabs' | 'buttons' | 'cards' | 'icons';

  /** Size variant */
  size?: 'sm' | 'md' | 'lg';

  /** Layout direction (for cards variant) */
  direction?: 'horizontal' | 'vertical';

  /** Whether the selector spans full width */
  fullWidth?: boolean;

  /** Optional label above the selector (pre-localized) */
  label?: string;

  /** Custom class name */
  className?: string;

  /** Test ID for testing */
  'data-testid'?: string;
}

// ============================================================================
// Utility Functions
// ============================================================================

/** Concatenate class names, filtering out falsy values */
function cn(...classes: (string | undefined | null | false)[]): string {
  return classes.filter(Boolean).join(' ');
}

/** Get size-specific styles */
function getSizeStyles(size: 'sm' | 'md' | 'lg') {
  const sizes = {
    sm: {
      padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
      fontSize: 'var(--ds-font-size-sm)',
      iconSize: 14,
      gap: 'var(--ds-spacing-1)',
    },
    md: {
      padding: 'var(--ds-spacing-3) var(--ds-spacing-4)',
      fontSize: 'var(--ds-font-size-md)',
      iconSize: 16,
      gap: 'var(--ds-spacing-2)',
    },
    lg: {
      padding: 'var(--ds-spacing-4) var(--ds-spacing-5)',
      fontSize: 'var(--ds-font-size-lg)',
      iconSize: 20,
      gap: 'var(--ds-spacing-3)',
    },
  };
  return sizes[size];
}

// ============================================================================
// Sub-components
// ============================================================================

/** Tabs variant */
interface TabsVariantProps {
  options: ModeOption[];
  value: string;
  onChange: (id: string) => void;
  size: 'sm' | 'md' | 'lg';
  fullWidth: boolean;
}

function TabsVariant({ options, value, onChange, size, fullWidth }: TabsVariantProps) {
  const sizeStyles = getSizeStyles(size);

  return (
    <div
      role="tablist"
      style={{
        display: 'flex',
        gap: 'var(--ds-spacing-1)',
        padding: 'var(--ds-spacing-1)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderRadius: 'var(--ds-border-radius-lg)',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
        width: fullWidth ? '100%' : 'fit-content',
      }}
    >
      {options.map((option) => {
        const isSelected = option.id === value;
        return (
          <button
            key={option.id}
            role="tab"
            type="button"
            aria-selected={isSelected}
            aria-disabled={option.disabled}
            disabled={option.disabled}
            onClick={() => !option.disabled && onChange(option.id)}
            style={{
              flex: fullWidth ? 1 : undefined,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: sizeStyles.gap,
              padding: sizeStyles.padding,
              fontSize: sizeStyles.fontSize,
              fontWeight: isSelected ? 600 : 500,
              backgroundColor: isSelected
                ? 'var(--ds-color-neutral-background-default)'
                : 'transparent',
              color: option.disabled
                ? 'var(--ds-color-neutral-text-subtle)'
                : isSelected
                  ? 'var(--ds-color-neutral-text-default)'
                  : 'var(--ds-color-neutral-text-subtle)',
              border: 'none',
              borderRadius: 'var(--ds-border-radius-md)',
              cursor: option.disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isSelected ? 'var(--ds-shadow-sm)' : 'none',
              opacity: option.disabled ? 0.5 : 1,
            }}
          >
            {option.icon && (
              <span style={{ display: 'flex', alignItems: 'center' }}>{option.icon}</span>
            )}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/** Buttons variant */
interface ButtonsVariantProps {
  options: ModeOption[];
  value: string;
  onChange: (id: string) => void;
  size: 'sm' | 'md' | 'lg';
  fullWidth: boolean;
}

function ButtonsVariant({ options, value, onChange, size, fullWidth }: ButtonsVariantProps) {
  const sizeStyles = getSizeStyles(size);

  return (
    <div
      role="group"
      style={{
        display: 'flex',
        gap: 'var(--ds-spacing-2)',
        width: fullWidth ? '100%' : 'fit-content',
        flexWrap: 'wrap',
      }}
    >
      {options.map((option) => {
        const isSelected = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={isSelected}
            aria-disabled={option.disabled}
            disabled={option.disabled}
            onClick={() => !option.disabled && onChange(option.id)}
            style={{
              flex: fullWidth ? 1 : undefined,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: sizeStyles.gap,
              padding: sizeStyles.padding,
              fontSize: sizeStyles.fontSize,
              fontWeight: isSelected ? 600 : 500,
              backgroundColor: isSelected
                ? 'var(--ds-color-accent-surface-default)'
                : 'var(--ds-color-neutral-background-default)',
              color: isSelected
                ? 'var(--ds-color-accent-text-default)'
                : 'var(--ds-color-neutral-text-default)',
              border: isSelected
                ? '2px solid var(--ds-color-accent-border-default)'
                : '1px solid var(--ds-color-neutral-border-default)',
              borderRadius: 'var(--ds-border-radius-md)',
              cursor: option.disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: option.disabled ? 0.5 : 1,
            }}
          >
            {option.icon && (
              <span style={{ display: 'flex', alignItems: 'center' }}>{option.icon}</span>
            )}
            <span>{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

/** Cards variant */
interface CardsVariantProps {
  options: ModeOption[];
  value: string;
  onChange: (id: string) => void;
  size: 'sm' | 'md' | 'lg';
  direction: 'horizontal' | 'vertical';
  fullWidth: boolean;
}

function CardsVariant({ options, value, onChange, size, direction, fullWidth }: CardsVariantProps) {
  const sizeStyles = getSizeStyles(size);

  return (
    <div
      role="group"
      style={{
        display: 'flex',
        flexDirection: direction === 'vertical' ? 'column' : 'row',
        gap: 'var(--ds-spacing-3)',
        width: fullWidth ? '100%' : 'fit-content',
        flexWrap: direction === 'horizontal' ? 'wrap' : undefined,
      }}
    >
      {options.map((option) => {
        const isSelected = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            aria-pressed={isSelected}
            aria-disabled={option.disabled}
            disabled={option.disabled}
            onClick={() => !option.disabled && onChange(option.id)}
            style={{
              flex: fullWidth && direction === 'horizontal' ? 1 : undefined,
              display: 'flex',
              flexDirection: 'column',
              alignItems: direction === 'vertical' ? 'flex-start' : 'center',
              gap: 'var(--ds-spacing-2)',
              padding: 'var(--ds-spacing-4)',
              backgroundColor: isSelected
                ? 'var(--ds-color-accent-surface-default)'
                : 'var(--ds-color-neutral-background-default)',
              border: isSelected
                ? '2px solid var(--ds-color-accent-border-default)'
                : '1px solid var(--ds-color-neutral-border-subtle)',
              borderRadius: 'var(--ds-border-radius-lg)',
              cursor: option.disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              opacity: option.disabled ? 0.5 : 1,
              textAlign: direction === 'vertical' ? 'left' : 'center',
              minWidth: direction === 'horizontal' ? '120px' : undefined,
            }}
          >
            {option.icon && (
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '40px',
                  height: '40px',
                  backgroundColor: isSelected
                    ? 'var(--ds-color-accent-base-default)'
                    : 'var(--ds-color-neutral-surface-default)',
                  color: isSelected
                    ? 'var(--ds-color-neutral-background-default)'
                    : 'var(--ds-color-neutral-text-default)',
                  borderRadius: 'var(--ds-border-radius-md)',
                }}
              >
                {option.icon}
              </div>
            )}
            <div>
              <span
                style={{
                  display: 'block',
                  fontSize: sizeStyles.fontSize,
                  fontWeight: 600,
                  color: isSelected
                    ? 'var(--ds-color-accent-text-default)'
                    : 'var(--ds-color-neutral-text-default)',
                }}
              >
                {option.label}
              </span>
              {option.description && (
                <span
                  style={{
                    display: 'block',
                    marginTop: 'var(--ds-spacing-1)',
                    fontSize: 'var(--ds-font-size-sm)',
                    color: 'var(--ds-color-neutral-text-subtle)',
                  }}
                >
                  {option.description}
                </span>
              )}
            </div>
          </button>
        );
      })}
    </div>
  );
}

/** Icons variant - icon-only display */
interface IconsVariantProps {
  options: ModeOption[];
  value: string;
  onChange: (id: string) => void;
  size: 'sm' | 'md' | 'lg';
  fullWidth: boolean;
}

function IconsVariant({ options, value, onChange, size, fullWidth }: IconsVariantProps) {
  const sizeStyles = getSizeStyles(size);

  const iconSizes = {
    sm: 18,
    md: 22,
    lg: 28,
  };
  const iconSize = iconSizes[size];

  return (
    <div
      role="group"
      style={{
        display: 'flex',
        gap: 'var(--ds-spacing-1)',
        padding: 'var(--ds-spacing-1)',
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderRadius: 'var(--ds-border-radius-lg)',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
        width: fullWidth ? '100%' : 'fit-content',
      }}
    >
      {options.map((option) => {
        const isSelected = option.id === value;
        return (
          <button
            key={option.id}
            type="button"
            aria-label={option.label}
            title={option.label}
            aria-pressed={isSelected}
            aria-disabled={option.disabled}
            disabled={option.disabled}
            onClick={() => !option.disabled && onChange(option.id)}
            style={{
              flex: fullWidth ? 1 : undefined,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: sizeStyles.padding,
              backgroundColor: isSelected
                ? 'var(--ds-color-neutral-background-default)'
                : 'transparent',
              color: option.disabled
                ? 'var(--ds-color-neutral-text-subtle)'
                : isSelected
                  ? 'var(--ds-color-accent-base-default)'
                  : 'var(--ds-color-neutral-text-subtle)',
              border: 'none',
              borderRadius: 'var(--ds-border-radius-md)',
              cursor: option.disabled ? 'not-allowed' : 'pointer',
              transition: 'all 0.2s ease',
              boxShadow: isSelected ? 'var(--ds-shadow-sm)' : 'none',
              opacity: option.disabled ? 0.5 : 1,
              minWidth: iconSize + 16,
              minHeight: iconSize + 16,
            }}
          >
            {option.icon && (
              <span
                style={{ display: 'flex', alignItems: 'center', width: iconSize, height: iconSize }}
              >
                {option.icon}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

// ============================================================================
// Main Component
// ============================================================================

export function ModeSelector({
  options,
  value,
  onChange,
  variant = 'tabs',
  size = 'md',
  direction = 'horizontal',
  fullWidth = false,
  label,
  className,
  'data-testid': testId = 'mode-selector',
}: ModeSelectorProps): React.ReactElement {
  return (
    <div className={cn('mode-selector', className)} data-testid={testId}>
      {label && (
        <Paragraph
          data-size="sm"
          style={{
            margin: 0,
            marginBottom: 'var(--ds-spacing-2)',
            fontWeight: 500,
            color: 'var(--ds-color-neutral-text-default)',
          }}
        >
          {label}
        </Paragraph>
      )}

      {variant === 'tabs' && (
        <TabsVariant
          options={options}
          value={value}
          onChange={onChange}
          size={size}
          fullWidth={fullWidth}
        />
      )}

      {variant === 'buttons' && (
        <ButtonsVariant
          options={options}
          value={value}
          onChange={onChange}
          size={size}
          fullWidth={fullWidth}
        />
      )}

      {variant === 'cards' && (
        <CardsVariant
          options={options}
          value={value}
          onChange={onChange}
          size={size}
          direction={direction}
          fullWidth={fullWidth}
        />
      )}

      {variant === 'icons' && (
        <IconsVariant
          options={options}
          value={value}
          onChange={onChange}
          size={size}
          fullWidth={fullWidth}
        />
      )}
    </div>
  );
}

export default ModeSelector;
