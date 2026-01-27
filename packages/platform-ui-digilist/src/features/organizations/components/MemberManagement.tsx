/**
 * MemberManagement Component
 *
 * Pure presentational component for managing organization members.
 * Add, remove, and update member roles through UI interactions.
 *
 * @module @xala-technologies/platform-ui/features/organizations
 */

import * as React from 'react';
import { useState } from 'react';
import { Button, Table, Select, Paragraph, Heading, Card } from '@xala-technologies/platform-ui-core';
import { Stack, FormField, Badge } from '@xala-technologies/platform-ui-core';
import type { OrganizationMemberVM, UserVM, MemberRole } from '../types';

// =============================================================================
// Icons
// =============================================================================

function PlusIcon({ size = 20 }: { size?: number }): React.ReactElement {
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
      <line x1="12" y1="5" x2="12" y2="19" />
      <line x1="5" y1="12" x2="19" y2="12" />
    </svg>
  );
}

function UserIcon({ size = 20 }: { size?: number }): React.ReactElement {
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
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function TrashIcon({ size = 20 }: { size?: number }): React.ReactElement {
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
      <polyline points="3 6 5 6 21 6" />
      <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

function EditIcon({ size = 20 }: { size?: number }): React.ReactElement {
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
      <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
      <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
    </svg>
  );
}

// =============================================================================
// Labels Interface
// =============================================================================

export interface MemberManagementLabels {
  // Section title
  title?: string;

  // Actions
  addMember: string;
  addNewMember: string;
  selectUser: string;
  selectUserPlaceholder: string;
  role: string;
  add: string;
  adding: string;
  cancel: string;
  confirmRemove: string;
  removeMember: string;
  makeAdmin: string;
  makeRegularMember: string;

  // Table headers
  name: string;
  email: string;
  memberRole: string;
  memberSince: string;
  actions: string;
  actionsMenu: string;

  // Role names
  roleAdmin: string;
  roleMember: string;

  // Empty state
  noMembers: string;
  unknownUser: string;
}

// =============================================================================
// Types
// =============================================================================

export interface MemberManagementProps {
  /** Current list of members */
  members: OrganizationMemberVM[];
  /** Available users to add as members */
  availableUsers: UserVM[];
  /** Callback when a member is invited */
  onInvite: (userId: string, role: MemberRole) => Promise<void>;
  /** Callback when a member is removed */
  onRemove: (memberId: string) => Promise<void>;
  /** Callback when a member's role is updated */
  onUpdateRole: (memberId: string, newRole: MemberRole) => Promise<void>;
  /** UI labels for all text content */
  labels: MemberManagementLabels;
}

// =============================================================================
// Component
// =============================================================================

/**
 * Member management interface for organizations.
 *
 * @example
 * ```tsx
 * import { MemberManagement } from '@xala-technologies/platform-ui/features/organizations';
 *
 * function OrganizationMembersTab() {
 *   const members = [
 *     {
 *       id: '1',
 *       userId: 'user-1',
 *       role: 'admin',
 *       joinedAt: '2024-01-01',
 *       user: { id: 'user-1', name: 'John Doe', email: 'john@example.com' },
 *     },
 *   ];
 *
 *   const availableUsers = [
 *     { id: 'user-2', name: 'Jane Smith', email: 'jane@example.com' },
 *   ];
 *
 *   const labels = {
 *     addMember: 'Add Member',
 *     // ... all other labels
 *   };
 *
 *   return (
 *     <MemberManagement
 *       members={members}
 *       availableUsers={availableUsers}
 *       onInvite={handleInvite}
 *       onRemove={handleRemove}
 *       onUpdateRole={handleUpdateRole}
 *       labels={labels}
 *     />
 *   );
 * }
 * ```
 */
export function MemberManagement({
  members,
  availableUsers,
  onInvite,
  onRemove,
  onUpdateRole,
  labels,
}: MemberManagementProps): React.ReactElement {
  const [isAdding, setIsAdding] = useState(false);
  const [selectedUserId, setSelectedUserId] = useState('');
  const [selectedRole, setSelectedRole] = useState<MemberRole>('member');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleAddMember = async () => {
    if (!selectedUserId) return;

    setIsSubmitting(true);
    try {
      await onInvite(selectedUserId, selectedRole);

      // Reset form
      setSelectedUserId('');
      setSelectedRole('member');
      setIsAdding(false);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleRemoveMember = async (memberId: string) => {
    if (!confirm(labels.confirmRemove)) {
      return;
    }

    try {
      await onRemove(memberId);
    } catch {
      // Error handled by parent
    }
  };

  const handleUpdateRole = async (memberId: string, newRole: MemberRole) => {
    try {
      await onUpdateRole(memberId, newRole);
    } catch {
      // Error handled by parent
    }
  };

  return (
    <Stack spacing="4">
      {labels.title && (
        <Heading level={2} data-size="md">
          {labels.title}
        </Heading>
      )}

      {/* Add Member Section */}
      <div>
        {!isAdding ? (
          <Button
            variant="secondary"
            data-size="sm"
            onClick={() => setIsAdding(true)}
            type="button"
          >
            <PlusIcon size={16} />
            {labels.addMember}
          </Button>
        ) : (
          <Card
            style={{
              padding: 'var(--ds-spacing-4)',
              backgroundColor: 'var(--ds-color-neutral-surface-default)',
              border: '1px solid var(--ds-color-neutral-border-default)',
            }}
          >
            <Stack spacing="3">
              <Paragraph data-size="sm" style={{ fontWeight: 'var(--ds-font-weight-semibold)' }}>
                {labels.addNewMember}
              </Paragraph>

              <FormField label={labels.selectUser} required>
                <Select
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                  disabled={isSubmitting}
                >
                  <option value="">{labels.selectUserPlaceholder}</option>
                  {availableUsers.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.name} ({user.email})
                    </option>
                  ))}
                </Select>
              </FormField>

              <FormField label={labels.role} required>
                <Select
                  value={selectedRole}
                  onChange={(e) => setSelectedRole(e.target.value as MemberRole)}
                  disabled={isSubmitting}
                >
                  <option value="member">{labels.roleMember}</option>
                  <option value="admin">{labels.roleAdmin}</option>
                </Select>
              </FormField>

              <Stack direction="horizontal" spacing="2">
                <Button
                  onClick={handleAddMember}
                  disabled={!selectedUserId || isSubmitting}
                  type="button"
                >
                  {isSubmitting ? labels.adding : labels.add}
                </Button>
                <Button
                  variant="secondary"
                  onClick={() => {
                    setIsAdding(false);
                    setSelectedUserId('');
                    setSelectedRole('member');
                  }}
                  disabled={isSubmitting}
                  type="button"
                >
                  {labels.cancel}
                </Button>
              </Stack>
            </Stack>
          </Card>
        )}
      </div>

      {/* Members List */}
      {members.length === 0 ? (
        <Card
          style={{
            textAlign: 'center',
            padding: 'var(--ds-spacing-8)',
            backgroundColor: 'var(--ds-color-neutral-surface-subtle)',
          }}
        >
          <Stack spacing="2" style={{ alignItems: 'center' }}>
            <span style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              <UserIcon size={48} />
            </span>
            <Paragraph data-size="sm" style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
              {labels.noMembers}
            </Paragraph>
          </Stack>
        </Card>
      ) : (
        <Card style={{ overflow: 'hidden' }}>
          <Table>
            <Table.Head>
              <Table.Row>
                <Table.HeaderCell>{labels.name}</Table.HeaderCell>
                <Table.HeaderCell>{labels.email}</Table.HeaderCell>
                <Table.HeaderCell>{labels.memberRole}</Table.HeaderCell>
                <Table.HeaderCell>{labels.memberSince}</Table.HeaderCell>
                <Table.HeaderCell style={{ width: '180px' }}>{labels.actions}</Table.HeaderCell>
              </Table.Row>
            </Table.Head>
            <Table.Body>
              {members.map((member) => (
                <Table.Row key={member.id}>
                  <Table.Cell>
                    <Stack direction="horizontal" spacing="2" style={{ alignItems: 'center' }}>
                      <span style={{ color: 'var(--ds-color-neutral-text-subtle)' }}>
                        <UserIcon size={16} />
                      </span>
                      <span style={{ fontWeight: 'var(--ds-font-weight-medium)' }}>
                        {member.user?.name || labels.unknownUser}
                      </span>
                    </Stack>
                  </Table.Cell>
                  <Table.Cell>{member.user?.email || '–'}</Table.Cell>
                  <Table.Cell>
                    <Badge variant={member.role === 'admin' ? 'success' : 'neutral'}>
                      {member.role === 'admin' ? labels.roleAdmin : labels.roleMember}
                    </Badge>
                  </Table.Cell>
                  <Table.Cell>
                    <span
                      style={{
                        fontSize: 'var(--ds-font-size-sm)',
                        color: 'var(--ds-color-neutral-text-subtle)',
                      }}
                    >
                      {new Date(member.joinedAt).toLocaleDateString('nb-NO')}
                    </span>
                  </Table.Cell>
                  <Table.Cell>
                    <Stack direction="horizontal" spacing="1">
                      <Button
                        variant="tertiary"
                        data-size="sm"
                        onClick={() =>
                          handleUpdateRole(member.id, member.role === 'admin' ? 'member' : 'admin')
                        }
                        aria-label={
                          member.role === 'admin' ? labels.makeRegularMember : labels.makeAdmin
                        }
                        type="button"
                      >
                        <EditIcon size={16} />
                      </Button>
                      <Button
                        variant="tertiary"
                        data-size="sm"
                        onClick={() => handleRemoveMember(member.id)}
                        aria-label={labels.removeMember}
                        type="button"
                      >
                        <TrashIcon size={16} />
                      </Button>
                    </Stack>
                  </Table.Cell>
                </Table.Row>
              ))}
            </Table.Body>
          </Table>
        </Card>
      )}
    </Stack>
  );
}
