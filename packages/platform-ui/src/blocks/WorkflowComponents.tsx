/**
 * Workflow Components
 *
 * Blocks for design workflow visualization in command-center apps.
 * No inline styles - everything uses design tokens.
 */

import * as React from 'react';
import { forwardRef } from 'react';
import { Card, Heading, Paragraph, Button } from '@digdir/designsystemet-react';
import { Stack } from '../primitives/stack';
import { ArrowRightIcon } from '../primitives/icons';
import { StatusTag } from './StatusBadges';

// =============================================================================
// WorkflowStep - Numbered step indicator
// =============================================================================

export interface WorkflowStepProps {
  /** Step number */
  step: number;
  /** Step name */
  name: string;
  /** Whether this is the active step */
  active?: boolean;
}

export const WorkflowStep = forwardRef<HTMLDivElement, WorkflowStepProps>(
  ({ step, name, active = false }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 'var(--ds-spacing-2)',
          padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
          backgroundColor: active
            ? 'var(--ds-color-accent-surface-hover)'
            : 'var(--ds-color-accent-surface-default)',
          borderRadius: 'var(--ds-border-radius-md)',
        }}
      >
        <div
          style={{
            width: 'var(--ds-spacing-6)',
            height: 'var(--ds-spacing-6)',
            borderRadius: 'var(--ds-border-radius-full)',
            backgroundColor: 'var(--ds-color-accent-base-default)',
            color: 'var(--ds-color-accent-contrast-default)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: 'var(--ds-font-size-xs)',
            fontWeight: 'var(--ds-font-weight-semibold)',
          }}
        >
          {step}
        </div>
        <Paragraph data-size="sm" style={{ margin: 0 }}>
          {name}
        </Paragraph>
      </div>
    );
  }
);

WorkflowStep.displayName = 'WorkflowStep';

// =============================================================================
// WorkflowPipeline - Horizontal step indicators with arrows
// =============================================================================

export interface WorkflowPipelineProps {
  steps: Array<{ step: number; name: string }>;
  activeStep?: number;
}

export function WorkflowPipeline({ steps, activeStep }: WorkflowPipelineProps) {
  return (
    <Stack direction="horizontal" spacing="var(--ds-spacing-2)" align="center" wrap>
      {steps.map((step, index) => (
        <React.Fragment key={step.step}>
          <WorkflowStep step={step.step} name={step.name} active={step.step === activeStep} />
          {index < steps.length - 1 && (
            <div
              style={{
                color: 'var(--ds-color-neutral-text-subtle)',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              <ArrowRightIcon size={16} />
            </div>
          )}
        </React.Fragment>
      ))}
    </Stack>
  );
}

// =============================================================================
// WorkflowCard - Card displaying a workflow with command
// =============================================================================

export type WorkflowStatus = 'available' | 'coming_soon' | 'deprecated';

export interface WorkflowCardProps {
  /** Workflow name */
  name: string;
  /** Workflow description */
  description: string;
  /** CLI command */
  command: string;
  /** Workflow status */
  status: WorkflowStatus;
  /** Prerequisites list */
  prerequisites?: string[];
  /** Copy command handler */
  onCopyCommand?: () => void;
  /** View docs handler */
  onViewDocs?: () => void;
}

const statusColors: Record<WorkflowStatus, 'success' | 'warning' | 'neutral'> = {
  available: 'success',
  coming_soon: 'warning',
  deprecated: 'neutral',
};

const statusLabels: Record<WorkflowStatus, string> = {
  available: 'available',
  coming_soon: 'coming soon',
  deprecated: 'deprecated',
};

export function WorkflowCard({
  name,
  description,
  command,
  status,
  prerequisites = [],
  onCopyCommand,
  onViewDocs,
}: WorkflowCardProps) {
  return (
    <Card>
      <Stack spacing="var(--ds-spacing-3)" style={{ padding: 'var(--ds-spacing-4)' }}>
        <Stack direction="horizontal" justify="between" align="start">
          <Heading level={3} data-size="sm" style={{ margin: 0 }}>
            {name}
          </Heading>
          <StatusTag color={statusColors[status]} size="sm">
            {statusLabels[status]}
          </StatusTag>
        </Stack>

        <Paragraph data-size="sm" style={{ margin: 0 }}>
          {description}
        </Paragraph>

        <Paragraph
          data-size="sm"
          style={{
            margin: 0,
            backgroundColor: 'var(--ds-color-neutral-surface-default)',
            padding: 'var(--ds-spacing-2) var(--ds-spacing-3)',
            borderRadius: 'var(--ds-border-radius-sm)',
            fontFamily: 'var(--ds-font-family-mono, monospace)',
          }}
        >
          {command}
        </Paragraph>

        {prerequisites.length > 0 && (
          <Paragraph
            data-size="xs"
            style={{ margin: 0, color: 'var(--ds-color-neutral-text-subtle)' }}
          >
            Prerequisites: {prerequisites.join(', ')}
          </Paragraph>
        )}

        <Stack direction="horizontal" spacing="var(--ds-spacing-2)">
          <Button variant="primary" data-size="sm" onClick={onCopyCommand}>
            Copy Command
          </Button>
          <Button variant="secondary" data-size="sm" onClick={onViewDocs}>
            View Docs
          </Button>
        </Stack>
      </Stack>
    </Card>
  );
}

// =============================================================================
// CardGrid - Auto-fit grid for cards
// =============================================================================

export interface CardGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Minimum card width */
  minCardWidth?: string;
  /** Gap between cards */
  gap?: string;
  children: React.ReactNode;
}

export const CardGrid = forwardRef<HTMLDivElement, CardGridProps>(
  (
    {
      minCardWidth = 'var(--ds-sizing-80)',
      gap = 'var(--ds-spacing-4)',
      children,
      style,
      ...props
    },
    ref
  ) => {
    return (
      <Stack
        ref={ref}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(auto-fit, minmax(${minCardWidth}, 1fr))`,
          gap,
          ...style,
        }}
        {...props}
      >
        {children}
      </Stack>
    );
  }
);

CardGrid.displayName = 'CardGrid';

// =============================================================================
// ButtonGroup - Horizontal group of buttons
// =============================================================================

export interface ButtonGroupProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Gap between buttons */
  gap?: string;
  /** Alignment */
  align?: 'start' | 'center' | 'end';
  children: React.ReactNode;
}

export const ButtonGroup = forwardRef<HTMLElement, ButtonGroupProps>(
  ({ gap = 'var(--ds-spacing-2)', align = 'start', children, style, ...props }, ref) => {
    const justifyMap = {
      start: 'flex-start',
      center: 'center',
      end: 'flex-end',
    };

    return (
      <Stack
        ref={ref}
        direction="horizontal"
        gap={gap}
        justify={align === 'start' ? 'start' : align === 'center' ? 'center' : 'end'}
        style={style}
        {...props}
      >
        {children}
      </Stack>
    );
  }
);

ButtonGroup.displayName = 'ButtonGroup';

// =============================================================================
// FormGrid - Two-column grid for form fields
// =============================================================================

export interface FormGridProps extends React.HTMLAttributes<HTMLDivElement> {
  /** Number of columns */
  columns?: 1 | 2 | 3 | 4;
  /** Gap between fields */
  gap?: string;
  children: React.ReactNode;
}

export const FormGrid = forwardRef<HTMLElement, FormGridProps>(
  ({ columns = 2, gap = 'var(--ds-spacing-4)', children, style, ...props }, ref) => {
    return (
      <Stack
        ref={ref}
        style={{
          display: 'grid',
          gridTemplateColumns: `repeat(${columns}, 1fr)`,
          gap,
          ...style,
        }}
        {...props}
      >
        {children}
      </Stack>
    );
  }
);

FormGrid.displayName = 'FormGrid';

export default {
  WorkflowStep,
  WorkflowPipeline,
  WorkflowCard,
  CardGrid,
  ButtonGroup,
  FormGrid,
};
