/**
 * useSavedSearches - localStorage-based saved search filters for web app
 *
 * Allows users to save, load, and delete search filter configurations.
 * Persists to localStorage for anonymous users.
 */

import { useState, useCallback, useEffect } from 'react';

const STORAGE_KEY = 'digilist-saved-searches';
const MAX_SAVED_SEARCHES = 10;

export interface SearchFilters {
  /** Search query text */
  query?: string;
  /** Selected category */
  category?: string;
  /** Selected city/area */
  area?: string;
  /** Selected capacity filter */
  capacity?: string;
  /** Selected amenities */
  amenities?: string[];
}

export interface SavedSearch {
  /** Unique identifier */
  id: string;
  /** User-defined name for this search */
  name: string;
  /** The saved filter values */
  filters: SearchFilters;
  /** When this search was saved */
  createdAt: string;
  /** When this search was last used */
  lastUsedAt?: string;
}

export type SavedSearchFilters = SearchFilters;

/**
 * Hook for managing saved searches in localStorage
 */
export function useSavedSearches() {
  const [savedSearches, setSavedSearches] = useState<SavedSearch[]>([]);

  // Load saved searches from localStorage on mount
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as SavedSearch[];
        setSavedSearches(parsed);
      }
    } catch {
      // If localStorage fails, start with empty list
      setSavedSearches([]);
    }
  }, []);

  // Persist to localStorage whenever savedSearches changes
  const persistToStorage = useCallback((searches: SavedSearch[]) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(searches));
    } catch {
      // localStorage might be full or disabled
      console.warn('Failed to persist saved searches to localStorage');
    }
  }, []);

  /**
   * Save a new search with given filters
   */
  const saveSearch = useCallback(
    (name: string, filters: SearchFilters): SavedSearch => {
      const newSearch: SavedSearch = {
        id: `search-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
        name,
        filters,
        createdAt: new Date().toISOString(),
      };

      setSavedSearches((prev) => {
        // Add new search at the beginning, limit to max
        const updated = [newSearch, ...prev].slice(0, MAX_SAVED_SEARCHES);
        persistToStorage(updated);
        return updated;
      });

      return newSearch;
    },
    [persistToStorage]
  );

  /**
   * Delete a saved search by ID
   */
  const deleteSearch = useCallback(
    (id: string) => {
      setSavedSearches((prev) => {
        const updated = prev.filter((s) => s.id !== id);
        persistToStorage(updated);
        return updated;
      });
    },
    [persistToStorage]
  );

  /**
   * Update lastUsedAt when a saved search is loaded
   */
  const markSearchAsUsed = useCallback(
    (id: string) => {
      setSavedSearches((prev) => {
        const updated = prev.map((s) =>
          s.id === id ? { ...s, lastUsedAt: new Date().toISOString() } : s
        );
        persistToStorage(updated);
        return updated;
      });
    },
    [persistToStorage]
  );

  /**
   * Rename a saved search
   */
  const renameSearch = useCallback(
    (id: string, newName: string) => {
      setSavedSearches((prev) => {
        const updated = prev.map((s) =>
          s.id === id ? { ...s, name: newName } : s
        );
        persistToStorage(updated);
        return updated;
      });
    },
    [persistToStorage]
  );

  /**
   * Clear all saved searches
   */
  const clearAllSearches = useCallback(() => {
    setSavedSearches([]);
    persistToStorage([]);
  }, [persistToStorage]);

  /**
   * Check if current filters match any saved search
   */
  const findMatchingSearch = useCallback(
    (filters: SearchFilters): SavedSearch | undefined => {
      return savedSearches.find((s) => {
        return (
          s.filters.query === filters.query &&
          s.filters.category === filters.category &&
          s.filters.area === filters.area &&
          s.filters.capacity === filters.capacity &&
          JSON.stringify(s.filters.amenities?.sort()) ===
            JSON.stringify(filters.amenities?.sort())
        );
      });
    },
    [savedSearches]
  );

  /**
   * Generate a default name for a search based on filters
   */
  const generateSearchName = useCallback(
    (filters: SearchFilters, t: (key: string) => string): string => {
      const parts: string[] = [];

      if (filters.query) {
        parts.push(`"${filters.query}"`);
      }
      if (filters.category && filters.category !== 'ALL') {
        parts.push(t(`sdk.rentalObject.category.${filters.category}`));
      }
      if (filters.area && filters.area !== 'all') {
        parts.push(filters.area);
      }
      if (filters.capacity && filters.capacity !== 'all') {
        parts.push(`${filters.capacity} ${t('listings.filter.persons')}`);
      }
      if (filters.amenities && filters.amenities.length > 0) {
        parts.push(`+${filters.amenities.length} ${t('listings.filter.amenities')}`);
      }

      if (parts.length === 0) {
        return t('savedSearches.allListings');
      }

      return parts.join(' - ');
    },
    []
  );

  return {
    savedSearches,
    saveSearch,
    deleteSearch,
    markSearchAsUsed,
    renameSearch,
    clearAllSearches,
    findMatchingSearch,
    generateSearchName,
    maxSavedSearches: MAX_SAVED_SEARCHES,
  };
}

export type UseSavedSearchesReturn = ReturnType<typeof useSavedSearches>;
