# Seasons Feature - Pure Presentational Components

> **Status:** ✅ Fully refactored to pure presentational components (January 26, 2025)

Pure presentational components for seasonal booking management. All components are fully controlled via props with no SDK, i18n, or routing dependencies.

---

## Quick Start

### Installation

```bash
npm install @xala-technologies/platform-ui
# or
pnpm add @xala-technologies/platform-ui
```

### Basic Usage

```typescript
import {
  SeasonCard,
  VenueCard,
  mapSeasonDTOToVM,
  getSeasonStatusColor,
} from '@xala-technologies/platform-ui/features/seasons';

function MySeasonsList({ seasons }) {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });

  return (
    <div>
      {seasons.map((season) => (
        <SeasonCard
          key={season.id}
          season={mapSeasonDTOToVM(season)}
          labels={{
            periodLabel: 'Period',
            deadlineLabel: 'Application Deadline',
            viewDetailsLabel: 'View Details',
            applyLabel: 'Apply Now',
          }}
          statusDisplay={{
            label: 'Open',
            color: getSeasonStatusColor(season.status),
          }}
          formatDate={formatDate}
          onViewDetails={(id) => console.log('View', id)}
          onApply={(id) => console.log('Apply', id)}
        />
      ))}
    </div>
  );
}
```

---

## Components

### SeasonCard

Displays seasonal booking information with status, dates, and action buttons.

```typescript
import { SeasonCard } from '@xala-technologies/platform-ui/features/seasons';

<SeasonCard
  season={{
    id: '1',
    name: 'Summer Season 2025',
    description: 'Book your summer activities',
    status: 'open',
    startDate: '2025-06-01',
    endDate: '2025-08-31',
    applicationDeadline: '2025-05-15',
  }}
  labels={{
    periodLabel: 'Period',
    deadlineLabel: 'Application Deadline',
    viewDetailsLabel: 'View Details',
    applyLabel: 'Apply Now',
  }}
  statusDisplay={{ label: 'Open', color: 'success' }}
  formatDate={(date) => new Date(date).toLocaleDateString()}
  onViewDetails={(id) => navigate(`/seasons/${id}`)}
  onApply={(id) => handleApply(id)}
/>
```

**Props:**
- `season: SeasonVM` - Season data
- `labels: SeasonCardLabels` - All text labels
- `statusDisplay: SeasonStatusDisplay` - Status badge configuration
- `formatDate: (date: string) => string` - Date formatter function
- `showActions?: boolean` - Show action buttons (default: true)
- `onViewDetails?: (id: string) => void` - View details callback
- `onApply?: (id: string) => void` - Apply callback
- `showApplyButton?: boolean` - Override apply button visibility

### VenueCard

Displays venue/rental object information with image, details, and apply button.

```typescript
import { VenueCard } from '@xala-technologies/platform-ui/features/seasons';

<VenueCard
  venue={{
    id: '1',
    name: 'Community Hall',
    description: 'Large event space',
    capacity: 200,
    address: { street: 'Main St 123', city: 'Oslo' },
    imageUrl: 'https://example.com/image.jpg',
    categories: ['Events', 'Meetings'],
  }}
  labels={{
    capacityLabel: 'Capacity',
    applyLabel: 'Apply',
  }}
  onApply={(id) => handleApply(id)}
  maxCategories={2}
/>
```

**Props:**
- `venue: VenueVM` - Venue data
- `labels: VenueCardLabels` - All text labels
- `onApply?: (id: string) => void` - Apply callback
- `showApplyButton?: boolean` - Show apply button (default: true)
- `maxCategories?: number` - Max categories to display (default: 2)

### SeasonStatusBadge

Displays a colored badge for season status.

```typescript
import { SeasonStatusBadge } from '@xala-technologies/platform-ui/features/seasons';

<SeasonStatusBadge
  label="Open for Applications"
  color="success"
  size="sm"
/>
```

**Props:**
- `label: string` - Status label text
- `color: BadgeColor` - Badge color ('success' | 'warning' | 'danger' | 'info' | 'neutral')
- `size?: 'sm' | 'md' | 'lg'` - Badge size (default: 'sm')

---

## Utility Functions

### Data Mapping

```typescript
import {
  mapSeasonDTOToVM,
  mapVenueDTOToVM,
  mapSeasonDTOsToVMs,
  mapVenueDTOsToVMs,
} from '@xala-technologies/platform-ui/features/seasons';

// Map single items
const seasonVM = mapSeasonDTOToVM(seasonDTO);
const venueVM = mapVenueDTOToVM(venueDTO);

// Map arrays
const seasonsVMs = mapSeasonDTOsToVMs(seasonDTOs);
const venuesVMs = mapVenueDTOsToVMs(venueDTOs);
```

### Status Helpers

```typescript
import { getSeasonStatusColor } from '@xala-technologies/platform-ui/features/seasons';

const color = getSeasonStatusColor('open'); // 'success'
const color = getSeasonStatusColor('cancelled'); // 'danger'
```

### Date Helpers

```typescript
import {
  formatSeasonDate,
  formatSeasonDateRange,
} from '@xala-technologies/platform-ui/features/seasons';

const date = formatSeasonDate('2025-06-01', 'nb-NO'); // '1. jun. 2025'
const range = formatSeasonDateRange('2025-06-01', '2025-08-31', 'nb-NO');
// '1. jun. 2025 - 31. aug. 2025'
```

### Filter Helpers

```typescript
import {
  filterSeasonsByStatus,
  getActiveSeasons,
  isSeasonAcceptingApplications,
  getDaysUntilDeadline,
} from '@xala-technologies/platform-ui/features/seasons';

// Filter by status
const openSeasons = filterSeasonsByStatus(seasons, ['open']);

// Get active seasons (open and before deadline)
const activeSeasons = getActiveSeasons(seasons);

// Check if accepting applications
const isAccepting = isSeasonAcceptingApplications(season);

// Get days until deadline
const daysLeft = getDaysUntilDeadline(season.applicationDeadline);
```

---

## TypeScript Types

### Core Types

```typescript
import type {
  SeasonVM,
  VenueVM,
  SeasonStatus,
  SeasonCardLabels,
  VenueCardLabels,
  SeasonStatusDisplay,
  BadgeColor,
} from '@xala-technologies/platform-ui/features/seasons';

// Season view model
type SeasonVM = {
  id: string;
  name: string;
  description?: string;
  status: SeasonStatus;
  startDate: string;
  endDate: string;
  applicationDeadline: string;
  totalApplications?: number;
  approvedApplications?: number;
};

// Status type
type SeasonStatus = 'draft' | 'open' | 'closed' | 'cancelled' | 'completed';

// Labels
type SeasonCardLabels = {
  periodLabel: string;
  deadlineLabel: string;
  viewDetailsLabel: string;
  applyLabel: string;
};
```

---

## Integration Guide

For detailed integration examples with SDK, i18n, routing, and state management, see:

📖 **[CONNECTED_WRAPPER_EXAMPLE.md](./CONNECTED_WRAPPER_EXAMPLE.md)**

Examples include:
- Connected wrappers with i18n
- React Query integration
- Error handling with toasts
- Filtering and search
- Testing patterns

---

## Storybook

View all component states and variations in Storybook:

- **SeasonCard:** `Features/Seasons/SeasonCard`
- **VenueCard:** `Features/Seasons/VenueCard`

```bash
pnpm storybook
```

---

## Migration from v2.x

The connected components (`SeasonCardConnected`, `VenueCardConnected`) are **deprecated**.

### Before (v2.x)

```typescript
import { SeasonCardConnected } from '@xala-technologies/platform-ui/features/seasons';

<SeasonCardConnected season={season} />
```

### After (v3.x)

Create your own connected wrapper (recommended):

```typescript
import {
  SeasonCard,
  mapSeasonDTOToVM,
  getSeasonStatusColor,
} from '@xala-technologies/platform-ui/features/seasons';
import { useT } from '@xala-technologies/platform/i18n';

function ConnectedSeasonCard({ season }) {
  const t = useT();

  return (
    <SeasonCard
      season={mapSeasonDTOToVM(season)}
      labels={{
        periodLabel: t('seasons.period'),
        deadlineLabel: t('seasons.deadline'),
        viewDetailsLabel: t('seasons.viewDetails'),
        applyLabel: t('seasons.apply'),
      }}
      statusDisplay={{
        label: t(`seasons.status.${season.status}`),
        color: getSeasonStatusColor(season.status),
      }}
      formatDate={(date) => new Date(date).toLocaleDateString('nb-NO')}
      onViewDetails={(id) => navigate(`/seasons/${id}`)}
      onApply={(id) => handleApply(id)}
    />
  );
}
```

See [CONNECTED_WRAPPER_EXAMPLE.md](./CONNECTED_WRAPPER_EXAMPLE.md) for complete migration guide.

---

## Architecture

This feature follows the **Pure UI Refactoring Pattern**:

- ✅ **No SDK dependencies** - Components don't import from SDK
- ✅ **No i18n dependencies** - All text via props
- ✅ **No routing dependencies** - All navigation via callbacks
- ✅ **Pure functions** - Utility functions have no side effects
- ✅ **ViewModel pattern** - Clear data contracts (SeasonVM, VenueVM)
- ✅ **Designsystemet components** - No raw HTML elements
- ✅ **Fully testable** - Easy to test with mock props
- ✅ **Storybook-ready** - All states visible in Storybook

See [PURE_UI_REFACTORING_GUIDE.md](/docs/PURE_UI_REFACTORING_GUIDE.md) for details.

---

## Documentation

- **[REFACTORING_SUMMARY.md](./REFACTORING_SUMMARY.md)** - Complete refactoring details
- **[CONNECTED_WRAPPER_EXAMPLE.md](./CONNECTED_WRAPPER_EXAMPLE.md)** - Integration examples
- **[REFACTORING_CHECKLIST.md](./REFACTORING_CHECKLIST.md)** - Verification checklist
- **[PURE_UI_REFACTORING_GUIDE.md](/docs/PURE_UI_REFACTORING_GUIDE.md)** - General refactoring guide

---

## Support

For questions or issues:

1. Check the [CONNECTED_WRAPPER_EXAMPLE.md](./CONNECTED_WRAPPER_EXAMPLE.md)
2. Review Storybook examples
3. See [PURE_UI_REFACTORING_GUIDE.md](/docs/PURE_UI_REFACTORING_GUIDE.md)

---

## License

Part of `@xala-technologies/platform-ui` - See main package LICENSE.
