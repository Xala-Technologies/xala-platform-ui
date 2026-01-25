# Platform-UI Inventory

**Generated:** 2026-01-25  
**Package:** `@xala-technologies/platform/ui`  
**Base:** Built on `@digdir/designsystemet-react`

---

## Package Structure

```
packages/platform-ui/src/
├── primitives/     # 24 base components
├── composed/       # 78+ higher-level components
├── blocks/         # 49 business-logic components
├── patterns/       # 27 domain-neutral patterns
├── shells/         # 7 application shells
├── pages/          # 2 full page layouts
├── themes/         # Theme utilities
└── stories/        # 126+ Storybook stories
```

---

## 1. Primitives (Base Components)

| Component | File | Description |
|-----------|------|-------------|
| `Badge` | badge.tsx | Status badges |
| `BidiSafeInput` | BidiSafeInput.tsx | RTL-safe input |
| `Card` | card.tsx | Basic card container |
| `Center` | center.tsx | Centering layout |
| `CodeBlock` | CodeBlock.tsx | Code display |
| `Container` | container.tsx | Max-width container |
| `DirectionalIcon` | DirectionalIcon.tsx | RTL-aware icons |
| `FilterChip` | FilterChip.tsx | Filter tag |
| `FormField` | FormField.tsx | Form field wrapper |
| `Grid` | grid.tsx | Grid layout |
| `HorizontalLayout` | horizontal-layout.tsx | Horizontal flex |
| `Icon` | icon.tsx | Icon wrapper |
| `Icons` | icons.tsx | Icon library (28KB) |
| `LayoutGrid` | layout-grid.tsx | Page layout grid |
| `Logo` | Logo.tsx | Brand logo |
| `MainContent` | main-content.tsx | Main content area |
| `NativeSelect` | NativeSelect.tsx | Native select |
| `Progress` | progress.tsx | Progress indicator |
| `SelectOption` | SelectOption.tsx | Select option |
| `Sidebar` | sidebar.tsx | Sidebar container |
| `Stack` | stack.tsx | Vertical stack |
| `Text` | text.tsx | Typography |

Plus all `@digdir/designsystemet-react` exports (Button, Checkbox, Radio, Textfield, etc.)

---

## 2. Composed Components (78 exports)

### Layout & Structure
| Component | Description |
|-----------|-------------|
| `ContentLayout` | Page content wrapper |
| `ContentSection` | Section within page |
| `PageHeader` | Page title + actions |
| `PageContainer` | Consistent page wrapper |
| `PageShell` (List/Detail/Form) | Page templates |

### Header & Navigation
| Component | Description |
|-----------|-------------|
| `AppHeader` | Main app header |
| `HeaderLogo/Search/Actions` | Header sub-components |
| `Navigation`, `NavigationLink` | Main nav |
| `Breadcrumb`, `useBreadcrumbs` | Breadcrumb navigation |
| `MobileNav`, `MobileNavToggle` | Mobile navigation |
| `BottomNavigation` | Mobile bottom nav |
| `UserMenu` | User dropdown |

### Filtering & Tables
| Component | Description |
|-----------|-------------|
| `FilterBar` | Filter controls |
| `FilterPanel` | Dropdown filter builder |
| `FilterChipsBar` | Active filters display |
| `TableConditionsFilter` | Advanced filter builder |
| `TableFilter` | Simple table filter |
| `DataTable` | Data table with sorting |
| `TableRowActions` | Row action menu |
| `ListToolbar` | List page toolbar |

### Dialogs & Modals
| Component | Description |
|-----------|-------------|
| `Modal` (Header/Body/Footer) | Base modal |
| `Drawer` (Section/Item) | Slide panel |
| `ConfirmDialog`, `AlertDialog` | Confirmation dialogs |
| `ActionDialog` | Action confirmation |
| `DemoLoginDialog` | Demo login modal |
| `CommandPalette` | Cmd+K search |

### Forms & Inputs
| Component | Description |
|-----------|-------------|
| `FormSection`, `FormActions` | Form layout |
| `FormRow`, `FormField` | Form row helpers |
| `RichTextEditor` | WYSIWYG editor |
| `FileUploader` | File upload |
| `DateRangePicker` | Date range picker |
| `SearchableSelect` | Combobox/autocomplete |
| `NumberInput` | Numeric input |
| `Slider`, `RangeSlider` | Range inputs |
| `Rating`, `RatingDisplay` | Star ratings |

### Data Display
| Component | Description |
|-----------|-------------|
| `StatCard`, `StatCardGrid` | Dashboard stats |
| `SectionCard` (Header/Content/Footer) | Content sections |
| `DetailField`, `DetailFieldGroup` | Labeled data |
| `KeyValue`, `KeyValueList` | Key-value pairs |
| `Timeline`, `CompactTimeline` | Activity timeline |
| `Accordion`, `Collapsible` | Expandable content |
| `PDFPreview` | PDF viewer |
| `CodeBlock`, `InlineCode` | Code display |

### Wizards & Steppers
| Component | Description |
|-----------|-------------|
| `WizardStepper` | Multi-step wizard nav |
| `Stepper` | Step indicator |
| `Wizard`, `WizardNavigation` | Wizard container |
| `ResourceRequestStepper` | Booking wizard |

### Feedback & Status
| Component | Description |
|-----------|-------------|
| `ToastProvider`, `useToast` | Toast notifications |
| `StatusBanner` | Contextual status |
| `LoadingState`, `EmptyState` | Page states |
| `NotFoundState`, `ErrorState` | Error states |
| `LoadingFallback` | Suspense fallback |
| `Skeleton` variants | Loading skeletons |
| `Progress` variants | Progress indicators |

### Misc
| Component | Description |
|-----------|-------------|
| `LanguageSwitcher` | Language picker |
| `SimpleTabs`, `TabItem` | Tab navigation |
| `AvatarGroup` | User avatars |
| `SortableList` | Drag-drop list |
| `ActionMenu`, `ContextMenu` | Dropdown menus |
| `InfiniteScroll`, `VirtualList` | Scroll virtualization |
| `Spotlight`, `HighlightText` | Text highlighting |
| `TemplateCanvas` | Template builder |
| `Popover` (Header/Body/Footer) | Popover component |

---

## 3. Blocks (49 exports)

### Resource Display
| Component | Description | Storybook |
|-----------|-------------|-----------|
| `ImageSlider` | Hero image carousel | ✅ |
| `ImageGallery` | Thumbnail gallery | ✅ |
| `CapacityCard` | Capacity display | ✅ |
| `ContactInfoCard` | Contact info | ✅ |
| `LocationCard` | Map + address | ✅ |
| `OpeningHoursCard` | Hours table | ✅ |
| `AdditionalServicesList` | Add-on services | ✅ |
| `AmenityChips` | Facility chips | ✅ |
| `GuidelinesTab` | Guidelines content | ✅ |
| `FAQTab` | FAQ accordion | ✅ |
| `PeriodCard` | Period/event card | ✅ |
| `MediaResourceCard` | Resource card | ✅ |

### Status Badges
| Component | Description | Storybook |
|-----------|-------------|-----------|
| `StatusTag` | Generic status | ✅ |
| `PaymentStatusBadge` | Payment status | ✅ |
| `ResourceStatusBadge` | Resource status | ✅ |
| `RequestStatusBadge` | Request status | ✅ |
| `OrganizationStatusBadge` | Org status | ✅ |
| `UserStatusBadge` | User status | ✅ |
| `InventoryBadge` | Stock count | ✅ |
| `CapacityBadge` | Capacity label | ✅ |

### Dashboard
| Component | Description | Storybook |
|-----------|-------------|-----------|
| `BlockStatCard` | Stats display | ✅ |
| `ActivityItem`, `ActivityFeed` | Activity list | ✅ |
| `QuickActionCard` | Quick action | ✅ |
| `BarChart`, `VerticalBarChart` | Charts | ✅ |

### Auth & Access
| Component | Description | Storybook |
|-----------|-------------|-----------|
| `RequireAuthModal` | Auth gate | ✅ |
| `LoginLayout`, `LoginOption` | Login UI | ✅ |
| `LoadingScreen`, `AccessDeniedScreen` | Auth states | ✅ |
| `PermissionGate` | Permission check | ✅ |

### Error Handling
| Component | Description | Storybook |
|-----------|-------------|-----------|
| `ErrorBoundary` | Error boundary | ✅ |
| `GlobalErrorHandler` | Global errors | ✅ |

### GDPR
| Component | Description | Storybook |
|-----------|-------------|-----------|
| `ConsentManager` | Cookie consent | ✅ |
| `ConsentPopup`, `ConsentSettings` | Consent UI | ✅ |
| `DataExportCard` | Data export | ✅ |
| `DeleteAccountCard` | Account deletion | ✅ |
| `DataSubjectRequestForm` | DSAR form | ✅ |

### Admin
| Component | Description | Storybook |
|-----------|-------------|-----------|
| `ScopeSelector` | Scope picker | ✅ |
| `PermissionMatrix` | Permissions grid | ✅ |
| `EffectivePermissionsView` | Permission view | ✅ |
| `UserInviteForm` | User invite | ✅ |

### Messaging
| Component | Description | Storybook |
|-----------|-------------|-----------|
| `NotificationBell` | Notification icon | ✅ |
| `ConversationList` | Message list | ✅ |
| `MessageBubble`, `ChatThread` | Chat UI | ✅ |

### Other
| Component | Description | Storybook |
|-----------|-------------|-----------|
| `ShareButton`, `ShareSheet` | Share UI | ✅ |
| `ExplorerItem` | File explorer item | ✅ |
| `PreviewArea` | Preview container | ✅ |
| `WorkflowStep`, `WorkflowPipeline` | Workflow UI | ✅ |
| `HelpPanel` | Help system | ✅ |

---

## 4. Patterns (27 exports)

### Resource Patterns
| Component | Description | Storybook |
|-----------|-------------|-----------|
| `ResourceCard` | Resource card | ✅ |
| `ResourceGrid` | Resource grid | ✅ |
| `ResourceDetailHeader` | Detail header | ✅ |
| `FeatureChips` | Feature tags | ✅ |
| `MetadataRow` | Metadata display | ✅ |
| `KeyFacts` | Key facts row | ✅ |

### Booking Patterns
| Component | Description | Storybook |
|-----------|-------------|-----------|
| `SlotCalendar` | Booking calendar | ✅ |
| `PricingSummary` | Price display | ✅ |
| `ScheduleCard` | Schedule display | ✅ |
| `CartSidebar` | Cart/summary | ✅ |
| `AddOnsSelector` | Add-on selection | ✅ |

### Form Patterns
| Component | Description | Storybook |
|-----------|-------------|-----------|
| `FormWizardModal` | Wizard modal | ✅ |
| `MultiStepFormModal` | Multi-step form | ✅ |
| `ReviewStep` | Review before submit | ✅ |
| `ModeSelector` | Radio card selector | ✅ |
| `ToggleMatrix` | Permission matrix | ✅ |

### Feedback Patterns
| Component | Description | Storybook |
|-----------|-------------|-----------|
| `ConfirmationView` | Confirmation page | ✅ |
| `SuccessView` | Success page | ✅ |
| `FeedbackForm` | Feedback form | ✅ |
| `ReviewCard` | Review display | ✅ |
| `ReviewList` | Review list | ✅ |

### Other Patterns
| Component | Description | Storybook |
|-----------|-------------|-----------|
| `StepperHeader` | Stepper navigation | ✅ |
| `SelectionActionsBar` | Bulk actions | ✅ |
| `ActivityTimeline` | Activity feed | ✅ |

---

## 5. Shells (7 exports)

| Component | Description |
|-----------|-------------|
| `AppShell` | Full app layout |
| `Shell` | Base shell |
| `AppLayout` | App layout container |
| `DashboardContent` | Dashboard main area |
| `DashboardHeader` | Dashboard header |
| `DashboardSidebar` | Dashboard sidebar |

---

## 6. Pages (2 exports)

| Component | Description |
|-----------|-------------|
| `LoginPage` | Login page |

---

## 7. Storybook Coverage

**Total Stories:** 126+

### By Category
| Category | Count |
|----------|-------|
| Blocks | 54 stories |
| Composed | 47 stories |
| Patterns | 23 stories |
| Components | 31 stories |
| Shells | 2 stories |
| Fundamentals | 10 stories |

### Coverage Assessment
- ✅ **Excellent:** Most blocks and composed components have stories
- ⚠️ **Gaps:** Some patterns missing comprehensive state stories
- ❌ **Missing:** Loading/error states for some components

---

## 8. Localization Approach

- Keys defined in `packages/localization/`
- Components use `useTranslations()` hook
- Supported locales: `nb` (Norwegian), `en` (English)
- Labels passed as props for customization

---

## 9. Design Tokens

- Built on `@digdir/designsystemet-tokens`
- Custom extensions in `packages/platform-ui/src/themes/`
- CSS variables for colors, spacing, typography
- Theme switching via `ThemeProvider`

---

## 10. Accessibility Features

| Feature | Status |
|---------|--------|
| Keyboard navigation | ✅ Implemented |
| Focus management | ✅ Implemented |
| ARIA attributes | ✅ Where needed |
| Screen reader support | ✅ Tested |
| Color contrast | ✅ WCAG AA |
| RTL support | ✅ Via DirectionalIcon |
| Skip links | ✅ SkipLinks component |
