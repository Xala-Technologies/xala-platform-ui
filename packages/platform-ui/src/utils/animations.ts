/**
 * Animation Utilities
 *
 * Utilities for accessible animations and transitions with reduced-motion support.
 * All animations respect prefers-reduced-motion media query for WCAG compliance.
 *
 * @module @xala-technologies/platform/ui/utils/animations
 */

import { useEffect, useState } from 'react';
import { animation } from '../tokens/extended';
import { prefersReducedMotion } from './accessibility';

// =============================================================================
// Types
// =============================================================================

export type AnimationDuration = keyof typeof animation.duration;
export type AnimationEasing = keyof typeof animation.easing;

export interface TransitionConfig {
  /** CSS property to transition (e.g., 'opacity', 'transform') */
  property: string;
  /** Duration key from design tokens */
  duration?: AnimationDuration;
  /** Easing function key from design tokens */
  easing?: AnimationEasing;
  /** Delay in milliseconds */
  delay?: number;
}

export interface AnimationStyles {
  transition?: string;
  transitionDuration?: string;
  transitionTimingFunction?: string;
  transitionDelay?: string;
  transitionProperty?: string;
}

// =============================================================================
// Transition Style Utilities
// =============================================================================

/**
 * Generate CSS transition styles from configuration
 *
 * Respects prefers-reduced-motion by returning instant transitions
 * when user has motion sensitivity enabled.
 *
 * @example
 * ```tsx
 * <div style={getTransitionStyles({ property: 'opacity', duration: 'normal' })}>
 *   Fade in/out
 * </div>
 * ```
 */
export function getTransitionStyles(
  config: TransitionConfig | TransitionConfig[]
): AnimationStyles {
  if (prefersReducedMotion()) {
    return {
      transition: 'none',
    };
  }

  const configs = Array.isArray(config) ? config : [config];

  const transitions = configs.map((cfg) => {
    const duration = cfg.duration ? animation.duration[cfg.duration] : animation.duration.normal;
    const easing = cfg.easing ? animation.easing[cfg.easing] : animation.easing.default;
    const delay = cfg.delay ? `${cfg.delay}ms` : '0ms';

    return `${cfg.property} ${duration} ${easing} ${delay}`;
  });

  return {
    transition: transitions.join(', '),
  };
}

/**
 * Apply transition to an element programmatically
 *
 * Useful for imperatively triggering transitions after mount or state changes.
 *
 * @example
 * ```tsx
 * const ref = useRef<HTMLDivElement>(null);
 * useEffect(() => {
 *   applyTransition(ref.current, { property: 'opacity', duration: 'fast' });
 * }, []);
 * ```
 */
export function applyTransition(
  element: HTMLElement | null,
  config: TransitionConfig | TransitionConfig[]
): void {
  if (!element) return;

  const styles = getTransitionStyles(config);

  if (styles.transition) {
    element.style.transition = styles.transition;
  }
}

// =============================================================================
// Animation Duration Utilities
// =============================================================================

/**
 * Get animation duration token string, respecting reduced motion preferences
 *
 * Returns '0ms' if user prefers reduced motion, otherwise returns the specified duration.
 *
 * @example
 * ```tsx
 * const duration = getAnimationDurationToken('normal'); // '250ms' or '0ms'
 * ```
 */
export function getAnimationDurationToken(duration: AnimationDuration = 'normal'): string {
  if (prefersReducedMotion()) {
    return animation.duration.instant;
  }
  return animation.duration[duration];
}

/**
 * Get animation duration as a number (for setTimeout, etc.)
 *
 * @example
 * ```tsx
 * setTimeout(callback, getAnimationDurationMs('normal')); // 250 or 0
 * ```
 */
export function getAnimationDurationMs(duration: AnimationDuration = 'normal'): number {
  const durationStr = getAnimationDurationToken(duration);
  return parseInt(durationStr, 10);
}

// =============================================================================
// Animation Classes Utilities
// =============================================================================

/**
 * Get animation class names based on animation state
 *
 * Returns appropriate Designsystemet animation classes.
 * In reduced motion mode, returns classes that skip animations.
 *
 * @example
 * ```tsx
 * const classes = getAnimationClasses('fade', isVisible);
 * <div className={classes}>Content</div>
 * ```
 */
export function getAnimationClasses(
  animationType: 'fade' | 'slide' | 'scale' | 'collapse',
  isActive: boolean
): string {
  if (prefersReducedMotion()) {
    return isActive ? 'ds-animation-none' : 'ds-animation-none ds-sr-only';
  }

  const baseClass = `ds-animation-${animationType}`;
  const stateClass = isActive ? 'ds-animation-enter' : 'ds-animation-exit';

  return `${baseClass} ${stateClass}`;
}

// =============================================================================
// React Hooks
// =============================================================================

/**
 * React hook to detect if user prefers reduced motion
 *
 * Subscribes to prefers-reduced-motion media query changes
 * and returns current state.
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const reducedMotion = useReducedMotion();
 *   return (
 *     <div data-animate={!reducedMotion}>
 *       Content with conditional animation
 *     </div>
 *   );
 * }
 * ```
 */
export function useReducedMotion(): boolean {
  const [isReducedMotion, setIsReducedMotion] = useState(() => prefersReducedMotion());

  useEffect(() => {
    if (typeof window === 'undefined') return;

    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');

    const handleChange = (event: MediaQueryListEvent | MediaQueryList) => {
      setIsReducedMotion(event.matches);
    };

    // Initial check
    handleChange(mediaQuery);

    // Listen for changes
    if (mediaQuery.addEventListener) {
      mediaQuery.addEventListener('change', handleChange);
    } else {
      // Fallback for older browsers
      mediaQuery.addListener(handleChange);
    }

    return () => {
      if (mediaQuery.removeEventListener) {
        mediaQuery.removeEventListener('change', handleChange);
      } else {
        // Fallback for older browsers
        mediaQuery.removeListener(handleChange);
      }
    };
  }, []);

  return isReducedMotion;
}

// =============================================================================
// Common Animation Presets
// =============================================================================

/**
 * Preset transition configurations for common animation patterns
 */
export const transitionPresets = {
  /** Fade in/out animation */
  fade: {
    property: 'opacity',
    duration: 'normal' as AnimationDuration,
    easing: 'smooth' as AnimationEasing,
  },

  /** Slide animation (use with transform) */
  slide: {
    property: 'transform',
    duration: 'normal' as AnimationDuration,
    easing: 'smoothOut' as AnimationEasing,
  },

  /** Scale animation (use with transform) */
  scale: {
    property: 'transform',
    duration: 'fast' as AnimationDuration,
    easing: 'smoothOut' as AnimationEasing,
  },

  /** Height collapse animation */
  collapse: {
    property: 'height',
    duration: 'normal' as AnimationDuration,
    easing: 'smooth' as AnimationEasing,
  },

  /** Multi-property fade + transform */
  fadeSlide: [
    {
      property: 'opacity',
      duration: 'normal' as AnimationDuration,
      easing: 'smooth' as AnimationEasing,
    },
    {
      property: 'transform',
      duration: 'normal' as AnimationDuration,
      easing: 'smoothOut' as AnimationEasing,
    },
  ],

  /** Multi-property fade + scale */
  fadeScale: [
    {
      property: 'opacity',
      duration: 'fast' as AnimationDuration,
      easing: 'smooth' as AnimationEasing,
    },
    {
      property: 'transform',
      duration: 'fast' as AnimationDuration,
      easing: 'smoothOut' as AnimationEasing,
    },
  ],
} as const;

// =============================================================================
// Exports
// =============================================================================

export const animations = {
  getTransitionStyles,
  applyTransition,
  getAnimationDurationToken,
  getAnimationDurationMs,
  getAnimationClasses,
  useReducedMotion,
  transitionPresets,
  // Re-export tokens for convenience
  tokens: animation,
};
