/**
 * Schemas for spec artifact validation
 */

import { z } from 'zod';

/**
 * APPROVAL.json Schema
 */
export const approvalPhaseSchema = z.object({
  name: z.string(),
  status: z.enum(['pending', 'in_progress', 'approved', 'rejected']),
  requiredApprovals: z.array(z.string()),
  approvals: z.array(
    z.object({
      role: z.string(),
      approver: z.string(),
      timestamp: z.string(),
      comment: z.string().optional(),
    })
  ),
  artifacts: z.array(z.string()),
});

export const approvalSchema = z.object({
  $schema: z.string().optional(),
  componentName: z.string(),
  version: z.string(),
  status: z.enum(['draft', 'in_review', 'approved', 'implemented', 'rejected']),
  createdAt: z.string(),
  updatedAt: z.string(),
  workflow: z.object({
    currentPhase: z.string(),
    phases: z.array(approvalPhaseSchema),
  }),
  approvals: z.array(
    z.object({
      phase: z.string(),
      role: z.string(),
      approver: z.string(),
      timestamp: z.string(),
      comment: z.string().optional(),
    })
  ),
  comments: z.array(
    z.object({
      author: z.string(),
      timestamp: z.string(),
      content: z.string(),
    })
  ),
  blockers: z.array(
    z.object({
      id: z.string(),
      description: z.string(),
      status: z.enum(['open', 'resolved']),
      createdAt: z.string(),
      resolvedAt: z.string().optional(),
    })
  ),
  labels: z.object({
    github: z.string(),
    priority: z.enum(['low', 'medium', 'high', 'critical']),
    layer: z.string(),
    complexity: z.enum(['simple', 'medium', 'complex']),
  }),
  metadata: z.object({
    specAuthor: z.string(),
    designOwner: z.string(),
    technicalOwner: z.string(),
    targetVersion: z.string(),
    relatedIssues: z.array(z.string()),
    relatedPRs: z.array(z.string()),
  }),
  history: z.array(
    z.object({
      timestamp: z.string(),
      action: z.string(),
      actor: z.string(),
      details: z.string(),
    })
  ),
});

export type Approval = z.infer<typeof approvalSchema>;

/**
 * COMPOSE.json Schema
 */
interface ComponentRef {
  component: string;
  props?: Record<string, unknown>;
  dataAttributes?: Record<string, string>;
  slot?: string;
  role?: string;
  children?: ComponentRef[];
}

export const componentRefSchema: z.ZodType<ComponentRef> = z.object({
  component: z.string(),
  props: z.record(z.unknown()).optional(),
  dataAttributes: z.record(z.string()).optional(),
  slot: z.string().optional(),
  role: z.string().optional(),
  children: z.lazy(() => z.array(componentRefSchema)).optional(),
});

export const composeSchema = z.object({
  $schema: z.string().optional(),
  componentName: z.string(),
  version: z.string(),
  layer: z.string(),
  level: z.number(),
  description: z.string(),
  status: z.enum(['draft', 'in_review', 'approved', 'implemented']),
  designsystemetComponents: z.array(
    z.object({
      name: z.string(),
      importPath: z.string(),
      purpose: z.string(),
    })
  ),
  internalComponents: z.array(
    z.object({
      name: z.string(),
      layer: z.string(),
      purpose: z.string(),
    })
  ),
  composition: z.object({
    root: componentRefSchema,
  }),
  props: z.record(
    z.object({
      type: z.string(),
      required: z.boolean().optional(),
      default: z.unknown().optional(),
      enum: z.array(z.string()).optional(),
      description: z.string(),
      signature: z.string().optional(),
    })
  ),
  slots: z.record(
    z.object({
      description: z.string(),
      required: z.boolean(),
    })
  ),
  states: z.record(
    z.object({
      description: z.string(),
      dataAttributes: z.record(z.string()),
    })
  ),
  accessibility: z.object({
    role: z.string().nullable(),
    ariaLabel: z.string().optional(),
    ariaDescribedBy: z.string().optional(),
    keyboardNavigation: z.record(z.string()),
    focusManagement: z.string(),
  }),
  styling: z.object({
    customProperties: z.array(z.string()),
    dataAttributeVariants: z.record(z.array(z.string())),
  }),
});

export type Compose = z.infer<typeof composeSchema>;

/**
 * TESTIDS.json Schema
 */
export const testIdSchema = z.object({
  id: z.string(),
  description: z.string(),
  element: z.string(),
  required: z.boolean(),
  visibleWhen: z.string().optional(),
});

export const dynamicTestIdSchema = z.object({
  pattern: z.string(),
  description: z.string(),
  element: z.string(),
  example: z.string(),
});

export const testIdsSchema = z.object({
  $schema: z.string().optional(),
  componentName: z.string(),
  version: z.string(),
  prefix: z.string(),
  description: z.string(),
  testIds: z.record(testIdSchema),
  dynamicTestIds: z.record(dynamicTestIdSchema).optional(),
  conventions: z.object({
    prefix: z.string(),
    separator: z.string(),
    indexing: z.string(),
    naming: z.string(),
  }),
  usage: z.object({
    playwright: z.string(),
    testingLibrary: z.string(),
    cypress: z.string(),
  }),
});

export type TestIds = z.infer<typeof testIdsSchema>;
