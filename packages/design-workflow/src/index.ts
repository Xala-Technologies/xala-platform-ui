/**
 * @xala/design-workflow
 * 
 * AI-guided design workflow for @xala-technologies/platform-ui
 * 
 * This package provides:
 * - Schemas for product planning and section specs
 * - Component adapter for Xala Platform UI
 * - Export generators for implementation handoff
 * - Claude Code slash commands and prompts
 */

// Adapters
export {
  componentMap,
  type ComponentMapping,
  type ComponentType,
  getComponentMapping,
  isValidComponentType,
  getComponentsByCategory,
  generateImports,
  colorOptions,
  type ColorOption,
  sizeOptions,
  type SizeOption,
} from './adapters/index.js';

// Schemas
export {
  // Base
  colorSchema,
  sizeSchema,
  componentCategorySchema,
  
  // Component
  componentSpecSchema,
  type ComponentSpec,
  
  // Data Model
  fieldSchema,
  entitySchema,
  dataModelSchema,
  type Field,
  type Entity,
  type DataModel,
  
  // Section
  userStorySchema,
  screenStateSchema,
  sectionSpecSchema,
  type UserStory,
  type ScreenState,
  type SectionSpec,
  
  // Product
  productVisionSchema,
  roadmapItemSchema,
  productRoadmapSchema,
  techStackSchema,
  productPlanSchema,
  type ProductVision,
  type RoadmapItem,
  type ProductRoadmap,
  type TechStack,
  type ProductPlan,
  
  // Export
  exportConfigSchema,
  type ExportConfig,
} from './schemas/index.js';

// Generators
export {
  generateOneShotPrompt,
  generateSectionPrompt,
  generateIncrementalPrompts,
  generateSectionIndex,
  generateStorybookStories,
  generateComponentDocs,
  generateStorybookPreview,
} from './generators/index.js';
