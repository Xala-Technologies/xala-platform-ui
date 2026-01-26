/**
 * ThemeToolbar - Global settings toolbar
 *
 * A toolbar component for switching theme (light/dark), locale,
 * and brand themes. Uses Designsystemet tokens for all styling.
 */

import { type ReactNode } from 'react';
import { ToggleGroup, Paragraph, Card } from '@digdir/designsystemet-react';
import { SunIcon, MoonIcon, GlobeIcon } from 'lucide-react';
import { Stack } from '../primitives';

/**
 * Color scheme options
 */
export type ColorScheme = 'light' | 'dark';

/**
 * Theme option for brand themes
 */
export interface ThemeOption {
  /** Unique value */
  value: string;
  /** Display label */
  label: string;
  /** Optional icon */
  icon?: ReactNode;
}

/**
 * Locale option
 */
export interface LocaleOption {
  /** Locale code (e.g., 'nb', 'en') */
  value: string;
  /** Display label (e.g., 'NB', 'EN') */
  label: string;
}

/**
 * ThemeToolbar Props
 */
export interface ThemeToolbarProps {
  /** Current color scheme */
  colorScheme?: ColorScheme;
  /** Callback when color scheme changes */
  onColorSchemeChange?: (scheme: ColorScheme) => void;
  /** Whether to show color scheme toggle */
  showColorScheme?: boolean;

  /** Current locale */
  locale?: string;
  /** Available locales */
  locales?: LocaleOption[];
  /** Callback when locale changes */
  onLocaleChange?: (locale: string) => void;
  /** Whether to show locale toggle */
  showLocale?: boolean;

  /** Current brand theme */
  brandTheme?: string;
  /** Available brand themes */
  brandThemes?: ThemeOption[];
  /** Callback when brand theme changes */
  onBrandThemeChange?: (theme: string) => void;
  /** Whether to show brand theme toggle */
  showBrandTheme?: boolean;

  /** Labels for accessibility and display */
  labels?: ThemeToolbarLabels;

  /** Size variant */
  size?: 'sm' | 'md';

  /** Additional actions (right side) */
  actions?: ReactNode;
}

/**
 * Toolbar labels (for i18n)
 */
export interface ThemeToolbarLabels {
  /** Theme section label */
  theme?: string;
  /** Light mode label */
  lightMode?: string;
  /** Dark mode label */
  darkMode?: string;
  /** Locale section label */
  language?: string;
  /** Brand theme section label */
  brand?: string;
}

const defaultLabels: ThemeToolbarLabels = {
  theme: 'Theme',
  lightMode: 'Light',
  darkMode: 'Dark',
  language: 'Language',
  brand: 'Brand',
};

const defaultLocales: LocaleOption[] = [
  { value: 'nb', label: 'NB' },
  { value: 'en', label: 'EN' },
];

/**
 * ThemeToolbar Component
 */
export function ThemeToolbar({
  colorScheme = 'light',
  onColorSchemeChange,
  showColorScheme = true,

  locale = 'nb',
  locales = defaultLocales,
  onLocaleChange,
  showLocale = true,

  brandTheme,
  brandThemes = [],
  onBrandThemeChange,
  showBrandTheme = true,

  labels: customLabels,
  size = 'sm',
  actions,
}: ThemeToolbarProps) {
  const labels = { ...defaultLabels, ...customLabels };
  const iconSize = size === 'sm' ? 14 : 16;

  const handleColorSchemeChange = (value: string) => {
    if (value === 'light' || value === 'dark') {
      onColorSchemeChange?.(value);
    }
  };

  const handleLocaleChange = (value: string) => {
    onLocaleChange?.(value);
  };

  const handleBrandChange = (value: string) => {
    onBrandThemeChange?.(value);
  };

  return (
    <Card data-color="neutral">
      <Card.Block>
        <Stack direction="horizontal" gap="var(--ds-spacing-6)" align="center" wrap>
        {/* Color Scheme Toggle */}
        {showColorScheme && (
          <Stack direction="horizontal" gap="var(--ds-spacing-2)" align="center">
            <Paragraph data-size="xs" data-color="subtle">
              {labels.theme}
            </Paragraph>
            <ToggleGroup data-size={size} value={colorScheme} onChange={handleColorSchemeChange}>
              <ToggleGroup.Item value="light" aria-label={labels.lightMode}>
                <SunIcon size={iconSize} />
              </ToggleGroup.Item>
              <ToggleGroup.Item value="dark" aria-label={labels.darkMode}>
                <MoonIcon size={iconSize} />
              </ToggleGroup.Item>
            </ToggleGroup>
          </Stack>
        )}

        {/* Locale Toggle */}
        {showLocale && locales.length > 1 && (
          <Stack direction="horizontal" gap="var(--ds-spacing-2)" align="center">
            <GlobeIcon size={iconSize} />
            <ToggleGroup data-size={size} value={locale} onChange={handleLocaleChange}>
              {locales.map((loc) => (
                <ToggleGroup.Item key={loc.value} value={loc.value}>
                  {loc.label}
                </ToggleGroup.Item>
              ))}
            </ToggleGroup>
          </Stack>
        )}

        {/* Brand Theme Toggle */}
        {showBrandTheme && brandThemes.length > 0 && (
          <Stack direction="horizontal" gap="var(--ds-spacing-2)" align="center">
            <Paragraph data-size="xs" data-color="subtle">
              {labels.brand}
            </Paragraph>
            <ToggleGroup
              data-size={size}
              value={brandTheme || brandThemes[0]?.value || ''}
              onChange={handleBrandChange}
            >
              {brandThemes.map((theme) => (
                <ToggleGroup.Item key={theme.value} value={theme.value}>
                  {theme.icon || theme.label}
                </ToggleGroup.Item>
              ))}
            </ToggleGroup>
          </Stack>
        )}

        {/* Additional actions */}
        {actions && (
          <Stack direction="horizontal" gap="var(--ds-spacing-2)" style={{ marginInlineStart: 'auto' }}>
            {actions}
          </Stack>
        )}
      </Stack>
      </Card.Block>
    </Card>
  );
}
