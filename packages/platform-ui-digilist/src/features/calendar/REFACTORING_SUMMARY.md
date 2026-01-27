# Calendar Feature Refactoring Summary

## Overview

The calendar feature has been refactored from smart components with SDK dependencies to pure presentational components following the PURE_UI_REFACTORING_GUIDE.md patterns.

**Refactoring Date:** 2026-01-26

**Components Refactored:** 5 files

- CalendarSection.tsx
- ConflictIndicator.tsx
- EventDrawer.tsx
- TimelineView.tsx
- CreateBlockModal.tsx (in progress)

## Changes Made

### 1. Removed Forbidden Imports

**Before:**

```typescript
import { useT } from '@xala-technologies/platform/i18n';
import { useCalendarConfig, useAvailabilityMatrix } from '@digilist/client-sdk/hooks';
```

**After:**

```typescript
// No forbidden imports - pure presentational component
```

### 2. Added Labels Interfaces

Each component now accepts a `labels` prop for all UI text:

#### CalendarSection

```typescript
export interface CalendarSectionLabels {
  selectTime?: string;
  notAvailable?: string;
  selectTimeSlots?: string;
  selectDays?: string;
  selectPeriod?: string;
  statusAvailable?: string;
  statusReserved?: string;
  statusBooked?: string;
  statusBlocked?: string;
  statusBlackout?: string;
  statusClosed?: string;
}
```

#### ConflictIndicator

```typescript
export interface ConflictIndicatorLabels {
  booking?: string;
  more?: string;
  bufferConflict?: string;
  requiresBuffer?: string;
  overlapsWith?: string;
  conflict?: string;
  bufferConflictLabel?: string;
  conflictLabel?: string;
}
```

#### EventDrawer

```typescript
export interface EventDrawerLabels {
  booking?: string;
  listing?: string;
  date?: string;
  time?: string;
  bookedBy?: string;
  organization?: string;
  blockType?: string;
  close?: string;
  reject?: string;
  approve?: string;
  edit?: string;
  delete?: string;
  viewBooking?: string;
  rejecting?: string;
  approving?: string;
  deleting?: string;
  confirmReject?: string;
  confirmDeleteBlock?: string;
  statusConfirmed?: string;
  statusPending?: string;
  statusBlocked?: string;
  statusCancelled?: string;
  // Block type labels
  blockTypeMaintenance?: string;
  blockTypeClosed?: string;
  blockTypeHold?: string;
  blockTypeEmergency?: string;
  blockTypeInternal?: string;
}
```

#### TimelineView

```typescript
export interface TimelineViewLabels {
  booking?: string;
  loading?: string;
  noListingsForTimeline?: string;
  listings?: string;
  capacity?: string;
  conflictIndicator?: ConflictIndicatorLabels;
}
```

### 3. Replaced window.confirm with Callbacks

EventDrawer previously used `window.confirm()` for confirmations. Now accepts optional callbacks:

```typescript
export interface EventDrawerProps {
  // ... other props
  /** Callback for reject confirmation (replaces window.confirm) */
  onConfirmReject?: () => Promise<boolean> | boolean;
  /** Callback for delete block confirmation (replaces window.confirm) */
  onConfirmDeleteBlock?: () => Promise<boolean> | boolean;
}
```

**Usage:**

```typescript
// In connected wrapper
<EventDrawer
  onConfirmReject={async () => {
    return await showConfirmDialog(t('confirmReject'));
  }}
  onConfirmDeleteBlock={async () => {
    return await showConfirmDialog(t('confirmDeleteBlock'));
  }}
/>
```

### 4. Default Labels (Norwegian Fallback)

All components include Norwegian default labels as fallback values:

```typescript
const DEFAULT_LABELS: CalendarSectionLabels = {
  selectTime: 'Velg tidspunkt',
  notAvailable: 'Ikke tilgjengelig',
  selectTimeSlots: 'Velg tidspunkt',
  selectDays: 'Velg dag(er)',
  selectPeriod: 'Velg periode',
  statusAvailable: 'Ledig',
  statusReserved: 'Reservert',
  statusBooked: 'Booket',
  statusBlocked: 'Blokkert',
  statusBlackout: 'Utilgjengelig',
  statusClosed: 'Stengt',
};
```

## Connected Wrapper Pattern

The `CalendarSectionConnected` component remains as a convenience wrapper that:

1. Uses SDK hooks (`useCalendarConfig`, `useAvailabilityMatrix`, `useCalendarRealtime`)
2. Manages date navigation state
3. Handles realtime updates
4. Passes data to pure `CalendarSection`

**CalendarSectionConnected is DEPRECATED** for new code. Apps should create their own thin wrappers.

### Creating a Connected Wrapper

```typescript
// app/features/calendar/ConnectedCalendar.tsx
import { CalendarSection, type CalendarSectionLabels } from '@xala-technologies/platform-ui/features/calendar';
import { useCalendarConfig, useAvailabilityMatrix, useCalendarRealtime } from '@digilist/client-sdk/hooks';
import { useT } from '@xala-technologies/platform/i18n';
import * as React from 'react';

export function ConnectedCalendar({ rentalObjectId, onSelectionChange, readOnly }) {
  const t = useT();
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [warningMessage, setWarningMessage] = React.useState<string>();

  // Fetch config
  const { data: config, isLoading: configLoading, error: configError } = useCalendarConfig(rentalObjectId);

  // Calculate date range
  const calendarMode = config?.granularity ?? 'TIME_SLOTS';
  const dateRange = getDateRangeForMode(calendarMode, currentDate);

  // Fetch availability matrix
  const { data: matrix, isLoading: matrixLoading, error: matrixError } = useAvailabilityMatrix(
    rentalObjectId,
    { from: dateRange.from, to: dateRange.to },
    { enabled: !!config }
  );

  // Subscribe to realtime updates
  useCalendarRealtime((event) => {
    if (event.rentalObjectId === rentalObjectId) {
      setWarningMessage(t('availability.updated'));
      setTimeout(() => setWarningMessage(undefined), 5000);
    }
  });

  // Build labels from translations
  const labels: CalendarSectionLabels = {
    selectTime: t('components.calendar.selectTime'),
    notAvailable: t('components.calendar.notAvailable'),
    selectTimeSlots: t('components.calendar.selectTimeSlots'),
    selectDays: t('components.calendar.selectDays'),
    selectPeriod: t('components.calendar.selectPeriod'),
    statusAvailable: t('components.calendar.statusAvailable'),
    statusReserved: t('components.calendar.statusReserved'),
    statusBooked: t('components.calendar.statusBooked'),
    statusBlocked: t('components.calendar.statusBlocked'),
    statusBlackout: t('components.calendar.statusBlackout'),
    statusClosed: t('components.calendar.statusClosed'),
  };

  return (
    <CalendarSection
      config={config}
      cells={matrix?.cells}
      legend={matrix?.legend}
      currentDate={currentDate}
      onDateChange={setCurrentDate}
      onSelectionChange={onSelectionChange}
      readOnly={readOnly}
      isLoading={configLoading || matrixLoading}
      errorMessage={configError ? t('calendar.configError') : matrixError ? t('calendar.matrixError') : undefined}
      warningMessage={warningMessage}
      labels={labels}
    />
  );
}
```

## Migration Guide

### For App Developers

#### Option 1: Use CalendarSectionConnected (Quick Migration)

```typescript
// Before
import { CalendarSection } from '@xala-technologies/platform-ui/features/calendar';

// After (no changes needed - CalendarSectionConnected handles SDK integration)
import { CalendarSectionConnected } from '@xala-technologies/platform-ui/features/calendar';

<CalendarSectionConnected
  rentalObjectId={rentalObjectId}
  onSelectionChange={handleSelection}
/>
```

#### Option 2: Create Custom Wrapper (Recommended)

```typescript
// 1. Create connected wrapper in your app
// app/features/calendar/ConnectedCalendar.tsx

import { CalendarSection, type CalendarSectionLabels } from '@xala-technologies/platform-ui/features/calendar';
import { useCalendarConfig, useAvailabilityMatrix } from '@digilist/client-sdk/hooks';
import { useT } from '@xala-technologies/platform/i18n';

export function ConnectedCalendar({ rentalObjectId }) {
  const t = useT();
  const [currentDate, setCurrentDate] = React.useState(new Date());

  const { data: config, isLoading: configLoading } = useCalendarConfig(rentalObjectId);
  const dateRange = getDateRangeForMode(config?.granularity ?? 'TIME_SLOTS', currentDate);
  const { data: matrix, isLoading: matrixLoading } = useAvailabilityMatrix(
    rentalObjectId,
    dateRange,
    { enabled: !!config }
  );

  const labels: CalendarSectionLabels = {
    selectTime: t('components.calendar.selectTime'),
    notAvailable: t('components.calendar.notAvailable'),
    // ... other labels
  };

  return (
    <CalendarSection
      config={config}
      cells={matrix?.cells}
      currentDate={currentDate}
      onDateChange={setCurrentDate}
      isLoading={configLoading || matrixLoading}
      labels={labels}
    />
  );
}

// 2. Use in your app
import { ConnectedCalendar } from './features/calendar/ConnectedCalendar';

<ConnectedCalendar rentalObjectId="123" />
```

### For EventDrawer

```typescript
// In your connected wrapper
import { EventDrawer, type EventDrawerLabels } from '@xala-technologies/platform-ui/features/calendar';
import { useT } from '@xala-technologies/platform/i18n';

function ConnectedEventDrawer() {
  const t = useT();

  const labels: EventDrawerLabels = {
    booking: t('common.booking'),
    listing: t('backoffice.calendar.listing'),
    date: t('backoffice.calendar.date'),
    time: t('backoffice.calendar.time'),
    bookedBy: t('backoffice.calendar.bookedBy'),
    close: t('action.close'),
    reject: t('action.reject'),
    approve: t('action.approve'),
    edit: t('action.edit'),
    delete: t('action.delete'),
    // ... other labels
  };

  return (
    <EventDrawer
      isOpen={isOpen}
      event={event}
      permissions={permissions}
      onClose={handleClose}
      onApprove={handleApprove}
      onReject={handleReject}
      onConfirmReject={async () => {
        return await showConfirmDialog(t('backoffice.calendar.confirmReject'));
      }}
      onConfirmDeleteBlock={async () => {
        return await showConfirmDialog(t('backoffice.calendar.confirmDeleteBlock'));
      }}
      labels={labels}
    />
  );
}
```

## Storybook Stories

Storybook stories will be created in `src/stories/Calendar/`:

- `CalendarSection.stories.tsx`
- `ConflictIndicator.stories.tsx`
- `EventDrawer.stories.tsx`
- `TimelineView.stories.tsx`
- `CreateBlockModal.stories.tsx`

Each story demonstrates all component states with mock data.

## TypeScript Compilation

All components compile without errors:

```bash
pnpm typecheck  # ✓ No TypeScript errors
pnpm lint       # ✓ No ESLint errors
```

## Benefits

1. **Reusability**: Components can be used in any React app, not just Xala platform
2. **Testability**: Easy to test with mock props, no SDK mocking needed
3. **Storybook-Friendly**: All states can be demonstrated in Storybook
4. **Tree-Shakeable**: No hidden dependencies
5. **Type-Safe**: Full TypeScript support with label interfaces
6. **Predictability**: All inputs explicit via props

## Testing Example

```typescript
import { render, screen } from '@testing-library/react';
import { CalendarSection, type CalendarSectionLabels } from '@xala-technologies/platform-ui/features/calendar';

describe('CalendarSection', () => {
  const mockLabels: CalendarSectionLabels = {
    selectTime: 'Select Time',
    notAvailable: 'Not Available',
    // ... other labels
  };

  it('shows empty state when no config provided', () => {
    render(
      <CalendarSection
        config={null}
        cells={[]}
        labels={mockLabels}
      />
    );

    expect(screen.getByText('Not Available')).toBeInTheDocument();
  });

  it('renders calendar with cells', () => {
    const mockConfig = { granularity: 'TIME_SLOTS' as const };
    const mockCells = [
      { start: '2026-01-26T08:00:00', end: '2026-01-26T09:00:00', status: 'AVAILABLE' }
    ];

    render(
      <CalendarSection
        config={mockConfig}
        cells={mockCells}
        labels={mockLabels}
      />
    );

    // Test calendar renders...
  });
});
```

## Files Modified

1. `/packages/platform-ui/src/features/calendar/CalendarSection.tsx` - Removed useT(), added CalendarSectionLabels
2. `/packages/platform-ui/src/features/calendar/components/ConflictIndicator.tsx` - Removed useT(), added ConflictIndicatorLabels
3. `/packages/platform-ui/src/features/calendar/components/EventDrawer.tsx` - Removed useT(), added EventDrawerLabels, replaced window.confirm
4. `/packages/platform-ui/src/features/calendar/components/TimelineView.tsx` - Removed useT(), added TimelineViewLabels
5. `/packages/platform-ui/src/features/calendar/components/CreateBlockModal.tsx` - (In progress)
6. `/packages/platform-ui/src/features/calendar/index.ts` - Exported new label types

## Remaining Work

- [ ] Complete CreateBlockModal refactoring
- [ ] Create Storybook stories for all components
- [ ] Add unit tests
- [ ] Update CalendarSectionConnected with new labels prop

## Success Criteria

✅ Zero SDK imports
✅ Zero i18n imports
✅ Zero raw HTML elements (already using Designsystemet)
✅ TypeScript compiles
⏳ Comprehensive documentation (this file)
⏳ Storybook stories

## Notes

- CalendarSectionConnected still uses SDK hooks but is now considered a **connected wrapper example**
- Apps should create their own thin wrappers for better control and customization
- All components maintain Norwegian defaults for backward compatibility
- Label interfaces are exhaustive to support all UI states
