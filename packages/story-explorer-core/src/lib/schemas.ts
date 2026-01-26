/**
 * Zod Schemas for Storybook Index Validation
 */

import { z } from 'zod';

/**
 * Schema for a single story entry (v5 format)
 */
export const StoryEntrySchema = z.object({
  id: z.string(),
  title: z.string(),
  name: z.string(),
  type: z.enum(['story', 'docs']),
  importPath: z.string(),
  tags: z.array(z.string()).optional().default([]),
  // Optional fields that may exist
  storiesImports: z.array(z.string()).optional(),
});

/**
 * Schema for the full index (v5 format with entries object)
 */
export const StoryIndexV5Schema = z.object({
  v: z.number(),
  entries: z.record(z.string(), StoryEntrySchema),
});

/**
 * Legacy schema for v4 format (array-based)
 */
export const StoryIndexV4Schema = z.object({
  v: z.number().optional(),
  stories: z.record(
    z.string(),
    z.object({
      id: z.string(),
      title: z.string(),
      name: z.string(),
      importPath: z.string(),
      kind: z.string().optional(),
      story: z.string().optional(),
      parameters: z.record(z.unknown()).optional(),
    })
  ),
});

/**
 * Union schema that accepts both formats
 */
export const StoryIndexSchema = z.union([StoryIndexV5Schema, StoryIndexV4Schema]);

/**
 * Type exports
 */
export type StoryEntryRaw = z.infer<typeof StoryEntrySchema>;
export type StoryIndexV5Raw = z.infer<typeof StoryIndexV5Schema>;
export type StoryIndexV4Raw = z.infer<typeof StoryIndexV4Schema>;
export type StoryIndexRaw = z.infer<typeof StoryIndexSchema>;

/**
 * Check if index is v5 format
 */
export function isV5Index(index: StoryIndexRaw): index is StoryIndexV5Raw {
  return 'entries' in index;
}

/**
 * Check if index is v4 format
 */
export function isV4Index(index: StoryIndexRaw): index is StoryIndexV4Raw {
  return 'stories' in index;
}
