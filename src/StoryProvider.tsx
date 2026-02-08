/**
 * Combined provider for Storybook that integrates Designsystemet theming.
 * This is a UI-only package,  so translations are not included.
 *
 * @example
 * ```tsx
 * import { StoryProvider } from '@xala-technologies/platform-ui';
 *
 * <StoryProvider locale="nb" colorScheme="light">
 *   <YourComponent />
 * </StoryProvider>
 * ```
 */
import type { ReactNode } from 'react';
import { DesignsystemetProvider } from './provider';
import { DEFAULT_THEME, type ThemeId } from './themes';

export interface StoryProviderProps {
  /** Locale for direction (nb, en, ar) */
  locale?: string;
  /** Theme ID (digdir, altinn, brreg, xala-navy, etc.) */
  theme?: ThemeId;
  /** Color scheme (light/dark/auto) */
  colorScheme?: 'light' | 'dark' | 'auto';
  children: ReactNode;
}

/**
 * Storybook provider that wraps components with Designsystemet theming.
 * For production apps, wrap with your own i18n and auth providers.
 */
export function StoryProvider({
  locale = 'nb',
  theme = DEFAULT_THEME,
  colorScheme = 'light',
  children,
}: StoryProviderProps) {
  return (
    <DesignsystemetProvider theme={theme} colorScheme={colorScheme} locale={locale}>
      {children}
    </DesignsystemetProvider>
  );
}
