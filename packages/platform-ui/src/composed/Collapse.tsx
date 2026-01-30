/**
 * Collapse Transition Component
 *
 * A specialized transition wrapper for collapsing/expanding animations.
 * Handles height transitions from 0 to auto with smooth animations.
 * Respects prefers-reduced-motion for accessibility.
 *
 * @module @xala-technologies/platform/ui/composed/Collapse
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

export interface CollapseProps {
  /** Whether the component should be shown (expanded) */
  show: boolean;
  /** Child element to collapse/expand */
  children: ReactNode;
  /** Animation duration from design tokens */
  duration?: AnimationDuration;
  /** Animation easing from design tokens */
  easing?: AnimationEasing;
  /** Whether to unmount component when collapsed */
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
 * Collapse transition component for smooth height animations
 *
 * @example
 * ```tsx
 * <Collapse show={isExpanded}>
 *   <div>Content that collapses/expands</div>
 * </Collapse>
 * ```
 *
 * @example
 * ```tsx
 * // With custom duration and callbacks
 * <Collapse
 *   show={isExpanded}
 *   duration="fast"
 *   easing="smooth"
 *   onEntered={() => console.log('Expansion complete')}
 *   onExited={() => console.log('Collapse complete')}
 * >
 *   <Paragraph>Collapsible content</Paragraph>
 * </Collapse>
 * ```
 *
 * @example
 * ```tsx
 * // With unmount on exit
 * <Collapse
 *   show={isExpanded}
 *   unmountOnExit
 *   duration="normal"
 * >
 *   <div>Content removed from DOM when collapsed</div>
 * </Collapse>
 * ```
 */
export function Collapse({
  show,
  children,
  duration = 'normal',
  easing = 'smooth',
  unmountOnExit = false,
  onEnter,
  onEntered,
  onExit,
  onExited,
  className,
  style,
}: CollapseProps): React.ReactElement | null {
  const [state, setState] = useState<TransitionState>(show ? 'entered' : 'exited');
  const [shouldRender, setShouldRender] = useState(show || !unmountOnExit);
  const [height, setHeight] = useState<number | 'auto'>(show ? 'auto' : 0);
  const contentRef = useRef<HTMLDivElement | null>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const reducedMotion = useReducedMotion();

  // Get transition duration in milliseconds
  const transitionDuration = reducedMotion ? 0 : getAnimationDurationMs(duration);

  // Build transition styles for height
  const transitionStyles = getTransitionStyles({
    property: 'height',
    duration,
    easing,
  });

  // Measure content height
  const measureHeight = (): number => {
    if (contentRef.current) {
      return contentRef.current.scrollHeight;
    }
    return 0;
  };

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

      // Measure content height before starting transition
      requestAnimationFrame(() => {
        const contentHeight = measureHeight();
        setHeight(contentHeight);

        requestAnimationFrame(() => {
          setState('entered');
        });
      });

      // Call onEntered after transition duration
      if (transitionDuration > 0) {
        timeoutRef.current = setTimeout(() => {
          setHeight('auto');
          onEntered?.();
        }, transitionDuration);
      } else {
        setHeight('auto');
        onEntered?.();
      }
    } else {
      // Get current height before starting exit transition
      const contentHeight = measureHeight();
      setHeight(contentHeight);

      // Start exiting after setting explicit height
      requestAnimationFrame(() => {
        setState('exiting');
        onExit?.();

        requestAnimationFrame(() => {
          setHeight(0);
        });
      });

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

  // Combine all styles
  const combinedStyles: CSSProperties = {
    ...transitionStyles,
    ...style,
    height: height === 'auto' ? 'auto' : `${height}px`,
    overflow: state === 'entered' ? 'visible' : 'hidden',
  };

  return (
    <div className={className} style={combinedStyles}>
      <div ref={contentRef}>{children}</div>
    </div>
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export default Collapse;
