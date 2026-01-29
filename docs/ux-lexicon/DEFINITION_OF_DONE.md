# Definition of Done

For each component to be considered "Lexicon Complete", all items must be checked.

## Dictionary Entry Checklist

### Required

- [ ] **Dictionary entry exists** in `registry/dictionary/{category}.json`
- [ ] **Entry validates** against `schemas/dictionary-entry.schema.json`
- [ ] **HTML intent documented** with element and common attributes
- [ ] **Platform construct specified** with component name and import path
- [ ] **Layer correctly assigned** (@digdir, primitives, composed, blocks, patterns, shells)

### State Matrix

- [ ] **idle state** defined (normal interactive state)
- [ ] **loading state** defined with Skeleton/LoadingFallback component
- [ ] **empty state** defined with EmptyState component
- [ ] **error state** defined with Alert/error display component
- [ ] **success state** defined with Alert/Toast component
- [ ] **permissionDenied state** defined with AccessGate pattern

### Storybook

- [ ] **Story file exists** at documented `storybookPath`
- [ ] **Default story** demonstrates idle state
- [ ] **Loading story** demonstrates loading state
- [ ] **Empty story** demonstrates empty state
- [ ] **Error story** demonstrates error state
- [ ] **Interactive story** demonstrates user interactions

### Accessibility

- [ ] **ARIA role documented** if applicable
- [ ] **ARIA attributes documented** (aria-label, aria-describedby, etc.)
- [ ] **Keyboard interaction documented** (Tab, Enter, Escape, Arrow keys)
- [ ] **WCAG 2.2 AA criteria identified** (e.g., 1.4.3 Contrast, 2.1.1 Keyboard)
- [ ] **axe-core tests pass** in Storybook

### Internationalization

- [ ] **i18n pattern specified** (props, children, or render-prop)
- [ ] **Translatable props listed** (label, placeholder, title, etc.)
- [ ] **No hardcoded strings** in component

### Examples

- [ ] **JSX example is copy/paste ready**
- [ ] **Import statements included**
- [ ] **Example compiles** (verified by verify script)
- [ ] **Example demonstrates best practices**

### Responsive

- [ ] **Mobile behavior documented** if different from desktop
- [ ] **Breakpoint overrides specified** if applicable
- [ ] **Touch targets meet 44px minimum** (WCAG 2.5.5)

## Pattern Checklist

In addition to dictionary entry requirements:

- [ ] **All constituent components documented**
- [ ] **Component roles defined** (wrapper, trigger, content, etc.)
- [ ] **Anti-patterns documented** with bad examples
- [ ] **Related patterns linked**
- [ ] **Focus management documented**

## Golden Flow Checklist

In addition to pattern requirements:

- [ ] **Shell component specified**
- [ ] **All zones defined** (header, sidebar, main, footer, drawer, modal)
- [ ] **State transitions documented**
- [ ] **User actions mapped** to callbacks
- [ ] **Data requirements specified** (props and callbacks)
- [ ] **Complete page-level story exists**

## Verification Commands

```bash
# Verify single entry
node docs/ux-lexicon/scripts/verify-ux-lexicon.js --entry=button-action

# Verify category
node docs/ux-lexicon/scripts/verify-ux-lexicon.js --category=forms

# Verify all
pnpm verify:ux-lexicon
```

## Completion Metrics

Track completion status:

| Category | Total | Complete | Partial | Missing |
|----------|-------|----------|---------|---------|
| Layout | 5 | 0 | 0 | 5 |
| Typography | 5 | 0 | 0 | 5 |
| Forms | 10 | 0 | 0 | 10 |
| Lists | 4 | 0 | 0 | 4 |
| Navigation | 3 | 0 | 0 | 3 |
| Semantic | 5 | 0 | 0 | 5 |
| **Total** | **32** | **0** | **0** | **32** |

Update this table as entries are completed.
