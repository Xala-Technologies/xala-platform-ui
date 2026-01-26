# MVVM Architecture in Platform UI

## Overview

This document explains how `@xala-technologies/platform-ui` components interact with ViewModels from the MVVM (Model-View-ViewModel) architecture implemented in `@digilist/client-sdk`.

**Key Principle:** Platform UI components are **pure UI** - they receive ViewModels via props and emit events via callbacks. No business logic, API calls, or data transformations happen in this package.

## Architecture Layers

```
┌─────────────────────────────────────────────────────────┐
│         @xala-technologies/platform-ui                  │
│              (Pure UI Components)                       │
│  • Receives ViewModels via props                        │
│  • Emits events via callbacks                           │
│  • NO business logic or API calls                       │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Props: ViewModels
                     │ Events: Callbacks
                     │
┌────────────────────▼────────────────────────────────────┐
│           @digilist/client-sdk                          │
│           (ViewModels + Hooks)                          │
│  • ViewModel hooks (useBookingsVM, etc.)                │
│  • Adapters (DTO → ViewModel transformation)            │
│  • Business logic encapsulation                         │
└────────────────────┬────────────────────────────────────┘
                     │
                     │ Raw DTOs
                     │
┌────────────────────▼────────────────────────────────────┐
│                   Backend API                           │
│              (DTOs / Models)                            │
└─────────────────────────────────────────────────────────┘
```

## ViewModels Explained

### What is a ViewModel?

A ViewModel is a **UI-friendly representation** of data, containing:
- **Display-ready strings** (formatted dates, prices, status labels)
- **Computed properties** (duration, canConfirm, isActive)
- **Grouped data** (timeDisplay, paymentDisplay, statusDisplay)
- **Raw values** (for backward compatibility)

### Example: BookingVM

```typescript
interface BookingVM {
  id: string;

  // Raw values (backward compatibility)
  status: string;
  totalPrice: string;

  // Display-ready ViewModels
  statusDisplay: {
    label: string;                    // "Bekreftet"
    variant: 'success' | 'warning' | 'error';
    description: string;
  };

  timeDisplay: {
    startFormatted: string;           // "25. jan 2026"
    endFormatted: string;
    duration: string;                 // "2 timer"
    relativeStart: string;            // "om 2 dager"
  };

  rentalObjectDisplay: {
    id: string;
    name: string;                     // "Idrettshall A"
  };

  paymentDisplay: {
    totalFormatted: string;           // "2 500 kr"
    isPaid: boolean;
  };

  actions: {
    canConfirm: boolean;
    canCancel: boolean;
    canEdit: boolean;
  };
}
```

## Component Patterns

### Pattern 1: Pure Props In, Events Out

Components receive ViewModels and emit callbacks.

```typescript
// ✅ CORRECT: Component accepts ViewModel
interface BookingCardProps {
  title: string;
  status: string;
  statusVariant: 'success' | 'warning' | 'error';
  timeRange: string;
  price: string;
  canConfirm: boolean;
  onConfirm: () => void;
}

export function BookingCard({
  title,
  status,
  statusVariant,
  timeRange,
  price,
  canConfirm,
  onConfirm,
}: BookingCardProps) {
  return (
    <Card>
      <Heading level={3} data-size="sm">{title}</Heading>
      <Badge color={statusVariant}>{status}</Badge>
      <Paragraph>{timeRange}</Paragraph>
      <Paragraph>{price}</Paragraph>
      {canConfirm && (
        <Button onClick={onConfirm}>Bekreft</Button>
      )}
    </Card>
  );
}
```

### Pattern 2: Deconstructing ViewModels

Pages deconstruct ViewModels to pass specific props to components.

```typescript
// ✅ CORRECT: Page uses ViewModel hooks and passes props
function BookingsPage() {
  const { bookings, isLoading } = useBookingsVM({ status: 'pending' });

  const handleConfirm = (id: string) => {
    // Handle confirmation
  };

  return (
    <div>
      {bookings.map(booking => (
        <BookingCard
          key={booking.id}
          title={booking.rentalObjectDisplay.name}
          status={booking.statusDisplay.label}
          statusVariant={booking.statusDisplay.variant}
          timeRange={`${booking.timeDisplay.startFormatted} - ${booking.timeDisplay.endFormatted}`}
          price={booking.paymentDisplay.totalFormatted}
          canConfirm={booking.actions.canConfirm}
          onConfirm={() => handleConfirm(booking.id)}
        />
      ))}
    </div>
  );
}
```

### Pattern 3: Avoid Business Logic in Components

```typescript
// ❌ WRONG: Component contains business logic
export function BookingCard({ booking }: { booking: Booking }) {
  // Don't do this!
  const statusLabel = booking.status === 'confirmed' ? 'Bekreftet' : 'Avventer';
  const price = `${booking.totalPrice} kr`;
  const canConfirm = booking.status === 'pending';

  return <Card>...</Card>;
}

// ✅ CORRECT: Use ViewModel properties
export function BookingCard({
  status,
  price,
  canConfirm,
}: {
  status: string;
  price: string;
  canConfirm: boolean;
}) {
  return <Card>...</Card>;
}
```

## Anti-Patterns to Avoid

### ❌ Don't: Import SDK Types in Platform UI

```typescript
// ❌ FORBIDDEN: This breaks layer boundaries
import { Booking } from '@digilist/client-sdk';

interface BookingCardProps {
  booking: Booking; // Don't do this!
}
```

**Why?** Platform UI must remain UI-only with no SDK dependencies.

### ❌ Don't: Format Data in Components

```typescript
// ❌ WRONG: Component contains formatting logic
export function BookingCard({ startTime }: { startTime: string }) {
  const formatted = new Date(startTime).toLocaleDateString('nb-NO');
  return <div>{formatted}</div>;
}

// ✅ CORRECT: Receive formatted string
export function BookingCard({ startTimeFormatted }: { startTimeFormatted: string }) {
  return <div>{startTimeFormatted}</div>;
}
```

### ❌ Don't: Compute Status Logic in Components

```typescript
// ❌ WRONG: Component computes status logic
export function BookingCard({ status }: { status: string }) {
  const variant = status === 'confirmed' ? 'success' : 'warning';
  return <Badge color={variant}>{status}</Badge>;
}

// ✅ CORRECT: Receive computed variant
export function BookingCard({ status, statusVariant }: {
  status: string;
  statusVariant: 'success' | 'warning' | 'error';
}) {
  return <Badge color={statusVariant}>{status}</Badge>;
}
```

## Component Props Design

### Principle: Flat Props, Not Nested Objects

Components should accept **flat props** derived from ViewModels, not nested ViewModel objects.

```typescript
// ❌ AVOID: Passing entire ViewModel sections
interface BookingCardProps {
  statusDisplay: StatusDisplay;
  timeDisplay: TimeDisplay;
  paymentDisplay: PaymentDisplay;
}

// ✅ PREFER: Flat, specific props
interface BookingCardProps {
  status: string;
  statusVariant: 'success' | 'warning' | 'error';
  timeRange: string;
  price: string;
}
```

**Why?**
- Simpler component interface
- Easier to test (fewer mock objects)
- More reusable (not tied to specific ViewModel shape)

## Available ViewModels

Components can expect to receive props derived from these ViewModels:

| Domain | ViewModel | Common Props |
|--------|-----------|--------------|
| **Booking** | BookingVM | id, status, statusVariant, timeRange, price, canConfirm |
| **Rental Object** | RentalObjectVM | id, name, type, status, statusVariant, availability |
| **Message** | ConversationVM, MessageVM | id, subject, userName, hasUnread, messagePreview |
| **GDPR** | GdprRequestVM | id, type, status, statusVariant, requestedAt |
| **Season** | SeasonVM, SeasonApplicationVM | id, name, dateRange, isActive, canApply |
| **Organization** | OrganizationVM | id, name, type, memberCount, isActive |
| **Calendar** | CalendarEventVM | id, title, timeRange, duration, color, isAllDay |

For complete ViewModel definitions, see [`@digilist/client-sdk/src/adapters`](../../../../Digilist/packages/client-sdk/src/adapters).

## Usage Examples

### Example 1: BookingCard Component

```typescript
// src/blocks/booking/BookingCard.tsx
import { Card, Heading, Badge, Paragraph, Button } from '../../primitives';

interface BookingCardProps {
  title: string;
  status: string;
  statusVariant: 'success' | 'warning' | 'error';
  timeRange: string;
  duration: string;
  price: string;
  canConfirm?: boolean;
  canCancel?: boolean;
  onConfirm?: () => void;
  onCancel?: () => void;
}

export function BookingCard({
  title,
  status,
  statusVariant,
  timeRange,
  duration,
  price,
  canConfirm,
  canCancel,
  onConfirm,
  onCancel,
}: BookingCardProps) {
  return (
    <Card data-color="neutral">
      <Heading level={3} data-size="sm">{title}</Heading>

      <Badge color={statusVariant}>{status}</Badge>

      <div>
        <Paragraph data-size="sm">{timeRange}</Paragraph>
        <Paragraph data-size="sm">{duration}</Paragraph>
        <Paragraph data-size="md" style={{ fontWeight: 'var(--ds-font-weight-medium)' }}>
          {price}
        </Paragraph>
      </div>

      <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
        {canConfirm && (
          <Button onClick={onConfirm} variant="primary">
            Bekreft
          </Button>
        )}
        {canCancel && (
          <Button onClick={onCancel} variant="secondary" data-color="danger">
            Avbryt
          </Button>
        )}
      </div>
    </Card>
  );
}
```

**Usage in Page:**
```typescript
import { BookingCard } from '@xala-technologies/platform-ui';
import { useBookingsVM } from '@digilist/client-sdk';

function BookingsPage() {
  const { bookings } = useBookingsVM();

  return (
    <>
      {bookings.map(booking => (
        <BookingCard
          key={booking.id}
          title={booking.rentalObjectDisplay.name}
          status={booking.statusDisplay.label}
          statusVariant={booking.statusDisplay.variant}
          timeRange={`${booking.timeDisplay.startFormatted} - ${booking.timeDisplay.endFormatted}`}
          duration={booking.timeDisplay.duration}
          price={booking.paymentDisplay.totalFormatted}
          canConfirm={booking.actions.canConfirm}
          canCancel={booking.actions.canCancel}
          onConfirm={() => handleConfirm(booking.id)}
          onCancel={() => handleCancel(booking.id)}
        />
      ))}
    </>
  );
}
```

### Example 2: StatusBadge Component

```typescript
// src/blocks/StatusBadge.tsx
import { Badge } from '../primitives';

interface StatusBadgeProps {
  label: string;
  variant: 'success' | 'warning' | 'error' | 'info' | 'neutral';
  description?: string;
}

export function StatusBadge({ label, variant, description }: StatusBadgeProps) {
  return (
    <Badge color={variant} title={description}>
      {label}
    </Badge>
  );
}
```

**Usage with ViewModel:**
```typescript
const { booking } = useBookingVM(id);

<StatusBadge
  label={booking.statusDisplay.label}
  variant={booking.statusDisplay.variant}
  description={booking.statusDisplay.description}
/>
```

### Example 3: ResourceCard Pattern

```typescript
// src/patterns/ResourceCard.tsx
import { Card, Heading, Paragraph, Badge, Button } from '../primitives';

interface ResourceCardProps {
  title: string;
  subtitle?: string;
  status?: string;
  statusVariant?: 'success' | 'warning' | 'error';
  metadata?: Array<{ label: string; value: string }>;
  actions?: Array<{
    label: string;
    variant: 'primary' | 'secondary' | 'tertiary';
    onClick: () => void;
  }>;
}

export function ResourceCard({
  title,
  subtitle,
  status,
  statusVariant,
  metadata,
  actions,
}: ResourceCardProps) {
  return (
    <Card>
      <div>
        <Heading level={3} data-size="sm">{title}</Heading>
        {subtitle && <Paragraph data-size="sm">{subtitle}</Paragraph>}
        {status && <Badge color={statusVariant}>{status}</Badge>}
      </div>

      {metadata && (
        <dl>
          {metadata.map(({ label, value }) => (
            <div key={label}>
              <dt>{label}</dt>
              <dd>{value}</dd>
            </div>
          ))}
        </dl>
      )}

      {actions && (
        <div style={{ display: 'flex', gap: 'var(--ds-spacing-2)' }}>
          {actions.map(action => (
            <Button key={action.label} onClick={action.onClick} variant={action.variant}>
              {action.label}
            </Button>
          ))}
        </div>
      )}
    </Card>
  );
}
```

**Usage with Multiple ViewModels:**
```typescript
// Can be used with BookingVM
<ResourceCard
  title={booking.rentalObjectDisplay.name}
  subtitle={booking.timeDisplay.duration}
  status={booking.statusDisplay.label}
  statusVariant={booking.statusDisplay.variant}
  metadata={[
    { label: 'Start', value: booking.timeDisplay.startFormatted },
    { label: 'Pris', value: booking.paymentDisplay.totalFormatted },
  ]}
  actions={[
    {
      label: 'Bekreft',
      variant: 'primary',
      onClick: () => handleConfirm(booking.id),
    },
  ]}
/>

// Can be used with SeasonVM
<ResourceCard
  title={season.basicInfo.name}
  subtitle={season.dateDisplay.durationLabel}
  status={season.statusDisplay.label}
  statusVariant={season.statusDisplay.variant}
  metadata={[
    { label: 'Start', value: season.dateDisplay.startDateFormatted },
    { label: 'Søknader', value: String(season.stats.totalApplications) },
  ]}
/>
```

## Storybook Examples

Components should have Storybook stories demonstrating ViewModel-like props:

```typescript
// src/stories/BookingCard.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';
import { BookingCard } from '../blocks/booking/BookingCard';

const meta: Meta<typeof BookingCard> = {
  title: 'Blocks/Booking/BookingCard',
  component: BookingCard,
};

export default meta;
type Story = StoryObj<typeof BookingCard>;

export const Confirmed: Story = {
  args: {
    title: 'Idrettshall A',
    status: 'Bekreftet',
    statusVariant: 'success',
    timeRange: '25. jan 2026 10:00 - 12:00',
    duration: '2 timer',
    price: '2 500 kr',
    canConfirm: false,
    canCancel: true,
  },
};

export const Pending: Story = {
  args: {
    title: 'Møterom B',
    status: 'Avventer',
    statusVariant: 'warning',
    timeRange: '26. jan 2026 14:00 - 16:00',
    duration: '2 timer',
    price: '1 500 kr',
    canConfirm: true,
    canCancel: true,
  },
};
```

## Testing Components with ViewModels

### Unit Tests

Test components with mock ViewModel-like props:

```typescript
// BookingCard.test.tsx
import { render, screen } from '@testing-library/react';
import { BookingCard } from './BookingCard';

describe('BookingCard', () => {
  const mockProps = {
    title: 'Test Venue',
    status: 'Bekreftet',
    statusVariant: 'success' as const,
    timeRange: '25. jan 2026 10:00 - 12:00',
    duration: '2 timer',
    price: '2 500 kr',
    canConfirm: false,
    canCancel: true,
  };

  it('renders all ViewModel properties correctly', () => {
    render(<BookingCard {...mockProps} />);

    expect(screen.getByText('Test Venue')).toBeInTheDocument();
    expect(screen.getByText('Bekreftet')).toBeInTheDocument();
    expect(screen.getByText('25. jan 2026 10:00 - 12:00')).toBeInTheDocument();
    expect(screen.getByText('2 500 kr')).toBeInTheDocument();
  });

  it('shows confirm button when canConfirm is true', () => {
    render(<BookingCard {...mockProps} canConfirm={true} />);

    expect(screen.getByText('Bekreft')).toBeInTheDocument();
  });

  it('hides confirm button when canConfirm is false', () => {
    render(<BookingCard {...mockProps} canConfirm={false} />);

    expect(screen.queryByText('Bekreft')).not.toBeInTheDocument();
  });
});
```

## Migration Checklist

When creating or updating components to work with ViewModels:

- [ ] Remove any SDK type imports (`Booking`, `RentalObject`, etc.)
- [ ] Accept flat props instead of nested ViewModel objects
- [ ] Use display-ready strings (no formatting in component)
- [ ] Use computed booleans for conditional rendering (no status checks)
- [ ] Emit callbacks for actions (no business logic)
- [ ] Update Storybook stories with ViewModel-like props
- [ ] Update tests with mock ViewModel-like data
- [ ] Verify no `@digilist/client-sdk` imports

## Best Practices

### ✅ DO

- Accept display-ready props (formatted strings, computed booleans)
- Use design tokens from Designsystemet
- Keep components pure and reusable
- Write comprehensive Storybook stories
- Test components with mock ViewModel-like props

### ❌ DON'T

- Import SDK types or DTOs
- Format dates, prices, or other data
- Compute status logic or action availability
- Make API calls or access SDK hooks
- Use inline business logic

## Related Documentation

- [Package Architecture](./ARCHITECTURE.md) - Overall architecture principles
- [Component Hierarchy](./COMPONENTS.md) - Layer hierarchy and boundaries
- [@digilist/client-sdk MVVM Architecture](../../../../Digilist/packages/client-sdk/MVVM_ARCHITECTURE.md) - Complete MVVM implementation details
- [Adapter Layer](../../../../Digilist/packages/client-sdk/src/adapters/README.md) - ViewModel transformations

## Conclusion

The MVVM architecture enables **pure, reusable UI components** in `@xala-technologies/platform-ui` by:

1. **Separating concerns** - UI components focus solely on presentation
2. **Type safety** - ViewModels provide strongly-typed interfaces
3. **Testability** - Components can be tested with simple mock props
4. **Reusability** - Components are not tied to specific business logic

By following these patterns, we maintain clear boundaries between UI and business logic, making the codebase more maintainable and scalable.
