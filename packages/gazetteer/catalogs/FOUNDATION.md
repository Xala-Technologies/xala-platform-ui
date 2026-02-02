# Platform UI Foundation

> **AUTHORITATIVE SOURCE** - This document defines the **exact** foundation that every scaffolded application MUST have.

## Style Bootstrap (MANDATORY)

Every application MUST start with this exact import as the **first non-React import**:

```tsx
import '@xala-technologies/platform-ui/styles';
```

This single import injects:
- Designsystemet CSS (all base components)
- Inter font family
- Xala theme tokens (spacing, colors, typography)
- Xala extensions (layout utilities)

**DO NOT** import any of these directly:
- ❌ `@digdir/designsystemet-css`
- ❌ `@fontsource/inter`
- ❌ Any `.css` files

---

## Provider Stack (MANDATORY)

### Authenticated Apps

The exact provider nesting order (outermost first):

```tsx
<React.StrictMode>
  <ErrorBoundary>
    <ThemeProvider>
      <I18nProvider defaultLocale="nb" supportedLocales={['nb', 'en']}>
        <RuntimeProvider config={{ appId, env: import.meta.env }}>
          <AuthProvider>
            <GazetteerProvider appId={APP_ID} specBasePath="/gazetteer">
              <BrowserRouter>
                {/* Routes */}
              </BrowserRouter>
            </GazetteerProvider>
          </AuthProvider>
        </RuntimeProvider>
      </I18nProvider>
    </ThemeProvider>
  </ErrorBoundary>
</React.StrictMode>
```

### Public Apps (No Auth)

```tsx
<React.StrictMode>
  <ErrorBoundary>
    <ThemeProvider>
      <I18nProvider defaultLocale="nb" supportedLocales={['nb', 'en']}>
        <GazetteerProvider appId={APP_ID} specBasePath="/gazetteer">
          <BrowserRouter>
            {/* Routes */}
          </BrowserRouter>
        </GazetteerProvider>
      </I18nProvider>
    </ThemeProvider>
  </ErrorBoundary>
</React.StrictMode>
```

---

## Imports (Exact Order)

```tsx
// 1. React
import React from 'react';
import { createRoot } from 'react-dom/client';

// 2. Gazetteer
import { GazetteerProvider } from '@xala-technologies/gazetteer/provider';
import { useGazetteerRoutes } from '@xala-technologies/gazetteer/router';

// 3. Router
import { BrowserRouter, useRoutes } from 'react-router-dom';

// 4. Platform (auth apps only)
import { RuntimeProvider } from '@xala-technologies/platform/runtime';
import { AuthProvider } from '@xala-technologies/platform/auth';
import { I18nProvider } from '@xala-technologies/platform/i18n';

// 5. Platform UI
import { ErrorBoundary, ThemeProvider } from '@xala-technologies/platform-ui';

// 6. Styles (LAST - ensures CSS cascade)
import '@xala-technologies/platform-ui/styles';
```

---

## Thin App Rules

1. **ONLY main.tsx in src/** - No other .tsx files
2. **No domain logic** - All behavior in Gazetteer specs
3. **No local CSS** - All styling via platform-ui
4. **No raw HTML** - Use platform-ui primitives

---

## Theme Configuration

| Theme | Primary Color | Usage |
|-------|---------------|-------|
| `xala` | `#0062BA` | Platform default |
| `digilist` | `#2563EB` | DigiList domain |
| `neutral` | `#6B7280` | Grayscale/neutral |

Set via `<ThemeProvider theme="xala">`.

---

## Validation

Use `validate-foundation.mjs` to check compliance:

```bash
node scripts/validate-foundation.mjs [app-path]
```

Checks:
- ✅ Correct style import
- ✅ Provider nesting order
- ✅ No raw HTML elements
- ✅ Thin App pattern
