# Sketch Inventory

**Generated:** 2026-01-25  
**Sources:**
- `/sketches/` directory (22 images)
- Uploaded screenshots (10 images)

---

## Flow Groupings

### Flow A: Admin Wizard - "Opprett utleieobjekt" (Create Rental Object)
**Layout:** Dashboard with sidebar status panel  
**Steps:** 5-step wizard with persistent validation sidebar

### Flow B: Citizen Booking - Resource Detail & Booking
**Layout:** Public-facing with header/breadcrumbs  
**Pattern:** Hero gallery → tabs → content cards → booking stepper

### Flow C: Resource Type Variations
**Layout:** Same as Flow B with type-specific content

---

## Detailed Sketch Inventory

| # | File Name | Flow | Description | Key UI Patterns | Accessibility Risks |
|---|-----------|------|-------------|-----------------|---------------------|
| 1 | `WhatsApp Image 2026-01-19 at 10.49.33.jpeg` | A | Step 1: Category type selection | Card-based selection (Lokaler, Utstyr, Opplevelser) | Focus management on card selection |
| 2 | `WhatsApp Image 2026-01-19 at 10.49.33 (1).jpeg` | A | Step 1: Creation method selection | Radio-like cards (Opprette nytt, Kopier eksisterende) | Keyboard navigation between options |
| 3 | `WhatsApp Image 2026-01-19 at 10.49.33 (2).jpeg` | A | Step 1: Location form | Form fields, map picker, media upload, facilities checkboxes | Complex form validation, file upload a11y |
| 4 | `WhatsApp Image 2026-01-19 at 10.49.33 (3).jpeg` | A | Step 2: Availability settings | Radio groups, weekday checkboxes, time inputs, blocked periods | Time input keyboard access |
| 5 | `WhatsApp Image 2026-01-19 at 10.49.33 (4).jpeg` | A | Step 3: Rules & Approval | Radio with descriptions, checkbox restrictions | Long description readability |
| 6 | `WhatsApp Image 2026-01-19 at 10.49.33 (5).jpeg` | A | Step 4: Pricing & Payment | Dropdown, checkbox payment methods, target group pricing | Dynamic form sections |
| 7 | `WhatsApp Image 2026-01-19 at 10.49.33 (7).jpeg` | A | Step 5: Publishing summary | Key-value summary, checklist validation, publish button | Status announcements |
| 8 | `WhatsApp Image 2026-01-23 at 10.19.04.jpeg` | A | Category cards (extended) | 4 category cards with icons and descriptions | Card selection focus |
| 9 | `WhatsApp Image 2026-01-23 at 10.19.04 (1).jpeg` | A | Import from external source | URL input field with import button | Form validation feedback |
| 10 | `uploaded_media_0_1769299745042.jpg` | B | Venue: Selskapslokale (Full day) | Image slider, tabs, facilities chips, pricing, calendar | Slider keyboard navigation |
| 11 | `uploaded_media_1_1769299745042.jpg` | B | Tent: Festtelt (Day booking) | Logistics/details two-column, stepper | Two-column reading order |
| 12 | `uploaded_media_2_1769299745042.jpg` | B | Padel Court (Time intervals) | Time slot grid with hourly rows | Grid navigation, color legend |
| 13 | `uploaded_media_3_1769299745042.jpg` | B | Equipment: Bord og stoler (Quantity) | Quantity per day display, deposit info | Quantity input a11y |
| 14 | `uploaded_media_4_1769299745042.jpg` | B | Meeting Room (Time interval) | Facilities chips, time grid calendar | Calendar keyboard nav |
| 15 | `uploaded_media_1_1769299776814.jpg` | C | Concert Event | Event schedule card, ticket registration, terms | Registration deadline announcements |
| 16 | `WhatsApp Image 2026-01-24 at 16.35.21.jpeg` | B | Concert (variant) | Same as #15 | - |
| 17 | `WhatsApp Image 2026-01-24 at 16.35.21 (1).jpeg` | B | Venue (variant) | Full day booking with opening hours sidebar | - |
| 18 | `WhatsApp Image 2026-01-24 at 16.35.21 (2).jpeg` | B | Meeting Room (variant) | Time grid with facilities | - |
| 19 | `WhatsApp Image 2026-01-24 at 16.35.21 (3).jpeg` | B | Padel Court (variant) | 30-min intervals, time grid | - |
| 20 | `WhatsApp Image 2026-01-24 at 16.35.21 (4).jpeg` | B | Tent (variant) | Logistics + specs cards | - |
| 21 | `WhatsApp Image 2026-01-24 at 16.35.21 (5).jpeg` | B | Equipment (variant) | Quantity availability per slot | - |

---

## UI Pattern Summary

### Layout Patterns
| Pattern | Occurrences | Description |
|---------|-------------|-------------|
| **Dashboard + Sidebar** | 9 sketches | Admin wizard with status sidebar |
| **Public Detail Page** | 12 sketches | Hero + tabs + two-column content |
| **Stepper Wizard** | All | 5-step booking/creation flow |

### Component Patterns
| Pattern | Count | Examples |
|---------|-------|----------|
| **Card-based Selection** | 4 | Category cards, creation method cards |
| **Image Slider/Gallery** | 12 | Hero with thumbnails |
| **Tab Navigation** | 12 | Oversikt, Aktivitetskalender, Retningslinjer, FAQ |
| **Facilities/Amenity Chips** | 8 | Checkbox chips with icons |
| **Contact Info Card** | 12 | Email + phone sidebar block |
| **Location/Map Card** | 12 | Map embed + address |
| **Opening Hours Card** | 6 | Weekly schedule table |
| **Pricing Summary** | 12 | Price + deposit display |
| **Payment Method Selector** | 4 | Kort/Vipps/Faktura chips |
| **Week Calendar Picker** | 12 | Date selection with status bars |
| **Time Slot Grid** | 6 | Hourly availability matrix |
| **Validation Status Sidebar** | 9 | OK/Mangler checklist |
| **Two-Column Details** | 4 | Logistics + Specifications |
| **Event Schedule Card** | 2 | Date/time with availability |

### Data Entry Points
| Type | Sketches | Validation Needs |
|------|----------|------------------|
| Text inputs | Step 1 (name, address) | Required, format |
| Map picker | Step 1 | Address validation |
| File uploads | Step 1 (images, PDF) | File type, size |
| Checkbox grids | Step 1,2 (facilities, days) | At least one required |
| Time inputs | Step 2 | Valid time range |
| Radio groups | Step 2,3,4 | Required selection |
| Dropdown selects | Step 4 (pricing model) | Required |
| URL input | Import flow | Valid URL format |

### Accessibility Risk Areas
| Risk | Sketches | Mitigation |
|------|----------|------------|
| Image slider keyboard nav | All public views | Arrow key + focus trap |
| Time slot grid navigation | 6 sketches | Arrow keys, row/column headers |
| Card selection focus | Admin wizard | Focus visible, selection state |
| Wizard step announcements | All wizards | Live region for step changes |
| Validation status updates | Admin wizard | aria-live for status changes |
| Complex form sections | Step 4 | Fieldset + legend |
| Color-only status legend | Calendars | Text labels + patterns |
