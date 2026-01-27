/**
 * ApprovalFlow Block
 *
 * Workflow approval panel with approve/reject actions and checklist.
 * Uses design tokens only.
 */

import * as React from 'react';
import { forwardRef, useState, useCallback } from 'react';
import { Card, Heading, Paragraph, Button, Checkbox } from '../primitives';
import {
  CheckmarkCircleIcon,
  XMarkIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@navikt/aksel-icons';
import { cn } from '../utils';
import { Stack } from '../primitives';

export interface ApprovalItem {
  id: string;
  title: string;
  description?: string;
  type: 'file' | 'component' | 'change';
}

export interface ChecklistItem {
  id: string;
  label: string;
  checked: boolean;
  required?: boolean;
}

export interface ApprovalFlowProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Items to approve */
  items?: ApprovalItem[];
  /** Checklist items that must be completed */
  checklistItems?: ChecklistItem[];
  /** IDs of disabled checklist items */
  disabledItems?: string[];
  /** Approval/revision data (generic) */
  approval?: unknown;
  revision?: unknown;
  /** Modal control */
  open?: boolean;
  onClose?: () => void;
  /** Callbacks */
  onApprove?: () => void;
  onReject?: (reason: string) => void;
  onChecklistToggle?: (itemId: string, checked: boolean) => void;
  onChecklistChange?: (itemId: string, checked: boolean) => void;
  /** Loading state */
  isLoading?: boolean;
  /** Labels */
  labels?: {
    approve?: string;
    reject?: string;
    checklist?: string;
    reasonPlaceholder?: string;
  };
}

export const ApprovalFlow = forwardRef<HTMLDivElement, ApprovalFlowProps>(
  (
    {
      items = [],
      checklistItems = [],
      disabledItems = [],
      onApprove,
      onReject,
      onChecklistToggle,
      onChecklistChange,
      isLoading = false,
      labels = {},
      className,
      ...props
    },
    ref
  ) => {
    const [expanded, setExpanded] = useState(true);
    const [rejectReason, setRejectReason] = useState('');

    const handleChecklistChange = useCallback(
      (itemId: string, checked: boolean) => {
        onChecklistToggle?.(itemId, checked);
        onChecklistChange?.(itemId, checked);
      },
      [onChecklistToggle, onChecklistChange]
    );

    const allChecked = checklistItems.every((item) => item.checked || !item.required);

    // Filter out data-size to avoid type conflict with Card
    const { 'data-size': _dataSize, ...cardProps } = props as Record<string, unknown>;

    return (
      <Card
        ref={ref}
        className={cn('ds-approval-flow', className)}
        data-color="neutral"
        {...cardProps}
      >
        <Card.Block>
          <Stack
            direction="horizontal"
            align="center"
            justify="between"
            style={{ cursor: 'pointer' }}
            onClick={() => setExpanded(!expanded)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                setExpanded(!expanded);
              }
            }}
            role="button"
            tabIndex={0}
            aria-expanded={expanded}
          >
            <Heading level={3} data-size="sm">
              {labels.checklist || 'Approval Checklist'}
            </Heading>
            {expanded ? <ChevronUpIcon /> : <ChevronDownIcon />}
          </Stack>
        </Card.Block>

        {expanded && (
          <>
            {/* Items to approve */}
            {items.length > 0 && (
              <Card.Block>
                <Heading level={4} data-size="xs">
                  Changes ({items.length})
                </Heading>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}
                >
                  {items.map((item) => (
                    <div
                      key={item.id}
                      style={{
                        padding: 'var(--ds-spacing-2)',
                        background: 'var(--ds-color-neutral-background-subtle)',
                        borderRadius: 'var(--ds-border-radius-md)',
                      }}
                    >
                      <Paragraph data-size="sm">{item.title}</Paragraph>
                      {item.description && (
                        <Paragraph data-size="xs" style={{ opacity: 0.7 }}>
                          {item.description}
                        </Paragraph>
                      )}
                    </div>
                  ))}
                </div>
              </Card.Block>
            )}

            {/* Checklist */}
            {checklistItems.length > 0 && (
              <Card.Block>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 'var(--ds-spacing-2)' }}
                >
                  {checklistItems.map((item) => (
                    <Checkbox
                      key={item.id}
                      label={`${item.label}${item.required ? ' *' : ''}`}
                      checked={item.checked}
                      disabled={disabledItems.includes(item.id)}
                      onChange={(e) => handleChecklistChange(item.id, e.target.checked)}
                    />
                  ))}
                </div>
              </Card.Block>
            )}

            {/* Rejection reason */}
            <Card.Block>
              <textarea
                placeholder={labels.reasonPlaceholder || 'Reason for rejection (optional)'}
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                style={{
                  width: '100%',
                  minHeight: '80px',
                  padding: 'var(--ds-spacing-2)',
                  borderRadius: 'var(--ds-border-radius-md)',
                  border: '1px solid var(--ds-color-neutral-border-default)',
                  fontFamily: 'inherit',
                }}
              />
            </Card.Block>

            {/* Actions */}
            <Card.Block>
              <div
                style={{ display: 'flex', gap: 'var(--ds-spacing-2)', justifyContent: 'flex-end' }}
              >
                <Button
                  variant="secondary"
                  data-color="danger"
                  onClick={() => onReject?.(rejectReason)}
                  disabled={isLoading}
                >
                  <XMarkIcon />
                  {labels.reject || 'Reject'}
                </Button>
                <Button
                  variant="primary"
                  data-color="success"
                  onClick={onApprove}
                  disabled={isLoading || !allChecked}
                >
                  <CheckmarkCircleIcon />
                  {labels.approve || 'Approve'}
                </Button>
              </div>
            </Card.Block>
          </>
        )}
      </Card>
    );
  }
);

ApprovalFlow.displayName = 'ApprovalFlow';

export default ApprovalFlow;
