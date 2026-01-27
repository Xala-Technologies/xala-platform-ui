/**
 * Type augmentations for @digdir/designsystemet-react v2 API
 *
 * Badge: Numeric indicator (dots/counts) - NO text children
 *   - data-color: neutral, danger, info, warning, accent
 *   - count, maxCount props
 *
 * Tag: Text labels/status - HAS text children
 *   - data-color: accent, brand1-3, neutral, success, warning, danger, info
 *   - data-size: sm, md, lg
 *   - variant: default, outline
 */

import 'react';

declare module 'react' {
  interface HTMLAttributes<T> {
    /**
     * Designsystemet v2 color attribute
     * Badge: neutral, danger, info, warning, accent
     * Tag: accent, brand1, brand2, brand3, neutral, success, warning, danger, info
     */
    'data-color'?:
      | 'neutral'
      | 'success'
      | 'warning'
      | 'danger'
      | 'info'
      | 'accent'
      | 'brand1'
      | 'brand2'
      | 'brand3'
      | string;

    /**
     * Designsystemet v2 size attribute (Tag: sm, md, lg)
     */
    'data-size'?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xs' | '2xl' | string;

    /**
     * Designsystemet v2 variant attribute
     * Badge: tinted
     * Tag: default, outline
     */
    'data-variant'?: 'default' | 'outline' | 'tinted' | string;
  }
}

export {};
