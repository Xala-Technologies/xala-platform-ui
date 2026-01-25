# Platform-UI Gap List

**Generated:** 2026-01-25  
**Priority Scale:** P1 (Critical), P2 (Important), P3 (Nice-to-have)  
**Complexity Scale:** S (< 4 hrs), M (4-16 hrs), L (> 16 hrs)

---

## Priority Matrix

| Priority | Criteria |
|----------|----------|
| **P1** | Blocks multiple sketches, core UX flow, high user impact |
| **P2** | Used in 2+ sketches, important feature, medium impact |
| **P3** | Single sketch, edge case, lower impact |

---

## Gap List

### P1 - Critical Gaps

---

#### 1. WizardStatusSidebar

| Attribute | Value |
|-----------|-------|
| **Type** | Block |
| **Used By** | Admin wizard (all 7 steps) |
| **Complexity** | M |
| **Layer** | `blocks/` |

**Description:**  
Persistent sidebar showing wizard completion status, validation errors, and summary of entered data.

**Props API:**
```typescript
interface WizardStatusSidebarProps {
  title: string;
  status: 'draft' | 'incomplete' | 'ready';
  sections: StatusSection[];
  labels: WizardStatusLabels;
}

interface StatusSection {
  key: string;
  label: string;
  status: 'ok' | 'missing' | 'error';
  value?: string;
  errorMessage?: string;
}

interface WizardStatusLabels {
  draft: string;        // "Utkast"
  incomplete: string;   // "Ufullstendig"
  ready: string;        // "Klar for publisering"
  required: string;     // "Mangler for publisering"
  ok: string;           // "OK"
  missing: string;      // "Ikke satt"
}
```

**Accessibility:**
- `aria-live="polite"` for status changes
- Semantic list for sections
- Color + icon for status (not color-only)

**Localization Keys:**
- `wizard.status.draft`
- `wizard.status.incomplete`
- `wizard.status.ready`
- `wizard.status.required`

**Storybook Stories:**
- Default (draft)
- Incomplete (some errors)
- Ready (all green)
- Long content (scrollable)

---

#### 2. AvailabilityLegend

| Attribute | Value |
|-----------|-------|
| **Type** | Composed |
| **Used By** | All booking calendars (6 sketches) |
| **Complexity** | S |
| **Layer** | `composed/` |

**Description:**  
Color/pattern legend for calendar slot statuses.

**Props API:**
```typescript
interface AvailabilityLegendProps {
  items: LegendItem[];
  layout?: 'horizontal' | 'vertical';
  size?: 'sm' | 'md';
  className?: string;
  labels?: AvailabilityLegendLabels;
}

interface LegendItem {
  status: 'available' | 'reserved' | 'booked' | 'closed' | 'unavailable';
  label: string;
  color: string;
  pattern?: 'solid' | 'striped' | 'dotted';
}

interface AvailabilityLegendLabels {
  available: string;   // "Ledig"
  reserved: string;    // "Reservert"
  booked: string;      // "Booket"
  closed: string;      // "Stengt"
  unavailable: string; // "Utilgjengelig"
}
```

**Accessibility:**
- Pattern + color for each status (not color-only)
- Semantic list structure
- Visible focus on interactive (if clickable)

**Localization Keys:**
- `calendar.legend.available`
- `calendar.legend.reserved`
- `calendar.legend.booked`
- `calendar.legend.closed`
- `calendar.legend.unavailable`

**Storybook Stories:**
- Horizontal layout
- Vertical layout
- All statuses
- Minimal (2 statuses)

---

#### 3. WeekdayScheduleEditor

| Attribute | Value |
|-----------|-------|
| **Type** | Composed |
| **Used By** | Admin Step 2 |
| **Complexity** | M |
| **Layer** | `composed/` |

**Description:**  
Editable weekly schedule with day checkboxes and time inputs.

**Props API:**
```typescript
interface WeekdayScheduleEditorProps {
  value: WeekdaySchedule;
  onChange: (value: WeekdaySchedule) => void;
  disabled?: boolean;
  errors?: Record<string, string>;
  labels: WeekdayScheduleLabels;
}

interface WeekdaySchedule {
  monday?: DaySchedule;
  tuesday?: DaySchedule;
  wednesday?: DaySchedule;
  thursday?: DaySchedule;
  friday?: DaySchedule;
  saturday?: DaySchedule;
  sunday?: DaySchedule;
}

interface DaySchedule {
  enabled: boolean;
  openTime?: string;  // "HH:mm"
  closeTime?: string; // "HH:mm"
}

interface WeekdayScheduleLabels {
  monday: string;
  tuesday: string;
  wednesday: string;
  thursday: string;
  friday: string;
  saturday: string;
  sunday: string;
  from: string;       // "Fra"
  to: string;         // "Til"
}
```

**Accessibility:**
- Fieldset with legend for grouping
- Time inputs with proper labels
- Keyboard navigation between rows

**Localization Keys:**
- `schedule.monday` through `schedule.sunday`
- `schedule.from`, `schedule.to`

**Storybook Stories:**
- Empty (all disabled)
- Weekdays only
- Full week
- With errors
- Disabled state

---

#### 4. PublishingChecklist

| Attribute | Value |
|-----------|-------|
| **Type** | Composed |
| **Used By** | Admin Step 5 |
| **Complexity** | S |
| **Layer** | `composed/` |

**Description:**  
Validation checklist showing OK/Missing status for each required field.

**Props API:**
```typescript
interface PublishingChecklistProps {
  items: ChecklistItem[];
  labels: PublishingChecklistLabels;
  onItemClick?: (item: ChecklistItem) => void;
}

interface ChecklistItem {
  id: string;
  label: string;
  status: 'ok' | 'missing' | 'warning';
  description?: string;
  stepIndex?: number; // Link to wizard step
}

interface PublishingChecklistLabels {
  title: string;      // "Sjekkliste for publisering"
  ok: string;         // "OK"
  missing: string;    // "Mangler"
  warning: string;    // "Anbefalt"
}
```

**Accessibility:**
- List semantics
- Status conveyed via icon + text
- Clickable items have focus states

**Localization Keys:**
- `publish.checklist.title`
- `publish.checklist.ok`
- `publish.checklist.missing`
- `publish.checklist.warning`

**Storybook Stories:**
- All OK
- Some missing
- With warnings
- Clickable items

---

### P2 - Important Gaps

---

#### 5. PaymentMethodSelector

| Attribute | Value |
|-----------|-------|
| **Type** | Composed |
| **Used By** | Booking views (4 sketches) |
| **Complexity** | S |
| **Layer** | `composed/` |

**Description:**  
Chip-based payment method indicator/selector (Kort, Vipps, Faktura).

**Props API:**
```typescript
interface PaymentMethodSelectorProps {
  methods: PaymentMethod[];
  selectedMethod?: string;
  onSelect?: (methodId: string) => void;
  readOnly?: boolean;
  labels: PaymentMethodLabels;
}

interface PaymentMethod {
  id: string;
  label: string;
  icon?: React.ReactNode;
  disabled?: boolean;
}

interface PaymentMethodLabels {
  card: string;       // "Kort"
  vipps: string;      // "Vipps"
  invoice: string;    // "Faktura (EHF)"
}
```

**Storybook Stories:**
- Read-only (display only)
- Selectable
- With disabled option
- Single method

---

#### 6. PaymentMethodConfig

| Attribute | Value |
|-----------|-------|
| **Type** | Composed |
| **Used By** | Admin Step 4 |
| **Complexity** | S |
| **Layer** | `composed/` |

**Description:**  
Checkbox list for enabling payment methods in admin.

**Props API:**
```typescript
interface PaymentMethodConfigProps {
  value: EnabledPaymentMethods;
  onChange: (value: EnabledPaymentMethods) => void;
  labels: PaymentMethodConfigLabels;
}

interface EnabledPaymentMethods {
  invoice: boolean;
  card: boolean;
  vipps: boolean;
  external: boolean;
}

interface PaymentMethodConfigLabels {
  invoice: string;    // "Faktura (EHF)"
  card: string;       // "Kort"
  vipps: string;      // "Vipps"
  external: string;   // "Betaling utenfor systemet"
}
```

**Storybook Stories:**
- None selected
- Some selected
- All selected

---

#### 7. PricingTiersEditor

| Attribute | Value |
|-----------|-------|
| **Type** | Composed |
| **Used By** | Admin Step 4 |
| **Complexity** | M |
| **Layer** | `composed/` |

**Description:**  
Editable list of pricing tiers by target group.

**Props API:**
```typescript
interface PricingTiersEditorProps {
  tiers: PricingTier[];
  onChange: (tiers: PricingTier[]) => void;
  onAdd: () => void;
  labels: PricingTiersLabels;
}

interface PricingTier {
  id: string;
  targetGroup: string;
  price: number;
  unit: 'per_hour' | 'per_day' | 'per_unit';
}

interface PricingTiersLabels {
  addTier: string;        // "+ Legg til målgruppe-linje"
  targetGroup: string;    // "Målgruppe"
  price: string;          // "Pris"
  remove: string;         // "Fjern"
}
```

**Storybook Stories:**
- Empty
- Single tier
- Multiple tiers
- Add/remove interaction

---

#### 8. BlockedPeriodsManager

| Attribute | Value |
|-----------|-------|
| **Type** | Composed |
| **Used By** | Admin Step 2 |
| **Complexity** | M |
| **Layer** | `composed/` |

**Description:**  
Add/remove blocked periods (date ranges).

**Props API:**
```typescript
interface BlockedPeriodsManagerProps {
  periods: BlockedPeriod[];
  onChange: (periods: BlockedPeriod[]) => void;
  labels: BlockedPeriodsLabels;
}

interface BlockedPeriod {
  id: string;
  startDate: string;
  endDate: string;
  reason?: string;
}

interface BlockedPeriodsLabels {
  addPeriod: string;      // "+ Legg til sperring"
  startDate: string;      // "Fra dato"
  endDate: string;        // "Til dato"
  reason: string;         // "Begrunnelse"
  remove: string;         // "Fjern"
  noPeriods: string;      // "Ingen sperringer lagt til ennå"
}
```

**Storybook Stories:**
- Empty
- With periods
- Add/remove interaction

---

#### 9. LogisticsDetailsCard

| Attribute | Value |
|-----------|-------|
| **Type** | Block |
| **Used By** | Equipment rentals (2 sketches) |
| **Complexity** | S |
| **Layer** | `blocks/` |

**Description:**  
Two-column card for logistics (pickup) and details (specs).

**Props API:**
```typescript
interface LogisticsDetailsCardProps {
  logistics: LogisticsInfo;
  details: DetailsInfo;
  labels: LogisticsDetailsLabels;
}

interface LogisticsInfo {
  pickupLocation?: string;
  pickupAddress?: string;
  pickupHours?: string;
  deliveryAvailable?: boolean;
  transportInfo?: string;
}

interface DetailsInfo {
  specifications?: string[];
  includedItems?: string[];
  returnDeadline?: string;
  damagePolicy?: string;
}

interface LogisticsDetailsLabels {
  logistics: string;      // "Logistikk"
  details: string;        // "Detaljer"
  pickupLocation: string;
  pickupHours: string;
  delivery: string;
  transport: string;
  specifications: string;
  included: string;
  returnDeadline: string;
  damagePolicy: string;
}
```

**Storybook Stories:**
- Full content
- Minimal content
- No delivery

---

#### 10. AccessibilityInfoCard

| Attribute | Value |
|-----------|-------|
| **Type** | Block |
| **Used By** | Venues, meeting rooms |
| **Complexity** | S |
| **Layer** | `blocks/` |

**Description:**  
Display of universal design / accessibility features.

**Props API:**
```typescript
interface AccessibilityInfoCardProps {
  features: AccessibilityFeature[];
  title?: string;
  labels?: AccessibilityInfoLabels;
}

interface AccessibilityFeature {
  id: string;
  label: string;
  available: boolean;
  icon?: React.ReactNode;
}

interface AccessibilityInfoLabels {
  title: string;          // "Universell utforming"
  wheelchairAccess: string;
  elevator: string;
  hearingLoop: string;
  accessibleToilet: string;
}
```

**Storybook Stories:**
- All features
- Partial features
- Compact view

---

### P3 - Nice-to-Have Gaps

---

#### 11. ExternalImportInput

| Attribute | Value |
|-----------|-------|
| **Type** | Composed |
| **Used By** | Admin import flow |
| **Complexity** | S |
| **Layer** | `composed/` |

**Description:**  
URL input with import button for finn.no/booking.no.

---

#### 12. ContactPersonsEditor

| Attribute | Value |
|-----------|-------|
| **Type** | Composed |
| **Used By** | Admin Step 1 |
| **Complexity** | S |
| **Layer** | `composed/` |

**Description:**  
Add/edit contact persons list.

---

#### 13. EventScheduleCard

| Attribute | Value |
|-----------|-------|
| **Type** | Block |
| **Used By** | Concert events |
| **Complexity** | M |
| **Layer** | `blocks/` |

**Description:**  
Event schedule display with dates, times, and ticket availability.

---

#### 14. TicketRegistrationCard

| Attribute | Value |
|-----------|-------|
| **Type** | Block |
| **Used By** | Concert events |
| **Complexity** | M |
| **Layer** | `blocks/` |

**Description:**  
Registration deadline and CTA for ticket purchase.

---

#### 15. ReturnPolicyCard

| Attribute | Value |
|-----------|-------|
| **Type** | Block |
| **Used By** | Equipment rentals |
| **Complexity** | S |
| **Layer** | `blocks/` |

**Description:**  
Return deadline and damage liability terms.

---

#### 16. QuantitySlotCalendar Variant

| Attribute | Value |
|-----------|-------|
| **Type** | Pattern (extension) |
| **Used By** | Quantity-based resources |
| **Complexity** | M |
| **Layer** | Extend `patterns/SlotCalendar` |

**Description:**  
SlotCalendar variant showing quantity availability per slot.

---

## Component Extension Proposals

### Extension 1: ModeSelector - Icon + Description Variant

**Current:** Text-only card selection  
**Needed:** Add optional icon and description props

```typescript
interface ModeOption {
  id: string;
  label: string;
  description?: string;  // NEW
  icon?: React.ReactNode; // NEW
  disabled?: boolean;
}
```

**Backward Compatible:** Yes

---

### Extension 2: SlotCalendar - Hourly Grid Mode

**Current:** Week view with day slots  
**Needed:** Add hourly grid view mode

```typescript
interface SlotCalendarProps {
  viewMode?: 'week' | 'hourly'; // NEW
  intervalMinutes?: 30 | 60;     // NEW
  // ... existing props
}
```

**Backward Compatible:** Yes (default to 'week')

---

### Extension 3: LocationCard - Editable Mode

**Current:** Read-only display  
**Needed:** Add editable mode with address input

```typescript
interface LocationCardProps {
  editable?: boolean;            // NEW
  onAddressChange?: (address: string) => void; // NEW
  onCoordinatesChange?: (coords: Coordinates) => void; // NEW
  // ... existing props
}
```

**Backward Compatible:** Yes (default to false)

---

## Implementation Checklist

### P1 Components (Sprint 1) ✅ COMPLETED
- [x] `WizardStatusSidebar` - M → `blocks/WizardStatusSidebar.tsx`
- [x] `AvailabilityLegend` - S → `composed/AvailabilityLegend.tsx`
- [x] `WeekdayScheduleEditor` - M → `composed/OpeningHoursEditor.tsx` (renamed)
- [x] `PublishingChecklist` - S → `composed/PublishingChecklist.tsx`

### P2 Components (Sprint 2) ✅ COMPLETED
- [x] `PaymentMethodSelector` - S → `composed/PaymentMethodSelector.tsx`
- [x] `PaymentMethodConfig` - S → `composed/PaymentMethodConfig.tsx`
- [x] `PricingTiersEditor` - M → `composed/PricingTiersEditor.tsx`
- [x] `BlockedPeriodsManager` - M → `composed/BlockedPeriodsManager.tsx`
- [x] `LogisticsDetailsCard` - S → `blocks/LogisticsDetailsCard.tsx`
- [x] `AccessibilityInfoCard` - S → `blocks/AccessibilityInfoCard.tsx`

### Extensions (Sprint 1-2) - ✅ Complete
- [x] `ModeSelector` icon variant → added 'icons' variant
- [x] `SlotCalendar` hourly grid → already exists via startHour/endHour props
- [x] `LocationCard` editable mode → `blocks/LocationCardEditable.tsx`

### P3 Components (Backlog) - ✅ Complete
- [x] `ExternalImportInput` - S → `composed/ExternalImportInput.tsx`
- [x] `ContactPersonsEditor` - S → `composed/ContactPersonsEditor.tsx`
- [x] `EventScheduleCard` - M → `blocks/EventScheduleCard.tsx`
- [x] `TicketRegistrationCard` - M → `blocks/TicketRegistrationCard.tsx`
- [x] `ReturnPolicyCard` - S → `blocks/ReturnPolicyCard.tsx`
- [x] `QuantitySlotCalendar` - M → `patterns/QuantitySlotCalendar.tsx`

---

## Token Extensions

No new tokens required. All components use existing:
- `--ds-color-*` for colors
- `--ds-spacing-*` for spacing
- `--ds-font-*` for typography
- `--ds-border-radius-*` for corners

---

## Test Strategy

### Unit Tests
- Props validation
- State management
- Callback invocations

### Storybook a11y Tests
- `@storybook/addon-a11y` for all stories
- Keyboard navigation
- Screen reader announcements

### Integration Tests
- Form submission flows
- Calendar interactions
- Wizard navigation
