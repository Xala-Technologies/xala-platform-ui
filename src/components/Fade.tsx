/**
 * Fade Transition Component
 *
 * A specialized transition component for fade in/out animations.
 * Animates opacity from 0 to 1 and respects prefers-reduced-motion.
 *
 * @module @xala-technologies/platform/ui/composed/Fade
 */

import React, { type ReactNode } from 'react';
import { Transition } from './Transition';
import {
  transitionPresets,
  type AnimationDuration,
  type AnimationEasing,
} from '../utils/animations';

// =============================================================================
// TYPES
// =============================================================================

export interface FadeProps {
  /** Whether the component should be shown */
  show: boolean;
  /** Child element to fade */
  children: ReactNode;
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
}

// =============================================================================
// COMPONENT
// =============================================================================

/**
 * Fade transition component for smooth opacity animations
 *
 * Pre-configured wrapper around Transition component that fades
 * content in and out by animating opacity from 0 to 1.
 *
 * @example
 * ```tsx
 * <Fade show={isVisible}>
 *   <div>Content that fades in/out</div>
 * </Fade>
 * ```
 *
 * @example
 * ```tsx
 * // With custom duration and callbacks
 * <Fade
 *   show={isVisible}
 *   duration="fast"
 *   unmountOnExit
 *   onEntered={() => console.log('Fade in complete')}
 * >
 *   <Paragraph>Fading content</Paragraph>
 * </Fade>
 * ```
 */
export function Fade({
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
}: FadeProps): React.ReactElement | null {
  return (
    <Transition
      show={show}
      transition={{
        ...transitionPresets.fade,
        duration,
        easing,
      }}
      enter={{ opacity: 0 }}
      entered={{ opacity: 1 }}
      exit={{ opacity: 1 }}
      exited={{ opacity: 0 }}
      unmountOnExit={unmountOnExit}
      onEnter={onEnter}
      onEntered={onEntered}
      onExit={onExit}
      onExited={onExited}
      className={className}
    >
      {children}
    </Transition>
  );
}

// =============================================================================
// EXPORTS
// =============================================================================

export default Fade;
