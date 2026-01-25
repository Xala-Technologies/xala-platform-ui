# Sketch-to-Block Mapping

**Generated:** 2026-01-25

This document maps each sketch to existing platform-ui components and identifies gaps.

---

## Legend

| Symbol | Meaning |
|--------|---------|
| ✅ | Use existing component as-is |
| 🔧 | Extend existing component (add props/variants) |
| ❌ | Create new component (gap) |
| 📦 | Compose from existing primitives |

---

## Flow A: Admin Wizard - "Opprett utleieobjekt"

### Step 1: Category & Type Selection

**Sketch:** `WhatsApp Image 2026-01-19 at 10.49.33.jpeg`

| UI Element | Existing Component | Status | Notes |
|------------|-------------------|--------|-------|
| Page layout | `Shell` + `ContentLayout` | ✅ | |
| Stepper header | `StepperHeader` | ✅ | |
| Category cards | `ModeSelector` | 🔧 | Need icon + description variant |
| Status sidebar | — | ❌ | **GAP: WizardStatusSidebar** |
| Footer actions | `FormActions` | ✅ | |

**Component Recipe:**
```tsx
<Shell>
  <StepperHeader steps={steps} currentStep={0} />
  <ContentLayout sidebar={<WizardStatusSidebar />}>
    <ModeSelector 
      options={categoryOptions} 
      variant="card-with-icon" 
    />
  </ContentLayout>
  <FormActions />
</Shell>
```

---

### Step 1b: Creation Method Selection

**Sketch:** `WhatsApp Image 2026-01-19 at 10.49.33 (1).jpeg`

| UI Element | Existing Component | Status | Notes |
|------------|-------------------|--------|-------|
| Radio-like cards | `ModeSelector` | ✅ | Already supports this |
| "Kopier eksisterende" | `ModeSelector` | ✅ | Add selection callback |
| External import URL | — | ❌ | **GAP: ExternalImportInput** |

---

### Step 1c: Location Form

**Sketch:** `WhatsApp Image 2026-01-19 at 10.49.33 (2).jpeg`

| UI Element | Existing Component | Status | Notes |
|------------|-------------------|--------|-------|
| Form layout | `FormSection` + `FormRow` | ✅ | |
| Text inputs | `Textfield` (primitive) | ✅ | |
| Map picker | `LocationCard` | 🔧 | Need editable mode |
| File upload | `FileUploader` | ✅ | |
| Facilities grid | `AmenityChips` | 🔧 | Need editable checkbox mode |
| Add services | `AddOnsSelector` | 🔧 | Need admin input mode |
| Contact persons | — | ❌ | **GAP: ContactPersonsEditor** |
| Universal design checkboxes | — | ❌ | **GAP: AccessibilityChecklistEditor** |

---

### Step 2: Availability Settings

**Sketch:** `WhatsApp Image 2026-01-19 at 10.49.33 (3).jpeg`

| UI Element | Existing Component | Status | Notes |
|------------|-------------------|--------|-------|
| Rental mode radio | `ModeSelector` | ✅ | Time vs Day toggle |
| Interval selector | `Radio` (primitive) | 📦 | Compose with labels |
| Weekday schedule | — | ❌ | **GAP: WeekdayScheduleEditor** |
| Blocked periods | — | ❌ | **GAP: BlockedPeriodsManager** |
| Calendar preview toggle | `Checkbox` (primitive) | ✅ | |

---

### Step 3: Rules & Approval

**Sketch:** `WhatsApp Image 2026-01-19 at 10.49.33 (4).jpeg`

| UI Element | Existing Component | Status | Notes |
|------------|-------------------|--------|-------|
| Approval mode radio | `ModeSelector` | 🔧 | Need description text |
| Age restriction | `NumberInput` | ✅ | |
| Cancellation deadline | `NumberInput` + `Select` | 📦 | |
| Parallel booking toggle | `Switch` (primitive) | ✅ | |

---

### Step 4: Pricing & Payment

**Sketch:** `WhatsApp Image 2026-01-19 at 10.49.33 (5).jpeg`

| UI Element | Existing Component | Status | Notes |
|------------|-------------------|--------|-------|
| Pricing model dropdown | `SearchableSelect` | ✅ | |
| MVA percentage | `NumberInput` | ✅ | |
| Target group pricing | — | ❌ | **GAP: PricingTiersEditor** |
| Payment methods | — | ❌ | **GAP: PaymentMethodConfig** |
| Rental terms upload | `FileUploader` | ✅ | |
| Identity verification | `Checkbox` (primitive) | 📦 | |

---

### Step 5: Publishing

**Sketch:** `WhatsApp Image 2026-01-19 at 10.49.33 (7).jpeg`

| UI Element | Existing Component | Status | Notes |
|------------|-------------------|--------|-------|
| Summary view | `KeyValueList` | 🔧 | Need structured sections |
| Validation checklist | — | ❌ | **GAP: PublishingChecklist** |
| Publish/draft radio | `Radio` (primitive) | ✅ | |
| Preview button | `Button` (primitive) | ✅ | |

---

## Flow B: Citizen Booking - Resource Detail

### Resource Detail Page (Common Layout)

**Sketches:** All `uploaded_media_*.jpg` and `WhatsApp Image 2026-01-24*.jpeg`

| UI Element | Existing Component | Status | Notes |
|------------|-------------------|--------|-------|
| App header | `AppHeader` | ✅ | |
| Breadcrumbs | `Breadcrumb` | ✅ | |
| Image slider | `ImageSlider` | ✅ | |
| Image thumbnails | `ImageGallery` | ✅ | |
| Title + address | `ResourceDetailHeader` | ✅ | |
| Favorite button | `FavoriteButton` | ✅ | Already in blocks |
| Share button | `ShareButton` | ✅ | |
| Tab navigation | `SimpleTabs` | ✅ | |
| Description text | `ContentSection` | ✅ | |
| Contact info | `ContactInfoCard` | ✅ | |
| Location map | `LocationCard` | ✅ | |
| Opening hours | `OpeningHoursCard` | ✅ | |
| Pricing summary | `PricingSummary` | ✅ | |
| Booking stepper | `StepperHeader` | ✅ | |
| Week calendar | `SlotCalendar` | ✅ | |

---

### Venue (Hel dag) - Full Day Booking

**Sketch:** `uploaded_media_0_1769299745042.jpg`

| UI Element | Existing Component | Status | Notes |
|------------|-------------------|--------|-------|
| Facilities chips | `AmenityChips` | ✅ | |
| Additional services | `AdditionalServicesList` | ✅ | |
| Universal design list | — | ❌ | **GAP: AccessibilityInfoCard** |
| Size display | `KeyValue` | ✅ | |
| Payment method chips | — | ❌ | **GAP: PaymentMethodSelector** |
| Availability legend | — | ❌ | **GAP: AvailabilityLegend** |

---

### Tent (Festtelt) - Equipment Rental

**Sketch:** `uploaded_media_1_1769299745042.jpg`

| UI Element | Existing Component | Status | Notes |
|------------|-------------------|--------|-------|
| Logistics card | — | ❌ | **GAP: LogisticsDetailsCard** |
| Details/specs card | — | ❌ | Use `SectionCard` with `KeyValueList` |
| Return policy | — | ❌ | **GAP: ReturnPolicyCard** |
| Deposit display | `PricingSummary` | ✅ | Has deposit line |

---

### Meeting Room (Tidsintervall) - Time Slots

**Sketch:** `uploaded_media_4_1769299745042.jpg`

| UI Element | Existing Component | Status | Notes |
|------------|-------------------|--------|-------|
| Facilities row | `FeatureChips` | ✅ | |
| Time slot grid | `SlotCalendar` | 🔧 | Need hourly grid mode |
| Legend row | — | ❌ | **GAP: AvailabilityLegend** |

---

### Padel Court - 30-min Intervals

**Sketch:** `uploaded_media_2_1769299745042.jpg`

| UI Element | Existing Component | Status | Notes |
|------------|-------------------|--------|-------|
| Sport type chips | `FeatureChips` | ✅ | |
| Hourly time grid | `SlotCalendar` | 🔧 | Need 30-min interval mode |
| Color legend | — | ❌ | **GAP: AvailabilityLegend** |

---

### Equipment (Bord og stoler) - Quantity-based

**Sketch:** `uploaded_media_3_1769299745042.jpg`

| UI Element | Existing Component | Status | Notes |
|------------|-------------------|--------|-------|
| Quantity per slot | — | ❌ | **GAP: QuantitySlotCalendar** |
| Available count badge | — | ❌ | **GAP: QuantityAvailabilityBadge** |
| Per-unit pricing | `PricingSummary` | 🔧 | Need per-unit display |

---

### Concert Event - Ticket Registration

**Sketch:** `uploaded_media_1_1769299776814.jpg`

| UI Element | Existing Component | Status | Notes |
|------------|-------------------|--------|-------|
| Event schedule | — | ❌ | **GAP: EventScheduleCard** |
| Ticket registration | — | ❌ | **GAP: TicketRegistrationCard** |
| Important info | — | ❌ | **GAP: ImportantInfoCard** |
| Terms & rules | — | ❌ | **GAP: TermsRulesCard** |

---

## Summary: Component Coverage

### Fully Covered (Use As-Is)
1. `AppHeader`, `Breadcrumb` - Navigation
2. `ImageSlider`, `ImageGallery` - Media
3. `ResourceDetailHeader` - Title area
4. `FavoriteButton`, `ShareButton` - Actions
5. `SimpleTabs` - Tab navigation
6. `ContactInfoCard`, `LocationCard`, `OpeningHoursCard` - Sidebar
7. `AmenityChips`, `FeatureChips` - Tags
8. `AdditionalServicesList` - Add-ons display
9. `PricingSummary` - Pricing
10. `StepperHeader`, `WizardStepper` - Wizard navigation
11. `SlotCalendar` - Basic calendar
12. `FormSection`, `FormRow`, `FormActions` - Form layout
13. `ModeSelector` - Card selection
14. `KeyValueList` - Data display
15. `FileUploader` - File upload

### Need Extension (Modify Props/Variants)
1. `ModeSelector` - Add icon+description variant
2. `LocationCard` - Add editable mode
3. `AmenityChips` - Add checkbox/edit mode
4. `SlotCalendar` - Add hourly grid mode
5. `PricingSummary` - Add per-unit display

### Gaps (New Components Needed)
| Priority | Component | Used In |
|----------|-----------|---------|
| P1 | `WizardStatusSidebar` | Admin wizard (all steps) |
| P1 | `AvailabilityLegend` | All booking views (6) |
| P1 | `WeekdayScheduleEditor` | Admin Step 2 |
| P1 | `PublishingChecklist` | Admin Step 5 |
| P2 | `PaymentMethodSelector` | Booking views (4) |
| P2 | `PaymentMethodConfig` | Admin Step 4 |
| P2 | `PricingTiersEditor` | Admin Step 4 |
| P2 | `BlockedPeriodsManager` | Admin Step 2 |
| P2 | `LogisticsDetailsCard` | Equipment rentals (2) |
| P2 | `AccessibilityInfoCard` | Venues, meeting rooms |
| P3 | `ExternalImportInput` | Admin import flow |
| P3 | `ContactPersonsEditor` | Admin Step 1 |
| P3 | `EventScheduleCard` | Concert events |
| P3 | `TicketRegistrationCard` | Concert events |
| P3 | `ReturnPolicyCard` | Equipment rentals |
| P3 | `QuantitySlotCalendar` | Quantity-based resources |
