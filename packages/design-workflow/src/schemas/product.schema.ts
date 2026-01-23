import { z } from 'zod';

// ============================================
// BASE SCHEMAS
// ============================================

export const colorSchema = z.enum(['accent', 'neutral', 'brand1', 'brand2', 'brand3']);
export const sizeSchema = z.enum(['sm', 'md', 'lg']);

export const componentCategorySchema = z.enum([
  'primitives',
  'composed',
  'blocks',
  'shells',
  'patterns',
]);

// ============================================
// COMPONENT SCHEMA
// ============================================

// Define base component spec without recursion first
const baseComponentSpecSchema = z.object({
  type: z.string().describe('Component type from @xala-technologies/platform-ui'),
  category: componentCategorySchema.describe('Component category'),
  name: z.string().describe('Instance name for this component'),
  purpose: z.string().describe('What this component does in context'),
  props: z.object({
    'data-color': colorSchema.optional(),
    'data-size': sizeSchema.optional(),
  }).passthrough().optional(),
  variants: z.array(z.string()).optional(),
});

// Add recursive children type
export type ComponentSpec = z.infer<typeof baseComponentSpecSchema> & {
  children?: ComponentSpec[];
};

export const componentSpecSchema: z.ZodType<ComponentSpec> = baseComponentSpecSchema.extend({
  children: z.lazy(() => z.array(componentSpecSchema)).optional(),
});

// ============================================
// DATA MODEL SCHEMA
// ============================================

export const fieldSchema = z.object({
  name: z.string(),
  type: z.string(),
  required: z.boolean().default(true),
  description: z.string().optional(),
});

export const entitySchema = z.object({
  name: z.string(),
  description: z.string(),
  fields: z.array(fieldSchema),
  relationships: z.array(z.object({
    entity: z.string(),
    type: z.enum(['one-to-one', 'one-to-many', 'many-to-many']),
    field: z.string(),
  })).optional(),
});

export const dataModelSchema = z.object({
  entities: z.array(entitySchema),
});

export type Field = z.infer<typeof fieldSchema>;
export type Entity = z.infer<typeof entitySchema>;
export type DataModel = z.infer<typeof dataModelSchema>;

// ============================================
// SECTION SCHEMA
// ============================================

export const userStorySchema = z.object({
  as: z.string().describe('User role'),
  want: z.string().describe('Desired action'),
  so: z.string().describe('Expected benefit'),
});

export const screenStateSchema = z.enum(['loading', 'empty', 'populated', 'error', 'success']);

export const sectionSpecSchema = z.object({
  name: z.string(),
  description: z.string(),
  userStories: z.array(userStorySchema),
  components: z.array(componentSpecSchema),
  dataRequirements: z.array(z.object({
    entity: z.string(),
    fields: z.array(z.string()),
    operations: z.array(z.enum(['read', 'create', 'update', 'delete'])).optional(),
  })).optional(),
  states: z.array(screenStateSchema).default(['loading', 'empty', 'populated', 'error']),
  routes: z.array(z.object({
    path: z.string(),
    name: z.string(),
    description: z.string().optional(),
  })).optional(),
});

export type UserStory = z.infer<typeof userStorySchema>;
export type ScreenState = z.infer<typeof screenStateSchema>;
export type SectionSpec = z.infer<typeof sectionSpecSchema>;

// ============================================
// PRODUCT SCHEMA
// ============================================

export const productVisionSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  description: z.string(),
  problemStatement: z.string(),
  targetUsers: z.array(z.object({
    name: z.string(),
    description: z.string(),
    needs: z.array(z.string()),
  })),
  keyFeatures: z.array(z.object({
    name: z.string(),
    description: z.string(),
  })),
  successMetrics: z.array(z.string()).optional(),
});

export const roadmapItemSchema = z.object({
  name: z.string(),
  description: z.string(),
  priority: z.enum(['critical', 'high', 'medium', 'low']),
  status: z.enum(['planned', 'in-progress', 'completed']).default('planned'),
  dependencies: z.array(z.string()).optional(),
});

export const productRoadmapSchema = z.object({
  phases: z.array(z.object({
    name: z.string(),
    description: z.string().optional(),
    sections: z.array(roadmapItemSchema),
  })),
});

export const techStackSchema = z.object({
  frontend: z.object({
    framework: z.string().default('React'),
    ui: z.string().default('@xala-technologies/platform-ui'),
    styling: z.string().default('Designsystemet CSS'),
    state: z.string().optional(),
    routing: z.string().optional(),
  }),
  backend: z.object({
    runtime: z.string().optional(),
    framework: z.string().optional(),
    database: z.string().optional(),
    auth: z.string().optional(),
  }).optional(),
  infrastructure: z.object({
    hosting: z.string().optional(),
    ci: z.string().optional(),
  }).optional(),
});

export const productPlanSchema = z.object({
  vision: productVisionSchema,
  roadmap: productRoadmapSchema,
  dataModel: dataModelSchema,
  techStack: techStackSchema,
  sections: z.array(sectionSpecSchema),
  theme: z.object({
    accent: z.string().optional(),
    neutral: z.string().optional(),
    brand1: z.string().optional(),
    brand2: z.string().optional(),
    brand3: z.string().optional(),
  }).optional(),
});

export type ProductVision = z.infer<typeof productVisionSchema>;
export type RoadmapItem = z.infer<typeof roadmapItemSchema>;
export type ProductRoadmap = z.infer<typeof productRoadmapSchema>;
export type TechStack = z.infer<typeof techStackSchema>;
export type ProductPlan = z.infer<typeof productPlanSchema>;

// ============================================
// EXPORT SCHEMA
// ============================================

export const exportConfigSchema = z.object({
  mode: z.enum(['oneshot', 'incremental']),
  includeStorybook: z.boolean().default(true),
  includeTests: z.boolean().default(true),
  outputDir: z.string().default('./export'),
});

export type ExportConfig = z.infer<typeof exportConfigSchema>;
