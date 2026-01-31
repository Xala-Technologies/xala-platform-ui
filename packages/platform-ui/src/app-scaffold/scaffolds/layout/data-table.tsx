/**
 * Data Table Scaffold
 *
 * Creates a responsive data table with sorting, selection, and empty states.
 */

import React from 'react';

export interface TableColumn<T = unknown> {
  /** Column key */
  key: string;
  /** Column header label */
  label: string;
  /** Sortable column */
  sortable?: boolean;
  /** Column width */
  width?: string;
  /** Custom render function */
  render?: (value: unknown, row: T, index: number) => React.ReactNode;
}

export interface EmptyStateConfig {
  /** Icon */
  icon?: React.ReactNode;
  /** Title */
  title: string;
  /** Description */
  description?: string;
  /** Action button */
  action?: {
    label: string;
    onClick: () => void;
  };
}

export interface DataTableConfig<T = unknown> {
  /** Table columns */
  columns: TableColumn<T>[];
  /** Table data */
  data: T[];
  /** Loading state */
  isLoading?: boolean;
  /** Empty state config */
  emptyState?: EmptyStateConfig;
  /** Row click handler */
  onRowClick?: (row: T, index: number) => void;
  /** Row key extractor */
  getRowKey?: (row: T, index: number) => string;
  /** Enable row selection */
  selectable?: boolean;
  /** Selected row keys */
  selectedKeys?: string[];
  /** Selection change handler */
  onSelectionChange?: (keys: string[]) => void;
}

/**
 * Skeleton row for loading state
 */
function SkeletonRow({ columns }: { columns: number }): React.ReactElement {
  return React.createElement(
    'tr',
    null,
    Array.from({ length: columns }).map((_, i) =>
      React.createElement(
        'td',
        {
          key: i,
          style: { padding: 'var(--ds-spacing-3)' },
        },
        React.createElement('div', {
          style: {
            height: '20px',
            backgroundColor: 'var(--ds-color-neutral-surface-hover)',
            borderRadius: 'var(--ds-border-radius-sm)',
            animation: 'pulse 1.5s infinite',
          },
        })
      )
    )
  );
}

/**
 * Empty state component
 */
function EmptyState({ icon, title, description, action }: EmptyStateConfig): React.ReactElement {
  return React.createElement(
    'div',
    {
      style: {
        textAlign: 'center',
        padding: 'var(--ds-spacing-8)',
      },
    },
    icon && React.createElement(
      'div',
      {
        style: {
          marginBottom: 'var(--ds-spacing-4)',
          color: 'var(--ds-color-neutral-text-subtle)',
        },
      },
      icon
    ),
    React.createElement(
      'h3',
      {
        style: {
          fontSize: 'var(--ds-font-size-lg)',
          fontWeight: 'var(--ds-font-weight-medium)',
          marginBottom: 'var(--ds-spacing-2)',
        },
      },
      title
    ),
    description && React.createElement(
      'p',
      {
        style: {
          color: 'var(--ds-color-neutral-text-subtle)',
          marginBottom: 'var(--ds-spacing-4)',
        },
      },
      description
    ),
    action && React.createElement(
      'button',
      {
        onClick: action.onClick,
        style: {
          padding: 'var(--ds-spacing-2) var(--ds-spacing-4)',
          backgroundColor: 'var(--ds-color-accent-base-default)',
          color: 'var(--ds-color-accent-contrast-default)',
          border: 'none',
          borderRadius: 'var(--ds-border-radius-md)',
          cursor: 'pointer',
          fontWeight: 'var(--ds-font-weight-medium)',
        },
      },
      action.label
    )
  );
}

/**
 * DataTable component
 */
export function DataTable<T>({
  columns,
  data,
  isLoading = false,
  emptyState,
  onRowClick,
  getRowKey = (_, i) => String(i),
  selectable = false,
  selectedKeys = [],
  onSelectionChange,
}: DataTableConfig<T>): React.ReactElement {
  const handleRowClick = (row: T, index: number) => {
    if (onRowClick) {
      onRowClick(row, index);
    }
  };

  const handleSelectAll = () => {
    if (!onSelectionChange) return;
    if (selectedKeys.length === data.length) {
      onSelectionChange([]);
    } else {
      onSelectionChange(data.map((row, i) => getRowKey(row, i)));
    }
  };

  const handleSelectRow = (key: string) => {
    if (!onSelectionChange) return;
    if (selectedKeys.includes(key)) {
      onSelectionChange(selectedKeys.filter(k => k !== key));
    } else {
      onSelectionChange([...selectedKeys, key]);
    }
  };

  return React.createElement(
    'div',
    {
      'data-testid': 'data-table',
      style: {
        backgroundColor: 'var(--ds-color-neutral-surface-default)',
        borderRadius: 'var(--ds-border-radius-lg)',
        border: '1px solid var(--ds-color-neutral-border-subtle)',
        overflow: 'hidden',
      },
    },
    React.createElement('style', null, `
      @keyframes pulse {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.5; }
      }
    `),
    React.createElement(
      'div',
      { style: { overflowX: 'auto' } },
      React.createElement(
        'table',
        {
          style: {
            width: '100%',
            borderCollapse: 'collapse',
          },
        },
        // Header
        React.createElement(
          'thead',
          null,
          React.createElement(
            'tr',
            {
              style: {
                backgroundColor: 'var(--ds-color-neutral-surface-hover)',
              },
            },
            selectable && React.createElement(
              'th',
              {
                style: {
                  padding: 'var(--ds-spacing-3)',
                  width: '40px',
                },
              },
              React.createElement('input', {
                type: 'checkbox',
                checked: selectedKeys.length === data.length && data.length > 0,
                onChange: handleSelectAll,
              })
            ),
            columns.map(col =>
              React.createElement(
                'th',
                {
                  key: col.key,
                  style: {
                    padding: 'var(--ds-spacing-3)',
                    textAlign: 'left',
                    fontWeight: 'var(--ds-font-weight-semibold)',
                    fontSize: 'var(--ds-font-size-sm)',
                    color: 'var(--ds-color-neutral-text-subtle)',
                    width: col.width,
                  },
                },
                col.label
              )
            )
          )
        ),
        // Body
        React.createElement(
          'tbody',
          null,
          isLoading
            ? Array.from({ length: 5 }).map((_, i) =>
                React.createElement(SkeletonRow, { key: i, columns: columns.length + (selectable ? 1 : 0) })
              )
            : data.length === 0
              ? React.createElement(
                  'tr',
                  null,
                  React.createElement(
                    'td',
                    { colSpan: columns.length + (selectable ? 1 : 0) },
                    emptyState
                      ? React.createElement(EmptyState, emptyState)
                      : React.createElement(
                          'div',
                          {
                            style: {
                              padding: 'var(--ds-spacing-8)',
                              textAlign: 'center',
                              color: 'var(--ds-color-neutral-text-subtle)',
                            },
                          },
                          'No data available'
                        )
                  )
                )
              : data.map((row, rowIndex) => {
                  const rowKey = getRowKey(row, rowIndex);
                  const isSelected = selectedKeys.includes(rowKey);
                  return React.createElement(
                    'tr',
                    {
                      key: rowKey,
                      onClick: () => handleRowClick(row, rowIndex),
                      style: {
                        cursor: onRowClick ? 'pointer' : 'default',
                        backgroundColor: isSelected ? 'var(--ds-color-accent-surface-default)' : undefined,
                        borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
                      },
                    },
                    selectable && React.createElement(
                      'td',
                      {
                        style: { padding: 'var(--ds-spacing-3)' },
                        onClick: (e: React.MouseEvent) => e.stopPropagation(),
                      },
                      React.createElement('input', {
                        type: 'checkbox',
                        checked: isSelected,
                        onChange: () => handleSelectRow(rowKey),
                      })
                    ),
                    columns.map(col =>
                      React.createElement(
                        'td',
                        {
                          key: col.key,
                          style: {
                            padding: 'var(--ds-spacing-3)',
                            fontSize: 'var(--ds-font-size-sm)',
                          },
                        },
                        col.render
                          ? col.render((row as Record<string, unknown>)[col.key], row, rowIndex)
                          : String((row as Record<string, unknown>)[col.key] ?? '')
                      )
                    )
                  );
                })
        )
      )
    )
  );
}

/**
 * Create a data table element
 */
export function createDataTable<T>(config: DataTableConfig<T>): React.ReactElement {
  return React.createElement(DataTable as React.FC<DataTableConfig<T>>, config);
}
