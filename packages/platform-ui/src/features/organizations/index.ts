/**
 * @xala-technologies/platform-ui - Organizations Feature Kit
 *
 * Pure UI components for managing organizations including wizard-based creation,
 * form-based editing, and member management.
 *
 * All components are presentational and receive data/handlers via props.
 * Labels must be provided for all text content (no i18n).
 *
 * @module @xala-technologies/platform-ui/features/organizations
 *
 * ## Usage
 *
 * ```tsx
 * import {
 *   OrganizationWizard,
 *   OrganizationForm,
 *   MemberManagement,
 * } from '@xala-technologies/platform-ui/features/organizations';
 *
 * // Use wizard for new organization creation
 * function CreateOrganizationPage() {
 *   const availableRoles = [
 *     {
 *       id: 'admin',
 *       name: 'Administrator',
 *       description: 'Full access',
 *       permissions: ['organization:manage'],
 *     },
 *   ];
 *
 *   const labels = {
 *     createTitle: 'Create Organization',
 *     // ... all wizard labels
 *   };
 *
 *   return (
 *     <OrganizationWizard
 *       availableRoles={availableRoles}
 *       labels={labels}
 *       onComplete={(data) => organizationService.create(data)}
 *       onCancel={() => navigate(-1)}
 *     />
 *   );
 * }
 *
 * // Use form for quick editing
 * function EditOrganizationPage({ organization }) {
 *   const labels = {
 *     basicInfoTitle: 'Basic Information',
 *     // ... all form labels
 *   };
 *
 *   return (
 *     <OrganizationForm
 *       organization={organization}
 *       labels={labels}
 *       onSubmit={(data) => organizationService.update(organization.id, data)}
 *       onCancel={() => navigate(-1)}
 *     />
 *   );
 * }
 *
 * // Use member management for team administration
 * function MembersTab({ members, availableUsers }) {
 *   const labels = {
 *     addMember: 'Add Member',
 *     // ... all member management labels
 *   };
 *
 *   return (
 *     <MemberManagement
 *       members={members}
 *       availableUsers={availableUsers}
 *       labels={labels}
 *       onInvite={handleInvite}
 *       onRemove={handleRemove}
 *       onUpdateRole={handleUpdateRole}
 *     />
 *   );
 * }
 * ```
 *
 * ## Components
 *
 * ### Wizard Components
 * - `OrganizationWizard` - Multi-step organization creation orchestrator
 * - `BasicStep` - Basic information step (name, type, contact)
 * - `BrandingStep` - Visual identity step (logo, colors, favicon)
 * - `RolesStep` - Role configuration step
 *
 * ### Form Components
 * - `OrganizationForm` - Simple form for create/edit
 *
 * ### Management Components
 * - `MemberManagement` - Add/remove/update members (pure UI)
 */

// =============================================================================
// Components
// =============================================================================

export {
  // Wizard
  OrganizationWizard,
  type OrganizationWizardProps,
  type OrganizationWizardLabels,
  // Wizard Steps
  BasicStep,
  type BasicStepProps,
  type BasicStepLabels,
  BrandingStep,
  type BrandingStepProps,
  type BrandingStepLabels,
  RolesStep,
  type RolesStepProps,
  type RolesStepLabels,
  // Form
  OrganizationForm,
  type OrganizationFormProps,
  type OrganizationFormLabels,
  // Members
  MemberManagement,
  type MemberManagementProps,
  type MemberManagementLabels,
} from './components';

// =============================================================================
// Types
// =============================================================================

export type {
  // Actor types
  ActorType,
  // Data types
  BasicData,
  BrandingData,
  RoleDefinition,
  OrganizationWizardStepId,
  OrganizationWizardStep,
  OrganizationWizardData,
  OrganizationFormData,
  MemberRole,
  OrganizationMemberVM,
  OrganizationVM,
  UserVM,
} from './types';
