/**
 * Transition Component
 *
 * A generic transition wrapper for enter/exit animations.
 * Handles mounting/unmounting lifecycle with configurable styles and timing.
 * Respects prefers-reduced-motion for accessibility.
 *
 * @module @xala-technologies/platform/ui/composed/Transition
 */

/* eslint-disable no-restricted-syntax -- Raw div element required for generic transition wrapper with design tokens */

import React, { useEffect, useState, useRef, type CSSProperties, type ReactNode } from 'react';
import {
  getTransitionStyles,
  getAnimationDurationMs,
  useReducedMotion,
  type AnimationDuration,
  type AnimationEasing,
  type TransitionConfig,
} from '../utils/animations';

// =============================================================================
// TYPES
// =============================================================================

export type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited';

export interface TransitionProps {
  /** Whether the component should be shown */
  show: boolean;
  /** Child element to transition */
  children: ReactNode;
  /** Styles to apply when entering (can be static object or function based on state) */
  enter?: CSSProperties | ((state: TransitionState) => CSSProperties);
  /** Styles to apply when entered */
  entered?: CSSProperties;
  /** Styles to apply when exiting */
  exit?: CSSProperties | ((state: TransitionState) => CSSProperties);
  /** Styles to apply when exited */
  exited?: CSSProperties;
  /** Animation duration from design tokens */
  duration?: AnimationDuration;
  /** Animation easing from design tokens */
  easing?: AnimationEasing;
  /** Transition configuration (alternative to duration/easing) */
  transition?: TransitionConfig | TransitionConfig[];
  /** Whether to unmount component when exited */
  unmountOnExit?: boolean;
  /** Callback when transition enters */
  onEnter?: () => void;
  /** Callback when transition has entered */
  onEntered?: () => void;
  /** Callback when transition exits */
  onExit?: () => void;
  /** Callback when transition has exited */
  onExited?: () => void;
  /** Additional className for the wrapper */
  className?: string;
  /** Additional inline styles */
  style?: CSSProperties;
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Generic Transition component for enter/exit animations
 *
 * @example
 * ```tsx
 * <Transition
 *   show={isVisible}
 *   enter={{ opacity: 0 }}
 *   entered={{ opacity: 1 }}
 *   exit={{ opacity: 1 }}
 *   exited={{ opacity: 0 }}
 *   duration="normal"
 * >
 *   <div>Content to animate</div>
 * </Transition>
 * ```
 *
 * @example
 * ```tsx
 * // With custom transition config
 * <Transition
 *   show={isVisible}
 *   transition={{ property: 'opacity', duration: 'fast', easing: 'smooth' }}
 *   enter={{ opacity: 0 }}
 *   entered={{ opacity: 1 }}
 * >
 *   <div>Fading content</div>
 * </Transition>
 * ```
 */
export function Transition({
  show,
  children,
  enter,
  entered,
  exit,
  exited,
  duration = 'normal',
  easing = 'default',
  transition,
  unmountOnExit = false,
  onEnter,
  onEntered,
  onExit,
  onExited,
  className,
  style,
}: TransitionProps): React.ReactElement | null {
  const [state, setState] = useState<TransitionState>(show ? 'entered' : 'exited');
  const [shouldRender, setShouldRender] = useState(show || !unmountOnExit);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reducedMotion = useReducedMotion();

  // Get transition duration in milliseconds
  const transitionDuration = reducedMotion ? 0 : getAnimationDurationMs(duration);

  // Build transition styles
  const transitionStyles = transition
    ? getTransitionStyles(transition)
    : getTransitionStyles({
        property: 'all',
        duration,
        easing,
      });

  // Handle show/hide state changes
  useEffect(() => {
    // Clear any pending timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }

    if (show) {
      // Start entering
      setShouldRender(true);
      setState('entering');
      onEnter?.();

      // Transition to entered state after a frame (to trigger CSS transition)
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setState('entered');
        });
      });

      // Call onEntered after transition duration
      if (transitionDuration > 0) {
        timeoutRef.current = setTimeout(() => {
          onEntered?.();
        }, transitionDuration);
      } else {
        onEntered?.();
      }
    } else {
      // Start exiting
      setState('exiting');
      onExit?.();

      // Transition to exited state after duration
      if (transitionDuration > 0) {
        timeoutRef.current = setTimeout(() => {
          setState('exited');
          onExited?.();
          if (unmountOnExit) {
            setShouldRender(false);
          }
        }, transitionDuration);
      } else {
        setState('exited');
        onExited?.();
        if (unmountOnExit) {
          setShouldRender(false);
        }
      }
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    };
  }, [show, transitionDuration, unmountOnExit, onEnter, onEntered, onExit, onExited]);

  // Don't render if unmountOnExit is true and we're not showing
  if (!shouldRender) {
    return null;
  }

  // Get styles for current state
  const getStateStyles = (): CSSProperties => {
    switch (state) {
      case 'entering':
        return typeof enter === 'function' ? enter(state) : enter || {};
      case 'entered':
        return entered || (typeof enter === 'function' ? enter(state) : enter) || {};
      case 'exiting':
        return typeof exit === 'function' ? exit(state) : exit || {};
      case 'exited':
        return exited || (typeof exit === 'function' ? exit(state) : exit) || {};
      default:
        return {};
    }
  };

  const stateStyles = getStateStyles();

  // Combine all styles
  const combinedStyles: CSSProperties = {
    ...transitionStyles,
    ...style,
    ...stateStyles,
  };

  return (
    <div className={className} style={combinedStyles}>
      {children}
    </div>
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export default Transition;
