/**
 * Settings Page Scaffold
 *
 * Creates a settings page with sections and form fields.
 * Pure presentational - no external dependencies.
 */

import React, { useState } from 'react';
import type { RouteObject } from 'react-router-dom';

/**
 * Settings field configuration
 */
export interface SettingsField {
  key: string;
  label: string;
  type: 'text' | 'email' | 'password' | 'select' | 'toggle' | 'textarea';
  description?: string;
  placeholder?: string;
  options?: Array<{ value: string; label: string }>;
  defaultValue?: string | boolean;
}

/**
 * Settings section configuration
 */
export interface SettingsSection {
  id: string;
  title: string;
  description?: string;
  fields: SettingsField[];
}

/**
 * Settings page options
 */
export interface CreateSettingsPageOptions {
  /** Page title */
  title: string;
  /** Page description */
  description?: string;
  /** Settings sections */
  sections: SettingsSection[];
  /** Called when settings are saved */
  onSave?: (data: Record<string, unknown>) => void | Promise<void>;
}

/**
 * Settings page component
 */
function SettingsPageComponent({
  title,
  description,
  sections,
  onSave,
}: CreateSettingsPageOptions): React.ReactElement {
  const [values, setValues] = useState<Record<string, unknown>>(() => {
    const initial: Record<string, unknown> = {};
    sections.forEach(section => {
      section.fields.forEach(field => {
        if (field.defaultValue !== undefined) {
          initial[field.key] = field.defaultValue;
        }
      });
    });
    return initial;
  });
  const [isSaving, setIsSaving] = useState(false);

  const handleChange = (key: string, value: unknown) => {
    setValues(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    if (!onSave) return;
    setIsSaving(true);
    try {
      await onSave(values);
    } finally {
      setIsSaving(false);
    }
  };

  const renderField = (field: SettingsField) => {
    const value = values[field.key];
    
    const baseInputStyle = {
      width: '100%',
      padding: 'var(--ds-spacing-3)',
      borderRadius: 'var(--ds-border-radius-md)',
      border: '1px solid var(--ds-color-neutral-border-default)',
      fontSize: 'var(--ds-font-size-md)',
    };

    switch (field.type) {
      case 'toggle':
        return React.createElement(
          'button',
          {
            type: 'button',
            role: 'switch',
            'aria-checked': !!value,
            onClick: () => handleChange(field.key, !value),
            style: {
              width: '48px',
              height: '24px',
              borderRadius: '12px',
              border: 'none',
              backgroundColor: value 
                ? 'var(--ds-color-accent-base-default)' 
                : 'var(--ds-color-neutral-border-default)',
              cursor: 'pointer',
              position: 'relative' as const,
            },
          },
          React.createElement('span', {
            style: {
              position: 'absolute' as const,
              top: '2px',
              left: value ? '26px' : '2px',
              width: '20px',
              height: '20px',
              borderRadius: '50%',
              backgroundColor: 'white',
              transition: 'left 0.2s',
            },
          })
        );
      
      case 'select':
        return React.createElement(
          'select',
          {
            value: String(value || ''),
            onChange: (e: React.ChangeEvent<HTMLSelectElement>) => handleChange(field.key, e.target.value),
            style: baseInputStyle,
          },
          (field.options || []).map(opt =>
            React.createElement('option', { key: opt.value, value: opt.value }, opt.label)
          )
        );
      
      case 'textarea':
        return React.createElement('textarea', {
          value: String(value || ''),
          onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => handleChange(field.key, e.target.value),
          placeholder: field.placeholder,
          rows: 4,
          style: { ...baseInputStyle, resize: 'vertical' as const },
        });
      
      default:
        return React.createElement('input', {
          type: field.type,
          value: String(value || ''),
          onChange: (e: React.ChangeEvent<HTMLInputElement>) => handleChange(field.key, e.target.value),
          placeholder: field.placeholder,
          style: baseInputStyle,
        });
    }
  };

  return React.createElement(
    'div',
    {
      'data-testid': 'settings-page',
      style: {
        maxWidth: '800px',
        margin: '0 auto',
        padding: 'var(--ds-spacing-6)',
      },
    },
    // Header
    React.createElement(
      'div',
      {
        style: {
          marginBottom: 'var(--ds-spacing-6)',
        },
      },
      React.createElement(
        'h1',
        {
          style: {
            fontSize: 'var(--ds-font-size-2xl)',
            fontWeight: 'var(--ds-font-weight-semibold)',
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
          },
        },
        description
      )
    ),
    // Sections
    sections.map(section =>
      React.createElement(
        'div',
        {
          key: section.id,
          'data-testid': `settings-section-${section.id}`,
          style: {
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            borderRadius: 'var(--ds-border-radius-lg)',
            padding: 'var(--ds-spacing-4)',
            marginBottom: 'var(--ds-spacing-4)',
          },
        },
        React.createElement(
          'h2',
          {
            style: {
              fontSize: 'var(--ds-font-size-lg)',
              fontWeight: 'var(--ds-font-weight-semibold)',
              marginBottom: 'var(--ds-spacing-2)',
            },
          },
          section.title
        ),
        section.description && React.createElement(
          'p',
          {
            style: {
              color: 'var(--ds-color-neutral-text-subtle)',
              marginBottom: 'var(--ds-spacing-4)',
              fontSize: 'var(--ds-font-size-sm)',
            },
          },
          section.description
        ),
        section.fields.map(field =>
          React.createElement(
            'div',
            {
              key: field.key,
              style: {
                marginBottom: 'var(--ds-spacing-4)',
              },
            },
            React.createElement(
              'div',
              {
                style: {
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  gap: 'var(--ds-spacing-4)',
                },
              },
              React.createElement(
                'div',
                { style: { flex: 1 } },
                React.createElement(
                  'label',
                  {
                    htmlFor: field.key,
                    style: {
                      display: 'block',
                      fontWeight: 'var(--ds-font-weight-medium)',
                      marginBottom: 'var(--ds-spacing-1)',
                    },
                  },
                  field.label
                ),
                field.description && React.createElement(
                  'p',
                  {
                    style: {
                      fontSize: 'var(--ds-font-size-sm)',
                      color: 'var(--ds-color-neutral-text-subtle)',
                    },
                  },
                  field.description
                )
              ),
              field.type === 'toggle'
                ? renderField(field)
                : null
            ),
            field.type !== 'toggle' && React.createElement(
              'div',
              { style: { marginTop: 'var(--ds-spacing-2)' } },
              renderField(field)
            )
          )
        )
      )
    ),
    // Save button
    onSave && React.createElement(
      'button',
      {
        type: 'button',
        onClick: handleSave,
        disabled: isSaving,
        style: {
          padding: 'var(--ds-spacing-3) var(--ds-spacing-6)',
          borderRadius: 'var(--ds-border-radius-md)',
          border: 'none',
          backgroundColor: 'var(--ds-color-accent-base-default)',
          color: 'var(--ds-color-accent-contrast-default)',
          fontSize: 'var(--ds-font-size-md)',
          fontWeight: 'var(--ds-font-weight-medium)',
          cursor: isSaving ? 'wait' : 'pointer',
          opacity: isSaving ? 0.7 : 1,
        },
      },
      isSaving ? 'Saving...' : 'Save Changes'
    )
  );
}

/**
 * Create a settings page with sections
 * 
 * @example
 * ```tsx
 * const settingsRoute = createSettingsPage({
 *   title: 'Settings',
 *   description: 'Manage your account settings',
 *   sections: [
 *     {
 *       id: 'profile',
 *       title: 'Profile',
 *       fields: [
 *         { key: 'name', label: 'Name', type: 'text' },
 *         { key: 'email', label: 'Email', type: 'email' },
 *       ],
 *     },
 *     {
 *       id: 'notifications',
 *       title: 'Notifications',
 *       fields: [
 *         { key: 'emailNotifs', label: 'Email notifications', type: 'toggle', defaultValue: true },
 *       ],
 *     },
 *   ],
 *   onSave: async (data) => {
 *     await updateSettings(data);
 *   },
 * });
 * ```
 */
export function createSettingsPage(
  options: CreateSettingsPageOptions,
  path = '/settings'
): RouteObject {
  return {
    path,
    element: React.createElement(SettingsPageComponent, options),
  };
}

export { SettingsPageComponent };
