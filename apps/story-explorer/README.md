# Story Explorer

A custom web app that **replaces Storybook UI** while **reusing existing CSF stories** via Storybook's iframe runtime.

## Overview

Story Explorer provides a clean, accessible interface for browsing and viewing Storybook stories without the Storybook manager UI. It fetches story metadata from Storybook's `index.json` and renders stories in an iframe.

## Audit Notes (Phase 0)

### Storybook Setup

| Item | Value |
|------|-------|
| Storybook Version | 8.6.15 |
| Framework | @storybook/react-vite |
| Build Output | `storybook-static/` |
| Index Format | v5 (`{ v: 5, entries: {...} }`) |
| Story Count | ~1,699 entries |

**Index Entry Structure:**
```typescript
{
  id: "components-button--primary",
  title: "Components/Button",
  name: "Primary",
  type: "story" | "docs",
  importPath: "./packages/platform-ui/src/stories/...",
  tags: ["dev", "test", "autodocs"]
}
```

**Story ID Format:** `kebab-case-title--story-name`

### Globals Configured

| Global | Values | Default |
|--------|--------|---------|
| colorScheme | light, dark | light |
| brandTheme | custom, xaheen, digdir | custom |
| locale | nb, en, ar | nb |

**Globals URL Format:** `?globals=locale:nb;colorScheme:light;brandTheme:custom`

### I18n Setup

- **Core Package:** `@xala-technologies/i18n`
- **Translations:** `@xala-technologies/i18n-platform`
- **Supported Locales:** nb (Norwegian), en (English)
- **Key Pattern:** `platform.common.*`, `platform.nav.*`, etc.

### Design System

- **Component Library:** `@digdir/designsystemet-react`
- **Shell Components:** `AppLayout`, `DashboardSidebar`, `DashboardHeader`
- **CSS Variables:** `var(--ds-*)` pattern
- **Themes:** 5 themes with light/dark modes

### Assumptions

1. Storybook runs at `localhost:6006` in development
2. Build output exists at `storybook-static/` for production
3. `@xala-technologies/i18n` and `@xala-technologies/i18n-platform` are installed
4. React Router v6 is available for navigation

## Getting Started

### Prerequisites

```bash
# Install dependencies from monorepo root
pnpm install

# Start Storybook (in one terminal)
pnpm storybook
```

### Development

```bash
# Start Story Explorer (in another terminal)
pnpm --filter @xala-technologies/story-explorer dev
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `NEXT_PUBLIC_STORYBOOK_BASE_URL` | Storybook URL | `http://localhost:6006` |
| `NEXT_PUBLIC_STORYBOOK_INDEX_PATH` | Index JSON path | `index.json` |

## Architecture

```
apps/story-explorer/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── layout.tsx          # Root layout with providers
│   │   ├── page.tsx            # Redirect to /stories
│   │   └── stories/
│   │       ├── page.tsx        # Story catalog
│   │       └── [storyId]/
│   │           └── page.tsx    # Story viewer
│   ├── components/             # UI components
│   │   ├── StorySidebar.tsx    # Navigation sidebar
│   │   ├── StoryList.tsx       # Story list with search
│   │   ├── StoryViewer.tsx     # Iframe wrapper
│   │   └── GlobalsToolbar.tsx  # Theme/locale toggles
│   ├── lib/                    # Utilities
│   │   ├── types.ts            # TypeScript types
│   │   ├── api.ts              # Index fetch/normalize
│   │   └── schemas.ts          # Zod validation
│   └── i18n/                   # Translations
│       └── translations.ts     # Story Explorer specific strings
├── package.json
├── tsconfig.json
└── next.config.ts
```

## Features

### MVP (v1.0)
- [x] Story catalog with search
- [x] Category filtering (derived from story titles)
- [x] Tag filtering
- [x] Story viewer with iframe
- [x] Theme toggle (light/dark)
- [x] Locale toggle (nb/en)
- [x] Accessible navigation (keyboard, focus management)

### Future (v1.1+)
- [ ] Docs page viewer
- [ ] Story metadata panel
- [ ] Favorites/bookmarks
- [ ] Deep linking with state preservation
- [ ] Composition mode for curated demos

## Integration with Storybook

Story Explorer uses Storybook as a **headless renderer**:

1. **Index Fetch:** Reads `index.json` for story metadata
2. **Iframe Render:** Loads stories via `iframe.html?id={storyId}`
3. **Globals Sync:** Passes theme/locale via URL query params

This means:
- No changes required to existing stories
- Storybook must be running (dev) or built (prod)
- All Storybook addons continue to work in the iframe

## Accessibility

- Skip to content link
- Keyboard navigation for story list
- Focus management on route changes
- ARIA labels for interactive elements
- WCAG AA color contrast

## CHANGELOG

### v1.0.0 (Initial Release)
- Story catalog with search and filtering
- Story viewer with iframe embedding
- Theme and locale switching
- Norwegian (nb) and English (en) translations
