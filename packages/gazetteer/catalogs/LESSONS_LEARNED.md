# Gazetteer Scaffolding - Lessons Learned

This document captures infrastructure issues found during scaffold testing and their resolutions. Use this as reference when fixing or improving the scaffolding tools.

---

## Lesson 1: Import Paths Must Match Exports

**Problem**: Templates used non-existent subpaths like `@xala-technologies/gazetteer/provider`

**Root Cause**: Assumed subpath exports existed without verifying package.json exports

**Fix**: Import from main package entry point
```tsx
// ❌ Wrong
import { GazetteerProvider } from '@xala-technologies/gazetteer/provider';

// ✅ Correct  
import { GazetteerProvider, GazetteerRouter } from '@xala-technologies/gazetteer';
```

**Prevention**: Always verify package.json `exports` field before using subpath imports in templates

---

## Lesson 2: TypeScript Interface Properties Must Be Optional When Not Always Provided

**Problem**: `ScaffoldOptions.pageType` was required but CLI did not pass it

**Root Cause**: Interface designed with required property but caller didn't provide all properties

**Fix**: Make optional with `?` syntax
```typescript
interface ScaffoldOptions {
  appName: string;
  pageType?: PageType; // Optional
}
```

**Prevention**: For CLI tools, review all interface properties and make optional any that have defaults or aren't always needed

---

## Lesson 3: Monorepo Workspace Must Include All App Directories

**Problem**: `apps/` folder not in `pnpm-workspace.yaml`, so workspace:* dependencies couldn't resolve

**Root Cause**: Scaffold outputs to `apps/` but only `packages/*` was in workspace config

**Fix**: Add to pnpm-workspace.yaml:
```yaml
packages:
  - 'packages/*'
  - 'apps/*'  # Added for scaffolded apps
```

**Prevention**: When scaffold outputs to new directories, ensure they're in workspace config

---

## Lesson 4: Only Reference Packages That Exist in Workspace

**Problem**: Template used `@xala-technologies/platform` which doesn't exist

**Root Cause**: Template assumed packages from external repo were available

**Fix**: Remove from dependencies, use only packages in this workspace:
- `@xala-technologies/gazetteer` ✅
- `@xala-technologies/platform-ui` ✅
- `@xala-technologies/platform` ❌ (doesn't exist)

**Prevention**: Before adding any @xala-technologies package to scaffold, verify it exists with `pnpm list --depth=0`

---

## Lesson 5: Only Use Exported Components in Templates

**Problem**: Templates used `RuntimeProvider`, `AuthProvider`, `I18nProvider`, `ErrorBoundary` but these weren't exported

**Root Cause**: Template assumed components existed without checking exports

**Fix**: Simplified provider stack to only use available components:
```tsx
<ThemeProvider>
  <GazetteerProvider appId={APP_ID} specBasePath={SPEC_BASE_PATH}>
    <BrowserRouter>
      <GazetteerRouter />
    </BrowserRouter>
  </GazetteerProvider>
</ThemeProvider>
```

**Prevention**: Before using any component in template, verify it's exported from package.json

---

## Lesson 6: Fix Existing Apps When Infrastructure Changes

**Problem**: `portal-app` had `@xala-technologies/platform` dependency (same as Lesson 4)

**Root Cause**: Older app created with old template before fix

**Fix**: Remove dependency from existing app's package.json

**Prevention**: After fixing scaffold templates, run validation on ALL existing apps in `apps/` directory

---

## Lesson 7: Package.json exports Must Match tsup Output

**Problem**: exports specified `.mjs` files but tsup outputs `.js` files

**Root Cause**: package.json exports were written for different build config

**Fix**: Changed exports to match actual dist output:
```json
".": {
  "import": "./dist/index.js",    // Not .mjs
  "require": "./dist/index.cjs",  // Not .js
  "types": "./dist/index.d.ts"
}
```

**Prevention**: After changing build config, verify dist output and update exports to match

---

## Lesson 8: ErrorBoundary at Infrastructure Level (TODO)

**Problem**: When runtime errors occur, users see blank page with no guidance

**Root Cause**: No global exception handler with descriptive error messages

**Required Implementation**:
1. Create `ErrorBoundary` component in gazetteer that:
   - Catches all React errors
   - Shows formatted error with stack trace
   - Provides resolution suggestions
   - Links to relevant documentation
   
2. Add to scaffold template provider stack:
```tsx
<ErrorBoundary 
  fallback={(error, resetError) => (
    <GazetteerErrorPage error={error} onReset={resetError} />
  )}
>
  <ThemeProvider>
    ...
  </ThemeProvider>
</ErrorBoundary>
```

3. Create error catalog documenting common errors and resolutions

---

## Verification Checklist

When modifying scaffold templates, verify:

- [ ] All imports resolve (check package.json exports)
- [ ] All dependencies exist in workspace
- [ ] All components being used are actually exported
- [ ] TypeScript compiles without errors
- [ ] `pnpm build` succeeds for gazetteer
- [ ] `pnpm install` from root succeeds
- [ ] Dev server starts without errors
- [ ] App renders in browser without blank page
- [ ] Error boundaries catch and display errors properly

---

## Quick Commands

```bash
# Rebuild gazetteer after changes
cd packages/gazetteer && pnpm build

# Validate foundation
node packages/gazetteer/scripts/validate-foundation.mjs apps/<app-name>

# Check workspace deps
pnpm list --depth=0

# Run dev from root (correct way)
pnpm -F <app-name> dev
```
