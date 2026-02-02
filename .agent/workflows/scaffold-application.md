---
description: Scaffold a new Thin App using platform-ui foundation
---

# Scaffold Application Workflow

This workflow creates a new application following the **Thin App pattern** with proper foundation.

## Pre-requisites
- Read `catalogs/FOUNDATION.md` to understand the foundation rules
- Understand the app type: `--auth` (authenticated) or `--public` (no auth)

---

## Step 1: Generate Scaffold

```bash
// turbo
node packages/gazetteer/src/cli/scaffold-app.ts <app-name> --auth --routes home,dashboard
```

Replace `<app-name>` with the actual app name. Use `--public` instead of `--auth` for public apps.

---

## Step 2: Validate Foundation

```bash
// turbo
node packages/gazetteer/scripts/validate-foundation.mjs apps/<app-name>
```

**Expected output:**
- ✅ main.tsx: Valid
- ✅ Thin App pattern: Valid
- ✅ Gazetteer structure: Valid

If validation fails, fix the issues before proceeding.

---

## Step 3: Install Dependencies

```bash
cd apps/<app-name> && pnpm install
```

---

## Step 4: Verify Build

```bash
// turbo
cd apps/<app-name> && pnpm typecheck && pnpm build
```

Both commands should succeed with no errors.

---

## Step 5: Start Development Server

```bash
cd apps/<app-name> && pnpm dev
```

---

## Foundation Rules to Verify

1. **Only main.tsx in src/** - No other .tsx files
2. **Correct style import** - `@xala-technologies/platform-ui/styles` as first non-React import
3. **Provider order** - See FOUNDATION.md for exact nesting
4. **No raw HTML** - All elements from platform-ui
5. **Gazetteer specs** - All behavior in specs, not code

---

## Troubleshooting

### Missing style import
Add to main.tsx:
```tsx
import '@xala-technologies/platform-ui/styles';
```

### Wrong provider order
Refer to `catalogs/FOUNDATION.md` for exact order.

### Raw HTML detected
Replace with platform-ui components:
- `<div>` → `<Stack>` or `<Box>`
- `<button>` → `<Button>`
- `<input>` → `<Textfield>`
