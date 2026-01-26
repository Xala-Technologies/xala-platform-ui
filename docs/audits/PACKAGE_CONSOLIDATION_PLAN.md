# Package Consolidation Plan: Option A

**Date:** 2026-01-26
**Decision:** Consolidate `@digilist/ui` into `@xala-technologies/platform-ui`
**Rationale:** Single UI package, simpler architecture, eliminate duplication

---

## Executive Summary

Merge all components from `@digilist/ui` into `@xala-technologies/platform-ui` to create a single, comprehensive UI package containing both generic design system components and domain-specific features.

### Goals

✅ Single UI package to maintain
✅ Clear hierarchy: primitives → blocks → features
✅ Eliminate package duplication
✅ Simplify imports across apps
✅ Reduce build complexity

### Impact

- **Files to move:** ~150 components from `@digilist/ui`
- **Import updates:** ~500 import statements across apps
- **Build time:** ~2 hours for migration + testing
- **Risk:** Medium (many file moves, but straightforward)

---

## Current State Analysis

### Package 1: @xala-technologies/platform-ui

**Location:** `/Volumes/Laravel/Xala-SAAS/tools/xala-platform-ui/packages/platform-ui/`

**Structure:**
```
src/
├── primitives/       # 20+ components (Button, Card, Input)
├── composed/         # 15+ components (DataTable, Modal, Tabs)
├── blocks/           # 60+ components (NotificationBell, ResourceCard)
├── patterns/         # 10+ components (FormWizard)
├── shells/           # 5+ components (AppLayout, DashboardLayout)
├── themes/
├── tokens/
└── types/
```

**Exports:**
- `@xala-technologies/platform-ui` (main)
- `@xala-technologies/platform-ui/primitives`
- `@xala-technologies/platform-ui/composed`
- `@xala-technologies/platform-ui/blocks`
- `@xala-technologies/platform-ui/patterns`
- `@xala-technologies/platform-ui/shells`

### Package 2: @digilist/ui (TO BE MERGED)

**Location:** `/Volumes/Laravel/Xala-SAAS/tools/Digilist/packages/ui/`

**Structure:**
```
src/
├── features/
│   ├── booking/         # 29 components (BookingEngine, BookingCart)
│   ├── calendar/        # 10+ components (CalendarSection, TimelineView)
│   ├── seasons/         # 8 components (SeasonList, ApplicationForm)
│   ├── gdpr/            # 3 components (GdprRequestQueue)
│   ├── settings/        # 15+ components (SettingsPanels)
│   ├── organizations/   # 10+ components (OrgManagement)
│   ├── rental-objects/  # 20+ components (RentalObjectDetails)
│   ├── reviews/         # 5 components (ReviewCards)
│   ├── docs/            # 3 components (DocsViewer)
│   ├── notifications/   # 8 components (NotificationReports)
│   └── rental-object-details/ # 15+ components
└── types/
```

**Current Exports:**
- `@digilist/ui/features/booking`
- `@digilist/ui/features/calendar`
- `@digilist/ui/features/seasons`
- `@digilist/ui/features/gdpr`
- etc.

---

## Target State: Consolidated Package

### New Structure

```
@xala-technologies/platform-ui/
└── packages/platform-ui/src/
    ├── primitives/          # Generic primitives (Button, Card)
    ├── composed/            # Multi-component compositions (DataTable)
    ├── blocks/              # Feature blocks (NotificationBell, ResourceCard)
    ├── patterns/            # Reusable patterns (FormWizard)
    ├── shells/              # Layout shells (AppLayout)
    │
    ├── features/            # ← NEW: Domain-specific features
    │   ├── booking/         # (moved from @digilist/ui)
    │   ├── calendar/        # (moved from @digilist/ui)
    │   ├── seasons/         # (moved from @digilist/ui)
    │   ├── gdpr/            # (moved from @digilist/ui)
    │   ├── settings/        # (moved from @digilist/ui)
    │   ├── organizations/   # (moved from @digilist/ui)
    │   ├── rental-objects/  # (moved from @digilist/ui)
    │   ├── reviews/         # (moved from @digilist/ui)
    │   ├── docs/            # (moved from @digilist/ui)
    │   ├── notifications/   # (moved from @digilist/ui)
    │   └── rental-object-details/ # (moved from @digilist/ui)
    │
    ├── themes/
    ├── tokens/
    └── types/
```

### New Exports

All existing exports PLUS new feature exports:

```typescript
// Existing exports (unchanged)
export * from '@xala-technologies/platform-ui';
export * from '@xala-technologies/platform-ui/primitives';
export * from '@xala-technologies/platform-ui/composed';
export * from '@xala-technologies/platform-ui/blocks';
export * from '@xala-technologies/platform-ui/patterns';
export * from '@xala-technologies/platform-ui/shells';

// NEW: Feature exports
export * from '@xala-technologies/platform-ui/features/booking';
export * from '@xala-technologies/platform-ui/features/calendar';
export * from '@xala-technologies/platform-ui/features/seasons';
export * from '@xala-technologies/platform-ui/features/gdpr';
export * from '@xala-technologies/platform-ui/features/settings';
export * from '@xala-technologies/platform-ui/features/organizations';
export * from '@xala-technologies/platform-ui/features/rental-objects';
export * from '@xala-technologies/platform-ui/features/reviews';
export * from '@xala-technologies/platform-ui/features/docs';
export * from '@xala-technologies/platform-ui/features/notifications';
export * from '@xala-technologies/platform-ui/features/rental-object-details';
```

---

## Migration Steps

### Phase 1: Preparation (1 hour)

#### Step 1.1: Create Features Directory

```bash
cd /Volumes/Laravel/Xala-SAAS/tools/xala-platform-ui/packages/platform-ui
mkdir -p src/features
```

#### Step 1.2: Backup Current State

```bash
cd /Volumes/Laravel/Xala-SAAS/tools/Digilist
git checkout -b backup/digilist-ui-pre-consolidation
git add -A
git commit -m "backup: @digilist/ui before consolidation"
```

#### Step 1.3: Document Import Mappings

Create mapping file for automated find/replace:

```bash
# File: /tmp/import-mappings.txt
@digilist/ui/features/booking → @xala-technologies/platform-ui/features/booking
@digilist/ui/features/calendar → @xala-technologies/platform-ui/features/calendar
@digilist/ui/features/seasons → @xala-technologies/platform-ui/features/seasons
@digilist/ui/features/gdpr → @xala-technologies/platform-ui/features/gdpr
@digilist/ui/features/settings → @xala-technologies/platform-ui/features/settings
@digilist/ui/features/organizations → @xala-technologies/platform-ui/features/organizations
@digilist/ui/features/rental-objects → @xala-technologies/platform-ui/features/rental-objects
@digilist/ui/features/reviews → @xala-technologies/platform-ui/features/reviews
@digilist/ui/features/docs → @xala-technologies/platform-ui/features/docs
@digilist/ui/features/notifications → @xala-technologies/platform-ui/features/notifications
@digilist/ui/features/rental-object-details → @xala-technologies/platform-ui/features/rental-object-details
```

---

### Phase 2: Move Components (30 minutes)

#### Step 2.1: Copy Feature Directories

```bash
#!/bin/bash
# Script: migrate-ui-features.sh

SOURCE_DIR="/Volumes/Laravel/Xala-SAAS/tools/Digilist/packages/ui/src/features"
TARGET_DIR="/Volumes/Laravel/Xala-SAAS/tools/xala-platform-ui/packages/platform-ui/src/features"

# Create target directory
mkdir -p "$TARGET_DIR"

# Copy each feature
for feature in booking calendar seasons gdpr settings organizations rental-objects reviews docs notifications rental-object-details; do
  echo "Copying $feature..."
  cp -r "$SOURCE_DIR/$feature" "$TARGET_DIR/"
done

# Copy feature index
cp "$SOURCE_DIR/index.ts" "$TARGET_DIR/index.ts"

echo "✅ All features copied to platform-ui"
```

#### Step 2.2: Copy Types

```bash
# Copy UI types to platform-ui
cp -r /Volumes/Laravel/Xala-SAAS/tools/Digilist/packages/ui/src/types/* \
     /Volumes/Laravel/Xala-SAAS/tools/xala-platform-ui/packages/platform-ui/src/types/
```

---

### Phase 3: Update Package Configuration (30 minutes)

#### Step 3.1: Update platform-ui package.json

**File:** `/Volumes/Laravel/Xala-SAAS/tools/xala-platform-ui/packages/platform-ui/package.json`

Add new exports:

```json
{
  "exports": {
    ".": "./dist/index.js",
    "./primitives": "./dist/primitives.js",
    "./composed": "./dist/composed.js",
    "./blocks": "./dist/blocks.js",
    "./patterns": "./dist/patterns.js",
    "./shells": "./dist/shells.js",
    "./themes": "./dist/themes.js",
    "./features/booking": "./dist/features/booking.js",
    "./features/calendar": "./dist/features/calendar.js",
    "./features/seasons": "./dist/features/seasons.js",
    "./features/gdpr": "./dist/features/gdpr.js",
    "./features/settings": "./dist/features/settings.js",
    "./features/organizations": "./dist/features/organizations.js",
    "./features/rental-objects": "./dist/features/rental-objects.js",
    "./features/reviews": "./dist/features/reviews.js",
    "./features/docs": "./dist/features/docs.js",
    "./features/notifications": "./dist/features/notifications.js",
    "./features/rental-object-details": "./dist/features/rental-object-details.js"
  }
}
```

#### Step 3.2: Update tsup.config.ts

**File:** `/Volumes/Laravel/Xala-SAAS/tools/xala-platform-ui/packages/platform-ui/tsup.config.ts`

Add feature entries:

```typescript
export default defineConfig({
  entry: {
    index: 'src/index.ts',
    primitives: 'src/primitives/index.ts',
    composed: 'src/composed/index.ts',
    blocks: 'src/blocks/index.ts',
    patterns: 'src/patterns/index.ts',
    shells: 'src/shells/index.ts',
    themes: 'src/themes/index.ts',
    // NEW: Feature entries
    'features/booking': 'src/features/booking/index.ts',
    'features/calendar': 'src/features/calendar/index.ts',
    'features/seasons': 'src/features/seasons/index.ts',
    'features/gdpr': 'src/features/gdpr/index.ts',
    'features/settings': 'src/features/settings/index.ts',
    'features/organizations': 'src/features/organizations/index.ts',
    'features/rental-objects': 'src/features/rental-objects/index.ts',
    'features/reviews': 'src/features/reviews/index.ts',
    'features/docs': 'src/features/docs/index.ts',
    'features/notifications': 'src/features/notifications/index.ts',
    'features/rental-object-details': 'src/features/rental-object-details/index.ts',
  },
  format: ['cjs', 'esm'],
  dts: true,
  splitting: false,
  sourcemap: true,
  clean: true,
});
```

#### Step 3.3: Update Main Index

**File:** `/Volumes/Laravel/Xala-SAAS/tools/xala-platform-ui/packages/platform-ui/src/index.ts`

Add feature re-exports:

```typescript
// Existing exports
export * from './primitives';
export * from './composed';
export * from './blocks';
export * from './patterns';
export * from './shells';
export * from './themes';

// NEW: Feature exports (optional - for convenience)
export * from './features';
```

Create features index:

**File:** `/Volumes/Laravel/Xala-SAAS/tools/xala-platform-ui/packages/platform-ui/src/features/index.ts`

```typescript
// Feature exports
export * from './booking';
export * from './calendar';
export * from './seasons';
export * from './gdpr';
export * from './settings';
export * from './organizations';
export * from './rental-objects';
export * from './reviews';
export * from './docs';
export * from './notifications';
export * from './rental-object-details';
```

---

### Phase 4: Update Imports Across Codebase (1 hour)

#### Step 4.1: Find All Import Locations

```bash
# Find all files importing from @digilist/ui
cd /Volumes/Laravel/Xala-SAAS/tools/Digilist
grep -r "@digilist/ui" --include="*.ts" --include="*.tsx" apps/ packages/runtime/ > /tmp/ui-imports.txt

echo "Total files with @digilist/ui imports:"
wc -l /tmp/ui-imports.txt
```

#### Step 4.2: Automated Import Replacement

```bash
#!/bin/bash
# Script: replace-imports.sh

cd /Volumes/Laravel/Xala-SAAS/tools/Digilist

# Find and replace in TypeScript/TSX files
find apps packages/runtime -type f \( -name "*.ts" -o -name "*.tsx" \) -exec sed -i '' \
  -e 's|@digilist/ui/features/booking|@xala-technologies/platform-ui/features/booking|g' \
  -e 's|@digilist/ui/features/calendar|@xala-technologies/platform-ui/features/calendar|g' \
  -e 's|@digilist/ui/features/seasons|@xala-technologies/platform-ui/features/seasons|g' \
  -e 's|@digilist/ui/features/gdpr|@xala-technologies/platform-ui/features/gdpr|g' \
  -e 's|@digilist/ui/features/settings|@xala-technologies/platform-ui/features/settings|g' \
  -e 's|@digilist/ui/features/organizations|@xala-technologies/platform-ui/features/organizations|g' \
  -e 's|@digilist/ui/features/rental-objects|@xala-technologies/platform-ui/features/rental-objects|g' \
  -e 's|@digilist/ui/features/reviews|@xala-technologies/platform-ui/features/reviews|g' \
  -e 's|@digilist/ui/features/docs|@xala-technologies/platform-ui/features/docs|g' \
  -e 's|@digilist/ui/features/notifications|@xala-technologies/platform-ui/features/notifications|g' \
  -e 's|@digilist/ui/features/rental-object-details|@xala-technologies/platform-ui/features/rental-object-details|g' \
  -e 's|@digilist/ui/platform|@xala-technologies/platform-ui|g' \
  {} \;

echo "✅ All imports updated"
```

#### Step 4.3: Update Package Dependencies

**Files to update:**
- `/Volumes/Laravel/Xala-SAAS/tools/Digilist/apps/backoffice/package.json`
- `/Volumes/Laravel/Xala-SAAS/tools/Digilist/packages/runtime/package.json`
- Any other packages depending on `@digilist/ui`

**Change:**
```json
{
  "dependencies": {
    // Remove this:
    "@digilist/ui": "workspace:*",

    // Keep/Add this:
    "@xala-technologies/platform-ui": "^1.0.0"
  }
}
```

---

### Phase 5: Update Build Configuration (30 minutes)

#### Step 5.1: Update Vite Config (Backoffice App)

**File:** `/Volumes/Laravel/Xala-SAAS/tools/Digilist/apps/backoffice/vite.config.ts`

Remove all `@digilist/ui` aliases and add platform-ui features:

```typescript
resolve: {
  alias: {
    // Remove all @digilist/ui aliases
    // '@digilist/ui/platform/primitives': ...
    // '@digilist/ui/platform/composed': ...
    // etc.

    // Add platform-ui feature aliases (if needed for dev)
    '@xala-technologies/platform-ui/features/booking': path.resolve(
      __dirname,
      '../../../xala-platform-ui/packages/platform-ui/src/features/booking'
    ),
    '@xala-technologies/platform-ui/features/calendar': path.resolve(
      __dirname,
      '../../../xala-platform-ui/packages/platform-ui/src/features/calendar'
    ),
    // ... other features
  },
},
```

#### Step 5.2: Update Runtime Package Exports

**File:** `/Volumes/Laravel/Xala-SAAS/tools/Digilist/packages/runtime/src/features/backoffice/index.ts`

Update imports:

```typescript
// Before
export * from '@digilist/ui/features/backoffice-settings';
export * from '@digilist/ui/platform';

// After
export * from '@xala-technologies/platform-ui/features/settings';
export * from '@xala-technologies/platform-ui';
```

---

### Phase 6: Testing & Verification (1 hour)

#### Step 6.1: Build All Packages

```bash
# Build platform-ui with new features
cd /Volumes/Laravel/Xala-SAAS/tools/xala-platform-ui/packages/platform-ui
pnpm build

# Build runtime package
cd /Volumes/Laravel/Xala-SAAS/tools/Digilist/packages/runtime
pnpm build

# Build client-sdk
cd /Volumes/Laravel/Xala-SAAS/tools/Digilist/packages/client-sdk
pnpm build
```

#### Step 6.2: TypeScript Validation

```bash
cd /Volumes/Laravel/Xala-SAAS/tools/Digilist/apps/backoffice
npx tsc --noEmit

cd /Volumes/Laravel/Xala-SAAS/tools/xala-platform-ui
pnpm typecheck
```

#### Step 6.3: Run Tests

```bash
# Test client-sdk (should still pass)
cd /Volumes/Laravel/Xala-SAAS/tools/Digilist/packages/client-sdk
pnpm test

# Test platform-ui
cd /Volumes/Laravel/Xala-SAAS/tools/xala-platform-ui
pnpm test:storybook
```

#### Step 6.4: Start Dev Server

```bash
cd /Volumes/Laravel/Xala-SAAS/tools/Digilist/apps/backoffice
pnpm dev

# Check these routes work:
# - /bookings (uses booking features)
# - /calendar (uses calendar features)
# - /seasons (uses seasons features)
# - /gdpr-requests (uses GDPR features)
```

---

### Phase 7: Cleanup (30 minutes)

#### Step 7.1: Deprecate @digilist/ui Package

**Option 1: Keep for backward compatibility (recommended initially)**

Add deprecation notice to package.json:

```json
{
  "name": "@digilist/ui",
  "version": "2.0.0",
  "deprecated": "This package has been merged into @xala-technologies/platform-ui. Please update your imports.",
  "main": "./dist/index.js"
}
```

Create shim exports that forward to platform-ui:

```typescript
// @digilist/ui/src/index.ts
export * from '@xala-technologies/platform-ui/features/booking';
export * from '@xala-technologies/platform-ui/features/calendar';
// ... etc
```

**Option 2: Remove entirely (after migration confirmed)**

```bash
# After confirming everything works
rm -rf /Volumes/Laravel/Xala-SAAS/tools/Digilist/packages/ui
```

#### Step 7.2: Update Documentation

Update these files:
- `/Volumes/Laravel/Xala-SAAS/tools/xala-platform-ui/README.md`
- `/Volumes/Laravel/Xala-SAAS/tools/xala-platform-ui/docs/architecture/ARCHITECTURE.md`
- `/Volumes/Laravel/Xala-SAAS/tools/xala-platform-ui/docs/architecture/COMPONENTS.md`
- `/Volumes/Laravel/Xala-SAAS/tools/xala-platform-ui/CLAUDE.md`

#### Step 7.3: Update MVVM Documentation

Update MVVM docs to reflect new import paths:

**File:** `/Volumes/Laravel/Xala-SAAS/tools/xala-platform-ui/docs/architecture/MVVM.md`

Update examples:

```typescript
// Before
import { CalendarSection } from '@digilist/ui/features/calendar';

// After
import { CalendarSection } from '@xala-technologies/platform-ui/features/calendar';
```

---

## Import Migration Examples

### Before (Old Imports)

```typescript
// Backoffice app routes
import { CalendarSection } from '@digilist/ui/features/calendar';
import { BookingEngine } from '@digilist/ui/features/booking';
import { SeasonList } from '@digilist/ui/features/seasons';
import { GdprRequestQueue } from '@digilist/ui/features/gdpr';
```

### After (New Imports)

```typescript
// Backoffice app routes
import { CalendarSection } from '@xala-technologies/platform-ui/features/calendar';
import { BookingEngine } from '@xala-technologies/platform-ui/features/booking';
import { SeasonList } from '@xala-technologies/platform-ui/features/seasons';
import { GdprRequestQueue } from '@xala-technologies/platform-ui/features/gdpr';
```

---

## Benefits After Consolidation

### 1. Simplified Architecture

**Before:**
```
Apps
 ↓
@digilist/ui (features)
 ↓
@xala-technologies/platform-ui (primitives/blocks)
 ↓
@digdir/designsystemet-react
```

**After:**
```
Apps
 ↓
@xala-technologies/platform-ui (primitives/blocks/features)
 ↓
@digdir/designsystemet-react
```

### 2. Single Package to Maintain

- ✅ One package.json
- ✅ One build configuration
- ✅ One test suite
- ✅ One Storybook
- ✅ One versioning strategy

### 3. Clearer Import Paths

All UI imports from single source:

```typescript
import { Button } from '@xala-technologies/platform-ui';
import { DataTable } from '@xala-technologies/platform-ui/composed';
import { BookingEngine } from '@xala-technologies/platform-ui/features/booking';
```

### 4. Better Tree-Shaking

Single package allows better build optimization:
- Import only what you need
- Shared dependencies optimized
- No cross-package bundling complexity

---

## Risk Assessment

### Medium Risks

1. **Import Update Errors** (Likelihood: Medium, Impact: High)
   - **Mitigation:** Automated script with verification
   - **Recovery:** Keep backup branch, easy rollback

2. **Build Configuration Issues** (Likelihood: Medium, Impact: Medium)
   - **Mitigation:** Test builds before committing
   - **Recovery:** Iterative fixes, well-documented config

3. **Runtime Errors from Missed Imports** (Likelihood: Low, Impact: High)
   - **Mitigation:** TypeScript compilation catches most
   - **Recovery:** E2E tests, dev server testing

### Low Risks

4. **Storybook Story Paths** (Likelihood: Low, Impact: Low)
   - Stories may need path updates
   - Easy to fix incrementally

5. **Test Path Updates** (Likelihood: Low, Impact: Low)
   - Test imports need updating
   - TypeScript will catch errors

---

## Rollback Plan

If critical issues arise:

```bash
# Rollback steps
git checkout backup/digilist-ui-pre-consolidation
git checkout main
git reset --hard backup/digilist-ui-pre-consolidation
pnpm install
```

**Recovery time:** <30 minutes

---

## Timeline Estimate

| Phase | Duration | Dependencies |
|-------|----------|--------------|
| **Phase 1: Preparation** | 1 hour | None |
| **Phase 2: Move Components** | 30 min | Phase 1 |
| **Phase 3: Update Package Config** | 30 min | Phase 2 |
| **Phase 4: Update Imports** | 1 hour | Phase 3 |
| **Phase 5: Update Build Config** | 30 min | Phase 4 |
| **Phase 6: Testing** | 1 hour | Phase 5 |
| **Phase 7: Cleanup** | 30 min | Phase 6 |
| **Total** | **5 hours** | |

**Recommended schedule:** 1 day (allows for unexpected issues)

---

## Success Criteria

- ✅ All components moved to platform-ui
- ✅ Zero TypeScript errors
- ✅ All tests passing (506 client-sdk tests + platform-ui tests)
- ✅ Dev server starts successfully
- ✅ All migrated pages render correctly
- ✅ Storybook builds and renders stories
- ✅ Production build succeeds
- ✅ Bundle size within acceptable range (<10% increase)

---

## Next Steps

1. **Get approval** for consolidation plan
2. **Create backup branch**
3. **Execute migration** (follow phases 1-7)
4. **Test thoroughly** before committing
5. **Update documentation**
6. **Deploy to staging** for final verification
7. **Merge to main** after confirmation

---

## Post-Migration

### Immediate (Week 1)

- Monitor for runtime errors
- Fix any missed imports
- Update Storybook stories

### Short-term (Month 1)

- Deprecate `@digilist/ui` package completely
- Update all documentation
- Create migration guide for other teams

### Long-term (Quarter 1)

- Reorganize features for better structure
- Extract truly generic components to separate primitives
- Consider publishing platform-ui as public package

---

**Status:** ✅ Ready to execute
**Risk Level:** Medium (manageable with proper testing)
**Estimated Time:** 5 hours (1 business day)
**Recommended:** Proceed with consolidation

---

**Document Version:** 1.0
**Last Updated:** 2026-01-26
**Owner:** Development Team
