/**
 * @xala-technologies/story-explorer-core
 *
 * Core utilities for Story Explorer - Storybook index parsing,
 * hooks for favorites, approval workflow, and compositions.
 *
 * @example
 * ```tsx
 * import { fetchStoryIndex, useFavorites, useApproval } from '@xala-technologies/story-explorer-core';
 *
 * // Fetch and parse Storybook index
 * const index = await fetchStoryIndex();
 *
 * // Use hooks in React components
 * function MyComponent() {
 *   const { isFavorite, toggleFavorite } = useFavorites();
 *   const { setApprovalStatus } = useApproval();
 *   // ...
 * }
 * ```
 */

// Library exports
export * from './lib';

// Hook exports
export * from './hooks';
