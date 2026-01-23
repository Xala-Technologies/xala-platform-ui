/**
 * Approval Mock Data
 *
 * Extracted from ApprovalStatus.tsx for separation of concerns.
 * In production, these would come from API calls or state management.
 */

import type { BadgeColor } from '@xala-technologies/platform-ui';

export type ApprovalStatus = 'draft' | 'in_review' | 'approved' | 'implemented';

export interface Approval {
  component: string;
  status: ApprovalStatus;
  phase: string;
  owner: string;
  lastUpdate: string;
  blockers: number;
}

export const STATUS_BADGE_COLORS: Record<ApprovalStatus, BadgeColor> = {
  approved: 'success',
  implemented: 'success',
  in_review: 'info',
  draft: 'warning',
};

export const MOCK_APPROVALS: Approval[] = [
  {
    component: 'ResourceCard',
    status: 'approved',
    phase: 'implementation',
    owner: 'design-team',
    lastUpdate: '2 hours ago',
    blockers: 0,
  },
  {
    component: 'NotificationBell',
    status: 'in_review',
    phase: 'design_review',
    owner: 'platform-ui-maintainers',
    lastUpdate: '4 hours ago',
    blockers: 0,
  },
  {
    component: 'DataTable',
    status: 'draft',
    phase: 'specification',
    owner: 'design-team',
    lastUpdate: '1 day ago',
    blockers: 1,
  },
  {
    component: 'SlotCalendar',
    status: 'in_review',
    phase: 'qa_review',
    owner: 'qa-team',
    lastUpdate: '3 days ago',
    blockers: 0,
  },
  {
    component: 'UserMenu',
    status: 'implemented',
    phase: 'final_approval',
    owner: 'platform-seniors',
    lastUpdate: '1 week ago',
    blockers: 0,
  },
];

/** Get count of approvals by status */
export const getApprovalCountByStatus = (status: ApprovalStatus): number =>
  MOCK_APPROVALS.filter((a) => a.status === status).length;
