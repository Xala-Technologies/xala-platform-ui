# HARDLINE: Platform UI Theming Configuration

> **Severity**: CRITICAL
> **Enforcement**: AUTOMATED + MANDATORY REVIEW
> **Effective Date**: 2026-01-29

---

## Overview

This hardline establishes the **mandatory configuration pattern** for all applications consuming `@xala-technologies/platform-ui`. Non-compliance results in:

- ❌ Broken styling (serif fonts, no spacing, missing colors)
- ❌ Accessibility failures (no focus indicators)
- ❌ Component rendering failures
- ❌ Theme switching non-functional

---

## Root Cause of Failures

### Why This Happens

The `@xala-technologies/platform-ui` package is built on **Designsystemet** which:

1. **Does NOT auto-inject CSS** - Components ship unstyled by default
2. **Requires explicit provider hierarchy** - React context must be established
3. **Depends on CSS custom properties** - All styling uses `--ds-*` tokens

When developers copy component imports but forget the infrastructure imports, the app renders with browser defaults (Times New Roman, no spacing, unstyled HTML).

### The Dangerous Pattern

```tsx
// ❌ DANGEROUS - Looks correct but is completely broken
import { Button, Card, Stack } from '@xala-technologies/platform-ui';

function App() {
  return (
    <Stack gap="4">
      <Card data-color="neutral">
        <Button>Click me</Button>
      </Card>
    </Stack>
  );
}

// Result: Unstyled HTML, serif fonts, no spacing
```

---

## Mandatory Configuration (STRICT POLICY)

### Rule 1: Styles Import MUST Be Present

**Every application MUST have this import in `main.tsx`:**

```tsx
import '@xala-technologies/platform-ui/styles';
```

This single import:
- Injects Designsystemet CSS bundle
- Loads Inter font
- Sets global resets (box-sizing, margin, padding)
- Defines all `--ds-*` CSS custom properties

### Rule 2: Provider Hierarchy MUST Be Complete

**Every application MUST have this provider structure:**

```tsx
// main.tsx
import {
  DesignsystemetProvider,
  ThemeProvider,
  useTheme,
} from '@xala-technologies/platform-ui';

function ThemedApp() {
  const { colorScheme } = useTheme();

  return (
    <DesignsystemetProvider colorScheme={colorScheme}>
      {/* All app content here */}
    </DesignsystemetProvider>
  );
}

function RootApp() {
  return (
    <ThemeProvider storageKey="your-app-name-theme">
      <ThemedApp />
    </ThemeProvider>
  );
}
```

### Rule 3: useTheme MUST Be Inside ThemeProvider

**The `useTheme()` hook MUST be called from a component inside `<ThemeProvider>`:**

```tsx
// ❌ WRONG - useTheme outside provider
function App() {
  const { colorScheme } = useTheme(); // CRASH: No provider
  return <DesignsystemetProvider colorScheme={colorScheme}>...</DesignsystemetProvider>;
}

// ✅ CORRECT - useTheme inside provider via child component
function ThemedApp() {
  const { colorScheme } = useTheme(); // Works!
  return <DesignsystemetProvider colorScheme={colorScheme}>...</DesignsystemetProvider>;
}

function App() {
  return (
    <ThemeProvider storageKey="app-theme">
      <ThemedApp />
    </ThemeProvider>
  );
}
```

---

## Canonical Template

### main.tsx (Copy This Exactly)

```tsx
/**
 * Application Entry Point
 *
 * HARDLINE: Uses @xala-technologies/platform-ui theming configuration.
 * @see docs/ux-lexicon/hardlines/HARDLINE_THEMING_CONFIG.md
 */
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  DesignsystemetProvider,
  ThemeProvider,
  useTheme,
  ErrorBoundary,
} from '@xala-technologies/platform-ui';

// HARDLINE: This import is MANDATORY
import '@xala-technologies/platform-ui/styles';

import { App } from './App';

// Full height layout
if (typeof document !== 'undefined') {
  const style = document.createElement('style');
  style.textContent = `
    html, body, #root { height: 100%; }
    :focus-visible {
      outline: 2px solid var(--ds-color-accent-border-default);
      outline-offset: 2px;
    }
  `;
  document.head.appendChild(style);
}

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 5 * 60 * 1000, retry: 1 },
  },
});

function ThemedApp() {
  const { colorScheme } = useTheme();

  return (
    <DesignsystemetProvider colorScheme={colorScheme}>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter>
          <ErrorBoundary>
            <App />
          </ErrorBoundary>
        </BrowserRouter>
      </QueryClientProvider>
    </DesignsystemetProvider>
  );
}

function RootApp() {
  return (
    <ThemeProvider storageKey="your-app-name-theme">
      <ThemedApp />
    </ThemeProvider>
  );
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <RootApp />
  </StrictMode>
);
```

### index.html

```html
<!DOCTYPE html>
<html lang="en" data-ds-color-mode="light" data-ds-theme="digdir">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Your App Title</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.tsx"></script>
  </body>
</html>
```

---

## Verification Checklist

Before deploying, manually verify:

| Check | How to Verify |
|-------|---------------|
| Font loads | Network tab → check font requests |
| CSS variables exist | Inspect element → check for `--ds-*` properties |
| Theme switching works | Toggle theme → verify colors change |
| No serif fonts | Visual inspection of all text |
| Spacing is correct | Elements have proper gaps/padding |
| Focus indicators visible | Tab through interactive elements |

---

## Consequences of Non-Compliance

| Violation | Impact |
|-----------|--------|
| Missing styles import | All components unstyled, serif fonts |
| Missing ThemeProvider | Theme switching broken, useTheme crashes |
| Missing DesignsystemetProvider | Component props (color, size) non-functional |
| Wrong provider order | Unpredictable behavior, partial styling |

---

## Automated Enforcement

### CI Check

Add to your CI pipeline:

```yaml
- name: Verify Theming Configuration
  run: |
    grep -q "import '@xala-technologies/platform-ui/styles'" src/main.tsx || exit 1
    grep -q "ThemeProvider" src/main.tsx || exit 1
    grep -q "DesignsystemetProvider" src/main.tsx || exit 1
```

---

## Revision History

| Date | Author | Change |
|------|--------|--------|
| 2026-01-29 | UX Lexicon | Initial creation |
