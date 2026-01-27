/**
 * Storybook-specific translations
 *
 * These translations are now centralized in @xala-technologies/i18n v1.1.0+
 * This file re-exports them for backward compatibility.
 */

import { nb, en } from '@xala-technologies/i18n';

// Extract storybook-prefixed translations from each locale
function extractStorybookTranslations(locale: Record<string, string>): Record<string, string> {
  const result: Record<string, string> = {};
  for (const [key, value] of Object.entries(locale)) {
    if (key.startsWith('storybook.')) {
      result[key] = value;
    }
  }
  return result;
}

/**
 * Norwegian storybook translations
 */
export const storybookNb = extractStorybookTranslations(nb);

/**
 * English storybook translations
 */
export const storybookEn = extractStorybookTranslations(en);

/**
 * Merged translations for Storybook use.
 */
export const storybookTranslations = {
  nb: storybookNb,
  en: storybookEn,
};
