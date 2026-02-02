---
description: Scaffold a complete Thin App with foundation and tests
---

# /create-app

Scaffolds a complete application following the Thin App pattern with proper foundation, Gazetteer specs, and comprehensive tests.

## Usage

```
/create-app <app-name> [--auth|--public] [--routes home,settings,...]
```

## What It Creates

```
apps/<app-name>/
├── package.json              # Dependencies + test scripts
├── tsconfig.json             # TypeScript config
├── vite.config.ts            # Vite build config
├── vitest.config.ts          # Unit/integration test config
├── playwright.config.ts      # E2E test config
├── index.html                # Entry HTML
├── src/
│   └── main.tsx              # ONLY file in src (Thin App)
├── gazetteer/
│   ├── app.spec.json         # App configuration
│   ├── pages/*.page.json     # Page specs
│   ├── routes/*.route.json   # Route specs
│   └── i18n/{nb,en}.json     # Translations
└── tests/
    ├── setup.ts              # Test setup
    ├── unit/                 # Unit tests
    ├── integration/          # Integration tests
    └── e2e/                  # Playwright E2E tests
```

## Foundation Compliance

Every app follows `FOUNDATION.md`:
- ✅ Correct provider order
- ✅ Single style import: `@xala-technologies/platform-ui/styles`
- ✅ LoadingFallback (no raw HTML)
- ✅ Thin App pattern (only main.tsx in src/)

## CLI

```bash
node packages/gazetteer/src/cli/scaffold-app.ts <name> --auth --routes home,settings
```

## Validation

```bash
node packages/gazetteer/scripts/validate-foundation.mjs apps/<name>
```

## Next Steps
After `/create-app`, run:
- `/create-page` for additional pages
- `/qa-verify` to validate the scaffold
