---
name: app-scaffolding
description: "Skill for scaffolding Thin Apps with full foundation, testing, and Gazetteer structure"
---

# App Scaffolding Skill

This skill enables agents to scaffold complete applications following the Thin App pattern.

## Prerequisites

Before using this skill, read:
- `packages/gazetteer/catalogs/FOUNDATION.md`
- `packages/gazetteer/src/registry/component-registry.ts`

## CLI Command

```bash
node packages/gazetteer/src/cli/scaffold-app.ts <name> [options]
```

### Options
- `--auth` - Authenticated app (includes AuthProvider)
- `--public` - Public app (no auth)
- `--routes home,about,contact` - Comma-separated routes
- `-o ./apps` - Output directory

## Generated Structure

```
apps/<name>/
├── package.json           # Deps + test scripts
├── tsconfig.json          # TS config
├── vite.config.ts         # Vite
├── vitest.config.ts       # Unit/integration tests
├── playwright.config.ts   # E2E tests
├── index.html
├── src/
│   └── main.tsx           # ONLY file (Thin App)
├── gazetteer/
│   ├── app.spec.json
│   ├── pages/*.page.json
│   ├── routes/*.route.json
│   └── i18n/{nb,en}.json
└── tests/
    ├── setup.ts
    ├── unit/
    ├── integration/
    └── e2e/
```

## Validation

After scaffolding, always run:

```bash
node packages/gazetteer/scripts/validate-foundation.mjs apps/<name>
```

Expected output:
```
✅ main.tsx: Valid (auth/public app)
✅ Thin App pattern: Valid
✅ Gazetteer structure: Valid
```

## Foundation Rules

Every scaffolded app MUST have:

1. **Style import first** (after React):
   ```tsx
   import '@xala-technologies/platform-ui/styles';
   ```

2. **Correct provider order**:
   - ErrorBoundary
   - ThemeProvider
   - I18nProvider
   - RuntimeProvider
   - AuthProvider (if --auth)
   - GazetteerProvider
   - BrowserRouter

3. **LoadingFallback** (not raw div):
   ```tsx
   return useRoutes(routes) ?? <LoadingFallback />;
   ```

## Test Scripts

Generated apps include:
```json
"test": "vitest run",
"test:watch": "vitest",
"test:coverage": "vitest run --coverage",
"test:e2e": "playwright test",
"test:all": "vitest run && playwright test"
```
