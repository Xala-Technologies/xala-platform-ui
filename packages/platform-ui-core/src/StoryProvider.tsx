/**
 * Combined provider for Storybook that integrates:
 * - I18nProvider (translations from @xala-technologies/i18n-platform + storybook)
 * - DesignsystemetProvider (theme, direction, styling)
 *
 * Similar pattern to RuntimeProvider in production apps.
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
import React, { useMemo } from 'react';
import type { ReactNode } from 'react';
import { I18nProvider, type SupportedLocale } from '@xala-technologies/i18n';
import { translations as platformTranslations } from '@xala-technologies/i18n-platform';
import { DesignsystemetProvider } from './provider';
import { DEFAULT_THEME, type ThemeId } from './themes';
import { storybookTranslations } from './i18n';

export interface StoryProviderProps {
  /** Locale for translations and direction */
  locale?: string;
  /** Theme ID (digdir, altinn, brreg, custom) */
  theme?: ThemeId;
  /** Color scheme (light/dark/auto) */
  colorScheme?: 'light' | 'dark' | 'auto';
  children: ReactNode;
}

/**
 * Map locale to SupportedLocale, fallback to 'en' for unsupported locales.
 * The i18n package supports 'nb' and 'en', so 'ar' falls back to 'en'.
 */
function mapLocale(locale: string): SupportedLocale {
  if (locale === 'nb' || locale === 'en') return locale;
  return 'en'; // Fallback for 'ar' etc.
}

/**
 * Combined provider for Storybook that integrates:
 * - I18nProvider (translations from @xala-technologies/i18n-platform)
 * - DesignsystemetProvider (theme, direction, styling)
 *
 * Similar pattern to RuntimeProvider in production apps.
 * Translation context automatically available to all children via useT() hook.
 */
export function StoryProvider({
  locale = 'nb',
  theme = DEFAULT_THEME,
  colorScheme = 'light',
  children,
}: StoryProviderProps) {
  const i18nLocale = mapLocale(locale);

  // Merge platform translations with storybook-specific translations
  const mergedTranslations = useMemo(
    () => ({
      nb: { ...platformTranslations.nb, ...storybookTranslations.nb },
      en: { ...platformTranslations.en, ...storybookTranslations.en },
    }),
    []
  );

  // Key forces I18nProvider to remount when locale changes
  // This is necessary because I18nProvider uses initialLocale (not reactive)
  return (
    <I18nProvider
      key={i18nLocale}
      translations={mergedTranslations}
      initialLocale={i18nLocale}
      missingKeyBehavior="warn"
    >
      <DesignsystemetProvider theme={theme} colorScheme={colorScheme} locale={locale}>
        {children}
      </DesignsystemetProvider>
    </I18nProvider>
  );
}
