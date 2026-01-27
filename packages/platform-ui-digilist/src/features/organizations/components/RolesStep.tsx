/**
 * RolesStep Component
 *
 * Pure presentational component for role configuration in organization setup.
 * Allows selecting which roles should be created for the organization.
 *
 * @module @xala-technologies/platform-ui/features/organizations
 */

import * as React from 'react';
import { useCallback } from 'react';
import { Paragraph, Heading, Card, Checkbox, Alert } from '@xala-technologies/platform-ui-core';
import { Stack } from '@xala-technologies/platform-ui-core';
import type { RoleDefinition } from '../types';

// =============================================================================
// Icons
// =============================================================================

function UsersIcon({ size = 24 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}

function InfoIcon({ size = 20 }: { size?: number }): React.ReactElement {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="12" y1="16" x2="12" y2="12" />
      <line x1="12" y1="8" x2="12.01" y2="8" />
    </svg>
  );
}

// =============================================================================
// Labels Interface
// =============================================================================

export interface RolesStepLabels {
  // Section headers
  title: string;
  description: string;
  availableRolesHeader: string;
  selectRolesDescription: string;

  // Badges
  requiredBadge: string;
  defaultBadge: string;

  // Info section
  infoTitle: string;
  infoAdminRequired: string;
  infoDefaultRole: string;
  infoCustomize: string;

  // Accessibility
  selectRoleAriaLabel: string;
}

// =============================================================================
// Types
// =============================================================================

export interface RolesStepProps {
  /** Available role definitions to choose from */
  availableRoles: RoleDefinition[];
  /** Currently selected role IDs */
  selectedRoles?: string[];
  /** Callback when selected roles change */
  onChange: (roles: string[]) => void;
  /** UI labels for all text content */
  labels: RolesStepLabels;
  /** Validation errors to display */
  errors?: string[];
}

// =============================================================================
// Component
// =============================================================================

/**
 * Role configuration step for organization wizard.
 *
 * @example
 * ```tsx
 * import { RolesStep } from '@xala-technologies/platform-ui/features/organizations';
 *
 * function WizardRolesStep({ selectedRoles, onChange }) {
 *   const availableRoles = [
 *     {
 *       id: 'admin',
 *       name: 'Administrator',
 *       description: 'Full access to all features',
 *       permissions: ['organization:manage', 'users:manage'],
 *     },
 *     // ... more roles
 *   ];
 *
 *   const labels = {
 *     title: 'Roles',
 *     description: 'Select roles for your organization',
 *     // ... all other labels
 *   };
 *
 *   return (
 *     <RolesStep
 *       availableRoles={availableRoles}
 *       selectedRoles={selectedRoles}
 *       onChange={onChange}
 *       labels={labels}
 *     />
 *   );
 * }
 * ```
 */
export function RolesStep({
  availableRoles,
  selectedRoles = ['admin'],
  onChange,
  labels,
  errors = [],
}: RolesStepProps): React.ReactElement {
  // Handle role toggle
  const handleRoleToggle = useCallback(
    (roleId: string) => {
      // Admin role is always required
      if (roleId === 'admin') {
        return;
      }

      const isSelected = selectedRoles.includes(roleId);
      if (isSelected) {
        onChange(selectedRoles.filter((id) => id !== roleId));
      } else {
        onChange([...selectedRoles, roleId]);
      }
    },
    [selectedRoles, onChange]
  );

  return (
    <Stack spacing="6">
      {/* Header */}
      <Stack spacing="2">
        <Heading level={2} data-size="sm">
          {labels.title}
        </Heading>
        <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
          {labels.description}
        </Paragraph>
      </Stack>

      {errors.length > 0 && (
        <Alert data-color="danger">
          {errors.map((error, idx) => (
            <Paragraph key={idx} data-size="sm">
              {error}
            </Paragraph>
          ))}
        </Alert>
      )}

      {/* Roles List */}
      <Card
        style={{
          padding: 'var(--ds-spacing-5)',
          backgroundColor: 'var(--ds-color-neutral-background-default)',
          border: '1px solid var(--ds-color-neutral-border-subtle)',
        }}
      >
        <Stack
          direction="horizontal"
          spacing="2"
          style={{ marginBottom: 'var(--ds-spacing-4)', alignItems: 'center' }}
        >
          <span style={{ color: 'var(--ds-color-accent-base-default)' }}>
            <UsersIcon data-size={24} />
          </span>
          <Stack spacing="1">
            <Heading level={3} data-size="xs">
              {labels.availableRolesHeader}
            </Heading>
            <Paragraph data-size="xs" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.selectRolesDescription}
            </Paragraph>
          </Stack>
        </Stack>

        <Stack spacing="4">
          {availableRoles.map((role) => {
            const isSelected = selectedRoles.includes(role.id);
            const isRequired = role.id === 'admin';

            return (
              <Card
                key={role.id}
                style={{
                  padding: 'var(--ds-spacing-4)',
                  border: `1px solid ${
                    isSelected
                      ? 'var(--ds-color-accent-border-default)'
                      : 'var(--ds-color-neutral-border-subtle)'
                  }`,
                  backgroundColor: isSelected
                    ? 'var(--ds-color-accent-surface-subtle)'
                    : 'var(--ds-color-neutral-surface-default)',
                  transition: 'all 0.2s ease',
                }}
              >
                <Stack direction="horizontal" spacing="3" style={{ alignItems: 'flex-start' }}>
                  <Checkbox
                    checked={isSelected}
                    onChange={() => handleRoleToggle(role.id)}
                    disabled={isRequired}
                    aria-label={labels.selectRoleAriaLabel.replace('{name}', role.name)}
                    style={{ marginTop: '2px' }}
                  />
                  <Stack spacing="1" style={{ flex: 1 }}>
                    <Stack
                      direction="horizontal"
                      spacing="2"
                      style={{
                        alignItems: 'center',
                        flexWrap: 'wrap',
                      }}
                    >
                      <Heading level={4} data-size="2xs" style={{ margin: 0 }}>
                        {role.name}
                      </Heading>
                      {isRequired && (
                        <span
                          style={{
                            padding: '2px var(--ds-spacing-2)',
                            backgroundColor: 'var(--ds-color-accent-surface-default)',
                            color: 'var(--ds-color-accent-text-default)',
                            borderRadius: 'var(--ds-border-radius-sm)',
                            fontSize: 'var(--ds-font-size-xs)',
                            fontWeight: 'var(--ds-font-weight-medium)',
                          }}
                        >
                          {labels.requiredBadge}
                        </span>
                      )}
                      {role.isDefault && (
                        <span
                          style={{
                            padding: '2px var(--ds-spacing-2)',
                            backgroundColor: 'var(--ds-color-info-surface-default)',
                            color: 'var(--ds-color-info-text-default)',
                            borderRadius: 'var(--ds-border-radius-sm)',
                            fontSize: 'var(--ds-font-size-xs)',
                            fontWeight: 'var(--ds-font-weight-medium)',
                          }}
                        >
                          {labels.defaultBadge}
                        </span>
                      )}
                    </Stack>
                    <Paragraph
                      data-size="sm"
                      style={{
                        margin: 0,
                        color: 'var(--ds-color-neutral-text-subtle)',
                      }}
                    >
                      {role.description}
                    </Paragraph>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'var(--ds-spacing-1)' }}>
                      {role.permissions.map((permission) => (
                        <span
                          key={permission}
                          style={{
                            padding: '2px var(--ds-spacing-2)',
                            backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
                            color: 'var(--ds-color-neutral-text-default)',
                            borderRadius: 'var(--ds-border-radius-sm)',
                            fontSize: 'var(--ds-font-size-xs)',
                            border: '1px solid var(--ds-color-neutral-border-subtle)',
                          }}
                        >
                          {permission}
                        </span>
                      ))}
                    </div>
                  </Stack>
                </Stack>
              </Card>
            );
          })}
        </Stack>
      </Card>

      {/* Info Section */}
      <Alert data-color="info">
        <Stack direction="horizontal" spacing="3">
          <span style={{ flexShrink: 0, marginTop: '2px' }}>
            <InfoIcon data-size={20} />
          </span>
          <Stack spacing="2">
            <Heading level={4} data-size="2xs">
              {labels.infoTitle}
            </Heading>
            <ul style={{ margin: 0, paddingLeft: 'var(--ds-spacing-4)' }}>
              <li>
                <Paragraph data-size="xs" style={{ margin: 0 }}>
                  {labels.infoAdminRequired}
                </Paragraph>
              </li>
              <li>
                <Paragraph data-size="xs" style={{ margin: 0 }}>
                  {labels.infoDefaultRole}
                </Paragraph>
              </li>
              <li>
                <Paragraph data-size="xs" style={{ margin: 0 }}>
                  {labels.infoCustomize}
                </Paragraph>
              </li>
            </ul>
          </Stack>
        </Stack>
      </Alert>
    </Stack>
  );
}

export type { RoleDefinition };
