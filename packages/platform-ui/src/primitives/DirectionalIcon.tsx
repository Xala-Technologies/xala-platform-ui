/* eslint-disable no-restricted-syntax */
/**
 * Directional icon components that automatically flip based on text direction.
 *
 * These components are essential for RTL layouts where navigation icons
 * should mirror their direction (e.g., "next" arrow points left in RTL).
 *
 * @example
 * ```tsx
 * import { ChevronForwardIcon, ArrowBackIcon } from '@xala-technologies/platform-ui';
 *
 * function Navigation() {
 *   return (
 *     <div>
 *       <button><ArrowBackIcon /> Back</button>
 *       <button>Next <ChevronForwardIcon /></button>
 *     </div>
 *   );
 * }
 * ```
 */
import * as React from 'react';
import { useDirection } from '../provider';
import { ChevronLeft, ChevronRight, ArrowLeft, ArrowRight } from 'lucide-react';

/**
 * Props for the DirectionalIcon component.
 */
export interface DirectionalIconProps {
  /** Icon to display in LTR mode */
  ltr: React.ReactNode;
  /** Icon to display in RTL mode */
  rtl: React.ReactNode;
  /** Optional CSS class name */
  className?: string;
}

/**
 * A wrapper component that displays different icons based on text direction.
 *
 * Use this for any icon that should mirror its direction in RTL layouts,
 * such as navigation arrows, chevrons, or directional indicators.
 *
 * @param props - Component props
 * @returns The appropriate icon based on current direction
 *
 * @example
 * ```tsx
 * <DirectionalIcon
 *   ltr={<ArrowRight />}
 *   rtl={<ArrowLeft />}
 * />
 * ```
 */
export function DirectionalIcon({ ltr, rtl, className }: DirectionalIconProps) {
  const direction = useDirection();
  return <span className={className}>{direction === 'rtl' ? rtl : ltr}</span>;
}

/**
 * Props for preset directional icon components.
 */
export interface DirectionalIconPresetProps {
  /** Icon size in pixels */
  size?: number;
}

/**
 * Forward-pointing chevron icon that adapts to text direction.
 * Points right in LTR, left in RTL.
 *
 * @param props - Component props
 * @returns Directional chevron icon
 *
 * @example
 * ```tsx
 * <button>Next <ChevronForwardIcon size={16} /></button>
 * ```
 */
export function ChevronForwardIcon(props: DirectionalIconPresetProps) {
  return (
    <DirectionalIcon
      ltr={<ChevronRight size={props.size} />}
      rtl={<ChevronLeft size={props.size} />}
    />
  );
}

/**
 * Backward-pointing chevron icon that adapts to text direction.
 * Points left in LTR, right in RTL.
 *
 * @param props - Component props
 * @returns Directional chevron icon
 *
 * @example
 * ```tsx
 * <button><ChevronBackIcon size={16} /> Previous</button>
 * ```
 */
export function ChevronBackIcon(props: DirectionalIconPresetProps) {
  return (
    <DirectionalIcon
      ltr={<ChevronLeft size={props.size} />}
      rtl={<ChevronRight size={props.size} />}
    />
  );
}

/**
 * Forward-pointing arrow icon that adapts to text direction.
 * Points right in LTR, left in RTL.
 *
 * @param props - Component props
 * @returns Directional arrow icon
 *
 * @example
 * ```tsx
 * <button>Continue <ArrowForwardIcon size={20} /></button>
 * ```
 */
export function ArrowForwardIcon(props: DirectionalIconPresetProps) {
  return (
    <DirectionalIcon ltr={<ArrowRight size={props.size} />} rtl={<ArrowLeft size={props.size} />} />
  );
}

/**
 * Backward-pointing arrow icon that adapts to text direction.
 * Points left in LTR, right in RTL.
 *
 * @param props - Component props
 * @returns Directional arrow icon
 *
 * @example
 * ```tsx
 * <button><ArrowBackIcon size={20} /> Go Back</button>
 * ```
 */
export function ArrowBackIcon(props: DirectionalIconPresetProps) {
  return (
    <DirectionalIcon ltr={<ArrowLeft size={props.size} />} rtl={<ArrowRight size={props.size} />} />
  );
}
