/**
 * Scale Transition Component
 *
 * A specialized transition wrapper for scaling animations.
 * Handles enter/exit animations with scale transforms (grow/shrink).
 * Respects prefers-reduced-motion for accessibility.
 *
 * @module @xala-technologies/platform/ui/composed/Scale
 */

/* eslint-disable no-restricted-syntax -- Raw div element required for generic transition wrapper with design tokens */

import React, { useEffect, useState, useRef, type CSSProperties, type ReactNode } from 'react';
import {
  getTransitionStyles,
  getAnimationDurationMs,
  useReducedMotion,
  type AnimationDuration,
  type AnimationEasing,
} from '../utils/animations';

// =============================================================================
// TYPES
// =============================================================================

export type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited';

export interface ScaleProps {
  /** Whether the component should be shown */
  show: boolean;
  /** Child element to transition */
  children: ReactNode;
  /** Initial scale value (0-1 for shrink, >1 for grow). Default: 0.95 */
  initialScale?: number;
  /** Animation duration from design tokens */
  duration?: AnimationDuration;
  /** Animation easing from design tokens */
  easing?: AnimationEasing;
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
 * Scale transition component for scaling animations
 *
 * @example
 * ```tsx
 * <Scale
 *   show={isVisible}
 *   duration="fast"
 * >
 *   <div>Content to scale in</div>
 * </Scale>
 * ```
 *
 * @example
 * ```tsx
 * // Scale from larger size (zoom out effect)
 * <Scale
 *   show={isVisible}
 *   initialScale={1.1}
 *   duration="fast"
 *   easing="smoothOut"
 * >
 *   <div>Zooming content</div>
 * </Scale>
 * ```
 *
 * @example
 * ```tsx
 * // With callbacks
 * <Scale
 *   show={isVisible}
 *   initialScale={0.9}
 *   onEntered={() => console.log('Scale animation completed')}
 *   unmountOnExit
 * >
 *   <div>Notification</div>
 * </Scale>
 * ```
 */
export function Scale({
  show,
  children,
  initialScale = 0.95,
  duration = 'fast',
  easing = 'smoothOut',
  unmountOnExit = false,
  onEnter,
  onEntered,
  onExit,
  onExited,
  className,
  style,
}: ScaleProps): React.ReactElement | null {
  const [state, setState] = useState<TransitionState>(show ? 'entered' : 'exited');
  const [shouldRender, setShouldRender] = useState(show || !unmountOnExit);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reducedMotion = useReducedMotion();

  // Get transition duration in milliseconds
  const transitionDuration = reducedMotion ? 0 : getAnimationDurationMs(duration);

  // Build transition styles for transform and opacity
  const transitionStyles = getTransitionStyles([
    {
      property: 'transform',
      duration,
      easing,
    },
    {
      property: 'opacity',
      duration,
      easing: 'smooth',
    },
  ]);

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
    const scaleTransform = `scale(${initialScale})`;

    switch (state) {
      case 'entering':
        return {
          transform: scaleTransform,
          opacity: 0,
        };
      case 'entered':
        return {
          transform: 'scale(1)',
          opacity: 1,
        };
      case 'exiting':
        return {
          transform: scaleTransform,
          opacity: 0,
        };
      case 'exited':
        return {
          transform: scaleTransform,
          opacity: 0,
        };
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

export default Scale;
