/**
 * GDPR Module - Types
 *
 * @module @xala-technologies/platform-ui/features/gdpr
 */

// =============================================================================
// Request Status
// =============================================================================

export type GdprRequestStatus = 'pending' | 'processing' | 'completed' | 'rejected';

// =============================================================================
// Request Types
// =============================================================================

export type GdprRequestType = 'export' | 'deletion';

// =============================================================================
// ViewModel Interfaces
// =============================================================================

/**
 * ViewModel for GDPR request display
 */
export interface GdprRequestVM {
  id: string;
  userId: string;
  requestType: GdprRequestType;
  status: GdprRequestStatus;
  requestedAt: string;
  expiresAt: string;
  processedAt?: string;
  processedBy?: string;
  metadata?: {
    rejectionReason?: string;
    [key: string]: unknown;
  };
}

/**
 * GDPR request with computed days remaining
 */
export interface GdprRequestWithDaysRemainingVM extends GdprRequestVM {
  daysRemaining: number;
}

// =============================================================================
// Sort Options
// =============================================================================

export interface GdprSortOption {
  id: string;
  label: string;
  field: 'daysRemaining' | 'requestedAt';
  order: 'asc' | 'desc';
}

// =============================================================================
// User Display
// =============================================================================

export interface GdprUserInfoVM {
  name: string;
  email?: string;
}
