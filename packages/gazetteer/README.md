# @xala-technologies/gazetteer

> Monster Motor — Schema-Driven Page Execution Engine for Xala SaaS Solutions

## Overview

Gazetteer is a declarative, schema-driven system for defining pages, routes, and workflows as JSON specifications rather than code. It provides:

- **Runtime Engine** — Registers and executes specs
- **React Hooks** — `useGazetteerPage`, `useGazetteerRoute`, `useGazetteerAction`
- **Components** — Platform-UI integrated page renderer
- **Schemas** — JSON Schema validation for specs

## Installation

```bash
pnpm add @xala-technologies/gazetteer
```

## Quick Start

```tsx
import { 
  getRegistry, 
  useGazetteerPage, 
  GazetteerProvider, 
  GazetteerPage 
} from '@xala-technologies/gazetteer'

// 1. Register specs
getRegistry().registerPage({
  pageId: 'dashboard',
  layoutType: 'dashboard',
  shellType: 'DashboardShell',
  widgets: {
    content: [
      { widgetId: 'stats', type: 'StatsGrid', props: { /* ... */ } }
    ]
  }
})

// 2. Use in app
function App() {
  return (
    <GazetteerProvider 
      widgetComponents={myWidgets} 
      shellComponents={myShells}
      actionHandlers={myHandlers}
    >
      <DashboardPage />
    </GazetteerProvider>
  )
}

function DashboardPage() {
  const { page, isLoading, error } = useGazetteerPage('dashboard')
  
  if (isLoading) return <Loading />
  if (error) return <Error message={error} />
  
  return <GazetteerPage spec={page} />
}
```

## Package Exports

### Main (`@xala-technologies/gazetteer`)
- All types, runtime, hooks, and components

### Subpath Exports
- `@xala-technologies/gazetteer/runtime` — Registry, BindingResolver, ActionEngine
- `@xala-technologies/gazetteer/hooks` — React hooks
- `@xala-technologies/gazetteer/builder` — Visual builder (when implemented)
- `@xala-technologies/gazetteer/ai` — AI engine (when implemented)
- `@xala-technologies/gazetteer/governance` — Publishing workflow (when implemented)
- `@xala-technologies/gazetteer/schema/*` — JSON schemas
- `@xala-technologies/gazetteer/catalogs/*` — Widget/action catalogs

## Core Types

### RouteSpec
```typescript
{
  routeId: 'booking-detail',
  path: '/bookings/:id',
  pageRef: 'booking-detail-page',
  navigation: { labelKey: 'nav.bookings', group: 'main', icon: 'calendar' },
  access: { permissions: ['bookings.view'] }
}
```

### PageSpec
```typescript
{
  pageId: 'booking-detail-page',
  layoutType: 'detail',
  shellType: 'DetailPageShell',
  widgets: {
    header: [{ widgetId: 'h1', type: 'DashboardHeader', props: { titleKey: '...' } }],
    content: [{ widgetId: 'panel', type: 'DetailPanel', bindings: { data: 'vm.booking' } }]
  }
}
```

## Widget Types (12 Core)

| Type | Description |
|------|-------------|
| `DashboardHeader` | Page header with title and actions |
| `StatsGrid` | Grid of stat cards |
| `Tabs` | Tabbed content |
| `EntityTable` | Data table with sorting/pagination |
| `DetailPanel` | Entity detail view |
| `Timeline` | Activity timeline |
| `AuditLog` | Audit log table |
| `FilterBar` | Search/filter bar |
| `DrawerForm` | Side drawer with form |
| `ModalConfirm` | Confirmation dialog |
| `EmptyState` | Empty state message |
| `LoadingSkeleton` | Loading placeholder |

## Action Types (8 Core)

| Type | Description |
|------|-------------|
| `NAVIGATE` | Route navigation |
| `OPEN_DRAWER` | Open a drawer |
| `CLOSE_DRAWER` | Close a drawer |
| `OPEN_MODAL` | Open a modal |
| `CLOSE_MODAL` | Close a modal |
| `CALL_CONTROLLER` | Call backend method |
| `DOWNLOAD` | Download a file |
| `TOAST` | Show notification |

## Domain Extensions

Domains can extend the base catalog:

```typescript
// @digilist/gazetteer-extension
import { getRegistry } from '@xala-technologies/gazetteer'

// Register domain-specific widgets
getRegistry().registerWidgetType('CalendarView', DigilistCalendar)
getRegistry().registerWidgetType('BookingCard', DigilistBookingCard)
```

## License

MIT
