# MDX Translation Support

MDX documentation files in Storybook can now use translations from `@xala-technologies/i18n-platform` and storybook-specific translations.

## Setup

The `ThemedDocsContainer` in `.storybook/preview.tsx` automatically wraps all MDX content with `StoryProvider`, which provides access to translations via the `useT()` hook.

## Usage

### Option 1: Using the `<T>` Component (Recommended)

Import the `T` component and use it in your MDX files:

```mdx
import { T } from '../components/MDXTranslation';

# <T tKey="storybook.demo.button">Button</T>

<T tKey="storybook.demo.buttonDescription">
  Buttons allow users to take actions with a single click or tap.
</T>
```

**Props:**

- `tKey` (required): Translation key (e.g., `'platform.common.save'` or `'storybook.demo.buttonDescription'`)
- `children` (optional): Fallback text if translation is missing
- `values` (optional): Interpolation values for template strings

**Example with fallback:**

```mdx
<T tKey="storybook.demo.buttonDescription">Buttons allow users to take actions</T>
```

**Example with interpolation:**

```mdx
<T tKey="storybook.demo.welcomeMessage" values={{ name: 'User' }}>
  Welcome, User!
</T>
```

### Option 2: Using `useT()` Hook in JSX Blocks

For more complex scenarios, you can use the `useT()` hook directly in JSX blocks:

```mdx
import { useT } from '@xala-technologies/i18n';

<script>
  const t = useT(); const saveText = t('platform.common.save'); const cancelText =
  t('platform.common.cancel');
</script>

<Button>{saveText}</Button>
<Button>{cancelText}</Button>
```

## Available Translation Keys

### Platform Keys (from `@xala-technologies/i18n-platform`)

- `platform.common.*` - save, cancel, delete, edit, search, loading, name, email, etc.
- `platform.auth.*` - login, logout, password, email, etc.
- `platform.status.*` - active, inactive, pending, completed, etc.
- `platform.nav.*` - home, dashboard, settings, profile, help, etc.
- `platform.errors.*` - notFound, serverError, etc.
- `platform.validation.*` - required, invalidEmail, etc.

### Storybook Keys (from `storybook-translations.ts`)

- `storybook.demo.*` - Demo content and examples
- `storybook.overview.*` - Overview documentation
- `storybook.tokens.*` - Design token documentation
- `storybook.a11y.*` - Accessibility documentation
- `storybook.bestPractices.*` - Best practices
- `storybook.story.*` - Story metadata labels

## Locale Switching

The locale can be changed using the Storybook toolbar (globe icon). The MDX content will automatically update to show translations in the selected language.

Supported locales:

- `nb` - Norwegian Bokmål (default)
- `en` - English
- `ar` - Arabic (RTL) - falls back to English translations

## Examples

See `Button.mdx.example` for a complete example of localized MDX documentation.
