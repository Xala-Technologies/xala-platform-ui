/**
 * Organizations Module - Types
 *
 * Pure ViewModel types for organization components.
 * No external dependencies - all types are local data structures.
 *
 * @module @xala-technologies/platform-ui/features/organizations
 */

// =============================================================================
// Actor Type (local definition)
// =============================================================================

export type ActorType =
  | 'municipality'
  | 'organization'
  | 'business'
  | 'sports_club'
  | 'youth_organization'
  | 'school'
  | 'private';

// =============================================================================
// Basic Step Types
// =============================================================================

export interface BasicData {
  name: string;
  organizationNumber?: string;
  actorType?: ActorType;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

// =============================================================================
// Branding Step Types
// =============================================================================

export interface BrandingData {
  logo?: string;
  primaryColor?: string;
  secondaryColor?: string;
  favicon?: string;
}

// =============================================================================
// Roles Step Types
// =============================================================================

export interface RoleDefinition {
  id: string;
  name: string;
  description: string;
  permissions: string[];
  isDefault?: boolean;
}

// =============================================================================
// Wizard Types
// =============================================================================

export type OrganizationWizardStepId = 'basics' | 'branding' | 'roles';

export interface OrganizationWizardStep {
  id: OrganizationWizardStepId;
  label: string;
  required?: boolean;
}

export interface OrganizationWizardData {
  // Core organization fields
  name: string;
  organizationNumber?: string;
  actorType?: ActorType;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  // Extended wizard-specific fields
  branding?: BrandingData;
  roles?: string[];
}

// =============================================================================
// Form Types
// =============================================================================

export interface OrganizationFormData {
  name: string;
  actorType: ActorType;
  organizationNumber?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
}

// =============================================================================
// Member Types
// =============================================================================

export type MemberRole = 'admin' | 'member';

export interface OrganizationMemberVM {
  id: string;
  userId: string;
  role: MemberRole;
  joinedAt: string | Date;
  user?: {
    id: string;
    name?: string;
    email?: string;
  };
}

// =============================================================================
// Organization ViewModel
// =============================================================================

export interface OrganizationVM {
  id: string;
  name: string;
  actorType: ActorType;
  organizationNumber?: string;
  email?: string;
  phone?: string;
  address?: string;
  city?: string;
  postalCode?: string;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}

// =============================================================================
// User ViewModel (for member selection)
// =============================================================================

export interface UserVM {
  id: string;
  name: string;
  email: string;
}
