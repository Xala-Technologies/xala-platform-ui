'use client';

import { useState, useEffect, useCallback } from 'react';

const COMPOSITIONS_KEY = 'story-explorer-compositions';

/**
 * A story within a composition with optional notes
 */
export interface CompositionStory {
  storyId: string;
  note?: string;
  order: number;
}

/**
 * A composition (curated collection of stories)
 */
export interface Composition {
  id: string;
  name: string;
  description?: string;
  stories: CompositionStory[];
  createdAt: string;
  updatedAt: string;
}

/**
 * Compositions state keyed by ID
 */
export type CompositionsState = Record<string, Composition>;

/**
 * Generate a unique ID
 */
function generateId(): string {
  return `comp_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Hook for managing story compositions (curated collections)
 * Persists to localStorage
 */
export function useCompositions() {
  const [compositions, setCompositions] = useState<CompositionsState>({});
  const [loaded, setLoaded] = useState(false);

  // Load compositions from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(COMPOSITIONS_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (typeof parsed === 'object' && parsed !== null) {
          setCompositions(parsed);
        }
      }
    } catch {
      // Ignore parse errors
    }
    setLoaded(true);
  }, []);

  // Persist compositions to localStorage
  const persistCompositions = useCallback((newCompositions: CompositionsState) => {
    try {
      localStorage.setItem(COMPOSITIONS_KEY, JSON.stringify(newCompositions));
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Create a new composition
  const createComposition = useCallback(
    (name: string, description?: string): Composition => {
      const now = new Date().toISOString();
      const composition: Composition = {
        id: generateId(),
        name,
        description,
        stories: [],
        createdAt: now,
        updatedAt: now,
      };
      setCompositions((prev) => {
        const next = { ...prev, [composition.id]: composition };
        persistCompositions(next);
        return next;
      });
      return composition;
    },
    [persistCompositions]
  );

  // Update a composition
  const updateComposition = useCallback(
    (id: string, updates: Partial<Pick<Composition, 'name' | 'description'>>) => {
      setCompositions((prev) => {
        if (!prev[id]) return prev;
        const next = {
          ...prev,
          [id]: {
            ...prev[id],
            ...updates,
            updatedAt: new Date().toISOString(),
          },
        };
        persistCompositions(next);
        return next;
      });
    },
    [persistCompositions]
  );

  // Delete a composition
  const deleteComposition = useCallback(
    (id: string) => {
      setCompositions((prev) => {
        const { [id]: _, ...rest } = prev;
        persistCompositions(rest);
        return rest;
      });
    },
    [persistCompositions]
  );

  // Add a story to a composition
  const addStoryToComposition = useCallback(
    (compositionId: string, storyId: string, note?: string) => {
      setCompositions((prev) => {
        const composition = prev[compositionId];
        if (!composition) return prev;

        // Check if story already exists
        if (composition.stories.some((s) => s.storyId === storyId)) {
          return prev;
        }

        const next = {
          ...prev,
          [compositionId]: {
            ...composition,
            stories: [
              ...composition.stories,
              {
                storyId,
                note,
                order: composition.stories.length,
              },
            ],
            updatedAt: new Date().toISOString(),
          },
        };
        persistCompositions(next);
        return next;
      });
    },
    [persistCompositions]
  );

  // Remove a story from a composition
  const removeStoryFromComposition = useCallback(
    (compositionId: string, storyId: string) => {
      setCompositions((prev) => {
        const composition = prev[compositionId];
        if (!composition) return prev;

        const next = {
          ...prev,
          [compositionId]: {
            ...composition,
            stories: composition.stories
              .filter((s) => s.storyId !== storyId)
              .map((s, i) => ({ ...s, order: i })),
            updatedAt: new Date().toISOString(),
          },
        };
        persistCompositions(next);
        return next;
      });
    },
    [persistCompositions]
  );

  // Update a story's note in a composition
  const updateStoryNote = useCallback(
    (compositionId: string, storyId: string, note: string | undefined) => {
      setCompositions((prev) => {
        const composition = prev[compositionId];
        if (!composition) return prev;

        const next = {
          ...prev,
          [compositionId]: {
            ...composition,
            stories: composition.stories.map((s) =>
              s.storyId === storyId ? { ...s, note } : s
            ),
            updatedAt: new Date().toISOString(),
          },
        };
        persistCompositions(next);
        return next;
      });
    },
    [persistCompositions]
  );

  // Reorder stories in a composition
  const reorderStories = useCallback(
    (compositionId: string, fromIndex: number, toIndex: number) => {
      setCompositions((prev) => {
        const composition = prev[compositionId];
        if (!composition) return prev;

        const stories = [...composition.stories];
        const [removed] = stories.splice(fromIndex, 1);
        stories.splice(toIndex, 0, removed);

        const next = {
          ...prev,
          [compositionId]: {
            ...composition,
            stories: stories.map((s, i) => ({ ...s, order: i })),
            updatedAt: new Date().toISOString(),
          },
        };
        persistCompositions(next);
        return next;
      });
    },
    [persistCompositions]
  );

  // Get a composition by ID
  const getComposition = useCallback(
    (id: string): Composition | undefined => {
      return compositions[id];
    },
    [compositions]
  );

  // Get all compositions as array
  const getCompositionsList = useCallback((): Composition[] => {
    return Object.values(compositions).sort(
      (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime()
    );
  }, [compositions]);

  return {
    compositions,
    loaded,
    createComposition,
    updateComposition,
    deleteComposition,
    addStoryToComposition,
    removeStoryFromComposition,
    updateStoryNote,
    reorderStories,
    getComposition,
    getCompositionsList,
    count: Object.keys(compositions).length,
  };
}
