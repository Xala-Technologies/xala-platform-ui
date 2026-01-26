/**
 * Translation component for MDX files
 * 
 * Allows MDX documentation to use translations from @xala-technologies/i18n-platform
 * 
 * @example
 * ```mdx
 * import { T } from './components/MDXTranslation';
 * 
 * <T tKey="platform.common.save" />
 * <T tKey="storybook.demo.buttonDescription">Button allows users to take actions</T>
 * ```
 */
import React from 'react';
import { useT } from '@xala-technologies/i18n';

export interface TProps {
  /** Translation key (e.g., 'platform.common.save' or 'storybook.demo.buttonDescription') */
  tKey: string;
  /** Optional fallback text if translation is missing */
  children?: React.ReactNode;
  /** Optional interpolation values for template strings */
  values?: Record<string, string | number>;
}

/**
 * Translation component for MDX files
 * 
 * Usage in MDX:
 * ```mdx
 * import { T } from './components/MDXTranslation';
 * 
 * <T tKey="platform.common.save" />
 * ```
 */
export function T({ tKey, children, values }: TProps): React.ReactElement {
  const t = useT();
  
  try {
    const translated = t(tKey, values);
    // If translation returns the key itself (missing translation), use fallback
    if (translated === tKey && children) {
      return <>{children}</>;
    }
    return <>{translated}</>;
  } catch (error) {
    // Fallback to children if translation fails
    if (children) {
      return <>{children}</>;
    }
    return <>{tKey}</>;
  }
}

/**
 * Translation hook for use in MDX JSX blocks
 * 
 * @example
 * ```mdx
 * import { useT } from '@xala-technologies/i18n';
 * 
 * <script>
 *   const t = useT();
 *   const saveText = t('platform.common.save');
 * </script>
 * ```
 */
export { useT };
