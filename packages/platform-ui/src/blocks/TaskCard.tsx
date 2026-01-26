/**
 * TaskCard Block
 *
 * Display card for task with status, priority, phase, and complexity.
 * Used in Kanban boards, task lists, and task management UIs.
 */
import React from 'react';
import { Card, Paragraph, Heading } from '@digdir/designsystemet-react';
import { StatusTag } from './StatusBadges';
import type { BadgeColor } from './StatusBadges';
import {
  SparklesIcon,
  AlertTriangleIcon,
  RefreshIcon,
  BookOpenIcon,
  CheckCircleIcon,
  SettingsIcon,
} from '../primitives/icons';

// ============================================================================
// Types
// ============================================================================

export type TaskStatus = 'backlog' | 'todo' | 'in_progress' | 'review' | 'done' | 'blocked';
export type TaskPriority = 'low' | 'medium' | 'high' | 'critical';
export type TaskComplexity = 'trivial' | 'simple' | 'moderate' | 'complex' | 'epic';
export type TaskPhase = 'design' | 'development' | 'testing' | 'deployment' | 'maintenance';
export type TaskCategory = 'feature' | 'bug' | 'refactor' | 'docs' | 'test' | 'chore';

export interface TaskCardProps {
  title: string;
  description?: string;
  status: TaskStatus;
  priority?: TaskPriority;
  complexity?: TaskComplexity;
  phase?: TaskPhase;
  category?: TaskCategory;
  assignee?: string;
  dueDate?: Date;
  progress?: number;
  tags?: string[];
  onClick?: () => void;
  selected?: boolean;
  draggable?: boolean;
  className?: string;
}

// ============================================================================
// Constants
// ============================================================================

const STATUS_COLORS: Record<TaskStatus, BadgeColor> = {
  backlog: 'neutral',
  todo: 'info',
  in_progress: 'warning',
  review: 'info',
  done: 'success',
  blocked: 'danger',
};

const STATUS_LABELS: Record<TaskStatus, string> = {
  backlog: 'Backlog',
  todo: 'To Do',
  in_progress: 'In Progress',
  review: 'In Review',
  done: 'Done',
  blocked: 'Blocked',
};

const PRIORITY_COLORS: Record<TaskPriority, BadgeColor> = {
  low: 'neutral',
  medium: 'info',
  high: 'warning',
  critical: 'danger',
};

const PRIORITY_LABELS: Record<TaskPriority, string> = {
  low: 'Low',
  medium: 'Medium',
  high: 'High',
  critical: 'Critical',
};

const CATEGORY_ICONS: Record<TaskCategory, React.ReactNode> = {
  feature: <SparklesIcon size={14} />,
  bug: <AlertTriangleIcon size={14} />,
  refactor: <RefreshIcon size={14} />,
  docs: <BookOpenIcon size={14} />,
  test: <CheckCircleIcon size={14} />,
  chore: <SettingsIcon size={14} />,
};

const CATEGORY_LABELS: Record<TaskCategory, string> = {
  feature: 'Feature',
  bug: 'Bug',
  refactor: 'Refactor',
  docs: 'Docs',
  test: 'Test',
  chore: 'Chore',
};

// ============================================================================
// Component
// ============================================================================

export function TaskCard({
  title,
  description,
  status,
  priority,
  phase,
  category,
  assignee,
  dueDate,
  progress,
  tags,
  onClick,
  selected = false,
  draggable = false,
  className = '',
}: TaskCardProps) {
  const cardStyle: React.CSSProperties = {
    cursor: onClick ? 'pointer' : 'default',
    borderLeft: selected ? '3px solid var(--ds-color-accent-base-default)' : undefined,
    opacity: status === 'done' ? 0.7 : 1,
  };

  return (
    <Card
      data-color="neutral"
      onClick={onClick}
      style={cardStyle}
      className={className}
      draggable={draggable}
    >
      <Card.Block>
        {/* Header with category and priority */}
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
          {category && (
            <Paragraph
              data-size="sm"
              style={{ opacity: 0.7, display: 'flex', alignItems: 'center', gap: '0.25rem' }}
            >
              {CATEGORY_ICONS[category]}
              {CATEGORY_LABELS[category]}
            </Paragraph>
          )}
          {priority && (
            <StatusTag color={PRIORITY_COLORS[priority]} size="sm">
              {PRIORITY_LABELS[priority]}
            </StatusTag>
          )}
        </div>

        {/* Title */}
        <Heading data-size="xs" style={{ marginBottom: '0.5rem' }}>
          {title}
        </Heading>

        {/* Description */}
        {description && (
          <Paragraph data-size="sm" style={{ marginBottom: '0.75rem', opacity: 0.8 }}>
            {description.length > 100 ? `${description.slice(0, 100)}...` : description}
          </Paragraph>
        )}

        {/* Status badge */}
        <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
          <StatusTag color={STATUS_COLORS[status]} size="sm">
            {STATUS_LABELS[status]}
          </StatusTag>
          {phase && (
            <StatusTag color="neutral" size="sm">
              {phase}
            </StatusTag>
          )}
        </div>

        {/* Progress bar */}
        {progress !== undefined && (
          <div style={{ marginTop: '0.75rem' }}>
            <div
              style={{
                height: '4px',
                backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                borderRadius: '2px',
                overflow: 'hidden',
              }}
            >
              <div
                style={{
                  height: '100%',
                  width: `${progress}%`,
                  backgroundColor: 'var(--ds-color-accent-base-default)',
                  transition: 'width 0.3s ease',
                }}
              />
            </div>
          </div>
        )}

        {/* Footer with assignee and due date */}
        {(assignee || dueDate) && (
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '0.75rem',
              opacity: 0.7,
            }}
          >
            {assignee && <Paragraph data-size="sm">{assignee}</Paragraph>}
            {dueDate && <Paragraph data-size="sm">{dueDate.toLocaleDateString()}</Paragraph>}
          </div>
        )}

        {/* Tags */}
        {tags && tags.length > 0 && (
          <div style={{ display: 'flex', gap: '0.25rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
            {tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontSize: '0.75rem',
                  padding: '0.125rem 0.375rem',
                  backgroundColor: 'var(--ds-color-neutral-surface-hover)',
                  borderRadius: '0.25rem',
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}
      </Card.Block>
    </Card>
  );
}

export default TaskCard;
