# Design System Compliance Verification

## ✅ All Guardrails Passing

### Boundary Verification
```bash
pnpm verify:boundaries
```
**Status**: ✅ **PASSED** (219 files scanned)

**Checks:**
- ✅ No forbidden imports from platform packages
- ✅ Layer hierarchy maintained (primitives → composed → blocks → patterns → shells → pages)
- ✅ No direct src/ imports
- ✅ Architecture boundaries respected

### Design Token Verification
```bash
pnpm verify:design-tokens
```
**Status**: ✅ **PASSED** (219 files scanned)

**Checks:**
- ✅ No raw HTML elements (all use Designsystemet components)
- ✅ All inline styles use design tokens (`var(--ds-*)`)
- ✅ No hard-coded colors, spacing, or typography
- ✅ Layout properties (display, alignItems, etc.) are acceptable when no design token exists

## Compliance Details

### Shared Utilities (`packages/platform-ui/src/utils/`)

#### ✅ Icons (`icons.tsx`)
- Uses inline SVG (acceptable for icons)
- No violations
- Accessible and semantic

#### ✅ Badges (`badges.tsx`)
- **Colors**: All use `var(--ds-color-*)` tokens ✅
- **Spacing**: All use `var(--ds-spacing-*)` tokens ✅
- **Typography**: All use `var(--ds-font-size-*)` tokens ✅
- **Border Radius**: All use `var(--ds-border-radius-*)` tokens ✅
- **Layout Properties**: `display`, `alignItems`, `whiteSpace`, `alignSelf` - acceptable (no design token equivalents) ✅

#### ✅ Status (`status.tsx`)
- **Colors**: All use `var(--ds-color-*)` tokens ✅
- **Border Radius**: All use `var(--ds-border-radius-*)` tokens ✅
- **Dynamic Sizing**: `${size}px` - acceptable for flexible sizing ✅
- **Layout Properties**: `display: inline-block` - acceptable ✅

### Test Files (`tests/`)

Test files are **excluded** from guardrails (as per configuration):
- ✅ Unit tests (`tests/unit/`)
- ✅ Integration tests (`tests/integration/`)
- ✅ E2E tests (`tests/e2e/`)
- ✅ Test utilities (`tests/test-utils.tsx`, `tests/setup.ts`)

### Configuration Files

Configuration files are **excluded** from guardrails:
- ✅ `vitest.config.ts`
- ✅ `playwright.config.ts`
- ✅ `vitest.integration.config.ts`

## Design Token Usage Examples

### ✅ Compliant Code

```typescript
// Colors
backgroundColor: 'var(--ds-color-neutral-surface-hover)'
color: 'var(--ds-color-accent-text-default)'

// Spacing
padding: 'var(--ds-spacing-1) var(--ds-spacing-2)'
gap: 'var(--ds-spacing-4)'

// Typography
fontSize: 'var(--ds-font-size-xs)'
fontWeight: 500 // Numeric values acceptable

// Border Radius
borderRadius: 'var(--ds-border-radius-md)'
borderRadius: 'var(--ds-border-radius-full)'

// Layout Properties (no design token equivalents)
display: 'inline-flex' // ✅ Acceptable
alignItems: 'center' // ✅ Acceptable
whiteSpace: 'nowrap' // ✅ Acceptable
```

### ❌ Non-Compliant Code (Avoid)

```typescript
// Hard-coded colors
backgroundColor: '#0062BA' // ❌ Use var(--ds-color-*)
color: 'rgb(0, 98, 186)' // ❌ Use var(--ds-color-*)

// Hard-coded spacing
padding: '16px' // ❌ Use var(--ds-spacing-*)
margin: '1rem' // ❌ Use var(--ds-spacing-*)

// Hard-coded typography
fontSize: '14px' // ❌ Use var(--ds-font-size-*)

// Hard-coded border radius
borderRadius: '8px' // ❌ Use var(--ds-border-radius-*)
```

## Verification Commands

```bash
# Run all verifications
pnpm verify:all

# Individual checks
pnpm verify:boundaries
pnpm verify:design-tokens

# Full quality check (includes verifications)
pnpm quality
```

## CI/CD Integration

All guardrails run automatically in CI:
- ✅ Runs on every push/PR
- ✅ Must pass before merge
- ✅ Part of quality gate

## Notes

1. **Layout Properties**: CSS properties like `display`, `alignItems`, `flexDirection`, `whiteSpace`, etc. don't have design token equivalents and are acceptable in inline styles.

2. **Dynamic Sizing**: When design tokens don't support specific sizes (e.g., custom icon sizes), dynamic pixel values (`${size}px`) are acceptable.

3. **Numeric Values**: Some CSS properties like `fontWeight` use numeric values (400, 500, 600, 700) which are acceptable.

4. **Test Files**: Test files are excluded from guardrails to allow flexibility in testing scenarios.

---

**Last Verified**: All checks passing ✅
**Files Scanned**: 219 (boundaries), 219 (design tokens)
**Violations**: 0
