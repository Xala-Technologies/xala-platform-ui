/**
 * SearchableSelect / Combobox Component
 *
 * Searchable dropdown with filtering, async loading, and multi-select.
 * SSR-safe with 'use client' directive.
 *
 * @module @xala-technologies/platform/ui/composed/SearchableSelect
 */

/* eslint-disable no-restricted-syntax -- Raw HTML elements (div, span, ul, li, input) required for searchable dropdown with options list with design tokens */

'use client';

import React, { useState, useCallback, useRef, useEffect, useMemo, useId } from 'react';
import { Button, Paragraph } from '@digdir/designsystemet-react';

// =============================================================================
// Types
// =============================================================================

/**
 * Base type for option values. Can be extended to support custom value types.
 */
export type SelectOptionValue = string | number | boolean;

/**
 * Context object passed to custom renderOption function.
 */
export interface RenderOptionContext {
  /** Whether this option is currently selected */
  isSelected: boolean;
  /** Whether this option currently has keyboard focus */
  isFocused: boolean;
  /** Zero-based index of this option in the filtered list */
  index: number;
}

/**
 * Individual option in the select dropdown.
 *
 * @template TValue - Type of the option value (defaults to string)
 */
export interface SelectOption<TValue extends SelectOptionValue = string> {
  /** Unique value for this option */
  value: TValue;
  /** Display text for this option */
  label: string;
  /** Optional secondary text shown below the label */
  description?: string;
  /** Optional icon/image to display before the label */
  icon?: React.ReactNode;
  /** Whether this option cannot be selected */
  disabled?: boolean;
  /** Optional group name for organizing options */
  group?: string;
}

/**
 * Props for SearchableSelect component.
 *
 * @template TValue - Type of the option values (defaults to string)
 *
 * @remarks
 * When `multiple` is true, `value` should be an array and `onChange` will receive an array.
 * When `multiple` is false or undefined, `value` should be a single value and `onChange` will receive a single value.
 */
export interface SearchableSelectProps<TValue extends SelectOptionValue = string> {
  /** Available options to select from */
  options: SelectOption<TValue>[];
  /**
   * Current selected value(s).
   * - Single select: TValue
   * - Multi select: TValue[]
   */
  value?: TValue | TValue[];
  /**
   * Callback when selection changes.
   * - Single select: receives single TValue
   * - Multi select: receives TValue[]
   */
  onChange?: (value: TValue | TValue[]) => void;
  /** Callback when search query changes (useful for async filtering) */
  onSearch?: (query: string) => void;
  /** Placeholder text when no value is selected */
  placeholder?: string;
  /** Placeholder text for the search input */
  searchPlaceholder?: string;
  /** Label text displayed above the select */
  label?: string;
  /** Error message to display (also applies error styling) */
  error?: string;
  /** Helper text displayed below the select */
  helperText?: string;
  /** Whether the select is disabled */
  disabled?: boolean;
  /** Whether to show loading spinner (useful for async loading) */
  loading?: boolean;
  /** Enable multi-select mode with chip display */
  multiple?: boolean;
  /** Show clear button when value is selected */
  clearable?: boolean;
  /** Allow creating new options by typing */
  creatable?: boolean;
  /** Callback when creating a new option (required when creatable is true) */
  onCreate?: (value: string) => void;
  /** Message to show when no options match the search */
  emptyMessage?: string;
  /** Additional CSS class name */
  className?: string;
  /** Additional inline styles */
  style?: React.CSSProperties;
  /**
   * Custom render function for options.
   * Allows full control over option appearance.
   *
   * @param option - The option being rendered
   * @param context - Additional context (selected state, focus state, index)
   * @returns React node to render for this option
   */
  renderOption?: (option: SelectOption<TValue>, context: RenderOptionContext) => React.ReactNode;
}

// =============================================================================
// Icons
// =============================================================================

function ChevronDownIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <polyline points="6 9 12 15 18 9" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="8" />
      <line x1="21" y1="21" x2="16.65" y2="16.65" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function SpinnerIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      style={{ animation: 'spin 1s linear infinite' }}
      aria-hidden="true"
    >
      <path d="M21 12a9 9 0 1 1-6.219-8.56" />
    </svg>
  );
}

// =============================================================================
// SearchableSelect Component
// =============================================================================

/**
 * SearchableSelect - Advanced select/combobox with search, multi-select, and async loading.
 *
 * @template TValue - Type of the option values (defaults to string)
 *
 * @example
 * ```tsx
 * // Basic usage
 * <SearchableSelect
 *   options={[
 *     { value: '1', label: 'Option 1' },
 *     { value: '2', label: 'Option 2' }
 *   ]}
 *   value={selectedValue}
 *   onChange={setSelectedValue}
 * />
 *
 * // Multi-select
 * <SearchableSelect
 *   multiple
 *   options={options}
 *   value={selectedValues}
 *   onChange={setSelectedValues}
 * />
 *
 * // With custom rendering
 * <SearchableSelect
 *   options={options}
 *   renderOption={(option, { isSelected }) => (
 *     <div>{isSelected ? '✓ ' : ''}{option.label}</div>
 *   )}
 * />
 * ```
 */
export function SearchableSelect<TValue extends SelectOptionValue = string>({
  options,
  value,
  onChange,
  onSearch,
  placeholder = 'Select...',
  searchPlaceholder = 'Search...',
  label,
  error,
  helperText,
  disabled = false,
  loading = false,
  multiple = false,
  clearable = true,
  creatable = false,
  onCreate,
  emptyMessage = 'No options found',
  className,
  style,
  renderOption,
}: SearchableSelectProps<TValue>): React.ReactElement {
  const [isOpen, setIsOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [focusedIndex, setFocusedIndex] = useState(-1);
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  // Generate unique IDs for ARIA relationships
  const comboboxId = useId();
  const listboxId = useId();
  const labelId = useId();
  const searchInputId = useId();
  const helperTextId = useId();

  const selectedValues = useMemo((): TValue[] => {
    if (!value) return [];
    return Array.isArray(value) ? value : [value];
  }, [value]);

  const filteredOptions = useMemo(() => {
    if (!search) return options;
    const query = search.toLowerCase();
    return options.filter(
      (opt) =>
        opt.label.toLowerCase().includes(query) || opt.description?.toLowerCase().includes(query)
    );
  }, [options, search]);

  const groupedOptions = useMemo(() => {
    const groups: Record<string, SelectOption<TValue>[]> = {};
    const ungrouped: SelectOption<TValue>[] = [];
    filteredOptions.forEach((opt) => {
      if (opt.group) {
        const groupArray = groups[opt.group];
        if (!groupArray) {
          groups[opt.group] = [opt];
        } else {
          groupArray.push(opt);
        }
      } else {
        ungrouped.push(opt);
      }
    });
    return { groups, ungrouped };
  }, [filteredOptions]);

  // Suppress ResizeObserver errors (GitHub #314)
  useEffect(() => {
    const errorHandler = (event: ErrorEvent) => {
      if (
        event.message.includes('ResizeObserver') ||
        event.message.includes('ResizeObserver loop')
      ) {
        event.stopImmediatePropagation();
        event.preventDefault();
      }
    };

    window.addEventListener('error', errorHandler);
    return () => window.removeEventListener('error', errorHandler);
  }, []);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsOpen(false);
        setSearch('');
      }
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
      // Reset focused index when opening
      setFocusedIndex(-1);
    }
  }, [isOpen]);

  // Reset focused index when filtered options change significantly
  useEffect(() => {
    if (focusedIndex >= filteredOptions.length) {
      setFocusedIndex(filteredOptions.length > 0 ? filteredOptions.length - 1 : -1);
    }
  }, [filteredOptions.length, focusedIndex]);

  useEffect(() => {
    onSearch?.(search);
  }, [search, onSearch]);

  // Scroll focused option into view
  useEffect(() => {
    if (isOpen && focusedIndex >= 0 && listRef.current) {
      const focusedElement = listRef.current.querySelector(
        `#${listboxId}-option-${focusedIndex}`
      ) as HTMLElement;
      if (focusedElement) {
        focusedElement.scrollIntoView({
          block: 'nearest',
          behavior: 'smooth',
        });
      }
    }
  }, [focusedIndex, isOpen, listboxId]);

  const handleSelect = useCallback(
    (optionValue: TValue) => {
      if (multiple) {
        const newValues = selectedValues.includes(optionValue)
          ? selectedValues.filter((v) => v !== optionValue)
          : [...selectedValues, optionValue];
        onChange?.(newValues);
      } else {
        onChange?.(optionValue);
        setIsOpen(false);
        setSearch('');
      }
    },
    [multiple, selectedValues, onChange]
  );

  const handleClear = useCallback(
    (e: React.MouseEvent) => {
      e.stopPropagation();
      onChange?.(multiple ? ([] as TValue[]) : ('' as TValue));
    },
    [multiple, onChange]
  );

  const handleRemoveTag = useCallback(
    (e: React.MouseEvent, val: TValue) => {
      e.stopPropagation();
      if (multiple) {
        onChange?.(selectedValues.filter((v) => v !== val));
      }
    },
    [multiple, selectedValues, onChange]
  );

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === 'Enter' || e.key === ' ' || e.key === 'ArrowDown') {
          e.preventDefault();
          setIsOpen(true);
        }
        return;
      }

      const pageSize = 10;

      switch (e.key) {
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setSearch('');
          setFocusedIndex(-1);
          break;
        case 'Tab':
          // Allow Tab to close dropdown and move focus naturally
          setIsOpen(false);
          setSearch('');
          setFocusedIndex(-1);
          break;
        case 'ArrowDown':
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev < 0 ? 0 : Math.min(prev + 1, filteredOptions.length - 1);
            return next;
          });
          break;
        case 'ArrowUp':
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev < 0 ? filteredOptions.length - 1 : Math.max(prev - 1, 0);
            return next;
          });
          break;
        case 'Home':
          e.preventDefault();
          setFocusedIndex(0);
          break;
        case 'End':
          e.preventDefault();
          setFocusedIndex(filteredOptions.length - 1);
          break;
        case 'PageUp':
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next = prev < 0 ? 0 : Math.max(prev - pageSize, 0);
            return next;
          });
          break;
        case 'PageDown':
          e.preventDefault();
          setFocusedIndex((prev) => {
            const next =
              prev < 0 ? pageSize - 1 : Math.min(prev + pageSize, filteredOptions.length - 1);
            return next;
          });
          break;
        case 'Enter':
          e.preventDefault();
          const focusedOption = filteredOptions[focusedIndex];
          if (focusedIndex >= 0 && focusedOption) {
            handleSelect(focusedOption.value);
            if (!multiple) {
              setFocusedIndex(-1);
            }
          } else if (creatable && search && !filteredOptions.find((o) => o.label === search)) {
            onCreate?.(search);
            setSearch('');
          }
          break;
        case ' ':
          // Only handle Space for option selection if focus is on an option, not in search input
          if (e.target !== inputRef.current && focusedIndex >= 0) {
            e.preventDefault();
            const focusedOption = filteredOptions[focusedIndex];
            if (focusedOption) {
              handleSelect(focusedOption.value);
            }
          }
          break;
      }
    },
    [isOpen, focusedIndex, filteredOptions, handleSelect, creatable, search, onCreate, multiple]
  );

  const getDisplayValue = () => {
    if (selectedValues.length === 0) return null;
    if (multiple) {
      return selectedValues.map((v) => {
        const opt = options.find((o) => o.value === v);
        const optLabel = opt?.label || String(v);
        return (
          <span
            key={String(v)}
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: 'var(--ds-spacing-1)',
              padding: 'var(--ds-spacing-1) var(--ds-spacing-2)',
              fontSize: 'var(--ds-font-size-xs)',
              backgroundColor: 'var(--ds-color-accent-surface-subtle)',
              color: 'var(--ds-color-accent-text-default)',
              borderRadius: 'var(--ds-border-radius-sm)',
            }}
          >
            {optLabel}
            <Button
              type="button"
              onClick={(e) => handleRemoveTag(e, v)}
              data-color="neutral"
              aria-label={`Remove ${optLabel}`}
              style={{
                display: 'flex',
                padding: 0,
                backgroundColor: 'transparent',
                borderWidth: '0',
                cursor: 'pointer',
                color: 'inherit',
              }}
            >
              <XIcon />
            </Button>
          </span>
        );
      });
    }
    const opt = options.find((o) => o.value === selectedValues[0]);
    return opt?.label || selectedValues[0];
  };

  const showCreateOption =
    creatable &&
    search &&
    !filteredOptions.find((o) => o.label.toLowerCase() === search.toLowerCase());

  const renderOptionContent = useCallback(
    (opt: SelectOption<TValue>, context: RenderOptionContext): React.ReactNode => {
      if (renderOption) {
        return renderOption(opt, context);
      }

      return (
        <>
          {opt.icon}
          <div style={{ flex: 1 }}>
            <div>{opt.label}</div>
            {opt.description && (
              <div
                style={{
                  fontSize: 'var(--ds-font-size-xs)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {opt.description}
              </div>
            )}
          </div>
          {context.isSelected && <CheckIcon />}
        </>
      );
    },
    [renderOption]
  );

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ position: 'relative', ...style }}
      onKeyDown={handleKeyDown}
    >
      {label && (
        <label
          id={labelId}
          style={{
            display: 'block',
            marginBottom: 'var(--ds-spacing-2)',
            fontSize: 'var(--ds-font-size-sm)',
            fontWeight: 'var(--ds-font-weight-medium)',
            color: 'var(--ds-color-neutral-text-default)',
          }}
        >
          {label}
        </label>
      )}

      <div
        id={comboboxId}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        tabIndex={disabled ? -1 : 0}
        role="combobox"
        aria-expanded={isOpen}
        aria-haspopup="listbox"
        aria-controls={isOpen ? listboxId : undefined}
        aria-labelledby={label ? labelId : undefined}
        aria-label={!label ? placeholder : undefined}
        aria-describedby={error || helperText ? helperTextId : undefined}
        aria-invalid={error ? true : undefined}
        aria-disabled={disabled}
        aria-busy={loading}
        aria-activedescendant={
          isOpen && focusedIndex >= 0 ? `${listboxId}-option-${focusedIndex}` : undefined
        }
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--ds-spacing-2)',
          minHeight: 'var(--ds-sizing-10)',
          padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
          backgroundColor: 'var(--ds-color-neutral-background-default)',
          borderWidth: 'var(--ds-border-width-default)',
          borderStyle: 'solid',
          borderColor: error
            ? 'var(--ds-color-danger-border-default)'
            : isOpen
              ? 'var(--ds-color-accent-border-default)'
              : 'var(--ds-color-neutral-border-default)',
          borderRadius: 'var(--ds-border-radius-md)',
          cursor: disabled ? 'not-allowed' : 'pointer',
          opacity: disabled ? 0.5 : 1,
          flexWrap: 'wrap',
        }}
      >
        <div
          style={{
            flex: 1,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 'var(--ds-spacing-1)',
            alignItems: 'center',
          }}
        >
          {selectedValues.length > 0 ? (
            getDisplayValue()
          ) : (
            <span
              style={{
                color: 'var(--ds-color-neutral-text-subtle)',
                fontSize: 'var(--ds-font-size-sm)',
              }}
            >
              {placeholder}
            </span>
          )}
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 'var(--ds-spacing-1)' }}>
          {loading && <SpinnerIcon />}
          {clearable && selectedValues.length > 0 && !disabled && (
            <Button
              type="button"
              onClick={handleClear}
              data-color="neutral"
              aria-label="Clear selection"
              style={{
                display: 'flex',
                padding: 'var(--ds-spacing-1)',
                backgroundColor: 'transparent',
                borderWidth: '0',
                cursor: 'pointer',
                color: 'var(--ds-color-neutral-text-subtle)',
                borderRadius: 'var(--ds-border-radius-sm)',
              }}
            >
              <XIcon />
            </Button>
          )}
          <ChevronDownIcon />
        </div>
      </div>

      {(error || helperText) && (
        <Paragraph
          id={helperTextId}
          data-size="sm"
          style={{
            marginTop: 'var(--ds-spacing-1)',
            fontSize: 'var(--ds-font-size-sm)',
            color: error
              ? 'var(--ds-color-danger-text-default)'
              : 'var(--ds-color-neutral-text-subtle)',
          }}
        >
          {error || helperText}
        </Paragraph>
      )}

      {isOpen && (
        <div
          style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            marginTop: 'var(--ds-spacing-1)',
            backgroundColor: 'var(--ds-color-neutral-background-default)',
            borderWidth: 'var(--ds-border-width-default)',
            borderStyle: 'solid',
            borderColor: 'var(--ds-color-neutral-border-default)',
            borderRadius: 'var(--ds-border-radius-lg)',
            boxShadow: 'var(--ds-shadow-lg)',
            zIndex: 50,
            overflow: 'hidden',
          }}
        >
          <div
            style={{
              padding: 'var(--ds-spacing-2)',
              borderBottomWidth: 'var(--ds-border-width-default)',
              borderBottomStyle: 'solid',
              borderBottomColor: 'var(--ds-color-neutral-border-subtle)',
            }}
          >
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: 'var(--ds-spacing-2)',
                padding: 'var(--ds-spacing-2)',
                backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
                borderRadius: 'var(--ds-border-radius-md)',
              }}
            >
              <SearchIcon />
              <input
                ref={inputRef}
                id={searchInputId}
                type="text"
                role="searchbox"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder={searchPlaceholder}
                aria-label={searchPlaceholder}
                aria-controls={listboxId}
                aria-autocomplete="list"
                style={{
                  flex: 1,
                  border: 'none',
                  outline: 'none',
                  backgroundColor: 'transparent',
                  fontSize: 'var(--ds-font-size-sm)',
                  color: 'var(--ds-color-neutral-text-default)',
                }}
              />
            </div>
          </div>

          <div
            ref={listRef}
            id={listboxId}
            role="listbox"
            aria-multiselectable={multiple}
            aria-label={label || 'Options list'}
            style={{
              maxHeight: 'var(--ds-sizing-60)',
              overflowY: 'auto',
              padding: 'var(--ds-spacing-2)',
            }}
          >
            {loading ? (
              <div
                role="status"
                aria-live="polite"
                aria-label="Loading options"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: 'var(--ds-spacing-4)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                <SpinnerIcon />
              </div>
            ) : filteredOptions.length === 0 && !showCreateOption ? (
              <div
                role="status"
                aria-live="polite"
                style={{
                  padding: 'var(--ds-spacing-4)',
                  textAlign: 'center',
                  fontSize: 'var(--ds-font-size-sm)',
                  color: 'var(--ds-color-neutral-text-subtle)',
                }}
              >
                {emptyMessage}
              </div>
            ) : (
              <>
                {groupedOptions.ungrouped.map((opt, i) => {
                  const isSelected = selectedValues.includes(opt.value);
                  const isFocused = focusedIndex === i;
                  return (
                    <div
                      key={String(opt.value)}
                      id={`${listboxId}-option-${i}`}
                      role="option"
                      aria-selected={isSelected}
                      aria-disabled={opt.disabled}
                      onClick={() => !opt.disabled && handleSelect(opt.value)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: 'var(--ds-spacing-2)',
                        padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                        fontSize: 'var(--ds-font-size-sm)',
                        backgroundColor: isFocused
                          ? 'var(--ds-color-neutral-surface-hover)'
                          : 'transparent',
                        color: opt.disabled
                          ? 'var(--ds-color-neutral-text-subtle)'
                          : 'var(--ds-color-neutral-text-default)',
                        borderRadius: 'var(--ds-border-radius-sm)',
                        cursor: opt.disabled ? 'not-allowed' : 'pointer',
                        opacity: opt.disabled ? 0.5 : 1,
                      }}
                    >
                      {renderOptionContent(opt, { isSelected, isFocused, index: i })}
                    </div>
                  );
                })}
                {Object.entries(groupedOptions.groups).map(([group, opts]) => (
                  <div key={group} role="group" aria-label={group}>
                    <div
                      role="presentation"
                      style={{
                        padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                        fontSize: 'var(--ds-font-size-xs)',
                        fontWeight: 'var(--ds-font-weight-semibold)',
                        color: 'var(--ds-color-neutral-text-subtle)',
                        textTransform: 'uppercase',
                      }}
                    >
                      {group}
                    </div>
                    {opts.map((opt, optIndex) => {
                      const isSelected = selectedValues.includes(opt.value);
                      const globalIndex =
                        groupedOptions.ungrouped.length +
                        Object.entries(groupedOptions.groups)
                          .slice(0, Object.keys(groupedOptions.groups).indexOf(group))
                          .reduce((sum, [, g]) => sum + g.length, 0) +
                        optIndex;
                      const isFocused = focusedIndex === globalIndex;
                      return (
                        <div
                          key={String(opt.value)}
                          id={`${listboxId}-option-${globalIndex}`}
                          role="option"
                          aria-selected={isSelected}
                          aria-disabled={opt.disabled}
                          onClick={() => !opt.disabled && handleSelect(opt.value)}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: 'var(--ds-spacing-2)',
                            padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                            fontSize: 'var(--ds-font-size-sm)',
                            backgroundColor: isFocused
                              ? 'var(--ds-color-neutral-surface-hover)'
                              : 'transparent',
                            color: opt.disabled
                              ? 'var(--ds-color-neutral-text-subtle)'
                              : 'var(--ds-color-neutral-text-default)',
                            borderRadius: 'var(--ds-border-radius-sm)',
                            cursor: opt.disabled ? 'not-allowed' : 'pointer',
                            opacity: opt.disabled ? 0.5 : 1,
                          }}
                        >
                          {renderOptionContent(opt, {
                            isSelected,
                            isFocused,
                            index: globalIndex,
                          })}
                        </div>
                      );
                    })}
                  </div>
                ))}
                {showCreateOption && (
                  <div
                    role="option"
                    aria-selected={false}
                    onClick={() => {
                      onCreate?.(search);
                      setSearch('');
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 'var(--ds-spacing-2)',
                      padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
                      fontSize: 'var(--ds-font-size-sm)',
                      color: 'var(--ds-color-accent-text-default)',
                      borderRadius: 'var(--ds-border-radius-sm)',
                      cursor: 'pointer',
                    }}
                  >
                    Create &quot;{search}&quot;
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      )}
      <style>{`@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}

export default SearchableSelect;
