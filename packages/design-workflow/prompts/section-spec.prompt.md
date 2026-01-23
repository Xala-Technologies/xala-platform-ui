# Section Specification Prompt

You are helping specify the **{{sectionName}}** section of **{{productName}}**.

## Context

{{#if productVision}}
### Product Vision
{{productVision}}
{{/if}}

{{#if dataModel}}
### Data Model
```typescript
{{dataModel}}
```
{{/if}}

## Design System

This project uses **@xala-technologies/platform-ui** built on Norwegian Designsystemet.

### Available Components

**Primitives** (`@xala-technologies/platform-ui/primitives`):
- `Button` - Actions and triggers
- `Card` - Content containers
- `Badge` - Status indicators
- `Chip` - Tags and filters
- `TextField` - Text input
- `Select` - Dropdown selection
- `Checkbox` - Multiple selection
- `Radio` - Single selection
- `Switch` - Toggle on/off

**Composed** (`@xala-technologies/platform-ui/composed`):
- `DataTable` - Tabular data display
- `Modal` - Dialog overlays
- `Drawer` - Side panels
- `Tabs` - Content organization
- `Accordion` - Collapsible sections
- `Breadcrumbs` - Navigation path

**Blocks** (`@xala-technologies/platform-ui/blocks`):
- `NotificationBell` - Alert notifications
- `UserMenu` - User account menu
- `SearchBar` - Search interface
- `FilterPanel` - Filter controls

**Shells** (`@xala-technologies/platform-ui/shells`):
- `AppLayout` - Main application layout
- `DashboardLayout` - Dashboard structure
- `DashboardSidebar` - Navigation sidebar

**Patterns** (`@xala-technologies/platform-ui/patterns`):
- `ResourceCard` - Resource display cards
- `ResourceGrid` - Grid of resources
- `SlotCalendar` - Time slot selection
- `PricingSummary` - Pricing breakdown

### Styling

Use these attributes for consistent styling:
- `data-color`: `accent` | `neutral` | `brand1` | `brand2` | `brand3`
- `data-size`: `sm` | `md` | `lg`

## Questions to Explore

1. **User Actions**: What can users do in this section?
2. **Information Display**: What data is shown? Priority?
3. **Forms**: Any input needed? Validation rules?
4. **Navigation**: How do users move within/out of this section?
5. **Empty State**: What shows when there's no data?
6. **Error Handling**: What can go wrong? How to communicate errors?
7. **Loading**: What shows while data loads?

## Output Format

Generate a YAML specification:

```yaml
name: {{sectionName}}
description: [One sentence description]

userStories:
  - as: [user type]
    want: [action]
    so: [benefit]

components:
  - type: [component-type]
    category: [primitives|composed|blocks|shells|patterns]
    name: [InstanceName]
    purpose: [What it does]
    props:
      data-color: [color]
      data-size: [size]
    variants: [optional list]

dataRequirements:
  - entity: [EntityName]
    fields: [field1, field2]
    operations: [read, create, update, delete]

states:
  - loading
  - empty
  - populated
  - error

routes:
  - path: [/route/path]
    name: [Route Name]
    description: [optional]
```

## Accessibility Requirements

All implementations must:
- Support keyboard navigation
- Work with screen readers
- Have visible focus indicators
- Meet WCAG 2.1 AA color contrast
- Support reduced motion preferences
