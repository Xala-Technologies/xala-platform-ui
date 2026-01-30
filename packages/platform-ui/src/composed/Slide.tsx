/**
 * Slide Transition Component
 *
 * A specialized transition wrapper for sliding animations.
 * Handles enter/exit animations with directional sliding (left, right, up, down).
 * Respects prefers-reduced-motion for accessibility.
 *
 * @module @xala-technologies/platform/ui/composed/Slide
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

export type SlideDirection = 'left' | 'right' | 'up' | 'down';
export type TransitionState = 'entering' | 'entered' | 'exiting' | 'exited';

export interface SlideProps {
  /** Whether the component should be shown */
  show: boolean;
  /** Child element to transition */
  children: ReactNode;
  /** Direction to slide from */
  direction?: SlideDirection;
  /** Distance to slide in pixels or CSS value (e.g., '100%', '50px') */
  distance?: string | number;
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
// HELPERS
// =============================================================================

/**
 * Get transform value for slide direction and distance
 */
function getSlideTransform(direction: SlideDirection, distance: string | number): string {
  const distanceValue = typeof distance === 'number' ? `${distance}px` : distance;

  switch (direction) {
    case 'left':
      return `translateX(-${distanceValue})`;
    case 'right':
      return `translateX(${distanceValue})`;
    case 'up':
      return `translateY(-${distanceValue})`;
    case 'down':
      return `translateY(${distanceValue})`;
    default:
      return 'translateX(0)';
  }
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Slide transition component for directional sliding animations
 *
 * @example
 * ```tsx
 * <Slide
 *   show={isVisible}
 *   direction="left"
 *   duration="normal"
 * >
 *   <div>Content to slide in</div>
 * </Slide>
 * ```
 *
 * @example
 * ```tsx
 * // Slide from bottom with custom distance
 * <Slide
 *   show={isVisible}
 *   direction="down"
 *   distance="200px"
 *   duration="slow"
 *   easing="smoothOut"
 * >
 *   <div>Slide up panel</div>
 * </Slide>
 * ```
 *
 * @example
 * ```tsx
 * // With callbacks
 * <Slide
 *   show={isVisible}
 *   direction="right"
 *   onEntered={() => console.log('Slide animation completed')}
 *   unmountOnExit
 * >
 *   <div>Notification</div>
 * </Slide>
 * ```
 */
export function Slide({
  show,
  children,
  direction = 'left',
  distance = '100%',
  duration = 'normal',
  easing = 'smoothOut',
  unmountOnExit = false,
  onEnter,
  onEntered,
  onExit,
  onExited,
  className,
  style,
}: SlideProps): React.ReactElement | null {
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
    const slideTransform = getSlideTransform(direction, distance);

    switch (state) {
      case 'entering':
        return {
          transform: slideTransform,
          opacity: 0,
        };
      case 'entered':
        return {
          transform: 'translate(0, 0)',
          opacity: 1,
        };
      case 'exiting':
        return {
          transform: slideTransform,
          opacity: 0,
        };
      case 'exited':
        return {
          transform: slideTransform,
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

export default Slide;
