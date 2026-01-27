# Calendar Feature: Connected Wrapper Guide

## Overview

The calendar feature components are **pure presentational components** that receive all data via props and emit events via callbacks. This guide shows how to create connected wrappers in your application.

## Architecture

```
┌─────────────────────────────────────────────┐
│  APP LAYER (Your Connected Wrapper)        │
│  ├── SDK Hooks (useCalendarConfig, etc.)   │
│  ├── i18n (useT)                            │
│  ├── State Management                      │
│  └── Business Logic                        │
└─────────────────────────────────────────────┘
                  │
                  │ Props (data, labels, callbacks)
                  ▼
┌─────────────────────────────────────────────┐
│  UI LAYER (Pure Presentational Component)  │
│  ├── CalendarSection                       │
│  ├── EventDrawer                           │
│  ├── TimelineView                          │
│  ├── ConflictIndicator                     │
│  └── CreateBlockModal                      │
└─────────────────────────────────────────────┘
```

## Example: Connected Calendar Component

### Step 1: Create Connected Wrapper

```typescript
// app/features/calendar/ConnectedCalendar.tsx

import * as React from 'react';
import {
  CalendarSection,
  type CalendarSectionLabels,
  type CalendarSelection,
  getDateRangeForMode,
} from '@xala-technologies/platform-ui/features/calendar';
import {
  useCalendarConfig,
  useAvailabilityMatrix,
  useCalendarRealtime,
} from '@digilist/client-sdk/hooks';
import { useT } from '@xala-technologies/platform/i18n';

export interface ConnectedCalendarProps {
  rentalObjectId: string;
  onSelectionChange?: (selection: CalendarSelection) => void;
  readOnly?: boolean;
}

export function ConnectedCalendar({
  rentalObjectId,
  onSelectionChange,
  readOnly = false,
}: ConnectedCalendarProps) {
  const t = useT();
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [warningMessage, setWarningMessage] = React.useState<string | undefined>();

  // Fetch calendar configuration
  const {
    data: config,
    isLoading: configLoading,
    error: configError,
  } = useCalendarConfig(rentalObjectId);

  // Determine calendar mode and date range
  const calendarMode = config?.granularity ?? 'TIME_SLOTS';
  const dateRange = React.useMemo(
    () => getDateRangeForMode(calendarMode, currentDate),
    [calendarMode, currentDate]
  );

  // Fetch availability matrix
  const {
    data: matrixResponse,
    isLoading: matrixLoading,
    error: matrixError,
  } = useAvailabilityMatrix(
    rentalObjectId,
    {
      from: dateRange.from,
      to: dateRange.to,
    },
    { enabled: !!config }
  );

  // Subscribe to realtime updates
  useCalendarRealtime((event) => {
    if (event.rentalObjectId === rentalObjectId) {
      setWarningMessage(t('components.calendar.selectionChanged'));
      setTimeout(() => setWarningMessage(undefined), 5000);
    }
  });

  // Build labels from translations
  const labels: CalendarSectionLabels = React.useMemo(
    () => ({
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
    }),
    [t]
  );

  // Build error message
  const errorMessage = React.useMemo(() => {
    if (configError) return t('components.calendar.couldNotLoadSettings');
    if (matrixError) return t('components.calendar.couldNotLoadAvailability');
    return undefined;
  }, [configError, matrixError, t]);

  return (
    <CalendarSection
      config={config}
      cells={matrixResponse?.data?.cells}
      legend={matrixResponse?.data?.legend}
      currentDate={currentDate}
      onDateChange={setCurrentDate}
      onSelectionChange={onSelectionChange}
      readOnly={readOnly}
      isLoading={configLoading || matrixLoading}
      errorMessage={errorMessage}
      warningMessage={warningMessage}
      labels={labels}
    />
  );
}
```

### Step 2: Use in Your App

```typescript
// app/pages/RentalObjectPage.tsx

import { ConnectedCalendar } from '../features/calendar/ConnectedCalendar';

export function RentalObjectPage({ rentalObjectId }: { rentalObjectId: string }) {
  const [selection, setSelection] = React.useState<CalendarSelection>();

  const handleSelectionChange = (newSelection: CalendarSelection) => {
    setSelection(newSelection);
    console.log('Selected slots:', newSelection.cells);
  };

  return (
    <div>
      <h1>Rental Object Calendar</h1>
      <ConnectedCalendar
        rentalObjectId={rentalObjectId}
        onSelectionChange={handleSelectionChange}
      />

      {selection?.cells.length > 0 && (
        <div>
          <p>Selected {selection.cells.length} time slots</p>
          <button onClick={() => bookSlots(selection.cells)}>
            Book Selected Slots
          </button>
        </div>
      )}
    </div>
  );
}
```

## Example: Connected Event Drawer

```typescript
// app/features/calendar/ConnectedEventDrawer.tsx

import * as React from 'react';
import {
  EventDrawer,
  type EventDrawerLabels,
  type CalendarEvent,
  type CalendarPermissions,
} from '@xala-technologies/platform-ui/features/calendar';
import {
  useApproveBooking,
  useRejectBooking,
  useDeleteBlock,
} from '@digilist/client-sdk/hooks';
import { useT } from '@xala-technologies/platform/i18n';
import { useToast } from '@xala-technologies/platform/runtime';
import { useNavigate } from 'react-router-dom';

export interface ConnectedEventDrawerProps {
  isOpen: boolean;
  event: CalendarEvent | null;
  permissions: CalendarPermissions;
  onClose: () => void;
}

export function ConnectedEventDrawer({
  isOpen,
  event,
  permissions,
  onClose,
}: ConnectedEventDrawerProps) {
  const t = useT();
  const toast = useToast();
  const navigate = useNavigate();

  const approveMutation = useApproveBooking();
  const rejectMutation = useRejectBooking();
  const deleteMutation = useDeleteBlock();

  // Build labels
  const labels: EventDrawerLabels = React.useMemo(
    () => ({
      booking: t('common.booking'),
      listing: t('backoffice.calendar.listing'),
      date: t('backoffice.calendar.date'),
      time: t('backoffice.calendar.time'),
      bookedBy: t('backoffice.calendar.bookedBy'),
      organization: t('backoffice.calendar.organization'),
      blockType: t('backoffice.calendar.blockType'),
      close: t('action.close'),
      reject: t('action.reject'),
      approve: t('action.approve'),
      edit: t('action.edit'),
      delete: t('action.delete'),
      viewBooking: t('backoffice.calendar.viewBooking'),
      rejecting: t('backoffice.calendar.rejecting'),
      approving: t('backoffice.calendar.approving'),
      deleting: t('backoffice.calendar.deleting'),
      confirmReject: t('backoffice.calendar.confirmReject'),
      confirmDeleteBlock: t('backoffice.calendar.confirmDeleteBlock'),
      statusConfirmed: t('status.confirmed'),
      statusPending: t('status.pending'),
      statusBlocked: t('status.blocked'),
      statusCancelled: t('status.cancelled'),
      blockTypeMaintenance: t('backoffice.calendar.blockType.maintenance'),
      blockTypeClosed: t('backoffice.calendar.blockType.closed'),
      blockTypeHold: t('backoffice.calendar.blockType.hold'),
      blockTypeEmergency: t('backoffice.calendar.blockType.emergency'),
      blockTypeInternal: t('backoffice.calendar.blockType.internal'),
    }),
    [t]
  );

  // Handlers
  const handleApprove = async (bookingId: string) => {
    try {
      await approveMutation.mutateAsync(bookingId);
      toast.success(t('backoffice.calendar.approveSuccess'));
      onClose();
    } catch (error) {
      toast.error(t('backoffice.calendar.approveError'));
    }
  };

  const handleReject = async (bookingId: string) => {
    try {
      await rejectMutation.mutateAsync(bookingId);
      toast.success(t('backoffice.calendar.rejectSuccess'));
      onClose();
    } catch (error) {
      toast.error(t('backoffice.calendar.rejectError'));
    }
  };

  const handleDeleteBlock = async (blockId: string) => {
    try {
      await deleteMutation.mutateAsync(blockId);
      toast.success(t('backoffice.calendar.deleteSuccess'));
      onClose();
    } catch (error) {
      toast.error(t('backoffice.calendar.deleteError'));
    }
  };

  const handleViewBooking = (bookingId: string) => {
    navigate(`/bookings/${bookingId}`);
  };

  // Confirmation callbacks
  const handleConfirmReject = async () => {
    return window.confirm(t('backoffice.calendar.confirmReject'));
  };

  const handleConfirmDeleteBlock = async () => {
    return window.confirm(t('backoffice.calendar.confirmDeleteBlock'));
  };

  return (
    <EventDrawer
      isOpen={isOpen}
      event={event}
      permissions={permissions}
      isApproving={approveMutation.isPending}
      isRejecting={rejectMutation.isPending}
      isDeletingBlock={deleteMutation.isPending}
      onClose={onClose}
      onApprove={handleApprove}
      onReject={handleReject}
      onDeleteBlock={handleDeleteBlock}
      onViewBooking={handleViewBooking}
      onConfirmReject={handleConfirmReject}
      onConfirmDeleteBlock={handleConfirmDeleteBlock}
      labels={labels}
    />
  );
}
```

## Example: Connected Timeline View

```typescript
// app/features/calendar/ConnectedTimelineView.tsx

import * as React from 'react';
import {
  TimelineView,
  type TimelineViewLabels,
  type CalendarEvent,
  type ConflictIndicatorLabels,
} from '@xala-technologies/platform-ui/features/calendar';
import {
  useCalendarEvents,
  useRentalObjects,
  useConflictDetection,
} from '@digilist/client-sdk/hooks';
import { useT } from '@xala-technologies/platform/i18n';

export interface ConnectedTimelineViewProps {
  dateRange: { start: Date; end: Date };
  onEventClick?: (event: CalendarEvent) => void;
}

export function ConnectedTimelineView({
  dateRange,
  onEventClick,
}: ConnectedTimelineViewProps) {
  const t = useT();

  // Fetch data
  const { data: events = [], isLoading: eventsLoading } = useCalendarEvents(dateRange);
  const { data: listings = [], isLoading: listingsLoading } = useRentalObjects();
  const { getConflicts, hasConflict } = useConflictDetection();

  // Build labels
  const conflictIndicatorLabels: ConflictIndicatorLabels = {
    booking: t('common.booking'),
    more: t('common.more'),
    bufferConflict: t('backoffice.calendar.bufferConflict'),
    requiresBuffer: t('backoffice.calendar.requiresBuffer'),
    overlapsWith: t('backoffice.calendar.overlapsWith'),
    conflict: t('backoffice.calendar.conflict'),
    bufferConflictLabel: t('backoffice.calendar.bufferConflictLabel'),
    conflictLabel: t('backoffice.calendar.conflictLabel'),
  };

  const labels: TimelineViewLabels = {
    booking: t('common.booking'),
    loading: t('state.loading'),
    noListingsForTimeline: t('backoffice.calendar.noListingsForTimeline'),
    listings: t('backoffice.calendar.listings'),
    capacity: t('backoffice.calendar.capacity'),
    conflictIndicator: conflictIndicatorLabels,
  };

  return (
    <TimelineView
      events={events}
      listings={listings}
      dateRange={dateRange}
      currentTime={new Date()}
      isLoading={eventsLoading || listingsLoading}
      getConflicts={getConflicts}
      hasConflict={hasConflict}
      onEventClick={onEventClick}
      labels={labels}
    />
  );
}
```

## Testing Connected Wrappers

### Unit Test Pure Component

```typescript
import { render, screen } from '@testing-library/react';
import { CalendarSection, type CalendarSectionLabels } from '@xala-technologies/platform-ui/features/calendar';

describe('CalendarSection', () => {
  const mockLabels: CalendarSectionLabels = {
    selectTime: 'Select Time',
    notAvailable: 'Not Available',
    // ... other labels
  };

  it('shows empty state', () => {
    render(<CalendarSection config={null} cells={[]} labels={mockLabels} />);
    expect(screen.getByText('Not Available')).toBeInTheDocument();
  });
});
```

### Integration Test Connected Wrapper

```typescript
import { render, screen, waitFor } from '@testing-library/react';
import { ConnectedCalendar } from './ConnectedCalendar';
import { rest } from 'msw';
import { setupServer } from 'msw/node';

const server = setupServer(
  rest.get('/api/calendar/config/:id', (req, res, ctx) => {
    return res(ctx.json({ granularity: 'TIME_SLOTS' }));
  }),
  rest.get('/api/calendar/availability/:id', (req, res, ctx) => {
    return res(ctx.json({
      cells: [
        { start: '2026-01-26T08:00:00', end: '2026-01-26T09:00:00', status: 'AVAILABLE' }
      ]
    }));
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());

describe('ConnectedCalendar', () => {
  it('loads and displays calendar', async () => {
    render(<ConnectedCalendar rentalObjectId="123" />);

    await waitFor(() => {
      expect(screen.getByText('Select Time')).toBeInTheDocument();
    });
  });
});
```

## Benefits of This Pattern

1. **Separation of Concerns**: UI logic in library, data logic in app
2. **Testability**: Test pure components with mock props, test wrappers with MSW
3. **Flexibility**: Different apps can wire up components differently
4. **Reusability**: Pure components work in any React app
5. **Type Safety**: Full TypeScript support with label interfaces
6. **Tree-Shaking**: Apps only bundle what they use

## Migration from CalendarSectionConnected

If you're currently using `CalendarSectionConnected`:

```typescript
// Old (still works but deprecated)
import { CalendarSectionConnected } from '@xala-technologies/platform-ui/features/calendar';

<CalendarSectionConnected rentalObjectId={id} />

// New (recommended)
import { ConnectedCalendar } from './features/calendar/ConnectedCalendar';

<ConnectedCalendar rentalObjectId={id} />
```

The built-in `CalendarSectionConnected` will be maintained for backward compatibility but is deprecated for new code.

## Summary

- Pure components in `@xala-technologies/platform-ui/features/calendar` have zero SDK/i18n dependencies
- Create connected wrappers in your app that use SDK hooks and pass data as props
- Use the `labels` prop to provide translated strings
- Test pure components with mock props, test wrappers with MSW
- Enjoy better separation of concerns, testability, and reusability
