/**
 * Organizations Module - Components
 *
 * @module @xala-technologies/platform-ui/features/organizations/components
 */

// Wizard Step Components
export {
  BasicStep,
  type BasicStepProps,
  type BasicStepLabels,
  type BasicData,
} from './BasicStep';
export {
  BrandingStep,
  type BrandingStepProps,
  type BrandingStepLabels,
  type BrandingData,
} from './BrandingStep';
export {
  RolesStep,
  type RolesStepProps,
  type RolesStepLabels,
  type RoleDefinition,
} from './RolesStep';

// Wizard Orchestrator
export {
  OrganizationWizard,
  type OrganizationWizardProps,
  type OrganizationWizardLabels,
} from './OrganizationWizard';

// Form Components
export {
  OrganizationForm,
  type OrganizationFormProps,
  type OrganizationFormLabels,
} from './OrganizationForm';

// Member Management
export {
  MemberManagement,
  type MemberManagementProps,
  type MemberManagementLabels,
} from './MemberManagement';
