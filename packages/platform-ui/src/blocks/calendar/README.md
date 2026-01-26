# Calendar Blocks

Pure presentational calendar components for availability display.

## Components

### RentalObjectAvailabilityCalendar

A comprehensive availability calendar component supporting three display modes.

**Import:**
```typescript
import { RentalObjectAvailabilityCalendar } from '@xala-technologies/platform-ui/blocks/calendar';
```

**Features:**
- Three calendar modes: TIME_SLOTS (week view), ALL_DAY (month view), MULTI_DAY (range selection)
- Navigation controls (previous, next, today)
- Status visualization with customizable legend
- Loading, error, and warning states
- Read-only mode support
- Full accessibility (ARIA labels, keyboard navigation)

**Props:**
```typescript
interface RentalObjectAvailabilityCalendarProps {
  mode: 'TIME_SLOTS' | 'ALL_DAY' | 'MULTI_DAY';
  cells: CalendarCell[];
  selection?: CalendarSelection;
  legend?: CalendarLegendItem[];
  currentDate: Date;
  onDateChange: (date: Date) => void;
  onCellClick?: (cell: CalendarCell) => void;
  onSelectionChange?: (selection: CalendarSelection | undefined) => void;
  startHour?: number;        // Default: 8
  endHour?: number;          // Default: 17
  slotSizeMinutes?: number;  // Default: 60
  showTips?: boolean;
  title?: string;
  subtitle?: string;
  isLoading?: boolean;
  errorMessage?: string;
  warningMessage?: string;
  readOnly?: boolean;
  className?: string;
}
```

**Basic Usage:**
```typescript
import { RentalObjectAvailabilityCalendar } from '@xala-technologies/platform-ui/blocks/calendar';
import type { CalendarCell, CalendarSelection } from '@xala-technologies/platform-ui/types/rental-object-detail';

function MyCalendar() {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const [selection, setSelection] = React.useState<CalendarSelection>();

  const cells: CalendarCell[] = [
    {
      id: '2024-01-15T10:00:00Z-2024-01-15T11:00:00Z',
      start: '2024-01-15T10:00:00Z',
      end: '2024-01-15T11:00:00Z',
      status: 'AVAILABLE',
    },
    // ... more cells
  ];

  return (
    <RentalObjectAvailabilityCalendar
      mode="TIME_SLOTS"
      cells={cells}
      selection={selection}
      currentDate={currentDate}
      onDateChange={setCurrentDate}
      onCellClick={(cell) => {
        setSelection({
          cells: [cell],
          isValid: true,
        });
      }}
      title="Select time"
      subtitle="Choose your preferred time slot"
    />
  );
}
```

**Calendar Modes:**

1. **TIME_SLOTS** - Week view with hourly time slots
   - Displays 7 days (Monday - Sunday)
   - Hourly slots from startHour to endHour
   - Best for: Hourly bookings, meeting rooms, equipment rental

2. **ALL_DAY** - Month view with single day selection
   - Full month calendar grid
   - Click to select individual days
   - Best for: Full-day bookings, venue reservations

3. **MULTI_DAY** - Month view with range selection
   - Full month calendar grid
   - Select date ranges
   - Best for: Multi-day stays, vacation rentals

**Cell Status Values:**
- `AVAILABLE` - Can be booked (green)
- `RESERVED` - Temporarily held (yellow)
- `BOOKED` - Confirmed booking (red)
- `BLOCKED` - Manually blocked (gray)
- `BLACKOUT` - System blackout (gray)
- `CLOSED` - Outside opening hours (gray)

**Legend Example:**
```typescript
const legend = [
  { status: 'AVAILABLE', label: 'Available' },
  { status: 'RESERVED', label: 'Reserved' },
  { status: 'BOOKED', label: 'Booked' },
  { status: 'BLOCKED', label: 'Blocked' },
  { status: 'BLACKOUT', label: 'Blackout' },
  { status: 'CLOSED', label: 'Closed' },
];

<RentalObjectAvailabilityCalendar
  // ... other props
  legend={legend}
/>
```

**With Loading State:**
```typescript
<RentalObjectAvailabilityCalendar
  mode="TIME_SLOTS"
  cells={[]}
  currentDate={new Date()}
  onDateChange={() => {}}
  isLoading={true}
/>
```

**With Error State:**
```typescript
<RentalObjectAvailabilityCalendar
  mode="TIME_SLOTS"
  cells={[]}
  currentDate={new Date()}
  onDateChange={() => {}}
  errorMessage="Failed to load availability"
/>
```

**Read-Only Mode:**
```typescript
<RentalObjectAvailabilityCalendar
  mode="TIME_SLOTS"
  cells={cells}
  currentDate={new Date()}
  onDateChange={() => {}}
  readOnly={true}
/>
```

## Architecture

This is a **pure presentational component** that:
- ✅ Receives all data via props
- ✅ Emits all events via callbacks
- ✅ Contains no business logic
- ✅ Makes no API calls
- ✅ Has no authentication logic
- ✅ Uses only Designsystemet components
- ✅ Complies with platform-ui layer hierarchy

## Integration with SDK

Apps should create thin wrappers that connect SDK data:

```typescript
// apps/dashboard/src/components/CalendarWrapper.tsx
import { RentalObjectAvailabilityCalendar } from '@xala-technologies/platform-ui/blocks/calendar';
import { useCalendarData } from '@digilist/client-sdk/hooks';

export function CalendarWrapper({ rentalObjectId }: { rentalObjectId: string }) {
  const [currentDate, setCurrentDate] = React.useState(new Date());
  const { data, isLoading, error } = useCalendarData(rentalObjectId, currentDate);

  return (
    <RentalObjectAvailabilityCalendar
      mode={data?.mode || 'TIME_SLOTS'}
      cells={data?.cells || []}
      legend={data?.legend}
      currentDate={currentDate}
      onDateChange={setCurrentDate}
      onCellClick={(cell) => {
        // Handle booking flow
      }}
      isLoading={isLoading}
      errorMessage={error?.message}
    />
  );
}
```

## Accessibility

The component is fully accessible:
- All interactive elements have ARIA labels
- Selected cells have `aria-pressed` state
- Keyboard navigation supported (Tab, Enter, Space)
- High contrast status colors
- Spinner has `aria-hidden` for decorative loading

## Dependencies

- `react` - React library
- `@digdir/designsystemet-react` - Designsystemet UI components
- `../../primitives` - Stack layout component
- `../../types/rental-object-detail` - TypeScript type definitions

## TypeScript

Fully typed with comprehensive interfaces. All props are type-safe.

## Status

✅ **Production Ready** - Fully tested and integrated into platform-ui

## Related Components

- `CalendarSection` - Calendar controller component in features/calendar
- `SlotCalendar` - Generic slot calendar in patterns
- `ResourceCalendar` - Resource-specific calendar in composed

## License

Part of @xala-technologies/platform-ui package.
