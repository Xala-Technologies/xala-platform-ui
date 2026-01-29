# UX Lexicon Audit

Current inventory of Platform UI components and their lexicon documentation status.

## Component Inventory by Layer

### @digdir (External - Designsystemet)

Components imported directly from `@digdir/designsystemet-react`:

| Component | Lexicon Entry | State Coverage | Storybook |
|-----------|---------------|----------------|-----------|
| `Heading` | ⬜ Missing | N/A | ⬜ |
| `Paragraph` | ⬜ Missing | N/A | ⬜ |
| `Label` | ⬜ Missing | N/A | ⬜ |
| `Button` | ⬜ Missing | N/A | ⬜ |
| `Textfield` | ⬜ Missing | N/A | ⬜ |
| `Textarea` | ⬜ Missing | N/A | ⬜ |
| `Select` | ⬜ Missing | N/A | ⬜ |
| `Checkbox` | ⬜ Missing | N/A | ⬜ |
| `Radio` | ⬜ Missing | N/A | ⬜ |
| `Switch` | ⬜ Missing | N/A | ⬜ |
| `Card` | ⬜ Missing | N/A | ⬜ |
| `Alert` | ⬜ Missing | N/A | ⬜ |
| `Link` | ⬜ Missing | N/A | ⬜ |
| `Spinner` | ⬜ Missing | N/A | ⬜ |
| `Skeleton` | ⬜ Missing | N/A | ⬜ |
| `Modal` | ⬜ Missing | N/A | ⬜ |
| `Popover` | ⬜ Missing | N/A | ⬜ |
| `Tooltip` | ⬜ Missing | N/A | ⬜ |
| `Tabs` | ⬜ Missing | N/A | ⬜ |
| `Accordion` | ⬜ Missing | N/A | ⬜ |
| `Table` | ⬜ Missing | N/A | ⬜ |
| `Tag` | ⬜ Missing | N/A | ⬜ |
| `Badge` | ⬜ Missing | N/A | ⬜ |
| `Divider` | ⬜ Missing | N/A | ⬜ |

### Primitives (Level 0)

Thin wrappers around Designsystemet:

| Component | Lexicon Entry | State Coverage | Storybook |
|-----------|---------------|----------------|-----------|
| `Container` | ⬜ Missing | ⬜ | ⬜ |
| `Stack` | ⬜ Missing | ⬜ | ⬜ |
| `Grid` | ⬜ Missing | ⬜ | ⬜ |
| `Box` | ⬜ Missing | ⬜ | ⬜ |

### Composed (Level 1)

Multi-component compositions:

| Component | Lexicon Entry | State Coverage | Storybook |
|-----------|---------------|----------------|-----------|
| `DataTable` | ⬜ Missing | ⬜ | ⬜ |
| `FormSection` | ⬜ Missing | ⬜ | ⬜ |
| `FormLayout` | ⬜ Missing | ⬜ | ⬜ |
| `SearchableSelect` | ⬜ Missing | ⬜ | ⬜ |
| `NumberInput` | ⬜ Missing | ⬜ | ⬜ |
| `DatePicker` | ⬜ Missing | ⬜ | ⬜ |
| `TimePicker` | ⬜ Missing | ⬜ | ⬜ |
| `Navigation` | ⬜ Missing | ⬜ | ⬜ |
| `Breadcrumb` | ⬜ Missing | ⬜ | ⬜ |
| `Pagination` | ⬜ Missing | ⬜ | ⬜ |
| `DefinitionList` | ⬜ Missing | ⬜ | ⬜ |
| `KeyValueList` | ⬜ Missing | ⬜ | ⬜ |
| `StateWrapper` | ⬜ **TO CREATE** | ⬜ | ⬜ |

### Blocks (Level 2)

Feature-specific UI blocks:

| Component | Lexicon Entry | State Coverage | Storybook |
|-----------|---------------|----------------|-----------|
| `NotificationBell` | ⬜ Missing | ⬜ | ⬜ |
| `UserMenu` | ⬜ Missing | ⬜ | ⬜ |
| `EmptyState` | ⬜ Missing | ⬜ | ⬜ |
| `ResultsEmptyState` | ⬜ Missing | ⬜ | ⬜ |
| `LoadingFallback` | ⬜ Missing | ⬜ | ⬜ |
| `AccessGate` | ⬜ **TO CREATE** | ⬜ | ⬜ |
| `ErrorPage` | ⬜ **TO CREATE** | ⬜ | ⬜ |

### Patterns (Level 3)

Reusable UI patterns:

| Component | Lexicon Entry | State Coverage | Storybook |
|-----------|---------------|----------------|-----------|
| `ResourceCard` | ⬜ Missing | ⬜ | ⬜ |
| `SlotCalendar` | ⬜ Missing | ⬜ | ⬜ |

### Shells (Level 4)

Layout components:

| Component | Lexicon Entry | State Coverage | Storybook |
|-----------|---------------|----------------|-----------|
| `AppLayout` | ⬜ Missing | ⬜ | ⬜ |
| `DashboardLayout` | ⬜ Missing | ⬜ | ⬜ |
| `DashboardHeader` | ⬜ Missing | ⬜ | ⬜ |
| `DashboardSidebar` | ⬜ Missing | ⬜ | ⬜ |
| `DashboardContent` | ⬜ Missing | ⬜ | ⬜ |
| `PageHeader` | ⬜ Missing | ⬜ | ⬜ |

## Missing Components to Implement

### Priority 1 (Required for Lexicon)

| Component | Layer | Purpose | Complexity |
|-----------|-------|---------|------------|
| `AccessGate` | blocks | RBAC "permission denied" pattern | Medium |
| `StateWrapper` | composed | HOC for state matrix handling | Medium |

### Priority 2 (Enhanced Patterns)

| Component | Layer | Purpose | Complexity |
|-----------|-------|---------|------------|
| `ErrorPage` | blocks | 404/500/403 templates | Low |
| `FormScaffold` | composed | Form with validation display | Medium |

## Golden Flow Coverage

| Flow | Status | Shell | Components Ready |
|------|--------|-------|------------------|
| list-page | ⬜ Not Started | DashboardLayout | Partial |
| detail-page | ⬜ Not Started | DashboardLayout | Partial |
| form-page | ⬜ Not Started | DashboardLayout | Partial |
| wizard-flow | ⬜ Not Started | DashboardLayout | Missing |
| search-results | ⬜ Not Started | DashboardLayout | Partial |
| empty-onboarding | ⬜ Not Started | DashboardLayout | Partial |
| access-denied | ⬜ Not Started | DashboardLayout | Missing (needs AccessGate) |
| audit-timeline | ⬜ Not Started | DashboardLayout | Missing |
| settings-page | ⬜ Not Started | DashboardLayout | Partial |
| notification-center | ⬜ Not Started | DashboardLayout | Partial |

## Legend

- ⬜ Missing / Not Started
- 🟡 Partial / In Progress
- ✅ Complete
- **TO CREATE** - Component needs to be implemented

## Next Steps

1. Implement `AccessGate` and `StateWrapper` components
2. Create dictionary entries for all @digdir components
3. Create dictionary entries for primitives layer
4. Document state coverage for composed layer
5. Write golden flow definitions

---

*Last updated: 2025-01-29*
