'use client';

import { useState, useEffect, useCallback } from 'react';

const APPROVAL_KEY = 'story-explorer-approvals';

/**
 * Approval status for a story
 */
export type ApprovalStatus = 'pending' | 'approved' | 'changes_requested' | 'not_reviewed';

/**
 * Approval record for a story
 */
export interface ApprovalRecord {
  storyId: string;
  status: ApprovalStatus;
  reviewer?: string;
  comment?: string;
  updatedAt: string;
}

/**
 * Approval state keyed by story ID
 */
export type ApprovalState = Record<string, ApprovalRecord>;

/**
 * Hook for managing story approval workflow
 * Persists to localStorage
 */
export function useApproval() {
  const [approvals, setApprovals] = useState<ApprovalState>({});
  const [loaded, setLoaded] = useState(false);

  // Load approvals from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(APPROVAL_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (typeof parsed === 'object' && parsed !== null) {
          setApprovals(parsed);
        }
      }
    } catch {
      // Ignore parse errors
    }
    setLoaded(true);
  }, []);

  // Persist approvals to localStorage
  const persistApprovals = useCallback((newApprovals: ApprovalState) => {
    try {
      localStorage.setItem(APPROVAL_KEY, JSON.stringify(newApprovals));
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Set approval status for a story
  const setApprovalStatus = useCallback(
    (storyId: string, status: ApprovalStatus, reviewer?: string, comment?: string) => {
      setApprovals((prev) => {
        const next = {
          ...prev,
          [storyId]: {
            storyId,
            status,
            reviewer,
            comment,
            updatedAt: new Date().toISOString(),
          },
        };
        persistApprovals(next);
        return next;
      });
    },
    [persistApprovals]
  );

  // Get approval status for a story
  const getApprovalStatus = useCallback(
    (storyId: string): ApprovalRecord | undefined => {
      return approvals[storyId];
    },
    [approvals]
  );

  // Clear approval for a story
  const clearApproval = useCallback(
    (storyId: string) => {
      setApprovals((prev) => {
        const { [storyId]: _, ...rest } = prev;
        persistApprovals(rest);
        return rest;
      });
    },
    [persistApprovals]
  );

  // Clear all approvals
  const clearAllApprovals = useCallback(() => {
    setApprovals({});
    persistApprovals({});
  }, [persistApprovals]);

  // Get stories by approval status
  const getStoriesByStatus = useCallback(
    (status: ApprovalStatus): string[] => {
      return Object.entries(approvals)
        .filter(([_, record]) => record.status === status)
        .map(([id]) => id);
    },
    [approvals]
  );

  // Get approval statistics
  const getStats = useCallback(() => {
    const stats = {
      total: Object.keys(approvals).length,
      pending: 0,
      approved: 0,
      changes_requested: 0,
      not_reviewed: 0,
    };
    for (const record of Object.values(approvals)) {
      stats[record.status]++;
    }
    return stats;
  }, [approvals]);

  return {
    approvals,
    loaded,
    setApprovalStatus,
    getApprovalStatus,
    clearApproval,
    clearAllApprovals,
    getStoriesByStatus,
    getStats,
  };
}
