# Accessibility Violations Report

Generated: $(date)

## Summary

- **Total files scanned**: 708
- **Files with violations**: 189
- **Violation rate**: 26.7%

## Violation Types

### 1. Interactive Element Missing ARIA Label (Most Common)
- **Count**: ~200+ occurrences across 150+ files
- **Issue**: Interactive elements (button, input, select, textarea) without ARIA labels or associated labels
- **Note**: Many are false positives - Designsystemet components handle accessibility internally

### 2. Image Missing Alt Attribute
- **Count**: ~50+ occurrences across 30+ files
- **Issue**: `<img>` tags without `alt` attributes
- **Priority**: HIGH - Real accessibility issue

### 3. div/span with onClick Missing Role
- **Count**: ~40+ occurrences across 30+ files
- **Issue**: `<div>` or `<span>` elements with `onClick` handlers but no `role` attribute
- **Priority**: MEDIUM - Should use semantic HTML or add role

## Top Violating Files

### Blocks (High Priority)
- `MediaResourceCard.tsx` - 7 violations (images + interactive elements)
- `ImageSlider.tsx` - 10 violations (images + interactive elements)
- `PeriodCard.tsx` - 5 violations
- `ResourceCard.tsx` - 7 violations
- `ImageGallery.tsx` - 4 violations

### Composed (High Priority)
- `TableConditionsFilter.tsx` - 12 violations (interactive elements)
- `header-parts.tsx` - 10 violations (images + interactive elements)
- `filter-bar.tsx` - 7 violations
- `PDFPreview.tsx` - 8 violations
- `FilterPanel.tsx` - 10 violations

### Features (Medium Priority)
- `BookingConfirmationStep.tsx` - 11 violations
- `ConflictResolver.tsx` - 6 violations
- `RecurringBuilder.tsx` - 6 violations

## Recommendations

### Immediate Actions

1. **Fix Missing Alt Text** (HIGH Priority)
   - All images must have `alt` attributes
   - Use descriptive alt text or empty string for decorative images: `alt=""`

2. **Review Interactive Elements** (MEDIUM Priority)
   - Check if Designsystemet components are being used (they handle accessibility)
   - Add `aria-label` for icon-only buttons
   - Ensure form inputs have associated labels

3. **Fix Semantic HTML Issues** (MEDIUM Priority)
   - Replace `div`/`span` with `onClick` with proper `<button>` elements
   - Or add `role="button"` and ensure keyboard accessibility

### False Positives

Many violations are false positives because:
- Designsystemet components (`Button`, `Textfield`, etc.) handle accessibility internally
- The static scanner can't detect that these components already have proper ARIA attributes
- Runtime testing (axe-core) is more accurate

### Next Steps

1. Run runtime accessibility tests: `pnpm test:a11y`
2. Review violations in Storybook accessibility panel
3. Fix real violations (especially missing alt text)
4. Update scanner to exclude Designsystemet component usage

## Commands

```bash
# Static code analysis (this report)
pnpm verify:accessibility

# Runtime accessibility tests (more accurate)
pnpm test:a11y

# E2E accessibility tests
pnpm test:e2e tests/e2e/accessibility.spec.ts
```
