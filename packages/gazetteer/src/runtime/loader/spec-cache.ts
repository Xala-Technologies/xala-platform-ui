/**
 * Spec Cache
 *
 * LRU (Least Recently Used) cache implementation for Gazetteer specs.
 * Supports hash-based invalidation and configurable size limits.
 */

// ============================================================================
// Types
// ============================================================================

/**
 * Cache entry with metadata
 */
interface CacheEntry<T> {
  value: T;
  hash: string;
  accessedAt: number;
  createdAt: number;
}

/**
 * Cache configuration
 */
export interface SpecCacheConfig {
  /** Maximum number of entries in the cache */
  maxSize: number;
  /** Time-to-live in milliseconds (0 = no expiration) */
  ttl: number;
  /** Enable debug logging */
  debug?: boolean;
}

/**
 * Cache statistics
 */
export interface CacheStats {
  hits: number;
  misses: number;
  evictions: number;
  size: number;
  maxSize: number;
}

// ============================================================================
// Default Configuration
// ============================================================================

const DEFAULT_CONFIG: SpecCacheConfig = {
  maxSize: 100,
  ttl: 300000, // 5 minutes
  debug: false,
};

// ============================================================================
// Spec Cache Implementation
// ============================================================================

/**
 * LRU Cache for Gazetteer specifications
 */
export class SpecCache<T = unknown> {
  private cache: Map<string, CacheEntry<T>> = new Map();
  private config: SpecCacheConfig;
  private stats: CacheStats;

  constructor(config: Partial<SpecCacheConfig> = {}) {
    this.config = { ...DEFAULT_CONFIG, ...config };
    this.stats = {
      hits: 0,
      misses: 0,
      evictions: 0,
      size: 0,
      maxSize: this.config.maxSize,
    };
  }

  /**
   * Generate a hash for a value (used for invalidation)
   */
  private generateHash(value: T): string {
    const str = JSON.stringify(value);
    let hash = 0;
    for (let i = 0; i < str.length; i++) {
      const char = str.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    return hash.toString(36);
  }

  /**
   * Check if an entry has expired
   */
  private isExpired(entry: CacheEntry<T>): boolean {
    if (this.config.ttl === 0) {
      return false;
    }
    return Date.now() - entry.createdAt > this.config.ttl;
  }

  /**
   * Evict the least recently used entry
   */
  private evictLRU(): void {
    let oldestKey: string | null = null;
    let oldestTime = Infinity;

    for (const [key, entry] of this.cache.entries()) {
      if (entry.accessedAt < oldestTime) {
        oldestTime = entry.accessedAt;
        oldestKey = key;
      }
    }

    if (oldestKey) {
      this.cache.delete(oldestKey);
      this.stats.evictions++;
      this.stats.size--;

      if (this.config.debug) {
        console.debug(`[SpecCache] Evicted LRU entry: ${oldestKey}`);
      }
    }
  }

  /**
   * Get a value from the cache
   */
  get(key: string): T | undefined {
    const entry = this.cache.get(key);

    if (!entry) {
      this.stats.misses++;
      return undefined;
    }

    // Check expiration
    if (this.isExpired(entry)) {
      this.cache.delete(key);
      this.stats.misses++;
      this.stats.size--;

      if (this.config.debug) {
        console.debug(`[SpecCache] Entry expired: ${key}`);
      }

      return undefined;
    }

    // Update access time (LRU tracking)
    entry.accessedAt = Date.now();
    this.stats.hits++;

    if (this.config.debug) {
      console.debug(`[SpecCache] Cache hit: ${key}`);
    }

    return entry.value;
  }

  /**
   * Set a value in the cache
   */
  set(key: string, value: T): void {
    // Evict if at capacity
    while (this.cache.size >= this.config.maxSize) {
      this.evictLRU();
    }

    const now = Date.now();
    const hash = this.generateHash(value);

    this.cache.set(key, {
      value,
      hash,
      accessedAt: now,
      createdAt: now,
    });

    this.stats.size = this.cache.size;

    if (this.config.debug) {
      console.debug(`[SpecCache] Set: ${key} (hash: ${hash})`);
    }
  }

  /**
   * Check if a key exists and is valid (not expired)
   */
  has(key: string): boolean {
    const entry = this.cache.get(key);
    if (!entry) {
      return false;
    }
    if (this.isExpired(entry)) {
      this.cache.delete(key);
      this.stats.size--;
      return false;
    }
    return true;
  }

  /**
   * Invalidate a cache entry by key
   */
  invalidate(key: string): boolean {
    const deleted = this.cache.delete(key);
    if (deleted) {
      this.stats.size--;
      if (this.config.debug) {
        console.debug(`[SpecCache] Invalidated: ${key}`);
      }
    }
    return deleted;
  }

  /**
   * Invalidate entries matching a pattern
   */
  invalidatePattern(pattern: RegExp): number {
    let count = 0;
    for (const key of this.cache.keys()) {
      if (pattern.test(key)) {
        this.cache.delete(key);
        count++;
      }
    }
    this.stats.size = this.cache.size;

    if (this.config.debug && count > 0) {
      console.debug(`[SpecCache] Invalidated ${count} entries matching ${pattern}`);
    }

    return count;
  }

  /**
   * Invalidate if hash has changed
   */
  invalidateIfChanged(key: string, newValue: T): boolean {
    const entry = this.cache.get(key);
    if (!entry) {
      return false;
    }

    const newHash = this.generateHash(newValue);
    if (entry.hash !== newHash) {
      this.cache.delete(key);
      this.stats.size--;

      if (this.config.debug) {
        console.debug(
          `[SpecCache] Invalidated due to hash change: ${key} (${entry.hash} -> ${newHash})`
        );
      }

      return true;
    }

    return false;
  }

  /**
   * Clear all entries
   */
  clear(): void {
    this.cache.clear();
    this.stats.size = 0;

    if (this.config.debug) {
      console.debug('[SpecCache] Cache cleared');
    }
  }

  /**
   * Get cache statistics
   */
  getStats(): CacheStats {
    return { ...this.stats };
  }

  /**
   * Get hit rate as a percentage
   */
  getHitRate(): number {
    const total = this.stats.hits + this.stats.misses;
    if (total === 0) {
      return 0;
    }
    return (this.stats.hits / total) * 100;
  }

  /**
   * Reset statistics
   */
  resetStats(): void {
    this.stats.hits = 0;
    this.stats.misses = 0;
    this.stats.evictions = 0;
  }

  /**
   * Get all keys in the cache
   */
  keys(): string[] {
    return Array.from(this.cache.keys());
  }

  /**
   * Get current cache size
   */
  size(): number {
    return this.cache.size;
  }

  /**
   * Prune expired entries
   */
  prune(): number {
    let pruned = 0;
    for (const [key, entry] of this.cache.entries()) {
      if (this.isExpired(entry)) {
        this.cache.delete(key);
        pruned++;
      }
    }
    this.stats.size = this.cache.size;

    if (this.config.debug && pruned > 0) {
      console.debug(`[SpecCache] Pruned ${pruned} expired entries`);
    }

    return pruned;
  }
}

// ============================================================================
// Singleton Instances
// ============================================================================

let routeCacheInstance: SpecCache | null = null;
let pageCacheInstance: SpecCache | null = null;
let flowCacheInstance: SpecCache | null = null;
let actionCacheInstance: SpecCache | null = null;

/**
 * Get the route spec cache singleton
 */
export function getRouteCache(config?: Partial<SpecCacheConfig>): SpecCache {
  if (!routeCacheInstance) {
    routeCacheInstance = new SpecCache(config);
  }
  return routeCacheInstance;
}

/**
 * Get the page spec cache singleton
 */
export function getPageCache(config?: Partial<SpecCacheConfig>): SpecCache {
  if (!pageCacheInstance) {
    pageCacheInstance = new SpecCache(config);
  }
  return pageCacheInstance;
}

/**
 * Get the flow spec cache singleton
 */
export function getFlowCache(config?: Partial<SpecCacheConfig>): SpecCache {
  if (!flowCacheInstance) {
    flowCacheInstance = new SpecCache(config);
  }
  return flowCacheInstance;
}

/**
 * Get the action spec cache singleton
 */
export function getActionCache(config?: Partial<SpecCacheConfig>): SpecCache {
  if (!actionCacheInstance) {
    actionCacheInstance = new SpecCache(config);
  }
  return actionCacheInstance;
}

/**
 * Clear all cache singletons
 */
export function clearAllCaches(): void {
  routeCacheInstance?.clear();
  pageCacheInstance?.clear();
  flowCacheInstance?.clear();
  actionCacheInstance?.clear();
}

/**
 * Reset all cache singletons (for testing)
 */
export function resetAllCaches(): void {
  routeCacheInstance = null;
  pageCacheInstance = null;
  flowCacheInstance = null;
  actionCacheInstance = null;
}
