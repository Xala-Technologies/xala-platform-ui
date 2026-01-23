/**
 * Dashboard Mock Data
 *
 * Extracted from Dashboard.tsx for separation of concerns.
 * In production, these would come from API calls or state management.
 */

import type { TimelineItem } from '@xala-technologies/platform-ui';
import {
  FileTextIcon,
  SearchIcon,
  CheckCircleIcon,
  DownloadIcon,
} from '@xala-technologies/platform-ui';

export interface DashboardStat {
  label: string;
  value: number;
}

export interface QuickAction {
  title: string;
  description: string;
  action: string;
  icon: typeof FileTextIcon;
}

export const DASHBOARD_STATS: DashboardStat[] = [
  { label: 'Active Workflows', value: 3 },
  { label: 'Pending Approvals', value: 5 },
  { label: 'Components in Spec', value: 12 },
  { label: 'Approved', value: 24 },
];

export const QUICK_ACTIONS: QuickAction[] = [
  {
    title: 'New Component Spec',
    description: 'Start designing a new component specification',
    action: '/specs/new',
    icon: FileTextIcon,
  },
  {
    title: 'Run Verification',
    description: 'Verify boundaries and design tokens',
    action: 'verify',
    icon: SearchIcon,
  },
  {
    title: 'Check Approvals',
    description: 'Review pending approval requests',
    action: '/approvals',
    icon: CheckCircleIcon,
  },
  {
    title: 'Export Prompts',
    description: 'Generate implementation prompts',
    action: 'export',
    icon: DownloadIcon,
  },
];

export const RECENT_ACTIVITY: TimelineItem[] = [
  {
    id: '1',
    type: 'success',
    title: 'ResourceCard spec approved',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '2',
    type: 'info',
    title: 'NotificationBell moved to review',
    timestamp: new Date(Date.now() - 4 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '3',
    type: 'default',
    title: 'DataTable spec created',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: '4',
    type: 'warning',
    title: 'Boundary violation fixed in Modal',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000).toISOString(),
  },
];
