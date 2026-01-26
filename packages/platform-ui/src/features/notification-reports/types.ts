/**
 * Notification Reports Types
 *
 * @module @xala-technologies/platform-ui/features/notification-reports
 */

/**
 * Delivery report data structure
 */
export interface DeliveryReport {
  id: string;
  type: 'email' | 'sms' | 'push' | 'in_app';
  recipient: string;
  subject?: string;
  status: 'sent' | 'delivered' | 'pending' | 'failed';
  attemptCount: number;
  lastAttemptAt?: string;
  createdAt: string;
}

/**
 * Delivery stats summary
 */
export interface DeliveryStats {
  total: number;
  sent: number;
  pending: number;
  failed: number;
}

/**
 * Query parameters for filtering reports
 */
export interface DeliveryReportFilters {
  search?: string;
  status?: DeliveryReport['status'];
  type?: DeliveryReport['type'];
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}
