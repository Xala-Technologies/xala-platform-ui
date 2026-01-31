/**
 * CRUD Page Scaffold
 *
 * Generates List, Detail, Create, and Edit pages from configuration.
 * Pure presentational - no external dependencies.
 */

import React from 'react';
import type { RouteObject } from 'react-router-dom';
import type { CreateCrudPagesOptions, CrudColumn } from '../types';

/**
 * Create a List page component
 */
function createListPage<T>(options: CreateCrudPagesOptions<T>): React.FC {
  const { entity, columns, filters, actions, hooks } = options;
  
  return function ListPage() {
    const { data = [], isLoading } = hooks?.useList?.() || { data: [], isLoading: false };
    
    return React.createElement(
      'div',
      { 
        'data-testid': `${entity}-list-page`,
        style: {
          padding: 'var(--ds-spacing-4)',
        },
      },
      // Filter bar
      filters && React.createElement(
        'div', 
        { 
          className: 'filter-bar',
          style: {
            display: 'flex',
            gap: 'var(--ds-spacing-2)',
            marginBottom: 'var(--ds-spacing-4)',
          },
        },
        filters.map(f => React.createElement('div', { key: f.key }, f.label))
      ),
      // Data table
      React.createElement(
        'table', 
        { 
          'data-testid': `${entity}-table`,
          style: {
            width: '100%',
            borderCollapse: 'collapse',
          },
        },
        React.createElement('thead', null,
          React.createElement('tr', null,
            columns.map(col => 
              React.createElement(
                'th', 
                { 
                  key: col.key,
                  style: {
                    textAlign: 'left',
                    padding: 'var(--ds-spacing-3)',
                    borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
                    fontWeight: 'var(--ds-font-weight-semibold)',
                  },
                }, 
                col.label
              )
            ),
            actions?.length && React.createElement(
              'th', 
              {
                style: {
                  textAlign: 'right',
                  padding: 'var(--ds-spacing-3)',
                  borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
                },
              }, 
              'Actions'
            )
          )
        ),
        React.createElement('tbody', null,
          isLoading
            ? React.createElement('tr', null, 
                React.createElement(
                  'td', 
                  { 
                    colSpan: columns.length + 1,
                    style: {
                      padding: 'var(--ds-spacing-4)',
                      textAlign: 'center',
                      color: 'var(--ds-color-neutral-text-subtle)',
                    },
                  }, 
                  'Loading...'
                )
              )
            : (data as unknown[]).map((row: unknown, i: number) =>
                React.createElement('tr', { key: i },
                  columns.map(col =>
                    React.createElement(
                      'td', 
                      { 
                        key: col.key,
                        style: {
                          padding: 'var(--ds-spacing-3)',
                          borderBottom: '1px solid var(--ds-color-neutral-border-subtle)',
                        },
                      },
                      col.render 
                        ? col.render((row as Record<string, unknown>)[col.key], row)
                        : String((row as Record<string, unknown>)[col.key] ?? '')
                    )
                  )
                )
              )
        )
      )
    );
  };
}

/**
 * Create a Detail page component  
 */
function createDetailPage<T>(options: CreateCrudPagesOptions<T>): React.FC {
  const { entity, columns, hooks } = options;
  
  return function DetailPage() {
    // Get ID from URL params - simplified for scaffold
    const id = 'placeholder';
    const { data, isLoading } = hooks?.useDetail?.(id) || { data: null, isLoading: false };
    
    if (isLoading) {
      return React.createElement(
        'div', 
        { 
          style: {
            padding: 'var(--ds-spacing-4)',
            color: 'var(--ds-color-neutral-text-subtle)',
          },
        }, 
        'Loading...'
      );
    }
    
    return React.createElement(
      'div',
      { 
        'data-testid': `${entity}-detail-page`,
        style: {
          padding: 'var(--ds-spacing-4)',
        },
      },
      columns.map(col =>
        React.createElement(
          'div', 
          { 
            key: col.key, 
            className: 'field-row',
            style: {
              display: 'flex',
              marginBottom: 'var(--ds-spacing-3)',
              gap: 'var(--ds-spacing-2)',
            },
          },
          React.createElement(
            'label', 
            {
              style: {
                fontWeight: 'var(--ds-font-weight-medium)',
                minWidth: '120px',
              },
            }, 
            col.label
          ),
          React.createElement(
            'span', 
            null, 
            data ? String((data as Record<string, unknown>)[col.key] ?? '') : ''
          )
        )
      )
    );
  };
}

/**
 * Create CRUD pages from configuration
 * 
 * @example
 * ```tsx
 * const taskRoutes = createCrudPages({
 *   entity: 'task',
 *   basePath: '/tasks',
 *   columns: [
 *     { key: 'title', label: 'Title' },
 *     { key: 'status', label: 'Status' },
 *   ],
 *   filters: [
 *     { key: 'status', label: 'Status', type: 'select', options: [...] },
 *   ],
 *   actions: ['create', 'edit', 'delete'],
 *   hooks: {
 *     useList: () => useTasksList(),
 *     useDetail: (id) => useTask(id),
 *   },
 * });
 * ```
 */
export function createCrudPages<T = unknown>(
  options: CreateCrudPagesOptions<T>
): RouteObject[] {
  const { basePath, actions = ['create', 'edit', 'delete', 'view'] } = options;
  
  const routes: RouteObject[] = [];
  
  // List page
  routes.push({
    path: basePath,
    element: React.createElement(createListPage(options)),
  });
  
  // Detail page (view)
  if (actions.includes('view')) {
    routes.push({
      path: `${basePath}/:id`,
      element: React.createElement(createDetailPage(options)),
    });
  }
  
  // Create page
  if (actions.includes('create')) {
    routes.push({
      path: `${basePath}/new`,
      element: React.createElement(
        'div', 
        { 'data-testid': `${options.entity}-create-page` }, 
        'Create Form'
      ),
    });
  }
  
  // Edit page
  if (actions.includes('edit')) {
    routes.push({
      path: `${basePath}/:id/edit`,
      element: React.createElement(
        'div', 
        { 'data-testid': `${options.entity}-edit-page` }, 
        'Edit Form'
      ),
    });
  }
  
  return routes;
}
