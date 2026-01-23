/**
 * ToggleMatrix
 *
 * A domain-neutral matrix component for managing multiple toggle settings.
 * Useful for notification preferences, permissions, feature flags, etc.
 *
 * All text content is pre-localized - this component does not handle i18n internally.
 *
 * @example
 * ```tsx
 * <ToggleMatrix
 *   rows={[
 *     { id: 'bookings', label: 'Bookings', description: 'Booking confirmations and reminders' },
 *     { id: 'updates', label: 'Updates', description: 'Product updates and news' },
 *     { id: 'marketing', label: 'Marketing', description: 'Promotional offers and deals' },
 *   ]}
 *   columns={[
 *     { id: 'email', label: 'Email', icon: <MailIcon /> },
 *     { id: 'push', label: 'Push', icon: <BellIcon /> },
 *     { id: 'sms', label: 'SMS', icon: <PhoneIcon /> },
 *   ]}
 *   values={{
 *     bookings: { email: true, push: true, sms: false },
 *     updates: { email: true, push: false, sms: false },
 *     marketing: { email: false, push: false, sms: false },
 *   }}
 *   onChange={(rowId, columnId, value) => handleChange(rowId, columnId, value)}
 * />
 * ```
 */
import * as React from 'react';
import type { ReactNode } from 'react';
import { Heading, Paragraph, Switch } from '@digdir/designsystemet-react';

// ============================================================================
// Types
// ============================================================================

/** Row configuration */
export interface ToggleMatrixRow {
  /** Unique identifier */
  id: string;
  /** Row label (pre-localized) */
  label: string;
  /** Row description (pre-localized, optional) */
  description?: string;
  /** Whether this row is disabled */
  disabled?: boolean;
  /** Row icon (optional) */
  icon?: ReactNode;
}

/** Column configuration */
export interface ToggleMatrixColumn {
  /** Unique identifier */
  id: string;
  /** Column header label (pre-localized) */
  label: string;
  /** Column description (pre-localized, optional) */
  description?: string;
  /** Whether this column is disabled */
  disabled?: boolean;
  /** Column icon (optional) */
  icon?: ReactNode;
}

/** Matrix values structure */
export interface ToggleMatrixValues {
  [rowId: string]: {
    [columnId: string]: boolean;
  };
}

/** Localized labels */
export interface ToggleMatrixLabels {
  /** Main title */
  title?: string;
  /** Subtitle/description */
  subtitle?: string;
  /** "Select all" label */
  selectAll?: string;
  /** "Deselect all" label */
  deselectAll?: string;
  /** Enable all in row label template "{row}" */
  enableAllInRow?: string;
  /** Enable all in column label template "{column}" */
  enableAllInColumn?: string;
}

/** ToggleMatrix props interface */
export interface ToggleMatrixProps {
  /** Array of row definitions */
  rows: ToggleMatrixRow[];

  /** Array of column definitions */
  columns: ToggleMatrixColumn[];

  /** Current values (rowId -> columnId -> boolean) */
  values: ToggleMatrixValues;

  /** Callback when a value changes */
  onChange: (rowId: string, columnId: string, value: boolean) => void;

  /** Callback when all values in a row change */
  onRowChange?: (rowId: string, value: boolean) => void;

  /** Callback when all values in a column change */
  onColumnChange?: (columnId: string, value: boolean) => void;

  /** Show column header select all buttons */
  showColumnSelectAll?: boolean;

  /** Show row select all buttons */
  showRowSelectAll?: boolean;

  /** Card variant vs flat */
  variant?: 'default' | 'card';

  /** Size variant */
  size?: 'sm' | 'md';

  /** Disabled state for entire matrix */
  disabled?: boolean;

  /** Loading state */
  loading?: boolean;

  /** Localized labels */
  labels?: ToggleMatrixLabels;

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

/** Check if all values in a row are true */
function isRowAllSelected(
  rowId: string,
  values: ToggleMatrixValues,
  columns: ToggleMatrixColumn[]
): boolean {
  const rowValues = values[rowId] || {};
  return columns.every((col) => !col.disabled && rowValues[col.id] === true);
}

/** Check if all values in a column are true */
function isColumnAllSelected(
  columnId: string,
  values: ToggleMatrixValues,
  rows: ToggleMatrixRow[]
): boolean {
  return rows.every((row) => !row.disabled && values[row.id]?.[columnId] === true);
}

/** Check if any values in a row are true */
function isRowPartiallySelected(
  rowId: string,
  values: ToggleMatrixValues,
  columns: ToggleMatrixColumn[]
): boolean {
  const rowValues = values[rowId] || {};
  const enabledColumns = columns.filter((col) => !col.disabled);
  const selectedCount = enabledColumns.filter((col) => rowValues[col.id] === true).length;
  return selectedCount > 0 && selectedCount < enabledColumns.length;
}

/** Check if any values in a column are true */
function isColumnPartiallySelected(
  columnId: string,
  values: ToggleMatrixValues,
  rows: ToggleMatrixRow[]
): boolean {
  const enabledRows = rows.filter((row) => !row.disabled);
  const selectedCount = enabledRows.filter((row) => values[row.id]?.[columnId] === true).length;
  return selectedCount > 0 && selectedCount < enabledRows.length;
}

// ============================================================================
// Main Component
// ============================================================================

export function ToggleMatrix({
  rows,
  columns,
  values,
  onChange,
  onRowChange,
  onColumnChange,
  showColumnSelectAll = false,
  showRowSelectAll = false,
  variant = 'default',
  size = 'md',
  disabled = false,
  loading = false,
  labels = {},
  className,
  'data-testid': testId = 'toggle-matrix',
}: ToggleMatrixProps): React.ReactElement {
  const defaultLabels: Required<ToggleMatrixLabels> = {
    title: '',
    subtitle: '',
    selectAll: 'Select all',
    deselectAll: 'Deselect all',
    enableAllInRow: 'Enable all {row}',
    enableAllInColumn: 'Enable all {column}',
  };

  const mergedLabels: Required<ToggleMatrixLabels> = {
    ...defaultLabels,
    ...labels,
  };

  const handleCellChange = (rowId: string, columnId: string, value: boolean) => {
    if (!disabled && !loading) {
      onChange(rowId, columnId, value);
    }
  };

  const handleRowSelectAll = (rowId: string) => {
    if (onRowChange && !disabled && !loading) {
      const allSelected = isRowAllSelected(rowId, values, columns);
      onRowChange(rowId, !allSelected);
    }
  };

  const handleColumnSelectAll = (columnId: string) => {
    if (onColumnChange && !disabled && !loading) {
      const allSelected = isColumnAllSelected(columnId, values, rows);
      onColumnChange(columnId, !allSelected);
    }
  };

  const isSmall = size === 'sm';

  return (
    <div className={cn('toggle-matrix', className)} data-testid={testId}>
      {/* Title and subtitle */}
      {(mergedLabels.title || mergedLabels.subtitle) && (
        <div style={{ marginBottom: 'var(--ds-spacing-4)' }}>
          {mergedLabels.title && (
            <Heading level={3} data-size={isSmall ? 'xs' : 'sm'} style={{ margin: 0 }}>
              {mergedLabels.title}
            </Heading>
          )}
          {mergedLabels.subtitle && (
            <Paragraph
              data-size="sm"
              style={{
                margin: 0,
                marginTop: 'var(--ds-spacing-1)',
                color: 'var(--ds-color-neutral-text-subtle)',
              }}
            >
              {mergedLabels.subtitle}
            </Paragraph>
          )}
        </div>
      )}

      {/* Matrix table */}
      <div
        style={{
          overflowX: 'auto',
          ...(variant === 'card'
            ? {
                backgroundColor: 'var(--ds-color-neutral-background-default)',
                borderRadius: 'var(--ds-border-radius-lg)',
                border: '1px solid var(--ds-color-neutral-border-subtle)',
              }
            : {}),
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
          }}
        >
          {/* Header row */}
          <thead>
            <tr>
              {/* Empty cell for row labels */}
              <th
                style={{
                  padding: isSmall ? 'var(--ds-spacing-2)' : 'var(--ds-spacing-3)',
                  textAlign: 'left',
                  borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
                  minWidth: '200px',
                }}
              />

              {/* Column headers */}
              {columns.map((column) => (
                <th
                  key={column.id}
                  style={{
                    padding: isSmall ? 'var(--ds-spacing-2)' : 'var(--ds-spacing-3)',
                    textAlign: 'center',
                    borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
                    minWidth: '80px',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      gap: 'var(--ds-spacing-1)',
                    }}
                  >
                    {column.icon && (
                      <span
                        style={{
                          color: 'var(--ds-color-neutral-text-subtle)',
                        }}
                      >
                        {column.icon}
                      </span>
                    )}
                    <span
                      style={{
                        fontSize: isSmall ? 'var(--ds-font-size-xs)' : 'var(--ds-font-size-sm)',
                        fontWeight: 600,
                        color: 'var(--ds-color-neutral-text-default)',
                      }}
                    >
                      {column.label}
                    </span>
                    {column.description && (
                      <span
                        style={{
                          fontSize: 'var(--ds-font-size-xs)',
                          color: 'var(--ds-color-neutral-text-subtle)',
                        }}
                      >
                        {column.description}
                      </span>
                    )}

                    {/* Column select all */}
                    {showColumnSelectAll && onColumnChange && (
                      <button
                        type="button"
                        onClick={() => handleColumnSelectAll(column.id)}
                        disabled={disabled || loading || column.disabled}
                        style={{
                          marginTop: 'var(--ds-spacing-1)',
                          padding: '2px 6px',
                          fontSize: 'var(--ds-font-size-xs)',
                          color: 'var(--ds-color-accent-text-default)',
                          backgroundColor: 'transparent',
                          border: '1px solid var(--ds-color-accent-border-subtle)',
                          borderRadius: 'var(--ds-border-radius-sm)',
                          cursor: disabled || column.disabled ? 'not-allowed' : 'pointer',
                          opacity: disabled || column.disabled ? 0.5 : 1,
                        }}
                        aria-label={mergedLabels.enableAllInColumn.replace(
                          '{column}',
                          column.label
                        )}
                      >
                        {isColumnAllSelected(column.id, values, rows)
                          ? mergedLabels.deselectAll
                          : mergedLabels.selectAll}
                      </button>
                    )}
                  </div>
                </th>
              ))}

              {/* Row select all header */}
              {showRowSelectAll && onRowChange && <th style={{ width: '80px' }} />}
            </tr>
          </thead>

          {/* Body rows */}
          <tbody>
            {rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                style={{
                  backgroundColor:
                    rowIndex % 2 === 1 && variant === 'default'
                      ? 'var(--ds-color-neutral-surface-default)'
                      : 'transparent',
                }}
              >
                {/* Row label */}
                <td
                  style={{
                    padding: isSmall ? 'var(--ds-spacing-2)' : 'var(--ds-spacing-3)',
                    borderBottom:
                      rowIndex < rows.length - 1
                        ? '1px solid var(--ds-color-neutral-border-subtle)'
                        : 'none',
                  }}
                >
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'flex-start',
                      gap: 'var(--ds-spacing-2)',
                    }}
                  >
                    {row.icon && (
                      <span
                        style={{
                          color: 'var(--ds-color-neutral-text-subtle)',
                          flexShrink: 0,
                          marginTop: '2px',
                        }}
                      >
                        {row.icon}
                      </span>
                    )}
                    <div>
                      <span
                        style={{
                          display: 'block',
                          fontSize: isSmall ? 'var(--ds-font-size-sm)' : 'var(--ds-font-size-md)',
                          fontWeight: 500,
                          color: row.disabled
                            ? 'var(--ds-color-neutral-text-subtle)'
                            : 'var(--ds-color-neutral-text-default)',
                        }}
                      >
                        {row.label}
                      </span>
                      {row.description && (
                        <span
                          style={{
                            display: 'block',
                            marginTop: '2px',
                            fontSize: 'var(--ds-font-size-xs)',
                            color: 'var(--ds-color-neutral-text-subtle)',
                          }}
                        >
                          {row.description}
                        </span>
                      )}
                    </div>
                  </div>
                </td>

                {/* Toggle cells */}
                {columns.map((column) => {
                  const cellValue = values[row.id]?.[column.id] ?? false;
                  const cellDisabled = disabled || loading || row.disabled || column.disabled;

                  return (
                    <td
                      key={column.id}
                      style={{
                        padding: isSmall ? 'var(--ds-spacing-2)' : 'var(--ds-spacing-3)',
                        textAlign: 'center',
                        borderBottom:
                          rowIndex < rows.length - 1
                            ? '1px solid var(--ds-color-neutral-border-subtle)'
                            : 'none',
                      }}
                    >
                      <div
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                        }}
                      >
                        <Switch
                          checked={cellValue}
                          onChange={(e) => handleCellChange(row.id, column.id, e.target.checked)}
                          disabled={cellDisabled}
                          data-size={isSmall ? 'sm' : 'md'}
                          aria-label={`${row.label} - ${column.label}`}
                        />
                      </div>
                    </td>
                  );
                })}

                {/* Row select all button */}
                {showRowSelectAll && onRowChange && (
                  <td
                    style={{
                      padding: isSmall ? 'var(--ds-spacing-2)' : 'var(--ds-spacing-3)',
                      textAlign: 'center',
                      borderBottom:
                        rowIndex < rows.length - 1
                          ? '1px solid var(--ds-color-neutral-border-subtle)'
                          : 'none',
                    }}
                  >
                    <button
                      type="button"
                      onClick={() => handleRowSelectAll(row.id)}
                      disabled={disabled || loading || row.disabled}
                      style={{
                        padding: '4px 8px',
                        fontSize: 'var(--ds-font-size-xs)',
                        color: 'var(--ds-color-accent-text-default)',
                        backgroundColor: 'transparent',
                        border: '1px solid var(--ds-color-accent-border-subtle)',
                        borderRadius: 'var(--ds-border-radius-sm)',
                        cursor: disabled || row.disabled ? 'not-allowed' : 'pointer',
                        opacity: disabled || row.disabled ? 0.5 : 1,
                        whiteSpace: 'nowrap',
                      }}
                      aria-label={mergedLabels.enableAllInRow.replace('{row}', row.label)}
                    >
                      {isRowAllSelected(row.id, values, columns)
                        ? mergedLabels.deselectAll
                        : mergedLabels.selectAll}
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ToggleMatrix;
