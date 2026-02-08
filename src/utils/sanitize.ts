/**
 * HTML Sanitization Utilities
 *
 * Provides utilities for sanitizing HTML content to prevent XSS attacks
 * while preserving safe rich text formatting.
 *
 * Uses DOMPurify to sanitize untrusted HTML content before rendering.
 *
 * @see https://github.com/cure53/DOMPurify
 */

import DOMPurify from 'dompurify';

// =============================================================================
// Configuration
// =============================================================================

/**
 * Safe HTML tags allowed in rich text content
 * These tags are commonly used for text formatting and are safe when properly sanitized
 */
const ALLOWED_TAGS = [
  // Text formatting
  'p',
  'strong',
  'em',
  'u',
  's',
  'span',
  'br',

  // Lists
  'ul',
  'ol',
  'li',

  // Headings
  'h1',
  'h2',
  'h3',
  'h4',
  'h5',
  'h6',

  // Block elements
  'blockquote',
  'pre',
  'code',
  'hr',

  // Links and media
  'a',
  'img',
];

/**
 * Safe HTML attributes allowed on specific tags
 * Maps tag names to their allowed attribute arrays
 */
const ALLOWED_ATTR: Record<string, string[]> = {
  a: ['href', 'title', 'target', 'rel'],
  img: ['src', 'alt', 'title', 'width', 'height'],
  // Allow data-size attributes for Designsystemet styling
  '*': ['data-size', 'data-color', 'class'],
};

/**
 * Sanitization configuration for DOMPurify
 */
interface SanitizeConfig {
  /** Allowed HTML tags */
  ALLOWED_TAGS: string[];
  /** Allowed attributes per tag */
  ALLOWED_ATTR: Record<string, string[]>;
  /** Allow data attributes (for Designsystemet styling) */
  ALLOW_DATA_ATTR: boolean;
  /** Keep content of forbidden tags */
  KEEP_CONTENT: boolean;
  /** Return as string (not DOM node) */
  RETURN_DOM: boolean;
  /** Return as DOM fragment */
  RETURN_DOM_FRAGMENT: boolean;
}

/**
 * Default DOMPurify configuration
 * Balances security with preserving rich text formatting
 */
const DEFAULT_CONFIG: Partial<SanitizeConfig> = {
  ALLOWED_TAGS,
  ALLOWED_ATTR,
  ALLOW_DATA_ATTR: true,
  KEEP_CONTENT: true,
  RETURN_DOM: false,
  RETURN_DOM_FRAGMENT: false,
};

// =============================================================================
// Sanitization Functions
// =============================================================================

/**
 * Sanitize HTML content to prevent XSS attacks
 *
 * Removes dangerous elements (scripts, event handlers, javascript: URLs)
 * while preserving safe rich text formatting (headings, lists, links, etc.)
 *
 * @param html - Untrusted HTML string to sanitize
 * @param config - Optional DOMPurify configuration overrides
 * @returns Sanitized HTML string safe for rendering
 *
 * @example
 * ```typescript
 * // Blocks malicious scripts
 * sanitizeHtml('<script>alert("XSS")</script>')
 * // Returns: ''
 *
 * // Blocks event handlers
 * sanitizeHtml('<img src=x onerror=alert("XSS")>')
 * // Returns: '<img src="x">'
 *
 * // Preserves safe rich text
 * sanitizeHtml('<p><strong>Bold</strong> and <em>italic</em></p>')
 * // Returns: '<p><strong>Bold</strong> and <em>italic</em></p>'
 * ```
 */
export function sanitizeHtml(
  html: string,
  config?: Partial<SanitizeConfig>,
): string {
  // Return empty string for null/undefined input
  if (html == null) {
    return '';
  }

  // Return empty string for non-string input
  if (typeof html !== 'string') {
    return '';
  }

  // Merge custom config with defaults
  const mergedConfig = {
    ...DEFAULT_CONFIG,
    ...config,
  };

  try {
    // Sanitize HTML using DOMPurify
    const sanitized = DOMPurify.sanitize(html, mergedConfig as DOMPurify.Config);

    // DOMPurify.sanitize returns string by default (when RETURN_DOM is false)
    return sanitized as string;
  } catch (error) {
    // Log error in development but don't expose details
    if (process.env.NODE_ENV === 'development') {
      console.error('HTML sanitization failed:', error);
    }

    // Return empty string on sanitization failure (fail secure)
    return '';
  }
}

/**
 * Check if HTML content contains potentially dangerous elements
 *
 * Useful for validation or warning users before sanitization
 *
 * @param html - HTML string to check
 * @returns True if HTML contains scripts, event handlers, or javascript: URLs
 *
 * @example
 * ```typescript
 * isDangerousHtml('<script>alert("XSS")</script>') // true
 * isDangerousHtml('<p>Safe content</p>') // false
 * isDangerousHtml('<img onerror=alert(1)>') // true
 * ```
 */
export function isDangerousHtml(html: string): boolean {
  if (typeof html !== 'string') {
    return false;
  }

  // Check for script tags
  if (/<script[\s>]/i.test(html)) {
    return true;
  }

  // Check for event handler attributes
  if (/\s+on\w+\s*=/i.test(html)) {
    return true;
  }

  // Check for javascript: URLs
  if (/javascript:/i.test(html)) {
    return true;
  }

  // Check for data: URIs that might contain scripts
  if (/data:text\/html/i.test(html)) {
    return true;
  }

  return false;
}

/**
 * Strip all HTML tags from content
 *
 * Useful for creating plain text versions or previews
 *
 * @param html - HTML string to strip
 * @returns Plain text with all HTML tags removed
 *
 * @example
 * ```typescript
 * stripHtml('<p>Hello <strong>world</strong></p>')
 * // Returns: 'Hello world'
 * ```
 */
export function stripHtml(html: string): string {
  if (typeof html !== 'string') {
    return '';
  }

  // First sanitize to prevent malicious content
  const sanitized = sanitizeHtml(html);

  // Remove all HTML tags using DOMPurify with empty ALLOWED_TAGS
  return DOMPurify.sanitize(sanitized, {
    ALLOWED_TAGS: [],
    KEEP_CONTENT: true,
  }) as string;
}
