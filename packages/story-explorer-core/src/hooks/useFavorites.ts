'use client';

import { useState, useEffect, useCallback } from 'react';

const FAVORITES_KEY = 'story-explorer-favorites';

/**
 * Hook for managing favorite stories
 * Persists to localStorage
 */
export function useFavorites() {
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const [loaded, setLoaded] = useState(false);

  // Load favorites from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) {
          setFavorites(new Set(parsed));
        }
      }
    } catch {
      // Ignore parse errors
    }
    setLoaded(true);
  }, []);

  // Persist favorites to localStorage
  const persistFavorites = useCallback((newFavorites: Set<string>) => {
    try {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(Array.from(newFavorites)));
    } catch {
      // Ignore storage errors
    }
  }, []);

  // Toggle a story as favorite
  const toggleFavorite = useCallback(
    (storyId: string) => {
      setFavorites((prev) => {
        const next = new Set(prev);
        if (next.has(storyId)) {
          next.delete(storyId);
        } else {
          next.add(storyId);
        }
        persistFavorites(next);
        return next;
      });
    },
    [persistFavorites]
  );

  // Add a story to favorites
  const addFavorite = useCallback(
    (storyId: string) => {
      setFavorites((prev) => {
        if (prev.has(storyId)) return prev;
        const next = new Set(prev);
        next.add(storyId);
        persistFavorites(next);
        return next;
      });
    },
    [persistFavorites]
  );

  // Remove a story from favorites
  const removeFavorite = useCallback(
    (storyId: string) => {
      setFavorites((prev) => {
        if (!prev.has(storyId)) return prev;
        const next = new Set(prev);
        next.delete(storyId);
        persistFavorites(next);
        return next;
      });
    },
    [persistFavorites]
  );

  // Check if a story is favorited
  const isFavorite = useCallback((storyId: string) => favorites.has(storyId), [favorites]);

  // Clear all favorites
  const clearFavorites = useCallback(() => {
    setFavorites(new Set());
    persistFavorites(new Set());
  }, [persistFavorites]);

  return {
    favorites: Array.from(favorites),
    favoritesSet: favorites,
    loaded,
    toggleFavorite,
    addFavorite,
    removeFavorite,
    isFavorite,
    clearFavorites,
    count: favorites.size,
  };
}
